import assert from 'node:assert/strict'
import test from 'node:test'
import { summarizeHealth } from '../scripts/headless-healthcheck.mjs'

const now = 10_000_000
test('health summary counts open and stale active attempts', () => {
  const teams = [{
    id: 't', phase: 'running', acceptedAt: 1,
    tasks: [
      { id: 'a', status: 'in_progress', updatedAt: now - 30 * 60_000 },
      { id: 'b', status: 'claimed', updatedAt: now - 60_000 },
      { id: 'c', status: 'completed', updatedAt: now - 30 * 60_000 },
    ],
  }]
  const health = summarizeHealth(teams, now, 20 * 60_000)
  assert.equal(health.teams, 1)
  assert.equal(health.open, 2)
  assert.equal(health.stale, 1)
  assert.equal(health.accepted, 1)
})

test('halted teams and terminal tasks do not count as stale', () => {
  const teams = [{ id: 't', phase: 'running', halted: true, tasks: [{ id: 'a', status: 'in_progress', updatedAt: 0 }] }]
  assert.equal(summarizeHealth(teams, now, 1).stale, 0)
})
