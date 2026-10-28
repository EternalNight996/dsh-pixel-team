import { type ClarifyOptions } from '../clarify.ts';
import type { AgentTeamsTranslate } from './locales.ts';
import { type TeamMode } from '../modes.ts';
export interface ClarifyDraft {
    type: 'hardware' | 'software';
    scale: 'small' | 'medium' | 'fullstack';
    ui: {
        reference: string;
        styles: string[];
        notes: string;
    };
    platforms: string[];
    hardwareList: string[];
    excluded: string[];
    excludedCustom: string;
    acceptanceText: string;
    constraintsText: string;
    platformsCustom: string;
    stylesCustom: string;
    hardwareCustom: string;
    memoryHintsText: string;
}
export declare const DEFAULT_CLARIFY_DRAFT: ClarifyDraft;
/** Static menu for the current mode, used only when the model route is unavailable. */
export declare function fallbackOptionsFor(mode?: TeamMode): ClarifyOptions;
/** Split a textarea into trimmed non-empty lines. */
export declare function linesOf(text: string): string[];
/** Convert the draft into the clarification payload the host validates. */
export declare function clarificationPayload(draft: ClarifyDraft): Record<string, unknown>;
export declare function ClarifySheet({ value, onChange, options, state, mode, disabled, t }: {
    readonly value: ClarifyDraft;
    readonly onChange: (next: ClarifyDraft) => void;
    readonly options?: ClarifyOptions;
    readonly state: 'loading' | 'ready' | 'fallback';
    readonly mode: TeamMode;
    readonly disabled?: boolean;
    readonly t: AgentTeamsTranslate;
}): import("react").JSX.Element;
