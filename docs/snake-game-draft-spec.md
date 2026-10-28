# 贪吃蛇大作战 · src/ 挂载点与硬编码参数清单（requirements 交付）

> 任务：t1（军师）。目标：TypeScript + HTML5 Canvas 的 Web 贪吃蛇单页游戏，接入现有 src/ 与 pnpm 构建链路，参数允许硬编码，只保证主流程可用。

## 0. 基线事实（已实测）
- 构建链路：`pnpm build` = clean-build → `tsc -p tsconfig.json`（host：include src、exclude src/client）→ `tsc -p tsconfig.client.json`（client：include src/client + src/event-types.ts + src/css-modules.d.ts）→ `tsdown`（把 lib/client/index.js 打成浏览器 bundle lib/client.js；CSS Modules 由 lightningcss 内联注入 `<style data-plugin>`）。
- 结论：**新增 src/client/ 下的 .tsx 与 .module.css 会自动纳入编译与打包，无需改 tsconfig / tsdown.config.ts / package.json**。基线 `pnpm typecheck` 本次实测 exit 0。
- 相对导入一律带扩展名（仓库惯例，如 `./WorkspaceActivity.tsx`）；css 用 `import css from './X.module.css'`（类型见 `src/css-modules.d.ts`）。

## 1. 挂载点结论（最小改动，不改路由、不改 index.tsx 槽位注册）

**承载页面：`src/client/SectHallOverlay.tsx`（洞府浮层，窗口级常驻页面）**，通过其既有「内容气泡 sheet」体系新增一种面板 `'snake'`。

理由：该浮层由 `src/client/index.tsx:127` 的 `shell.overlay` 槽位常驻渲染，已内置 10 种 sheet（teams / board / config / inbox / settings / start / ranks / about / character / library）+ 底部 floor 按钮条，加一种面板是零路由改造的最小增量。右侧栏 tab（`WorkspaceActivity.tsx`）的 board/config 页签只存在于「历史宗门」分支（:542-585），活队伍页面（:530-541）没有页签条，不宜作挂载点。

### 1.1 需改动的既有文件（唯一一处，5 个锚点）

文件：`src/client/SectHallOverlay.tsx`

1. L145 `type SheetKind = HallSheetAction | 'character' | 'library'` → 追加 `| 'snake'`。
2. L581-591 sheet 标题链 → 最终兜底前插入 `sheet === 'snake' ? '贪吃蛇大作战'`（硬编码中文，**不动 `src/client/locales.ts`**）。
3. L623 起的 sheetBody 条件链 → 新增一支 `: sheet === 'snake' ? <SnakeGame />`。
4. L1087-1092 `activeAction` 三元链 → 新增 `sheet === 'snake' ? null`。**必改**：`activeAction` 类型是 SceneAction（`src/client/pixel-office/office-actions.ts:11` = 'teams'|'board'|'config'|'inbox'|'gear'|'ranks'|'about'），不含 'snake'，漏改会被 typecheck 挡下。
5. L1109-1139 底部 floor 菜单 → 在 L1127「排行」之后插入：
   ```tsx
   <button type="button" className={css.floorButton} data-control="hall-snake"
     data-active={sheet === 'snake' || undefined} onClick={() => { toggleSheet('snake') }}>
     <span aria-hidden>🐍</span>贪吃蛇
   </button>
   ```
   顶部 import 区追加 `import { SnakeGame } from './snake-game/SnakeGame.tsx'`。

（sheet 容器带 `data-sheet={sheet}`，见 SectHallOverlay.tsx:595 → 冒烟选择器 `[data-sheet="snake"]`。）

### 1.2 新增文件（仅 2 个，自包含）

- **`src/client/snake-game/SnakeGame.tsx`**：`export function SnakeGame()`，无 props；state = 蛇 / 方向 / 食物 / 分数 / 状态（running|paused|over）；`useEffect` 起 `setInterval`，卸载即清理。
- **`src/client/snake-game/SnakeGame.module.css`**：`.root`（纵向、overflow:auto）、`.bar`（控制条）、`.stage`（相对定位 320×320）、`.pad`（虚拟键覆盖层）、`.overlay`（暂停 / 结束遮罩）。

### 1.3 组件内部落点（Canvas / 覆盖层 / 控制区）

```tsx
<div className={css.root}>                                  // 内容气泡内，overflow:auto
  <div className={css.bar}>                                 // 控制区：分数 + 暂停 + 重新开始
    <span data-score>{score}</span>
    <button type="button" data-control="snake-pause">{status === 'paused' ? '继续' : '暂停'}</button>
    <button type="button" data-control="snake-restart">重新开始</button>
  </div>
  <div className={css.stage}>                               // position:relative; 320×320
    <canvas ref={canvasRef} width={320} height={320} />      // 第 0 层：游戏绘制
    <div className={css.pad}>                                // 第 1 层：上层覆盖 layer（四向虚拟按键）
      <button data-control="snake-pad-up"    onPointerDown={() => turn(0, -1)}>↑</button>
      <button data-control="snake-pad-left"  onPointerDown={() => turn(-1, 0)}>←</button>
      <button data-control="snake-pad-down"  onPointerDown={() => turn(0, 1)}>↓</button>
      <button data-control="snake-pad-right" onPointerDown={() => turn(1, 0)}>→</button>
    </div>
    <div className={css.overlay}>                            // 第 2 层：暂停 / 结束遮罩（含「重新开始」）
      {status === 'over' ? `游戏结束 · 得分 ${score}` : status === 'paused' ? '已暂停' : null}
    </div>
  </div>
</div>
```

