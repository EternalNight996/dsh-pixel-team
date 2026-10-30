import assert from 'node:assert/strict'
import test from 'node:test'
import { crossModelReviewConflicts } from '../lib/quality-gates.js'

function team(reviewerModel) {
  return {
    members: [
      { id: 'm1', name: 'impl', provider: 'fake', model: 'same', status: 'idle' },
      { id: 'm2', name: 'reviewer', provider: 'fake', model: reviewerModel, status: 'idle' },
    ],
    tasks: [
      { id: 't1', subject: 'impl', status: 'completed', assignee: 'impl', dependencies: [], kind: 'implementation', objective: 'x', acceptance: ['x'], inScope: ['src'], verify: ['true'], createdAt: 1, updatedAt: 1 },
      { id: 't2', subject: 'review', status: 'pending', assignee: 'reviewer', dependencies: ['t1'], kind: 'review', reviewedTaskId: 't1', objective: 'x', acceptance: ['x'], createdAt: 1, updatedAt: 1 },
    ],
  }
}

test('cross-model review flags a reviewer on the implementation model', () => {
  assert.equal(crossModelReviewConflicts(team('same')).length, 1)
})

test('cross-model review accepts a different reviewer model', () => {
  assert.deepEqual(crossModelReviewConflicts(team('other')), [])
})
