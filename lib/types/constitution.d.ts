import type { TeamClarification, TeamConstitution } from './types.ts';
export declare const CONSTITUTION_DIR = ".pixel-team";
/** Relative POSIX path for one project's constitution. */
export declare function constitutionRelativePath(project: string): string;
export declare function checksumOf(text: string): string;
/** Freeze the confirmed clarification into the constitution shape. */
export declare function buildConstitution(clarification: TeamClarification, project: string): TeamConstitution;
/**
 * Write the constitution atomically. Refuses to overwrite an existing file
 * unless the caller explicitly re-runs clarification.
 * @returns the workspace-relative path and content checksum.
 */
export declare function writeConstitution(workspace: string, project: string, constitution: TeamConstitution, allowOverwrite?: boolean): Promise<{
    path: string;
    checksum: string;
    project: string;
}>;
/** Read and parse a constitution; undefined when it was never written. */
export declare function readConstitution(workspace: string, project: string): Promise<{
    path: string;
    checksum: string;
    text: string;
    json: TeamConstitution;
} | undefined>;
/** Highest-priority system-prompt block prepended to every member persona. */
export declare function constitutionPreamble(text: string): string;
/** Compact digest appended to task dispatch prompts. */
export declare function constitutionDigest(constitution: TeamConstitution): string;
