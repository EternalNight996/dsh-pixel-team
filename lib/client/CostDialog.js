import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Module 4: soft cost / dead-loop prompts. Continue or terminate this one action only. */
import css from './CostDialog.module.css';
import { decideCost, useLibraryState } from "./library-stream.js";
import { usdToCny } from "../currency.js";
export function CostDialog({ sessionId, t }) {
    const { costPrompt } = useLibraryState(sessionId);
    if (costPrompt === undefined)
        return null;
    const retry = costPrompt.reason === 'retry';
    const reason = costPrompt.reason === 'task' ? t('cost.task') : t('cost.day');
    return (_jsx("div", { className: css.backdrop, role: "dialog", "aria-modal": "true", "aria-label": retry ? t('cost.retryTitle') : t('cost.title'), children: _jsxs("section", { className: css.dialog, children: [_jsx("h3", { className: css.title, children: retry ? t('cost.retryTitle') : t('cost.title') }), retry
                    ? _jsx("p", { className: css.body, children: t('cost.retryBody', { count: String(costPrompt.retryCount ?? 0) }) })
                    : _jsx("p", { className: css.body, children: t('cost.body', {
                            member: costPrompt.memberName,
                            estimate: usdToCny(costPrompt.estimateUsd).toFixed(2),
                            threshold: usdToCny(costPrompt.thresholdUsd).toFixed(2),
                            reason,
                        }) }), _jsx("p", { className: css.note, children: retry ? t('cost.retryNote') : t('cost.note') }), _jsxs("div", { className: css.actions, children: [_jsx("button", { type: "button", onClick: () => { void decideCost(costPrompt.requestId, 'terminate'); }, children: retry ? t('cost.retryStop') : t('cost.terminate') }), _jsx("button", { type: "button", "data-primary": true, onClick: () => { void decideCost(costPrompt.requestId, 'continue'); }, children: t('cost.continue') })] })] }) }));
}
