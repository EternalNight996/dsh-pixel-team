/**
 * Pure auto-review eligibility: which pending review tasks may be closed by a
 * host audit. Kept separate from tools.ts so parallel-DAG behaviour is testable.
 */
import { reviewedTargetOf, taskKindOf } from './quality-gates.ts'
import type { TeamState, TeamTask } from './types.ts'

export interface AutoReviewOptions {
  /** Require every acceptance item of the reviewed task to pass (default true). */
  readonly requireAcceptance?: boolean
}

/**
 * Eligible review tasks:
 * - pending, never attempted, with at least one dependency;
 * - the whole dependency closure is completed and contains no failed task;
 * - the reviewed target is completed with passing acceptance/commands.
 * Unrelated parallel branches are intentionally ignored: a failure elsewhere
 * blocks delivery, not this branch's review.
 */
export function autoReviewCandidates(team: TeamState, options: AutoReviewOptions = {}): TeamTask[] {
  const byId = new Map(team.tasks.map(task => [task.id, task]))
  const candidates: TeamTask[] = []
  for (const review of team.tasks) {
    if (taskKindOf(review) !== 'review') continue
    if (review.status !== 'pending' || (review.attempt ?? 0) > 0) continue
    if (review.dependencies.length === 0) continue
    const target = reviewedTargetOf(team, review)
    if (target === undefined || target.status !== 'completed') continue
    const closure = new Set<string>()
    const visit = (id: string): void => {
      if (closure.has(id)) return
      closure.add(id)
      const task = byId.get(id)
      if (task === undefined) return
      for (const dependency of task.dependencies) visit(dependency)
    }
    visit(review.id)
    let blocked = false
    for (const id of closure) {
      const task = byId.get(id)
      if (task === undefined || id === review.id) continue
      if (task.status === 'failed' || task.status !== 'completed') { blocked = true; break }
    }
    if (blocked) continue
    const acceptance = target.acceptanceResults ?? []
    if (options.requireAcceptance !== false && (acceptance.length === 0 || acceptance.some(item => item.status !== 'passed'))) continue
    if ((target.commandsRun ?? []).some(item => item.status !== 'passed')) continue
    candidates.push(review)
  }
  return candidates
}
