/**
 * 施法窗口回归：不同事件时长（950 / 1200ms）都要把四帧完整播完，
 * 不能像旧公式那样在 1200ms 破境时前 250ms 一直停在第 0 帧。
 */
import assert from 'node:assert/strict'
import test from 'node:test'
import { castFrameIndex } from '../lib/client/pixel-office/cast-timing.js'

const FRAMES = 4

test('the cast window plays every frame for both durations', () => {
  for (const duration of [950, 1200]) {
    const window = { start: 1000, until: 1000 + duration }
    const seen = new Set()
    for (let time = 1000; time <= 1000 + duration; time += 10) {
      seen.add(castFrameIndex(window, time, FRAMES))
    }
    assert.deepEqual([...seen].sort(), [0, 1, 2, 3], duration + 'ms window must reach every frame')
  }
})

test('frame index is monotonic inside the window and clamped outside it', () => {
  const window = { start: 0, until: 1000 }
  let previous = 0
  for (let time = 0; time <= 1000; time += 5) {
    const index = castFrameIndex(window, time, FRAMES)
    assert.ok(index >= previous, 'index must not go backwards')
    previous = index
  }
  assert.equal(castFrameIndex(window, 0, FRAMES), 0)
  assert.equal(castFrameIndex(window, 1000, FRAMES), FRAMES - 1)
})

test('degenerate inputs stay clamped', () => {
  assert.equal(castFrameIndex({ start: 10, until: 10 }, 10, FRAMES), FRAMES - 1)
  assert.equal(castFrameIndex({ start: 10, until: 20 }, 15, 0), 0)
  assert.equal(castFrameIndex({ start: 0, until: 100 }, -50, FRAMES), 0)
})
