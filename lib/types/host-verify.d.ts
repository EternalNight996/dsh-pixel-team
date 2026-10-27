import type { CommandResult } from './types.ts';
/** Run every declared verification command sequentially in the workspace. */
export declare function runHostVerification(workspace: string, commands: readonly string[], timeoutMs?: number): Promise<CommandResult[]>;
