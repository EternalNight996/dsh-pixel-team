import type { CommandResult } from './types.ts';
/** Current uncommitted paths from git, or undefined when this is not a git workspace. */
export declare function actualChangedPaths(workspace: string): Promise<string[] | undefined>;
/** Declared paths that do not exist in the current uncommitted diff. */
export declare function missingDeclaredChanges(actual: readonly string[], declared: readonly string[]): string[];
/** Run every declared verification command sequentially in the workspace. */
export declare function runHostVerification(workspace: string, commands: readonly string[], timeoutMs?: number): Promise<CommandResult[]>;
