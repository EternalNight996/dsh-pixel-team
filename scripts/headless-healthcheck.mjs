#!/usr/bin/env node
/**
 * Long-running deployment health check.
 *
 * Reads the durable team state, reports active/open/stale work and exits
 * non-zero when an attempt has been open longer than the threshold. Designed
 * for cron / Task Scheduler alongside the DSH supervisor.
 */
import { readdir } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { readTeam } from '../lib/state.js'

export function summarizeHealth(teams, now = Date.now(), staleMs = 20 * 60_000) {
  const active = teams.filter((team) => (team.phase ?? 'running') === 'running' && team.halted !== true)
  const open = []
  const stale = []
  for (const team of active) {
    for (const task of team.tasks ?? []) {
      if (task.status !== 'claimed' && task.status !== 'in_progress') continue
      const row = { team: team.id, task: task.id, status: task.status, ageMs: Math.max(0, now - (task.updatedAt ?? now)) }
      open.push(row)
      if (row.ageMs > staleMs) stale.push(row)
    }
  }
  return {
    teams: active.length,
    open: open.length,
    stale: stale.length,
    staleTasks: stale,
    accepted: active.filter((team) => team.acceptedAt !== undefined).length,
  }
}

async function main() {
  const args = new Map()
  for (let i = 2; i < process.argv.length; i += 1) {
    const arg = process.argv[i]
    if (!arg.startsWith('--') || process.argv[i + 1] === undefined) continue
    args.set(arg.slice(2), process.argv[++i])
  }
  const workspace = resolve(args.get('workspace') ?? process.cwd())
  const staleMs = Number(args.get('stale-min') ?? 20) * 60_000
  const stateRoot = join(workspace, '.agent-teams')
  const teams = []
  try {
    for (const entry of await readdir(stateRoot, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name === 'archive') continue
      try {
        const team = await readTeam(stateRoot, entry.name)
        if (team !== undefined) teams.push(team)
      } catch { /* skip unreadable */ }
    }
  } catch { /* no teams */ }
  const health = summarizeHealth(teams, Date.now(), staleMs)
  let version = 'unknown'
  try { version = JSON.parse(readFileSync(join(workspace, 'package.json'), 'utf8')).version ?? 'unknown' } catch {}
  console.log(JSON.stringify({ plugin: version, workspace, staleMinutes: staleMs / 60_000, ...health }, null, 2))
  if (health.stale > 0) process.exitCode = 1
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) void main()
