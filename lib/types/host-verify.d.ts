import type { CommandResult } from './types.ts';
/** Current uncommitted paths from git, or undefined when this is not a git workspace. */
export declare function actualChangedPaths(workspace: string): Promise<string[] | undefined>;
/** Declared paths that do not exist in the current uncommitted diff. */
export declare function missingDeclaredChanges(actual: readonly string[], declared: readonly string[]): string[];
/**
 * Product-level verify commands detected from the generated project itself.
 * Never falls back to the plugin's scripts: only a package.json inside the
 * task's inScope root counts.
 */
export declare function productVerifyCommands(workspace: string, projectRoot: string | undefined): string[];
/** Run every declared verification command sequentially in the workspace. */
export declare function runHostVerification(workspace: string, commands: readonly string[], timeoutMs?: number): Promise<CommandResult[]>;
