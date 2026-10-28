import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Blocking clarification form (module 1). Rendered inside the founding wizard. */
import css from './ClarifySheet.module.css';
import { CAMERA_CANDIDATES, LIGHT_CANDIDATES, ACCESSORY_CANDIDATES, } from "../clarify-hardware.js";
import { CLARIFY_PLATFORMS, CLARIFY_SCALES, CLARIFY_UI_STYLES, DEFAULT_EXCLUDED } from "../clarify.js";
export const DEFAULT_CLARIFY_DRAFT = {
    type: 'software',
    scale: 'small',
    ui: { reference: '无参照', styles: [], notes: '' },
    platforms: ['Windows'],
    hardwareList: [],
    excluded: [...DEFAULT_EXCLUDED],
    excludedCustom: '',
    acceptanceText: '',
    memoryHintsText: '',
};
const SCALE_KEYS = {
    small: 'clarify.scaleSmall',
    medium: 'clarify.scaleMedium',
    fullstack: 'clarify.scaleFullstack',
};
/** Split a textarea into trimmed non-empty lines. */
export function linesOf(text) {
    return text.split(/\r?\n/).map(line => line.trim()).filter(line => line !== '');
}
/** Convert the draft into the clarification payload the host validates. */
export function clarificationPayload(draft) {
    const excluded = [...new Set([...draft.excluded, ...linesOf(draft.excludedCustom)])];
    return {
        type: draft.type,
        scale: draft.scale,
        ui: {
            ...draft.ui.reference.trim() === '' ? {} : { reference: draft.ui.reference },
            styles: draft.ui.styles,
            ...draft.ui.notes.trim() === '' ? {} : { notes: draft.ui.notes },
        },
        platforms: draft.platforms,
        hardwareList: draft.hardwareList,
        constraints: [],
        excluded,
        acceptance: linesOf(draft.acceptanceText),
        memoryHints: draft.memoryHintsText.split(/[,，]/).map(item => item.trim()).filter(item => item !== ''),
    };
}
function toggle(list, value) {
    return list.includes(value) ? list.filter(item => item !== value) : [...list, value];
}
export function ClarifySheet({ value, onChange, disabled, t }) {
    const patch = (next) => { onChange({ ...value, ...next }); };
    const hardware = [...CAMERA_CANDIDATES, ...LIGHT_CANDIDATES, ...ACCESSORY_CANDIDATES];
    return (_jsxs("div", { className: css.root, "data-step": "clarify", children: [_jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.type') }), _jsx("div", { className: css.chips, children: ['hardware', 'software'].map(type => (_jsx("button", { type: "button", className: css.chip, "data-active": value.type === type || undefined, disabled: disabled, onClick: () => { patch({ type }); }, children: type === 'hardware' ? t('clarify.hardwareDev') : t('clarify.softwareDev') }, type))) })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.scale') }), _jsx("div", { className: css.scales, children: CLARIFY_SCALES.map(scale => (_jsx("button", { type: "button", className: css.scale, "data-active": value.scale === scale || undefined, disabled: disabled, onClick: () => { patch({ scale }); }, children: t(SCALE_KEYS[scale]) }, scale))) })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.ui') }), _jsx("div", { className: css.chips, children: ['指定项目/网站', '沿用上次记忆项目', '无参照'].map(reference => (_jsx("button", { type: "button", className: css.chip, "data-active": value.ui.reference === reference || undefined, disabled: disabled, onClick: () => { patch({ ui: { ...value.ui, reference } }); }, children: reference }, reference))) }), value.ui.reference !== '无参照' && (_jsx("input", { className: css.input, value: value.ui.reference, disabled: disabled, placeholder: t('clarify.referencePlaceholder'), onChange: (event) => { patch({ ui: { ...value.ui, reference: event.target.value } }); } })), _jsx("div", { className: css.chips, children: CLARIFY_UI_STYLES.map(style => (_jsx("button", { type: "button", className: css.chip, "data-active": value.ui.styles.includes(style) || undefined, disabled: disabled, onClick: () => { patch({ ui: { ...value.ui, styles: toggle(value.ui.styles, style) } }); }, children: style }, style))) }), _jsx("textarea", { className: css.textarea, rows: 2, value: value.ui.notes, disabled: disabled, placeholder: t('clarify.notesPlaceholder'), onChange: (event) => { patch({ ui: { ...value.ui, notes: event.target.value } }); } })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.platforms') }), _jsx("div", { className: css.chips, children: CLARIFY_PLATFORMS.map(platform => (_jsx("button", { type: "button", className: css.chip, "data-active": value.platforms.includes(platform) || undefined, disabled: disabled, onClick: () => { patch({ platforms: toggle(value.platforms, platform) }); }, children: platform }, platform))) })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.hardware') }), _jsx("div", { className: css.chips, children: hardware.map(item => (_jsx("button", { type: "button", className: css.chip, title: item.spec + ' · ' + item.note, "data-active": value.hardwareList.includes(item.name) || undefined, disabled: disabled, onClick: () => { patch({ hardwareList: toggle(value.hardwareList, item.name) }); }, children: item.name }, item.name))) }), _jsx("small", { className: css.note, children: t('clarify.hardwareNote') })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.excluded') }), _jsx("div", { className: css.chips, children: DEFAULT_EXCLUDED.map(item => (_jsx("button", { type: "button", className: css.chip, "data-active": value.excluded.includes(item) || undefined, disabled: disabled, onClick: () => { patch({ excluded: toggle(value.excluded, item) }); }, children: item }, item))) }), _jsx("textarea", { className: css.textarea, rows: 2, value: value.excludedCustom, disabled: disabled, placeholder: t('clarify.excludedPlaceholder'), onChange: (event) => { patch({ excludedCustom: event.target.value }); } })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.acceptance') }), _jsx("textarea", { className: css.textarea, rows: 3, value: value.acceptanceText, disabled: disabled, placeholder: t('clarify.acceptancePlaceholder'), onChange: (event) => { patch({ acceptanceText: event.target.value }); } })] }), _jsxs("section", { className: css.block, children: [_jsx("span", { className: css.label, children: t('clarify.memoryHints') }), _jsx("input", { className: css.input, value: value.memoryHintsText, disabled: disabled, placeholder: t('clarify.memoryHintsPlaceholder'), onChange: (event) => { patch({ memoryHintsText: event.target.value }); } })] })] }));
}
