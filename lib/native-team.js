/** Summarize the host's native agentTeam projection for one captain, if any. */
export function nativeTeamSummary(ctx, captain) {
    const projections = ctx.sessionProjections;
    if (projections?.stateOf === undefined)
        return undefined;
    let state;
    try {
        state = projections.stateOf(captain.session, 'agentTeam');
    }
    catch {
        return undefined;
    }
    if (typeof state !== 'object' || state === null)
        return undefined;
    const native = state;
    if (typeof native.id !== 'string' || !Array.isArray(native.members) || !Array.isArray(native.tasks))
        return undefined;
    const completed = native.tasks.filter((task) => (typeof task === 'object' && task !== null && task.status === 'completed')).length;
    return { id: native.id, members: native.members.length, tasks: native.tasks.length, completed };
}
