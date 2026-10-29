/**
 * AI plan generation (founding): derive the DAG from the real goal + interview
 * answers + mode instead of a fixed template. Any invalid model output falls
 * back to the template path in the caller.
 */
import type { Context } from '@deepseek-ai/cordis';
import type { Agent } from '@deepseek-ai/dsh-agent';
import { type TeamMode } from './modes.ts';
import type { TaskKind, TeamClarification } from './types.ts';
export interface PlanTaskSpec {
    id: string;
    subject: string;
    description: string;
    role: string;
    kind?: TaskKind;
    acceptance: string[];
    inScope?: string[];
    verify?: string[];
    dependencies: string[];
    reviewedTaskId?: string;
    /** Requirement/interview items this task covers (exact source strings). */
    coverageOf?: string[];
}
export declare function buildPlanPrompt(input: {
    goal: string;
    mode: TeamMode;
    clarification: TeamClarification;
    roles: readonly {
        role: string;
        name: string;
    }[];
    workspaceFacts: string;
    /** Workspace-relative product root every writable path must stay inside. */
    projectRoot: string;
    /** Protected platform paths derived from the workspace/config. */
    forbiddenPaths: readonly string[];
}): {
    system: string;
    user: string;
};
/** Parse + validate the model plan; undefined means "fall back to the template". */
export declare function parsePlanSpecs(raw: string, roles: readonly string[], projectRoot?: string, forbiddenPaths?: readonly string[]): PlanTaskSpec[] | undefined;
/** One-shot plan generation; undefined asks the caller to use the template. */
export interface PlanGenerationResult {
    readonly specs?: PlanTaskSpec[];
    readonly error?: string;
}
/** At least one task title/description must mention a goal token. */
export declare function planLooksRelevant(specs: readonly PlanTaskSpec[], goal: string, constraints: readonly string[]): boolean;
export declare function generatePlanSpecs(ctx: Context, captain: Agent, input: {
    goal: string;
    mode: TeamMode;
    clarification: TeamClarification;
    roles: readonly {
        role: string;
        name: string;
    }[];
    workspaceFacts: string;
    projectRoot: string;
    forbiddenPaths: readonly string[];
}, signal?: AbortSignal): Promise<PlanGenerationResult>;
