/** Blocking clarification form (module 1) with AI-proposed, requirement-specific options. */
import css from './ClarifySheet.module.css'
import { ACCESSORY_CANDIDATES, CAMERA_CANDIDATES, LIGHT_CANDIDATES } from '../clarify-hardware.ts'
import { CLARIFY_PLATFORMS, CLARIFY_SCALES, CLARIFY_UI_STYLES, DEFAULT_EXCLUDED, type ClarifyOptions } from '../clarify.ts'
import type { AgentTeamsTranslate } from './locales.ts'
import { getModeSpec, type TeamMode } from '../modes.ts'

export interface ClarifyDraft {
  type: 'hardware' | 'software'
  scale: 'small' | 'medium' | 'fullstack'
  ui: { reference: string; styles: string[]; notes: string }
  platforms: string[]
  hardwareList: string[]
  excluded: string[]
  excludedCustom: string
  acceptanceText: string
  constraintsText: string
  platformsCustom: string
  stylesCustom: string
  hardwareCustom: string
  memoryHintsText: string
}

export const DEFAULT_CLARIFY_DRAFT: ClarifyDraft = {
  type: 'software',
  scale: 'small',
  ui: { reference: '', styles: [], notes: '' },
  platforms: [],
  hardwareList: [],
  excluded: [],
  excludedCustom: '',
  acceptanceText: '',
  constraintsText: '',
  platformsCustom: '',
  stylesCustom: '',
  hardwareCustom: '',
  memoryHintsText: '',
}

/** Static menu for the current mode, used only when the model route is unavailable. */
export function fallbackOptionsFor(mode?: TeamMode): ClarifyOptions {
  const spec = getModeSpec(mode)
  return {
    source: 'fallback',
    type: 'software',
    scale: 'small',
    ui: {
      references: ['指定项目/网站', '沿用上次记忆项目', '无参照'],
      styles: [...CLARIFY_UI_STYLES],
      notes: [],
    },
    platforms: [...CLARIFY_PLATFORMS],
    hardware: [...CAMERA_CANDIDATES, ...LIGHT_CANDIDATES, ...ACCESSORY_CANDIDATES].map(item => item.name),
    constraints: [],
    excluded: [...spec.defaultExcluded],
    acceptance: [...spec.acceptanceDefaults],
    memoryHints: [],
  }
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

function splitCommas(text: string): string[] {
  return text.split(/[,，]/).map(item => item.trim()).filter(item => item !== '')
}

function mergeLists(...lists: readonly string[][]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const list of lists) {
    for (const item of list) {
      if (item === '' || seen.has(item)) continue
      seen.add(item)
      out.push(item)
    }
  }
  return out
}

function appendLine(text: string, line: string): string {
  const lines = linesOf(text)
  if (!lines.includes(line)) lines.push(line)
  return lines.join('\n')
}

/** Convert the draft into the clarification payload the host validates. */
export function clarificationPayload(draft: ClarifyDraft): Record<string, unknown> {
  return {
    type: draft.type,
    scale: draft.scale,
    ui: {
      ...draft.ui.reference.trim() === '' ? {} : { reference: draft.ui.reference },
      styles: mergeLists(draft.ui.styles, linesOf(draft.stylesCustom)),
      ...draft.ui.notes.trim() === '' ? {} : { notes: draft.ui.notes },
    },
    platforms: mergeLists(draft.platforms, linesOf(draft.platformsCustom)),
    hardwareList: mergeLists(draft.hardwareList, linesOf(draft.hardwareCustom)),
    constraints: linesOf(draft.constraintsText),
    excluded: mergeLists(draft.excluded, linesOf(draft.excludedCustom)),
    acceptance: linesOf(draft.acceptanceText),
    memoryHints: splitCommas(draft.memoryHintsText),
  }
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter(item => item !== value) : [...list, value]
}

