/** Module 0 preview: original vs AI-expanded requirement plus hidden conditions. */
import css from './PolishPreview.module.css'
import type { AgentTeamsTranslate } from './locales.ts'

export function PolishPreview({ original, expanded, conditions, selected, degraded, busy, error, onExpandedChange, onToggle, onConfirm, onCancel, t }: {
  readonly original: string
  readonly expanded: string
  readonly conditions: readonly string[]
  readonly selected: readonly string[]
  readonly degraded: boolean
  readonly busy: boolean
  readonly error: string
  readonly onExpandedChange: (next: string) => void
  readonly onToggle: (condition: string) => void
  readonly onConfirm: () => void
  readonly onCancel: () => void
  readonly t: AgentTeamsTranslate
}) {
  return (
    <div className={css.root} data-polish-preview>
      {degraded && <p className={css.warn}>{t('polish.degraded')}</p>}
      <section className={css.block}>
        <span className={css.label}>{t('polish.original')}</span>
        <p className={css.original}>{original}</p>
      </section>
      <section className={css.block}>
        <span className={css.label}>{t('polish.expanded')}</span>
        <textarea
          className={css.textarea}
          rows={4}
          value={expanded}
          disabled={busy}
          maxLength={200}
          onChange={(event) => { onExpandedChange(event.target.value) }}
        />
        <small className={css.meta}>{t('polish.charLimit', { count: expanded.length })}</small>
      </section>
      <section className={css.block}>
        <span className={css.label}>{t('polish.conditions')}</span>
        {conditions.length === 0
          ? <p className={css.meta}>{t('polish.conditionsEmpty')}</p>
          : (
            <div className={css.conditions}>
              {conditions.map(condition => (
                <label key={condition} className={css.condition}>
                  <input type="checkbox" checked={selected.includes(condition)} disabled={busy}
                    onChange={() => { onToggle(condition) }} />
                  <span>{condition}</span>
                </label>
              ))}
            </div>
          )}
      </section>
      {error !== '' && <p className={css.error} role="alert">{error}</p>}
      <div className={css.actions}>
        <button type="button" disabled={busy} onClick={onCancel}>{t('polish.cancel')}</button>
        <button type="button" data-primary disabled={busy || expanded.trim() === ''} onClick={onConfirm}>
          {t('polish.confirm')}
        </button>
      </div>
    </div>
  )
}
