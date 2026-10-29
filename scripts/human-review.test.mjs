/** Human review confirmation and staged plan source (regeneration inputs). */
import assert from 'node:assert/strict'
import test from 'node:test'
import { confirmHumanReview } from '../lib/human-review.js'
import { planSourceOf } from '../lib/quick-start.js'

function team(overrides = {}) {
  return {
    name: 'sect', id: 'sect', captainSessionId: 'cap', createdAt: 1, taskSeq: 2,
    members: [], phase: 'staged',
    tasks: [
      { id: 't1', subject: 'impl', status: 'completed', kind: 'implementation', dependencies: [], attempt: 1 },
      { id: 't2', subject: 'review', status: 'pending', kind: 'review', dependencies: ['t1'], reviewedTaskId: 't1', awaitingHuman: true, attempt: 0 },
    ],
    ...overrides,
  }
}

test('a host-audited review completes only after human confirmation', () => {
  const target = team()
  const result = confirmHumanReview(target, 't2')
  assert.equal(result.ok, true)
  assert.equal(target.tasks[1].status, 'completed')
  assert.equal(target.tasks[1].verdict, 'pass')
  assert.equal(target.tasks[1].assignee, 'captain')
  assert.equal(target.tasks[1].awaitingHuman, undefined)
  assert.ok(String(target.tasks[1].attemptId).length > 0)
})

test('missing/ordinary/incomplete/failed states are rejected', () => {
  assert.equal(confirmHumanReview(team(), 'missing').ok, false)

  const notAwaiting = team()
  notAwaiting.tasks[1].awaitingHuman = undefined
  assert.equal(confirmHumanReview(notAwaiting, 't2').ok, false)

  const pendingDep = team()
  pendingDep.tasks[0].status = 'in_progress'
  assert.equal(confirmHumanReview(pendingDep, 't2').ok, false)

  const failedOther = team()
  failedOther.tasks.push({ id: 't3', subject: 'x', status: 'failed', kind: 'verification', dependencies: [], attempt: 1 })
  assert.equal(confirmHumanReview(failedOther, 't2').ok, false)
})

test('plan source only exists for staged teams and preserves the inputs', () => {
  const requirement = { original: '做贪吃蛇' }
  const staged = team({
    description: '做贪吃蛇',
    clarification: { type: 'software', scale: 'small', ui: {}, platforms: ['Windows'], constraints: ['零依赖'], excluded: [], acceptance: ['可玩'], mode: 'precision' },
    requirement,
    members: [{ id: 'm1', name: '军师', role: 'planner', status: 'idle' }],
  })
  const source = planSourceOf(staged)
  assert.ok(source !== undefined)
  assert.equal(source.goal, '做贪吃蛇')
  assert.deepEqual(source.roles, ['planner'])
  assert.equal(source.solo, false)
  assert.equal(source.requirement.original, '做贪吃蛇')

  const running = team({ phase: 'running' })
  assert.equal(planSourceOf(running), undefined)

  const solo = team({ members: [] })
  assert.equal(planSourceOf(solo)?.solo, true)
})
