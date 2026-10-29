/**
 * Server-side quick-start plans for the click-to-dispatch entry.
 *
 * The Web dialog collects a goal plus an optional template and roster; this
 * module turns that into the same staged plan shape the captain tool accepts,
 * so the host never invents a second team model.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { TaskKind, TeamClarification, TeamRequirement } from './types.ts'
import { verifierOutputContract, verifierStrategyText } from './verifier-script.ts'
import { getModeSpec, type TeamMode } from './modes.ts'
import type { PlanTaskSpec } from './plan-generator.ts'

/** One built-in template: default roles and a small task DAG. */
export const SECT_NAMES: Record<string, string> = {
  fix: '斗法宗', feat: '开山宗', research: '寻仙宗', audit: '巡查宗',
  build: '炼器宗', array: '布阵宗', docs: '传道宗', debate: '论道宗',
  fullstack: '合道宗', hardening: '镇魔宗',
}

export const ROLE_NAMES: Record<string, string> = {
  planner: '军师', implementer: '剑修', verifier: '丹修', reviewer: '执法长老',
  researcher: '散修', analyst: '推演师', writer: '书记', auditor: '巡查使',
  architect: '阵修', tester: '体修', documenter: '传道长老', operator: '炼器师',
  frontend: '灵绘师', backend: '地脉师', integrator: '合契师', security: '镇魔师',
  // 门派预设新增的 8 个道途：缺了它们，成员名会退化成裸角色 id（demon/poisoner）。
  talisman: '符修', healer: '医修', beastmaster: '驭兽师', puppeteer: '傀儡师',
  musician: '音修', poisoner: '毒修', monk: '佛修', demon: '魔修',
}

export interface QuickStartTemplate {
  readonly id: string
  readonly label: string
  readonly roles: readonly string[]
  readonly tasks: readonly {
    readonly id: string
    readonly subject: string
    readonly role: string
    readonly description: string
    /** Expected artifact/acceptance, appended to the staged task description. */
    readonly expected?: string
    readonly dependencies?: readonly string[]
    /** Quality task kind; omitted means ordinary work. */
    readonly kind?: TaskKind
    readonly objective?: string
    readonly acceptance?: readonly string[]
    readonly inScope?: readonly string[]
    readonly verify?: readonly string[]
    readonly reviewedTaskId?: string
    readonly coverageOf?: readonly string[]
  }[]
}

