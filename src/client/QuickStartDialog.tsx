/** Click-to-dispatch entry: a header button that stages a plan from a small wizard. */
import { useEffect, useMemo, useRef, useState } from 'react'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import css from './QuickStartDialog.module.css'
import { memberArtUrl } from './artwork.ts'
import { OPEN_HALL_SHEET_EVENT } from './hall-events.ts'
import type { AgentTeamsTranslate } from './locales.ts'
import { TEAM_CREATED_EVENT } from './team-reveal.ts'
import { ROLE_META } from './role-labels.ts'
import { SECT_PRESETS, randomSect, sectPreset } from './sects.ts'
import { InterviewSheet, type InterviewQuestionView } from './InterviewSheet.tsx'
import { DEFAULT_MODE, TEAM_MODES, getModeSpec, type TeamMode } from '../modes.ts'


type TplKey = 'quickstart.tplFix' | 'quickstart.tplFeat' | 'quickstart.tplResearch' | 'quickstart.tplAudit' | 'quickstart.tplFullstack'
  | 'quickstart.tplHardening' | 'quickstart.tplBuild' | 'quickstart.tplArray' | 'quickstart.tplDocs' | 'quickstart.tplDebate'

interface QuickTemplate {
  readonly id: string
  readonly labelKey: TplKey
  readonly descKey: string
  readonly roles: readonly string[]
}

const TEMPLATES: readonly QuickTemplate[] = [
  // 开山立业 is the default founding intent: it leads the doctrine list.
  { id: 'feat', labelKey: 'quickstart.tplFeat', descKey: 'quickstart.desc.feat', roles: ['planner', 'implementer', 'verifier', 'reviewer'] },
  { id: 'fix', labelKey: 'quickstart.tplFix', descKey: 'quickstart.desc.fix', roles: ['implementer', 'verifier', 'reviewer'] },
  { id: 'research', labelKey: 'quickstart.tplResearch', descKey: 'quickstart.desc.research', roles: ['researcher', 'analyst', 'writer', 'reviewer'] },
  { id: 'fullstack', labelKey: 'quickstart.tplFullstack', descKey: 'quickstart.desc.fullstack', roles: ['integrator', 'frontend', 'backend', 'verifier', 'reviewer'] },
  { id: 'hardening', labelKey: 'quickstart.tplHardening', descKey: 'quickstart.desc.hardening', roles: ['auditor', 'security', 'verifier', 'reviewer'] },
  { id: 'audit', labelKey: 'quickstart.tplAudit', descKey: 'quickstart.desc.audit', roles: ['auditor', 'reviewer'] },
  { id: 'build', labelKey: 'quickstart.tplBuild', descKey: 'quickstart.desc.build', roles: ['implementer', 'verifier', 'operator'] },
  { id: 'array', labelKey: 'quickstart.tplArray', descKey: 'quickstart.desc.array', roles: ['architect', 'implementer', 'verifier', 'reviewer'] },
  { id: 'docs', labelKey: 'quickstart.tplDocs', descKey: 'quickstart.desc.docs', roles: ['writer', 'documenter', 'reviewer'] },
  { id: 'debate', labelKey: 'quickstart.tplDebate', descKey: 'quickstart.desc.debate', roles: ['researcher', 'analyst', 'reviewer'] },
]

type QuickStartDraft = {
  step: number
  mode: TeamMode
  goal: string
  template: string
  roles: string[]
  sectMode: string
  rolledSect: string
  solo: boolean
  superFast: boolean
  questions: InterviewQuestionView[]
  answers: Record<string, string[]>
}

const QUICK_START_DRAFT_PREFIX = 'dsh-pixel-team.quickstart.'

