/** 贪吃蛇核心逻辑（纯函数式，可被浏览器与 Node 测试共用）。 */
export const CELL = 16
export const COLS = 20
export const ROWS = 20
export const TICK_MS = 120
export const FOOD_SCORE = 10
export const LICENSE_KEY = 'SNAKE-DEMO-2026'

export function isLicensed(key) {
  return String(key).trim() === LICENSE_KEY
}

export function createGame(random = Math.random) {
  const snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]
  return {
    snake,
    dir: { x: 1, y: 0 },
    score: 0,
    status: 'running',
    paused: false,
    food: placeFood(snake, random),
  }
}

export function placeFood(snake, random = Math.random) {
  const occupied = new Set(snake.map((cell) => cell.x + ',' + cell.y))
  const free = []
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      if (!occupied.has(x + ',' + y)) free.push({ x, y })
    }
  }
  if (free.length === 0) return undefined
  return free[Math.floor(random() * free.length)]
}

/** Only a non-reverse direction is accepted; same direction is a no-op. */
export function turnAllowed(dir, next) {
  if (next === undefined) return false
  if (next.x === 0 && next.y === 0) return false
  return !(dir.x === -next.x && dir.y === -next.y)
}

export function step(state, nextDir, random = Math.random) {
  if (state.status !== 'running' || state.paused) return state
  const dir = nextDir !== undefined && turnAllowed(state.dir, nextDir) ? nextDir : state.dir
  const head = state.snake[0]
  const target = { x: head.x + dir.x, y: head.y + dir.y }
  const hitsWall = target.x < 0 || target.y < 0 || target.x >= COLS || target.y >= ROWS
  const eats = state.food !== undefined && target.x === state.food.x && target.y === state.food.y
  const body = eats ? state.snake : state.snake.slice(0, -1)
  const hitsSelf = body.some((cell) => cell.x === target.x && cell.y === target.y)
  if (hitsWall || hitsSelf) {
    return { ...state, dir, status: 'over' }
  }
  const snake = eats ? [target, ...state.snake] : [target, ...state.snake.slice(0, -1)]
  return {
    ...state,
    dir,
    snake,
    score: eats ? state.score + FOOD_SCORE : state.score,
    food: eats ? placeFood(snake, random) : state.food,
  }
}

export function togglePause(state) {
  if (state.status !== 'running') return state
  return { ...state, paused: !state.paused }
}

export function restart(random = Math.random) {
  return createGame(random)
}
