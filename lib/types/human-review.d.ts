import type { TeamState, TeamTask } from './types.ts';
export type HumanReviewResult = {
    readonly ok: true;
    readonly task: TeamTask;
} | {
    readonly ok: false;
    readonly error: string;
};
/**
 * Validate and complete a review that the host audited in reviewMode=human.
 * Callers still bind the verdict to the artifact bytes after this returns.
 */
export declare function confirmHumanReview(team: TeamState, taskId: string): HumanReviewResult;
