/**
 * 帧图集回归：修士 / 坐骑 / 功法印三类贴图必须一次生成、缓存复用，
 * 每帧都有实际像素与 1px 描边，而且不同动作、不同配色真的长得不一样。
 *
 * 贴图模块只在浏览器里跑（document.createElement('canvas')），所以测试用
 * scripts/canvas-stub.mjs 的最小 canvas 桩，不依赖任何原生图像库。
 */
import assert from 'node:assert/strict'
import test from 'node:test'
import { createHash } from 'node:crypto'
import { installCanvasStub } from './canvas-stub.mjs'

installCanvasStub()

const { characterFrames, clearFrameCache, FRAME_H, FRAME_W } = await import('../lib/client/pixel-office/sprite/character-frames.js')
const { mountFrames, MOUNT_H, MOUNT_W } = await import('../lib/client/pixel-office/sprite/mount-frames.js')
const { skillIcon, SKILL_ICON_SIZE } = await import('../lib/client/pixel-office/sprite/skill-icons.js')
const { ROLE_VISUALS, roleVisual } = await import('../lib/client/role-visuals.js')

const INK = [22, 17, 14]

function signature(canvas) {
  return createHash('sha256').update(Buffer.from(canvas._data)).digest('hex')
}

function opaqueCount(canvas) {
  let count = 0
  for (let index = 3; index < canvas._data.length; index += 4) if (canvas._data[index] > 0) count += 1
  return count
}

function isInk(canvas, x, y) {
  const index = (y * canvas.width + x) * 4
  const data = canvas._data
  return data[index + 3] > 0 && data[index] === INK[0] && data[index + 1] === INK[1] && data[index + 2] === INK[2]
}

/** 1px 描边 = 至少一个墨色像素紧贴透明区（剪影外沿）。 */
function hasInkBorder(canvas) {
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      if (!isInk(canvas, x, y)) continue
      const neighbours = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]
      for (const [nx, ny] of neighbours) {
        if (nx < 0 || ny < 0 || nx >= canvas.width || ny >= canvas.height) return true
        if (canvas._data[(ny * canvas.width + nx) * 4 + 3] === 0) return true
      }
    }
  }
  return false
}

test('修士帧图集：四套动作、缓存复用、每帧有像素与描边', () => {
  clearFrameCache()
  const visual = roleVisual('implementer')
  const frames = characterFrames('implementer', visual, false)
  assert.equal(frames, characterFrames('implementer', visual, false), 'same role must reuse the cached frames')
  assert.deepEqual(
    [frames.sit.length, frames.walk.length, frames.ride.length, frames.cast.length],
    [2, 6, 2, 4],
    'sit/walk/ride/cast frame counts',
  )
  assert.equal(FRAME_W, 48)
  assert.equal(FRAME_H, 92)
  for (const pose of ['sit', 'walk', 'ride', 'cast']) {
    for (const canvas of frames[pose]) {
      assert.equal(canvas.width, FRAME_W)
      assert.equal(canvas.height, FRAME_H)
      assert.ok(opaqueCount(canvas) > 300, pose + ' frame is nearly empty')
      assert.ok(hasInkBorder(canvas), pose + ' frame is missing its 1px outline')
    }
  }
  assert.ok(new Set(frames.cast.map(signature)).size >= 3, 'the four cast frames must differ')
  assert.ok(new Set(frames.walk.map(signature)).size >= 4, 'the walk cycle must actually animate')
  assert.notEqual(signature(frames.sit[0]), signature(frames.walk[0]), 'sitting and standing poses differ')
  assert.notEqual(signature(frames.ride[0]), signature(frames.walk[0]), 'riding pose differs from walking')
})

test('每位道途都有自己的配色帧，掌门额外加冠', () => {
  clearFrameCache()
  const roles = Object.keys(ROLE_VISUALS)
  assert.ok(roles.length >= 20, 'expected the full 道途 list')
  const signatures = new Set()
  for (const role of roles) {
    const frames = characterFrames(role, roleVisual(role), false)
    assert.equal(frames.walk.length, 6, role + ' walk frames')
    assert.ok(opaqueCount(frames.walk[0]) > 300, role + ' frame is nearly empty')
    signatures.add(signature(frames.walk[0]))
  }
  assert.ok(signatures.size >= 15, 'roles must not all share one palette, got ' + signatures.size + ' unique frames')
  const captain = characterFrames('captain', roleVisual('captain'), true)
  const plain = characterFrames('captain', roleVisual('captain'), false)
  assert.notEqual(signature(captain.sit[0]), signature(plain.sit[0]), 'the captain crown must change the art')
})

test('坐骑帧图集：六族四帧、鸟兽有别、缓存复用', () => {
  assert.equal(MOUNT_W, 56)
  assert.equal(MOUNT_H, 40)
  const first = mountFrames('qilin')
  assert.equal(first, mountFrames('qilin'), 'same mount must reuse the cached frames')
  const uniqueFrames = new Map()
  for (const model of ['beast', 'qilin', 'dragon', 'crane', 'phoenix', 'dao']) {
    const frames = mountFrames(model)
    assert.equal(frames.length, 4, model + ' must expose four gait frames')
    for (const canvas of frames) {
      assert.equal(canvas.width, MOUNT_W)
      assert.equal(canvas.height, MOUNT_H)
      assert.ok(opaqueCount(canvas) > 250, model + ' frame is nearly empty')
      assert.ok(hasInkBorder(canvas), model + ' frame is missing its 1px outline')
    }
    uniqueFrames.set(model, new Set(frames.map(signature)).size)
  }
  // 四足四帧必须帧帧不同；鸟形振翅上下对称，允许中位帧重合（至少三帧）。
  for (const model of ['beast', 'qilin', 'dragon', 'dao']) {
    assert.equal(uniqueFrames.get(model), 4, model + ' gait degenerated to ' + uniqueFrames.get(model) + ' unique frames')
  }
  for (const model of ['crane', 'phoenix']) {
    assert.ok(uniqueFrames.get(model) >= 3, model + ' gait degenerated to ' + uniqueFrames.get(model) + ' unique frames')
  }
  assert.notEqual(signature(mountFrames('qilin')[0]), signature(mountFrames('dragon')[0]), 'mount families need distinct palettes')
  const fallback = mountFrames('unknown-mount')
  assert.equal(fallback.length, 4, 'unknown mounts fall back to the beast family')
  assert.ok(opaqueCount(fallback[0]) > 250)
})

test('功法印：八式循环、按色缓存、每枚都有描边', () => {
  assert.equal(SKILL_ICON_SIZE, 16)
  const signatures = new Set()
  for (let index = 0; index < 8; index += 1) {
    const icon = skillIcon(index, '#f2c14e')
    assert.equal(icon.width, SKILL_ICON_SIZE)
    assert.equal(icon.height, SKILL_ICON_SIZE)
    assert.ok(opaqueCount(icon) > 80, 'skill icon ' + index + ' is nearly empty')
    assert.ok(hasInkBorder(icon), 'skill icon ' + index + ' is missing its outline')
    signatures.add(signature(icon))
  }
  assert.equal(signatures.size, 8, 'the eight 功法 forms must be visually distinct')
  assert.equal(skillIcon(0, '#f2c14e'), skillIcon(8, '#f2c14e'), 'the same form and colour reuse one cached icon')
  assert.notEqual(signature(skillIcon(0, '#f2c14e')), signature(skillIcon(0, '#3f6a8a')), 'realm colour must change the icon')
})
