#!/usr/bin/env node
/**
 * Deterministic business-flow E2E: founding -> quality DAG -> approval ->
 * execution -> review -> delivery, with a fake captain session and no model.
 * Exercises the real compiled tool definitions and host verification.
 */
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { registerAgentTeamsTools } from '../lib/tools.js'
import { auditTeamWorkspace } from '../lib/workspace-audit.js'
import { canDeclareDelivery, readTeam } from '../lib/state.js'
import { readCostLogEntries } from '../lib/cost.js'
import { assembleTeamSnapshot } from '../lib/snapshot.js'

const workspace = await mkdtemp(join(tmpdir(), 'dsh-business-e2e-'))
const definitions = new Map()
const failures = []
const check = (label, condition, detail = '') => {
  console.log('  ' + (condition ? 'PASS' : 'FAIL') + '  ' + label + (detail ? ' — ' + detail : ''))
  if (!condition) failures.push(label)
}

const usageEvents = [
  { type: 'assistant/message', data: { usage: { inputTokens: 1200, outputTokens: 800 } } },
  { type: 'assistant/message', data: { usage: { inputTokens: 600, outputTokens: 400 } } },
]
let seq = 0
const captain = {
  id: 'captain-session',
  status: 'idle',
  options: { provider: 'fake', model: 'fake-model' },
  session: {
    header: { cwd: workspace },
    get seq() { return seq },
    snapshotEvents(fromSeq = 0) { return usageEvents.slice(Math.max(0, Number(fromSeq))) },
    append() {},
    requestHeader() { return { config: { provider: 'fake', model: 'fake-model', reasoningEffort: 'high' } } },
  },
  followups: [],
  followup(message) { this.followups.push(message) },
  steer(message) { this.followups.push(message) },
  inject() {},
  cancel() {},
  whenIdle() { return Promise.resolve() },
}

const ctx = {
  effect(setup) { return setup() },
  tools: { register(definition) { definitions.set(definition.name, definition) } },
  on() { return () => {} },
  agents: { list: () => [captain], get: (id) => id === captain.id ? captain : undefined },
  llm: { async resolveCallConfig(config) { return config }, async listModels() { return [] } },
  subagents: {
    registerContinuableSetup() { return () => {} },
    getProvider() { return undefined },
    list() { return [] },
    async listChildren() { return [] },
    async listDescendants() { return [] },
    async followup() { return 'message' },
    interrupt() {},
    async drainContinuableChildren() {},
  },
  logger: { debug() {}, warn() {} },
}

registerAgentTeamsTools(ctx, { stateDir: '.agent-teams', memberProvider: 'spawn', memberMaxDepth: 1 })
const call = async (name, args) => {
  const definition = definitions.get(name)
  if (!definition) throw new Error('missing tool ' + name)
  return definition.execute(args, { agent: captain, signal: new AbortController().signal })
}

console.log('agent-teams business flow E2E')
try {
  await call('agent_teams_create', { name: 'flow-e2e', description: 'business flow', approval: 'required' })
  const tasks = [
    ['requirements', 'requirements', [], 'requirements'],
    ['implementation', 'implementation', ['t1'], 'implementation'],
    ['verification', 'verification', ['t2'], 'verification'],
    ['review', 'review', ['t3'], 'review'],
  ]
  const ids = {}
  for (const [id, kind, dependencies, label] of tasks) {
    const created = await call('agent_teams_create_task', {
      subject: label + ' task',
      description: label + ' task for flow-e2e',
      assignee: 'captain',
      kind,
      dependencies,
      objective: 'complete ' + label,
      acceptance: [label + ' acceptance'],
      ...kind === 'implementation' ? { inScope: ['projects/flow/'] } : {},
      ...kind === 'implementation' || kind === 'verification' ? { verify: ['node -e "process.exit(0)"'] } : {},
      ...kind === 'review' ? { reviewedTaskId: 't2' } : {},
    })
    ids[id] = created.task_id
  }
  check('four quality tasks staged', Object.keys(ids).length === 4, JSON.stringify(ids))
  await mkdir(join(workspace, 'projects', 'flow'), { recursive: true })
  await writeFile(join(workspace, 'projects', 'flow', 'out.txt'), 'ok\n')
  await call('agent_teams_approve', { confirmation: 'test approval' })
  seq = 0
  for (const id of ['t1', 't2', 't3', 't4']) {
    seq = 0
    await call('agent_teams_reassign_task', { task_id: id, assignee: 'captain', reason: 'business E2E' })
    await call('agent_teams_update_task', { task_id: id, status: 'in_progress' })
    await call('agent_teams_update_task', {
      task_id: id,
      status: 'completed',
      ...id === 't1' ? { verdict: 'pass' } : {},
      ...id === 't2' ? { changedPaths: ['projects/flow/out.txt'], acceptanceResults: [{ criterion: 'implementation acceptance', status: 'passed', evidence: 'out.txt' }], commandsRun: [{ command: 'node -e "process.exit(0)"', status: 'passed', exitCode: 0 }] } : {},
      ...id === 't3' ? { acceptanceResults: [{ criterion: 'verification acceptance', status: 'passed', evidence: 'command passed' }], commandsRun: [{ command: 'node -e "process.exit(0)"', status: 'passed', exitCode: 0 }] } : {},
      ...id === 't4' ? { verdict: 'pass' } : {},
    })
  }
  const team = await readTeam(join(workspace, '.agent-teams'), 'flow-e2e')
  check('all tasks completed', team?.tasks.every(task => task.status === 'completed') === true, team?.tasks.map(task => task.status).join(','))
  check('review verdict pass', team?.tasks.find(task => task.kind === 'review')?.verdict === 'pass')
  const delivery = canDeclareDelivery(team, auditTeamWorkspace(workspace, team))
  check('delivery ok', delivery.ok === true, JSON.stringify(delivery.blockers))
  const snapshot = await assembleTeamSnapshot(ctx, join(workspace, '.agent-teams'), workspace, team)
  const implementation = snapshot.tasks.find(task => task.id === 't2')
  check('plan review snapshot carries the quality contract',
    (implementation?.acceptance?.length ?? 0) > 0
    && (implementation?.verify?.length ?? 0) > 0
    && implementation?.inScope?.includes('projects/flow/') === true)
  const costs = (await readCostLogEntries(workspace)).filter(entry => entry.teamId === 'flow-e2e')
  const actual = costs.filter(entry => entry.decision === 'usage-actual')
  check('actual token usage logged per task', actual.length === 4 && actual.every(entry => (entry.inputTokens ?? 0) > 0), actual.map(entry => entry.taskId).join(','))
} finally {
  await rm(workspace, { recursive: true, force: true })
}
if (failures.length > 0) {
  console.error('business flow E2E failed: ' + failures.join('; '))
  process.exit(1)
}
console.log('business flow E2E passed')
