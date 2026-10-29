import type { TeamState, TeamTask } from './types.ts';
export interface AutoReviewOptions {
    /** Require every acceptance item of the reviewed task to pass (default true). */
    readonly requireAcceptance?: boolean;
}
/**
 * Eligible review tasks:
 * - pending, never attempted, with at least one dependency;
 * - the whole dependency closure is completed and contains no failed task;
 * - the reviewed target is completed with passing acceptance/commands.
 * Unrelated parallel branches are intentionally ignored: a failure elsewhere
 * blocks delivery, not this branch's review.
 */
export declare function autoReviewCandidates(team: TeamState, options?: AutoReviewOptions): TeamTask[];
