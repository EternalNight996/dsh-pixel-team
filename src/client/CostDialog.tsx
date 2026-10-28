/** Module 4: soft cost / dead-loop prompts. Continue or terminate this one action only. */
import css from './CostDialog.module.css'
import { decideCost, useLibraryState } from './library-stream.ts'
import type { AgentTeamsTranslate } from './locales.ts'
import { usdToCny } from '../currency.ts'

export function CostDialog({ sessionId, t }: {
  readonly sessionId: string | undefined
  readonly t: AgentTeamsTranslate
}) {
  const { costPrompt } = useLibraryState(sessionId)
  if (costPrompt === undefined) return null
  const retry = costPrompt.reason === 'retry'
  const reason = costPrompt.reason === 'task' ? t('cost.task') : t('cost.day')
  return (
    <div className={css.backdrop} role="dialog" aria-modal="true" aria-label={retry ? t('cost.retryTitle') : t('cost.title')}>
      <section className={css.dialog}>
        <h3 className={css.title}>{retry ? t('cost.retryTitle') : t('cost.title')}</h3>
        {retry
          ? <p className={css.body}>{t('cost.retryBody', { count: String(costPrompt.retryCount ?? 0) })}</p>
          : <p className={css.body}>{t('cost.body', {
            member: costPrompt.memberName,
            estimate: usdToCny(costPrompt.estimateUsd).toFixed(2),
            threshold: usdToCny(costPrompt.thresholdUsd).toFixed(2),
            reason,
          })}</p>}
        <p className={css.note}>{retry ? t('cost.retryNote') : t('cost.note')}</p>
        <div className={css.actions}>
          <button type="button" onClick={() => { void decideCost(costPrompt.requestId, 'terminate') }}>
            {retry ? t('cost.retryStop') : t('cost.terminate')}
          </button>
          <button type="button" data-primary onClick={() => { void decideCost(costPrompt.requestId, 'continue') }}>{t('cost.continue')}</button>
        </div>
      </section>
    </div>
  )
}
