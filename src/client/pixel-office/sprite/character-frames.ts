/**
 * 修士帧图集：参数化绘制一次，运行时只做 drawImage。
 *
 * 每个角色 48×92 逻辑像素（1 逻辑像素 ≈ 1 屏像素），按道途配色生成
 * 坐 / 走 / 骑 三套帧。帧一旦生成就缓存——每帧上百次 fillRect 只在首帧发生，
 * 之后每次重绘只有 1 次 drawImage。
 */

import type { RoleVisual } from '../../role-visuals.ts'

/** 画布尺寸：与旧版 92px 身形同高，缩放到场景时比例不变。 */
export const FRAME_W = 48
export const FRAME_H = 92

/** 一个角色的三套动作帧。 */
export interface CharacterFrames {
  readonly sit: readonly HTMLCanvasElement[]
  readonly walk: readonly HTMLCanvasElement[]
  readonly ride: readonly HTMLCanvasElement[]
  readonly cast: readonly HTMLCanvasElement[]
}

/** 自定义道途没有 RoleVisual 时的兜底配色。 */
const FALLBACK = {
  robe: '#5b8def', robeDark: '#3d63ad', robeLight: '#84abf5',
  trim: '#e8eef8', accent: '#cfe4ff', hair: '#2a2f3a', skin: '#f2cfae',
  shadow: '#d9ab86',
}

type Palette = {
  robe: string; dark: string; light: string; trim: string
  hair: string; skin: string; shadow: string; bun: boolean; beard: boolean
}

const INK = '#16110e'
const GOLD = '#f2c14e'

function paletteOf(visual: RoleVisual | undefined, isLeader: boolean): Palette {
  if (visual === undefined) {
    return { ...FALLBACK, dark: FALLBACK.robeDark, light: FALLBACK.robeLight, bun: isLeader, beard: false }
  }
  return {
    robe: visual.robe,
    dark: visual.robeDark,
    light: visual.robeLight,
    trim: visual.trim,
    hair: visual.hair,
    skin: visual.skin,
    shadow: '#d9ab86',
    bun: isLeader || visual.hairStyle === 'topknot',
    beard: visual.beard === true,
  }
}

type Pose = {
  /** 抬手施法：右臂上举 + 掌心灵光。 */
  cast?: number
  bob: number
  legL: number
  legR: number
  armL: number
  armR: number
  lean: number
  sitting: boolean
}

function paintFrame(g: CanvasRenderingContext2D, p: Palette, pose: Pose): void {
  const px = (x: number, y: number, w: number, h: number, color: string): void => {
    g.fillStyle = color
    g.fillRect(x, y + pose.bob, w, h)
  }
  const lean = pose.lean

  // 宽袖与手
  px(9 + pose.armL, 43, 5, 18, p.robe)
  px(9 + pose.armL, 43, 1, 18, p.light)
  px(9 + pose.armL, 59, 5, 2, p.trim)
  px(10 + pose.armL, 61, 3, 3, p.skin)
  if (pose.cast !== undefined) {
    // 施法：右臂上举，掌心聚灵光
    px(33, 34, 6, 14, p.robe)
    px(38, 34, 1, 14, p.dark)
    px(33, 32, 6, 2, p.trim)
    px(34, 29, 4, 4, p.skin)
    const o = pose.cast
    px(37, 25 - o, 4, 4, '#f2c14e')
    px(38, 26 - o, 2, 2, '#fff6d8')
    if (o > 0) { px(35, 23 - o, 8, 1, 'rgba(255,233,168,0.55)'); px(36, 29 - o, 6, 1, 'rgba(255,233,168,0.35)') }
  } else {
    px(34 + pose.armR, 43, 5, 18, p.robe)
    px(38 + pose.armR, 43, 1, 18, p.dark)
    px(34 + pose.armR, 59, 5, 2, p.trim)
    px(35 + pose.armR, 61, 3, 3, p.skin)
  }

  // 裙摆
  px(9 + lean, 65, 30, 16, p.robe)
  px(9 + lean, 65, 3, 16, p.light)
  px(36 + lean, 65, 3, 16, p.dark)
  px(9 + lean, 79, 30, 2, p.trim)
  px(12 + lean, 81, 3, 1, p.trim)
  px(33 + lean, 81, 3, 1, p.trim)

  // 腿与鞋：坐姿把腿收进案下，只留一点袍角
  if (!pose.sitting) {
    px(16 + pose.legL, 82, 6, 6, p.dark)
    px(26 + pose.legR, 82, 6, 6, p.dark)
    px(15 + pose.legL, 88, 8, 3, INK)
    px(25 + pose.legR, 88, 8, 3, INK)
    px(15 + pose.legL, 90, 8, 1, p.trim)
    px(25 + pose.legR, 90, 8, 1, p.trim)
  }

  // 躯干
  px(14 + lean, 41, 20, 22, p.robe)
  px(14 + lean, 41, 3, 22, p.light)
  px(31 + lean, 41, 3, 22, p.dark)
  // 交领
  px(20 + lean, 42, 2, 10, p.trim)
  px(26 + lean, 42, 2, 10, p.trim)
  px(22 + lean, 46, 4, 1, p.trim)
  // 腰带
  px(14 + lean, 61, 20, 4, p.dark)
  px(14 + lean, 61, 20, 1, p.trim)
  px(22 + lean, 61, 4, 4, GOLD)

  // 头
  px(16, 25, 16, 14, p.skin)
  px(16, 25, 16, 3, p.hair)
  px(14, 27, 2, 13, p.hair)
  px(32, 27, 2, 13, p.hair)
  if (!pose.sitting) px(14, 40, 2, 3, p.hair)
  if (p.bun) {
    px(21, 18, 6, 7, p.hair)
    px(23, 16, 2, 2, GOLD)
  }
  // 眉眼与嘴
  px(20, 32, 2, 2, '#24303f')
  px(27, 32, 2, 2, '#24303f')
  px(23, 37, 3, 1, p.shadow)
  if (p.beard) px(19, 36, 10, 3, '#cfcbc2')
  // 颈
  px(21, 39, 6, 2, p.skin)

  // 掌门金冠
  if (p.bun && p.trim !== undefined) {
    px(18, 22, 12, 2, GOLD)
    px(23, 15, 2, 7, p.trim)
    px(27, 16, 6, 1, GOLD)
  }
}

