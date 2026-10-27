/**
 * Role contracts and the full-stack template:
 * - every software role has a concise, bounded contract;
 * - the template keeps frontend/backend disjoint and gates the integration.
 */
import assert from 'node:assert/strict'
import test from 'node:test'
import { ROLE_CONTRACT_IDS, roleGuidance } from '../lib/role-guidance.js'
import { buildQuickStartPlan } from '../lib/quick-start.js'
import { memberPersona } from '../lib/members.js'
import { resolveTeamProfile } from '../lib/profiles.js'

test('software roles expose bounded contracts with ownership, rules and done', () => {
  for (const role of ['frontend', 'backend', 'integrator', 'verifier', 'reviewer', 'security']) {
    assert.ok(ROLE_CONTRACT_IDS.includes(role), `missing role ${role}`)
    const text = roleGuidance(role)
    assert.equal(typeof text, 'string')
    assert.ok(text.length >= 300 && text.length <= 1400, `${role} contract length ${text.length}`)
    assert.match(text, /Ownership:/)
    assert.match(text, /Must:/)
    assert.match(text, /Done:/)
    assert.match(text, /Report:/)
  }
  assert.equal(roleGuidance('captain'), undefined)
  assert.equal(roleGuidance(undefined), undefined)
})

test('frontend/backend/integrator contracts stay in disjoint layers', () => {
  const frontend = roleGuidance('frontend')
  const backend = roleGuidance('backend')
  const integrator = roleGuidance('integrator')
  assert.match(frontend, /loading \/ empty \/ error/)
  assert.match(frontend, /screen-reader|keyboard/)
  assert.match(frontend, /server routes, database schemas/)
  assert.match(backend, /contract|migration|authz/)
  assert.match(backend, /edit UI/)
  assert.match(integrator, /end-to-end smoke/)
  assert.match(integrator, /drift/)
  assert.match(integrator, /draft the API\/UI contract/)
})

test('member persona appends the contract only for recognized software roles', () => {
  const team = { id: 't', name: 'T', description: 'goal', profile: { protocol: 'p' } }
  const frontend = memberPersona(team, { name: 'm', role: 'frontend' }, '/tmp')
  assert.match(frontend, /Role contract:/)
  assert.match(frontend, /loading \/ empty \/ error/)
  const generic = memberPersona(team, { name: 'm', role: 'researcher' }, '/tmp')
  assert.doesNotMatch(generic, /Role contract:/)
})

test('the fix/feat/array templates emit quality contracts, not ordinary work', () => {
  const fix = buildQuickStartPlan('fix the login crash', 'fix')
  const fixById = new Map(fix.tasks.map(task => [task.id, task]))
  assert.equal(fixById.get('impl')?.kind, 'implementation')
  assert.ok((fixById.get('impl')?.inScope ?? []).length > 0)
  assert.ok((fixById.get('impl')?.verify ?? []).length > 0)
  assert.equal(fixById.get('verify')?.kind, 'verification')
  assert.equal(fixById.get('review')?.kind, 'review')
  assert.equal(fixById.get('review')?.reviewedTaskId, 'impl')

  const feat = buildQuickStartPlan('add a booking flow', 'feat')
  const featById = new Map(feat.tasks.map(task => [task.id, task]))
  assert.equal(featById.get('req')?.kind, 'requirements')
  assert.equal(featById.get('impl')?.kind, 'implementation')
  assert.equal(featById.get('verify')?.kind, 'verification')
  assert.equal(featById.get('review')?.kind, 'review')
  assert.equal(featById.get('review')?.reviewedTaskId, 'impl')

  const array = buildQuickStartPlan('refactor the parser', 'array')
  const arrayById = new Map(array.tasks.map(task => [task.id, task]))
  assert.equal(arrayById.get('design')?.kind, 'requirements')
  assert.equal(arrayById.get('refactor')?.kind, 'implementation')
  assert.equal(arrayById.get('review')?.kind, 'review')
  assert.equal(arrayById.get('review')?.reviewedTaskId, 'refactor')
})

