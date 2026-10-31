/** Atomic per-team resume checkpoint; corruption degrades to "no checkpoint". */
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export interface ResumeCheckpoint {
  readonly version: 1
  readonly taskId: string
  readonly attempt: number
  readonly retry: number
  readonly at: number
}

function pathOf(stateRoot: string, teamId: string): string {
  return join(stateRoot, teamId, 'resume.json')
}

export async function readResumeCheckpoint(stateRoot: string, teamId: string): Promise<ResumeCheckpoint | undefined> {
  try {
    const raw = JSON.parse(await readFile(pathOf(stateRoot, teamId), 'utf8')) as Partial<ResumeCheckpoint>
    if (raw.version !== 1 || typeof raw.taskId !== 'string' || raw.taskId === '') return undefined
    return {
      version: 1,
      taskId: raw.taskId,
      attempt: typeof raw.attempt === 'number' ? raw.attempt : 0,
      retry: typeof raw.retry === 'number' ? raw.retry : 0,
      at: typeof raw.at === 'number' ? raw.at : 0,
    }
  } catch {
    return undefined
  }
}

export async function writeResumeCheckpoint(stateRoot: string, teamId: string, checkpoint: ResumeCheckpoint): Promise<void> {
  const target = pathOf(stateRoot, teamId)
  await mkdir(join(stateRoot, teamId), { recursive: true })
  const tmp = target + '.tmp'
  await writeFile(tmp, JSON.stringify(checkpoint), 'utf8')
  await rename(tmp, target)
}

export async function clearResumeCheckpoint(stateRoot: string, teamId: string): Promise<void> {
  await rm(pathOf(stateRoot, teamId), { force: true }).catch(() => undefined)
}
