# t8 复审：N1 / N3 / N4 修复（t6 实现，t7 复验）

结论：**verdict = pass**。三项修复均正确且回归证据可复现；未发现新增阻断问题。残留 3 条低风险项见文末。

## 1. 修复核对

| 项 | 实现 | 复审结论 | 独立证据 |
| --- | --- | --- | --- |
| N1 同 tick 双转向瞬死 | 规则抽到 `src/client/snake-game/game.ts`：`turnAllowed` 以**已提交方向** `state.dir` 拒绝 180°，`stepGame` 再兜底；组件 `turn()` 用 `turnAllowed(state.dir, input)` | 正确。朝右时同 tick ↑+← → ← 丢弃、蛇向上走并存活；单 tick 队列每次消费后清空，不存在提交方向与排队方向错位的窗口 | 探针：虚拟键与键盘两条路径 head 均为 (11,9)、status=running；`scripts/snake-game.test.mjs` 3/3 |
| N3 window 级键盘拦截输入控件 | `isEditableTarget`（INPUT/TEXTAREA/SELECT/contentEditable）置于 keydown 首行，命中即 return，不 preventDefault、不改向 | 正确，且未削弱游戏自身键盘（BODY 上仍 preventDefault 并改向） | 探针：target=INPUT 时 prevented=0、蛇继续向右（y 不变）；target=BODY 时 prevented=1、转向生效 |
| N4 虚拟键遮挡棋盘 | `.pad` 移出 `.stage`（棋盘 320×320 闭合之后），CSS 去 absolute/right/bottom 改正常流 grid | 正确。棋盘子树按钮数 0，DOM 顺序 stage > pad，四个键仍在且带 aria-label | 探针 + SSR：`<canvas>` 后紧接 `</div>` 再是 pad 容器 |

## 2. 回归证据（本轮实跑）

```
pnpm typecheck                        # exit 0
node --test scripts/snake-game.test.mjs   # 3/3 pass
pnpm verify:web-routes                # 107/107 pass（含新增 3 条）
pnpm verify:git-artifact              # Git artifacts match source and build settings
%TEMP%\dsh-snake-smoke\smoke.cjs        # 21/21
%TEMP%\dsh-snake-smoke\ssr.cjs          # 8/8
%TEMP%\dsh-snake-smoke\integration.cjs  # 26/26
%TEMP%\dsh-snake-review-t8\probe3.cjs   # 16/16（N1/N3/N4 + 吃食物 10 分/长度 4、撞墙结束、暂停停表、重开归零）
```

## 3. 残留低风险项（不阻塞）

- **N6** `.pad` 移出棋盘后组件高度 +106px（sheet body 为 `zoom:1.3` → 约 +138px），矮视口下需在面板内滚动才能同时看到棋盘与虚拟键；棋盘本身已不再被遮挡。
- **N7** 回归测试里 N4 的「几何」断言是自证式（用常量拼出棋盘/pad 矩形再断言不相交），对真实布局无约束力；真正的防线是 CSS 与结构断言。后续可换成真实布局断言。
- **N8** N3 只放行输入控件；焦点在普通 `<button>` 上时 Space 仍被游戏拦截（暂停而非激活按钮）。后续可加 `tagName === 'BUTTON'` 判断或收窄监听范围。
- 另有 t5 遗留 **N2**：分数仍为 +10/食物（需产品口径拍板），本轮未在范围内。
