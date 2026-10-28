import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
import type { SessionId } from '@deepseek-ai/dsh-session/types';
import type { AgentTeamsTranslate } from './locales.ts';
export declare function QuickStartWizard({ sessionId, existingTeam, t, onDone, onFounded }: {
    readonly sessionId: SessionId;
    /** The hall already knows a sect exists: confirm before replacing it. */
    readonly existingTeam?: boolean;
    readonly t: AgentTeamsTranslate;
    readonly onDone?: () => void;
    readonly onFounded?: () => void;
}): import("react").JSX.Element;
/** 对话头部的开宗入口：统一打开洞府里的内容气泡，不再弹独立窗口。 */
export declare function TeamQuickStart({ t }: PropsLocale<'agentTeams'>): import("react").JSX.Element;
