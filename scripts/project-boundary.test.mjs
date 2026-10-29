/** Founding boundary: project root, platform paths and plan confinement. */
import assert from 'node:assert/strict'
import test from 'node:test'
import { boundaryViolations, confinePlanToProject, isInsideProject, isPlatformPath, projectRootFor, projectSlug } from '../lib/project-boundary.js'
import { parsePlanSpecs } from '../lib/plan-generator.js'
import { buildPlanFromSpecs } from '../lib/quick-start.js'

const roles = ['planner', 'implementer', 'verifier', 'reviewer']
const root = projectRootFor('做个贪吃蛇')

function specsFor(scope) {
  return [
    { id: 'a', subject: '拆需求', description: '拆解贪吃蛇规则', role: 'planner', kind: 'requirements', acceptance: ['规则可验证'], dependencies: [] },
    { id: 'b', subject: '写游戏', description: '实现贪吃蛇', role: 'implementer', kind: 'implementation', acceptance: ['可玩'], ...(scope === undefined ? {} : { inScope: scope }), verify: ['node --check game.js'], dependencies: ['a'] },
    { id: 'c', subject: '验证', description: '跑冒烟', role: 'verifier', kind: 'verification', acceptance: ['冒烟通过'], dependencies: ['b'] },
    { id: 'd', subject: '审查', description: '审查实现', role: 'reviewer', kind: 'review', acceptance: ['实现符合需求'], dependencies: ['c'], reviewedTaskId: 'b' },
  ]
}

test('project roots are inside projects/ and traversal is rejected', () => {
  assert.match(root, /^projects\//)
  assert.equal(root.endsWith('/'), true)
  assert.ok(projectSlug('做个贪吃蛇').length > 0)
  assert.equal(isInsideProject(root, root + 'src/game.js'), true)
  assert.equal(isInsideProject(root, 'projects/other/src/game.js'), false)
  assert.equal(isInsideProject(root, '../src/game.js'), false)
  assert.equal(isInsideProject(root, 'C:/Windows/system32'), false)
  assert.equal(isPlatformPath('src/client/SectHallOverlay.tsx'), true)
  assert.equal(isPlatformPath(root + 'src/game.js'), false)
  assert.deepEqual(boundaryViolations(['src/'], root), ['src/ is a platform path'])
  assert.deepEqual(boundaryViolations([root + 'src/'], root), [])
})

test('plan specs must keep inScope inside the project root', () => {
  const ok = parsePlanSpecs(JSON.stringify({ tasks: specsFor([root + 'src/']) }), roles, root)
  assert.ok(ok !== undefined)
  const escaped = specsFor(['src/'])
  assert.equal(parsePlanSpecs(JSON.stringify({ tasks: escaped }), roles, root), undefined)
  const filled = parsePlanSpecs(JSON.stringify({ tasks: specsFor(undefined) }), roles, root)
  assert.ok(filled !== undefined)
  assert.deepEqual(filled.find(item => item.id === 'b')?.inScope, [root])
})

test('template fallback is confined to the project root', () => {
  const plan = buildPlanFromSpecs('贪吃蛇', 'feat', roles, specsFor([root + 'src/']))
  const confined = confinePlanToProject(plan, root)
  const scoped = confined.tasks.filter(task => task.inScope !== undefined)
  assert.ok(scoped.length > 0)
  assert.ok(scoped.every(task => task.inScope.length === 1 && task.inScope[0] === root))
})
