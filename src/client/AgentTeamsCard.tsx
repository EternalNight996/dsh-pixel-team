/**
 * AgentTeams conversation card: the lightweight in-conversation summary for
 * one team — the captain's portrait and name, the member roster as
 * clickable 道途 portraits (opening the member's subagent transcript), and
 * an "activity panel" button that re-activates the top-right floater.
 *
 * The floater and this card share the `agent-teams:open-panel` window event
 * so the card can summon the panel even after it was closed (or when an old
 * session is re-opened for review).
 * @module dsh-agent-teams/client/card
 */

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import {
  getActivitySnapshotsSnapshot,
  monitorAgentTeam,
  subscribeActivitySnapshots,
} from './activity-monitor.ts'
import type { AgentTeamsCardData } from './agent-teams-card-definition.ts'
import type { AgentTeamsTranslate } from './locales.ts'
import { LEAD_ART, memberArtUrl } from './artwork.ts'
import css from './AgentTeamsCard.module.css'

/** Window event name the floater listens for to open itself. */
export const OPEN_PANEL_EVENT = 'agent-teams:open-panel'

/** Navigation action injected from the plugin's own SessionsService access. */
export interface AgentTeamsCardInjected {
  readonly workspaceBridge?: { getSnapshot: () => unknown; subscribe: (listener: () => void) => () => void }
  readonly openMember: (parentId: SessionId, childId: SessionId) => void
}

/** Complete keyed Chat renderer props. */
export type AgentTeamsCardProps =
  PropsRuntime<'conversation.chat.node', 'agent-teams'>
  & PropsLocale<'agentTeams'>
  & AgentTeamsCardInjected

/** Open the matching team view, carrying this team's summary
 * so the panel can show it even when the team no longer exists on disk
 * (historical session review). */
export function openActivityPanel(data: AgentTeamsCardData): void {
  window.dispatchEvent(new CustomEvent(OPEN_PANEL_EVENT, {
    detail: {
      teamId: data.teamId,
      captainSessionId: data.captainSessionId,
      teamName: data.teamName,
      members: data.members,
    },
  }))
}

const FOLD_STORAGE_KEY = 'dsh-pixel-team:card-folds:v1'

function readFolds(): Record<string, boolean> {
  try { return JSON.parse(window.localStorage.getItem(FOLD_STORAGE_KEY) ?? '{}') as Record<string, boolean> } catch { return {} }
}

function writeFolds(value: Record<string, boolean>): void {
  try { window.localStorage.setItem(FOLD_STORAGE_KEY, JSON.stringify(value)) } catch { /* private mode */ }
}

/** Render one durable team as a compact conversation card. */
const noWorkspace = () => undefined
const noSubscription = () => () => {}

export function AgentTeamsCard({ node, openMember, sessionId, t, workspaceBridge }: AgentTeamsCardProps) {
  const native = useSyncExternalStore(workspaceBridge?.subscribe ?? noSubscription, workspaceBridge?.getSnapshot ?? noWorkspace)
  const location = node.location
  // Closed turns render their card through the official, non-folding turn tail.
  if (native && (location.kind === 'turn' || location.kind === 'step') && location.turn.status === 'closed') return null
  return <AgentTeamsSummary data={node.data} openMember={openMember} sessionId={sessionId} t={t} />
}

function taskStatusLabel(status: string, t: AgentTeamsTranslate): string {
  const key = status === 'claimed' ? 'task.status.claimed'
    : status === 'in_progress' ? 'task.status.inProgress'
      : status === 'completed' ? 'task.status.completed'
        : status === 'failed' ? 'task.status.failed'
          : status === 'cancelled' ? 'task.status.cancelled'
            : 'task.status.pending'
  return t(key as Parameters<typeof t>[0])
}