export const QUICK_START_TEMPLATES: readonly QuickStartTemplate[] = [
  {
    id: 'fix',
    label: '修 Bug',
    roles: ['implementer', 'verifier', 'reviewer'],
    tasks: [
      { id: 'impl', subject: '实现修复', role: 'implementer', kind: 'implementation', description: '复现问题、定位根因并给出最小修复，必要时补测试。', acceptance: ['修复解决目标问题', '声明的验证命令通过'] },
      { id: 'verify', subject: '验证修复', role: 'verifier', kind: 'verification', description: '运行相关测试与回归，确认问题消失且无新增失败。', acceptance: ['声明的验证命令通过', '回归证据已记录'], dependencies: ['impl'] },
      { id: 'review', subject: '审查修复', role: 'reviewer', kind: 'review', reviewedTaskId: 'impl', description: '审查改动的正确性、范围与风险，给出结论。', acceptance: ['实现满足目标', '证据充分且记录残余风险'], dependencies: ['verify'] },
    ],
  },
  {
    id: 'feat',
    label: '新功能',
    roles: ['planner', 'implementer', 'verifier', 'reviewer'],
    tasks: [
      { id: 'req', subject: '明确需求与验收', role: 'planner', kind: 'requirements', description: '把目标拆成可验收的需求条目，列出边界与非目标。', acceptance: ['验收标准可测试', '开放问题已关闭或明确延期'] },
      { id: 'impl', subject: '实现功能', role: 'implementer', kind: 'implementation', description: '按需求实现，保持改动范围可审查。', acceptance: ['实现满足已批准需求', '声明的验证命令通过'], dependencies: ['req'] },
      { id: 'verify', subject: '验证功能', role: 'verifier', kind: 'verification', description: '运行测试并覆盖新增路径，记录证据。', acceptance: ['声明的验证命令通过', '新增路径有覆盖证据'], dependencies: ['impl'] },
      { id: 'review', subject: '审查功能', role: 'reviewer', kind: 'review', reviewedTaskId: 'impl', description: '对照需求逐条验收，指出缺口与风险。', acceptance: ['实现满足已批准需求', '证据充分且记录残余风险'], dependencies: ['verify'] },
    ],
  },
  {
    id: 'research',
    label: '调研',
    roles: ['researcher', 'analyst', 'writer', 'reviewer'],
    tasks: [
      { id: 'r1', subject: '第一条取证线', role: 'researcher', description: '从一手来源收集证据，给出链接与原文摘录。' },
      { id: 'r2', subject: '第二条取证线', role: 'analyst', description: '与第一条不重叠的角度补充证据。' },
      { id: 'r3', subject: '第三条取证线', role: 'writer', description: '补充边界情况与反例。' },
      { id: 'synth', subject: '汇总结论', role: 'analyst', description: '合并三条取证线，标注冲突与不确定性。', dependencies: ['r1', 'r2', 'r3'] },
      { id: 'review', subject: '审查结论', role: 'reviewer', kind: 'review', reviewedTaskId: 'synth', description: '核对每条结论是否都有证据支撑。', acceptance: ['每条结论都有证据支撑', '冲突与不确定性已标注'], dependencies: ['synth'] },
    ],
  },
  {
    id: 'audit',
    label: '巡查',
    roles: ['auditor', 'reviewer'],
    tasks: [
      { id: 'audit', subject: '只读审计', role: 'auditor', description: '只读检查代码、依赖、配置与文档，按严重度逐条记录发现；不改动工作区。', expected: '证据清单（文件/行、复现步骤、影响、建议）。', acceptance: ['每条发现都有可复核证据', '未改动工作区'] },
      { id: 'review', subject: '审查审计结论', role: 'reviewer', kind: 'review', reviewedTaskId: 'audit', description: '核对每条发现的证据与影响判断，证据不足则打回。', acceptance: ['每条结论都有证据支撑', '证据不足项已指出'], dependencies: ['audit'] },
    ],
  },
  {
    id: 'build',
    label: '构建发布',
    roles: ['implementer', 'verifier', 'operator', 'reviewer'],
    tasks: [
      { id: 'impl', subject: '整备待发布改动', role: 'implementer', kind: 'implementation', description: '收敛待发布改动，确认无未完成或冲突项。', acceptance: ['待发布改动已收敛', '声明的验证命令通过'] },
      { id: 'verify', subject: '发布前验证', role: 'verifier', kind: 'verification', description: '跑通构建与测试，记录版本与产物指纹。', acceptance: ['构建与测试通过', '版本与产物指纹已记录'], dependencies: ['impl'] },
      { id: 'release', subject: '打包发布', role: 'operator', kind: 'integration', description: '构建产物、打标签、输出发布说明与回滚方案。', acceptance: ['发布说明与回滚方案已产出', '产物与标签一致'], dependencies: ['verify'] },
      { id: 'review', subject: '发布审查', role: 'reviewer', kind: 'review', reviewedTaskId: 'release', description: '审查发布内容、版本、回滚方案与残余风险。', acceptance: ['发布内容与版本一致', '回滚方案与残余风险已记录'], dependencies: ['release'] },
    ],
  },
  {
    id: 'array',
    label: '架构重构',
    roles: ['architect', 'implementer', 'verifier', 'reviewer'],
    tasks: [
      { id: 'design', subject: '画阵定界', role: 'architect', kind: 'requirements', description: '给出目标结构、边界与迁移步骤，标注风险点。', acceptance: ['边界与迁移步骤可执行', '风险点已显式记录'] },
      { id: 'refactor', subject: '依阵改构', role: 'implementer', kind: 'implementation', description: '按设计小步重构，保持可回退与可审查。', acceptance: ['行为保持不变', '声明的验证命令通过'], dependencies: ['design'] },
      { id: 'verify', subject: '验阵', role: 'verifier', kind: 'verification', description: '验证行为不变与性能不回退，记录证据。', acceptance: ['声明的验证命令通过', '行为与性能证据已记录'], dependencies: ['refactor'] },
      { id: 'review', subject: '审阵', role: 'reviewer', kind: 'review', reviewedTaskId: 'refactor', description: '审查边界、耦合与遗留风险。', acceptance: ['重构满足设计目标', '证据充分且记录遗留风险'], dependencies: ['verify'] },
    ],
  },
  {
    id: 'docs',
    label: '文档传道',
    roles: ['writer', 'documenter', 'reviewer'],
    tasks: [
      { id: 'outline', subject: '列纲', role: 'writer', description: '确定读者、目标与章节结构。' },
      { id: 'draft', subject: '成文', role: 'documenter', description: '按纲撰写，附示例与可运行命令。', dependencies: ['outline'] },
      { id: 'review', subject: '审阅', role: 'reviewer', kind: 'review', reviewedTaskId: 'draft', description: '核对事实、命令可跑与表述一致。', acceptance: ['事实与命令可复核', '表述与目标读者一致'], dependencies: ['draft'] },
    ],
  },
  {
    id: 'fullstack',
    label: '全栈开发',
    roles: ['integrator', 'frontend', 'backend', 'verifier', 'reviewer'],
    tasks: [
      { id: 'contract', subject: '定契约与边界', role: 'integrator', kind: 'requirements', description: '先定 API/数据结构/UI 契约与非目标，明确前后端各自可写范围。产出契约文档或类型定义，作为前后端共同输入。', expected: '契约文件（端点/类型/错误码/字段所有权）+ 明确非目标。', acceptance: ['端点/类型/错误码/字段所有权可执行', '非目标与前后端可写范围已明确'] },
      { id: 'frontend', subject: '实现前端', role: 'frontend', kind: 'implementation', description: '按契约实现界面：loading/empty/error、键盘/可访问性、320/768/1280 响应式；附浏览器证据。', expected: '可运行 UI + 截图/控制台证据路径 + 契约缺口。', acceptance: ['前端实现满足契约', '声明的验证命令通过'], dependencies: ['contract'] },
      { id: 'backend', subject: '实现后端', role: 'backend', kind: 'implementation', description: '按契约实现 API/数据：迁移+回滚、校验、鉴权、幂等、结构化错误与集成测试；发布契约变更。', expected: '迁移/回滚 + 集成测试 + 契约变更路径。', acceptance: ['后端实现满足契约', '声明的验证命令通过'], dependencies: ['contract'] },
      { id: 'integrate', subject: '联调与契约对齐', role: 'integrator', kind: 'integration', description: '对齐前后端字段/类型/错误码，跑端到端 smoke，记录契约差异与残余风险。', expected: '端到端 smoke 命令与结果 + 契约差异清单。', acceptance: ['前后端契约一致', '端到端 smoke 通过并记录残余风险'], dependencies: ['frontend', 'backend'] },
      { id: 'verify', subject: '验证全链路', role: 'verifier', kind: 'verification', description: '跑测试与浏览器 smoke，按风险矩阵覆盖正常/边界/错误/鉴权/回归，记录命令与证据。', expected: '风险矩阵 + 命令/预期/实际。', acceptance: ['声明的验证命令通过', '风险矩阵覆盖正常/边界/错误/鉴权'], dependencies: ['integrate'] },
      { id: 'review', subject: '审查交付', role: 'reviewer', kind: 'review', reviewedTaskId: 'integrate', description: '对照验收与契约审查正确性、范围、安全、性能与可访问性；证据不足则失败。', expected: 'findings（文件/行/修复）+ verdict。', acceptance: ['实现满足契约与验收', '证据充分且记录残余风险'], dependencies: ['verify'] },
    ],
  },
  {
    id: 'hardening',
    label: '安全加固',
    roles: ['auditor', 'security', 'verifier', 'reviewer'],
    tasks: [
      { id: 'audit', subject: '威胁建模与只读审计', role: 'auditor', kind: 'requirements', description: '只读检查鉴权、输入、密钥、依赖与注入/XSS/CSRF 面，给出按严重度排序的发现。', expected: '威胁模型 + findings（复现步骤/影响/建议）。', acceptance: ['威胁模型与攻击面已列出', '发现按严重度排序并含复现/影响/建议'] },
      { id: 'fix', subject: '最小修复', role: 'security', kind: 'implementation', description: '先复现确认问题，再做最小修复并补回归测试；不扩大功能范围。', expected: '每项修复的复现/修复/测试证据 + 残余风险。', acceptance: ['修复解决审计发现', '声明的验证命令通过'], dependencies: ['audit'] },
      { id: 'verify', subject: '验证修复', role: 'verifier', kind: 'verification', description: '复跑利用路径与回归，确认问题消失且无新增失败。', expected: '修复前后命令/结果对比 + 回归矩阵。', acceptance: ['利用路径不再复现', '回归矩阵通过'], dependencies: ['fix'] },
      { id: 'review', subject: '安全审查', role: 'reviewer', kind: 'review', reviewedTaskId: 'fix', description: '审查修复正确性、残余风险与是否引入新攻击面；证据不足则失败。', expected: 'findings + verdict + 残余风险。', acceptance: ['修复正确且无新增攻击面', '残余风险已记录'], dependencies: ['verify'] },
    ],
  },
  {
    id: 'debate',
    label: '方案论道',
    roles: ['researcher', 'analyst', 'reviewer'],
    tasks: [
      { id: 'prop', subject: '立论', role: 'researcher', description: '给出方案主张、依据与适用边界。' },
      { id: 'counter', subject: '驳论', role: 'analyst', description: '从反方立场找反例与成本，不重复立论依据。' },
      { id: 'synth', subject: '合论', role: 'analyst', description: '合并正反两方，给出推荐与残余风险。', dependencies: ['prop', 'counter'] },
      { id: 'review', subject: '裁断', role: 'reviewer', kind: 'review', reviewedTaskId: 'synth', description: '判断论据强度与推荐是否成立。', acceptance: ['论据强度足以支撑推荐', '残余不确定性已标注'], dependencies: ['synth'] },
    ],
  },
]

