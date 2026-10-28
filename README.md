<h1 align="center">
  <img src="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/app-icons/desktop/png/app-128.png" width="56" alt="dsh-pixel-team icon" />
  <br/>
  dsh-pixel-team
</h1>

<p align="center"><b>Your agents don't need another dashboard.<br/>They need a place to work.</b></p>

<p align="center"><sub>A pixel cultivation hall for DeepSeek Harness — one captain, a roster of specialists, and a task DAG that actually ships.</sub></p>

<p align="center">
  <a href="https://github.com/EternalNight996/dsh-pixel-team/stargazers"><img src="https://img.shields.io/github/stars/EternalNight996/dsh-pixel-team?style=flat" alt="GitHub stars" /></a>
  <a href="https://www.npmjs.com/package/dsh-pixel-team"><img src="https://img.shields.io/npm/v/dsh-pixel-team" alt="npm" /></a>
  <a href="https://github.com/EternalNight996/dsh-pixel-team/releases"><img src="https://img.shields.io/badge/release-v0.1.20-FF7A45" alt="release" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="license" /></a>
  <a href="https://github.com/deepseek-ai/deepseek-harness"><img src="https://img.shields.io/badge/DSH-Web%20%2B%20Headless-5B4CF0" alt="DSH" /></a>
</p>

<p align="center"><b>English (default)</b> · <a href="README_ZH.md">简体中文</a></p>

<p align="center">
  <a href="https://github.com/EternalNight996/dsh-pixel-team"><img src="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/readme/social-preview.png" width="100%" alt="dsh-pixel-team — a pixel cultivation hall for AI agent teams" /></a>
</p>

<p align="center"><b>开宗 → review the plan → approve → watch the hall run.</b></p>

<p align="center"><b>▶ <a href="http://180.76.144.48/en/dsh-pixel-team">Live product page</a></b> &nbsp;·&nbsp; real DSH session screenshots below</p>

<p align="center"><strong>⭐ If this is the agent UI you wanted to exist, star it — that's how the hall keeps growing.</strong></p>

## 🎬 A real session, not a mockup

<p align="center">
  <img src="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/readme/plan-review.png" width="49%" alt="Plan review before any member spawns" />
  <img src="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/readme/progress.png" width="49%" alt="Task DAG and the pixel hall" />
</p>
<p align="center"><sub><b>Approve before spawn</b> — 3 members, 3 tasks, 2 dependencies; nothing starts until you confirm. &nbsp;·&nbsp; <b>Live task DAG</b> — the captain dispatches t1; 毒修 waits for t1, 体修 waits for t2.</sub></p>

<p align="center">
  <img src="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/readme/equipment.png" width="100%" alt="Gear and mounts in the hall" />
</p>
<p align="center"><sub><b>Gear that shows up</b> — equip a flying sword and the captain actually rides it; artifacts, mounts and skills unlock by realm.</sub></p>

<p align="center">
  <img src="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/readme/dao-rules.png" width="32%" alt="Doctrine and roster configuration" />
  <img src="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/readme/ranks.png" width="32%" alt="15-realm cultivation leaderboard" />
  <img src="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/readme/roster.png" width="32%" alt="Sect roster and completed tasks" />
</p>
<p align="center"><sub><b>One sect, three cultivators</b> — role, realm, model at a glance. &nbsp;·&nbsp; <b>15 realms</b> — 凡人 to 道祖. &nbsp;·&nbsp; <b>History</b> — completed tasks and the next 开宗.</sub></p>

## 🐉 What is this?

Most agent tools give you a wall of logs. **dsh-pixel-team** gives your DeepSeek Harness session a **place**: a pixel sect with a captain's desk, six clickable facilities, cultivators working at their desks, and a 15-realm cultivation ladder that fills as work lands.

It is a real team runtime in a pixel coat:

- durable member sessions, captain-led task DAG, dependency-aware dispatch;
- mailbox, retries, cold recovery, attempt ownership;
- quality contracts and independent review — implementers cannot approve their own work;
- local-first state under `.agent-teams`; MIT; no cloud account.

