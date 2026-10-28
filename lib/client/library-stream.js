/**
 * One SSE connection per session for the library panel and cost prompts.
 * Reconnects with backoff; updates are debounced so a burst of state writes
 * cannot thrash React.
 */
import { useSyncExternalStore } from 'react';
const EMPTY = { team: null, todayCostUsd: 0, connected: false, costPrompt: undefined };
let state = EMPTY;
const listeners = new Set();
let source;
let activeSession;
let retry = 0;
let timer;
function notify() {
    if (timer !== undefined)
        window.clearTimeout(timer);
    timer = window.setTimeout(() => {
        timer = undefined;
        for (const listener of listeners)
            listener();
    }, 80);
}
function connect(sessionId) {
    if (activeSession === sessionId && source !== undefined)
        return;
    disconnect();
    activeSession = sessionId;
    state = { ...state, connected: false };
    notify();
    source = new EventSource('/plugins/dsh-pixel-team/events?sessionId=' + encodeURIComponent(sessionId));
    source.addEventListener('open', () => {
        retry = 0;
        state = { ...state, connected: true };
        notify();
    });
    source.addEventListener('library', (event) => {
        try {
            const data = JSON.parse(event.data);
            state = {
                ...state,
                team: data.team ?? null,
                todayCostUsd: typeof data.todayCostUsd === 'number' ? data.todayCostUsd : state.todayCostUsd,
                connected: true,
            };
            notify();
        }
        catch { /* ignore a torn frame */ }
    });
    source.addEventListener('cost', (event) => {
        try {
            const prompt = JSON.parse(event.data);
            state = { ...state, costPrompt: prompt };
            notify();
        }
        catch { /* ignore */ }
    });
    source.addEventListener('error', () => {
        state = { ...state, connected: false };
        notify();
        if (source !== undefined) {
            source.close();
            source = undefined;
        }
        const delay = Math.min(15_000, 500 * 2 ** retry);
        retry += 1;
        window.setTimeout(() => { if (activeSession !== undefined)
            connect(activeSession); }, delay);
    });
}
function disconnect() {
    if (source !== undefined) {
        source.close();
        source = undefined;
    }
}
/** Resolve one cost prompt and clear it from the shared state. */
export async function decideCost(requestId, decision) {
    state = { ...state, costPrompt: undefined };
    notify();
    await fetch('/plugins/dsh-pixel-team/cost/decision', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ requestId, decision }),
    }).catch(() => undefined);
}
function subscribe(listener) {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
}
/** Shared library state for one session (connection is ref-counted by usage). */
export function useLibraryState(sessionId) {
    if (sessionId !== undefined && sessionId !== '' && sessionId !== activeSession)
        connect(sessionId);
    return useSyncExternalStore(subscribe, () => state, () => EMPTY);
}