export interface QuickStartPlan {
  readonly teamName: string
  readonly template: string
  readonly members: readonly { name: string; role: string }[]
  readonly tasks: readonly {
    id: string
    subject: string
    description: string
    assignee: string
    dependencies: string[]
    kind?: TaskKind
    objective?: string
    acceptance?: string[]
    inScope?: string[]
    verify?: string[]
    reviewedTaskId?: string
    coverageOf?: string[]
  }[]
}

function templateOf(id: string): QuickStartTemplate {
  return QUICK_START_TEMPLATES.find(template => template.id === id) ?? QUICK_START_TEMPLATES[0] as QuickStartTemplate
}

function contextBlock(delivery?: QuickStartDelivery): string {
  return delivery?.contextText === undefined || delivery.contextText.trim() === ''
    ? ''
    : '\n\n需求上下文：\n' + delivery.contextText.trim()
}

function shortGoal(goal: string, max: number): string {
  const flat = goal.replace(/\s+/g, ' ').trim()
  return flat.length <= max ? flat : `${flat.slice(0, Math.max(1, max - 1))}…`
}

/** Delivery defaults inferred from the actual workspace for quality templates. */
export interface QuickStartDelivery {
  inScope: string[]
  verify: string[]
  /** Prose acceptance criteria from the constitution (merged into gate tasks). */
  acceptance?: string[]
  /** Development mode for the verifier strategy note. */
  mode?: TeamMode
  /** Goal + interview context appended to every task description. */
  contextText?: string
  /** Disjoint frontend/backend roots, when the workspace has recognizable layers. */
  layers?: { frontend: string[]; backend: string[] }
}