**Open a sect, hand it a goal, approve the plan, and watch the work move.**

## 🆚 Not another agent dashboard

|  | Typical agent UI | dsh-pixel-team |
|---|---|---|
| Who is working | log rows | cultivators at their desks |
| What is blocked | status text | merit stele + dependency edges |
| Review | optional | independent gate |
| Progress | a percentage | 15 realms, gear and mounts |
| State | a cloud account | your workspace, local-first |
| Fun | none | honestly, a lot |

## ✨ Why you'll love it

- 🏯 **A hall, not a dashboard** — six clickable facilities, a floor bar, and a living pixel scene. Click a cultivator to open their conversation; click the level badge to open gear.
- 🧠 **Real team protocol** — persistent subagents, automatic task dispatch, mailbox, retries, cold recovery and independent review. Not a demo shell.
- 🌱 **Cultivation that shows up** — tasks and idle time feed a shared 15-realm ladder; gear, mounts and skills are drawn into the hall; crossing a realm gets a longer breakthrough effect.
- 📜 **封神榜 + 宗门志** — a sect roll, realm ladder, cultivation card, support/community/about and feedback in one place.
- 🔒 **Local-first & MIT** — team state lives in your workspace. No cloud account, no hidden sync.
- ⚡ **One command, Web + headless** — the same tools and durable state with or without the UI.

## ⚡ Quick start

**DeepSeek Harness (desktop / web)**

    dsh plugin --profile desktop add dsh-pixel-team@0.1.20
    # reopen DSH → open 山门 · 名册

Then:

1. Click **开宗立派**, or say in chat: `用 AgentTeams 开一个团队做 …`.
2. Review the staged plan — members, tasks, dependencies — and approve it.
3. Watch the hall: click a cultivator to talk, click a level badge to equip gear.

**From GitHub**

    git clone https://github.com/EternalNight996/dsh-pixel-team
    dsh plugin --profile desktop add ./dsh-pixel-team

**CLI / headless**

    dsh --profile desktop
    # ask: 用 AgentTeams 开一个团队做 …

Package version **0.1.20**. Recommended host: DeepSeek Harness **0.2.1-rc.3** (web + headless). Exact matrix: [compatibility.json](compatibility.json).