/** 1px 外描边：保证任何底色上都读得清剪影。 */
function outline(g: CanvasRenderingContext2D): void {
  const img = g.getImageData(0, 0, FRAME_W, FRAME_H)
  const d = img.data
  const alpha = (x: number, y: number): number =>
    (x < 0 || y < 0 || x >= FRAME_W || y >= FRAME_H) ? 0 : d[(y * FRAME_W + x) * 4 + 3]!
  const add: Array<[number, number]> = []
  for (let y = 0; y < FRAME_H; y += 1) {
    for (let x = 0; x < FRAME_W; x += 1) {
      if (alpha(x, y) > 0) continue
      if (alpha(x - 1, y) > 0 || alpha(x + 1, y) > 0 || alpha(x, y - 1) > 0 || alpha(x, y + 1) > 0) add.push([x, y])
    }
  }
  const n = parseInt(INK.slice(1), 16)
  for (const [x, y] of add) {
    const i = (y * FRAME_W + x) * 4
    d[i] = (n >> 16) & 255; d[i + 1] = (n >> 8) & 255; d[i + 2] = n & 255; d[i + 3] = 255
  }
  g.putImageData(img, 0, 0)
}

function makeCanvas(): { canvas: HTMLCanvasElement; g: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas')
  canvas.width = FRAME_W
  canvas.height = FRAME_H
  const g = canvas.getContext('2d')
  if (g === null) throw new Error('sprite: 2d context unavailable')
  g.imageSmoothingEnabled = false
  return { canvas, g }
}

function frameOf(p: Palette, pose: Pose): HTMLCanvasElement {
  const { canvas, g } = makeCanvas()
  paintFrame(g, p, pose)
  outline(g)
  return canvas
}

const cache = new Map<string, CharacterFrames>()

/** 生成（并缓存）一个道途的三套帧。 */
export function characterFrames(roleKey: string, visual: RoleVisual | undefined, isLeader: boolean): CharacterFrames {
  const key = roleKey + '|' + String(isLeader)
  const hit = cache.get(key)
  if (hit !== undefined) return hit
  const p = paletteOf(visual, isLeader)

  const sit: HTMLCanvasElement[] = [
    frameOf(p, { bob: 0, legL: 0, legR: 0, armL: 0, armR: 0, lean: 0, sitting: true }),
    frameOf(p, { bob: -1, legL: 0, legR: 0, armL: 0, armR: 0, lean: 0, sitting: true }),
  ]

  const gait: Pose[] = [
    { bob: 0, legL: 0, legR: 0, armL: 0, armR: 0, lean: 0, sitting: false },
    { bob: -1, legL: -1, legR: 1, armL: 1, armR: -1, lean: 0, sitting: false },
    { bob: 0, legL: -2, legR: 2, armL: 2, armR: -2, lean: 0, sitting: false },
    { bob: 0, legL: 0, legR: 0, armL: 0, armR: 0, lean: 0, sitting: false },
    { bob: -1, legL: 1, legR: -1, armL: -1, armR: 1, lean: 0, sitting: false },
    { bob: 0, legL: 2, legR: -2, armL: -2, armR: 2, lean: 0, sitting: false },
  ]

  const ride: HTMLCanvasElement[] = [
    frameOf(p, { bob: 0, legL: 0, legR: 0, armL: 1, armR: 1, lean: 0, sitting: true }),
    frameOf(p, { bob: -1, legL: 0, legR: 0, armL: 1, armR: 1, lean: 0, sitting: true }),
  ]

  const cast: HTMLCanvasElement[] = [0, 1, 2, 3].map(step => frameOf(p, {
    bob: step > 1 ? -1 : 0, legL: 0, legR: 0, armL: 0, armR: 0, lean: 0, sitting: true, cast: step,
  }))
  const frames: CharacterFrames = { sit, walk: gait.map(pose => frameOf(p, pose)), ride, cast }
  cache.set(key, frames)
  return frames
}

/** 测试/热重载用：清空帧缓存。 */
export function clearFrameCache(): void {
  cache.clear()
}