const FALLBACK_IN_SCOPE = ['src/', 'lib/', 'app/', 'packages/', 'tests/', 'test/', 'scripts/', 'docs/', 'public/', 'package.json', 'README.md']
const FALLBACK_VERIFY = ['git diff --check']

/**
 * Infer a quality contract from the workspace instead of hardcoding src/ or pnpm test.
 * The same defaults are used by the quick-start route and by tests that build a plan
 * without a workspace (which still get a runnable, conservative contract).
 */
export function quickStartDeliveryDefaults(workspace: string): QuickStartDelivery {
  const dirs = ['src', 'lib', 'app', 'packages', 'tests', 'test', 'scripts', 'docs', 'public', 'assets']
    .filter((name) => existsSync(join(workspace, name)))
  const files = ['package.json', 'README.md', 'README_ZH.md']
    .filter((name) => existsSync(join(workspace, name)))
  const inScope = [...dirs.map((name) => `${name}/`), ...files]
  if (inScope.length === 0) inScope.push('.')

  let verify = [...FALLBACK_VERIFY]
  try {
    const pkg = JSON.parse(readFileSync(join(workspace, 'package.json'), 'utf8')) as { scripts?: Record<string, unknown> }
    const scripts = pkg.scripts ?? {}
    const script = ['test', 'typecheck', 'verify', 'build'].find((name) => typeof scripts[name] === 'string')
    if (script !== undefined) {
      const manager = existsSync(join(workspace, 'pnpm-lock.yaml'))
        ? 'pnpm'
        : existsSync(join(workspace, 'yarn.lock')) ? 'yarn' : 'npm'
      verify = [manager === 'npm' ? `npm run ${script}` : `${manager} ${script}`]
    }
  } catch {
    // No package.json / invalid JSON: the git fallback is still runnable.
  }

  // Full-stack quality needs two genuinely disjoint writable roots. Do not
  // invent them: without them the fullstack template stays ordinary work.
  const frontendDirs = ['web', 'frontend', 'app', 'src/client', 'src/app', 'src/components', 'src/ui', 'public', 'assets', 'apps/web', 'packages/web']
  const backendDirs = ['server', 'backend', 'api', 'src/server', 'src/api', 'src/db', 'migrations', 'prisma', 'apps/api', 'packages/api']
  const frontend = frontendDirs.filter((name) => existsSync(join(workspace, name))).map((name) => `${name}/`)
  const backend = backendDirs.filter((name) => existsSync(join(workspace, name))).map((name) => `${name}/`)
  const disjoint = frontend.every((left) => backend.every((right) => !left.startsWith(right) && !right.startsWith(left)))
  return { inScope, verify, ...frontend.length > 0 && backend.length > 0 && disjoint ? { layers: { frontend, backend } } : {} }
}

