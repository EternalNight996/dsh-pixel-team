/** Module 2 UI: probe the memory brain, then show connected or an install hint. */
import { useEffect, useState } from 'react'
import css from './MemoryModeBanner.module.css'
import type { AgentTeamsTranslate } from './locales.ts'

const DISMISS_KEY = 'dsh-pixel-team:memory-banner-dismissed'
const INSTALL_URL = 'https://github.com/EternalNight996/memory-eternal'
const CACHE_MS = 60_000

type Probe = 'checking' | 'connected' | 'missing'
let cache: { at: number; state: Exclude<Probe, 'checking'> } | undefined

async function checkMemory(): Promise<Exclude<Probe, 'checking'>> {
  if (cache !== undefined && Date.now() - cache.at < CACHE_MS) return cache.state
  try {
    const response = await fetch('/plugins/dsh-pixel-team/memory/status', { cache: 'no-store' })
    if (!response.ok) throw new Error('HTTP ' + response.status)
    const body = await response.json() as { connected?: boolean }
    const state = body.connected === true ? 'connected' as const : 'missing' as const
    cache = { at: Date.now(), state }
    return state
  } catch {
    cache = { at: Date.now(), state: 'missing' }
    return 'missing'
  }
}

export function MemoryModeBanner({ t }: { readonly t: AgentTeamsTranslate }) {
  const [dismissed, setDismissed] = useState(() => {
    try { return window.localStorage.getItem(DISMISS_KEY) === '1' } catch { return false }
  })
  const [probe, setProbe] = useState<Probe>('checking')
  useEffect(() => {
    let alive = true
    void checkMemory().then(state => { if (alive) setProbe(state) })
    return () => { alive = false }
  }, [])
  const dismiss = (): void => {
    try { window.localStorage.setItem(DISMISS_KEY, '1') } catch { /* private mode */ }
    setDismissed(true)
  }
  if (dismissed || probe === 'checking') return null
  if (probe === 'connected') {
    return (
      <div className={css.connected} data-memory-banner="connected">
        <span className={css.dot} aria-hidden />
        <span className={css.text}>{t('memory.connected')}</span>
        <button type="button" className={css.close} aria-label={t('memory.dismiss')} onClick={dismiss}>×</button>
      </div>
    )
  }
  return (
    <div className={css.root} data-memory-banner="missing">
      <span className={css.text}>{t('memory.banner')}</span>
      <a className={css.action} href={INSTALL_URL} target="_blank" rel="noreferrer">{t('memory.install')}</a>
      <button type="button" className={css.close} aria-label={t('memory.dismiss')} onClick={dismiss}>×</button>
    </div>
  )
}
