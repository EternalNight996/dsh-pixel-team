import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Cost report for the roster sheet: per-team option totals and, for the
 * selected team, per-task totals plus recent entries (no "today" line).
 */
import { useCallback, useEffect, useState } from 'react';
import { usdToCny } from "../currency.js";
import css from './CostLedger.module.css';
function money(usd) {
    return '¥' + usdToCny(usd).toFixed(2);
}
async function loadReport(sessionId, teamId) {
    const query = '?sessionId=' + encodeURIComponent(sessionId) + (teamId === undefined || teamId === '' ? '' : '&teamId=' + encodeURIComponent(teamId));
    const response = await fetch('/plugins/dsh-pixel-team/cost/report' + query);
    const body = await response.json();
    if (!response.ok)
        throw new Error(body.error ?? 'failed to load costs');
    return body;
}
/** All-team report, used for the dropdown option totals. */
export function useCostReport(sessionId) {
    const [report, setReport] = useState();
    const reload = useCallback(() => {
        if (sessionId === undefined || sessionId === '')
            return;
        void loadReport(sessionId).then(setReport).catch(() => undefined);
    }, [sessionId]);
    useEffect(() => { reload(); }, [reload]);
    return { report, reload };
}
export function CostDetail({ sessionId, teamId, t }) {
    const [report, setReport] = useState();
    const [error, setError] = useState('');
    const load = useCallback(() => {
        if (sessionId === undefined || sessionId === '' || teamId === undefined || teamId === '')
            return;
        void loadReport(sessionId, teamId)
            .then(body => { setReport(body); setError(''); })
            .catch((caught) => { setError(caught instanceof Error ? caught.message : String(caught)); });
    }, [sessionId, teamId]);
    useEffect(() => { load(); }, [load]);
    if (sessionId === undefined || teamId === undefined)
        return null;
    return (_jsxs("section", { className: css.ledger, children: [_jsxs("header", { className: css.head, children: [_jsx("strong", { children: t('cost.ledger.title') }), _jsx("button", { type: "button", className: css.refresh, onClick: load, children: t('cost.ledger.refresh') })] }), error !== '' && _jsx("p", { className: css.error, children: error }), report !== undefined && report.by_task.length > 0 && (_jsxs("div", { className: css.block, children: [_jsx("span", { className: css.blockTitle, children: t('cost.ledger.byTask') }), _jsx("ul", { className: css.list, children: report.by_task.map(item => (_jsxs("li", { className: css.row, children: [_jsx("span", { className: css.key, children: item.taskId === '(spawn)' ? t('cost.ledger.unlinked') : item.taskId }), _jsxs("span", { className: css.meta, children: [item.count, "\u00D7"] }), _jsx("span", { className: css.amount, children: item.usd === 0 ? t('cost.ledger.unmetered') : money(item.usd) })] }, item.taskId))) })] })), report !== undefined && report.entries.length > 0 && (_jsxs("div", { className: css.block, children: [_jsx("span", { className: css.blockTitle, children: t('cost.ledger.recent') }), _jsx("ul", { className: css.list, children: report.entries.slice(0, 12).map((entry, index) => (_jsxs("li", { className: css.row, children: [_jsx("span", { className: css.key, children: new Date(entry.ts).toLocaleTimeString('zh-CN', { hour12: false }) }), _jsxs("span", { className: css.meta, children: [entry.memberName ?? '—', " \u00B7 ", entry.taskId ?? t('cost.ledger.unlinked'), " \u00B7 ", entry.decision === 'captain-unmetered' ? t('cost.ledger.captainTask') : entry.decision ?? '—'] }), _jsx("span", { className: css.amount, children: money(entry.estimateUsd) })] }, String(entry.ts) + index))) })] })), report !== undefined && report.by_task.length === 0 && _jsx("p", { className: css.empty, children: t('cost.ledger.empty') })] }));
}
export { money };
