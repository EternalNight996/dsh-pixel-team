/**
 * Soft cost gate: estimate a spawn, log it, and let the user decide.
 *
 * Never degrades a model, never pauses the queue: a terminate decision cancels
 * exactly the one spawn that asked.
 */
import { randomUUID } from 'node:crypto';
import { appendFile, mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { publishCostPrompt } from "./events-bus.js";
import { getModeSpec } from "./modes.js";
const DEFAULT_PER_TASK = 2;
const DEFAULT_PER_DAY = 35;
// Conservative planning rates (USD per 1K tokens). Only used for the prompt.
const PRICE_INPUT_PER_1K = 0.0005;
const PRICE_OUTPUT_PER_1K = 0.0015;
const DEFAULT_TIMEOUT_MS = 180_000;
const pending = new Map();
/** The mode's budget, with an optional owner override from the plugin config. */
export function resolveModeBudget(mode, override) {
    const spec = getModeSpec(mode);
    return {
        perTaskUsd: override?.perTaskUsd ?? spec.budget.perTaskUsd,
        perDayUsd: override?.perDayUsd ?? spec.budget.perDayUsd,
        retryPromptAt: spec.budget.retryPromptAt,
    };
}
/** Estimate one spawn: prompt chars in, a conservative completion budget out. */
export function estimateCost(textChars) {
    const inputTokens = Math.max(500, Math.ceil(textChars / 4));
    const outputTokens = 1500;
    return Math.round((inputTokens / 1000 * PRICE_INPUT_PER_1K + outputTokens / 1000 * PRICE_OUTPUT_PER_1K) * 10000) / 10000;
}
export function costLogPath(workspace) {
    return join(workspace, '.pixel-team', 'cost-log.jsonl');
}
/** Merge cost logs read from several workspaces without double-counting. */
export function mergeCostEntries(entries) {
    const seen = new Set();
    const merged = [];
    for (const entry of entries) {
        const key = [entry.ts, entry.sessionId, entry.teamId ?? '', entry.memberName, entry.taskId ?? '', entry.decision].join('\u0000');
        if (seen.has(key))
            continue;
        seen.add(key);
        merged.push(entry);
    }
    return merged.sort((left, right) => left.ts - right.ts);
}
/** Sum today's entries across a merged log (local calendar day). */
export function todayCostFromEntries(entries, now = Date.now()) {
    const day = new Date(now);
    const start = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
    const total = entries
        .filter(entry => entry.ts >= start && entry.ts <= now + 86_400_000)
        .reduce((sum, entry) => sum + entry.estimateUsd, 0);
    return Math.round(total * 10000) / 10000;
}
/** Compute USD from host-reported token usage and configured rates. */
export function usageCost(usage, pricing) {
    const inputPer1k = pricing?.inputPer1k ?? PRICE_INPUT_PER_1K;
    const outputPer1k = pricing?.outputPer1k ?? PRICE_OUTPUT_PER_1K;
    const cacheReadPer1k = pricing?.cacheReadPer1k ?? inputPer1k;
    const cacheWritePer1k = pricing?.cacheWritePer1k ?? inputPer1k;
    const cacheRead = Math.max(0, usage.cacheReadTokens);
    const cacheWrite = Math.max(0, usage.cacheWriteTokens);
    // Host inputTokens is the prompt total; cache tokens are its priced subsets.
    const billableInput = Math.max(0, usage.inputTokens - cacheRead - cacheWrite);
    const usd = billableInput / 1000 * inputPer1k
        + usage.outputTokens / 1000 * outputPer1k
        + cacheRead / 1000 * cacheReadPer1k
        + cacheWrite / 1000 * cacheWritePer1k;
    return Math.round(usd * 1000000) / 1000000;
}
/** Compatibility wrapper for callers that only have input/output counts. */
export function usageCostUsd(inputTokens, outputTokens, pricing) {
    return usageCost({ inputTokens, outputTokens, cacheReadTokens: 0, cacheWriteTokens: 0 }, pricing);
}
/** Sum assistant/message usage from one session event slice. */
export function usageFromEvents(events) {
    let inputTokens = 0;
    let outputTokens = 0;
    let cacheReadTokens = 0;
    let cacheWriteTokens = 0;
    for (const event of events) {
        if (event.type !== 'assistant/message')
            continue;
        const data = event.data;
        if (typeof data !== 'object' || data === null)
            continue;
        const usage = data.usage;
        if (typeof usage !== 'object' || usage === null)
            continue;
        const input = usage.inputTokens;
        const output = usage.outputTokens;
        const cacheRead = usage.cacheReadTokens;
        const cacheWrite = usage.cacheWriteTokens;
        if (typeof input === 'number' && Number.isFinite(input) && input >= 0)
            inputTokens += input;
        if (typeof output === 'number' && Number.isFinite(output) && output >= 0)
            outputTokens += output;
        if (typeof cacheRead === 'number' && Number.isFinite(cacheRead) && cacheRead >= 0)
            cacheReadTokens += cacheRead;
        if (typeof cacheWrite === 'number' && Number.isFinite(cacheWrite) && cacheWrite >= 0)
            cacheWriteTokens += cacheWrite;
    }
    return { inputTokens, outputTokens, cacheReadTokens, cacheWriteTokens };
}
/** Read every cost-log entry (oldest first); a torn line is skipped. */
export async function readCostLogEntries(workspace) {
    let text = '';
    try {
        text = await readFile(costLogPath(workspace), 'utf8');
    }
    catch {
        return [];
    }
    const entries = [];
    for (const line of text.split(/\r?\n/)) {
        if (line.trim() === '')
            continue;
        try {
            entries.push(JSON.parse(line));
        }
        catch { /* skip a torn line */ }
    }
    return entries;
}
/** Sum today's logged estimates (local calendar day). */
export async function readTodayCost(workspace, now = Date.now()) {
    let text = '';
    try {
        text = await readFile(costLogPath(workspace), 'utf8');
    }
    catch {
        return 0;
    }
    const day = new Date(now);
    const start = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
    let total = 0;
    for (const line of text.split(/\r?\n/)) {
        if (line.trim() === '')
            continue;
        try {
            const entry = JSON.parse(line);
            if (entry.ts >= start && entry.ts <= now + 86_400_000)
                total += entry.estimateUsd;
        }
        catch { /* skip a torn line */ }
    }
    return Math.round(total * 10000) / 10000;
}
/** Append one decision to the JSONL log (never throws into the spawn path). */
export async function appendCostLog(workspace, entry) {
    try {
        await mkdir(join(workspace, '.pixel-team'), { recursive: true });
        await appendFile(costLogPath(workspace), JSON.stringify(entry) + '\n', 'utf8');
    }
    catch { /* logging must not block work */ }
}
/**
 * Publish a prompt and wait for the user's decision. A timeout continues (the
 * gate is soft by design) and is logged as such.
 */
export async function requestCostDecision(prompt, timeoutMs = DEFAULT_TIMEOUT_MS) {
    const requestId = randomUUID();
    const full = { ...prompt, requestId };
    return new Promise((resolve) => {
        const done = (decision) => {
            clearTimeout(timer);
            pending.delete(requestId);
            resolve(decision);
        };
        const timer = setTimeout(() => { done('timeout'); }, timeoutMs);
        pending.set(requestId, (decision) => { done(decision); });
        publishCostPrompt(full);
    });
}
/** Resolve one pending prompt; false when it already timed out. */
export function resolveCostDecision(requestId, decision) {
    const resolve = pending.get(requestId);
    if (resolve === undefined)
        return false;
    resolve(decision);
    return true;
}
