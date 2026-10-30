import assert from 'node:assert/strict'
import test from 'node:test'
import { watchdogStalled } from '../lib/scheduler.js'

const now = Date.now()
const task = { status: 'in_progress', assignee: 'worker', updatedAt: now - 10 * 60_000 }
const grace = 5 * 60_000

test('watchdog flags an idle or missing owner past the grace period', () => {
  assert.equal(watchdogStalled(task, 'idle', now, grace), true)
  assert.equal(watchdogStalled(task, 'missing', now, grace), true)
})

test('watchdog ignores running owners, recent work, captains and disabled grace', () => {
  assert.equal(watchdogStalled(task, 'running', now, grace), false)
  assert.equal(watchdogStalled({ ...task, updatedAt: now - 1000 }, 'idle', now, grace), false)
  assert.equal(watchdogStalled({ ...task, assignee: 'captain' }, 'idle', now, grace), false)
  assert.equal(watchdogStalled(task, 'idle', now, 0), false)
})
