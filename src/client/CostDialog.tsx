/** Module 4: soft cost prompt. Continue or terminate this one spawn only. */
import css from './CostDialog.module.css'
import { decideCost, useLibraryState } from './library-stream.ts'
import type { AgentTeamsTranslate } from './locales.ts'

export function CostDialog({ sessionId, t }: {
  readonly sessionId: string | undefined
  readonly t: AgentTeamsTranslate
}) {
  const { costPrompt } = useLibraryState(sessionId)
  if (costPrompt === undefined) return null
  const reason = costPrompt.reason === 'task' ? t('cost.task') : t('cost.day')
  return (
    <div className={css.backdrop} role="dialog" aria-modal="true" aria-label={t('cost.title')}>
      <section className={css.dialog}>
        <h3 className={css.title}>{t('cost.title')}</h3>
        <p className={css.body}>{t('cost.body', {
          member: costPrompt.memberName,
          estimate: costPrompt.estimateUsd.toFixed(4),
          threshold: costPrompt.thresholdUsd.toFixed(2),
          reason,
        })}</p>
        <p className={css.note}>{t('cost.note')}</p>
        <div className={css.actions}>
          <button type="button" onClick={() => { void decideCost(costPrompt.requestId, 'terminate') }}>{t('cost.terminate')}</button>
          <button type="button" data-primary onClick={() => { void decideCost(costPrompt.requestId, 'continue') }}>{t('cost.continue')}</button>
        </div>
      </section>
    </div>
  )
}
