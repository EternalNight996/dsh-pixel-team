/**
 * 贪吃蛇大作战的纯逻辑（不碰 DOM / React）：组件只负责绘制与事件，规则都在这里，
 * 便于 scripts/snake-game.test.mjs 直接回归。
 */
export declare const COLS = 20;
export declare const ROWS = 20;
export declare const CELL = 16;
export declare const SIZE: number;
export declare const TICK_MS = 120;
export declare const START_LEN = 3;
export declare const FOOD_SCORE = 10;
export type Cell = {
    readonly x: number;
    readonly y: number;
};
export type Dir = {
    readonly x: number;
    readonly y: number;
};
export type Status = 'running' | 'paused' | 'over';
export type GameState = {
    readonly snake: readonly Cell[];
    readonly dir: Dir;
    readonly food: Cell | undefined;
    readonly score: number;
    readonly status: Status;
};
export declare const RIGHT: Dir;
/** 初始蛇长 3：头 (10,10)，身体 (9,10)(8,10)，朝右。 */
export declare function initialSnake(): Cell[];
/** 场上恒一个食物：从全盘空格里随机取；没有空格时返回 undefined（判 over）。 */
export declare function spawnFood(snake: readonly Cell[]): Cell | undefined;
export declare function createGame(): GameState;
/**
 * 只能转 90°：同向忽略、反向（180° 掉头）丢弃。
 * 基准是「已提交方向」而不是本次 tick 里排队的方向——否则同一 tick 内
 * 先按 ↑ 再按 ← 会把 pending 覆盖成反向，下一 tick 蛇头直接撞进身体（N1）。
 */
export declare function turnAllowed(current: Dir, input: Dir): boolean;
/** 键盘事件落在输入控件上时不应被游戏拦截（N3）。 */
export declare function isEditableTarget(target: unknown): boolean;
/**
 * 推进一 tick。queued 是上一 tick 之后玩家最后一次转向，仅在与已提交方向
 * 合法（turnAllowed）时生效；撞墙、撞自身、吃满棋盘都返回 over。
 */
export declare function stepGame(state: GameState, queued: Dir | undefined): GameState;
