import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Module 3: 道通藏书阁 — live DAG projection pushed over SSE. */
import { useMemo, useState } from 'react';
import css from './LibraryPanel.module.css';
import { layoutLibrary, CARD_W, CARD_H } from "./library-model.js";
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
const EDGE_COLOR = {
    satisfied: '#7fd6a8',
    running: '#f2c14e',
    unlocked: '#6fb6ff',
    waiting: '#5b6472',
};
export function LibraryPanel({ sessionId, t }) {
    const { team, todayCostUsd, connected } = useLibraryState(sessionId);
    const [stopping, setStopping] = useState({});
    const layout = useMemo(() => (team === null ? undefined : layoutLibrary(team)), [team]);
    if (team === null || layout === undefined) {
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
    return (_jsxs("div", { className: css.root, "data-library": true, children: [_jsxs("header", { className: css.head, children: [_jsx("span", { className: css.team, children: team.name }), _jsx("span", { className: css.mode, style: { color: team.modeColor, borderColor: team.modeColor }, children: team.modeName }), _jsx("span", { className: css.scale, children: team.scale }), _jsx("span", { className: css.gate, children: t('library.gate', { pass: team.gate.passed, total: team.gate.total }) }), _jsx("span", { className: css.cost, children: t('library.todayCost', { cost: usdToCny(todayCostUsd).toFixed(2) }) }), _jsxs("span", { className: css.version, children: ["v", PLUGIN_VERSION] }), _jsx("span", { className: connected ? css.live : css.offline, children: connected ? t('library.connected') : t('library.disconnected') })] }), _jsxs("div", { className: css.canvas, style: { width: layout.width, height: layout.height }, children: [_jsx("svg", { className: css.edges, width: layout.width, height: layout.height, "aria-hidden": true, children: layout.edges.map((edge) => (_jsx("path", { d: 'M ' + edge.x1 + ' ' + edge.y1 + ' C ' + (edge.x1 + 24) + ' ' + edge.y1 + ', ' + (edge.x2 - 24) + ' ' + edge.y2 + ', ' + edge.x2 + ' ' + edge.y2, stroke: EDGE_COLOR[edge.state] ?? EDGE_COLOR.waiting, strokeWidth: 2, fill: "none", strokeDasharray: edge.state === 'waiting' ? '4 4' : undefined }, edge.from + '->' + edge.to))) }), team.tasks.map((task) => {
                        const position = layout.lanes.flatMap(lane => lane.cards).find(card => card.taskId === task.id);
                        if (position === undefined)
                            return null;
                        const passed = task.acceptance.filter(item => item.status === 'pass').length;
                        const failed = task.acceptance.filter(item => item.status === 'fail').length;
                        const active = task.status === 'claimed' || task.status === 'in_progress';
                        return (_jsxs("article", { className: css.card, "data-status": task.status, style: { left: position.x, top: position.y, width: CARD_W, height: CARD_H }, children: [_jsx("span", { className: css.subject, title: task.subject, children: task.subject }), _jsxs("span", { className: css.meta, children: [_jsx("span", { className: css.assignee, children: task.assignee || t('library.unassigned') }), _jsx("span", { className: css.status, children: t(STATUS_KEY[task.status] ?? 'library.status.pending') })] }), _jsx("span", { className: css.acceptance, "data-failed": failed > 0 || undefined, children: t('library.acceptance', { pass: passed, total: task.acceptance.length }) }), active && (_jsx("button", { type: "button", className: css.stop, disabled: stopping[task.id] === true, title: t('library.stop'), onClick: () => { void stopTask(task.id); }, children: stopping[task.id] === true ? t('library.stopping') : '■ ' + t('library.stop') }))] }, task.id));
                    })] }), _jsxs("footer", { className: css.blocker, "data-blocked": team.blocker === undefined ? undefined : true, children: [_jsx("span", { className: css.blockerTitle, children: t('library.blocker') }), team.blocker === undefined
                        ? _jsx("span", { children: t('library.noBlocker') })
                        : _jsxs("span", { children: [team.blocker.subject, "\uFF1A", team.blocker.reason] })] }), _jsxs("details", { className: css.details, children: [_jsx("summary", { children: t('library.details') }), _jsx("ol", { className: css.detailList, children: team.tasks.map(task => (_jsxs("li", { children: [_jsx("code", { className: css.detailId, children: task.id }), _jsx("strong", { children: task.subject }), _jsxs("span", { className: css.detailMeta, children: [task.assignee || t('library.unassigned'), " \u00B7 ", t(STATUS_KEY[task.status] ?? 'library.status.pending'), ' · ', t('library.deps'), ": ", task.dependencies.join(', ') || t('library.noDeps')] }), task.description !== '' && _jsx("span", { className: css.detailDesc, children: task.description })] }, task.id))) })] }), _jsx("span", { hidden: true, children: CARD_H })] }));
}