function readQuickStartDraft(sessionId: string): QuickStartDraft | undefined {
  try {
    const raw = window.localStorage.getItem(QUICK_START_DRAFT_PREFIX + sessionId)
    if (raw === null) return undefined
    const value = JSON.parse(raw) as Partial<QuickStartDraft>
    if (typeof value !== 'object' || value === null) return undefined
    return {
      step: typeof value.step === 'number' ? value.step : 0,
      mode: typeof value.mode === 'string' && (TEAM_MODES as readonly string[]).includes(value.mode) ? value.mode as TeamMode : DEFAULT_MODE,
      goal: typeof value.goal === 'string' ? value.goal : '',
      template: typeof value.template === 'string' ? value.template : (TEMPLATES[0]?.id ?? 'fix'),
      roles: Array.isArray(value.roles) ? value.roles.filter((role): role is string => typeof role === 'string') : [...(TEMPLATES[0]?.roles ?? [])],
      sectMode: typeof value.sectMode === 'string' ? value.sectMode : 'random',
      rolledSect: typeof value.rolledSect === 'string' ? value.rolledSect : randomSect().id,
      solo: value.solo === true,
      superFast: value.superFast === true,
      questions: Array.isArray(value.questions) ? value.questions as InterviewQuestionView[] : [],
      answers: typeof value.answers === 'object' && value.answers !== null ? value.answers as Record<string, string[]> : {},
    }
  } catch {
    return undefined
  }
}

function saveQuickStartDraft(sessionId: string, draft: QuickStartDraft): void {
  try { window.localStorage.setItem(QUICK_START_DRAFT_PREFIX + sessionId, JSON.stringify(draft)) } catch { /* private mode */ }
}

function clearQuickStartDraft(sessionId: string): void {
  try { window.localStorage.removeItem(QUICK_START_DRAFT_PREFIX + sessionId) } catch { /* private mode */ }
}

/** 开宗五步：道统 → 立派之志 → AI 访谈 → 宗门 → 立誓。 */
const STEPS = ['doctrine', 'vow', 'interview', 'sect', 'oath'] as const
type Step = typeof STEPS[number]
const STEP_LABEL: Record<Step, 'quickstart.stepDoctrine' | 'quickstart.stepVow' | 'quickstart.stepInterview' | 'quickstart.stepSect' | 'quickstart.stepOath'> = {
  doctrine: 'quickstart.stepDoctrine',
  vow: 'quickstart.stepVow',
  interview: 'quickstart.stepInterview',
  sect: 'quickstart.stepSect',
  oath: 'quickstart.stepOath',
}

/** Template questions used only when the host/model cannot answer. */
function fallbackInterviewQuestions(mode: TeamMode): InterviewQuestionView[] {
  const spec = getModeSpec(mode)
  return [
    { id: 'platform', prompt: '目标运行平台？', multi: true, options: ['Windows', 'Linux (UOS/麒麟)', 'macOS', 'Android', 'iOS'] },
    { id: 'acceptance', prompt: '验收以哪条为准？', multi: true, options: [...spec.acceptanceDefaults] },
    { id: 'excluded', prompt: '哪些事情明确不做？', multi: true, options: [...spec.defaultExcluded] },
  ]
}

/** Minimum valid clarification when the answer route is unavailable. */
function fallbackClarification(mode: TeamMode): Record<string, unknown> {
  const spec = getModeSpec(mode)
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
  }
}

function templateOf(id: string): QuickTemplate {
  return TEMPLATES.find(entry => entry.id === id) ?? TEMPLATES[0] as QuickTemplate
}

