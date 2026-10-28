/**
 * Verifier gate helpers (module 5).
 *
 * The constitution's acceptance list mixes executable checks with human
 * criteria. Executable lines become verify commands; prose criteria stay in the
 * task acceptance and block the reviewer until recorded.
 */
import type { TeamConstitution } from './types.ts';
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
/**
 * Generate the verifier smoke script from executable acceptance commands.
 * Running it prints 【PASS】/【FAIL】, writes the full log beside itself and exits
 * non-zero on the first failure set so the host gate can fail the task.
 */
export declare function buildVerifierScript(commands: readonly string[], name: string): VerifierScript | undefined;
