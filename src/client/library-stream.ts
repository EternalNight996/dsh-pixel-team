/**
 * One SSE connection per session for the library panel and cost prompts.
 * Reconnects with backoff; updates are debounced so a burst of state writes
 * cannot thrash React.
 */
import { useSyncExternalStore } from 'react'
import type { LibraryTeamView } from '../library-projection.ts'

export interface CostPromptView {
  requestId: string
  sessionId: string
  teamId?: string
  taskId?: string
  memberName: string
  estimateUsd: number
  thresholdUsd: number
  reason: 'task' | 'day'
}

export interface LibraryState {
  readonly team: LibraryTeamView | null
  readonly todayCostUsd: number
  readonly connected: boolean
  readonly costPrompt: CostPromptView | undefined
}

const EMPTY: LibraryState = { team: null, todayCostUsd: 0, connected: false, costPrompt: undefined }
let state: LibraryState = EMPTY
const listeners = new Set<() => void>()
let source: EventSource | undefined
let activeSession: string | undefined
let retry = 0
let timer: number | undefined

function notify(): void {
  if (timer !== undefined) window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    timer = undefined
    for (const listener of listeners) listener()
  }, 80)
}

function connect(sessionId: string): void {
  if (activeSession === sessionId && source !== undefined) return
  disconnect()
  activeSession = sessionId
  state = { ...state, connected: false }
  notify()
  source = new EventSource('/plugins/dsh-pixel-team/events?sessionId=' + encodeURIComponent(sessionId))
  source.addEventListener('open', () => {
    retry = 0
    state = { ...state, connected: true }
    notify()
  })
  source.addEventListener('library', (event) => {
    try {
      const data = JSON.parse((event as MessageEvent).data) as { team?: LibraryTeamView | null; todayCostUsd?: number }
      state = {
        ...state,
        team: data.team ?? null,
        todayCostUsd: typeof data.todayCostUsd === 'number' ? data.todayCostUsd : state.todayCostUsd,
        connected: true,
      }
      notify()
    } catch { /* ignore a torn frame */ }
  })
  source.addEventListener('cost', (event) => {
    try {
      const prompt = JSON.parse((event as MessageEvent).data) as CostPromptView
      state = { ...state, costPrompt: prompt }
      notify()
    } catch { /* ignore */ }
  })
  source.addEventListener('error', () => {
    state = { ...state, connected: false }
    notify()
    if (source !== undefined) { source.close(); source = undefined }
    const delay = Math.min(15_000, 500 * 2 ** retry)
    retry += 1
    window.setTimeout(() => { if (activeSession !== undefined) connect(activeSession) }, delay)
  })
}

function disconnect(): void {
  if (source !== undefined) { source.close(); source = undefined }
}

/** Resolve one cost prompt and clear it from the shared state. */
export async function decideCost(requestId: string, decision: 'continue' | 'terminate'): Promise<void> {
  state = { ...state, costPrompt: undefined }
  notify()
  await fetch('/plugins/dsh-pixel-team/cost/decision', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ requestId, decision }),
  }).catch(() => undefined)
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

/** Shared library state for one session (connection is ref-counted by usage). */
export function useLibraryState(sessionId: string | undefined): LibraryState {
  if (sessionId !== undefined && sessionId !== '' && sessionId !== activeSession) connect(sessionId)
  return useSyncExternalStore(subscribe, () => state, () => EMPTY)
}
