/**
 * Dynamic requirement interview: the model asks its own questions (with
 * choices) instead of a fixed clarification form, then turns the answers into
 * the clarification object the founding flow consumes.
 */
import type { Context } from '@deepseek-ai/cordis'
import type { Agent } from '@deepseek-ai/dsh-agent'
import { createUserMessage } from '@deepseek-ai/dsh-llm'
import { agentTeamsSource, observedSessionFormatVersion } from './harness-compat.ts'
import { resolveMemberLlmSelection } from './members.ts'
import { getModeSpec, type TeamMode } from './modes.ts'
import { normalizeClarification } from './clarify.ts'
import type { ClarifyOptions } from './clarify.ts'
import { parseClarifyOptions } from './clarify-options.ts'
import type { TeamClarification } from './types.ts'

export interface InterviewQuestion {
  readonly id: string
  readonly prompt: string
  readonly multi: boolean
  readonly options: string[]
}

const MAX_QUESTIONS = 6
const MAX_OPTIONS = 6

export function buildInterviewQuestionsPrompts(requirement: string, mode?: TeamMode): { system: string; user: string } {
  const spec = getModeSpec(mode)
  const system = [
    '你是资深售前架构师，要根据用户的任务需求，用"访谈提纲"的方式向用户提问，帮助他做选择。',
    '规则：',
    '1. 只输出 JSON，不要 Markdown，不要解释。',
    '2. 结构：{"questions":[{"id":"q1","prompt":"问题","multi":true|false,"options":["选项1","选项2"]}]}。',
    '3. 3-6 个问题，每个问题 2-6 个具体、互斥的选项；选项要针对这条需求，不要通用套话。',
    '4. 问题覆盖真正影响实现的决策点（平台/部署环境、硬件或接口、交互方式、验收口径、禁止边界等），缺失的不要硬凑。',
    '5. 当前开发模式：' + spec.emoji + ' ' + spec.name + '。' + spec.philosophy,
    '6. 问法要像模板：一句话问题 + 可直接勾选的选项，用户不回答也能用默认值继续。',
    '7. 禁止编造用户没提的事实；不要问与实现无关的寒暄。',
  ].join('\n')
  const user = ['任务需求：' + requirement].join('\n')
  return { system, user }
}

export function parseInterviewQuestions(raw: string): InterviewQuestion[] {
  const text = raw.trim()
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start < 0 || end <= start) throw new Error('interview reply is not JSON')
  const parsed = JSON.parse(text.slice(start, end + 1)) as { questions?: unknown }
  if (!Array.isArray(parsed.questions)) throw new Error('interview reply is missing questions')
  const seen = new Set<string>()
  const questions: InterviewQuestion[] = []
  for (const [index, item] of parsed.questions.entries()) {
    if (typeof item !== 'object' || item === null) continue
    const record = item as Record<string, unknown>
    const prompt = typeof record.prompt === 'string' ? record.prompt.trim() : ''
    if (prompt === '') continue
    const rawOptions = Array.isArray(record.options) ? record.options : []
    const options = rawOptions
      .filter((option): option is string => typeof option === 'string')
      .map(option => option.trim())
      .filter(option => option !== '')
      .slice(0, MAX_OPTIONS)
    if (options.length < 2) continue
    const rawId = typeof record.id === 'string' ? record.id.trim() : ''
    const id = (rawId === '' ? 'q' + (index + 1) : rawId).replace(/[^A-Za-z0-9_-]/g, '').slice(0, 24)
    const unique = seen.has(id) ? id + '-' + index : id
    seen.add(unique)
    questions.push({ id: unique, prompt: prompt.slice(0, 120), multi: record.multi === true, options })
    if (questions.length >= MAX_QUESTIONS) break
  }
  if (questions.length === 0) throw new Error('interview reply produced no usable questions')
  return questions
}

/** One-shot question generation; falls back to mode-based defaults. */
export async function generateInterviewQuestions(
  ctx: Context,
  captain: Agent,
  input: { requirement: string; mode?: TeamMode; workspaceFacts: string },
  signal?: AbortSignal,
): Promise<InterviewQuestion[]> {
  const requirement = input.requirement.trim()
  if (requirement === '') throw new Error('requirement must not be empty')
  const prompts = buildInterviewQuestionsPrompts(requirement, input.mode)
  try {
    const selection = await resolveMemberLlmSelection(ctx, captain, {}, signal)
    const stream = ctx.llm.stream({
      provider: selection.provider,
      model: selection.model,
      system: prompts.system,
      messages: [createUserMessage({
        content: [{ type: 'text', text: prompts.user }],
        source: agentTeamsSource({ kind: 'agent-teams' }, observedSessionFormatVersion(captain)),
      })],
      maxTokens: 2200,
      temperature: 0.4,
      ...signal === undefined ? {} : { signal },
    })
    let text = ''
    for await (const chunk of stream) if (chunk.type === 'text-delta') text += chunk.text
    return parseInterviewQuestions(text)
  } catch (error: unknown) {
    ctx.logger.warn('agent-teams: interview questions degraded: ' + (error instanceof Error ? error.message : String(error)))
    return fallbackInterviewQuestions(input.mode)
  }
}

