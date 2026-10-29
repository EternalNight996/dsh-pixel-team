import { createUserMessage } from '@deepseek-ai/dsh-llm';
import { agentTeamsSource, observedSessionFormatVersion } from "./harness-compat.js";
import { resolveMemberLlmSelection } from "./members.js";
import { describeClarification } from "./clarify.js";
import { getModeSpec } from "./modes.js";
import { verifierStrategyText } from "./verifier-script.js";
import { boundaryViolations } from "./project-boundary.js";
const KINDS = ['requirements', 'implementation', 'verification', 'review', 'integration', 'repair'];
const MAX_TASKS = 8;
export function buildPlanPrompt(input) {
    const spec = getModeSpec(input.mode);
    const claims = input.clarification;
    const system = [
        '你是多智能体研发团队的架构师，要根据"真实需求 + 访谈答案 + 开发模式"设计任务 DAG。',
        '只输出 JSON，不要 Markdown，不要解释。',
        '结构：{"tasks":[{"id":"t1","subject":"短标题","description":"具体交付内容（2-4 句，必须引用需求中的领域对象）","role":"角色","kind":"requirements|implementation|verification|review|integration|repair","acceptance":["可验证的验收断言"],"inScope":["src/"],"verify":["pnpm test"],"dependencies":["t1"],"reviewedTaskId":"t2","coverageOf":["访谈条目原文"]}]}。',
        '规则：',
        '1. 3-8 个任务，必须针对这条需求拆分；禁止套用"需求→实现→验证→审查"以外的通用模板措辞，任务标题与描述必须出现需求里的具体对象/功能。',
        '2. 角色只能从可用角色中选择：' + input.roles.map(item => item.role + '(' + item.name + ')').join('、') + '。',
        '3. kind 规则：需求分析=requirements；写代码=implementation（必须给 inScope 与 verify）；跑测试/验证=verification；代码审查=review（必须用 reviewedTaskId 指向被审查的实现任务）；联调=integration；修复=repair（sourceTaskId 反向由 reviewedTaskId 表达）。',
        '4. 依赖必须成 DAG：implementation 依赖 requirements，verification 依赖 implementation，review 依赖 verification，最后至少一个 review 任务。',
        '5. acceptance 是可执行/可验证的具体断言，必须包含模式基线：' + spec.acceptanceDefaults.join('；') + '。',
        '6. 禁止边界（写入相关任务描述或验收）：' + spec.defaultExcluded.join('；') + '。',
        '7. 开发模式：' + spec.emoji + ' ' + spec.name + '。' + spec.philosophy + ' 验证策略：' + verifierStrategyText(input.mode),
        '8. 禁止编造用户没说的功能；不确定的写进 description 的风险/假设，不要加任务。',
        '9. 产物根目录固定为 ' + input.projectRoot + '；所有 inScope 必须写在该目录内，禁止写 workspace 根或其他目录。',
        '10. 禁止修改平台/其他插件文件，以下路径只读（除非用户明确要求改造插件本身）：' + input.forbiddenPaths.join('、') + '。',
        '11. 产物可独立运行时，verify 只针对 ' + input.projectRoot + ' 内的文件；不要用平台仓库的构建命令冒充产物验证。',
        '12. 每个 implementation/verification/review 任务尽量用 coverageOf 列出它覆盖的访谈约束/验收条目，必须与用户访谈条目逐字一致；无法对应时省略，不要编造。',
    ].join('\n');
    const user = [
        '任务目标：' + input.goal,
        '',
        '访谈确认的需求：',
        describeClarification(claims),
        '',
        '用户访谈约束（由问题与选择整理，必须体现在任务里）：',
        claims.constraints.length === 0 ? '（无）' : claims.constraints.join('；'),
        '',
        '工作区事实：' + input.workspaceFacts.slice(0, 1200),
    ].join('\n');
    return { system, user };
}
function isAcyclic(ids, deps) {
    const state = new Map();
    const visit = (id) => {
        const current = state.get(id);
        if (current === 1)
            return false;
        if (current === 2)
            return true;
        state.set(id, 1);
        for (const dep of deps.get(id) ?? []) {
            if (!deps.has(dep))
                return false;
            if (!visit(dep))
                return false;
        }
        state.set(id, 2);
        return true;
    };
    return ids.every(id => visit(id));
}
/** Parse + validate the model plan; undefined means "fall back to the template". */
export function parsePlanSpecs(raw, roles, projectRoot, forbiddenPaths = []) {
    let parsed;
    try {
        const text = raw.trim();
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start < 0 || end <= start)
            return undefined;
        parsed = JSON.parse(text.slice(start, end + 1));
    }
    catch {
        return undefined;
    }
    const tasksRaw = typeof parsed === 'object' && parsed !== null ? parsed.tasks : undefined;
    if (!Array.isArray(tasksRaw) || tasksRaw.length === 0 || tasksRaw.length > MAX_TASKS)
        return undefined;
    const specs = [];
    const ids = new Set();
    for (const [index, item] of tasksRaw.entries()) {
        if (typeof item !== 'object' || item === null)
            return undefined;
        const record = item;
        const id = typeof record.id === 'string' && record.id.trim() !== '' ? record.id.trim() : 't' + (index + 1);
        if (ids.has(id))
            return undefined;
        const subject = typeof record.subject === 'string' ? record.subject.trim() : '';
        const description = typeof record.description === 'string' ? record.description.trim() : '';
        if (subject === '' || description === '')
            return undefined;
        const role = typeof record.role === 'string' && roles.includes(record.role) ? record.role : roles[0];
        if (role === undefined)
            return undefined;
        const kind = typeof record.kind === 'string' && KINDS.includes(record.kind) ? record.kind : undefined;
        const acceptance = Array.isArray(record.acceptance)
            ? record.acceptance.filter((value) => typeof value === 'string').map(value => value.trim()).filter(value => value !== '')
            : [];
        const inScope = Array.isArray(record.inScope)
            ? record.inScope.filter((value) => typeof value === 'string').map(value => value.trim()).filter(value => value !== '')
            : undefined;
        const verify = Array.isArray(record.verify)
            ? record.verify.filter((value) => typeof value === 'string').map(value => value.trim()).filter(value => value !== '')
            : undefined;
        const dependencies = Array.isArray(record.dependencies)
            ? record.dependencies.filter((value) => typeof value === 'string').map(value => value.trim()).filter(value => value !== '')
            : [];
        const reviewedTaskId = typeof record.reviewedTaskId === 'string' && record.reviewedTaskId.trim() !== '' ? record.reviewedTaskId.trim() : undefined;
        const coverageOf = Array.isArray(record.coverageOf)
            ? record.coverageOf.filter((value) => typeof value === 'string').map(value => value.trim()).filter(value => value !== '')
            : undefined;
        ids.add(id);
        specs.push({ id, subject: subject.slice(0, 80), description, role, ...kind === undefined ? {} : { kind }, acceptance, ...inScope === undefined || inScope.length === 0 ? {} : { inScope }, ...verify === undefined || verify.length === 0 ? {} : { verify }, dependencies, ...reviewedTaskId === undefined ? {} : { reviewedTaskId }, ...coverageOf === undefined || coverageOf.length === 0 ? {} : { coverageOf } });
    }
    // Quality contract minimum: every contract task needs acceptance; review must
    // judge an existing task; the graph must be a DAG.
    const byId = new Map(specs.map(spec => [spec.id, spec]));
    let hasReview = false;
    let hasImplementation = false;
    for (const spec of specs) {
        if (spec.dependencies.includes(spec.id))
            return undefined;
        if (spec.kind === 'implementation' || spec.kind === 'repair') {
            if (spec.acceptance.length === 0)
                return undefined;
            hasImplementation = true;
        }
        if (spec.kind === 'verification' || spec.kind === 'integration' || spec.kind === 'review') {
            if (spec.acceptance.length === 0)
                return undefined;
        }
        if (spec.kind === 'review') {
            if (spec.reviewedTaskId === undefined || !byId.has(spec.reviewedTaskId))
                return undefined;
            hasReview = true;
        }
    }
    if (!hasImplementation || !hasReview)
        return undefined;
    const deps = new Map(specs.map(spec => [spec.id, spec.dependencies]));
    if (!isAcyclic(specs.map(spec => spec.id), deps))
        return undefined;
    if (projectRoot !== undefined) {
        for (const spec of specs) {
            if (spec.inScope !== undefined) {
                if (boundaryViolations(spec.inScope, projectRoot, forbiddenPaths).length > 0)
                    return undefined;
            }
            else if (spec.kind === 'implementation' || spec.kind === 'repair') {
                spec.inScope = [projectRoot];
            }
        }
    }
    return specs;
}
/** At least one task title/description must mention a goal token. */
export function planLooksRelevant(specs, goal, constraints) {
    const tokens = (goal + ' ' + constraints.join(' '))
        .replace(/[\s，。；、,:;!?（）()【】\[\]"'`]/g, ' ')
        .split(' ')
        .map(token => token.trim())
        .filter(token => token.length >= 2);
    if (tokens.length === 0)
        return true;
    const haystack = specs.map(spec => spec.subject + ' ' + spec.description).join(' ');
    return tokens.some(token => haystack.includes(token));
}
export async function generatePlanSpecs(ctx, captain, input, signal) {
    const prompts = buildPlanPrompt(input);
    try {
        const selection = await resolveMemberLlmSelection(ctx, captain, {}, signal);
        const stream = ctx.llm.stream({
            provider: selection.provider,
            model: selection.model,
            system: prompts.system,
            messages: [createUserMessage({
                    content: [{ type: 'text', text: prompts.user }],
                    source: agentTeamsSource({ kind: 'agent-teams' }, observedSessionFormatVersion(captain)),
                })],
            maxTokens: 4500,
            temperature: 0.3,
            ...signal === undefined ? {} : { signal },
        });
        let text = '';
        for await (const chunk of stream)
            if (chunk.type === 'text-delta')
                text += chunk.text;
        const specs = parsePlanSpecs(text, input.roles.map(item => item.role), input.projectRoot, input.forbiddenPaths);
        if (specs === undefined)
            return { error: '模型返回的计划未通过校验（缺 review/依赖环/契约不全/越界）' };
        if (!planLooksRelevant(specs, input.goal, input.clarification.constraints)) {
            return { error: '模型生成的计划与目标/访谈缺乏关联' };
        }
        return { specs };
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        ctx.logger.warn('agent-teams: plan generation degraded: ' + message);
        return { error: message };
    }
}
