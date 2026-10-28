/**
 * 贪吃蛇大作战最小回归：覆盖 t5 审查的 N1（同 tick 双转向瞬死）、
 * N3（window 级键盘拦截输入控件）、N4（虚拟键遮挡棋盘）。
 *
 * 只跑冒烟主流程相关的三条规则；逻辑一律取自 lib/client/snake-game/game.js
 * （构建产物，和 verify:web-routes 里其它客户端测试同一来源）。
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  CELL,
  COLS,
  ROWS,
  createGame,
  isEditableTarget,
  stepGame,
  turnAllowed,
} from '../lib/client/snake-game/game.js'

const here = dirname(fileURLToPath(import.meta.url))
const sourceDir = join(here, '..', 'src', 'client', 'snake-game')
const readSource = (name) => readFileSync(join(sourceDir, name), 'utf8')

const overlaps = (a, b) =>
  a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h

/** 从某段 JSX 里的 <div 起，按深度找到配对 </div> 的下标。 */
function matchingDivClose(source, from) {
  const start = source.indexOf('<div', from)
  if (start < 0) return -1
  let depth = 0
  let cursor = start
  while (cursor < source.length) {
    const open = source.indexOf('<div', cursor)
    const close = source.indexOf('</div>', cursor)
    if (close < 0) return -1
    if (open >= 0 && open < close) {
      depth += 1
      cursor = open + 4
    } else {
      depth -= 1
      if (depth === 0) return close
      cursor = close + 6
    }
  }
  return -1
}

test('N1 朝右时同 tick 先 ↑ 再 ← 不会立刻结束', () => {
  const start = createGame()
  assert.deepEqual(start.snake[0], { x: 10, y: 10 })
  assert.deepEqual(start.dir, { x: 1, y: 0 })

  // ↑ 合法；← 相对「已提交方向 right」是 180° 掉头，必须丢弃。
  assert.equal(turnAllowed(start.dir, { x: 0, y: -1 }), true)
  assert.equal(turnAllowed(start.dir, { x: -1, y: 0 }), false)

  // 组件把排队方向交给 tick：只有 ↑ 会生效，蛇向上走且存活。
  const queued = turnAllowed(start.dir, { x: 0, y: -1 }) ? { x: 0, y: -1 } : undefined
  const afterUp = stepGame(start, queued)
  assert.equal(afterUp.status, 'running')
  assert.deepEqual(afterUp.snake[0], { x: 10, y: 9 })

  // 即便反向输入漏到 tick，stepGame 也按已提交方向忽略，绝不瞬死。
  const afterLeak = stepGame(start, { x: -1, y: 0 })
  assert.equal(afterLeak.status, 'running')
  assert.deepEqual(afterLeak.snake[0], { x: 11, y: 10 })

  // 组件侧的反向判定必须用已提交方向（state.dir），不能用排队方向。
  assert.match(readSource('SnakeGame.tsx'), /turnAllowed\(state\.dir, input\)/)
})

test('N3 输入控件上的按键不拦截、不改向', () => {
  for (const tagName of ['INPUT', 'input', 'TEXTAREA', 'textarea', 'SELECT']) {
    assert.equal(isEditableTarget({ tagName }), true, tagName + ' 应视为输入控件')
  }
  assert.equal(isEditableTarget({ tagName: 'div', isContentEditable: true }), true)
  assert.equal(isEditableTarget({ tagName: 'DIV', isContentEditable: false }), false)
  assert.equal(isEditableTarget(null), false)
  assert.equal(isEditableTarget({}), false)
  // 组件在 keydown 最前面放行输入控件，之后才 preventDefault / 改向。
  const tsx = readSource('SnakeGame.tsx')
  assert.match(tsx, /if \(isEditableTarget\(event\.target\)\) return/)
  const guardAt = tsx.indexOf('isEditableTarget(event.target)')
  const preventAt = tsx.indexOf('event.preventDefault()', guardAt)
  assert.ok(guardAt >= 0 && preventAt > guardAt, '放行判断必须在 preventDefault 之前')
})

test('N4 虚拟方向键在棋盘之外，.pad 与 canvas 矩形不相交', () => {
  const css = readSource('SnakeGame.module.css')
  const rule = /(?:^|\n)\.pad\s*\{([^}]*)\}/.exec(css)
  assert.ok(rule, '.pad 规则应存在')
  const body = rule[1]
  assert.ok(!/position\s*:\s*absolute/.test(body), '.pad 不得绝对定位')
  assert.ok(!/(?:^|;)\s*(?:top|right|bottom|left|inset)\s*:/.test(body), '.pad 不得带偏移定位')

  // 结构：.pad 必须在 .stage（320×320 棋盘）闭合之后，即棋盘之外。
  const tsx = readSource('SnakeGame.tsx')
  const stageOpen = tsx.indexOf('className={css.stage}')
  const padOpen = tsx.indexOf('className={css.pad}')
  assert.ok(stageOpen >= 0 && padOpen > stageOpen, '.pad 应排在 .stage 之后')
  const stageClose = matchingDivClose(tsx, stageOpen)
  assert.ok(stageClose > stageOpen, '应能找到 .stage 的闭合标签')
  assert.ok(padOpen > stageClose, '.pad 不能嵌在 .stage 内（否则会盖住棋盘）')

  // 几何：棋盘 320×320 从 (0,0) 起；pad 在正常流中紧随其下 → 两矩形不相交。
  const board = { x: 0, y: 0, w: COLS * CELL, h: ROWS * CELL }
  const pad = { x: 0, y: board.h, w: 3 * 34, h: 3 * 34 }
  assert.equal(overlaps(board, pad), false)
})
