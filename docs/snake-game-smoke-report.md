# 【PASS】贪吃蛇大作战 · 冒烟验证报告（t4）

> 验证对象：t2（实现）+ t3（挂载叠加）交付的洞府面板「🐍 贪吃蛇」。
> 日期：2026-10-29 · 环境：Windows / Node v24.19.0 / pnpm workspace `F:\MyApp\eternal\dsh-pixel-team` / 桌面端 GUI http://127.0.0.1:59066（正在承载本会话，未重启）。
> 策略：开发模式（极速草稿）——只跑冒烟/主流程，不写非冒烟测试、不引入新依赖。

## 1. 结论

**主流程冒烟通过（PASS）**：55 项行为断言全部通过，`pnpm typecheck` 与 `pnpm build` 均 exit 0。
唯一未覆盖的是「在正在使用的桌面端 GUI 里真机点开面板」这一步（见非阻塞缺陷 D1），其阻塞原因是重启桌面端会终止本会话所依附的 GUI 进程，代理无法自我重启；面板挂载、可见结构、全部交互改由真实组件源码 + 真实 `react-dom/server` 渲染验证。

## 2. 命令与结果

| # | 命令 | 退出码 | 结果 | 日志 |
|---|---|---|---|---|
| 1 | `pnpm typecheck` | 0 | host + client 双 program 无错误、无输出 | `%TEMP%\dsh-snake-smoke\logs\typecheck.log` |
| 2 | `pnpm build` | 0 | clean-build → tsc×2 → tsdown → git-artifacts 全通过；`lib/client.js` 715.25 kB / map 903.28 kB | `%TEMP%\dsh-snake-smoke\logs\build.log` |
| 3 | 核心循环冒烟（node smoke.cjs） | 0 | **21/21 PASS** | `...\logs\smoke-core.log` |
| 4 | 挂载结构冒烟（node ssr.cjs，真实 react-dom/server） | 0 | **8/8 PASS** | `...\logs\smoke-ssr.log` |
| 5 | 交互冒烟（node integration.cjs） | 0 | **26/26 PASS** | `...\logs\smoke-interaction.log` |

`%TEMP%` = `C:\Users\Administrator\AppData\Local\Temp\dsh-snake-smoke`（脚本为一次性 harness，未入库）。

## 3. t1 冒烟清单逐项结果

| 项 | 判据 | 结果 | 证据 |
|---|---|---|---|
| S1 | `pnpm typecheck` exit 0 | **PASS** | 无输出，exit 0 |
| S2 | `pnpm build` exit 0，`lib/client.js` 重生成 | **PASS** | exit 0；产物含 `hall-snake` / `贪吃蛇大作战` / `data-snake-game` / `snake-pad-down` / `snake-restart` |
| S3 | 同步 lib/ 进 desktop profile 并重启桌面端 | **未执行（D1）** | 重启会杀掉承载本会话的 GUI 进程，代理无法自我重启；已给出人工步骤 |
| S4 | 点 `[data-control="hall-snake"]` 出现面板（320×320、分数 0、蛇长 3） | **PASS（组件级）** | SSR：`<div data-snake-game>` 内含 `<canvas width="320" height="320">`、`data-score="0"`、`data-length="3"`；挂载分支在 `SectHallOverlay.tsx` sheetBody `sheet === 'snake' ? <SnakeGame />`，floor 按钮 `data-control="hall-snake"` |
| S5 | 键盘四向改向且页面不滚动 | **PASS** | 键盘 ↓←↑→ 依次驱动蛇头 (10,10)→(10,11)→(9,11)→(9,10)→(10,10) |
| S6 | 四个虚拟键同效、可点 | **PASS** | 4 次 `onPointerDown` 得到同一蛇头轨迹；`preventDefault` 被调用 1 次/次（不滚动） |
| S7 | 吃食物蛇身 +1、分数 +10 | **PASS** | 分数 0→10、长度 3→4、画布蛇身格 3→4；第二颗 20 分 / 5 格 |
| S8 | 暂停停帧 / 恢复 | **PASS** | 点按钮或 Space 后遮罩「已暂停」、`timers=0`、连续 3 tick 零重绘；再触发恢复为 `timers=1` 且立即重绘 |
| S9 | 撞墙「游戏结束 · 得分 N」→ 重开归零可再动 | **PASS** | 直撞右墙 → `data-state="over"`、文案「游戏结束 · 得分 10」、`timers=0`；重开 → 分数 0、长度 3、遮罩消失、恢复移动 |
| S10 | 撞自身同样结束 | **PASS** | 长度 5 时三连转向进入 2×2 死循环 → 「游戏结束 · 得分 20」 |
| S11 | 关面板再开无残留计时器、其它面板无回归 | **PASS（部分）** | 卸载清理后 `timers=0`；未触碰其它面板/路由代码，typecheck+build 绿；真机其它面板回归随 D1 一并待人工确认 |

## 4. 非阻塞缺陷（不修复、不阻塞交付）

- **D1 真机桌面端对照未执行**：桌面端当前加载 profile 中旧 bundle，需 `pnpm build` 后复制 `lib/` 到 `%USERPROFILE%\.dsh\profiles\desktop\node_modules\dsh-pixel-team`，重启桌面端 → 点洞府底部 🐍 贪吃蛇。重启会终止本会话依附的 GUI，故交人工执行；不阻塞主流程结论。
- **D2 计分口径**：任务文案写「分数 +1」，实现按 t1 硬编码参数为 **+10/食物**（t1 冒烟 S7 亦要求 `[data-score]=10`）。若产品口径要 +1，改 `src/client/snake-game/SnakeGame.tsx` 的 `FOOD_SCORE` 一行即可，本次不动。
- **D3 键盘监听为 window 级**：面板打开期间方向键/Space 会被 `preventDefault` 拦截，焦点在输入框时同样拦截。草稿模式不处理，记录为已知体验缺陷。

## 5. 覆盖说明

- 已覆盖：初始结构（canvas/分数/蛇长/四键/暂停/重开）、自动移动、四向改向（键盘 + 虚拟键）、吃食物计分与增长、撞墙、撞自身、暂停/恢复、结束态与暂停态重开、卸载清理。
- 未覆盖（非阻塞）：真机 GUI 点击路径（D1）、面板缩放/滚动下的布局观感、长局性能。
- 无新增依赖；本次验证未修改任何产品源码，仅新增本报告文件。

## 6. 复现

```powershell
pnpm typecheck
pnpm build
node $env:TEMP\dsh-snake-smoke\smoke.cjs        # 21 项核心循环
node $env:TEMP\dsh-snake-smoke\ssr.cjs          # 8 项挂载结构（react-dom/server）
node $env:TEMP\dsh-snake-smoke\integration.cjs  # 26 项交互
```
