import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
/** Dynamic AI interview: template-like questions generated from the requirement. */
import { useState } from 'react';
import css from './InterviewSheet.module.css';
import { getModeSpec } from "../modes.js";
export function InterviewSheet({ questions, answers, onChange, state, error, mode, disabled, onRetry, t }) {
    const [custom, setCustom] = useState({});
    const spec = getModeSpec(mode);
    const setAnswer = (id, values) => { onChange({ ...answers, [id]: values }); };
    const toggle = (id, value, multi) => {
        const current = answers[id] ?? [];
        if (multi) {
            setAnswer(id, current.includes(value) ? current.filter(item => item !== value) : [...current, value]);
            return;
        }
        // Single-select options must be deselectable: clicking the active chip clears it.
        setAnswer(id, current.includes(value) ? [] : [value]);
    };
    const addCustom = (id) => {
        const value = (custom[id] ?? '').trim();
        if (value === '')
            return;
        setAnswer(id, [...new Set([...(answers[id] ?? []), value])]);
        setCustom(current => ({ ...current, [id]: '' }));
    };
    return (_jsxs("div", { className: css.root, "data-step": "interview", children: [_jsxs("p", { className: css.modeBadge, style: { color: spec.color, borderColor: spec.color }, children: [spec.emoji, " ", t(spec.labelKey)] }), _jsx("p", { className: css.aiNote, "data-state": state, children: state === 'loading' ? t('interview.loading') : state === 'fallback' ? t('interview.fallback') : t('interview.hint') }), error !== '' && _jsx("p", { className: css.error, role: "alert", children: error }), state === 'loading' && _jsx("p", { className: css.loading, children: t('interview.loadingHint') }), state !== 'loading' && questions.map(question => (_jsxs("section", { className: css.block, children: [_jsxs("span", { className: css.prompt, children: [question.prompt, question.multi ? t('interview.multi') : t('interview.single')] }), _jsxs("div", { className: css.chips, children: [question.options.map(option => (_jsx("button", { type: "button", className: css.chip, "data-active": (answers[question.id] ?? []).includes(option) || undefined, disabled: disabled, onClick: () => { toggle(question.id, option, question.multi); }, children: option }, option))), (answers[question.id] ?? []).filter(value => !question.options.includes(value)).map(value => (_jsxs("button", { type: "button", className: css.chip, "data-active": true, disabled: disabled, onClick: () => { setAnswer(question.id, (answers[question.id] ?? []).filter(item => item !== value)); }, children: [value, " \u00D7"] }, value)))] }), _jsxs("div", { className: css.customRow, children: [_jsx("input", { className: css.input, value: custom[question.id] ?? '', disabled: disabled, placeholder: t('interview.customPlaceholder'), onChange: (event) => { setCustom(current => ({ ...current, [question.id]: event.target.value })); }, onKeyDown: (event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        addCustom(question.id);
                                    }
                                } }), _jsx("button", { type: "button", className: css.addCustom, disabled: disabled || (custom[question.id] ?? '').trim() === '', onClick: () => { addCustom(question.id); }, children: "+" })] })] }, question.id))), state === 'fallback' && (_jsx("button", { type: "button", className: css.retry, disabled: disabled, onClick: onRetry, children: t('interview.retry') }))] }));
}
