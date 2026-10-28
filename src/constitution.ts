/**
 * Read-only project constitution derived from the confirmed clarification.
 *
 * The constitution is the durable antidote to context loss: every member
 * spawn prepends it to the system prompt, and task dispatch appends a digest.
 * It is written once per project and only replaced by an explicit re-clarify.
 */
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { TeamClarification, TeamConstitution } from './types.ts'
import { DEFAULT_MODE, isTeamMode, modePhilosophyText, type TeamMode } from './modes.ts'

export const CONSTITUTION_DIR = '.pixel-team'

/** Relative POSIX path for one project's constitution. */
export function constitutionRelativePath(project: string): string {
  return CONSTITUTION_DIR + '/' + project + '-constitution.json'
}

export function checksumOf(text: string): string {
  return createHash('sha256').update(text).digest('hex')
}

/** Freeze the confirmed clarification into the constitution shape. */
export function buildConstitution(clarification: TeamClarification, project: string): TeamConstitution {
  return {
    project,
    mode: isTeamMode(clarification.mode) ? clarification.mode : DEFAULT_MODE,
    type: clarification.type,
    scale: clarification.scale,
    ui: { ...clarification.ui, styles: [...clarification.ui.styles] },
    platforms: [...clarification.platforms],
    hardware_list: [...clarification.hardwareList],
    constraints: [...clarification.constraints],
    excluded: [...clarification.excluded],
    acceptance: [...clarification.acceptance],
    memory_hints: [...clarification.memoryHints],
    createdAt: Date.now(),
  }
}

function serialize(constitution: TeamConstitution): string {
  return JSON.stringify(constitution, null, 2) + '\n'
}

/**
 * Write the constitution atomically. Refuses to overwrite an existing file
 * unless the caller explicitly re-runs clarification.
 * @returns the workspace-relative path and content checksum.
 */
export async function writeConstitution(
  workspace: string,
  project: string,
  constitution: TeamConstitution,
  allowOverwrite = false,
): Promise<{ path: string; checksum: string; project: string }> {
  const relative = constitutionRelativePath(project)
  const absolute = join(workspace, relative)
  await mkdir(join(workspace, CONSTITUTION_DIR), { recursive: true })
  if (!allowOverwrite && existsSync(absolute)) {
    const existing = await readFile(absolute, 'utf8')
    return { path: relative, checksum: checksumOf(existing), project }
  }
  const text = serialize(constitution)
  await writeFile(absolute, text, 'utf8')
  return { path: relative, checksum: checksumOf(text), project }
}

/** Read and parse a constitution; undefined when it was never written. */
export async function readConstitution(workspace: string, project: string): Promise<{ path: string; checksum: string; text: string; json: TeamConstitution } | undefined> {
  const relative = constitutionRelativePath(project)
  const absolute = join(workspace, relative)
  try {
    const text = await readFile(absolute, 'utf8')
    const parsed = JSON.parse(text) as TeamConstitution
    // Constitutions written before modes existed default to precision.
    const json: TeamConstitution = { ...parsed, mode: isTeamMode(parsed.mode) ? parsed.mode : DEFAULT_MODE }
    return { path: relative, checksum: checksumOf(text), text, json }
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && (error as NodeJS.ErrnoException).code === 'ENOENT') return undefined
    throw error
  }
}

/** Highest-priority system-prompt block prepended to every member persona. */
export function constitutionPreamble(text: string, mode?: TeamMode): string {
  return [
    '## PROJECT CONSTITUTION (READ-ONLY, HIGHEST PRIORITY)',
    'This block is the confirmed project constitution. It overrides conflicting',
    'assumptions; never edit it from a member turn. If it contradicts the task,',
    'follow the constitution and report the conflict to the captain.',
    '',
    modePhilosophyText(mode),
    '',
    text.trim(),
    '',
  ].join('\n')
}

/** Compact digest appended to task dispatch prompts. */
export function constitutionDigest(constitution: TeamConstitution): string {
  const platforms = constitution.platforms.length === 0 ? 'none' : constitution.platforms.join('/')
  return [
    'Constitution: mode=' + constitution.mode + '; type=' + constitution.type + '; scale=' + constitution.scale + '; platforms=' + platforms,
    'Excluded: ' + (constitution.excluded.join('; ') || 'none'),
    'Acceptance: ' + constitution.acceptance.join('; '),
  ].join('\n')
}
