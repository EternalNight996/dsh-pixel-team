import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * AgentTeams conversation card: the lightweight in-conversation summary for
 * one team — the captain's portrait and name, the member roster as
 * clickable 道途 portraits (opening the member's subagent transcript), and
 * an "activity panel" button that re-activates the top-right floater.
 *
 * The floater and this card share the `agent-teams:open-panel` window event
 * so the card can summon the panel even after it was closed (or when an old
 * session is re-opened for review).
 * @module dsh-agent-teams/client/card
 */
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { getActivitySnapshotsSnapshot, monitorAgentTeam, subscribeActivitySnapshots, } from "./activity-monitor.js";
import { LEAD_ART, memberArtUrl } from "./artwork.js";
import css from './AgentTeamsCard.module.css';
/** Window event name the floater listens for to open itself. */
export const OPEN_PANEL_EVENT = 'agent-teams:open-panel';
/** Open the matching team view, carrying this team's summary
 * so the panel can show it even when the team no longer exists on disk
 * (historical session review). */
export function openActivityPanel(data) {
    window.dispatchEvent(new CustomEvent(OPEN_PANEL_EVENT, {
        detail: {
            teamId: data.teamId,
            captainSessionId: data.captainSessionId,
            teamName: data.teamName,
            members: data.members,
        },
    }));
}
const FOLD_STORAGE_KEY = 'dsh-pixel-team:card-folds:v1';
function readFolds() {
    try {
        return JSON.parse(window.localStorage.getItem(FOLD_STORAGE_KEY) ?? '{}');
    }
    catch {
        return {};
    }
}
function writeFolds(value) {
    try {
        window.localStorage.setItem(FOLD_STORAGE_KEY, JSON.stringify(value));
    }
    catch { /* private mode */ }
}
/** Render one durable team as a compact conversation card. */
const noWorkspace = () => undefined;
const noSubscription = () => () => { };
export function AgentTeamsCard({ node, openMember, sessionId, t, workspaceBridge }) {
    const native = useSyncExternalStore(workspaceBridge?.subscribe ?? noSubscription, workspaceBridge?.getSnapshot ?? noWorkspace);
    const location = node.location;
    // Closed turns render their card through the official, non-folding turn tail.
    if (native && (location.kind === 'turn' || location.kind === 'step') && location.turn.status === 'closed')
        return null;
    return _jsx(AgentTeamsSummary, { data: node.data, openMember: openMember, sessionId: sessionId, t: t });
}
function taskStatusLabel(status, t) {
    const key = status === 'claimed' ? 'task.status.claimed'
        : status === 'in_progress' ? 'task.status.inProgress'
            : status === 'completed' ? 'task.status.completed'
                : status === 'failed' ? 'task.status.failed'
                    : status === 'cancelled' ? 'task.status.cancelled'
                        : 'task.status.pending';
    return t(key);
}
export function AgentTeamsSummary({ data, openMember, sessionId, t }) {
    // `conversation.chat.node` is session-scoped, so its framework-owned id is
    // a stable owner even while another conversation becomes current.
    const owner = data.captainSessionId || sessionId;
    const { teams, archivedTeams } = useSyncExternalStore(subscribeActivitySnapshots, getActivitySnapshotsSnapshot);
    useEffect(() => {
        return monitorAgentTeam(owner, data.teamId);
    }, [data.teamId, owner]);
    const snapshot = teams.find((team) => team.teamId === data.teamId && (owner === '' || team.captainSessionId === owner))
        ?? archivedTeams.find((team) => team.teamId === data.teamId && (owner === '' || team.captainSessionId === owner));
    const resolved = useMemo(() => ({
        ...data,
        captainSessionId: snapshot?.captainSessionId ?? owner,
        teamName: snapshot?.name ?? data.teamName,
        members: snapshot?.members.map((member) => ({ id: member.id, name: member.name, role: member.role })) ?? data.members,
    }), [data, owner, snapshot]);
    const messages = (snapshot?.messages ?? []).slice(-8);
    const [folds, setFolds] = useState(() => readFolds());
    useEffect(() => { writeFolds(folds); }, [folds]);
    const doneFoldKey = `${data.teamId}:done`;
    return (_jsxs("section", { className: css.root, "data-agent-teams-card": true, "data-team-id": resolved.teamId, children: [_jsxs("header", { className: css.head, children: [_jsx("img", { className: css.leadAvatar, src: LEAD_ART, alt: "", "aria-hidden": true }), _jsx("span", { className: css.teamName, title: resolved.teamName, children: resolved.teamName }), _jsx("span", { className: css.memberCount, children: t('card.memberCount', { count: resolved.members.length }) })] }), ((snapshot?.description ?? '') !== '' || messages.length > 0 || (snapshot?.tasks.length ?? 0) > 0) && (_jsxs("div", { className: css.comms, "data-team-comms": true, children: [_jsx("span", { className: css.commsTitle, children: t('card.comms') }), (snapshot?.description ?? '') !== '' && (_jsxs("p", { className: css.commsGoal, title: snapshot?.description, children: ["\uD83C\uDFAF ", snapshot?.description] })), [...(snapshot?.tasks ?? [])].filter(task => task.status === 'failed' || task.status === 'cancelled' || task.status === 'pending' || task.status === 'claimed' || task.status === 'in_progress').slice(0, 4).map((task) => {
                        const member = snapshot?.members.find(row => row.name === task.assignee);
                        const art = task.assignee === '' ? LEAD_ART : memberArtUrl(task.assignee, member?.role ?? '');
                        const failed = task.status === 'failed' || task.status === 'cancelled';
                        return (_jsxs("div", { className: css.taskRow, "data-state": failed ? 'failed' : 'active', children: [_jsx("img", { className: css.taskArt, src: art ?? LEAD_ART, alt: "", "aria-hidden": true }), _jsxs("span", { className: css.taskMain, children: [_jsxs("span", { className: css.taskMeta, children: [_jsx("strong", { children: task.assignee || t('task.assignee.unclaimed') }), ' · ', taskStatusLabel(task.status, t)] }), _jsxs("span", { className: css.taskSubject, children: [task.id, " \u00B7 ", task.subject] }), failed && (task.output ?? '') !== '' && (_jsx("span", { className: css.taskError, title: task.output, children: task.output }))] })] }, task.id));
                    }), [...new Map((snapshot?.tasks ?? []).filter(task => task.status === 'completed').map(task => [`${task.id}:${task.attempt ?? 0}`, task])).values()].map((task) => {
                        const key = `${data.teamId}:${task.id}:${task.attempt ?? 0}`;
                        return (_jsxs("details", { className: css.doneFold, open: folds[key] === true, onToggle: (event) => {
                                const open = event.currentTarget.open;
                                setFolds(current => current[key] === open ? current : { ...current, [key]: open });
                            }, children: [_jsxs("summary", { children: ["\u2713 ", task.id, " \u00B7 ", task.assignee || t('task.assignee.unclaimed'), " \u00B7 ", task.subject] }), (task.output ?? '') !== '' && _jsx("span", { className: css.doneResult, children: task.output })] }, key));
                    }), _jsx("ul", { className: css.commsList, children: messages.map((message) => {
                            const fromCaptain = message.from === 'captain' || message.from === '';
                            const role = fromCaptain ? '' : snapshot?.members.find((member) => member.name === message.from)?.role ?? '';
                            const art = fromCaptain ? LEAD_ART : memberArtUrl(message.from, role);
                            return (_jsxs("li", { className: css.commsRow, "data-from": fromCaptain ? 'captain' : 'member', children: [_jsx("img", { className: css.commsAvatar, src: art ?? '', alt: "", "aria-hidden": true }), _jsxs("span", { className: css.commsText, children: [_jsxs("span", { className: css.commsMeta, children: [message.from, " \u2192 ", message.to ?? 'captain'] }), _jsx("span", { className: css.commsBody, title: message.content, children: message.content })] })] }, message.id ?? `${message.ts ?? 0}:${message.from}`));
                        }) })] })), resolved.members.length > 0 && (_jsx("div", { className: css.members, children: resolved.members.map((member) => (_jsxs("button", { type: "button", className: css.member, onClick: () => {
                        if (member.id !== '')
                            openMember(owner, member.id);
                    }, title: member.role === '' ? member.name : `${member.name} · ${member.role}`, children: [memberArtUrl(member.name, member.role) !== null ? (_jsx("img", { className: css.memberArt, src: memberArtUrl(member.name, member.role) ?? '', alt: "", "aria-hidden": true })) : (_jsx("span", { className: css.memberInitial, children: member.name.trim().slice(0, 1).toUpperCase() || '?' })), _jsx("span", { className: css.memberName, children: member.name })] }, member.id || member.name))) }))] }));
}