/** Build the staged plan a quick-start request turns into. */
export function buildQuickStartPlan(
  goal: string,
  templateId: string,
  requestedRoles?: readonly string[],
  delivery?: QuickStartDelivery,
): QuickStartPlan {
  const template = templateOf(templateId)
  const cleaned = [...new Set((requestedRoles ?? []).map(role => role.trim()).filter(role => role !== ''))]
  const roles = cleaned.length > 0 ? cleaned : [...template.roles]
  const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)
  const members = roles.map(role => ({ name: ROLE_NAMES[role] ?? role, role }))
  const inScope = delivery?.inScope ?? FALLBACK_IN_SCOPE
  const verify = delivery?.verify ?? FALLBACK_VERIFY
  const qualityEnabled = template.id !== 'fullstack' || delivery?.layers !== undefined
  const tasks = template.tasks.map((task, index) => {
    const kind = qualityEnabled || task.kind === 'review' ? task.kind : undefined
    const needsScope = kind === 'implementation' || kind === 'repair'
    const needsVerify = needsScope || kind === 'verification' || kind === 'integration'
    const layerScope = task.role === 'frontend'
      ? delivery?.layers?.frontend
      : task.role === 'backend' ? delivery?.layers?.backend : undefined
    const scoped = task.inScope ?? layerScope ?? inScope
    const extraAcceptance = (kind === 'verification' || kind === 'integration' || kind === 'review')
      ? [...(delivery?.acceptance ?? [])]
      : []
    const contractNote = kind === 'verification'
      ? '\n\n' + verifierOutputContract()
        + '\n\n开发模式（' + getModeSpec(delivery?.mode).name + '）验证策略：' + verifierStrategyText(delivery?.mode)
      : ''
    return {
      id: task.id,
      subject: `${task.subject}：${shortGoal(goal, 40)}`,
      description: `${task.description}${task.expected === undefined ? '' : `\n\n交付/验收：${task.expected}`}\n\n目标：${goal}${contractNote}${contextBlock(delivery)}`,
      assignee: ROLE_NAMES[roles.includes(task.role) ? task.role : roles[index % roles.length] as string] ?? (roles.includes(task.role) ? task.role : roles[index % roles.length] as string),
      dependencies: [...(task.dependencies ?? [])],
      ...kind === undefined ? {} : { kind },
      ...kind === undefined ? {} : { objective: task.objective ?? `${task.subject}：${goal}` },
      ...kind === undefined ? {} : { acceptance: [...(task.acceptance ?? ['目标达成', '证据已记录']), ...extraAcceptance] },
      ...needsScope ? { inScope: [...scoped] } : {},
      ...needsVerify ? { verify: [...(task.verify ?? verify)] } : {},
      ...kind === undefined || task.reviewedTaskId === undefined ? {} : { reviewedTaskId: task.reviewedTaskId },
      ...kind === undefined ? {} : { coverageOf: [...(task.coverageOf ?? [goal])] },
    }
  })
  return { teamName: `${SECT_NAMES[template.id] ?? '修仙宗'}·${stamp.slice(8)}`, template: template.id, members, tasks }
}
/** Order tasks so every dependency is staged before its dependents (stable). */
export function orderQuickStartTasks(tasks: QuickStartPlan['tasks']): QuickStartPlan['tasks'] {
  const byId = new Map(tasks.map(task => [task.id, task]))
  const ordered: QuickStartPlan['tasks'][number][] = []
  const done = new Set<string>()
  const visiting = new Set<string>()
  const visit = (task: QuickStartPlan['tasks'][number]): void => {
    if (done.has(task.id) || visiting.has(task.id)) return
    visiting.add(task.id)
    for (const dependency of task.dependencies) {
      const next = byId.get(dependency)
      if (next !== undefined) visit(next)
    }
    visiting.delete(task.id)
    done.add(task.id)
    ordered.push(task)
  }
  for (const task of tasks) visit(task)
  return ordered
}

