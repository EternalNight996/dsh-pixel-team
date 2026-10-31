/**
 * Team activity snapshot assembly for the activity panel.
 *
 * Server-side assembly mirrors the Claude Code desktop teamWatcher: read the
 * durable team files (the truth source) and enrich with live subagent
 * activity, so the panel always reflects the on-disk state even when a model
 * skipped a tool "ritual" (e.g. not calling update_task on completion).
 * @module dsh-agent-teams/snapshot
 */

import type { Context } from '@deepseek-ai/cordis'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { memberActivity } from './members.ts'
import { nativeTeamSummary } from './native-team.ts'
import { canDeclareDelivery, deliveryArtifactPaths, describeQualityLoop, verdictAuditNotes } from './quality-gates.ts'
import { digestWorkspacePaths } from './artifacts.ts'
import type { DeliveryEvidence } from './quality-gates.ts'
import { buildDeliveryReport } from './delivery-report.ts'
import { auditTeamWorkspace } from './workspace-audit.ts'
import {
  CAPTAIN_KEY, listArchivedTeamIds, readArchivedTeam, readMailbox, readUnreadMailbox, readTeam,
  taskDepthsById, taskVisualState,
} from './state.ts'
import type { MemberStatus, TeamState, TeamTask } from './types.ts'

/** Visual task state for the activity panel. */
export type VisualTaskState = 'blocked' | 'open' | 'claimed' | 'running' | 'completed' | 'failed' | 'cancelled'

/** One member row of the activity snapshot. */
export interface TeamActivityMember {
  readonly id: string
  readonly name: string
  readonly role: string
  readonly provider: string
  readonly model: string
  readonly reasoningEffort: string
  readonly executionPrompt: string
  readonly status: MemberStatus
  readonly activity: 'working' | 'idle' | 'unknown'
  readonly progress: number
  readonly done: number
  readonly total: number
  readonly currentTask: string
  readonly unread: number
}

/** One task row of the activity snapshot. */
export interface TeamActivityTask {
  readonly id: string
  readonly subject: string
  readonly description: string
  readonly status: string
  readonly state: VisualTaskState
  readonly assignee: string
  readonly model: string
  readonly dependencies: readonly string[]
  readonly depth: number
  readonly kind?: string
  readonly round?: number
  readonly verdict?: string
  /** Frozen quality contract, shown on the staged-plan review page. */
  readonly objective?: string
  readonly acceptance?: readonly string[]
  readonly verify?: readonly string[]
  readonly inScope?: readonly string[]
  readonly skills?: readonly string[]
  /**
   * Set when this task's verdict or auto-generated work order no longer
   * describes the current bytes; the panel must not render a bare pass badge.
   */
  readonly verdictStale?: string
  /** Durable last-write stamp; drives the finished-member ordering (issue #192). */
  readonly updatedAt: number
}

/** One captain-inbox preview row. */
export interface TeamActivityMessage {
  readonly from: string
  readonly content: string
}

/** One live captain↔member message in the conversation card feed. */
export interface TeamActivityChatMessage {
  readonly id: string
  readonly from: string
  readonly to: string
  readonly content: string
  readonly ts: number
  readonly taskId?: string
}

/** The full panel payload for one team. */
export interface TeamActivitySnapshot {
  readonly workspace: string
  readonly teamId: string
  readonly name: string
  readonly description?: string
  readonly captainSessionId: string
  /** Team creation time; the client uses it for tenure-based cultivation. */
  readonly createdAt: number
  readonly phase: 'staged' | 'running'
  readonly planReviewState?: 'awaiting_review' | 'awaiting_feedback'
  /** AI or template fallback, for the plan-review alignment card. */
  readonly planSource?: 'ai' | 'template'
  readonly planError?: string
  readonly planProjectRoot?: string
  /** Compact clarification summary (mode/constraints/platforms) for the review. */
  readonly planSummary?: { mode?: string; scale?: string; platforms?: string[]; constraints?: string[] }
  readonly halted?: boolean
  readonly members: readonly TeamActivityMember[]
  readonly tasks: readonly TeamActivityTask[]
  readonly messageCount: number
  readonly captainInbox: readonly TeamActivityMessage[]
  /** Recent captain↔member messages, oldest first (newest last). */
  readonly messages: readonly TeamActivityChatMessage[]
  /** Present when the snapshot could audit the workspace bytes. */
  readonly loopState?: string
  readonly deliverable?: boolean
  /** Host Goal currently active for the captain, when the goal service is mounted. */
  readonly goal?: { readonly id: string; readonly objective: string; readonly phase: string; readonly roundsStarted: number; readonly maxGoalRounds: number }
  readonly acceptedAt?: number
  readonly acceptedBy?: string
  /** Host-native Agent Team projection for the same captain, when mounted. */
  readonly nativeTeam?: { readonly id: string; readonly members: number; readonly tasks: number; readonly completed: number }
  /** True when the accepted artifact bytes changed after sign-off. */
  readonly acceptanceStale?: boolean
  readonly delivery?: { readonly ok: boolean; readonly blockers: readonly string[]; readonly warnings: readonly string[]; readonly evidence: DeliveryEvidence; readonly report?: string }
}