test('profile seed tasks can declare quality contracts and review targets', () => {
  const profile = resolveTeamProfile({
    quality: {
      taskPlanning: 'seed',
      members: [
        { name: 'builder', role: 'implementer' },
        { name: 'checker', role: 'verifier' },
        { name: 'critic', role: 'reviewer' },
      ],
      tasks: [
        { id: 'impl', subject: 'ship parser', assignee: 'builder', kind: 'implementation', objective: 'Ship the parser', inScope: ['src/'], verify: ['pnpm typecheck'], acceptance: ['parser accepts empty input'] },
        { id: 'verify', subject: 'verify parser', assignee: 'checker', kind: 'verification', dependencies: ['impl'], objective: 'Verify the parser', acceptance: ['declared commands pass'] },
        { id: 'review', subject: 'review parser', assignee: 'critic', kind: 'review', dependencies: ['verify'], reviewedTaskId: 'impl', objective: 'Review the parser', acceptance: ['implementation satisfies the goal'] },
      ],
    },
  }, 'quality', 8)
  const byId = new Map(profile.tasks.map(task => [task.id, task]))
  assert.equal(byId.get('impl')?.kind, 'implementation')
  assert.deepEqual(byId.get('impl')?.inScope, ['src/'])
  assert.deepEqual(byId.get('impl')?.verify, ['pnpm typecheck'])
  assert.equal(byId.get('review')?.reviewedTaskId, 'impl')

  assert.throws(() => resolveTeamProfile({
    broken: {
      taskPlanning: 'seed',
      members: [{ name: 'builder', role: 'implementer' }],
      tasks: [{ id: 'impl', subject: 'ship parser', assignee: 'builder', kind: 'implementation', objective: 'Ship', inScope: ['src/'], verify: ['pnpm typecheck'] }],
    },
  }, 'broken', 8), /acceptance/)
})

test('work-only templates still end in a quality review gate', () => {
  for (const template of ['research', 'docs', 'debate']) {
    const plan = buildQuickStartPlan('goal', template)
    const review = plan.tasks.find(task => task.id === 'review')
    assert.equal(review?.kind, 'review', template)
    assert.ok(review?.reviewedTaskId, template)
  }
  const fullstack = buildQuickStartPlan('goal', 'fullstack')
  const review = fullstack.tasks.find(task => task.id === 'review')
  assert.equal(review?.kind, 'review')
  assert.equal(review?.reviewedTaskId, 'integrate')
  for (const task of fullstack.tasks.filter(task => task.id !== 'review')) assert.equal(task.kind, undefined)
})

test('the fullstack template becomes a quality DAG when disjoint layers exist', () => {
  const delivery = {
    inScope: ['src/', 'web/', 'server/', 'package.json'],
    verify: ['pnpm test'],
    layers: { frontend: ['web/'], backend: ['server/'] },
  }
  const plan = buildQuickStartPlan('implement a booking flow', 'fullstack', undefined, delivery)
  const byId = new Map(plan.tasks.map(task => [task.id, task]))
  assert.equal(byId.get('contract')?.kind, 'requirements')
  assert.equal(byId.get('frontend')?.kind, 'implementation')
  assert.deepEqual(byId.get('frontend')?.inScope, ['web/'])
  assert.equal(byId.get('backend')?.kind, 'implementation')
  assert.deepEqual(byId.get('backend')?.inScope, ['server/'])
  assert.equal(byId.get('integrate')?.kind, 'integration')
  assert.equal(byId.get('verify')?.kind, 'verification')
  assert.equal(byId.get('review')?.kind, 'review')
  assert.equal(byId.get('review')?.reviewedTaskId, 'integrate')
})

test('hardening and build templates emit quality contracts', () => {
  const harden = buildQuickStartPlan('harden the login flow', 'hardening')
  const hardenById = new Map(harden.tasks.map(task => [task.id, task]))
  assert.equal(hardenById.get('audit')?.kind, 'requirements')
  assert.equal(hardenById.get('fix')?.kind, 'implementation')
  assert.ok((hardenById.get('fix')?.inScope ?? []).length > 0)
  assert.equal(hardenById.get('verify')?.kind, 'verification')
  assert.equal(hardenById.get('review')?.kind, 'review')
  assert.equal(hardenById.get('review')?.reviewedTaskId, 'fix')

  const build = buildQuickStartPlan('ship v1', 'build')
  const buildById = new Map(build.tasks.map(task => [task.id, task]))
  assert.equal(buildById.get('impl')?.kind, 'implementation')
  assert.equal(buildById.get('verify')?.kind, 'verification')
  assert.equal(buildById.get('release')?.kind, 'integration')
  assert.equal(buildById.get('review')?.kind, 'review')
  assert.equal(buildById.get('review')?.reviewedTaskId, 'release')
  assert.ok(build.members.some(member => member.role === 'reviewer'))
})