/** One create-task call a quick-start plan stages once the team exists. */
export interface QuickStartTaskCall {
  readonly seedId: string
  readonly input: {
    readonly subject: string
    readonly description: string
    readonly assignee: string
    /** Seed ids; the route maps them to durable task ids before calling the tool. */
    readonly dependencies: readonly string[]
    readonly kind?: TaskKind
    readonly objective?: string
    readonly acceptance?: readonly string[]
    readonly inScope?: readonly string[]
    readonly verify?: readonly string[]
    readonly coverageOf?: readonly string[]
    /** Seed id of the implementation this review judges. */
    readonly reviewedTaskId?: string
  }
}

/**
 * The host plan schema only carries ordinary task fields, so quality contracts
 * are staged one create-task call at a time after the team exists.
 */
export function quickStartTaskCalls(plan: QuickStartPlan): QuickStartTaskCall[] {
  return orderQuickStartTasks(plan.tasks).map((task) => ({
    seedId: task.id,
    input: {
      subject: task.subject,
      description: task.description,
      assignee: task.assignee,
      dependencies: [...task.dependencies],
      ...task.kind === undefined ? {} : { kind: task.kind },
      ...task.objective === undefined ? {} : { objective: task.objective },
      ...task.acceptance === undefined ? {} : { acceptance: [...task.acceptance] },
      ...task.inScope === undefined ? {} : { inScope: [...task.inScope] },
      ...task.verify === undefined ? {} : { verify: [...task.verify] },
      ...task.coverageOf === undefined ? {} : { coverageOf: [...task.coverageOf] },
      ...task.reviewedTaskId === undefined ? {} : { reviewedTaskId: task.reviewedTaskId },
    },
  }))
}

