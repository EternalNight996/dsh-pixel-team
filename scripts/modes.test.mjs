/**
 * Development modes: specs, mode-shaped clarification, constitution preamble.
 */
import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DEFAULT_MODE, MODE_SPECS, TEAM_MODES, getModeSpec, isTeamMode, modePhilosophyText } from '../lib/modes.js'
import { normalizeClarification, describeClarification } from '../lib/clarify.js'
import { buildConstitution, constitutionPreamble, readConstitution } from '../lib/constitution.js'
import { fallbackClarifyOptions, parseClarifyOptions } from '../lib/clarify-options.js'

const base = {
  type: 'software',
  scale: 'small',
  ui: { styles: [] },
  platforms: ['Windows'],
  acceptance: ['主流程跑通'],
}

test('all five modes carry a complete spec', () => {
  assert.deepEqual([...TEAM_MODES], ['draft', 'precision', 'legacy', 'compliance', 'monetize'])
  for (const mode of TEAM_MODES) {
    const spec = MODE_SPECS[mode]
    assert.equal(spec.id, mode)
    assert.ok(spec.philosophy.length > 10)
    assert.ok(spec.defaultExcluded.length > 0)
    assert.ok(spec.acceptanceDefaults.length > 0)
    assert.ok(spec.budget.perTaskUsd > 0 && spec.budget.perDayUsd >= spec.budget.perTaskUsd)
    assert.ok(spec.verifier.failLimit >= 2)
  }
  assert.equal(MODE_SPECS.draft.verifier.failLimit, 2)
  assert.equal(MODE_SPECS.precision.verifier.failLimit, 3)
  assert.equal(MODE_SPECS.legacy.verifier.blockOnOldTestFail, true)
  assert.ok(MODE_SPECS.draft.budget.perDayUsd < MODE_SPECS.precision.budget.perDayUsd)
  assert.equal(isTeamMode('legacy'), true)
  assert.equal(isTeamMode('nope'), false)
  assert.equal(getModeSpec(undefined).id, DEFAULT_MODE)
  assert.equal(getModeSpec(undefined).id, 'precision')
  assert.match(modePhilosophyText('legacy'), /外科医生/)
})

test('clarification defaults follow the selected mode', () => {
  const legacy = normalizeClarification({ ...base, mode: 'legacy' })
  assert.equal(legacy.mode, 'legacy')
  assert.ok(legacy.excluded.includes('禁止重构底层'))
  const compliance = normalizeClarification({ ...base, mode: 'compliance' })
  assert.ok(compliance.excluded.some(item => item.includes('公网')))
  const legacyText = describeClarification(legacy)
  assert.match(legacyText, /【开发模式】/)
  assert.match(legacyText, /屎山抢救/)
  // Legacy payloads without mode default to precision.
  assert.equal(normalizeClarification(base).mode, 'precision')
})

test('AI options are mode-shaped and mandatory items survive parsing', () => {
  const fallback = fallbackClarifyOptions('legacy')
  assert.equal(fallback.source, 'fallback')
  assert.ok(fallback.excluded.includes('禁止重构底层'))
  assert.ok(fallback.acceptance.some(item => item.includes('旧接口回归')))
  const parsed = parseClarifyOptions('{"platforms":["Windows"],"acceptance":[],"excluded":[]}', 'compliance')
  assert.ok(parsed.acceptance.some(item => item.includes('依赖')))
  assert.ok(parsed.excluded.some(item => item.includes('公网')))
})

test('constitution persists the mode and the preamble leads with its philosophy', async () => {
  const constitution = buildConstitution(normalizeClarification({ ...base, mode: 'legacy' }), 'demo')
  assert.equal(constitution.mode, 'legacy')
  const preamble = constitutionPreamble('{}', constitution.mode)
  assert.match(preamble, /【开发模式：/)
  assert.match(preamble, /外科医生/)
  const workspace = mkdtempSync(join(tmpdir(), 'pixel-mode-'))
  try {
    mkdirSync(join(workspace, '.pixel-team'), { recursive: true })
    writeFileSync(join(workspace, '.pixel-team', 'demo-constitution.json'), JSON.stringify({ project: 'demo' }), 'utf8')
    const read = await readConstitution(workspace, 'demo')
    assert.equal(read?.json.mode, 'precision')
  } finally {
    rmSync(workspace, { recursive: true, force: true })
  }
})
