/**
 * Optional AI requirement polish (module 0).
 *
 * The model only expands the user's sentence and proposes hidden assumptions.
 * It never replaces the original text: the UI shows both and the user confirms
 * before clarification starts.
 */
import type { Context } from '@deepseek-ai/cordis'
import type { Agent } from '@deepseek-ai/dsh-agent'
import { createUserMessage } from '@deepseek-ai/dsh-llm'
import { agentTeamsSource, observedSessionFormatVersion } from './harness-compat.ts'
import { resolveMemberLlmSelection } from './members.ts'

export const POLISH_MAX_CHARS = 200

export interface PolishResult {
  readonly expanded: string
  readonly hiddenConditions: readonly string[]
  /** True when the model route was unavailable and the original text is returned. */
  readonly degraded: boolean
  readonly model?: string
}

const MAX_HIDDEN = 6

export function buildPolishPrompts(requirement: string, workspaceFacts: string): { system: string; user: string } {
  const system = [
    '你是制造业软件项目的资深售前架构师，任务是把用户一句口语化需求扩写成可评审的短需求。',
    '规则：',
    '1. 只输出 JSON，不要 Markdown，不要解释。',
    '2. 结构：{"expanded": string, "hiddenConditions": string[]}。',
    '3. expanded 不超过 ' + POLISH_MAX_CHARS + ' 字，补全可执行的技术术语、目标平台倾向、核心功能点，禁止编造用户没说的事实。',
    '4. hiddenConditions 是 0-6 条用户可能忽略的隐含约束，例如"兼容 Win7""需对接 MES""车间强光环境"，每条不超过 20 字。',
  ].join('\n')
  const user = [
    '原始需求：' + requirement,
    '',
    '工作区事实（只作上下文，不要原样复述）：',
    workspaceFacts.slice(0, 1500),
  ].join('\n')
  return { system, user }
}

/** Parse a model reply into the polish result; throws when it is not usable JSON. */
export function parsePolishOutput(raw: string): { expanded: string; hiddenConditions: string[] } {
  const text = raw.trim()
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start < 0 || end <= start) throw new Error('polish reply is not JSON')
  const parsed = JSON.parse(text.slice(start, end + 1)) as { expanded?: unknown; hiddenConditions?: unknown }
  if (typeof parsed.expanded !== 'string' || parsed.expanded.trim() === '') throw new Error('polish reply is missing expanded text')
  const expanded = parsed.expanded.trim().slice(0, POLISH_MAX_CHARS)
  const hiddenConditions = Array.isArray(parsed.hiddenConditions)
    ? parsed.hiddenConditions.filter((item): item is string => typeof item === 'string').map(item => item.trim()).filter(item => item !== '').slice(0, MAX_HIDDEN)
    : []
  return { expanded, hiddenConditions }
}

/**
 * One-shot polishing call. Any failure degrades to the original requirement so
 * the wizard never dead-ends on the model.
 */
export async function polishRequirement(
  ctx: Context,
  captain: Agent,
  input: { requirement: string; workspaceFacts: string },
  signal?: AbortSignal,
): Promise<PolishResult> {
  const requirement = input.requirement.trim()
  if (requirement === '') throw new Error('requirement must not be empty')
  const prompts = buildPolishPrompts(requirement, input.workspaceFacts)
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
      maxTokens: 500,
      temperature: 0.3,
      ...signal === undefined ? {} : { signal },
    })
    let text = ''
    for await (const chunk of stream) {
      if (chunk.type === 'text-delta') text += chunk.text
    }
    const parsed = parsePolishOutput(text)
    return { ...parsed, degraded: false, model: selection.model }
  } catch (error: unknown) {
    ctx.logger.warn('agent-teams: polish degraded: ' + (error instanceof Error ? error.message : String(error)))
    return { expanded: requirement.slice(0, POLISH_MAX_CHARS), hiddenConditions: [], degraded: true }
  }
}