/** The host tools a quick-start staging pass needs (injectable for tests). */
export interface QuickStartTool {
  execute?: (args: unknown, exec: unknown) => Promise<unknown>
}

export interface QuickStartTeamTools {
  create: QuickStartTool
  createTask: QuickStartTool
  deleteTeam?: QuickStartTool
}

/**
 * Stage a quick-start team: create the roster first, then add every task with
 * its quality contract. The create tool's plan schema cannot carry quality
 * fields, and a half-staged team would block the next attempt, so a failure
 * after creation rolls the team back before rethrowing.
 */
export interface StageQuickStartOptions {
  /** Confirmed blocking clarification; required by the web route. */
  readonly clarification?: TeamClarification
  /** User-confirmed requirement text (original + optional polish). */
  readonly requirement?: TeamRequirement
}

export async function stageQuickStartTeam(
  plan: QuickStartPlan,
  goal: string,
  run: unknown,
  tools: QuickStartTeamTools,
  options?: StageQuickStartOptions,
): Promise<{ teamId?: string; teamName?: string; phase?: string }> {
  const create = tools.create.execute
  const createTask = tools.createTask.execute
  if (create === undefined || createTask === undefined) throw new Error('team creation tools are unavailable')
  const created = await create({
    name: plan.teamName,
    description: goal,
    approval: 'required',
    plan: { members: plan.members, tasks: [] },
    ...options?.clarification === undefined ? {} : { clarification: options.clarification },
    ...options?.requirement === undefined ? {} : { requirement: options.requirement },
  }, run) as { team_id?: string; team_name?: string; phase?: string }
  try {
    const seedToTaskId = new Map<string, string>()
    const liveIdOf = (seedId: string): string => seedToTaskId.get(seedId) ?? seedId
    for (const call of quickStartTaskCalls(plan)) {
      const staged = await createTask({
        ...call.input,
        dependencies: call.input.dependencies.map(liveIdOf),
        ...call.input.reviewedTaskId === undefined ? {} : { reviewedTaskId: liveIdOf(call.input.reviewedTaskId) },
      }, run) as { task_id?: string }
      if (staged.task_id === undefined) throw new Error('quick-start task "' + call.seedId + '" was not staged')
      seedToTaskId.set(call.seedId, staged.task_id)
    }
  } catch (error) {
    if (created.team_id !== undefined && tools.deleteTeam?.execute !== undefined) {
      try {
        await tools.deleteTeam.execute({}, run)
      } catch {
        // Best effort: the original staging error is what the caller must see.
      }
    }
    throw error
  }
  return { teamId: created.team_id, teamName: created.team_name, phase: created.phase }
}



