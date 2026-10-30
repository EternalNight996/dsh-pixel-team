/**
 * Read-only bridge to the host's experimental Agent Teams projection.
 *
 * The plugin keeps its own delivery runtime; this bridge lets the panel show
 * when a native team exists for the same captain so the two systems do not
 * silently diverge. It never mutates native state.
 */
import type { Agent } from '@deepseek-ai/dsh-agent'

export interface NativeTeamSummary {
  readonly id: string
  readonly members: number
  readonly tasks: number
  readonly completed: number
}

type NativeState = {
  id?: unknown
  members?: unknown
  tasks?: unknown
}

/** Summarize the host's native agentTeam projection for one captain, if any. */
export function nativeTeamSummary(ctx: unknown, captain: Agent): NativeTeamSummary | undefined {
  const projections = (ctx as { sessionProjections?: { stateOf?: (session: unknown, key: string) => unknown } }).sessionProjections
  if (projections?.stateOf === undefined) return undefined
  let state: unknown
  try {
    state = projections.stateOf(captain.session, 'agentTeam')
  } catch {
    return undefined
  }
  if (typeof state !== 'object' || state === null) return undefined
  const native = state as NativeState
  if (typeof native.id !== 'string' || !Array.isArray(native.members) || !Array.isArray(native.tasks)) return undefined
  const completed = native.tasks.filter((task) => (
    typeof task === 'object' && task !== null && (task as { status?: unknown }).status === 'completed'
  )).length
  return { id: native.id, members: native.members.length, tasks: native.tasks.length, completed }
}