- 键盘监听：`window.addEventListener('keydown', …)`，↑↓←→ 转向、Space 暂停/继续；这 5 个键 `preventDefault()`（防面板滚动）；`useEffect` 内解绑。
- `.pad` 样式：`position:absolute; right:8px; bottom:8px; display:grid; grid-template-areas:'. up .' 'left . right' '. down .'; touch-action:none; z-index:2`，按钮约 34×34、半透明，仍能看到棋盘。
- Canvas 绘制：`ctx.fillRect` 分格重绘（棋盘底 + 淡网格 + 蛇身头深身浅 + 食物内缩方块）；每 tick 全量重绘，不插值、不用 rAF。

## 2. 硬编码参数清单（集中在 SnakeGame.tsx 顶部 const）

| 参数 | 取值 | 说明 |
|---|---|---|
| 网格尺寸 | COLS=20, ROWS=20, CELL=16 → canvas 320×320（CSS px = 逻辑 px，不处理 DPR） | 20×20 格 |
| 初始蛇长 | 3 格 | head=(10,10)，body=(9,10),(8,10) |
| 初始方向 | (1,0) 向右 | 开局静止待首 tick |
| 移动步进 | 每 tick 前进 **1 格**（新头 = 头 + dir；未吃到食物时弹尾） | 网格对齐，无像素插值 |
| 帧间隔 | **120 ms**（setInterval，≈8.3 格/秒） | 暂停/结束时 clearInterval |
| 食物生成 | 枚举全空格（排除蛇身）→ `empty[Math.floor(Math.random() * empty.length)]`；无空格则判 over | 场上恒 1 个食物 |
| 分数增量 | 吃 1 个 **+10**，初始 0，重开归 0；同时蛇身 +1 格 | — |
| 反向输入 | 与当前方向相反的输入丢弃（不可 180° 掉头）；同 tick 多次按键只留最后一次 | 防自杀 |
| 碰撞判定 | 撞墙 head.x<0 / >=20 / head.y<0 / >=20；撞自身 head 与 `body.slice(0, -1)` 重合（尾巴将让位不算） | 任一 → status='over' |
| 暂停 | Space 或「暂停」按钮；paused 时冻结帧 | — |
| 重新开始 | 重置蛇 / 方向 / 食物 / 分数 → running 并重建 interval | — |

## 3. 冒烟验证清单（仅冒烟：主流程跑通 + 关键交互可点击）

| # | 步骤 | 通过判据 |
|---|---|---|
| S1 | `pnpm typecheck` | exit 0，无输出（host + client 双 program） |
| S2 | `pnpm build` | exit 0，`lib/client.js` 重新生成 |
| S3 | 生效：把 `lib/` 同步进 `%USERPROFILE%\.dsh\profiles\desktop\node_modules\dsh-pixel-team`（或 `dsh plugin --profile desktop add F:\MyApp\eternal\dsh-pixel-team`）后**重启桌面端** | 桌面端正常启动 |
| S4 | http://127.0.0.1:59066 → 点洞府底部 `[data-control="hall-snake"]` | 出现 `[data-sheet="snake"]`，320×320 canvas、分数 0、蛇长 3 |
| S5 | 依次按 ↑ ← ↓ → | 每次改向且持续移动；页面不滚动 |
| S6 | 依次 pointerdown 四个虚拟方向键 | 与 S5 同效；按钮可点、未被遮罩挡住 |
| S7 | 吃到食物 | 蛇身 +1 格、`[data-score]` 变为 +10 |
| S8 | 点 `[data-control="snake-pause"]` | 停帧 + 「已暂停」；再点恢复 |
| S9 | 直撞墙 | 「游戏结束 · 得分 N」；点「重新开始」→ 分数 0、蛇长 3、可继续移动 |
| S10 | 吃 ≥3 个食物后绕圈撞自身 | 触发「游戏结束」 |
| S11 | 关 sheet 再开；再开名册 / 进度面板 | 无残留计时器（不报错、不继续动）；其它面板照常打开 |

不含任何非冒烟项（不新增单测 / 回归 / 性能门禁）。

## 4. 风险与假设

- 假设：单页 = 洞府浮层内单个 sheet 面板，无二级路由；不改 `src/client/index.tsx`、不改 `locales.ts`（文案硬编码中文）、不改 `package.json`、不加依赖。
- 风险 1（必处理）：`activeAction` 是 SceneAction 类型，'snake' 必须映射 null，否则 typecheck 失败。
- 风险 2：洞府面板可缩放（PANEL_SIZES compact 460×380 起），320 canvas + 控制条可能放不下 → `.root` 用 `overflow:auto`，不改 PANEL_SIZES。
- 风险 3：桌面端不重启看不到新面板（S3 必须真跑），否则会误判「未挂载」。
- 风险 4：空洞府也渲染 floor 菜单，冒烟可在空会话直接开面板，无需先建队伍。
- 不做：联机、排行榜、账号、持久化（不写 localStorage）、多关卡/难度、皮肤、音效、动画特效、手势滑动。

## 5. 给实现者（t2）的硬约束

- 只改 `src/client/SectHallOverlay.tsx` 的上述 5 个锚点 + 新增 `src/client/snake-game/{SnakeGame.tsx, SnakeGame.module.css}`。
- 必须保留全部 data 选择器（`hall-snake` / `data-sheet` / `data-score` / `snake-pause` / `snake-restart` / `snake-pad-*`），冒烟清单逐条依赖它们。
