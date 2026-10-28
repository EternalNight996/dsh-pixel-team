/**
 * Memory recall proxy for team members (module 2).
 *
 * memory-eternal is an optional sibling plugin; the endpoint is configurable
 * and every failure is returned as text so a member turn never crashes.
 */
const DEFAULT_ENDPOINT = 'http://127.0.0.1:7999/memory-eternal/api/recall'
const TIMEOUT_MS = 8_000

export interface MemoryRecallHit {
  readonly text: string
  readonly source: string
}

function extractText(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return value.map(item => extractText(item)).filter(item => item !== '').join('\n')
  }
  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>
    for (const key of ['text', 'content', 'body', 'answer', 'summary', 'results', 'matches']) {
      if (record[key] !== undefined) {
        const text = extractText(record[key])
        if (text !== '') return text
      }
    }
  }
  return ''
}

/**
 * Query the configured memory endpoint.
 * @throws when the endpoint is unreachable or returns an unusable body.
 */
export async function recallMemory(
  endpoint: string | undefined,
  query: string,
  limit: number,
  signal?: AbortSignal,
): Promise<MemoryRecallHit> {
  const url = (endpoint === undefined || endpoint.trim() === '') ? DEFAULT_ENDPOINT : endpoint.trim()
  const controller = new AbortController()
  const timeout = setTimeout(() => { controller.abort() }, TIMEOUT_MS)
  const forwardAbort = (): void => { controller.abort() }
  signal?.addEventListener('abort', forwardAbort, { once: true })
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query, limit }),
      signal: controller.signal,
    })
    if (!response.ok) throw new Error('memory endpoint returned HTTP ' + response.status)
    const body: unknown = await response.json().catch(() => undefined)
    const text = extractText(body).trim()
    if (text === '') throw new Error('memory endpoint returned no text')
    return { text, source: url }
  } finally {
    clearTimeout(timeout)
    signal?.removeEventListener('abort', forwardAbort)
  }
}
