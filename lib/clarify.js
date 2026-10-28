import { DEFAULT_MODE, getModeSpec, isTeamMode, modeLabel } from "./modes.js";
export const CLARIFY_SCALES = ['small', 'medium', 'fullstack'];
export const CLARIFY_PLATFORMS = ['Windows', 'Linux (UOS/麒麟)', 'macOS', 'Android', 'iOS'];
export const CLARIFY_UI_STYLES = ['工业极简', '桌面端传统', '移动端触控优先', '科技感大屏'];
export const CLARIFY_UI_REFERENCES = ['指定项目/网站', '沿用上次记忆项目', '无参照'];
export const DEFAULT_EXCLUDED = ['不改 MES 接口', '不升级操作系统', '不引入云服务'];
const SCALE_LABEL = {
    small: '🟢 小改动/单点突破（1-3 天）',
    medium: '🟡 多模块联动（1-2 周）',
    fullstack: '🔴 全栈重写（按月）',
};
const TYPE_LABEL = {
    hardware: '软硬开发',
    software: '纯软件开发',
};
function stringArray(value, field) {
    if (!Array.isArray(value))
        throw new Error(field + ' must be an array');
    return value
        .filter((item) => typeof item === 'string')
        .map(item => item.trim())
        .filter(item => item !== '');
}
function optionalString(value, field) {
    if (value === undefined || value === null)
        return undefined;
    if (typeof value !== 'string')
        throw new Error(field + ' must be a string');
    const trimmed = value.trim();
    return trimmed === '' ? undefined : trimmed;
}
/** Validate and normalize one clarification payload from the UI or a tool call. */
export function normalizeClarification(value) {
    if (typeof value !== 'object' || value === null)
        throw new Error('clarification must be an object');
    const raw = value;
    // Legacy payloads have no mode: precision is the safe default.
    const mode = isTeamMode(raw['mode']) ? raw['mode'] : DEFAULT_MODE;
    const type = raw['type'];
    if (type !== 'hardware' && type !== 'software')
        throw new Error('clarification.type must be "hardware" or "software"');
    const scale = raw['scale'];
    if (scale !== 'small' && scale !== 'medium' && scale !== 'fullstack') {
        throw new Error('clarification.scale must be "small", "medium" or "fullstack"');
    }
    const uiRaw = raw['ui'];
    if (typeof uiRaw !== 'object' || uiRaw === null)
        throw new Error('clarification.ui must be an object');
    const ui = uiRaw;
    const styles = stringArray(ui['styles'] ?? [], 'clarification.ui.styles');
    const platforms = stringArray(raw['platforms'] ?? [], 'clarification.platforms');
    if (platforms.length === 0)
        throw new Error('clarification.platforms must select at least one platform');
    const acceptance = stringArray(raw['acceptance'] ?? [], 'clarification.acceptance');
    if (acceptance.length === 0)
        throw new Error('clarification.acceptance must contain at least one executable criterion');
    const constraints = stringArray(raw['constraints'] ?? [], 'clarification.constraints');
    const excluded = stringArray(raw['excluded'] ?? [], 'clarification.excluded');
    const hardwareList = stringArray(raw['hardwareList'] ?? [], 'clarification.hardwareList');
    const memoryHints = stringArray(raw['memoryHints'] ?? [], 'clarification.memoryHints');
    const modeSpec = getModeSpec(mode);
    const excludedMerged = excluded.length > 0 ? excluded : [...modeSpec.defaultExcluded];
    return {
        type,
        scale,
        mode,
        ui: {
            ...optionalString(ui['reference'], 'clarification.ui.reference') === undefined
                ? {}
                : { reference: optionalString(ui['reference'], 'clarification.ui.reference') },
            styles,
            ...optionalString(ui['notes'], 'clarification.ui.notes') === undefined
                ? {}
                : { notes: optionalString(ui['notes'], 'clarification.ui.notes') },
        },
        platforms,
        hardwareList,
        constraints,
        excluded: excludedMerged,
        acceptance,
        memoryHints,
    };
}
/** True when a stored or incoming clarification can gate a DAG. */
export function isClarificationComplete(value) {
    return value !== undefined
        && value.platforms.length > 0
        && value.acceptance.length > 0
        && value.ui !== undefined;
}
/** Render the fixed seven-section clarification form the user confirmed. */
export function describeClarification(clarification) {
    const lines = [];
    lines.push('【开发模式】' + modeLabel(clarification.mode) + ' ' + getModeSpec(clarification.mode).name);
    lines.push('【类型】' + TYPE_LABEL[clarification.type]);
    lines.push('【项目规模】' + SCALE_LABEL[clarification.scale]);
    const reference = clarification.ui.reference === undefined ? '无参照' : clarification.ui.reference;
    const styles = clarification.ui.styles.length === 0 ? '未选' : clarification.ui.styles.join(' / ');
    lines.push('【UI设计】参照物：' + reference + '；风格：' + styles
        + (clarification.ui.notes === undefined ? '' : '；补充：' + clarification.ui.notes));
    lines.push('【目标平台】' + clarification.platforms.join(' / '));
    lines.push('【硬件清单】' + (clarification.hardwareList.length === 0 ? '无（纯软件）' : clarification.hardwareList.join('；')));
    lines.push('【禁止边界】' + clarification.excluded.join('；'));
    lines.push('【验收断言】' + clarification.acceptance.join('；'));
    return lines.join('\n');
}
