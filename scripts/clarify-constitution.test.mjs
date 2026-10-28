/**
 * Phase A regression: blocking clarification + read-only constitution + polish parsing.
 */
import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { normalizeClarification, describeClarification, DEFAULT_EXCLUDED } from '../lib/clarify.js'
import { buildConstitution, writeConstitution, readConstitution } from '../lib/constitution.js'
import { parsePolishOutput } from '../lib/polish.js'
import { fallbackClarifyOptions, parseClarifyOptions } from '../lib/clarify-options.js'

const base = {
  type: 'hardware',
  scale: 'medium',
  ui: { reference: 'MVCheck', styles: ['工业极简'], notes: '车间强光' },
  platforms: ['Windows', 'Linux (UOS/麒麟)'],
  hardwareList: ['海康 MV-CS016'],
  constraints: ['产线不停机'],
  excluded: ['不改 MES 接口'],
  acceptance: ['连续72h无崩溃', '检测错误率<1%'],
  memoryHints: ['MES 接口', 'Win7'],
}

test('clarification normalizes and validates the blocking form', () => {
  const value = normalizeClarification(base)
  assert.equal(value.type, 'hardware')
  assert.equal(value.scale, 'medium')
  assert.deepEqual(value.platforms, ['Windows', 'Linux (UOS/麒麟)'])
  assert.deepEqual(value.acceptance, ['连续72h无崩溃', '检测错误率<1%'])
  assert.deepEqual(value.ui.styles, ['工业极简'])
  assert.throws(() => normalizeClarification({ ...base, acceptance: [] }), /acceptance/)
  assert.throws(() => normalizeClarification({ ...base, platforms: [] }), /platforms/)
  assert.throws(() => normalizeClarification({ ...base, scale: 'huge' }), /scale/)
  const fallback = normalizeClarification({ ...base, excluded: [] })
  assert.deepEqual(fallback.excluded, [...DEFAULT_EXCLUDED])
})

test('the rendered form carries all seven sections', () => {
  const markdown = describeClarification(normalizeClarification(base))
  for (const heading of ['【类型】', '【项目规模】', '【UI设计】', '【目标平台】', '【硬件清单】', '【禁止边界】', '【验收断言】']) {
    assert.ok(markdown.includes(heading), 'missing ' + heading + ' in:\n' + markdown)
  }
})

test('constitution is written once, read-only by default', async () => {
  const workspace = mkdtempSync(join(tmpdir(), 'pixel-constitution-'))
  try {
    const clarification = normalizeClarification(base)
    const constitution = buildConstitution(clarification, 'demo')
    const first = await writeConstitution(workspace, 'demo', constitution)
    assert.equal(first.path, '.pixel-team/demo-constitution.json')
    const text = readFileSync(join(workspace, first.path), 'utf8')
    assert.equal(first.checksum.length, 64)
    const read = await readConstitution(workspace, 'demo')
    assert.ok(read !== undefined)
    assert.deepEqual(read.json.acceptance, ['连续72h无崩溃', '检测错误率<1%'])
    assert.equal(read.checksum, first.checksum)
    // A second write without allowOverwrite keeps the original bytes.
    const second = await writeConstitution(workspace, 'demo', { ...constitution, acceptance: ['changed'] })
    assert.equal(second.checksum, first.checksum)
    assert.equal(readFileSync(join(workspace, first.path), 'utf8'), text)
    // Explicit re-clarify may replace it.
    const third = await writeConstitution(workspace, 'demo', { ...constitution, acceptance: ['changed'] }, true)
    assert.notEqual(third.checksum, first.checksum)
  } finally {
    rmSync(workspace, { recursive: true, force: true })
  }
})

test('polish output parsing tolerates prose around JSON and rejects junk', () => {
  const parsed = parsePolishOutput('好的：\n{"expanded":"实现登录接口重试与监控","hiddenConditions":["兼容 Win7","需对接 MES"]}\n以上。')
  assert.equal(parsed.expanded, '实现登录接口重试与监控')
  assert.deepEqual(parsed.hiddenConditions, ['兼容 Win7', '需对接 MES'])
  assert.throws(() => parsePolishOutput('no json here'), /JSON/)
  const long = parsePolishOutput(JSON.stringify({ expanded: 'x'.repeat(500), hiddenConditions: [] }))
  assert.equal(long.expanded.length, 200)
})

test('clarify options are AI-shaped with a per-section fallback', () => {
  const parsed = parseClarifyOptions('ǰ�� {"type":"hardware","scale":"medium","ui":{"references":["MVCheck"],"styles":["��ҵ����"],"notes":[]},"platforms":["Windows"],"hardware":["���� MV-CS016"],"constraints":["���߲�ͣ��"],"excluded":["���� MES"],"acceptance":["����72h�ޱ���","��������<1%"],"memoryHints":["MES"]} ���')
  assert.equal(parsed.source, 'ai')
  assert.equal(parsed.type, 'hardware')
  assert.equal(parsed.scale, 'medium')
  assert.deepEqual(parsed.platforms, ['Windows'])
  assert.deepEqual(parsed.acceptance, ['����72h�ޱ���', '��������<1%'])
  assert.deepEqual(parsed.hardware, ['���� MV-CS016'])
  assert.deepEqual(parsed.ui.styles, ['��ҵ����'])
  const fallback = fallbackClarifyOptions()
  assert.equal(fallback.source, 'fallback')
  assert.ok(fallback.platforms.length > 0)
  assert.ok(fallback.hardware.length > 0)
  // Missing sections must not leave the form empty.
  const partial = parseClarifyOptions('{"type":"software","platforms":[],"acceptance":[]}')
  assert.ok(partial.platforms.length > 0)
  assert.ok(partial.acceptance.length > 0)
  assert.equal(partial.source, 'ai')
  assert.throws(() => parseClarifyOptions('no json here'), /JSON/)
})
