/**
 * Cost report for the roster sheet: per-team option totals and, for the
 * selected team, per-task totals plus recent entries (no "today" line).
 */
import { useCallback, useEffect, useState } from 'react'
import { usdToCny } from '../currency.ts'
import type { AgentTeamsTranslate } from './locales.ts'
import css from './CostLedger.module.css'

export interface CostEntry {
  ts: number
  teamId?: string
  taskId?: string
  memberName?: string
  estimateUsd: number
  mode?: string
  decision?: string
}

export interface CostReport {
  today_usd: number
  by_task: { taskId: string; usd: number; count: number }[]
  by_team: { teamId: string; usd: number }[]
  entries: CostEntry[]
}

function money(usd: number): string {
  return '¥' + usdToCny(usd).toFixed(2)
}

async function loadReport(sessionId: string, teamId?: string): Promise<CostReport> {
  const query = '?sessionId=' + encodeURIComponent(sessionId) + (teamId === undefined || teamId === '' ? '' : '&teamId=' + encodeURIComponent(teamId))
  const response = await fetch('/plugins/dsh-pixel-team/cost/report' + query)
  const body = await response.json() as CostReport & { error?: string }
  if (!response.ok) throw new Error(body.error ?? 'failed to load costs')
  return body
}

/** All-team report, used for the dropdown option totals. */
export function useCostReport(sessionId?: string): { report?: CostReport; reload: () => void } {
  const [report, setReport] = useState<CostReport>()
  const reload = useCallback((): void => {
    if (sessionId === undefined || sessionId === '') return
    void loadReport(sessionId).then(setReport).catch(() => undefined)
  }, [sessionId])
  useEffect(() => { reload() }, [reload])
  return { report, reload }
}

export function CostDetail({ sessionId, teamId, t }: {
  readonly sessionId?: string
  readonly teamId?: string
  readonly t: AgentTeamsTranslate
}) {
  const [report, setReport] = useState<CostReport>()
  const [error, setError] = useState('')
  const load = useCallback((): void => {
    if (sessionId === undefined || sessionId === '' || teamId === undefined || teamId === '') return
    void loadReport(sessionId, teamId)
      .then(body => { setReport(body); setError('') })
      .catch((caught: unknown) => { setError(caught instanceof Error ? caught.message : String(caught)) })
  }, [sessionId, teamId])
  useEffect(() => { load() }, [load])
  if (sessionId === undefined || teamId === undefined) return null
  return (
    <section className={css.ledger}>
      <header className={css.head}>
        <strong>{t('cost.ledger.title')}</strong>
        <button type="button" className={css.refresh} onClick={load}>{t('cost.ledger.refresh')}</button>
      </header>
      {error !== '' && <p className={css.error}>{error}</p>}
      {report !== undefined && report.by_task.length > 0 && (
        <div className={css.block}>
          <span className={css.blockTitle}>{t('cost.ledger.byTask')}</span>
          <ul className={css.list}>
            {report.by_task.map(item => (
              <li key={item.taskId} className={css.row}>
                <span className={css.key}>{item.taskId === '(spawn)' ? t('cost.ledger.unlinked') : item.taskId}</span>
                <span className={css.meta}>{item.count}×</span>
                <span className={css.amount}>{money(item.usd)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {report !== undefined && report.entries.length > 0 && (
        <div className={css.block}>
          <span className={css.blockTitle}>{t('cost.ledger.recent')}</span>
          <ul className={css.list}>
            {report.entries.slice(0, 12).map((entry, index) => (
              <li key={String(entry.ts) + index} className={css.row}>
                <span className={css.key}>{new Date(entry.ts).toLocaleTimeString('zh-CN', { hour12: false })}</span>
                <span className={css.meta}>{entry.memberName ?? '—'} · {entry.taskId ?? t('cost.ledger.unlinked')} · {entry.decision ?? '—'}</span>
                <span className={css.amount}>{money(entry.estimateUsd)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {report !== undefined && report.by_task.length === 0 && <p className={css.empty}>{t('cost.ledger.empty')}</p>}
    </section>
  )
}

export { money }
