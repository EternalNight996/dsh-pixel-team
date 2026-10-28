/**
 * In-process push bus for the library panel and cost prompts.
 *
 * No database, no polling: state mutations publish to this bus and the SSE
 * route forwards projections to the browser.
 */
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.setMaxListeners(50);
/** Notify subscribers that a workspace's team state changed. */
export function publishLibraryChange(stateRoot) {
    emitter.emit('teams', stateRoot);
}
export function subscribeLibraryChange(listener) {
    emitter.on('teams', listener);
    return () => { emitter.off('teams', listener); };
}
/** Ask the browser to confirm one over-threshold spawn. */
export function publishCostPrompt(prompt) {
    emitter.emit('cost', prompt);
}
export function subscribeCostPrompt(listener) {
    emitter.on('cost', listener);
    return () => { emitter.off('cost', listener); };
}
