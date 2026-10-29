/** Auto-review eligibility: parallel branches, failed gates, acceptance policy. */
import assert from 'node:assert/strict'
import test from 'node:test'
import { autoReviewCandidates } from '../lib/auto-review.js'

function task(id, kind, status, extra = {}) {
  return { id, subject: id, status, dependencies: [], kind, attempt: 0, ...extra }
}

function team(tasks) {
  return { name: 't', id: 't', captainSessionId: 'c', createdAt: 1, members: [], tasks, taskSeq: tasks.length }
}

function baseTasks() {
  return [
    task('t1', 'implementation', 'completed', {
      acceptanceResults: [{ criterion: 'a', status: 'passed' }],
      commandsRun: [{ command: 'x', status: 'passed' }],
    }),
    task('t2', 'verification', 'completed', { dependencies: ['t1'] }),
    task('t3', 'review', 'pending', { dependencies: ['t2'], reviewedTaskId: 't1' }),
    task('t4', 'implementation', 'in_progress'),
    task('t5', 'review', 'pending', { dependencies: ['t4'], reviewedTaskId: 't4' }),
  ]
}

test('a parallel sibling branch does not block an eligible review', () => {
  assert.deepEqual(autoReviewCandidates(team(baseTasks())).map(item => item.id), ['t3'])
})

test('an unrelated failed task does not block a green branch (delivery still does)', () => {
  const tasks = [...baseTasks(), task('t9', 'verification', 'failed')]
  assert.deepEqual(autoReviewCandidates(team(tasks)).map(item => item.id), ['t3'])
})

test('a failed dependency in the review closure blocks auto review', () => {
  const tasks = baseTasks()
  tasks[1].status = 'failed'
  assert.deepEqual(autoReviewCandidates(team(tasks)), [])
})

test('missing or failed acceptance blocks by default but can be relaxed', () => {
  const tasks = baseTasks()
  tasks[0].acceptanceResults = []
  assert.deepEqual(autoReviewCandidates(team(tasks)), [])
  assert.deepEqual(autoReviewCandidates(team(tasks), { requireAcceptance: false }).map(item => item.id), ['t3'])
})

test('a failed host command blocks auto review', () => {
  const tasks = baseTasks()
  tasks[0].commandsRun = [{ command: 'x', status: 'failed' }]
  assert.deepEqual(autoReviewCandidates(team(tasks)), [])
})

test('attempted reviews, missing deps and incomplete targets are skipped', () => {
  const attempted = baseTasks()
  attempted[2].attempt = 2
  assert.deepEqual(autoReviewCandidates(team(attempted)), [])

  const noDeps = baseTasks()
  noDeps[2].dependencies = []
  assert.deepEqual(autoReviewCandidates(team(noDeps)), [])

  const incompleteTarget = baseTasks()
  incompleteTarget[0].status = 'in_progress'
  assert.deepEqual(autoReviewCandidates(team(incompleteTarget)), [])
})