/** Snapshot projection switches for live and archived teams. */
export interface TeamSnapshotOptions {
  /** Historic review must retain members that were marked removed at shutdown. */
  readonly includeRemoved?: boolean
  /** Archived teams have no meaningful live activity after their sessions stop. */
  readonly historic?: boolean
  /**
   * Absolute workspace path of the owning workspace. When present, the snapshot
   * audits the current bytes behind every recorded verdict, so the panel and
   * the model-facing status tool cannot report different delivery verdicts.
   */
  readonly workspacePath?: string
}

/** The current task of a member: its first unfinished owned task. */
function currentTaskOf(memberName: string, tasks: readonly TeamTask[]): string {
  for (const task of tasks) {
    if (task.status === 'in_progress' && task.assignee === memberName) return task.id
  }
  return ''
}

/** Compact `provider/model` route for the activity panel, or just the model. */
export function memberModelRoute(member: { provider?: string; model?: string } | undefined): string {
  if (member === undefined) return ''
  const provider = member.provider?.trim() ?? ''
  const model = member.model?.trim() ?? ''
  if (provider !== '' && model !== '') return `${provider}/${model}`
  return model
}

/**
 * Assemble one team snapshot from its durable files plus live activity.
 * @param ctx - the plugin context (injects `subagents`, used for activity).
 * @param stateRoot - resolved absolute state root of the owning workspace.
 * @param workspace - display name of the owning workspace.
 * @param state - the durable team record.
 * @returns the panel snapshot.
 */
