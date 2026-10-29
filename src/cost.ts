/**
 * Soft cost gate: estimate a spawn, log it, and let the user decide.
 *
 * Never degrades a model, never pauses the queue: a terminate decision cancels
 * exactly the one spawn that asked.
 */
import { randomUUID } from 'node:crypto'
import { appendFile, mkdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { publishCostPrompt, type CostPrompt } from './events-bus.ts'
import { getModeSpec, type TeamMode } from './modes.ts'

export interface CostConfig {
  enabled?: boolean
  perTaskUsd?: number
  perDayUsd?: number
}

export interface CostLogEntry {
  ts: number
  sessionId: string
  teamId?: string
  taskId?: string
  memberName: string
  estimateUsd: number
  thresholdUsd?: number
  reason?: 'task' | 'day' | 'retry'
  mode?: TeamMode
  decision: 'auto-continue' | 'continue' | 'terminate' | 'timeout' | 'captain-unmetered'
}

const DEFAULT_PER_TASK = 2
const DEFAULT_PER_DAY = 35
// Conservative planning rates (USD per 1K tokens). Only used for the prompt.
const PRICE_INPUT_PER_1K = 0.0005
const PRICE_OUTPUT_PER_1K = 0.0015
const DEFAULT_TIMEOUT_MS = 180_000

const pending = new Map<string, (decision: 'continue' | 'terminate') => void>()

/** The mode's budget, with an optional owner override from the plugin config. */
export function resolveModeBudget(mode: TeamMode | undefined, override?: CostConfig): { perTaskUsd: number; perDayUsd: number; retryPromptAt: number } {
  const spec = getModeSpec(mode)
  return {
    perTaskUsd: override?.perTaskUsd ?? spec.budget.perTaskUsd,
    perDayUsd: override?.perDayUsd ?? spec.budget.perDayUsd,
    retryPromptAt: spec.budget.retryPromptAt,
  }
}

/** Estimate one spawn: prompt chars in, a conservative completion budget out. */
export function estimateCost(textChars: number): number {
  const inputTokens = Math.max(500, Math.ceil(textChars / 4))
  const outputTokens = 1500
  return Math.round((inputTokens / 1000 * PRICE_INPUT_PER_1K + outputTokens / 1000 * PRICE_OUTPUT_PER_1K) * 10000) / 10000
}

export function costLogPath(workspace: string): string {
  return join(workspace, '.pixel-team', 'cost-log.jsonl')
}

/** Merge cost logs read from several workspaces without double-counting. */
export function mergeCostEntries(entries: readonly CostLogEntry[]): CostLogEntry[] {
  const seen = new Set<string>()
  const merged: CostLogEntry[] = []
  for (const entry of entries) {
    const key = [entry.ts, entry.sessionId, entry.teamId ?? '', entry.memberName, entry.taskId ?? '', entry.decision].join('\u0000')
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(entry)
  }
  return merged.sort((left, right) => left.ts - right.ts)
}

/** Sum today's entries across a merged log (local calendar day). */
export function todayCostFromEntries(entries: readonly CostLogEntry[], now = Date.now()): number {
  const day = new Date(now)
  const start = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime()
  const total = entries
    .filter(entry => entry.ts >= start && entry.ts <= now + 86_400_000)
    .reduce((sum, entry) => sum + entry.estimateUsd, 0)
  return Math.round(total * 10000) / 10000
}

/** Read every cost-log entry (oldest first); a torn line is skipped. */
export async function readCostLogEntries(workspace: string): Promise<CostLogEntry[]> {
  let text = ''
  try {
    text = await readFile(costLogPath(workspace), 'utf8')
  } catch {
    return []
  }
  const entries: CostLogEntry[] = []
  for (const line of text.split(/\r?\n/)) {
    if (line.trim() === '') continue
    try {
      entries.push(JSON.parse(line) as CostLogEntry)
    } catch { /* skip a torn line */ }
  }
  return entries
}

/** Sum today's logged estimates (local calendar day). */
export async function readTodayCost(workspace: string, now = Date.now()): Promise<number> {
  let text = ''
  try {
    text = await readFile(costLogPath(workspace), 'utf8')
  } catch {
    return 0
  }
  const day = new Date(now)
  const start = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime()
  let total = 0
  for (const line of text.split(/\r?\n/)) {
    if (line.trim() === '') continue
    try {
      const entry = JSON.parse(line) as CostLogEntry
      if (entry.ts >= start && entry.ts <= now + 86_400_000) total += entry.estimateUsd
    } catch { /* skip a torn line */ }
  }
  return Math.round(total * 10000) / 10000
}

/** Append one decision to the JSONL log (never throws into the spawn path). */
export async function appendCostLog(workspace: string, entry: CostLogEntry): Promise<void> {
  try {
    await mkdir(join(workspace, '.pixel-team'), { recursive: true })
    await appendFile(costLogPath(workspace), JSON.stringify(entry) + '\n', 'utf8')
  } catch { /* logging must not block work */ }
}

/**
 * Publish a prompt and wait for the user's decision. A timeout continues (the
 * gate is soft by design) and is logged as such.
 */
export async function requestCostDecision(
  prompt: Omit<CostPrompt, 'requestId'>,
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<'continue' | 'terminate' | 'timeout'> {
  const requestId = randomUUID()
  const full: CostPrompt = { ...prompt, requestId }
  return new Promise((resolve) => {
    const done = (decision: 'continue' | 'terminate' | 'timeout'): void => {
      clearTimeout(timer)
      pending.delete(requestId)
      resolve(decision)
    }
    const timer = setTimeout(() => { done('timeout') }, timeoutMs)
    pending.set(requestId, (decision) => { done(decision) })
    publishCostPrompt(full)
  })
}

/** Resolve one pending prompt; false when it already timed out. */
export function resolveCostDecision(requestId: string, decision: 'continue' | 'terminate'): boolean {
  const resolve = pending.get(requestId)
  if (resolve === undefined) return false
  resolve(decision)
  return true
}
