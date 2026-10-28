/**
 * In-process push bus for the library panel and cost prompts.
 *
 * No database, no polling: state mutations publish to this bus and the SSE
 * route forwards projections to the browser.
 */
import { EventEmitter } from 'node:events'

export interface CostPrompt {
  readonly requestId: string
  readonly sessionId: string
  readonly teamId?: string
  readonly taskId?: string
  readonly memberName: string
  readonly estimateUsd: number
  readonly thresholdUsd: number
  readonly reason: 'task' | 'day' | 'retry'
  /** Mode id, for the colored prompt. */
  readonly mode?: string
  /** Retry count when reason is retry. */
  readonly retryCount?: number
}

const emitter = new EventEmitter()
emitter.setMaxListeners(50)

/** Notify subscribers that a workspace's team state changed. */
export function publishLibraryChange(stateRoot: string): void {
  emitter.emit('teams', stateRoot)
}

export function subscribeLibraryChange(listener: (stateRoot: string) => void): () => void {
  emitter.on('teams', listener)
  return () => { emitter.off('teams', listener) }
}

/** Ask the browser to confirm one over-threshold spawn. */
export function publishCostPrompt(prompt: CostPrompt): void {
  emitter.emit('cost', prompt)
}

export function subscribeCostPrompt(listener: (prompt: CostPrompt) => void): () => void {
  emitter.on('cost', listener)
  return () => { emitter.off('cost', listener) }
}
