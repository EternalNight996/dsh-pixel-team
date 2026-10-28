# t5 审查报告：贪吃蛇大作战（t2 实现 / t3 挂载）

审查对象：`src/client/snake-game/SnakeGame.tsx`、`src/client/snake-game/SnakeGame.module.css`、`src/client/SectHallOverlay.tsx` 的 5 个接线锚点。
结论：**verdict = pass**（无阻断主流程问题；5 条非阻断缺陷见下）。

## 1. 验收对照

| 验收项 | 结果 | 证据 |
| --- | --- | --- |
| 主流程跑通 / 关键交互可点击 | 通过 | 真 React SSR 结构 9/9；行为探针 mount→tick→转向→暂停→恢复→撞墙→重开全通 |
| pnpm build 无 TS 编译错误 | 通过 | `pnpm typecheck` exit 0；`pnpm build` exit 0（lib/client.js 715.25 kB） |
| 未引入新依赖 / 无禁止边界 | 通过 | `git diff -- package.json pnpm-lock.yaml` 为空；snake-game 目录无 fetch/localStorage/WebSocket/Audio/requestAnimationFrame/排行榜/账号字样 |
| 挂载后 canvas、分数、暂停/重开、四向虚拟键可见 | 通过 | SSR：`<canvas width=320 height=320>`、`data-score="0"`、`data-control="snake-pause"`/`snake-restart`、4 个 `snake-pad-*`（叠在 canvas 之后） |
| 方向键 / 虚拟键改向 | 通过 | 行为探针：虚拟键 onPointerDown 与 window keydown 均改向并 preventDefault；t4 交互 harness G1–G4/H1–H4 |
| 吃食物蛇长 +1、计分 | 通过（口径差异见 N2） | 蛇长 3→4、画布 4 格；分数按 t1 参数 +10/食物 |
| 撞墙 / 自撞 → 结束并显示提示 | 通过 | 遮罩文案「游戏结束 · 得分 N」；结束时 timers=0、不再重绘 |
| 结束态 / 暂停态重开归零可继续 | 通过 | 重开后 score=0、length=3、无遮罩、timer 重建 1 个 |
| 暂停停表 + 再触发恢复 | 通过 | 暂停后 timers=0、3 次 tick 零重绘；再点恢复 timers=1 |
| 面板卸载无残留 | 通过 | unmount 后 timers=0（t4 F1） |

## 2. 阻断问题

无。

## 3. 非阻断缺陷

- **N1（中）同 tick 内二次转向可瞬死** — `SnakeGame.tsx:158-165` 与 `:126-136`。`turn()` 用 `pendingDirRef.current ?? dirRef.current` 做反向判定，于是「朝右时先 ↑ 再 ←」两次输入都在同一 tick 入队，tick 时 next=(9,10)=body[1] 立即判 over（已复现：起始状态同 tick ↑+← → status=over，得分 0）。修法：反向判定改用已提交的 `dirRef.current`（改 `:160` 一行），或改成按下即写入 `dirRef`。
- **N2（中，产品口径）分数 +10/食物 vs 验收文案「分数 +1」** — `SnakeGame.tsx:16`、`:140`。t1 参数清单与 t1 冒烟 S7 均按 10，链路上 t2/t3/t4 一致；如按验收文案执行，改 `FOOD_SCORE = 1` 一行即可，需产品拍板。
- **N3（低）window 级键盘全量拦截** — `SnakeGame.tsx:190-205`。面板打开期间方向键与 Space 对整页生效，空格会抢走其它聚焦按钮的激活语义；建议监听范围收窄到 stage 或判断 `event.target`。
- **N4（低）虚拟键遮挡棋盘右下角** — `SnakeGame.module.css:13-19`，`.pad` 约 106×106px 叠在 320×320 棋盘右下，蛇/食物行经此处被盖住；可改半透明或缩小键位。
- **N5（低，证据面）真机点击路径未跑** — 需同步 `lib/` 到 `%USERPROFILE%\.dsh\profiles\desktop\node_modules\dsh-pixel-team` 并重启桌面端（会终止当前 GUI 进程），沿用 t4 D1。另注：t4 交互 harness 用自写 hook shim（非真实 reconciler），其输出里 `class="undefined undefined"` 是 stub 假象；本次用真 React 复核 class 正常（root/bar/padButton padUp…）。提交时须把受版本管理的 `lib/` 产物与源码一并提交（git-artifacts 校验）。

## 4. 复跑命令

```
pnpm typecheck          # exit 0
pnpm build              # exit 0（构建前后 lib 文件哈希不变，无额外 churn）
node %TEMP%\dsh-snake-review\ssr-real3.cjs   # 真 React SSR 结构断言 9/9
node %TEMP%\dsh-snake-review\probe2.cjs      # 行为探针 + N1 复现
```
