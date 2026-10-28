import type { TeamMode } from '../modes.ts';
import type { AgentTeamsTranslate } from './locales.ts';
export interface InterviewQuestionView {
    id: string;
    prompt: string;
    multi: boolean;
    options: string[];
}
export declare function InterviewSheet({ questions, answers, onChange, state, error, mode, disabled, onRetry, t }: {
    readonly questions: readonly InterviewQuestionView[];
    readonly answers: Readonly<Record<string, string[]>>;
    readonly onChange: (next: Record<string, string[]>) => void;
    readonly state: 'loading' | 'ready' | 'fallback';
    readonly error: string;
    readonly mode: TeamMode;
    readonly disabled?: boolean;
    readonly onRetry: () => void;
    readonly t: AgentTeamsTranslate;
}): import("react").JSX.Element;
