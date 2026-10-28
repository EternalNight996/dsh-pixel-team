/**
 * Verifier gate helpers (module 5).
 *
 * The constitution's acceptance list mixes executable checks with human
 * criteria. Executable lines become verify commands; prose criteria stay in the
 * task acceptance and block the reviewer until recorded.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getModeSpec } from "./modes.js";
const EXECUTABLE_PREFIXES = [
    '$ ', 'pnpm ', 'npm ', 'npx ', 'yarn ', 'node ', 'git ', 'python ', 'py ',
    'cargo ', 'go test', 'dotnet ', 'mvn ', 'gradle ', 'make ', 'bash ', 'sh ',
];
/** Split acceptance lines into runnable commands and human criteria. */
export function splitAcceptance(acceptance) {
    const commands = [];
    const criteria = [];
    for (const raw of acceptance) {
        const line = raw.trim();
        if (line === '')
            continue;
        const prefix = EXECUTABLE_PREFIXES.find(candidate => line.startsWith(candidate));
        if (prefix === undefined) {
            criteria.push(line);
            continue;
        }
        const command = prefix === '$ ' ? line.slice(2).trim() : line;
        if (command !== '')
            commands.push(command);
    }
    return { commands, criteria };
}
/** Required output contract for every verifier completion. */
export function verifierOutputContract() {
    return 'Verifier output contract: the report must start with 【PASS】 or 【FAIL】; on FAIL include the failing command and its log path. Never complete a verification task whose commands failed.';
}
/** Extra acceptance criteria derived from the constitution (deduplicated). */
export function constitutionCriteria(constitution) {
    return constitution === undefined ? [] : [...new Set(constitution.acceptance.filter(item => splitAcceptance([item]).commands.length === 0))];
}
/** Human description of the verifier strategy for the selected mode. */
export function verifierStrategyText(mode) {
    const spec = getModeSpec(mode);
    switch (spec.verifier.strategy) {
        case 'smoke': return '只跑冒烟/主流程；连续 ' + spec.verifier.failLimit + ' 次失败即终止。';
        case 'unit-network': return '单测 + 超时 Mock + 断网重连；连续 ' + spec.verifier.failLimit + ' 次失败报告用户。';
        case 'legacy-regression': return '旧接口回归集 + 新代码单测；旧测试失败立即阻断并退回重写。';
        case 'compliance-audit': return '依赖树审计 + 日志脱敏扫描（password/token）+ 命令验证；连续 ' + spec.verifier.failLimit + ' 次失败报告用户。';
    }
}
/**
 * Best-effort discovery of the project's legacy regression command. The legacy
 * mode must not silently pass without one: when nothing is found the acceptance
 * baseline still requires the user to declare it.
 */
export function detectLegacyRegressionCommand(workspace) {
    try {
        const pkgPath = join(workspace, 'package.json');
        if (existsSync(pkgPath)) {
            const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
            if (pkg.scripts?.test !== undefined) {
                return existsSync(join(workspace, 'pnpm-lock.yaml')) ? 'pnpm test' : 'npm test';
            }
        }
    }
    catch { /* unreadable package.json */ }
    if (existsSync(join(workspace, 'pytest.ini')) || existsSync(join(workspace, 'tests')))
        return 'python -m pytest -q';
    return undefined;
}
/**
 * Generate the verifier smoke script from executable acceptance commands plus
 * the mode's strategy: compliance adds a dependency audit and a log-secret scan.
 * Running it prints 【PASS】/【FAIL】, writes the full log beside itself and exits
 * non-zero when any check fails, so the host gate fails the task.
 */
