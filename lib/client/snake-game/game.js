/**
 * 贪吃蛇大作战的纯逻辑（不碰 DOM / React）：组件只负责绘制与事件，规则都在这里，
 * 便于 scripts/snake-game.test.mjs 直接回归。
 */
export const COLS = 20;
export const ROWS = 20;
export const CELL = 16;
export const SIZE = COLS * CELL;
export const TICK_MS = 120;
export const START_LEN = 3;
export const FOOD_SCORE = 10;
const START_HEAD = { x: 10, y: 10 };
export const RIGHT = { x: 1, y: 0 };
/** 初始蛇长 3：头 (10,10)，身体 (9,10)(8,10)，朝右。 */
export function initialSnake() {
    return [
        { x: START_HEAD.x, y: START_HEAD.y },
        { x: START_HEAD.x - 1, y: START_HEAD.y },
        { x: START_HEAD.x - 2, y: START_HEAD.y },
    ];
}
/** 场上恒一个食物：从全盘空格里随机取；没有空格时返回 undefined（判 over）。 */
export function spawnFood(snake) {
    const taken = new Set();
    for (const cell of snake)
        taken.add(cell.x + ',' + cell.y);
    const empty = [];
    for (let y = 0; y < ROWS; y += 1) {
        for (let x = 0; x < COLS; x += 1) {
            if (!taken.has(x + ',' + y))
                empty.push({ x, y });
        }
    }
    if (empty.length === 0)
        return undefined;
    return empty[Math.floor(Math.random() * empty.length)];
}
export function createGame() {
    const snake = initialSnake();
    return { snake, dir: RIGHT, food: spawnFood(snake), score: 0, status: 'running' };
}
/**
 * 只能转 90°：同向忽略、反向（180° 掉头）丢弃。
 * 基准是「已提交方向」而不是本次 tick 里排队的方向——否则同一 tick 内
 * 先按 ↑ 再按 ← 会把 pending 覆盖成反向，下一 tick 蛇头直接撞进身体（N1）。
 */
export function turnAllowed(current, input) {
    if (current.x === input.x && current.y === input.y)
        return false;
    if (current.x === -input.x && current.y === -input.y)
        return false;
    return true;
}
/** 键盘事件落在输入控件上时不应被游戏拦截（N3）。 */
export function isEditableTarget(target) {
    if (target === null || typeof target !== 'object')
        return false;
    const node = target;
    const tag = typeof node.tagName === 'string' ? node.tagName.toUpperCase() : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT')
        return true;
    return node.isContentEditable === true;
}
/**
 * 推进一 tick。queued 是上一 tick 之后玩家最后一次转向，仅在与已提交方向
 * 合法（turnAllowed）时生效；撞墙、撞自身、吃满棋盘都返回 over。
 */
export function stepGame(state, queued) {
    if (state.status !== 'running')
        return state;
    const dir = queued !== undefined && turnAllowed(state.dir, queued) ? queued : state.dir;
    const head = state.snake[0];
    if (head === undefined)
        return { ...state, dir, status: 'over' };
    const next = { x: head.x + dir.x, y: head.y + dir.y };
    // 撞墙：越界即结束。
    if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) {
        return { ...state, dir, status: 'over' };
    }
    const eating = state.food !== undefined && next.x === state.food.x && next.y === state.food.y;
    // 不吃食物时尾巴让位，因此只和「去掉尾巴」的身体比是否自撞。
    const body = eating ? state.snake : state.snake.slice(0, -1);
    if (body.some(cell => cell.x === next.x && cell.y === next.y)) {
        return { ...state, dir, status: 'over' };
    }
    const snake = eating ? [next, ...state.snake] : [next, ...state.snake.slice(0, -1)];
    if (!eating)
        return { ...state, dir, snake };
    const score = state.score + FOOD_SCORE;
    const food = spawnFood(snake);
    if (food === undefined)
        return { ...state, dir, snake, score, food, status: 'over' };
    return { ...state, dir, snake, score, food };
}