export function ClarifySheet({ value, onChange, options, state, mode, disabled, t }: {
  readonly value: ClarifyDraft
  readonly onChange: (next: ClarifyDraft) => void
  readonly options?: ClarifyOptions
  readonly state: 'loading' | 'ready' | 'fallback'
  readonly mode: TeamMode
  readonly disabled?: boolean
  readonly t: AgentTeamsTranslate
}) {
  const lists = options ?? fallbackOptionsFor(mode)
  const modeSpec = getModeSpec(mode)
  const patch = (next: Partial<ClarifyDraft>): void => { onChange({ ...value, ...next }) }
  const status = state === 'loading'
    ? t('clarify.aiLoading')
    : state === 'fallback'
      ? t('clarify.aiFallback')
      : t('clarify.aiOptions')
  return (
    <div className={css.root} data-step="clarify">
      <p className={css.modeBadge} style={{ color: modeSpec.color, borderColor: modeSpec.color }}>
        {modeSpec.emoji} {t(modeSpec.labelKey as Parameters<typeof t>[0])}
      </p>
      <p className={css.aiNote} data-state={state}>{status}</p>
      <p className={css.confirmHint}>{t('clarify.confirmHint')}</p>

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
          {lists.ui.references.map(reference => (
            <button key={reference} type="button" className={css.chip} data-active={value.ui.reference === reference || undefined}
              disabled={disabled}
              onClick={() => { patch({ ui: { ...value.ui, reference } }) }}>
              {reference}
            </button>
          ))}
        </div>
        <input className={css.input} value={value.ui.reference} disabled={disabled}
          placeholder={t('clarify.referencePlaceholder')}
          onChange={(event) => { patch({ ui: { ...value.ui, reference: event.target.value } }) }} />
        <div className={css.chips}>
          {lists.ui.styles.map(style => (
            <button key={style} type="button" className={css.chip} data-active={value.ui.styles.includes(style) || undefined}
              disabled={disabled} onClick={() => { patch({ ui: { ...value.ui, styles: toggle(value.ui.styles, style) } }) }}>
              {style}
            </button>
          ))}
        </div>
        <input className={css.input} value={value.stylesCustom} disabled={disabled}
          placeholder={t('clarify.customPlaceholder')}
          onChange={(event) => { patch({ stylesCustom: event.target.value }) }} />
        <textarea className={css.textarea} rows={2} value={value.ui.notes} disabled={disabled}
          placeholder={t('clarify.notesPlaceholder')}
          onChange={(event) => { patch({ ui: { ...value.ui, notes: event.target.value } }) }} />
      </section>

      <section className={css.block}>
        <span className={css.label}>{t('clarify.platforms')}</span>
        <div className={css.chips}>
          {lists.platforms.map(platform => (
            <button key={platform} type="button" className={css.chip} data-active={value.platforms.includes(platform) || undefined}
              disabled={disabled} onClick={() => { patch({ platforms: toggle(value.platforms, platform) }) }}>
              {platform}
            </button>
          ))}
        </div>
        <input className={css.input} value={value.platformsCustom} disabled={disabled}
          placeholder={t('clarify.customPlaceholder')}
          onChange={(event) => { patch({ platformsCustom: event.target.value }) }} />
      </section>

      <section className={css.block}>
        <span className={css.label}>{t('clarify.hardware')}</span>
        <div className={css.chips}>
          {lists.hardware.map(item => (
            <button key={item} type="button" className={css.chip} title={item}
              data-active={value.hardwareList.includes(item) || undefined} disabled={disabled}
              onClick={() => { patch({ hardwareList: toggle(value.hardwareList, item) }) }}>
              {item}
            </button>
          ))}
        </div>
        <input className={css.input} value={value.hardwareCustom} disabled={disabled}
          placeholder={t('clarify.customPlaceholder')}
          onChange={(event) => { patch({ hardwareCustom: event.target.value }) }} />
        <small className={css.note}>{t('clarify.hardwareNote')}</small>
      </section>

      <section className={css.block}>
        <span className={css.label}>{t('clarify.constraints')}</span>
        <div className={css.chips}>
          {lists.constraints.map(item => (
            <button key={item} type="button" className={css.chip} disabled={disabled}
              onClick={() => { patch({ constraintsText: appendLine(value.constraintsText, item) }) }}>
              {item}
            </button>
          ))}
        </div>
        <textarea className={css.textarea} rows={2} value={value.constraintsText} disabled={disabled}
          placeholder={t('clarify.customPlaceholder')}
          onChange={(event) => { patch({ constraintsText: event.target.value }) }} />
      </section>

      <section className={css.block}>
        <span className={css.label}>{t('clarify.excluded')}</span>
        <div className={css.chips}>
          {lists.excluded.map(item => (
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
        <div className={css.chips}>
          {lists.acceptance.map(item => (
            <button key={item} type="button" className={css.chip} disabled={disabled}
              onClick={() => { patch({ acceptanceText: appendLine(value.acceptanceText, item) }) }}>
              {item}
            </button>
          ))}
        </div>
        <textarea className={css.textarea} rows={3} value={value.acceptanceText} disabled={disabled}
          placeholder={t('clarify.acceptancePlaceholder')}
          onChange={(event) => { patch({ acceptanceText: event.target.value }) }} />
      </section>

      <section className={css.block}>
        <span className={css.label}>{t('clarify.memoryHints')}</span>
        <div className={css.chips}>
          {lists.memoryHints.map(item => (
            <button key={item} type="button" className={css.chip} disabled={disabled}
              onClick={() => { patch({ memoryHintsText: mergeLists(splitCommas(value.memoryHintsText), [item]).join('，') }) }}>
              {item}
            </button>
          ))}
        </div>
        <input className={css.input} value={value.memoryHintsText} disabled={disabled}
          placeholder={t('clarify.memoryHintsPlaceholder')}
          onChange={(event) => { patch({ memoryHintsText: event.target.value }) }} />
      </section>
    </div>
  )
}