test('the hardening template audits, fixes minimally, verifies and reviews', () => {
  const plan = buildQuickStartPlan('harden the login flow', 'hardening')
  const roles = plan.members.map(member => member.role)
  assert.deepEqual(roles, ['auditor', 'security', 'verifier', 'reviewer'])
  const byId = new Map(plan.tasks.map(task => [task.id, task]))
  assert.deepEqual(byId.get('fix')?.dependencies, ['audit'])
  assert.deepEqual(byId.get('verify')?.dependencies, ['fix'])
  assert.deepEqual(byId.get('review')?.dependencies, ['verify'])
  assert.equal(byId.get('audit')?.assignee, '巡查使')
  assert.equal(byId.get('fix')?.assignee, '镇魔师')
  for (const task of plan.tasks) assert.match(task.description, /交付\/验收：/)
  const security = roleGuidance('security') ?? ''
  assert.match(security, /reproduce/i)
  assert.match(security, /residual risk/i)
})

test('the fullstack template builds a contract -> parallel layers -> integration DAG', () => {
  const plan = buildQuickStartPlan('implement a booking flow', 'fullstack')
  const roles = plan.members.map(member => member.role)
  assert.ok(roles.includes('frontend') && roles.includes('backend') && roles.includes('integrator'))
  const byId = new Map(plan.tasks.map(task => [task.id, task]))
  assert.deepEqual(byId.get('frontend')?.dependencies, ['contract'])
  assert.deepEqual(byId.get('backend')?.dependencies, ['contract'])
  assert.deepEqual(byId.get('integrate')?.dependencies, ['frontend', 'backend'])
  assert.deepEqual(byId.get('verify')?.dependencies, ['integrate'])
  assert.deepEqual(byId.get('review')?.dependencies, ['verify'])
  assert.equal(byId.get('contract')?.assignee, '合契师')
  assert.equal(byId.get('frontend')?.assignee, '灵绘师')
  assert.equal(byId.get('backend')?.assignee, '地脉师')
  for (const task of plan.tasks) assert.match(task.description, /交付\/验收：/, `${task.id} must carry an expected artifact`)
  assert.match(byId.get('contract')?.description ?? '', /契约文件/)
  // Lean roster: the integrator owns both the contract and the final glue.
  assert.equal(plan.members.length, 5)
  assert.ok(!roles.includes('architect'))
  assert.equal(roles.filter(role => role === 'integrator').length, 1)
})

test('the full-stack prompt and DAG stay within an efficiency budget', () => {
  const plan = buildQuickStartPlan('implement a booking flow', 'fullstack')
  const byId = new Map(plan.tasks.map(task => [task.id, task]))
  const depth = id => {
    const task = byId.get(id)
    return task === undefined || (task.dependencies ?? []).length === 0
      ? 1
      : 1 + Math.max(...(task.dependencies ?? []).map(dependency => depth(dependency)))
  }
  assert.equal(depth('review'), 5, 'contract -> layers -> integrate -> verify -> review')
  assert.equal(byId.get('frontend')?.dependencies.length, 1)
  assert.equal(byId.get('backend')?.dependencies.length, 1)
  const widths = new Map()
  for (const task of plan.tasks) {
    const level = depth(task.id)
    widths.set(level, (widths.get(level) ?? 0) + 1)
  }
  assert.equal(Math.max(...widths.values()), 2, 'only frontend/backend run in parallel')

  const contracts = ['integrator', 'frontend', 'backend', 'verifier', 'reviewer']
    .map(role => roleGuidance(role) ?? '')
  const totalChars = contracts.reduce((sum, text) => sum + text.length, 0)
  assert.ok(totalChars <= 5200, `five role contracts total ${totalChars} chars`)
  for (const text of contracts) {
    assert.match(text, /Working budget:/)
    assert.match(text, /Report:/)
  }
})
