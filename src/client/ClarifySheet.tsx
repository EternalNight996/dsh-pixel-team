/** Blocking clarification form (module 1). Rendered inside the founding wizard. */
import css from './ClarifySheet.module.css'
import {
  CAMERA_CANDIDATES, LIGHT_CANDIDATES, ACCESSORY_CANDIDATES,
} from '../clarify-hardware.ts'
import { CLARIFY_PLATFORMS, CLARIFY_SCALES, CLARIFY_UI_STYLES, DEFAULT_EXCLUDED } from '../clarify.ts'
import type { AgentTeamsTranslate } from './locales.ts'

export interface ClarifyDraft {
  type: 'hardware' | 'software'
  scale: 'small' | 'medium' | 'fullstack'
  ui: { reference: string; styles: string[]; notes: string }
  platforms: string[]
  hardwareList: string[]
  excluded: string[]
  excludedCustom: string
  acceptanceText: string
  memoryHintsText: string
}

export const DEFAULT_CLARIFY_DRAFT: ClarifyDraft = {
  type: 'software',
  scale: 'small',
  ui: { reference: '无参照', styles: [], notes: '' },
  platforms: ['Windows'],
  hardwareList: [],
  excluded: [...DEFAULT_EXCLUDED],
  excludedCustom: '',
  acceptanceText: '',
  memoryHintsText: '',
}

const SCALE_KEYS = {
  small: 'clarify.scaleSmall',
  medium: 'clarify.scaleMedium',
  fullstack: 'clarify.scaleFullstack',
} as const

/** Split a textarea into trimmed non-empty lines. */
export function linesOf(text: string): string[] {
  return text.split(/\r?\n/).map(line => line.trim()).filter(line => line !== '')
}

/** Convert the draft into the clarification payload the host validates. */
export function clarificationPayload(draft: ClarifyDraft): Record<string, unknown> {
  const excluded = [...new Set([...draft.excluded, ...linesOf(draft.excludedCustom)])]
  return {
    type: draft.type,
    scale: draft.scale,
    ui: {
      ...draft.ui.reference.trim() === '' ? {} : { reference: draft.ui.reference },
      styles: draft.ui.styles,
      ...draft.ui.notes.trim() === '' ? {} : { notes: draft.ui.notes },
    },
    platforms: draft.platforms,
    hardwareList: draft.hardwareList,
    constraints: [],
    excluded,
    acceptance: linesOf(draft.acceptanceText),
    memoryHints: draft.memoryHintsText.split(/[,，]/).map(item => item.trim()).filter(item => item !== ''),
  }
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter(item => item !== value) : [...list, value]
}

