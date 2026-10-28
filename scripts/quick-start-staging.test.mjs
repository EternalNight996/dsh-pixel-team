/**
 * 立誓开宗回归：create 的 plan 只允许普通任务字段，质量契约必须在建队之后
 * 用 create_task 逐条铺开。否则整份计划会被 schema 拒绝：
 * "plan.tasks[0].kind is not a declared property"。
 */
import assert from 'node:assert/strict'
import test from 'node:test'
import { QUICK_START_TEMPLATES, buildQuickStartPlan, quickStartTaskCalls } from '../lib/quick-start.js'

const CREATE_TASK_FIELDS = new Set([
  'subject', 'description', 'assignee', 'dependencies',
  'kind', 'objective', 'acceptance', 'inScope', 'verify', 'coverageOf', 'reviewedTaskId',
])

test('every template stages tasks in dependency order', () => {
  for (const template of QUICK_START_TEMPLATES) {
    const plan = buildQuickStartPlan('ship the thing', template.id)
    const calls = quickStartTaskCalls(plan)
    assert.equal(calls.length, plan.tasks.length, template.id + ' must stage every task exactly once')
    const staged = new Set()
    for (const call of calls) {
      for (const dependency of call.input.dependencies) {
        assert.ok(staged.has(dependency), template.id + ': ' + call.seedId + ' staged before dependency ' + dependency)
      }
      if (call.input.reviewedTaskId !== undefined) {
        assert.ok(staged.has(call.input.reviewedTaskId), template.id + ': review ' + call.seedId + ' must reference a staged implementation')
      }
      staged.add(call.seedId)
    }
  }
})

test('quality contracts ride create_task, not the create plan', () => {
  const calls = quickStartTaskCalls(buildQuickStartPlan('fix login', 'fix'))
  const impl = calls.find(call => call.seedId === 'impl')
  const review = calls.find(call => call.seedId === 'review')
  assert.equal(impl.input.kind, 'implementation')
  assert.ok(impl.input.objective.includes('fix login'))
  assert.ok(impl.input.acceptance.length > 0)
  assert.ok(impl.input.verify.length > 0)
  assert.ok(impl.input.inScope.length > 0)
  assert.equal(review.input.kind, 'review')
  assert.equal(review.input.reviewedTaskId, 'impl')
  for (const call of calls) {
    for (const key of Object.keys(call.input)) {
      assert.ok(CREATE_TASK_FIELDS.has(key), 'undeclared create_task field "' + key + '" on ' + call.seedId)
    }
  }
})

test('an ordinary-work template stays ordinary work', () => {
  const calls = quickStartTaskCalls(buildQuickStartPlan('write the guide', 'docs'))
  assert.ok(calls.some(call => call.input.kind === undefined), 'docs keeps plain work tasks')
  assert.ok(calls.every(call => call.input.kind === undefined || call.input.kind === 'review'))
})
