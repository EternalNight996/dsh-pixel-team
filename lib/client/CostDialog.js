import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Module 4: soft cost prompt. Continue or terminate this one spawn only. */
import css from './CostDialog.module.css';
import { decideCost, useLibraryState } from "./library-stream.js";
export function CostDialog({ sessionId, t }) {
    const { costPrompt } = useLibraryState(sessionId);
    if (costPrompt === undefined)
        return null;
    const reason = costPrompt.reason === 'task' ? t('cost.task') : t('cost.day');
    return (_jsx("div", { className: css.backdrop, role: "dialog", "aria-modal": "true", "aria-label": t('cost.title'), children: _jsxs("section", { className: css.dialog, children: [_jsx("h3", { className: css.title, children: t('cost.title') }), _jsx("p", { className: css.body, children: t('cost.body', {
                        member: costPrompt.memberName,
                        estimate: costPrompt.estimateUsd.toFixed(4),
                        threshold: costPrompt.thresholdUsd.toFixed(2),
                        reason,
                    }) }), _jsx("p", { className: css.note, children: t('cost.note') }), _jsxs("div", { className: css.actions, children: [_jsx("button", { type: "button", onClick: () => { void decideCost(costPrompt.requestId, 'terminate'); }, children: t('cost.terminate') }), _jsx("button", { type: "button", "data-primary": true, onClick: () => { void decideCost(costPrompt.requestId, 'continue'); }, children: t('cost.continue') })] })] }) }));
}
