import type { AgentTeamsTranslate } from './locales.ts';
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
    memoryHintsText: string;
}
export declare const DEFAULT_CLARIFY_DRAFT: ClarifyDraft;
/** Split a textarea into trimmed non-empty lines. */
export declare function linesOf(text: string): string[];
/** Convert the draft into the clarification payload the host validates. */
export declare function clarificationPayload(draft: ClarifyDraft): Record<string, unknown>;
export declare function ClarifySheet({ value, onChange, disabled, t }: {
    readonly value: ClarifyDraft;
    readonly onChange: (next: ClarifyDraft) => void;
    readonly disabled?: boolean;
    readonly t: AgentTeamsTranslate;
}): import("react").JSX.Element;
