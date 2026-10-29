import { type CostPrompt } from './events-bus.ts';
import { type TeamMode } from './modes.ts';
export interface CostConfig {
    enabled?: boolean;
    perTaskUsd?: number;
    perDayUsd?: number;
}
export interface CostLogEntry {
    ts: number;
    sessionId: string;
    teamId?: string;
    taskId?: string;
    memberName: string;
    estimateUsd: number;
    thresholdUsd?: number;
    reason?: 'task' | 'day' | 'retry';
    mode?: TeamMode;
    decision: 'auto-continue' | 'continue' | 'terminate' | 'timeout' | 'captain-unmetered';
}
/** The mode's budget, with an optional owner override from the plugin config. */
export declare function resolveModeBudget(mode: TeamMode | undefined, override?: CostConfig): {
    perTaskUsd: number;
    perDayUsd: number;
    retryPromptAt: number;
};
/** Estimate one spawn: prompt chars in, a conservative completion budget out. */
export declare function estimateCost(textChars: number): number;
export declare function costLogPath(workspace: string): string;
/** Merge cost logs read from several workspaces without double-counting. */
export declare function mergeCostEntries(entries: readonly CostLogEntry[]): CostLogEntry[];
/** Sum today's entries across a merged log (local calendar day). */
export declare function todayCostFromEntries(entries: readonly CostLogEntry[], now?: number): number;
/** Read every cost-log entry (oldest first); a torn line is skipped. */
export declare function readCostLogEntries(workspace: string): Promise<CostLogEntry[]>;
/** Sum today's logged estimates (local calendar day). */
export declare function readTodayCost(workspace: string, now?: number): Promise<number>;
/** Append one decision to the JSONL log (never throws into the spawn path). */
export declare function appendCostLog(workspace: string, entry: CostLogEntry): Promise<void>;
/**
 * Publish a prompt and wait for the user's decision. A timeout continues (the
 * gate is soft by design) and is logged as such.
 */
export declare function requestCostDecision(prompt: Omit<CostPrompt, 'requestId'>, timeoutMs?: number): Promise<'continue' | 'terminate' | 'timeout'>;
/** Resolve one pending prompt; false when it already timed out. */
export declare function resolveCostDecision(requestId: string, decision: 'continue' | 'terminate'): boolean;
