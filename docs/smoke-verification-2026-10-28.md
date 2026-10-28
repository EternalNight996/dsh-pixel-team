# 冒烟验证记录（2026-10-28，HEAD 3d2d157）

本次团队目标为「测试1s」，未附带具体的缺陷复现步骤或失败用例。按 implementation 契约，
先做完整复现尝试：跑通声明验证命令与仓库既有门禁，再决定是否需要修改源码。

## 环境

| 项 | 值 |
|---|---|
| 系统 | Windows / PowerShell 7 |
| Node | v24.19.0 |
| pnpm | 11.22.0 |
| HEAD | `3d2d157`（release: v0.1.16） |
| 工作树 | clean（`git status --porcelain` 无输出） |

## 复现结果：全部通过，未复现缺陷

每项命令都真实执行，退出码为进程本身返回值：

| 门禁 | 命令 | 退出码 |
|---|---|---|
| 双 program typecheck | `pnpm typecheck` | 0 |
| 离线冒烟（tmp 目录自清理） | `node scripts/verify.mjs` | 0 |
| 浏览器侧契约 + Web 路由 | `pnpm verify:web-routes` | 0 |
| 发布元数据 + 包体冒烟 | `pnpm verify:release` | 0 |
| README 版本一致性 | `pnpm verify:readme` | 0 |
| 质量门禁 | `pnpm verify:quality-gates` | 0 |
| 损坏状态读取 | `pnpm verify:corrupt-state` | 0 |
| 血缘身份 | `pnpm verify:lineage-identity` | 0 |
| 兼容性 + doctor | `pnpm verify:compatibility` | 0 |
| 源码运行器 | `pnpm verify:source-runner` | 0 |
| 成员拉起失败恢复 | `pnpm verify:member-spawn-recovery` | 0 |
| 旧会话来源修复 | `pnpm verify:legacy-session-repair` | 0 |
| Harness 契约（现代/交付双档） | `pnpm verify:harness-contract` | 0 |
| 技能更新器 | `pnpm test:skills-updater` | 0 |
| git 产物戳 | `pnpm verify:git-artifact` | 0 |

另抽样的纯逻辑用例（`node --test`）：动画时长/挂机经验/御剑形态/队伍揭示 21 项全过，
issue-188/189/205/234/236/262 + capabilities + tool-policies + http-body 85 项全过，fail 均为 0。

## 结论

- 声明的验证命令 `pnpm typecheck` 通过（exit 0），两个 tsc program（host / client）都在内，
  与 `docs/verification-guide.md` §1.1 的要求一致。
- 上述 15 个门禁与抽样用例均无失败，**找不到可复现的缺陷**。

因此本任务不做源码改动：在没有失败证据的情况下改代码，只会给发布仓引入无意义噪声，
也无法证明确实「修复」了任何东西。若「测试1s」本应暴露某个具体问题，请补充复现步骤
（命令、输入、期望 vs 实际、报错栈），即可据此定位根因并给最小修复。

## 复现方式

```sh
git rev-parse --short HEAD          # 应为 3d2d157
pnpm typecheck                      # 声明验证命令，应 exit 0
node scripts/verify.mjs             # 离线冒烟，末尾应输出 all checks passed
pnpm verify:web-routes
pnpm verify:quality-gates
pnpm verify:harness-contract
```

未运行的部分：`pnpm verify` 整条链里依赖网络/git 远端安装的 `pnpm test:git-install`，
本次按需抽样替代。

## t2 独立复跑（验证者：体修）

在同一 HEAD `3d2d157`、工作树 clean（仅本文件未跟踪）的前提下独立逐条复跑，退出码均为进程真实返回值：

| 项 | 命令 | 退出码 | 观察 |
|---|---|---|---|
| 声明验证命令 | `pnpm typecheck` | 0 | host / client 两个 tsc program 均无输出 |
| 离线冒烟 | `node scripts/verify.mjs` | 0 | 末尾 `all checks passed` |
| 浏览器契约 + 路由 | `pnpm verify:web-routes` | 0 | pass 77 / fail 0 |
| 发布元数据 + 包体 | `pnpm verify:release` | 0 | pass 9 / fail 0 |
| README 版本 | `pnpm verify:readme` | 0 | pass 7 / fail 0 |
| 质量门禁 | `pnpm verify:quality-gates` | 0 | pass 71 / skip 3 / fail 0 |
| 损坏状态 | `pnpm verify:corrupt-state` | 0 | pass 6 / skip 1 / fail 0 |
| 血缘身份 | `pnpm verify:lineage-identity` | 0 | pass 9 / fail 0 |
| 兼容性 + doctor | `pnpm verify:compatibility` | 0 | 296 个包身份、依赖检查通过 |
| 源码运行器 | `pnpm verify:source-runner` | 0 | pass 6 / fail 0 |
| 成员拉起恢复 | `pnpm verify:member-spawn-recovery` | 0 | pass 10 / fail 0 |
| 旧会话来源修复 | `pnpm verify:legacy-session-repair` | 0 | pass 6 / fail 0 |
| Harness 契约 | `pnpm verify:harness-contract` | 0 | pass 15 / fail 0 |
| 技能更新器 | `pnpm test:skills-updater` | 0 | pass 5 / fail 0 |
| git 产物戳 | `pnpm verify:git-artifact` | 0 | `Git artifacts match source and build settings.` |
| 抽样逻辑 21 项 | `node --test scripts/cast-timing.test.mjs idle-progression travel-form team-reveal` | 0 | pass 21 / fail 0 |
| 回归 85 项 | `node --test issue-188/189/205/234/236/262 + capabilities + tool-policies + http-body` | 0 | pass 85 / fail 0 |
| 其余 verify 链成员 | fallback-tdd / member-failure-tdd / verify:issue-regressions / issue-159 / verify:issue-203 / verify:skill / stress-verify | 0 | 全部通过；skill mirror 11 skills / 128 files 一致；stress 全过 |

复核结论：与 t1 记录一致，**未复现失败、无新增失败**，验证前后源码零改动（`git status --porcelain` 仍只有本文件）。未运行 `pnpm test:git-install`（依赖网络/git 远端安装）。

