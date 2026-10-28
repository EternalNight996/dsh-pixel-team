import type { TeamConstitution } from './types.ts';
import { type TeamMode } from './modes.ts';
export interface AcceptanceSplit {
    readonly commands: string[];
    readonly criteria: string[];
}
/** Split acceptance lines into runnable commands and human criteria. */
export declare function splitAcceptance(acceptance: readonly string[]): AcceptanceSplit;
/** Required output contract for every verifier completion. */
export declare function verifierOutputContract(): string;
/** Extra acceptance criteria derived from the constitution (deduplicated). */
export declare function constitutionCriteria(constitution: TeamConstitution | undefined): string[];
export interface VerifierScript {
    /** Workspace-relative script path (POSIX separators). */
    readonly relativePath: string;
    readonly content: string;
}
/** Human description of the verifier strategy for the selected mode. */
export declare function verifierStrategyText(mode?: TeamMode): string;
/**
 * Best-effort discovery of the project's legacy regression command. The legacy
 * mode must not silently pass without one: when nothing is found the acceptance
 * baseline still requires the user to declare it.
 */
export declare function detectLegacyRegressionCommand(workspace: string): string | undefined;
/**
 * Generate the verifier smoke script from executable acceptance commands plus
 * the mode's strategy: compliance adds a dependency audit and a log-secret scan.
 * Running it prints 【PASS】/【FAIL】, writes the full log beside itself and exits
 * non-zero when any check fails, so the host gate fails the task.
 */
export declare function buildVerifierScript(commands: readonly string[], name: string, mode?: TeamMode): VerifierScript | undefined;
