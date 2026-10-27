/**
 * Host-side execution of declared verification commands.
 *
 * A member's `commandsRun` is a claim. Before the host accepts a completed
 * quality task it re-runs the task's declared `verify` commands in the
 * workspace and records the real exit code/output. A failed host run rejects
 * the completion instead of letting a self-reported pass reach delivery.
 */
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import { collectChangedPaths, isDefaultExcludedPath, normalizeWorkspacePath } from "./quality-gates.js";
const execFileAsync = promisify(execFile);
const EVIDENCE_LIMIT = 8_000;
const DEFAULT_TIMEOUT_MS = 120_000;
function killTree(child) {
    if (process.platform === 'win32' && child.pid !== undefined) {
        // On Windows a shell command spawns a child process (node, pnpm, ...).
        // Killing only the shell leaves the child holding the workspace directory.
        spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' });
        return;
    }
    child.kill('SIGKILL');
}
function tail(text) {
    const trimmed = text.trim();
    return trimmed.length <= EVIDENCE_LIMIT ? trimmed : `…${trimmed.slice(-EVIDENCE_LIMIT)}`;
}
function runOne(workspace, command, timeoutMs) {
    return new Promise((resolve) => {
        let stdout = '';
        let stderr = '';
        let settled = false;
        let timer;
        const child = spawn(command, {
            cwd: workspace,
            shell: true,
            windowsHide: true,
            stdio: ['ignore', 'pipe', 'pipe'],
            env: process.env,
        });
        const finish = (result) => {
            if (settled)
                return;
            settled = true;
            if (timer !== undefined)
                clearTimeout(timer);
            resolve(result);
        };
        const evidence = (extra) => `[host-verified] ${extra}\n${tail([stdout, stderr].filter(Boolean).join('\n'))}`;
        child.stdout?.on('data', (chunk) => {
            if (stdout.length < EVIDENCE_LIMIT)
                stdout += chunk.toString();
        });
        child.stderr?.on('data', (chunk) => {
            if (stderr.length < EVIDENCE_LIMIT)
                stderr += chunk.toString();
        });
        child.on('error', (error) => {
            finish({ command, status: 'failed', evidence: evidence(`spawn failed: ${error.message}`) });
        });
        child.on('close', (code, signal) => {
            const passed = code === 0;
            finish({
                command,
                status: passed ? 'passed' : 'failed',
                ...code === null ? {} : { exitCode: code },
                evidence: evidence(passed ? 'exit 0' : `exit ${code ?? signal ?? 'unknown'}`),
            });
        });
        timer = setTimeout(() => {
            killTree(child);
            finish({ command, status: 'failed', evidence: evidence(`timed out after ${timeoutMs}ms`) });
        }, timeoutMs);
    });
}
/** Current uncommitted paths from git, or undefined when this is not a git workspace. */
export async function actualChangedPaths(workspace) {
    try {
        const { stdout } = await execFileAsync('git', ['status', '--porcelain'], {
            cwd: workspace,
            windowsHide: true,
            maxBuffer: 4 * 1024 * 1024,
        });
        return collectChangedPaths(stdout).filter((path) => !isDefaultExcludedPath(path));
    }
    catch {
        return undefined;
    }
}
/** Declared paths that do not exist in the current uncommitted diff. */
export function missingDeclaredChanges(actual, declared) {
    const normalized = actual.map((path) => normalizeWorkspacePath(path)).filter((path) => path !== undefined);
    const set = new Set(normalized);
    return declared.filter((path) => {
        const target = normalizeWorkspacePath(path);
        if (target === undefined)
            return true;
        if (set.has(target))
            return false;
        return !normalized.some((actualPath) => actualPath.startsWith(`${target}/`));
    });
}
/** Run every declared verification command sequentially in the workspace. */
export async function runHostVerification(workspace, commands, timeoutMs = DEFAULT_TIMEOUT_MS) {
    const results = [];
    for (const command of commands) {
        if (command.trim() === '')
            continue;
        results.push(await runOne(workspace, command, timeoutMs));
    }
    return results;
}
