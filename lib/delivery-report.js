/**
 * Persist a human-readable delivery report next to the team state.
 *
 * The status tool writes it only when canDeclareDelivery() is clean, so the
 * file is a record of what the host could verify, not a captain's summary.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isQualityKind, taskKindOf } from "./quality-gates.js";
function cell(value) {
    return (value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
}
function duration(ms) {
    const seconds = Math.max(0, Math.round(ms / 1000));
    return seconds >= 60 ? `${Math.floor(seconds / 60)}m ${seconds % 60}s` : `${seconds}s`;
}
function commandLines(task) {
    return (task.commandsRun ?? []).map((item) => {
        const exit = item.exitCode === undefined ? '' : ` exit ${item.exitCode}`;
        const evidence = item.evidence === undefined ? '' : ` — ${cell(item.evidence)}`;
        return `    - \`${cell(item.command)}\` ${item.status}${exit}${evidence}`;
    });
}
export function buildDeliveryReport(team, delivery) {
    const quality = team.tasks.filter((task) => isQualityKind(taskKindOf(task)));
    const work = team.tasks.filter((task) => !isQualityKind(taskKindOf(task)));
    const lines = [
        `# Delivery report — ${team.name}`,
        '',
        `- Generated: ${new Date().toISOString()}`,
        `- Team: ${team.name} (${team.id})`,
        ...team.description === undefined ? [] : [`- Goal: ${cell(team.description)}`],
        `- Delivery: ${delivery.ok ? 'ready' : 'blocked'}`,
        `- Evidence: quality ${delivery.evidence.completedQualityTasks}/${delivery.evidence.qualityTasks}, reviews ${delivery.evidence.reviewRounds}, host-verified commands ${delivery.evidence.hostVerifiedCommands}, attempts ${delivery.evidence.attempts}, duration ${duration(delivery.evidence.totalDurationMs)}`,
        `- Work tasks: ${delivery.evidence.completedWorkTasks}/${delivery.evidence.workTasks} completed`,
        '',
        '## Quality tasks',
        '',
        '| id | kind | status | assignee | verdict | attempt |',
        '|---|---|---|---|---|---|',
        ...quality.map((task) => `| ${task.id} | ${taskKindOf(task)} | ${task.status} | ${cell(task.assignee)} | ${cell(task.verdict)} | ${task.attempt ?? 0} |`),
        '',
    ];
    for (const task of quality) {
        lines.push(`### ${task.id} — ${task.subject}`, '');
        if (task.objective !== undefined)
            lines.push(`- Objective: ${cell(task.objective)}`);
        if (task.acceptance !== undefined && task.acceptance.length > 0) {
            lines.push('- Acceptance:');
            for (const item of task.acceptance)
                lines.push(`  - ${cell(item)}`);
        }
        if (task.acceptanceResults !== undefined && task.acceptanceResults.length > 0) {
            lines.push('- Acceptance results:');
            for (const item of task.acceptanceResults)
                lines.push(`  - [${item.status}] ${cell(item.criterion)}${item.evidence === undefined ? '' : ` — ${cell(item.evidence)}`}`);
        }
        if (task.changedPaths !== undefined && task.changedPaths.length > 0) {
            lines.push(`- Changed paths: ${task.changedPaths.map((path) => `\`${cell(path)}\``).join(', ')}`);
        }
        const commands = commandLines(task);
        if (commands.length > 0) {
            lines.push('- Commands:');
            lines.push(...commands);
        }
        const open = (task.findings ?? []).filter((finding) => finding.resolved !== true);
        if (open.length > 0) {
            lines.push('- Open findings:');
            for (const finding of open)
                lines.push(`  - [${finding.severity}] ${cell(finding.problem)} — fix: ${cell(finding.requiredFix)}`);
        }
        if (task.output !== undefined && task.output.trim() !== '') {
            lines.push('- Output:', '', "```", task.output, "```");
        }
        lines.push('');
    }
    if (work.length > 0) {
        lines.push('## Work tasks', '', '| id | status | assignee | output |', '|---|---|---|---|', ...work.map((task) => `| ${task.id} | ${task.status} | ${cell(task.assignee)} | ${cell(task.output)?.slice(0, 240) ?? ''} |`), '');
    }
    lines.push('## Residual risks and warnings', '');
    if (delivery.warnings.length === 0 && delivery.evidence.unverifiedQualityTasks.length === 0) {
        lines.push('None recorded.');
    }
    else {
        for (const warning of delivery.warnings)
            lines.push(`- ${cell(warning)}`);
        if (delivery.evidence.unverifiedQualityTasks.length > 0) {
            lines.push(`- Quality tasks without host-verified commands: ${delivery.evidence.unverifiedQualityTasks.join(', ')}`);
        }
    }
    if (delivery.blockers.length > 0) {
        lines.push('', '## Blockers', '', ...delivery.blockers.map((blocker) => `- ${cell(blocker)}`));
    }
    lines.push('');
    return lines.join('\n');
}
/** Write the report into the team directory and return its absolute path. */
export async function writeDeliveryReport(stateRoot, team, markdown) {
    const dir = join(stateRoot, team.id);
    await mkdir(dir, { recursive: true });
    const path = join(dir, 'delivery-report.md');
    await writeFile(path, markdown, 'utf8');
    return path;
}