Prefer to look first? **[Open the live product page](http://180.76.144.48/en/dsh-pixel-team)** on the Mengyou website.

## 🏯 The hall

| Facility | What it does |
|---|---|
| **山门 · 名册** | current sect, roster history and team entries |
| **藏经阁 · 道统** | members, task contracts, staged plans, founding wizard |
| **功德碑 · 进度** | task dependencies, dispatch progress, verification evidence |
| **封神榜** | sect roll, 15 realms, cultivation card, leveling tips, sect story |
| **天机阁** | equipment inventory: artifact / mount / skill, immediate hall preview |
| **宗门志** | support, community, about and a privacy-bounded feedback form |
| **收件** | captain inbox, keyboard reachable and text-escaped |

The wall and the floor bar are two routes into the same panels. Click a cultivator to open their conversation; click their level badge to open gear.

## 🧠 Under the pixels

- captain-led task DAG with dependency-aware dispatch;
- persistent member sessions, mailbox and attempt ownership;
- quality contracts: objective, scope, acceptance, verify, review verdict;
- independent verifier/reviewer gates, repair rounds and cold recovery;
- per-role contracts that keep frontend/backend/integrator work in disjoint layers;
- team state under `.agent-teams/<teamId>/` — inspectable, local, yours.

## 🧩 Roles & templates

| Template | Default roles | Best for |
|---|---|---|
| **Full stack** | integrator · frontend · backend · verifier · reviewer | contract-first features; parallel layers |
| **Security hardening** | auditor · security · verifier · reviewer | repro-before-fix, minimal diff, residual risk |
| **Read-only audit** | auditor · reviewer | evidence gathering without touching the workspace |
| **Fix / feature / research / build / docs / debate** | small role sets | everyday team work |
| **Architecture** | architect · implementer · verifier · reviewer | boundaries and migrations |

Each specialist gets a fixed contract: ownership, must / must not, done, five-bullet report, and a working budget. The full-stack team is intentionally five people: the integrator owns both the contract and final integration, cutting one handoff.

## 🧾 Delivery, not vibes

| Signal | Evidence |
|---|---|
| Full suite | **pnpm verify** exit 0 |
| Browser-side contracts | **pnpm verify:web-routes** pass |
| Publish artifact | package smoke checks runtime + support QRs, excludes source/tests/docs |
| Real team run | captain dispatch → member writes → independent review → summary; see [docs/agent-teams-real-model-verification.json](docs/agent-teams-real-model-verification.json) |
| Isolation | implementers cannot approve their own implementation |

This is a tool for **parallel wall-clock + independent verification**, not a promise that every task gets cheaper. Small tasks are usually better with one agent.

## 🛡️ Boundaries

- No hidden cloud sync: cultivation and feedback diagnostics stay local.
- Approval is explicit: a staged plan does not start until you approve it.
- Deployment requires explicit confirmation; agents do not silently replace a running sect.
- Review is independent: an implementer cannot approve its own implementation.

## 🗺️ Roadmap

- [ ] more sect and role templates;
- [ ] deeper equipment, mount and skill effects in the hall;
- [ ] native app icon set for desktop / web / iOS / Android (in progress under `assets/app-icons`);
- [ ] more docs and translations;
- [ ] your idea — open an issue.

## 🧑‍💻 Development

    pnpm install
    pnpm typecheck
    pnpm build
    pnpm verify
    pnpm verify:web-routes

Useful docs: [release checklist](docs/release-checklist.md), [maintenance workflow](docs/maintenance-workflow.md), [IP & attribution](docs/IP-AND-ATTRIBUTION.md).

App icons live in `assets/app-icons/` (desktop, web, iOS, Android) and the plugin ships `assets/zhulong.ico` / `assets/zhulong-icon.png` for app packaging.

## 💬 Community

**Questions, ideas, or DSH plugin talk — join the QQ or WeChat group:**

| QQ group | WeChat group |
|:---:|:---:|
| <a href="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/support/group-qr.jpg" target="_blank" rel="noreferrer" title="Click to enlarge"><img src="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/support/group-qr.jpg" width="220" alt="QQ group QR" /></a> | <a href="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/support/group-wechat.jpg" target="_blank" rel="noreferrer" title="Click to enlarge"><img src="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/support/group-wechat.jpg" width="220" alt="WeChat group QR" /></a> |

**Buy the author a coffee (optional):**

| WeChat Pay | WeChat Reward |
|:---:|:---:|
| <a href="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/support/wechat-pay.jpg" target="_blank" rel="noreferrer" title="Click to enlarge"><img src="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/support/wechat-pay.jpg" width="200" alt="WeChat Pay QR" /></a> | <a href="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/support/wechat-reward.jpg" target="_blank" rel="noreferrer" title="Click to enlarge"><img src="https://raw.githubusercontent.com/EternalNight996/dsh-pixel-team/main/assets/support/wechat-reward.jpg" width="200" alt="WeChat Reward QR" /></a> |

> Sponsorship is optional and changes nothing; the plugin stays MIT and free. See [SPONSOR.md](SPONSOR.md).

- Issues: https://github.com/EternalNight996/dsh-pixel-team/issues
- Maintained and published by **惠州市梦游科技有限公司** (Huizhou Mengyou Technology Co., Ltd.).

## 📄 License

MIT © 2026 惠州市梦游科技有限公司. See [NOTICE.md](NOTICE.md) and [LICENSE](LICENSE) for attribution and license text. The pixel hall, cultivation system, equipment, 封神榜 and 宗门志 are original to this project.

<p align="center"><strong>⭐ Star the repo if you want the hall to keep growing.</strong></p>
