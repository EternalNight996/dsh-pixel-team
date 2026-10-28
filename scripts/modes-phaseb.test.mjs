/**
 * Phase B: mode projections, budget, verifier strategies and legacy detection.
 */
import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { resolveModeBudget } from '../lib/cost.js'
import { buildVerifierScript, detectLegacyRegressionCommand } from '../lib/verifier-script.js'
import { projectLibraryTeam } from '../lib/library-projection.js'
import { buildQuickStartPlan } from '../lib/quick-start.js'

test('mode budgets follow the spec and allow an owner override', () => {
  assert.deepEqual(resolveModeBudget('draft'), { perTaskUsd: 1, perDayUsd: 15, retryPromptAt: 2 })
  assert.deepEqual(resolveModeBudget('precision'), { perTaskUsd: 3, perDayUsd: 50, retryPromptAt: 3 })
  assert.deepEqual(resolveModeBudget('legacy').perDayUsd, 50)
  assert.equal(resolveModeBudget('draft', { perDayUsd: 99 }).perDayUsd, 99)
  assert.equal(resolveModeBudget(undefined).perDayUsd, 50)
})

test('legacy regression discovery prefers the locked package manager', () => {
  const dir = mkdtempSync(join(tmpdir(), 'pixel-legacy-'))
  try {
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ scripts: { test: 'node --test' } }), 'utf8')
    assert.equal(detectLegacyRegressionCommand(dir), 'npm test')
    writeFileSync(join(dir, 'pnpm-lock.yaml'), '', 'utf8')
    assert.equal(detectLegacyRegressionCommand(dir), 'pnpm test')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
  const empty = mkdtempSync(join(tmpdir(), 'pixel-legacy-empty-'))
  try {
    assert.equal(detectLegacyRegressionCommand(empty), undefined)
  } finally {
    rmSync(empty, { recursive: true, force: true })
  }
})

test('compliance verifier scans for plaintext secrets', () => {
  const dir = mkdtempSync(join(tmpdir(), 'pixel-compliance-'))
  try {
    mkdirSync(join(dir, 'src'), { recursive: true })
    const script = buildVerifierScript([], 'audit', 'compliance')
    assert.ok(script !== undefined)
    const path = join(dir, script.relativePath)
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, script.content, 'utf8')
    writeFileSync(join(dir, 'src', 'db.ts'), "const password = 'supersecret123'\n", 'utf8')
    const dirty = spawnSync(process.execPath, [path], { cwd: dir, encoding: 'utf8' })
    assert.equal(dirty.status, 1)
    assert.match(dirty.stdout, /FAIL/)
    writeFileSync(join(dir, 'src', 'db.ts'), 'export const ok = true\n', 'utf8')
    const clean = spawnSync(process.execPath, [path], { cwd: dir, encoding: 'utf8' })
    assert.equal(clean.status, 0, clean.stderr)
    assert.match(clean.stdout, /PASS/)
    // Non-compliance modes only build a script when there are commands.
    assert.equal(buildVerifierScript([], 'empty', 'draft'), undefined)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('library projection exposes the mode badge and gate totals', () => {
  const now = Date.now()
  const view = projectLibraryTeam({
    id: 'demo', name: '斗法宗', captainSessionId: 's', createdAt: now, members: [], taskSeq: 1, phase: 'running',
    clarification: { type: 'software', scale: 'small', mode: 'legacy', ui: { styles: [] }, platforms: ['Windows'], hardwareList: [], constraints: [], excluded: ['禁止重构底层'], acceptance: ['旧接口回归测试 100% 通过'], memoryHints: [] },
    tasks: [{ id: 't1', subject: '改', status: 'completed', dependencies: [], createdAt: now, updatedAt: now, kind: 'implementation', acceptance: ['a'], acceptanceResults: [{ criterion: 'a', status: 'passed' }] }],
  }, 0.5)
  assert.equal(view.mode, 'legacy')
  assert.match(view.modeName, /屎山抢救/)
  assert.equal(view.modeColor, '#c79bff')
  assert.deepEqual(view.gate, { passed: 1, failed: 0, total: 1 })
})

test('quick-start plan carries the mode verifier strategy', () => {
  const plan = buildQuickStartPlan('fix login', 'fix', undefined, {
    inScope: ['src/'], verify: ['pnpm typecheck'], acceptance: ['旧接口回归 100% 通过'], mode: 'legacy',
  })
  const verify = plan.tasks.find(task => task.id === 'verify')
  assert.match(verify.description, /屎山抢救/)
  assert.match(verify.description, /旧接口回归/)
  assert.ok(verify.acceptance.includes('旧接口回归 100% 通过'))
})
