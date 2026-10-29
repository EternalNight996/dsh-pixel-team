/** Architecture file lifecycle: created at founding, refreshed on edits. */
import assert from 'node:assert/strict'
import test from 'node:test'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { syncArchitectureFile } from '../lib/architecture-file.js'

function team(overrides = {}) {
  return {
    name: '开山宗', id: 't', captainSessionId: 'c', createdAt: 1, taskSeq: 1, members: [],
    planProjectRoot: 'projects/做贪吃蛇/',
    tasks: [{ id: 't1', subject: '实现贪吃蛇', status: 'pending', kind: 'implementation', dependencies: [], inScope: ['projects/贪吃蛇/'], attempt: 0 }],
    ...overrides,
  }
}

test('architecture file is written to the implementation root and refreshed', () => {
  const workspace = mkdtempSync(join(tmpdir(), 'pixel-arch-'))
  try {
    const first = team()
    syncArchitectureFile(workspace, first)
    const file = join(workspace, 'projects/贪吃蛇/ARCHITECTURE.md')
    assert.ok(existsSync(file))
    assert.match(readFileSync(file, 'utf8'), /实现贪吃蛇/)
    first.tasks.push({ id: 't2', subject: '审查贪吃蛇', status: 'pending', kind: 'review', dependencies: ['t1'], attempt: 0 })
    syncArchitectureFile(workspace, first)
    assert.match(readFileSync(file, 'utf8'), /审查贪吃蛇/)
  } finally {
    rmSync(workspace, { recursive: true, force: true })
  }
})
