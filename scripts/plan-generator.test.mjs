/** AI plan generation: validation and spec-to-plan assembly. */
import assert from 'node:assert/strict'
import test from 'node:test'
import { parsePlanSpecs } from '../lib/plan-generator.js'
import { buildPlanFromSpecs, quickStartRoles, soloPlan } from '../lib/quick-start.js'

const roles = ['planner', 'implementer', 'verifier', 'reviewer']
const valid = {
  tasks: [
    { id: 'a', subject: '拆解贪吃蛇需求', description: '梳理移动、吃食、撞墙与计分规则', role: 'planner', kind: 'requirements', acceptance: ['规则可验证'], dependencies: [] },
    { id: 'b', subject: '实现贪吃蛇主循环', description: '实现方向键移动、食物生成与碰撞判定', role: 'implementer', kind: 'implementation', acceptance: ['键盘可控制蛇移动'], inScope: ['src/'], verify: ['pnpm typecheck'], dependencies: ['a'] },
    { id: 'c', subject: '验证贪吃蛇玩法', description: '跑主流程与边界用例', role: 'verifier', kind: 'verification', acceptance: ['主流程通过'], verify: ['pnpm test'], dependencies: ['b'] },
    { id: 'd', subject: '审查贪吃蛇实现', description: '审查移动与碰撞逻辑', role: 'reviewer', kind: 'review', acceptance: ['实现符合需求'], dependencies: ['c'], reviewedTaskId: 'b' },
  ],
}

test('plan specs are validated and assembled from the goal', () => {
  const specs = parsePlanSpecs(JSON.stringify(valid), roles)
  assert.ok(specs !== undefined)
  assert.equal(specs.length, 4)
  assert.equal(specs[2].kind, 'verification')
  const plan = buildPlanFromSpecs('做个贪吃蛇', 'feat', roles, specs)
  assert.deepEqual(quickStartRoles('feat', roles), roles)
  assert.ok(plan.tasks.some(task => task.subject.includes('贪吃蛇')))
  const impl = plan.tasks.find(task => task.id === 'b')
  assert.deepEqual(impl.acceptance, ['键盘可控制蛇移动'])
  assert.deepEqual(impl.verify, ['pnpm typecheck'])
})

test('invalid plans fall back (no review, cycle, missing acceptance)', () => {
  assert.equal(parsePlanSpecs('not json', roles), undefined)
  const noReview = { tasks: valid.tasks.slice(0, 3) }
  assert.equal(parsePlanSpecs(JSON.stringify(noReview), roles), undefined)
  const cyclic = { tasks: [ { ...valid.tasks[1], id: 'b', dependencies: ['c'] }, { ...valid.tasks[2], id: 'c', dependencies: ['b'], kind: 'verification' }, { ...valid.tasks[3], dependencies: ['c'] } ] }
  assert.equal(parsePlanSpecs(JSON.stringify(cyclic), roles), undefined)
  const noAcceptance = { tasks: valid.tasks.map(task => task.id === 'b' ? { ...task, acceptance: [] } : task) }
  assert.equal(parsePlanSpecs(JSON.stringify(noAcceptance), roles), undefined)
})

test('solo plan drops members and routes every task to the captain', () => {
  const specs = parsePlanSpecs(JSON.stringify(valid), roles)
  const plan = buildPlanFromSpecs('����̰����', 'feat', roles, specs)
  const solo = soloPlan(plan)
  assert.deepEqual(solo.members, [])
  assert.equal(solo.tasks.length, plan.tasks.length)
  assert.ok(solo.tasks.every(task => task.assignee === 'captain'))
})
