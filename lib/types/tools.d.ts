/**
 * The `agent_teams_*` model-facing tools.
 *
 * The captain (the agent that created the team) orchestrates: members are
 * continuable subagents it spawns and wakes. Members share the same tools and
 * drive their own task state, mirroring the Claude Code AgentTeams flow:
 * create team → add members → create tasks with dependencies → claim/assign →
 * work → report → status → delete.
 * @module dsh-agent-teams/tools
 */
import type { Context } from '@deepseek-ai/cordis';
import type { Agent } from '@deepseek-ai/dsh-agent';
import { type MemberToolPolicy } from './tool-policies.ts';
import type { ArtifactSnapshot } from './types.ts';
import { type TeamState, type TeamTask } from './types.ts';
export { steerCaptainReport } from './members.ts';
/** Resolved plugin config consumed by the tools. */
export interface ToolsConfig {
    /** State directory name under the captain's workspace. */
    stateDir: string;
    /** Member subagent provider name. */
    memberProvider: string;
    /** Optional member model override. */
    memberModel?: string;
    /** Optional member LLM provider, paired with `memberModel` (issue #189). */
    memberLlmProvider?: string;
    /** Prompt injected into member personas and assignments. */
    executionPrompt?: string;
    /** Plugin fallback route. */
    fallback?: import('./profiles.ts').TeamModelFallbackConfig;
    /** Member delegation depth cap. */
    memberMaxDepth?: number;
    /** Team size cap (members). */
    maxMembers: number;
    /** Named team profiles from the active DSH profile. */
    profiles: Record<string, import('./profiles.ts').TeamProfileConfig>;
    /** Owner-declared reusable member tool policies, keyed by policy id (#59). */
    toolPolicies: Record<string, MemberToolPolicy>;
    /** Blocking clarification policy; `enforce` rejects DAG creation without one. */
    clarify?: {
        enforce?: boolean;
    };
    /** memory-eternal (or compatible) recall endpoint; empty uses the default. */
    memory?: {
        endpoint?: string;
    };
    /** Soft cost gate thresholds forwarded to member spawns. */
    cost?: {
        enabled?: boolean;
        perTaskUsd?: number;
        perDayUsd?: number;
        /** Meter real usage when the host reports tokens (default actual). */
        usage?: 'actual' | 'estimate';
        /** USD per 1K tokens for actual metering. */
        pricing?: {
            inputPer1k?: number;
            outputPer1k?: number;
            cacheReadPer1k?: number;
            cacheWritePer1k?: number;
            models?: Record<string, {
                inputPer1k?: number;
                outputPer1k?: number;
                cacheReadPer1k?: number;
                cacheWritePer1k?: number;
            }>;
        };
    };
    /** Stalled-member watchdog: mark open attempts failed after an idle/missing owner grace period. */
    watchdog?: {
        timeoutMs?: number;
        intervalMs?: number;
    };
    /** Quality gate policy: host re-verification, auto review, product verify commands. */
    quality?: {
        /** Host re-runs declared verify commands before accepting a completion (default true). */
        autoVerify?: boolean;
        /** Host auto-completes ready review tasks once their gates pass (default false). */
        autoReview?: boolean;
        /** Verify commands for generated projects; overrides inherited workspace scripts. */
        commands?: string[];
        /** Per-project verify commands keyed by product root (e.g. "projects/贪吃蛇"). */
        commandsByProject?: Record<string, string[]>;
        /** Host verify timeout per command (default 120000ms). */
        verifyTimeoutMs?: number;
        /** Auto review requires every acceptance item to pass (default true). */
        requireAcceptance?: boolean;
        /** Require the review member's model to differ from the implementation owner. */
        crossModelReview?: boolean;
        /** Add the generated project's own package.json test/typecheck command (default true). */
        autoDetect?: boolean;
        /** Who closes an auto-audited review: host directly or a human confirmation. */
        reviewMode?: 'auto' | 'human';
    };
}
/** Browser/UI mutations allowed while a plan is waiting for approval. */
export type StagedPlanMutation = {
    action: 'update_member';
    memberName: string;
    role?: string | null;
    provider: string;
    model: string;
    reasoningEffort?: string | null;
    executionPrompt?: string | null;
    /** Selected tool-policy id; an empty string clears it back to no policy. */
    toolPolicy?: string;
} | {
    action: 'update_task';
    taskId: string;
    subject: string;
    description?: string | null;
    assignee?: string | null;
    dependencies: string[];
    skills?: string[];
} | {
    action: 'add_task';
    subject: string;
    description?: string | null;
    assignee?: string | null;
    dependencies: string[];
    skills?: string[];
} | {
    action: 'remove_task';
    taskId: string;
} | {
    action: 'remove_member';
    memberName: string;
};
/** Runtime bridge shared by model-facing tools and the Web staging surface. */
export interface AgentTeamsRuntime {
    isPendingMember(agent: Agent): boolean;
    updateStagedPlan(captain: Agent, teamId: string, mutation: StagedPlanMutation, signal?: AbortSignal): Promise<TeamState>;
    updateStagedPlanBatch(captain: Agent, teamId: string, mutations: readonly StagedPlanMutation[], signal?: AbortSignal): Promise<TeamState>;
    approveStagedTeam(captain: Agent, teamId: string, signal?: AbortSignal): Promise<{
        teamId: string;
        members: number;
        tasks: number;
    }>;
    /** Human confirmation for a review the host audited in reviewMode=human. */
    confirmReview(captain: Agent, teamId: string, taskId: string): Promise<{
        taskId: string;
        status: string;
    }>;
    continueStagedPlanning(captain: Agent, teamId: string): Promise<{
        teamId: string;
        alreadyWaiting: boolean;
    }>;
    discardStagedTeam(captain: Agent, teamId: string): Promise<{
        teamId: string;
    }>;
}
/** Process-local lock key scoped by workspace state root and team id. */
export declare function teamLockKey(stateRoot: string, teamId: string): string;
export declare function haltTeamWork(input: {
    ctx: Context;
    stateRoot: string;
    teamId: string;
    captain: Agent;
    signal?: AbortSignal;
}): Promise<{
    teamName: string;
    captainSessionId: string;
    cancelledTasks: number;
    alreadyHalted: boolean;
}>;
/** Web approval has no tool result in the captain's conversation. */
export declare function stagedPlanApprovedContext(teamName: string): string;
/** Context queued after a solo (captain-only) team is approved. */
export declare function soloExecutionContext(teamName: string): string;
/** Context queued after the human rejects a staged plan. */
export declare function stagedPlanDiscardContext(teamName: string): string;
/** Model-facing continuation that turns the review UI back into a conversation. */
export declare function stagedPlanFeedbackContext(teamName: string): string;
/**
 * Register every `agent_teams_*` tool into the shared tools registry.
 * @param ctx - the plugin context (injects `tools`).
 * @param config - resolved tool config.
 */
export declare function registerAgentTeamsTools(ctx: Context, config: ToolsConfig): AgentTeamsRuntime;
export declare function applyQualityFollowUp(team: TeamState, closed: TeamTask, snapshotPaths?: (paths: readonly string[]) => ArtifactSnapshot, pathExists?: (path: string) => boolean): {
    created: TeamTask[];
    escalated: boolean;
    reason?: string;
    excludedFindings?: string[];
};
