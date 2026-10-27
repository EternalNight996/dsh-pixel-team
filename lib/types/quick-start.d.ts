import type { TaskKind } from './types.ts';
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
