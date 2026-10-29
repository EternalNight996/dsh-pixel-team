import type { TeamState } from './types.ts';
/** Refresh projects/<root>/ARCHITECTURE.md after a plan or approval change. */
export declare function syncArchitectureFile(workspace: string, team: TeamState): void;