/** Effective roles for a founding plan (requested, else template defaults). */
export function quickStartRoles(templateId: string, requestedRoles?: readonly string[]): string[] {
  const template = templateOf(templateId)
  const cleaned = [...new Set((requestedRoles ?? []).map(role => role.trim()).filter(role => role !== ''))]
  return cleaned.length > 0 ? cleaned : [...template.roles]
}

/** Build the staged plan from AI-generated task specs instead of the template. */
export function buildPlanFromSpecs(
  goal: string,
  templateId: string,
  requestedRoles: readonly string[] | undefined,
  specs: readonly PlanTaskSpec[],
  delivery?: QuickStartDelivery,
): QuickStartPlan {
  const template = templateOf(templateId)
  const roles = quickStartRoles(templateId, requestedRoles)
  const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)
  const members = roles.map(role => ({ name: ROLE_NAMES[role] ?? role, role }))
  const inScope = delivery?.inScope ?? FALLBACK_IN_SCOPE
  const verify = delivery?.verify ?? FALLBACK_VERIFY
  const tasks = specs.map(spec => {
    const kind = spec.kind
    const needsScope = kind === 'implementation' || kind === 'repair'
    const needsVerify = needsScope || kind === 'verification' || kind === 'integration'
    const extraAcceptance = (kind === 'verification' || kind === 'integration' || kind === 'review')
      ? [...(delivery?.acceptance ?? [])]
      : []
    const contractNote = kind === 'verification'
      ? '\n\n' + verifierOutputContract()
        + '\n\n开发模式（' + getModeSpec(delivery?.mode).name + '）验证策略：' + verifierStrategyText(delivery?.mode)
      : ''
    return {
      id: spec.id,
      subject: spec.subject + '：' + shortGoal(goal, 40),
      description: spec.description + '\n\n目标：' + goal + contractNote + contextBlock(delivery),
      assignee: ROLE_NAMES[spec.role] ?? spec.role,
      dependencies: [...spec.dependencies],
      ...kind === undefined ? {} : { kind },
      ...kind === undefined ? {} : { objective: spec.subject + '：' + goal },
      ...kind === undefined ? {} : { acceptance: [...spec.acceptance, ...extraAcceptance] },
      ...needsScope ? { inScope: [...(spec.inScope ?? inScope)] } : {},
      ...needsVerify ? { verify: [...(spec.verify ?? verify)] } : {},
      ...kind === 'review' && spec.reviewedTaskId !== undefined ? { reviewedTaskId: spec.reviewedTaskId } : {},
      ...kind === undefined ? {} : { coverageOf: [goal] },
    }
  })
  return { teamName: (SECT_NAMES[template.id] ?? '修仙宗') + '·' + stamp.slice(8), template: template.id, members, tasks }
}

/**
 * Map confirmed requirement items onto tasks so the library can show per-item
 * status. Existing AI coverage wins; uncovered items are distributed across
 * gate tasks in order (deterministic, every item covered).
 */
export function assignRequirementCoverage(
  tasks: QuickStartPlan['tasks'],
  requirements: readonly string[],
  goal: string,
): void {
  const gateTasks = tasks.filter(task => task.kind !== undefined)
  if (gateTasks.length === 0 || requirements.length === 0) return
  for (const [index, requirement] of requirements.entries()) {
    if (tasks.some(task => task.coverageOf?.includes(requirement) === true)) continue
    const task = gateTasks[index % gateTasks.length]
    if (task === undefined) continue
    const coverage = task.coverageOf === undefined ? [goal] : [...task.coverageOf]
    if (!coverage.includes(requirement)) coverage.push(requirement)
    task.coverageOf = coverage
  }
}

/** Captain-only plan: drop the roster and route every task to the captain. */
export function soloPlan(plan: QuickStartPlan): QuickStartPlan {
  return {
    ...plan,
    members: [],
    tasks: plan.tasks.map(task => ({ ...task, assignee: 'captain' })),
  }
}
