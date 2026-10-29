/** 冒烟验证：贪吃蛇开启（node projects/贪吃蛇开启/smoke.mjs）。 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { COLS, ROWS, FOOD_SCORE, LICENSE_KEY, createGame, isLicensed, placeFood, restart, step, togglePause, turnAllowed } from './game.mjs'

// 1. 初始状态
const start = createGame()
assert.equal(start.snake.length, 3)
assert.deepEqual(start.snake[0], { x: 10, y: 10 })
assert.equal(start.score, 0)
assert.equal(start.status, 'running')

// 2. 移动 + 不反向
assert.equal(turnAllowed({ x: 1, y: 0 }, { x: -1, y: 0 }), false)
assert.equal(turnAllowed({ x: 1, y: 0 }, { x: 0, y: -1 }), true)
let state = step(start, { x: -1, y: 0 })
assert.deepEqual(state.snake[0], { x: 11, y: 10 }, '180° reverse must be ignored')

// 3. 吃食物 +10 且变长
state = { ...start, food: { x: 11, y: 10 } }
const ate = step(state)
assert.equal(ate.score, FOOD_SCORE)
assert.equal(ate.snake.length, 4)

// 4. 食物不会落在蛇身上
for (let i = 0; i < 200; i += 1) {
  const food = placeFood(start.snake, () => i / 200)
  if (food !== undefined) {
    assert.ok(!start.snake.some((cell) => cell.x === food.x && cell.y === food.y))
  }
}

// 5. 撞墙结束
const wall = step({ ...start, snake: [{ x: COLS - 1, y: 10 }, { x: COLS - 2, y: 10 }, { x: COLS - 3, y: 10 }] })
assert.equal(wall.status, 'over')

// 6. 撞自身结束
const selfHit = step({ ...start, snake: [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 6, y: 6 }, { x: 6, y: 5 }] }, { x: 0, y: -1 })
assert.equal(selfHit.status, 'over')

// 7. 暂停/重开
assert.equal(togglePause(start).paused, true)
const again = restart()
assert.equal(again.score, 0)
assert.equal(again.snake.length, 3)

// 8. 授权门
assert.equal(isLicensed(LICENSE_KEY), true)
assert.equal(isLicensed('WRONG'), false)

// 9. 页面结构
const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8')
assert.ok(html.includes('width="320"') && html.includes('height="320"'))
assert.ok(html.includes('license-start') && html.includes('data-score'))
assert.ok(html.includes('data-dir="up"') && html.includes('data-dir="left"') && html.includes('data-dir="right"') && html.includes('data-dir="down"'))
assert.ok(html.includes('game.mjs'))

console.log('【PASS】贪吃蛇开启冒烟：移动/食物/撞墙/自撞/暂停/重开/授权/页面结构 9 组断言通过')
