/**
 * Server-side quick-start plans for the click-to-dispatch entry.
 *
 * The Web dialog collects a goal plus an optional template and roster; this
 * module turns that into the same staged plan shape the captain tool accepts,
 * so the host never invents a second team model.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { TaskKind } from './types.ts'

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
      { id: 'review', subject: '审查结论', role: 'reviewer', description: '核对每条结论是否都有证据支撑。', dependencies: ['synth'] },
    ],
  },
  {
    id: 'build',
    label: '构建发布',
    roles: ['implementer', 'verifier', 'operator'],
    tasks: [
      { id: 'impl', subject: '整备待发布改动', role: 'implementer', description: '收敛待发布改动，确认无未完成或冲突项。' },
      { id: 'verify', subject: '发布前验证', role: 'verifier', description: '跑通构建与测试，记录版本与产物指纹。', dependencies: ['impl'] },
      { id: 'release', subject: '打包发布', role: 'operator', description: '构建产物、打标签、输出发布说明与回滚方案。', dependencies: ['verify'] },
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
      { id: 'review', subject: '审阅', role: 'reviewer', description: '核对事实、命令可跑与表述一致。', dependencies: ['draft'] },
    ],
  },
  {
    id: 'fullstack',
    label: '全栈开发',
    roles: ['integrator', 'frontend', 'backend', 'verifier', 'reviewer'],
    tasks: [
      { id: 'contract', subject: '定契约与边界', role: 'integrator', description: '先定 API/数据结构/UI 契约与非目标，明确前后端各自可写范围。产出契约文档或类型定义，作为前后端共同输入。', expected: '契约文件（端点/类型/错误码/字段所有权）+ 明确非目标。' },
      { id: 'frontend', subject: '实现前端', role: 'frontend', description: '按契约实现界面：loading/empty/error、键盘/可访问性、320/768/1280 响应式；附浏览器证据。', expected: '可运行 UI + 截图/控制台证据路径 + 契约缺口。', dependencies: ['contract'] },
      { id: 'backend', subject: '实现后端', role: 'backend', description: '按契约实现 API/数据：迁移+回滚、校验、鉴权、幂等、结构化错误与集成测试；发布契约变更。', expected: '迁移/回滚 + 集成测试 + 契约变更路径。', dependencies: ['contract'] },
      { id: 'integrate', subject: '联调与契约对齐', role: 'integrator', description: '对齐前后端字段/类型/错误码，跑端到端 smoke，记录契约差异与残余风险。', expected: '端到端 smoke 命令与结果 + 契约差异清单。', dependencies: ['frontend', 'backend'] },
      { id: 'verify', subject: '验证全链路', role: 'verifier', description: '跑测试与浏览器 smoke，按风险矩阵覆盖正常/边界/错误/鉴权/回归，记录命令与证据。', expected: '风险矩阵 + 命令/预期/实际。', dependencies: ['integrate'] },
      { id: 'review', subject: '审查交付', role: 'reviewer', description: '对照验收与契约审查正确性、范围、安全、性能与可访问性；证据不足则失败。', expected: 'findings（文件/行/修复）+ verdict。', dependencies: ['verify'] },
    ],
  },
  {
    id: 'hardening',
    label: '安全加固',
    roles: ['auditor', 'security', 'verifier', 'reviewer'],
    tasks: [
      { id: 'audit', subject: '威胁建模与只读审计', role: 'auditor', description: '只读检查鉴权、输入、密钥、依赖与注入/XSS/CSRF 面，给出按严重度排序的发现。', expected: '威胁模型 + findings（复现步骤/影响/建议）。' },
      { id: 'fix', subject: '最小修复', role: 'security', description: '先复现确认问题，再做最小修复并补回归测试；不扩大功能范围。', expected: '每项修复的复现/修复/测试证据 + 残余风险。', dependencies: ['audit'] },
      { id: 'verify', subject: '验证修复', role: 'verifier', description: '复跑利用路径与回归，确认问题消失且无新增失败。', expected: '修复前后命令/结果对比 + 回归矩阵。', dependencies: ['fix'] },
      { id: 'review', subject: '安全审查', role: 'reviewer', description: '审查修复正确性、残余风险与是否引入新攻击面；证据不足则失败。', expected: 'findings + verdict + 残余风险。', dependencies: ['verify'] },
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
      { id: 'review', subject: '裁断', role: 'reviewer', description: '判断论据强度与推荐是否成立。', dependencies: ['synth'] },
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

function shortGoal(goal: string, max: number): string {
  const flat = goal.replace(/\s+/g, ' ').trim()
  return flat.length <= max ? flat : `${flat.slice(0, Math.max(1, max - 1))}…`
}

/** Delivery defaults inferred from the actual workspace for quality templates. */
export interface QuickStartDelivery {
  inScope: string[]
  verify: string[]
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
  return { inScope, verify }
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
  const tasks = template.tasks.map((task, index) => {
    const kind = task.kind
    const needsScope = kind === 'implementation' || kind === 'repair'
    const needsVerify = needsScope || kind === 'verification' || kind === 'integration'
    return {
      id: task.id,
      subject: `${task.subject}：${shortGoal(goal, 40)}`,
      description: `${task.description}${task.expected === undefined ? '' : `\n\n交付/验收：${task.expected}`}\n\n目标：${goal}`,
      assignee: ROLE_NAMES[roles.includes(task.role) ? task.role : roles[index % roles.length] as string] ?? (roles.includes(task.role) ? task.role : roles[index % roles.length] as string),
      dependencies: [...(task.dependencies ?? [])],
      ...kind === undefined ? {} : { kind },
      ...kind === undefined ? {} : { objective: task.objective ?? `${task.subject}：${goal}` },
      ...kind === undefined ? {} : { acceptance: [...(task.acceptance ?? ['目标达成', '证据已记录'])] },
      ...needsScope ? { inScope: [...(task.inScope ?? inScope)] } : {},
      ...needsVerify ? { verify: [...(task.verify ?? verify)] } : {},
      ...task.reviewedTaskId === undefined ? {} : { reviewedTaskId: task.reviewedTaskId },
      ...kind === undefined ? {} : { coverageOf: [...(task.coverageOf ?? [goal])] },
    }
  })
  return { teamName: `${SECT_NAMES[template.id] ?? '修仙宗'}·${stamp.slice(8)}`, template: template.id, members, tasks }
}
