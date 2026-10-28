import type { LibraryTeamView } from '../library-projection.ts';
export interface CostPromptView {
    requestId: string;
    sessionId: string;
    teamId?: string;
    taskId?: string;
    memberName: string;
    estimateUsd: number;
    thresholdUsd: number;
    reason: 'task' | 'day' | 'retry';
    mode?: string;
    retryCount?: number;
}
export interface LibraryState {
    readonly team: LibraryTeamView | null;
    readonly todayCostUsd: number;
    readonly connected: boolean;
    readonly costPrompt: CostPromptView | undefined;
}
/** Resolve one cost prompt and clear it from the shared state. */
export declare function decideCost(requestId: string, decision: 'continue' | 'terminate'): Promise<void>;
/** Shared library state for one session (connection is ref-counted by usage). */
export declare function useLibraryState(sessionId: string | undefined): LibraryState;