export function ClarifySheet({ value, onChange, disabled, t }: {
  readonly value: ClarifyDraft
  readonly onChange: (next: ClarifyDraft) => void
  readonly disabled?: boolean
  readonly t: AgentTeamsTranslate
}) {
  const patch = (next: Partial<ClarifyDraft>): void => { onChange({ ...value, ...next }) }
  const hardware = [...CAMERA_CANDIDATES, ...LIGHT_CANDIDATES, ...ACCESSORY_CANDIDATES]
  return (
    <div className={css.root} data-step="clarify">
      <section className={css.block}>
        <span className={css.label}>{t('clarify.type')}</span>
        <div className={css.chips}>
          {(['hardware', 'software'] as const).map(type => (
            <button key={type} type="button" className={css.chip} data-active={value.type === type || undefined}
              disabled={disabled} onClick={() => { patch({ type }) }}>
              {type === 'hardware' ? t('clarify.hardwareDev') : t('clarify.softwareDev')}
            </button>
          ))}
        </div>
      </section>

      <section className={css.block}>
        <span className={css.label}>{t('clarify.scale')}</span>
        <div className={css.scales}>
          {CLARIFY_SCALES.map(scale => (
            <button key={scale} type="button" className={css.scale} data-active={value.scale === scale || undefined}
              disabled={disabled} onClick={() => { patch({ scale }) }}>
              {t(SCALE_KEYS[scale] as Parameters<typeof t>[0])}
            </button>
          ))}
        </div>
      </section>

      <section className={css.block}>
        <span className={css.label}>{t('clarify.ui')}</span>
        <div className={css.chips}>
          {['指定项目/网站', '沿用上次记忆项目', '无参照'].map(reference => (
            <button key={reference} type="button" className={css.chip} data-active={value.ui.reference === reference || undefined}
              disabled={disabled}
              onClick={() => { patch({ ui: { ...value.ui, reference } }) }}>
              {reference}
            </button>
          ))}
        </div>
        {value.ui.reference !== '无参照' && (
          <input className={css.input} value={value.ui.reference} disabled={disabled}
            placeholder={t('clarify.referencePlaceholder')}
            onChange={(event) => { patch({ ui: { ...value.ui, reference: event.target.value } }) }} />
        )}
        <div className={css.chips}>
          {CLARIFY_UI_STYLES.map(style => (
            <button key={style} type="button" className={css.chip} data-active={value.ui.styles.includes(style) || undefined}
              disabled={disabled} onClick={() => { patch({ ui: { ...value.ui, styles: toggle(value.ui.styles, style) } }) }}>
              {style}
            </button>
          ))}
        </div>
        <textarea className={css.textarea} rows={2} value={value.ui.notes} disabled={disabled}
          placeholder={t('clarify.notesPlaceholder')}
          onChange={(event) => { patch({ ui: { ...value.ui, notes: event.target.value } }) }} />
      </section>

      <section className={css.block}>
        <span className={css.label}>{t('clarify.platforms')}</span>
        <div className={css.chips}>
          {CLARIFY_PLATFORMS.map(platform => (
            <button key={platform} type="button" className={css.chip} data-active={value.platforms.includes(platform) || undefined}
              disabled={disabled} onClick={() => { patch({ platforms: toggle(value.platforms, platform) }) }}>
              {platform}
            </button>
          ))}
        </div>
      </section>

      <section className={css.block}>
        <span className={css.label}>{t('clarify.hardware')}</span>
        <div className={css.chips}>
          {hardware.map(item => (
            <button key={item.name} type="button" className={css.chip} title={item.spec + ' · ' + item.note}
              data-active={value.hardwareList.includes(item.name) || undefined} disabled={disabled}
              onClick={() => { patch({ hardwareList: toggle(value.hardwareList, item.name) }) }}>
              {item.name}
            </button>
          ))}
        </div>
        <small className={css.note}>{t('clarify.hardwareNote')}</small>
      </section>

      <section className={css.block}>
        <span className={css.label}>{t('clarify.excluded')}</span>
        <div className={css.chips}>
          {DEFAULT_EXCLUDED.map(item => (
            <button key={item} type="button" className={css.chip} data-active={value.excluded.includes(item) || undefined}
              disabled={disabled} onClick={() => { patch({ excluded: toggle(value.excluded, item) }) }}>
              {item}
            </button>
          ))}
        </div>
        <textarea className={css.textarea} rows={2} value={value.excludedCustom} disabled={disabled}
          placeholder={t('clarify.excludedPlaceholder')}
          onChange={(event) => { patch({ excludedCustom: event.target.value }) }} />
      </section>

      <section className={css.block}>
        <span className={css.label}>{t('clarify.acceptance')}</span>
        <textarea className={css.textarea} rows={3} value={value.acceptanceText} disabled={disabled}
          placeholder={t('clarify.acceptancePlaceholder')}
          onChange={(event) => { patch({ acceptanceText: event.target.value }) }} />
      </section>

      <section className={css.block}>
        <span className={css.label}>{t('clarify.memoryHints')}</span>
        <input className={css.input} value={value.memoryHintsText} disabled={disabled}
          placeholder={t('clarify.memoryHintsPlaceholder')}
          onChange={(event) => { patch({ memoryHintsText: event.target.value }) }} />
      </section>
    </div>
  )
}
