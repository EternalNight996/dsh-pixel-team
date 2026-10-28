/** Module 3: 道通藏书阁 — live DAG projection pushed over SSE. */
import { useMemo, useState } from 'react'
import css from './LibraryPanel.module.css'
import { layoutLibrary, CARD_W, CARD_H } from './library-model.ts'
import { useLibraryState } from './library-stream.ts'
import type { AgentTeamsTranslate } from './locales.ts'
import { PLUGIN_VERSION } from './version.ts'
import { usdToCny } from '../currency.ts'

const STATUS_KEY: Record<string, Parameters<AgentTeamsTranslate>[0]> = {
  pending: 'library.status.pending',
  claimed: 'library.status.claimed',
  in_progress: 'library.status.inProgress',
  completed: 'library.status.completed',
  failed: 'library.status.failed',
}

const EDGE_COLOR: Record<string, string> = {
  satisfied: '#7fd6a8',
  running: '#f2c14e',
  unlocked: '#6fb6ff',
  waiting: '#5b6472',
}

export function LibraryPanel({ sessionId, t }: {
  readonly sessionId: string
  readonly t: AgentTeamsTranslate
}) {
  const { team, todayCostUsd, connected } = useLibraryState(sessionId)
  const [stopping, setStopping] = useState<Record<string, boolean>>({})
  const layout = useMemo(() => (team === null ? undefined : layoutLibrary(team)), [team])
  if (team === null || layout === undefined) {
    return <p className={css.empty}>{t('library.empty')}</p>
  }
  const stopTask = async (taskId: string): Promise<void> => {
    if (!window.confirm(t('library.stopConfirm'))) return
    setStopping(previous => ({ ...previous, [taskId]: true }))
    try {
      await fetch('/plugins/dsh-pixel-team/task/stop', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sessionId, taskId }),
      })
    } finally {
      setStopping(previous => ({ ...previous, [taskId]: false }))
    }
  }
  return (
    <div className={css.root} data-library>
      <header className={css.head}>
        <span className={css.team}>{team.name}</span>
        <span className={css.mode} style={{ color: team.modeColor, borderColor: team.modeColor }}>{team.modeName}</span>
        <span className={css.scale}>{team.scale}</span>
        <span className={css.gate}>{t('library.gate', { pass: team.gate.passed, total: team.gate.total })}</span>
        <span className={css.cost}>{t('library.todayCost', { cost: usdToCny(todayCostUsd).toFixed(2) })}</span>
        <span className={css.version}>v{PLUGIN_VERSION}</span>
        <span className={connected ? css.live : css.offline}>{connected ? t('library.connected') : t('library.disconnected')}</span>
      </header>
      <div className={css.canvas} style={{ width: layout.width, height: layout.height }}>
        <svg className={css.edges} width={layout.width} height={layout.height} aria-hidden>
          {layout.edges.map((edge) => (
            <path
              key={edge.from + '->' + edge.to}
              d={'M ' + edge.x1 + ' ' + edge.y1 + ' C ' + (edge.x1 + 24) + ' ' + edge.y1 + ', ' + (edge.x2 - 24) + ' ' + edge.y2 + ', ' + edge.x2 + ' ' + edge.y2}
              stroke={EDGE_COLOR[edge.state] ?? EDGE_COLOR.waiting}
              strokeWidth={2}
              fill="none"
              strokeDasharray={edge.state === 'waiting' ? '4 4' : undefined}
            />
          ))}
        </svg>
        {team.tasks.map((task) => {
          const position = layout.lanes.flatMap(lane => lane.cards).find(card => card.taskId === task.id)
          if (position === undefined) return null
          const passed = task.acceptance.filter(item => item.status === 'pass').length
          const failed = task.acceptance.filter(item => item.status === 'fail').length
          const active = task.status === 'claimed' || task.status === 'in_progress'
          return (
            <article
              key={task.id}
              className={css.card}
              data-status={task.status}
              style={{ left: position.x, top: position.y, width: CARD_W, height: CARD_H }}
            >
              <span className={css.subject} title={task.subject}>{task.subject}</span>
              <span className={css.meta}>
                <span className={css.assignee}>{task.assignee || t('library.unassigned')}</span>
                <span className={css.status}>{t(STATUS_KEY[task.status] ?? 'library.status.pending')}</span>
              </span>
              <span className={css.acceptance} data-failed={failed > 0 || undefined}>
                {t('library.acceptance', { pass: passed, total: task.acceptance.length })}
              </span>
              {active && (
                <button
                  type="button"
                  className={css.stop}
                  disabled={stopping[task.id] === true}
                  title={t('library.stop')}
                  onClick={() => { void stopTask(task.id) }}
                >
                  {stopping[task.id] === true ? t('library.stopping') : '■ ' + t('library.stop')}
                </button>
              )}
            </article>
          )
        })}
      </div>
      <footer className={css.blocker} data-blocked={team.blocker === undefined ? undefined : true}>
        <span className={css.blockerTitle}>{t('library.blocker')}</span>
        {team.blocker === undefined
          ? <span>{t('library.noBlocker')}</span>
          : <span>{team.blocker.subject}：{team.blocker.reason}</span>}
      </footer>
      <details className={css.details}>
        <summary>{t('library.details')}</summary>
        <ol className={css.detailList}>
          {team.tasks.map(task => (
            <li key={task.id}>
              <code className={css.detailId}>{task.id}</code>
              <strong>{task.subject}</strong>
              <span className={css.detailMeta}>
                {task.assignee || t('library.unassigned')} · {t(STATUS_KEY[task.status] ?? 'library.status.pending')}
                {' · '}{t('library.deps')}: {task.dependencies.join(', ') || t('library.noDeps')}
              </span>
              {task.description !== '' && <span className={css.detailDesc}>{task.description}</span>}
            </li>
          ))}
        </ol>
      </details>
      <span hidden>{CARD_H}</span>
    </div>
  )
}
