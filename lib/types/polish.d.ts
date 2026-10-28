/**
 * Optional AI requirement polish (module 0).
 *
 * The model only expands the user's sentence and proposes hidden assumptions.
 * It never replaces the original text: the UI shows both and the user confirms
 * before clarification starts.
 */
import type { Context } from '@deepseek-ai/cordis';
import type { Agent } from '@deepseek-ai/dsh-agent';
import { type TeamMode } from './modes.ts';
export declare const POLISH_MAX_CHARS = 200;
export interface PolishResult {
    readonly expanded: string;
    readonly hiddenConditions: readonly string[];
    /** True when the model route was unavailable and the original text is returned. */
    readonly degraded: boolean;
    readonly model?: string;
}
export declare function buildPolishPrompts(requirement: string, workspaceFacts: string, mode?: TeamMode): {
    system: string;
    user: string;
};
/** Parse a model reply into the polish result; throws when it is not usable JSON. */
export declare function parsePolishOutput(raw: string): {
    expanded: string;
    hiddenConditions: string[];
};
/**
 * One-shot polishing call. Any failure degrades to the original requirement so
 * the wizard never dead-ends on the model.
 */
export declare function polishRequirement(ctx: Context, captain: Agent, input: {
    requirement: string;
    workspaceFacts: string;
    mode?: TeamMode;
}, signal?: AbortSignal): Promise<PolishResult>;
