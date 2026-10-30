import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Module 3: 道统·藏经阁 — live task progress list (single column, expand on click). */
import { useEffect, useState } from 'react';
import css from './LibraryPanel.module.css';
import { useLibraryState } from "./library-stream.js";
import { PLUGIN_VERSION } from "./version.js";
import { usdToCny } from "../currency.js";
const STATUS_KEY = {
    pending: 'library.status.pending',
    claimed: 'library.status.claimed',
    in_progress: 'library.status.inProgress',
    completed: 'library.status.completed',
    failed: 'library.status.failed',
};
export function LibraryPanel({ sessionId, t }) {
    const { team, connected } = useLibraryState(sessionId);
    const [stopping, setStopping] = useState({});
    const [stopArmed, setStopArmed] = useState();
    const [notice, setNotice] = useState('');
    const [confirming, setConfirming] = useState({});
    const [expanded, setExpanded] = useState({});
    const [costByTask, setCostByTask] = useState({});
    useEffect(() => {
        let cancelled = false;
        const teamQuery = team?.teamId === undefined ? '' : '&teamId=' + encodeURIComponent(team.teamId);
        void fetch('/plugins/dsh-pixel-team/cost/report?sessionId=' + encodeURIComponent(sessionId) + teamQuery)
            .then(response => response.json())
            .then((body) => {
            if (cancelled || body.by_task === undefined)
                return;
            const next = {};
            for (const item of body.by_task)
                next[item.taskId] = item.usd;
            setCostByTask(next);
        })
            .catch(() => undefined);
        return () => { cancelled = true; };
    }, [sessionId, team?.teamId, team?.tasks.length ?? 0]);
    if (team === null) {
        return _jsx("p", { className: css.empty, children: t('library.empty') });
    }
    const confirmReview = async (taskId) => {
        setConfirming(previous => ({ ...previous, [taskId]: true }));
        try {
            const response = await fetch('/plugins/dsh-pixel-team/task/review-confirm', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ sessionId, taskId }),
            });
            if (!response.ok) {
                const body = await response.json().catch(() => null);
                setNotice(body?.error ?? t('library.confirmFailed'));
            }
        }
        finally {
            setConfirming(previous => ({ ...previous, [taskId]: false }));
        }
    };
    const stopTask = async (taskId) => {
        if (stopArmed !== taskId) {
            setStopArmed(taskId);
            return;
        }
        setStopArmed(undefined);
        setStopping(previous => ({ ...previous, [taskId]: true }));
        try {
            await fetch('/plugins/dsh-pixel-team/task/stop', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ sessionId, taskId }),
            });
        }
        finally {
            setStopping(previous => ({ ...previous, [taskId]: false }));
        }
    };
    return (_jsxs("div", { className: css.root, "data-library": true, children: [_jsxs("header", { className: css.head, children: [_jsx("span", { className: css.team, children: team.name }), _jsx("span", { className: css.mode, style: { color: team.modeColor, borderColor: team.modeColor }, children: team.modeName }), _jsx("span", { className: css.scale, children: team.scale }), _jsx("span", { className: css.gate, children: t('library.gate', { pass: team.gate.passed, total: team.gate.total }) }), _jsxs("span", { className: css.version, children: ["v", PLUGIN_VERSION] }), notice !== '' && _jsx("span", { role: "alert", style: { color: '#ffb4a8', fontSize: 11 }, children: notice }), _jsx("span", { className: connected ? css.live : css.offline, children: connected ? t('library.connected') : t('library.disconnected') })] }), team.requirements.length > 0 && (() => {
                const totalFailures = team.tasks.reduce((sum, task) => sum + task.failures, 0);
                return (_jsxs("section", { className: css.requirements, children: [_jsx("span", { className: css.reqTitle, children: t('library.requirements') }), _jsxs("table", { className: css.reqTable, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "#" }), _jsx("th", { children: t('library.reqCol') }), _jsx("th", { children: t('library.reqState') }), _jsx("th", { children: t('library.reqFailures') })] }) }), _jsx("tbody", { children: team.requirements.map((item, index) => {
                                        const mapped = team.tasks.filter(task => task.coverageOf.includes(item));
                                        const scoped = mapped.length > 0 ? mapped : team.tasks;
                                        const itemDone = scoped.length > 0 && scoped.every(task => task.status === 'completed');
                                        const itemFailed = scoped.some(task => task.status === 'failed');
                                        const itemFailures = scoped.reduce((sum, task) => sum + task.failures, 0);
                                        return (_jsxs("tr", { "data-state": itemDone ? 'pass' : itemFailed ? 'fail' : 'pending', children: [_jsx("td", { className: css.reqIndex, children: index + 1 }), _jsx("td", { className: css.reqText, children: item }), _jsx("td", { className: css.reqState, children: itemDone ? 'PASS' : itemFailed ? 'FAIL' : t('library.inProgress') }), _jsx("td", { className: css.reqFailuresCell, children: itemFailures })] }, index));
                                    }) }), _jsx("tfoot", { children: _jsxs("tr", { children: [_jsx("td", { colSpan: 3, children: t('library.reqFailuresTotal') }), _jsx("td", { children: totalFailures })] }) })] })] }));
            })(), _jsx("span", { className: css.skeletonTitle, children: t('library.skeleton') }), _jsxs("details", { className: css.architecture, children: [_jsx("summary", { children: t('library.architecture') }), _jsx("pre", { className: css.archText, children: team.architecture })] }), _jsx("div", { className: css.list, children: team.tasks.map((task, index) => {
                    const passed = task.acceptance.filter(item => item.status === 'pass').length;
                    const failed = task.acceptance.filter(item => item.status === 'fail').length;
                    const active = task.status === 'claimed' || task.status === 'in_progress';
                    const open = expanded[task.id] === true;
                    const taskCost = costByTask[task.id];
                    return (_jsxs("div", { className: css.row, "data-status": task.status, children: [_jsxs("button", { type: "button", className: css.rowHead, "aria-expanded": open, onClick: () => { setExpanded(previous => ({ ...previous, [task.id]: !open })); }, children: [_jsx("span", { className: css.rowChevron, "aria-hidden": true, children: open ? '▾' : '▸' }), _jsx("span", { className: css.rowIndex, children: index + 1 }), _jsx("code", { className: css.rowId, children: task.id }), _jsx("span", { className: css.rowSubject, title: task.subject, children: task.subject }), _jsx("span", { className: css.rowMeta, children: task.assignee || t('library.unassigned') }), _jsx("span", { className: css.rowStatus, children: t(STATUS_KEY[task.status] ?? 'library.status.pending') }), _jsx("span", { className: css.rowAcceptance, "data-failed": failed > 0 || undefined, children: t('library.acceptance', { pass: passed, total: task.acceptance.length }) }), task.failures > 0 && _jsx("span", { className: css.rowFailures, children: t('library.failures', { count: task.failures }) }), task.awaitingHuman && _jsx("span", { className: css.rowHuman, children: t('library.awaitingHuman') }), taskCost !== undefined && taskCost > 0 && (_jsx("span", { className: css.rowCost, children: '¥' + usdToCny(taskCost).toFixed(2) }))] }), task.awaitingHuman && (_jsx("button", { type: "button", className: css.confirmReview, disabled: confirming[task.id] === true, title: t('library.confirmReview'), onClick: () => { void confirmReview(task.id); }, children: confirming[task.id] === true ? t('library.confirming') : '✓ ' + t('library.confirmReview') })), active && (_jsx("button", { type: "button", className: css.stop, disabled: stopping[task.id] === true, title: t('library.stop'), onClick: () => { void stopTask(task.id); }, children: stopping[task.id] === true ? t('library.stopping') : '■ ' + t('library.stop') })), stopArmed === task.id && (_jsxs("span", { role: "alertdialog", style: { display: 'inline-flex', gap: 6, alignItems: 'center', marginLeft: 6, fontSize: 11, color: '#ffd7a0' }, children: [_jsx("span", { children: t('library.stopConfirm') }), _jsx("button", { type: "button", className: css.stop, onClick: () => { void stopTask(task.id); }, children: t('library.confirm') }), _jsx("button", { type: "button", className: css.stop, onClick: () => { setStopArmed(undefined); }, children: t('library.cancel') })] })), open && (_jsxs("div", { className: css.rowDetail, children: [task.description !== '' && _jsx("span", { className: css.detailDesc, children: task.description }), _jsxs("span", { className: css.detailMeta, children: [t('library.deps'), ": ", task.dependencies.join(', ') || t('library.noDeps'), " \u00B7 ", task.kind] }), task.acceptance.length > 0 && (_jsx("ul", { className: css.acceptanceList, children: task.acceptance.map(item => (_jsxs("li", { "data-status": item.status, children: [_jsx("span", { className: css.acceptanceMark, children: item.status === 'pass' ? 'PASS' : item.status === 'fail' ? 'FAIL' : t('library.pending') }), item.criterion] }, item.criterion))) }))] }))] }, task.id));
                }) }), _jsxs("footer", { className: css.blocker, "data-blocked": team.blocker === undefined ? undefined : true, children: [_jsx("span", { className: css.blockerTitle, children: t('library.blocker') }), team.blocker === undefined
                        ? _jsx("span", { children: t('library.noBlocker') })
                        : _jsxs("span", { children: [team.blocker.subject, "\uFF1A", team.blocker.reason] })] })] }));
}
