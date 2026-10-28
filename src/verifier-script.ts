/**
 * Verifier gate helpers (module 5).
 *
 * The constitution's acceptance list mixes executable checks with human
 * criteria. Executable lines become verify commands; prose criteria stay in the
 * task acceptance and block the reviewer until recorded.
 */
import type { TeamConstitution } from './types.ts'

export interface AcceptanceSplit {
  readonly commands: string[]
  readonly criteria: string[]
}

const EXECUTABLE_PREFIXES = [
  '$ ', 'pnpm ', 'npm ', 'npx ', 'yarn ', 'node ', 'git ', 'python ', 'py ',
  'cargo ', 'go test', 'dotnet ', 'mvn ', 'gradle ', 'make ', 'bash ', 'sh ',
]

/** Split acceptance lines into runnable commands and human criteria. */
export function splitAcceptance(acceptance: readonly string[]): AcceptanceSplit {
  const commands: string[] = []
  const criteria: string[] = []
  for (const raw of acceptance) {
    const line = raw.trim()
    if (line === '') continue
    const prefix = EXECUTABLE_PREFIXES.find(candidate => line.startsWith(candidate))
    if (prefix === undefined) {
      criteria.push(line)
      continue
    }
    const command = prefix === '$ ' ? line.slice(2).trim() : line
    if (command !== '') commands.push(command)
  }
  return { commands, criteria }
}

/** Required output contract for every verifier completion. */
export function verifierOutputContract(): string {
  return 'Verifier output contract: the report must start with 【PASS】 or 【FAIL】; on FAIL include the failing command and its log path. Never complete a verification task whose commands failed.'
}

/** Extra acceptance criteria derived from the constitution (deduplicated). */
export function constitutionCriteria(constitution: TeamConstitution | undefined): string[] {
  return constitution === undefined ? [] : [...new Set(constitution.acceptance.filter(item => splitAcceptance([item]).commands.length === 0))]
}
export interface VerifierScript {
  /** Workspace-relative script path (POSIX separators). */
  readonly relativePath: string
  readonly content: string
}

/**
 * Generate the verifier smoke script from executable acceptance commands.
 * Running it prints 【PASS】/【FAIL】, writes the full log beside itself and exits
 * non-zero on the first failure set so the host gate can fail the task.
 */
export function buildVerifierScript(commands: readonly string[], name: string): VerifierScript | undefined {
  if (commands.length === 0) return undefined
  const safe = name.replace(/[^A-Za-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'verify'
  const relativePath = '.pixel-team/verify/' + safe + '.mjs'
  const logName = safe + '.log'
  const lines = [
    '#!/usr/bin/env node',
    '/** Generated verifier smoke: runs the constitution acceptance commands. */',
    "import { spawnSync } from 'node:child_process'",
    "import { appendFileSync, mkdirSync } from 'node:fs'",
    "import { dirname, join } from 'node:path'",
    "import { fileURLToPath } from 'node:url'",
    '',
    'const commands = ' + JSON.stringify([...commands], null, 2),
    'const logPath = join(dirname(fileURLToPath(import.meta.url)), ' + JSON.stringify(logName) + ')',
    'const lines = []',
    'let failed = 0',
    'for (const command of commands) {',
    '  const started = Date.now()',
    "  const result = spawnSync(command, { shell: true, encoding: 'utf8', timeout: 600_000 })",
    '  const ok = result.status === 0 && result.error === undefined',
    '  if (!ok) failed += 1',
    "  lines.push('$ ' + command + '\\nexit=' + String(result.status) + ' (' + (Date.now() - started) + 'ms)\\n' + (result.stdout ?? '') + (result.stderr ?? ''))",
    '  if (!ok) console.error(lines[lines.length - 1])',
    '}',
    "const report = (failed === 0 ? '【PASS】' : '【FAIL】') + ' verifier: ' + commands.length + ' checks, ' + failed + ' failed'",
    'mkdirSync(dirname(logPath), { recursive: true })',
    "appendFileSync(logPath, report + '\\n' + lines.join('\\n---\\n') + '\\n', 'utf8')",
    'console.log(report)',
    "console.log('log: ' + logPath)",
    'process.exit(failed === 0 ? 0 : 1)',
    '',
  ]
  return { relativePath, content: lines.join('\n') }
}
