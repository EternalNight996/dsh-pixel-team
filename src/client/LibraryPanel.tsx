/** Module 3: 道统·藏经阁 — live task progress list (single column, expand on click). */
import { useEffect, useState } from 'react'
import css from './LibraryPanel.module.css'
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

export function LibraryPanel({ sessionId, t }: {
  readonly sessionId: string
  readonly t: AgentTeamsTranslate
}) {
  const { team, connected } = useLibraryState(sessionId)
  const [stopping, setStopping] = useState<Record<string, boolean>>({})
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [costByTask, setCostByTask] = useState<Record<string, number>>({})
  useEffect(() => {
    let cancelled = false
    void fetch('/plugins/dsh-pixel-team/cost/report?sessionId=' + encodeURIComponent(sessionId))
      .then(response => response.json())
      .then((body: { by_task?: { taskId: string; usd: number }[] }) => {
        if (cancelled || body.by_task === undefined) return
        const next: Record<string, number> = {}
        for (const item of body.by_task) next[item.taskId] = item.usd
        setCostByTask(next)
      })
      .catch(() => undefined)
    return () => { cancelled = true }
  }, [sessionId, team?.tasks.length ?? 0])
  if (team === null) {
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
        <span className={css.version}>v{PLUGIN_VERSION}</span>
        <span className={connected ? css.live : css.offline}>{connected ? t('library.connected') : t('library.disconnected')}</span>
      </header>
      {team.requirements.length > 0 && (
        <section className={css.requirements}>
          <span className={css.reqTitle}>{t('library.requirements')}</span>
          <ol className={css.reqList}>
            {team.requirements.map((item, index) => {
              const allDone = team.tasks.length > 0 && team.tasks.every(task => task.status === 'completed')
              const anyFailed = team.tasks.some(task => task.status === 'failed')
              return (
                <li key={index} className={css.reqItem} data-state={allDone ? 'pass' : anyFailed ? 'fail' : 'pending'}>
                  <span className={css.reqIndex}>{index + 1}</span>
                  <span className={css.reqText}>{item}</span>
                  <span className={css.reqState}>{allDone ? 'PASS' : anyFailed ? 'FAIL' : t('library.inProgress')}</span>
                </li>
              )
            })}
          </ol>
        </section>
      )}
      <span className={css.skeletonTitle}>{t('library.skeleton')}</span>
      <div className={css.list}>
        {team.tasks.map((task, index) => {
          const passed = task.acceptance.filter(item => item.status === 'pass').length
          const failed = task.acceptance.filter(item => item.status === 'fail').length
          const active = task.status === 'claimed' || task.status === 'in_progress'
          const open = expanded[task.id] === true
          const taskCost = costByTask[task.id]
          return (
            <div key={task.id} className={css.row} data-status={task.status}>
              <button
                type="button"
                className={css.rowHead}
                aria-expanded={open}
                onClick={() => { setExpanded(previous => ({ ...previous, [task.id]: !open })) }}
              >
                <span className={css.rowChevron} aria-hidden>{open ? '▾' : '▸'}</span>
                <span className={css.rowIndex}>{index + 1}</span>
                <code className={css.rowId}>{task.id}</code>
                <span className={css.rowSubject} title={task.subject}>{task.subject}</span>
                <span className={css.rowMeta}>{task.assignee || t('library.unassigned')}</span>
                <span className={css.rowStatus}>{t(STATUS_KEY[task.status] ?? 'library.status.pending')}</span>
                <span className={css.rowAcceptance} data-failed={failed > 0 || undefined}>
                  {t('library.acceptance', { pass: passed, total: task.acceptance.length })}
                </span>
                {task.failures > 0 && <span className={css.rowFailures}>{t('library.failures', { count: task.failures })}</span>}
                {taskCost !== undefined && taskCost > 0 && (
                  <span className={css.rowCost}>{'¥' + usdToCny(taskCost).toFixed(2)}</span>
                )}
              </button>
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
              {open && (
                <div className={css.rowDetail}>
                  {task.description !== '' && <span className={css.detailDesc}>{task.description}</span>}
                  <span className={css.detailMeta}>
                    {t('library.deps')}: {task.dependencies.join(', ') || t('library.noDeps')} · {task.kind}
                  </span>
                  {task.acceptance.length > 0 && (
                    <ul className={css.acceptanceList}>
                      {task.acceptance.map(item => (
                        <li key={item.criterion} data-status={item.status}>
                          <span className={css.acceptanceMark}>
                            {item.status === 'pass' ? 'PASS' : item.status === 'fail' ? 'FAIL' : t('library.pending')}
                          </span>
                          {item.criterion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <footer className={css.blocker} data-blocked={team.blocker === undefined ? undefined : true}>
        <span className={css.blockerTitle}>{t('library.blocker')}</span>
        {team.blocker === undefined
          ? <span>{t('library.noBlocker')}</span>
          : <span>{team.blocker.subject}：{team.blocker.reason}</span>}
      </footer>
    </div>
  )
}
