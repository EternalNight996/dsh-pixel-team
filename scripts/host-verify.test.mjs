import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { actualChangedPaths, missingDeclaredChanges, runHostVerification } from '../lib/host-verify.js'
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
