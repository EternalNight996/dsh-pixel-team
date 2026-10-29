/** Server-only architecture file writer (kept free of client type graph). */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { architectureRoot, buildArchitecture } from './architecture.ts'
import type { TeamState } from './types.ts'

/** Refresh projects/<root>/ARCHITECTURE.md after a plan or approval change. */
export function syncArchitectureFile(workspace: string, team: TeamState): void {
  const root = architectureRoot(team)
  if (root === undefined || root === '') return
  try {
    const file = join(workspace, root, 'ARCHITECTURE.md')
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, buildArchitecture(team), 'utf8')
  } catch { /* best effort: a read-only workspace must not break the team */ }
}
