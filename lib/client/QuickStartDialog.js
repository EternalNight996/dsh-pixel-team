import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Click-to-dispatch entry: a header button that stages a plan from a small wizard. */
import { useEffect, useMemo, useRef, useState } from 'react';
import css from './QuickStartDialog.module.css';
import { memberArtUrl } from "./artwork.js";
import { OPEN_HALL_SHEET_EVENT } from "./hall-events.js";
import { TEAM_CREATED_EVENT } from "./team-reveal.js";
import { ROLE_META } from "./role-labels.js";
import { SECT_PRESETS, randomSect, sectPreset } from "./sects.js";
import { InterviewSheet } from "./InterviewSheet.js";
import { DEFAULT_MODE, TEAM_MODES, getModeSpec } from "../modes.js";
const TEMPLATES = [
    // 开山立业 is the default founding intent: it leads the doctrine list.
    { id: 'feat', labelKey: 'quickstart.tplFeat', descKey: 'quickstart.desc.feat', roles: ['planner', 'implementer', 'verifier', 'reviewer'] },
    { id: 'drama', labelKey: 'quickstart.tplDrama', descKey: 'quickstart.desc.drama', roles: ['planner', 'writer', 'implementer', 'reviewer'] },
    { id: 'fix', labelKey: 'quickstart.tplFix', descKey: 'quickstart.desc.fix', roles: ['implementer', 'verifier', 'reviewer'] },
    { id: 'research', labelKey: 'quickstart.tplResearch', descKey: 'quickstart.desc.research', roles: ['researcher', 'analyst', 'writer', 'reviewer'] },
    { id: 'fullstack', labelKey: 'quickstart.tplFullstack', descKey: 'quickstart.desc.fullstack', roles: ['integrator', 'frontend', 'backend', 'verifier', 'reviewer'] },
    { id: 'hardening', labelKey: 'quickstart.tplHardening', descKey: 'quickstart.desc.hardening', roles: ['auditor', 'security', 'verifier', 'reviewer'] },
    { id: 'audit', labelKey: 'quickstart.tplAudit', descKey: 'quickstart.desc.audit', roles: ['auditor', 'reviewer'] },
    { id: 'build', labelKey: 'quickstart.tplBuild', descKey: 'quickstart.desc.build', roles: ['implementer', 'verifier', 'operator'] },
    { id: 'array', labelKey: 'quickstart.tplArray', descKey: 'quickstart.desc.array', roles: ['architect', 'implementer', 'verifier', 'reviewer'] },
    { id: 'docs', labelKey: 'quickstart.tplDocs', descKey: 'quickstart.desc.docs', roles: ['writer', 'documenter', 'reviewer'] },
    { id: 'debate', labelKey: 'quickstart.tplDebate', descKey: 'quickstart.desc.debate', roles: ['researcher', 'analyst', 'reviewer'] },
];
const QUICK_START_DRAFT_PREFIX = 'dsh-pixel-team.quickstart.';
function readQuickStartDraft(sessionId) {
    try {
        const raw = window.localStorage.getItem(QUICK_START_DRAFT_PREFIX + sessionId);
        if (raw === null)
            return undefined;
        const value = JSON.parse(raw);
        if (typeof value !== 'object' || value === null)
            return undefined;
        return {
            step: typeof value.step === 'number' ? value.step : 0,
            mode: typeof value.mode === 'string' && TEAM_MODES.includes(value.mode) ? value.mode : DEFAULT_MODE,
            goal: typeof value.goal === 'string' ? value.goal : '',
            template: typeof value.template === 'string' ? value.template : (TEMPLATES[0]?.id ?? 'fix'),
            roles: Array.isArray(value.roles) ? value.roles.filter((role) => typeof role === 'string') : [...(TEMPLATES[0]?.roles ?? [])],
            sectMode: typeof value.sectMode === 'string' ? value.sectMode : 'random',
            rolledSect: typeof value.rolledSect === 'string' ? value.rolledSect : randomSect().id,
            projectKind: value.projectKind === 'drama' ? 'drama' : 'engineering',
            solo: value.solo === true,
            superFast: value.superFast === true,
            questions: Array.isArray(value.questions) ? value.questions : [],
            answers: typeof value.answers === 'object' && value.answers !== null ? value.answers : {},
            submitting: value.submitting === true,
            submittedAt: typeof value.submittedAt === 'number' ? value.submittedAt : 0,
        };
    }
    catch {
        return undefined;
    }
}
function saveQuickStartDraft(sessionId, draft) {
    try {
        window.localStorage.setItem(QUICK_START_DRAFT_PREFIX + sessionId, JSON.stringify(draft));
    }
    catch { /* private mode */ }
}
function clearQuickStartDraft(sessionId) {
    try {
        window.localStorage.removeItem(QUICK_START_DRAFT_PREFIX + sessionId);
    }
    catch { /* private mode */ }
}
async function findRecentStagedTeam(sessionId, since) {
    try {
        const response = await fetch('/plugins/dsh-pixel-team/state', { cache: 'no-store' });
        const body = await response.json();
        const found = (body.teams ?? []).find(team => team.captainSessionId === sessionId
            && team.phase === 'staged'
            && (team.createdAt ?? 0) >= since - 5_000);
        if (found?.teamId === undefined)
            return undefined;
        return { teamId: found.teamId, name: found.teamName ?? found.name ?? found.teamId };
    }
    catch {
        return undefined;
    }
}
/** 开宗步骤：立派之志 → 道统 → AI 访谈 → 宗门 → 立誓。 */
const STEPS = ['vow', 'doctrine', 'interview', 'sect', 'oath'];
const SOLO_STEPS = ['vow', 'doctrine', 'interview', 'oath'];
const STEP_LABEL = {
    doctrine: 'quickstart.stepDoctrine',
    vow: 'quickstart.stepVow',
    interview: 'quickstart.stepInterview',
    sect: 'quickstart.stepSect',
    oath: 'quickstart.stepOath',
};
/** Template questions used only when the host/model cannot answer. */
function fallbackInterviewQuestions(mode) {
    const spec = getModeSpec(mode);
    return [
        { id: 'platform', prompt: '目标运行平台？', multi: true, options: ['Windows', 'Linux (UOS/麒麟)', 'macOS', 'Android', 'iOS'] },
        { id: 'acceptance', prompt: '验收以哪条为准？', multi: true, options: [...spec.acceptanceDefaults] },
        { id: 'excluded', prompt: '哪些事情明确不做？', multi: true, options: [...spec.defaultExcluded] },
    ];
}
/** Minimum valid clarification when the answer route is unavailable. */
function fallbackClarification(mode) {
    const spec = getModeSpec(mode);
    return {
        type: 'software',
        scale: 'small',
        mode,
        ui: { styles: [] },
        platforms: ['Windows'],
        hardwareList: [],
        constraints: [],
        excluded: [...spec.defaultExcluded],
        acceptance: [...spec.acceptanceDefaults],
        memoryHints: [],
    };
}
function templateOf(id) {
    return TEMPLATES.find(entry => entry.id === id) ?? TEMPLATES[0];
}
export function QuickStartWizard({ sessionId, existingTeam, t, onDone, onFounded }) {
    const [draft] = useState(() => readQuickStartDraft(sessionId));
    const [step, setStep] = useState(() => draft?.step ?? 0);
    // Development mode drives polish, options, constitution and the member persona.
    const [mode, setMode] = useState(() => draft?.mode ?? DEFAULT_MODE);
    const [projectKind, setProjectKind] = useState(() => draft?.projectKind ?? 'engineering');
    const [goal, setGoal] = useState(() => draft?.goal ?? '');
    const [template, setTemplate] = useState(() => draft?.template ?? TEMPLATES[0]?.id ?? 'fix');
    const [roles, setRoles] = useState(() => draft?.roles ?? [...(TEMPLATES[0]?.roles ?? [])]);
    // 门派有两种玩法：用户选一个预设，或让系统随机动态分配（再点一次重抽）。
    const [sectMode, setSectMode] = useState(() => draft?.sectMode ?? 'random');
    const [rolledSect, setRolledSect] = useState(() => draft?.rolledSect ?? randomSect().id);
    const [customRole, setCustomRole] = useState('');
    const [rolesOpen, setRolesOpen] = useState(false);
    // Solo run: no members are spawned; the captain executes every task itself.
    const [solo, setSolo] = useState(() => draft?.solo ?? false);
    const [superFast, setSuperFast] = useState(() => draft?.superFast ?? false);
    const [submitting, setSubmitting] = useState(() => draft?.submitting ?? false);
    const [submittedAt, setSubmittedAt] = useState(() => draft?.submittedAt ?? 0);
    const steps = solo ? SOLO_STEPS : STEPS;
    const submitActive = useRef(false);
    useEffect(() => {
        if (step > steps.length - 1)
            setStep(steps.length - 1);
    }, [step, steps.length]);
    const [developerMode] = useState(() => {
        try {
            return window.localStorage.getItem('dsh-pixel-team.dev') === '1';
        }
        catch {
            return false;
        }
    });
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [created, setCreated] = useState();
    // Module 0: AI polish writes straight back into the goal textarea.
    const [polishBusy, setPolishBusy] = useState(false);
    const [polishError, setPolishError] = useState('');
    // Module 1: the model generates its own questions from this requirement.
    const [interviewQuestions, setInterviewQuestions] = useState(() => draft?.questions ?? []);
    const [interviewAnswers, setInterviewAnswers] = useState(() => draft?.answers ?? {});
    const [interviewState, setInterviewState] = useState(() => draft?.questions?.length ? 'ready' : 'loading');
    const [interviewError, setInterviewError] = useState('');
    const [interviewNonce, setInterviewNonce] = useState(0);
    const multiRef = useRef(null);
    const goalRef = useRef(null);
    const sessionRef = useRef(sessionId);
    const hydratingDraft = useRef(false);
    const foundedTimer = useRef(undefined);
    useEffect(() => () => {
        if (foundedTimer.current !== undefined)
            window.clearTimeout(foundedTimer.current);
    }, []);
    useEffect(() => {
        if (sessionRef.current === sessionId)
            return;
        sessionRef.current = sessionId;
        hydratingDraft.current = true;
        // A request belongs to the session that started it; switching conversations
        // must not carry its spinner/error into the new one.
        setBusy(false);
        setError('');
        setCreated(undefined);
        setPolishBusy(false);
        setPolishError('');
        submitActive.current = false;
        const next = readQuickStartDraft(sessionId);
        setStep(next?.step ?? 0);
        setMode(next?.mode ?? DEFAULT_MODE);
        setGoal(next?.goal ?? '');
        setTemplate(next?.template ?? TEMPLATES[0]?.id ?? 'fix');
        setRoles(next?.roles ?? [...(TEMPLATES[0]?.roles ?? [])]);
        setSectMode(next?.sectMode ?? 'random');
        setRolledSect(next?.rolledSect ?? randomSect().id);
        setProjectKind(next?.projectKind ?? 'engineering');
        setSolo(next?.solo ?? false);
        setSuperFast(next?.superFast ?? false);
        setSubmitting(next?.submitting ?? false);
        setSubmittedAt(next?.submittedAt ?? 0);
        setInterviewQuestions(next?.questions ?? []);
        setInterviewAnswers(next?.answers ?? {});
        setInterviewState(next?.questions?.length ? 'ready' : 'loading');
    }, [sessionId]);
    // 同一会话的草稿跨切换保留：访谈问题、答案、当前步骤都不重新生成。
    useEffect(() => {
        if (sessionRef.current !== sessionId)
            return;
        if (hydratingDraft.current) {
            hydratingDraft.current = false;
            return;
        }
        saveQuickStartDraft(sessionId, {
            step, mode, goal, template, roles, sectMode, rolledSect, projectKind, solo, superFast,
            questions: interviewQuestions, answers: interviewAnswers, submitting, submittedAt,
        });
    }, [sessionId, step, mode, goal, template, roles, sectMode, rolledSect, projectKind, solo, superFast, interviewQuestions, interviewAnswers, submitting, submittedAt]);
    // If the wizard unmounts while 立誓 is in flight (window/session switch), the
    // request may finish without its React callback. Recover the new staged team
    // from the host snapshot instead of leaving the oath screen stuck.
    useEffect(() => {
        if (!submitting || submittedAt === 0)
            return;
        // The owning request is still running in this component; its catch/finally
        // will report the real result. Only an orphaned submit (remount) recovers.
        if (submitActive.current)
            return;
        let alive = true;
        let timer;
        const started = Date.now();
        setBusy(true);
        const poll = async () => {
            if (!alive)
                return;
            try {
                const response = await fetch('/plugins/dsh-pixel-team/state', { cache: 'no-store' });
                const body = await response.json();
                const found = (body.teams ?? []).find(team => team.captainSessionId === sessionId
                    && team.phase === 'staged'
                    && (team.createdAt ?? 0) >= submittedAt - 5_000);
                if (found?.teamId !== undefined) {
                    alive = false;
                    if (timer !== undefined)
                        window.clearInterval(timer);
                    setSubmitting(false);
                    setSubmittedAt(0);
                    clearQuickStartDraft(sessionId);
                    setBusy(false);
                    setCreated(t('quickstart.created', {
                        team: found.teamName ?? found.name ?? found.teamId,
                        sect: activeSect === undefined ? t('quickstart.sectCustomPicked') : t(activeSect.nameKey),
                    }));
                    window.dispatchEvent(new CustomEvent(TEAM_CREATED_EVENT, { detail: { teamId: found.teamId, sessionId } }));
                    onFounded?.();
                    return;
                }
            }
            catch { /* keep polling */ }
            if (Date.now() - started > 180_000) {
                alive = false;
                if (timer !== undefined)
                    window.clearInterval(timer);
                setSubmitting(false);
                setSubmittedAt(0);
                setBusy(false);
                setError(t('quickstart.generationLost'));
            }
        };
        void poll();
        timer = window.setInterval(() => { void poll(); }, 1_500);
        return () => { alive = false; if (timer !== undefined)
            window.clearInterval(timer); };
    }, [submitting, submittedAt, sessionId]);
    useEffect(() => {
        if (!rolesOpen)
            return;
        const onPointerDown = (event) => {
            if (multiRef.current === null)
                return;
            if (!multiRef.current.contains(event.target))
                setRolesOpen(false);
        };
        document.addEventListener('pointerdown', onPointerDown);
        return () => { document.removeEventListener('pointerdown', onPointerDown); };
    }, [rolesOpen]);
    const close = () => {
        if (busy)
            return;
        onDone?.();
    };
    const activeSect = sectMode === 'custom' ? undefined : sectPreset(sectMode === 'random' ? rolledSect : sectMode);
    const sectRoles = activeSect?.roles ?? roles;
    const chooseTemplate = (id) => {
        setTemplate(id);
        // 门派已经配好道途时，换模板不再覆盖这套道途（自定义模式才跟随模板）。
        if (sectMode === 'custom')
            setRoles([...templateOf(id).roles]);
    };
    const chooseProjectKind = (kind) => {
        setProjectKind(kind);
        const next = kind === 'drama' ? 'drama' : 'feat';
        setTemplate(next);
        setRoles([...templateOf(next).roles]);
        setInterviewQuestions([]);
        setInterviewAnswers({});
        setInterviewState('loading');
    };
    const visibleTemplates = projectKind === 'drama'
        ? TEMPLATES.filter(entry => entry.id === 'drama')
        : TEMPLATES.filter(entry => entry.id !== 'drama');
    const chooseSect = (id) => {
        setSectMode(id);
        const preset = sectPreset(id);
        if (preset !== undefined)
            setRoles([...preset.roles]);
    };
    const rollSect = () => {
        const next = randomSect(rolledSect);
        setRolledSect(next.id);
        setSectMode('random');
        setRoles([...next.roles]);
    };
    const chooseCustom = () => {
        setSectMode('custom');
        if (roles.length === 0)
            setRoles([...templateOf(template).roles]);
    };
    const toggleRole = (role) => {
        setRoles((current) => current.includes(role) ? current.filter(entry => entry !== role) : [...current, role]);
    };
    const roleName = (id) => {
        const meta = ROLE_META.find(entry => entry.id === id);
        return meta === undefined ? id : t(meta.nameKey);
    };
    /** 一枚修士 chip：优先用像素人立绘，找不到对应道途时退回首字徽记。 */
    const personChip = (role) => {
        const label = roleName(role);
        const art = memberArtUrl(label, role);
        return (_jsxs("span", { className: css.chip, title: role, children: [art === null
                    ? _jsx("span", { className: css.chipLetter, "aria-hidden": true, children: label.slice(0, 1) })
                    : _jsx("img", { className: css.chipAvatar, src: art, alt: "" }), label] }, role));
    };
    const addCustomRole = () => {
        const trimmed = customRole.trim();
        if (trimmed === '')
            return;
        setRoles((current) => current.includes(trimmed) ? current : [...current, trimmed]);
        setCustomRole('');
    };
    const goalTrimmed = goal.trim();
    const runPolish = async () => {
        if (goalTrimmed === '') {
            setPolishError(t('quickstart.goalRequired'));
            return;
        }
        setPolishBusy(true);
        setPolishError('');
        try {
            const response = await fetch('/plugins/dsh-pixel-team/polish', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ sessionId, requirement: goalTrimmed, mode }),
            });
            const body = await response.json().catch(() => null);
            if (!response.ok || body?.ok !== true)
                throw new Error(body?.error ?? ('HTTP ' + response.status));
            // Insert the polished text into the input; the user decides the next step.
            const expanded = (body.expanded ?? goalTrimmed).trim();
            setGoal(expanded);
            if (body.degraded === true) {
                setPolishError(t('polish.degradedDetail', { error: body.error ?? t('polish.degraded') }));
            }
            else if (expanded === goalTrimmed) {
                setPolishError(t('polish.unchanged'));
            }
        }
        catch (cause) {
            setPolishError(cause instanceof Error ? cause.message : String(cause));
        }
        finally {
            setPolishBusy(false);
        }
    };
    // Ask the model for template-like questions when the interview step opens.
    useEffect(() => {
        if (steps[step] !== 'interview' || goalTrimmed === '' || interviewQuestions.length > 0)
            return;
        const controller = new AbortController();
        setInterviewState('loading');
        setInterviewError('');
        setInterviewQuestions([]);
        void (async () => {
            try {
                const response = await fetch('/plugins/dsh-pixel-team/interview/questions', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ sessionId, mode, requirement: goalTrimmed }),
                    signal: controller.signal,
                });
                const body = await response.json().catch(() => null);
                if (!response.ok || body?.ok !== true || !Array.isArray(body.questions)) {
                    throw new Error(body?.error ?? ('HTTP ' + response.status));
                }
                setInterviewQuestions(body.questions);
                setInterviewAnswers({});
                setInterviewState('ready');
            }
            catch (cause) {
                if (controller.signal.aborted)
                    return;
                setInterviewError(cause instanceof Error ? cause.message : String(cause));
                setInterviewQuestions(fallbackInterviewQuestions(mode));
                setInterviewState('fallback');
            }
        })();
        return () => { controller.abort(); };
    }, [step, goalTrimmed, sessionId, mode, interviewNonce]);
    const currentStep = steps[step] ?? steps[0];
    const canAdvance = useMemo(() => {
        // Never advance while polish is still running: the result is about to land
        // in the goal textarea.
        if (busy || polishBusy)
            return false;
        switch (currentStep) {
            case 'vow': return goalTrimmed.length >= 2;
            case 'interview': return interviewState !== 'loading' && interviewQuestions.length > 0;
            case 'sect': return solo || sectMode !== 'custom' || sectRoles.length > 0;
            default: return true;
        }
    }, [busy, polishBusy, currentStep, goalTrimmed, interviewState, interviewQuestions.length, sectMode, sectRoles.length, solo]);
    const submit = async (replace) => {
        if (goalTrimmed === '') {
            setError(t('quickstart.goalRequired'));
            setStep(0);
            return;
        }
        if (sessionId === undefined) {
            setError(t('quickstart.sessionMissing'));
            return;
        }
        setBusy(true);
        setError('');
        submitActive.current = true;
        const startedAt = Date.now();
        const requestSession = sessionId;
        setSubmitting(true);
        setSubmittedAt(startedAt);
        saveQuickStartDraft(sessionId, {
            step, mode, goal, template, roles, sectMode, rolledSect, projectKind, solo, superFast,
            questions: interviewQuestions, answers: interviewAnswers,
            submitting: true, submittedAt: startedAt,
        });
        try {
            // Build the clarification deterministically from the mode baseline + the
            // interview answers, so founding needs only ONE model round (plan
            // generation) instead of two and the wait is shorter.
            const interviewNotes = interviewQuestions
                .map(question => ({ question: question.prompt, answer: interviewAnswers[question.id] ?? [] }))
                .filter(item => item.answer.length > 0)
                .map(item => item.question + '：' + item.answer.join(' / '));
            const base = fallbackClarification(mode);
            const projectKindNote = projectKind === 'drama' ? '项目类型：短剧任务（剧本/分镜/视觉资产/视频镜头，可通过 TapNow 生成）' : '项目类型：工程任务';
            const clarification = {
                ...base,
                constraints: [...base.constraints, projectKindNote, ...interviewNotes].slice(0, 20),
            };
            const fullBody = {
                sessionId,
                mode,
                goal: goalTrimmed,
                template,
                roles: solo ? [] : sectMode === 'custom' ? roles : [...(activeSect?.roles ?? roles)],
                solo,
                projectKind,
                replace: replace || existingTeam === true,
                fast: superFast,
                clarification,
            };
            let response = await fetch('/plugins/dsh-pixel-team/quick-start', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(fullBody),
            });
            let text = await response.text();
            let body = null;
            try {
                body = text === '' ? null : JSON.parse(text);
            }
            catch {
                body = null;
            }
            if (sessionRef.current !== requestSession)
                return;
            // Some hosts reject the full clarification body with an empty 400. Retry
            // with a minimal founding request that the server fills with defaults.
            if (response.status === 400) {
                response = await fetch('/plugins/dsh-pixel-team/quick-start', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ sessionId, mode, goal: goalTrimmed, template: projectKind === 'drama' ? 'drama' : 'fix', solo, replace: true, fast: true, minimal: true }),
                });
                text = await response.text();
                try {
                    body = text === '' ? null : JSON.parse(text);
                }
                catch {
                    body = null;
                }
            }
            if (body?.existing === true && body.teamId !== undefined) {
                setSubmitting(false);
                setSubmittedAt(0);
                clearQuickStartDraft(sessionId);
                setCreated(t('quickstart.created', {
                    team: body.teamName ?? body.teamId,
                    sect: solo ? t('quickstart.soloSectName') : (activeSect === undefined ? t('quickstart.sectCustomPicked') : t(activeSect.nameKey)),
                }));
                window.dispatchEvent(new CustomEvent(TEAM_CREATED_EVENT, { detail: { teamId: body.teamId, sessionId, team: body.team } }));
                setGoal('');
                foundedTimer.current = window.setTimeout(() => { onFounded?.(); }, 300);
                return;
            }
            if (!response.ok || body?.ok !== true) {
                const raw = body?.error ?? ('HTTP ' + response.status + (text.trim() === '' ? '' : ': ' + text.trim().slice(0, 200)));
                throw new Error(raw);
            }
            setCreated(t('quickstart.created', {
                team: body.teamName ?? body.teamId ?? '',
                sect: activeSect === undefined ? t('quickstart.sectCustomPicked') : t(activeSect.nameKey),
            }));
            if (body.teamId !== undefined)
                window.dispatchEvent(new CustomEvent(TEAM_CREATED_EVENT, { detail: { teamId: body.teamId, sessionId, team: body.team } }));
            setSubmitting(false);
            setSubmittedAt(0);
            clearQuickStartDraft(sessionId);
            setGoal('');
            foundedTimer.current = window.setTimeout(() => { onFounded?.(); }, 300);
        }
        catch (cause) {
            if (sessionRef.current !== requestSession)
                return;
            // The server can create the staged team and still lose/abort the response.
            // Recover it by creation time before reporting a failure.
            const found = await findRecentStagedTeam(sessionId, startedAt);
            if (found !== undefined) {
                setSubmitting(false);
                setSubmittedAt(0);
                clearQuickStartDraft(sessionId);
                setCreated(t('quickstart.created', {
                    team: found.name,
                    sect: activeSect === undefined ? t('quickstart.sectCustomPicked') : t(activeSect.nameKey),
                }));
                window.dispatchEvent(new CustomEvent(TEAM_CREATED_EVENT, { detail: { teamId: found.teamId, sessionId } }));
                setGoal('');
                foundedTimer.current = window.setTimeout(() => { onFounded?.(); }, 300);
                return;
            }
            setSubmitting(false);
            setSubmittedAt(0);
            setError(cause instanceof Error ? cause.message : String(cause));
        }
        finally {
            if (sessionRef.current === requestSession) {
                submitActive.current = false;
                setBusy(false);
            }
        }
    };
    const goTo = (next) => {
        if (busy)
            return;
        setError('');
        setStep(Math.max(0, Math.min(steps.length - 1, next)));
    };
    const next = () => {
        if (step === steps.length - 1) {
            void submit(false);
            return;
        }
        if (!canAdvance)
            return;
        // 超级快速跳过 AI 访谈；单掌门模式由 active steps 直接跳到立誓。
        if (currentStep === 'vow' && superFast) {
            goTo(steps.indexOf('oath'));
            return;
        }
        goTo(step + 1);
    };
    const doctrineName = t(templateOf(template).labelKey);
    const sectName = solo ? t('quickstart.soloSectName') : (activeSect === undefined ? t('quickstart.sectCustom') : t(activeSect.nameKey));
    const roster = sectMode === 'custom' ? roles : [...sectRoles];
    return (_jsxs("div", { className: css.wizard, children: [_jsxs("div", { className: css.form, children: [_jsx("ol", { className: css.steps, "aria-label": t('quickstart.title'), children: steps.map((entry, index) => {
                            const state = index === step ? 'current' : index < step ? 'done' : 'todo';
                            return (_jsx("li", { className: css.stepItem, "data-state": state, children: _jsxs("button", { type: "button", className: css.stepButton, "data-control": 'quickstart-step-' + index, "aria-current": state === 'current' ? 'step' : undefined, disabled: busy || polishBusy || index > step, onClick: () => { goTo(index); }, children: [_jsx("span", { className: css.stepDot, children: index < step ? '✓' : index + 1 }), _jsx("span", { className: css.stepLabel, children: t(STEP_LABEL[entry]) })] }) }, entry));
                        }) }), currentStep === 'doctrine' && (_jsx("section", { className: css.stepPane, "data-step": "doctrine", children: _jsx("div", { className: css.templates, role: "radiogroup", "aria-label": t('quickstart.template'), children: visibleTemplates.map(entry => (_jsxs("button", { type: "button", role: "radio", "aria-checked": template === entry.id, className: css.templateCard, "data-control": 'quickstart-template-' + entry.id, disabled: busy, onClick: () => { chooseTemplate(entry.id); }, children: [_jsx("span", { className: css.templateName, children: t(entry.labelKey) }), _jsxs("span", { className: css.templateMeta, children: [entry.roles.length, " ", t('quickstart.roleCount')] })] }, entry.id))) }) })), currentStep === 'vow' && (_jsxs("section", { className: css.stepPane, "data-step": "vow", children: [_jsxs("div", { className: css.projectKindRow, role: "radiogroup", "aria-label": t('quickstart.projectKind'), children: [_jsx("button", { type: "button", role: "radio", "aria-checked": projectKind === 'engineering', "data-active": projectKind === 'engineering' || undefined, onClick: () => { chooseProjectKind('engineering'); }, children: t('quickstart.kindEngineering') }), _jsx("button", { type: "button", role: "radio", "aria-checked": projectKind === 'drama', "data-active": projectKind === 'drama' || undefined, onClick: () => { chooseProjectKind('drama'); }, children: t('quickstart.kindDrama') })] }), _jsxs("p", { className: css.soloRow, children: [_jsx("button", { type: "button", className: css.soloButton, "data-active": solo || undefined, disabled: busy, onClick: () => {
                                            const next = !solo;
                                            setSolo(next);
                                            if (next)
                                                setRoles([]);
                                        }, children: solo ? t('quickstart.soloActive') : t('quickstart.solo') }), _jsx("small", { children: solo ? t('quickstart.soloCleared') : t('quickstart.soloHint') })] }), _jsxs("label", { className: css.field, children: [_jsx("span", { children: t('quickstart.goal') }), _jsx("textarea", { ref: goalRef, value: goal, rows: 5, autoFocus: true, disabled: busy || polishBusy, placeholder: t('quickstart.goalPlaceholder'), onChange: (event) => { setGoal(event.target.value); setPolishError(''); setInterviewQuestions([]); setInterviewAnswers({}); setInterviewState('loading'); }, onKeyDown: (event) => {
                                            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                                                event.preventDefault();
                                                next();
                                            }
                                        } })] }), _jsxs("div", { className: css.polishRow, children: [_jsx("button", { type: "button", className: css.polishButton, disabled: busy || polishBusy || goalTrimmed === '', onClick: () => { void runPolish(); }, children: polishBusy ? t('polish.busy') : t('polish.button') }), polishError !== '' && _jsx("span", { className: css.polishError, role: "alert", children: polishError })] }), _jsxs("div", { className: css.modeRow, children: [_jsx("span", { className: css.modeLabel, children: t('mode.select') }), _jsxs("button", { type: "button", className: css.modeChip, "data-active": superFast || undefined, disabled: busy, title: t('quickstart.superFastHint'), onClick: () => { setSuperFast((current) => !current); setInterviewQuestions([]); setInterviewAnswers({}); setInterviewState('loading'); }, children: ["\u26A1 ", t('quickstart.superFast')] }), TEAM_MODES.filter(item => item !== 'draft').map(item => {
                                        const spec = getModeSpec(item);
                                        return (_jsxs("button", { type: "button", className: css.modeChip, "data-active": mode === item && !superFast || undefined, disabled: busy, title: t(('mode.desc.' + item)), onClick: () => { setMode(item); setSuperFast(false); setInterviewQuestions([]); setInterviewAnswers({}); setInterviewState('loading'); }, children: [spec.emoji, " ", t(spec.labelKey)] }, item));
                                    }), _jsxs("button", { type: "button", className: css.modeChip, "data-active": mode === 'draft' && !superFast || undefined, disabled: busy, title: t('mode.desc.draft'), onClick: () => { setMode('draft'); setSuperFast(false); setInterviewQuestions([]); setInterviewAnswers({}); setInterviewState('loading'); }, children: [getModeSpec('draft').emoji, " ", t(getModeSpec('draft').labelKey)] })] })] })), currentStep === 'interview' && (_jsx("section", { className: css.stepPane, "data-step": "interview", children: _jsx(InterviewSheet, { questions: interviewQuestions, answers: interviewAnswers, onChange: setInterviewAnswers, state: interviewState, error: interviewError, mode: mode, disabled: busy, onRetry: () => { setInterviewQuestions([]); setInterviewState('loading'); setInterviewNonce((value) => value + 1); }, t: t }) })), currentStep === 'sect' && (_jsxs("section", { className: css.stepPane, "data-step": "sect", children: [_jsx("p", { className: css.hint, children: t('quickstart.sectHint') }), solo ? (_jsx("p", { className: css.hint, children: t('quickstart.soloSectHidden') })) : (_jsxs("div", { className: css.field, children: [_jsx("span", { children: t('quickstart.sect') }), _jsxs("div", { className: css.sectRow, children: [_jsxs("button", { type: "button", className: css.sectChip, "data-active": sectMode === 'random' || undefined, disabled: busy, onClick: rollSect, children: [_jsx("span", { "aria-hidden": true, children: "\uD83C\uDFB2" }), t('quickstart.sectRandom')] }), SECT_PRESETS.map(preset => (_jsx("button", { type: "button", className: css.sectChip, "data-active": sectMode === preset.id || undefined, disabled: busy, onClick: () => { chooseSect(preset.id); }, children: t(preset.nameKey) }, preset.id))), _jsx("button", { type: "button", className: css.sectChip, "data-active": sectMode === 'custom' || undefined, disabled: busy, onClick: chooseCustom, children: t('quickstart.sectCustom') })] }), _jsx("small", { className: css.templateDesc, children: sectMode === 'custom'
                                            ? t('quickstart.sectCustomHint')
                                            : sectMode === 'random'
                                                ? t('quickstart.sectRolled', { sect: activeSect === undefined ? '' : t(activeSect.nameKey) })
                                                : activeSect === undefined ? '' : t(activeSect.descKey) }), sectMode !== 'custom' && (_jsx("span", { className: css.sectRoster, children: sectRoles.map(personChip) }))] })), !solo && sectMode === 'custom' && (_jsxs("div", { className: css.field, children: [_jsx("span", { children: t('quickstart.roles') }), _jsxs("div", { className: css.multi, ref: multiRef, children: [_jsxs("button", { type: "button", className: css.multiTrigger, "data-control": "quickstart-roles", "aria-expanded": rolesOpen, "aria-haspopup": "listbox", disabled: busy, onClick: () => { setRolesOpen((current) => !current); }, children: [_jsx("span", { className: css.chips, children: roles.length === 0
                                                            ? _jsx("span", { className: css.placeholder, children: t('quickstart.rolesEmpty') })
                                                            : roles.map(personChip) }), _jsx("span", { className: css.caret, "aria-hidden": true, children: "\u25BE" })] }), rolesOpen && (_jsxs("div", { className: css.multiPanel, role: "listbox", "aria-multiselectable": "true", "aria-label": t('quickstart.roles'), children: [ROLE_META.map(meta => (_jsxs("label", { className: css.option, children: [_jsx("input", { type: "checkbox", checked: roles.includes(meta.id), onChange: () => { toggleRole(meta.id); } }), (() => {
                                                                const art = memberArtUrl(t(meta.nameKey), meta.id);
                                                                return art === null ? null : _jsx("img", { className: css.optionAvatar, src: art, alt: "" });
                                                            })(), _jsx("span", { className: css.optionName, children: t(meta.nameKey) }), _jsx("span", { className: css.optionId, children: meta.id }), _jsx("span", { className: css.optionAbility, children: t(meta.abilityKey) })] }, meta.id))), _jsxs("div", { className: css.customRow, children: [_jsx("input", { value: customRole, placeholder: t('quickstart.customRole'), onChange: (event) => { setCustomRole(event.target.value); }, onKeyDown: (event) => {
                                                                    if (event.key === 'Enter') {
                                                                        event.preventDefault();
                                                                        addCustomRole();
                                                                    }
                                                                } }), _jsx("button", { type: "button", disabled: customRole.trim() === '', onClick: addCustomRole, children: t('quickstart.addRole') })] })] }))] })] }))] })), currentStep === 'oath' && (_jsxs("section", { className: css.stepPane, "data-step": "oath", children: [submitting && _jsx("p", { className: css.busyNote, role: "status", children: t('quickstart.generating') }), _jsxs("dl", { className: css.summary, children: [_jsxs("div", { className: css.summaryRow, children: [_jsx("dt", { children: t('quickstart.projectKind') }), _jsx("dd", { children: projectKind === 'drama' ? t('quickstart.kindDrama') : t('quickstart.kindEngineering') })] }), _jsxs("div", { className: css.summaryRow, children: [_jsx("dt", { children: t('mode.select') }), _jsxs("dd", { children: [getModeSpec(mode).emoji, " ", t(getModeSpec(mode).labelKey)] })] }), _jsxs("div", { className: css.summaryRow, children: [_jsx("dt", { children: t('quickstart.summaryDoctrine') }), _jsx("dd", { children: doctrineName })] }), _jsxs("div", { className: css.summaryRow, children: [_jsx("dt", { children: t('quickstart.summarySect') }), _jsx("dd", { children: sectName })] }), _jsxs("div", { className: css.summaryRow, children: [_jsx("dt", { children: t('quickstart.summaryRoster') }), _jsx("dd", { children: _jsx("span", { className: css.chips, children: roster.map(personChip) }) })] }), _jsxs("div", { className: css.summaryRow, children: [_jsx("dt", { children: t('quickstart.summaryVow') }), _jsx("dd", { children: goalTrimmed })] })] })] })), error !== '' && _jsx("p", { className: css.error, role: "alert", children: error }), created !== undefined && _jsx("p", { className: css.success, role: "status", children: created })] }), _jsxs("div", { className: css.wizardActions, children: [_jsx("button", { type: "button", disabled: busy, onClick: close, children: t('quickstart.cancel') }), step > 0 && (_jsx("button", { type: "button", "data-control": "quickstart-back", disabled: busy, onClick: () => { goTo(step - 1); }, children: t('quickstart.back') })), step < steps.length - 1 ? (_jsx("button", { type: "button", "data-primary": true, "data-control": "quickstart-next", disabled: !canAdvance, onClick: next, children: t('quickstart.next') })) : (_jsx("button", { type: "button", "data-primary": true, "data-control": "quickstart-submit", disabled: busy || !canAdvance, onClick: () => { void submit(existingTeam === true); }, children: busy ? t('quickstart.busy') : t('quickstart.found') }))] })] }));
}
/** 对话头部的开宗入口：统一打开洞府里的内容气泡，不再弹独立窗口。 */
export function TeamQuickStart({ t }) {
    return (_jsxs("button", { type: "button", className: css.entry, "data-quick-start-entry": true, title: t('quickstart.entryTitle'), onClick: () => { window.dispatchEvent(new CustomEvent(OPEN_HALL_SHEET_EVENT, { detail: { action: 'start' } })); }, children: [_jsx("span", { "aria-hidden": true, children: "\u26E9" }), t('quickstart.entry')] }));
}
