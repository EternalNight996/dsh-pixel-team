import { createUserMessage } from '@deepseek-ai/dsh-llm';
import { agentTeamsSource, observedSessionFormatVersion } from "./harness-compat.js";
import { resolveMemberLlmSelection } from "./members.js";
import { CLARIFY_PLATFORMS, CLARIFY_SCALES, CLARIFY_UI_STYLES, DEFAULT_EXCLUDED } from "./clarify.js";
import { ACCESSORY_CANDIDATES, CAMERA_CANDIDATES, LIGHT_CANDIDATES } from "./clarify-hardware.js";
const MAX_OPTIONS = 8;
function stringList(value, max = MAX_OPTIONS) {
    if (!Array.isArray(value))
        return [];
    const seen = new Set();
    const out = [];
    for (const item of value) {
        if (typeof item !== 'string')
            continue;
        const text = item.trim().replace(/^[-*\u2022]\s*/, '');
        if (text === '' || seen.has(text))
            continue;
        seen.add(text);
        out.push(text);
        if (out.length >= max)
            break;
    }
    return out;
}
/** Static menu used only when the model cannot answer. */
export function fallbackClarifyOptions() {
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
        excluded: [...DEFAULT_EXCLUDED],
        acceptance: ['可启动并跑通主流程', '关键路径有自动化测试', '无阻塞性报错'],
        memoryHints: [],
    };
}
export function buildClarifyOptionsPrompts(requirement, workspaceFacts) {
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
    ].join('\n');
    const user = [
        '原始需求：' + requirement.original,
        requirement.expanded.trim() === '' ? '' : '润色后的需求：' + requirement.expanded,
        requirement.conditions.length === 0 ? '' : '用户确认的隐藏条件：' + requirement.conditions.join('；'),
        '',
        '工作区事实（只作上下文，不要原样复述）：',
        workspaceFacts.slice(0, 1500),
    ].filter(line => line !== '').join('\n');
    return { system, user };
}
/** Parse a model reply into options; throws when it is not usable JSON. */
export function parseClarifyOptions(raw) {
    const text = raw.trim();
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start < 0 || end <= start)
        throw new Error('clarify options reply is not JSON');
    const parsed = JSON.parse(text.slice(start, end + 1));
    const ui = typeof parsed.ui === 'object' && parsed.ui !== null ? parsed.ui : {};
    const type = parsed.type === 'hardware' ? 'hardware' : 'software';
    const scale = CLARIFY_SCALES.includes(String(parsed.scale)) ? parsed.scale : 'small';
    const options = {
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
    };
    // A missing section must not empty the form: fall back per section.
    const fallback = fallbackClarifyOptions();
    return {
        ...options,
        platforms: options.platforms.length === 0 ? fallback.platforms : options.platforms,
        acceptance: options.acceptance.length === 0 ? fallback.acceptance : options.acceptance,
        ui: {
            references: options.ui.references.length === 0 ? fallback.ui.references : options.ui.references,
            styles: options.ui.styles.length === 0 ? fallback.ui.styles : options.ui.styles,
            notes: options.ui.notes,
        },
    };
}
/**
 * One-shot option generation. Any failure returns the static fallback so the
 * clarification step always has selectable answers.
 */
export async function generateClarifyOptions(ctx, captain, input, signal) {
    if (input.requirement.original.trim() === '')
        throw new Error('requirement must not be empty');
    const prompts = buildClarifyOptionsPrompts(input.requirement, input.workspaceFacts);
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
            maxTokens: 1400,
            temperature: 0.4,
            ...signal === undefined ? {} : { signal },
        });
        let text = '';
        for await (const chunk of stream) {
            if (chunk.type === 'text-delta')
                text += chunk.text;
        }
        return parseClarifyOptions(text);
    }
    catch (error) {
        ctx.logger.warn('agent-teams: clarify options degraded: ' + (error instanceof Error ? error.message : String(error)));
        return fallbackClarifyOptions();
    }
}
