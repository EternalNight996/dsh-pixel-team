/**
 * AI-generated clarification options (module 1).
 *
 * The seven-section form structure is fixed; every option list is proposed by
 * the model from the user's requirement instead of being a hard-coded menu.
 * The static lists are only the degraded fallback when the model route is down.
 */
import type { Context } from '@deepseek-ai/cordis'
import type { Agent } from '@deepseek-ai/dsh-agent'
import { createUserMessage } from '@deepseek-ai/dsh-llm'
import { agentTeamsSource, observedSessionFormatVersion } from './harness-compat.ts'
import { resolveMemberLlmSelection } from './members.ts'
import { CLARIFY_PLATFORMS, CLARIFY_SCALES, CLARIFY_UI_STYLES } from './clarify.ts'
import { getModeSpec, type TeamMode } from './modes.ts'
import { ACCESSORY_CANDIDATES, CAMERA_CANDIDATES, LIGHT_CANDIDATES } from './clarify-hardware.ts'
import type { ClarifyOptions } from './clarify.ts'
import type { TeamRequirement } from './types.ts'

const MAX_OPTIONS = 8

function stringList(value: unknown, max = MAX_OPTIONS): string[] {
  if (!Array.isArray(value)) return []
  const seen = new Set<string>()
  const out: string[] = []
  for (const item of value) {
    if (typeof item !== 'string') continue
    const text = item.trim().replace(/^[-*\u2022]\s*/, '')
    if (text === '' || seen.has(text)) continue
    seen.add(text)
    out.push(text)
    if (out.length >= max) break
  }
  return out
}

/** Merge mode-mandatory items first, then the model/user list (deduplicated). */
function mergeMandatory(required: readonly string[], provided: readonly string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const item of [...required, ...provided]) {
    const text = item.trim()
    if (text === '' || seen.has(text)) continue
    seen.add(text)
    out.push(text)
  }
  return out
}

/** Static menu used only when the model cannot answer; still mode-shaped. */
export function fallbackClarifyOptions(mode?: TeamMode): ClarifyOptions {
  const spec = getModeSpec(mode)
  return {
    source: 'fallback',
    type: 'software',
    scale: 'small',
    ui: {
      references: ['指定项目/网站', '沿用上次记忆项目', '无参照'],
      styles: [...CLARIFY_UI_STYLES],
      notes: [],
    },
    platforms: [...CLARIFY_PLATFORMS],
    hardware: [...CAMERA_CANDIDATES, ...LIGHT_CANDIDATES, ...ACCESSORY_CANDIDATES].map(item => item.name),
    constraints: [],
    excluded: [...spec.defaultExcluded],
    acceptance: [...spec.acceptanceDefaults],
    memoryHints: [],
  }
}

export function buildClarifyOptionsPrompts(requirement: TeamRequirement, workspaceFacts: string, mode?: TeamMode): { system: string; user: string } {
  const spec = getModeSpec(mode)
  const system = [
    '你是制造业软件项目的资深售前架构师，要根据用户需求生成"开宗澄清"的可选答案。',
    '规则：',
    '1. 只输出 JSON，不要 Markdown，不要解释。',
    '2. 结构：{"type":"hardware|software","scale":"small|medium|fullstack","ui":{"references":string[],"styles":string[],"notes":string[]},"platforms":string[],"hardware":string[],"constraints":string[],"excluded":string[],"acceptance":string[],"memoryHints":string[]}。',
    '3. 所有列表 3-8 条，必须针对"这一条需求"给出具体候选，不能套用通用清单；与本需求无关的项不要给。',
    '4. platforms 只写操作系统/运行环境（Windows、Linux (UOS/麒麟)、macOS、Android、iOS 等，可组合）。',
    '5. hardware 只在 type=hardware 时给具体型号或部件（相机/镜头/光源/工控机/传感器等），并标注关键参数；pure software 可给空数组。',
    '6. acceptance 是可直接执行或验证的验收断言（含时间、精度、稳定性等量化指标），不要写空话。',
    '7. excluded 是本需求明确不该碰的边界，constraints 是必须遵守的限制，memoryHints 是值得从记忆库召回的关键词。',
    '8. 禁止编造用户未提供的事实；不确定的项给保守候选项，不要重复同一条。',
    '9. 当前开发模式：' + spec.emoji + ' ' + spec.name + '。' + spec.philosophy,
    '10. 该模式的验收基线必须出现在 acceptance（可改写措辞但不得缺失）：' + spec.acceptanceDefaults.join('；') + '。',
    '11. 该模式的默认禁止边界必须出现在 excluded（可补充同类项）：' + spec.defaultExcluded.join('；') + '。',
  ].join('\n')
  const user = [
    '原始需求：' + requirement.original,
    requirement.expanded.trim() === '' ? '' : '润色后的需求：' + requirement.expanded,
    requirement.conditions.length === 0 ? '' : '用户确认的隐藏条件：' + requirement.conditions.join('；'),
    '',
    '工作区事实（只作上下文，不要原样复述）：',
    workspaceFacts.slice(0, 1500),
  ].filter(line => line !== '').join('\n')
  return { system, user }
}

