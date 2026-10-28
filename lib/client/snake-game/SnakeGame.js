import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 贪吃蛇大作战：洞府「🐍 贪吃蛇」面板里的极简像素小游戏。
 *
 * 规则（移动 / 食物 / 计分 / 结束 / 转向校验）都在 ./game.ts 的纯函数里；
 * 组件只负责 canvas 绘制、定时器与交互事件。React state 只镜像分数 / 蛇长 / 局态，
 * 避免每帧重渲染；每个 tick 整张 canvas 重绘，不做插值。
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { CELL, COLS, ROWS, SIZE, START_LEN, TICK_MS, createGame, isEditableTarget, stepGame, turnAllowed, } from "./game.js";
import css from './SnakeGame.module.css';
const BOARD_BG = '#0d131c';
const GRID_LINE = 'rgba(255, 255, 255, 0.05)';
const BODY_COLOR = '#7fd6a8';
const HEAD_COLOR = '#f2c14e';
const FOOD_COLOR = '#e0563f';
/** 键盘方向键 → 方向（其余键不处理）。 */
const KEY_DIRS = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
};
/** 整张棋盘重绘：底色、淡网格、食物、蛇（头亮身柔）。 */
function paint(canvas, snake, food) {
    const ctx = canvas.getContext('2d');
    if (ctx === null)
        return;
    ctx.fillStyle = BOARD_BG;
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.strokeStyle = GRID_LINE;
    ctx.lineWidth = 1;
    for (let i = 1; i < COLS; i += 1) {
        const at = i * CELL + 0.5;
        ctx.beginPath();
        ctx.moveTo(at, 0);
        ctx.lineTo(at, SIZE);
        ctx.stroke();
    }
    for (let j = 1; j < ROWS; j += 1) {
        const at = j * CELL + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, at);
        ctx.lineTo(SIZE, at);
        ctx.stroke();
    }
    if (food !== undefined) {
        ctx.fillStyle = FOOD_COLOR;
        ctx.fillRect(food.x * CELL + 4, food.y * CELL + 4, CELL - 8, CELL - 8);
    }
    for (let index = snake.length - 1; index >= 0; index -= 1) {
        const cell = snake[index];
        if (cell === undefined)
            continue;
        ctx.fillStyle = index === 0 ? HEAD_COLOR : BODY_COLOR;
        ctx.fillRect(cell.x * CELL + 1, cell.y * CELL + 1, CELL - 2, CELL - 2);
    }
}
export function SnakeGame() {
    const canvasRef = useRef(null);
    const stateRef = useRef(createGame());
    /** 上一 tick 之后的最后一次转向，tick 时才生效。 */
    const pendingDirRef = useRef(undefined);
    const [score, setScore] = useState(0);
    const [length, setLength] = useState(START_LEN);
    const [status, setStatus] = useState('running');
    /** 重开计数：让「重新开始」即使仍在 running 也重建定时器。 */
    const [epoch, setEpoch] = useState(0);
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas !== null)
            paint(canvas, stateRef.current.snake, stateRef.current.food);
    }, []);
    const step = useCallback(() => {
        const before = stateRef.current;
        const next = stepGame(before, pendingDirRef.current);
        pendingDirRef.current = undefined;
        if (next === before)
            return;
        stateRef.current = next;
        if (next.score !== before.score)
            setScore(next.score);
        if (next.snake.length !== before.snake.length)
            setLength(next.snake.length);
        if (next.status !== before.status)
            setStatus(next.status);
        draw();
    }, [draw]);
    // 只有 running 才持有定时器：暂停 / 结束即停帧，卸载即清理（关面板无残留）。
    useEffect(() => {
        draw();
        if (status !== 'running')
            return undefined;
        const timer = window.setInterval(step, TICK_MS);
        return () => { window.clearInterval(timer); };
    }, [status, epoch, step, draw]);
    const turn = useCallback((x, y) => {
        const state = stateRef.current;
        if (state.status !== 'running')
            return;
        const input = { x, y };
        // N1：反向判定基准是「已提交方向」，不是本 tick 已排队的方向。
        // 朝右时同 tick 先 ↑ 再 ← 时，← 被丢弃，pending 仍是 ↑，不会瞬死。
        if (!turnAllowed(state.dir, input))
            return;
        const queued = pendingDirRef.current;
        if (queued !== undefined && queued.x === x && queued.y === y)
            return;
        pendingDirRef.current = input;
    }, []);
    const togglePause = useCallback(() => {
        const current = stateRef.current.status;
        if (current === 'over')
            return;
        const next = current === 'paused' ? 'running' : 'paused';
        stateRef.current = { ...stateRef.current, status: next };
        setStatus(next);
    }, []);
    const restart = useCallback(() => {
        stateRef.current = createGame();
        pendingDirRef.current = undefined;
        setScore(0);
        setLength(START_LEN);
        setStatus('running');
        setEpoch(value => value + 1);
        draw();
    }, [draw]);
    // 方向键转向、Space 暂停：window 级监听，面板卸载即解绑。
    // N3：落在 input/textarea/select/contentEditable 上的按键直接放行，不拦截、不改向。
    useEffect(() => {
        const onKeyDown = (event) => {
            if (isEditableTarget(event.target))
                return;
            const dir = KEY_DIRS[event.key];
            if (dir !== undefined) {
                event.preventDefault();
                turn(dir.x, dir.y);
                return;
            }
            if (event.key === ' ' || event.key === 'Spacebar') {
                event.preventDefault();
                togglePause();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => { window.removeEventListener('keydown', onKeyDown); };
    }, [turn, togglePause]);
    return (_jsxs("div", { className: css.root, "data-snake-game": true, children: [_jsxs("div", { className: css.bar, children: [_jsx("span", { className: css.scoreLabel, children: "\u5F97\u5206" }), _jsx("span", { className: css.score, "data-score": score, children: score }), _jsxs("span", { className: css.meta, "data-length": length, children: ["\u957F\u5EA6 ", length] }), _jsx("span", { className: css.spacer }), _jsx("button", { type: "button", className: css.button, "data-control": "snake-pause", "data-state": status, disabled: status === 'over', onClick: togglePause, children: status === 'paused' ? '继续' : '暂停' }), _jsx("button", { type: "button", className: css.button, "data-control": "snake-restart", onClick: restart, children: "\u91CD\u65B0\u5F00\u59CB" })] }), _jsxs("div", { className: css.stage, style: { width: SIZE, height: SIZE }, children: [_jsx("canvas", { ref: canvasRef, className: css.canvas, width: SIZE, height: SIZE }), status === 'running' ? null : (_jsxs("div", { className: css.overlay, "data-state": status, children: [_jsx("span", { className: css.overlayText, children: status === 'paused' ? '已暂停' : `游戏结束 · 得分 ${score}` }), _jsx("span", { className: css.overlayHint, children: status === 'paused' ? '点「继续」或 Space 恢复' : '点「重新开始」再来一局' })] }))] }), _jsxs("div", { className: css.pad, children: [_jsx("button", { type: "button", className: `${css.padButton} ${css.padUp}`, "data-control": "snake-pad-up", "aria-label": "\u5411\u4E0A", onPointerDown: (event) => { event.preventDefault(); turn(0, -1); }, children: "\u2191" }), _jsx("button", { type: "button", className: `${css.padButton} ${css.padLeft}`, "data-control": "snake-pad-left", "aria-label": "\u5411\u5DE6", onPointerDown: (event) => { event.preventDefault(); turn(-1, 0); }, children: "\u2190" }), _jsx("button", { type: "button", className: `${css.padButton} ${css.padDown}`, "data-control": "snake-pad-down", "aria-label": "\u5411\u4E0B", onPointerDown: (event) => { event.preventDefault(); turn(0, 1); }, children: "\u2193" }), _jsx("button", { type: "button", className: `${css.padButton} ${css.padRight}`, "data-control": "snake-pad-right", "aria-label": "\u5411\u53F3", onPointerDown: (event) => { event.preventDefault(); turn(1, 0); }, children: "\u2192" })] }), _jsx("p", { className: css.hint, children: "\u65B9\u5411\u952E / \u4E0B\u65B9\u865A\u62DF\u952E\u8F6C\u5411 \u00B7 Space \u6682\u505C" })] }));
}
