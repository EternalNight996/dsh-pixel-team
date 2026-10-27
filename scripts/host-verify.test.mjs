import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { actualChangedPaths, missingDeclaredChanges, runHostVerification } from '../lib/host-verify.js'
import { buildDeliveryReport, writeDeliveryReport } from '../lib/delivery-report.js'
import { selectCleanupCandidates } from '../lib/cleanup.js'
import { readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'

async function workspace(t) {
  const dir = await mkdtemp(join(tmpdir(), 'teams-host-verify-'))
  t.after(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    await rm(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  })
  return dir
}

test('host verification records a real pass and exit code', async (t) => {
  const dir = await workspace(t)
  const [result] = await runHostVerification(dir, ['node -e "console.log(\'ok\')"'])
  assert.equal(result.status, 'passed')
  assert.equal(result.exitCode, 0)
  assert.match(result.evidence, /\[host-verified\]/)
  assert.match(result.evidence, /ok/)
})

test('host verification refuses a failing command', async (t) => {
  const dir = await workspace(t)
  const [result] = await runHostVerification(dir, ['node -e "process.exit(3)"'])
  assert.equal(result.status, 'failed')
  assert.equal(result.exitCode, 3)
  assert.match(result.evidence, /exit 3/)
})

test('host verification kills a timed-out command', async (t) => {
  const dir = await workspace(t)
  const [result] = await runHostVerification(dir, ['node -e "setTimeout(() => {}, 5000)"'], 100)
  assert.equal(result.status, 'failed')
  assert.match(result.evidence, /timed out after 100ms/)
})

test('delivery report records host evidence and residual risks', async (t) => {
  const dir = await workspace(t)
  const team = {
    id: 'team', name: 'Team', description: 'ship it',
    tasks: [{
      id: 't1', subject: 'implement', kind: 'implementation', status: 'completed',
      assignee: 'builder', attempt: 1, createdAt: 1, updatedAt: 2000,
      objective: 'Ship', acceptance: ['works'],
      acceptanceResults: [{ criterion: 'works', status: 'passed' }],
      changedPaths: ['src/a.ts'],
      commandsRun: [{ command: 'node -e "process.exit(0)"', status: 'passed', exitCode: 0, evidence: '[host-verified] exit 0' }],
      output: 'done',
    }],
  }
  const markdown = buildDeliveryReport(team, {
    ok: true, blockers: [], warnings: ['old verdict drift'],
    evidence: { qualityTasks: 1, completedQualityTasks: 1, reviewRounds: 0, hostVerifiedCommands: 1, unverifiedQualityTasks: [], attempts: 1, totalDurationMs: 1999, workTasks: 0, completedWorkTasks: 0 },
  })
  assert.match(markdown, /Delivery report/)
  assert.match(markdown, /host-verified commands 1/)
  assert.match(markdown, /old verdict drift/)
  const path = await writeDeliveryReport(dir, team, markdown)
  assert.match(await readFile(path, 'utf8'), /Residual risks/)
})

test('cleanup selects only old terminal teams and never the current captain', () => {
  const now = Date.now()
  const day = 86_400_000
  const team = (id, captain, ageDays, status) => ({
    id, name: id, captainSessionId: captain, createdAt: now - ageDays * day,
    tasks: [{ id: 't1', subject: 'x', status, updatedAt: now - ageDays * day }],
  })
  const candidates = selectCleanupCandidates([
    team('old', 'other', 10, 'completed'),
    team('fresh', 'other', 1, 'completed'),
    team('active', 'other', 10, 'in_progress'),
    team('current', 'me', 10, 'completed'),
  ], { now, olderThanDays: 7, excludeCaptainSessionId: 'me' })
  assert.deepEqual(candidates.map(item => item.id), ['old'])
})

test('actual changed paths come from git and declared paths must exist', async (t) => {
  const dir = await workspace(t)
  assert.equal(await actualChangedPaths(dir), undefined, 'non-git workspace is not an audit failure')
  execFileSync('git', ['init', '-q'], { cwd: dir })
  execFileSync('git', ['config', 'user.email', 'test@example.com'], { cwd: dir })
  execFileSync('git', ['config', 'user.name', 'Test'], { cwd: dir })
  await import('node:fs/promises').then(fs => fs.writeFile(join(dir, 'a.txt'), 'one\n'))
  execFileSync('git', ['add', 'a.txt'], { cwd: dir })
  execFileSync('git', ['commit', '-qm', 'base'], { cwd: dir })
  await import('node:fs/promises').then(fs => fs.writeFile(join(dir, 'a.txt'), 'two\n'))
  await import('node:fs/promises').then(fs => fs.writeFile(join(dir, 'b.txt'), 'new\n'))
  const actual = await actualChangedPaths(dir)
  assert.ok(actual?.includes('a.txt'))
  assert.ok(actual?.includes('b.txt'))
  assert.deepEqual(missingDeclaredChanges(actual ?? [], ['a.txt', 'b.txt', 'c.txt']), ['c.txt'])
  assert.deepEqual(missingDeclaredChanges(actual ?? [], ['a.txt']), [])
})
