/**
 * Memory recall proxy for team members (module 2).
 *
 * memory-eternal is an optional sibling plugin; the endpoint is configurable
 * and every failure is returned as text so a member turn never crashes.
 */
export const DEFAULT_MEMORY_ENDPOINT = 'http://127.0.0.1:7999/memory-eternal/api/recall';
const TIMEOUT_MS = 8_000;
const PROBE_TIMEOUT_MS = 3_000;
/** Resolve the configured endpoint, falling back to the local default. */
export function resolveMemoryEndpoint(endpoint) {
    return (endpoint === undefined || endpoint.trim() === '') ? DEFAULT_MEMORY_ENDPOINT : endpoint.trim();
}
/**
 * Is a memory brain reachable? A reachable recall endpoint (any 2xx) counts as
 * installed; a missing plugin, dead server or timeout counts as missing.
 */
export async function probeMemory(endpoint, signal) {
    const url = resolveMemoryEndpoint(endpoint);
    const controller = new AbortController();
    const timeout = setTimeout(() => { controller.abort(); }, PROBE_TIMEOUT_MS);
    const forwardAbort = () => { controller.abort(); };
    signal?.addEventListener('abort', forwardAbort, { once: true });
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ query: '项目 约束', limit: 1 }),
            signal: controller.signal,
        });
        return response.ok;
    }
    catch {
        return false;
    }
    finally {
        clearTimeout(timeout);
        signal?.removeEventListener('abort', forwardAbort);
    }
}
function extractText(value) {
    if (typeof value === 'string')
        return value;
    if (Array.isArray(value)) {
        return value.map(item => extractText(item)).filter(item => item !== '').join('\n');
    }
    if (typeof value === 'object' && value !== null) {
        const record = value;
        for (const key of ['text', 'content', 'body', 'answer', 'summary', 'results', 'matches']) {
            if (record[key] !== undefined) {
                const text = extractText(record[key]);
                if (text !== '')
                    return text;
            }
        }
    }
    return '';
}
/**
 * Query the configured memory endpoint.
 * @throws when the endpoint is unreachable or returns an unusable body.
 */
export async function recallMemory(endpoint, query, limit, signal) {
    const url = resolveMemoryEndpoint(endpoint);
    const controller = new AbortController();
    const timeout = setTimeout(() => { controller.abort(); }, TIMEOUT_MS);
    const forwardAbort = () => { controller.abort(); };
    signal?.addEventListener('abort', forwardAbort, { once: true });
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ query, limit }),
            signal: controller.signal,
        });
        if (!response.ok)
            throw new Error('memory endpoint returned HTTP ' + response.status);
        const body = await response.json().catch(() => undefined);
        const text = extractText(body).trim();
        if (text === '')
            throw new Error('memory endpoint returned no text');
        return { text, source: url };
    }
    finally {
        clearTimeout(timeout);
        signal?.removeEventListener('abort', forwardAbort);
    }
}
