/**
 * Library projection: turn one durable team record into swimlanes, edges,
 * acceptance states and the current blocker. Pure and synchronous so both the
 * SSE route and unit tests use the same view.
 */
import type { TeamState } from './types.ts';
export interface LibraryAcceptance {
    readonly criterion: string;
    readonly status: 'pass' | 'fail' | 'pending';
}
export interface LibraryTaskView {
    readonly id: string;
    readonly subject: string;
    readonly kind: string;
    readonly status: string;
    readonly assignee: string;
    readonly depth: number;
    readonly description: string;
    readonly dependencies: string[];
    readonly acceptance: LibraryAcceptance[];
}
export interface LibraryEdgeView {
    readonly from: string;
    readonly to: string;
    /** satisfied | running | unlocked | waiting */
    readonly state: 'satisfied' | 'running' | 'unlocked' | 'waiting';
}
export interface LibraryBlocker {
    readonly taskId: string;
    readonly subject: string;
    readonly reason: string;
    readonly since: number;
}
export interface LibraryTeamView {
    readonly teamId: string;
    readonly name: string;
    readonly phase: string;
    readonly project: string;
    readonly scale: string;
    readonly type: string;
    /** Development mode id/name/color for the header badge. */
    readonly mode: string;
    readonly modeName: string;
    readonly modeColor: string;
    /** Acceptance pass/fail totals across the whole DAG. */
    readonly gate: {
        readonly passed: number;
        readonly failed: number;
        readonly total: number;
    };
    readonly todayCostUsd: number;
    readonly updatedAt: number;
    readonly tasks: readonly LibraryTaskView[];
    readonly edges: readonly LibraryEdgeView[];
    readonly blocker?: LibraryBlocker;
}
/**
 * Project one team.
 * @param team - durable team record.
 * @param todayCostUsd - today's logged spend for the captain session.
 */
export declare function projectLibraryTeam(team: TeamState, todayCostUsd?: number): LibraryTeamView;
