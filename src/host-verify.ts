/**
 * Host-side execution of declared verification commands.
 *
 * A member's `commandsRun` is a claim. Before the host accepts a completed
 * quality task it re-runs the task's declared `verify` commands in the
 * workspace and records the real exit code/output. A failed host run rejects
 * the completion instead of letting a self-reported pass reach delivery.
 */
import { spawn } from 'node:child_process'
import type { CommandResult } from './types.ts'

const EVIDENCE_LIMIT = 8_000
const DEFAULT_TIMEOUT_MS = 120_000

function killTree(child: ReturnType<typeof spawn>): void {
  if (process.platform === 'win32' && child.pid !== undefined) {
    // On Windows a shell command spawns a child process (node, pnpm, ...).
    // Killing only the shell leaves the child holding the workspace directory.
    spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' })
    return
  }
  child.kill('SIGKILL')
}

function tail(text: string): string {
  const trimmed = text.trim()
  return trimmed.length <= EVIDENCE_LIMIT ? trimmed : `…${trimmed.slice(-EVIDENCE_LIMIT)}`
}

function runOne(workspace: string, command: string, timeoutMs: number): Promise<CommandResult> {
  return new Promise((resolve) => {
    let stdout = ''
    let stderr = ''
    let settled = false
    let timer: NodeJS.Timeout | undefined
    const child = spawn(command, {
      cwd: workspace,
      shell: true,
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: process.env,
    })
    const finish = (result: CommandResult) => {
      if (settled) return
      settled = true
      if (timer !== undefined) clearTimeout(timer)
      resolve(result)
    }
    const evidence = (extra: string) => `[host-verified] ${extra}\n${tail([stdout, stderr].filter(Boolean).join('\n'))}`
    child.stdout?.on('data', (chunk: Buffer) => {
      if (stdout.length < EVIDENCE_LIMIT) stdout += chunk.toString()
    })
    child.stderr?.on('data', (chunk: Buffer) => {
      if (stderr.length < EVIDENCE_LIMIT) stderr += chunk.toString()
    })
    child.on('error', (error) => {
      finish({ command, status: 'failed', evidence: evidence(`spawn failed: ${error.message}`) })
    })
    child.on('close', (code, signal) => {
      const passed = code === 0
      finish({
        command,
        status: passed ? 'passed' : 'failed',
        ...code === null ? {} : { exitCode: code },
        evidence: evidence(passed ? 'exit 0' : `exit ${code ?? signal ?? 'unknown'}`),
      })
    })
    timer = setTimeout(() => {
      killTree(child)
      finish({ command, status: 'failed', evidence: evidence(`timed out after ${timeoutMs}ms`) })
    }, timeoutMs)
  })
}

/** Run every declared verification command sequentially in the workspace. */
export async function runHostVerification(
  workspace: string,
  commands: readonly string[],
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<CommandResult[]> {
  const results: CommandResult[] = []
  for (const command of commands) {
    if (command.trim() === '') continue
    results.push(await runOne(workspace, command, timeoutMs))
  }
  return results
}