export function QuickStartWizard({ sessionId, existingTeam, t, onDone, onFounded }: {
  readonly sessionId: SessionId
  /** The hall already knows a sect exists: confirm before replacing it. */
  readonly existingTeam?: boolean
  readonly t: AgentTeamsTranslate
  readonly onDone?: () => void
  readonly onFounded?: () => void
}) {
  const [draft] = useState(() => readQuickStartDraft(sessionId))
  const [step, setStep] = useState(() => draft?.step ?? 0)
  // Development mode drives polish, options, constitution and the member persona.
  const [mode, setMode] = useState<TeamMode>(() => draft?.mode ?? DEFAULT_MODE)
  const [goal, setGoal] = useState(() => draft?.goal ?? '')
  const [template, setTemplate] = useState<string>(() => draft?.template ?? TEMPLATES[0]?.id ?? 'fix')
  const [roles, setRoles] = useState<string[]>(() => draft?.roles ?? [...(TEMPLATES[0]?.roles ?? [])])
  // 门派有两种玩法：用户选一个预设，或让系统随机动态分配（再点一次重抽）。
  const [sectMode, setSectMode] = useState<'random' | 'custom' | string>(() => draft?.sectMode ?? 'random')
  const [rolledSect, setRolledSect] = useState<string>(() => draft?.rolledSect ?? randomSect().id)
  const [customRole, setCustomRole] = useState('')
  const [rolesOpen, setRolesOpen] = useState(false)
  // Solo run: no members are spawned; the captain executes every task itself.
  const [solo, setSolo] = useState(() => draft?.solo ?? false)
  const [superFast, setSuperFast] = useState(() => draft?.superFast ?? false)
  const [developerMode] = useState<boolean>(() => {
    try { return window.localStorage.getItem('dsh-pixel-team.dev') === '1' } catch { return false }
  })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [blocked, setBlocked] = useState(false)
  const [created, setCreated] = useState<string | undefined>()
  // Module 0: AI polish writes straight back into the goal textarea.
  const [polishBusy, setPolishBusy] = useState(false)
  const [polishError, setPolishError] = useState('')
  // Module 1: the model generates its own questions from this requirement.
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestionView[]>(() => draft?.questions ?? [])
  const [interviewAnswers, setInterviewAnswers] = useState<Record<string, string[]>>(() => draft?.answers ?? {})
  const [interviewState, setInterviewState] = useState<'loading' | 'ready' | 'fallback'>(() => draft?.questions?.length ? 'ready' : 'loading')
  const [interviewError, setInterviewError] = useState('')
  const [interviewNonce, setInterviewNonce] = useState(0)
  const multiRef = useRef<HTMLDivElement | null>(null)
  const goalRef = useRef<HTMLTextAreaElement | null>(null)
  const sessionRef = useRef(sessionId)
  const hydratingDraft = useRef(false)
  const foundedTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => {
    if (foundedTimer.current !== undefined) window.clearTimeout(foundedTimer.current)
  }, [])

  useEffect(() => {
    if (sessionRef.current === sessionId) return
    sessionRef.current = sessionId
    hydratingDraft.current = true
    const next = readQuickStartDraft(sessionId)
    setStep(next?.step ?? 0)
    setMode(next?.mode ?? DEFAULT_MODE)
    setGoal(next?.goal ?? '')
    setTemplate(next?.template ?? TEMPLATES[0]?.id ?? 'fix')
    setRoles(next?.roles ?? [...(TEMPLATES[0]?.roles ?? [])])
    setSectMode(next?.sectMode ?? 'random')
    setRolledSect(next?.rolledSect ?? randomSect().id)
    setSolo(next?.solo ?? false)
    setSuperFast(next?.superFast ?? false)
    setInterviewQuestions(next?.questions ?? [])
    setInterviewAnswers(next?.answers ?? {})
    setInterviewState(next?.questions?.length ? 'ready' : 'loading')
  }, [sessionId])

  // 同一会话的草稿跨切换保留：访谈问题、答案、当前步骤都不重新生成。
  useEffect(() => {
    if (sessionRef.current !== sessionId) return
    if (hydratingDraft.current) { hydratingDraft.current = false; return }
    saveQuickStartDraft(sessionId, {
      step, mode, goal, template, roles, sectMode, rolledSect, solo, superFast,
      questions: interviewQuestions, answers: interviewAnswers,
    })
  }, [sessionId, step, mode, goal, template, roles, sectMode, rolledSect, solo, superFast, interviewQuestions, interviewAnswers])

  useEffect(() => {
    if (!rolesOpen) return
    const onPointerDown = (event: PointerEvent): void => {
      if (multiRef.current === null) return
      if (!multiRef.current.contains(event.target as Node)) setRolesOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => { document.removeEventListener('pointerdown', onPointerDown) }
  }, [rolesOpen])

  const close = (): void => {
    if (busy) return
    onDone?.()
  }
  const activeSect = sectMode === 'custom' ? undefined : sectPreset(sectMode === 'random' ? rolledSect : sectMode)
  const sectRoles = activeSect?.roles ?? roles
  const chooseTemplate = (id: string): void => {
    setTemplate(id)
    // 门派已经配好道途时，换模板不再覆盖这套道途（自定义模式才跟随模板）。
    if (sectMode === 'custom') setRoles([...templateOf(id).roles])
  }
  const chooseSect = (id: string): void => {
    setSectMode(id)
    const preset = sectPreset(id)
    if (preset !== undefined) setRoles([...preset.roles])
  }
  const rollSect = (): void => {
    const next = randomSect(rolledSect)
    setRolledSect(next.id)
    setSectMode('random')
    setRoles([...next.roles])
  }
  const chooseCustom = (): void => {
    setSectMode('custom')
    if (roles.length === 0) setRoles([...templateOf(template).roles])
  }
  const toggleRole = (role: string): void => {
    setRoles((current) => current.includes(role) ? current.filter(entry => entry !== role) : [...current, role])
  }
  const roleName = (id: string): string => {
    const meta = ROLE_META.find(entry => entry.id === id)
    return meta === undefined ? id : t(meta.nameKey)
  }
  /** 一枚修士 chip：优先用像素人立绘，找不到对应道途时退回首字徽记。 */
  const personChip = (role: string) => {
    const label = roleName(role)
    const art = memberArtUrl(label, role)
    return (
      <span key={role} className={css.chip} title={role}>
        {art === null
          ? <span className={css.chipLetter} aria-hidden>{label.slice(0, 1)}</span>
          : <img className={css.chipAvatar} src={art} alt="" />}
        {label}
      </span>
    )
  }
  const addCustomRole = (): void => {
    const trimmed = customRole.trim()
    if (trimmed === '') return
    setRoles((current) => current.includes(trimmed) ? current : [...current, trimmed])
    setCustomRole('')
  }

  const goalTrimmed = goal.trim()
  const runPolish = async (): Promise<void> => {
    if (goalTrimmed === '') { setPolishError(t('quickstart.goalRequired')); return }
    setPolishBusy(true)
    setPolishError('')
    try {
      const response = await fetch('/plugins/dsh-pixel-team/polish', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sessionId, requirement: goalTrimmed, mode }),
      })
      const body = await response.json().catch(() => null) as {
        ok?: boolean; expanded?: string; degraded?: boolean; error?: string
      } | null
      if (!response.ok || body?.ok !== true) throw new Error(body?.error ?? ('HTTP ' + response.status))
      // Insert the polished text into the input; the user decides the next step.
      const expanded = (body.expanded ?? goalTrimmed).trim()
      setGoal(expanded)
      if (body.degraded === true) {
        setPolishError(t('polish.degradedDetail', { error: body.error ?? t('polish.degraded') }))
      } else if (expanded === goalTrimmed) {
        setPolishError(t('polish.unchanged'))
      }
    } catch (cause) {
      setPolishError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setPolishBusy(false)
    }
  }

  // Ask the model for template-like questions when the interview step opens.
  useEffect(() => {
    if (STEPS[step] !== 'interview' || goalTrimmed === '' || interviewQuestions.length > 0) return
    const controller = new AbortController()
    setInterviewState('loading')
    setInterviewError('')
    setInterviewQuestions([])
    void (async () => {
      try {
        const response = await fetch('/plugins/dsh-pixel-team/interview/questions', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ sessionId, mode, requirement: goalTrimmed }),
          signal: controller.signal,
        })
        const body = await response.json().catch(() => null) as { ok?: boolean; questions?: InterviewQuestionView[]; error?: string } | null
        if (!response.ok || body?.ok !== true || !Array.isArray(body.questions)) {
          throw new Error(body?.error ?? ('HTTP ' + response.status))
        }
        setInterviewQuestions(body.questions)
        setInterviewAnswers({})
        setInterviewState('ready')
      } catch (cause) {
        if (controller.signal.aborted) return
        setInterviewError(cause instanceof Error ? cause.message : String(cause))
        setInterviewQuestions(fallbackInterviewQuestions(mode))
        setInterviewState('fallback')
      }
    })()
    return () => { controller.abort() }
  }, [step, goalTrimmed, sessionId, mode, interviewNonce])
  const currentStep: Step = STEPS[step] ?? STEPS[0] as Step
  const canAdvance = useMemo(() => {
    // Never advance while polish is still running: the result is about to land
    // in the goal textarea.
    if (busy || polishBusy) return false
    switch (currentStep) {
      case 'vow': return goalTrimmed.length >= 2
      case 'interview': return interviewState !== 'loading' && interviewQuestions.length > 0
      case 'sect': return solo || sectMode !== 'custom' || sectRoles.length > 0
      default: return true
    }
  }, [busy, polishBusy, currentStep, goalTrimmed, interviewState, interviewQuestions.length, sectMode, sectRoles.length, solo])

  const submit = async (replace: boolean): Promise<void> => {
    if (goalTrimmed === '') { setError(t('quickstart.goalRequired')); setStep(1); return }
    // An unfinished sect is confirmed in place, above the submit button, before
    // any request is sent or any old team is touched.
    if (!replace && existingTeam === true) { setBlocked(true); return }
    setBusy(true)
    setError('')
    try {
      // Build the clarification deterministically from the mode baseline + the
      // interview answers, so founding needs only ONE model round (plan
      // generation) instead of two and the wait is shorter.
      const interviewNotes = interviewQuestions
        .map(question => ({ question: question.prompt, answer: interviewAnswers[question.id] ?? [] }))
        .filter(item => item.answer.length > 0)
        .map(item => item.question + '：' + item.answer.join(' / '))
      const base = fallbackClarification(mode)
      const clarification: Record<string, unknown> = {
        ...base,
        constraints: [...(base.constraints as string[]), ...interviewNotes].slice(0, 20),
      }
      const response = await fetch('/plugins/dsh-pixel-team/quick-start', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          mode,
          goal: goalTrimmed,
          template,
          roles: solo ? [] : sectMode === 'custom' ? roles : [...(activeSect?.roles ?? roles)],
          solo,
          replace,
          clarification,
        }),
      })
      const body = await response.json().catch(() => null) as { ok?: boolean; teamId?: string; teamName?: string; error?: string } | null
      if (!response.ok || body?.ok !== true) {
        const raw = body?.error ?? ('HTTP ' + response.status)
        const existing = /already lead team/i.test(raw)
        if (existing) {
          // The server confirms the same condition: show the confirm bubble and
          // do not report it as a red error.
          setBlocked(true)
          setError('')
          return
        }
        throw new Error(raw)
      }
      setCreated(t('quickstart.created', {
        team: body.teamName ?? body.teamId ?? '',
        sect: activeSect === undefined ? t('quickstart.sectCustomPicked') : t(activeSect.nameKey),
      }))
      if (body.teamId !== undefined) window.dispatchEvent(new CustomEvent(TEAM_CREATED_EVENT, { detail: { teamId: body.teamId } }))
      clearQuickStartDraft(sessionId)
      setBlocked(false)
      setGoal('')
      foundedTimer.current = window.setTimeout(() => { onFounded?.() }, 300)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setBusy(false)
    }
  }

  const goTo = (next: number): void => {
    if (busy) return
    setError('')
    setStep(Math.max(0, Math.min(STEPS.length - 1, next)))
  }
  const next = (): void => {
    if (step === STEPS.length - 1) { void submit(false); return }
    if (!canAdvance) return
    // 超级快速跳过 AI 访谈，直接进入宗门（单掌门/团队）与立誓。
    if (currentStep === 'vow' && superFast) { goTo(Math.min(STEPS.length - 1, step + 2)); return }
    goTo(step + 1)
  }
  const doctrineName = t(templateOf(template).labelKey)
  const sectName = activeSect === undefined ? t('quickstart.sectCustom') : t(activeSect.nameKey)
  const roster = sectMode === 'custom' ? roles : [...sectRoles]

  return (
    <div className={css.wizard}>
      <div className={css.form}>
          <ol className={css.steps} aria-label={t('quickstart.title')}>
            {STEPS.map((entry, index) => {
              const state = index === step ? 'current' : index < step ? 'done' : 'todo'
              return (
                <li key={entry} className={css.stepItem} data-state={state}>
                  <button
                    type="button"
                    className={css.stepButton}
                    data-control={'quickstart-step-' + index}
                    aria-current={state === 'current' ? 'step' : undefined}
                    disabled={busy || polishBusy || index > step}
                    onClick={() => { goTo(index) }}
                  >
                    <span className={css.stepDot}>{index < step ? '✓' : index + 1}</span>
                    <span className={css.stepLabel}>{t(STEP_LABEL[entry])}</span>
                  </button>
                </li>
              )
            })}
          </ol>

          {currentStep === 'doctrine' && (
            <section className={css.stepPane} data-step="doctrine">
              <p className={css.soloRow}>
                <button
                  type="button"
                  className={css.soloButton}
                  data-active={solo || undefined}
                  disabled={busy}
                  onClick={() => {
                    const next = !solo
                    setSolo(next)
                    if (next) setRoles([])
                  }}
                >
                  {solo ? t('quickstart.soloActive') : t('quickstart.solo')}
                </button>
                <small>{solo ? t('quickstart.soloCleared') : t('quickstart.soloHint')}</small>
              </p>
              <p className={css.hint}>{t('quickstart.doctrineHint')}</p>
              <div className={css.templates} role="radiogroup" aria-label={t('quickstart.template')}>
                {TEMPLATES.map(entry => (
                  <button
                    key={entry.id}
                    type="button"
                    role="radio"
                    aria-checked={template === entry.id}
                    className={css.templateCard}
                    data-control={'quickstart-template-' + entry.id}
                    disabled={busy}
                    onClick={() => { chooseTemplate(entry.id) }}
                  >
                    <span className={css.templateName}>{t(entry.labelKey)}</span>
                    <span className={css.templateDesc}>{t(entry.descKey as Parameters<typeof t>[0])}</span>
                    <span className={css.templateMeta}>{entry.roles.length} {t('quickstart.roleCount')}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {currentStep === 'vow' && (
            <section className={css.stepPane} data-step="vow">
              <label className={css.field}>
                <span>{t('quickstart.goal')}</span>
                <textarea
                  ref={goalRef}
                  value={goal}
                  rows={5}
                  autoFocus
                  disabled={busy || polishBusy}
                  placeholder={t('quickstart.goalPlaceholder')}
                  onChange={(event) => { setGoal(event.target.value); setPolishError(''); setInterviewQuestions([]); setInterviewAnswers({}); setInterviewState('loading') }}
                  onKeyDown={(event) => {
                    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') { event.preventDefault(); next() }
                  }}
                />
              </label>
              <div className={css.polishRow}>
                <button
                  type="button"
                  className={css.polishButton}
                  disabled={busy || polishBusy || goalTrimmed === ''}
                  onClick={() => { void runPolish() }}
                >
                  {polishBusy ? t('polish.busy') : t('polish.button')}
                </button>
                {polishError !== '' && <span className={css.polishError} role="alert">{polishError}</span>}
              </div>
              <div className={css.modeRow}>
                <span className={css.modeLabel}>{t('mode.select')}</span>
                <button
                  type="button"
                  className={css.modeChip}
                  data-active={superFast || undefined}
                  disabled={busy}
                  title={t('quickstart.superFastHint')}
                  onClick={() => { setSuperFast((current) => !current); setInterviewQuestions([]); setInterviewAnswers({}); setInterviewState('loading') }}
                >
                  ⚡ {t('quickstart.superFast')}
                </button>
                {TEAM_MODES.filter(item => item !== 'draft').map(item => {
                  const spec = getModeSpec(item)
                  return (
                    <button
                      key={item}
                      type="button"
                      className={css.modeChip}
                      data-active={mode === item && !superFast || undefined}
                      disabled={busy}
                      title={t(('mode.desc.' + item) as Parameters<typeof t>[0])}
                      onClick={() => { setMode(item); setSuperFast(false); setInterviewQuestions([]); setInterviewAnswers({}); setInterviewState('loading') }}
                    >
                      {spec.emoji} {t(spec.labelKey as Parameters<typeof t>[0])}
                    </button>
                  )
                })}
                <button
                  type="button"
                  className={css.modeChip}
                  data-active={mode === 'draft' && !superFast || undefined}
                  disabled={busy}
                  title={t('mode.desc.draft' as Parameters<typeof t>[0])}
                  onClick={() => { setMode('draft'); setSuperFast(false); setInterviewQuestions([]); setInterviewAnswers({}); setInterviewState('loading') }}
                >
                  {getModeSpec('draft').emoji} {t(getModeSpec('draft').labelKey as Parameters<typeof t>[0])}
                </button>
              </div>
            </section>
          )}

          {currentStep === 'interview' && (
            <section className={css.stepPane} data-step="interview">
              <InterviewSheet
                questions={interviewQuestions}
                answers={interviewAnswers}
                onChange={setInterviewAnswers}
                state={interviewState}
                error={interviewError}
                mode={mode}
                disabled={busy}
                onRetry={() => { setInterviewQuestions([]); setInterviewState('loading'); setInterviewNonce((value) => value + 1) }}
                t={t}
              />
            </section>
          )}

          {currentStep === 'sect' && (
            <section className={css.stepPane} data-step="sect">
              <p className={css.hint}>{t('quickstart.sectHint')}</p>
              {solo ? (
                <p className={css.hint}>{t('quickstart.soloSectHidden')}</p>
              ) : (
              <div className={css.field}>
                <span>{t('quickstart.sect')}</span>
                <div className={css.sectRow}>
                  <button type="button" className={css.sectChip} data-active={sectMode === 'random' || undefined} disabled={busy} onClick={rollSect}>
                    <span aria-hidden>🎲</span>{t('quickstart.sectRandom')}
                  </button>
                  {SECT_PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      type="button"
                      className={css.sectChip}
                      data-active={sectMode === preset.id || undefined}
                      disabled={busy}
                      onClick={() => { chooseSect(preset.id) }}
                    >
                      {t(preset.nameKey)}
                    </button>
                  ))}
                  <button type="button" className={css.sectChip} data-active={sectMode === 'custom' || undefined} disabled={busy} onClick={chooseCustom}>
                    {t('quickstart.sectCustom')}
                  </button>
                </div>
                <small className={css.templateDesc}>
                  {sectMode === 'custom'
                    ? t('quickstart.sectCustomHint')
                    : sectMode === 'random'
                      ? t('quickstart.sectRolled', { sect: activeSect === undefined ? '' : t(activeSect.nameKey) })
                      : activeSect === undefined ? '' : t(activeSect.descKey)}
                </small>
                {sectMode !== 'custom' && (
                  <span className={css.sectRoster}>
                    {sectRoles.map(personChip)}
                  </span>
                )}
              </div>
              )}
              {!solo && sectMode === 'custom' && (
                <div className={css.field}>
                  <span>{t('quickstart.roles')}</span>
                  <div className={css.multi} ref={multiRef}>
                    <button
                      type="button"
                      className={css.multiTrigger}
                      data-control="quickstart-roles"
                      aria-expanded={rolesOpen}
                      aria-haspopup="listbox"
                      disabled={busy}
                      onClick={() => { setRolesOpen((current) => !current) }}
                    >
                      <span className={css.chips}>
                        {roles.length === 0
                          ? <span className={css.placeholder}>{t('quickstart.rolesEmpty')}</span>
                          : roles.map(personChip)}
                      </span>
                      <span className={css.caret} aria-hidden>▾</span>
                    </button>
                    {rolesOpen && (
                      <div className={css.multiPanel} role="listbox" aria-multiselectable="true" aria-label={t('quickstart.roles')}>
                        {ROLE_META.map(meta => (
                          <label key={meta.id} className={css.option}>
                            <input type="checkbox" checked={roles.includes(meta.id)} onChange={() => { toggleRole(meta.id) }} />
                            {(() => {
                              const art = memberArtUrl(t(meta.nameKey), meta.id)
                              return art === null ? null : <img className={css.optionAvatar} src={art} alt="" />
                            })()}
                            <span className={css.optionName}>{t(meta.nameKey)}</span>
                            <span className={css.optionId}>{meta.id}</span>
                            <span className={css.optionAbility}>{t(meta.abilityKey)}</span>
                          </label>
                        ))}
                        <div className={css.customRow}>
                          <input
                            value={customRole}
                            placeholder={t('quickstart.customRole')}
                            onChange={(event) => { setCustomRole(event.target.value) }}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') { event.preventDefault(); addCustomRole() }
                            }}
                          />
                          <button type="button" disabled={customRole.trim() === ''} onClick={addCustomRole}>{t('quickstart.addRole')}</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          )}

          {currentStep === 'oath' && (
            <section className={css.stepPane} data-step="oath">
              <p className={css.hint}>{t('quickstart.oathHint')}</p>
              <dl className={css.summary}>
                <div className={css.summaryRow}><dt>{t('mode.select')}</dt><dd>{getModeSpec(mode).emoji} {t(getModeSpec(mode).labelKey as Parameters<typeof t>[0])}</dd></div>
                <div className={css.summaryRow}><dt>{t('quickstart.summaryDoctrine')}</dt><dd>{doctrineName}</dd></div>
                <div className={css.summaryRow}><dt>{t('quickstart.summarySect')}</dt><dd>{sectName}</dd></div>
                <div className={css.summaryRow}><dt>{t('quickstart.summaryRoster')}</dt><dd><span className={css.chips}>{roster.map(personChip)}</span></dd></div>
                <div className={css.summaryRow}><dt>{t('quickstart.summaryVow')}</dt><dd>{goalTrimmed}</dd></div>
              </dl>
              <p className={css.oath}>{t('quickstart.oathNotice')}</p>
            </section>
          )}

          {error !== '' && <p className={css.error} role="alert">{error}</p>}
          {busy && <p className={css.busyNote} role="status">{t('quickstart.generating')}</p>}
          {created !== undefined && <p className={css.success} role="status">{created}</p>}
      </div>
      <div className={css.wizardActions}>
        {blocked && (
          <div className={css.confirmFloat} role="alertdialog" aria-label={t('quickstart.replaceConfirm')}>
            <p className={css.confirmFloatText}>{t('quickstart.replaceConfirm')}</p>
            <div className={css.confirmFloatActions}>
              <button type="button" disabled={busy} onClick={() => { setBlocked(false) }}>{t('quickstart.cancel')}</button>
              <button type="button" data-primary data-danger disabled={busy} onClick={() => { setBlocked(false); void submit(true) }}>{t('quickstart.replace')}</button>
            </div>
            <span className={css.confirmFloatTail} aria-hidden />
          </div>
        )}
        <button type="button" disabled={busy} onClick={close}>{t('quickstart.cancel')}</button>
        {step > 0 && (
          <button type="button" data-control="quickstart-back" disabled={busy} onClick={() => { goTo(step - 1) }}>{t('quickstart.back')}</button>
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" data-primary data-control="quickstart-next" disabled={!canAdvance} onClick={next}>
            {t('quickstart.next')}
          </button>
        ) : (
          <button type="button" data-primary data-control="quickstart-submit" disabled={busy || !canAdvance} onClick={() => { void submit(false) }}>
            {busy ? t('quickstart.busy') : t('quickstart.found')}
          </button>
        )}
      </div>
    </div>
  )
}

/** 对话头部的开宗入口：统一打开洞府里的内容气泡，不再弹独立窗口。 */
export function TeamQuickStart({ t }: PropsLocale<'agentTeams'>) {
  return (
    <button
      type="button"
      className={css.entry}
      data-quick-start-entry
      title={t('quickstart.entryTitle')}
      onClick={() => { window.dispatchEvent(new CustomEvent(OPEN_HALL_SHEET_EVENT, { detail: { action: 'start' } })) }}
    >
      <span aria-hidden>⛩</span>{t('quickstart.entry')}
    </button>
  )
}
