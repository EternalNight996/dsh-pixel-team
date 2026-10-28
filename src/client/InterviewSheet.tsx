/** Dynamic AI interview: template-like questions generated from the requirement. */
import { useState } from 'react'
import css from './InterviewSheet.module.css'
import type { TeamMode } from '../modes.ts'
import { getModeSpec } from '../modes.ts'
import type { AgentTeamsTranslate } from './locales.ts'

export interface InterviewQuestionView {
  id: string
  prompt: string
  multi: boolean
  options: string[]
}

export function InterviewSheet({ questions, answers, onChange, state, error, mode, disabled, onRetry, t }: {
  readonly questions: readonly InterviewQuestionView[]
  readonly answers: Readonly<Record<string, string[]>>
  readonly onChange: (next: Record<string, string[]>) => void
  readonly state: 'loading' | 'ready' | 'fallback'
  readonly error: string
  readonly mode: TeamMode
  readonly disabled?: boolean
  readonly onRetry: () => void
  readonly t: AgentTeamsTranslate
}) {
  const [custom, setCustom] = useState<Record<string, string>>({})
  const spec = getModeSpec(mode)
  const setAnswer = (id: string, values: string[]): void => { onChange({ ...answers, [id]: values }) }
  const toggle = (id: string, value: string, multi: boolean): void => {
    const current = answers[id] ?? []
    setAnswer(id, multi ? (current.includes(value) ? current.filter(item => item !== value) : [...current, value]) : [value])
  }
  const addCustom = (id: string): void => {
    const value = (custom[id] ?? '').trim()
    if (value === '') return
    setAnswer(id, [...new Set([...(answers[id] ?? []), value])])
    setCustom(current => ({ ...current, [id]: '' }))
  }
  return (
    <div className={css.root} data-step="interview">
      <p className={css.modeBadge} style={{ color: spec.color, borderColor: spec.color }}>{spec.emoji} {t(spec.labelKey as Parameters<typeof t>[0])}</p>
      <p className={css.aiNote} data-state={state}>
        {state === 'loading' ? t('interview.loading') : state === 'fallback' ? t('interview.fallback') : t('interview.hint')}
      </p>
      {error !== '' && <p className={css.error} role="alert">{error}</p>}
      {state === 'loading' && <p className={css.loading}>{t('interview.loadingHint')}</p>}
      {state !== 'loading' && questions.map(question => (
        <section key={question.id} className={css.block}>
          <span className={css.prompt}>{question.prompt}{question.multi ? t('interview.multi') : t('interview.single')}</span>
          <div className={css.chips}>
            {question.options.map(option => (
              <button
                key={option}
                type="button"
                className={css.chip}
                data-active={(answers[question.id] ?? []).includes(option) || undefined}
                disabled={disabled}
                onClick={() => { toggle(question.id, option, question.multi) }}
              >
                {option}
              </button>
            ))}
          </div>
          <input
            className={css.input}
            value={custom[question.id] ?? ''}
            disabled={disabled}
            placeholder={t('interview.customPlaceholder')}
            onChange={(event) => { setCustom(current => ({ ...current, [question.id]: event.target.value })) }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') { event.preventDefault(); addCustom(question.id) }
            }}
          />
        </section>
      ))}
      {state === 'fallback' && (
        <button type="button" className={css.retry} disabled={disabled} onClick={onRetry}>{t('interview.retry')}</button>
      )}
    </div>
  )
}
