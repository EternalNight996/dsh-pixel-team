/**
 * Phase B regression: library projection, acceptance split and the soft cost gate.
 */
import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { projectLibraryTeam } from '../lib/library-projection.js'
import { buildVerifierScript, splitAcceptance, verifierOutputContract } from '../lib/verifier-script.js'
import { appendCostLog, estimateCost, readTodayCost, resolveCostDecision } from '../lib/cost.js'
import { DEFAULT_MEMORY_ENDPOINT, probeMemory, resolveMemoryEndpoint } from '../lib/memory.js'
import { buildQuickStartPlan } from '../lib/quick-start.js'

function teamFixture() {
  const now = Date.now()
  return {
    name: '斗法宗', id: 'demo', captainSessionId: 'session-1', createdAt: now,
    members: [], taskSeq: 3, phase: 'running',
    clarification: {
      type: 'hardware', scale: 'medium',
      ui: { reference: 'MVCheck', styles: ['工业极简'] },
      platforms: ['Windows'], hardwareList: [], constraints: [], excluded: [],
      acceptance: ['连续72h无崩溃'], memoryHints: [],
    },
    tasks: [
      { id: 't1', subject: '实现', status: 'completed', dependencies: [], createdAt: now, updatedAt: now, kind: 'implementation', acceptance: ['a'], acceptanceResults: [{ criterion: 'a', status: 'passed' }] },
      { id: 't2', subject: '验证', status: 'in_progress', dependencies: ['t1'], createdAt: now, updatedAt: now, kind: 'verification', acceptance: ['a', 'b'], acceptanceResults: [{ criterion: 'a', status: 'passed' }] },
      { id: 't3', subject: '审查', status: 'pending', dependencies: ['t2'], createdAt: now, updatedAt: now, kind: 'review', acceptance: ['a'] },
    ],
  }
}

test('library projection: lanes by depth, edge states and acceptance', () => {
  const view = projectLibraryTeam(teamFixture(), 1.5)
  assert.equal(view.tasks.find(task => task.id === 't3').depth, 2)
  assert.equal(view.edges.find(edge => edge.from === 't1').state, 'satisfied')
  assert.equal(view.edges.find(edge => edge.from === 't2').state, 'running')
  assert.equal(view.todayCostUsd, 1.5)
  assert.ok(view.scale.includes('多模块'))
  const verify = view.tasks.find(task => task.id === 't2')
  assert.deepEqual(verify.acceptance, [{ criterion: 'a', status: 'pass' }, { criterion: 'b', status: 'pending' }])
})

test('library projection marks failed gates as the blocker', () => {
  const team = teamFixture()
  team.tasks[1].status = 'failed'
  team.tasks[1].updatedAt = Date.now()
  const view = projectLibraryTeam(team)
  assert.equal(view.blocker?.taskId, 't2')
})

test('acceptance split turns executable lines into verifier commands', () => {
  const split = splitAcceptance(['连续72h无崩溃', 'pnpm typecheck', '$ node scripts/smoke.mjs'])
  assert.deepEqual(split.commands, ['pnpm typecheck', 'node scripts/smoke.mjs'])
  assert.deepEqual(split.criteria, ['连续72h无崩溃'])
  assert.ok(verifierOutputContract().includes('【PASS】'))
})

test('constitution acceptance reaches the quick-start verification task', () => {
  const plan = buildQuickStartPlan('fix login', 'fix', undefined, {
    inScope: ['src/'], verify: ['pnpm typecheck'], acceptance: ['连续72h无崩溃'],
  })
  const verify = plan.tasks.find(task => task.id === 'verify')
  assert.ok(verify.acceptance.includes('连续72h无崩溃'))
  assert.ok(verify.description.includes('【PASS】'))
})

test('cost estimates are positive and today cost sums the log', async () => {
  assert.ok(estimateCost(10) > 0)
  assert.ok(estimateCost(10_000) > estimateCost(10))
  const workspace = mkdtempSync(join(tmpdir(), 'pixel-cost-'))
  try {
    await appendCostLog(workspace, { ts: Date.now(), sessionId: 's', memberName: 'm', estimateUsd: 0.25, decision: 'auto-continue' })
    await appendCostLog(workspace, { ts: Date.now() - 2 * 86_400_000, sessionId: 's', memberName: 'm', estimateUsd: 9, decision: 'auto-continue' })
    const today = await readTodayCost(workspace)
    assert.equal(today, 0.25)
    assert.equal(resolveCostDecision('missing', 'continue'), false)
  } finally {
    rmSync(workspace, { recursive: true, force: true })
  }
})

test('memory probe resolves the default and treats a dead endpoint as missing', async () => {
  assert.equal(resolveMemoryEndpoint(undefined), DEFAULT_MEMORY_ENDPOINT)
  assert.equal(resolveMemoryEndpoint('  '), DEFAULT_MEMORY_ENDPOINT)
  assert.equal(resolveMemoryEndpoint(' http://127.0.0.1:9/recall '), 'http://127.0.0.1:9/recall')
  assert.equal(await probeMemory('http://127.0.0.1:1/recall'), false)
})

test('verifier smoke script runs the acceptance commands and reports PASS/FAIL', () => {
  const dir = mkdtempSync(join(tmpdir(), 'pixel-verifier-'))
  try {
    writeFileSync(join(dir, 'ok.mjs'), 'process.exit(0)\n')
    writeFileSync(join(dir, 'bad.mjs'), 'process.exit(3)\n')
    const pass = buildVerifierScript(['node ok.mjs'], 'unit-pass')
    assert.ok(pass !== undefined)
    assert.equal(pass.relativePath, '.pixel-team/verify/unit-pass.mjs')
    const passPath = join(dir, pass.relativePath)
    mkdirSync(dirname(passPath), { recursive: true })
    writeFileSync(passPath, pass.content, 'utf8')
    const ok = spawnSync(process.execPath, [passPath], { cwd: dir, encoding: 'utf8' })
    assert.equal(ok.status, 0, ok.stderr)
    assert.match(ok.stdout, /PASS/)
    assert.match(readFileSync(passPath.replace(/\.mjs$/, '.log'), 'utf8'), /PASS/)
    const fail = buildVerifierScript(['node bad.mjs'], 'unit-fail')
    const failPath = join(dir, fail.relativePath)
    mkdirSync(dirname(failPath), { recursive: true })
    writeFileSync(failPath, fail.content, 'utf8')
    const failed = spawnSync(process.execPath, [failPath], { cwd: dir, encoding: 'utf8' })
    assert.equal(failed.status, 1)
    assert.match(failed.stdout, /FAIL/)
    assert.equal(buildVerifierScript([], 'empty'), undefined)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
