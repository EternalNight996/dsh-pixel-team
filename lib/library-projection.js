import { getModeSpec, isTeamMode } from "./modes.js";
const SCALE_LABEL = { small: '🟢 小改动', medium: '🟡 多模块', fullstack: '🔴 全栈' };
function depthOf(task, byId, memo) {
    const cached = memo.get(task.id);
    if (cached !== undefined)
        return cached;
    let depth = 0;
    for (const dependency of task.dependencies) {
        const parent = byId.get(dependency);
        if (parent !== undefined)
            depth = Math.max(depth, depthOf(parent, byId, memo) + 1);
    }
    memo.set(task.id, depth);
    return depth;
}
function acceptanceOf(task) {
    const results = new Map((task.acceptanceResults ?? []).map(result => [result.criterion, result.status === 'passed' ? 'pass' : 'fail']));
    const criteria = [...(task.acceptance ?? [])];
    for (const criterion of results.keys())
        if (!criteria.includes(criterion))
            criteria.push(criterion);
    return criteria.map(criterion => ({ criterion, status: results.get(criterion) ?? 'pending' }));
}
function edgeState(from, to, byId) {
    if (from.status === 'completed')
        return 'satisfied';
    if (from.status === 'claimed' || from.status === 'in_progress')
        return 'running';
    if (to.dependencies.every((dependency) => byId.get(dependency)?.status === 'completed'))
        return 'unlocked';
    return 'waiting';
}
function blockerOf(team) {
    if (team.halted === true) {
        return { taskId: '', subject: team.name, reason: '团队已停止（halted）', since: team.haltedAt ?? Date.now() };
    }
    const failed = team.tasks.find(task => task.status === 'failed');
    if (failed !== undefined) {
        return { taskId: failed.id, subject: failed.subject, reason: '验证/执行失败，下游被阻断', since: failed.updatedAt };
    }
    const working = team.tasks.find(task => task.status === 'claimed' || task.status === 'in_progress');
    if (working !== undefined && Date.now() - working.updatedAt > 5 * 60 * 1000) {
        return { taskId: working.id, subject: working.subject, reason: '执行中超过 5 分钟无更新', since: working.updatedAt };
    }
    return undefined;
}
/**
 * Project one team.
 * @param team - durable team record.
 * @param todayCostUsd - today's logged spend for the captain session.
 */
export function projectLibraryTeam(team, todayCostUsd = 0) {
    const byId = new Map(team.tasks.map(task => [task.id, task]));
    const memo = new Map();
    const tasks = team.tasks
        .map(task => ({
        id: task.id,
        subject: task.subject,
        kind: task.kind ?? 'work',
        status: task.status,
        assignee: task.assignee ?? '',
        depth: depthOf(task, byId, memo),
        acceptance: acceptanceOf(task),
    }))
        .sort((left, right) => left.depth - right.depth || left.id.localeCompare(right.id));
    const edges = [];
    for (const task of team.tasks) {
        for (const dependency of task.dependencies) {
            const parent = byId.get(dependency);
            if (parent === undefined)
                continue;
            edges.push({ from: parent.id, to: task.id, state: edgeState(parent, task, byId) });
        }
    }
    const clarification = team.clarification;
    const modeSpec = getModeSpec(isTeamMode(clarification?.mode) ? clarification.mode : undefined);
    const allAcceptance = tasks.flatMap(task => task.acceptance);
    return {
        teamId: team.id,
        name: team.name,
        phase: team.phase ?? 'running',
        project: clarification?.ui.reference ?? team.id,
        scale: SCALE_LABEL[clarification?.scale ?? 'small'] ?? '🟢 小改动',
        type: clarification?.type ?? 'software',
        mode: modeSpec.id,
        modeName: modeSpec.emoji + ' ' + modeSpec.name,
        modeColor: modeSpec.color,
        gate: {
            passed: allAcceptance.filter(item => item.status === 'pass').length,
            failed: allAcceptance.filter(item => item.status === 'fail').length,
            total: allAcceptance.length,
        },
        todayCostUsd: Math.round(todayCostUsd * 10000) / 10000,
        updatedAt: Math.max(team.createdAt, ...team.tasks.map(task => task.updatedAt)),
        tasks,
        edges,
        ...blockerOf(team) === undefined ? {} : { blocker: blockerOf(team) },
    };
}
