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
    const [expanded, setExpanded] = useState({});
    const [costByTask, setCostByTask] = useState({});
    useEffect(() => {
        let cancelled = false;
        void fetch('/plugins/dsh-pixel-team/cost/report?sessionId=' + encodeURIComponent(sessionId))
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
    }, [sessionId, team?.tasks.length ?? 0]);
    if (team === null) {
        return _jsx("p", { className: css.empty, children: t('library.empty') });
    }
    const stopTask = async (taskId) => {
        if (!window.confirm(t('library.stopConfirm')))
            return;
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
    return (_jsxs("div", { className: css.root, "data-library": true, children: [_jsxs("header", { className: css.head, children: [_jsx("span", { className: css.team, children: team.name }), _jsx("span", { className: css.mode, style: { color: team.modeColor, borderColor: team.modeColor }, children: team.modeName }), _jsx("span", { className: css.scale, children: team.scale }), _jsx("span", { className: css.gate, children: t('library.gate', { pass: team.gate.passed, total: team.gate.total }) }), _jsxs("span", { className: css.version, children: ["v", PLUGIN_VERSION] }), _jsx("span", { className: connected ? css.live : css.offline, children: connected ? t('library.connected') : t('library.disconnected') })] }), team.requirements.length > 0 && (_jsxs("section", { className: css.requirements, children: [_jsx("span", { className: css.reqTitle, children: t('library.requirements') }), _jsx("ol", { className: css.reqList, children: team.requirements.map((item, index) => {
                            const allDone = team.tasks.length > 0 && team.tasks.every(task => task.status === 'completed');
                            const anyFailed = team.tasks.some(task => task.status === 'failed');
                            return (_jsxs("li", { className: css.reqItem, "data-state": allDone ? 'pass' : anyFailed ? 'fail' : 'pending', children: [_jsx("span", { className: css.reqIndex, children: index + 1 }), _jsx("span", { className: css.reqText, children: item }), _jsx("span", { className: css.reqState, children: allDone ? 'PASS' : anyFailed ? 'FAIL' : t('library.inProgress') })] }, index));
                        }) })] })), _jsx("span", { className: css.skeletonTitle, children: t('library.skeleton') }), _jsx("div", { className: css.list, children: team.tasks.map((task, index) => {
                    const passed = task.acceptance.filter(item => item.status === 'pass').length;
                    const failed = task.acceptance.filter(item => item.status === 'fail').length;
                    const active = task.status === 'claimed' || task.status === 'in_progress';
                    const open = expanded[task.id] === true;
                    const taskCost = costByTask[task.id];
                    return (_jsxs("div", { className: css.row, "data-status": task.status, children: [_jsxs("button", { type: "button", className: css.rowHead, "aria-expanded": open, onClick: () => { setExpanded(previous => ({ ...previous, [task.id]: !open })); }, children: [_jsx("span", { className: css.rowChevron, "aria-hidden": true, children: open ? '▾' : '▸' }), _jsx("span", { className: css.rowIndex, children: index + 1 }), _jsx("code", { className: css.rowId, children: task.id }), _jsx("span", { className: css.rowSubject, title: task.subject, children: task.subject }), _jsx("span", { className: css.rowMeta, children: task.assignee || t('library.unassigned') }), _jsx("span", { className: css.rowStatus, children: t(STATUS_KEY[task.status] ?? 'library.status.pending') }), _jsx("span", { className: css.rowAcceptance, "data-failed": failed > 0 || undefined, children: t('library.acceptance', { pass: passed, total: task.acceptance.length }) }), task.failures > 0 && _jsx("span", { className: css.rowFailures, children: t('library.failures', { count: task.failures }) }), taskCost !== undefined && taskCost > 0 && (_jsx("span", { className: css.rowCost, children: '¥' + usdToCny(taskCost).toFixed(2) }))] }), active && (_jsx("button", { type: "button", className: css.stop, disabled: stopping[task.id] === true, title: t('library.stop'), onClick: () => { void stopTask(task.id); }, children: stopping[task.id] === true ? t('library.stopping') : '■ ' + t('library.stop') })), open && (_jsxs("div", { className: css.rowDetail, children: [task.description !== '' && _jsx("span", { className: css.detailDesc, children: task.description }), _jsxs("span", { className: css.detailMeta, children: [t('library.deps'), ": ", task.dependencies.join(', ') || t('library.noDeps'), " \u00B7 ", task.kind] }), task.acceptance.length > 0 && (_jsx("ul", { className: css.acceptanceList, children: task.acceptance.map(item => (_jsxs("li", { "data-status": item.status, children: [_jsx("span", { className: css.acceptanceMark, children: item.status === 'pass' ? 'PASS' : item.status === 'fail' ? 'FAIL' : t('library.pending') }), item.criterion] }, item.criterion))) }))] }))] }, task.id));
                }) }), _jsxs("footer", { className: css.blocker, "data-blocked": team.blocker === undefined ? undefined : true, children: [_jsx("span", { className: css.blockerTitle, children: t('library.blocker') }), team.blocker === undefined
                        ? _jsx("span", { children: t('library.noBlocker') })
                        : _jsxs("span", { children: [team.blocker.subject, "\uFF1A", team.blocker.reason] })] })] }));
}
