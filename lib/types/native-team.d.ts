/**
 * Read-only bridge to the host's experimental Agent Teams projection.
 *
 * The plugin keeps its own delivery runtime; this bridge lets the panel show
 * when a native team exists for the same captain so the two systems do not
 * silently diverge. It never mutates native state.
 */
import type { Agent } from '@deepseek-ai/dsh-agent';
export interface NativeTeamSummary {
    readonly id: string;
    readonly members: number;
    readonly tasks: number;
    readonly completed: number;
}
/** Summarize the host's native agentTeam projection for one captain, if any. */
export declare function nativeTeamSummary(ctx: unknown, captain: Agent): NativeTeamSummary | undefined;
