import type { TaskKind, TeamClarification, TeamRequirement } from './types.ts';
/** One built-in template: default roles and a small task DAG. */
export declare const SECT_NAMES: Record<string, string>;
export declare const ROLE_NAMES: Record<string, string>;
export interface QuickStartTemplate {
    readonly id: string;
    readonly label: string;
    readonly roles: readonly string[];
    readonly tasks: readonly {
        readonly id: string;
        readonly subject: string;
        readonly role: string;
        readonly description: string;
        /** Expected artifact/acceptance, appended to the staged task description. */
        readonly expected?: string;
        readonly dependencies?: readonly string[];
        /** Quality task kind; omitted means ordinary work. */
        readonly kind?: TaskKind;
        readonly objective?: string;
        readonly acceptance?: readonly string[];
        readonly inScope?: readonly string[];
        readonly verify?: readonly string[];
        readonly reviewedTaskId?: string;
        readonly coverageOf?: readonly string[];
    }[];
}
export declare const QUICK_START_TEMPLATES: readonly QuickStartTemplate[];
export interface QuickStartPlan {
    readonly teamName: string;
    readonly template: string;
    readonly members: readonly {
        name: string;
        role: string;
    }[];
    readonly tasks: readonly {
        id: string;
        subject: string;
        description: string;
        assignee: string;
        dependencies: string[];
        kind?: TaskKind;
        objective?: string;
        acceptance?: string[];
        inScope?: string[];
        verify?: string[];
        reviewedTaskId?: string;
        coverageOf?: string[];
    }[];
}
/** Delivery defaults inferred from the actual workspace for quality templates. */
export interface QuickStartDelivery {
    inScope: string[];
    verify: string[];
    /** Disjoint frontend/backend roots, when the workspace has recognizable layers. */
    layers?: {
        frontend: string[];
        backend: string[];
    };
}
/**
 * Infer a quality contract from the workspace instead of hardcoding src/ or pnpm test.
 * The same defaults are used by the quick-start route and by tests that build a plan
 * without a workspace (which still get a runnable, conservative contract).
 */
export declare function quickStartDeliveryDefaults(workspace: string): QuickStartDelivery;
/** Build the staged plan a quick-start request turns into. */
export declare function buildQuickStartPlan(goal: string, templateId: string, requestedRoles?: readonly string[], delivery?: QuickStartDelivery): QuickStartPlan;
/** Order tasks so every dependency is staged before its dependents (stable). */
export declare function orderQuickStartTasks(tasks: QuickStartPlan['tasks']): QuickStartPlan['tasks'];
/** One create-task call a quick-start plan stages once the team exists. */
export interface QuickStartTaskCall {
    readonly seedId: string;
    readonly input: {
        readonly subject: string;
        readonly description: string;
        readonly assignee: string;
        /** Seed ids; the route maps them to durable task ids before calling the tool. */
        readonly dependencies: readonly string[];
        readonly kind?: TaskKind;
        readonly objective?: string;
        readonly acceptance?: readonly string[];
        readonly inScope?: readonly string[];
        readonly verify?: readonly string[];
        readonly coverageOf?: readonly string[];
        /** Seed id of the implementation this review judges. */
        readonly reviewedTaskId?: string;
    };
}
/**
 * The host plan schema only carries ordinary task fields, so quality contracts
 * are staged one create-task call at a time after the team exists.
 */
export declare function quickStartTaskCalls(plan: QuickStartPlan): QuickStartTaskCall[];
/** The host tools a quick-start staging pass needs (injectable for tests). */
export interface QuickStartTool {
    execute?: (args: unknown, exec: unknown) => Promise<unknown>;
}
export interface QuickStartTeamTools {
    create: QuickStartTool;
    createTask: QuickStartTool;
    deleteTeam?: QuickStartTool;
}
/**
 * Stage a quick-start team: create the roster first, then add every task with
 * its quality contract. The create tool's plan schema cannot carry quality
 * fields, and a half-staged team would block the next attempt, so a failure
 * after creation rolls the team back before rethrowing.
 */
export interface StageQuickStartOptions {
    /** Confirmed blocking clarification; required by the web route. */
    readonly clarification?: TeamClarification;
    /** User-confirmed requirement text (original + optional polish). */
    readonly requirement?: TeamRequirement;
}
export declare function stageQuickStartTeam(plan: QuickStartPlan, goal: string, run: unknown, tools: QuickStartTeamTools, options?: StageQuickStartOptions): Promise<{
    teamId?: string;
    teamName?: string;
    phase?: string;
}>;
