/**
 * Development modes: one source of truth for philosophy, default boundaries,
 * acceptance, verifier strategy, failure limits and budget.
 *
 * Every module reads this table instead of scattering mode branches.
 */
export const TEAM_MODES = ['draft', 'precision', 'legacy', 'compliance', 'monetize'] as const
export type TeamMode = typeof TEAM_MODES[number]

export const DEFAULT_MODE: TeamMode = 'precision'

export type VerifierStrategy = 'smoke' | 'unit-network' | 'legacy-regression' | 'compliance-audit'

export interface ModeSpec {
  readonly id: TeamMode
  readonly labelKey: string
  /** Server-side Chinese name (prompts/constitution). */
  readonly name: string
  readonly emoji: string
  readonly color: string
  /** Injected at the very front of every member System Prompt. */
  readonly philosophy: string
  readonly defaultExcluded: readonly string[]
  readonly acceptanceDefaults: readonly string[]
  readonly verifier: {
    readonly strategy: VerifierStrategy
    readonly failLimit: number
    /** Legacy: a failing old regression suite blocks immediately. */
    readonly blockOnOldTestFail: boolean
  }
  readonly budget: {
    readonly perTaskUsd: number
    readonly perDayUsd: number
    /** Retry count at which the UI asks for human triage. */
    readonly retryPromptAt: number
  }
}

export const MODE_SPECS: Record<TeamMode, ModeSpec> = {
  draft: {
    id: 'draft',
    labelKey: 'mode.draft',
    name: '极速草稿',
    emoji: '⚡',
    color: '#6fb6ff',
    philosophy: '你是极速交付工程师：优先让主流程跑通，允许硬编码与临时绕过；非主流程缺陷先记录不阻塞，不引入新依赖。',
    defaultExcluded: ['禁止过度设计', '不写非冒烟测试', '不引入新依赖'],
    acceptanceDefaults: ['主流程跑通', '关键交互可点击'],
    verifier: { strategy: 'smoke', failLimit: 2, blockOnOldTestFail: false },
    budget: { perTaskUsd: 1, perDayUsd: 15, retryPromptAt: 2 },
  },
  precision: {
    id: 'precision',
    labelKey: 'mode.precision',
    name: '工业精工',
    emoji: '🏭',
    color: '#f2c14e',
    philosophy: '你是工业级交付工程师：任何外部调用必须有超时、重试与异常捕获；禁止吞异常、禁止硬编码绕过；必须自证断网/重启后的行为。',
    defaultExcluded: ['禁止吞异常', '禁止硬编码绕过', '禁止跳过失败用例'],
    acceptanceDefaults: ['断网自动重连', '72h 连续运行无崩溃', '异常路径有捕获', '无内存泄漏'],
    verifier: { strategy: 'unit-network', failLimit: 3, blockOnOldTestFail: false },
    budget: { perTaskUsd: 3, perDayUsd: 50, retryPromptAt: 3 },
  },
  legacy: {
    id: 'legacy',
    labelKey: 'mode.legacy',
    name: '屎山抢救',
    emoji: '🔧',
    color: '#c79bff',
    philosophy: '你是外科医生：只加不改。禁止重构底层、禁止修改原有接口协议、禁止删除旧测试；任何新代码必须先有旧接口回归测试保护。',
    defaultExcluded: ['禁止重构底层', '禁止修改原有接口协议', '禁止删除旧测试'],
    acceptanceDefaults: ['旧接口回归测试 100% 通过', '新代码单测通过', '对外行为不变'],
    verifier: { strategy: 'legacy-regression', failLimit: 3, blockOnOldTestFail: true },
    budget: { perTaskUsd: 3, perDayUsd: 50, retryPromptAt: 3 },
  },
  compliance: {
    id: 'compliance',
    labelKey: 'mode.compliance',
    name: '严格合规',
    emoji: '🛡️',
    color: '#7fd6a8',
    philosophy: '你是合规审计员：零外部依赖风险；禁止访问公网、禁止打印明文密码/token、禁止引入未经审核的第三方包；所有操作必须可审计。',
    defaultExcluded: ['禁止访问公网', '禁止打印明文密码', '禁止引入未审核第三方包'],
    acceptanceDefaults: ['无新增未审核依赖', '日志无明文 password/token', '操作审计已开启'],
    verifier: { strategy: 'compliance-audit', failLimit: 3, blockOnOldTestFail: false },
    budget: { perTaskUsd: 3, perDayUsd: 50, retryPromptAt: 3 },
  },
  monetize: {
    id: 'monetize',
    labelKey: 'mode.monetize',
    name: '交付变现',
    emoji: '💰',
    color: '#ffb86b',
    philosophy: '你是交付变现负责人：UI 优先复用现成华丽模板；核心功能必须接入授权校验；砍掉不直接产生收入的边缘功能。',
    defaultExcluded: ['不加非变现功能', '不引入未授权 SDK', '不做无收益重构'],
    acceptanceDefaults: ['主流程可交互', 'License 校验生效'],
    verifier: { strategy: 'smoke', failLimit: 2, blockOnOldTestFail: false },
    budget: { perTaskUsd: 1, perDayUsd: 15, retryPromptAt: 2 },
  },
}

/** Is this value one of the five modes? */
export function isTeamMode(value: unknown): value is TeamMode {
  return typeof value === 'string' && (TEAM_MODES as readonly string[]).includes(value)
}

/** Resolve a spec; unknown/missing values fall back to precision (old data). */
export function getModeSpec(mode: TeamMode | undefined): ModeSpec {
  return MODE_SPECS[mode !== undefined && isTeamMode(mode) ? mode : DEFAULT_MODE]
}

/** Human label for prompts and the constitution. */
export function modeLabel(mode: TeamMode | undefined): string {
  const spec = getModeSpec(mode)
  return spec.emoji + ' ' + spec.id
}

/** The philosophy block prepended to every member persona. */
export function modePhilosophyText(mode: TeamMode | undefined): string {
  const spec = getModeSpec(mode)
  return [
    '【开发模式：' + spec.emoji + ' ' + spec.id + '】',
    spec.philosophy,
    '禁止边界：' + spec.defaultExcluded.join('；') + '。',
    '验收基线：' + spec.acceptanceDefaults.join('；') + '。',
  ].join('\n')
}
