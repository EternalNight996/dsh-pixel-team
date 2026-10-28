import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
/** Blocking clarification form (module 1) with AI-proposed, requirement-specific options. */
import css from './ClarifySheet.module.css';
import { ACCESSORY_CANDIDATES, CAMERA_CANDIDATES, LIGHT_CANDIDATES } from "../clarify-hardware.js";
import { CLARIFY_PLATFORMS, CLARIFY_SCALES, CLARIFY_UI_STYLES } from "../clarify.js";
import { getModeSpec } from "../modes.js";
export const DEFAULT_CLARIFY_DRAFT = {
    type: 'software',
    scale: 'small',
    ui: { reference: '', styles: [], notes: '' },
    platforms: [],
    hardwareList: [],
    excluded: [],
    excludedCustom: '',
    acceptanceText: '',
    constraintsText: '',
    platformsCustom: '',
    stylesCustom: '',
    hardwareCustom: '',
    memoryHintsText: '',
};
/** Static menu for the current mode, used only when the model route is unavailable. */
export function fallbackOptionsFor(mode) {
    const spec = getModeSpec(mode);
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
    };
}
const SCALE_KEYS = {
    small: 'clarify.scaleSmall',
    medium: 'clarify.scaleMedium',
    fullstack: 'clarify.scaleFullstack',
};
/** Split a textarea into trimmed non-empty lines. */
export function linesOf(text) {
    return text.split(/\r?\n/).map(line => line.trim()).filter(line => line !== '');
}
function splitCommas(text) {
    return text.split(/[,，]/).map(item => item.trim()).filter(item => item !== '');
}
function mergeLists(...lists) {
    const seen = new Set();
    const out = [];
    for (const list of lists) {
        for (const item of list) {
            if (item === '' || seen.has(item))
                continue;
            seen.add(item);
            out.push(item);
        }
    }
    return out;
}
function appendLine(text, line) {
    const lines = linesOf(text);
    if (!lines.includes(line))
        lines.push(line);
    return lines.join('\n');
}
/** Convert the draft into the clarification payload the host validates. */
export function clarificationPayload(draft) {
    return {
        type: draft.type,
        scale: draft.scale,
        ui: {
            ...draft.ui.reference.trim() === '' ? {} : { reference: draft.ui.reference },
            styles: mergeLists(draft.ui.styles, linesOf(draft.stylesCustom)),
            ...draft.ui.notes.trim() === '' ? {} : { notes: draft.ui.notes },
        },
        platforms: mergeLists(draft.platforms, linesOf(draft.platformsCustom)),
        hardwareList: mergeLists(draft.hardwareList, linesOf(draft.hardwareCustom)),
        constraints: linesOf(draft.constraintsText),
        excluded: mergeLists(draft.excluded, linesOf(draft.excludedCustom)),
        acceptance: linesOf(draft.acceptanceText),
        memoryHints: splitCommas(draft.memoryHintsText),
    };
}
function toggle(list, value) {
    return list.includes(value) ? list.filter(item => item !== value) : [...list, value];
}
export function ClarifySheet({ value, onChange, options, state, mode, disabled, t }) {
    const lists = options ?? fallbackOptionsFor(mode);
    const modeSpec = getModeSpec(mode);
    const patch = (next) => { onChange({ ...value, ...next }); };
    const status = state === 'loading'
        ? t('clarify.aiLoading')
        : state === 'fallback'
            ? t('clarify.aiFallback')
            : t('clarify.aiOptions');
    return (_jsxs("div", { className: css.root, "data-step": "clarify", children: [_jsxs("p", { className: css.modeBadge, style: { color: modeSpec.color, borderColor: modeSpec.color }, children: [modeSpec.emoji, " ", t(modeSpec.labelKey)] }), _jsx("p", { className: css.aiNote, "data-state": state, children: status }), _jsx("p", { className: css.confirmHint, children: t('clarify.confirmHint') }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.type') }), _jsx("div", { className: css.chips, children: ['hardware', 'software'].map(type => (_jsx("button", { type: "button", className: css.chip, "data-active": value.type === type || undefined, disabled: disabled, onClick: () => { patch({ type }); }, children: type === 'hardware' ? t('clarify.hardwareDev') : t('clarify.softwareDev') }, type))) })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.scale') }), _jsx("div", { className: css.scales, children: CLARIFY_SCALES.map(scale => (_jsx("button", { type: "button", className: css.scale, "data-active": value.scale === scale || undefined, disabled: disabled, onClick: () => { patch({ scale }); }, children: t(SCALE_KEYS[scale]) }, scale))) })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.ui') }), _jsx("div", { className: css.chips, children: lists.ui.references.map(reference => (_jsx("button", { type: "button", className: css.chip, "data-active": value.ui.reference === reference || undefined, disabled: disabled, onClick: () => { patch({ ui: { ...value.ui, reference } }); }, children: reference }, reference))) }), _jsx("input", { className: css.input, value: value.ui.reference, disabled: disabled, placeholder: t('clarify.referencePlaceholder'), onChange: (event) => { patch({ ui: { ...value.ui, reference: event.target.value } }); } }), _jsx("div", { className: css.chips, children: lists.ui.styles.map(style => (_jsx("button", { type: "button", className: css.chip, "data-active": value.ui.styles.includes(style) || undefined, disabled: disabled, onClick: () => { patch({ ui: { ...value.ui, styles: toggle(value.ui.styles, style) } }); }, children: style }, style))) }), _jsx("input", { className: css.input, value: value.stylesCustom, disabled: disabled, placeholder: t('clarify.customPlaceholder'), onChange: (event) => { patch({ stylesCustom: event.target.value }); } }), _jsx("textarea", { className: css.textarea, rows: 2, value: value.ui.notes, disabled: disabled, placeholder: t('clarify.notesPlaceholder'), onChange: (event) => { patch({ ui: { ...value.ui, notes: event.target.value } }); } })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.platforms') }), _jsx("div", { className: css.chips, children: lists.platforms.map(platform => (_jsx("button", { type: "button", className: css.chip, "data-active": value.platforms.includes(platform) || undefined, disabled: disabled, onClick: () => { patch({ platforms: toggle(value.platforms, platform) }); }, children: platform }, platform))) }), _jsx("input", { className: css.input, value: value.platformsCustom, disabled: disabled, placeholder: t('clarify.customPlaceholder'), onChange: (event) => { patch({ platformsCustom: event.target.value }); } })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.hardware') }), _jsx("div", { className: css.chips, children: lists.hardware.map(item => (_jsx("button", { type: "button", className: css.chip, title: item, "data-active": value.hardwareList.includes(item) || undefined, disabled: disabled, onClick: () => { patch({ hardwareList: toggle(value.hardwareList, item) }); }, children: item }, item))) }), _jsx("input", { className: css.input, value: value.hardwareCustom, disabled: disabled, placeholder: t('clarify.customPlaceholder'), onChange: (event) => { patch({ hardwareCustom: event.target.value }); } }), _jsx("small", { className: css.note, children: t('clarify.hardwareNote') })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.constraints') }), _jsx("div", { className: css.chips, children: lists.constraints.map(item => (_jsx("button", { type: "button", className: css.chip, disabled: disabled, onClick: () => { patch({ constraintsText: appendLine(value.constraintsText, item) }); }, children: item }, item))) }), _jsx("textarea", { className: css.textarea, rows: 2, value: value.constraintsText, disabled: disabled, placeholder: t('clarify.customPlaceholder'), onChange: (event) => { patch({ constraintsText: event.target.value }); } })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.excluded') }), _jsx("div", { className: css.chips, children: lists.excluded.map(item => (_jsx("button", { type: "button", className: css.chip, "data-active": value.excluded.includes(item) || undefined, disabled: disabled, onClick: () => { patch({ excluded: toggle(value.excluded, item) }); }, children: item }, item))) }), _jsx("textarea", { className: css.textarea, rows: 2, value: value.excludedCustom, disabled: disabled, placeholder: t('clarify.excludedPlaceholder'), onChange: (event) => { patch({ excludedCustom: event.target.value }); } })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.acceptance') }), _jsx("div", { className: css.chips, children: lists.acceptance.map(item => (_jsx("button", { type: "button", className: css.chip, disabled: disabled, onClick: () => { patch({ acceptanceText: appendLine(value.acceptanceText, item) }); }, children: item }, item))) }), _jsx("textarea", { className: css.textarea, rows: 3, value: value.acceptanceText, disabled: disabled, placeholder: t('clarify.acceptancePlaceholder'), onChange: (event) => { patch({ acceptanceText: event.target.value }); } })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.memoryHints') }), _jsx("div", { className: css.chips, children: lists.memoryHints.map(item => (_jsx("button", { type: "button", className: css.chip, disabled: disabled, onClick: () => { patch({ memoryHintsText: mergeLists(splitCommas(value.memoryHintsText), [item]).join('，') }); }, children: item }, item))) }), _jsx("input", { className: css.input, value: value.memoryHintsText, disabled: disabled, placeholder: t('clarify.memoryHintsPlaceholder'), onChange: (event) => { patch({ memoryHintsText: event.target.value }); } })] })] }));
}