/** Parse a model reply into options; throws when it is not usable JSON. */
export function parseClarifyOptions(raw: string, mode?: TeamMode): ClarifyOptions {
  const text = raw.trim()
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start < 0 || end <= start) throw new Error('clarify options reply is not JSON')
  const parsed = JSON.parse(text.slice(start, end + 1)) as Record<string, unknown>
  const ui = typeof parsed.ui === 'object' && parsed.ui !== null ? parsed.ui as Record<string, unknown> : {}
  const type = parsed.type === 'hardware' ? 'hardware' as const : 'software' as const
  const scale = (CLARIFY_SCALES as readonly string[]).includes(String(parsed.scale)) ? parsed.scale as ClarifyOptions['scale'] : 'small' as const
  const options: ClarifyOptions = {
    source: 'ai',
    type,
    scale,
    ui: {
      references: stringList(ui.references, 6),
      styles: stringList(ui.styles, 6),
      notes: stringList(ui.notes, 6),
    },
    platforms: stringList(parsed.platforms),
    hardware: stringList(parsed.hardware),
    constraints: stringList(parsed.constraints),
    excluded: stringList(parsed.excluded),
    acceptance: stringList(parsed.acceptance),
    memoryHints: stringList(parsed.memoryHints),
  }
  // A missing section must not empty the form: fall back per section, and the
  // mode's mandatory boundaries/acceptance are always present.
  const spec = getModeSpec(mode)
  const fallback = fallbackClarifyOptions(mode)
  return {
    ...options,
    platforms: options.platforms.length === 0 ? fallback.platforms : options.platforms,
    acceptance: mergeMandatory(spec.acceptanceDefaults, options.acceptance.length === 0 ? fallback.acceptance : options.acceptance),
    excluded: mergeMandatory(spec.defaultExcluded, options.excluded.length === 0 ? fallback.excluded : options.excluded),
    ui: {
      references: options.ui.references.length === 0 ? fallback.ui.references : options.ui.references,
      styles: options.ui.styles.length === 0 ? fallback.ui.styles : options.ui.styles,
      notes: options.ui.notes,
    },
  }
}

/**
 * One-shot option generation. Any failure returns the static fallback so the
 * clarification step always has selectable answers.
 */
export async function generateClarifyOptions(
  ctx: Context,
  captain: Agent,
  input: { requirement: TeamRequirement; workspaceFacts: string; mode?: TeamMode },
  signal?: AbortSignal,
): Promise<ClarifyOptions> {
  if (input.requirement.original.trim() === '') throw new Error('requirement must not be empty')
  const prompts = buildClarifyOptionsPrompts(input.requirement, input.workspaceFacts, input.mode)
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
    for await (const chunk of stream) {
      if (chunk.type === 'text-delta') text += chunk.text
    }
    return parseClarifyOptions(text, input.mode)
  } catch (error: unknown) {
    ctx.logger.warn('agent-teams: clarify options degraded: ' + (error instanceof Error ? error.message : String(error)))
    return fallbackClarifyOptions(input.mode)
  }
}
