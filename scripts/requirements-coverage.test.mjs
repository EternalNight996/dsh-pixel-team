/** Requirement coverage mapping: every item maps to a gate task, AI coverage wins. */
import assert from 'node:assert/strict'
import test from 'node:test'
import { assignRequirementCoverage } from '../lib/quick-start.js'

function tasks() {
  return [
    { id: 't1', subject: 'req', description: '', assignee: 'a', dependencies: [], kind: 'requirements', coverageOf: ['goal'] },
    { id: 't2', subject: 'impl', description: '', assignee: 'a', dependencies: ['t1'], kind: 'implementation', coverageOf: ['goal'] },
    { id: 't3', subject: 'verify', description: '', assignee: 'a', dependencies: ['t2'], kind: 'verification', coverageOf: ['goal'] },
    { id: 't4', subject: 'review', description: '', assignee: 'a', dependencies: ['t3'], kind: 'review', coverageOf: ['goal'] },
  ]
}

test('uncovered requirements are distributed across gate tasks', () => {
  const list = tasks()
  const requirements = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6']
  assignRequirementCoverage(list, requirements, 'goal')
  for (const requirement of requirements) {
    assert.equal(list.filter(task => task.coverageOf.includes(requirement)).length, 1, requirement)
  }
  assert.deepEqual(list.map(task => task.coverageOf.filter(item => item !== 'goal').length), [2, 2, 1, 1])
})

test('existing coverage wins and is not duplicated or reassigned', () => {
  const list = tasks()
  list[1].coverageOf = ['goal', 'r1']
  assignRequirementCoverage(list, ['r1', 'r2'], 'goal')
  // r2 is uncovered and lands on its round-robin task (t2), alongside r1.
  assert.deepEqual(list[1].coverageOf, ['goal', 'r1', 'r2'])
  assert.equal(list.filter(task => task.coverageOf.includes('r1')).length, 1)
  assert.equal(list.filter(task => task.coverageOf.includes('r2')).length, 1)
})

test('empty requirements or work-only plans are left untouched', () => {
  const list = tasks()
  assignRequirementCoverage(list, [], 'goal')
  assert.deepEqual(list.map(task => task.coverageOf), [['goal'], ['goal'], ['goal'], ['goal']])
})
