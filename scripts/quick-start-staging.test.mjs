/**
 * 立誓开宗回归：create 的 plan 只允许普通任务字段，质量契约必须在建队之后
 * 用 create_task 逐条铺开。否则整份计划会被 schema 拒绝：
 * "plan.tasks[0].kind is not a declared property"。
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { QUICK_START_TEMPLATES, buildQuickStartPlan, quickStartTaskCalls, stageQuickStartTeam } from '../lib/quick-start.js'

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

test('every doctrine the quick-start dialog offers has a server template', () => {
  // The dialog silently falls back to the first template for an unknown id, so
  // a doctrine missing here would stage the fix workflow under another label.
  const dialog = readFileSync(new URL('../src/client/QuickStartDialog.tsx', import.meta.url), 'utf8')
  const offered = [...dialog.matchAll(/\{ id: '([^']+)', labelKey: 'quickstart\.tpl/g)].map(match => match[1])
  assert.ok(offered.length >= 10, 'the dialog template list could not be parsed: ' + JSON.stringify(offered))
  const server = new Set(QUICK_START_TEMPLATES.map(template => template.id))
  for (const id of offered) {
    assert.ok(server.has(id), 'the dialog offers "' + id + '" but src/quick-start.ts has no such template')
  }
})

test('the audit doctrine is a read-only audit plus review, not the fix workflow', () => {
  const plan = buildQuickStartPlan('audit the release', 'audit')
  const calls = quickStartTaskCalls(plan)
  assert.deepEqual(plan.members.map(member => member.role), ['auditor', 'reviewer'])
  assert.deepEqual(calls.map(call => call.seedId), ['audit', 'review'])
  assert.equal(calls[0].input.kind, undefined, 'the audit task stays ordinary read-only work')
  assert.equal(calls[1].input.kind, 'review')
  assert.equal(calls[1].input.reviewedTaskId, 'audit')
  assert.deepEqual(calls[1].input.dependencies, ['audit'])
  assert.equal(plan.template, 'audit')
})
function recorder(failOnCall) {
  const calls = { create: [], createTask: [], deleteTeam: [] }
  const tools = {
    create: {
      async execute(args) {
        calls.create.push(args)
        return { team_id: 'team-1', team_name: 'probe sect', phase: 'staged' }
      },
    },
    createTask: {
      async execute(args) {
        calls.createTask.push(args)
        if (failOnCall !== undefined && calls.createTask.length === failOnCall) throw new Error('create_task failed')
        return { task_id: 't' + calls.createTask.length }
      },
    },
    deleteTeam: {
      async execute(args) { calls.deleteTeam.push(args) },
    },
  }
  return { calls, tools }
}

test('staging creates the roster without tasks, then maps depends/review to live ids', async () => {
  const plan = buildQuickStartPlan('fix login', 'fix')
  const run = { marker: true }
  const { calls, tools } = recorder()
  const value = await stageQuickStartTeam(plan, 'fix login', run, tools)
  assert.deepEqual(value, { teamId: 'team-1', teamName: 'probe sect', phase: 'staged' })
  assert.equal(calls.create.length, 1)
  assert.deepEqual(calls.create[0].plan.tasks, [], 'create must carry no tasks')
  assert.equal(calls.create[0].plan.members.length, plan.members.length)
  assert.equal(calls.createTask.length, plan.tasks.length)
  // impl -> t1, verify -> t2 (depends t1), review -> t3 (depends t2, reviews t1)
  assert.deepEqual(calls.createTask.map(call => call.dependencies), [[], ['t1'], ['t2']])
  assert.equal(calls.createTask[2].reviewedTaskId, 't1')
  for (const key of ['kind', 'objective', 'acceptance', 'verify', 'inScope']) {
    assert.ok(key in calls.createTask[0], 'implementation contract must reach create_task: ' + key)
  }
  assert.deepEqual(calls.deleteTeam, [])
})

test('a failed task rolls the half-staged team back', async () => {
  const plan = buildQuickStartPlan('fix login', 'fix')
  const { calls, tools } = recorder(2)
  await assert.rejects(() => stageQuickStartTeam(plan, 'fix login', {}, tools), /create_task failed/)
  assert.equal(calls.deleteTeam.length, 1, 'the half-staged team must be rolled back once')
})

test('a create failure never deletes anything', async () => {
  const plan = buildQuickStartPlan('fix login', 'fix')
  const deleted = []
  const tools = {
    create: { async execute() { throw new Error('team already exists') } },
    createTask: { async execute() { return { task_id: 't1' } } },
    deleteTeam: { async execute() { deleted.push(true) } },
  }
  await assert.rejects(() => stageQuickStartTeam(plan, 'fix login', {}, tools), /team already exists/)
  assert.deepEqual(deleted, [])
})

test('missing tools are reported before any call', async () => {
  const plan = buildQuickStartPlan('fix login', 'fix')
  await assert.rejects(() => stageQuickStartTeam(plan, 'fix login', {}, { create: {}, createTask: {} }), /unavailable/)
})

