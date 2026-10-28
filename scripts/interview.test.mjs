/**
 * Dynamic interview: question parsing and answer -> clarification conversion.
 */
import assert from 'node:assert/strict'
import test from 'node:test'
import { clarificationFromOptions, fallbackInterviewQuestions, parseInterviewQuestions } from '../lib/interview.js'
import { parseClarifyOptions } from '../lib/clarify-options.js'

test('interview questions are parsed, deduped and validated', () => {
  const questions = parseInterviewQuestions('前言 {"questions":[{"id":"platform","prompt":"平台？","multi":true,"options":["Windows","Linux"]},{"id":"platform","prompt":"验收？","multi":false,"options":["a","b"]},{"prompt":"无效","options":["one"]}]} 后缀')
  assert.equal(questions.length, 2)
  assert.equal(questions[0].multi, true)
  assert.equal(questions[1].id, 'platform-1')
  assert.throws(() => parseInterviewQuestions('no json'), /JSON/)
  assert.throws(() => parseInterviewQuestions('{"questions":[]}'), /no usable/)
})

test('fallback questions are mode-shaped', () => {
  const questions = fallbackInterviewQuestions('legacy')
  assert.ok(questions.some(question => question.options.includes('禁止重构底层')))
})

test('answers become a valid clarification with the mode baseline', () => {
  const options = parseClarifyOptions('{"platforms":["Windows"],"acceptance":[],"excluded":[]}', 'legacy')
  const clarification = clarificationFromOptions(options, 'legacy')
  assert.equal(clarification.mode, 'legacy')
  assert.deepEqual(clarification.platforms, ['Windows'])
  assert.ok(clarification.excluded.includes('禁止重构底层'))
  assert.ok(clarification.acceptance.some(item => item.includes('旧接口回归')))
})
