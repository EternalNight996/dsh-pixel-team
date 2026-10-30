/** Renderer guard for the hall/plan UI: a bad staged plan must not kill DSH. */
import { Component, type ErrorInfo, type ReactNode } from 'react';
export declare class TeamUiBoundary extends Component<{
    readonly children: ReactNode;
}, {
    readonly error?: string;
}> {
    state: {
        readonly error?: string;
    };
    static getDerivedStateFromError(error: unknown): {
        error: string;
    };
    componentDidCatch(error: Error, info: ErrorInfo): void;
    render(): ReactNode;
}
