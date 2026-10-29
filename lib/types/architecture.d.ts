/** Deterministic project architecture summary shown in the library and injected into personas. */
import type { TeamState } from './types.ts';
/** Build the "core architecture" text from the confirmed requirement + DAG. */
export declare function buildArchitecture(team: TeamState): string;
