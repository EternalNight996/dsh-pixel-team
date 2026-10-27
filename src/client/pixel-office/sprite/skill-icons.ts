/**
 * 功法印：16×16 的本命功法符号，按功法序号与境界色生成并缓存。
 *
 * 场景只在「天机阁」装上功法后画它：悬浮在修士身侧，随呼吸上下浮动。
 */

const INK = '#16110e'
const SIZE = 16

const FORMS = ['sword', 'flame', 'talisman', 'bolt', 'array', 'poison', 'lotus', 'demon'] as const
type Form = typeof FORMS[number]

function drawSigil(g: CanvasRenderingContext2D, form: Form, color: string, pale: string): void {
  const px = (x: number, y: number, w: number, h: number, c: string): void => { g.fillStyle = c; g.fillRect(x, y, w, h) }
  px(1, 1, 14, 14, 'rgba(16,20,30,0.55)')
  px(2, 2, 12, 12, color)
  px(3, 3, 10, 10, INK)
  switch (form) {
    case 'sword':
      px(7, 4, 2, 8, pale); px(5, 8, 6, 1, pale); px(6, 3, 4, 1, pale); break
    case 'flame':
      px(7, 4, 2, 3, pale); px(6, 6, 4, 4, pale); px(7, 10, 2, 2, pale); break
    case 'talisman':
      px(5, 4, 6, 8, pale); px(6, 6, 4, 1, INK); px(6, 8, 4, 1, INK); break
    case 'bolt':
      px(8, 4, 2, 4, pale); px(6, 8, 2, 2, pale); px(7, 10, 2, 2, pale); break
    case 'array':
      px(4, 5, 8, 1, pale); px(4, 10, 8, 1, pale); px(7, 5, 2, 6, pale); break
    case 'poison':
      px(7, 4, 2, 3, pale); px(5, 7, 6, 5, pale); px(6, 8, 4, 2, INK); break
    case 'lotus':
      px(7, 5, 2, 4, pale); px(5, 7, 2, 3, pale); px(9, 7, 2, 3, pale); break
    default:
      px(5, 5, 6, 6, pale); px(7, 7, 2, 2, INK); break
  }
}

function frame(g: CanvasRenderingContext2D, w: number, h: number, color: string): void {
  const img = g.getImageData(0, 0, w, h)
  const d = img.data
  const a = (x: number, y: number): number => (x < 0 || y < 0 || x >= w || y >= h) ? 0 : d[(y * w + x) * 4 + 3]!
  const add: Array<[number, number]> = []
  for (let y = 0; y < h; y += 1) for (let x = 0; x < w; x += 1) {
    if (a(x, y) > 0) continue
    if (a(x - 1, y) > 0 || a(x + 1, y) > 0 || a(x, y - 1) > 0 || a(x, y + 1) > 0) add.push([x, y])
  }
  const n = parseInt(INK.slice(1), 16)
  for (const [x, y] of add) { const i = (y * w + x) * 4; d[i] = (n >> 16) & 255; d[i + 1] = (n >> 8) & 255; d[i + 2] = n & 255; d[i + 3] = 255 }
  g.putImageData(img, 0, 0)
}

const cache = new Map<string, HTMLCanvasElement>()

/** 取一枚功法印（缓存）。 */
export function skillIcon(index: number, color: string): HTMLCanvasElement {
  const form = FORMS[Math.abs(index) % FORMS.length]!
  const key = form + '|' + color
  const hit = cache.get(key)
  if (hit !== undefined) return hit
  const canvas = document.createElement('canvas')
  canvas.width = SIZE; canvas.height = SIZE
  const g = canvas.getContext('2d')
  if (g === null) throw new Error('skill icon: 2d context unavailable')
  g.imageSmoothingEnabled = false
  drawSigil(g, form, color, '#ffffff')
  frame(g, SIZE, SIZE, color)
  cache.set(key, canvas)
  return canvas
}

export const SKILL_ICON_SIZE = SIZE