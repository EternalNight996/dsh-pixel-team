/**
 * Development modes: one source of truth for philosophy, default boundaries,
 * acceptance, verifier strategy, failure limits and budget.
 *
 * Every module reads this table instead of scattering mode branches.
 */
export declare const TEAM_MODES: readonly ["draft", "precision", "legacy", "compliance", "monetize"];
export type TeamMode = typeof TEAM_MODES[number];
export declare const DEFAULT_MODE: TeamMode;
export type VerifierStrategy = 'smoke' | 'unit-network' | 'legacy-regression' | 'compliance-audit';
export interface ModeSpec {
    readonly id: TeamMode;
    readonly labelKey: string;
    /** Server-side Chinese name (prompts/constitution). */
    readonly name: string;
    readonly emoji: string;
    readonly color: string;
    /** Injected at the very front of every member System Prompt. */
    readonly philosophy: string;
    readonly defaultExcluded: readonly string[];
    readonly acceptanceDefaults: readonly string[];
    readonly verifier: {
        readonly strategy: VerifierStrategy;
        readonly failLimit: number;
        /** Legacy: a failing old regression suite blocks immediately. */
        readonly blockOnOldTestFail: boolean;
    };
    readonly budget: {
        readonly perTaskUsd: number;
        readonly perDayUsd: number;
        /** Retry count at which the UI asks for human triage. */
        readonly retryPromptAt: number;
    };
}
export declare const MODE_SPECS: Record<TeamMode, ModeSpec>;
/** Is this value one of the five modes? */
export declare function isTeamMode(value: unknown): value is TeamMode;
/** Resolve a spec; unknown/missing values fall back to precision (old data). */
export declare function getModeSpec(mode: TeamMode | undefined): ModeSpec;
/** Human label for prompts and the constitution. */
export declare function modeLabel(mode: TeamMode | undefined): string;
/** The philosophy block prepended to every member persona. */
export declare function modePhilosophyText(mode: TeamMode | undefined): string;
