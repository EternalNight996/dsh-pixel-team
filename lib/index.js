/**
 * AgentTeams for DeepSeek Harness.
 *
 * A host-plane plugin that registers the `agent_teams_*` tools and one usage
 * agent-scoped usage section. Each session keeps a stable tool set and core
 * instructions. Existing business tools cover the complete team lifecycle.
 * After installation any session can
 * run multi-agent teamwork through natural language (e.g. "use AgentTeams to research X"):
 * the model creates a team (it becomes the captain), spawns members as
 * durable continuable subagents, breaks the goal into tasks with
 * dependencies, wakes members with messages, relays reports, and collects
 * results.
 *
 * Installation (bundle): `dsh plugin --profile <name> add dsh-pixel-team`
 * (or a local path). The bundle patch mounts this plugin row into the host
 * composition; the tools register into the shared `tools` registry and the
 * usage section into the global system prompt, so the plugin needs no realm.
 *
 * @module dsh-agent-teams
 */
import z from '@deepseek-ai/schemastery';
import { createUserMessage } from '@deepseek-ai/dsh-llm';
import { haltTeamWork, soloExecutionContext, stagedPlanApprovedContext, registerAgentTeamsTools, teamLockKey, } from "./tools.js";
import { installAgentTeamsGestureBoundary, registerAgentTeamsCommand } from "./command.js";
import { mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectArchivedTeamsActivity, collectTeamsActivity } from "./snapshot.js";
import { archiveTeamDir, canDeclareDelivery, findTeamByCaptain, invalidateTaskAttempt, readTeam, withTeamLock, writeTeam } from "./state.js";
import { auditTeamWorkspace } from "./workspace-audit.js";
import { digestWorkspacePaths } from "./artifacts.js";
import { deliveryArtifactPaths } from "./quality-gates.js";
import { selectCleanupCandidates } from "./cleanup.js";
import { leadIdentityOfAsync } from "./lineage.js";
import { formatProfilesForPrompt } from "./profiles.js";
import { assignRequirementCoverage, buildPlanFromSpecs, buildQuickStartPlan, planSourceOf, quickStartDeliveryDefaults, quickStartRoles, ROLE_NAMES, soloPlan, stageQuickStartTeam } from "./quick-start.js";
import { generatePlanSpecs } from "./plan-generator.js";
import { confinePlanToProject, derivePlatformPaths, projectRootFor } from "./project-boundary.js";
import { syncArchitectureFile } from "./architecture-file.js";
import { normalizeClarification } from "./clarify.js";
import { polishRequirement } from "./polish.js";
import { generateClarifyOptions } from "./clarify-options.js";
import { generateClarificationFromAnswers, generateInterviewQuestions } from "./interview.js";
import { DEFAULT_MODE, getModeSpec, isTeamMode } from "./modes.js";
import { probeMemory } from "./memory.js";
import { projectLibraryTeam } from "./library-projection.js";
import { mergeCostEntries, readCostLogEntries, readTodayCost, resolveCostDecision, todayCostFromEntries } from "./cost.js";
import { subscribeCostPrompt, subscribeLibraryChange } from "./events-bus.js";
import { buildVerifierScript, detectLegacyRegressionCommand, splitAcceptance } from "./verifier-script.js";
import { parseToolPolicies } from "./tool-policies.js";
import { installTeamCapabilities } from "./capabilities.js";
import { agentTeamsSource, observedSessionFormatVersion } from "./harness-compat.js";
import { TEAM_TOOL_NAMES } from "./tool-names.js";
import { authenticatedWebRoutes, readJsonRequest, RequestBodyError } from "./web-routes.js";
/** Web-server service key candidates, newest first. */
const WEB_SERVER_KEYS = ['webServer', 'httpServer'];
/** Workspace registry service key candidates, newest first. */
const WORKSPACE_KEYS = ['workspaceRegistry', 'workspace'];
export const name = 'agent-teams';
export const inject = ['tools', 'llm', 'subagents', 'systemPrompt', 'agents'];
// `z.object()` has an implicit `{}` default in Schemastery.  Fallback routes
// are optional, so model absence explicitly; otherwise a missing route is
// validated as an empty object and fails on the required provider/model keys.
const fallbackRouteConfig = z.union([
    z.object({ provider: z.string().required(), model: z.string().required() }),
    z.const(undefined),
]);
// Same Schemastery defaulting trap for a tool policy: an `allow`-only policy
// would materialize `deny: []` and fail a `.min(1)` on an absent list. Model
// each accepted combination explicitly, so a policy that declares only one
// side stays valid while an empty side is still rejected.
const toolPolicyConfig = z.union([
    z.object({ allow: z.array(z.string()).min(1).required(), deny: z.const(undefined) }),
    z.object({ allow: z.const(undefined), deny: z.array(z.string()).min(1).required() }),
    z.object({ allow: z.array(z.string()).min(1).required(), deny: z.array(z.string()).min(1).required() }),
]);
export const Config = z.object({
    stateDir: z.string().default('.agent-teams'),
    memberProvider: z.string().default('spawn'),
    memberModel: z.string(),
    memberLlmProvider: z.string(),
    executionPrompt: z.string(),
    fallback: fallbackRouteConfig,
    profiles: z.dict(z.object({
        description: z.string(),
        protocol: z.string(),
        executionPrompt: z.string(),
        fallback: fallbackRouteConfig,
        members: z.array(z.object({
            name: z.string().required(),
            role: z.string(),
            provider: z.string(),
            model: z.string(),
            reasoning_effort: z.string(),
            executionPrompt: z.string(),
            fallback: fallbackRouteConfig,
            // Owner-declared tool-policy id this profile member selects (#59).
            tool_policy: z.string(),
        })).min(1).required(),
        taskPlanning: z.union([z.const('captain'), z.const('seed')]),
        reviewPolicy: z.object({
            requirementsMinRounds: z.natural().min(1),
            requirementsMaxRounds: z.natural().min(1),
            codeMaxRounds: z.natural().min(1),
            maxRepairAttempts: z.natural().min(1),
            requiredReviewers: z.array(z.string()),
        }),
        tasks: z.array(z.object({
            id: z.string().required(),
            subject: z.string().required(),
            description: z.string(),
            assignee: z.string(),
            dependencies: z.array(z.string()),
        })),
    })).default({}),
    toolPolicies: z.dict(toolPolicyConfig).default({}),
    memberMaxDepth: z.natural().default(0),
    maxMembers: z.natural().min(1).default(8),
    promptSectionOrder: z.natural().default(117),
    slashCommand: z.boolean().default(true),
    clarify: z.union([z.object({ enforce: z.boolean() }), z.const(undefined)]),
    memory: z.union([z.object({ endpoint: z.string() }), z.const(undefined)]),
    cost: z.union([
        z.object({
            enabled: z.boolean().default(true),
            perTaskUsd: z.number().default(3),
            perDayUsd: z.number().default(50),
            usage: z.union([z.const('actual'), z.const('estimate')]).default('actual'),
            pricing: z.union([
                z.object({
                    inputPer1k: z.union([z.number(), z.const(undefined)]),
                    outputPer1k: z.union([z.number(), z.const(undefined)]),
                    cacheReadPer1k: z.union([z.number(), z.const(undefined)]),
                    cacheWritePer1k: z.union([z.number(), z.const(undefined)]),
                    models: z.dict(z.object({
                        inputPer1k: z.union([z.number(), z.const(undefined)]),
                        outputPer1k: z.union([z.number(), z.const(undefined)]),
                        cacheReadPer1k: z.union([z.number(), z.const(undefined)]),
                        cacheWritePer1k: z.union([z.number(), z.const(undefined)]),
                    })).default({}),
                }),
                z.const(undefined),
            ]),
        }),
        z.const(undefined),
    ]),
    watchdog: z.union([z.object({
            timeoutMs: z.natural().default(900_000),
            intervalMs: z.natural().default(60_000),
        }), z.const(undefined)]),
    boundary: z.union([z.object({ productsDir: z.string(), forbidden: z.array(z.string()) }), z.const(undefined)]),
    quality: z.union([
        z.object({
            autoVerify: z.boolean().default(true),
            autoReview: z.boolean().default(false),
            crossModelReview: z.boolean().default(false),
            commands: z.array(z.string()).default(['git diff --check']),
            commandsByProject: z.dict(z.array(z.string())).default({}),
            verifyTimeoutMs: z.natural().default(120000),
            requireAcceptance: z.boolean().default(true),
            autoDetect: z.boolean().default(true),
            reviewMode: z.union([z.const('auto'), z.const('human')]).default('auto'),
        }),
        z.const(undefined),
    ]),
});
/** The model-facing usage policy: when and how to drive AgentTeams. */
export function usageSectionText(toolNames, profilesText = '') {
    return `AgentTeams captain protocol:
1. Inspect current team state when needed, using agent_teams_status. Continue existing work without duplicating its roster/tasks. Create only when no current team exists, with the user's goal as description and approval="required"; automatic approval requires an explicit request to run immediately. Staged plans never spawn or schedule work.
2. Add each needed role once; members inherit your model route unless another is requested/needed. A requested profile goes to create({profile}); it supplies its roster. Seed profiles also supply tasks; captain-planning profiles require your DAG. Do not duplicate either. A member may also select one owner-declared tool policy by id (tool_policy on add_member, a plan member, or a profile member): it is the only way to change which global tools that member sees and may invoke, and you can never pass raw allow/deny lists.
3. Build the complete smallest useful DAG while staged. For an ordinary research/audit plan, pass the roster and dependency graph together in create({plan:{members,tasks}}) to avoid repeated setup rounds. Every task needs a subject; pass kind and assignee explicitly when the plan specifies them. Titles, descriptions and member roles do not set these fields. Dependencies represent prerequisites. Give every required contributor a task or explicit message. Present the plan and end your turn for review; never approve in that planning turn. Approve only after a later explicit user approval or the Web action.
4. Respect Web approve/return/discard control messages. On return, ask what to change before editing; after the answer, use one atomic agent_teams_edit_plan batch (edit downstream references before removals), summarize and await review again. Never inspect or edit .agent-teams state files or plugin source code to revise plans. Discard does not authorize a replacement.
5. The scheduler dispatches ready tasks after approval. Delegate; do not duplicate slow work or send messages merely to start a stage. Handle reports/user work, then yield when waiting is all that remains: reports wake you automatically. Use status after a delivery or user request, never busy-poll or wait for unassigned members.
6. Tasks carry attempt_id capabilities. Use the current attempt_id; stale means ownership changed. Pause members only on explicit request; later guidance via send_message continues that same attempt. Retry, transfer or take over through reassign_task first; it revokes the old attempt and waits for quiescence. Prefer a member. Captain implementation/review takeover requires a user request. Every takeover is one ready task at a time, finished in this turn; never yield with captain-owned work open.
7. In a running team, correct never-started pending tasks with edit_plan update_task; preserve dependency and ownership contracts instead of cancelling and recreating the graph. A captain can cancel a never-started pending task directly. Active attempts still require reassign_task. Quality kinds (requirements, implementation, verification, review, repair, integration) require objective + acceptance; implementation/repair also require inScope + verify. Derive paths/commands from the workspace/profile, never assume src/ or pnpm test. Review/requirements complete only with verdict=pass; needs_revision/reject fail with findings. Delivery requires at least one completed review with verdict=pass, including work-only plans; add a review task if the plan lacks one. The host re-runs declared verify commands when a quality task completes and checks implementation/repair changedPaths against the real git diff; a failure or invented path rejects the update, so self-reported passes are not delivery evidence. Never approve your own implementation or ask for a deliberate failure. When a quality contract itself is wrong (a verify command that cannot pass, an inScope that forbids the file the objective requires), fix it with agent_teams_amend_task — captain-only, non-terminal tasks only, frozen after a passing review, and every amendment is recorded in the task's revisions ledger — instead of letting the worker dead-lock or game the gate.
8. When full quality mode is requested: requirements → implementation → verification → review → integration. Plan the entire DAG while staged, including implementation before requirements finishes and integration depending on review round 1. Failed review automatically adds repair + next review and rewires pending downstream gates. Do not recreate this loop, omit integration or depend on a failed task. Review acceptance judges the latest implementation. Do not put smoke-test scripts into task instructions.
9. Halted means the user stopped work (including the captain turn). Resume only on a later explicit user request with a reason, via agent_teams_resume or create_task({resume:true,resumeReason}); creating tasks alone never resumes. Escalated means the review loop hit its limit, not a halt. Deployment requires explicit user confirmation.
10. Wait for all required tasks to be terminal and members idle/ready, present results, then delete/archive unless the user wants to continue. Never discard unfinished work without authorization.
11. Before generating a DAG, confirm the blocking clarification with the user (agent_teams_clarify): type, plain-language scale, UI, platforms, hardware candidates, exclusions, and executable acceptance. Pass the confirmed object to agent_teams_create as clarification; a plan without it is incomplete.
12. Members may call agent_teams_memory_recall with the constitution memory_hints. A failed recall means the vault is unavailable, not that the memory is empty.
13. Every team has a development mode (draft | precision | legacy | compliance | monetize). It drives the member philosophy, default boundaries, acceptance baseline, verifier strategy and budget; persist it on the clarification and never silently change it after approval.
14. Work inside the approved contract. When a detail is ambiguous, choose the most conservative reversible option consistent with the goal, inScope, acceptance and verify commands, record the assumption in the task output, and continue. Pause and ask the user only when the next action is irreversible, outside inScope, needs credentials, or would change the approved goal. Batch questions: one blocking question with your recommended default, never a stream of confirmations.
15. If this session already has an active host Goal, treat it as the outer completion condition: do not create a second goal and do not duplicate the host Goal Round Driver's continuation. When delivery.ok is true and the goal describes this delivery, call update_goal complete; otherwise report and leave the goal alone. Never resume a disarmed goal without an explicit human request.
Tools: ${toolNames}${profilesText === '' ? '' : `\n\n${profilesText}`}`;
}
/** Compact workspace facts handed to the polish model; never the full tree. */
async function describeWorkspaceFacts(workspace) {
    try {
        const entries = await readdir(workspace, { withFileTypes: true });
        const dirs = entries.filter(entry => entry.isDirectory() && !entry.name.startsWith('.')).map(entry => entry.name + '/').slice(0, 20);
        const files = entries.filter(entry => entry.isFile()).map(entry => entry.name).slice(0, 20);
        let scripts = '';
        try {
            const pkg = JSON.parse(await readFile(join(workspace, 'package.json'), 'utf8'));
            scripts = Object.keys(pkg.scripts ?? {}).join(', ');
        }
        catch { /* no package.json */ }
        return ['workspace: ' + workspace, 'dirs: ' + dirs.join(' '), 'files: ' + files.join(' '), scripts === '' ? '' : 'scripts: ' + scripts]
            .filter(line => line !== '')
            .join('\n');
    }
    catch {
        return 'workspace: ' + workspace;
    }
}
export function apply(ctx, config) {
    const resolved = {
        stateDir: config.stateDir ?? '.agent-teams',
        memberProvider: config.memberProvider ?? 'spawn',
        memberModel: config.memberModel,
        memberLlmProvider: config.memberLlmProvider,
        executionPrompt: config.executionPrompt,
        fallback: config.fallback,
        memberMaxDepth: config.memberMaxDepth ?? 0,
        maxMembers: config.maxMembers ?? 8,
        profiles: config.profiles ?? {},
        // Owner configuration is validated once, at mount: an empty or malformed
        // policy must never reach a member creation path.
        toolPolicies: parseToolPolicies(config.toolPolicies),
        clarify: config.clarify,
        memory: config.memory,
        cost: config.cost,
        watchdog: config.watchdog,
        quality: config.quality,
    };
    // Provider registration is a sibling plugin's effect (`subagent-spawn` /
    // `subagent-fork` rows), which can land after this mount under the Loader's
    // concurrent activation — so capability validation happens at the first
    // member spawn (`spawnMember`), the earliest point the provider list is
    // settled, rather than here.
    const agentTeamsRuntime = registerAgentTeamsTools(ctx, resolved);
    installTeamCapabilities(ctx, {
        stateDir: resolved.stateDir,
        isPendingMember: agentTeamsRuntime.isPendingMember,
        order: config.promptSectionOrder,
        // Keep the bounded profile directory available without extra tool calls.
        // installTeamCapabilities snapshots this once; no business state rewrites it.
        captainPrompt: () => usageSectionText(TEAM_TOOL_NAMES.join(', '), formatProfilesForPrompt(config.profiles)),
    });
    // Deterministic activation surfaces: the closed-namespace `/agent-teams`
    // host command (surfaces in the Web GUI slash menu via the Harness
    // ui-commands client) and the plain-text gesture boundary for surfaces
    // without command adjudication (headless CLI). Both default on; a profile
    // can disable them to keep the natural-language trigger exclusive.
    //
    // `commands` is registered lazily (not a required inject): it ships in the
    // base bundle of every standard profile, but a minimal composition that
    // omits the command registry keeps the plugin fully functional — the fiber
    // never pends on it and simply never gains the slash command.
    if (config.slashCommand ?? true) {
        ctx.inject(['commands'], (commandCtx) => {
            registerAgentTeamsCommand(commandCtx, () => config.profiles ?? {});
        });
        installAgentTeamsGestureBoundary(ctx, () => config.profiles ?? {});
    }
    // The activity panel data/artwork routes need the Web server and the
    // workspace registry, which headless profiles do not mount; under
    // concurrent activation they may also bind after this plugin. Register the
    // routes lazily: try now, then on each service binding event. In a webless
    // profile the plugin stays tool-only and never blocks boot.
    let webRegistered = false;
    const registerWebSurface = () => {
        if (webRegistered)
            return;
        const rawWebServer = (ctx.get(WEB_SERVER_KEYS[0]) ?? ctx.get(WEB_SERVER_KEYS[1]));
        const workspaceRegistry = (ctx.get(WORKSPACE_KEYS[0]) ?? ctx.get(WORKSPACE_KEYS[1]));
        if (rawWebServer === undefined || workspaceRegistry === undefined)
            return;
        const webServer = authenticatedWebRoutes(rawWebServer, () => ctx.get('connection'));
        webRegistered = true;
        // Activity panel data route: the browser floater polls this for team
        // snapshots (disk truth + live subagent activity). Mirrors the Claude
        // Code desktop watcher's server-side snapshot pattern.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/state',
            handler: async (req, res) => {
                const url = new URL(req.url ?? '/', 'http://x');
                const roots = workspaceRegistry.list().map((workspace) => ({
                    workspace: workspace.title,
                    // The panel audits the same current bytes as agent_teams_status, so it
                    // cannot advertise a passing gate over a changed revision (#161).
                    workspacePath: workspace.path,
                    stateRoot: join(workspace.path, resolved.stateDir),
                }));
                // ?archived=1 serves teams moved to archive/ (post-delete review).
                const snapshots = url.searchParams.get('archived') === '1'
                    ? await collectArchivedTeamsActivity(ctx, roots)
                    : await collectTeamsActivity(ctx, roots);
                const body = JSON.stringify({ teams: snapshots });
                res.writeHead(200, {
                    'content-type': 'application/json; charset=utf-8',
                    'cache-control': 'no-store',
                });
                res.end(body);
            },
        }), 'agent-teams: activity route');
        // Task-scoped skill catalog. The host owns discovery; the plugin only
        // exposes model-invocable entries for the task editor.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/skills',
            handler: async (req, res) => {
                const url = new URL(req.url ?? '/', 'http://x');
                const sessionId = url.searchParams.get('sessionId')?.trim() ?? '';
                if (sessionId === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId is required' }));
                    return;
                }
                const captain = ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'session is not attached' }));
                    return;
                }
                const registry = ctx.skills;
                try {
                    const entries = registry === undefined ? [] : await registry.list({
                        cwd: captain.session.header.cwd ?? process.cwd(),
                        scope: captain,
                    });
                    const skills = entries
                        .filter((entry) => entry['modelInvocable'] !== false)
                        .map((entry) => ({
                        name: String(entry['name'] ?? ''),
                        description: String(entry['description'] ?? ''),
                        provider: String(entry['provider'] ?? ''),
                    }))
                        .filter((entry) => entry.name !== '');
                    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ skills }));
                }
                catch (error) {
                    ctx.logger.warn('agent-teams: skill catalog failed: ' + String(error));
                    res.writeHead(500, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'skill catalog unavailable' }));
                }
            },
        }), 'agent-teams: skills route');
        // Module 3: push the library projection over SSE. It reads the same durable
        // team record every other surface reads — no polling, no second state store.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/events',
            handler: async (req, res) => {
                const url = new URL(req.url ?? '/', 'http://x');
                const sessionId = url.searchParams.get('sessionId')?.trim() ?? '';
                const captain = sessionId === '' ? undefined : ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'session is not attached' }));
                    return;
                }
                const workspace = captain.session.header.cwd ?? process.cwd();
                const stateRoot = join(workspace, config.stateDir ?? '.agent-teams');
                res.writeHead(200, {
                    'content-type': 'text/event-stream; charset=utf-8',
                    'cache-control': 'no-store',
                    connection: 'keep-alive',
                });
                res.write(': connected\n\n');
                let closed = false;
                const send = (event, data) => {
                    if (closed)
                        return;
                    try {
                        res.write('event: ' + event + '\ndata: ' + JSON.stringify(data) + '\n\n');
                    }
                    catch {
                        closed = true;
                    }
                };
                const emit = async () => {
                    if (closed)
                        return;
                    try {
                        const team = await findTeamByCaptain(stateRoot, captain.id, await leadIdentityOfAsync(ctx, captain.session));
                        const today = await readTodayCost(workspace);
                        send('library', { team: team === undefined ? null : projectLibraryTeam(team, today), todayCostUsd: today });
                    }
                    catch (error) {
                        send('error', { message: error instanceof Error ? error.message : String(error) });
                    }
                };
                void emit();
                const offTeams = subscribeLibraryChange((root) => { if (root === stateRoot)
                    void emit(); });
                const offCost = subscribeCostPrompt((prompt) => { if (prompt.sessionId === captain.id)
                    send('cost', prompt); });
                const heartbeat = setInterval(() => {
                    if (closed)
                        return;
                    try {
                        res.write(': ping\n\n');
                    }
                    catch {
                        closed = true;
                    }
                }, 15_000);
                const cleanup = () => {
                    if (closed)
                        return;
                    closed = true;
                    offTeams();
                    offCost();
                    clearInterval(heartbeat);
                    try {
                        res.end();
                    }
                    catch { /* already closed */ }
                };
                req.on('close', cleanup);
                res.on('close', cleanup);
            },
        }), 'agent-teams: library events route');
        // Module 4: the browser's answer to one cost prompt. An expired prompt is a
        // 404, never a spawn failure.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/cost/decision',
            handler: async (req, res) => {
                if (req.method !== 'POST') {
                    res.writeHead(405, { allow: 'POST', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                let payload;
                try {
                    payload = await readJsonRequest(req);
                }
                catch (error) {
                    res.writeHead(error instanceof RequestBodyError ? error.status : 400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'invalid request body' }));
                    return;
                }
                const requestId = typeof payload.requestId === 'string' ? payload.requestId.trim() : '';
                const decision = payload.decision === 'continue' ? 'continue' : payload.decision === 'terminate' ? 'terminate' : undefined;
                if (requestId === '' || decision === undefined) {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'requestId and decision (continue|terminate) are required' }));
                    return;
                }
                const resolved = resolveCostDecision(requestId, decision);
                res.writeHead(resolved ? 200 : 404, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                res.end(JSON.stringify(resolved ? { ok: true, decision } : { error: 'cost prompt is no longer pending' }));
            },
        }), 'agent-teams: cost decision route');
        // Cost ledger for the roster/name-list: today's spend, per-task totals and
        // the latest entries, all read from .pixel-team/cost-log.jsonl.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/cost/report',
            handler: async (req, res) => {
                if (req.method !== 'GET') {
                    res.writeHead(405, { allow: 'GET', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                const url = new URL(req.url ?? '/', 'http://x');
                const sessionId = url.searchParams.get('sessionId')?.trim() ?? '';
                const captain = sessionId === '' ? undefined : ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'session is not attached' }));
                    return;
                }
                const workspace = captain.session.header.cwd ?? process.cwd();
                const teamFilter = url.searchParams.get('teamId')?.trim() ?? '';
                // The desktop session workspace and the profile directory can differ
                // (older teams logged costs next to the profile). Merge known roots so
                // 名册 still finds the real spend instead of showing an empty ledger.
                const roots = [...new Set([
                        workspace,
                        process.env.DSH_PROFILE_DIR ?? '',
                        process.env.DSH_HOME ?? '',
                    ].filter(root => root !== ''))];
                const allEntries = mergeCostEntries((await Promise.all(roots.map(root => readCostLogEntries(root)))).flat());
                // A task with actual usage supersedes its provisional spawn estimate.
                const actualKeys = new Set(allEntries.filter(entry => entry.decision === 'usage-actual').map(entry => `${entry.teamId ?? ''}|${entry.taskId ?? ''}`));
                const effectiveAll = allEntries.filter(entry => entry.decision === 'usage-actual' || !actualKeys.has(`${entry.teamId ?? ''}|${entry.taskId ?? ''}`));
                const entries = teamFilter === '' ? effectiveAll : effectiveAll.filter(entry => entry.teamId === teamFilter);
                const todayUsd = todayCostFromEntries(effectiveAll);
                const byTask = new Map();
                const byTeam = new Map();
                for (const entry of entries) {
                    const taskKey = entry.taskId === undefined || entry.taskId === '' ? '(spawn)' : entry.taskId;
                    const task = byTask.get(taskKey) ?? { taskId: taskKey, usd: 0, count: 0 };
                    task.usd += entry.estimateUsd;
                    task.count += 1;
                    byTask.set(taskKey, task);
                    if (entry.teamId !== undefined) {
                        const team = byTeam.get(entry.teamId) ?? { teamId: entry.teamId, usd: 0 };
                        team.usd += entry.estimateUsd;
                        byTeam.set(entry.teamId, team);
                    }
                }
                const round = (value) => Math.round(value * 10000) / 10000;
                res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                res.end(JSON.stringify({
                    ok: true,
                    today_usd: round(todayUsd),
                    by_task: [...byTask.values()].map(item => ({ ...item, usd: round(item.usd) })).sort((left, right) => right.usd - left.usd),
                    by_team: [...byTeam.values()].map(item => ({ ...item, usd: round(item.usd) })).sort((left, right) => right.usd - left.usd),
                    entries: entries.slice(-60).reverse(),
                }));
            },
        }), 'agent-teams: cost report route');
        // Library "stop task": revoke the current attempt and mark the task failed
        // so the scheduler and downstream gates see a terminal stop.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/task/stop',
            handler: async (req, res) => {
                if (req.method !== 'POST') {
                    res.writeHead(405, { allow: 'POST', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                let payload;
                try {
                    payload = await readJsonRequest(req);
                }
                catch (error) {
                    res.writeHead(error instanceof RequestBodyError ? error.status : 400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'invalid request body' }));
                    return;
                }
                const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId.trim() : '';
                const taskId = typeof payload.taskId === 'string' ? payload.taskId.trim() : '';
                if (sessionId === '' || taskId === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId and taskId are required' }));
                    return;
                }
                const captain = ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'session is not attached' }));
                    return;
                }
                const workspace = captain.session.header.cwd ?? process.cwd();
                const stateRoot = join(workspace, config.stateDir ?? '.agent-teams');
                const team = await findTeamByCaptain(stateRoot, captain.id, await leadIdentityOfAsync(ctx, captain.session));
                if (team === undefined) {
                    res.writeHead(404, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'no active team for this session' }));
                    return;
                }
                let stopped = false;
                await withTeamLock(teamLockKey(stateRoot, team.id), async () => {
                    const fresh = await readTeam(stateRoot, team.id);
                    if (fresh === undefined)
                        return;
                    const task = fresh.tasks.find(item => item.id === taskId);
                    if (task === undefined)
                        return;
                    if (task.status === 'completed' || task.status === 'failed')
                        return;
                    const assignee = task.assignee;
                    invalidateTaskAttempt(task);
                    task.assignee = assignee;
                    task.status = 'failed';
                    task.output = '用户从道统·藏经阁停止该任务';
                    task.updatedAt = Date.now();
                    await writeTeam(stateRoot, fresh);
                    stopped = true;
                });
                res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                res.end(JSON.stringify({ ok: true, stopped }));
            },
        }), 'agent-teams: stop task route');
        // Human confirmation for an auto-audited review (quality.reviewMode=human).
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/task/review-confirm',
            handler: async (req, res) => {
                if (req.method !== 'POST') {
                    res.writeHead(405, { allow: 'POST', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                let payload;
                try {
                    payload = await readJsonRequest(req);
                }
                catch (error) {
                    res.writeHead(error instanceof RequestBodyError ? error.status : 400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'invalid request body' }));
                    return;
                }
                const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId.trim() : '';
                const taskId = typeof payload.taskId === 'string' ? payload.taskId.trim() : '';
                if (sessionId === '' || taskId === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId and taskId are required' }));
                    return;
                }
                const captain = ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'session is not attached' }));
                    return;
                }
                const workspace = captain.session.header.cwd ?? process.cwd();
                const stateRoot = join(workspace, config.stateDir ?? '.agent-teams');
                const team = await findTeamByCaptain(stateRoot, captain.id, await leadIdentityOfAsync(ctx, captain.session));
                if (team === undefined) {
                    res.writeHead(404, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'no active team for this session' }));
                    return;
                }
                try {
                    const result = await agentTeamsRuntime.confirmReview(captain, team.id, taskId);
                    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ ok: true, ...result }));
                }
                catch (error) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }));
                }
            },
        }), 'agent-teams: confirm review route');
        // Source data for regenerating a staged plan (same goal/clarification/roles).
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/plan/source',
            handler: async (req, res) => {
                if (req.method !== 'GET') {
                    res.writeHead(405, { allow: 'GET', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                const url = new URL(req.url ?? '/', 'http://x');
                const sessionId = url.searchParams.get('sessionId')?.trim() ?? '';
                if (sessionId === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId is required' }));
                    return;
                }
                const captain = ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'session is not attached' }));
                    return;
                }
                const workspace = captain.session.header.cwd ?? process.cwd();
                const stateRoot = join(workspace, config.stateDir ?? '.agent-teams');
                const team = await findTeamByCaptain(stateRoot, captain.id, await leadIdentityOfAsync(ctx, captain.session));
                if (team === undefined) {
                    res.writeHead(404, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'no active team for this session' }));
                    return;
                }
                const source = planSourceOf(team);
                if (source === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'only a staged plan can be regenerated' }));
                    return;
                }
                res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                res.end(JSON.stringify({ ok: true, ...source }));
            },
        }), 'agent-teams: plan source route');
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/halt',
            handler: async (req, res) => {
                if (req.method !== 'POST') {
                    res.writeHead(405, { allow: 'POST', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                let payload;
                try {
                    payload = await readJsonRequest(req);
                }
                catch (error) {
                    res.writeHead(error instanceof RequestBodyError ? error.status : 400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'invalid request body' }));
                    return;
                }
                const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId.trim() : '';
                const teamId = typeof payload.teamId === 'string' ? payload.teamId.trim() : '';
                if (sessionId === '' || teamId === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId and teamId are required' }));
                    return;
                }
                const captain = ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'captain session is not attached' }));
                    return;
                }
                const workspace = captain.session.header.cwd ?? process.cwd();
                const stateRoot = join(workspace, resolved.stateDir);
                const team = await findTeamByCaptain(stateRoot, captain.id, await leadIdentityOfAsync(ctx, captain.session));
                if (team === undefined || team.id !== teamId) {
                    res.writeHead(404, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'team not found for this captain' }));
                    return;
                }
                try {
                    const result = await haltTeamWork({
                        ctx,
                        stateRoot,
                        teamId,
                        captain,
                    });
                    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify(result));
                }
                catch (error) {
                    ctx.logger.warn(`agent-teams: halt failed for ${teamId}: ${String(error)}`);
                    res.writeHead(500, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'failed to stop the team' }));
                }
            },
        }), 'agent-teams: halt route');
        // Human delivery acceptance. Technical delivery.ok stays a gate; acceptance
        // is the separate "the user signed off" fact the panel shows.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/delivery/accept',
            handler: async (req, res) => {
                if (req.method !== 'POST') {
                    res.writeHead(405, { allow: 'POST', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                let payload;
                try {
                    payload = await readJsonRequest(req);
                }
                catch (error) {
                    res.writeHead(error instanceof RequestBodyError ? error.status : 400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'invalid request body' }));
                    return;
                }
                const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId.trim() : '';
                const teamId = typeof payload.teamId === 'string' ? payload.teamId.trim() : '';
                if (sessionId === '' || teamId === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId and teamId are required' }));
                    return;
                }
                const captain = ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'captain session is not attached' }));
                    return;
                }
                const workspace = captain.session.header.cwd ?? process.cwd();
                const stateRoot = join(workspace, resolved.stateDir);
                try {
                    const acceptedAt = await withTeamLock(teamLockKey(stateRoot, teamId), async () => {
                        const team = await readTeam(stateRoot, teamId);
                        if (team === undefined || team.captainSessionId !== captain.id)
                            throw new Error('team not found for this captain');
                        const check = canDeclareDelivery(team, auditTeamWorkspace(workspace, team));
                        if (!check.ok)
                            throw new Error('delivery is not ready: ' + check.blockers.join('; '));
                        if (team.acceptedAt !== undefined)
                            return team.acceptedAt;
                        const now = Date.now();
                        const digests = digestWorkspacePaths(workspace, deliveryArtifactPaths(team));
                        team.acceptedAt = now;
                        team.acceptedBy = captain.id;
                        team.acceptedDigests = Object.fromEntries(digests.map((digest) => [digest.path, digest.sha256 ?? String(digest.mtimeMs ?? 'missing')]));
                        await writeTeam(stateRoot, team);
                        return now;
                    });
                    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ acceptedAt }));
                }
                catch (error) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'acceptance rejected' }));
                }
            },
        }), 'agent-teams: delivery accept route');
        // Panel cleanup: archive terminal teams older than the cutoff. The current
        // captain's team is never a candidate; dry_run defaults to true.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/cleanup',
            handler: async (req, res) => {
                if (req.method !== 'POST') {
                    res.writeHead(405, { allow: 'POST', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                let payload;
                try {
                    payload = await readJsonRequest(req);
                }
                catch (error) {
                    res.writeHead(error instanceof RequestBodyError ? error.status : 400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'invalid request body' }));
                    return;
                }
                const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId.trim() : '';
                if (sessionId === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId is required' }));
                    return;
                }
                const captain = ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'captain session is not attached' }));
                    return;
                }
                const workspace = captain.session.header.cwd ?? process.cwd();
                const stateRoot = join(workspace, resolved.stateDir);
                const rawDays = payload.older_than_days;
                const days = typeof rawDays === 'number' && Number.isFinite(rawDays) ? Math.min(3650, Math.max(0, Math.floor(rawDays))) : 7;
                const dryRun = payload.dry_run !== false;
                const includeArchived = payload.include_archived === true;
                const teams = [];
                try {
                    for (const entry of await readdir(stateRoot, { withFileTypes: true })) {
                        if (!entry.isDirectory() || entry.name === 'archive')
                            continue;
                        try {
                            const team = await readTeam(stateRoot, entry.name);
                            if (team !== undefined)
                                teams.push(team);
                        }
                        catch { /* skip unreadable/foreign dirs */ }
                    }
                }
                catch { /* no state root: no candidates */ }
                const candidates = selectCleanupCandidates(teams, {
                    now: Date.now(),
                    olderThanDays: days,
                    excludeCaptainSessionId: captain.id,
                });
                // The roster history is already-archived teams. "Archive" there means:
                // move those archived dirs to archive/.retired so they leave the roster.
                const archivedTeams = [];
                const archiveRoot = join(stateRoot, 'archive');
                if (includeArchived) {
                    try {
                        for (const entry of await readdir(archiveRoot, { withFileTypes: true })) {
                            if (!entry.isDirectory() || entry.name === '.retired')
                                continue;
                            try {
                                const team = await readTeam(archiveRoot, entry.name);
                                if (team !== undefined && team.captainSessionId === captain.id)
                                    archivedTeams.push({ dir: entry.name, team });
                            }
                            catch { /* skip unreadable/foreign dirs */ }
                        }
                    }
                    catch { /* no archive: nothing to retire */ }
                }
                const now = Date.now();
                const archivedCandidates = archivedTeams.map(({ dir, team }) => ({
                    id: team.id,
                    name: team.name,
                    age_days: Math.max(0, Math.floor((now - (team.createdAt ?? now)) / 86_400_000)),
                    tasks: team.tasks.length,
                    dir,
                }));
                const archived = [];
                const errors = [];
                if (!dryRun) {
                    for (const candidate of candidates) {
                        try {
                            await archiveTeamDir(stateRoot, candidate.id);
                            archived.push(candidate.id);
                        }
                        catch (error) {
                            errors.push(`${candidate.id}: ${error instanceof Error ? error.message : String(error)}`);
                        }
                    }
                    if (includeArchived && archivedCandidates.length > 0) {
                        const retiredRoot = join(archiveRoot, '.retired');
                        try {
                            await mkdir(retiredRoot, { recursive: true });
                            for (const [index, candidate] of archivedCandidates.entries()) {
                                try {
                                    await rename(join(archiveRoot, candidate.dir), join(retiredRoot, `${candidate.dir}-${now}-${index}`));
                                    archived.push(candidate.id);
                                }
                                catch (error) {
                                    errors.push(`${candidate.id}: ${error instanceof Error ? error.message : String(error)}`);
                                }
                            }
                        }
                        catch (error) {
                            errors.push(`retired: ${error instanceof Error ? error.message : String(error)}`);
                        }
                    }
                }
                res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                res.end(JSON.stringify({
                    dry_run: dryRun,
                    candidates: [
                        ...candidates.map((candidate) => ({ id: candidate.id, name: candidate.name, age_days: candidate.ageDays, tasks: candidate.tasks })),
                        ...archivedCandidates.map((candidate) => ({ id: candidate.id, name: candidate.name, age_days: candidate.age_days, tasks: candidate.tasks })),
                    ],
                    archived,
                    ...errors.length === 0 ? {} : { errors },
                }));
            },
        }), 'agent-teams: cleanup route');
        // Panel "重新开始": resume a halted team through the same tool the captain
        // would call, so the durable state, the session event and the scheduler kick
        // stay identical to agent_teams_resume.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/resume',
            handler: async (req, res) => {
                if (req.method !== 'POST') {
                    res.writeHead(405, { allow: 'POST', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                let payload;
                try {
                    payload = await readJsonRequest(req);
                }
                catch (error) {
                    res.writeHead(error instanceof RequestBodyError ? error.status : 400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'invalid request body' }));
                    return;
                }
                const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId.trim() : '';
                if (sessionId === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId is required' }));
                    return;
                }
                const captain = ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'session is not attached' }));
                    return;
                }
                const tools = ctx.get('tools');
                const definition = tools?.get?.('agent_teams_resume');
                if (definition?.execute === undefined) {
                    res.writeHead(503, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'team resume tool is unavailable' }));
                    return;
                }
                const reason = typeof payload.reason === 'string' && payload.reason.trim() !== ''
                    ? payload.reason.trim()
                    : 'Resumed from the Web panel';
                const abort = new AbortController();
                const timeout = setTimeout(() => { abort.abort(); }, 30_000);
                const run = { agent: captain, signal: abort.signal, deferContext() { }, concludeTurn() { } };
                try {
                    const value = await definition.execute({ reason }, run);
                    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ ok: true, status: value.status, teamId: value.team_id }));
                }
                catch (error) {
                    const message = error instanceof Error ? error.message : String(error);
                    ctx.logger.warn(`agent-teams: resume failed for ${sessionId}: ${message}`);
                    res.writeHead(422, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: message }));
                }
                finally {
                    clearTimeout(timeout);
                }
            },
        }), 'agent-teams: resume route');
        // Click-to-dispatch: the Web "开团" dialog asks the host to stage exactly
        // what the captain tool would stage, so the user never has to type a
        // command. Approval stays required; this route never spawns members.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/quick-start',
            handler: async (req, res) => {
                if (req.method !== 'POST') {
                    res.writeHead(405, { allow: 'POST', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                let payload;
                try {
                    payload = await readJsonRequest(req);
                }
                catch (error) {
                    res.writeHead(error instanceof RequestBodyError ? error.status : 400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'invalid request body' }));
                    return;
                }
                const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId.trim() : '';
                const goal = typeof payload.goal === 'string' ? payload.goal.trim() : '';
                const template = typeof payload.template === 'string' ? payload.template : 'fix';
                const roles = Array.isArray(payload.roles) ? payload.roles.filter((role) => typeof role === 'string') : undefined;
                if (sessionId === '' || goal === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId and goal are required' }));
                    return;
                }
                // Blocking clarification root: no DAG is generated before the user
                // confirms this form. The wizard's mode wins over a missing mode field.
                let clarification;
                try {
                    const rawClarification = typeof payload.clarification === 'object' && payload.clarification !== null
                        ? payload.clarification
                        : {};
                    const requestedMode = isTeamMode(payload.mode) ? payload.mode : undefined;
                    const rawMode = rawClarification['mode'];
                    const effectiveMode = requestedMode ?? (isTeamMode(rawMode) ? rawMode : DEFAULT_MODE);
                    clarification = normalizeClarification({ ...rawClarification, mode: effectiveMode });
                }
                catch (error) {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'clarification is required before founding a team: ' + (error instanceof Error ? error.message : String(error)) }));
                    return;
                }
                const requirementRaw = payload.requirement;
                const requirement = (() => {
                    if (typeof requirementRaw !== 'object' || requirementRaw === null)
                        return undefined;
                    const record = requirementRaw;
                    const original = typeof record['original'] === 'string' ? record['original'].trim() : '';
                    const expanded = typeof record['expanded'] === 'string' ? record['expanded'].trim() : '';
                    const conditions = Array.isArray(record['conditions'])
                        ? record['conditions'].filter((item) => typeof item === 'string')
                        : [];
                    if (original === '' && expanded === '')
                        return undefined;
                    return { original: original === '' ? expanded : original, expanded, conditions };
                })();
                const captain = ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'session is not attached' }));
                    return;
                }
                const tools = ctx.get('tools');
                const definition = tools?.get?.('agent_teams_create');
                const taskDefinition = tools?.get?.('agent_teams_create_task');
                if (definition?.execute === undefined || taskDefinition?.execute === undefined) {
                    res.writeHead(503, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'team creation tools are unavailable' }));
                    return;
                }
                const workspace = captain.session.header.cwd ?? process.cwd();
                // Every founding project lives under projects/<slug>/; platform files are
                // off-limits unless the user explicitly asks to change the plugin.
                const projectRoot = projectRootFor(goal, config.boundary?.productsDir);
                // Module 5: executable acceptance lines become verifier commands; the
                // prose criteria stay on the verification/review tasks.
                const acceptance = splitAcceptance(clarification.acceptance);
                const modeSpec = getModeSpec(clarification.mode);
                const delivery = quickStartDeliveryDefaults(workspace);
                // Generated projects live under projects/<slug>/: the plugin's own
                // scripts (pnpm typecheck) do NOT verify the product. Prefer per-project
                // commands, then global commands, else a product-neutral check.
                const projectKey = projectRoot.replace(/^\.\//, '').replace(/\/+$/, '');
                const perProject = config.quality?.commandsByProject?.[projectKey];
                delivery.verify = perProject !== undefined && perProject.length > 0
                    ? [...perProject]
                    : config.quality?.commands !== undefined && config.quality.commands.length > 0
                        ? [...config.quality.commands]
                        : ['git diff --check'];
                delivery.verify = [...delivery.verify, ...acceptance.commands];
                delivery.mode = clarification.mode;
                // Mode acceptance baseline + constitution prose criteria land on the gates.
                delivery.acceptance = [...acceptance.criteria, ...modeSpec.acceptanceDefaults];
                // Module 5: materialize the verifier as a script the host runs when the
                // verification task completes. Legacy prepends the discovered old
                // regression suite; compliance adds the dependency/secret audit.
                const scriptCommands = [...acceptance.commands];
                if (clarification.mode === 'legacy') {
                    const legacyCommand = detectLegacyRegressionCommand(workspace);
                    if (legacyCommand !== undefined)
                        scriptCommands.unshift(legacyCommand);
                }
                const verifierScript = buildVerifierScript(scriptCommands, 'verify-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6), clarification.mode);
                if (verifierScript !== undefined) {
                    const scriptPath = join(workspace, verifierScript.relativePath);
                    await mkdir(dirname(scriptPath), { recursive: true });
                    await writeFile(scriptPath, verifierScript.content, 'utf8');
                    delivery.verify = [...delivery.verify, 'node ' + verifierScript.relativePath];
                }
                // Derive the DAG from the real goal + interview answers + mode; the
                // fixed template is only the fallback when generation is unusable.
                const planRoles = quickStartRoles(template, roles);
                const forbiddenPaths = derivePlatformPaths(workspace, config.boundary?.forbidden);
                delivery.inScope = [projectRoot];
                const planFacts = await describeWorkspaceFacts(workspace);
                const planAbort = new AbortController();
                const planTimeout = setTimeout(() => { planAbort.abort(); }, 60_000);
                let planResult = { error: 'plan generation did not run' };
                try {
                    planResult = await generatePlanSpecs(ctx, captain, {
                        goal,
                        mode: clarification.mode,
                        clarification,
                        roles: planRoles.map(role => ({ role, name: ROLE_NAMES[role] ?? role })),
                        workspaceFacts: planFacts,
                        projectRoot,
                        forbiddenPaths,
                    }, planAbort.signal);
                }
                finally {
                    clearTimeout(planTimeout);
                }
                const planSpecs = planResult.specs;
                const planError = planResult.error;
                // Even the template fallback must carry the user's real choices.
                delivery.contextText = [
                    '目标：' + goal,
                    '模式：' + clarification.mode,
                    '平台：' + clarification.platforms.join(' / '),
                    '访谈约束：' + (clarification.constraints.length === 0 ? '无' : clarification.constraints.join('；')),
                    '验收：' + clarification.acceptance.join('；'),
                    '禁止边界：' + (clarification.excluded.length === 0 ? '无' : clarification.excluded.join('；')),
                    '产物根目录：' + projectRoot,
                ].join('\n');
                const basePlan = planSpecs !== undefined
                    ? buildPlanFromSpecs(goal, template, planRoles, planSpecs, delivery)
                    : confinePlanToProject(buildQuickStartPlan(goal, template, roles, delivery), projectRoot);
                assignRequirementCoverage(basePlan.tasks, clarification.constraints.length > 0 ? clarification.constraints : clarification.acceptance, goal);
                // Solo run: no members are created; every task is assigned to the captain.
                const plan = payload.solo === true ? soloPlan(basePlan) : basePlan;
                const replace = payload.replace === true;
                const abort = new AbortController();
                const timeout = setTimeout(() => { abort.abort(); }, 30_000);
                const run = { agent: captain, signal: abort.signal, deferContext() { }, concludeTurn() { } };
                try {
                    if (replace) {
                        // Explicit user choice (red "结束旧宗门并开新宗" button): end the
                        // current sect, including live work, then found the new one. The
                        // delete tool interrupts members and archives the team; the client
                        // only sends replace=true after the user confirms this action.
                        const remove = tools?.get?.('agent_teams_delete');
                        try {
                            await remove?.execute?.({}, run);
                        }
                        catch {
                            // The current team may already be gone; creation decides the real outcome.
                        }
                    }
                    // The create tool's plan schema only carries ordinary task fields, so
                    // the helper stages the roster first and adds every task — with its
                    // quality contract — through create_task, exactly like the captain
                    // does in chat. A failure after creation rolls the team back.
                    const value = await stageQuickStartTeam(plan, goal, run, {
                        create: definition,
                        createTask: taskDefinition,
                        deleteTeam: tools?.get?.('agent_teams_delete'),
                    }, { clarification, ...requirement === undefined ? {} : { requirement } });
                    // Persist how the plan was produced and where it may write, so the
                    // review can show alignment and flag template fallbacks.
                    if (value.teamId !== undefined && value.teamId !== '') {
                        const stateRoot = join(workspace, config.stateDir ?? '.agent-teams');
                        try {
                            await withTeamLock(teamLockKey(stateRoot, value.teamId), async () => {
                                const fresh = await readTeam(stateRoot, value.teamId);
                                if (fresh === undefined)
                                    return;
                                fresh.planSource = planSpecs !== undefined ? 'ai' : 'template';
                                fresh.planProjectRoot = projectRoot;
                                if (planError !== undefined)
                                    fresh.planError = planError;
                                // Solo plans have no members; every task must belong to the captain.
                                if (payload.solo === true) {
                                    for (const task of fresh.tasks)
                                        task.assignee = 'captain';
                                }
                                await writeTeam(stateRoot, fresh);
                                // Persist the core architecture next to the product so later
                                // sessions/members can recover it instead of losing context.
                                syncArchitectureFile(workspace, fresh);
                            });
                        }
                        catch (error) {
                            ctx.logger.warn('agent-teams: plan metadata write failed: ' + String(error));
                        }
                    }
                    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ ok: true, teamId: value.teamId, teamName: value.teamName, phase: value.phase, template: plan.template, tasks: plan.tasks.length }));
                }
                catch (error) {
                    const message = error instanceof Error ? error.message : String(error);
                    // Never auto-delete an existing team here: the client asks the user to
                    // confirm replace, so a plain "found a new sect" cannot wipe the current
                    // run (and its conversation trail) by surprise.
                    ctx.logger.warn(`agent-teams: quick-start failed for ${sessionId}: ${message}`);
                    res.writeHead(422, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: message }));
                }
                finally {
                    clearTimeout(timeout);
                }
            },
        }), 'agent-teams: quick-start route');
        // Module 0: optional requirement polish. One-shot model call; failures
        // degrade to the original text so the wizard never dead-ends.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/polish',
            handler: async (req, res) => {
                if (req.method !== 'POST') {
                    res.writeHead(405, { allow: 'POST', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                let payload;
                try {
                    payload = await readJsonRequest(req);
                }
                catch (error) {
                    res.writeHead(error instanceof RequestBodyError ? error.status : 400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'invalid request body' }));
                    return;
                }
                const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId.trim() : '';
                const requirement = typeof payload.requirement === 'string' ? payload.requirement.trim() : '';
                if (sessionId === '' || requirement === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId and requirement are required' }));
                    return;
                }
                const captain = ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'session is not attached' }));
                    return;
                }
                const mode = isTeamMode(payload.mode) ? payload.mode : DEFAULT_MODE;
                const workspace = captain.session.header.cwd ?? process.cwd();
                const facts = await describeWorkspaceFacts(workspace);
                const abort = new AbortController();
                const timeout = setTimeout(() => { abort.abort(); }, 30_000);
                try {
                    const result = await polishRequirement(ctx, captain, { requirement, workspaceFacts: facts, mode }, abort.signal);
                    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({
                        ok: true,
                        expanded: result.expanded,
                        hidden_conditions: [...result.hiddenConditions],
                        degraded: result.degraded,
                        ...result.error === undefined ? {} : { error: result.error },
                        ...result.model === undefined ? {} : { model: result.model },
                    }));
                }
                catch (error) {
                    const message = error instanceof Error ? error.message : String(error);
                    ctx.logger.warn('agent-teams: polish failed: ' + message);
                    res.writeHead(422, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: message }));
                }
                finally {
                    clearTimeout(timeout);
                }
            },
        }), 'agent-teams: polish route');
        // Module 1: AI-generated clarification options. The static lists are only
        // the degraded fallback; the normal path tailors every section to the request.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/clarify/options',
            handler: async (req, res) => {
                if (req.method !== 'POST') {
                    res.writeHead(405, { allow: 'POST', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                let payload;
                try {
                    payload = await readJsonRequest(req);
                }
                catch (error) {
                    res.writeHead(error instanceof RequestBodyError ? error.status : 400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'invalid request body' }));
                    return;
                }
                const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId.trim() : '';
                const raw = typeof payload.requirement === 'object' && payload.requirement !== null
                    ? payload.requirement
                    : undefined;
                const original = raw !== undefined && typeof raw['original'] === 'string' ? raw['original'].trim() : '';
                if (sessionId === '' || original === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId and requirement.original are required' }));
                    return;
                }
                const requirement = {
                    original,
                    expanded: raw !== undefined && typeof raw['expanded'] === 'string' ? raw['expanded'].trim() : '',
                    conditions: raw !== undefined && Array.isArray(raw['conditions'])
                        ? raw['conditions'].filter((item) => typeof item === 'string')
                        : [],
                };
                const captain = ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'session is not attached' }));
                    return;
                }
                const mode = isTeamMode(payload.mode) ? payload.mode : DEFAULT_MODE;
                const workspace = captain.session.header.cwd ?? process.cwd();
                const facts = await describeWorkspaceFacts(workspace);
                const abort = new AbortController();
                const timeout = setTimeout(() => { abort.abort(); }, 30_000);
                try {
                    const options = await generateClarifyOptions(ctx, captain, { requirement, workspaceFacts: facts, mode }, abort.signal);
                    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ ok: true, options }));
                }
                catch (error) {
                    const message = error instanceof Error ? error.message : String(error);
                    ctx.logger.warn('agent-teams: clarify options failed: ' + message);
                    res.writeHead(422, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: message }));
                }
                finally {
                    clearTimeout(timeout);
                }
            },
        }), 'agent-teams: clarify options route');
        // Dynamic interview: the model asks its own template-like questions instead
        // of the fixed clarification form, then turns the answers into the object
        // the founding flow consumes.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/interview/questions',
            handler: async (req, res) => {
                if (req.method !== 'POST') {
                    res.writeHead(405, { allow: 'POST', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                let payload;
                try {
                    payload = await readJsonRequest(req);
                }
                catch (error) {
                    res.writeHead(error instanceof RequestBodyError ? error.status : 400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'invalid request body' }));
                    return;
                }
                const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId.trim() : '';
                const requirement = typeof payload.requirement === 'string' ? payload.requirement.trim() : '';
                if (sessionId === '' || requirement === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId and requirement are required' }));
                    return;
                }
                const captain = ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'session is not attached' }));
                    return;
                }
                const mode = isTeamMode(payload.mode) ? payload.mode : DEFAULT_MODE;
                const workspace = captain.session.header.cwd ?? process.cwd();
                const facts = await describeWorkspaceFacts(workspace);
                const abort = new AbortController();
                const timeout = setTimeout(() => { abort.abort(); }, 30_000);
                try {
                    const questions = await generateInterviewQuestions(ctx, captain, { requirement, mode, workspaceFacts: facts }, abort.signal);
                    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ ok: true, questions }));
                }
                catch (error) {
                    const message = error instanceof Error ? error.message : String(error);
                    ctx.logger.warn('agent-teams: interview questions failed: ' + message);
                    res.writeHead(422, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: message }));
                }
                finally {
                    clearTimeout(timeout);
                }
            },
        }), 'agent-teams: interview questions route');
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/interview/answers',
            handler: async (req, res) => {
                if (req.method !== 'POST') {
                    res.writeHead(405, { allow: 'POST', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                let payload;
                try {
                    payload = await readJsonRequest(req);
                }
                catch (error) {
                    res.writeHead(error instanceof RequestBodyError ? error.status : 400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'invalid request body' }));
                    return;
                }
                const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId.trim() : '';
                const requirement = typeof payload.requirement === 'string' ? payload.requirement.trim() : '';
                if (sessionId === '' || requirement === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId and requirement are required' }));
                    return;
                }
                const captain = ctx.agents.get(sessionId);
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'session is not attached' }));
                    return;
                }
                const rawAnswers = Array.isArray(payload.answers) ? payload.answers : [];
                const answers = rawAnswers.flatMap(item => {
                    if (typeof item !== 'object' || item === null)
                        return [];
                    const record = item;
                    const question = typeof record.question === 'string' ? record.question : '';
                    const answer = Array.isArray(record.answer) ? record.answer.filter((value) => typeof value === 'string') : [];
                    if (question === '')
                        return [];
                    return [{ question, answer }];
                });
                const mode = isTeamMode(payload.mode) ? payload.mode : DEFAULT_MODE;
                const abort = new AbortController();
                const timeout = setTimeout(() => { abort.abort(); }, 30_000);
                try {
                    const clarification = await generateClarificationFromAnswers(ctx, captain, { requirement, mode, answers }, abort.signal);
                    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ ok: true, clarification }));
                }
                catch (error) {
                    const message = error instanceof Error ? error.message : String(error);
                    ctx.logger.warn('agent-teams: interview answers failed: ' + message);
                    res.writeHead(422, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: message }));
                }
                finally {
                    clearTimeout(timeout);
                }
            },
        }), 'agent-teams: interview answers route');
        // Whether the optional memory brain is reachable: the banner shows
        // 已连接大脑 only when a real probe succeeds, otherwise the install hint.
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/memory/status',
            handler: async (req, res) => {
                if (req.method !== 'GET') {
                    res.writeHead(405, { allow: 'GET', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                const connected = await probeMemory(config.memory?.endpoint);
                res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                res.end(JSON.stringify({ connected }));
            },
        }), 'agent-teams: memory status route');
        ctx.effect(() => webServer.register({
            kind: 'exact',
            path: '/plugins/dsh-pixel-team/plan',
            handler: async (req, res) => {
                if (req.method !== 'POST') {
                    res.writeHead(405, { allow: 'POST', 'cache-control': 'no-store' });
                    res.end();
                    return;
                }
                let payload;
                try {
                    payload = await readJsonRequest(req);
                }
                catch (error) {
                    res.writeHead(error instanceof RequestBodyError ? error.status : 400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'invalid request body' }));
                    return;
                }
                const sessionId = typeof payload['sessionId'] === 'string' ? payload['sessionId'].trim() : '';
                const teamId = typeof payload['teamId'] === 'string' ? payload['teamId'].trim() : '';
                const action = typeof payload['action'] === 'string' ? payload['action'] : '';
                if (sessionId === '' || teamId === '' || action === '') {
                    res.writeHead(400, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'sessionId, teamId, and action are required' }));
                    return;
                }
                const captain = ctx.agents.get(sessionId);
                let workspace = captain?.session.header.cwd ?? process.cwd();
                let stateRoot = join(workspace, resolved.stateDir);
                let team = captain === undefined
                    ? undefined
                    : await findTeamByCaptain(stateRoot, captain.id, await leadIdentityOfAsync(ctx, captain.session));
                if ((team === undefined || team.id !== teamId) && action === 'discard' && captain === undefined) {
                    for (const candidateWorkspace of workspaceRegistry.list()) {
                        const candidateRoot = join(candidateWorkspace.path, resolved.stateDir);
                        const candidate = await readTeam(candidateRoot, teamId);
                        if (candidate?.phase === 'staged') {
                            workspace = candidateWorkspace.path;
                            stateRoot = candidateRoot;
                            team = candidate;
                            break;
                        }
                    }
                }
                if (captain === undefined && action !== 'discard') {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'captain session is not attached' }));
                    return;
                }
                if (team === undefined || team.id !== teamId) {
                    res.writeHead(404, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'team not found for this captain' }));
                    return;
                }
                if (action === 'discard') {
                    if (captain === undefined) {
                        await archiveTeamDir(stateRoot, teamId);
                        res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                        res.end(JSON.stringify({ ok: true, phase: 'archived', teamId }));
                        return;
                    }
                    const discarded = await agentTeamsRuntime.discardStagedTeam(captain, teamId);
                    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ ok: true, phase: 'archived', ...discarded }));
                    return;
                }
                if (captain === undefined) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: 'captain session is not attached' }));
                    return;
                }
                try {
                    if (action === 'approve') {
                        const approved = await agentTeamsRuntime.approveStagedTeam(captain, teamId);
                        // The browser receives the HTTP result, so the model needs its own
                        // control message. steer wakes an idle captain or joins its next
                        // step; the tool approve path already returns to the model itself.
                        try {
                            captain.steer(createUserMessage({
                                content: [{ type: 'text', text: stagedPlanApprovedContext(team.name) + (approved.members === 0 ? '\n\n' + soloExecutionContext(team.name) : '') }],
                                source: agentTeamsSource({ kind: 'agent-teams' }, observedSessionFormatVersion(captain)),
                            }));
                        }
                        catch (error) {
                            // Approval is already committed. Do not report a failed approval
                            // and invite a retry that could duplicate the user's action.
                            ctx.logger.warn(`agent-teams: approval notification failed for ${teamId}: ${String(error)}`);
                        }
                        res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                        res.end(JSON.stringify({ ok: true, phase: 'running', ...approved }));
                        return;
                    }
                    if (action === 'continue') {
                        const continued = await agentTeamsRuntime.continueStagedPlanning(captain, teamId);
                        res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                        res.end(JSON.stringify({ ok: true, phase: 'staged', review: 'awaiting_feedback', ...continued }));
                        return;
                    }
                    const dependencies = Array.isArray(payload['dependencies'])
                        ? payload['dependencies'].filter((item) => typeof item === 'string')
                        : [];
                    let mutation;
                    if (action === 'update_member') {
                        if (typeof payload['memberName'] !== 'string'
                            || typeof payload['provider'] !== 'string'
                            || typeof payload['model'] !== 'string')
                            throw new Error('memberName, provider, and model are required');
                        mutation = {
                            action,
                            memberName: payload['memberName'],
                            provider: payload['provider'],
                            model: payload['model'],
                            ...typeof payload['role'] === 'string' || payload['role'] === null ? { role: payload['role'] } : {},
                            ...typeof payload['reasoningEffort'] === 'string' || payload['reasoningEffort'] === null
                                ? { reasoningEffort: payload['reasoningEffort'] }
                                : {},
                            ...typeof payload['executionPrompt'] === 'string' || payload['executionPrompt'] === null
                                ? { executionPrompt: payload['executionPrompt'] }
                                : {},
                            ...typeof payload['tool_policy'] === 'string' ? { toolPolicy: payload['tool_policy'] } : {},
                        };
                    }
                    else if (action === 'update_task') {
                        if (typeof payload['taskId'] !== 'string' || typeof payload['subject'] !== 'string') {
                            throw new Error('taskId and subject are required');
                        }
                        mutation = {
                            action,
                            taskId: payload['taskId'],
                            subject: payload['subject'],
                            dependencies,
                            ...typeof payload['description'] === 'string' || payload['description'] === null
                                ? { description: payload['description'] }
                                : {},
                            ...typeof payload['assignee'] === 'string' || payload['assignee'] === null
                                ? { assignee: payload['assignee'] }
                                : {},
                        };
                    }
                    else if (action === 'add_task') {
                        if (typeof payload['subject'] !== 'string')
                            throw new Error('subject is required');
                        mutation = {
                            action,
                            subject: payload['subject'],
                            dependencies,
                            ...typeof payload['description'] === 'string' || payload['description'] === null
                                ? { description: payload['description'] }
                                : {},
                            ...typeof payload['assignee'] === 'string' || payload['assignee'] === null
                                ? { assignee: payload['assignee'] }
                                : {},
                        };
                    }
                    else if (action === 'remove_task') {
                        if (typeof payload['taskId'] !== 'string')
                            throw new Error('taskId is required');
                        mutation = { action, taskId: payload['taskId'] };
                    }
                    else {
                        throw new Error(`unknown plan action "${action}"`);
                    }
                    const updated = await agentTeamsRuntime.updateStagedPlan(captain, teamId, mutation);
                    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ ok: true, phase: updated.phase, members: updated.members.length, tasks: updated.tasks.length }));
                }
                catch (error) {
                    res.writeHead(409, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
                    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'plan operation failed' }));
                }
            },
        }), 'agent-teams: plan route');
        // Cultivation artwork: serve the packaged 道途 portraits and state icons to
        // the activity panel. An explicit allowlist guards the route (no path
        // traversal); the images ship with the bundle (files: assets/).
        const artDir = fileURLToPath(new URL('../assets/agent-teams/', import.meta.url));
        const ART_ALLOWLIST = new Set([
            'avatar-captain.png',
            'avatar-planner.png', 'avatar-implementer.png', 'avatar-verifier.png',
            'avatar-reviewer.png', 'avatar-researcher.png', 'avatar-analyst.png',
            'avatar-writer.png', 'avatar-auditor.png', 'avatar-architect.png',
            'avatar-tester.png', 'avatar-documenter.png', 'avatar-operator.png',
            'avatar-talisman.png', 'avatar-healer.png', 'avatar-beastmaster.png',
            'avatar-puppeteer.png', 'avatar-musician.png', 'avatar-poisoner.png',
            'avatar-monk.png', 'avatar-demon.png',
            'state-working.png', 'state-idle.png', 'state-unknown.png',
        ]);
        ctx.effect(() => webServer.register({
            kind: 'prefix',
            path: '/plugins/dsh-pixel-team/assets',
            handler: async (req, res) => {
                let name;
                try {
                    name = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname.split('/').pop() ?? '');
                }
                catch {
                    // Malformed percent-encoding: treat as an unknown asset, not a 400.
                    res.writeHead(404);
                    res.end();
                    return;
                }
                if (!ART_ALLOWLIST.has(name)) {
                    res.writeHead(404);
                    res.end();
                    return;
                }
                try {
                    const data = await readFile(join(artDir, name));
                    res.writeHead(200, {
                        'content-type': 'image/png',
                        'cache-control': 'public, max-age=86400',
                    });
                    res.end(data);
                }
                catch (error) {
                    ctx.logger.warn(`agent-teams: artwork read failed for ${name}: ${String(error)}`);
                    res.writeHead(404);
                    res.end();
                }
            },
        }), 'agent-teams: artwork route');
        // Community / sponsor QR images: same allowlist discipline as the artwork
        // route, but from assets/support with their real media types.
        const supportDir = fileURLToPath(new URL('../assets/support/', import.meta.url));
        const SUPPORT_ASSETS = new Map([
            ['group-qr.jpg', 'image/jpeg'],
            ['group-wechat.jpg', 'image/jpeg'],
            ['wechat-pay.jpg', 'image/jpeg'],
            ['wechat-reward.jpg', 'image/jpeg'],
        ]);
        ctx.effect(() => webServer.register({
            kind: 'prefix',
            path: '/plugins/dsh-pixel-team/support',
            handler: async (req, res) => {
                let name;
                try {
                    name = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname.split('/').pop() ?? '');
                }
                catch {
                    res.writeHead(404);
                    res.end();
                    return;
                }
                const mediaType = SUPPORT_ASSETS.get(name);
                if (mediaType === undefined) {
                    res.writeHead(404);
                    res.end();
                    return;
                }
                try {
                    const data = await readFile(join(supportDir, name));
                    res.writeHead(200, { 'content-type': mediaType, 'cache-control': 'public, max-age=86400' });
                    res.end(data);
                }
                catch (error) {
                    ctx.logger.warn(`agent-teams: support asset read failed for ${name}: ${String(error)}`);
                    res.writeHead(404);
                    res.end();
                }
            },
        }), 'agent-teams: support assets');
    };
    registerWebSurface();
    ctx.on('internal/service', (name) => {
        if (WEB_SERVER_KEYS.includes(name)
            || WORKSPACE_KEYS.includes(name)) {
            registerWebSurface();
        }
    });
}
