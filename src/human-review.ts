/** Human confirmation for a host-audited review (pure eligibility + completion). */
import { randomUUID } from 'node:crypto'
import { taskKindOf } from './quality-gates.ts'
import { CAPTAIN_KEY } from './state.ts'
import type { TeamState, TeamTask } from './types.ts'

export type HumanReviewResult =
  | { readonly ok: true; readonly task: TeamTask }
  | { readonly ok: false; readonly error: string }

/**
 * Validate and complete a review that the host audited in reviewMode=human.
 * Callers still bind the verdict to the artifact bytes after this returns.
 */
export function confirmHumanReview(team: TeamState, taskId: string): HumanReviewResult {
  const task = team.tasks.find(item => item.id === taskId)
  if (task === undefined) return { ok: false, error: 'review task not found' }
  if (taskKindOf(task) !== 'review') return { ok: false, error: 'task is not a review' }
  if (task.awaitingHuman !== true) return { ok: false, error: 'task is not awaiting human review' }
  if (task.dependencies.some(id => team.tasks.find(item => item.id === id)?.status !== 'completed')) {
    return { ok: false, error: 'review dependencies are not completed' }
  }
  if (team.tasks.some(item => item.status === 'failed')) {
    return { ok: false, error: 'a failed task exists; fix it before confirming the review' }
  }
  delete task.awaitingHuman
  task.status = 'completed'
  task.verdict = 'pass'
  task.assignee = CAPTAIN_KEY
  task.attempt = (task.attempt ?? 0) + 1
  task.attemptId = randomUUID()
  task.output = '人工复核确认通过（宿主审核证据已绑定）'
  task.updatedAt = Date.now()
  return { ok: true, task }
}
