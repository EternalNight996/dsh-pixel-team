/**
 * Select abandoned terminal teams for archival.
 *
 * Archival is explicit (agent_teams_cleanup): the helper is pure so a dry run
 * and the real pass agree exactly on which teams are eligible.
 */
import type { TeamState } from './types.ts';
export interface CleanupCandidate {
    id: string;
    name: string;
    ageDays: number;
    tasks: number;
}
export interface CleanupOptions {
    now: number;
    olderThanDays: number;
    excludeCaptainSessionId?: string;
}
/** Terminal teams whose newest task (or creation) is older than the cutoff. */
export declare function selectCleanupCandidates(teams: readonly TeamState[], options: CleanupOptions): CleanupCandidate[];
