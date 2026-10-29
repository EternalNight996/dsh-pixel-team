import type { AgentTeamsTranslate } from './locales.ts';
export interface CostEntry {
    ts: number;
    teamId?: string;
    taskId?: string;
    memberName?: string;
    estimateUsd: number;
    mode?: string;
    decision?: string;
}
export interface CostReport {
    today_usd: number;
    by_task: {
        taskId: string;
        usd: number;
        count: number;
    }[];
    by_team: {
        teamId: string;
        usd: number;
    }[];
    entries: CostEntry[];
}
declare function money(usd: number): string;
/** All-team report, used for the dropdown option totals. */
export declare function useCostReport(sessionId?: string): {
    report?: CostReport;
    reload: () => void;
};
export declare function CostDetail({ sessionId, teamId, t }: {
    readonly sessionId?: string;
    readonly teamId?: string;
    readonly t: AgentTeamsTranslate;
}): import("react").JSX.Element | null;
export { money };