export function AgentTeamsSummary({ data, openMember, sessionId, t }: AgentTeamsCardInjected & PropsLocale<'agentTeams'> & {
  data: AgentTeamsCardData; sessionId: string
}) {
  // `conversation.chat.node` is session-scoped, so its framework-owned id is
  // a stable owner even while another conversation becomes current.
  const owner = data.captainSessionId || sessionId
  const { teams, archivedTeams } = useSyncExternalStore(
    subscribeActivitySnapshots,
    getActivitySnapshotsSnapshot,
  )
  useEffect(() => {
    return monitorAgentTeam(owner, data.teamId)
  }, [data.teamId, owner])
  const snapshot = teams.find((team) => team.teamId === data.teamId && (owner === '' || team.captainSessionId === owner))
    ?? archivedTeams.find((team) => team.teamId === data.teamId && (owner === '' || team.captainSessionId === owner))
  const resolved = useMemo<AgentTeamsCardData>(() => ({
    ...data,
    captainSessionId: snapshot?.captainSessionId ?? owner,
    teamName: snapshot?.name ?? data.teamName,
    members: snapshot?.members.map((member) => ({ id: member.id, name: member.name, role: member.role })) ?? data.members,
  }), [data, owner, snapshot])
  const messages = (snapshot?.messages ?? []).slice(-8)
  const [folds, setFolds] = useState<Record<string, boolean>>(() => readFolds())
  useEffect(() => { writeFolds(folds) }, [folds])
  const doneFoldKey = `${data.teamId}:done`
  return (
    <section className={css.root} data-agent-teams-card data-team-id={resolved.teamId}>
      <header className={css.head}>
        <img className={css.leadAvatar} src={LEAD_ART} alt="" aria-hidden />
        <span className={css.teamName} title={resolved.teamName}>{resolved.teamName}</span>
        <span className={css.memberCount}>{t('card.memberCount', { count: resolved.members.length })}</span>

      </header>
      {(snapshot?.tasks.length ?? 0) > 0 && (
        <details className={css.taskFold}>
          <summary>📋 任务明细 · {snapshot?.tasks.length} 项</summary>
          <table className={css.taskTable}>
            <thead><tr><th>任务</th><th>内容</th><th>执行人</th><th>状态</th></tr></thead>
            <tbody>
              {(snapshot?.tasks ?? []).map(task => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td title={task.subject}>{task.subject}</td>
                  <td>{task.assignee || t('task.assignee.unclaimed')}</td>
                  <td data-state={task.status}>{taskStatusLabel(task.status, t)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
      {((snapshot?.description ?? '') !== '' || messages.length > 0 || (snapshot?.tasks.length ?? 0) > 0) && (
        <div className={css.comms} data-team-comms>
          <span className={css.commsTitle}>{t('card.comms')}</span>
          {(snapshot?.description ?? '') !== '' && (
            <p className={css.commsGoal} title={snapshot?.description}>🎯 {snapshot?.description}</p>
          )}
          {[...(snapshot?.tasks ?? [])].filter(task => task.status === 'failed' || task.status === 'cancelled' || task.status === 'pending' || task.status === 'claimed' || task.status === 'in_progress').slice(0, 4).map((task) => {
            const member = snapshot?.members.find(row => row.name === task.assignee)
            const art = task.assignee === '' ? LEAD_ART : memberArtUrl(task.assignee, member?.role ?? '')
            const failed = task.status === 'failed' || task.status === 'cancelled'
            return (
              <div key={task.id} className={css.taskRow} data-state={failed ? 'failed' : 'active'}>
                <img className={css.taskArt} src={art ?? LEAD_ART} alt="" aria-hidden />
                <span className={css.taskMain}>
                  <span className={css.taskMeta}>
                    <strong>{task.assignee || t('task.assignee.unclaimed')}</strong>
                    {' · '}{taskStatusLabel(task.status, t)}
                  </span>
                  <span className={css.taskSubject}>{task.id} · {task.subject}</span>
                  {failed && (task.output ?? '') !== '' && (
                    <span className={css.taskError} title={task.output}>{task.output}</span>
                  )}
                </span>
              </div>
            )
          })}
          {[...new Map((snapshot?.tasks ?? []).filter(task => task.status === 'completed').map(task => [`${task.id}:${task.attempt ?? 0}`, task])).values()].map((task) => {
            const key = `${data.teamId}:${task.id}:${task.attempt ?? 0}`
            return (
              <details
                key={key}
                className={css.doneFold}
                open={folds[key] === true}
                onToggle={(event) => {
                  const open = event.currentTarget.open
                  setFolds(current => current[key] === open ? current : { ...current, [key]: open })
                }}
              >
                <summary>✓ {task.id} · {task.assignee || t('task.assignee.unclaimed')} · {task.subject}</summary>
                {(task.output ?? '') !== '' && <span className={css.doneResult}>{task.output}</span>}
              </details>
            )
          })}
          <ul className={css.commsList}>
            {messages.map((message) => {
              const fromCaptain = message.from === 'captain' || message.from === ''
              const role = fromCaptain ? '' : snapshot?.members.find((member) => member.name === message.from)?.role ?? ''
              const art = fromCaptain ? LEAD_ART : memberArtUrl(message.from, role)
              return (
                <li key={message.id ?? `${message.ts ?? 0}:${message.from}`} className={css.commsRow} data-from={fromCaptain ? 'captain' : 'member'}>
                  <img className={css.commsAvatar} src={art ?? ''} alt="" aria-hidden />
                  <span className={css.commsText}>
                    <span className={css.commsMeta}>{message.from} → {message.to ?? 'captain'}</span>
                    <span className={css.commsBody} title={message.content}>{message.content}</span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {resolved.members.length > 0 && (
        <div className={css.members}>
          {resolved.members.map((member) => (
            <button
              type="button"
              key={member.id || member.name}
              className={css.member}
              onClick={() => {
                if (member.id !== '') openMember(owner as SessionId, member.id as SessionId)
              }}
              title={member.role === '' ? member.name : `${member.name} · ${member.role}`}
            >
              {memberArtUrl(member.name, member.role) !== null ? (
                <img className={css.memberArt} src={memberArtUrl(member.name, member.role) ?? ''} alt="" aria-hidden />
              ) : (
                <span className={css.memberInitial}>{member.name.trim().slice(0, 1).toUpperCase() || '?'}</span>
              )}
              <span className={css.memberName}>{member.name}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
