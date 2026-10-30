import assert from 'node:assert/strict'
import test from 'node:test'
import { nativeTeamSummary } from '../lib/native-team.js'

const captain = { session: { id: 's' } }
test('native team summary reads the host projection without mutating it', () => {
  const ctx = { sessionProjections: { stateOf: (_session, key) => key === 'agentTeam' ? {
    id: 's', members: [{ id: 'a' }, { id: 'b' }], tasks: [{ status: 'completed' }, { status: 'pending' }],
  } : undefined } }
  assert.deepEqual(nativeTeamSummary(ctx, captain), { id: 's', members: 2, tasks: 2, completed: 1 })
})

test('native team summary is absent when the projection is missing or malformed', () => {
  assert.equal(nativeTeamSummary({}, captain), undefined)
  assert.equal(nativeTeamSummary({ sessionProjections: { stateOf: () => ({ id: 's', members: [] }) } }, captain), undefined)
})