export async function assembleTeamSnapshot(
  ctx: Context,
  stateRoot: string,
  workspace: string,
  state: TeamState,
  options: TeamSnapshotOptions = {},
): Promise<TeamActivitySnapshot> {
  const tasks = state.tasks
  const depths = taskDepthsById(tasks)
  const roster = options.includeRemoved === true
    ? state.members
    : state.members.filter((member) => member.status !== 'removed')
  const activity = options.historic === true
    ? new Map<string, 'running' | 'idle' | 'ready'>()
    : memberActivity(ctx, roster.map((member) => member.id))
  const unreadByMember = new Map<string, number>()
  for (const member of roster) {
    try {
      unreadByMember.set(member.name, (await readUnreadMailbox(stateRoot, state.id, member.name)).length)
    } catch (error: unknown) {
      ctx.logger.warn(`agent-teams: mailbox read failed for ${member.name}: ${String(error)}`)
      unreadByMember.set(member.name, 0)
    }
  }
  const members: TeamActivityMember[] = roster.map((member) => {
    const owned = tasks.filter((task) => task.assignee === member.name)
    const done = owned.filter((task) => task.status === 'completed').length
    return {
      id: member.id,
      name: member.name,
      role: member.role ?? '',
      provider: member.provider?.trim() ?? '',
      model: member.model?.trim() ?? '',
      reasoningEffort: member.reasoningEffort?.trim() ?? '',
      executionPrompt: member.executionPrompt ?? '',
      status: member.status,
      activity: options.historic === true
        ? 'idle'
        : member.id !== ''
          ? (activity.get(member.id) === 'running'
              ? 'working'
              : activity.get(member.id) === 'idle' || activity.get(member.id) === 'ready'
                ? 'idle'
                : 'unknown')
          : 'idle',
      progress: owned.length === 0 ? 0 : Math.round((done / owned.length) * 100),
      done,
      total: owned.length,
      currentTask: currentTaskOf(member.name, tasks),
      unread: unreadByMember.get(member.name) ?? 0,
    }
  })
  const captainInbox = await readUnreadMailbox(stateRoot, state.id, CAPTAIN_KEY)
  // 主对话卡片要实时同步掌门与修士的往返消息：把双方邮箱合并成一条时间线
  // （只保留未作废的最新一小段，避免每次轮询塞入整本历史）。
  let messages: TeamActivityChatMessage[] = []
  try {
    const threads = await Promise.all([
      readMailbox(stateRoot, state.id, CAPTAIN_KEY),
      ...roster.map((member) => readMailbox(stateRoot, state.id, member.name)),
    ])
    const seen = new Set<string>()
    const merged: TeamActivityChatMessage[] = []
    for (const message of threads.flat()) {
      if (message.discardedAt !== undefined || seen.has(message.id)) continue
      seen.add(message.id)
      merged.push({
        id: message.id,
        from: message.from,
        to: message.to,
        content: message.content,
        ts: message.ts,
        ...message.taskId === undefined ? {} : { taskId: message.taskId },
      })
    }
    merged.sort((left, right) => left.ts - right.ts)
    messages = merged.slice(-12)
  } catch (error: unknown) {
    ctx.logger.warn(`agent-teams: message log read failed for ${state.name}: ${String(error)}`)
  }
  // The panel must reach the same delivery conclusion as the status tool, so
  // it reads the same current bytes instead of trusting task records alone.
  const audit = options.workspacePath === undefined ? undefined : auditTeamWorkspace(options.workspacePath, state)
  const deliveryCheck = audit === undefined ? canDeclareDelivery(state) : canDeclareDelivery(state, audit)
  const loop = audit === undefined ? describeQualityLoop(state) : describeQualityLoop(state, audit)
  const acceptanceStale = options.workspacePath === undefined || state.acceptedDigests === undefined
    ? undefined
    : (() => {
        const current = Object.fromEntries(digestWorkspacePaths(options.workspacePath!, deliveryArtifactPaths(state)).map((digest) => [digest.path, digest.sha256 ?? String(digest.mtimeMs ?? 'missing')]))
        const expected = state.acceptedDigests
        if (Object.keys(current).length !== Object.keys(expected).length) return true
        return Object.entries(expected).some(([path, digest]) => current[path] !== digest)
      })()
  const goalAgent = options.historic === true ? undefined : ctx.agents.get(state.captainSessionId as never)
  const goalView = goalAgent === undefined ? undefined : (ctx as unknown as { goals?: { get(agent: unknown): { id: string; objective: string; phase: string; roundsStarted: number; maxGoalRounds: number } | undefined } }).goals?.get(goalAgent)
  const nativeTeam = goalAgent === undefined ? undefined : nativeTeamSummary(ctx, goalAgent)
  const staleById = new Map<string, string[]>()
  if (audit !== undefined) {
    for (const note of verdictAuditNotes(state, audit)) {
      staleById.set(note.taskId, [...staleById.get(note.taskId) ?? [], note.message])
    }
  }
  return {
    workspace,
    teamId: state.id,
    name: state.name,
    ...state.description !== undefined ? { description: state.description } : {},
    captainSessionId: state.captainSessionId,
    createdAt: state.createdAt,
    phase: state.phase ?? 'running',
    ...state.phase === 'staged'
      ? { planReviewState: state.planReviewState ?? 'awaiting_review' as const }
      : {},
    ...state.planSource === undefined ? {} : { planSource: state.planSource },
    ...state.planError === undefined ? {} : { planError: state.planError },
    ...state.planProjectRoot === undefined ? {} : { planProjectRoot: state.planProjectRoot },
    ...state.clarification === undefined ? {} : {
      planSummary: {
        ...state.clarification.mode === undefined ? {} : { mode: state.clarification.mode },
        scale: state.clarification.scale,
        platforms: [...state.clarification.platforms],
        constraints: [...state.clarification.constraints],
      },
    },
    ...state.halted === true ? { halted: true } : {},
    ...goalView === undefined ? {} : { goal: { id: goalView.id, objective: goalView.objective, phase: goalView.phase, roundsStarted: goalView.roundsStarted, maxGoalRounds: goalView.maxGoalRounds } },
    ...nativeTeam === undefined ? {} : { nativeTeam },
    ...state.acceptedAt === undefined ? {} : { acceptedAt: state.acceptedAt },
    ...state.acceptedBy === undefined ? {} : { acceptedBy: state.acceptedBy },
    ...acceptanceStale === undefined ? {} : { acceptanceStale },
    ...audit === undefined ? {} : {
      loopState: loop.state,
      deliverable: loop.deliverable,
      delivery: {
        ok: deliveryCheck.ok,
        blockers: [...deliveryCheck.blockers],
        warnings: [...deliveryCheck.warnings],
        evidence: deliveryCheck.evidence,
        ...deliveryCheck.ok ? { report: buildDeliveryReport(state, deliveryCheck) } : {},
      },
    },
    members,
    tasks: tasks.map((task) => ({
      id: task.id,
      subject: task.subject,
      description: task.description ?? '',
      status: task.status,
      state: taskVisualState(task.status, task.dependencies, tasks),
      assignee: task.assignee ?? (members.length === 0 ? 'captain' : ''),
      model: memberModelRoute(roster.find((member) => member.name === task.assignee)),
      dependencies: task.dependencies,
      depth: depths.get(task.id) ?? 0,
      ...task.kind === undefined ? {} : { kind: task.kind },
      ...task.round === undefined ? {} : { round: task.round },
      ...task.verdict === undefined ? {} : { verdict: task.verdict },
      ...task.objective === undefined ? {} : { objective: task.objective },
      ...task.acceptance === undefined || task.acceptance.length === 0 ? {} : { acceptance: task.acceptance },
      ...task.verify === undefined || task.verify.length === 0 ? {} : { verify: task.verify },
      ...task.inScope === undefined || task.inScope.length === 0 ? {} : { inScope: task.inScope },
      ...task.skills === undefined || task.skills.length === 0 ? {} : { skills: task.skills },
      ...staleById.get(task.id) === undefined ? {} : { verdictStale: (staleById.get(task.id) as string[]).join('; ') },
      updatedAt: task.updatedAt,
    })),
    messageCount: captainInbox.length
      + members.reduce((count, member) => count + member.unread, 0),
    captainInbox: captainInbox.slice(-5).map((message) => ({
      from: message.from,
      content: message.content,
    })),
    messages,
  }
}

