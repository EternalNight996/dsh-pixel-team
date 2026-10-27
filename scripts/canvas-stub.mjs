/**
 * 最小 canvas 桩：给只依赖 2D 上下文绘制贴图的模块做 Node 测试用。
 *
 * 只实现三类贴图模块真正用到的 API：fillRect / getImageData / putImageData /
 * 椭圆填充 / fillStyle / globalAlpha。像素按 source-over 混合，足以验证
 * "生成 + 描边 + 缓存"，不引入 jimp/canvas 这类原生依赖。
 */
import assert from 'node:assert/strict'

/** 解析贴图模块里实际用到的颜色写法：#rgb、#rrggbb、rgb()、rgba()。 */
export function parseColor(value) {
  const text = String(value).trim().toLowerCase()
  if (text === 'transparent') return [0, 0, 0, 0]
  if (text.startsWith('#')) {
    let hex = text.slice(1)
    if (hex.length === 3) hex = hex.split('').map(char => char + char).join('')
    if (!/^[0-9a-f]{6}$/.test(hex)) throw new Error('canvas stub: bad hex colour ' + text)
    return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16), 255]
  }
  const match = /^rgba?\(([^)]+)\)$/.exec(text)
  if (match !== null) {
    const parts = match[1].split(',').map(part => Number(part.trim()))
    const alpha = parts.length > 3 ? parts[3] : 1
    return [parts[0], parts[1], parts[2], Math.round(alpha * 255)]
  }
  throw new Error('canvas stub: unsupported colour ' + text)
}

class StubContext {
  constructor(canvas) {
    this.canvas = canvas
    this.imageSmoothingEnabled = true
    this.globalAlpha = 1
    this._fill = [0, 0, 0, 255]
    this._ellipses = []
  }

  set fillStyle(value) { this._fill = parseColor(value) }
  get fillStyle() { return this._fill }

  save() {}
  restore() {}
  translate() {}
  scale() {}
  beginPath() { this._ellipses = [] }
  moveTo() {}
  lineTo() {}
  closePath() {}
  arc() {}
  ellipse(x, y, rx, ry) { this._ellipses.push([x, y, rx, ry]) }

  fill() {
    for (const [x, y, rx, ry] of this._ellipses) {
      for (let py = Math.round(y - ry); py <= Math.round(y + ry); py += 1) {
        for (let px = Math.round(x - rx); px <= Math.round(x + rx); px += 1) {
          const dx = (px + 0.5 - x) / rx
          const dy = (py + 0.5 - y) / ry
          if (dx * dx + dy * dy <= 1) this._put(px, py)
        }
      }
    }
    this._ellipses = []
  }

  fillRect(x, y, w, h) {
    const left = Math.round(x)
    const top = Math.round(y)
    for (let py = top; py < top + Math.round(h); py += 1) {
      for (let px = left; px < left + Math.round(w); px += 1) this._put(px, py)
    }
  }

  _put(x, y) {
    const { width, height } = this.canvas
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const data = this.canvas._data
    const index = (y * width + x) * 4
    const [r, g, b, a] = this._fill
    const alpha = (a / 255) * this.globalAlpha
    const targetAlpha = data[index + 3] / 255
    const outAlpha = alpha + targetAlpha * (1 - alpha)
    if (outAlpha <= 0) return
    data[index] = Math.round((r * alpha + data[index] * targetAlpha * (1 - alpha)) / outAlpha)
    data[index + 1] = Math.round((g * alpha + data[index + 1] * targetAlpha * (1 - alpha)) / outAlpha)
    data[index + 2] = Math.round((b * alpha + data[index + 2] * targetAlpha * (1 - alpha)) / outAlpha)
    data[index + 3] = Math.round(outAlpha * 255)
  }

  getImageData(x, y, w, h) {
    const source = this.canvas._data
    const width = this.canvas.width
    const data = new Uint8ClampedArray(w * h * 4)
    for (let row = 0; row < h; row += 1) {
      const from = ((y + row) * width + x) * 4
      data.set(source.subarray(from, from + w * 4), row * w * 4)
    }
    return { data, width: w, height: h }
  }

  putImageData(image, x, y) {
    const width = this.canvas.width
    for (let row = 0; row < image.height; row += 1) {
      const from = row * image.width * 4
      const to = ((y + row) * width + x) * 4
      this.canvas._data.set(image.data.subarray(from, from + image.width * 4), to)
    }
  }
}

class StubCanvas {
  constructor() {
    this._width = 0
    this._height = 0
    this._data = new Uint8ClampedArray(0)
    this._context = null
  }

  get width() { return this._width }
  set width(value) {
    this._width = Math.max(0, Math.floor(value))
    this._allocate()
  }

  get height() { return this._height }
  set height(value) {
    this._height = Math.max(0, Math.floor(value))
    this._allocate()
  }

  _allocate() {
    const size = this._width * this._height * 4
    const next = new Uint8ClampedArray(size)
    if (this._data.length > 0 && size > 0) next.set(this._data.subarray(0, Math.min(size, this._data.length)))
    this._data = next
  }

  getContext(kind) {
    if (kind !== '2d') return null
    this._context ??= new StubContext(this)
    return this._context
  }
}

/** 安装到 globalThis.document，返回新建的 canvas（可绕过 document 直接建）。 */
export function installCanvasStub() {
  globalThis.document = {
    createElement(tag) {
      assert.equal(tag, 'canvas')
      return new StubCanvas()
    },
  }
  return StubCanvas
}

export { StubCanvas }
