import type { AgentTeamsTranslate } from './locales.ts';
export declare function PolishPreview({ original, expanded, conditions, selected, degraded, busy, error, onExpandedChange, onToggle, onConfirm, onCancel, t }: {
    readonly original: string;
    readonly expanded: string;
    readonly conditions: readonly string[];
    readonly selected: readonly string[];
    readonly degraded: boolean;
    readonly busy: boolean;
    readonly error: string;
    readonly onExpandedChange: (next: string) => void;
    readonly onToggle: (condition: string) => void;
    readonly onConfirm: () => void;
    readonly onCancel: () => void;
    readonly t: AgentTeamsTranslate;
}): import("react").JSX.Element;
