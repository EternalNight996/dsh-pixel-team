/** Module 2 UI guidance: prompt the user to install memory-eternal. */
import { useState } from 'react'
import css from './MemoryModeBanner.module.css'
import type { AgentTeamsTranslate } from './locales.ts'

const DISMISS_KEY = 'dsh-pixel-team:memory-banner-dismissed'
const INSTALL_URL = 'https://github.com/EternalNight996/memory-eternal'

export function MemoryModeBanner({ t }: { readonly t: AgentTeamsTranslate }) {
  const [dismissed, setDismissed] = useState(() => {
    try { return window.localStorage.getItem(DISMISS_KEY) === '1' } catch { return false }
  })
  if (dismissed) return null
  return (
    <div className={css.root} data-memory-banner>
      <span className={css.text}>{t('memory.banner')}</span>
      <a className={css.action} href={INSTALL_URL} target="_blank" rel="noreferrer">{t('memory.install')}</a>
      <button
        type="button"
        className={css.close}
        aria-label={t('memory.dismiss')}
        onClick={() => {
          try { window.localStorage.setItem(DISMISS_KEY, '1') } catch { /* private mode */ }
          setDismissed(true)
        }}
      >×</button>
    </div>
  )
}
