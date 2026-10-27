const TERMINAL = new Set(['completed', 'cancelled', 'failed']);
/** Terminal teams whose newest task (or creation) is older than the cutoff. */
export function selectCleanupCandidates(teams, options) {
    const cutoff = options.now - options.olderThanDays * 86_400_000;
    const candidates = [];
    for (const team of teams) {
        if (options.excludeCaptainSessionId !== undefined && team.captainSessionId === options.excludeCaptainSessionId)
            continue;
        if (!team.tasks.every((task) => TERMINAL.has(task.status)))
            continue;
        const last = Math.max(team.createdAt ?? 0, ...team.tasks.map((task) => task.updatedAt ?? 0));
        if (last > cutoff)
            continue;
        candidates.push({
            id: team.id,
            name: team.name,
            ageDays: Math.max(0, Math.floor((options.now - last) / 86_400_000)),
            tasks: team.tasks.length,
        });
    }
    return candidates.sort((left, right) => right.ageDays - left.ageDays);
}
