import type { DeliveryResult } from './quality-gates.ts';
import type { TeamState } from './types.ts';
export declare function buildDeliveryReport(team: TeamState, delivery: DeliveryResult): string;
/** Write the report into the team directory and return its absolute path. */
export declare function writeDeliveryReport(stateRoot: string, team: Pick<TeamState, 'id'>, markdown: string): Promise<string>;