/**
 * Collect every team under the given workspace state roots.
 * @param ctx - the plugin context.
 * @param roots - `{ workspace, stateRoot }` pairs (resolved absolute roots).
 * @returns the snapshots in stable order (workspace, then team id).
 */
export async function collectTeamsActivity(
  ctx: Context,
  roots: readonly { workspace: string; stateRoot: string; workspacePath?: string }[],
): Promise<TeamActivitySnapshot[]> {
  const snapshots: TeamActivitySnapshot[] = []
  for (const root of roots) {
    let entries
    try {
      entries = await readdir(root.stateRoot, { withFileTypes: true })
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
        continue
      }
      throw error
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      try {
        const state = await readTeam(root.stateRoot, entry.name)
        if (state === undefined) continue
        snapshots.push(await assembleTeamSnapshot(ctx, root.stateRoot, root.workspace, state, {
          ...root.workspacePath === undefined ? {} : { workspacePath: root.workspacePath },
        }))
      } catch {
        ctx.logger.warn(`agent-teams: skipped unreadable team state "${entry.name}" in workspace "${root.workspace}"`)
      }
    }
  }
  return snapshots
}

/**
 * Collect every archived team under the given workspace state roots (the
 * `archive/` subdirectory of each state root). Used by the historic panel
 * path to restore full team detail after deletion.
 * @param ctx - the plugin context.
 * @param roots - `{ workspace, stateRoot }` pairs.
 * @returns the archived snapshots in stable order.
 */
export async function collectArchivedTeamsActivity(
  ctx: Context,
  roots: readonly { workspace: string; stateRoot: string }[],
): Promise<TeamActivitySnapshot[]> {
  const snapshots: TeamActivitySnapshot[] = []
  for (const root of roots) {
    for (const teamId of await listArchivedTeamIds(root.stateRoot)) {
      try {
        const state = await readArchivedTeam(root.stateRoot, teamId)
        if (state === undefined) continue
        snapshots.push(await assembleTeamSnapshot(
          ctx,
          join(root.stateRoot, 'archive'),
          root.workspace,
          state,
          { includeRemoved: true, historic: true },
        ))
      } catch {
        ctx.logger.warn(`agent-teams: skipped unreadable archived team "${teamId}" in workspace "${root.workspace}"`)
      }
    }
  }
  return snapshots
}