export function buildVerifierScript(commands, name, mode) {
    const spec = getModeSpec(mode);
    const compliance = spec.verifier.strategy === 'compliance-audit';
    if (commands.length === 0 && !compliance)
        return undefined;
    const safe = name.replace(/[^A-Za-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'verify';
    const relativePath = '.pixel-team/verify/' + safe + '.mjs';
    const logName = safe + '.log';
    const lines = [
        '#!/usr/bin/env node',
        '/** Generated verifier: acceptance commands + mode strategy (' + spec.id + '). */',
        "import { spawnSync } from 'node:child_process'",
        "import { appendFileSync, mkdirSync, readdirSync, readFileSync } from 'node:fs'",
        "import { dirname, join } from 'node:path'",
        "import { fileURLToPath } from 'node:url'",
        '',
        'const commands = ' + JSON.stringify([...commands], null, 2),
        'const mode = ' + JSON.stringify(spec.id),
        'const blockOnOldTestFail = ' + String(spec.verifier.blockOnOldTestFail),
        'const logPath = join(dirname(fileURLToPath(import.meta.url)), ' + JSON.stringify(logName) + ')',
        'const lines = []',
        'let failed = 0',
        'for (const command of commands) {',
        '  const started = Date.now()',
        "  const result = spawnSync(command, { shell: true, encoding: 'utf8', timeout: 600_000 })",
        '  const ok = result.status === 0 && result.error === undefined',
        '  if (!ok) failed += 1',
        "  lines.push('$ ' + command + '\\nexit=' + String(result.status) + ' (' + (Date.now() - started) + 'ms)\\n' + (result.stdout ?? '') + (result.stderr ?? ''))",
        '  if (ok) continue',
        '  console.error(lines[lines.length - 1])',
        '  // Legacy mode: a failing old regression suite blocks immediately.',
        '  if (blockOnOldTestFail) break',
        '}',
        'if (mode === ' + JSON.stringify('compliance') + ') {',
        "  const skip = new Set(['node_modules', '.git', 'dist', 'lib', 'coverage', '.pixel-team', 'artifacts'])",
        '  const files = []',
        '  const walk = (dir) => {',
        '    let entries = []',
        '    try { entries = readdirSync(dir, { withFileTypes: true }) } catch { return }',
        '    for (const entry of entries) {',
        "      if (skip.has(entry.name)) continue",
        '      const path = join(dir, entry.name)',
        '      if (entry.isDirectory()) walk(path)',
        "      else if (/\\.(ts|tsx|js|jsx|mjs|cjs|py|go|rs)$/.test(entry.name)) files.push(path)",
        '    }',
        '  }',
        '  walk(process.cwd())',
        "  const secretPattern = /(password|passwd|secret|api[_-]?key|access[_-]?token|token)\\s*[:=]\\s*['\\\"][^'\\\"\\n]{6,}/i",
        '  const hits = []',
        '  for (const file of files) {',
        '    let text = \'\'',
        "    try { text = readFileSync(file, 'utf8') } catch { continue }",
        '    const match = secretPattern.exec(text)',
        '    if (match !== null) hits.push(file + \": \" + match[0].slice(0, 80))',
        '  }',
        "  const audit = spawnSync('pnpm list --depth 0', { shell: true, encoding: 'utf8', timeout: 180_000 })",
        "  lines.push('$ pnpm list --depth 0\\nexit=' + String(audit.status) + '\\n' + (audit.stdout ?? '') + (audit.stderr ?? ''))",
        '  if (hits.length > 0) {',
        '    failed += 1',
        "    lines.push('【FAIL】secret-like literals found (no plaintext password/token allowed):\\n' + hits.join('\\n'))",
        '  } else {',
        "    lines.push('compliance: no plaintext password/token literal found in ' + files.length + ' files')",
        '  }',
        '}',
        "const report = (failed === 0 ? '【PASS】' : '【FAIL】') + ' verifier(' + mode + '): ' + (commands.length + (mode === 'compliance' ? 1 : 0)) + ' checks, ' + failed + ' failed'",
        'mkdirSync(dirname(logPath), { recursive: true })',
        "appendFileSync(logPath, report + '\\n' + lines.join('\\n---\\n') + '\\n', 'utf8')",
        'console.log(report)',
        "console.log('log: ' + logPath)",
        'process.exit(failed === 0 ? 0 : 1)',
        '',
    ];
    return { relativePath, content: lines.join('\n') };
}