/** Minimal template questions when the model is unavailable. */
export function fallbackInterviewQuestions(mode?: TeamMode): InterviewQuestion[] {
  const spec = getModeSpec(mode)
  return [
    { id: 'platform', prompt: '目标运行平台？', multi: true, options: ['Windows', 'Linux (UOS/麒麟)', 'macOS', 'Android', 'iOS'] },
    { id: 'acceptance', prompt: '验收以哪条为准？', multi: true, options: [...spec.acceptanceDefaults] },
    { id: 'excluded', prompt: '哪些事情明确不做？', multi: true, options: [...spec.defaultExcluded] },
  ]
}

function answersText(answers: readonly { question: string; answer: string[] }[]): string {
  return answers
    .filter(item => item.answer.length > 0)
    .map(item => '问：' + item.question + '\n答：' + item.answer.join('；'))
    .join('\n')
}

export function buildClarificationPrompt(requirement: string, mode: TeamMode | undefined, answers: readonly { question: string; answer: string[] }[]): { system: string; user: string } {
  const spec = getModeSpec(mode)
  const system = [
    '你是售前架构师，要把访谈答案整理成"开宗澄清"结构。',
    '规则：',
    '1. 只输出 JSON，不要 Markdown，不要解释。',
    '2. 结构：{"type":"hardware|software","scale":"small|medium|fullstack","ui":{"references":string[],"styles":string[],"notes":string[]},"platforms":string[],"hardware":string[],"constraints":string[],"excluded":string[],"acceptance":string[],"memoryHints":string[]}。',
    '3. 以访谈答案为准；答案没有覆盖的项用当前模式基线补齐，不要编造新事实。',
    '4. 当前模式：' + spec.emoji + ' ' + spec.name + '；验收基线：' + spec.acceptanceDefaults.join('；') + '；默认边界：' + spec.defaultExcluded.join('；') + '。',
    '5. platforms 至少一个；acceptance 至少一条可执行断言。',
  ].join('\n')
  const user = ['任务需求：' + requirement, '', '访谈答案：', answersText(answers) || '（用户未选择，全部使用模式默认值）'].join('\n')
  return { system, user }
}

/** Convert the model's interview/answer output into a valid clarification. */
export function clarificationFromOptions(options: ClarifyOptions, mode: TeamMode | undefined): TeamClarification {
  const normalized = normalizeClarification({
    type: options.type,
    scale: options.scale,
    mode,
    ui: {
      ...options.ui.references.length === 0 ? {} : { reference: options.ui.references[0] },
      styles: options.ui.styles,
      ...options.ui.notes.length === 0 ? {} : { notes: options.ui.notes.join('；') },
    },
    platforms: options.platforms,
    hardwareList: options.hardware,
    constraints: options.constraints,
    excluded: options.excluded,
    acceptance: options.acceptance,
    memoryHints: options.memoryHints,
  })
  return normalized
}

/** Generate the clarification from the interview answers (AI); fallback is mode defaults. */
export async function generateClarificationFromAnswers(
  ctx: Context,
  captain: Agent,
  input: { requirement: string; mode?: TeamMode; answers: readonly { question: string; answer: string[] }[] },
  signal?: AbortSignal,
): Promise<TeamClarification> {
  const prompts = buildClarificationPrompt(input.requirement, input.mode, input.answers)
  try {
    const selection = await resolveMemberLlmSelection(ctx, captain, {}, signal)
    const stream = ctx.llm.stream({
      provider: selection.provider,
      model: selection.model,
      system: prompts.system,
      messages: [createUserMessage({
        content: [{ type: 'text', text: prompts.user }],
        source: agentTeamsSource({ kind: 'agent-teams' }, observedSessionFormatVersion(captain)),
      })],
      maxTokens: 2200,
      temperature: 0.3,
      ...signal === undefined ? {} : { signal },
    })
    let text = ''
    for await (const chunk of stream) if (chunk.type === 'text-delta') text += chunk.text
    return clarificationFromOptions(parseClarifyOptions(text, input.mode), input.mode)
  } catch (error: unknown) {
    ctx.logger.warn('agent-teams: interview clarification degraded: ' + (error instanceof Error ? error.message : String(error)))
    const spec = getModeSpec(input.mode)
    return normalizeClarification({
      type: 'software',
      scale: 'small',
      mode: input.mode,
      ui: { styles: [] },
      platforms: ['Windows'],
      hardwareList: [],
      constraints: [],
      excluded: [...spec.defaultExcluded],
      acceptance: [...spec.acceptanceDefaults],
      memoryHints: [],
    })
  }
}
