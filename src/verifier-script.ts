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
