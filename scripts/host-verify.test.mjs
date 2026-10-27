import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { runHostVerification } from '../lib/host-verify.js'

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
