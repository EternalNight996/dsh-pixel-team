/** Requirement coverage mapping: every item maps to a gate task, AI coverage wins. */
import assert from 'node:assert/strict'
import test from 'node:test'
import { assignRequirementCoverage, buildPlanFromSpecs } from '../lib/quick-start.js'
import { parsePlanSpecs } from '../lib/plan-generator.js'

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

test('AI-declared coverage is parsed and carried into the plan', () => {
  const raw = JSON.stringify({ tasks: [
    { id: 't1', subject: '拆需求', description: '拆', role: 'planner', kind: 'requirements', acceptance: ['可验收'], dependencies: [] },
    { id: 't2', subject: '写', description: '写', role: 'implementer', kind: 'implementation', acceptance: ['可运行'], inScope: ['projects/p/'], verify: ['git diff --check'], dependencies: ['t1'], coverageOf: ['需要登录'] },
    { id: 't3', subject: '验', description: '验', role: 'verifier', kind: 'verification', acceptance: ['通过'], dependencies: ['t2'], coverageOf: ['需要登录'] },
    { id: 't4', subject: '审', description: '审', role: 'reviewer', kind: 'review', acceptance: ['符合'], dependencies: ['t3'], reviewedTaskId: 't2' },
  ] })
  const specs = parsePlanSpecs(raw, ['planner', 'implementer', 'verifier', 'reviewer'], 'projects/p/', [])
  assert.ok(specs !== undefined)
  assert.deepEqual(specs.find(spec => spec.id === 't2').coverageOf, ['需要登录'])
  const plan = buildPlanFromSpecs('目标', 'feat', ['planner', 'implementer', 'verifier', 'reviewer'], specs, { inScope: ['projects/p/'], verify: ['git diff --check'], mode: 'precision' })
  assert.ok(plan.tasks.find(task => task.id === 't2').coverageOf.includes('需要登录'))
})

test('empty requirements or work-only plans are left untouched', () => {
  const list = tasks()
  assignRequirementCoverage(list, [], 'goal')
  assert.deepEqual(list.map(task => task.coverageOf), [['goal'], ['goal'], ['goal'], ['goal']])
})
