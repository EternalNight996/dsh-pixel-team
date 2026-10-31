window.__ModuleLoader__.load({
	id: "dsh-pixel-team",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let react_dom = require("react-dom");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		//#region lib/client/icons.js
		/** Plugin-owned icons avoid depending on the host's generated design-export names. */
		const stroke = {
			fill: "none",
			stroke: "currentColor",
			strokeWidth: 1.5,
			strokeLinecap: "round",
			strokeLinejoin: "round"
		};
		function IconBranchOutline16() {
			return (0, react_jsx_runtime.jsxs)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				...stroke,
				children: [
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "4",
						cy: "3",
						r: "1.5"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "12",
						cy: "4",
						r: "1.5"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "4",
						cy: "13",
						r: "1.5"
					}),
					(0, react_jsx_runtime.jsx)("path", { d: "M4 4.5v7M4 9h3a5 5 0 0 0 5-3.5" })
				]
			});
		}
		function IconStopFill16() {
			return (0, react_jsx_runtime.jsx)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				children: (0, react_jsx_runtime.jsx)("rect", {
					x: "4",
					y: "4",
					width: "8",
					height: "8",
					rx: "1",
					fill: "currentColor"
				})
			});
		}
		function IconWarningOutline16() {
			return (0, react_jsx_runtime.jsxs)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				...stroke,
				children: [(0, react_jsx_runtime.jsx)("path", { d: "m7 2-5.5 10a1 1 0 0 0 1 1.5h11a1 1 0 0 0 1-1.5L9 2a1.1 1.1 0 0 0-2 0Z" }), (0, react_jsx_runtime.jsx)("path", { d: "M8 6v3m0 2v.1" })]
			});
		}
		//#endregion
		//#region lib/client/cultivation.js
		/**
		* 修炼体系：修为全局持久化，任务完成快、挂机慢；等级上限 9999。
		*
		* 这里负责“修为 -> 等级/境界/装备/技能解锁”，修为累积由 cultivation-store 负责。
		*/
		const CULTIVATION_REALMS = [
			"realm.mortal",
			"realm.qi",
			"realm.foundation",
			"realm.golden",
			"realm.nascent",
			"realm.spirit",
			"realm.void",
			"realm.integration",
			"realm.mahayana",
			"realm.tribulation",
			"realm.trueImmortal",
			"realm.goldenImmortal",
			"realm.taiyi",
			"realm.daluo",
			"realm.dao"
		];
		/** 装备物品栏：等级里程碑解锁。 */
		const CULTIVATION_ITEMS = [
			{
				id: "weapon-tao",
				kind: "weapon",
				level: 1,
				key: "item.weapon.tao",
				icon: "🗡"
			},
			{
				id: "weapon-spirit",
				kind: "weapon",
				level: 3,
				key: "item.weapon.spirit",
				icon: "⚔"
			},
			{
				id: "weapon-treasure",
				kind: "weapon",
				level: 10,
				key: "item.weapon.treasure",
				icon: "🔮"
			},
			{
				id: "weapon-immortal",
				kind: "weapon",
				level: 50,
				key: "item.weapon.immortal",
				icon: "🪄"
			},
			{
				id: "weapon-divine",
				kind: "weapon",
				level: 500,
				key: "item.weapon.divine",
				icon: "⚡"
			},
			{
				id: "weapon-core",
				kind: "weapon",
				level: 150,
				key: "item.weapon.core",
				icon: "🔱"
			},
			{
				id: "weapon-spirit-treasure",
				kind: "weapon",
				level: 700,
				key: "item.weapon.spiritTreasure",
				icon: "🔮"
			},
			{
				id: "weapon-immortal-high",
				kind: "weapon",
				level: 2800,
				key: "item.weapon.immortalHigh",
				icon: "🪄"
			},
			{
				id: "weapon-true-immortal",
				kind: "weapon",
				level: 5200,
				key: "item.weapon.trueImmortal",
				icon: "🌟"
			},
			{
				id: "weapon-dao",
				kind: "weapon",
				level: 9e3,
				key: "item.weapon.dao",
				icon: "🪐"
			},
			{
				id: "mount-walk",
				kind: "mount",
				level: 1,
				key: "office.mountWalk",
				icon: "🚶",
				form: "off"
			},
			{
				id: "mount-sword",
				kind: "mount",
				level: 5,
				key: "item.mount.sword",
				icon: "🗡",
				form: "sword"
			},
			{
				id: "mount-beast",
				kind: "mount",
				level: 8,
				key: "item.mount.beast",
				icon: "🐉",
				form: "beast"
			},
			{
				id: "mount-crane",
				kind: "mount",
				level: 20,
				key: "item.mount.crane",
				icon: "🕊",
				form: "beast"
			},
			{
				id: "mount-qilin",
				kind: "mount",
				level: 50,
				key: "item.mount.qilin",
				icon: "🦄",
				form: "beast"
			},
			{
				id: "mount-dragon",
				kind: "mount",
				level: 100,
				key: "item.mount.dragon",
				icon: "🐲",
				form: "beast"
			},
			{
				id: "mount-jiao",
				kind: "mount",
				level: 350,
				key: "item.mount.jiao",
				icon: "🐍",
				form: "beast"
			},
			{
				id: "mount-immortal-crane",
				kind: "mount",
				level: 1200,
				key: "item.mount.immortalCrane",
				icon: "🕊",
				form: "beast"
			},
			{
				id: "mount-kirin",
				kind: "mount",
				level: 2800,
				key: "item.mount.kirin",
				icon: "🦄",
				form: "beast"
			},
			{
				id: "mount-true-dragon",
				kind: "mount",
				level: 5200,
				key: "item.mount.trueDragon",
				icon: "🐉",
				form: "beast"
			},
			{
				id: "mount-phoenix",
				kind: "mount",
				level: 8e3,
				key: "item.mount.phoenix",
				icon: "🔥",
				form: "beast"
			},
			{
				id: "mount-dao-beast",
				kind: "mount",
				level: 9800,
				key: "item.mount.daoBeast",
				icon: "🦣",
				form: "beast"
			},
			{
				id: "skill-aura",
				kind: "skill",
				level: 2,
				key: "skill.aura",
				icon: "✨"
			},
			{
				id: "skill-shield",
				kind: "skill",
				level: 7,
				key: "skill.shield",
				icon: "🛡"
			},
			{
				id: "skill-swordarray",
				kind: "skill",
				level: 15,
				key: "skill.swordArray",
				icon: "🌀"
			},
			{
				id: "skill-gale",
				kind: "skill",
				level: 30,
				key: "skill.gale",
				icon: "🌪"
			},
			{
				id: "skill-law",
				kind: "skill",
				level: 100,
				key: "skill.law",
				icon: "🪷"
			},
			{
				id: "skill-swordqi",
				kind: "skill",
				level: 50,
				key: "skill.swordQi",
				icon: "🗡"
			},
			{
				id: "skill-pillfire",
				kind: "skill",
				level: 150,
				key: "skill.pillFire",
				icon: "🔥"
			},
			{
				id: "skill-infantfire",
				kind: "skill",
				level: 350,
				key: "skill.infantFire",
				icon: "👶"
			},
			{
				id: "skill-divinepower",
				kind: "skill",
				level: 700,
				key: "skill.divinePower",
				icon: "✨"
			},
			{
				id: "skill-domain",
				kind: "skill",
				level: 1200,
				key: "skill.domain",
				icon: "🌌"
			},
			{
				id: "skill-dharma",
				kind: "skill",
				level: 2800,
				key: "skill.dharma",
				icon: "🪷"
			},
			{
				id: "skill-immortalart",
				kind: "skill",
				level: 5200,
				key: "skill.immortalArt",
				icon: "🌟"
			},
			{
				id: "skill-daoart",
				kind: "skill",
				level: 9e3,
				key: "skill.daoArt",
				icon: "🪐"
			}
		];
		/** 境界带宽：炼气/筑基/…一路扩到 9999。 */
		const REALM_BANDS = [
			4,
			49,
			149,
			349,
			699,
			1199,
			1899,
			2799,
			3899,
			5199,
			6699,
			7999,
			8999,
			9799,
			9999
		];
		/** 等级落在第几重境界（0 起，对应 CULTIVATION_REALMS）。 */
		function realmIndexForLevel(level) {
			const index = REALM_BANDS.findIndex((band) => level <= band);
			return index < 0 ? REALM_BANDS.length - 1 : index;
		}
		/** 升到下一级还需要的修为（随等级线性增长）。 */
		function xpNeed(level) {
			return Math.round(60 * Math.pow(Math.max(1, level), 1.2));
		}
		/** 完成任务获得的修为：等级越高收益越高。 */
		function taskXpFor(level) {
			return 60 + Math.max(1, Math.floor(level)) * 15;
		}
		/** 掌门带队完成任务获得的修为。 */
		function captainTaskXpFor(level) {
			return 40 + Math.max(1, Math.floor(level)) * 8;
		}
		/** 挂机整体速度：0.5 = 在加速曲线上再砍一半（1 级保底 10 点不变）。 */
		const IDLE_XP_SCALE = .5;
		/** 高等级缓速指数：等级越高，每级耗时涨得越明显。 */
		const IDLE_TAPER = .8;
		/**
		* 每 10 秒挂机修为。
		*
		* 目标曲线：1 级正好 10 点（20 秒一级）；其余等级在加速曲线上整体减半。
		* 2 级后逐步加快，100 级约 20 秒一级（满连击），1→100 约 45 分钟；
		* 之后每级耗时按 (lv/100)^0.8 拉长（1000 级约 2 分钟、封顶约 13 分钟），越高越慢。
		*/
		function idleXpPer10s(level) {
			const lv = Math.max(1, Math.floor(level));
			const ramp = 1 + Math.min(1, lv / 100);
			const softCap = Math.pow(Math.max(1, lv / 100), IDLE_TAPER);
			return Math.max(10, Math.round(10 * Math.pow(lv, 1.2) * ramp * IDLE_XP_SCALE / softCap));
		}
		/** 连续挂机加成：每 1 分钟 +0.5 倍，最高 3 倍（离线补结按基础值）。 */
		function idleStreakMultiplier(streakTicks) {
			return Math.min(3, 1 + Math.floor(Math.max(0, streakTicks) / 6) * .5);
		}
		function cultivationFromXp(xp) {
			const safe = Math.max(0, xp);
			let level = 1;
			let floor = 0;
			let need = xpNeed(1);
			while (level < 9999 && safe >= floor + need) {
				floor += need;
				level += 1;
				need = xpNeed(level);
			}
			const realmIndex = realmIndexForLevel(level);
			const ratio = level >= 9999 ? 1 : Math.min(1, Math.max(0, (safe - floor) / need));
			const skills = CULTIVATION_ITEMS.filter((item) => item.kind === "skill" && level >= item.level).map((item) => item.key);
			return {
				level,
				xp: safe,
				floor,
				next: floor + need,
				ratio,
				rankKey: CULTIVATION_REALMS[realmIndex],
				skills
			};
		}
		function memberKey(name) {
			return `member:${name.trim()}`;
		}
		function captainKey(teamName) {
			return `captain:${teamName.trim()}`;
		}
		//#endregion
		//#region lib/client/cultivation-store.js
		/**
		* 全局修为仓库：按“修士名字 / 宗门掌门”持久化累计修为。
		*
		* - 任务完成：给对应修士加较多修为（历史已完成任务在首次见到时结算一次）；
		* - 掌门：按宗门已完成任务获得带队修为；
		* - 挂机：当前对话面板所属宗门的所有修士一起结算；正在对话的角色额外享受连击；
		* - 数据落在 localStorage，跨宗门、跨会话共享。
		*/
		const STORAGE_KEY = "dsh-pixel-team.cultivation.v1";
		function emptyState() {
			return {
				xp: {},
				seen: {},
				idleAt: {},
				streak: {},
				tick: Date.now()
			};
		}
		function load() {
			if (typeof localStorage === "undefined") return emptyState();
			try {
				const raw = localStorage.getItem(STORAGE_KEY);
				if (raw === null) return emptyState();
				const parsed = JSON.parse(raw);
				if (typeof parsed !== "object" || parsed === null) return emptyState();
				return {
					xp: typeof parsed.xp === "object" && parsed.xp !== null ? parsed.xp : {},
					seen: typeof parsed.seen === "object" && parsed.seen !== null ? parsed.seen : {},
					idleAt: typeof parsed.idleAt === "object" && parsed.idleAt !== null ? parsed.idleAt : {},
					streak: typeof parsed.streak === "object" && parsed.streak !== null ? parsed.streak : {},
					lastTeam: typeof parsed.lastTeam === "string" ? parsed.lastTeam : void 0,
					tick: typeof parsed.tick === "number" ? parsed.tick : Date.now()
				};
			} catch {
				return emptyState();
			}
		}
		let state$1 = load();
		let version = 0;
		const listeners$1 = /* @__PURE__ */ new Set();
		function persist() {
			if (typeof localStorage === "undefined") return;
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(state$1));
			} catch {}
		}
		function notify$1() {
			version += 1;
			for (const listener of listeners$1) listener();
		}
		function addXp(key, amount) {
			if (!(amount > 0)) return false;
			state$1.xp[key] = (state$1.xp[key] ?? 0) + amount;
			return true;
		}
		function subscribeCultivation(listener) {
			listeners$1.add(listener);
			return () => {
				listeners$1.delete(listener);
			};
		}
		function cultivationVersion() {
			return version;
		}
		/** 全局修为查询；组件通过 useCultivationVersion 订阅后调用。 */
		function xpOf(key) {
			return Math.round(state$1.xp[key] ?? 0);
		}
		function useCultivationVersion() {
			return (0, react.useSyncExternalStore)(subscribeCultivation, cultivationVersion, cultivationVersion);
		}
		/**
		* 结算一个角色的挂机修为：每满 10 秒一笔。
		* 当前对话面板内的角色都会调用；只有正在对话的那位吃连续在线倍率。
		* 离线批量补结按基础值，最多补 8 小时。
		*/
		function settleIdleXp(key, now, active) {
			const last = state$1.idleAt[key] ?? now;
			const gap = now - last;
			const intervals = Math.min(2880, Math.floor(gap / 1e4));
			if (intervals <= 0) {
				if (state$1.idleAt[key] === void 0) {
					state$1.idleAt[key] = now;
					state$1.streak[key] = 0;
				}
				return false;
			}
			const online = gap <= 3e4;
			const prior = online ? state$1.streak[key] ?? 0 : 0;
			const multiplier = active && online && intervals === 1 ? idleStreakMultiplier(prior) : 1;
			const level = cultivationFromXp(xpOf(key)).level;
			const gained = addXp(key, Math.round(intervals * idleXpPer10s(level) * multiplier));
			state$1.idleAt[key] = last + intervals * 1e4;
			if (active) state$1.streak[key] = prior + intervals;
			return gained;
		}
		/**
		* 消费一次队伍快照：结算新完成的任务、掌门带队修为，以及当前对话面板内全队的挂机修为。
		* @param teams - 所有实时队伍（同一份 activity 快照）。
		* @param currentSessionId - 当前前台会话；只有它所属宗门的面板会获得挂机修为。
		*/
		function ingestCultivation(teams, currentSessionId) {
			const now = Date.now();
			let changed = false;
			for (const team of teams) {
				for (const member of team.members) {
					const key = memberKey(member.name);
					const seenKey = `${team.teamId}:member:${member.name}`;
					const previous = state$1.seen[seenKey];
					if (previous === void 0) {
						state$1.seen[seenKey] = member.done;
						if (member.done > 0) changed = addXp(key, member.done * taskXpFor(cultivationFromXp(xpOf(key)).level)) || changed;
					} else if (member.done > previous) {
						changed = addXp(key, (member.done - previous) * taskXpFor(cultivationFromXp(xpOf(key)).level)) || changed;
						state$1.seen[seenKey] = member.done;
					} else if (member.done < previous) state$1.seen[seenKey] = member.done;
				}
				const teamDone = team.tasks.filter((task) => task.status === "completed").length;
				const captainSeenKey = `${team.teamId}:captain`;
				const captainPrevious = state$1.seen[captainSeenKey];
				if (captainPrevious === void 0) {
					state$1.seen[captainSeenKey] = teamDone;
					if (teamDone > 0) changed = addXp(captainKey(team.name), teamDone * captainTaskXpFor(cultivationFromXp(xpOf(captainKey(team.name))).level)) || changed;
				} else if (teamDone > captainPrevious) {
					changed = addXp(captainKey(team.name), (teamDone - captainPrevious) * captainTaskXpFor(cultivationFromXp(xpOf(captainKey(team.name))).level)) || changed;
					state$1.seen[captainSeenKey] = teamDone;
				} else if (teamDone < captainPrevious) state$1.seen[captainSeenKey] = teamDone;
			}
			const currentTeam = currentSessionId === void 0 || currentSessionId === "" ? void 0 : teams.find((team) => team.captainSessionId === currentSessionId || team.members.some((member) => member.id === currentSessionId));
			const currentKey = currentTeam === void 0 ? void 0 : currentTeam.captainSessionId === currentSessionId ? captainKey(currentTeam.name) : memberKey(currentTeam.members.find((member) => member.id === currentSessionId)?.name ?? "");
			if (currentTeam !== void 0) {
				const keys = [captainKey(currentTeam.name), ...currentTeam.members.map((member) => memberKey(member.name))];
				if (state$1.lastTeam !== currentTeam.teamId) {
					for (const key of keys) {
						state$1.idleAt[key] = now;
						state$1.streak[key] = 0;
					}
					state$1.lastTeam = currentTeam.teamId;
					changed = true;
				}
				for (const key of keys) changed = settleIdleXp(key, now, key === currentKey) || changed;
			} else if (state$1.lastTeam !== void 0) {
				state$1.lastTeam = void 0;
				changed = true;
			}
			state$1.tick = now;
			if (changed) {
				persist();
				notify$1();
			}
		}
		//#endregion
		//#region lib/client/role-labels.js
		/** Built-in roles, in picker order. */
		const ROLE_META = [
			{
				id: "planner",
				nameKey: "role.planner.name",
				abilityKey: "role.planner.ability"
			},
			{
				id: "implementer",
				nameKey: "role.implementer.name",
				abilityKey: "role.implementer.ability"
			},
			{
				id: "frontend",
				nameKey: "role.frontend.name",
				abilityKey: "role.frontend.ability"
			},
			{
				id: "backend",
				nameKey: "role.backend.name",
				abilityKey: "role.backend.ability"
			},
			{
				id: "integrator",
				nameKey: "role.integrator.name",
				abilityKey: "role.integrator.ability"
			},
			{
				id: "security",
				nameKey: "role.security.name",
				abilityKey: "role.security.ability"
			},
			{
				id: "verifier",
				nameKey: "role.verifier.name",
				abilityKey: "role.verifier.ability"
			},
			{
				id: "reviewer",
				nameKey: "role.reviewer.name",
				abilityKey: "role.reviewer.ability"
			},
			{
				id: "researcher",
				nameKey: "role.researcher.name",
				abilityKey: "role.researcher.ability"
			},
			{
				id: "analyst",
				nameKey: "role.analyst.name",
				abilityKey: "role.analyst.ability"
			},
			{
				id: "writer",
				nameKey: "role.writer.name",
				abilityKey: "role.writer.ability"
			},
			{
				id: "auditor",
				nameKey: "role.auditor.name",
				abilityKey: "role.auditor.ability"
			},
			{
				id: "architect",
				nameKey: "role.architect.name",
				abilityKey: "role.architect.ability"
			},
			{
				id: "tester",
				nameKey: "role.tester.name",
				abilityKey: "role.tester.ability"
			},
			{
				id: "documenter",
				nameKey: "role.documenter.name",
				abilityKey: "role.documenter.ability"
			},
			{
				id: "operator",
				nameKey: "role.operator.name",
				abilityKey: "role.operator.ability"
			},
			{
				id: "talisman",
				nameKey: "role.talisman.name",
				abilityKey: "role.talisman.ability"
			},
			{
				id: "healer",
				nameKey: "role.healer.name",
				abilityKey: "role.healer.ability"
			},
			{
				id: "beastmaster",
				nameKey: "role.beastmaster.name",
				abilityKey: "role.beastmaster.ability"
			},
			{
				id: "puppeteer",
				nameKey: "role.puppeteer.name",
				abilityKey: "role.puppeteer.ability"
			},
			{
				id: "musician",
				nameKey: "role.musician.name",
				abilityKey: "role.musician.ability"
			},
			{
				id: "poisoner",
				nameKey: "role.poisoner.name",
				abilityKey: "role.poisoner.ability"
			},
			{
				id: "monk",
				nameKey: "role.monk.name",
				abilityKey: "role.monk.ability"
			},
			{
				id: "demon",
				nameKey: "role.demon.name",
				abilityKey: "role.demon.ability"
			}
		];
		const ROLE_INDEX = new Map(ROLE_META.map((role) => [role.id, role]));
		/**
		* Localized label for one role id.
		* @param id - the wire role id (for example `implementer`).
		* @param memberName - the member's display name, used to avoid repeating the
		*   role word for members that were named after their role.
		* @param t - the AgentTeams translator.
		* @returns the localized role name, the role's duty when the name already is
		*   that name, or the untouched id for a custom role.
		*/
		function roleLabel(id, memberName, t) {
			const meta = ROLE_INDEX.get(id);
			if (meta === void 0) return id;
			const name = t(meta.nameKey);
			return memberName.trim() === name ? t(meta.abilityKey) : name;
		}
		//#endregion
		//#region lib/client/role-visuals.js
		/**
		* Generated by scripts/gen-cultivation-art.mjs from the avatar palettes.
		* The canvas scene dresses each desk with the 道途 robe and 本命法器 so the
		* office and the roster portraits show the same character.
		*/
		const ROLE_VISUALS = {
			captain: {
				weapon: "crown",
				robe: "#d4af37",
				robeDark: "#9a7a1e",
				robeLight: "#f2d97a",
				trim: "#8a1c1c",
				accent: "#ffe9a8",
				hair: "#2a2230",
				skin: "#f2cfae"
			},
			planner: {
				weapon: "fan",
				robe: "#3f4f7a",
				robeDark: "#2b3757",
				robeLight: "#5c6fa0",
				trim: "#d8e6ff",
				accent: "#d8e6ff",
				hair: "#2a2230",
				skin: "#f2cfae",
				hairStyle: "topknot"
			},
			implementer: {
				weapon: "sword",
				robe: "#3f6a8a",
				robeDark: "#2a4a63",
				robeLight: "#5f8fb2",
				trim: "#cfe8ff",
				accent: "#cfe8ff",
				hair: "#241f2c",
				skin: "#f2cfae"
			},
			frontend: {
				weapon: "brush",
				robe: "#3f7a6a",
				robeDark: "#2a5a4e",
				robeLight: "#5f9a88",
				trim: "#c8f2e8",
				accent: "#8fe3d0",
				hair: "#2a2230",
				skin: "#f2cfae",
				hairStyle: "long"
			},
			backend: {
				weapon: "compass",
				robe: "#4a5a7a",
				robeDark: "#323d57",
				robeLight: "#66789a",
				trim: "#cfe0ff",
				accent: "#8fb8ff",
				hair: "#241f2c",
				skin: "#f2cfae"
			},
			integrator: {
				weapon: "array",
				robe: "#7a5a3a",
				robeDark: "#543d28",
				robeLight: "#a07a50",
				trim: "#f2d9a8",
				accent: "#f2c14e",
				hair: "#2a2230",
				skin: "#f2cfae",
				hairStyle: "topknot"
			},
			security: {
				weapon: "talisman",
				robe: "#4a2a3a",
				robeDark: "#321c28",
				robeLight: "#6a3f52",
				trim: "#f2c14e",
				accent: "#ff9aa8",
				hair: "#1c1a22",
				skin: "#f2cfae",
				beard: true
			},
			verifier: {
				weapon: "pill",
				robe: "#7a5c9e",
				robeDark: "#55416f",
				robeLight: "#9b7fc0",
				trim: "#e6d9ff",
				accent: "#e6d9ff",
				hair: "#2a2230",
				skin: "#f2cfae"
			},
			reviewer: {
				weapon: "scroll",
				robe: "#4a4a58",
				robeDark: "#32323d",
				robeLight: "#666675",
				trim: "#d4af37",
				accent: "#ffe9a8",
				hair: "#1c1a22",
				skin: "#f2cfae",
				beard: true
			},
			researcher: {
				weapon: "gourd",
				robe: "#4f7d5a",
				robeDark: "#365740",
				robeLight: "#6c9f78",
				trim: "#d9f2df",
				accent: "#d9f2df",
				hair: "#2a2230",
				skin: "#f2cfae",
				hairStyle: "long"
			},
			analyst: {
				weapon: "compass",
				robe: "#3f5a8a",
				robeDark: "#2a3f63",
				robeLight: "#5c7cb2",
				trim: "#bfe3ff",
				accent: "#bfe3ff",
				hair: "#241f2c",
				skin: "#f2cfae",
				hairStyle: "topknot"
			},
			writer: {
				weapon: "brush",
				robe: "#5a6a3f",
				robeDark: "#3e4a2a",
				robeLight: "#788c56",
				trim: "#f0f2d9",
				accent: "#f0f2d9",
				hair: "#2a2230",
				skin: "#f2cfae",
				hairStyle: "long"
			},
			auditor: {
				weapon: "lantern",
				robe: "#5a5a6a",
				robeDark: "#3d3d49",
				robeLight: "#787888",
				trim: "#ffe9b8",
				accent: "#ffe9b8",
				hair: "#1c1a22",
				skin: "#f2cfae",
				beard: true
			},
			architect: {
				weapon: "array",
				robe: "#2f6a6a",
				robeDark: "#1f4848",
				robeLight: "#4b8f8f",
				trim: "#bff3ef",
				accent: "#bff3ef",
				hair: "#241f2c",
				skin: "#f2cfae"
			},
			tester: {
				weapon: "fist",
				robe: "#8a3f3f",
				robeDark: "#612a2a",
				robeLight: "#ad5c5c",
				trim: "#ffd9c2",
				accent: "#ffd9c2",
				hair: "#241f2c",
				skin: "#f2cfae"
			},
			documenter: {
				weapon: "book",
				robe: "#8a6a3a",
				robeDark: "#614a26",
				robeLight: "#ad8a56",
				trim: "#ffe9c2",
				accent: "#ffe9c2",
				hair: "#2a2230",
				skin: "#f2cfae"
			},
			operator: {
				weapon: "hammer",
				robe: "#6a5a3f",
				robeDark: "#4a3f2b",
				robeLight: "#8a7856",
				trim: "#ffe9b8",
				accent: "#ffe9b8",
				hair: "#241f2c",
				skin: "#f2cfae"
			},
			talisman: {
				weapon: "talisman",
				robe: "#a85a3a",
				robeDark: "#7a3f28",
				robeLight: "#c97a56",
				trim: "#f2d97a",
				accent: "#ffd27a",
				hair: "#2a2230",
				skin: "#f2cfae"
			},
			healer: {
				weapon: "needle",
				robe: "#cfd8d4",
				robeDark: "#9fada8",
				robeLight: "#eef4f0",
				trim: "#7fb89a",
				accent: "#d9f2e6",
				hair: "#2a2230",
				skin: "#f2cfae"
			},
			beastmaster: {
				weapon: "whistle",
				robe: "#7a6a3f",
				robeDark: "#544a2b",
				robeLight: "#9a8a56",
				trim: "#d9c27a",
				accent: "#ffe9b8",
				hair: "#241f2c",
				skin: "#f2cfae"
			},
			puppeteer: {
				weapon: "puppet",
				robe: "#5f4a6a",
				robeDark: "#3f3149",
				robeLight: "#806a8c",
				trim: "#c7a8d8",
				accent: "#e0d0ff",
				hair: "#1c1a22",
				skin: "#f2cfae"
			},
			musician: {
				weapon: "flute",
				robe: "#8a9ec2",
				robeDark: "#5f7291",
				robeLight: "#a8bcdc",
				trim: "#e8f0ff",
				accent: "#cfe4ff",
				hair: "#2a2230",
				skin: "#f2cfae",
				hairStyle: "long"
			},
			poisoner: {
				weapon: "vial",
				robe: "#4a6a4a",
				robeDark: "#33503a",
				robeLight: "#648a64",
				trim: "#b8e08a",
				accent: "#d4ff9a",
				hair: "#241f2c",
				skin: "#f2cfae"
			},
			monk: {
				weapon: "beads",
				robe: "#a06a3a",
				robeDark: "#754a24",
				robeLight: "#c08a56",
				trim: "#f2c14e",
				accent: "#ffe9a8",
				hair: "#2a2230",
				skin: "#f2cfae"
			},
			demon: {
				weapon: "blade",
				robe: "#5a2a3a",
				robeDark: "#3c1a28",
				robeLight: "#7a3f52",
				trim: "#d43a4a",
				accent: "#ff9aa8",
				hair: "#1c1a22",
				skin: "#f2cfae"
			}
		};
		/** Visuals for a role id (custom roles resolve to undefined). */
		function roleVisual(role) {
			return ROLE_VISUALS[role.trim().toLowerCase()];
		}
		/**
		* 离地高度（世界像素）：骑手脚尖正好落在剑脊 / 兽鞍上。
		*
		* 数值要高于矮案案面（baseY−17）：御剑/骑兽是“飞起来”，不是站在案上的剑上。
		*/
		const TRAVEL_LIFT = {
			walk: 0,
			sword: 24,
			beast: 38
		};
		/**
		* 把「等级 + 装备选择」折算成场景形态。
		*
		* 关键约束：默认（未选/auto/off）一律步行；只有显式选了 sword/beast 且等级
		* 够格才离地。等级不够时退回步行，不偷偷飞起来。
		*/
		function travelFormFor(level, override) {
			const safeLevel = Number.isFinite(level) ? Math.max(0, Math.floor(level)) : 0;
			if (override === "sword") return safeLevel >= 5 ? "sword" : "walk";
			if (override === "beast") return safeLevel >= 8 ? "beast" : "walk";
			return "walk";
		}
		/**
		* mini 缩放：像素人定位是可爱小手办，美术按 92px 画完整体缩到约 56px，
		* 汉服细节不丢，人也不会显得又高又怪。
		*/
		const CHARACTER_SCALE = .61;
		/** 场景里实际看到的身形高度（名牌、等级框、热区都按这个对齐）。 */
		const CHARACTER_DISPLAY_HEIGHT = Math.round(92 * CHARACTER_SCALE);
		/** 双击循环：步行 → 御剑 → 神兽 → 步行，按等级裁剪可选形态。 */
		function nextTravelForm(level, current) {
			const safeLevel = Number.isFinite(level) ? Math.max(0, Math.floor(level)) : 0;
			if (current === "walk") return safeLevel >= 5 ? "sword" : "walk";
			if (current === "sword") return safeLevel >= 8 ? "beast" : "walk";
			return "walk";
		}
		//#endregion
		//#region lib/client/pixel-office/office-actions.js
		/**
		* Interactive facilities painted on the sect-hall wall.
		*
		* The wall is the workspace's menu: every facility is a fixed scene-space
		* rectangle that maps to one panel. The renderer draws the pixels, React owns
		* the copy and the panel, and this module keeps both sides on the same rects so
		* the hit area can never drift away from the art.
		*/
		/** Fixed wall layout: bookshelf, gate, merit stele and message rack. */
		const FACILITIES = {
			config: {
				x: 8,
				y: 10,
				w: 80,
				h: 60
			},
			board: {
				x: 96,
				y: 10,
				w: 70,
				h: 60
			},
			teams: {
				x: 198,
				y: 6,
				w: 124,
				h: 66
			},
			ranks: {
				x: 330,
				y: 10,
				w: 64,
				h: 60
			},
			gear: {
				x: 402,
				y: 10,
				w: 62,
				h: 60
			},
			about: {
				x: 472,
				y: 10,
				w: 48,
				h: 60
			},
			inbox: {
				x: 466,
				y: 10,
				w: 60,
				h: 60
			}
		};
		/** Order used by the rail and by tests (left to right on the wall). */
		const FACILITY_ORDER = [
			"config",
			"board",
			"teams",
			"ranks",
			"gear",
			"about"
		];
		//#endregion
		//#region lib/client/equipment-visuals.js
		/**
		* 装备外观映射：把「天机阁」里的物品 id 换成场景里真正画得出来的形状 / 配色。
		*
		* 场景只认识形状，不认识业务；这层纯函数让武器切换有可见差异，也方便测试。
		*/
		/** 物品 id -> 武器外形。未知 id 退化成普通剑。 */
		function weaponShapeFor(itemId) {
			switch (itemId) {
				case "weapon-spirit": return "saber";
				case "weapon-treasure": return "orb";
				case "weapon-spirit-treasure": return "orb";
				case "weapon-core": return "trident";
				case "weapon-divine": return "bolt";
				case "weapon-immortal": return "staff";
				case "weapon-immortal-high": return "staff";
				case "weapon-true-immortal": return "star";
				case "weapon-dao": return "planet";
				default: return "sword";
			}
		}
		/** 等级 -> 灵光色调；越晚解锁越亮。 */
		function toneForTier(tier) {
			if (tier >= 2800) return {
				name: "dao",
				color: "#f2c14e",
				glow: "242, 193, 78",
				scale: 1.22
			};
			if (tier >= 500) return {
				name: "immortal",
				color: "#c39bff",
				glow: "195, 155, 255",
				scale: 1.12
			};
			if (tier >= 50) return {
				name: "spirit",
				color: "#8fe3ff",
				glow: "143, 227, 255",
				scale: 1.02
			};
			return {
				name: "mortal",
				color: "#d8cfc0",
				glow: "216, 207, 192",
				scale: .92
			};
		}
		/** 坐骑物品 id -> 模型族（只有 beast 形态会用到）。 */
		function mountModelFor(variant) {
			if (variant === void 0) return "beast";
			if (variant.includes("crane")) return "crane";
			if (variant.includes("qilin") || variant.includes("kirin")) return "qilin";
			if (variant.includes("phoenix")) return "phoenix";
			if (variant.includes("dao")) return "dao";
			if (variant.includes("jiao")) return "jiao";
			if (variant.includes("dragon")) return "dragon";
			return "beast";
		}
		//#endregion
		//#region lib/client/realm-colors.js
		/**
		* 境界配色：每跨越一重境界，等级牌换一套颜色。
		*
		* 场景里的等级牌是 canvas 画的，React 里的等级是 DOM 文本；两边共用这里的调色板，
		* 保证同一位修士在洞府/名册/装备页看到的是同一种境界色。
		*/
		/** 十五重境界，顺序与 CULTIVATION_REALMS / REALM_BANDS 一致。 */
		const REALM_PALETTES = [
			{
				border: "#8f8b78",
				background: "#e9e7dc",
				text: "#3d3a2e",
				bar: "#7c7866"
			},
			{
				border: "#7fb27a",
				background: "#d9f2cf",
				text: "#22452a",
				bar: "#4f9a57"
			},
			{
				border: "#5aab9f",
				background: "#d2efe9",
				text: "#123f3a",
				bar: "#2f8d80"
			},
			{
				border: "#6b9ed6",
				background: "#d6e6f8",
				text: "#173a5c",
				bar: "#3c78b5"
			},
			{
				border: "#9a7bd8",
				background: "#e6dcf9",
				text: "#332052",
				bar: "#6f4fb5"
			},
			{
				border: "#cf77b6",
				background: "#f6d9ec",
				text: "#4a173b",
				bar: "#ab3f8b"
			},
			{
				border: "#d29452",
				background: "#f8e2c8",
				text: "#4d2c0f",
				bar: "#b56e22"
			},
			{
				border: "#c9a227",
				background: "#f7edc6",
				text: "#4a3a08",
				bar: "#a9861a"
			},
			{
				border: "#c96a5f",
				background: "#f7d9d4",
				text: "#4f1713",
				bar: "#a43a33"
			},
			{
				border: "#9b4bd1",
				background: "#e9d9f7",
				text: "#3c1355",
				bar: "#7d2fb0"
			},
			{
				border: "#4fa9c9",
				background: "#d3eef7",
				text: "#0f3d4b",
				bar: "#1f8aa8"
			},
			{
				border: "#b8911f",
				background: "#f5e6b0",
				text: "#4a3208",
				bar: "#9c7a12"
			},
			{
				border: "#4faa78",
				background: "#d5f2e2",
				text: "#123f2a",
				bar: "#2f8f60"
			},
			{
				border: "#d07a45",
				background: "#f9dfcf",
				text: "#4d220f",
				bar: "#b45a22"
			},
			{
				border: "#f2c14e",
				background: "#2a2418",
				text: "#ffe9a8",
				bar: "#f2c14e"
			}
		];
		/** 某个等级对应的境界调色板。 */
		function realmPaletteForLevel(level) {
			return REALM_PALETTES[realmIndexForLevel(Math.max(1, Math.floor(level)))] ?? REALM_PALETTES[0];
		}
		//#endregion
		//#region lib/client/pixel-office/cast-timing.js
		/**
		* 施法演出的时间窗口：不同事件给不同时长（破境 1200ms、换装 950ms），
		* 帧序号按窗口进度算，避免旧实现的固定 950ms 公式在 1200ms 破境时
		* 前 250ms 一直停在第 0 帧。
		*/
		/** 窗口内第几帧：进度均匀分布到 count 帧，越界钳制。 */
		function castFrameIndex(window, time, count) {
			if (count <= 0) return 0;
			const span = window.until - window.start;
			if (span <= 0) return count - 1;
			const progress = (time - window.start) / span;
			return Math.max(0, Math.min(count - 1, Math.floor(progress * count)));
		}
		/** 自定义道途没有 RoleVisual 时的兜底配色。 */
		const FALLBACK = {
			robe: "#5b8def",
			robeDark: "#3d63ad",
			robeLight: "#84abf5",
			trim: "#e8eef8",
			accent: "#cfe4ff",
			hair: "#2a2f3a",
			skin: "#f2cfae",
			shadow: "#d9ab86"
		};
		const INK$2 = "#16110e";
		const GOLD$1 = "#f2c14e";
		function paletteOf(visual, isLeader) {
			if (visual === void 0) return {
				...FALLBACK,
				dark: FALLBACK.robeDark,
				light: FALLBACK.robeLight,
				bun: isLeader,
				beard: false
			};
			return {
				robe: visual.robe,
				dark: visual.robeDark,
				light: visual.robeLight,
				trim: visual.trim,
				hair: visual.hair,
				skin: visual.skin,
				shadow: "#d9ab86",
				bun: isLeader || visual.hairStyle === "topknot",
				beard: visual.beard === true
			};
		}
		function paintFrame(g, p, pose) {
			const px = (x, y, w, h, color) => {
				g.fillStyle = color;
				g.fillRect(x, y + pose.bob, w, h);
			};
			const lean = pose.lean;
			px(9 + pose.armL, 43, 5, 18, p.robe);
			px(9 + pose.armL, 43, 1, 18, p.light);
			px(9 + pose.armL, 59, 5, 2, p.trim);
			px(10 + pose.armL, 61, 3, 3, p.skin);
			if (pose.cast !== void 0) {
				px(33, 34, 6, 14, p.robe);
				px(38, 34, 1, 14, p.dark);
				px(33, 32, 6, 2, p.trim);
				px(34, 29, 4, 4, p.skin);
				const o = pose.cast;
				px(37, 25 - o, 4, 4, "#f2c14e");
				px(38, 26 - o, 2, 2, "#fff6d8");
				if (o > 0) {
					px(35, 23 - o, 8, 1, "rgba(255,233,168,0.55)");
					px(36, 29 - o, 6, 1, "rgba(255,233,168,0.35)");
				}
			} else {
				px(34 + pose.armR, 43, 5, 18, p.robe);
				px(38 + pose.armR, 43, 1, 18, p.dark);
				px(34 + pose.armR, 59, 5, 2, p.trim);
				px(35 + pose.armR, 61, 3, 3, p.skin);
			}
			px(9 + lean, 65, 30, 16, p.robe);
			px(9 + lean, 65, 3, 16, p.light);
			px(36 + lean, 65, 3, 16, p.dark);
			px(9 + lean, 79, 30, 2, p.trim);
			px(12 + lean, 81, 3, 1, p.trim);
			px(33 + lean, 81, 3, 1, p.trim);
			if (!pose.sitting) {
				px(16 + pose.legL, 82, 6, 6, p.dark);
				px(26 + pose.legR, 82, 6, 6, p.dark);
				px(15 + pose.legL, 88, 8, 3, INK$2);
				px(25 + pose.legR, 88, 8, 3, INK$2);
				px(15 + pose.legL, 90, 8, 1, p.trim);
				px(25 + pose.legR, 90, 8, 1, p.trim);
			}
			px(14 + lean, 41, 20, 22, p.robe);
			px(14 + lean, 41, 3, 22, p.light);
			px(31 + lean, 41, 3, 22, p.dark);
			px(20 + lean, 42, 2, 10, p.trim);
			px(26 + lean, 42, 2, 10, p.trim);
			px(22 + lean, 46, 4, 1, p.trim);
			px(14 + lean, 61, 20, 4, p.dark);
			px(14 + lean, 61, 20, 1, p.trim);
			px(22 + lean, 61, 4, 4, GOLD$1);
			px(16, 25, 16, 14, p.skin);
			px(16, 25, 16, 3, p.hair);
			px(14, 27, 2, 13, p.hair);
			px(32, 27, 2, 13, p.hair);
			if (!pose.sitting) px(14, 40, 2, 3, p.hair);
			if (p.bun) {
				px(21, 18, 6, 7, p.hair);
				px(23, 16, 2, 2, GOLD$1);
			}
			px(20, 32, 2, 2, "#24303f");
			px(27, 32, 2, 2, "#24303f");
			px(23, 37, 3, 1, p.shadow);
			if (p.beard) px(19, 36, 10, 3, "#cfcbc2");
			px(21, 39, 6, 2, p.skin);
			if (p.bun && p.trim !== void 0) {
				px(18, 22, 12, 2, GOLD$1);
				px(23, 15, 2, 7, p.trim);
				px(27, 16, 6, 1, GOLD$1);
			}
		}
		/** 1px 外描边：保证任何底色上都读得清剪影。 */
		function outline$1(g) {
			const img = g.getImageData(0, 0, 48, 92);
			const d = img.data;
			const alpha = (x, y) => x < 0 || y < 0 || x >= 48 || y >= 92 ? 0 : d[(y * 48 + x) * 4 + 3];
			const add = [];
			for (let y = 0; y < 92; y += 1) for (let x = 0; x < 48; x += 1) {
				if (alpha(x, y) > 0) continue;
				if (alpha(x - 1, y) > 0 || alpha(x + 1, y) > 0 || alpha(x, y - 1) > 0 || alpha(x, y + 1) > 0) add.push([x, y]);
			}
			const n = parseInt(INK$2.slice(1), 16);
			for (const [x, y] of add) {
				const i = (y * 48 + x) * 4;
				d[i] = n >> 16 & 255;
				d[i + 1] = n >> 8 & 255;
				d[i + 2] = n & 255;
				d[i + 3] = 255;
			}
			g.putImageData(img, 0, 0);
		}
		function makeCanvas() {
			const canvas = document.createElement("canvas");
			canvas.width = 48;
			canvas.height = 92;
			const g = canvas.getContext("2d");
			if (g === null) throw new Error("sprite: 2d context unavailable");
			g.imageSmoothingEnabled = false;
			return {
				canvas,
				g
			};
		}
		function frameOf(p, pose) {
			const { canvas, g } = makeCanvas();
			paintFrame(g, p, pose);
			outline$1(g);
			return canvas;
		}
		const cache$3 = /* @__PURE__ */ new Map();
		/** 生成（并缓存）一个道途的三套帧。 */
		function characterFrames(roleKey, visual, isLeader) {
			const key = roleKey + "|" + String(isLeader);
			const hit = cache$3.get(key);
			if (hit !== void 0) return hit;
			const p = paletteOf(visual, isLeader);
			const sit = [frameOf(p, {
				bob: 0,
				legL: 0,
				legR: 0,
				armL: 0,
				armR: 0,
				lean: 0,
				sitting: true
			}), frameOf(p, {
				bob: -1,
				legL: 0,
				legR: 0,
				armL: 0,
				armR: 0,
				lean: 0,
				sitting: true
			})];
			const gait = [
				{
					bob: 0,
					legL: 0,
					legR: 0,
					armL: 0,
					armR: 0,
					lean: 0,
					sitting: false
				},
				{
					bob: -1,
					legL: -1,
					legR: 1,
					armL: 1,
					armR: -1,
					lean: 0,
					sitting: false
				},
				{
					bob: 0,
					legL: -2,
					legR: 2,
					armL: 2,
					armR: -2,
					lean: 0,
					sitting: false
				},
				{
					bob: 0,
					legL: 0,
					legR: 0,
					armL: 0,
					armR: 0,
					lean: 0,
					sitting: false
				},
				{
					bob: -1,
					legL: 1,
					legR: -1,
					armL: -1,
					armR: 1,
					lean: 0,
					sitting: false
				},
				{
					bob: 0,
					legL: 2,
					legR: -2,
					armL: -2,
					armR: 2,
					lean: 0,
					sitting: false
				}
			];
			const ride = [frameOf(p, {
				bob: 0,
				legL: 0,
				legR: 0,
				armL: 1,
				armR: 1,
				lean: 0,
				sitting: true
			}), frameOf(p, {
				bob: -1,
				legL: 0,
				legR: 0,
				armL: 1,
				armR: 1,
				lean: 0,
				sitting: true
			})];
			const cast = [
				0,
				1,
				2,
				3
			].map((step) => frameOf(p, {
				bob: step > 1 ? -1 : 0,
				legL: 0,
				legR: 0,
				armL: 0,
				armR: 0,
				lean: 0,
				sitting: true,
				cast: step
			}));
			const frames = {
				sit,
				walk: gait.map((pose) => frameOf(p, pose)),
				ride,
				cast
			};
			cache$3.set(key, frames);
			return frames;
		}
		//#endregion
		//#region lib/client/pixel-office/sprite/mount-frames.js
		/**
		* 坐骑帧图集：56×40 逻辑像素，四帧步态；鸟形坐骑用两帧振翅。
		*
		* 和修士帧同一套规则：只画一次、缓存、运行时 drawImage。
		*/
		const INK$1 = "#16110e";
		const GOLD = "#f2c14e";
		const W = 56;
		const H = 40;
		const PALETTES = {
			beast: {
				body: "#3d5c52",
				lit: "#5c8272",
				dark: "#2a3f39",
				trim: "#7a3f52",
				horn: "#e8c46a"
			},
			qilin: {
				body: "#c9a24a",
				lit: "#e8c46a",
				dark: "#8f6f2c",
				trim: "#7a3f52",
				horn: "#f2c14e",
				glow: "rgba(255,170,80,0.22)"
			},
			dragon: {
				body: "#3f6a8a",
				lit: "#5f8fb2",
				dark: "#2a4a63",
				trim: "#f2c14e",
				horn: "#f2c14e",
				glow: "rgba(120,200,255,0.20)"
			},
			crane: {
				body: "#f2f5f0",
				lit: "#ffffff",
				dark: "#cfdad6",
				trim: "#d43a3a",
				horn: "#f2c14e"
			},
			phoenix: {
				body: "#e06a2a",
				lit: "#f2a23a",
				dark: "#a8431a",
				trim: "#d43a3a",
				horn: "#f2c14e",
				glow: "rgba(255,140,60,0.22)"
			},
			dao: {
				body: "#5a4a7a",
				lit: "#8a74b0",
				dark: "#3a2f52",
				trim: "#c39bff",
				horn: "#e6d9ff",
				glow: "rgba(180,140,255,0.22)"
			}
		};
		function px(g, x, y, w, h, c) {
			g.fillStyle = c;
			g.fillRect(x, y, w, h);
		}
		function outline(g) {
			const img = g.getImageData(0, 0, W, H);
			const d = img.data;
			const a = (x, y) => x < 0 || y < 0 || x >= W || y >= H ? 0 : d[(y * W + x) * 4 + 3];
			const add = [];
			for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) {
				if (a(x, y) > 0) continue;
				if (a(x - 1, y) > 0 || a(x + 1, y) > 0 || a(x, y - 1) > 0 || a(x, y + 1) > 0) add.push([x, y]);
			}
			const n = parseInt(INK$1.slice(1), 16);
			for (const [x, y] of add) {
				const i = (y * W + x) * 4;
				d[i] = n >> 16 & 255;
				d[i + 1] = n >> 8 & 255;
				d[i + 2] = n & 255;
				d[i + 3] = 255;
			}
			g.putImageData(img, 0, 0);
		}
		/** 四足：兽 / 麒麟 / 龙 / 道兽。 */
		function quadruped(g, p, frame, kind) {
			const swing = [
				1,
				0,
				-1,
				0
			][frame] ?? 0;
			const lift = [
				0,
				-1,
				0,
				1
			][frame] ?? 0;
			const glow = p.glow;
			if (glow !== void 0) {
				g.fillStyle = glow;
				g.beginPath();
				g.ellipse(28, 30, 24, 6, 0, 0, Math.PI * 2);
				g.fill();
			}
			const hindX = 12 - swing;
			const frontX = 33 + swing;
			px(g, hindX, 26, 4, 11, p.dark);
			px(g, hindX + 8, 26, 4, 11, p.dark);
			px(g, frontX, 26, 4, 11, p.dark);
			px(g, frontX + 8, 26, 4, 11, p.dark);
			px(g, hindX - 1, 36, 6, 2, INK$1);
			px(g, hindX + 7, 36, 6, 2, INK$1);
			px(g, frontX - 1, 36, 6, 2, INK$1);
			px(g, frontX + 7, 36, 6, 2, INK$1);
			px(g, 8, 16 - lift, 40, 12, p.body);
			px(g, 10, 16 - lift, 34, 3, p.lit);
			px(g, 8, 25 - lift, 40, 3, p.dark);
			px(g, 4, 14 - lift, 4, 3, p.body);
			px(g, 2, 16 - lift, 3, 2, p.horn);
			px(g, 44, 12 - lift, 5, 12, p.body);
			px(g, 46, 8 - lift, 8, 7, p.lit);
			px(g, 52, 10 - lift, 2, 2, "#ffe9a8");
			if (kind === "qilin" || kind === "dragon" || kind === "dao") {
				px(g, 46, 3 - lift, 2, 6, p.horn);
				px(g, 49, 4 - lift, 2, 4, p.horn);
			}
			if (kind === "dragon" || kind === "dao") {
				px(g, 50, 12 - lift, 4, 1, p.horn);
				for (let i = 0; i < 4; i += 1) px(g, 40 + i * 3, 9 - lift + i, 2, 2, p.horn);
			}
			px(g, 22, 12 - lift, 14, 4, p.trim);
			px(g, 22, 12 - lift, 14, 1, GOLD);
		}
		/** 鸟形：仙鹤 / 凤凰。 */
		function bird(g, p, frame, kind) {
			const flap = [
				0,
				-3,
				0,
				2
			][frame] ?? 0;
			const glow = p.glow;
			if (glow !== void 0) {
				g.fillStyle = glow;
				g.beginPath();
				g.ellipse(28, 30, 24, 6, 0, 0, Math.PI * 2);
				g.fill();
			}
			px(g, 6, 20, 10, 3, p.dark);
			px(g, 3, 22, 8, 2, p.trim);
			if (kind === "phoenix") {
				px(g, 4, 16, 6, 3, p.trim);
				px(g, 2, 18, 6, 2, p.horn);
			}
			px(g, 16, 16, 26, 12, p.body);
			px(g, 18, 16, 22, 3, p.lit);
			px(g, 16, 25, 26, 2, p.dark);
			px(g, 22, 12 + flap, 16, 5, p.lit);
			if (kind === "phoenix") px(g, 20, 10 + flap, 20, 3, p.trim);
			px(g, 42, 8, 4, 12, p.body);
			px(g, 44, 4, 7, 6, p.lit);
			px(g, 50, 6, 3, 2, p.horn);
			if (kind === "crane") px(g, 47, 2, 3, 3, "#d43a3a");
			px(g, 24, 27, 2, 10, p.dark);
			px(g, 33, 27, 2, 10, p.dark);
			px(g, 22, 36, 6, 2, p.horn);
			px(g, 31, 36, 6, 2, p.horn);
			px(g, 24, 12, 12, 4, p.trim);
			px(g, 24, 12, 12, 1, GOLD);
		}
		function makeFrame(p, frame, kind) {
			const canvas = document.createElement("canvas");
			canvas.width = W;
			canvas.height = H;
			const g = canvas.getContext("2d");
			if (g === null) throw new Error("mount: 2d context unavailable");
			g.imageSmoothingEnabled = false;
			if (kind === "crane" || kind === "phoenix") bird(g, p, frame, kind);
			else quadruped(g, p, frame, kind);
			outline(g);
			return canvas;
		}
		const cache$2 = /* @__PURE__ */ new Map();
		/** 一个坐骑族的四帧（缓存）。 */
		function mountFrames(kind) {
			const hit = cache$2.get(kind);
			if (hit !== void 0) return hit;
			const palette = PALETTES[kind] ?? PALETTES.beast;
			const frames = [
				0,
				1,
				2,
				3
			].map((frame) => makeFrame(palette, frame, kind));
			cache$2.set(kind, frames);
			return frames;
		}
		//#endregion
		//#region lib/client/pixel-office/sprite/skill-icons.js
		/**
		* 功法印：16×16 的本命功法符号，按功法序号与境界色生成并缓存。
		*
		* 场景只在「天机阁」装上功法后画它：悬浮在修士身侧，随呼吸上下浮动。
		*/
		const INK = "#16110e";
		const SIZE = 16;
		const FORMS = [
			"sword",
			"flame",
			"talisman",
			"bolt",
			"array",
			"poison",
			"lotus",
			"demon"
		];
		function drawSigil(g, form, color, pale) {
			const px = (x, y, w, h, c) => {
				g.fillStyle = c;
				g.fillRect(x, y, w, h);
			};
			px(1, 1, 14, 14, "rgba(16,20,30,0.55)");
			px(2, 2, 12, 12, color);
			px(3, 3, 10, 10, INK);
			switch (form) {
				case "sword":
					px(7, 4, 2, 8, pale);
					px(5, 8, 6, 1, pale);
					px(6, 3, 4, 1, pale);
					break;
				case "flame":
					px(7, 4, 2, 3, pale);
					px(6, 6, 4, 4, pale);
					px(7, 10, 2, 2, pale);
					break;
				case "talisman":
					px(5, 4, 6, 8, pale);
					px(6, 6, 4, 1, INK);
					px(6, 8, 4, 1, INK);
					break;
				case "bolt":
					px(8, 4, 2, 4, pale);
					px(6, 8, 2, 2, pale);
					px(7, 10, 2, 2, pale);
					break;
				case "array":
					px(4, 5, 8, 1, pale);
					px(4, 10, 8, 1, pale);
					px(7, 5, 2, 6, pale);
					break;
				case "poison":
					px(7, 4, 2, 3, pale);
					px(5, 7, 6, 5, pale);
					px(6, 8, 4, 2, INK);
					break;
				case "lotus":
					px(7, 5, 2, 4, pale);
					px(5, 7, 2, 3, pale);
					px(9, 7, 2, 3, pale);
					break;
				default:
					px(5, 5, 6, 6, pale);
					px(7, 7, 2, 2, INK);
					break;
			}
		}
		function frame(g, w, h, color) {
			const img = g.getImageData(0, 0, w, h);
			const d = img.data;
			const a = (x, y) => x < 0 || y < 0 || x >= w || y >= h ? 0 : d[(y * w + x) * 4 + 3];
			const add = [];
			for (let y = 0; y < h; y += 1) for (let x = 0; x < w; x += 1) {
				if (a(x, y) > 0) continue;
				if (a(x - 1, y) > 0 || a(x + 1, y) > 0 || a(x, y - 1) > 0 || a(x, y + 1) > 0) add.push([x, y]);
			}
			const n = parseInt(INK.slice(1), 16);
			for (const [x, y] of add) {
				const i = (y * w + x) * 4;
				d[i] = n >> 16 & 255;
				d[i + 1] = n >> 8 & 255;
				d[i + 2] = n & 255;
				d[i + 3] = 255;
			}
			g.putImageData(img, 0, 0);
		}
		const cache$1 = /* @__PURE__ */ new Map();
		/** 取一枚功法印（缓存）。 */
		function skillIcon(index, color) {
			const form = FORMS[Math.abs(index) % FORMS.length];
			const key = form + "|" + color;
			const hit = cache$1.get(key);
			if (hit !== void 0) return hit;
			const canvas = document.createElement("canvas");
			canvas.width = SIZE;
			canvas.height = SIZE;
			const g = canvas.getContext("2d");
			if (g === null) throw new Error("skill icon: 2d context unavailable");
			g.imageSmoothingEnabled = false;
			drawSigil(g, form, color, "#ffffff");
			frame(g, SIZE, SIZE, color);
			cache$1.set(key, canvas);
			return canvas;
		}
		//#endregion
		//#region lib/client/pixel-office/PixelOfficeScene.js
		/**
		* Deterministic pixel-office canvas renderer for one AgentTeams snapshot.
		*
		* The scene is framework-agnostic: React owns the canvas element, sizing and
		* the model, while this module owns the animation loop and all drawing. Every
		* frame is defensive — a drawing error degrades to a plain backdrop and keeps
		* the loop alive so a single bad model can never blank the office.
		*
		* Layout contract: characters and desks are drawn in the first pass and every
		* label/bubble in a second pass, so badges never get painted over by a later
		* row. The world grows taller with the row count instead of squeezing rows.
		*/
		const WORLD_W = 520;
		const WORLD_MIN_H = 300;
		const CELL_H = 150;
		const TOP_PAD = 104;
		const MAX_COLUMNS = 4;
		const DESK_W = 72;
		/** 中庭可点物件：配置水晶。 */
		const DIAL_AT = {
			x: WORLD_W - 132,
			y: 142
		};
		const COLORS = {
			wall: "#2f3b33",
			wallShade: "#27322b",
			floor: "#e2d6b8",
			floorLine: "#d3c5a2",
			desk: "#7c5b3a",
			deskTop: "#a67c4f",
			monitor: "#8a6a3a",
			screen: "#7fd4ff",
			screenIdle: "#39445a",
			label: "#e8eef8",
			labelBg: "rgba(20, 24, 32, 0.82)",
			bubble: "rgba(24, 30, 42, 0.92)",
			captain: "#f2c14e",
			alert: "#ef6b6b",
			good: "#67d9a5",
			idle: "#8fa0bb"
		};
		function hash(value) {
			let h = 2166136261;
			for (let i = 0; i < value.length; i += 1) {
				h ^= value.charCodeAt(i);
				h = Math.imul(h, 16777619);
			}
			return Math.abs(h);
		}
		function truncate(text, max) {
			return text.length <= max ? text : `${text.slice(0, Math.max(1, max - 1))}…`;
		}
		/** Rounded rectangle helper (canvas has no built-in one). */
		function roundRect(g, x, y, w, h, r) {
			const radius = Math.min(r, w / 2, h / 2);
			g.beginPath();
			g.moveTo(x + radius, y);
			g.arcTo(x + w, y, x + w, y + h, radius);
			g.arcTo(x + w, y + h, x, y + h, radius);
			g.arcTo(x, y + h, x, y, radius);
			g.arcTo(x, y, x + w, y, radius);
			g.closePath();
		}
		/** Hex color + alpha as a CSS rgba() string (canvas gradients). */
		function rgba(hex, alpha) {
			return `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, ${alpha})`;
		}
		function stateTone(activity) {
			if (activity === "working") return COLORS.good;
			if (activity === "unknown") return COLORS.alert;
			return COLORS.idle;
		}
		function createPixelScene(canvas, options = {}) {
			const context = canvas.getContext("2d");
			if (context === null) return {
				render() {},
				resize() {},
				dispose() {},
				setHover() {},
				jump() {},
				cycleMount() {},
				setMount() {},
				setEquip() {},
				hitTest() {}
			};
			const g = context;
			let model;
			let disposed = false;
			let raf;
			let width = WORLD_W;
			let height = WORLD_MIN_H;
			let worldH = WORLD_MIN_H;
			let dpr = 1;
			let scale = 1;
			let offsetX = 0;
			let offsetY = 0;
			let hitAreas = [];
			let hovered;
			const zoom = options.zoom ?? 1;
			const jumps = /* @__PURE__ */ new Map();
			const castWindow = /* @__PURE__ */ new Map();
			const castSeen = /* @__PURE__ */ new Map();
			let castSparks = [];
			let lastPaintAt = 0;
			function startCast(id, durationMs) {
				const start = nowMs();
				castWindow.set(id, {
					start,
					until: start + durationMs
				});
			}
			function spawnCastSparks(x, y) {
				for (let i = 0; i < 14; i += 1) {
					const angle = i / 14 * Math.PI * 2;
					castSparks.push({
						x,
						y,
						vx: Math.cos(angle) * (12 + i % 3 * 6),
						vy: Math.sin(angle) * 12 - 10,
						life: 520 + i % 4 * 90,
						color: i % 3 === 0 ? "#fff6d8" : "#f2c14e"
					});
				}
				if (castSparks.length > 120) castSparks = castSparks.slice(-120);
			}
			function stepCastSparks(deltaMs) {
				if (castSparks.length === 0) return;
				const keep = [];
				for (const spark of castSparks) {
					spark.life -= deltaMs;
					if (spark.life <= 0) continue;
					spark.x += spark.vx * (deltaMs / 1e3);
					spark.y += spark.vy * (deltaMs / 1e3);
					spark.vy += 26 * (deltaMs / 1e3);
					keep.push(spark);
				}
				castSparks = keep;
			}
			function drawCastSparks() {
				for (const spark of castSparks) {
					g.globalAlpha = Math.min(1, spark.life / 380);
					g.fillStyle = spark.color;
					g.fillRect(Math.round(spark.x), Math.round(spark.y), 2, 2);
				}
				g.globalAlpha = 1;
			}
			const mountOverride = /* @__PURE__ */ new Map();
			const mountVariant = /* @__PURE__ */ new Map();
			const weaponEquip = /* @__PURE__ */ new Map();
			const skillEquip = /* @__PURE__ */ new Map();
			const equipFlash = /* @__PURE__ */ new Map();
			const EQUIP_FLASH_MS = 1400;
			const nowMs = () => typeof performance === "undefined" ? Date.now() : performance.now();
			let cultivationFx = [];
			const lastXp = /* @__PURE__ */ new Map();
			const lastLevel = /* @__PURE__ */ new Map();
			function fit() {
				const ratio = Math.min(width / WORLD_W, height / worldH);
				scale = Math.max(.2, ratio) * zoom;
				offsetX = (width - WORLD_W * scale) / 2;
				offsetY = (height - worldH * scale) / 2;
			}
			/** 悬停/打开态：描金边，让墙面设施看起来可点。 */
			function paintFacilityHover(rect, hovered, active) {
				if (!hovered && !active) return;
				g.strokeStyle = active ? "rgba(212, 175, 55, 0.95)" : "rgba(255, 233, 168, 0.8)";
				g.lineWidth = active ? 1.4 : 1;
				roundRect(g, rect.x - 2, rect.y - 2, rect.w + 4, rect.h + 4, 5);
				g.stroke();
				if (hovered && !active) {
					g.fillStyle = "#d4af37";
					g.fillRect(rect.x - 3, rect.y - 3, 2, 2);
					g.fillRect(rect.x + rect.w + 1, rect.y - 3, 2, 2);
				}
			}
			/** 设施下的木牌标签：名字就是可点提示。 */
			function paintFacilityLabel(rect, label, hovered, active) {
				const text = `${truncate(label, 11)} ›`;
				g.font = hovered || active ? "bold 9px \"Segoe UI\", sans-serif" : "9px \"Segoe UI\", sans-serif";
				const width = Math.ceil(g.measureText(text).width) + 10;
				const x = Math.round(rect.x + rect.w / 2 - width / 2);
				const y = 79;
				g.fillStyle = active ? "rgba(212, 175, 55, 0.95)" : hovered ? "rgba(42, 52, 44, 0.96)" : "rgba(14, 18, 20, 0.7)";
				roundRect(g, x, y, width, 13, 3);
				g.fill();
				g.fillStyle = active ? "#241a08" : hovered ? "#ffe9a8" : "#e2ce92";
				g.fillText(text, x + 5, 89);
			}
			/** 配置入口：大水晶（2026-10-26 由「阵盘」改为水晶，更醒目）。 */
			function paintHallDial(cx, cy, time, hovered, active, label) {
				const bob = Math.sin(time / 1400) * 2.2;
				const pulse = .5 + .5 * Math.sin(time / 1100);
				g.save();
				g.translate(cx, cy + bob);
				g.fillStyle = "rgba(24, 40, 52, 0.35)";
				g.beginPath();
				g.ellipse(0, 20, 17, 6, 0, 0, Math.PI * 2);
				g.fill();
				const glow = g.createRadialGradient(0, 2, 3, 0, 2, 40);
				glow.addColorStop(0, `rgba(120, 210, 255, ${(.26 + pulse * .16).toFixed(3)})`);
				glow.addColorStop(.6, "rgba(96, 180, 255, 0.10)");
				glow.addColorStop(1, "rgba(96, 180, 255, 0)");
				g.fillStyle = glow;
				g.beginPath();
				g.ellipse(0, 6, 38, 22, 0, 0, Math.PI * 2);
				g.fill();
				const top = -34;
				const waist = -8;
				const bottom = 18;
				const bodyGrad = g.createLinearGradient(-12, top, 12, bottom);
				bodyGrad.addColorStop(0, active ? "#eaf7ff" : "#bfe8ff");
				bodyGrad.addColorStop(.45, active ? "#9fd6ff" : "#6fb6e0");
				bodyGrad.addColorStop(1, active ? "#7fbde8" : "#3f7f9c");
				g.fillStyle = bodyGrad;
				g.beginPath();
				g.moveTo(0, top);
				g.lineTo(11, waist - 6);
				g.lineTo(8, bottom - 2);
				g.lineTo(-8, bottom - 2);
				g.lineTo(-11, waist - 6);
				g.closePath();
				g.fill();
				g.strokeStyle = active ? "rgba(255, 255, 255, 0.85)" : "rgba(226, 246, 255, 0.62)";
				g.lineWidth = 1;
				g.beginPath();
				g.moveTo(0, top);
				g.lineTo(0, bottom - 2);
				g.moveTo(-11, waist - 6);
				g.lineTo(11, waist - 6);
				g.stroke();
				g.fillStyle = "rgba(255, 255, 255, 0.55)";
				g.beginPath();
				g.moveTo(-3, -27);
				g.lineTo(1, -25);
				g.lineTo(-1, waist - 3);
				g.lineTo(-5, waist - 6);
				g.closePath();
				g.fill();
				g.fillStyle = active ? "rgba(230, 248, 255, 0.9)" : "rgba(180, 228, 255, 0.75)";
				for (let i = 0; i < 3; i += 1) {
					const angle = time / 1500 + i / 3 * Math.PI * 2;
					const px = Math.cos(angle) * 21;
					const py = -12 + Math.sin(angle) * 8;
					g.fillRect(px - 1.5, py - 1.5, 3, 3);
				}
				g.restore();
				paintFloorObjectLabel(cx, cy + 24, label, hovered || active);
			}
			/** 中庭物件的小标签，和墙面设施标签同一风格。 */
			function paintFloorObjectLabel(cx, y, label, highlighted) {
				if (label === "") return;
				const text = `${truncate(label, 11)} ›`;
				g.font = highlighted ? "bold 9px \"Segoe UI\", sans-serif" : "9px \"Segoe UI\", sans-serif";
				const width = Math.ceil(g.measureText(text).width) + 10;
				const x = Math.round(cx - width / 2);
				g.fillStyle = highlighted ? "rgba(42, 52, 44, 0.96)" : "rgba(12, 16, 20, 0.62)";
				roundRect(g, x, Math.round(y), width, 13, 3);
				g.fill();
				g.fillStyle = highlighted ? "#ffe9a8" : "#e2ce92";
				g.fillText(text, x + 5, Math.round(y) + 10);
			}
			/** 藏经阁：道统、成员与计划。 */
			function paintLibrary(rect, hovered, active) {
				g.fillStyle = "#3a2718";
				roundRect(g, rect.x, rect.y, rect.w, rect.h, 3);
				g.fill();
				g.fillStyle = "#1b120b";
				g.fillRect(rect.x + 4, rect.y + 4, rect.w - 8, rect.h - 8);
				const books = [
					"#a34b3f",
					"#3f6aa3",
					"#a3873f",
					"#3f8a6a",
					"#7a3f8a"
				];
				for (let row = 0; row < 3; row += 1) {
					const shelfY = rect.y + 7 + row * 16;
					g.fillStyle = "#2c1d12";
					g.fillRect(rect.x + 5, shelfY + 12, rect.w - 10, 2);
					for (let i = 0; i < 10; i += 1) {
						g.fillStyle = books[(i + row * 2) % books.length];
						g.fillRect(rect.x + 7 + i * 8, shelfY + 1, 5, 11);
					}
				}
				g.fillStyle = "#d8c48a";
				g.fillRect(rect.x + rect.w - 20, rect.y - 3, 14, 3);
				g.fillStyle = "#8a1c1c";
				g.fillRect(rect.x + rect.w - 21, rect.y - 3, 2, 3);
				paintFacilityHover(rect, hovered, active);
			}
			/** 开宗入口：木构山门（保留原造型），门洞中央加入旋转传输。 */
			function paintGate(rect, name, hovered, active, time) {
				g.fillStyle = "#1f2a25";
				g.beginPath();
				g.moveTo(rect.x - 8, rect.y + 11);
				g.lineTo(rect.x + rect.w / 2, rect.y - 3);
				g.lineTo(rect.x + rect.w + 8, rect.y + 11);
				g.closePath();
				g.fill();
				g.fillStyle = "#3b2a1e";
				g.fillRect(rect.x - 3, rect.y + 11, rect.w + 6, 4);
				g.fillStyle = "#0d1512";
				g.fillRect(rect.x + 10, rect.y + 16, rect.w - 20, rect.h - 16);
				const glow = g.createLinearGradient(0, rect.y + rect.h - 8, 0, rect.y + 20);
				glow.addColorStop(0, "rgba(103, 217, 165, 0.26)");
				glow.addColorStop(1, "rgba(103, 217, 165, 0)");
				g.fillStyle = glow;
				g.fillRect(rect.x + 10, rect.y + 16, rect.w - 20, rect.h - 20);
				const cx = rect.x + rect.w / 2;
				const cy = rect.y + rect.h * .62;
				const pulse = .5 + .5 * Math.sin(time / 900);
				const doorX = rect.x + 10;
				const doorY = rect.y + 16;
				const doorW = rect.w - 20;
				const doorH = rect.h - 16;
				g.save();
				g.beginPath();
				g.rect(doorX, doorY, doorW, doorH);
				g.clip();
				const base = g.createRadialGradient(cx, cy, 1, cx, cy, Math.max(26, doorW * .34));
				base.addColorStop(0, `rgba(170, 255, 228, ${(.16 + pulse * .08).toFixed(3)})`);
				base.addColorStop(.45, "rgba(48, 128, 110, 0.16)");
				base.addColorStop(1, "rgba(4, 12, 10, 0.9)");
				g.fillStyle = base;
				g.fillRect(doorX, doorY, doorW, doorH);
				const membrane = g.createRadialGradient(cx, cy + 4, 2, cx, cy, Math.max(18, doorW * .2));
				membrane.addColorStop(0, `rgba(214, 255, 244, ${(.55 + pulse * .2).toFixed(3)})`);
				membrane.addColorStop(.35, "rgba(120, 236, 200, 0.35)");
				membrane.addColorStop(.75, "rgba(30, 90, 78, 0.22)");
				membrane.addColorStop(1, "rgba(8, 20, 18, 0)");
				g.fillStyle = membrane;
				g.beginPath();
				g.ellipse(cx, cy, Math.max(10, doorW * .13), Math.max(16, doorH * .42), 0, 0, Math.PI * 2);
				g.fill();
				for (let layer = 0; layer < 5; layer += 1) {
					const spin = (layer % 2 === 0 ? 1 : -1) * time / (900 + layer * 260) + layer * .7;
					const rx = doorW * (.1 + layer * .035);
					const ry = doorH * (.16 + layer * .055);
					g.strokeStyle = `rgba(150, 245, 214, ${(.24 - layer * .035 + pulse * .05).toFixed(3)})`;
					g.lineWidth = layer === 0 ? 1.6 : 1;
					g.beginPath();
					g.ellipse(cx, cy, rx, ry, spin, spin, spin + Math.PI * 1.25);
					g.stroke();
				}
				for (let i = 0; i < 18; i += 1) {
					const seed = hash("gate" + i) % 1e3 / 1e3;
					const life = (time / (1400 + seed * 900) + seed) % 1;
					const angle = life * Math.PI * 2.4 + seed * Math.PI * 2;
					const radius = (1 - life) * (doorW * .3) + 2;
					const px = cx + Math.cos(angle) * radius;
					const py = cy + Math.sin(angle) * radius * .85;
					const size = life > .82 ? 1 : life > .5 ? 2 : 3;
					g.fillStyle = `rgba(214, 255, 244, ${(.15 + (1 - life) * .65).toFixed(3)})`;
					g.fillRect(px - size / 2, py - size / 2, size, size);
				}
				const core = g.createRadialGradient(cx, cy, .5, cx, cy, 14);
				core.addColorStop(0, "rgba(255, 255, 255, 0.95)");
				core.addColorStop(.4, `rgba(200, 255, 236, ${(.5 + pulse * .25).toFixed(3)})`);
				core.addColorStop(1, "rgba(160, 255, 220, 0)");
				g.fillStyle = core;
				g.beginPath();
				g.ellipse(cx, cy, 10, 16, 0, 0, Math.PI * 2);
				g.fill();
				g.fillStyle = "rgba(255, 255, 255, 0.9)";
				g.fillRect(cx - 1, cy - 1, 2, 2);
				const inner = g.createLinearGradient(doorX, 0, doorX + doorW, 0);
				inner.addColorStop(0, "rgba(0, 0, 0, 0.55)");
				inner.addColorStop(.12, "rgba(0, 0, 0, 0)");
				inner.addColorStop(.88, "rgba(0, 0, 0, 0)");
				inner.addColorStop(1, "rgba(0, 0, 0, 0.55)");
				g.fillStyle = inner;
				g.fillRect(doorX, doorY, doorW, doorH);
				g.restore();
				g.fillStyle = "#6b3a2a";
				g.fillRect(rect.x + 2, rect.y + 15, 9, rect.h - 15);
				g.fillRect(rect.x + rect.w - 11, rect.y + 15, 9, rect.h - 15);
				g.fillStyle = "#8a4b34";
				g.fillRect(rect.x + 2, rect.y + 15, 2, rect.h - 15);
				g.fillRect(rect.x + rect.w - 11, rect.y + 15, 2, rect.h - 15);
				const pw = Math.min(96, rect.w - 24);
				const px = rect.x + Math.round((rect.w - pw) / 2);
				const py = rect.y + 19;
				g.fillStyle = "#6b4a2a";
				roundRect(g, px - 3, py - 3, pw + 6, 22, 3);
				g.fill();
				g.fillStyle = "#d4af37";
				roundRect(g, px, py, pw, 16, 2);
				g.fill();
				const label = truncate(name, 7);
				g.fillStyle = "#3a2410";
				g.font = "bold 9px \"Segoe UI\", sans-serif";
				g.fillText(label, px + (pw - g.measureText(label).width) / 2, py + 11);
				paintFacilityHover(rect, hovered, active);
			}
			function paintStele(rect, wall, hovered, active) {
				g.fillStyle = "#263630";
				roundRect(g, rect.x, rect.y, rect.w, rect.h, 4);
				g.fill();
				g.fillStyle = "#5a6b60";
				roundRect(g, rect.x + 4, rect.y + 4, rect.w - 8, rect.h - 8, 5);
				g.fill();
				g.fillStyle = "#1e2a24";
				roundRect(g, rect.x + 7, rect.y + 7, rect.w - 14, rect.h - 14, 3);
				g.fill();
				g.fillStyle = "#d4af37";
				g.font = "bold 8px \"Segoe UI\", sans-serif";
				const title = truncate(wall?.title ?? "", 6);
				if (title !== "") g.fillText(title, rect.x + (rect.w - g.measureText(title).width) / 2, rect.y + 18);
				const ratio = wall === void 0 || wall.total === 0 ? 0 : Math.min(1, wall.doneCount / wall.total);
				g.fillStyle = "rgba(255, 255, 255, 0.18)";
				g.fillRect(rect.x + 12, rect.y + 22, rect.w - 24, 5);
				g.fillStyle = "#67d9a5";
				g.fillRect(rect.x + 12, rect.y + 22, Math.round((rect.w - 24) * ratio), 5);
				g.fillStyle = "#e8eef8";
				g.font = "bold 13px \"Segoe UI\", sans-serif";
				const count = `${wall?.doneCount ?? 0}/${wall?.total ?? 0}`;
				g.fillText(count, rect.x + (rect.w - g.measureText(count).width) / 2, rect.y + 45);
				const dots = [
					[wall?.runningCount ?? 0, "#5b8def"],
					[wall?.waitingCount ?? 0, "#e0a94a"],
					[wall?.failedCount ?? 0, "#ef6b6b"]
				];
				let dx = rect.x + 12;
				g.font = "7px \"Segoe UI\", sans-serif";
				for (const [value, tone] of dots) {
					g.fillStyle = tone;
					g.fillRect(dx, rect.y + 51, 4, 4);
					g.fillStyle = "#c9d5e3";
					g.fillText(String(value), dx + 6, rect.y + 55);
					dx += 20;
				}
				paintFacilityHover(rect, hovered, active);
			}
			/** 封神榜：墙上的一方金榜，刻着本宗留名，点开榜页面。 */
			function paintRanks(rect, hovered, active) {
				g.fillStyle = "#2a2418";
				roundRect(g, rect.x, rect.y, rect.w, rect.h, 4);
				g.fill();
				g.fillStyle = "#6b5732";
				roundRect(g, rect.x + 3, rect.y + 3, rect.w - 6, rect.h - 6, 4);
				g.fill();
				g.fillStyle = "#16120c";
				roundRect(g, rect.x + 6, rect.y + 6, rect.w - 12, rect.h - 12, 2);
				g.fill();
				g.strokeStyle = "#d4af37";
				g.lineWidth = 1;
				g.strokeRect(rect.x + 7.5, rect.y + 7.5, rect.w - 15, rect.h - 15);
				g.fillStyle = "#e8c46a";
				for (let row = 0; row < 5; row += 1) {
					g.fillRect(rect.x + 13, rect.y + 15 + row * 6, 15 - row % 2 * 4, 1);
					g.fillRect(rect.x + 36, rect.y + 15 + row * 6, 17 - row % 3 * 3, 1);
				}
				g.fillStyle = "#b83a3a";
				g.fillRect(rect.x + rect.w - 20, rect.y + rect.h - 20, 10, 10);
				g.fillStyle = "#f2c14e";
				g.fillRect(rect.x + rect.w - 18, rect.y + rect.h - 18, 6, 1);
				g.fillRect(rect.x + rect.w - 16, rect.y + rect.h - 16, 1, 4);
				if (active || hovered) {
					g.globalAlpha = active ? .26 : .14;
					g.fillStyle = "#f2c14e";
					g.beginPath();
					g.ellipse(rect.x + rect.w / 2, rect.y + rect.h / 2, rect.w / 2, rect.h / 2, 0, 0, Math.PI * 2);
					g.fill();
					g.globalAlpha = 1;
				}
				paintFacilityHover(rect, hovered, active);
			}
			/** 天机阁：法器/坐骑/技能的陈列柜，点开装备页。 */
			function paintGear(rect, hovered, active) {
				g.fillStyle = "#263630";
				roundRect(g, rect.x, rect.y, rect.w, rect.h, 4);
				g.fill();
				g.fillStyle = "#4f5f55";
				roundRect(g, rect.x + 4, rect.y + 4, rect.w - 8, rect.h - 8, 5);
				g.fill();
				g.fillStyle = "#1e2a24";
				roundRect(g, rect.x + 7, rect.y + 7, rect.w - 14, rect.h - 14, 3);
				g.fill();
				g.fillStyle = "#7a6a4a";
				g.fillRect(rect.x + 10, rect.y + 22, rect.w - 20, 2);
				g.fillRect(rect.x + 10, rect.y + 38, rect.w - 20, 2);
				g.fillStyle = "#8fe3ff";
				g.fillRect(rect.x + 14, rect.y + 14, 5, 7);
				g.fillRect(rect.x + 24, rect.y + 15, 4, 6);
				g.fillStyle = "#f2c14e";
				g.fillRect(rect.x + rect.w - 22, rect.y + 15, 5, 6);
				const cx = rect.x + rect.w / 2;
				const cy = rect.y + 31;
				const glow = g.createRadialGradient(cx, cy, 1, cx, cy, 13);
				glow.addColorStop(0, "rgba(143, 227, 255, 0.9)");
				glow.addColorStop(.6, "rgba(143, 227, 255, 0.25)");
				glow.addColorStop(1, "rgba(143, 227, 255, 0)");
				g.fillStyle = glow;
				g.beginPath();
				g.arc(cx, cy, 13, 0, Math.PI * 2);
				g.fill();
				g.fillStyle = "#e8fbff";
				g.beginPath();
				g.arc(cx, cy, 4, 0, Math.PI * 2);
				g.fill();
				paintFacilityHover(rect, hovered, active);
			}
			/** 宗门志：墙最右侧的一方石志（打开赞助/交流群/关于/反馈）。 */
			function paintAbout(rect, hovered, active) {
				g.fillStyle = "#3b3326";
				roundRect(g, rect.x, rect.y, rect.w, rect.h, 4);
				g.fill();
				g.fillStyle = "#6d5b3d";
				roundRect(g, rect.x + 3, rect.y + 3, rect.w - 6, rect.h - 6, 4);
				g.fill();
				g.fillStyle = "#e7dab4";
				roundRect(g, rect.x + 7, rect.y + 8, rect.w - 14, rect.h - 16, 2);
				g.fill();
				g.fillStyle = "#f6edd2";
				g.fillRect(rect.x + 9, rect.y + 10, rect.w - 18, rect.h - 20);
				g.fillStyle = "#5a4a32";
				for (let row = 0; row < 5; row += 1) {
					g.fillRect(rect.x + 13, rect.y + 14 + row * 6, 20 - row % 2 * 5, 1);
					g.fillRect(rect.x + 37, rect.y + 14 + row * 6, 7, 1);
				}
				g.fillStyle = "#b83a3a";
				g.fillRect(rect.x + rect.w - 17, rect.y + rect.h - 17, 8, 8);
				g.fillStyle = "#f2c14e";
				g.fillRect(rect.x + rect.w - 15, rect.y + rect.h - 15, 4, 1);
				g.strokeStyle = "#8a6a3a";
				g.lineWidth = 1;
				g.beginPath();
				g.moveTo(rect.x + rect.w / 2 - 8, rect.y + 2);
				g.lineTo(rect.x + rect.w / 2, rect.y + 8);
				g.lineTo(rect.x + rect.w / 2 + 8, rect.y + 2);
				g.stroke();
				if (active || hovered) {
					g.globalAlpha = active ? .24 : .13;
					g.fillStyle = "#f2e6c4";
					g.beginPath();
					g.ellipse(rect.x + rect.w / 2, rect.y + rect.h / 2, rect.w / 2, rect.h / 2, 0, 0, Math.PI * 2);
					g.fill();
					g.globalAlpha = 1;
				}
				paintFacilityHover(rect, hovered, active);
			}
			/** 中庭飘浮的灵气尘：纯氛围，让大块地面不显得空。 */
			function paintQiMotes(time) {
				const floorH = worldH - 96;
				if (floorH < 260) return;
				for (let i = 0; i < 12; i += 1) {
					const phase = (time / 9e3 + i / 12) % 1;
					const x = 24 + i * 137 % (WORLD_W - 48) + Math.sin(time / 3200 + i * 1.7) * 14;
					const y = 136 + (1 - phase) * (floorH - 60);
					const alpha = .16 * Math.sin(phase * Math.PI);
					if (alpha <= .01) continue;
					g.fillStyle = `rgba(236, 220, 160, ${alpha.toFixed(3)})`;
					g.fillRect(Math.round(x), Math.round(y), 1.5, 1.5);
				}
			}
			/** 地面聚灵阵：给高房间的空地面一点内容，纯装饰、不可点。 */
			function paintFloorFormation(time) {
				const floorH = worldH - 96;
				if (floorH < 220) return;
				const cx = WORLD_W / 2;
				const cy = 96 + floorH * .56;
				const radius = Math.min(WORLD_W * .44, floorH * .46);
				const pulse = .55 + Math.abs(Math.sin(time / 2600)) * .45;
				g.lineWidth = 1;
				g.strokeStyle = `rgba(122, 102, 58, ${(.24 * pulse).toFixed(3)})`;
				for (const ratio of [
					1,
					.66,
					.34
				]) {
					g.beginPath();
					g.arc(cx, cy, radius * ratio, 0, Math.PI * 2);
					g.stroke();
				}
				for (let i = 0; i < 8; i += 1) {
					const angle = i / 8 * Math.PI * 2;
					g.beginPath();
					g.moveTo(cx + Math.cos(angle) * radius * .36, cy + Math.sin(angle) * radius * .36);
					g.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
					g.stroke();
				}
				g.strokeStyle = `rgba(103, 217, 165, ${(.1 * pulse).toFixed(3)})`;
				for (let i = 0; i < 16; i += 1) {
					const angle = i / 16 * Math.PI * 2;
					g.beginPath();
					g.moveTo(cx + Math.cos(angle) * radius * .86, cy + Math.sin(angle) * radius * .86);
					g.lineTo(cx + Math.cos(angle) * radius * .94, cy + Math.sin(angle) * radius * .94);
					g.stroke();
				}
				g.fillStyle = `rgba(103, 217, 165, ${(.2 * pulse).toFixed(3)})`;
				g.fillRect(cx - 3, cy - 3, 6, 6);
				g.fillStyle = "rgba(150, 126, 70, 0.3)";
				for (let i = 0; i < 4; i += 1) {
					const angle = Math.PI / 4 + i / 4 * Math.PI * 2;
					g.fillRect(cx + Math.cos(angle) * radius * .66 - 2, cy + Math.sin(angle) * radius * .66 - 2, 4, 4);
				}
			}
			/** 庭院摆了石灯与香炉，让高面板下方的空地像宗门中庭而不是留白。 */
			function paintYardProps(time, lastDeskY) {
				const floorH = worldH - 96;
				if (floorH < 520) return;
				const base = worldH - 24;
				paintStoneLantern(26, base, time);
				paintStoneLantern(WORLD_W - 26, base, time);
				if (floorH >= 760 && lastDeskY + 60 < worldH - 227) paintCenser(WORLD_W / 2 - 150, worldH - 150, time);
				else paintCenser(WORLD_W / 2, base, time);
			}
			/** 中庭莲池：给高面板的底部一块真实景物，纯装饰。 */
			function paintPond(time, lastDeskY) {
				if (worldH - 96 < 760 || lastDeskY + 60 >= worldH - 227) return;
				const cx = WORLD_W / 2;
				const cy = worldH - 145;
				const rx = 122;
				const ry = 72;
				g.fillStyle = "#8a8574";
				g.beginPath();
				g.ellipse(cx, cy, 132, 82, 0, 0, Math.PI * 2);
				g.fill();
				g.fillStyle = "#5f5b4e";
				g.beginPath();
				g.ellipse(cx, cy, 126, 76, 0, 0, Math.PI * 2);
				g.fill();
				const water = g.createLinearGradient(0, cy - ry, 0, cy + ry);
				water.addColorStop(0, "#3f727a");
				water.addColorStop(.55, "#2f5d68");
				water.addColorStop(1, "#22444f");
				g.fillStyle = water;
				g.beginPath();
				g.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
				g.fill();
				for (let i = 0; i < 3; i += 1) {
					const phase = (time / 4200 + i / 3) % 1;
					g.strokeStyle = `rgba(180, 226, 224, ${(.16 * (1 - phase)).toFixed(3)})`;
					g.lineWidth = 1;
					g.beginPath();
					g.ellipse(cx, cy + 8, 24 + phase * 80, 12 + phase * 36, 0, 0, Math.PI * 2);
					g.stroke();
				}
				for (const [dx, dy, size] of [
					[
						-70,
						-18,
						16
					],
					[
						-28,
						20,
						13
					],
					[
						34,
						-24,
						15
					],
					[
						72,
						12,
						12
					],
					[
						8,
						34,
						11
					]
				]) {
					g.fillStyle = "#3f7d4e";
					g.beginPath();
					g.ellipse(cx + dx, cy + dy, size, size * .62, 0, 0, Math.PI * 2);
					g.fill();
					g.fillStyle = "#599f61";
					g.beginPath();
					g.ellipse(cx + dx - 2, cy + dy - 2, size * .7, size * .42, 0, 0, Math.PI * 2);
					g.fill();
				}
				const flowerBob = Math.round(Math.sin(time / 1500) * 1);
				g.fillStyle = "#e8a0b4";
				for (const [dx, dy] of [[-28, 12], [40, -28]]) {
					g.fillRect(cx + dx - 2, cy + dy - 6 + flowerBob, 4, 4);
					g.fillStyle = "#f4c6d4";
					g.fillRect(cx + dx - 1, cy + dy - 7 + flowerBob, 2, 2);
					g.fillStyle = "#e8a0b4";
				}
				for (let i = 0; i < 2; i += 1) {
					const angle = time / (3200 + i * 900) + i * Math.PI;
					const kx = cx + Math.cos(angle) * (58 + i * 16);
					const ky = cy + Math.sin(angle * 1.3) * 26;
					g.fillStyle = i === 0 ? "#e08a4a" : "#e6d2a8";
					g.fillRect(Math.round(kx), Math.round(ky), 5, 2);
					g.fillStyle = "rgba(255, 255, 255, 0.55)";
					g.fillRect(Math.round(kx) + 3, Math.round(ky), 2, 1);
					g.fillStyle = "rgba(224, 138, 74, 0.5)";
					g.fillRect(Math.round(kx) - 2, Math.round(ky) - 1, 2, 4);
				}
				g.fillStyle = "#6b6656";
				for (const [dx, dy, w, h] of [
					[
						-126,
						22,
						10,
						5
					],
					[
						rx - 2,
						-20,
						9,
						5
					],
					[
						-40,
						74,
						12,
						4
					],
					[
						66,
						ry,
						8,
						4
					]
				]) g.fillRect(cx + dx, cy + dy, w, h);
				g.strokeStyle = "#4f7d4e";
				g.lineWidth = 1;
				for (let i = 0; i < 4; i += 1) {
					const bx = 156 + i * 9;
					g.beginPath();
					g.moveTo(bx, cy + ry - 2);
					g.lineTo(bx + Math.sin(time / 2200 + i) * 2, cy + ry - 16 - i % 2 * 4);
					g.stroke();
				}
			}
			function paintStoneLantern(cx, baseY, time) {
				g.fillStyle = "#3b3a32";
				g.fillRect(cx - 8, baseY - 2, 16, 3);
				g.fillStyle = "#5c5a4d";
				g.fillRect(cx - 3, baseY - 22, 6, 20);
				g.fillStyle = "#7a7666";
				g.fillRect(cx - 8, baseY - 26, 16, 4);
				g.fillStyle = "#3b3a32";
				g.fillRect(cx - 5, baseY - 36, 10, 10);
				const pulse = .6 + Math.abs(Math.sin(time / 700 + cx)) * .4;
				g.fillStyle = `rgba(240, 190, 90, ${(.55 * pulse).toFixed(3)})`;
				g.fillRect(cx - 2, baseY - 33, 4, 4);
				g.fillStyle = "#8a8574";
				g.fillRect(cx - 7, baseY - 39, 14, 3);
			}
			function paintCenser(cx, baseY, time) {
				g.fillStyle = "#5b4630";
				g.fillRect(cx - 12, baseY - 18, 24, 12);
				g.fillStyle = "#7a5b3a";
				g.fillRect(cx - 14, baseY - 22, 28, 5);
				g.fillStyle = "#a67c4f";
				g.fillRect(cx - 14, baseY - 22, 28, 2);
				g.fillStyle = "#3a2a1a";
				g.fillRect(cx - 10, baseY - 6, 4, 6);
				g.fillRect(cx + 6, baseY - 6, 4, 6);
				g.fillRect(cx - 2, baseY - 7, 4, 7);
				for (let i = 0; i < 3; i += 1) {
					const phase = (time / 1800 + i / 3) % 1;
					g.fillStyle = `rgba(150, 200, 170, ${(.22 * (1 - phase)).toFixed(3)})`;
					const sx = cx - 8 + i * 8 + Math.round(Math.sin(time / 600 + i) * 2);
					g.fillRect(sx, Math.round(baseY - 26 - phase * 30), 2, 2);
				}
				const pulse = .55 + Math.abs(Math.sin(time / 900)) * .45;
				g.fillStyle = `rgba(224, 169, 74, ${(.55 * pulse).toFixed(3)})`;
				g.fillRect(cx - 3, baseY - 19, 6, 2);
			}
			/** 木板墙：梁、灯、四件可点设施，以及下方的工位地面。 */
			function paintRoom(time, wall, hovered, lastDeskY) {
				g.fillStyle = COLORS.wall;
				g.fillRect(0, 0, WORLD_W, 96);
				g.fillStyle = "rgba(255, 255, 255, 0.03)";
				for (let x = 0; x < WORLD_W; x += 64) g.fillRect(x, 0, 1, 82);
				g.fillStyle = COLORS.wallShade;
				g.fillRect(0, 82, WORLD_W, 14);
				g.fillStyle = "#1d2723";
				g.fillRect(0, 0, WORLD_W, 4);
				g.fillStyle = COLORS.floor;
				g.fillRect(0, 96, WORLD_W, worldH - 96);
				g.strokeStyle = COLORS.floorLine;
				g.lineWidth = 1;
				for (let x = 0; x < WORLD_W; x += 32) {
					g.beginPath();
					g.moveTo(x, 96);
					g.lineTo(x, worldH);
					g.stroke();
				}
				for (let y = 120; y < worldH; y += 32) {
					g.beginPath();
					g.moveTo(0, y);
					g.lineTo(WORLD_W, y);
					g.stroke();
				}
				paintFloorFormation(time);
				paintQiMotes(time);
				for (const lx of [124]) {
					const swing = Math.sin(time / 720 + lx) * 2;
					g.fillStyle = "#3a2a1a";
					g.fillRect(lx - 1, 5, 2, 9);
					g.fillStyle = "#8a1c1c";
					g.beginPath();
					g.ellipse(lx + swing, 25, 7, 10, 0, 0, Math.PI * 2);
					g.fill();
					g.fillStyle = "#d4af37";
					g.fillRect(lx + swing - 7, 23, 14, 2);
					g.fillRect(lx + swing - 1, 35, 2, 4);
				}
				paintYardProps(time, lastDeskY);
				const facilityIndex = /* @__PURE__ */ new Map();
				for (const facility of model?.facilities ?? []) facilityIndex.set(facility.action, facility);
				const hoverAction = hovered?.kind === "action" ? hovered.action : void 0;
				const active = model?.activeAction;
				paintLibrary(FACILITIES.config, hoverAction === "config", active === "config");
				paintGate(FACILITIES.teams, model?.teamName ?? "", hoverAction === "teams", active === "teams", time);
				paintStele(FACILITIES.board, wall, hoverAction === "board", active === "board");
				paintRanks(FACILITIES.ranks, hoverAction === "ranks", active === "ranks");
				paintGear(FACILITIES.gear, hoverAction === "gear", active === "gear");
				paintAbout(FACILITIES.about, hoverAction === "about", active === "about");
				for (const action of FACILITY_ORDER) {
					const facility = facilityIndex.get(action);
					if (facility === void 0) continue;
					paintFacilityLabel(FACILITIES[action], facility.label, hoverAction === action, active === action);
				}
			}
			/** 境界：按任务完成度映射五境（与 realm.ts 一致），剑修的光剑随境界增强。 */
			function realmIndex(progress) {
				return Math.min(4, Math.floor(Math.max(0, Math.min(100, progress ?? 0)) / 20));
			}
			/** 本命法器：摆在矮案上方，与道途立绘一致。 */
			function paintWeapon(visual, cx, deskY, realm, working, time) {
				const base = deskY - 22;
				const accent = visual.accent;
				const trim = visual.trim;
				if (realm >= 2) {
					const radius = 18 + realm * 5;
					const halo = g.createRadialGradient(cx, base - 16, 2, cx, base - 16, radius);
					halo.addColorStop(0, rgba(accent, .2 + realm * .05));
					halo.addColorStop(.6, rgba(accent, .08 + realm * .02));
					halo.addColorStop(1, rgba(accent, 0));
					g.fillStyle = halo;
					g.beginPath();
					g.arc(cx, base - 16, radius, 0, Math.PI * 2);
					g.fill();
					g.save();
					g.shadowColor = rgba(accent, .9);
					g.shadowBlur = 4 + realm * 2;
					g.fillStyle = rgba(accent, .55);
					g.fillRect(cx - 1, base - 24, 2, 2);
					g.restore();
				}
				if (realm >= 3) {
					g.fillStyle = rgba(accent, .9);
					for (let i = 0; i < 3; i += 1) {
						const angle = time / 900 + i * 2.1;
						g.fillRect(cx + Math.cos(angle) * 16 - 1, base - 16 + Math.sin(angle) * 9 - 1, 2, 2);
					}
				}
				switch (visual.weapon) {
					case "sword": {
						g.fillStyle = "#6b4a2a";
						g.fillRect(cx - 22, base - 16, 3, 16);
						g.fillRect(cx + 19, base - 16, 3, 16);
						g.fillStyle = "#8a6a3a";
						g.fillRect(cx - 22, base - 18, 44, 2);
						const length = 17 + realm * 2;
						const pulse = working ? .82 + Math.sin(time / 90) * .18 : .66;
						g.save();
						g.shadowColor = "rgba(126, 232, 255, " + pulse.toFixed(2) + ")";
						g.shadowBlur = 6 + realm * 4;
						g.strokeStyle = "rgba(150, 240, 255, " + pulse.toFixed(2) + ")";
						g.lineWidth = 5;
						g.lineCap = "round";
						g.beginPath();
						g.moveTo(cx - length, base - 15);
						g.lineTo(cx + length, base - 15);
						g.stroke();
						g.strokeStyle = "#ffffff";
						g.lineWidth = 2;
						g.beginPath();
						g.moveTo(cx - length + 2, base - 15);
						g.lineTo(cx + length - 2, base - 15);
						g.stroke();
						g.restore();
						g.fillStyle = "#333a46";
						g.fillRect(cx - length - 10, base - 18, 10, 6);
						g.fillStyle = "#d4af37";
						g.fillRect(cx - length - 2, base - 19, 2, 8);
						if (working) {
							g.fillStyle = "rgba(180, 245, 255, 0.95)";
							g.fillRect(cx + length + 2, base - 18 - Math.round(Math.sin(time / 140) * 2), 2, 2);
							g.fillRect(cx - length - 4, base - 12 - Math.round(Math.cos(time / 170) * 2), 2, 2);
						}
						break;
					}
					case "fan":
						g.fillStyle = "#8a5a3a";
						g.fillRect(cx - 2, base - 8, 3, 12);
						g.fillStyle = accent;
						g.fillRect(cx - 12, base - 23, 20, 3);
						g.fillRect(cx - 14, base - 20, 24, 3);
						g.fillRect(cx - 12, base - 17, 20, 3);
						g.fillStyle = trim;
						g.fillRect(cx - 14, base - 20, 24, 1);
						break;
					case "pill":
						g.fillStyle = accent;
						g.fillRect(cx - 8, base - 18, 16, 12);
						g.fillStyle = trim;
						g.fillRect(cx - 3, base - 22, 6, 4);
						g.fillStyle = "#ffffff";
						g.fillRect(cx - 5, base - 16, 3, 6);
						if (working) {
							g.fillStyle = "rgba(230, 217, 255, 0.85)";
							g.fillRect(cx + 10, base - 26 - Math.round(Math.sin(time / 300) * 2), 2, 2);
						}
						break;
					case "scroll":
						g.fillStyle = accent;
						g.fillRect(cx - 14, base - 18, 28, 10);
						g.fillStyle = "#8a6a3a";
						g.fillRect(cx - 16, base - 20, 3, 14);
						g.fillRect(cx + 13, base - 20, 3, 14);
						g.fillStyle = "#8a1c1c";
						g.fillRect(cx - 2, base - 18, 4, 2);
						break;
					case "gourd":
						g.fillStyle = accent;
						g.beginPath();
						g.ellipse(cx, base - 8, 9, 7, 0, 0, Math.PI * 2);
						g.fill();
						g.beginPath();
						g.ellipse(cx, base - 19, 5, 5, 0, 0, Math.PI * 2);
						g.fill();
						g.fillStyle = trim;
						g.fillRect(cx - 3, base - 24, 6, 2);
						break;
					case "compass":
						g.fillStyle = "#2f4a4a";
						g.beginPath();
						g.arc(cx, base - 12, 10, 0, Math.PI * 2);
						g.fill();
						g.fillStyle = trim;
						g.beginPath();
						g.arc(cx, base - 12, 6, 0, Math.PI * 2);
						g.fill();
						g.fillStyle = "#d4af37";
						g.fillRect(cx - 1, base - 18, 2, 8);
						break;
					case "brush":
						g.fillStyle = "#4a3a2a";
						g.fillRect(cx - 8, base - 10, 16, 10);
						g.fillStyle = "#8a5a3a";
						g.fillRect(cx - 1, base - 26, 2, 18);
						g.fillStyle = accent;
						g.fillRect(cx - 2, base - 30, 4, 5);
						break;
					case "lantern":
						g.fillStyle = trim;
						g.fillRect(cx - 1, base - 30, 2, 6);
						g.fillStyle = accent;
						g.fillRect(cx - 7, base - 24, 14, 12);
						g.fillStyle = "rgba(255, 242, 196, 0.95)";
						g.fillRect(cx - 5, base - 22, 10, 8);
						if (working) {
							g.fillStyle = "rgba(255, 220, 140, 0.22)";
							g.beginPath();
							g.arc(cx, base - 18, 12, 0, Math.PI * 2);
							g.fill();
						}
						break;
					case "array":
						g.fillStyle = "#1f3a3a";
						g.fillRect(cx - 12, base - 20, 24, 14);
						g.fillStyle = accent;
						for (const dot of [
							[-8, -16],
							[0, -16],
							[8, -16],
							[-4, -11],
							[4, -11]
						]) g.fillRect(cx + dot[0] - 1, base + dot[1] - 1, 2, 2);
						break;
					case "fist":
						g.fillStyle = accent;
						g.fillRect(cx - 10, base - 12, 9, 8);
						g.fillRect(cx + 2, base - 12, 9, 8);
						g.fillStyle = trim;
						g.fillRect(cx - 10, base - 12, 9, 2);
						g.fillRect(cx + 2, base - 12, 9, 2);
						break;
					case "book":
						g.fillStyle = accent;
						g.fillRect(cx - 12, base - 10, 24, 5);
						g.fillStyle = trim;
						g.fillRect(cx - 10, base - 16, 22, 5);
						g.fillStyle = "#8a6a3a";
						g.fillRect(cx - 12, base - 10, 2, 5);
						break;
					case "hammer":
						g.fillStyle = "#8a5a3a";
						g.fillRect(cx - 1, base - 18, 3, 18);
						g.fillStyle = accent;
						g.fillRect(cx - 9, base - 24, 18, 8);
						g.fillStyle = trim;
						g.fillRect(cx - 9, base - 24, 18, 2);
						break;
					case "crown":
						g.fillStyle = "#6b4a2a";
						g.fillRect(cx - 16, base - 30, 2, 30);
						g.fillStyle = "#d4af37";
						g.fillRect(cx - 17, base - 31, 4, 3);
						g.fillStyle = accent;
						g.fillRect(cx - 14, base - 29, 16, 9);
						g.fillStyle = "#8a1c1c";
						g.fillRect(cx - 14, base - 25, 16, 2);
						g.fillStyle = "#1b1510";
						g.fillRect(cx - 8, base - 27, 4, 4);
						break;
					case "talisman":
						g.fillStyle = "#f2e6c4";
						g.fillRect(cx - 6, base - 30, 12, 18);
						g.fillStyle = "#fff6dd";
						g.fillRect(cx - 5, base - 29, 10, 16);
						g.fillStyle = trim;
						g.fillRect(cx - 5, base - 26, 10, 1);
						g.fillRect(cx - 5, base - 23, 6, 1);
						g.fillStyle = "#c23a3a";
						g.fillRect(cx - 3, base - 20, 6, 5);
						g.fillStyle = "#f2d97a";
						g.fillRect(cx - 1, base - 18, 2, 1);
						break;
					case "needle":
						g.fillStyle = "#dfe9f2";
						g.fillRect(cx - 7, base - 30, 1, 16);
						g.fillRect(cx - 1, base - 28, 1, 14);
						g.fillRect(cx + 5, base - 30, 1, 16);
						g.fillStyle = "#ffffff";
						g.fillRect(cx - 7, base - 30, 1, 2);
						g.fillRect(cx + 5, base - 30, 1, 2);
						g.fillStyle = trim;
						g.fillRect(cx - 6, base - 14, 12, 4);
						g.fillStyle = accent;
						g.fillRect(cx - 2, base - 13, 4, 2);
						break;
					case "whistle":
						g.fillStyle = accent;
						g.fillRect(cx - 9, base - 20, 12, 7);
						g.fillStyle = "#ffffff";
						g.fillRect(cx - 9, base - 20, 12, 1);
						g.fillStyle = trim;
						g.fillRect(cx - 12, base - 22, 3, 11);
						g.fillRect(cx + 5, base - 18, 2, 5);
						g.fillStyle = visual.robeDark;
						g.fillRect(cx - 5, base - 18, 2, 2);
						g.fillRect(cx - 1, base - 18, 2, 2);
						break;
					case "puppet":
						g.fillStyle = "#d8d2c8";
						g.fillRect(cx - 3, base - 34, 1, 9);
						g.fillRect(cx + 2, base - 34, 1, 9);
						g.fillStyle = accent;
						g.fillRect(cx - 4, base - 25, 8, 7);
						g.fillStyle = visual.robeDark;
						g.fillRect(cx - 2, base - 23, 1, 1);
						g.fillRect(cx + 1, base - 23, 1, 1);
						g.fillStyle = visual.robeLight;
						g.fillRect(cx - 5, base - 17, 10, 7);
						g.fillStyle = accent;
						g.fillRect(cx - 5, base - 10, 3, 3);
						g.fillRect(cx + 2, base - 10, 3, 3);
						break;
					case "flute":
						g.fillStyle = "#8a6a3a";
						g.fillRect(cx - 14, base - 22, 28, 4);
						g.fillStyle = "#b07a52";
						g.fillRect(cx - 14, base - 22, 28, 1);
						g.fillStyle = trim;
						g.fillRect(cx - 16, base - 23, 2, 6);
						g.fillRect(cx + 14, base - 23, 2, 6);
						g.fillStyle = visual.robeDark;
						g.fillRect(cx - 8, base - 21, 2, 2);
						g.fillRect(cx - 1, base - 21, 2, 2);
						g.fillRect(cx + 6, base - 21, 2, 2);
						break;
					case "vial":
						g.fillStyle = accent;
						g.fillRect(cx - 7, base - 20, 14, 10);
						g.fillStyle = "#ffffff";
						g.fillRect(cx - 7, base - 20, 14, 1);
						g.fillStyle = trim;
						g.fillRect(cx - 3, base - 25, 6, 5);
						g.fillStyle = visual.robeDark;
						g.fillRect(cx - 4, base - 17, 2, 2);
						if (working) {
							g.fillStyle = "rgba(212, 255, 154, 0.85)";
							g.fillRect(cx + 9, base - 26 - Math.round(Math.sin(time / 280) * 2), 2, 2);
						}
						break;
					case "beads":
						g.fillStyle = accent;
						for (let i = 0; i < 8; i += 1) {
							const angle = i / 8 * Math.PI * 2;
							g.fillRect(cx + Math.round(Math.cos(angle) * 9) - 1, base - 18 + Math.round(Math.sin(angle) * 7) - 1, 3, 3);
						}
						g.fillStyle = trim;
						g.fillRect(cx - 1, base - 10, 2, 6);
						break;
					case "blade":
						if (realm >= 2) {
							g.save();
							g.strokeStyle = "rgba(95, 208, 168, 0.55)";
							g.lineWidth = 1.5;
							g.beginPath();
							g.ellipse(cx + 2, deskY - 10, 16 + realm * 2, 5, 0, 0, Math.PI * 2);
							g.stroke();
							g.strokeStyle = "rgba(95, 208, 168, 0.25)";
							g.beginPath();
							g.ellipse(cx + 2, deskY - 10, 11 + realm * 2, 3.5, 0, 0, Math.PI * 2);
							g.stroke();
							g.restore();
						}
						g.save();
						g.shadowColor = "rgba(255, 79, 176, 0.9)";
						g.shadowBlur = 7 + realm * 3;
						g.fillStyle = "#4a1f9a";
						g.fillRect(cx + 2, base - 54, 9, 11);
						g.fillRect(cx + 1, base - 43, 9, 9);
						g.fillRect(cx, base - 34, 8, 8);
						g.fillRect(cx - 1, base - 26, 6, 6);
						g.fillStyle = "#ff4fb0";
						g.fillRect(cx + 10, base - 54, 2, 11);
						g.fillRect(cx + 9, base - 43, 2, 9);
						g.fillRect(cx + 7, base - 34, 2, 8);
						g.fillRect(cx + 4, base - 26, 2, 6);
						g.restore();
						g.fillStyle = "#ffd27a";
						g.fillRect(cx + 5, base - 49, 2, 2);
						g.fillRect(cx + 6, base - 39, 2, 2);
						g.fillRect(cx + 4, base - 30, 2, 2);
						g.fillStyle = "#f2c14e";
						g.fillRect(cx - 9, base - 20, 15, 3);
						g.fillStyle = "#ffe9a8";
						g.fillRect(cx - 9, base - 20, 15, 1);
						g.fillStyle = "#2a1a2a";
						g.fillRect(cx - 4, base - 17, 4, 10);
						g.fillStyle = "#7a3f52";
						g.fillRect(cx - 3, base - 17, 1, 10);
						g.fillStyle = "#c23a3a";
						g.fillRect(cx - 5, base - 7, 6, 4);
						g.fillStyle = "#ff9aa8";
						g.fillRect(cx - 4, base - 6, 2, 2);
						if (working) {
							g.fillStyle = "rgba(255, 79, 176, 0.95)";
							g.fillRect(cx + 12, base - 58 - Math.round(Math.sin(time / 160) * 3), 2, 2);
							g.fillRect(cx + 2, base - 62 - Math.round(Math.cos(time / 200) * 2), 2, 2);
						}
						break;
					default: break;
				}
			}
			/** mini 修士：整幅美术按 CHARACTER_SCALE 缩小，鞋底仍钉在 baseY。 */
			function paintCharacter(cx, baseY, member, time, walking = false) {
				const roleKey = member.isLeader === true ? "captain" : member.role.trim().toLowerCase();
				const frames = characterFrames(roleKey, roleVisual(roleKey), member.isLeader === true);
				const form = travelForm(member);
				const sitting = !walking && form === "walk";
				const key = member.id || member.name;
				const window = castWindow.get(key);
				const casting = window !== void 0 && window.until > time;
				if (casting && castSeen.get(key) !== true) {
					castSeen.set(key, true);
					spawnCastSparks(cx, baseY - 34);
				} else if (!casting && castSeen.delete(key)) {}
				const pose = casting ? frames.cast : sitting ? frames.sit : form !== "walk" ? frames.ride : frames.walk;
				const seed = hash(key);
				const image = pose[casting && window !== void 0 ? castFrameIndex(window, time, frames.cast.length) : sitting ? Math.floor(time / 720 + seed % 5) % pose.length : pose === frames.walk ? Math.floor(time / 110 + seed % 7) % pose.length : Math.floor(time / 300 + seed % 3) % pose.length] ?? pose[0];
				if (image === void 0) return;
				const seatDrop = form === "walk" ? 0 : form === "beast" ? -14 : 0;
				g.save();
				g.translate(cx, baseY + seatDrop);
				g.scale(CHARACTER_SCALE, CHARACTER_SCALE);
				g.imageSmoothingEnabled = false;
				g.drawImage(image, -48 / 2, -92);
				g.restore();
			}
			/** 工位家具：矮案、蒲团、香炉与本命法器；主人离开时仍留在原位。 */
			function paintFurniture(cx, deskY, member, time) {
				const visual = roleVisual(member.isLeader === true ? "captain" : member.role);
				const working = member.activity === "working";
				const realm = realmIndex(member.progress);
				const deskX = cx - DESK_W / 2;
				g.fillStyle = COLORS.desk;
				roundRect(g, deskX, deskY - 15, DESK_W, 15, 3);
				g.fill();
				g.fillStyle = COLORS.deskTop;
				g.fillRect(deskX, deskY - 17, DESK_W, 3);
				g.fillStyle = "#8a6a4a";
				g.beginPath();
				g.ellipse(cx, deskY - 5, 20, 7, 0, 0, Math.PI * 2);
				g.fill();
				g.fillStyle = "#b08a5a";
				g.beginPath();
				g.ellipse(cx, deskY - 7, 17, 5, 0, 0, Math.PI * 2);
				g.fill();
				g.fillStyle = "#8a6a3a";
				g.beginPath();
				g.ellipse(cx + 24, deskY - 20, 6, 3, 0, 0, Math.PI * 2);
				g.fill();
				g.fillStyle = working ? "#e0a94a" : "#7a6a4a";
				g.fillRect(cx + 21, deskY - 23, 5, 2);
				if (working) {
					g.fillStyle = "rgba(222, 226, 238, 0.35)";
					g.beginPath();
					g.arc(cx + 24, deskY - 29, 3.5, 0, Math.PI * 2);
					g.fill();
					g.beginPath();
					g.arc(cx + 28, deskY - 36, 2.5, 0, Math.PI * 2);
					g.fill();
				}
				if (visual !== void 0) {
					g.save();
					g.translate(cx - DESK_W / 2 + 10, deskY - 17);
					g.scale(CHARACTER_SCALE, CHARACTER_SCALE);
					paintWeapon(visual, 0, 0, realm, working, time);
					g.restore();
				}
			}
			/** 矮案前沿：伏案修士的下半身压在案后，脚不会踩在案面上。 */
			function paintDeskFront(cx, deskY) {
				const deskX = cx - DESK_W / 2;
				g.fillStyle = COLORS.desk;
				roundRect(g, deskX, deskY - 15, DESK_W, 15, 3);
				g.fill();
				g.fillStyle = COLORS.deskTop;
				g.fillRect(deskX, deskY - 17, DESK_W, 3);
				g.fillStyle = "rgba(0, 0, 0, 0.14)";
				g.fillRect(deskX + 6, deskY - 12, DESK_W - 12, 1);
			}
			/** 悬停工位：四角描金 + 轻微呼吸，和工作台一体。 */
			function paintDeskHover(cx, deskY, time) {
				const x = cx - 40;
				const y = deskY - 62;
				const w = 80;
				const h = 82;
				const len = 8;
				const pulse = .55 + Math.abs(Math.sin(time / 500)) * .35;
				g.strokeStyle = `rgba(255, 233, 168, ${pulse.toFixed(3)})`;
				g.lineWidth = 1.2;
				for (const [dx, dy, sx, sy] of [
					[
						x,
						y,
						1,
						1
					],
					[
						x + w,
						y,
						-1,
						1
					],
					[
						x,
						y + h,
						1,
						-1
					],
					[
						x + w,
						y + h,
						-1,
						-1
					]
				]) {
					g.beginPath();
					g.moveTo(dx + sx * len, dy);
					g.lineTo(dx, dy);
					g.lineTo(dx, dy + sy * len);
					g.stroke();
				}
			}
			/** 当前打开的对话所属修士：身后柔光 + 地面光晕（比四角框更耐看）。 */
			function paintViewingAura(cx, baseY, member, time) {
				const rgb = member.isLeader === true ? "242, 193, 78" : "111, 214, 200";
				const pulse = .5 + .5 * Math.sin(time / 900);
				g.save();
				const glow = g.createRadialGradient(cx, baseY - 30, 2, cx, baseY - 30, 34);
				glow.addColorStop(0, `rgba(${rgb}, ${(.26 + pulse * .08).toFixed(3)})`);
				glow.addColorStop(.55, `rgba(${rgb}, ${(.1 + pulse * .05).toFixed(3)})`);
				glow.addColorStop(1, "rgba(0, 0, 0, 0)");
				g.fillStyle = glow;
				g.beginPath();
				g.ellipse(cx, baseY - 30, 30, 40, 0, 0, Math.PI * 2);
				g.fill();
				g.strokeStyle = `rgba(${rgb}, ${(.18 + pulse * .1).toFixed(3)})`;
				g.lineWidth = 1.2;
				g.beginPath();
				g.ellipse(cx, baseY - 2, 22, 7, 0, 0, Math.PI * 2);
				g.stroke();
				g.restore();
			}
			/** 双击弹跳高度（抛物线，520ms）。 */
			function jumpHeight(id, time) {
				const start = jumps.get(id);
				if (start === void 0) return 0;
				if (start < 0) {
					jumps.set(id, time);
					return 0;
				}
				const progress = (time - start) / 520;
				if (progress >= 1) {
					jumps.delete(id);
					return 0;
				}
				return Math.sin(progress * Math.PI) * 14;
			}
			/** 当前出行形态：默认步行，只有显式装备飞剑/神兽且等级够格才离地。 */
			function travelForm(member) {
				if (member.activity === "working") return "walk";
				return travelFormFor(member.level ?? 0, mountOverride.get(member.id || member.name));
			}
			/** 落影：飞起时影子留在原地并缩小变淡，人才像“离地”而不是“漂着”。 */
			function paintGroundShadow(cx, groundY, form, time) {
				const lifted = form !== "walk";
				const pulse = lifted ? .5 + .5 * Math.sin(time / 900) : 1;
				g.fillStyle = `rgba(56, 44, 30, ${(lifted ? .1 * pulse + .04 : .18).toFixed(3)})`;
				g.beginPath();
				g.ellipse(cx, groundY - 3, lifted ? 12 : 16, lifted ? 4 : 6, 0, 0, Math.PI * 2);
				g.fill();
			}
			/** 御剑：剑身横在脚下，剑格/剑穗/拖尾都画细，不再是一根悬空的白线。 */
			function paintSwordMount(cx, feetY, time) {
				const bob = Math.sin(time / 380) * 1.4;
				g.save();
				g.translate(cx, feetY + bob);
				for (let i = 0; i < 3; i += 1) {
					const shift = (time / 6 + i * 11) % 30;
					g.globalAlpha = .2 - i * .05;
					g.fillStyle = "#9fe9ff";
					g.fillRect(-30 - shift, -3 + i * 2, 16, 1);
				}
				g.globalAlpha = 1;
				const glow = g.createRadialGradient(0, -2, 2, 0, -2, 34);
				glow.addColorStop(0, "rgba(140, 232, 255, 0.30)");
				glow.addColorStop(.6, "rgba(120, 210, 255, 0.10)");
				glow.addColorStop(1, "rgba(120, 210, 255, 0)");
				g.fillStyle = glow;
				g.beginPath();
				g.ellipse(0, -2, 34, 11, 0, 0, Math.PI * 2);
				g.fill();
				g.fillStyle = "#eafbff";
				g.beginPath();
				g.moveTo(-26, -2);
				g.lineTo(20, -2);
				g.lineTo(31, -4);
				g.lineTo(31, 0);
				g.lineTo(20, 2);
				g.lineTo(-26, 2);
				g.closePath();
				g.fill();
				g.fillStyle = "rgba(255, 255, 255, 0.92)";
				g.fillRect(-24, -1.5, 42, 1);
				g.fillStyle = "#7cd8ff";
				g.fillRect(-24, 1, 42, 1);
				g.fillStyle = "#f2c14e";
				g.fillRect(-30, -4.5, 4, 9);
				g.fillStyle = "#ffe9a8";
				g.fillRect(-30, -4.5, 4, 1);
				g.fillStyle = "#5a3b2a";
				g.fillRect(-38, -1, 8, 2);
				g.fillStyle = "#f2c14e";
				g.fillRect(-41, -2, 3, 4);
				const sway = Math.sin(time / 300) * 1.5;
				g.fillStyle = "#c23a3a";
				g.fillRect(-39 + sway, 2, 2, 7);
				g.fillStyle = "#e86a6a";
				g.fillRect(-39 + sway, 7, 2, 2);
				g.restore();
			}
			function paintMount(cx, feetY, form, time, variant) {
				g.save();
				g.translate(cx, feetY);
				if (form === "sword") {
					g.scale(CHARACTER_SCALE, CHARACTER_SCALE);
					paintSwordMount(0, 0, time);
				} else {
					const frames = mountFrames(mountModelFor(variant));
					const image = frames[Math.floor(time / 130) % frames.length] ?? frames[0];
					if (image !== void 0) {
						const scale = CHARACTER_SCALE * 1.2;
						g.scale(scale, scale);
						g.imageSmoothingEnabled = false;
						g.drawImage(image, -56 / 2, -40);
					}
				}
				g.restore();
			}
			/** 当前对话者头顶的悬浮标签，比只有光圈更容易一眼看到。 */
			function paintViewingBadge(cx, baseY, member, time) {
				const text = model?.labels?.viewing ?? "对话中";
				const color = member.isLeader === true ? "#f2c14e" : "#6fd6c8";
				const bob = Math.sin(time / 520) * 2;
				g.save();
				g.font = "bold 8px \"Segoe UI\", sans-serif";
				const w = g.measureText(text).width + 12;
				const x = cx + 18;
				const y = baseY - CHARACTER_DISPLAY_HEIGHT - 16 + bob;
				g.fillStyle = "rgba(12, 18, 22, 0.88)";
				roundRect(g, x, y, w, 15, 4);
				g.fill();
				g.strokeStyle = color;
				g.lineWidth = 1;
				roundRect(g, x, y, w, 15, 4);
				g.stroke();
				g.fillStyle = color;
				g.fillText(text, x + 6, y + 10.5);
				g.beginPath();
				g.moveTo(x + 1, y + 6);
				g.lineTo(x - 5, y + 10);
				g.lineTo(x + 1, y + 12);
				g.closePath();
				g.fill();
				g.restore();
			}
			/** 修为变化：冒 +N；升级：冒横幅 + 金环特效。 */
			function trackCultivationFx(spot, time) {
				const id = spot.member.id || spot.member.name;
				const level = spot.member.level;
				let leveled = false;
				if (level !== void 0) {
					const previous = lastLevel.get(id);
					if (previous !== void 0 && level > previous) {
						cultivationFx.push({
							x: spot.cx,
							y: spot.baseY - 96,
							groundY: spot.baseY,
							text: `Lv.${level}`,
							start: time,
							kind: "level"
						});
						startCast(id, 1200);
						leveled = true;
					}
					lastLevel.set(id, level);
				}
				const xp = spot.member.xp;
				if (xp !== void 0) {
					const previous = lastXp.get(id);
					if (previous !== void 0 && xp - previous >= 1 && !leveled) cultivationFx.push({
						x: spot.cx,
						y: spot.baseY - 74,
						groundY: spot.baseY,
						text: `+${Math.round(xp - previous)}`,
						start: time,
						kind: "xp"
					});
					lastXp.set(id, xp);
				}
				if (cultivationFx.length > 40) cultivationFx = cultivationFx.slice(-40);
			}
			function drawCultivationFx(time) {
				const keep = [];
				for (const fx of cultivationFx) {
					const progress = (time - fx.start) / 1400;
					if (progress >= 1) continue;
					keep.push(fx);
					const alpha = 1 - progress;
					const y = fx.y - progress * 30;
					g.save();
					g.globalAlpha = alpha;
					if (fx.kind === "level") {
						const ring = 12 + progress * 32;
						const ringY = fx.groundY - 2;
						g.strokeStyle = "#f2c14e";
						g.lineWidth = 2;
						g.beginPath();
						g.ellipse(fx.x, ringY, ring, ring * .32, 0, 0, Math.PI * 2);
						g.stroke();
						for (let i = 0; i < 8; i += 1) {
							const angle = i / 8 * Math.PI * 2 + progress * 2;
							g.fillStyle = "#ffe9a8";
							g.fillRect(fx.x + Math.cos(angle) * ring - 1.5, ringY + Math.sin(angle) * ring * .32 - 1.5, 3, 3);
						}
						g.font = "bold 9px \"Segoe UI\", sans-serif";
						const text = `${model?.labels?.levelUp ?? "Level up"} ${fx.text}`;
						const w = g.measureText(text).width;
						g.fillStyle = "rgba(12, 18, 22, 0.88)";
						roundRect(g, fx.x - w / 2 - 6, y - 10, w + 12, 16, 4);
						g.fill();
						g.strokeStyle = "#f2c14e";
						g.lineWidth = 1;
						roundRect(g, fx.x - w / 2 - 6, y - 10, w + 12, 16, 4);
						g.stroke();
						g.fillStyle = "#f2c14e";
						g.fillText(text, fx.x - w / 2, y + 3);
					} else {
						g.font = "bold 9px \"Segoe UI\", sans-serif";
						const w = g.measureText(fx.text).width;
						g.fillStyle = "rgba(12, 18, 22, 0.78)";
						roundRect(g, fx.x - w / 2 - 5, y - 9, w + 10, 14, 4);
						g.fill();
						g.fillStyle = "#9be36f";
						g.fillText(fx.text, fx.x - w / 2, y + 2);
					}
					g.restore();
				}
				cultivationFx = keep;
			}
			/** 境界灵光：Lv.2 起周身灵光，Lv.10 起脚下金环。 */
			function paintCultivationAura(cx, baseY, member, time) {
				const level = member.level ?? 0;
				if (level < 2) return;
				g.save();
				const count = level >= 10 ? 6 : 3;
				for (let i = 0; i < count; i += 1) {
					const angle = time / 1200 + i / count * Math.PI * 2;
					const x = cx + Math.cos(angle) * 17;
					const y = baseY - 34 + Math.sin(angle * 1.4) * 11;
					g.globalAlpha = .32 + .24 * Math.sin(time / 500 + i);
					g.fillStyle = level >= 10 ? "#f2c14e" : "#9be36f";
					g.fillRect(x - 1, y - 1, 2, 2);
				}
				if (level >= 10) {
					g.globalAlpha = .22 + .1 * Math.sin(time / 700);
					g.strokeStyle = "#f2c14e";
					g.lineWidth = 1;
					g.beginPath();
					g.ellipse(cx, baseY - 2, 20, 6, 0, 0, Math.PI * 2);
					g.stroke();
				}
				g.restore();
			}
			/** 已装备法器：按物品 id 换外形，按品阶换灵光。 */
			function paintEquippedWeapon(cx, baseY, shape, tone, time) {
				const bob = Math.sin(time / 620) * 2;
				const tilt = Math.sin(time / 900) * .1;
				g.save();
				g.translate(cx + 24, baseY - 34 + bob);
				g.rotate(tilt);
				g.scale(tone.scale, tone.scale);
				const glow = g.createRadialGradient(0, 0, 1, 0, 0, 16);
				glow.addColorStop(0, `rgba(${tone.glow}, 0.34)`);
				glow.addColorStop(1, `rgba(${tone.glow}, 0)`);
				g.fillStyle = glow;
				g.beginPath();
				g.arc(0, 0, 16, 0, Math.PI * 2);
				g.fill();
				g.fillStyle = tone.color;
				g.strokeStyle = tone.color;
				switch (shape) {
					case "sword":
						g.fillRect(-1, -12, 2, 16);
						g.fillRect(-4, -6, 8, 2);
						g.fillRect(-1, -4, 2, 6);
						g.fillRect(-2, 2, 4, 2);
						break;
					case "saber":
						g.lineWidth = 3;
						g.lineCap = "round";
						g.beginPath();
						g.moveTo(-2, -12);
						g.quadraticCurveTo(6, -5, 3, 2);
						g.stroke();
						g.fillRect(-4, -3, 8, 2);
						g.fillRect(-1, -1, 2, 6);
						break;
					case "orb":
						g.globalAlpha = .95;
						g.beginPath();
						g.arc(0, -2, 6, 0, Math.PI * 2);
						g.fill();
						g.globalAlpha = .5;
						g.beginPath();
						g.ellipse(0, -2, 10, 3.5, -.4, 0, Math.PI * 2);
						g.stroke();
						break;
					case "staff":
						g.fillRect(-1, -12, 2, 24);
						g.beginPath();
						g.arc(0, -13, 3.5, 0, Math.PI * 2);
						g.fill();
						g.fillStyle = "rgba(255, 255, 255, 0.7)";
						g.fillRect(-1, -14, 2, 2);
						break;
					case "bolt":
						g.beginPath();
						g.moveTo(-3, -12);
						g.lineTo(4, -3);
						g.lineTo(0, -2);
						g.lineTo(5, 7);
						g.lineTo(-3, -1);
						g.lineTo(1, -2);
						g.lineTo(-5, -9);
						g.closePath();
						g.fill();
						break;
					case "trident":
						g.fillRect(-1, -8, 2, 20);
						g.fillRect(-5, -13, 2, 7);
						g.fillRect(-1, -15, 2, 9);
						g.fillRect(3, -13, 2, 7);
						g.fillRect(-5, -7, 10, 2);
						break;
					case "star":
						g.beginPath();
						for (let i = 0; i < 10; i += 1) {
							const angle = -Math.PI / 2 + i / 10 * Math.PI * 2;
							const radius = i % 2 === 0 ? 8 : 3.4;
							const x = Math.cos(angle) * radius;
							const y = Math.sin(angle) * radius - 2;
							if (i === 0) g.moveTo(x, y);
							else g.lineTo(x, y);
						}
						g.closePath();
						g.fill();
						break;
					case "planet":
						g.beginPath();
						g.arc(0, -2, 6, 0, Math.PI * 2);
						g.fill();
						g.lineWidth = 1.4;
						g.beginPath();
						g.ellipse(0, -2, 11, 4, -.35, 0, Math.PI * 2);
						g.stroke();
						g.fillStyle = "rgba(255, 255, 255, 0.65)";
						g.fillRect(-2, -4, 2, 2);
						break;
				}
				for (let i = 0; i < 2; i += 1) {
					const angle = time / 700 + i * Math.PI;
					g.globalAlpha = .55 + .25 * Math.sin(time / 420 + i);
					g.fillRect(Math.cos(angle) * 12 - 1, Math.sin(angle) * 12 - 1, 2, 2);
				}
				g.restore();
			}
			/** 换装反馈：脚下灵光扩散 + 头顶飘出装备名。 */
			function paintEquipFlash(cx, baseY, member, time) {
				const key = member.id || member.name;
				const flash = equipFlash.get(key);
				if (flash === void 0) return;
				const age = time - flash.at;
				if (age < 0) return;
				if (age > EQUIP_FLASH_MS) {
					equipFlash.delete(key);
					return;
				}
				const progress = age / EQUIP_FLASH_MS;
				const color = flash.kind === "mount" ? "#6fd6c8" : flash.kind === "skill" ? "#9be36f" : "#f2c14e";
				g.save();
				g.globalAlpha = Math.max(0, 1 - progress) * .85;
				g.strokeStyle = color;
				g.lineWidth = 1.5;
				const radius = 8 + progress * 26;
				g.beginPath();
				g.ellipse(cx, baseY - 2, radius, radius * .32, 0, 0, Math.PI * 2);
				g.stroke();
				g.globalAlpha = Math.min(1, (1 - progress) * 2.4);
				const text = truncate(flash.text, 10);
				g.font = "bold 7px \"Segoe UI\", sans-serif";
				const width = g.measureText(text).width + 10;
				const x = Math.max(2, Math.min(WORLD_W - width - 2, cx - width / 2));
				const y = baseY - CHARACTER_DISPLAY_HEIGHT - 40 - progress * 10;
				g.fillStyle = "rgba(12, 18, 22, 0.9)";
				roundRect(g, x, y, width, 13, 3);
				g.fill();
				g.strokeStyle = color;
				g.lineWidth = 1;
				roundRect(g, x, y, width, 13, 3);
				g.stroke();
				g.fillStyle = color;
				g.fillText(text, x + 5, y + 9);
				g.restore();
			}
			/** 已装备外观：法器悬浮在身侧，技能多一层灵环。 */
			function paintEquipFx(cx, baseY, member, time) {
				const key = member.id || member.name;
				const weapon = weaponEquip.get(key);
				const skillTier = skillEquip.get(key);
				if (weapon !== void 0) paintEquippedWeapon(cx, baseY, weaponShapeFor(weapon.itemId), toneForTier(weapon.tier), time);
				if (skillTier !== void 0) {
					const color = toneForTier(skillTier).color;
					const icon = skillIcon(skillTier, color);
					const bob = Math.round(Math.sin(time / 620) * 2);
					g.globalAlpha = .95;
					g.drawImage(icon, Math.round(cx + 16), Math.round(baseY - 46 + bob), 16, 16);
					g.globalAlpha = 1;
					g.save();
					g.globalAlpha = .32 + .12 * Math.sin(time / 480);
					g.strokeStyle = color;
					g.lineWidth = 1.2;
					g.beginPath();
					g.ellipse(cx, baseY - 2, 22, 8, 0, 0, Math.PI * 2);
					g.stroke();
					g.restore();
				}
			}
			/** Name plate, state dot, progress bar, task bubble and unread badge. */
			function paintOverlay(cx, deskY, member, time, lift = 0) {
				const seed = hash(member.id || member.name);
				const bob = member.activity === "working" ? Math.round(Math.sin(time / 130 + seed % 7) * 1.5) : Math.round(Math.sin(time / 700 + seed % 5) * 1);
				const headY = deskY - lift - CHARACTER_DISPLAY_HEIGHT + bob;
				const labels = model?.labels;
				const stateText = member.viewing === true ? labels?.viewing ?? "对话中" : member.activity === "working" ? labels?.working : member.activity === "idle" ? labels?.idle : labels?.unknownState;
				const label = stateText === void 0 || stateText === "" ? truncate(member.name, 10) : `${truncate(member.name, 8)} · ${stateText}`;
				g.font = "9px \"Segoe UI\", monospace";
				const textW = g.measureText(label).width;
				g.fillStyle = COLORS.labelBg;
				roundRect(g, cx - textW / 2 - 6, deskY + 3, textW + 12, 14, 3);
				g.fill();
				g.fillStyle = member.isLeader ? COLORS.captain : COLORS.label;
				g.fillText(label, cx - textW / 2, deskY + 13);
				if (member.viewing === true) {
					const accent = member.isLeader === true ? "#f2c14e" : "#6fd6c8";
					g.save();
					g.strokeStyle = accent;
					g.lineWidth = 1;
					g.globalAlpha = .9;
					roundRect(g, cx - textW / 2 - 6, deskY + 3, textW + 12, 14, 3);
					g.stroke();
					g.globalAlpha = .28 + .14 * Math.sin(time / 700);
					roundRect(g, cx - textW / 2 - 9, deskY + 1, textW + 18, 18, 4);
					g.stroke();
					g.restore();
				}
				g.fillStyle = member.viewing === true ? member.isLeader === true ? "#f2c14e" : "#6fd6c8" : stateTone(member.activity);
				g.beginPath();
				g.arc(cx - textW / 2 - 10, deskY + 10, 2.6, 0, Math.PI * 2);
				g.fill();
				const levelText = member.level === void 0 || member.level <= 0 ? void 0 : `Lv.${member.level}${member.realm === void 0 || member.realm === "" ? "" : ` ${member.realm}`}`;
				if (levelText !== void 0) {
					g.font = "bold 6.5px \"Segoe UI\", monospace";
					const lw = Math.max(44, g.measureText(levelText).width + 10);
					const lx = Math.max(2, Math.min(WORLD_W - lw - 2, cx - lw / 2));
					const ly = headY - 16;
					const palette = realmPaletteForLevel(member.level ?? 1);
					g.fillStyle = palette.background;
					roundRect(g, lx, ly, lw, 16, 4);
					g.fill();
					g.strokeStyle = palette.border;
					g.lineWidth = 1;
					roundRect(g, lx, ly, lw, 16, 4);
					g.stroke();
					g.fillStyle = palette.text;
					g.fillText(levelText, lx + 5, ly + 8);
					const trackX = lx + 4;
					const trackY = ly + 11;
					const trackW = lw - 8;
					g.save();
					g.globalAlpha = .22;
					g.fillStyle = palette.border;
					g.fillRect(trackX, trackY, trackW, 2.5);
					g.restore();
					const ratio = Math.min(1, Math.max(0, member.xpRatio ?? 0));
					g.fillStyle = palette.bar;
					g.fillRect(trackX, trackY, Math.max(1, Math.round(trackW * ratio)), 2.5);
				}
				if (member.total !== void 0 && member.total > 0) {
					const ratio = Math.min(1, Math.max(0, (member.done ?? 0) / member.total));
					g.fillStyle = "rgba(255,255,255,0.18)";
					g.fillRect(cx - 18, deskY + 20, 36, 3);
					g.fillStyle = COLORS.good;
					g.fillRect(cx - 18, deskY + 20, Math.round(36 * ratio), 3);
				}
				if (member.currentTask !== void 0 && member.currentTask !== "") {
					const text = truncate(member.currentTask, 15);
					g.font = "8px \"Segoe UI\", monospace";
					const bw = g.measureText(text).width + 12;
					const bx = Math.max(2, Math.min(WORLD_W - bw - 2, cx - bw / 2));
					const by = Math.max(4, headY - 22 - (member.level === void 0 ? 0 : 18));
					g.fillStyle = COLORS.bubble;
					roundRect(g, bx, by, bw, 15, 4);
					g.fill();
					g.beginPath();
					g.moveTo(cx - 3, by + 15);
					g.lineTo(cx + 1, by + 19);
					g.lineTo(cx + 4, by + 15);
					g.closePath();
					g.fill();
					g.fillStyle = COLORS.label;
					g.fillText(text, bx + 6, by + 11);
				}
				const chatter = model?.chatter;
				if (member.activity === "idle" && chatter !== void 0 && chatter.length > 0 && (member.currentTask === void 0 || member.currentTask === "")) {
					const cycle = 11e3 + seed % 6 * 1300;
					const t0 = time + seed % 5e3;
					if (t0 % cycle < 2600) {
						const line = chatter[Math.floor(t0 / cycle + seed) % chatter.length];
						g.font = "8px \"Segoe UI\", monospace";
						const text = truncate(line, 18);
						const bw = g.measureText(text).width + 12;
						const bx = Math.max(2, Math.min(WORLD_W - bw - 2, cx - bw / 2));
						const by = Math.max(4, headY - 22 - (member.level === void 0 ? 0 : 18));
						g.fillStyle = "rgba(28, 36, 48, 0.94)";
						roundRect(g, bx, by, bw, 15, 4);
						g.fill();
						g.strokeStyle = "rgba(127, 212, 255, 0.35)";
						g.lineWidth = 1;
						roundRect(g, bx, by, bw, 15, 4);
						g.stroke();
						g.beginPath();
						g.moveTo(cx - 3, by + 15);
						g.lineTo(cx + 1, by + 19);
						g.lineTo(cx + 4, by + 15);
						g.closePath();
						g.fill();
						g.fillStyle = COLORS.label;
						g.fillText(text, bx + 6, by + 11);
					}
				}
				if ((member.unread ?? 0) > 0) {
					g.fillStyle = COLORS.alert;
					g.beginPath();
					g.arc(cx + 13, headY - 1, 5, 0, Math.PI * 2);
					g.fill();
					g.fillStyle = "#fff";
					g.font = "bold 6.5px \"Segoe UI\", monospace";
					g.fillText(String(Math.min(9, member.unread ?? 0)), cx + 11, headY + 1);
				}
			}
			/** 缓入缓出，让走动不像平移。 */
			function smooth01(t) {
				return t * t * (3 - 2 * t);
			}
			/** 中庭里的落脚点：按修士 seed 与时间槽确定，画面可复现。 */
			function wanderPoint(seed, slot, top, bottom) {
				const width = WORLD_W - 120;
				const height = Math.max(1, bottom - top);
				return {
					x: 60 + (seed * 37 + slot * 131) % width,
					y: top + (seed * 53 + slot * 97) % height
				};
			}
			function paint(time) {
				const deltaMs = lastPaintAt === 0 ? 0 : Math.min(50, time - lastPaintAt);
				lastPaintAt = time;
				stepCastSparks(deltaMs);
				const members = model?.members ?? [];
				let columns = 1;
				let worldHeight = WORLD_MIN_H;
				let bestScale = -1;
				const maxColumns = members.length === 0 ? 1 : Math.min(MAX_COLUMNS, members.length);
				for (let candidate = 1; candidate <= maxColumns; candidate++) {
					const candidateRows = Math.max(1, Math.ceil(members.length / candidate));
					const candidateHeight = Math.max(WORLD_MIN_H, TOP_PAD + candidateRows * CELL_H + 8);
					const candidateScale = Math.min(width / WORLD_W, height / candidateHeight);
					if (candidateScale > bestScale + 1e-6 || Math.abs(candidateScale - bestScale) <= 1e-6 && candidate > columns) {
						bestScale = candidateScale;
						columns = candidate;
						worldHeight = candidateHeight;
					}
				}
				scale = Math.max(.2, bestScale) * zoom;
				const stretch = height / scale;
				worldH = stretch > worldHeight ? stretch : worldHeight;
				offsetX = (width - WORLD_W * scale) / 2;
				offsetY = Math.max(0, (height - worldH * scale) / 2);
				g.setTransform(dpr, 0, 0, dpr, 0, 0);
				g.clearRect(0, 0, width, height);
				g.save();
				g.translate(offsetX, offsetY);
				g.scale(scale, scale);
				g.imageSmoothingEnabled = false;
				const cellW = WORLD_W / columns;
				const rowCount = Math.max(1, Math.ceil(members.length / columns));
				const firstDeskY = 232;
				const available = Math.max(0, worldH - 24 - firstDeskY);
				const spacing = rowCount > 1 ? Math.min(280, available / (rowCount - 1)) : 0;
				const blockTop = firstDeskY + (rowCount === 1 ? Math.min(150, available * .18) : 0);
				const layout = members.map((member, index) => {
					const row = Math.floor(index / columns);
					const inRow = Math.min(columns, members.length - row * columns);
					const column = index % columns + (columns - inRow) / 2;
					return {
						member,
						cx: cellW * (column + .5),
						deskY: blockTop + spacing * row
					};
				});
				const lastDeskY = layout.length === 0 ? 0 : layout[layout.length - 1].deskY;
				const spots = layout.map((item) => ({
					...item,
					deskCx: item.cx,
					baseY: item.deskY,
					walking: false
				}));
				const courtyardTop = lastDeskY + 132;
				const pondGap = worldH - 96 >= 760 ? 250 : 70;
				const courtyardBottom = worldH - pondGap;
				if (courtyardBottom - courtyardTop >= 60) for (const spot of spots) {
					if (spot.member.activity !== "idle") continue;
					const seed = hash(spot.member.id || spot.member.name);
					const cycle = 15e3 + seed % 5 * 1400;
					const t0 = time + seed % 9e3;
					const slot = Math.floor(t0 / cycle);
					const phase = t0 % cycle / cycle;
					const eased = phase < .62 ? smooth01(phase / .62) : 1;
					const from = wanderPoint(seed, slot, courtyardTop, courtyardBottom);
					const to = wanderPoint(seed, slot + 1, courtyardTop, courtyardBottom);
					spot.cx = from.x + (to.x - from.x) * eased;
					spot.baseY = from.y + (to.y - from.y) * eased;
					spot.walking = phase < .62;
				}
				else for (const spot of spots) {
					if (spot.member.activity !== "idle") continue;
					const seed = hash(spot.member.id || spot.member.name);
					const sway = Math.sin(time / (2400 + seed % 1200) + seed % 7);
					spot.cx = Math.max(36, Math.min(WORLD_W - 36, spot.deskCx + sway * 24));
					spot.walking = Math.abs(sway) > .25;
				}
				for (const spot of spots) trackCultivationFx({
					...spot,
					baseY: spot.baseY - TRAVEL_LIFT[travelForm(spot.member)]
				}, time);
				paintRoom(time, model?.wall, hovered, lastDeskY);
				paintPond(time, lastDeskY);
				hitAreas = [];
				const labelled = new Set((model?.facilities ?? []).map((facility) => facility.action));
				for (const action of FACILITY_ORDER) {
					if (!labelled.has(action)) continue;
					const rect = FACILITIES[action];
					hitAreas.push({
						x: rect.x,
						y: rect.y,
						w: rect.w,
						h: 92 - rect.y,
						hit: {
							kind: "action",
							action
						}
					});
				}
				for (const spot of spots) {
					const lift = TRAVEL_LIFT[travelForm(spot.member)];
					hitAreas.push({
						x: spot.deskCx - 42,
						y: spot.deskY - 58,
						w: 84,
						h: 78,
						hit: {
							kind: "member",
							id: spot.member.id
						}
					});
					hitAreas.push({
						x: spot.cx - 26,
						y: spot.baseY - lift - CHARACTER_DISPLAY_HEIGHT - 6,
						w: 52,
						h: CHARACTER_DISPLAY_HEIGHT + lift + 12,
						hit: {
							kind: "member",
							id: spot.member.id
						}
					});
				}
				for (const spot of spots) {
					if ((spot.member.level ?? 0) <= 0) continue;
					const lift = TRAVEL_LIFT[travelForm(spot.member)];
					hitAreas.push({
						x: Math.max(2, Math.min(WORLD_W - 62, spot.cx - 31)),
						y: spot.baseY - lift - CHARACTER_DISPLAY_HEIGHT - 18,
						w: 62,
						h: 18,
						hit: {
							kind: "level",
							id: spot.member.id || spot.member.name
						}
					});
				}
				if (model?.sceneObjects?.settings === true) hitAreas.push({
					x: DIAL_AT.x - 28,
					y: DIAL_AT.y - 32,
					w: 56,
					h: 66,
					hit: { kind: "settings" }
				});
				if (layout.length === 0) {
					g.fillStyle = COLORS.label;
					g.font = "12px \"Segoe UI\", sans-serif";
					const text = model?.labels?.empty ?? "No members yet";
					g.fillText(text, 24, 150);
				} else {
					for (const spot of spots) paintGroundShadow(spot.cx, spot.baseY, travelForm(spot.member), time);
					for (const spot of spots) paintFurniture(spot.deskCx, spot.deskY, spot.member, time);
					for (const spot of spots) if (spot.member.viewing === true) paintViewingAura(spot.cx, spot.baseY, spot.member, time);
					for (const spot of spots) {
						const form = travelForm(spot.member);
						const lift = TRAVEL_LIFT[form];
						const hop = jumpHeight(spot.member.id || spot.member.name, time);
						if (form !== "walk") paintMount(spot.cx, spot.baseY - lift - hop, form, time, mountVariant.get(spot.member.id || spot.member.name));
						paintCharacter(spot.cx, spot.baseY - lift - hop, spot.member, time, spot.walking && form === "walk");
						paintCultivationAura(spot.cx, spot.baseY - lift, spot.member, time);
					}
					for (const spot of spots) paintDeskFront(spot.deskCx, spot.deskY);
					for (const spot of spots) {
						const lift = TRAVEL_LIFT[travelForm(spot.member)];
						paintOverlay(spot.cx, spot.baseY, spot.member, time, lift);
						paintEquipFx(spot.cx, spot.baseY - lift, spot.member, time);
						paintEquipFlash(spot.cx, spot.baseY - lift, spot.member, time);
					}
					for (const spot of spots) {
						if (spot.member.viewing !== true) continue;
						const lift = TRAVEL_LIFT[travelForm(spot.member)];
						paintViewingBadge(spot.cx, spot.baseY - lift, spot.member, time);
					}
					drawCultivationFx(time);
					drawCastSparks();
					const hoveredMemberId = hovered?.kind === "member" ? hovered.id : void 0;
					if (hoveredMemberId !== void 0) {
						const target = spots.find((spot) => spot.member.id === hoveredMemberId);
						if (target !== void 0) paintDeskHover(target.cx, target.baseY, time);
					}
				}
				if (model?.sceneObjects?.settings === true) paintHallDial(DIAL_AT.x, DIAL_AT.y, time, hovered?.kind === "settings", model.sceneObjects.settingsActive === true, model?.sceneLabels?.settings ?? "");
				if (model?.phase === "staged") {
					g.fillStyle = "rgba(16, 20, 28, 0.55)";
					g.fillRect(0, 0, WORLD_W, worldH);
					g.fillStyle = "#f6f8ff";
					g.font = "bold 13px \"Segoe UI\", sans-serif";
					const text = model.labels?.awaiting ?? "Waiting for approval";
					const textW = g.measureText(text).width;
					g.fillText(text, (WORLD_W - textW) / 2, worldH / 2);
				}
				if (model?.halted === true) {
					g.fillStyle = COLORS.alert;
					g.fillRect(0, 0, WORLD_W, 18);
					g.fillStyle = "#1a1010";
					g.font = "bold 10px \"Segoe UI\", sans-serif";
					const text = model.labels?.stalled ?? "Team stopped";
					const textW = g.measureText(text).width;
					g.fillText(text, (WORLD_W - textW) / 2, 13);
				}
				g.restore();
			}
			function fallback(error) {
				try {
					g.setTransform(1, 0, 0, 1, 0, 0);
					g.fillStyle = "#1b2029";
					g.fillRect(0, 0, canvas.width, canvas.height);
					g.fillStyle = "#f0a0a0";
					g.font = "12px monospace";
					g.fillText(`office render error: ${String(error)}`, 12, 24);
				} catch {}
			}
			function loop(time) {
				if (disposed) return;
				try {
					paint(time);
				} catch (error) {
					fallback(error);
				}
				raf = window.requestAnimationFrame(loop);
			}
			fit();
			raf = window.requestAnimationFrame(loop);
			return {
				render(next) {
					model = next;
				},
				resize(nextWidth, nextHeight) {
					width = Math.max(1, Math.floor(nextWidth));
					height = Math.max(1, Math.floor(nextHeight));
					dpr = typeof window === "undefined" ? 1 : Math.min(3, Math.max(1, window.devicePixelRatio || 1));
					canvas.width = Math.floor(width * dpr);
					canvas.height = Math.floor(height * dpr);
					canvas.style.width = `${width}px`;
					canvas.style.height = `${height}px`;
					fit();
				},
				hitTest(x, y) {
					const wx = (x - offsetX) / scale;
					const wy = (y - offsetY) / scale;
					for (let index = hitAreas.length - 1; index >= 0; index--) {
						const area = hitAreas[index];
						if (wx >= area.x && wx <= area.x + area.w && wy >= area.y && wy <= area.y + area.h) return area.hit;
					}
				},
				setHover(hit) {
					hovered = hit;
				},
				jump(id) {
					jumps.set(id, -1);
				},
				cycleMount(id) {
					const member = model?.members.find((item) => (item.id || item.name) === id);
					if (member === void 0 || member.activity === "working") return;
					const key = member.id || member.name;
					const next = nextTravelForm(member.level ?? 0, travelForm(member));
					mountOverride.set(key, next === "walk" ? "off" : next);
				},
				setMount(id, form, variant, label) {
					mountOverride.set(id, form);
					if (variant !== void 0) mountVariant.set(id, variant);
					if (label !== void 0) equipFlash.set(id, {
						at: nowMs(),
						text: label,
						kind: "mount"
					});
					startCast(id, 950);
					jumps.set(id, -1);
				},
				setEquip(id, kind, tier, itemId, label) {
					if (kind === "weapon") weaponEquip.set(id, {
						tier,
						itemId,
						label
					});
					else skillEquip.set(id, tier);
					if (label !== void 0) equipFlash.set(id, {
						at: nowMs(),
						text: label,
						kind
					});
					startCast(id, 950);
					jumps.set(id, -1);
				},
				dispose() {
					disposed = true;
					if (raf !== void 0) window.cancelAnimationFrame(raf);
					raf = void 0;
				}
			};
		}
		//#endregion
		//#region \0dsh-css:F:\MyApp\eternal\dsh-pixel-team\src\client\pixel-office\PixelOffice.module.css.mjs
		const css$11 = ".qx4tCG_office{box-sizing:border-box;flex-direction:column;flex:auto;height:100%;min-height:0;max-height:min(640px,100%);padding:0;display:flex}.qx4tCG_canvasHost{background:#1c2320;border-radius:10px;flex:auto;min-height:160px;position:relative;overflow:hidden}.qx4tCG_canvas{display:block;position:absolute;inset:0}.qx4tCG_srOnly{clip:rect(0 0 0 0);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.qx4tCG_tooltip{z-index:2;border:1px solid var(--dsw-alias-border-strong,#a0b0c880);color:#e8eef8;pointer-events:none;background:#12161ef2;border-radius:8px;flex-direction:column;gap:1px;min-width:90px;max-width:210px;padding:5px 8px;font-size:10px;line-height:1.45;display:flex;position:absolute;transform:translate(-50%,-118%);box-shadow:0 4px 14px #00000059}.qx4tCG_tooltip[data-placement=below]{transform:translate(-50%,16%)}.qx4tCG_tooltip strong{font-size:11px}.qx4tCG_tooltip span{opacity:.8;overflow-wrap:anywhere}.qx4tCG_tooltip span[data-activity=working]{color:#67d9a5}.qx4tCG_tooltip span[data-activity=idle]{color:#9fb0c8}.qx4tCG_rail{z-index:3;clip-path:inset(50%);pointer-events:none;white-space:nowrap;border:0;gap:3px;width:1px;height:1px;padding:0;display:flex;position:absolute;top:6px;right:6px;overflow:hidden}.qx4tCG_rail:focus-within{clip-path:none;pointer-events:auto;background:#12161aeb;border:1px solid #a0b0c859;border-radius:8px;width:auto;height:auto;padding:3px;overflow:visible;box-shadow:0 4px 14px #00000059}.qx4tCG_railButton{color:#d8c48a;background:0 0;border:1px solid #0000;border-radius:5px;place-items:center;width:20px;height:20px;padding:0;font-size:11px;line-height:1;display:inline-grid}.qx4tCG_railButton:hover{color:#ffe9a8;background:#d4af371f;border-color:#d4af378c}.qx4tCG_railButton[aria-pressed=true]{color:#241a08;background:#d4af37;border-color:#ffe9a8}.qx4tCG_railButton:focus-visible{outline-offset:1px;outline:2px solid #d4af37}.qx4tCG_office{max-height:100%}";
		const tagId$11 = "dsh-pixel-team/PixelOffice.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$11) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-pixel-team";
			tag.dataset.pluginCss = tagId$11;
			tag.textContent = css$11;
			document.head.appendChild(tag);
		}
		var PixelOffice_module_css_default = {
			"canvas": "qx4tCG_canvas",
			"canvasHost": "qx4tCG_canvasHost",
			"office": "qx4tCG_office",
			"rail": "qx4tCG_rail",
			"railButton": "qx4tCG_railButton",
			"srOnly": "qx4tCG_srOnly",
			"tooltip": "qx4tCG_tooltip"
		};
		//#endregion
		//#region lib/client/pixel-office/PixelOffice.js
		/** Pixel-office view of one AgentTeams snapshot, driven by the shared activity model. */
		const FACILITY_LABEL = {
			teams: "office.facility.teams",
			board: "office.facility.board",
			ranks: "office.facility.ranks",
			config: "office.facility.config",
			gear: "office.facility.gear",
			about: "office.facility.about",
			inbox: "office.facility.inbox"
		};
		const FACILITY_HINT = {
			teams: "office.action.teamsHint",
			board: "office.action.boardHint",
			ranks: "office.action.ranksHint",
			config: "office.action.configHint",
			gear: "office.action.gearHint",
			about: "office.action.aboutHint",
			inbox: "office.action.inboxHint"
		};
		/** Single-character rail glyphs keep the floating toolbar tiny. */
		const FACILITY_GLYPH = {
			teams: "山",
			board: "碑",
			ranks: "榜",
			config: "经",
			gear: "阁",
			about: "志",
			inbox: "信"
		};
		const ALL_ACTIONS = FACILITY_ORDER;
		/** 闲置修士的随机闲聊：短句、与任务无关，按角色口吻写。 */
		const CHATTER_KEYS = [
			"office.chatter.1",
			"office.chatter.2",
			"office.chatter.3",
			"office.chatter.4",
			"office.chatter.5",
			"office.chatter.6",
			"office.chatter.7",
			"office.chatter.8"
		];
		function sceneLabel(activity, t) {
			if (activity === "working") return t("office.working");
			if (activity === "unknown") return t("office.unknown");
			return t("office.idle");
		}
		function PixelOffice({ team, t, onOpenMember, onOpenCaptain, onOpenCharacter, viewingSessionId, onUnavailable, onAction, activeAction, enabledActions, onSettings, settingsOpen, teamless }) {
			const canvasRef = (0, react.useRef)(null);
			const hostRef = (0, react.useRef)(null);
			const sceneRef = (0, react.useRef)(null);
			const clickTimer = (0, react.useRef)(void 0);
			const cultivationVersion = useCultivationVersion();
			const [hover, setHover] = (0, react.useState)();
			const actions = enabledActions ?? ALL_ACTIONS;
			const labelFor = (action) => action === "teams" && teamless === true ? t("quickstart.entry") : t(FACILITY_LABEL[action]);
			const hintFor = (action) => action === "teams" && teamless === true ? t("quickstart.entryTitle") : t(FACILITY_HINT[action]);
			const live = (0, react.useMemo)(() => team.members.filter((member) => member.status !== "removed"), [team.members]);
			const done = team.tasks.filter((task) => task.status === "completed").length;
			const running = team.tasks.filter((task) => task.state === "running").length;
			const waiting = team.tasks.filter((task) => task.state === "blocked").length;
			const failed = team.tasks.filter((task) => task.status === "failed").length;
			const model = (0, react.useMemo)(() => {
				const allCompleted = team.tasks.length > 0 && team.tasks.every((task) => task.status === "completed");
				const captainCultivation = cultivationFromXp(xpOf(captainKey(team.name)));
				const captainActive = team.phase === "running" && team.halted !== true && !allCompleted && team.tasks.some((task) => task.status === "pending" || task.status === "claimed" || task.status === "in_progress");
				const members = [{
					id: team.captainSessionId,
					name: t("office.captain"),
					role: "captain",
					activity: captainActive ? "working" : "idle",
					unread: team.captainInbox.length,
					isLeader: true,
					viewing: viewingSessionId !== void 0 && viewingSessionId === team.captainSessionId,
					level: captainCultivation.level,
					realm: t(captainCultivation.rankKey),
					xp: captainCultivation.xp,
					xpRatio: captainCultivation.ratio
				}, ...live.map((member) => {
					const cultivation = cultivationFromXp(xpOf(memberKey(member.name)));
					return {
						id: member.id,
						name: member.name,
						role: member.role,
						activity: member.activity,
						currentTask: member.currentTask,
						progress: member.progress,
						done: member.done,
						total: member.total,
						model: member.model,
						unread: member.unread,
						viewing: viewingSessionId !== void 0 && viewingSessionId === member.id,
						level: cultivation.level,
						realm: t(cultivation.rankKey),
						xp: cultivation.xp,
						xpRatio: cultivation.ratio
					};
				})];
				const facilities = onAction === void 0 ? [] : actions.map((action) => ({
					action,
					label: labelFor(action),
					badge: action === "inbox" ? team.captainInbox.length : void 0
				}));
				return {
					teamName: team.name,
					phase: team.phase,
					halted: team.halted,
					members,
					activeAction: activeAction ?? void 0,
					facilities,
					sceneObjects: {
						settings: onSettings !== void 0,
						settingsActive: settingsOpen === true
					},
					sceneLabels: { settings: t("office.floorSettings") },
					chatter: CHATTER_KEYS.map((key) => t(key)),
					labels: {
						captain: t("office.captain"),
						stalled: t("office.stalled"),
						awaiting: t("office.awaiting"),
						empty: t("office.empty"),
						working: t("office.working"),
						idle: t("office.idle"),
						unknownState: t("office.unknown"),
						viewing: t("office.viewingState"),
						levelUp: t("office.levelUp")
					},
					wall: {
						title: t("progress.title"),
						doneCount: done,
						total: team.tasks.length,
						runningCount: running,
						waitingCount: waiting,
						failedCount: failed
					}
				};
			}, [
				actions,
				activeAction,
				cultivationVersion,
				done,
				failed,
				live,
				onAction,
				onSettings,
				running,
				settingsOpen,
				t,
				team,
				teamless,
				waiting
			]);
			(0, react.useEffect)(() => {
				const canvas = canvasRef.current;
				const host = hostRef.current;
				if (canvas === null || host === null) return;
				const scene = createPixelScene(canvas);
				sceneRef.current = scene;
				const measure = () => {
					const rect = host.getBoundingClientRect();
					scene.resize(rect.width, rect.height);
				};
				measure();
				const observer = typeof ResizeObserver === "undefined" ? void 0 : new ResizeObserver(measure);
				observer?.observe(host);
				if (observer === void 0) window.addEventListener("resize", measure);
				return () => {
					observer?.disconnect();
					window.removeEventListener("resize", measure);
					scene.dispose();
					sceneRef.current = null;
					if (clickTimer.current !== void 0) window.clearTimeout(clickTimer.current);
				};
			}, []);
			(0, react.useEffect)(() => {
				sceneRef.current?.render(model);
			}, [model]);
			(0, react.useEffect)(() => {
				const onMount = (event) => {
					const detail = event.detail;
					if (detail?.id !== void 0 && detail.form !== void 0) sceneRef.current?.setMount(detail.id, detail.form, detail.mountId, detail.label);
				};
				window.addEventListener("agent-teams:mount", onMount);
				return () => {
					window.removeEventListener("agent-teams:mount", onMount);
				};
			}, []);
			(0, react.useEffect)(() => {
				const onEquip = (event) => {
					const detail = event.detail;
					if (detail?.id !== void 0 && detail.kind !== void 0 && detail.tier !== void 0) sceneRef.current?.setEquip(detail.id, detail.kind, detail.tier, detail.itemId, detail.label);
				};
				window.addEventListener("agent-teams:equip", onEquip);
				return () => {
					window.removeEventListener("agent-teams:equip", onEquip);
				};
			}, []);
			const sceneMembers = (0, react.useMemo)(() => new Map(model.members.map((member) => [member.id, member])), [model]);
			const hitAt = (event) => {
				const canvas = canvasRef.current;
				if (canvas === null) return void 0;
				const rect = canvas.getBoundingClientRect();
				return sceneRef.current?.hitTest(event.clientX - rect.left, event.clientY - rect.top);
			};
			const onPointerMove = (event) => {
				const rawHit = hitAt(event);
				const hit = rawHit?.kind === "level" ? {
					kind: "member",
					id: rawHit.id
				} : rawHit;
				sceneRef.current?.setHover(hit);
				const canvas = canvasRef.current;
				if (hit === void 0) {
					if (hover !== void 0) setHover(void 0);
					if (canvas !== null) canvas.style.cursor = "default";
					return;
				}
				if (canvas !== null) canvas.style.cursor = "pointer";
				const rect = event.currentTarget.getBoundingClientRect();
				const x = Math.max(110, Math.min(event.clientX - rect.left, Math.max(110, rect.width - 110)));
				const y = event.clientY - rect.top;
				if (hit.kind === "action") {
					setHover({
						kind: "action",
						action: hit.action,
						label: labelFor(hit.action),
						hint: hintFor(hit.action),
						x,
						y
					});
					return;
				}
				if (hit.kind === "settings") {
					setHover({
						kind: "settings",
						label: t("office.floorSettings"),
						hint: t("office.scene.settingsHint"),
						x,
						y
					});
					return;
				}
				const member = sceneMembers.get(hit.id);
				if (member === void 0) return;
				setHover({
					kind: "member",
					name: member.name,
					role: member.role,
					activity: member.activity,
					realm: member.isLeader === true ? `Lv.${cultivationFromXp(xpOf(captainKey(team.name))).level} ${t(cultivationFromXp(xpOf(captainKey(team.name))).rankKey)}` : `Lv.${cultivationFromXp(xpOf(memberKey(member.name))).level} ${t(cultivationFromXp(xpOf(memberKey(member.name))).rankKey)}`,
					task: member.currentTask ?? "",
					x,
					y
				});
			};
			const onPointerLeave = () => {
				setHover(void 0);
				sceneRef.current?.setHover(void 0);
				if (canvasRef.current !== null) canvasRef.current.style.cursor = "default";
			};
			const onClick = (event) => {
				const hit = hitAt(event);
				if (hit === void 0) return;
				if (hit.kind === "level") {
					onOpenCharacter?.(hit.id);
					return;
				}
				if (hit.kind === "action") {
					onAction?.(hit.action);
					return;
				}
				if (hit.kind === "settings") {
					onSettings?.();
					return;
				}
				const member = sceneMembers.get(hit.id);
				if (member === void 0) return;
				if (event.detail >= 2) {
					if (clickTimer.current !== void 0) {
						window.clearTimeout(clickTimer.current);
						clickTimer.current = void 0;
					}
					if ((member.level ?? 0) >= 5 && member.activity !== "working") sceneRef.current?.cycleMount(member.id || member.name);
					else sceneRef.current?.jump(member.id || member.name);
					return;
				}
				if (clickTimer.current !== void 0) window.clearTimeout(clickTimer.current);
				clickTimer.current = window.setTimeout(() => {
					clickTimer.current = void 0;
					if (member.isLeader) {
						onOpenCaptain?.();
						return;
					}
					if (member.id === "") {
						if (onOpenCharacter !== void 0) onOpenCharacter(member.name);
						else onUnavailable?.(member.name);
						return;
					}
					onOpenMember?.(member.id);
				}, 240);
			};
			const statusLine = team.halted === true ? t("office.stalled") : team.phase === "staged" ? t("office.awaiting") : t("office.progress", {
				done,
				total: team.tasks.length
			});
			return (0, react_jsx_runtime.jsxs)("section", {
				className: PixelOffice_module_css_default.office,
				"data-pixel-office": true,
				"data-phase": team.phase,
				"data-halted": team.halted === true || void 0,
				"aria-label": t("office.sceneAria", { name: team.name }),
				children: [(0, react_jsx_runtime.jsxs)("span", {
					className: PixelOffice_module_css_default.srOnly,
					children: [
						statusLine,
						" · ",
						t("office.members", { count: live.length })
					]
				}), (0, react_jsx_runtime.jsxs)("div", {
					ref: hostRef,
					className: PixelOffice_module_css_default.canvasHost,
					children: [
						(0, react_jsx_runtime.jsx)("canvas", {
							ref: canvasRef,
							className: PixelOffice_module_css_default.canvas,
							role: "img",
							"aria-label": t("office.sceneAria", { name: team.name }),
							title: t("office.hint"),
							onPointerMove,
							onPointerLeave,
							onClick
						}),
						hover !== void 0 && (0, react_jsx_runtime.jsx)("div", {
							className: PixelOffice_module_css_default.tooltip,
							"data-placement": hover.kind === "member" ? "above" : "below",
							style: {
								left: hover.x,
								top: hover.y
							},
							role: "tooltip",
							children: hover.kind === "member" ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								(0, react_jsx_runtime.jsx)("strong", { children: hover.name }),
								(0, react_jsx_runtime.jsx)("span", { children: hover.role === "captain" ? hover.realm : `${roleLabel(hover.role, hover.name, t)} · ${hover.realm}` }),
								(0, react_jsx_runtime.jsxs)("span", {
									"data-activity": hover.activity,
									children: [sceneLabel(hover.activity, t), hover.task === "" ? "" : ` · ${hover.task}`]
								})
							] }) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("strong", { children: hover.label }), (0, react_jsx_runtime.jsx)("span", { children: hover.hint })] })
						}),
						onAction !== void 0 && actions.length > 0 && (0, react_jsx_runtime.jsx)("div", {
							className: PixelOffice_module_css_default.rail,
							role: "toolbar",
							"aria-label": t("office.rail"),
							"data-office-rail": true,
							children: actions.map((action) => (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: PixelOffice_module_css_default.railButton,
								"data-control": `office-${action}`,
								"aria-pressed": activeAction === action,
								"aria-label": labelFor(action),
								title: `${labelFor(action)} · ${hintFor(action)}`,
								onClick: () => {
									onAction(action);
								},
								children: (0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: FACILITY_GLYPH[action]
								})
							}, action))
						})
					]
				})]
			});
		}
		//#endregion
		//#region lib/client/session-navigation.js
		/** Version-tolerant navigation into durable AgentTeams member transcripts. */
		/** Newer sessions retain view ownership instead of publishing list.current. */
		function currentSessionId(state) {
			if ("current" in state) {
				const current = state.current;
				if (current === void 0) return void 0;
				return Object.values(state.byId).find((row) => row.id !== current && (row.retainedBy?.mainView ?? 0) > 0 && (row.parentId === current || row.origin === "subagent"))?.id ?? current;
			}
			const retained = Object.values(state.byId).filter((row) => (row.retainedBy?.mainView ?? 0) > 0);
			return (retained.find((row) => row.parentId !== void 0 || row.origin === "subagent") ?? retained[0])?.id;
		}
		/**
		* Return from a member transcript to the team's main conversation.
		* Falls back to the workspace navigator when the legacy `open` action is absent.
		*/
		function openAgentTeamCaptain(sessions, sessionId, layout, workspace) {
			if (sessions.open !== void 0) {
				sessions.open(sessionId);
				layout?.selectPanel?.(null);
				return;
			}
			if (workspace !== void 0) {
				workspace.openSession(sessionId);
				layout?.selectPanel?.(null);
				return;
			}
			throw new Error("Harness does not expose session navigation");
		}
		/**
		* Open one member's persisted transcript.
		*
		* Harness rc.8 intentionally removed cold subagents from the ordinary session
		* list. They must first be rediscovered in their parent's catalog, then opened
		* with the exact parent/child/mode address. Older runtimes have only `open()`;
		* the fallback preserves ordinary-session navigation. New layouts also select
		* the Conversation panel and cancel catalog refreshes superseded by navigation.
		*/
		async function openAgentTeamMember(sessions, parentSessionId, childSessionId, layout, workspace) {
			if (sessions.open === void 0 && workspace !== void 0) {
				workspace.openSession({
					parentSessionId,
					childSessionId,
					mode: "continuable"
				});
				return "subagent";
			}
			const navigation = layout?.beginNavigation?.();
			if (sessions.openSubagent === void 0 || sessions.refreshSubagents === void 0) {
				if (sessions.open === void 0) throw new Error("Harness does not expose session navigation");
				sessions.open(childSessionId);
				layout?.selectPanel?.(null);
				return "session";
			}
			await sessions.refreshSubagents(parentSessionId);
			if (navigation?.aborted) return "cancelled";
			const retained = sessions.subagentAddress?.(childSessionId);
			sessions.openSubagent(retained?.parentSessionId === parentSessionId ? retained : {
				parentSessionId,
				childSessionId,
				mode: "continuable"
			});
			layout?.selectPanel?.(null);
			return "subagent";
		}
		/** Compact `provider/model` route, or just the model when the provider is absent. */
		function memberRouteLabel(member) {
			if (member === void 0) return "";
			const provider = member.provider?.trim() ?? "";
			const model = member.model?.trim() ?? "";
			if (provider !== "" && model !== "") return `${provider}/${model}`;
			return model;
		}
		/**
		* Compact route shown on a running task. Prefer the task's own snapshot
		* field; fall back to the assignee member when older hosts omit it.
		*/
		function taskModelLabel(task, members) {
			const direct = task.model?.trim() ?? "";
			if (direct !== "") return direct;
			return memberRouteLabel(members.find((candidate) => candidate.name === task.assignee));
		}
		/** Short model id for tight DAG/chip surfaces (`openai/gpt-5.6-sol` → `gpt-5.6-sol`). */
		function compactModelLabel(route) {
			const trimmed = route.trim();
			if (trimmed === "") return "";
			const slash = trimmed.lastIndexOf("/");
			return slash === -1 ? trimmed : trimmed.slice(slash + 1);
		}
		/**
		* Latest terminal-task `updatedAt` owned by one member.
		* @param memberName - member whose owned tasks are scanned.
		* @param tasks - team tasks carrying durable `updatedAt` stamps.
		* @returns the newest terminal stamp, or undefined when the member owns none.
		*/
		function memberFinishedAt(memberName, tasks) {
			let latest;
			for (const task of tasks) {
				if (task.assignee !== memberName) continue;
				if (task.status !== "completed" && task.status !== "failed" && task.status !== "cancelled") continue;
				const stamp = task.updatedAt;
				if (typeof stamp !== "number" || !Number.isFinite(stamp)) continue;
				if (latest === void 0 || stamp > latest) latest = stamp;
			}
			return latest;
		}
		/** Whether a member still has live work (running activity or an open task). */
		function memberIsRunning(member, tasks) {
			if (member.activity === "working" || member.status === "working") return true;
			return tasks.some((task) => task.assignee === member.name && (task.status === "pending" || task.status === "claimed" || task.status === "in_progress"));
		}
		/**
		* Order the delegation member list for issue #192.
		*
		* Running members keep their incoming relative order and come first; finished
		* members follow sorted by finish time, newest first. Members without a
		* derivable finish time keep their incoming relative order after the stamped
		* ones, so an older host that omits stamps never reorders them randomly.
		* @param members - delegation roster in snapshot order.
		* @param tasks - team tasks carrying durable `updatedAt` stamps.
		* @returns the members in display order.
		*/
		function orderDelegationMembers(members, tasks) {
			const running = [];
			const finishedStamped = [];
			const finishedUnstamped = [];
			members.forEach((member, index) => {
				if (memberIsRunning(member, tasks)) {
					running.push({
						member,
						index
					});
					return;
				}
				const finishedAt = memberFinishedAt(member.name, tasks);
				if (finishedAt === void 0) finishedUnstamped.push({
					member,
					index
				});
				else finishedStamped.push({
					member,
					index,
					finishedAt
				});
			});
			finishedStamped.sort((left, right) => right.finishedAt - left.finishedAt || left.index - right.index);
			return [
				...running,
				...finishedStamped,
				...finishedUnstamped
			].map((entry) => entry.member);
		}
		/** Whether the captain chat should keep showing the in-progress banner. */
		function teamIsActive(team) {
			if (team.halted === true || team.phase === "staged") return false;
			if (team.members.some((member) => member.activity === "working" || member.status === "working")) return true;
			if (team.tasks.some((task) => task.status === "pending" || task.status === "claimed" || task.status === "in_progress")) return true;
			return team.members.length > 0 && team.tasks.length === 0;
		}
		/** Use a fill-width grid when the task graph has no real dependency edges. */
		function usesParallelTaskGrid(tasks) {
			if (tasks.length === 0) return false;
			const taskIds = new Set(tasks.map((task) => task.id));
			return tasks.every((task) => task.dependencies.every((dependency) => !taskIds.has(dependency)));
		}
		/**
		* Resolve the task whose dependency chain should be highlighted.
		*
		* A pinned task is an explicit user choice. Keyboard focus takes precedence
		* over delayed pointer intent so an older hover timer cannot steal the active
		* chain from someone navigating the task map with the keyboard.
		*/
		function dependencyFocusTaskId(pinnedTaskId, keyboardTaskId, hoverTaskId) {
			return pinnedTaskId ?? keyboardTaskId ?? hoverTaskId;
		}
		/** Group tasks by their precomputed dependency depth. */
		function taskStages(tasks) {
			const byDepth = /* @__PURE__ */ new Map();
			for (const task of tasks) {
				const depth = Number.isFinite(task.depth) ? Math.max(0, Math.floor(task.depth)) : 0;
				const stage = byDepth.get(depth) ?? [];
				stage.push(task);
				byDepth.set(depth, stage);
			}
			return [...byDepth.entries()].sort(([left], [right]) => left - right).map(([depth, stageTasks]) => ({
				depth,
				tasks: stageTasks.slice().sort((left, right) => left.id.localeCompare(right.id, "en", { numeric: true }))
			}));
		}
		/**
		* Lay tasks out as the reference panel's compact left-to-right DAG.
		*
		* Columns are dependency-depth stages. Rows are stable task-id order within
		* each stage. Edges use cubic curves so fan-in remains readable without
		* turning every task into a large card.
		*/
		function compactDagLayout(tasks, dimensions) {
			const nodeWidth = dimensions?.nodeWidth ?? 92;
			const nodeHeight = dimensions?.nodeHeight ?? 30;
			const columnGap = dimensions?.columnGap ?? 26;
			const rowGap = dimensions?.rowGap ?? 8;
			const vertical = dimensions?.direction === "vertical";
			const stages = taskStages(tasks);
			const widest = Math.max(1, ...stages.map((stage) => stage.tasks.length));
			const track = widest * nodeWidth + (widest - 1) * columnGap;
			const positions = /* @__PURE__ */ new Map();
			const nodes = [];
			for (const [index, stage] of stages.entries()) {
				if (!vertical) {
					for (const [row, task] of stage.tasks.entries()) {
						const x = index * (nodeWidth + columnGap);
						const y = row * (nodeHeight + rowGap);
						positions.set(task.id, {
							x,
							y
						});
						nodes.push({
							task,
							x,
							y
						});
					}
					continue;
				}
				const stageWidth = stage.tasks.length * nodeWidth + Math.max(0, stage.tasks.length - 1) * columnGap;
				for (const [row, task] of stage.tasks.entries()) {
					const x = (track - stageWidth) / 2 + row * (nodeWidth + columnGap);
					const y = index * (nodeHeight + rowGap);
					positions.set(task.id, {
						x,
						y
					});
					nodes.push({
						task,
						x,
						y
					});
				}
			}
			const edges = [];
			for (const task of tasks) {
				const target = positions.get(task.id);
				if (target === void 0) continue;
				for (const dependency of task.dependencies) {
					const source = positions.get(dependency);
					if (source === void 0) continue;
					if (vertical) {
						const x1 = source.x + nodeWidth / 2;
						const y1 = source.y + nodeHeight;
						const x2 = target.x + nodeWidth / 2;
						const y2 = target.y;
						edges.push({
							from: dependency,
							to: task.id,
							path: `M${x1} ${y1}C${x1} ${y1 + 18},${x2} ${y2 - 18},${x2} ${y2}`
						});
						continue;
					}
					const x1 = source.x + nodeWidth;
					const y1 = source.y + nodeHeight / 2;
					const x2 = target.x;
					const y2 = target.y + nodeHeight / 2;
					edges.push({
						from: dependency,
						to: task.id,
						path: `M${x1} ${y1}C${x1 + 14} ${y1},${x2 - 14} ${y2},${x2} ${y2}`
					});
				}
			}
			const rows = Math.max(1, ...stages.map((stage) => stage.tasks.length));
			return {
				width: stages.length === 0 ? 0 : vertical ? track : stages.length * nodeWidth + (stages.length - 1) * columnGap,
				height: stages.length === 0 ? 0 : vertical ? stages.length * nodeHeight + (stages.length - 1) * rowGap : rows * nodeHeight + (rows - 1) * rowGap,
				nodes,
				edges
			};
		}
		/**
		* Return the complete upstream/downstream chain around one task.
		*
		* Traversal uses both dependency directions and remains cycle-safe, so the UI
		* can highlight every handoff related to the focused task even if malformed
		* durable data contains a cycle.
		*/
		function relatedTaskIds(taskId, tasks) {
			const byId = new Map(tasks.map((task) => [task.id, task]));
			if (!byId.has(taskId)) return /* @__PURE__ */ new Set();
			const dependents = /* @__PURE__ */ new Map();
			for (const task of tasks) for (const dependency of task.dependencies) {
				const targets = dependents.get(dependency) ?? [];
				targets.push(task.id);
				dependents.set(dependency, targets);
			}
			const related = /* @__PURE__ */ new Set();
			const upstreamSeen = /* @__PURE__ */ new Set();
			const downstreamSeen = /* @__PURE__ */ new Set();
			const visitUpstream = (id) => {
				if (upstreamSeen.has(id)) return;
				upstreamSeen.add(id);
				related.add(id);
				for (const dependency of byId.get(id)?.dependencies ?? []) visitUpstream(dependency);
			};
			const visitDownstream = (id) => {
				if (downstreamSeen.has(id)) return;
				downstreamSeen.add(id);
				related.add(id);
				for (const dependent of dependents.get(id) ?? []) visitDownstream(dependent);
			};
			visitUpstream(taskId);
			visitDownstream(taskId);
			return related;
		}
		//#endregion
		//#region lib/client/activity-monitor.js
		/** Shared, demand-driven state for the AgentTeams browser monitor. */
		const targets = /* @__PURE__ */ new Map();
		const targetListeners = /* @__PURE__ */ new Set();
		const snapshotListeners = /* @__PURE__ */ new Set();
		let targetSnapshot = [];
		let activitySnapshots = {
			teams: [],
			archivedTeams: []
		};
		function targetKey(sessionId, teamId) {
			return `${sessionId}\u0000${teamId}`;
		}
		function publishTargets() {
			targetSnapshot = [...targets.values()].filter((target) => target.active).map(({ key, sessionId, teamId }) => ({
				key,
				sessionId,
				teamId
			}));
			for (const listener of targetListeners) listener();
		}
		/** Subscribe to the active monitor-target list (React external-store shape). */
		function subscribeActivityMonitorTargets(listener) {
			targetListeners.add(listener);
			return () => {
				targetListeners.delete(listener);
			};
		}
		/** Read the stable active-target snapshot. */
		function getActivityMonitorTargetsSnapshot() {
			return targetSnapshot;
		}
		/**
		* Register one successful AgentTeams card as a monitoring demand.
		*
		* The returned cleanup is reference-counted so multiple cards and React
		* StrictMode remounts cannot stop another card's monitor.
		*/
		function monitorAgentTeam(sessionId, teamId) {
			const owner = sessionId.trim();
			const id = teamId.trim();
			if (owner === "" || id === "") return () => {};
			const key = targetKey(owner, id);
			const existing = targets.get(key);
			if (existing === void 0) {
				targets.set(key, {
					key,
					sessionId: owner,
					teamId: id,
					refs: 1,
					active: true
				});
				publishTargets();
			} else {
				existing.refs += 1;
				if (!existing.active) {
					existing.active = true;
					publishTargets();
				}
			}
			let released = false;
			return () => {
				if (released) return;
				released = true;
				const current = targets.get(key);
				if (current === void 0) return;
				current.refs -= 1;
				if (current.refs <= 0) {
					targets.delete(key);
					if (current.active) publishTargets();
				}
			};
		}
		/** Stop polling targets whose final archived snapshot has been captured. */
		function settleActivityMonitorTargets(keys) {
			let changed = false;
			for (const key of keys) {
				const target = targets.get(key);
				if (target?.active !== true) continue;
				target.active = false;
				changed = true;
			}
			if (changed) publishTargets();
		}
		/** Subscribe to the shared live/archive snapshot. */
		function subscribeActivitySnapshots(listener) {
			snapshotListeners.add(listener);
			return () => {
				snapshotListeners.delete(listener);
			};
		}
		/** Read the stable shared live/archive snapshot. */
		function getActivitySnapshotsSnapshot() {
			return activitySnapshots;
		}
		/** Publish one or both successful state-route responses. */
		function updateActivitySnapshots(update) {
			const next = {
				teams: update.teams ?? activitySnapshots.teams,
				archivedTeams: update.archivedTeams ?? activitySnapshots.archivedTeams
			};
			if (next.teams === activitySnapshots.teams && next.archivedTeams === activitySnapshots.archivedTeams) return;
			activitySnapshots = next;
			for (const listener of snapshotListeners) listener();
		}
		/** Poll cadence for the live host snapshot route. */
		const ACTIVITY_POLL_MS = 1e3;
		/**
		* Low-frequency probe cadence while a cardless discovery session still owns
		* no team. The probe keeps the panel able to pick up a team created later in
		* that session (e.g. a run_code-wrapped agent_teams_create) without turning
		* every ordinary session into a one-second filesystem scan.
		*/
		const ACTIVITY_PROBE_MS = 5e3;
		/** Host route serving live and archived team snapshots. */
		const ACTIVITY_STATE_URL = "/plugins/dsh-pixel-team/state";
		const ACTIVITY_HALT_URL = "/plugins/dsh-pixel-team/halt";
		/** Host route that resumes a halted team (same path as the captain tool). */
		const ACTIVITY_RESUME_URL = "/plugins/dsh-pixel-team/resume";
		/** Host route that archives abandoned terminal teams. */
		const ACTIVITY_CLEANUP_URL = "/plugins/dsh-pixel-team/cleanup";
		/**
		* Start the single polling loop for the current session's requested targets.
		*
		* With neither targets nor a discovery session this is deliberately inert.
		* Explicit card targets poll at the live cadence from the start. A discovery
		* session performs an immediate live+archive restore pass, then — while it
		* still owns no team — probes on a low-frequency cadence, so a team created
		* later in that session (e.g. a run_code-wrapped agent_teams_create) is
		* discovered without a manual reload, without turning every ordinary session
		* into a one-second filesystem scan. The moment a team for the discovery
		* session appears, the controller upgrades to the live one-second cadence for
		* the rest of its lifetime. The caller — the session view, which stops the
		* controller when the session is no longer current — bounds the lifetime, and
		* archive state is refreshed when a target or a previously discovered live
		* team disappears.
		*/
		function startActivityPolling(monitorTargets, runtime = {}) {
			const discoverySessionId = runtime.discoverySessionId?.trim();
			if (monitorTargets.length === 0 && (discoverySessionId === void 0 || discoverySessionId === "")) return {
				firstTick: Promise.resolve(),
				stop: () => {}
			};
			const fetchState = runtime.fetchState ?? ((url, init) => fetch(url, init));
			const schedule = runtime.schedule ?? ((callback, intervalMs) => setInterval(callback, intervalMs));
			const cancel = runtime.cancel ?? ((timer) => {
				clearInterval(timer);
			});
			const publishSnapshots = runtime.publishSnapshots ?? updateActivitySnapshots;
			const settleTargets = runtime.settleTargets ?? settleActivityMonitorTargets;
			let cancelled = false;
			let inFlight = false;
			let hot = monitorTargets.length > 0;
			let discoveryComplete = false;
			let discoveredLiveKeys = /* @__PURE__ */ new Set();
			let controller;
			let timer;
			const intervalMs = () => hot ? ACTIVITY_POLL_MS : ACTIVITY_PROBE_MS;
			const reschedule = () => {
				cancel(timer);
				timer = schedule(() => {
					tick();
				}, intervalMs());
			};
			const tick = async () => {
				if (inFlight || cancelled) return;
				inFlight = true;
				controller = new AbortController();
				try {
					const liveResponse = await fetchState(ACTIVITY_STATE_URL, {
						cache: "no-store",
						signal: controller.signal
					});
					if (!liveResponse.ok) throw new Error("Activity unavailable");
					const body = await liveResponse.json();
					if (cancelled) return;
					if (!Array.isArray(body.teams)) throw new Error("Invalid activity response");
					runtime.onStatus?.("ready");
					const liveTeams = body.teams;
					publishSnapshots({ teams: liveTeams });
					const previousDiscoveredKeys = discoveredLiveKeys;
					discoveredLiveKeys = new Set(discoverySessionId === void 0 || discoverySessionId === "" ? [] : liveTeams.filter((team) => team.captainSessionId === discoverySessionId).map((team) => team.teamId));
					if (!hot && discoveredLiveKeys.size > 0) {
						hot = true;
						reschedule();
					}
					const discoveredTeamArchived = [...previousDiscoveredKeys].some((teamId) => !discoveredLiveKeys.has(teamId));
					const missing = monitorTargets.filter((target) => !liveTeams.some((team) => team.captainSessionId === target.sessionId && team.teamId === target.teamId));
					const needsDiscoveryArchive = discoverySessionId !== void 0 && discoverySessionId !== "" && !discoveryComplete;
					if (missing.length === 0 && !needsDiscoveryArchive && !discoveredTeamArchived) return;
					const archivedResponse = await fetchState(`${ACTIVITY_STATE_URL}?archived=1`, {
						cache: "no-store",
						signal: controller.signal
					});
					if (!archivedResponse.ok) throw new Error("Archive unavailable");
					const archivedBody = await archivedResponse.json();
					if (cancelled) return;
					if (!Array.isArray(archivedBody.teams)) throw new Error("Invalid archive response");
					publishSnapshots({ archivedTeams: archivedBody.teams });
					discoveryComplete = true;
					settleTargets(new Set(missing.map((target) => target.key)));
				} catch (error) {
					if (error?.name === "AbortError") return;
					if (!cancelled) runtime.onStatus?.("error");
				} finally {
					inFlight = false;
				}
			};
			const firstTick = tick();
			if (timer === void 0) timer = schedule(() => {
				tick();
			}, intervalMs());
			return {
				firstTick,
				stop: () => {
					if (cancelled) return;
					cancelled = true;
					controller?.abort();
					cancel(timer);
				}
			};
		}
		//#endregion
		//#region lib/client/art-data.js
		/**
		* Generated by scripts/gen-art-data.mjs from assets/agent-teams/*.png.
		* Base64 PNG payloads keyed by file name; artwork.ts wraps them as data URLs
		* so portraits render without a host asset round-trip.
		* APP_ICON_BASE64 comes from assets/app-icons and is not part of the portrait set.
		*/
		const ART_BASE64 = {
			"avatar-analyst.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACXklEQVR42u3dMU7DMAAF0NyBgQWJpRN0QOqMunGIigGJa3CCngQJCSEuwBGYmZlghIExrCSLa9kOif2+9McmafwGy03crqssx0cn/d+uTtdJHR+vEwAEAAFAJhnA2KYOeCyI2BphAAQAAUDKTNrmXiAAAAAAAAAAoAyAl/e+aAEAAAAAAAAAgGUAMAkEAAAAAAAAAAtBAAAAAAAAAADAcgF8vT7Oqm8P+0EBAAAAAAAAAAAAAAAAAAAAAACAcgBiF2JiB9hCEAAAAAAAAACYBJaYBE5dAAAAAAAAAKgVwPnqYtCf789BYwc4dLxYAKVfXAl1diAAAAAAAAAAIBOA8YCUnvSlAjjb3hYtAAAAAAAAAMwVQAhE6Ian9ulmN2ju44+/TwjAdrdPKgAAAAAAAADUAmBuP/7ENjeA/uN+UAAAAAAAAAAAoA0A488DAAAAAAAAwFIBlH4IMvdCTmoBAAAAAAAAoFUA4wu4vnuOauwNyt3YH2NCA9LcAyEAAAAAAAA0A2B8wtAFtwag+hdDAAAAAAAAAACAg1rdBhEAAAAAAAAAMBGAVCC5X8xIBdAtPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDxQ5Gxnfp6AQAAAAAAAAAAAAAAAAAAAADAQpCFIAAAAAAAAABYOoDQxoq1A4jdWBIAAAAAAAAAAAAAAAAAAAAAAGoC8d+bJjW3aRMAAAAAAAAAzBREqJebq6TO7Xxd6wEAAAAAAEAOBLJebZIaGoCpzycACAACgAAgAAgAAoDkWzhKHYDF/UEDAAAAAAAAAByWX9njq16X1Fn0AAAAAElFTkSuQmCC",
			"avatar-architect.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACWElEQVR42u3dsU3DQBQGYO9AQYOUJh2RQEpNiyKxARV1RqHJIEiIDRiBmhVokEhBCS12wfnpfM7Z/n7pLzmbvK84HcZpmpnl/Ozi52/Xq01Wu+s1AoAAIADIKAOMNnfgURDRmjAAAoAAIGU2bbUXCAAAAAAAAAAoA+DucAgVAAAAAAAAAACwCQQAAAAAAAAAAAAAAAAAAAAAAADqAvD19lxV358eWwUAAAAAAAAAAAAAAAAAAAAAAADKAYgexEQH7CAIAAAAAAAAAGwCS2wCxy4AAAAAAAAAzBXA5fq61e/jR6vRAafWiwJ4PX6etNWBAAAAAAAAAICBAHQHUnrTlwtgtdsVLQAAAAAAAADUCiAFIvWB5/bl4b7Vodfv/j4pAFEg0fUAAAAAAAAAYCoAavvjT7RRAKkB5v48AAAAAAAAAAAAAAAAAAAAAADUNPChO/RBTm4dBAEAAAAAALBUAN0biH7Bw9V+/29LP1SZun7uwGb/QAgAAAAAAACLAdC9YOqGlwZg9v8YAgAAAAAAAAAA9OrsXhABAAAAAAAAACMByAWSu/7QAJqpBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEZ+KDLase8XAAAAAAAAAAAAAAAAAAAAAAAcBDkIAgAAAAAAAICpA0i9WHHuAKIvlgQAAAAAAAAAAAAAAAAAAAAAgDmBOPVLkxb30iYAAAAAAAAAqBREqjfb26zWdr1m6QEAAAAAAEB6Atmst1lNDWDs6wkAAoAAIAAIAAKAACDDHRzlDmByX9AAAAAAAAAAAP3yC9P05ABrbM6tAAAAAElFTkSuQmCC",
			"avatar-auditor.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACfUlEQVR42u3dMUoDQRgG0L2DhSCpxE4LwTqt4BVSWXsCjyBeRRALC1vBIp1gpUfQMhaW2rpTOBlnJtndeR98lbA77P+KYRI3XTex7O7Mvn93tref1fB6nQAgAAgAspEBpjZ34KkgUmvCAAgAAoDU2bQNvUAAAAAAAAAAQB0Al5dXSQUAAAAAAAAAAGwCAQAAAAAAAAAAAIYCYPIfLgEAAAAAAADAmgBWz7eD6tvNda+5AMK/f78//NnRgwAAAAAAAACARgHEmgpgdJtGAAAAAAAAAPgngNSDmNQBlz4Iig20dgcHAgAAAAAAAAAa3QQ2N3AAAAAAAAAAqATg8OC416/Pj15TBxy7XnEAq6e8AgAAAAAAAECjAMKB1N70AQAAAAAAAAAAdUDEHvjQm/yFj9iAwwAAAAAAAADARAGkbtJeX5ZVm7qe4gBa2wQCAAAAAAAAQCUAd+eLXgEAAAAAAAAAgO0MPLe1N4Gl1wsAAAAAAAAArQAIF5T6Aw+LxcWfDR/A8vE+q+H1Yvefz8+S2vw/gwIAAAAAADBZAOECYg9k6gCae0EEAAAAAAAAAGwJQOmW3gSGLX3Q1PwmEAAAAAAAgGYA5ALJvX5pAN3YAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJWb++HPptcLAAAAAAAAAAAAAAAAAAAAAAAOghwEAQAAAAAAAMDYAcRerDh1AKkvlgQAAAAAAAAAAAAAAAAAAAAAgCmB2PZLk5p7aRMAAAAAAAAADBRErPOT06wO7X5d6wEAAAAAAEDWBHJ0cJLV2AA2fT8BQAAQAAQAAUAAEACk3MFR7gBG9wMNAAAAAAAAALBefgDXRJVaah6pnAAAAABJRU5ErkJggg==",
			"avatar-beastmaster.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACYElEQVR42u3dIU4DQRgG0L0DAkOCqWsFSTXBIdAEgUJzhB6hR+AKJASJ5gJojgCyCCRYdgKdDsMss7PvSz5FstPlf2Iyhd2uayz7ewcfXzs7XGQ1vF4nAAgAAoAMMsDU5g48FURqTRgAAUAAkDKbttoLBAAAAAAAAACUAXCzvkgqAAAAAAAAAABgEwgAAAAAAAAAAAAAAAAAAAAAAADUBWDzdFdVn2/XvQIAAAAAAAAAAAAAAAAAAAAAAADlAKQexKQO2EEQAAAAAAAAANgE2gQCAAAAAAAAQL0A5rOjXt/fXntNHXDsegAAAAAAAAAAQB0AwoGU3vQBAAAAAAAAAABlQMR+4bm9v7rsNfuaj6utBQAAAAAAAAAAdgNQ25c/0U1iIoDSBQAAAAAAAAAA6gAwdEYHAgAAAAAAgMkAKL0Jyj3YSV4vBuDlYdBWfxAFAAAAAADAZACEHyD1BQ+r65OtjQ0gt7nrxwZ2fjbvNfXnAAAAAAAAAFALgHDB8AbCTh1Ac5tAAAAAAAAAAADgXwBUt+sHAAAAAAAAgEIAcgdU+vqx+2/uj0IBAAAAAAAAAIBfAWjunz0BAAAAAAAAoFEAsfsDAAAAAAAAAACGae6XKUN/XgAAAAAAAAAAAAAAAAAAAAAAcBDkIAgAAAAAAAAAxg4g9qDF1gHE7h8AAAAAAAAAAAAAAAAAAAAAAFpK6sOVW+/kXiQJAAAAAACAdwn/ACLW4+VpVmtbr5t6AAAAAAAAkB2BLGbLrMYGMPR6AoAAIAAIAAKAACAAyN8dHOUOYPQPawYAAAAAAACA7/MJZTiXYs8KmpgAAAAASUVORK5CYII=",
			"avatar-captain.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACOklEQVR42u3dMU7DMBgG0NyBgSXqgDoBQ6UOTKwcgolz9Ag9AieohATchIWlRyhjGRjLSiKoaxxXbvw+6VuTpv8bLLeKm+bEc37W7n52t1llbf9+jQAgAAgAkmWgsQ0NcNm2exsLILYmDIAAIADI7wO/vJiNukAAAAAAAAAAQB4A2/UiqgAAAAAAAAAAgEUgAAAAAAAAAAAAAAAAAAAAAAAAUBaA7dtzUV0/LTsFAAAAAAAAAAAAAAAAAAAAAAAA8gGI/sNI5IBtBAEAAAAAAACARaBFIAAAAAAAAACUC+BqOuv06/Oj09gBh64HAAAAAAAAAACUAaA/kNyLPgAAAAAAAAAAIA+I0Bee2teH+06Hvr6BAwAAAAAAAMD/AJT2409sAQAAAAAAAAAAAAAAAAAABAD5e+BDd+iNnKELAAAAAAAAANUu8iIPeHh/udnb0MGQqQ3d/3ExiWp1IAAAAAAAAKgGQP8BQ19IbQBGDwIAAAAAAAAAAAAAAAAAAAAAADICSAWSen0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYHLU7jarpB778wIAAAAAAAAAAAAAAAAAAAAAgI0gG0EAAAAAAAAAcOoAgi9XHDmA6l4sCQAAAAAAAAAAAAAAAAAAAEDV5wv0HzD3Cx1Kb/VvCgUAAAAAAMD5AQf2dn6X1NLu19QeAAAAAAAA5EAg19N5UkMDOPb9BAABQAAQAAQAAUAAkOE2jlIH4HBoAAAAAAAARgrgG08Ac4m5U6lIAAAAAElFTkSuQmCC",
			"avatar-demon.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACqUlEQVR42u3dsWoUQRgH8HuHFMoRECRIOAWFdItilyJFBMurrH0CySPkEfIEAUFSpo0voIhNHiEpk8JyBSt3OG4cZ2ezs/v74F8dt7u3368Yvj1mF4uJ1aOd3fbv7C6fZiU83kIBoABQAKhBGpia3IangkiNDgOgAFAAqDKLtrEHCAAAAAAAAAAoA+Dk7fukPDSA2S8qAQAAAAAAAGCmi8CPL78npX130Un1IAAAAAAAAAAAAAAAAAAAAAAAYEvuvn0ZVa4/n3aSC6D9cdIJAAAAAAAAAAAwTQBh1s8uk1I9CAAAAAAAAAD4TwCpg5jUBg/9hxAAAAAAAAAAAMAi8E+Dg8EQAAAAAAAAAACwOc/3XnXy6/62k9QGx46XCyB2P46enG0NAAAAAAAAAACweVFWetEHAAAAAAAAAACUARG74bm5+LDupO/jpzYkBiAcDAEAAAAAAADAVAGM7eFPanIbEn6/efypEwAAAAAAAAAAAAAAAAAAAAAAqPlhUN/pe5Az9GbPAAAAAAAAADAVAOEFpr7gYb1qtuZnc1Q0sfO/Xu4nJRUMAAAAAAAAANQCILyg2A2pHUB7cz6qPDgIAAAAAAAAAJgJgLur41EFAAAAAAAAAOYCIBdI7vFTB0Gr5aqT8PeGn1f3cmkAAAAAAAAAAKAIgOr+8QMAAAAAAAAAAAAAAAAAAAAAAAXTnp1npfT1AQAAAAAAAAAAAAAAAAAAAACAQZBBEAAAAAAAAABMDUBsY8WpA/jaNL2muh1BAAAAAAAAAACAjQkHUQAAAAAAAABQK4AYiNIbOowts1sEAgAAAAAAAMA/gojlzcFhVsZ+vuo2gAAAAAAAAACAgYC82DvISuwGDn0+BYACQAGgAFAAKAAUAKq/wVFuAwxqAAAAAAAAmCiA3wAooKQrI06nAAAAAElFTkSuQmCC",
			"avatar-documenter.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACWElEQVR42u3dMU7DMBgG0NyBgYUJVQzAUKkbEisDB2BggpWj9CoIxBm4ADMbK4wgwVhWEipc4zh1nPdJ35qk/G+wnOI2TWXZ3dlb/ezh/jyp3es1AoAAIADIIAOMberAY0HE1oQBEAAEAMmzaCu9QAAAAAAAAABAHgB3y4uoAgAAAAAAAAAAFoEAAAAAAAAAAAAAAAAAAAAAAABAWQDen+6L6vPtslUAAAAAAAAAAAAAAAAAAAAAAAAgH4DYjZjYAdsIAgAAAAAAAACLQItAAAAAAAAAACgXwNFs3urXx1ursQMOXS8VwNAFAAAAAAAAgFoBdAeSe9EXC2D1+rjVFgcCAAAAAACAyQIIgQj9wVP7cHXZat/X736eX0P5fMlbAAAAAAAAABgpgNJe/sQWAAAAAAAAAAAAYB2A6/ODrAUAAAAAAACAsbwM6rt9b+Sk1iIQAAAAAACAqQLoPkDsDzwsb07+bO4vVITuH7som9wiEAAAAAAAgMkA6N4w9MBTA1D9IhAAAAAAAAAAAFgPoPZ/DAEAAAAAAACAgQCkAkm9furGTXUHRAAAAAAAAAAAAP8C0Iw9AAAAAAAAAAAAAAAAAAAAAAAwYFNfngz9vAAAAAAAAAAAAAAAAAAAAAAAYCPIRhAAAAAAAAAAjB1A6GDF2gHEHiwJAAAAAAAAAAAAAAAAAAAAAAA1gdj2gQl+zBkAAAAAAAAAygAR6uniLKml3a+ZegAAAAAAAJANgRzPFkkNDWDo+wkAAoAAIAAIAAKAACD9bRylDmB0hzMDAAAAAAAAwGb5BvWR4KznswYCAAAAAElFTkSuQmCC",
			"avatar-healer.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACdElEQVR42u3dvUrDUBgG4NyDg4uTdFKHQmdXL8LJO3H3ElxcBVEcvYsuDnZyE3QQqYKjgi4mFJOPk5Mm6fPCu5WTku8ZDvlpi2Jk2d7a+frbvd1pUqvrFQKAACAASCcDjDZ14FEQ0ZowAAKAACB5Nm19LxAAAAAAAAAAkAfA68dbqAAAAAAAAAAAgE0gAAAAAAAAAAAAwLoAtA2k9+AAAAAAAAAAoCGA5fymV11cnZWa+kBJNdEBtr0eAAAAAAAAAADQDYDH52Wp0U1j6noAAAAAAAAAMBQA0Qsx0QF3/WJJ3cCinwcAAAAAAAAAm8BxbAIBAAAAAAAAAIDV3Z9MS/18fyk1OuC69QAAAAAAAAAAgH4AqA4k96YPAAAAAAAAAADIA6LuhKf29uS41LbXjz7QAQAAAAAAAAAA/LZvN3+iBQAAAAAAAAAAAAAAAAAAAAAAAJq/3Jjati/k5C4AAAAAAAAAjBVA9QtE/+Bh/nD/b0/vzrO27vgX15ehAgAAAAAAAMBYAVQPWHdCNg1AtQAAAAAAAAAAAAAAAAAAAAAAAEBzAKlAUtdPBZD7ZtPar/wBAAAAAAAAAAA/zb1prdYmEAAAAAAAAACGCWCxfCoVAAAAAAAAAMYCoO1WT1i0ub+fTSAAAAAAAAAAbCYAN4MAAAAAAAAAwAMhqwAUQw8AAAAAAAAANPzhx7EDSP1hSQAAAAAAAAAAAAAAAAAAAAAAGDKIrh+I6FtHP3AAAAAAAAAAaAiiroezo6T27XjFpgcAAAAAAABpCORgMktq9I8ccx9PABAABAABQAAQAAQAae/CUeoABvcyJgAAAAAAAAA0yzcRMXZfy9YD3QAAAABJRU5ErkJggg==",
			"avatar-implementer.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACf0lEQVR42u3dPUoDQQAG0NzBwkawSaUphHSC2FlYWqZRsPMIHiGN5xBBgmewT6sXCGIlClrGwsZdMOMw+zO7+z74qsDOsvOKYZbMjkY9y/bWzvp3x7uTpJavNxIABAABQBqZwNimTngsiNhW/TwAAAAAAAAAwKKtGw1NYPn3clZvxXYeBAAAAAAAAABUBOD85iGqAAAAAAAAAACARWAXANw+rgoFAAAAAAAAAAAAAAAAAAAAAIA+A3hf3mfV57t5oQAAAAAAAAAAAAAAAAAAAAAAAEB9AGI3YmIn2EYQAAAAAAAAAFgEWgQCAAAAAAAAQL4A9scHhX59vBYaO8Gh6wEAAAAAAAAAAHkAKE9I3Ys+AAAAAAAAAACgHhChB57axcWs0KqvHztBAAAAAAAAAADAT3N7+RNbAAAAAAAAAAAAgCoA9O6gSAAAAAAAAAYLIPUjTKFWvZHTdGMBdO4jUwAAAAAAAAwGQPmGYj/wcHw139jly7rWhsbfO73c2PXnU6ttHQQAAAAAAACDAVAeMPSA+g6g7vsLFQAAAAAAAAAAaAdAqPPZYaGL67NCy79nvxEEAAAAAAAAAA0BSAWSev22AWT/tg8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgMEDqLqpL3+avl8AAAAAAAAAAAAAAAAAAAAAALARNJyNoM6f+AEAAAAAAAAAfwAIHazYdwCxB0u2/udOAAAAAAAAAACgFQC9OwwaAAAAAACAwQAIgWj70KTBHdoEAAAAAAAAAJmCCPVoepLU3MYbDT0AAAAAAADIP4FMxtOkhiag6fEEAAFAABAABAABQACQ6jaOUieg6fEEAAFAAGgo336jqEqZkYM3AAAAAElFTkSuQmCC",
			"avatar-monk.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAChElEQVR42u3dMUoDQRgG0L2DhY2VpFKLQDrB1sLC0sLK2t5L5BSWgiAeQU9g7RG01MIygli4K2Qyzs46O/s++DrZCTsv8DMm2aapLNtbO6uf3dudJ7V7vUYAEAAEABlkA2ObuuGxIGJrhwEQAAQAyTO0lV4gAAAAAAAAACAPgIflWVQBAAAAAAAAAABDIAAAAAAAAAAAAAAAAAAAAAAAAFAWgLenu6L6fLtsFQAAAAAAAAAAAAAAAAAAAAAAAMgHIPYgJnaDHQQBAAAAAAAAgCGwhCGwOkAAAAAAAAAA0BOA/dm81Y/311ZjNzh0vdwAun+/erlpdfQgAAAAAAAAAKAnAN0NyT30pQJIBTH6oREAAAAAAIDJAgi94NANT+39xXmrfV8/tOF9D3WjHxoBAAAAAAAA4Lul/fMntqEbnntDRj8EAgAAAAAAAEAlAPoe8qo/GQQAAAAAAKBaAKkPYQo190FObGMPZn69IR5P1zZ2fQAAAAAAAAD4rw2PfcDD9eXh2oZuUGpD61+dzKKaG0BxQyAAAAAAAACTAdBdMHRDpgYgFcTo3vEAAAAAAAAAAMBXq/9QKAAAAAAAAAAMBCAVSOr1hx4Ci/8ACAAAAAAAAAAA8CcA1X3ZEwAAAAAAAAAAGGQIBAAAAAAAAICxAOi73aEptkO/3uofCAEAAAAAAAAAAAAAAAAAAAAAAA6CAAAAAAAAAKB6AKEfVqwdQOqPSwMAAAAAAAAAAAAAAAAAAAAAwKhBZP5Bh9Jb/YYDAAAAAAAAwIYgQj1aHCe1tPWaqQcAAAAAAADZEMjBbJHU2C9f5l5PABAABAABQAAQAAQA6e/gqO8HMOReTwAQAASAgfIJFyB7pmkUm7oAAAAASUVORK5CYII=",
			"avatar-musician.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACdklEQVR42u3dLU4DQQAG0L0DAoMiVYBoUkeC5QBIDGgkkiPUcQE0CQnpAVBcoJoEiSAoAgJZLDsJTIfZ2U6770s+1+zPzBOT6Wa3aTYs21s7i5/d2x1nNTxeIwAIAAKA9DKBqc2d8FQQqTXDAAgAAoCUWbTVXiAAAAAAAAAAoAyA24fnpAIAAAAAAAAAABaBAAAAAAAAAAAAAAAAAAAAAAAAQF0T/jG/r6pPd9NWgQAAAAAAAAAAAAAAAAAAAAAAgHIASgOyMQQAAAAAAAAAFoEWgQAAAAAAAABQL4D90bjVr8+3VlMnOHY8AAAAAAAAAACgDgDhhJRe9AEAAAAAAAAAAGUAxAY8t7Pz01a7Pn5tAFYODgAAAAAAAACWBFDbnz9hX98XraY+UJL78unUhtcLAAAAAAAAAAB0A2B2dVJ1AQAAAAAAAGBdAOQuenI3clIXVdOLw6SeXV63Wvr3AAAAAAAAALAuAMIPPExvHv9seINdN3a+cMBtBAEAAAAAADBUAOEFpA5Q7QDCpt5f+PvSD2z0/kAIAAAAAAAAAPwCIHXAageQOuF9A1j5qh8AAAAAAAAACgHIBZJ7fAAAAAAAAAAA4H8Awo2f1I2gVQOI3R8AAAAAAAAAAAAAAAAAAAAAAABQrvOXRVb7vl4AAAAAAAAAAAAAAAAAAAAAALARZCMIAAAAAAAAANYdQOzFi5sOIHb/AAAAAAAAAAAAAAAAAAAAAACwSYm9uHBoHfzHowEAAAAAABgMgBiIWI8mx1mt7XzN0AMAAAAAAIAsCeRgNMlqbAL6Pp8AIAAIAAKAACAACADS3cZR7gT0fT4BQAAQAHrKN29LHY0NpljiAAAAAElFTkSuQmCC",
			"avatar-operator.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACaklEQVR42u3dsU3DQBQGYO9AQYNEk44USOmQUDoKBqBIRc0EzJBVkBAlW9DCCFCCBGVoKLCRYl7O55zt75f+1pfkfcXJuThVNbIcHhxtfnd2PE9q83qVACAACADSywCjTR14FES0JgyAACAASJ5NW+kFAgAAAAAAAADyAFjfXoUKAAAAAAAAAADYBAIAAAAAAAAAAAAAAAAAAAAAAABlAXh/ui+qL3frWnMfKBndgRQAAAAAAAAAmAiAzefzXlscCAAAAAAAAADYEUD0Rkx0wF3fCNq8PtYaPcASbXM9AAAAAAAAALAJ3NMmEAAAAAAAAAAAyALgZHZa69fHW63RAbddDwAAAAAAAAAAKANAcyC5N32pAPouAAAAAAAAAAzljGDbB57ah+tVrV1fv+tDnevV2dYO/kGVAAAAAAAAAPDT0r78iTZ1AKkABv9jUQAAAAAAAAAAAAAAAAAAAABGBSD3AxFKu5ETHRAAAAAAAAAAjAXAnzcUPOR4s1pube4DFW3rXy5PQm0bGAAAAAAAAAAMFUDzBbV9IFMD0AYCAAAAAAAAAAAAAAAAAAAAAAAA2L2pAwYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0gB03dQvf/p+vdFDooM7BQwAAAAAAAAAAOwEYHABAAAAAAAAADeCAAAAAAAAAGDSANoerDh2ALkfLAkAAAAAAAAAAAAAAAAAAAAAACWD2PefKfszZwAAAAAAAAAoA0RbzxcXSS1tvWrqAQAAAAAAQP4JZD5bJDX6w4vc6wkAAoAAIAAIAAKAACDd3ThKHUDf6wkAAoAA0FO+Affs3H9QV3p/AAAAAElFTkSuQmCC",
			"avatar-planner.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACdUlEQVR42u3doU7DQBwH4L4DAoMiKIZYMkFCQnBYJMmC4A3wPMKeAk9CeBMsvAACCQI5LL2Q3Y7rddf2+yU/2279f+Jy7bqmGVn29w7Wv3t8OM9qeLxGABAABADpZYCpzR14KojUmjAAAoAAIGUWbbUXCAAAAAAAAAAoA+D1fV20AAAAAAAAAADAMABYBAIAAAAAAACAjSAAAAAAAAAAAGC4AD5fnqrq2+Oq1VwAuQ+cDA4YAAAAAAAAAEwUQNiub15VDwIAAAAAAAAA/gkgdSMmdcB9/7AkHGCYXADVgQAAAAAAAACAiSwCSz+0mloAAAAAAAAAGAuA2dG81e+vj1ZTBxw73q4B3Nw9tAoAAAAAAAAAUwUQDqT0os8iEAAAAAAAAADKgIhd8Nw+3y5b7fr4tQ0cAAAAAAAAAIYCoLabP6ktPcDBbwQBAAAAAAAAAAAWgQAAAAAAAEz6ZlDXzd3I6frzAAAAAAAAAMBUAYQXJNzIiPXi6n5jS1+w2Plnp9cbCwAAAAAAAABTARAOPHaBxg6gbyA7f0EEAAAAAAAAAACwVWMDWy3PWh3cS6AAAAAAAAAAoBCAXCC5x981gOqf8AEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYPIAum7uzZ++Py8AAAAAAAAAAAAAAAAAAAAAANgIshEEAAAAAAAAAEMHEHux4tgBxL4/AAAAAAAAAAAAwF8DrX7gAAAAAAAAALAliNr/UKF0Bz9QAAAAAAAAAOgIRKzni8us1na+ZuoBAAAAAABAtgRycrTIaupGS+nzCQACgAAgAAgAAoAAIN1tHOUOoO/zCQACgADQU34A1vUgomUCJocAAAAASUVORK5CYII=",
			"avatar-poisoner.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACY0lEQVR42u3dIU7EQBQG4N4BgSHBrGMFyToSLAKFRiFWcZQ9AlcgIUhugcHg0EgQyMUgaMXOvkzbnXa+P/ndpl36PjEZYNo0M8vx0cn2fxeny6x2r9cIAAKAACCjDDDa3IFHQURrwgAIAAKADLNoK71AAAAAAAAAAMAwANabdagAAAAAAAAAAIBFIAAAAAAAAAAAAAAAAAAAAAAAAFAWgK/Xp6L6/rhpFQAAAAAAAAAAAAAAAAAAAAAAABgOQHQjJjpgG0EAAAAAAAAAYBFoEQgAAAAAAAAA5QI4W5y3+vP92Wp0wKnrAQAAAAAAAAAAZQDoDmToRR8AAAAAAAAAADAMiNQDz+3z3W2rfV8/d+DVHUQJAAAAAAAAAH8t7Zc/0UYH1P38y8cm1MmDAAAAAAAAAAAAAAAAAAAAAGDWAHJfwpRq3xs5YzcXQPEgAAAAAAAAqAZA9wtFX/BwfX+9s9EHFm3q/qubi1DHzsFBAAAAAAAAUA2A7g1TD6Q2AG/bh52Nfj5VAAAAAAAAAABgGgD6LgAAAAAAAADMFUAukNzrHxpA9+cBAAAAAAAAAADqAGARCAAAAAAAAAAAAAAAAAAAAMCUAPTd3Ac29vcd+h9NDv5XwAAAAAAAAAAAwF4AmqkHAAAAAAAAAGwEAQAAAAAAAEDVAFIHK84dQN8HSwIAAAAAAAAAAAAAAAAAAAAAwJRADH2gQ+mt7mXSAAAAAAAAVAsgBSLVy9VVVku7X1N7AAAAAAAAkD2BLBerrKYGMPb9BAABQAAQAAQAAUAAkP42jnIHMLkDGQAAAAAAAABgv/wCxkkHoS+iHpcAAAAASUVORK5CYII=",
			"avatar-puppeteer.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACb0lEQVR42u3dIU4DQRQG4N4BQUKqCA4EpJrgSOAIGNA9BZpwEBISwi3AQVDFoZEgkMWyK5i+zM52O/u95Ffd7LT7PjGdbmcnk8pqe2u6/Jvpzm5W2uebKAAUAAoA1UsDo8lteBRENLnXo+vjAQAAAAAAAKCWSdvQk2pQ+/XF23MjKWCp4wEAAAAAAACgVgDX89tQAAAAAAAAAAAAk0AAAAAAAAAAAAAAAAAAAAAAAABgWAC+Xh4Glff7m0YAAAAAAAAAAAAAAAAAAAAAAACAcgCiCzHRBlsIAgAAAAAAAACTwHVMAj9el1kBAAAAAAAAgLEA2N87bOTn+7ORaINT5+sbwMnRWSOp1wEAAAAAAABgLADaDSk96TMJBAAAAAAAAIAyIFIXPDePVxeNdH3+3I0eAQAAAAAAAGCsAIb240800UlfdJOraDbuWwEAAAAAAAAAAAAAAAAAAAAAVQHIfQhTKl0v5JQOAAAAAAAAANQKIPcDX57P/83T3aJoUuO3b8pMBQAAAAAAAABqBdAeMHVBxgYg+vkBAAAAAAAAAAAAAAAAAAAAAACA1ZPb4NIAon/0iP6RBAAAAAAAAAAAAAAAAAAAAAAAABgOgFSDc2+yXfsdQAAAAAAAAADQU3I3Wer7/W7cpk4AAAAAAAAAAAAAAAAAAAAAAGAhCAAAAAAAAAAACG78WDuA3I0lAQAAAAAAAAAAAAAAAAAAAABgk0GU3tBh6Km+4QAAAAAAAACwIohUjmenWRnaeJOxFwAAAAAAAGpFIAd7s6xEH+RYejwFgAJAAaAAUAAoABQAqruFo9wG9D2eAkABoADoqX4Bmg7VK5/BIh0AAAAASUVORK5CYII=",
			"avatar-researcher.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACeUlEQVR42u3dLU7EQBgG4N4BgUGRVYDYZBMcCQqLJFnFATgAhgtwCQ5AQrgJGoVHLgIJljaE6dfpLLPt8yavI/2ZecRk2HSaZmLZ3zv4+tmjw2VWu9drBAABQACQrUxgtLkTHgURrRkGQAAQAKTMoq32AgEAAAAAAAAAZQDcPNyGCgAAAAAAAAAAWAQCAAAAAAAAAAAAAAAAAAAAAAAAdU345uWpqr4+3rcKBAAAAAAAAAAAAAAAAAAAAAAAlANQGpCNIQAAAAAAAACwCLQIBAAAAAAAAIB6ARwvlq1+fry3Gp3g1PUAAAAAAAAAAIA6AHQnpPSiDwAAAAAAAAAAKAMgNeC5fb5etzr29QEAAAAAAAAAgGEAavvnz9g/KAEAAAAAAAAAAAD4DcDkDqQAAAAAAAAAgJ4Acg9pyt3IKX2IVfL5N2+hVg8CAAAAAAAAAHoOUPeAh8u79Z+NDli0qfufXp23GgUw9vNWBwIAAAAAAIDZAOg+QHSApg6g+/cAAAAAAAAAMBcA0QGrHUB0wgEAAAAAAAAAgHEA5ALJvT4AAAAAAAAAADAMQHfjJ7oR9N8AUu/X7bazdRAAAAAAAAAAAMCg9935RSEAAAAAAAAA9AQwdnMHrPTz5QKIvi8AAAAAAAAAADANABaBAAAAAAAA2AiyEQQAAAAAAAAANQNIfVhx6gBS75/7UarqPiQJAAAAAAAAAAAMAtDsegAAAAAAAJgtgBSI0h90qL2zPzQKAAAAAACA2QBIgUj1bHWR1dru18w9AAAAAAAASE8gJ4tVVqMHNZa+nwAgAAgAAoAAIAAIADLexlHuBOzcjzABAAAAAAAAoF++Ad0XVxvmlB99AAAAAElFTkSuQmCC",
			"avatar-reviewer.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACcElEQVR42u3drU7DUBgG4N4DgoRMkTkQZBMkJLOIXQFBoSbw3MSuhIQEENwAbo6EIOASQIJADksrOD2ctjtrnzd5bf++R3xpsq4oepbdndH6d0d7+0mtHq8QAAQAAUA6GWBsUwceCyK2JgyAACAASDtLW+4FAgAAAAAAAADaAbBYXEUVAAAAAAAAAACwBAIAAAAAAAAAAAAAAAAAAAAAAAB5Afh8us2qbzfLUgEAAAAAAAAAAAAAAAAAAAAAAID2AMS+iIkdsBdBAAAAAAAAAGAJtAQCAAAAAAAAQL4ADsZHpX5/fZQaO+DQ8VIBdF0AAAAAAAAA6CuA6kDaXvpiASwvTzba7EAAAAAAAAAwWAAhEKEHnnur9/Nyd1zq+v261VbPBwAAAAAAAADbAiB2SXt9XrXa2OsBAAAAAAAAAADyBHB/cV4qAAAAAAAAAACwmYGntu0lMPX6QgAmk1lSAQAAAAAAACBXANULiP2Dh/n87M9Wb3j1+JDU6vFC5w8NaPBLIAAAAAAAAIMBUD1h6AENHUDvlkAAAAAAAAAA2BCApmsJBAAAAAAAAIA8AaQCST1+10sgAAAAAAAAAADQDwCWQAAAAAAAAAAAAAAAAAAAAACGBKDppj7Apq9ncB+KBAAAAAAAAAAAarV3fxgBAAAAAAAAAF4E/QtAse0BAAAAAAAAgJoffuw7gNgPSwIAAAAAAAAAAAAAAAAAAAAAQJ9AtP1Bh9zb+4EDAAAAAAAAQE0Qoc6mp0nN7XzF0AMAAAAAAIDUBHI4niY1NICuzycACAACgAAgAAgAAoA09+IodQBb92NMAAAAAAAAAKiXH4ekDM0Hdeb8AAAAAElFTkSuQmCC",
			"avatar-talisman.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACeElEQVR42u3dsUoDMQAG4L6Dg4uTdBB1KHQriJuP4NDJ57hH8EkEQXwGcXES3BxcHRwr6FhX78DmYi4lzX0//GtyNN8Qcte7yaSy7O8drH/3+HCW1O54EwFAABAAZCsLGNvUBY8FEVsrDIAAIABInk1b6QUCAAAAAAAAAPIAeGouowoAAAAAAAAAANgEAgAAAAAAAAAAAAAAAAAAAAAAAGUBWD3fFdXX2+tWAQAAAAAAAAAAAHI8VFrdQ6kAAAAAAAAA8E8AsQcxsQuc+yBo9dpstcWBAAAAAAAAAICRbgJX74+trr/eBm13fAAAAAAAAACoFcDJdNbq9+dHq7ELHBoPAAAAAAAAAAAoA0B3QXJv+oYGMPjhDwAAAAAAAAAUCiAEIvSDp/b+atnq0OOHHtAY/SYQAAAAAAAAAP4AUNrNn9jGAojd5AEAAAAAAAAAAHUAsAkEAAAAAABgrM8DDN3cBzmpBQAAAAAAAICxAOheQOwHHm6Wi43N/efK0PzN+VFUQwAeFouoAgAAAAAAAEApALoThn4QADYD6F4PAAAAAAAAAABgEwgAAAAAAAAAYwaQCiR1/KEB7PzNIAAAAAAAAAAAoBeA3AUAAAAAAAAAAMoA0G11H40CAAAAAAAAgJ4Ahu76pUnqtq+3uo9LAwAAAAAAAAAAAAAAAAAAAACAgyAAAAAAAAAAGB2A0IsVawcQ+2JJAAAAAAAAAAAAAAAAAAAAAACoCkTmFzqU3uoXHAAAAAAAAAB6ggj1bH6R1NLmm4w9AAAAAAAASE8gp9N5UkMLsO35BAABQAAQAAQAAUAAkOEOjlIXYOdeygQAAAAAAAAA/fIDdHNMxdocQokAAAAASUVORK5CYII=",
			"avatar-tester.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACUElEQVR42u3dMU7DMBgG0NyBgQWJpVPpgNQZdeMQqANcp1dBIM7ABZh7BUYYGNuBhQSpruM4cZL3Sd+aRPnfYBmTVtXEcnlxdfjbxfUqqc3rVQKAACAASC8DjG3qwGNBxNaEARAABADJs2grvUAAAAAAAAAAQB4AL9ttVAEAAAAAAAAAAItAAAAAAAAAAAAAAAAAAAAAAAAAoCwAXx+vRXX/vKsVAAAAAAAAAAAAAAAAAAAAAAAAyAcgdiMmdsA2ggAAAAAAAADAItAiEAAAAAAAAADKBXCzuK315/uz1tgBh64HAAAAAAAAAACUAaA5kNyLPgAAAAAAAAAAIA+I0AtP7dvjQ61dX9/AAQAAAAAAAKAdgNL++BNbAAAAAAAAAAAAgCEKAAAAAAAAAGMZeNfteiMntX2neBAAAAAAAADMBkDzgWJ/4GG32ZzsYf+etaH7Py2XJ5t6oCX2wAsAAAAAAAAADAWg+QChFzQ1AKmHTgEAAAAAAAAAAAAAAAAAAAAAAID2TR1wbgCTO5QKAAAAAAAAADMFMDQIAAAAAAAAAACgDADNdr1RVfwJIAAAAAAAAADoqakvtPTnAwAAAAAAAAAAxgmg2cl9EAIAAAAAAAAAbAS1AlCNPQAAAAAAAABw5ocf534gBAAAAAAAAAAAAAAAAAAAAAAAppR/H0/O/EGH0ju7H5UCAAAAAABgtgBCIEK9W98ntbT7VXMPAAAAAAAAciaQ1WKd1NAA+r6fACAACAACgAAgAAgA0t3GUeoAJvfPmgAAAAAAAADwmyOKtUgQ1cfZOwAAAABJRU5ErkJggg==",
			"avatar-verifier.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACaklEQVR42u3dIU7EQBgG0L0DAoMiqwCxyWoEhhtgCIIb4DF4rkDCBUgIR+AGaC6AQC4CWSytYDo7M8u0877kUyRt6f9IJrNsu1jMLPt7B93vHh2ukjo83kIAEAAEANnJAGObOvBYELE1YQAEAAFAyizaai8QAAAAAAAAAFAGwMPda1QBAAAAAAAAAACLQAAAAAAAAAAAAAAAAAAAAAAAAKAuAJu356r6/nTfKwAAAAAAAAAAAAAAAAAAAAAAAFAOQOxGTOyAbQQBAAAAAAAAgEWgRSAAAAAAAAAA1AvgeLnq9fvrs9fYAYeOBwAAAAAAAAAA1AFgOJDSiz4AAAAAAAAAAKAMiNANT+3L9WWvuY9v4AAAAAAAAACwHYDaPvyJLQAAAAAAAAAAAMAYAKkvpJg8OAAAAAAAAJoBkPsXzr2RVPr6hv1477K2ehAAAAAAAAA0A2B4QbEveLi9evyzuW/gsKHzX5zdRDU3iMn9xQMAAAAAADBbAMMLCt2Q1gCEQKQC+HcQAAAAAAAAAADAqOa+3hAwAAAAAAAAAJgLgFQgqccHAAAAAAAAAAAA2Kbdput3mMHPAQAAAAAAAACAmQIIFAAAAAAAAADmAiB3c2+klC4AAAAAAAAAANAmgOY/DAIAAAAAAMD/AzS6EVT6ARSz/2IIAAAAAAAA1QIIPVhx7gCae7g0AAAAAAAAAAAAAAAAAAAAAE2/Y6j0w5Gn1uZeKgUAAAAAAECzAEIgQj1dnye1tvMtWg8AAAAAAAAyEsjJcp3U0AB2fT4BQAAQAAQAAUAAEAAk38ZR6gAm90UMAAAAAAAAABiXH33uEave71KKAAAAAElFTkSuQmCC",
			"avatar-writer.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACcElEQVR42u3dr07DQAAH4L4DAoMiUwOxZI4EcAgkAjGF5gkIj7DwJiRkb4LeK0yRIZAgoc1Ge7u7rX++X/JzS9vdfeJy69qi6FmOj06+/3Z8Oolq9XiFACAACACylwkMbeyEh4IIrRkGQAAQACTPoq3tBQIAAAAAAAAA8gB4erkPKgAAAAAAAAAAYBHYBQC922gCAAAAAAAAAAAajc98dlHq4vmu1M6BAAAAAAAAYDAAYid8/f7Wqi5f56WmBgEAAAAAAAAAAAAAAAAAAAAAAAD8NjegQ28MAQAAAAAAAAAAFoEAAAAAAAAAAMD2no0mpX59rkoNneC64wEAAAAAAAAAAO0AUJ2Q3Is+AAAAAAAAAAAgD4C6AY/t4mFWaurjAwAAAAAAAAAAuwFo248/qW8oAQAAAAAAAAAAAAAAAAAAAAAAANK9pCl2Iyf3S6wAAAAAAAAAAIBmL4CYPV7/24/1Mmvrzn91Oy4VAAAAAAAAAIYKoHpBoQPUdwDVz1fHK/Z6Dw4CAAAAAAAAALYACB2wtgMInXAAAAAAAAAAACANgFggsccHAAAAAAAAAAB2A1Dd+AndCDo0gLrvFwugGgAAAAAAAAAAYBgALAIBAAAAAADoK4DUjR3AfV9v7B9ROndTKAAAAAAAAAAAsBFA0fUAAAAAAAAAgI0gAAAAAAAAABg0gLoHK/YdQN33BwAAAAAAAAAAAAAAAAAAAACAPiX1TY9db+8nHAAAAAAAAAAagqjr5fQmqm07XzH0AAAAAAAAIA2BnI+mUQ19QUPu8wkAAoAAIAAIAAKAACDpNo5iJ6DzD2gAAAAAAAAAgM35Aa+CXD4hfNLYAAAAAElFTkSuQmCC",
			"state-idle.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACN0lEQVR42u3dPUoDQRgG4L2DhY1YiFUszAEEW9ELiI2CnZU3sDaNBxFEvEC8gbWdNxD0ANpYuCFkHCfLzs/zwtuZhOz3FB87K+m6wrO5sfX1u5Od6aBd/LxOABAABAAZZeBjAwACAAAAAAAAAOpY8iyJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkBeIj5eHUWvgAAAAAAAAAJAHgNf72cqGBhr7egAAAAAAAAAAIA8Ae7vTlQ0BiH09AAAAAAAAAADgRhAAAAAAgAAg+QJ4vDjrFQAAAAAAAAAAKBNA6PBm6AIAAAAAAAAAAP8bYOzf534jCAgAAAAAAAAAWD7Am7fnXkMX8PzuqdfDq1nWnRxf9to8CAAAAAAAAOwEf1wCWwdQPRgAAAAAAACaBRB7AVIBzD/fkzo0gNglGQAAAAAAAAAAqAOAJRAAAAAAAIBaAaReAIdBAAAAAAAAAFDmwBeXKodBAAAAAAAAAGAJXMcSGPrHjdSBxr7/ugEUDwgAAAAAAIBmAQx9GFQbgNQlGgAAAAAAAABKHXjtD4R4QggAAAAAAADPCC4fcKilHQaFvo8bPQAAAAAAALQKIPeBDl0AAAAAAAAAAAAAAAAAAAAAAGjpsAeAyn9wAgAAAAAAgGYALH6Bk+tbTWhxIAAAAAAAAADgp/tHp5pQAAAAAAAAAAAAAAAAAAAAAAAoCcD29EATCgAAAAAAAAC1PB+gca3+iSAFQAHQagGIiIiIiIiISDb5BvPJs7ehbTScAAAAAElFTkSuQmCC",
			"state-unknown.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABwUlEQVR42u3dsYkCURCA4e3B4JIFE/MLDAQTe7CBy23C3EKOywyugcMabMIqvMTEQRBZn2/W9/0wkbC47Bc9xrXrJEmSJEmSJEmSJEmSJEmSbvQx6c+m3AAAAAAAAABA1ge+Pf6ZgpMOBAAAAAAAAABcZrXZVJ3pfF50at8fAAAAAAAAAGQFUHviA5vMZoMmXs/BEAAAAAAAAK0CiF/g6/c71ZQGkO1+Xw4CAAAAAAAAAC7zuV6nmvjAzqefQROvl+1+AQAAAAAAAKAWgOwHQcf94mpi8fM42Q+CAAAAAAAAAKAUgLEtfd4D8OjE6zW3NAoAAAAAAAAASZY+H10KfTaA7PcPAAAAAAAAAK86F7AU6iQQAAAAAACANgFYCrUVDAAAAAAAgN8FZFwKPSyXg8ZSKAAAAAAAAACM8wURu74fNF4QAQAAAAAAAADjWBotDcDLogEAAAAAAAAg59JoaQBeFg0AAAAAAAAAOQ+G3n0ptMseAAAAAAAAzQKovURa+k+j3m7JEwAAAAAAAAAaXSK15AkAAAAAAAAAbS6RWvIEAAAAAAAAAEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSlLR/0uS0G42FsFEAAAAASUVORK5CYII=",
			"state-working.png": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABzElEQVR42u3dsY3CMBSAYXagoGEPJEahYRR6JgkVI0DBABQMQBWJCiQGgDopACtOcOzvl9yeuLyveAp3yWQiSZIkSZIkSZI04mbT+SvkuGIACAABoDwG3K5+fD5AAAAAAAAAAMA4Bt6ubwCAAAAAAAAAAEAeS+DuVDdO6M8DAgAAAAAAAAD+M/DQJTEUgCUQAAAAAAAAANIY+OZ6bJy+l0ATAEAACABZAgWAABAAGg+QvgEAAwAAAAAAAABlAAi9MWUiAAgAASBLoAAQAAJA+QAQAAJAAAgAASAABIDiDRAAAAAAAAAAAChj4IfnvXG6fjkDAAAAAAAAAABYAgEAAAAAAAAAgHyA9P3SKC+aBAAAAAAAAIA0Bv66VUmdrjeqgAIAAAAAAACA3y7YZb9I6oQ+UGJ9rj4eIAAAAAAAAMgFQOylJ/RGzXa1DDqxbwQBAAAAAAAAQCkA/v0LxwYw9usBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwLoP0AjK4PxAAAAAAAAAAAANIE8O3zZf8XQAAAAAAAABQLYOil5xuA9j92DA0g+wAAAAAAAFAiS4+HPgEAAAAAAACAJEmSJEmSJEkqsDf7T2pymSGI4QAAAABJRU5ErkJggg=="
		};
		const APP_ICON_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAT7klEQVR4nNVaeZBcR3nv7vf6HXNfu7Pn7Ep7SXvoXMm2DsuSsWQZ2xgfnMbG4GCHUA4JVSkghytlElIVIBCgioIEG8cOYK5g8CnLsmTrXEvalbSH9j5md+7rzbz7dXdq14EkQKU0thfi76+Znjfv9e/1d/y+A25ofz94JwsC73BB4B0u/Krdmf3WCnxHAGAchyBEjgPZypaXcTCAEOAQpYxS+sby/0cAjOewTVCxVLZt0+s1OMQogxACCIFpooomy5LLJQscRx3Hebtg8G/XWydEyOZTPnfh5v3httZgfy/fEFvnmLptm5IojI2NnxvRzl9cujQGDCMQCAYQJISSFcVCv0vfrlTgW3ajjOexomg8t/DRe9re++72tTE/qaTnxy8by8IoQ4yURY+nPhqGmJtN0588U/zliwXHrmv2Iw7ghEkQ4t80hrcIgHE8zudLO/pzDz98Q1erOzFy9tLowoWx9MisVtaJxERRwBWi+SRubYOru83f2ebr2rZ9eNr5h7893AAP9K7tfPTYszkHvWmNeisAGMfhUql4YB/58lfuIqnT5wZGj76+9OKQqtg+wV+TArB7camczQ+2h9dFgqii8ZXcvg3ud++p793Ui0Mdj33pzPjF2GByPmcB+PsHwHGwXHY29y7+++P36EsDr5xI/PNTgxm7ftPOrZinQ6Mze7f4t8SXVEU74uNnVHdjW4uatcZPjqyvLT94e8/mTkGqaf7IA0dHZzu9HrzinX5/gYxBSB2Hk8Tk5/5sU2Xi0PGTc49870xN201/cv9DLhd3cmjw6o6aa+vBD5+bfXW4fEc371GSl4eGOb507/0fLOLev3vi7OlzeTM19ZmHOjCKU4YhpG/ODKoGACFACCMkVyrKrp2u7nrj4lj+i08MR2K7dvT3PX7i0YXFOED81nb4H88sHSlt+PFU7OIE1xJkxZyeXEidnDx67a6teavp8ZfnLl5IbWgwr9pmK+USx0kQ8hCuMgAIgW0DVU3adtIB+Tuu98fHxw6dyc1UPH0t/a8MnQQMKppWtz7y6vHXr9/nu7Vx/gNdmVhb8OyU4guKpm5kUtmL5UF/jffsAj8wZU2NLd59kxfBed1Ia3rGcVC1GKqIAxACQoDkNj774JqWGvVbTy4cO5GZCQvDC8VQbS3mh/PpRL27qbWj8XT25IlF7JOntzYxHdCfHBlaVMWubk9x1gIlmFtUNjY4ZYW7GC9jwqW1Qt/m0AO3i4tL2W88iagTRIgxtgoAEIL5onXfjYqjJF4aTDzw/r6KE0hMzY0sqV0d1nXrFY5Vnj+/ZLdq7qAHhazHh3I7TVbIlV8Pyn0dIa2keaOeXNb8WNeaTvfM7ERxcCawe8v6HXXgFi9+5dUhUUZX9yovnPAHvPDKAVShQoxSl1t6/Wx2ciJR01ivKxk9PdzeTL/40CalYB+7BGGZplAiGU9rY2VC+Q4BPBh27wYsLHHQjZlDORlbHEGl4UvTeYpjn71/Z2c0q2UnldycKHBTU4XL00yW+CvffXUnwABEzFFY0/ZttYaS/vIPMm31Hq9E3NJSf4u4sxN84usLN99+9/mhs7plc5yhQvSzTHJGdEybENUhGGo5y+fgJ06kvnBnczafnL189HQGlQ0nUcjetzcQ2xoansHL/AkwdsVh4cpPgHGIU3Xt9gNyRCp990VzFvaeXdAeeF/nfCXkadq8kChin3+xNGmhSrA5xNdKAkYdsi9oIbDMeaCVq9SGamIdLSnVzlm+YEPz5VL4/vdtPDdfHrM6fnASRwL4joM+06lAyF25S61GhQCAiIRcZWpbtlx/dSfujgW+8vjA5npao49845lxwnMpa0kMeWzHSuTUGtP4zLrG24gLZvWMZvEht4roSHoKie5/OXQ5QpP9Nc7Xnzi1ubulr0FLA5cgcgGXCaHNGFxFNzo7PqYUjQBeYMXFD+1tjFfwX/04/je/SAj+UHdjOKp6YrK3PohbfXxr3jIrPMSogbMbQaWr1h9AlTWY610TJIB7+JnSwz+fTnLNf3Rjl5OL1/gqhommp+YpWaHgq2ADkDHCcd6ReW+s0bm6RVQcnqBQrXsctEbu2R7bXsczFJqeT7pFapd8WYG5YK6cLGcqakPQtT7QWMP8crCSY3xH1xqnNHV6nDyV9sdCll3Jd8f8DTXi6Ez5wowL837GqsgWqjFixgSezyt4Pp4t2P6aCHz1tYHnhs093eHNfm0p79eUgqrqGrY5nebKABpAyeiGTQnBpYqE7AqvlyURZzKEslBvXfFS1nzugu3TcxLHLaUrnF3IFiKYxwzYqwLgDU8K+ProGvHlV7LS/OLhcf2Pb1u/rRmMjqoU8ts286dHzJ+dzbh8mZxR+aCJSh4icLBcKjyTHgxKQnma3dPf0BLMHj1jSHL4zo2V80v0K0eVd3WIJkA3bvDZF/xV6U+1NgAZoAxaooAPbqu1Ibp1X9/+/j6FeJpj7QVF+97zI09ezKzbfA2I1IjYK5iOYuoMsbAFRV3iQ5FQLPrYxex3nhu1odna2iz4a27uce9pF7As39gfFgXRoWa1lK4KN4ogb9nKVX3lWr9/6tLU6SWrsb4uUyxdHnVcbjiiJZ7PwgP79qdgQrVKvFt8Nsj9sFAYdGhOQoZh66ZJMO3euvFYSZrTS16RXRwhsykWEMCRWTUxO7e2MbJrq2OaxRU3ugpGTJkjiYHTA8n5qeOH01Lz1iiAzsRIoa2Jz6bmsxa/aV2joVnZUirAsEOddHvg2YgCCMurIBSQPQJnOMDUjY6Qd66oWU6+KYTHJhmhoLWn5lDGqLx4aS7RxGMPY/TKAVQTBxgQBTifaj80W7dr93XMtm3TZkzI5Ja+eWxS8LrdCE1kJ2GZeGV0oM8NTHLd9o7ru2uxV7jjqlovsH3uutzkImWmHXF96fnRQinFQVFRLEBoQyz689HgfHq9JKCqqER1cYABgKC1vqdpz5YdNoaOMu0xu6eLXlty8YjaEEC10iRzw3FFBPwtm1tlp0yziXf11NcL9ELCihBT8lmKRHnItBr/TFEMCj3+oDudK4KA2dDk4SGtgoi+CQAr5wBNYjnURCWbAUnylxoaQ4AjfjlgQ1I2SUgiH9ve8Nq40kjVjZ37rt7/0fUe+acnFj+6Z32Pr5gzHSBjHvPMsGubmgR3hjqUM2hJssqQvImEptq6EEMAGY4xoU6KLtnQTFf9sJNFmkUMgRPNyoYmIW15QoXUzX0tu2/99Nb+HgDcc8Mn3f/2rXR68tkk3tISrRRKC5peymqsreLxJrQ5mzFkpMzlUl71SWWVJ7DMSIFeUdOZDFIYZFYmHtYrKqWIR5zKU2qbd3VILm9drO/dW/t7hl4/e+TlZ1safQf27Mo47geva+sQ1YJqKZoVrPdbmrq0FIaQGSaVqYdpFKz6CUDIKBNl5PMEbIdA4th6M0EJHvCmUinqymkLi7jYyJPu5mByZGiqlB2IDxWnL167eW27n702OPrCZVMUgeiWlkuOwIftDgYnPNgD3ZbN26AaGvdmbYAC7MJplOT9LncwgMOzhDFfxBdPx6/p2P70I4+IhMsqxuDxFy/Nz83wiZzHPFFIvH7yxPjMYnO088x3/3VLXQxBytuUAosPjGDEEUoqRpmj8PdUlTAtYmka01UuEK2p1V2ykF5Mr69vf/hjH/FHaKx1c7qi/fTURNxPXjpzauj4WK6GffnlM7yn5a7bPr6kjd52Qz9UQaGkYd5qqMtKLlGnRou7OeDxE0aq1aKqi7sMMAFgrz+g6tNGxcgUI2XlsguhW/ZufuHsoXMT8f4mH2PRrv07Dg+dafc1ZVDu8oU5YW1Nb7j/1PjhJ08MrGmI3LK17dvPnSfQPT3t081hQeIj0fq5C/llIsRWGQBkgImIi/LExdtKQuS2YDJ2zZaac+lZpUKHhxfHxsR91/akcNaYN0v1ZMHIeJFMmf3kwKFYoOXgmr2Hz57R6509m6K2ibHTZJrnOSpNF6a0iupGaPVVCCFLtVIjKQghL8gqN8GwdWGUsYHadqftkQc/0d3SmIvri0dLOETiA2rr0DqAnNR8dk1d2ydvPhj00c9/+GCjp2Ny3vTKliOnmMNRgOyiSSSuyiD2puIAgwwDLmR4x/Mm3xCQxRzVxLv3XLOuc11vp+vs0GgYkkNnZmO7azMnyT55b6Zc0i5qwFUWLefb3//e0Hz27n07v/npe77kJpPz0x5RlUQMdQgwEphUbRiuGgAEkBLi8fvCsXoxNGEBb6Q2OJ4tvzTwWlc7N3COZvLE7a/90PtiY+PqJv+al88er13jvu/2vW7f3myp8NKJ85/ccp1q5J56+fChs4PNQW9tSOAWiRtiZji2ZYnVh+IqE5qV2kRRKYxMjAhMBER3YUcWnLgLPK3lMHNFIqjLxq1BccdNTTnFyArRe+/a8a2XfnZicGJHY+zD79p1Oj9/vpj70bGJJHDWBX1uOWWYdgXikGIsk9DVpxIrvNqylnteqg4BHL3UqDt5RdXGhmfzOXXthqaBFHH/CMRas03Nm+6989rHf/7UicFpWgHxTvrtxIWUopi66eNQPKOpdcbYIoYcr1csvrkGxhVAVx8AQpBBjhBq27aSK/lIj8GmzJKRHsv3rm9NDqapy8Fra8u+FrNF+vx3HlMSjtvxbvtQ96SSOPb0kN8tqxVDCAjuGplpqq40m/YiZETXTaoBxFfNhqrzQggiTbMVy5LCEqGEF7BLAhAwmeNvv+ta2Mi37KhHBCWNuCGAkzNTpBviNt7d4pot5UZfnNm/vz/YEejc3SoxWIwrjDIZQ4yIHJGJRvJa2TRBteXpqqrTUNOtTRsJbvAMTau+sJuDJNw4f/5c2R8MTSWWzh8fDXqEgMdzDe4nl/0iLY+CkQU9vq6vdeZEpqO7aW5xYfjlYVck3NwehvOsouvR4LSTATzmimnnwLa6ylx6IVUv4OXk6Urf6RXvnyHIWbZyw27jL29vbSpm43FVKxmXJ8utDQ1mQV2YzAWwHEOt/Q3dYqeUXbeQtuJdVu9Oz47CZbVcLg0OjHooau2qi0VrU/MlH+Vaw/6lJM9hbnEsf3XQ94X7NnS1LJi2gWAVeoGqyollKfDYT1InTw1+6mC0TUSGzTq7Y2vr6j61o05NZEJNKKtlFA+65J3XmujG+9vi/ik9g/pQX5ezds/GflQjWBoOhKKSw/7yPVuDWG5qtFXd2tla99DN4uEXXzh2TnKJblpNTlxVfwBoGr12Z7c3NPPS8ZmNDWIqx4C1mFdCLiReVSsM5uRIGx6aPpue1YAH5bqKddf59IWsZQdaxNrJXFI5Wu5oa5uZWLy+VVbSSsHgIanYNtm9Tnz0x5O7Nnkbo8HJBShzbJUqc5DjgVaeSSRTr827Kg4sMyd8ab4zRhXTf0OPf7tFvvBcItgiBMWglkXD8ekLjHprXS5vtlQqIYc2Rdsvj0587r2t5cXk9KyJ+OT4fClBpWdP532eQHvO0o0Sh5ZL2Ve+K76qIMbzRq1f48TGr36mSea4r/70/NPnWTScx8C7kMUuhg/EAgUMvTGPjJlOWm2HEBsSQqRwmMdipZjxB+TcnJbMOwLPLeRzR9LcX7x/44HNnnQyMzg4HYsq8bQhCvKVV1b46miEgyfiwsG98jO/ODpdAA/d0jC8aAynrQ9coxVobbnAtwRhbwgQhzPLfhFGHYAYRoIkq2TJ70oRd6BSsYqaK1IjRsWlpwbtOw/s2t2G/vyRX+7ZFO5u4V445cW8a7WKuxBAizjvPbg2vzT0/YvCe3bWTyW0cklLYe/ITDrooxwGZYPiiiCKgFhmyVAoUxmDPHTpLOF2ZVSNqzi0JqCXUsaJmcSCzhfSC5kkH21tfnrcuqqL61mrHjlviZgnV+xHq1GhlWzAw5cBkGUvnpuY/MVhZ//u7rDHevTVfBOOU8RJEqJ42bMxx2AO4TDimWCaGhIEkuE5gUOMlUb15YaNWPdPH2/+7jOX/nHGDHv42toml4+JQp4xUp1rqW4wBeGXjoyJwN7ZFxxkzTRUv7WJjQ0v/emtPXff1JO1hLGyuCSIczacRt4lFJxQ5UUnWhbXLGpSGstJT3AgxTp7e//6wf3tbsPKJbc24zHTlQqs3btlTTFXjqc4nsNVkeoqZiVWRpdEVU/du3+sp0MYNzst6uGSp1+bZbyj71jnETzy3x9VGtp9TpbwlGMSqACTKk59c0smlbSZqRvOGpfna/dd9bXvPJ0wpfUNLrdL4KM9UU+xkcQPnSwcG+l3u8KEmFcOoAojJsS2zCXHth59NnDrjmRfxyWDcosV/cB6eU6JhGvFsfGkQxDVeI7jg3wkR4qOropYyOazhBIsYCaInKHl40ORxuDWGrdWyACgx/jhzFz2B6P01HBY5JcYUSQ5CuGVThBd+QlASgy1PEOZAZEfco5HWmIMOVRorLE71rg1VTs17DacMFj2IRzlGKQOAgJltkMrjDgcJ/Kci1DWVZ/oaecVlZy7jDF2O7bNAE1lHR5CBBgWgi5vC0LC2w5gmcwBBmy7QqnOcS5FSSLIcZxg2Kpp6QBQn9uHOYyxj8deYmuOo2ExQB1NVxMUMh67JanWMnNlvWw5zCVHXJIbcS4IISUmdTKIkzlO4rF7xQTYas0LLb+mlYYfXK5lrpwMtRgxlluwlCwP4kC0XH9khDH6XxeD5ZozhOiNIUYEGUI8x7lWOM8ya1i57I2mBquqOfCm6kK/euqvu7kQiQjJyyNQv7rk12B/9fXXH/57cWX36Ff3BAA4//tfqwbgdzxj2e05v+vX39j6b0P6nwL/sHOj8P9c/I1f387BVwTe4YL+0Bt4q/Kfkm+zU4H6g34AAAAASUVORK5CYII=";
		//#endregion
		//#region lib/client/artwork.js
		/**
		* Cultivation artwork lookup for the activity panel and the conversation card.
		*
		* The images are embedded as base64 data URLs (art-data.ts, generated by
		* scripts/gen-art-data.mjs) instead of fetched from the host asset route: a
		* running host keeps that route's allowlist in memory, so a rebuilt client used
		* to 404 on every portrait until the whole app restarted. Embedded art ships
		* with the client that renders it.
		*
		* Every built-in 道途 resolves by role id, so a quick-start roster never falls
		* back to a bare initial. Custom roles fall back to a keyword heuristic and,
		* failing that, to the caller's initial-letter badge.
		* @module dsh-agent-teams/client/artwork
		*/
		/** Inline data URL for one packaged artwork file ('' when the build missed it). */
		function art(file) {
			const base64 = ART_BASE64[file];
			return base64 === void 0 ? "" : `data:image/png;base64,${base64}`;
		}
		/** One portrait per built-in role id (the wire id, never the display name). */
		const ROLE_ART = {
			planner: "avatar-planner.png",
			implementer: "avatar-implementer.png",
			verifier: "avatar-verifier.png",
			reviewer: "avatar-reviewer.png",
			researcher: "avatar-researcher.png",
			analyst: "avatar-analyst.png",
			writer: "avatar-writer.png",
			auditor: "avatar-auditor.png",
			architect: "avatar-architect.png",
			tester: "avatar-tester.png",
			documenter: "avatar-documenter.png",
			operator: "avatar-operator.png",
			talisman: "avatar-talisman.png",
			healer: "avatar-healer.png",
			beastmaster: "avatar-beastmaster.png",
			puppeteer: "avatar-puppeteer.png",
			musician: "avatar-musician.png",
			poisoner: "avatar-poisoner.png",
			monk: "avatar-monk.png",
			demon: "avatar-demon.png"
		};
		/** Keyword fallback for custom roles, mapped onto the closest 道途 portrait. */
		const KEYWORD_ART = [
			[/数据|分析|推演|指标|analys|metric|data/, "avatar-analyst.png"],
			[/研究|调研|取证|探索|resear|investig|explor/, "avatar-researcher.png"],
			[/\bqa\b|质量|验证|校验|verif|quality/, "avatar-verifier.png"],
			[/测试|回归|test|regress/, "avatar-tester.png"],
			[/实现|开发|工程|代码|编程|engineer|implement|backend|\bapi\b|runtime/, "avatar-implementer.png"],
			[/架构|设计|边界|architect|design/, "avatar-architect.png"],
			[/审查|裁断|评审|review|judge/, "avatar-reviewer.png"],
			[/审计|巡查|安全|风险|audit|secur/, "avatar-auditor.png"],
			[/文档|撰写|写作|书记|docs|writer|spec/, "avatar-writer.png"],
			[/传道|示例|document|tutorial/, "avatar-documenter.png"],
			[/发布|构建|部署|运维|打包|release|build|deploy|\bops\b/, "avatar-operator.png"],
			[/规划|拆解|排程|plan|strateg/, "avatar-planner.png"]
		];
		/** Captain portrait (the sect leader). */
		const LEAD_ART = art("avatar-captain.png");
		/** New app icon (assets/app-icons, embedded as a 64px data URL). */
		const APP_ICON = `data:image/png;base64,${APP_ICON_BASE64}`;
		/** Status action artwork per member activity. */
		const ACTION_ART = {
			working: art("state-working.png"),
			idle: art("state-idle.png"),
			unknown: art("state-unknown.png")
		};
		/**
		* Member artwork URL, or null when no role matches (initial-letter fallback).
		* @param name - the member's display name.
		* @param role - the member's role text.
		* @returns the artwork data URL, or null when unmatched.
		*/
		function memberArtUrl(name, role) {
			const id = role.trim().toLowerCase();
			const exact = ROLE_ART[id];
			if (exact !== void 0) return art(exact);
			const identity = `${name} ${role}`.toLowerCase();
			for (const [pattern, file] of KEYWORD_ART) if (pattern.test(identity)) return art(file);
			return null;
		}
		//#endregion
		//#region \0dsh-css:F:\MyApp\eternal\dsh-pixel-team\src\client\AgentTeamsCard.module.css.mjs
		const css$10 = ".Ij_Ila_root{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);border-radius:10px;flex-direction:column;gap:8px;width:100%;min-width:0;padding:10px 12px;display:flex}.Ij_Ila_head{align-items:center;gap:8px;min-width:0;display:flex}.Ij_Ila_leadAvatar{object-fit:contain;filter:drop-shadow(0 1px 1px #122d4833);background:0 0;border:0;border-radius:0;flex:none;width:30px;height:30px}.Ij_Ila_teamName{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;flex:0 auto;font-size:13px;font-weight:600;line-height:20px;overflow:hidden}.Ij_Ila_memberCount{color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none;margin-left:auto;font-size:11px;line-height:16px}.Ij_Ila_panelButton{border:1px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border-radius:999px;flex:none;padding:2px 8px;font-size:10.5px;font-weight:600;line-height:16px;transition:border-color .12s,color .12s}.Ij_Ila_panelButton:hover{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary)}.Ij_Ila_panelButton:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.Ij_Ila_members{flex-wrap:wrap;gap:6px;min-width:0;display:flex}.Ij_Ila_member{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);max-width:160px;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border-radius:999px;align-items:center;gap:5px;padding:3px 8px 3px 3px;font-size:11px;font-weight:500;line-height:16px;transition:border-color .12s,background-color .12s;display:inline-flex}.Ij_Ila_member:hover{border-color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-button-ghost-active-fill)}.Ij_Ila_member:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.Ij_Ila_memberArt{object-fit:contain;filter:drop-shadow(0 1px 1px #122d482e);background:0 0;border:0;border-radius:0;width:24px;height:24px}.Ij_Ila_memberInitial{background:var(--dsw-alias-state-business-primary);width:20px;height:20px;color:var(--dsw-alias-label-primary-inverted);border-radius:50%;justify-content:center;align-items:center;font-size:10px;font-weight:600;line-height:20px;display:inline-flex}.Ij_Ila_memberName{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.Ij_Ila_chatEntry{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);font:inherit;white-space:nowrap;cursor:pointer;background:0 0;border-radius:7px;align-items:center;gap:5px;padding:3px 8px;font-size:12px;display:inline-flex}.Ij_Ila_chatEntry img{object-fit:contain;width:22px;height:22px}.Ij_Ila_chatEntry:hover{background:var(--dsw-alias-bg-module-platform)}.Ij_Ila_chatEntry:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.Ij_Ila_turnCards{gap:8px;margin-block:10px;display:grid}.Ij_Ila_comms{border-top:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:5px;min-width:0;padding-top:8px;display:flex}.Ij_Ila_commsTitle{color:var(--dsw-alias-label-tertiary);font-size:10px;font-weight:600;line-height:14px}.Ij_Ila_commsTasks{flex-wrap:wrap;gap:4px;display:flex}.Ij_Ila_commsTask{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, transparent);color:var(--dsw-alias-state-business-primary);border-radius:5px;align-items:center;gap:4px;padding:2px 6px;font-size:10px;line-height:14px;display:inline-flex}.Ij_Ila_commsTask[data-state=completed]{background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent);color:var(--dsw-alias-state-success-primary)}.Ij_Ila_commsTask[data-state=failed]{background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent);color:var(--dsw-alias-state-error-primary)}.Ij_Ila_commsList{flex-direction:column;gap:5px;max-height:132px;margin:0;padding:0;list-style:none;display:flex;overflow:auto}.Ij_Ila_commsRow{align-items:flex-start;gap:6px;min-width:0;display:flex}.Ij_Ila_commsAvatar{object-fit:contain;background:0 0;border-radius:4px;flex:none;width:20px;height:20px}.Ij_Ila_commsText{flex-direction:column;gap:1px;min-width:0;display:flex}.Ij_Ila_commsMeta{color:var(--dsw-alias-label-tertiary);font-size:9.5px;line-height:12px}.Ij_Ila_commsBody{color:var(--dsw-alias-label-secondary);word-break:break-word;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:10.5px;line-height:1.45;display:-webkit-box;overflow:hidden}@media (width<=600px){.Ij_Ila_head{flex-wrap:wrap}}";
		const tagId$10 = "dsh-pixel-team/AgentTeamsCard.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$10) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-pixel-team";
			tag.dataset.pluginCss = tagId$10;
			tag.textContent = css$10;
			document.head.appendChild(tag);
		}
		var AgentTeamsCard_module_css_default = {
			"chatEntry": "Ij_Ila_chatEntry",
			"comms": "Ij_Ila_comms",
			"commsAvatar": "Ij_Ila_commsAvatar",
			"commsBody": "Ij_Ila_commsBody",
			"commsList": "Ij_Ila_commsList",
			"commsMeta": "Ij_Ila_commsMeta",
			"commsRow": "Ij_Ila_commsRow",
			"commsTask": "Ij_Ila_commsTask",
			"commsTasks": "Ij_Ila_commsTasks",
			"commsText": "Ij_Ila_commsText",
			"commsTitle": "Ij_Ila_commsTitle",
			"head": "Ij_Ila_head",
			"leadAvatar": "Ij_Ila_leadAvatar",
			"member": "Ij_Ila_member",
			"memberArt": "Ij_Ila_memberArt",
			"memberCount": "Ij_Ila_memberCount",
			"memberInitial": "Ij_Ila_memberInitial",
			"memberName": "Ij_Ila_memberName",
			"members": "Ij_Ila_members",
			"panelButton": "Ij_Ila_panelButton",
			"root": "Ij_Ila_root",
			"teamName": "Ij_Ila_teamName",
			"turnCards": "Ij_Ila_turnCards"
		};
		//#endregion
		//#region lib/client/AgentTeamsCard.js
		/**
		* AgentTeams conversation card: the lightweight in-conversation summary for
		* one team — the captain's portrait and name, the member roster as
		* clickable 道途 portraits (opening the member's subagent transcript), and
		* an "activity panel" button that re-activates the top-right floater.
		*
		* The floater and this card share the `agent-teams:open-panel` window event
		* so the card can summon the panel even after it was closed (or when an old
		* session is re-opened for review).
		* @module dsh-agent-teams/client/card
		*/
		/** Window event name the floater listens for to open itself. */
		const OPEN_PANEL_EVENT = "agent-teams:open-panel";
		/** Render one durable team as a compact conversation card. */
		const noWorkspace = () => void 0;
		const noSubscription = () => () => {};
		function AgentTeamsCard({ node, openMember, sessionId, t, workspaceBridge }) {
			const native = (0, react.useSyncExternalStore)(workspaceBridge?.subscribe ?? noSubscription, workspaceBridge?.getSnapshot ?? noWorkspace);
			const location = node.location;
			if (native && (location.kind === "turn" || location.kind === "step") && location.turn.status === "closed") return null;
			return (0, react_jsx_runtime.jsx)(AgentTeamsSummary, {
				data: node.data,
				openMember,
				sessionId,
				t
			});
		}
		function AgentTeamsSummary({ data, openMember, sessionId, t }) {
			const owner = data.captainSessionId || sessionId;
			const { teams, archivedTeams } = (0, react.useSyncExternalStore)(subscribeActivitySnapshots, getActivitySnapshotsSnapshot);
			(0, react.useEffect)(() => {
				return monitorAgentTeam(owner, data.teamId);
			}, [data.teamId, owner]);
			const snapshot = teams.find((team) => team.teamId === data.teamId && (owner === "" || team.captainSessionId === owner)) ?? archivedTeams.find((team) => team.teamId === data.teamId && (owner === "" || team.captainSessionId === owner));
			const resolved = (0, react.useMemo)(() => ({
				...data,
				captainSessionId: snapshot?.captainSessionId ?? owner,
				teamName: snapshot?.name ?? data.teamName,
				members: snapshot?.members.map((member) => ({
					id: member.id,
					name: member.name,
					role: member.role
				})) ?? data.members
			}), [
				data,
				owner,
				snapshot
			]);
			const messages = (snapshot?.messages ?? []).slice(-8);
			const taskEvents = [...snapshot?.tasks ?? []].filter((task) => task.updatedAt !== void 0).sort((left, right) => (right.updatedAt ?? 0) - (left.updatedAt ?? 0)).slice(0, 3);
			return (0, react_jsx_runtime.jsxs)("section", {
				className: AgentTeamsCard_module_css_default.root,
				"data-agent-teams-card": true,
				"data-team-id": resolved.teamId,
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: AgentTeamsCard_module_css_default.head,
						children: [
							(0, react_jsx_runtime.jsx)("img", {
								className: AgentTeamsCard_module_css_default.leadAvatar,
								src: LEAD_ART,
								alt: "",
								"aria-hidden": true
							}),
							(0, react_jsx_runtime.jsx)("span", {
								className: AgentTeamsCard_module_css_default.teamName,
								title: resolved.teamName,
								children: resolved.teamName
							}),
							(0, react_jsx_runtime.jsx)("span", {
								className: AgentTeamsCard_module_css_default.memberCount,
								children: t("card.memberCount", { count: resolved.members.length })
							})
						]
					}),
					(messages.length > 0 || taskEvents.length > 0) && (0, react_jsx_runtime.jsxs)("div", {
						className: AgentTeamsCard_module_css_default.comms,
						"data-team-comms": true,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: AgentTeamsCard_module_css_default.commsTitle,
								children: t("card.comms")
							}),
							taskEvents.length > 0 && (0, react_jsx_runtime.jsx)("div", {
								className: AgentTeamsCard_module_css_default.commsTasks,
								"data-team-comms-tasks": true,
								children: taskEvents.map((task) => {
									const state = task.status === "completed" ? "completed" : task.status === "failed" || task.status === "cancelled" ? "failed" : "start";
									const key = state === "completed" ? "card.task.completed" : state === "failed" ? "card.task.failed" : "card.task.start";
									const glyph = state === "completed" ? "✓" : state === "failed" ? "✕" : "▶";
									return (0, react_jsx_runtime.jsxs)("span", {
										className: AgentTeamsCard_module_css_default.commsTask,
										"data-state": state,
										children: [(0, react_jsx_runtime.jsx)("span", {
											"aria-hidden": true,
											children: glyph
										}), t(key, {
											taskId: task.id,
											assignee: task.assignee || t("task.assignee.unclaimed")
										})]
									}, task.id);
								})
							}),
							(0, react_jsx_runtime.jsx)("ul", {
								className: AgentTeamsCard_module_css_default.commsList,
								children: messages.map((message) => {
									const fromCaptain = message.from === "captain" || message.from === "";
									const role = fromCaptain ? "" : snapshot?.members.find((member) => member.name === message.from)?.role ?? "";
									const art = fromCaptain ? LEAD_ART : memberArtUrl(message.from, role);
									return (0, react_jsx_runtime.jsxs)("li", {
										className: AgentTeamsCard_module_css_default.commsRow,
										"data-from": fromCaptain ? "captain" : "member",
										children: [(0, react_jsx_runtime.jsx)("img", {
											className: AgentTeamsCard_module_css_default.commsAvatar,
											src: art ?? "",
											alt: "",
											"aria-hidden": true
										}), (0, react_jsx_runtime.jsxs)("span", {
											className: AgentTeamsCard_module_css_default.commsText,
											children: [(0, react_jsx_runtime.jsxs)("span", {
												className: AgentTeamsCard_module_css_default.commsMeta,
												children: [
													message.from,
													" → ",
													message.to ?? "captain"
												]
											}), (0, react_jsx_runtime.jsx)("span", {
												className: AgentTeamsCard_module_css_default.commsBody,
												title: message.content,
												children: message.content
											})]
										})]
									}, message.id ?? `${message.ts ?? 0}:${message.from}`);
								})
							})
						]
					}),
					resolved.members.length > 0 && (0, react_jsx_runtime.jsx)("div", {
						className: AgentTeamsCard_module_css_default.members,
						children: resolved.members.map((member) => (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: AgentTeamsCard_module_css_default.member,
							onClick: () => {
								if (member.id !== "") openMember(owner, member.id);
							},
							title: member.role === "" ? member.name : `${member.name} · ${member.role}`,
							children: [memberArtUrl(member.name, member.role) !== null ? (0, react_jsx_runtime.jsx)("img", {
								className: AgentTeamsCard_module_css_default.memberArt,
								src: memberArtUrl(member.name, member.role) ?? "",
								alt: "",
								"aria-hidden": true
							}) : (0, react_jsx_runtime.jsx)("span", {
								className: AgentTeamsCard_module_css_default.memberInitial,
								children: member.name.trim().slice(0, 1).toUpperCase() || "?"
							}), (0, react_jsx_runtime.jsx)("span", {
								className: AgentTeamsCard_module_css_default.memberName,
								children: member.name
							})]
						}, member.id || member.name))
					})
				]
			});
		}
		//#endregion
		//#region lib/client/team-reveal.js
		/**
		* Reveal rules for the team workspace tab.
		*
		* Two independent signals can make a team appear while the user is looking at
		* the conversation: an explicit creation the quick-start dialog just announced,
		* and the monitor discovering a team created elsewhere. They are deliberately
		* asymmetric. An explicit creation always reveals the tab — the user just
		* clicked "生成草案", and reviewing that draft is the only next step — even when
		* the right column is already expanded on another page (the discard button
		* closes the tab but keeps the column open, which used to swallow the next
		* draft). A discovered team only claims a collapsed column, so polling can
		* never replace a file or terminal the user is reading.
		*/
		/** Window event dispatched after the quick-start dialog staged a team. */
		const TEAM_CREATED_EVENT = "agent-teams:team-created";
		/**
		* Whether the workspace tab must be opened for a team that just appeared.
		* @param input - the signal, both session identities, the team id, and the
		*   column's current expansion.
		* @returns `true` when the tab should be opened/focused.
		*/
		function shouldRevealTeam(input) {
			if (input.sessionId === void 0 || input.sessionId === "") return false;
			if (input.teamId === void 0 || input.teamId === "") return false;
			if (input.onScreenSessionId !== input.sessionId) return false;
			return input.source === "created" || !input.expanded;
		}
		//#endregion
		//#region lib/modes.js
		/**
		* Development modes: one source of truth for philosophy, default boundaries,
		* acceptance, verifier strategy, failure limits and budget.
		*
		* Every module reads this table instead of scattering mode branches.
		*/
		const TEAM_MODES = [
			"draft",
			"precision",
			"legacy",
			"compliance",
			"monetize"
		];
		const DEFAULT_MODE = "precision";
		const MODE_SPECS = {
			draft: {
				id: "draft",
				labelKey: "mode.draft",
				name: "极速草稿",
				emoji: "⚡",
				color: "#6fb6ff",
				philosophy: "你是极速交付工程师：优先让主流程跑通，允许硬编码与临时绕过；非主流程缺陷先记录不阻塞，不引入新依赖。",
				defaultExcluded: [
					"禁止过度设计",
					"不写非冒烟测试",
					"不引入新依赖"
				],
				acceptanceDefaults: ["主流程跑通", "关键交互可点击"],
				verifier: {
					strategy: "smoke",
					failLimit: 2,
					blockOnOldTestFail: false
				},
				budget: {
					perTaskUsd: 1,
					perDayUsd: 15,
					retryPromptAt: 2
				}
			},
			precision: {
				id: "precision",
				labelKey: "mode.precision",
				name: "工业精工",
				emoji: "🏭",
				color: "#f2c14e",
				philosophy: "你是工业级交付工程师：任何外部调用必须有超时、重试与异常捕获；禁止吞异常、禁止硬编码绕过；必须自证断网/重启后的行为。",
				defaultExcluded: [
					"禁止吞异常",
					"禁止硬编码绕过",
					"禁止跳过失败用例"
				],
				acceptanceDefaults: [
					"断网自动重连",
					"72h 连续运行无崩溃",
					"异常路径有捕获",
					"无内存泄漏"
				],
				verifier: {
					strategy: "unit-network",
					failLimit: 3,
					blockOnOldTestFail: false
				},
				budget: {
					perTaskUsd: 3,
					perDayUsd: 50,
					retryPromptAt: 3
				}
			},
			legacy: {
				id: "legacy",
				labelKey: "mode.legacy",
				name: "屎山抢救",
				emoji: "🔧",
				color: "#c79bff",
				philosophy: "你是外科医生：只加不改。禁止重构底层、禁止修改原有接口协议、禁止删除旧测试；任何新代码必须先有旧接口回归测试保护。",
				defaultExcluded: [
					"禁止重构底层",
					"禁止修改原有接口协议",
					"禁止删除旧测试"
				],
				acceptanceDefaults: [
					"旧接口回归测试 100% 通过",
					"新代码单测通过",
					"对外行为不变"
				],
				verifier: {
					strategy: "legacy-regression",
					failLimit: 3,
					blockOnOldTestFail: true
				},
				budget: {
					perTaskUsd: 3,
					perDayUsd: 50,
					retryPromptAt: 3
				}
			},
			compliance: {
				id: "compliance",
				labelKey: "mode.compliance",
				name: "严格合规",
				emoji: "🛡️",
				color: "#7fd6a8",
				philosophy: "你是合规审计员：零外部依赖风险；禁止访问公网、禁止打印明文密码/token、禁止引入未经审核的第三方包；所有操作必须可审计。",
				defaultExcluded: [
					"禁止访问公网",
					"禁止打印明文密码",
					"禁止引入未审核第三方包"
				],
				acceptanceDefaults: [
					"无新增未审核依赖",
					"日志无明文 password/token",
					"操作审计已开启"
				],
				verifier: {
					strategy: "compliance-audit",
					failLimit: 3,
					blockOnOldTestFail: false
				},
				budget: {
					perTaskUsd: 3,
					perDayUsd: 50,
					retryPromptAt: 3
				}
			},
			monetize: {
				id: "monetize",
				labelKey: "mode.monetize",
				name: "交付变现",
				emoji: "💰",
				color: "#ffb86b",
				philosophy: "你是交付变现负责人：UI 优先复用现成华丽模板；核心功能必须接入授权校验；砍掉不直接产生收入的边缘功能。",
				defaultExcluded: [
					"不加非变现功能",
					"不引入未授权 SDK",
					"不做无收益重构"
				],
				acceptanceDefaults: ["主流程可交互", "License 校验生效"],
				verifier: {
					strategy: "smoke",
					failLimit: 2,
					blockOnOldTestFail: false
				},
				budget: {
					perTaskUsd: 1,
					perDayUsd: 15,
					retryPromptAt: 2
				}
			}
		};
		/** Is this value one of the five modes? */
		function isTeamMode(value) {
			return typeof value === "string" && TEAM_MODES.includes(value);
		}
		/** Resolve a spec; unknown/missing values fall back to precision (old data). */
		function getModeSpec(mode) {
			return MODE_SPECS[mode !== void 0 && isTeamMode(mode) ? mode : DEFAULT_MODE];
		}
		//#endregion
		//#region \0dsh-css:F:\MyApp\eternal\dsh-pixel-team\src\client\ActivityPanel.module.css.mjs
		const css$9 = "html{--agent-teams-panel-shift:420px}html[data-agent-teams-panel-open] [data-phase=active]{box-sizing:border-box;padding-right:var(--agent-teams-panel-shift)}.cw9qUG_badge{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 92%, transparent);backdrop-filter:blur(16px);height:34px;box-shadow:0 8px 28px color-mix(in srgb, var(--dsw-alias-bg-mask-3) 29%, transparent);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border-radius:999px;align-items:center;gap:7px;padding:0 12px;font-size:12px;font-weight:600;line-height:20px;transition:border-color .15s,transform .12s;display:inline-flex;position:absolute;top:64px;right:18px}.cw9qUG_badge:hover{border-color:var(--dsw-alias-border-l3);transform:translateY(-1px)}.cw9qUG_badge:active{transform:translateY(0)scale(.98)}.cw9qUG_badge:focus-visible,.cw9qUG_iconButton:focus-visible,.cw9qUG_memberRow:focus-visible,.cw9qUG_membersToggle:focus-visible,.cw9qUG_sectionToggleTitle:focus-visible,.cw9qUG_dagNode:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.cw9qUG_badgeDot,.cw9qUG_panelDot{background:var(--dsw-alias-label-tertiary);border-radius:50%;width:7px;height:7px}.cw9qUG_badgeDot[data-busy=true],.cw9qUG_panelDot[data-busy=true]{background:var(--dsw-alias-state-business-primary);animation:1.25s ease-in-out infinite cw9qUG_agentTeamsPulse}.cw9qUG_badgeCount,.cw9qUG_memberCount,.cw9qUG_teamStats,.cw9qUG_stageLabel,.cw9qUG_taskId{font-variant-numeric:tabular-nums}.cw9qUG_panel{box-sizing:border-box;border:1px solid color-mix(in srgb, var(--dsw-alias-border-l3) 58%, transparent);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 95%, transparent);backdrop-filter:blur(20px)saturate(1.08);box-shadow:0 12px 32px color-mix(in srgb, var(--dsw-alias-bg-mask-3) 25%, transparent), 0 32px 72px color-mix(in srgb, var(--dsw-alias-bg-mask-3) 33%, transparent);will-change:transform;border-radius:16px;flex-direction:column;animation:.16s ease-out cw9qUG_agentTeamsPanelIn;display:flex;position:absolute;top:0;left:0;overflow:hidden}.cw9qUG_panel[data-dragging],.cw9qUG_panel[data-resizing]{user-select:none;box-shadow:0 16px 38px color-mix(in srgb, var(--dsw-alias-bg-mask-3) 29%, transparent), 0 36px 78px color-mix(in srgb, var(--dsw-alias-bg-mask-3) 38%, transparent)}@keyframes cw9qUG_agentTeamsPanelIn{0%{opacity:0}to{opacity:1}}@keyframes cw9qUG_agentTeamsPulse{0%,to{opacity:.42}50%{opacity:1}}.cw9qUG_panelHead{border-bottom:1px solid var(--dsw-alias-border-l2);cursor:grab;touch-action:none;flex:none;justify-content:space-between;align-items:center;min-height:44px;padding:0 14px 0 16px;display:flex}.cw9qUG_panelHead:active,.cw9qUG_panel[data-dragging] .cw9qUG_panelHead{cursor:grabbing}.cw9qUG_panel[data-compact] .cw9qUG_panelHead{cursor:default;touch-action:auto}.cw9qUG_panelTitle{color:var(--dsw-alias-label-primary);align-items:center;gap:8px;font-size:14px;font-weight:600;line-height:20px;display:inline-flex}.cw9qUG_panelControls{flex:none;align-items:center;gap:2px;display:inline-flex}.cw9qUG_iconButton{width:28px;height:28px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:0;border-radius:7px;justify-content:center;align-items:center;padding:0;transition:background-color .12s,color .12s,transform .12s;display:inline-flex}.cw9qUG_iconButton:hover{background:var(--dsw-alias-button-ghost-active-fill);color:var(--dsw-alias-label-primary)}.cw9qUG_iconButton:active{transform:scale(.94)}.cw9qUG_iconButton[data-control=dock][data-mode=docked] svg{transform:scaleX(-1)}.cw9qUG_resizeHandle{z-index:5;touch-action:none;pointer-events:auto;position:absolute}.cw9qUG_resizeHandle[data-resize-edge=left]{cursor:ew-resize;width:14px;top:44px;bottom:14px;left:0}.cw9qUG_resizeHandle[data-resize-edge=left]:after{background:color-mix(in srgb, var(--dsw-alias-label-tertiary) 42%, transparent);content:\"\";opacity:.45;border-radius:999px;width:3px;height:48px;transition:background-color .12s,opacity .12s;position:absolute;top:50%;left:4px;transform:translateY(-50%)}.cw9qUG_resizeHandle[data-resize-edge=bottom]{cursor:ns-resize;height:14px;bottom:0;left:20px;right:20px}.cw9qUG_resizeHandle[data-resize-edge=bottom]:after{background:color-mix(in srgb, var(--dsw-alias-label-tertiary) 42%, transparent);content:\"\";opacity:.45;border-radius:999px;width:48px;height:3px;transition:background-color .12s,opacity .12s;position:absolute;bottom:4px;left:50%;transform:translate(-50%)}.cw9qUG_resizeHandle[data-resize-edge=corner]{cursor:nwse-resize;width:28px;height:28px;bottom:0;right:0}.cw9qUG_resizeHandle[data-resize-edge=corner]:after{border-right:2px solid var(--dsw-alias-label-tertiary);border-bottom:2px solid var(--dsw-alias-label-tertiary);content:\"\";opacity:.58;width:10px;height:10px;transition:border-color .12s,opacity .12s;position:absolute;bottom:6px;right:6px}.cw9qUG_resizeHandle:hover:after,.cw9qUG_panel[data-resizing] .cw9qUG_resizeHandle:after{background-color:var(--dsw-alias-state-business-primary);border-color:var(--dsw-alias-state-business-primary);opacity:.95}.cw9qUG_teams{overscroll-behavior:contain;scrollbar-color:color-mix(in srgb, var(--dsw-alias-label-tertiary) 28%, transparent) transparent;scrollbar-width:thin;flex-direction:column;min-height:0;display:flex;overflow-y:auto}.cw9qUG_teams::-webkit-scrollbar{width:6px}.cw9qUG_teams::-webkit-scrollbar-track{background:0 0}.cw9qUG_teams::-webkit-scrollbar-thumb{background:color-mix(in srgb, var(--dsw-alias-label-tertiary) 28%, transparent);background-clip:padding-box;border:2px solid #0000;border-radius:999px}.cw9qUG_teams:hover::-webkit-scrollbar-thumb{background:color-mix(in srgb, var(--dsw-alias-label-tertiary) 44%, transparent);background-clip:padding-box}.cw9qUG_team{border-bottom:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:12px;padding:12px 14px 16px;display:flex;container:cw9qUG_agent-team/inline-size}.cw9qUG_team:last-child{border-bottom:0}.cw9qUG_teamHead{align-items:center;gap:10px;min-width:0;display:flex}.cw9qUG_teamName{min-width:0;color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;flex:1;font-size:13px;font-weight:600;line-height:18px;overflow:hidden}.cw9qUG_teamStats{color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none;gap:8px;font-size:10.5px;line-height:16px;display:inline-flex}.cw9qUG_statePill{border:1px solid var(--dsw-alias-border-l2);white-space:nowrap;border-radius:999px;flex:none;align-items:center;padding:1px 8px;font-size:10px;font-weight:650;line-height:15px;display:inline-flex}.cw9qUG_statePill[data-state=running]{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-business-primary) 45%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, transparent)}.cw9qUG_statePill[data-state=completed]{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-success-primary) 45%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent)}.cw9qUG_taskBoard{flex-direction:column;gap:6px;margin:8px 0 2px;display:flex}.cw9qUG_taskBoardHead{color:var(--dsw-alias-label-secondary);justify-content:space-between;align-items:center;gap:8px;font-size:10.5px;line-height:16px;display:flex}.cw9qUG_taskBoardHead>span:first-child{align-items:center;gap:5px;display:inline-flex}.cw9qUG_taskBoardHead svg{width:13px;height:13px}.cw9qUG_taskBoardHint{color:var(--dsw-alias-label-tertiary);font-size:9.5px}.cw9qUG_taskBoardList{flex-direction:column;gap:3px;margin:0;padding:0;list-style:none;display:flex}.cw9qUG_taskRow{--task-tone:var(--dsw-alias-label-tertiary);border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:100%;color:var(--dsw-alias-label-secondary);font:inherit;text-align:left;cursor:pointer;border-radius:8px;grid-template-columns:8px 34px minmax(0,1fr) auto auto auto;align-items:center;gap:8px;padding:6px 9px;font-size:11px;line-height:16px;display:grid}.cw9qUG_taskRow:hover{border-color:var(--dsw-alias-state-business-primary)}.cw9qUG_taskRow[data-state=running],.cw9qUG_taskRow[data-state=claimed]{--task-tone:var(--dsw-alias-state-business-primary)}.cw9qUG_taskRow[data-state=completed]{--task-tone:var(--dsw-alias-state-success-primary)}.cw9qUG_taskRow[data-state=failed]{--task-tone:var(--dsw-alias-state-error-primary)}.cw9qUG_taskRow[data-state=blocked]{--task-tone:var(--dsw-alias-state-warning-primary)}.cw9qUG_taskRow[data-state=cancelled]{--task-tone:var(--dsw-alias-label-tertiary)}.cw9qUG_taskRow[data-selected]{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, var(--dsw-alias-bg-layer-1))}.cw9qUG_taskRowDot{background:var(--task-tone);border-radius:50%;width:7px;height:7px}.cw9qUG_taskRowId{color:var(--dsw-alias-label-primary);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10px;font-weight:600}.cw9qUG_taskRowSubject{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.cw9qUG_taskRowOwner{text-overflow:ellipsis;white-space:nowrap;max-width:90px;overflow:hidden}.cw9qUG_taskRowDeps{color:var(--dsw-alias-label-tertiary);white-space:nowrap;font-size:9.5px}.cw9qUG_taskRowStatus{color:var(--task-tone);white-space:nowrap;font-size:10px}.cw9qUG_taskRowDetail{border-left:2px solid var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 70%, transparent);color:var(--dsw-alias-label-secondary);border-radius:0 8px 8px 0;margin:2px 0 4px 14px;padding:7px 10px;font-size:10.5px;line-height:1.6}.cw9qUG_taskRowDetail p{white-space:pre-wrap;margin:0 0 4px}.cw9qUG_teamResumeButton{border:1px solid color-mix(in srgb, #4ec98a 55%, var(--dsw-alias-border-l2));background:color-mix(in srgb, #4ec98a 12%, var(--dsw-alias-bg-layer-1));color:#4ec98a;height:24px;font:inherit;cursor:pointer;white-space:nowrap;border-radius:7px;flex:none;align-items:center;gap:4px;padding:0 10px;font-size:11px;font-weight:650;line-height:16px;display:inline-flex}.cw9qUG_teamResumeButton:hover:not(:disabled){background:color-mix(in srgb, #4ec98a 22%, var(--dsw-alias-bg-layer-1));border-color:#4ec98a}.cw9qUG_teamResumeButton:disabled{opacity:.6;cursor:default}.cw9qUG_teamResumeError{color:var(--dsw-alias-state-error-primary);margin:2px 14px 6px;font-size:11px}.cw9qUG_reportButton{border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 7%, transparent);height:26px;color:var(--dsw-alias-state-business-primary);cursor:pointer;border-radius:7px;flex:none;align-items:center;gap:4px;padding:0 8px;font-size:11px;transition:border-color .15s,background .15s;display:inline-flex}.cw9qUG_reportButton:hover{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 16%, transparent)}.cw9qUG_reportButton:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.cw9qUG_cleanupButton{border:1px solid var(--dsw-alias-border-l2);height:26px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border-radius:7px;flex:none;align-items:center;padding:0 8px;font-size:11px;display:inline-flex}.cw9qUG_cleanupButton:hover{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary)}.cw9qUG_cleanupButton:disabled{opacity:.55;cursor:progress}.cw9qUG_cleanupButton:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.cw9qUG_cleanupMessage{min-width:0;color:var(--dsw-alias-label-secondary);font-size:11px}.cw9qUG_teamStopButton{border:1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 46%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 7%, transparent);width:26px;height:26px;color:var(--dsw-alias-state-error-primary);cursor:pointer;border-radius:7px;flex:none;place-items:center;padding:0;transition:border-color .15s,background .15s,color .15s;display:grid}.cw9qUG_teamStopButton:hover{border-color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 16%, transparent);color:var(--dsw-alias-state-error-primary)}.cw9qUG_teamStopButton:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.cw9qUG_stopAnchor{flex:none;display:inline-flex;position:relative}.cw9qUG_stopPopover{z-index:60;border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 82%, transparent);background:var(--dsw-alias-bg-layer-1);width:min(292px,78vw);box-shadow:0 14px 34px color-mix(in srgb, var(--dsw-alias-bg-mask-3) 30%, transparent), 0 2px 8px color-mix(in srgb, var(--dsw-alias-bg-mask-3) 18%, transparent);text-align:left;border-radius:12px;flex-direction:column;gap:7px;padding:12px;display:flex;position:absolute;top:calc(100% + 10px);right:0}.cw9qUG_stopPopoverArrow{border-top:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 82%, transparent);border-left:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 82%, transparent);background:var(--dsw-alias-bg-layer-1);width:10px;height:10px;position:absolute;top:-6px;right:14px;transform:rotate(45deg)}.cw9qUG_stopPopoverTitle{color:var(--dsw-alias-label-primary);font-size:12.5px;font-weight:600;line-height:18px}.cw9qUG_stopPopoverText{color:var(--dsw-alias-label-secondary);margin-top:-2px;font-size:11.5px;line-height:1.55}.cw9qUG_stopModalActions{justify-content:flex-end;gap:8px;display:flex}.cw9qUG_stopModalActions button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-button-ghost-active-fill);min-height:34px;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;border-radius:8px;justify-content:center;align-items:center;gap:6px;padding:6px 13px;font-size:12px;font-weight:600;display:inline-flex}.cw9qUG_stopModalActions button[data-danger]{border-color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-label-primary-inverted)}.cw9qUG_stopModalActions button:disabled{cursor:wait;opacity:.58}.cw9qUG_stopModalError{background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent);color:var(--dsw-alias-state-error-primary);border-radius:8px;align-items:flex-start;gap:7px;margin:0;padding:9px 10px;font-size:12px;line-height:18px;display:flex}.cw9qUG_stopModalError svg{flex:none;margin-top:1px}.cw9qUG_sectionHead{justify-content:space-between;align-items:center;gap:8px;min-width:0;display:flex}.cw9qUG_sectionTitle{color:var(--dsw-alias-label-secondary);align-items:center;gap:6px;font-size:11px;font-weight:600;line-height:16px;display:inline-flex}.cw9qUG_sectionHint{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:10px;line-height:14px;overflow:hidden}.cw9qUG_sectionHeadRight{align-items:center;gap:8px;min-width:0;display:inline-flex}.cw9qUG_dependencyViews{border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 65%, transparent);border-radius:7px;flex:none;gap:2px;padding:2px;display:inline-flex}.cw9qUG_dependencyViews button{color:var(--dsw-alias-label-tertiary);font:inherit;cursor:pointer;background:0 0;border:0;border-radius:5px;padding:1px 7px;font-size:9.5px;line-height:14px}.cw9qUG_dependencyViews button[aria-pressed=true]{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}.cw9qUG_delegationSection{min-width:0}.cw9qUG_captainNode[data-clickable=true]{cursor:pointer}.cw9qUG_captainNode[data-clickable=true]:hover{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 13%, var(--dsw-alias-bg-layer-1))}.cw9qUG_captainNode{box-sizing:border-box;border:1px solid color-mix(in srgb, var(--dsw-alias-state-business-primary) 32%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 7%, var(--dsw-alias-bg-layer-1));border-radius:10px;grid-template-columns:48px minmax(0,1fr) auto;align-items:center;gap:9px;min-height:56px;padding:6px 10px;display:grid}.cw9qUG_captainAvatar,.cw9qUG_memberAvatar{flex:none;justify-content:center;align-items:center;display:inline-flex;position:relative}.cw9qUG_captainAvatar{width:46px;height:46px}.cw9qUG_leadAvatar,.cw9qUG_memberArt{object-fit:contain;filter:drop-shadow(0 1px 1px #122d4833);background:0 0;border:0;border-radius:0}.cw9qUG_leadAvatar{width:44px;height:44px}.cw9qUG_memberArt{width:40px;height:40px}.cw9qUG_captainInfo,.cw9qUG_memberInfo{flex-direction:column;min-width:0;display:flex}.cw9qUG_captainInfo{gap:2px}.cw9qUG_captainLine,.cw9qUG_memberLine{align-items:center;gap:6px;min-width:0;display:flex}.cw9qUG_captainName,.cw9qUG_memberName{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;font-weight:600;line-height:18px;overflow:hidden}.cw9qUG_captainRole,.cw9qUG_memberLevel{color:#d4af37;white-space:nowrap;background:#d4af371f;border-radius:4px;flex:none;padding:0 5px;font-size:9.5px;font-weight:600;line-height:15px}.cw9qUG_memberRole{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:10px;line-height:14px;overflow:hidden}.cw9qUG_captainSummary,.cw9qUG_memberBlock[data-viewing=true]{background:#6fd6c80d;border-radius:8px;box-shadow:0 0 0 1px #6fd6c88c,0 0 14px #6fd6c829}.cw9qUG_memberState[data-viewing=true]{color:#6fd6c8}.cw9qUG_captainNode[data-viewing=true]{border-color:color-mix(in srgb, #f2c14e 62%, var(--dsw-alias-border-l2));box-shadow:0 0 0 1px #f2c14e80,0 0 16px #f2c14e24}.cw9qUG_viewingBadge{color:#f2c14e;background:#f2c14e29;border-radius:999px;align-items:center;padding:0 6px;font-size:9.5px;font-weight:600;line-height:16px;display:inline-flex}.cw9qUG_memberStatusLine{color:var(--dsw-alias-label-secondary);text-overflow:ellipsis;white-space:nowrap;font-size:10.5px;line-height:15px;overflow:hidden}.cw9qUG_memberProgress{align-items:center;margin-top:4px;display:flex}.cw9qUG_memberProgressTrack{background:var(--dsw-alias-border-l3);border-radius:2px;flex:1;height:4px;overflow:hidden}.cw9qUG_memberProgressFill{border-radius:inherit;background:var(--dsw-alias-state-business-primary);height:100%;transition:width .16s;display:block}.cw9qUG_memberProgressFill[data-state=completed]{background:var(--dsw-alias-state-success-primary)}.cw9qUG_memberProgressFill[data-state=failed]{background:var(--dsw-alias-state-error-primary)}.cw9qUG_memberRel{min-width:0;color:var(--dsw-alias-state-business-primary);text-overflow:ellipsis;white-space:nowrap;align-items:center;gap:4px;margin-top:2px;font-size:10px;line-height:14px;display:inline-flex;overflow:hidden}.cw9qUG_taskDetailModel{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9.5px;line-height:14px;overflow:hidden}.cw9qUG_memberModel{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-button-ghost-active-fill);min-width:0;max-width:132px;color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;border-radius:999px;flex:0 auto;align-items:center;padding:0 6px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9px;font-weight:600;line-height:15px;display:inline-flex;overflow:hidden}.cw9qUG_captainState,.cw9qUG_memberState{color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none;align-items:center;gap:5px;font-size:10px;font-weight:500;line-height:15px;display:inline-flex}.cw9qUG_captainState[data-busy=true],.cw9qUG_memberState[data-activity=working]{color:var(--dsw-alias-state-business-primary)}.cw9qUG_workGlyph rect{opacity:.5}.cw9qUG_workGlyph[data-active=true] rect{animation:1.1s ease-in-out infinite cw9qUG_agentTeamsDot}@keyframes cw9qUG_agentTeamsDot{0%,to{opacity:.25}50%{opacity:1}}.cw9qUG_progressOverview{flex-direction:column;gap:7px;display:flex}.cw9qUG_progressTitle{color:var(--dsw-alias-label-secondary);font-size:11px;font-weight:600;line-height:16px}.cw9qUG_progressSegments{gap:3px;display:flex}.cw9qUG_progressSegments>span,.cw9qUG_progressEmpty{background:var(--dsw-alias-border-l3);border-radius:2px;flex:1;height:5px}.cw9qUG_progressEmpty{width:100%;display:block}.cw9qUG_progressSegments>span[data-state=running]{background:var(--dsw-alias-state-business-primary)}.cw9qUG_progressSegments>span[data-state=blocked]{background:var(--dsw-alias-state-warn-primary)}.cw9qUG_progressSegments>span[data-state=completed]{background:var(--dsw-alias-state-success-primary)}.cw9qUG_progressSegments>span[data-state=failed]{background:var(--dsw-alias-state-error-primary)}.cw9qUG_progressSegments>span[data-state=cancelled]{opacity:.55}.cw9qUG_progressLegend{color:var(--dsw-alias-label-tertiary);flex-wrap:wrap;gap:10px;font-size:9.5px;line-height:14px;display:flex}.cw9qUG_progressLegend>span[data-state=running]{color:var(--dsw-alias-state-business-primary)}.cw9qUG_progressLegend>span[data-state=blocked]{color:var(--dsw-alias-state-warn-primary)}.cw9qUG_progressLegend>span[data-state=completed]{color:var(--dsw-alias-state-success-primary)}.cw9qUG_progressSummary{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 7%, var(--dsw-alias-bg-layer-1));min-width:0;color:var(--dsw-alias-label-secondary);border-radius:8px;align-items:center;gap:6px;padding:5px 8px;font-size:10px;font-weight:600;line-height:15px;display:flex}.cw9qUG_progressSummary[data-state=warning]{background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 8%, var(--dsw-alias-bg-layer-1))}.cw9qUG_progressSummary[data-state=completed]{background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 8%, var(--dsw-alias-bg-layer-1))}.cw9qUG_progressSummary[data-state=discarded]{background:var(--dsw-alias-button-ghost-active-fill)}.cw9qUG_progressSummary>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.cw9qUG_progressSummaryDot{background:var(--dsw-alias-state-business-primary);border-radius:50%;flex:none;width:5px;height:5px}.cw9qUG_progressSummary[data-state=warning] .cw9qUG_progressSummaryDot{background:var(--dsw-alias-state-warn-primary)}.cw9qUG_progressSummary[data-state=completed] .cw9qUG_progressSummaryDot{background:var(--dsw-alias-state-success-primary)}.cw9qUG_progressSummary[data-state=discarded] .cw9qUG_progressSummaryDot{background:var(--dsw-alias-label-tertiary)}.cw9qUG_membersToggle{background:var(--dsw-alias-bg-module-platform);width:100%;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border:0;border-radius:8px;justify-content:space-between;align-items:center;gap:8px;padding:6px 8px;font-size:10.5px;font-weight:600;line-height:15px;display:flex}.cw9qUG_membersToggle:hover{background:var(--dsw-alias-button-ghost-active-fill)}.cw9qUG_membersToggle>span{align-items:center;gap:5px;display:inline-flex}.cw9qUG_membersToggle>span:last-child{color:var(--dsw-alias-state-business-primary)}.cw9qUG_chevron{flex:none;transition:transform .14s}.cw9qUG_chevron[data-open=true]{transform:rotate(90deg)}.cw9qUG_delegationTree{flex-direction:column;gap:2px;margin-left:18px;padding:9px 0 0 20px;display:flex;position:relative}.cw9qUG_delegationTree:before{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 48%, var(--dsw-alias-border-l2));content:\"\";width:1px;position:absolute;top:0;bottom:22px;left:0}.cw9qUG_memberBlock{flex-direction:column;min-width:0;padding:3px 0 7px;display:flex;position:relative}.cw9qUG_memberBranch{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 48%, var(--dsw-alias-border-l2));width:20px;height:1px;display:block;position:absolute;top:27px;right:100%}.cw9qUG_memberBranch:before{background:var(--dsw-alias-state-business-primary);content:\"\";border-radius:50%;width:5px;height:5px;position:absolute;top:-2px;right:-1px}.cw9qUG_memberRow{box-sizing:border-box;width:100%;min-width:0;min-height:48px;color:inherit;font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:8px;grid-template-columns:46px minmax(0,1fr) auto;align-items:center;gap:8px;padding:4px 6px;transition:background-color .12s,transform .12s;display:grid}.cw9qUG_memberRow:hover,.cw9qUG_memberRow[data-activity=working]{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 6%, var(--dsw-alias-bg-layer-1))}.cw9qUG_memberRow:active{transform:scale(.995)}.cw9qUG_memberAvatar{width:42px;height:42px}.cw9qUG_memberAvatar[data-unread=true]:after{box-sizing:border-box;border:1px solid var(--dsw-alias-bg-layer-1);background:var(--dsw-alias-state-business-primary);content:\"\";border-radius:50%;width:6px;height:6px;animation:1.8s ease-in-out infinite cw9qUG_agentTeamsUnreadPulse;position:absolute;top:0;right:-1px}@keyframes cw9qUG_agentTeamsUnreadPulse{0%,to{opacity:.78;transform:scale(.92)}50%{opacity:1;transform:scale(1.16)}}.cw9qUG_memberInitial{background:var(--dsw-alias-state-business-primary);width:34px;height:34px;color:var(--dsw-alias-label-primary-inverted);border-radius:50%;justify-content:center;align-items:center;font-size:14px;font-weight:600;line-height:20px;display:inline-flex}.cw9qUG_stateArt{box-sizing:border-box;object-fit:contain;width:22px;height:22px;filter:drop-shadow(0 0 1px var(--dsw-alias-bg-layer-1)) drop-shadow(0 1px 1px #122d483d);background:0 0;border:0;border-radius:0;position:absolute;bottom:-3px;right:-5px}.cw9qUG_stateArt[data-activity=working]{animation:2.4s ease-in-out infinite cw9qUG_agentTeamsFloat}.cw9qUG_stateArt[data-activity=idle]{animation:4.2s ease-in-out infinite cw9qUG_agentTeamsBreathe}.cw9qUG_stateArt[data-activity=unknown]{animation:2.8s ease-in-out infinite cw9qUG_agentTeamsThink}@keyframes cw9qUG_agentTeamsFloat{0%,to{transform:translateY(0)rotate(-4deg)}50%{transform:translateY(-2px)rotate(4deg)}}@keyframes cw9qUG_agentTeamsBreathe{0%,to{opacity:.82;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}@keyframes cw9qUG_agentTeamsThink{0%,to{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}.cw9qUG_memberState{margin-left:auto}.cw9qUG_memberCount{color:var(--dsw-alias-label-tertiary);font-size:10.5px;line-height:16px}.cw9qUG_assignmentLine{align-items:center;gap:7px;min-width:0;padding:0 6px 0 60px;display:flex}.cw9qUG_assignmentLabel{color:var(--dsw-alias-label-tertiary);flex:none;font-size:9.5px;line-height:14px}.cw9qUG_assignmentTasks{flex-wrap:wrap;flex:1;gap:4px;min-width:0;display:flex}.cw9qUG_assignmentChip{background:var(--dsw-alias-button-ghost-active-fill);max-width:100%;min-height:16px;color:var(--dsw-alias-label-secondary);text-overflow:ellipsis;white-space:nowrap;border-radius:4px;align-items:center;padding:0 5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9px;font-weight:600;line-height:14px;display:inline-flex;overflow:hidden}.cw9qUG_assignmentChip[data-state=running]{background:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted)}.cw9qUG_assignmentChip[data-state=completed]{background:var(--dsw-alias-state-success-primary);color:var(--dsw-alias-label-primary-inverted)}.cw9qUG_assignmentChip[data-state=blocked]{background:var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-label-primary-inverted)}.cw9qUG_assignmentChip[data-state=failed]{background:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-label-primary-inverted)}.cw9qUG_assignmentChip[data-state=cancelled]{color:var(--dsw-alias-label-tertiary);text-decoration:line-through}.cw9qUG_unreadPill{color:var(--dsw-alias-state-business-primary);white-space:nowrap;flex:none;font-size:9.5px;font-weight:600;line-height:14px}.cw9qUG_taskEmpty{color:var(--dsw-alias-label-tertiary);font-size:9.5px;line-height:14px}.cw9qUG_dependencySection{border-top:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:7px;min-width:0;padding-top:10px;display:flex}.cw9qUG_sectionToggleTitle{color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border:0;align-items:center;gap:6px;padding:0;font-size:11px;font-weight:600;line-height:16px;display:inline-flex}.cw9qUG_dagViewport{scrollbar-width:thin;min-width:0;padding:2px 0 4px;overflow-x:auto}.cw9qUG_dagCanvas{min-width:100%;position:relative}.cw9qUG_dagCanvas[data-layout=parallel]{flex-wrap:wrap;gap:8px;display:flex}.cw9qUG_dagCanvas[data-layout=parallel] .cw9qUG_dagNode{flex:92px;min-width:92px;position:relative}.cw9qUG_dagEdges{pointer-events:none;position:absolute;inset:0;overflow:visible}.cw9qUG_dagEdges path{fill:none;stroke:var(--dsw-alias-border-l3);stroke-width:1px;transition:opacity .14s,stroke .14s,stroke-width .14s}.cw9qUG_dagEdges path[data-active=true]{stroke:var(--dsw-alias-state-business-primary);stroke-width:1.6px}.cw9qUG_dagEdges path[data-dimmed=true]{opacity:.24}.cw9qUG_dagNode{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;text-align:left;cursor:pointer;border-radius:6px;flex-direction:column;justify-content:center;gap:1px;padding:0 6px;transition:border-color .14s,background-color .14s,opacity .14s;display:flex;position:absolute}.cw9qUG_dagNode:hover,.cw9qUG_dagNode[data-focused=true]{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 6%, var(--dsw-alias-bg-layer-1))}.cw9qUG_dagNode[data-dimmed=true]{opacity:.3}.cw9qUG_dagNode[data-state=running][data-dimmed=true]{opacity:.58}.cw9qUG_dagNode[data-state=completed]{border-color:color-mix(in srgb, var(--dsw-alias-state-success-primary) 48%, var(--dsw-alias-border-l2))}.cw9qUG_dagNode[data-state=blocked]{border-color:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 52%, var(--dsw-alias-border-l2))}.cw9qUG_dagNode[data-state=failed]{border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 56%, var(--dsw-alias-border-l2))}.cw9qUG_dagNode[data-verdict-stale=true]{border-style:dashed;border-color:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 62%, var(--dsw-alias-border-l2))}.cw9qUG_dagNode[data-verdict-stale=true] .cw9qUG_dagNodeHead{color:var(--dsw-alias-state-warn-primary)}.cw9qUG_dagNodeHead{color:var(--dsw-alias-label-primary);align-items:center;gap:4px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9.5px;font-weight:700;display:flex}.cw9qUG_dagNodeDot{background:var(--dsw-alias-border-l3);border-radius:1.5px;flex:none;width:5px;height:5px}.cw9qUG_dagNode[data-state=running] .cw9qUG_dagNodeDot{background:var(--dsw-alias-state-business-primary)}.cw9qUG_dagNode[data-state=running] .cw9qUG_dagNodeHead{padding-right:12px}.cw9qUG_dagRunningState{width:9px;height:9px;color:var(--dsw-alias-state-business-primary);pointer-events:none;justify-content:center;align-items:center;display:inline-flex;position:absolute;top:4px;right:5px}.cw9qUG_dagRunningState .cw9qUG_workGlyph{width:9px;height:9px}.cw9qUG_dagNode[data-state=blocked] .cw9qUG_dagNodeDot{background:var(--dsw-alias-state-warn-primary)}.cw9qUG_dagNode[data-state=completed] .cw9qUG_dagNodeDot{background:var(--dsw-alias-state-success-primary)}.cw9qUG_dagNode[data-state=failed] .cw9qUG_dagNodeDot{background:var(--dsw-alias-state-error-primary)}.cw9qUG_dagPortrait{object-fit:contain;pointer-events:none;width:28px;height:28px;position:absolute;bottom:6px;right:8px}.cw9qUG_team[data-workspace-team] .cw9qUG_dagNode[data-portrait=true]{padding-right:44px}.cw9qUG_dagNodeLabel{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:8.5px;line-height:11px;overflow:hidden}.cw9qUG_taskDetail{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);border-radius:9px;flex-direction:column;gap:3px;min-width:0;padding:7px 9px;display:flex}.cw9qUG_taskDetailHead{align-items:center;gap:6px;min-width:0;display:flex}.cw9qUG_taskDetailId{color:var(--dsw-alias-state-business-primary);flex:none;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;font-weight:700}.cw9qUG_taskDetailSubject{min-width:0;color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;font-size:11px;font-weight:600;line-height:16px;overflow:hidden}.cw9qUG_taskDetailBadge{background:var(--dsw-alias-button-ghost-active-fill);color:var(--dsw-alias-label-secondary);border-radius:4px;flex:none;padding:0 5px;font-size:8.5px;font-weight:600;line-height:14px}.cw9qUG_taskDetailBadge[data-state=running]{background:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted)}.cw9qUG_taskDetailBadge[data-state=blocked]{background:var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-label-primary-inverted)}.cw9qUG_taskDetailBadge[data-state=completed]{background:var(--dsw-alias-state-success-primary);color:var(--dsw-alias-label-primary-inverted)}.cw9qUG_taskDetailBadge[data-state=failed]{background:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-label-primary-inverted)}.cw9qUG_taskDetailLine,.cw9qUG_taskDetailMeta{color:var(--dsw-alias-label-secondary);font-size:9.5px;line-height:14px}.cw9qUG_taskDetailMeta{color:var(--dsw-alias-label-tertiary)}.cw9qUG_emptyHint{color:var(--dsw-alias-label-tertiary);padding:10px 12px;font-size:11px;line-height:16px}.cw9qUG_planEditor{border:1px solid color-mix(in srgb, var(--dsw-alias-state-business-primary) 30%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 94%, var(--dsw-alias-state-business-primary));box-shadow:inset 0 1px 0 color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent);border-radius:10px;flex-direction:column;gap:12px;margin:0 10px 12px;padding:12px;display:flex}.cw9qUG_planHeader>span{justify-content:space-between;align-items:center;gap:8px;display:flex}.cw9qUG_planHeader>span>span{flex-direction:column;gap:2px;min-width:0;display:flex}.cw9qUG_planHeader strong{color:var(--dsw-alias-label-primary);font-size:12px}.cw9qUG_planHeader small{color:var(--dsw-alias-label-secondary);font-size:9px;font-weight:500;line-height:13px}.cw9qUG_planHeader em{background:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted);border-radius:999px;flex:none;padding:1px 7px;font-size:9px;font-style:normal;line-height:16px}.cw9qUG_planHeader p{color:var(--dsw-alias-label-secondary);margin:5px 0 0;font-size:10px;line-height:15px}.cw9qUG_planFlow{grid-template-columns:repeat(3,minmax(0,1fr));margin:0;padding:0;list-style:none;display:grid}.cw9qUG_planFlow li{min-width:0;color:var(--dsw-alias-label-tertiary);align-items:center;gap:5px;font-size:9px;font-weight:600;line-height:14px;display:flex;position:relative}.cw9qUG_planFlow li:not(:last-child):after{background:var(--dsw-alias-border-l2);content:\"\";flex:1;min-width:8px;height:1px;margin-right:5px}.cw9qUG_planFlow li>span{border:1px solid var(--dsw-alias-border-l2);border-radius:50%;flex:none;place-items:center;width:18px;height:18px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9px;display:grid}.cw9qUG_planFlow li[data-active]{color:var(--dsw-alias-state-business-primary)}.cw9qUG_planFlow li[data-active]>span{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent)}.cw9qUG_planSection{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);border-radius:8px;overflow:hidden}.cw9qUG_planSectionToggle,.cw9qUG_planCardHeader{box-sizing:border-box;width:100%;color:var(--dsw-alias-label-primary);cursor:pointer;text-align:left;background:0 0;border:0}.cw9qUG_planSectionToggle{justify-content:space-between;align-items:center;gap:8px;min-height:42px;padding:7px 9px;display:flex}.cw9qUG_planSectionToggle:hover,.cw9qUG_planCardHeader:hover{background:color-mix(in srgb, var(--dsw-alias-button-ghost-active-fill) 46%, transparent)}.cw9qUG_planSectionToggle>span{align-items:baseline;gap:7px;min-width:0;display:flex}.cw9qUG_planSectionToggle strong{font-size:10.5px}.cw9qUG_planSectionToggle small{color:var(--dsw-alias-label-tertiary);font-size:9px}.cw9qUG_planList{border-top:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:0;display:flex}.cw9qUG_planEmpty{color:var(--dsw-alias-label-tertiary);text-align:center;margin:0;padding:12px;font-size:10px}.cw9qUG_planCard{background:0 0;border:0;border-radius:0;min-width:0;margin:0;padding:0;display:block;position:relative}.cw9qUG_planCard+.cw9qUG_planCard{border-top:1px solid var(--dsw-alias-border-l2)}.cw9qUG_planCard[data-open=true]{background:color-mix(in srgb, var(--dsw-alias-bg-base) 62%, transparent)}.cw9qUG_planCardHeader{grid-template-columns:minmax(80px,.9fr) minmax(72px,1.15fr) auto 12px;align-items:center;gap:7px;min-height:40px;padding:6px 9px;display:grid}.cw9qUG_planCardIdentity{flex-direction:column;gap:1px;min-width:0;display:flex}.cw9qUG_planCardIdentity strong,.cw9qUG_planTaskSummary{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;font-size:10px;font-weight:650;line-height:14px;overflow:hidden}.cw9qUG_planCardIdentity>span,.cw9qUG_planCardMeta{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:8.5px;line-height:12px;overflow:hidden}.cw9qUG_planTaskId{background:var(--dsw-alias-button-ghost-active-fill);width:max-content;color:var(--dsw-alias-label-secondary);border-radius:4px;padding:1px 5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:8.5px;font-weight:700;line-height:14px}.cw9qUG_planDirty{background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 13%, transparent);color:var(--dsw-alias-state-warn-primary);border-radius:999px;justify-self:end;padding:1px 5px;font-size:8px;font-style:normal;font-weight:650;line-height:14px}.cw9qUG_planChevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .18s cubic-bezier(.2,.7,.2,1)}.cw9qUG_planChevron[data-open=true]{transform:rotate(90deg)}.cw9qUG_planCardBody{flex-direction:column;gap:8px;padding:0 9px 9px;display:flex}.cw9qUG_planCardBody fieldset{border:0;flex-direction:column;gap:7px;min-width:0;margin:0;padding:0;display:flex}.cw9qUG_planCardBody label,.cw9qUG_planNewTask label{min-width:0;color:var(--dsw-alias-label-tertiary);flex-direction:column;flex:1;gap:4px;font-size:9px;display:flex}.cw9qUG_planCardBody label small{color:var(--dsw-alias-label-tertiary);font-size:8px;line-height:11px}.cw9qUG_planCard input,.cw9qUG_planCard textarea,.cw9qUG_planCard select,.cw9qUG_planNewTask input{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);width:100%;min-width:0;color:var(--dsw-alias-label-primary);font:inherit;border-radius:6px;outline:none;font-size:10.5px;line-height:16px;transition:border-color .16s,box-shadow .16s}.cw9qUG_planCard input,.cw9qUG_planCard select,.cw9qUG_planNewTask input{min-height:32px;padding:6px 8px}.cw9qUG_planCard textarea{resize:vertical;min-height:58px;padding:7px 8px}.cw9qUG_planCard input:focus-visible,.cw9qUG_planCard textarea:focus-visible,.cw9qUG_planCard select:focus-visible,.cw9qUG_planNewTask input:focus-visible{border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary) 16%, transparent)}.cw9qUG_planGrid{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:6px;display:grid}.cw9qUG_planModelPicker{grid-template-columns:minmax(0,1fr);gap:5px;display:grid}.cw9qUG_planModelMenu{width:100%;display:flex}.cw9qUG_planModelTrigger{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);width:100%;min-height:38px;color:var(--dsw-alias-label-primary);cursor:pointer;text-align:left;border-radius:7px;justify-content:space-between;align-items:center;gap:8px;padding:7px 9px;transition:border-color .16s,background-color .16s,transform .12s;display:flex}.cw9qUG_planModelTrigger:hover:not(:disabled){border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-interactive-bg-hover)}.cw9qUG_planModelTrigger:active:not(:disabled){transform:translateY(1px)}.cw9qUG_planModelTrigger:focus-visible{border-color:var(--dsw-alias-state-business-primary);outline:2px solid color-mix(in srgb, var(--dsw-alias-state-business-primary) 16%, transparent);outline-offset:1px}.cw9qUG_planModelTrigger:disabled{cursor:wait;opacity:.64}.cw9qUG_planModelTriggerCopy{align-items:baseline;gap:6px;min-width:0;display:flex}.cw9qUG_planModelTriggerCopy strong,.cw9qUG_planModelTriggerCopy span{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.cw9qUG_planModelTriggerCopy strong{color:var(--dsw-alias-label-primary);font-size:10px;font-weight:650;line-height:15px}.cw9qUG_planModelTriggerCopy span{color:var(--dsw-alias-label-tertiary);font-size:9px;line-height:14px}.cw9qUG_planModelMenuRow{grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:8px;width:100%;min-width:0;display:grid}.cw9qUG_planModelMenuRow>span:first-child{color:var(--dsw-alias-label-primary)}.cw9qUG_planModelMenuRow strong{color:var(--dsw-alias-label-tertiary);text-align:right;text-overflow:ellipsis;white-space:nowrap;font-weight:450;overflow:hidden}.cw9qUG_planModelMenuBack{align-items:center;gap:7px;display:inline-flex}.cw9qUG_planModelMenuBack svg{transform:rotate(180deg)}.cw9qUG_planModelEffortRow{flex-direction:column;align-items:flex-start;min-width:0;display:flex}.cw9qUG_planModelEffortRow small{width:100%;color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:10px;line-height:14px;overflow:hidden}.cw9qUG_planModelHint{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:8.5px;line-height:12px;overflow:hidden}.cw9qUG_planModelNotice{background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 9%, transparent);color:var(--dsw-alias-label-secondary);border-radius:6px;grid-column:1/-1;justify-content:space-between;align-items:center;gap:8px;padding:6px 7px;font-size:8.5px;line-height:12px;display:flex}.cw9qUG_planModelNotice button{color:var(--dsw-alias-state-business-primary);cursor:pointer;font:inherit;background:0 0;border:0;flex:none;padding:2px 6px;font-weight:650}.cw9qUG_planActions,.cw9qUG_planApproveRow,.cw9qUG_planNewTask,.cw9qUG_planConfirm,.cw9qUG_planApproveActions,.cw9qUG_planSecondaryActions{align-items:center;gap:7px;display:flex}.cw9qUG_planReviewActions{grid-template-columns:minmax(0,1fr);gap:6px;width:100%;display:grid}.cw9qUG_planSecondaryActions{grid-template-columns:minmax(0,1fr) auto;display:grid}.cw9qUG_planActions{justify-content:flex-end}.cw9qUG_planActions button,.cw9qUG_planNewTask button,.cw9qUG_planApproveRow button,.cw9qUG_planConfirm button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-button-ghost-active-fill);min-height:30px;color:var(--dsw-alias-label-primary);cursor:pointer;border-radius:6px;flex:none;padding:5px 10px;font-size:9.5px;font-weight:600;transition:background .16s,border-color .16s,transform .16s}.cw9qUG_planActions button:hover:not(:disabled),.cw9qUG_planNewTask button:hover:not(:disabled),.cw9qUG_planApproveRow button:hover:not(:disabled),.cw9qUG_planConfirm button:hover:not(:disabled){border-color:var(--dsw-alias-label-tertiary)}.cw9qUG_planActions button:active:not(:disabled),.cw9qUG_planNewTask button:active:not(:disabled),.cw9qUG_planApproveRow button:active:not(:disabled),.cw9qUG_planConfirm button:active:not(:disabled){transform:scale(.98)}.cw9qUG_planActions button[data-danger],.cw9qUG_planConfirm button[data-danger]{color:var(--dsw-alias-state-error-primary)}.cw9qUG_planFeedback{min-width:0;color:var(--dsw-alias-label-secondary);flex:1;align-items:center;gap:5px;font-size:9px;line-height:13px;animation:.18s ease-out cw9qUG_plan-feedback-in;display:inline-flex}.cw9qUG_planFeedback[data-tone=success]{color:var(--dsw-alias-state-success-primary)}.cw9qUG_planFeedback[data-tone=error]{color:var(--dsw-alias-state-error-primary)}.cw9qUG_planFeedback>span{border:1px solid;border-radius:50%;flex:none;place-items:center;width:15px;height:15px;display:grid}.cw9qUG_planFeedback svg{width:11px;height:11px}@keyframes cw9qUG_plan-feedback-in{0%{opacity:0;transform:translateY(-2px)}to{opacity:1;transform:translateY(0)}}.cw9qUG_planConfirm{border:1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 30%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 7%, transparent);border-radius:7px;flex-wrap:wrap;justify-content:flex-end;padding:7px}.cw9qUG_planConfirm>span{min-width:140px;color:var(--dsw-alias-label-secondary);flex:1;font-size:9px;line-height:13px}.cw9qUG_planNewTask{align-items:flex-end}.cw9qUG_planNewTask label{gap:4px}.cw9qUG_planNewTask label>span{line-height:13px}.cw9qUG_planApproveRow{z-index:1;border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 94%, transparent);min-height:50px;box-shadow:0 -5px 16px color-mix(in srgb, var(--dsw-alias-bg-base) 35%, transparent);backdrop-filter:blur(8px);border-radius:8px;flex-direction:column;justify-content:flex-end;align-items:stretch;margin:0 -4px -4px;padding:8px;position:sticky;bottom:0}.cw9qUG_planApproveRow[data-armed=true]{border-color:color-mix(in srgb, var(--dsw-alias-state-business-primary) 45%, var(--dsw-alias-border-l2))}.cw9qUG_planApproveRow[data-discard=true]{border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 45%, var(--dsw-alias-border-l2))}.cw9qUG_planApproveCopy{flex-direction:column;flex:1;gap:2px;min-width:0;display:flex}.cw9qUG_planApproveCopy strong{color:var(--dsw-alias-label-primary);font-size:9.5px;line-height:13px}.cw9qUG_planApproveCopy small{color:var(--dsw-alias-label-tertiary);font-size:8.5px;line-height:12px}.cw9qUG_planApproveRow button{background:var(--dsw-alias-state-business-primary);min-height:32px;color:var(--dsw-alias-label-primary-inverted);padding-inline:13px}.cw9qUG_planReviewActions>button[data-plan-approve]{width:100%}.cw9qUG_planApproveActions>button:first-child{background:var(--dsw-alias-button-ghost-active-fill);color:var(--dsw-alias-label-primary)}.cw9qUG_planSecondaryActions>button,.cw9qUG_planApproveActions>button[data-danger]{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-button-ghost-active-fill);color:var(--dsw-alias-label-primary)}.cw9qUG_planSecondaryActions>button[data-danger],.cw9qUG_planApproveActions>button[data-danger]{color:var(--dsw-alias-state-error-primary)}.cw9qUG_planSectionToggle:focus-visible,.cw9qUG_planCardHeader:focus-visible,.cw9qUG_planActions button:focus-visible,.cw9qUG_planNewTask button:focus-visible,.cw9qUG_planApproveRow button:focus-visible,.cw9qUG_planConfirm button:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}.cw9qUG_planActions button:disabled,.cw9qUG_planNewTask button:disabled,.cw9qUG_planApproveRow button:disabled{cursor:default;opacity:.55}.cw9qUG_historicPill{background:var(--dsw-alias-button-ghost-active-fill);color:var(--dsw-alias-label-tertiary);border-radius:4px;flex:none;margin-left:auto;padding:1px 7px;font-size:9.5px;font-weight:600;line-height:15px}.cw9qUG_members{flex-direction:column;gap:3px;display:flex}.cw9qUG_archiveLabel{color:var(--dsw-alias-label-tertiary);padding:5px 14px 0;font-size:9.5px;font-weight:600;line-height:14px;display:block}.cw9qUG_taskChain{align-items:center;gap:8px;min-width:0;margin:10px 0 4px;display:flex}.cw9qUG_taskChainTitle{color:var(--dsw-alias-label-secondary);flex:none;align-items:center;gap:5px;font-size:10.5px;line-height:16px;display:inline-flex}.cw9qUG_taskChainTitle svg{width:13px;height:13px}.cw9qUG_taskChainTrack{scrollbar-width:thin;scrollbar-color:color-mix(in srgb, var(--dsw-alias-label-secondary) 40%, transparent) transparent;align-items:center;gap:6px;min-width:0;padding:2px 1px;display:flex;overflow-x:auto}.cw9qUG_taskChip{--chip-tone:var(--dsw-alias-label-tertiary);border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 80%, transparent);max-width:230px;color:var(--dsw-alias-label-secondary);font:inherit;white-space:nowrap;border-radius:999px;flex:none;align-items:center;gap:5px;padding:3px 8px;font-size:10.5px;line-height:15px;display:inline-flex}.cw9qUG_taskChip:hover{border-color:var(--dsw-alias-state-business-primary)}.cw9qUG_taskChip[data-state=running],.cw9qUG_taskChip[data-state=claimed]{--chip-tone:var(--dsw-alias-state-business-primary)}.cw9qUG_taskChip[data-state=completed]{--chip-tone:var(--dsw-alias-state-success-primary)}.cw9qUG_taskChip[data-state=failed]{--chip-tone:var(--dsw-alias-state-error-primary)}.cw9qUG_taskChip[data-state=blocked]{--chip-tone:var(--dsw-alias-state-warning-primary)}.cw9qUG_taskChip[data-state=cancelled]{--chip-tone:var(--dsw-alias-label-tertiary)}.cw9qUG_taskChip[data-selected]{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 14%, var(--dsw-alias-bg-layer-1));color:var(--dsw-alias-label-primary)}.cw9qUG_taskChipDot{background:var(--chip-tone);border-radius:50%;flex:none;width:6px;height:6px}.cw9qUG_taskChipId{color:var(--dsw-alias-label-primary);font-weight:600}.cw9qUG_taskChipOwner{text-overflow:ellipsis;overflow:hidden}.cw9qUG_taskChipDep{color:var(--dsw-alias-label-tertiary);font-size:9.5px}.cw9qUG_taskChipGlyph{color:var(--chip-tone);font-size:9px}.cw9qUG_memberBlock[data-realm=high] .cw9qUG_memberArt{filter:drop-shadow(0 1px 1px #122d4833)drop-shadow(0 0 5px #ffd97ab3)}.cw9qUG_memberBlock[data-realm=high] .cw9qUG_memberRow{border-color:color-mix(in srgb, #ffd97a 26%, var(--dsw-alias-border-l2))}@media (prefers-reduced-motion:reduce){.cw9qUG_panel,.cw9qUG_badge,.cw9qUG_badgeDot,.cw9qUG_panelDot,.cw9qUG_workGlyph rect,.cw9qUG_stateArt,.cw9qUG_memberAvatar[data-unread=true]:after,.cw9qUG_planChevron,.cw9qUG_planFeedback,.cw9qUG_planActions button,.cw9qUG_planNewTask button,.cw9qUG_planApproveRow button,.cw9qUG_planConfirm button,.cw9qUG_planCard input,.cw9qUG_planCard textarea,.cw9qUG_planCard select,.cw9qUG_planNewTask input{transition:none;animation:none}}@media (width<=960px){html[data-agent-teams-panel-open] [data-phase=active]{padding-right:0}}@media (width<=640px){.cw9qUG_badge{top:56px;right:10px}.cw9qUG_teamStats span[data-stat=messages]{display:none}.cw9qUG_captainNode{grid-template-columns:48px minmax(0,1fr)}.cw9qUG_captainState{display:none}.cw9qUG_delegationTree{margin-left:12px;padding-left:15px}.cw9qUG_memberBranch{width:15px}.cw9qUG_assignmentLine{padding-left:53px}.cw9qUG_planFlow li{gap:4px;font-size:8px}.cw9qUG_planFlow li:not(:last-child):after{margin-right:3px}.cw9qUG_planCardHeader{grid-template-columns:auto minmax(0,1fr) auto}.cw9qUG_planCardHeader .cw9qUG_planCardMeta{display:none}.cw9qUG_planGrid,.cw9qUG_planModelPicker{grid-template-columns:minmax(0,1fr)}.cw9qUG_planNewTask,.cw9qUG_planApproveRow{flex-direction:column;align-items:stretch}.cw9qUG_planNewTask button,.cw9qUG_planApproveRow>button,.cw9qUG_planApproveActions,.cw9qUG_planReviewActions{width:100%}.cw9qUG_planApproveActions button,.cw9qUG_planReviewActions button,.cw9qUG_planSecondaryActions button{flex:1}}@container cw9qUG_agent-team (width<=360px){.cw9qUG_planEditor{margin-inline:0;padding-inline:10px}.cw9qUG_planHeader>span{align-items:flex-start}.cw9qUG_planFlow li{gap:3px;font-size:7.5px}.cw9qUG_planFlow li:not(:last-child):after{min-width:4px;margin-right:2px}.cw9qUG_planSecondaryActions,.cw9qUG_planApproveActions{grid-template-columns:minmax(0,1fr);width:100%;display:grid}.cw9qUG_planSecondaryActions button,.cw9qUG_planApproveActions button{width:100%}}.cw9qUG_dagOwner{text-overflow:ellipsis;max-width:64px;margin-left:auto;font-size:9px;font-weight:400;overflow:hidden}.cw9qUG_team[data-workspace-team]{--workspace-surface:var(--dsw-alias-bg-layer-1);--workspace-line:color-mix(in srgb, var(--dsw-alias-border-l2) 75%, transparent);--workspace-shadow:0 3px 14px color-mix(in srgb, var(--dsw-alias-label-primary) 3%, transparent);background:0 0;border:0;gap:14px;padding:0;container:none}.cw9qUG_team[data-workspace-team] .cw9qUG_teamHead{flex-wrap:wrap;gap:8px;padding:0 2px 2px}.cw9qUG_team[data-workspace-team] .cw9qUG_teamName{flex-basis:160px;font-size:14px;line-height:1.5}.cw9qUG_team[data-workspace-team] .cw9qUG_teamStats{flex-wrap:wrap;font-size:11px}.cw9qUG_team[data-workspace-team] .cw9qUG_teamStopButton{border-radius:9px;width:32px;height:32px}.cw9qUG_team[data-workspace-team] .cw9qUG_delegationSection,.cw9qUG_team[data-workspace-team] .cw9qUG_dependencySection,.cw9qUG_completionCard,.cw9qUG_inboxCard{border:1px solid var(--workspace-line);background:var(--workspace-surface);min-width:0;box-shadow:var(--workspace-shadow);box-sizing:border-box;border-radius:18px;margin:0;padding:18px}.cw9qUG_team[data-workspace-team] .cw9qUG_captainNode{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 4%, var(--dsw-alias-bg-module-platform));border-color:var(--workspace-line);border-radius:12px;grid-template-columns:44px minmax(0,1fr);gap:8px;padding:10px}.cw9qUG_team[data-workspace-team] .cw9qUG_captainState{grid-column:2;justify-self:start;font-size:11px}.cw9qUG_team[data-workspace-team] .cw9qUG_captainName{font-size:14px}.cw9qUG_team[data-workspace-team] .cw9qUG_captainRole{font-size:11px}.cw9qUG_team[data-workspace-team] .cw9qUG_captainSummary{white-space:normal;font-size:12px;line-height:1.6}.cw9qUG_team[data-workspace-team] .cw9qUG_progressOverview{gap:9px;margin:16px 0}.cw9qUG_team[data-workspace-team] .cw9qUG_progressSegments{gap:4px}.cw9qUG_team[data-workspace-team] .cw9qUG_progressSegments>span{border-radius:4px;height:6px}.cw9qUG_team[data-workspace-team] .cw9qUG_progressLegend{gap:8px 12px;font-size:11px}.cw9qUG_team[data-workspace-team] .cw9qUG_progressSummary{font-size:11px;line-height:1.6}.cw9qUG_team[data-workspace-team] .cw9qUG_progressSummary>span:last-child{white-space:normal}.cw9qUG_team[data-workspace-team] .cw9qUG_membersToggle{background:var(--dsw-alias-bg-module-platform);border-radius:9px;padding:10px;font-size:11px}.cw9qUG_team[data-workspace-team] .cw9qUG_memberBlock{padding-top:14px;padding-bottom:8px}.cw9qUG_team[data-workspace-team] .cw9qUG_memberRow{border-radius:9px}.cw9qUG_team[data-workspace-team] .cw9qUG_memberLine{flex-wrap:wrap;gap:4px 6px}.cw9qUG_team[data-workspace-team] .cw9qUG_memberName{font-size:13px}.cw9qUG_team[data-workspace-team] .cw9qUG_memberRole,.cw9qUG_team[data-workspace-team] .cw9qUG_memberState,.cw9qUG_team[data-workspace-team] .cw9qUG_memberCount{font-size:11px}.cw9qUG_team[data-workspace-team] .cw9qUG_memberRole{background:var(--dsw-alias-bg-module-platform);border-radius:5px;padding:1px 5px}.cw9qUG_team[data-workspace-team] .cw9qUG_memberStatusLine{white-space:normal;font-size:12px;line-height:1.6}.cw9qUG_team[data-workspace-team] .cw9qUG_assignmentLine{flex-wrap:wrap;row-gap:5px}.cw9qUG_team[data-workspace-team] .cw9qUG_assignmentLabel{font-size:10px}.cw9qUG_team[data-workspace-team] .cw9qUG_assignmentChip{border-radius:5px;font-size:10px;line-height:18px}.cw9qUG_team[data-workspace-team] .cw9qUG_memberBlock[data-selected-member] .cw9qUG_memberRow{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:3px}.cw9qUG_team[data-workspace-team] .cw9qUG_sectionHead{flex-wrap:wrap;gap:8px;margin-bottom:18px}.cw9qUG_team[data-workspace-team] .cw9qUG_sectionToggleTitle{font-size:12px}.cw9qUG_team[data-workspace-team] .cw9qUG_sectionHint{white-space:normal;font-size:11px;line-height:1.6}.cw9qUG_team[data-workspace-team] .cw9qUG_dagViewport{padding:4px 2px 14px}.cw9qUG_team[data-workspace-team] .cw9qUG_dagNode{background:var(--workspace-surface);border-radius:11px;padding:10px 11px}.cw9qUG_team[data-workspace-team] .cw9qUG_dagNodeHead{margin-bottom:6px;font-size:11px}.cw9qUG_team[data-workspace-team] .cw9qUG_dagNodeLabel{white-space:normal;-webkit-line-clamp:2;letter-spacing:0;-webkit-box-orient:vertical;font-size:12px;line-height:1.4;display:-webkit-box;overflow:hidden}.cw9qUG_team[data-workspace-team] .cw9qUG_dagOwner{white-space:nowrap;max-width:105px;font-size:10px}.cw9qUG_team[data-workspace-team] .cw9qUG_taskDetail{border-radius:11px;margin-top:14px;padding:14px}.cw9qUG_team[data-workspace-team] .cw9qUG_taskDetailSubject{white-space:normal;font-size:13px;line-height:1.6}.cw9qUG_team[data-workspace-team] .cw9qUG_taskDetailLine,.cw9qUG_team[data-workspace-team] .cw9qUG_taskDetailMeta{font-size:12px;line-height:1.6}.cw9qUG_team[data-workspace-team] .cw9qUG_planEditor{background:var(--workspace-surface);border-color:var(--workspace-line);border-radius:18px;margin:0;padding:18px}.cw9qUG_team[data-workspace-team] .cw9qUG_planApproveRow{position:static}.cw9qUG_workspaceSummary{grid-template-columns:minmax(0,1fr);gap:14px;min-width:0;display:grid}.cw9qUG_completionCard h3,.cw9qUG_inboxCard h3{color:var(--dsw-alias-label-secondary);margin:0;font-size:12px;font-weight:600;line-height:1.6}.cw9qUG_completionBody{flex-wrap:wrap;align-items:center;gap:20px;margin-top:16px;display:flex}.cw9qUG_completionRing{flex:none;width:132px;height:132px;position:relative}.cw9qUG_completionRing svg{width:100%;height:100%;transform:rotate(-90deg)}.cw9qUG_completionRing circle{fill:none;stroke-width:7px}.cw9qUG_ringTrack{stroke:var(--dsw-alias-border-l2)}.cw9qUG_ringValue{stroke:var(--dsw-alias-state-business-primary)}.cw9qUG_completionRing>span{color:var(--dsw-alias-label-secondary);flex-direction:column;justify-content:center;align-items:center;gap:5px;font-size:11px;display:flex;position:absolute;inset:0}.cw9qUG_completionRing strong{color:var(--dsw-alias-label-primary);letter-spacing:-.7px;font-variant-numeric:tabular-nums;font-size:26px;font-weight:600;line-height:1.2}.cw9qUG_completionRing small{font-size:18px;font-weight:450}.cw9qUG_completionTasks{flex:200px;min-width:0;max-height:216px;margin:0;padding:2px;list-style:none;overflow:auto}.cw9qUG_completionTasks li{border-bottom:1px solid var(--workspace-line);grid-template-columns:18px auto minmax(0,1fr) auto;align-items:center;gap:8px;padding:7px 0;font-size:11px;display:grid}.cw9qUG_completionTasks li:last-child{border:0}.cw9qUG_completionDot{background:var(--dsw-alias-bg-module-platform);width:16px;height:16px;color:var(--dsw-alias-label-secondary);border-radius:50%;place-items:center;display:grid}.cw9qUG_completionTasks li[data-state=completed] .cw9qUG_completionDot{background:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted)}.cw9qUG_completionTasks li[data-state=failed] .cw9qUG_completionDot{background:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-label-primary-inverted)}.cw9qUG_completionTaskId{text-overflow:ellipsis;white-space:nowrap;max-width:6em;color:var(--dsw-alias-label-secondary);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;overflow:hidden}.cw9qUG_completionTaskSubject{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.cw9qUG_completionTaskStatus{color:var(--dsw-alias-label-secondary);font-size:10px}.cw9qUG_completionTasks li[data-verdict-stale] .cw9qUG_completionDot{background:var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-label-primary)}.cw9qUG_completionTasks li[data-verdict-stale] .cw9qUG_completionTaskStatus{font-weight:600}.cw9qUG_completionTasks:focus-visible,.cw9qUG_inboxMessages:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:3px;border-radius:4px}.cw9qUG_inboxCard>header{flex-wrap:wrap;align-items:baseline;gap:6px 12px;display:flex}.cw9qUG_inboxCard>header>span{color:var(--dsw-alias-label-secondary);font-size:10px}.cw9qUG_inboxMessages{max-height:260px;margin:14px 0 0;padding:0;list-style:none;overflow:auto}.cw9qUG_inboxMessages li{align-items:start;gap:9px;margin:0 0 12px;display:flex}.cw9qUG_inboxMessages img,.cw9qUG_inboxInitial{object-fit:contain;flex:none;width:30px;height:30px}.cw9qUG_inboxInitial{background:var(--dsw-alias-bg-module-platform);border-radius:9px;place-items:center;font-size:12px;display:grid}.cw9qUG_inboxMessages li>div{flex:1;min-width:0}.cw9qUG_inboxMessages strong{overflow-wrap:anywhere;font-size:11px;font-weight:550}.cw9qUG_inboxMessages p{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 6%, var(--dsw-alias-bg-module-platform));white-space:pre-wrap;overflow-wrap:anywhere;border-radius:0 10px 10px;margin:5px 0 0;padding:9px 11px;font-size:12px;line-height:1.6}.cw9qUG_summaryEmpty{color:var(--dsw-alias-label-secondary);margin:14px 0 0;font-size:12px;line-height:1.8}@container (width>=800px){.cw9qUG_team[data-workspace-team]{grid-template-columns:minmax(280px,.8fr) minmax(0,1.4fr);align-items:start;gap:16px;display:grid}.cw9qUG_team[data-workspace-team]>.cw9qUG_teamHead,.cw9qUG_team[data-workspace-team]>[data-staging-editor],.cw9qUG_workspaceSummary{grid-column:1/-1}.cw9qUG_workspaceSummary{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}.cw9qUG_team[data-workspace-team] .cw9qUG_dependencySection{align-self:stretch}.cw9qUG_team[data-workspace-team] .cw9qUG_dagCanvas[data-layout=parallel]{grid-template-columns:repeat(2,minmax(0,1fr))}}@container (width<=400px){.cw9qUG_team[data-workspace-team] .cw9qUG_delegationSection,.cw9qUG_team[data-workspace-team] .cw9qUG_dependencySection,.cw9qUG_completionCard,.cw9qUG_inboxCard{border-radius:14px;padding:12px}.cw9qUG_team[data-workspace-team] .cw9qUG_teamStats{gap:6px;font-size:10px}.cw9qUG_completionBody{justify-content:center}}.cw9qUG_progressSegments>span[data-state=claimed],.cw9qUG_dagNode[data-state=claimed] .cw9qUG_dagNodeDot{background:var(--dsw-alias-state-warn-primary)}.cw9qUG_progressLegend>span[data-state=claimed]{color:var(--dsw-alias-state-warn-primary)}.cw9qUG_dagNode[data-state=claimed]{border-color:var(--dsw-alias-state-warn-primary)}.cw9qUG_dagNode[data-state=claimed] .cw9qUG_dagNodeHead{padding-right:38px}.cw9qUG_dagClaimedState{color:var(--dsw-alias-state-warn-primary);font-size:8px;line-height:10px;position:absolute;top:4px;right:5px}.cw9qUG_assignmentChip[data-state=claimed],.cw9qUG_taskDetailBadge[data-state=claimed]{background:var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-label-primary-inverted)}.cw9qUG_planContract{background:#14100c59;border:1px solid #f2c14e40;border-radius:6px;gap:6px;margin:8px 0;padding:8px 10px;font-size:12px;display:grid}.cw9qUG_planContract p{margin:0}.cw9qUG_planContract ul{margin:2px 0 0;padding-left:18px}.cw9qUG_planContract code{white-space:pre-wrap;word-break:break-all}.cw9qUG_planContractTitle{color:#f2c14e;font-weight:700}";
		const tagId$9 = "dsh-pixel-team/ActivityPanel.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$9) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-pixel-team";
			tag.dataset.pluginCss = tagId$9;
			tag.textContent = css$9;
			document.head.appendChild(tag);
		}
		var ActivityPanel_module_css_default = {
			"agent-team": "cw9qUG_agent-team",
			"agentTeamsBreathe": "cw9qUG_agentTeamsBreathe",
			"agentTeamsDot": "cw9qUG_agentTeamsDot",
			"agentTeamsFloat": "cw9qUG_agentTeamsFloat",
			"agentTeamsPanelIn": "cw9qUG_agentTeamsPanelIn",
			"agentTeamsPulse": "cw9qUG_agentTeamsPulse",
			"agentTeamsThink": "cw9qUG_agentTeamsThink",
			"agentTeamsUnreadPulse": "cw9qUG_agentTeamsUnreadPulse",
			"archiveLabel": "cw9qUG_archiveLabel",
			"assignmentChip": "cw9qUG_assignmentChip",
			"assignmentLabel": "cw9qUG_assignmentLabel",
			"assignmentLine": "cw9qUG_assignmentLine",
			"assignmentTasks": "cw9qUG_assignmentTasks",
			"badge": "cw9qUG_badge",
			"badgeCount": "cw9qUG_badgeCount",
			"badgeDot": "cw9qUG_badgeDot",
			"captainAvatar": "cw9qUG_captainAvatar",
			"captainInfo": "cw9qUG_captainInfo",
			"captainLine": "cw9qUG_captainLine",
			"captainName": "cw9qUG_captainName",
			"captainNode": "cw9qUG_captainNode",
			"captainRole": "cw9qUG_captainRole",
			"captainState": "cw9qUG_captainState",
			"captainSummary": "cw9qUG_captainSummary",
			"chevron": "cw9qUG_chevron",
			"cleanupButton": "cw9qUG_cleanupButton",
			"cleanupMessage": "cw9qUG_cleanupMessage",
			"completionBody": "cw9qUG_completionBody",
			"completionCard": "cw9qUG_completionCard",
			"completionDot": "cw9qUG_completionDot",
			"completionRing": "cw9qUG_completionRing",
			"completionTaskId": "cw9qUG_completionTaskId",
			"completionTaskStatus": "cw9qUG_completionTaskStatus",
			"completionTaskSubject": "cw9qUG_completionTaskSubject",
			"completionTasks": "cw9qUG_completionTasks",
			"dagCanvas": "cw9qUG_dagCanvas",
			"dagClaimedState": "cw9qUG_dagClaimedState",
			"dagEdges": "cw9qUG_dagEdges",
			"dagNode": "cw9qUG_dagNode",
			"dagNodeDot": "cw9qUG_dagNodeDot",
			"dagNodeHead": "cw9qUG_dagNodeHead",
			"dagNodeLabel": "cw9qUG_dagNodeLabel",
			"dagOwner": "cw9qUG_dagOwner",
			"dagPortrait": "cw9qUG_dagPortrait",
			"dagRunningState": "cw9qUG_dagRunningState",
			"dagViewport": "cw9qUG_dagViewport",
			"delegationSection": "cw9qUG_delegationSection",
			"delegationTree": "cw9qUG_delegationTree",
			"dependencySection": "cw9qUG_dependencySection",
			"dependencyViews": "cw9qUG_dependencyViews",
			"emptyHint": "cw9qUG_emptyHint",
			"historicPill": "cw9qUG_historicPill",
			"iconButton": "cw9qUG_iconButton",
			"inboxCard": "cw9qUG_inboxCard",
			"inboxInitial": "cw9qUG_inboxInitial",
			"inboxMessages": "cw9qUG_inboxMessages",
			"leadAvatar": "cw9qUG_leadAvatar",
			"memberArt": "cw9qUG_memberArt",
			"memberAvatar": "cw9qUG_memberAvatar",
			"memberBlock": "cw9qUG_memberBlock",
			"memberBranch": "cw9qUG_memberBranch",
			"memberCount": "cw9qUG_memberCount",
			"memberInfo": "cw9qUG_memberInfo",
			"memberInitial": "cw9qUG_memberInitial",
			"memberLevel": "cw9qUG_memberLevel",
			"memberLine": "cw9qUG_memberLine",
			"memberModel": "cw9qUG_memberModel",
			"memberName": "cw9qUG_memberName",
			"memberProgress": "cw9qUG_memberProgress",
			"memberProgressFill": "cw9qUG_memberProgressFill",
			"memberProgressTrack": "cw9qUG_memberProgressTrack",
			"memberRel": "cw9qUG_memberRel",
			"memberRole": "cw9qUG_memberRole",
			"memberRow": "cw9qUG_memberRow",
			"memberState": "cw9qUG_memberState",
			"memberStatusLine": "cw9qUG_memberStatusLine",
			"members": "cw9qUG_members",
			"membersToggle": "cw9qUG_membersToggle",
			"panel": "cw9qUG_panel",
			"panelControls": "cw9qUG_panelControls",
			"panelDot": "cw9qUG_panelDot",
			"panelHead": "cw9qUG_panelHead",
			"panelTitle": "cw9qUG_panelTitle",
			"plan-feedback-in": "cw9qUG_plan-feedback-in",
			"planActions": "cw9qUG_planActions",
			"planApproveActions": "cw9qUG_planApproveActions",
			"planApproveCopy": "cw9qUG_planApproveCopy",
			"planApproveRow": "cw9qUG_planApproveRow",
			"planCard": "cw9qUG_planCard",
			"planCardBody": "cw9qUG_planCardBody",
			"planCardHeader": "cw9qUG_planCardHeader",
			"planCardIdentity": "cw9qUG_planCardIdentity",
			"planCardMeta": "cw9qUG_planCardMeta",
			"planChevron": "cw9qUG_planChevron",
			"planConfirm": "cw9qUG_planConfirm",
			"planContract": "cw9qUG_planContract",
			"planContractTitle": "cw9qUG_planContractTitle",
			"planDirty": "cw9qUG_planDirty",
			"planEditor": "cw9qUG_planEditor",
			"planEmpty": "cw9qUG_planEmpty",
			"planFeedback": "cw9qUG_planFeedback",
			"planFlow": "cw9qUG_planFlow",
			"planGrid": "cw9qUG_planGrid",
			"planHeader": "cw9qUG_planHeader",
			"planList": "cw9qUG_planList",
			"planModelEffortRow": "cw9qUG_planModelEffortRow",
			"planModelHint": "cw9qUG_planModelHint",
			"planModelMenu": "cw9qUG_planModelMenu",
			"planModelMenuBack": "cw9qUG_planModelMenuBack",
			"planModelMenuRow": "cw9qUG_planModelMenuRow",
			"planModelNotice": "cw9qUG_planModelNotice",
			"planModelPicker": "cw9qUG_planModelPicker",
			"planModelTrigger": "cw9qUG_planModelTrigger",
			"planModelTriggerCopy": "cw9qUG_planModelTriggerCopy",
			"planNewTask": "cw9qUG_planNewTask",
			"planReviewActions": "cw9qUG_planReviewActions",
			"planSecondaryActions": "cw9qUG_planSecondaryActions",
			"planSection": "cw9qUG_planSection",
			"planSectionToggle": "cw9qUG_planSectionToggle",
			"planTaskId": "cw9qUG_planTaskId",
			"planTaskSummary": "cw9qUG_planTaskSummary",
			"progressEmpty": "cw9qUG_progressEmpty",
			"progressLegend": "cw9qUG_progressLegend",
			"progressOverview": "cw9qUG_progressOverview",
			"progressSegments": "cw9qUG_progressSegments",
			"progressSummary": "cw9qUG_progressSummary",
			"progressSummaryDot": "cw9qUG_progressSummaryDot",
			"progressTitle": "cw9qUG_progressTitle",
			"reportButton": "cw9qUG_reportButton",
			"resizeHandle": "cw9qUG_resizeHandle",
			"ringTrack": "cw9qUG_ringTrack",
			"ringValue": "cw9qUG_ringValue",
			"sectionHead": "cw9qUG_sectionHead",
			"sectionHeadRight": "cw9qUG_sectionHeadRight",
			"sectionHint": "cw9qUG_sectionHint",
			"sectionTitle": "cw9qUG_sectionTitle",
			"sectionToggleTitle": "cw9qUG_sectionToggleTitle",
			"stageLabel": "cw9qUG_stageLabel",
			"stateArt": "cw9qUG_stateArt",
			"statePill": "cw9qUG_statePill",
			"stopAnchor": "cw9qUG_stopAnchor",
			"stopModalActions": "cw9qUG_stopModalActions",
			"stopModalError": "cw9qUG_stopModalError",
			"stopPopover": "cw9qUG_stopPopover",
			"stopPopoverArrow": "cw9qUG_stopPopoverArrow",
			"stopPopoverText": "cw9qUG_stopPopoverText",
			"stopPopoverTitle": "cw9qUG_stopPopoverTitle",
			"summaryEmpty": "cw9qUG_summaryEmpty",
			"taskBoard": "cw9qUG_taskBoard",
			"taskBoardHead": "cw9qUG_taskBoardHead",
			"taskBoardHint": "cw9qUG_taskBoardHint",
			"taskBoardList": "cw9qUG_taskBoardList",
			"taskChain": "cw9qUG_taskChain",
			"taskChainTitle": "cw9qUG_taskChainTitle",
			"taskChainTrack": "cw9qUG_taskChainTrack",
			"taskChip": "cw9qUG_taskChip",
			"taskChipDep": "cw9qUG_taskChipDep",
			"taskChipDot": "cw9qUG_taskChipDot",
			"taskChipGlyph": "cw9qUG_taskChipGlyph",
			"taskChipId": "cw9qUG_taskChipId",
			"taskChipOwner": "cw9qUG_taskChipOwner",
			"taskDetail": "cw9qUG_taskDetail",
			"taskDetailBadge": "cw9qUG_taskDetailBadge",
			"taskDetailHead": "cw9qUG_taskDetailHead",
			"taskDetailId": "cw9qUG_taskDetailId",
			"taskDetailLine": "cw9qUG_taskDetailLine",
			"taskDetailMeta": "cw9qUG_taskDetailMeta",
			"taskDetailModel": "cw9qUG_taskDetailModel",
			"taskDetailSubject": "cw9qUG_taskDetailSubject",
			"taskEmpty": "cw9qUG_taskEmpty",
			"taskId": "cw9qUG_taskId",
			"taskRow": "cw9qUG_taskRow",
			"taskRowDeps": "cw9qUG_taskRowDeps",
			"taskRowDetail": "cw9qUG_taskRowDetail",
			"taskRowDot": "cw9qUG_taskRowDot",
			"taskRowId": "cw9qUG_taskRowId",
			"taskRowOwner": "cw9qUG_taskRowOwner",
			"taskRowStatus": "cw9qUG_taskRowStatus",
			"taskRowSubject": "cw9qUG_taskRowSubject",
			"team": "cw9qUG_team",
			"teamHead": "cw9qUG_teamHead",
			"teamName": "cw9qUG_teamName",
			"teamResumeButton": "cw9qUG_teamResumeButton",
			"teamResumeError": "cw9qUG_teamResumeError",
			"teamStats": "cw9qUG_teamStats",
			"teamStopButton": "cw9qUG_teamStopButton",
			"teams": "cw9qUG_teams",
			"unreadPill": "cw9qUG_unreadPill",
			"viewingBadge": "cw9qUG_viewingBadge",
			"workGlyph": "cw9qUG_workGlyph",
			"workspaceSummary": "cw9qUG_workspaceSummary"
		};
		//#endregion
		//#region lib/client/StagingPlanEditor.js
		/**
		* Editable pre-run roster and DAG review for staged AgentTeams plans.
		*
		* This leaf owns only transient form/disclosure state. Durable truth remains
		* on the host and returns through the ordinary activity polling snapshot.
		* @module dsh-agent-teams/client/staging-plan
		*/
		const PLAN_URL = "/plugins/dsh-pixel-team/plan";
		function useDismissSuccess(feedback, setFeedback) {
			(0, react.useEffect)(() => {
				if (feedback?.tone !== "success") return;
				const timeout = window.setTimeout(() => {
					setFeedback(void 0);
				}, 3500);
				return () => {
					window.clearTimeout(timeout);
				};
			}, [feedback, setFeedback]);
		}
		async function mutatePlan(payload) {
			const response = await fetch(PLAN_URL, {
				method: "POST",
				cache: "no-store",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(payload)
			});
			if (response.ok) return;
			let message = `HTTP ${response.status}`;
			try {
				const body = await response.json();
				if (typeof body.error === "string" && body.error.trim() !== "") message = body.error;
			} catch {}
			throw new Error(message);
		}
		function errorMessage(error) {
			return error instanceof Error ? error.message : String(error);
		}
		function DisclosureChevron({ open }) {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: ActivityPanel_module_css_default.planChevron,
				"data-open": open,
				width: "12",
				height: "12",
				viewBox: "0 0 12 12",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				"aria-hidden": true,
				children: (0, react_jsx_runtime.jsx)("path", { d: "M4 2.5 7.5 6 4 9.5" })
			});
		}
		function Feedback({ value }) {
			if (value === void 0) return null;
			return (0, react_jsx_runtime.jsxs)("span", {
				className: ActivityPanel_module_css_default.planFeedback,
				"data-tone": value.tone,
				role: value.tone === "error" ? "alert" : "status",
				"aria-live": value.tone === "error" ? "assertive" : "polite",
				children: [(0, react_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					children: value.tone === "success" ? (0, react_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 12 12",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.8",
						children: (0, react_jsx_runtime.jsx)("path", { d: "m2.5 6.2 2.2 2.2 4.8-5" })
					}) : (0, react_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 12 12",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.8",
						children: (0, react_jsx_runtime.jsx)("path", { d: "M6 2.3v4.1M6 8.8v.1" })
					})
				}), value.message]
			});
		}
		function routeKey(provider, model) {
			return JSON.stringify([provider, model]);
		}
		const MODEL_MENU_OPEN_MODELS = "open:models";
		const MODEL_MENU_OPEN_EFFORT = "open:effort";
		const MODEL_MENU_BACK = "navigate:back";
		const MODEL_MENU_RETRY = "action:retry";
		const MODEL_MENU_DEFAULT_EFFORT = "effort:default";
		function modelMenuId(provider, model) {
			return `model:${routeKey(provider, model)}`;
		}
		function effortMenuId(effort) {
			return `effort:${effort}`;
		}
		/**
		* Thin staged-plan adapter over the official model directory. It deliberately
		* reads only catalog metadata: choosing a member route must not change the
		* captain session's composer model.
		*/
		function StagedModelPicker({ directory, provider, model, reasoningEffort, busy, onChange, t }) {
			const state = (0, react.useSyncExternalStore)(directory.store.subscribe, directory.store.getSnapshot);
			const [open, setOpen] = (0, react.useState)(false);
			const [pane, setPane] = (0, react.useState)("root");
			const catalogRoutes = state.groups.flatMap((group) => group.models.map((candidate) => ({
				key: routeKey(group.id, candidate.id),
				provider: group.id,
				providerName: group.name,
				model: candidate
			})));
			const selectedKey = routeKey(provider, model);
			const selected = catalogRoutes.find((candidate) => candidate.key === selectedKey);
			const efforts = selected?.model.reasoning?.efforts ?? [];
			const currentMissing = provider !== "" && model !== "" && selected === void 0;
			const defaultEffort = selected?.model.reasoning?.defaultEffort;
			const effectiveEffort = reasoningEffort === "" || reasoningEffort === "default" ? defaultEffort : reasoningEffort;
			const selectedEffort = efforts.find((effort) => effort.id === effectiveEffort);
			const modelLabel = selected?.model.name ?? (model === "" ? t("plan.model.choose") : model);
			const effortLabel = selectedEffort?.name ?? (effectiveEffort === void 0 ? t("plan.model.providerDefault") : effectiveEffort);
			const unavailable = state.status === "error" || state.failures.length > 0;
			const close = () => {
				setOpen(false);
				setPane("root");
			};
			const rootItems = [{
				id: MODEL_MENU_OPEN_MODELS,
				label: (0, react_jsx_runtime.jsxs)("span", {
					className: ActivityPanel_module_css_default.planModelMenuRow,
					children: [
						(0, react_jsx_runtime.jsx)("span", { children: t("plan.member.model") }),
						(0, react_jsx_runtime.jsx)("strong", { children: modelLabel }),
						(0, react_jsx_runtime.jsx)(DisclosureChevron, { open: false })
					]
				}),
				disabled: state.status === "loading" && catalogRoutes.length === 0
			}, {
				id: MODEL_MENU_OPEN_EFFORT,
				label: (0, react_jsx_runtime.jsxs)("span", {
					className: ActivityPanel_module_css_default.planModelMenuRow,
					children: [
						(0, react_jsx_runtime.jsx)("span", { children: t("plan.member.reasoning") }),
						(0, react_jsx_runtime.jsx)("strong", { children: effortLabel }),
						(0, react_jsx_runtime.jsx)(DisclosureChevron, { open: false })
					]
				}),
				disabled: selected?.model.reasoning === void 0
			}];
			const modelItems = [{
				id: MODEL_MENU_BACK,
				label: (0, react_jsx_runtime.jsxs)("span", {
					className: ActivityPanel_module_css_default.planModelMenuBack,
					children: [(0, react_jsx_runtime.jsx)(DisclosureChevron, { open: false }), t("plan.model.back")]
				})
			}, {
				type: "separator",
				id: "models:separator"
			}];
			if (catalogRoutes.length === 0) modelItems.push({
				id: "models:empty",
				label: state.status === "loading" ? t("plan.model.loading") : t("plan.model.empty"),
				disabled: true
			});
			else for (const group of state.groups) {
				modelItems.push({
					type: "label",
					id: `provider:${group.id}`,
					text: group.name
				});
				for (const candidate of group.models) modelItems.push({
					id: modelMenuId(group.id, candidate.id),
					label: candidate.name
				});
			}
			const effortItems = [
				{
					id: MODEL_MENU_BACK,
					label: (0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.planModelMenuBack,
						children: [(0, react_jsx_runtime.jsx)(DisclosureChevron, { open: false }), t("plan.model.back")]
					})
				},
				{
					type: "separator",
					id: "effort:separator"
				},
				{
					id: MODEL_MENU_DEFAULT_EFFORT,
					label: defaultEffort === void 0 ? t("plan.model.providerDefault") : t("plan.model.modelDefault", { effort: efforts.find((effort) => effort.id === defaultEffort)?.name ?? defaultEffort })
				},
				...efforts.map((effort) => ({
					id: effortMenuId(effort.id),
					label: (0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.planModelEffortRow,
						children: [(0, react_jsx_runtime.jsx)("span", { children: effort.name }), effort.description !== void 0 && (0, react_jsx_runtime.jsx)("small", { children: effort.description })]
					})
				}))
			];
			const items = pane === "models" ? modelItems : pane === "effort" ? effortItems : rootItems;
			const selectedId = pane === "models" ? modelMenuId(provider, model) : pane === "effort" ? reasoningEffort === "" || reasoningEffort === "default" ? MODEL_MENU_DEFAULT_EFFORT : effortMenuId(reasoningEffort) : void 0;
			const choose = (id) => {
				if (id === MODEL_MENU_OPEN_MODELS) {
					setPane("models");
					return;
				}
				if (id === MODEL_MENU_OPEN_EFFORT) {
					setPane("effort");
					return;
				}
				if (id === MODEL_MENU_BACK) {
					setPane("root");
					return;
				}
				if (id === MODEL_MENU_RETRY) {
					directory.load().catch(() => void 0);
					return;
				}
				const nextModel = catalogRoutes.find((candidate) => modelMenuId(candidate.provider, candidate.model.id) === id);
				if (nextModel !== void 0) {
					close();
					if (nextModel.provider === provider && nextModel.model.id === model) return;
					onChange({
						provider: nextModel.provider,
						model: nextModel.model.id,
						reasoningEffort: "default"
					});
					return;
				}
				if (id === MODEL_MENU_DEFAULT_EFFORT) {
					close();
					if (effectiveEffort === defaultEffort) return;
					onChange({
						provider,
						model,
						reasoningEffort: "default"
					});
					return;
				}
				const nextEffort = efforts.find((effort) => effortMenuId(effort.id) === id);
				if (nextEffort === void 0) return;
				close();
				if (nextEffort.id === reasoningEffort) return;
				onChange({
					provider,
					model,
					reasoningEffort: nextEffort.id
				});
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: ActivityPanel_module_css_default.planModelPicker,
				"data-model-directory-status": state.status,
				children: [
					(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
						open,
						portal: true,
						align: "end",
						compact: true,
						className: ActivityPanel_module_css_default.planModelMenu,
						items,
						footer: unavailable ? [{
							id: MODEL_MENU_RETRY,
							label: t("plan.model.retry")
						}] : void 0,
						selectedId,
						onSelect: choose,
						onClose: close,
						anchor: (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: ActivityPanel_module_css_default.planModelTrigger,
							"data-plan-model-trigger": true,
							"aria-label": t("plan.model.triggerAria", {
								model: modelLabel,
								effort: effortLabel
							}),
							"aria-haspopup": "menu",
							"aria-expanded": open,
							disabled: busy,
							onClick: () => {
								if (open) close();
								else {
									setPane("root");
									setOpen(true);
									directory.load().catch(() => void 0);
								}
							},
							children: [(0, react_jsx_runtime.jsxs)("span", {
								className: ActivityPanel_module_css_default.planModelTriggerCopy,
								children: [(0, react_jsx_runtime.jsx)("strong", { children: state.status === "loading" && catalogRoutes.length === 0 ? t("plan.model.loading") : modelLabel }), (0, react_jsx_runtime.jsx)("span", { children: effortLabel })]
							}), (0, react_jsx_runtime.jsx)(DisclosureChevron, { open })]
						})
					}),
					(0, react_jsx_runtime.jsx)("small", {
						className: ActivityPanel_module_css_default.planModelHint,
						children: currentMissing ? t("plan.model.currentUnavailable", {
							provider,
							model
						}) : selected?.model.description ?? t("plan.model.route", {
							provider,
							model
						})
					}),
					unavailable && (0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.planModelNotice,
						role: state.status === "error" ? "alert" : "status",
						children: [(0, react_jsx_runtime.jsx)("span", { children: state.error ?? t("plan.model.partialFailure", { count: state.failures.length }) }), (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy || state.status === "loading",
							onClick: () => {
								directory.load().catch(() => void 0);
							},
							children: t("plan.model.retry")
						})]
					})
				]
			});
		}
		function StagedMemberEditor({ team, member, modelDirectory, onPendingChange, t }) {
			const bodyId = (0, react.useId)();
			const [open, setOpen] = (0, react.useState)(false);
			const [role, setRole] = (0, react.useState)(member.role);
			const [provider, setProvider] = (0, react.useState)(member.provider ?? "");
			const [model, setModel] = (0, react.useState)(member.model ?? "");
			const [reasoningEffort, setReasoningEffort] = (0, react.useState)(member.reasoningEffort ?? "");
			const [executionPrompt, setExecutionPrompt] = (0, react.useState)(member.executionPrompt ?? "");
			const remoteSignature = JSON.stringify([
				member.role,
				member.provider ?? "",
				member.model ?? "",
				member.reasoningEffort ?? "",
				member.executionPrompt ?? ""
			]);
			const [savedSignature, setSavedSignature] = (0, react.useState)(remoteSignature);
			const [busy, setBusy] = (0, react.useState)(false);
			const [feedback, setFeedback] = (0, react.useState)();
			useDismissSuccess(feedback, setFeedback);
			const dirty = JSON.stringify([
				role,
				provider,
				model,
				reasoningEffort,
				executionPrompt
			]) !== savedSignature;
			(0, react.useEffect)(() => {
				onPendingChange(`member:${member.name}`, dirty || busy);
				return () => {
					onPendingChange(`member:${member.name}`, false);
				};
			}, [
				busy,
				dirty,
				member.name,
				onPendingChange
			]);
			(0, react.useEffect)(() => {
				setRole(member.role);
				setProvider(member.provider ?? "");
				setModel(member.model ?? "");
				setReasoningEffort(member.reasoningEffort ?? "");
				setExecutionPrompt(member.executionPrompt ?? "");
				setSavedSignature(remoteSignature);
			}, [
				member.role,
				member.provider,
				member.model,
				member.reasoningEffort,
				member.executionPrompt,
				remoteSignature
			]);
			const markEdited = () => {
				setFeedback(void 0);
			};
			const persist = async (selection = {
				provider,
				model,
				reasoningEffort
			}) => {
				const nextSignature = JSON.stringify([
					role,
					selection.provider,
					selection.model,
					selection.reasoningEffort,
					executionPrompt
				]);
				setProvider(selection.provider);
				setModel(selection.model);
				setReasoningEffort(selection.reasoningEffort);
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "update_member",
						memberName: member.name,
						role,
						provider: selection.provider,
						model: selection.model,
						reasoningEffort: selection.reasoningEffort,
						executionPrompt
					});
					setSavedSignature(nextSignature);
					setFeedback({
						tone: "success",
						message: t("plan.saved")
					});
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
				} finally {
					setBusy(false);
				}
			};
			const save = async (event) => {
				event.preventDefault();
				await persist();
			};
			const route = `${provider}/${model}`.replace(/^\//u, "");
			return (0, react_jsx_runtime.jsxs)("article", {
				className: ActivityPanel_module_css_default.planCard,
				"data-plan-member": member.name,
				"data-open": open,
				children: [(0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: ActivityPanel_module_css_default.planCardHeader,
					"aria-expanded": open,
					"aria-controls": bodyId,
					onClick: () => {
						setOpen((current) => !current);
					},
					children: [
						(0, react_jsx_runtime.jsxs)("span", {
							className: ActivityPanel_module_css_default.planCardIdentity,
							children: [(0, react_jsx_runtime.jsx)("strong", { children: member.name }), (0, react_jsx_runtime.jsx)("span", { children: role === "" ? t("plan.member.roleFallback") : roleLabel(role, member.name, t) })]
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: ActivityPanel_module_css_default.planCardMeta,
							title: route,
							children: route
						}),
						dirty && (0, react_jsx_runtime.jsx)("em", {
							className: ActivityPanel_module_css_default.planDirty,
							children: t("plan.unsaved")
						}),
						(0, react_jsx_runtime.jsx)(DisclosureChevron, { open })
					]
				}), open && (0, react_jsx_runtime.jsxs)("form", {
					id: bodyId,
					className: ActivityPanel_module_css_default.planCardBody,
					onSubmit: (event) => {
						save(event);
					},
					children: [(0, react_jsx_runtime.jsxs)("fieldset", {
						disabled: busy,
						children: [
							(0, react_jsx_runtime.jsxs)("label", { children: [t("plan.member.role"), (0, react_jsx_runtime.jsx)("input", {
								name: "role",
								value: role,
								onChange: (event) => {
									setRole(event.currentTarget.value);
									markEdited();
								}
							})] }),
							(0, react_jsx_runtime.jsx)(StagedModelPicker, {
								directory: modelDirectory,
								provider,
								model,
								reasoningEffort,
								busy,
								onChange: (selection) => {
									persist(selection);
								},
								t
							}),
							(0, react_jsx_runtime.jsxs)("label", { children: [t("plan.member.prompt"), (0, react_jsx_runtime.jsx)("textarea", {
								name: "executionPrompt",
								value: executionPrompt,
								onChange: (event) => {
									setExecutionPrompt(event.currentTarget.value);
									markEdited();
								},
								rows: 3
							})] })
						]
					}), (0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.planActions,
						children: [(0, react_jsx_runtime.jsx)(Feedback, { value: feedback }), (0, react_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy || !dirty || provider.trim() === "" || model.trim() === "",
							children: busy ? t("plan.saving") : t("plan.save")
						})]
					})]
				})]
			});
		}
		function StagedTaskEditor({ team, task, onPendingChange, t }) {
			const bodyId = (0, react.useId)();
			const taskDependencies = task.dependencies.join(", ");
			const [open, setOpen] = (0, react.useState)(false);
			const [subject, setSubject] = (0, react.useState)(task.subject);
			const [description, setDescription] = (0, react.useState)(task.description ?? "");
			const [assignee, setAssignee] = (0, react.useState)(task.assignee);
			const [dependencies, setDependencies] = (0, react.useState)(taskDependencies);
			const [skills, setSkills] = (0, react.useState)(() => [...task.skills ?? []]);
			const [skillCatalog, setSkillCatalog] = (0, react.useState)([]);
			const remoteSignature = JSON.stringify([
				task.subject,
				task.description ?? "",
				task.assignee,
				taskDependencies,
				task.skills ?? []
			]);
			const [savedSignature, setSavedSignature] = (0, react.useState)(remoteSignature);
			const [busy, setBusy] = (0, react.useState)(false);
			const [confirmingRemove, setConfirmingRemove] = (0, react.useState)(false);
			const [feedback, setFeedback] = (0, react.useState)();
			useDismissSuccess(feedback, setFeedback);
			const signature = JSON.stringify([
				subject,
				description,
				assignee,
				dependencies,
				skills
			]);
			const dirty = signature !== savedSignature;
			(0, react.useEffect)(() => {
				onPendingChange(`task:${task.id}`, dirty || busy);
				return () => {
					onPendingChange(`task:${task.id}`, false);
				};
			}, [
				busy,
				dirty,
				onPendingChange,
				task.id
			]);
			(0, react.useEffect)(() => {
				setSubject(task.subject);
				setDescription(task.description ?? "");
				setAssignee(task.assignee);
				setDependencies(taskDependencies);
				setSkills([...task.skills ?? []]);
				setSavedSignature(remoteSignature);
			}, [
				task.subject,
				task.description,
				task.assignee,
				taskDependencies,
				remoteSignature,
				task.skills
			]);
			(0, react.useEffect)(() => {
				let cancelled = false;
				fetch("/plugins/dsh-pixel-team/skills?sessionId=" + encodeURIComponent(team.captainSessionId), { cache: "no-store" }).then(async (response) => response.ok ? await response.json() : { skills: [] }).then((body) => {
					if (!cancelled) setSkillCatalog(body.skills ?? []);
				}).catch(() => {});
				return () => {
					cancelled = true;
				};
			}, [team.captainSessionId]);
			const markEdited = () => {
				setFeedback(void 0);
				setConfirmingRemove(false);
			};
			const save = async (event) => {
				event.preventDefault();
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "update_task",
						taskId: task.id,
						subject,
						description,
						assignee,
						dependencies: dependencies.split(",").map((item) => item.trim()).filter(Boolean),
						skills
					});
					setSavedSignature(signature);
					setFeedback({
						tone: "success",
						message: t("plan.saved")
					});
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
				} finally {
					setBusy(false);
				}
			};
			const remove = async () => {
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "remove_task",
						taskId: task.id
					});
					setFeedback({
						tone: "success",
						message: t("plan.removed")
					});
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
					setBusy(false);
				}
			};
			const dependencySummary = task.dependencies.length === 0 ? t("plan.dependencies.none") : t("plan.dependencies.count", { count: task.dependencies.length });
			return (0, react_jsx_runtime.jsxs)("article", {
				className: ActivityPanel_module_css_default.planCard,
				"data-plan-task": task.id,
				"data-open": open,
				children: [(0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: ActivityPanel_module_css_default.planCardHeader,
					"aria-expanded": open,
					"aria-controls": bodyId,
					onClick: () => {
						setOpen((current) => !current);
					},
					children: [
						(0, react_jsx_runtime.jsx)("span", {
							className: ActivityPanel_module_css_default.planTaskId,
							children: task.id
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: ActivityPanel_module_css_default.planTaskSummary,
							title: subject,
							children: subject
						}),
						(0, react_jsx_runtime.jsxs)("span", {
							className: ActivityPanel_module_css_default.planCardMeta,
							children: [
								assignee || t("plan.task.unassigned"),
								" · ",
								dependencySummary
							]
						}),
						dirty && (0, react_jsx_runtime.jsx)("em", {
							className: ActivityPanel_module_css_default.planDirty,
							children: t("plan.unsaved")
						}),
						(0, react_jsx_runtime.jsx)(DisclosureChevron, { open })
					]
				}), open && (0, react_jsx_runtime.jsxs)("form", {
					id: bodyId,
					className: ActivityPanel_module_css_default.planCardBody,
					onSubmit: (event) => {
						save(event);
					},
					children: [
						(0, react_jsx_runtime.jsxs)("fieldset", {
							disabled: busy,
							children: [
								(0, react_jsx_runtime.jsxs)("label", { children: [t("plan.task.subject"), (0, react_jsx_runtime.jsx)("input", {
									name: "subject",
									required: true,
									value: subject,
									onChange: (event) => {
										setSubject(event.currentTarget.value);
										markEdited();
									}
								})] }),
								(0, react_jsx_runtime.jsxs)("label", { children: [t("plan.task.description"), (0, react_jsx_runtime.jsx)("textarea", {
									name: "description",
									value: description,
									onChange: (event) => {
										setDescription(event.currentTarget.value);
										markEdited();
									},
									rows: 3
								})] }),
								(0, react_jsx_runtime.jsxs)("span", {
									className: ActivityPanel_module_css_default.planGrid,
									children: [
										(0, react_jsx_runtime.jsxs)("label", { children: [t("plan.task.assignee"), (0, react_jsx_runtime.jsxs)("select", {
											name: "assignee",
											value: assignee,
											onChange: (event) => {
												setAssignee(event.currentTarget.value);
												markEdited();
											},
											children: [(0, react_jsx_runtime.jsx)("option", {
												value: "",
												children: t("plan.task.unassigned")
											}), team.members.map((member) => (0, react_jsx_runtime.jsx)("option", {
												value: member.name,
												children: member.name
											}, member.name))]
										})] }),
										(0, react_jsx_runtime.jsxs)("label", { children: [
											t("plan.task.dependencies"),
											(0, react_jsx_runtime.jsx)("input", {
												name: "dependencies",
												value: dependencies,
												onChange: (event) => {
													setDependencies(event.currentTarget.value);
													markEdited();
												}
											}),
											(0, react_jsx_runtime.jsx)("small", { children: t("plan.task.dependenciesHint") })
										] }),
										(0, react_jsx_runtime.jsxs)("label", { children: [
											t("plan.task.skills"),
											(0, react_jsx_runtime.jsx)("select", {
												name: "skills",
												multiple: true,
												size: Math.min(5, Math.max(2, skillCatalog.length)),
												value: skills,
												onChange: (event) => {
													setSkills([...event.currentTarget.selectedOptions].map((option) => option.value));
													markEdited();
												},
												children: skillCatalog.map((skill) => (0, react_jsx_runtime.jsx)("option", {
													value: skill.name,
													children: skill.name
												}, skill.name))
											}),
											(0, react_jsx_runtime.jsx)("small", { children: t("plan.task.skillsHint") })
										] })
									]
								})
							]
						}),
						(0, react_jsx_runtime.jsxs)("div", {
							className: ActivityPanel_module_css_default.planContract,
							children: [
								(0, react_jsx_runtime.jsx)("span", {
									className: ActivityPanel_module_css_default.planContractTitle,
									children: t("plan.contract.title")
								}),
								task.objective !== void 0 && (0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("b", { children: t("plan.contract.objective") }), task.objective] }),
								(task.acceptance?.length ?? 0) > 0 && (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("b", { children: t("plan.contract.acceptance") }), (0, react_jsx_runtime.jsx)("ul", { children: task.acceptance.map((item, index) => (0, react_jsx_runtime.jsx)("li", { children: item }, index)) })] }),
								(task.verify?.length ?? 0) > 0 && (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("b", { children: t("plan.contract.verify") }), (0, react_jsx_runtime.jsx)("ul", { children: task.verify.map((item, index) => (0, react_jsx_runtime.jsx)("li", { children: (0, react_jsx_runtime.jsx)("code", { children: item }) }, index)) })] }),
								(task.skills?.length ?? 0) > 0 && (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("b", { children: t("plan.task.skills") }), (0, react_jsx_runtime.jsx)("ul", { children: task.skills.map((item, index) => (0, react_jsx_runtime.jsx)("li", { children: (0, react_jsx_runtime.jsx)("code", { children: item }) }, index)) })] }),
								(task.inScope?.length ?? 0) > 0 && (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("b", { children: t("plan.contract.inScope") }), (0, react_jsx_runtime.jsx)("ul", { children: task.inScope.map((item, index) => (0, react_jsx_runtime.jsx)("li", { children: (0, react_jsx_runtime.jsx)("code", { children: item }) }, index)) })] })
							]
						}),
						confirmingRemove && (0, react_jsx_runtime.jsxs)("span", {
							className: ActivityPanel_module_css_default.planConfirm,
							role: "alert",
							children: [
								(0, react_jsx_runtime.jsx)("span", { children: t("plan.removeWarning", { task: task.id }) }),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setConfirmingRemove(false);
									},
									children: t("plan.cancel")
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"data-danger": true,
									"data-confirming": true,
									onClick: () => {
										remove();
									},
									children: t("plan.removeConfirm")
								})
							]
						}),
						(0, react_jsx_runtime.jsxs)("span", {
							className: ActivityPanel_module_css_default.planActions,
							children: [
								(0, react_jsx_runtime.jsx)(Feedback, { value: feedback }),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"data-danger": true,
									onClick: () => {
										setConfirmingRemove(true);
										setFeedback(void 0);
									},
									disabled: busy || confirmingRemove,
									children: t("plan.remove")
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: busy || !dirty || subject.trim() === "",
									children: busy ? t("plan.saving") : t("plan.save")
								})
							]
						})
					]
				})]
			});
		}
		function StagingPlanEditor({ team, modelDirectory, onContinuePlanning, onDiscarded, t }) {
			const membersId = (0, react.useId)();
			const tasksId = (0, react.useId)();
			const [membersOpen, setMembersOpen] = (0, react.useState)(false);
			const [tasksOpen, setTasksOpen] = (0, react.useState)(false);
			const [newTask, setNewTask] = (0, react.useState)("");
			const [busy, setBusy] = (0, react.useState)(false);
			const [discardArmed, setDiscardArmed] = (0, react.useState)(false);
			const [regenerateArmed, setRegenerateArmed] = (0, react.useState)(false);
			const [pendingEditors, setPendingEditors] = (0, react.useState)(/* @__PURE__ */ new Set());
			const [feedback, setFeedback] = (0, react.useState)();
			useDismissSuccess(feedback, setFeedback);
			const dependencyLinks = team.tasks.reduce((total, task) => total + task.dependencies.length, 0);
			const soloTeam = team.members.length === 0;
			const runnable = team.tasks.length > 0 && (!soloTeam || team.tasks.every((task) => task.assignee === "captain"));
			const hasPendingEdits = pendingEditors.size > 0 || newTask.trim() !== "";
			const waitingForFeedback = team.planReviewState === "awaiting_feedback";
			(0, react.useEffect)(() => {
				modelDirectory.load().catch(() => void 0);
			}, [modelDirectory]);
			const onPendingChange = (0, react.useCallback)((key, pending) => {
				setPendingEditors((current) => {
					if (pending === current.has(key)) return current;
					const next = new Set(current);
					if (pending) next.add(key);
					else next.delete(key);
					return next;
				});
			}, []);
			const addTask = async (event) => {
				event.preventDefault();
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "add_task",
						subject: newTask,
						dependencies: []
					});
					setNewTask("");
					setFeedback({
						tone: "success",
						message: t("plan.taskAdded")
					});
					setTasksOpen(true);
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
				} finally {
					setBusy(false);
				}
			};
			const approve = async () => {
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "approve"
					});
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
					setBusy(false);
				}
			};
			const continueInChat = async () => {
				if (waitingForFeedback) {
					onContinuePlanning();
					return;
				}
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "continue"
					});
					onContinuePlanning();
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
					setBusy(false);
				}
			};
			const regenerate = async () => {
				if (!regenerateArmed) {
					setRegenerateArmed(true);
					setFeedback(void 0);
					return;
				}
				setRegenerateArmed(false);
				setBusy(true);
				setFeedback(void 0);
				try {
					const sourceResponse = await fetch("/plugins/dsh-pixel-team/plan/source?sessionId=" + encodeURIComponent(team.captainSessionId));
					const source = await sourceResponse.json().catch(() => null);
					if (!sourceResponse.ok || source === null) throw new Error(source?.error ?? "failed to load plan source");
					if (source.clarification === void 0 || source.clarification === null) throw new Error(t("plan.regenerateMissing"));
					const discardResponse = await fetch("/plugins/dsh-pixel-team/plan", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							sessionId: team.captainSessionId,
							teamId: team.teamId,
							action: "discard"
						})
					});
					if (!discardResponse.ok) {
						const body = await discardResponse.json().catch(() => null);
						throw new Error(body?.error ?? "discard failed");
					}
					const mode = typeof source.clarification["mode"] === "string" ? source.clarification["mode"] : "precision";
					const response = await fetch("/plugins/dsh-pixel-team/quick-start", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							sessionId: team.captainSessionId,
							mode,
							goal: source.goal ?? "",
							template: "feat",
							roles: source.solo === true ? [] : source.roles ?? [],
							solo: source.solo === true,
							replace: false,
							clarification: source.clarification,
							...source.requirement === void 0 || source.requirement === null ? {} : { requirement: source.requirement }
						})
					});
					const body = await response.json().catch(() => null);
					if (!response.ok) throw new Error(body?.error ?? "regeneration failed");
					if (body?.teamId !== void 0) window.dispatchEvent(new CustomEvent(TEAM_CREATED_EVENT, { detail: {
						teamId: body.teamId,
						sessionId: team.captainSessionId
					} }));
					onDiscarded();
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
					setBusy(false);
				}
			};
			const discard = async () => {
				setBusy(true);
				setFeedback(void 0);
				try {
					await mutatePlan({
						sessionId: team.captainSessionId,
						teamId: team.teamId,
						action: "discard"
					});
					onDiscarded();
				} catch (error) {
					setFeedback({
						tone: "error",
						message: t("plan.failed", { message: errorMessage(error) })
					});
					setBusy(false);
					setDiscardArmed(false);
				}
			};
			return (0, react_jsx_runtime.jsxs)("section", {
				className: ActivityPanel_module_css_default.planEditor,
				"data-staging-editor": true,
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: ActivityPanel_module_css_default.planHeader,
						children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: t("plan.title") }), (0, react_jsx_runtime.jsx)("small", { children: soloTeam ? t("plan.readySummarySolo", {
							tasks: team.tasks.length,
							links: dependencyLinks
						}) : t("plan.readySummary", {
							members: team.members.length,
							tasks: team.tasks.length,
							links: dependencyLinks
						}) })] }), (0, react_jsx_runtime.jsx)("em", { children: t("plan.badge") })] }), (0, react_jsx_runtime.jsx)("p", { children: t("plan.description") })]
					}),
					(0, react_jsx_runtime.jsxs)("section", {
						className: ActivityPanel_module_css_default.planAlign,
						"data-plan-align": true,
						children: [
							(0, react_jsx_runtime.jsx)("strong", { children: t("plan.align.title") }),
							(0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("span", { children: t("plan.align.goal") }), team.description ?? "—"] }),
							team.nativeTeam !== void 0 && (0, react_jsx_runtime.jsxs)("p", { children: [
								(0, react_jsx_runtime.jsx)("span", { children: t("plan.align.nativeTeam") }),
								team.nativeTeam.members,
								" 成员 · ",
								team.nativeTeam.completed,
								"/",
								team.nativeTeam.tasks,
								" 任务（宿主原生 Team，只读）"
							] }),
							team.goal !== void 0 && (0, react_jsx_runtime.jsxs)("p", { children: [
								(0, react_jsx_runtime.jsx)("span", { children: t("plan.align.goalHost") }),
								team.goal.objective,
								"（",
								team.goal.phase,
								" · ",
								team.goal.roundsStarted,
								"/",
								team.goal.maxGoalRounds,
								"）"
							] }),
							team.planSummary?.mode !== void 0 && isTeamMode(team.planSummary.mode) && (0, react_jsx_runtime.jsxs)("p", { children: [
								(0, react_jsx_runtime.jsx)("span", { children: t("plan.align.mode") }),
								getModeSpec(team.planSummary.mode).emoji,
								" ",
								t(getModeSpec(team.planSummary.mode).labelKey)
							] }),
							team.planSummary?.platforms !== void 0 && team.planSummary.platforms.length > 0 && (0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("span", { children: t("plan.align.platforms") }), team.planSummary.platforms.join(" / ")] }),
							team.planSummary?.constraints !== void 0 && team.planSummary.constraints.length > 0 && (0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("span", { children: t("plan.align.constraints") }), team.planSummary.constraints.join("；")] }),
							team.planProjectRoot !== void 0 && (0, react_jsx_runtime.jsxs)("p", { children: [(0, react_jsx_runtime.jsx)("span", { children: t("plan.align.root") }), (0, react_jsx_runtime.jsx)("code", { children: team.planProjectRoot })] }),
							(0, react_jsx_runtime.jsxs)("p", {
								"data-warn": team.planSource === "template" || void 0,
								children: [(0, react_jsx_runtime.jsx)("span", { children: t("plan.align.source") }), team.planSource === "template" ? t("plan.align.template") : t("plan.align.ai")]
							}),
							team.planSource === "template" && team.planError !== void 0 && (0, react_jsx_runtime.jsxs)("p", {
								"data-warn": "true",
								children: [(0, react_jsx_runtime.jsx)("span", { children: t("plan.align.errorLabel") }), team.planError]
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("ol", {
						className: ActivityPanel_module_css_default.planFlow,
						"aria-label": t("plan.flow.aria"),
						children: [
							(0, react_jsx_runtime.jsxs)("li", {
								"data-active": true,
								children: [(0, react_jsx_runtime.jsx)("span", { children: "1" }), t("plan.flow.review")]
							}),
							(0, react_jsx_runtime.jsxs)("li", { children: [(0, react_jsx_runtime.jsx)("span", { children: "2" }), soloTeam ? t("plan.flow.spawnSolo") : t("plan.flow.spawn")] }),
							(0, react_jsx_runtime.jsxs)("li", { children: [(0, react_jsx_runtime.jsx)("span", { children: "3" }), t("plan.flow.run")] })
						]
					}),
					(0, react_jsx_runtime.jsxs)("section", {
						className: ActivityPanel_module_css_default.planSection,
						children: [(0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: ActivityPanel_module_css_default.planSectionToggle,
							"aria-expanded": membersOpen,
							"aria-controls": membersId,
							onClick: () => {
								setMembersOpen((current) => !current);
							},
							children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: t("plan.members.title") }), (0, react_jsx_runtime.jsx)("small", { children: soloTeam ? t("plan.members.countSolo") : t("plan.members.count", { count: team.members.length }) })] }), (0, react_jsx_runtime.jsx)(DisclosureChevron, { open: membersOpen })]
						}), membersOpen && (0, react_jsx_runtime.jsx)("div", {
							id: membersId,
							className: ActivityPanel_module_css_default.planList,
							children: team.members.length === 0 ? (0, react_jsx_runtime.jsx)("p", {
								className: ActivityPanel_module_css_default.planEmpty,
								children: soloTeam ? t("plan.members.soloEmpty") : t("plan.members.empty")
							}) : team.members.map((member) => (0, react_jsx_runtime.jsx)(StagedMemberEditor, {
								team,
								member,
								modelDirectory,
								onPendingChange,
								t
							}, member.name))
						})]
					}),
					(0, react_jsx_runtime.jsxs)("section", {
						className: ActivityPanel_module_css_default.planSection,
						children: [(0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: ActivityPanel_module_css_default.planSectionToggle,
							"aria-expanded": tasksOpen,
							"aria-controls": tasksId,
							onClick: () => {
								setTasksOpen((current) => !current);
							},
							children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: t("plan.tasks.title") }), (0, react_jsx_runtime.jsx)("small", { children: t("plan.tasks.count", {
								count: team.tasks.length,
								links: dependencyLinks
							}) })] }), (0, react_jsx_runtime.jsx)(DisclosureChevron, { open: tasksOpen })]
						}), tasksOpen && (0, react_jsx_runtime.jsx)("div", {
							id: tasksId,
							className: ActivityPanel_module_css_default.planList,
							children: team.tasks.length === 0 ? (0, react_jsx_runtime.jsx)("p", {
								className: ActivityPanel_module_css_default.planEmpty,
								children: t("plan.tasks.empty")
							}) : team.tasks.map((task) => (0, react_jsx_runtime.jsx)(StagedTaskEditor, {
								team,
								task,
								onPendingChange,
								t
							}, task.id))
						})]
					}),
					(0, react_jsx_runtime.jsxs)("form", {
						className: ActivityPanel_module_css_default.planNewTask,
						onSubmit: (event) => {
							addTask(event);
						},
						children: [(0, react_jsx_runtime.jsxs)("label", { children: [(0, react_jsx_runtime.jsx)("span", { children: t("plan.newTaskLabel") }), (0, react_jsx_runtime.jsx)("input", {
							name: "newTask",
							value: newTask,
							onChange: (event) => {
								setNewTask(event.currentTarget.value);
								setFeedback(void 0);
							},
							placeholder: t("plan.newTask"),
							disabled: busy
						})] }), (0, react_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy || newTask.trim() === "",
							children: busy ? t("plan.adding") : t("plan.addTask")
						})]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: ActivityPanel_module_css_default.planApproveRow,
						"data-armed": discardArmed || void 0,
						"data-discard": discardArmed || void 0,
						"data-review-state": waitingForFeedback ? "awaiting-feedback" : "awaiting-review",
						children: [
							(0, react_jsx_runtime.jsxs)("span", {
								className: ActivityPanel_module_css_default.planApproveCopy,
								children: [(0, react_jsx_runtime.jsx)("strong", { children: discardArmed ? t("plan.discardConfirmTitle") : waitingForFeedback ? t("plan.feedbackTitle") : t("plan.approveTitle") }), (0, react_jsx_runtime.jsx)("small", { children: discardArmed ? t("plan.discardWarning") : waitingForFeedback ? t("plan.feedbackHint") : hasPendingEdits ? t("plan.pendingEdits") : soloTeam ? t("plan.approveHintSolo", { tasks: team.tasks.length }) : t("plan.approveHint", {
									members: team.members.length,
									tasks: team.tasks.length
								}) })]
							}),
							(0, react_jsx_runtime.jsx)(Feedback, { value: feedback }),
							discardArmed ? (0, react_jsx_runtime.jsxs)("span", {
								className: ActivityPanel_module_css_default.planApproveActions,
								children: [(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: busy,
									onClick: () => {
										setDiscardArmed(false);
									},
									children: t("plan.cancel")
								}), (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"data-plan-discard": true,
									"data-danger": true,
									"data-confirming": true,
									disabled: busy,
									onClick: () => {
										discard();
									},
									children: busy ? t("plan.discarding") : t("plan.discardConfirm")
								})]
							}) : (0, react_jsx_runtime.jsxs)("span", {
								className: ActivityPanel_module_css_default.planReviewActions,
								children: [(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"data-plan-approve": true,
									disabled: busy || !runnable || hasPendingEdits,
									onClick: () => {
										approve();
									},
									children: t("plan.approve")
								}), (0, react_jsx_runtime.jsxs)("span", {
									className: ActivityPanel_module_css_default.planSecondaryActions,
									children: [
										(0, react_jsx_runtime.jsx)("button", {
											type: "button",
											"data-plan-continue": true,
											disabled: busy,
											onClick: () => {
												continueInChat();
											},
											children: t(waitingForFeedback ? "plan.returnToChat" : "plan.continue")
										}),
										(0, react_jsx_runtime.jsx)("button", {
											type: "button",
											"data-plan-regenerate": true,
											disabled: busy,
											onClick: () => {
												regenerate();
											},
											children: t("plan.regenerate")
										}),
										regenerateArmed && (0, react_jsx_runtime.jsxs)("span", {
											role: "alertdialog",
											style: {
												display: "inline-flex",
												gap: 6,
												alignItems: "center",
												fontSize: 11,
												color: "#ffd7a0"
											},
											children: [
												(0, react_jsx_runtime.jsx)("span", { children: t("plan.regenerateConfirm") }),
												(0, react_jsx_runtime.jsx)("button", {
													type: "button",
													"data-plan-regenerate-confirm": true,
													onClick: () => {
														regenerate();
													},
													children: t("plan.regenerate")
												}),
												(0, react_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														setRegenerateArmed(false);
													},
													children: t("quickstart.cancel")
												})
											]
										}),
										(0, react_jsx_runtime.jsx)("button", {
											type: "button",
											"data-plan-discard": true,
											"data-danger": true,
											disabled: busy,
											onClick: () => {
												setDiscardArmed(true);
												setFeedback(void 0);
											},
											children: t("plan.discard")
										})
									]
								})]
							})
						]
					})
				]
			});
		}
		Object.freeze({
			mode: "docked",
			x: 0,
			y: 64,
			width: 388,
			height: 640,
			heightMode: "auto"
		});
		//#endregion
		//#region lib/client/ActivityPanel.js
		/**
		* AgentTeams activity panel: the top-right floater monitoring every team.
		*
		* Modeled on the Claude Code desktop SessionActivityPanel: a shell-overlay
		* panel that docks at the conversation's top-right edge by default, can be
		* dragged into a floating window, resized, and folded into an activity badge.
		* On wide viewports the docked panel makes the conversation column yield
		* space; narrow viewports keep a simple inset overlay. It
		* polls the host `/plugins/dsh-pixel-team/state` route for
		* server-side snapshots (durable files + live subagent activity), with a
		* collapsed badge that auto-expands once when activity appears. Archived
		* teams stay available for the owning conversation after live work ends.
		*
		* The floater mounts in ui-layout's additive `shell.overlay`; it is not a
		* conversation node — the in-conversation panel was removed in favor of this
		* always-available monitor.
		* @module dsh-agent-teams/client/activity
		*/
		function downloadDeliveryReport(team) {
			const report = team.delivery?.report;
			if (report === void 0) return;
			const url = URL.createObjectURL(new Blob([report], { type: "text/markdown;charset=utf-8" }));
			const link = document.createElement("a");
			link.href = url;
			link.download = `delivery-report-${team.teamId}.md`;
			link.click();
			URL.revokeObjectURL(url);
		}
		const CAPTAIN_ASSIGNEE = "captain";
		/** 等级牌用境界色：底色/文字/描边与洞府场景共用一套调色板。 */
		function realmChipStyle(level) {
			const palette = realmPaletteForLevel(level);
			return {
				background: palette.background,
				color: palette.text,
				boxShadow: `inset 0 0 0 1px ${palette.border}`
			};
		}
		/** Persisted dependency rendering: the original DAT map or the vertical flow. */
		const DEPENDENCY_VIEW_KEY = "dsh-pixel-team.dependencyView";
		/** Initial-letter fallback for unmatched roles. */
		function memberInitial(name) {
			return name.trim().slice(0, 1).toUpperCase() || "?";
		}
		function stableHash(value) {
			let hash = 0;
			for (let index = 0; index < value.length; index += 1) hash = (hash << 5) - hash + value.charCodeAt(index) | 0;
			return Math.abs(hash);
		}
		const ACCENTS = [
			"var(--dsw-alias-state-business-primary)",
			"var(--dsw-alias-state-success-primary)",
			"var(--dsw-alias-state-error-primary)",
			"var(--dsw-alias-state-warn-primary)",
			"var(--dsw-alias-label-tertiary)"
		];
		function accentOf(id) {
			return ACCENTS[stableHash(id) % ACCENTS.length] ?? ACCENTS[0];
		}
		/** Badge text follows the raw task status:
		* claimed/pending/failed/cancelled keep their own labels and colors. */
		const TASK_STATUS_LABEL = {
			pending: "task.status.pending",
			claimed: "task.status.claimed",
			in_progress: "task.status.inProgress",
			completed: "task.status.completed",
			failed: "task.status.failed",
			cancelled: "task.status.cancelled"
		};
		function taskStatusLabel(status, t) {
			const key = TASK_STATUS_LABEL[status];
			return key === void 0 ? status : t(key);
		}
		function formatTaskIds(ids, t) {
			return ids.join(t("format.listSeparator"));
		}
		function taskTitle(task, model) {
			const extras = [
				task.kind,
				task.round === void 0 ? void 0 : `r${task.round}`,
				task.verdict,
				task.verdictStale === void 0 ? void 0 : `⚠ ${task.verdictStale}`,
				model === "" ? void 0 : model
			].filter((item) => item !== void 0);
			return extras.length === 0 ? `${task.id} · ${task.subject}` : `${task.id} · ${task.subject} · ${extras.join(" · ")}`;
		}
		/** Badge/bar coloring key: visual state, widened for terminal statuses. */
		function taskTone(state, status) {
			if (status === "failed") return "failed";
			if (status === "cancelled") return "cancelled";
			return state;
		}
		function Chevron({ open }) {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: ActivityPanel_module_css_default.chevron,
				"data-open": open,
				width: "9",
				height: "9",
				viewBox: "0 0 10 10",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				"aria-hidden": true,
				children: (0, react_jsx_runtime.jsx)("path", { d: "M3.5 2l3 3-3 3" })
			});
		}
		function WorkGlyph({ active }) {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: ActivityPanel_module_css_default.workGlyph,
				"data-active": active,
				width: "11",
				height: "11",
				viewBox: "0 0 11 11",
				fill: "currentColor",
				"aria-hidden": true,
				children: [
					[0, 0],
					[4.2, 0],
					[8.4, 0],
					[0, 4.2],
					[4.2, 4.2],
					[8.4, 4.2]
				].map(([x, y], index) => (0, react_jsx_runtime.jsx)("rect", {
					x,
					y,
					width: "2.6",
					height: "2.6",
					rx: ".6",
					style: { animationDelay: `${index * .15}s` }
				}, `${x}:${y}`))
			});
		}
		function memberStateLabel(member, tasks, historic, t) {
			const owned = tasks.filter((task) => task.assignee === member.name);
			if (member.activity === "working") return t("member.state.working");
			if (owned.some((task) => task.status === "failed")) return t("member.state.failed");
			if (owned.some((task) => task.state === "blocked")) return t("member.state.waiting");
			if (owned.length > 0 && owned.every((task) => task.status === "completed")) return t("member.state.delivered");
			if (member.status === "removed") return t(historic ? "member.state.left" : "member.state.removed");
			if (owned.length > 0) return t("member.state.pending");
			return t("member.state.unassigned");
		}
		function memberStatusText(member, tasks, t) {
			const owned = tasks.filter((task) => task.assignee === member.name);
			const current = owned.find((task) => task.id === member.currentTask);
			const blocked = owned.find((task) => task.state === "blocked");
			if (member.activity === "working" && current !== void 0) {
				const model = taskModelLabel(current, [member]);
				return model === "" ? t("member.status.executing", { taskId: current.id }) : t("member.status.executingModel", {
					taskId: current.id,
					model
				});
			}
			if (member.activity === "working") return t("member.status.working");
			if (blocked !== void 0) {
				const dependency = tasks.find((task) => blocked.dependencies.includes(task.id) && task.state !== "completed");
				if (dependency !== void 0) return t("member.status.waitingOn", {
					taskId: dependency.id,
					assignee: dependency.assignee || t("task.assignee.unclaimed")
				});
				return t("member.status.waitingPrerequisite");
			}
			if (member.total === 0) return t("member.status.waitingAssignment");
			if (member.done === member.total) return t("member.status.delivered");
			if (owned.some((task) => task.status === "failed")) return t("task.detail.failed");
			if (owned.length > 0 && owned.every((task) => task.status === "completed" || task.status === "cancelled")) return t("member.status.settled");
			return t(member.activity === "idle" ? "member.status.idle" : "member.status.unknown");
		}
		function compactTaskLabel(subject) {
			const withoutVerb = subject.replace(/^开发\s*/u, "").replace(/^\d+[-_.、\s]*/u, "");
			const head = withoutVerb.split(/[（(·：:]/u)[0]?.trim() ?? withoutVerb;
			return head.length > 18 ? `${head.slice(0, 17)}…` : head;
		}
		function taskSummary(team, t, discarded = false) {
			const completed = team.tasks.filter((task) => task.status === "completed");
			const cancelled = team.tasks.filter((task) => task.status === "cancelled");
			const running = team.tasks.filter((task) => task.state === "running");
			const claimed = team.tasks.filter((task) => task.state === "claimed");
			const blocked = team.tasks.filter((task) => task.state === "blocked");
			const ready = team.tasks.filter((task) => task.state === "open" && task.status !== "completed" && task.status !== "failed" && task.status !== "cancelled");
			const failed = team.tasks.filter((task) => task.status === "failed");
			if (discarded) return t("task.summary.discarded", { count: team.tasks.length });
			if (team.tasks.length === 0) return t("task.summary.waitingBreakdown");
			if (team.phase === "staged") return t("task.summary.staged", { count: team.tasks.length });
			if (completed.length === team.tasks.length) return t("task.summary.allDelivered", { count: completed.length });
			if (completed.length + cancelled.length + failed.length === team.tasks.length) return t("task.summary.ended", {
				completed: completed.length,
				cancelled: cancelled.length,
				failed: failed.length
			});
			if (failed.length > 0 && running.length === 0 && claimed.length === 0 && ready.length === 0 && blocked.length === 0) return t("task.summary.failedSettled", { count: failed.length });
			if (blocked.length > 0 && running.length > 0) return t("task.summary.blockedAndRunning", {
				tasks: formatTaskIds(blocked.slice(0, 3).map((task) => task.id), t),
				more: blocked.length > 3 ? t("task.summary.more", { count: blocked.length - 3 }) : ""
			});
			if (running.length > 0) return t("task.summary.running", { tasks: formatTaskIds(running.map((task) => task.id), t) });
			if (claimed.length > 0) return t("task.summary.claimed", { tasks: formatTaskIds(claimed.map((task) => task.id), t) });
			if (ready.length > 0) return t("task.summary.ready", { tasks: formatTaskIds(ready.map((task) => task.id), t) });
			if (blocked.length > 0) return t("task.summary.blocked", { tasks: formatTaskIds(blocked.map((task) => task.id), t) });
			return t("task.summary.waitingSchedule");
		}
		function ProgressOverview({ team, t, discarded = false }) {
			const running = discarded ? 0 : team.tasks.filter((task) => task.state === "running").length;
			const claimed = discarded ? 0 : team.tasks.filter((task) => task.state === "claimed").length;
			const blocked = discarded ? 0 : team.tasks.filter((task) => task.state === "blocked").length;
			const completed = discarded ? 0 : team.tasks.filter((task) => task.status === "completed").length;
			const settled = !discarded && team.tasks.length > 0 && team.tasks.every((task) => task.status === "completed" || task.status === "failed" || task.status === "cancelled");
			const summaryTone = discarded ? "discarded" : blocked > 0 || team.tasks.some((task) => task.status === "failed" || task.status === "cancelled") ? "warning" : settled ? "completed" : "running";
			return (0, react_jsx_runtime.jsxs)("section", {
				className: ActivityPanel_module_css_default.progressOverview,
				"aria-label": t("progress.aria"),
				"data-progress-summary": true,
				children: [
					(0, react_jsx_runtime.jsx)("span", {
						className: ActivityPanel_module_css_default.progressTitle,
						children: t("progress.title")
					}),
					team.tasks.length > 0 ? (0, react_jsx_runtime.jsx)("span", {
						className: ActivityPanel_module_css_default.progressSegments,
						"aria-hidden": true,
						children: team.tasks.map((task) => (0, react_jsx_runtime.jsx)("span", { "data-state": discarded ? "cancelled" : taskTone(task.state, task.status) }, task.id))
					}) : (0, react_jsx_runtime.jsx)("span", { className: ActivityPanel_module_css_default.progressEmpty }),
					(0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.progressLegend,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								"data-state": "running",
								children: t("progress.running", { count: running })
							}),
							claimed > 0 && (0, react_jsx_runtime.jsx)("span", {
								"data-state": "claimed",
								children: t("progress.claimed", { count: claimed })
							}),
							(0, react_jsx_runtime.jsx)("span", {
								"data-state": "blocked",
								children: t("progress.blocked", { count: blocked })
							}),
							(0, react_jsx_runtime.jsx)("span", {
								"data-state": "completed",
								children: t("progress.delivered", { count: completed })
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.progressSummary,
						"data-state": summaryTone,
						children: [(0, react_jsx_runtime.jsx)("span", { className: ActivityPanel_module_css_default.progressSummaryDot }), (0, react_jsx_runtime.jsx)("span", { children: taskSummary(team, t, discarded) })]
					})
				]
			});
		}
		function DependencyMap({ tasks, members, t, discarded = false, workspace = false, onSelectTask }) {
			const [open, setOpen] = (0, react.useState)(true);
			const [hoverTaskId, setHoverTaskId] = (0, react.useState)(null);
			const [keyboardTaskId, setKeyboardTaskId] = (0, react.useState)(null);
			const [pinnedTaskId, setPinnedTaskId] = (0, react.useState)(null);
			const [dependencyView, setDependencyView] = (0, react.useState)(() => {
				if (typeof window === "undefined") return "flow";
				try {
					return window.localStorage.getItem(DEPENDENCY_VIEW_KEY) === "dat" ? "dat" : "flow";
				} catch {
					return "flow";
				}
			});
			const chooseDependencyView = (next) => {
				setDependencyView(next);
				try {
					window.localStorage.setItem(DEPENDENCY_VIEW_KEY, next);
				} catch {}
			};
			const hoverTimer = (0, react.useRef)(null);
			const focusedTaskId = dependencyFocusTaskId(pinnedTaskId, keyboardTaskId, hoverTaskId);
			const flow = workspace && dependencyView === "flow";
			const nodeWidth = flow ? 190 : workspace ? 164 : 92;
			const nodeHeight = workspace ? 76 : 30;
			const layout = (0, react.useMemo)(() => {
				if (flow) return compactDagLayout(tasks, {
					nodeWidth: 190,
					nodeHeight: 76,
					columnGap: 24,
					rowGap: 28,
					direction: "vertical"
				});
				if (workspace) return compactDagLayout(tasks, {
					nodeWidth: 164,
					nodeHeight: 76,
					columnGap: 36,
					rowGap: 16
				});
				return compactDagLayout(tasks);
			}, [
				tasks,
				flow,
				workspace
			]);
			const parallel = (0, react.useMemo)(() => usesParallelTaskGrid(tasks), [tasks]);
			const memberByName = (0, react.useMemo)(() => new Map(members.map((member) => [member.name, member])), [members]);
			const related = (0, react.useMemo)(() => focusedTaskId === null ? null : relatedTaskIds(focusedTaskId, tasks), [focusedTaskId, tasks]);
			const scheduleHover = (id) => {
				if (hoverTimer.current !== null) {
					clearTimeout(hoverTimer.current);
					hoverTimer.current = null;
				}
				if (id === null) {
					setHoverTaskId(null);
					return;
				}
				hoverTimer.current = setTimeout(() => {
					hoverTimer.current = null;
					setHoverTaskId(id);
				}, 180);
			};
			(0, react.useEffect)(() => () => {
				if (hoverTimer.current !== null) clearTimeout(hoverTimer.current);
			}, []);
			(0, react.useEffect)(() => {
				const onKeyDown = (event) => {
					if (event.key === "Escape") {
						setPinnedTaskId(null);
						onSelectTask?.(null);
					}
				};
				window.addEventListener("keydown", onKeyDown);
				return () => {
					window.removeEventListener("keydown", onKeyDown);
				};
			}, [onSelectTask]);
			if (tasks.length === 0) return null;
			const fallbackTask = tasks.find((task) => task.state === "blocked") ?? tasks.find((task) => task.state === "running") ?? tasks.find((task) => task.state === "claimed") ?? tasks[0];
			const detailTask = tasks.find((task) => task.id === focusedTaskId) ?? fallbackTask;
			const detailModel = taskModelLabel(detailTask, members);
			const waitingOn = detailTask.dependencies.filter((dependency) => tasks.find((task) => task.id === dependency)?.status !== "completed");
			const dependents = tasks.filter((task) => task.dependencies.includes(detailTask.id));
			return (0, react_jsx_runtime.jsxs)("section", {
				className: ActivityPanel_module_css_default.dependencySection,
				"aria-label": t("dependency.aria"),
				"data-dependency-map": true,
				children: [(0, react_jsx_runtime.jsxs)("header", {
					className: ActivityPanel_module_css_default.sectionHead,
					children: [(0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: ActivityPanel_module_css_default.sectionToggleTitle,
						onClick: () => {
							setOpen((current) => !current);
						},
						"aria-expanded": open,
						children: [
							(0, react_jsx_runtime.jsx)(Chevron, { open }),
							(0, react_jsx_runtime.jsx)(IconBranchOutline16, {}),
							" ",
							t(parallel ? "dependency.parallel" : "dependency.title")
						]
					}), (0, react_jsx_runtime.jsxs)("span", {
						className: ActivityPanel_module_css_default.sectionHeadRight,
						children: [(0, react_jsx_runtime.jsx)("span", {
							className: ActivityPanel_module_css_default.sectionHint,
							children: pinnedTaskId === null ? t(parallel ? "dependency.hint.parallel" : workspace ? "workspace.dependencies" : "dependency.hint.chain") : t("dependency.hint.pinned", { taskId: pinnedTaskId })
						}), workspace && (0, react_jsx_runtime.jsxs)("span", {
							className: ActivityPanel_module_css_default.dependencyViews,
							role: "group",
							"aria-label": t("dependency.viewAria"),
							children: [(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								"data-control": "dependency-view-dat",
								"aria-pressed": dependencyView === "dat",
								onClick: () => {
									chooseDependencyView("dat");
								},
								children: t("dependency.viewDat")
							}), (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								"data-control": "dependency-view-flow",
								"aria-pressed": dependencyView === "flow",
								onClick: () => {
									chooseDependencyView("flow");
								},
								children: t("dependency.viewFlow")
							})]
						})]
					})]
				}), open && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("div", {
					className: ActivityPanel_module_css_default.dagViewport,
					children: (0, react_jsx_runtime.jsxs)("div", {
						className: ActivityPanel_module_css_default.dagCanvas,
						"data-layout": parallel ? "parallel" : "dependency",
						style: parallel ? void 0 : {
							width: layout.width,
							height: layout.height
						},
						children: [!parallel && (0, react_jsx_runtime.jsx)("svg", {
							className: ActivityPanel_module_css_default.dagEdges,
							width: layout.width,
							height: layout.height,
							"aria-hidden": true,
							children: layout.edges.map((edge) => {
								const active = related !== null && related.has(edge.from) && related.has(edge.to);
								return (0, react_jsx_runtime.jsx)("path", {
									d: edge.path,
									"data-active": active,
									"data-dimmed": related !== null && !active
								}, `${edge.from}:${edge.to}`);
							})
						}), layout.nodes.map(({ task, x, y }) => {
							const model = taskModelLabel(task, members);
							const member = flow ? memberByName.get(task.assignee) : void 0;
							const art = flow ? memberArtUrl(task.assignee, member?.role ?? "") : null;
							return (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: ActivityPanel_module_css_default.dagNode,
								style: parallel ? { height: nodeHeight } : {
									left: x,
									top: y,
									width: nodeWidth,
									height: nodeHeight
								},
								"data-task-id": task.id,
								"data-state": discarded ? "cancelled" : taskTone(task.state, task.status),
								"data-verdict-stale": task.verdictStale === void 0 ? void 0 : "true",
								"data-task-model": model || void 0,
								"data-portrait": art !== null || void 0,
								"data-focused": related?.has(task.id) ?? false,
								"data-dimmed": related !== null && !related.has(task.id),
								"aria-pressed": pinnedTaskId === task.id,
								title: taskTitle(task, model),
								onClick: () => {
									const next = pinnedTaskId === task.id ? null : task.id;
									setPinnedTaskId(next);
									onSelectTask?.(next);
								},
								onMouseEnter: () => {
									scheduleHover(task.id);
								},
								onMouseLeave: () => {
									scheduleHover(null);
								},
								onFocus: () => {
									setKeyboardTaskId(task.id);
								},
								onBlur: () => {
									setKeyboardTaskId(null);
								},
								children: [
									(0, react_jsx_runtime.jsxs)("span", {
										className: ActivityPanel_module_css_default.dagNodeHead,
										children: [
											(0, react_jsx_runtime.jsx)("span", { className: ActivityPanel_module_css_default.dagNodeDot }),
											task.id,
											workspace && (0, react_jsx_runtime.jsx)("span", {
												className: ActivityPanel_module_css_default.dagOwner,
												children: task.assignee || t("task.assignee.unclaimed")
											})
										]
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.dagNodeLabel,
										children: workspace ? task.subject : compactTaskLabel(task.subject)
									}),
									art !== null && (0, react_jsx_runtime.jsx)("img", {
										className: ActivityPanel_module_css_default.dagPortrait,
										src: art,
										alt: "",
										"aria-hidden": true
									}),
									!discarded && task.state === "claimed" && (0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.dagClaimedState,
										children: t("task.status.claimed")
									}),
									task.state === "running" && (0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.dagRunningState,
										"aria-label": t("task.runningAria"),
										children: (0, react_jsx_runtime.jsx)(WorkGlyph, { active: true })
									})
								]
							}, task.id);
						})]
					})
				}), (0, react_jsx_runtime.jsxs)("section", {
					className: ActivityPanel_module_css_default.taskDetail,
					"data-task-detail": detailTask.id,
					children: [
						(0, react_jsx_runtime.jsxs)("span", {
							className: ActivityPanel_module_css_default.taskDetailHead,
							children: [
								(0, react_jsx_runtime.jsx)("span", {
									className: ActivityPanel_module_css_default.taskDetailId,
									children: detailTask.id
								}),
								(0, react_jsx_runtime.jsx)("span", {
									className: ActivityPanel_module_css_default.taskDetailSubject,
									title: detailTask.subject,
									children: detailTask.subject.replace(/^开发\s*/u, "")
								}),
								(0, react_jsx_runtime.jsx)("span", {
									className: ActivityPanel_module_css_default.taskDetailBadge,
									"data-state": discarded ? "cancelled" : taskTone(detailTask.state, detailTask.status),
									children: discarded ? t("task.status.notRun") : taskStatusLabel(detailTask.status, t)
								})
							]
						}),
						(0, react_jsx_runtime.jsxs)("span", {
							className: ActivityPanel_module_css_default.taskDetailLine,
							children: [
								detailTask.assignee || t("task.assignee.unclaimed"),
								" · ",
								discarded ? t("task.detail.notRun") : detailTask.status === "completed" ? t("task.detail.completed") : detailTask.status === "cancelled" ? t("task.detail.cancelled") : detailTask.status === "failed" ? t("task.detail.failed") : detailTask.dependencies.length === 0 ? t("task.detail.noPrerequisite") : waitingOn.length === 0 ? t("task.detail.ready") : t("task.detail.waitingOn", { tasks: formatTaskIds(waitingOn, t) })
							]
						}),
						detailModel !== "" && (0, react_jsx_runtime.jsx)("span", {
							className: ActivityPanel_module_css_default.taskDetailModel,
							"data-task-model": detailModel,
							children: t("task.model", { model: detailModel })
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: ActivityPanel_module_css_default.taskDetailMeta,
							children: dependents.length === 0 ? t("task.detail.noDownstream") : t("task.detail.unlocks", { tasks: formatTaskIds(dependents.map((task) => task.id), t) })
						})
					]
				})] })]
			});
		}
		function TeamSection({ team, modelDirectory, onContinuePlanning, onDiscarded, onNavigate, onOpenCaptain, viewingSessionId, t, historic = false, workspace = false }) {
			const [selectedTaskId, setSelectedTaskId] = (0, react.useState)(null);
			const selectedAssignee = team.tasks.find((task) => task.id === selectedTaskId)?.assignee;
			const [membersOpen, setMembersOpen] = (0, react.useState)(workspace);
			const [stopOpen, setStopOpen] = (0, react.useState)(false);
			const [stopping, setStopping] = (0, react.useState)(false);
			const [stopError, setStopError] = (0, react.useState)("");
			const [cleanupBusy, setCleanupBusy] = (0, react.useState)(false);
			const [cleanupMessage, setCleanupMessage] = (0, react.useState)("");
			const [cleanupArmed, setCleanupArmed] = (0, react.useState)();
			const [acceptedAt, setAcceptedAt] = (0, react.useState)(team.acceptedAt);
			const [accepting, setAccepting] = (0, react.useState)(false);
			const [acceptError, setAcceptError] = (0, react.useState)("");
			const stopAnchorRef = (0, react.useRef)(null);
			const stopCancelRef = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				if (!stopOpen) return;
				stopCancelRef.current?.focus();
				const onPointerDown = (event) => {
					if (stopping) return;
					if (stopAnchorRef.current !== null && !stopAnchorRef.current.contains(event.target)) setStopOpen(false);
				};
				const onKeyDown = (event) => {
					if (event.key === "Escape" && !stopping) setStopOpen(false);
				};
				document.addEventListener("pointerdown", onPointerDown);
				document.addEventListener("keydown", onKeyDown);
				return () => {
					document.removeEventListener("pointerdown", onPointerDown);
					document.removeEventListener("keydown", onKeyDown);
				};
			}, [stopOpen, stopping]);
			const [resuming, setResuming] = (0, react.useState)(false);
			const [resumeError, setResumeError] = (0, react.useState)("");
			const discarded = historic && team.phase === "staged";
			const stopped = !historic && team.halted === true;
			const busyCount = team.members.filter((member) => member.activity === "working").length;
			const captainViewing = viewingSessionId !== void 0 && viewingSessionId === team.captainSessionId;
			useCultivationVersion();
			const captainCultivation = cultivationFromXp(xpOf(captainKey(team.name)));
			const assignedCount = team.tasks.filter((task) => task.assignee !== "" && task.assignee !== CAPTAIN_ASSIGNEE).length;
			const captainOwned = team.tasks.filter((task) => task.assignee === CAPTAIN_ASSIGNEE && task.status !== "completed" && task.status !== "failed" && task.status !== "cancelled");
			const captainBusy = captainOwned.length > 0;
			const captainTaskIds = formatTaskIds(captainOwned.map((task) => task.id), t);
			const completedCount = team.tasks.filter((task) => task.status === "completed").length;
			const allCompleted = team.tasks.length > 0 && completedCount === team.tasks.length;
			const allSettled = team.tasks.length > 0 && team.tasks.every((task) => task.status === "completed" || task.status === "failed" || task.status === "cancelled");
			const unfinishedCount = team.tasks.filter((task) => task.status !== "completed" && task.status !== "failed" && task.status !== "cancelled").length;
			const canStop = !historic && team.phase === "running" && team.halted !== true && !allCompleted && teamIsActive(team);
			const resumeTeam = async () => {
				if (resuming) return;
				setResuming(true);
				setResumeError("");
				try {
					const response = await fetch(ACTIVITY_RESUME_URL, {
						method: "POST",
						cache: "no-store",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							sessionId: team.captainSessionId,
							reason: t("team.resumeReason")
						})
					});
					if (!response.ok) {
						let message = `HTTP ${response.status}`;
						try {
							const body = await response.json();
							if (typeof body.error === "string" && body.error.trim() !== "") message = body.error;
						} catch {}
						throw new Error(message);
					}
				} catch (error) {
					setResumeError(t("team.resumeFailed", { message: error instanceof Error ? error.message : String(error) }));
				} finally {
					setResuming(false);
				}
			};
			const stopTeam = async () => {
				if (stopping) return;
				setStopping(true);
				setStopError("");
				try {
					const response = await fetch(ACTIVITY_HALT_URL, {
						method: "POST",
						cache: "no-store",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							sessionId: team.captainSessionId,
							teamId: team.teamId
						})
					});
					if (!response.ok) {
						let message = t("team.stopRequestFailed");
						try {
							const body = await response.json();
							if (typeof body.error === "string" && body.error.trim() !== "") message = body.error;
						} catch {}
						throw new Error(message);
					}
					setStopOpen(false);
				} catch (error) {
					setStopError(t("team.stopFailed", { message: error instanceof Error ? error.message : String(error) }));
				} finally {
					setStopping(false);
				}
			};
			const acceptDelivery = async () => {
				if (accepting || acceptedAt !== void 0) return;
				setAccepting(true);
				setAcceptError("");
				try {
					const response = await fetch("/plugins/dsh-pixel-team/delivery/accept", {
						method: "POST",
						cache: "no-store",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							sessionId: team.captainSessionId,
							teamId: team.teamId
						})
					});
					const body = await response.json();
					if (!response.ok) throw new Error(body.error ?? "HTTP " + response.status);
					setAcceptedAt(body.acceptedAt ?? Date.now());
				} catch (error) {
					setAcceptError(error instanceof Error ? error.message : String(error));
				} finally {
					setAccepting(false);
				}
			};
			const cleanupTeams = async () => {
				if (cleanupBusy) return;
				setCleanupBusy(true);
				setCleanupMessage("");
				try {
					const request = async (dryRun) => {
						const response = await fetch(ACTIVITY_CLEANUP_URL, {
							method: "POST",
							cache: "no-store",
							headers: { "content-type": "application/json" },
							body: JSON.stringify({
								sessionId: team.captainSessionId,
								dry_run: dryRun
							})
						});
						if (!response.ok) throw new Error(`HTTP ${response.status}`);
						return await response.json();
					};
					if (cleanupArmed === void 0) {
						const candidates = (await request(true)).candidates ?? [];
						if (candidates.length === 0) {
							setCleanupMessage(t("team.cleanupEmpty"));
							return;
						}
						setCleanupArmed(candidates.length);
						return;
					}
					const result = await request(false);
					setCleanupArmed(void 0);
					setCleanupMessage(t("team.cleanupDone", { count: (result.archived ?? []).length }));
				} catch {
					setCleanupMessage(t("team.cleanupFailed"));
				} finally {
					setCleanupBusy(false);
				}
			};
			return (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: (0, react_jsx_runtime.jsxs)("section", {
				className: ActivityPanel_module_css_default.team,
				"data-team-id": team.teamId,
				"data-workspace-team": workspace || void 0,
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: ActivityPanel_module_css_default.teamHead,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: ActivityPanel_module_css_default.teamName,
								title: team.name,
								children: team.name
							}),
							!historic && team.phase === "running" && !stopped && (0, react_jsx_runtime.jsx)("span", {
								className: ActivityPanel_module_css_default.statePill,
								"data-state": allCompleted ? "completed" : "running",
								children: t(allCompleted ? "team.state.completed" : "team.state.running")
							}),
							historic && (0, react_jsx_runtime.jsx)("span", {
								className: ActivityPanel_module_css_default.historicPill,
								children: t(discarded ? "team.discarded" : "team.ended")
							}),
							stopped && (0, react_jsx_runtime.jsx)("span", {
								className: ActivityPanel_module_css_default.historicPill,
								children: t("team.stopped")
							}),
							stopped && (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: ActivityPanel_module_css_default.teamResumeButton,
								"data-control": "team-resume",
								disabled: resuming,
								onClick: () => {
									resumeTeam();
								},
								title: t("team.resume"),
								children: [(0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "▶"
								}), resuming ? t("team.resuming") : t("team.resume")]
							}),
							(0, react_jsx_runtime.jsxs)("span", {
								className: ActivityPanel_module_css_default.teamStats,
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										"data-stat": "members",
										children: t("team.stats.members", { count: team.members.length })
									}),
									(0, react_jsx_runtime.jsx)("span", {
										"data-stat": "tasks",
										children: t("team.stats.completed", {
											completed: completedCount,
											total: team.tasks.length
										})
									}),
									(0, react_jsx_runtime.jsx)("span", {
										"data-stat": "messages",
										children: t("team.stats.messages", { count: team.messageCount })
									})
								]
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: ActivityPanel_module_css_default.cleanupButton,
								disabled: cleanupBusy,
								title: t("team.cleanupHint"),
								onClick: () => {
									cleanupTeams();
								},
								children: cleanupBusy ? "…" : t("team.cleanup")
							}),
							cleanupArmed !== void 0 && (0, react_jsx_runtime.jsxs)("span", {
								role: "alertdialog",
								style: {
									display: "inline-flex",
									gap: 6,
									alignItems: "center",
									fontSize: 11,
									color: "#ffd7a0"
								},
								children: [
									(0, react_jsx_runtime.jsx)("span", { children: t("team.cleanupConfirm", { count: cleanupArmed }) }),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											cleanupTeams();
										},
										children: t("team.cleanup")
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setCleanupArmed(void 0);
										},
										children: t("quickstart.cancel")
									})
								]
							}),
							cleanupMessage !== "" && (0, react_jsx_runtime.jsx)("span", {
								className: ActivityPanel_module_css_default.cleanupMessage,
								role: "status",
								children: cleanupMessage
							}),
							team.delivery?.ok === true && team.delivery.report !== void 0 && (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: ActivityPanel_module_css_default.reportButton,
								"aria-label": t("team.report"),
								title: t("team.reportHint"),
								onClick: () => {
									downloadDeliveryReport(team);
								},
								children: [(0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "⤓"
								}), t("team.report")]
							}),
							team.delivery?.ok === true && (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: ActivityPanel_module_css_default.reportButton,
								disabled: accepting || acceptedAt !== void 0,
								title: acceptedAt === void 0 ? t("team.acceptHint") : t("team.accepted"),
								onClick: () => {
									acceptDelivery();
								},
								children: [(0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: acceptedAt === void 0 ? "✓" : "✔"
								}), acceptedAt === void 0 ? accepting ? "…" : t("team.accept") : t("team.accepted")]
							}),
							team.acceptanceStale === true && (0, react_jsx_runtime.jsx)("span", {
								className: ActivityPanel_module_css_default.cleanupMessage,
								role: "alert",
								children: t("team.acceptStale")
							}),
							acceptError !== "" && (0, react_jsx_runtime.jsx)("span", {
								className: ActivityPanel_module_css_default.cleanupMessage,
								role: "alert",
								children: acceptError
							}),
							canStop && (0, react_jsx_runtime.jsxs)("div", {
								className: ActivityPanel_module_css_default.stopAnchor,
								ref: stopAnchorRef,
								children: [(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: ActivityPanel_module_css_default.teamStopButton,
									"aria-label": t("team.stop"),
									title: t("team.stop"),
									"aria-haspopup": "dialog",
									"aria-expanded": stopOpen,
									onClick: () => {
										setStopError("");
										setStopOpen((open) => !open);
									},
									children: (0, react_jsx_runtime.jsx)(IconStopFill16, {})
								}), stopOpen && (0, react_jsx_runtime.jsxs)("div", {
									className: ActivityPanel_module_css_default.stopPopover,
									role: "dialog",
									"aria-label": t("team.stopTitle", { team: team.name }),
									children: [
										(0, react_jsx_runtime.jsx)("span", {
											className: ActivityPanel_module_css_default.stopPopoverArrow,
											"aria-hidden": true
										}),
										(0, react_jsx_runtime.jsx)("span", {
											className: ActivityPanel_module_css_default.stopPopoverTitle,
											children: t("team.stopTitle", { team: team.name })
										}),
										(0, react_jsx_runtime.jsx)("span", {
											className: ActivityPanel_module_css_default.stopPopoverText,
											children: t("team.stopDescription", {
												tasks: unfinishedCount,
												members: busyCount
											})
										}),
										stopError !== "" && (0, react_jsx_runtime.jsxs)("span", {
											className: ActivityPanel_module_css_default.stopModalError,
											role: "alert",
											children: [(0, react_jsx_runtime.jsx)(IconWarningOutline16, {}), stopError]
										}),
										(0, react_jsx_runtime.jsxs)("span", {
											className: ActivityPanel_module_css_default.stopModalActions,
											children: [(0, react_jsx_runtime.jsx)("button", {
												type: "button",
												ref: stopCancelRef,
												disabled: stopping,
												onClick: () => {
													setStopOpen(false);
												},
												children: t("team.stopCancel")
											}), (0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												"data-danger": true,
												disabled: stopping,
												onClick: () => {
													stopTeam();
												},
												children: [(0, react_jsx_runtime.jsx)(IconStopFill16, {}), stopping ? t("team.stopping") : t("team.stopConfirm")]
											})]
										})
									]
								})]
							})
						]
					}),
					resumeError !== "" && (0, react_jsx_runtime.jsx)("p", {
						className: ActivityPanel_module_css_default.teamResumeError,
						role: "alert",
						children: resumeError
					}),
					team.phase === "staged" && !historic && modelDirectory !== void 0 && onContinuePlanning !== void 0 && onDiscarded !== void 0 && (0, react_jsx_runtime.jsx)(StagingPlanEditor, {
						team,
						modelDirectory,
						onContinuePlanning,
						onDiscarded,
						t
					}),
					(0, react_jsx_runtime.jsxs)("section", {
						className: ActivityPanel_module_css_default.delegationSection,
						"aria-label": t("delegation.aria"),
						"data-delegation-map": true,
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								className: ActivityPanel_module_css_default.captainNode,
								"data-clickable": onOpenCaptain === void 0 ? void 0 : "true",
								"data-viewing": captainViewing || void 0,
								role: onOpenCaptain === void 0 ? void 0 : "button",
								tabIndex: onOpenCaptain === void 0 ? void 0 : 0,
								onClick: onOpenCaptain,
								onKeyDown: onOpenCaptain === void 0 ? void 0 : (event) => {
									if (event.key === "Enter" || event.key === " ") {
										event.preventDefault();
										onOpenCaptain();
									}
								},
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.captainAvatar,
										children: (0, react_jsx_runtime.jsx)("img", {
											className: ActivityPanel_module_css_default.leadAvatar,
											src: LEAD_ART,
											alt: "",
											"aria-hidden": true
										})
									}),
									(0, react_jsx_runtime.jsxs)("span", {
										className: ActivityPanel_module_css_default.captainInfo,
										children: [(0, react_jsx_runtime.jsxs)("span", {
											className: ActivityPanel_module_css_default.captainLine,
											children: [
												(0, react_jsx_runtime.jsx)("span", {
													className: ActivityPanel_module_css_default.captainName,
													children: t("captain.name")
												}),
												(0, react_jsx_runtime.jsx)("span", {
													className: ActivityPanel_module_css_default.captainRole,
													children: t("captain.role")
												}),
												(0, react_jsx_runtime.jsxs)("span", {
													className: ActivityPanel_module_css_default.memberLevel,
													style: realmChipStyle(captainCultivation.level),
													title: `${captainCultivation.xp} / ${captainCultivation.next} XP · ${captainCultivation.skills.length === 0 ? t("skill.none") : captainCultivation.skills.map((key) => t(key)).join(" / ")}`,
													children: [
														"Lv.",
														captainCultivation.level,
														" ",
														t(captainCultivation.rankKey)
													]
												}),
												captainViewing && (0, react_jsx_runtime.jsx)("span", {
													className: ActivityPanel_module_css_default.viewingBadge,
													children: t("office.viewingState")
												})
											]
										}), (0, react_jsx_runtime.jsx)("span", {
											className: ActivityPanel_module_css_default.captainSummary,
											children: discarded ? t("captain.summary.discarded", {
												tasks: team.tasks.length,
												members: team.members.length
											}) : captainBusy ? t("captain.summary.withTakeover", {
												tasks: assignedCount,
												captainTasks: captainTaskIds
											}) : team.phase === "staged" ? t(team.planReviewState === "awaiting_feedback" ? "captain.summary.awaitingFeedback" : "captain.summary.staged", {
												tasks: team.tasks.length,
												members: team.members.length
											}) : t("captain.summary", {
												tasks: assignedCount,
												members: team.members.length
											})
										})]
									}),
									(0, react_jsx_runtime.jsxs)("span", {
										className: ActivityPanel_module_css_default.captainState,
										"data-busy": captainBusy || busyCount > 0,
										children: [(0, react_jsx_runtime.jsx)(WorkGlyph, { active: captainBusy || busyCount > 0 }), discarded ? t("captain.state.discarded") : captainBusy ? t("captain.state.takeover", { tasks: captainTaskIds }) : team.phase === "staged" ? t(team.planReviewState === "awaiting_feedback" ? "captain.state.awaitingFeedback" : "captain.state.staged") : busyCount > 0 ? t("captain.state.working", { count: busyCount }) : t(allCompleted ? "captain.state.collected" : allSettled ? "captain.state.settled" : "captain.state.waiting")]
									})
								]
							}),
							!workspace && (0, react_jsx_runtime.jsx)(ProgressOverview, {
								team,
								t,
								discarded
							}),
							(() => {
								const orderedMembers = orderDelegationMembers(team.members, team.tasks);
								const runningMembers = orderedMembers.filter((member) => member.activity === "working" || member.status === "working" || team.tasks.some((task) => task.assignee === member.name && (task.status === "pending" || task.status === "claimed" || task.status === "in_progress")));
								const visibleMembers = membersOpen ? orderedMembers : runningMembers;
								const hiddenFinishedCount = orderedMembers.length - visibleMembers.length;
								const expandLabel = membersOpen ? t("members.collapse") : hiddenFinishedCount > 0 ? t("members.expandFinished", { count: hiddenFinishedCount }) : t("members.expand");
								return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: ActivityPanel_module_css_default.membersToggle,
									onClick: () => {
										setMembersOpen((current) => !current);
									},
									"aria-expanded": membersOpen,
									"data-members-toggle": true,
									children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)(Chevron, { open: membersOpen }), t("members.toggle", { count: team.members.length })] }), (0, react_jsx_runtime.jsx)("span", { children: expandLabel })]
								}), (membersOpen || visibleMembers.length > 0) && (0, react_jsx_runtime.jsxs)("div", {
									className: ActivityPanel_module_css_default.delegationTree,
									children: [team.members.length === 0 && (0, react_jsx_runtime.jsx)("span", {
										className: ActivityPanel_module_css_default.emptyHint,
										children: t("members.empty")
									}), visibleMembers.map((member) => {
										const owned = team.tasks.filter((task) => task.assignee === member.name);
										const memberModel = memberRouteLabel(member);
										const progressTotal = member.total ?? 0;
										const progressDone = member.done ?? 0;
										const progressPct = progressTotal > 0 ? Math.round(progressDone / progressTotal * 100) : Math.max(0, Math.min(100, member.progress ?? 0));
										const viewing = viewingSessionId !== void 0 && member.id === viewingSessionId;
										const cultivation = cultivationFromXp(xpOf(memberKey(member.name)));
										const progressState = progressTotal > 0 && progressDone >= progressTotal ? "completed" : owned.some((task) => task.state === "failed") ? "failed" : void 0;
										const handoff = team.tasks.find((task) => task.status !== "completed" && task.assignee !== member.name && task.dependencies.some((id) => owned.some((own) => own.id === id && own.status === "completed")));
										return (0, react_jsx_runtime.jsxs)("div", {
											className: ActivityPanel_module_css_default.memberBlock,
											"data-activity": member.activity,
											"data-realm": (member.progress ?? 0) >= 40 ? "high" : void 0,
											"data-viewing": viewing || void 0,
											"data-selected-member": workspace && selectedAssignee === member.name || void 0,
											children: [
												(0, react_jsx_runtime.jsx)("span", {
													className: ActivityPanel_module_css_default.memberBranch,
													"aria-hidden": true,
													children: (0, react_jsx_runtime.jsx)("span", {})
												}),
												(0, react_jsx_runtime.jsxs)("button", {
													type: "button",
													className: ActivityPanel_module_css_default.memberRow,
													"data-activity": member.activity,
													onClick: () => {
														if (member.id !== "") onNavigate(team.captainSessionId, member.id);
													},
													children: [
														(0, react_jsx_runtime.jsxs)("span", {
															className: ActivityPanel_module_css_default.memberAvatar,
															"data-unread": member.unread > 0,
															children: [memberArtUrl(member.name, member.role) !== null ? (0, react_jsx_runtime.jsx)("img", {
																className: ActivityPanel_module_css_default.memberArt,
																src: memberArtUrl(member.name, member.role) ?? "",
																alt: "",
																"aria-hidden": true
															}) : (0, react_jsx_runtime.jsx)("span", {
																className: ActivityPanel_module_css_default.memberInitial,
																style: { background: accentOf(member.id) },
																children: memberInitial(member.name)
															}), (0, react_jsx_runtime.jsx)("img", {
																className: ActivityPanel_module_css_default.stateArt,
																"data-activity": member.activity,
																src: ACTION_ART[member.activity],
																alt: "",
																"aria-hidden": true
															})]
														}),
														(0, react_jsx_runtime.jsxs)("span", {
															className: ActivityPanel_module_css_default.memberInfo,
															children: [
																(0, react_jsx_runtime.jsxs)("span", {
																	className: ActivityPanel_module_css_default.memberLine,
																	children: [
																		(0, react_jsx_runtime.jsx)("span", {
																			className: ActivityPanel_module_css_default.memberName,
																			children: member.name
																		}),
																		member.role !== "" && (0, react_jsx_runtime.jsx)("span", {
																			className: ActivityPanel_module_css_default.memberRole,
																			children: roleLabel(member.role, member.name, t)
																		}),
																		(0, react_jsx_runtime.jsxs)("span", {
																			className: ActivityPanel_module_css_default.memberLevel,
																			style: realmChipStyle(cultivation.level),
																			title: `${cultivation.xp} / ${cultivation.next} XP · ${cultivation.skills.length === 0 ? t("skill.none") : cultivation.skills.map((key) => t(key)).join(" / ")}`,
																			children: [
																				"Lv.",
																				cultivation.level,
																				" ",
																				t(cultivation.rankKey)
																			]
																		}),
																		memberModel !== "" && (0, react_jsx_runtime.jsx)("span", {
																			className: ActivityPanel_module_css_default.memberModel,
																			role: "img",
																			"data-member-model": memberModel,
																			title: memberModel,
																			"aria-label": memberModel,
																			children: compactModelLabel(memberModel)
																		}),
																		(0, react_jsx_runtime.jsxs)("span", {
																			className: ActivityPanel_module_css_default.memberState,
																			"data-activity": member.activity,
																			"data-viewing": viewing || void 0,
																			children: [(0, react_jsx_runtime.jsx)(WorkGlyph, { active: member.activity === "working" }), viewing ? t("office.viewingState") : discarded ? t("member.state.notCreated") : stopped ? t("member.state.stopped") : team.phase === "staged" ? t("member.state.staged") : memberStateLabel(member, team.tasks, historic, t)]
																		})
																	]
																}),
																(0, react_jsx_runtime.jsx)("span", {
																	className: ActivityPanel_module_css_default.memberStatusLine,
																	children: discarded ? t("member.status.discarded") : stopped ? t("member.status.stopped") : team.phase === "staged" ? t("member.status.staged") : historic && owned.length > 0 && owned.every((task) => task.status === "completed" || task.status === "failed" || task.status === "cancelled") ? t("member.status.settled") : memberStatusText(member, team.tasks, t)
																}),
																(0, react_jsx_runtime.jsx)("span", {
																	className: ActivityPanel_module_css_default.memberProgress,
																	"data-state": progressState,
																	children: (0, react_jsx_runtime.jsx)("span", {
																		className: ActivityPanel_module_css_default.memberProgressTrack,
																		children: (0, react_jsx_runtime.jsx)("span", {
																			className: ActivityPanel_module_css_default.memberProgressFill,
																			"data-state": progressState,
																			style: { width: `${progressPct}%` }
																		})
																	})
																}),
																handoff !== void 0 && (0, react_jsx_runtime.jsxs)("span", {
																	className: ActivityPanel_module_css_default.memberRel,
																	children: [(0, react_jsx_runtime.jsx)("span", {
																		"aria-hidden": true,
																		children: "→"
																	}), t("member.rel.handoff", {
																		name: handoff.assignee || t("task.assignee.unclaimed"),
																		taskId: handoff.id
																	})]
																})
															]
														}),
														(0, react_jsx_runtime.jsxs)("span", {
															className: ActivityPanel_module_css_default.memberCount,
															children: [
																member.done,
																"/",
																member.total
															]
														})
													]
												}),
												(0, react_jsx_runtime.jsxs)("div", {
													className: ActivityPanel_module_css_default.assignmentLine,
													children: [(0, react_jsx_runtime.jsx)("span", {
														className: ActivityPanel_module_css_default.assignmentLabel,
														children: t(discarded ? "assignment.discarded" : team.phase === "staged" ? "assignment.staged" : "assignment.label")
													}), (0, react_jsx_runtime.jsx)("span", {
														className: ActivityPanel_module_css_default.assignmentTasks,
														children: owned.length === 0 ? (0, react_jsx_runtime.jsx)("span", {
															className: ActivityPanel_module_css_default.taskEmpty,
															children: t("assignment.empty")
														}) : owned.map((task) => {
															const model = taskModelLabel(task, team.members);
															const shortModel = compactModelLabel(model);
															return (0, react_jsx_runtime.jsx)("span", {
																className: ActivityPanel_module_css_default.assignmentChip,
																"data-state": discarded ? "cancelled" : taskTone(task.state, task.status),
																"data-verdict-stale": task.verdictStale === void 0 ? void 0 : "true",
																"data-task-model": model || void 0,
																title: taskTitle(task, model),
																children: task.state === "running" && shortModel !== "" ? `${task.id} · ${shortModel}` : task.id
															}, task.id);
														})
													})]
												})
											]
										}, member.id || member.name);
									})]
								})] });
							})()
						]
					}),
					!workspace && (0, react_jsx_runtime.jsx)(DependencyMap, {
						tasks: team.tasks,
						members: team.members,
						t,
						discarded,
						workspace,
						onSelectTask: setSelectedTaskId
					})
				]
			}) });
		}
		/** Legacy conversation cards may outlive their host archive. Project their
		* durable roster through the same rebuilt panel instead of a second UI. */
		function historicCardTeam(data, owner) {
			return {
				workspace: "",
				teamId: data.teamId,
				name: data.teamName,
				captainSessionId: data.captainSessionId || owner,
				phase: "running",
				members: data.members.map((member) => ({
					...member,
					status: "removed",
					activity: "idle",
					progress: 0,
					done: 0,
					total: 0,
					currentTask: "",
					unread: 0
				})),
				tasks: [],
				messageCount: 0,
				captainInbox: []
			};
		}
		//#endregion
		//#region \0dsh-css:F:\MyApp\eternal\dsh-pixel-team\src\client\TeamConfigPanel.module.css.mjs
		const css$8 = "._5yZY1W_panel{flex-direction:column;gap:14px;display:flex}._5yZY1W_facts{grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;display:grid}._5yZY1W_fact{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:12px;flex-direction:column;gap:3px;min-width:0;padding:10px 12px;display:flex}._5yZY1W_label{color:var(--dsw-alias-label-secondary);font-size:11px}._5yZY1W_value{overflow-wrap:anywhere;font-size:14px;font-weight:650}._5yZY1W_sub{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;font-size:10px}._5yZY1W_heading{color:var(--dsw-alias-label-secondary);margin:4px 0 0;font-size:12px;font-weight:650}._5yZY1W_tableWrap{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:12px;overflow-x:auto}._5yZY1W_table{border-collapse:collapse;width:100%;font-size:12px}._5yZY1W_table th,._5yZY1W_table td{text-align:left;vertical-align:top;border-bottom:1px solid var(--dsw-alias-border-l2);overflow-wrap:anywhere;padding:8px 10px}._5yZY1W_table thead th{color:var(--dsw-alias-label-secondary);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 70%, var(--dsw-alias-bg-base));white-space:nowrap;font-weight:600}._5yZY1W_table tbody tr:last-child td{border-bottom:none}._5yZY1W_mono{color:var(--dsw-alias-label-secondary);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px}._5yZY1W_hint{color:var(--dsw-alias-label-secondary);margin:0;font-size:11px;line-height:1.7}";
		const tagId$8 = "dsh-pixel-team/TeamConfigPanel.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$8) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-pixel-team";
			tag.dataset.pluginCss = tagId$8;
			tag.textContent = css$8;
			document.head.appendChild(tag);
		}
		var TeamConfigPanel_module_css_default = {
			"fact": "_5yZY1W_fact",
			"facts": "_5yZY1W_facts",
			"heading": "_5yZY1W_heading",
			"hint": "_5yZY1W_hint",
			"label": "_5yZY1W_label",
			"mono": "_5yZY1W_mono",
			"panel": "_5yZY1W_panel",
			"sub": "_5yZY1W_sub",
			"table": "_5yZY1W_table",
			"tableWrap": "_5yZY1W_tableWrap",
			"value": "_5yZY1W_value"
		};
		//#endregion
		//#region lib/client/TeamConfigPanel.js
		function memberRoute(member) {
			const parts = [member.provider, member.model].filter((part) => typeof part === "string" && part !== "");
			return parts.length > 0 ? parts.join(" / ") : "—";
		}
		const STATUS_KEYS = {
			pending: "task.status.pending",
			claimed: "task.status.claimed",
			running: "task.status.inProgress",
			in_progress: "task.status.inProgress",
			completed: "task.status.completed",
			failed: "task.status.failed",
			cancelled: "task.status.cancelled"
		};
		const KIND_KEYS = {
			work: "config.kind.work",
			requirements: "config.kind.requirements",
			implementation: "config.kind.implementation",
			verification: "config.kind.verification",
			review: "config.kind.review",
			repair: "config.kind.repair",
			integration: "config.kind.integration"
		};
		function statusLabel(status, t) {
			const key = STATUS_KEYS[status];
			return key === void 0 ? status : t(key);
		}
		function kindLabel(kind, t) {
			if (kind === void 0) return "";
			const key = KIND_KEYS[kind];
			return key === void 0 ? kind : t(key);
		}
		function TeamConfigPanel({ team, t }) {
			useCultivationVersion();
			const completed = team.tasks.filter((task) => task.status === "completed").length;
			const allCompleted = team.tasks.length > 0 && completed === team.tasks.length;
			const facts = [
				{
					label: t("config.team"),
					value: team.name,
					sub: team.teamId
				},
				{
					label: t("config.phase"),
					value: team.halted === true ? t("config.halted") : t(team.phase === "staged" ? "config.phaseStaged" : allCompleted ? "config.phaseCompleted" : "config.phaseRunning")
				},
				{
					label: t("config.members"),
					value: String(team.members.length)
				},
				{
					label: t("config.tasks"),
					value: `${completed}/${team.tasks.length}`
				}
			];
			return (0, react_jsx_runtime.jsxs)("section", {
				className: TeamConfigPanel_module_css_default.panel,
				"data-team-config": true,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						className: TeamConfigPanel_module_css_default.facts,
						children: facts.map((fact) => (0, react_jsx_runtime.jsxs)("div", {
							className: TeamConfigPanel_module_css_default.fact,
							children: [
								(0, react_jsx_runtime.jsx)("span", {
									className: TeamConfigPanel_module_css_default.label,
									children: fact.label
								}),
								(0, react_jsx_runtime.jsx)("strong", {
									className: TeamConfigPanel_module_css_default.value,
									children: fact.value
								}),
								fact.sub !== void 0 && (0, react_jsx_runtime.jsx)("span", {
									className: TeamConfigPanel_module_css_default.sub,
									children: fact.sub
								})
							]
						}, fact.label))
					}),
					(0, react_jsx_runtime.jsx)("h3", {
						className: TeamConfigPanel_module_css_default.heading,
						children: t("config.members")
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: TeamConfigPanel_module_css_default.tableWrap,
						children: (0, react_jsx_runtime.jsxs)("table", {
							className: TeamConfigPanel_module_css_default.table,
							children: [(0, react_jsx_runtime.jsx)("thead", { children: (0, react_jsx_runtime.jsxs)("tr", { children: [
								(0, react_jsx_runtime.jsx)("th", { children: t("config.name") }),
								(0, react_jsx_runtime.jsx)("th", { children: t("config.role") }),
								(0, react_jsx_runtime.jsx)("th", { children: t("config.realm") }),
								(0, react_jsx_runtime.jsx)("th", { children: t("config.model") }),
								(0, react_jsx_runtime.jsx)("th", { children: t("config.effort") })
							] }) }), (0, react_jsx_runtime.jsx)("tbody", { children: team.members.map((member) => {
								const cultivation = cultivationFromXp(xpOf(memberKey(member.name)));
								return (0, react_jsx_runtime.jsxs)("tr", { children: [
									(0, react_jsx_runtime.jsx)("td", { children: member.name }),
									(0, react_jsx_runtime.jsx)("td", { children: roleLabel(member.role, member.name, t) }),
									(0, react_jsx_runtime.jsx)("td", { children: `Lv.${cultivation.level} ${t(cultivation.rankKey)}` }),
									(0, react_jsx_runtime.jsx)("td", {
										className: TeamConfigPanel_module_css_default.mono,
										children: memberRoute(member)
									}),
									(0, react_jsx_runtime.jsx)("td", { children: member.reasoningEffort ?? "—" })
								] }, member.id);
							}) })]
						})
					}),
					(0, react_jsx_runtime.jsx)("h3", {
						className: TeamConfigPanel_module_css_default.heading,
						children: t("config.tasks")
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: TeamConfigPanel_module_css_default.tableWrap,
						children: (0, react_jsx_runtime.jsxs)("table", {
							className: TeamConfigPanel_module_css_default.table,
							children: [(0, react_jsx_runtime.jsx)("thead", { children: (0, react_jsx_runtime.jsxs)("tr", { children: [
								(0, react_jsx_runtime.jsx)("th", { children: t("config.task") }),
								(0, react_jsx_runtime.jsx)("th", { children: t("config.assignee") }),
								(0, react_jsx_runtime.jsx)("th", { children: t("config.status") }),
								(0, react_jsx_runtime.jsx)("th", { children: t("config.deps") })
							] }) }), (0, react_jsx_runtime.jsx)("tbody", { children: team.tasks.map((task) => (0, react_jsx_runtime.jsxs)("tr", { children: [
								(0, react_jsx_runtime.jsx)("td", { children: task.subject }),
								(0, react_jsx_runtime.jsx)("td", { children: task.assignee === "" ? t("config.unassigned") : task.assignee }),
								(0, react_jsx_runtime.jsx)("td", { children: task.kind === void 0 ? statusLabel(task.status, t) : `${kindLabel(task.kind, t)} · ${statusLabel(task.status, t)}` }),
								(0, react_jsx_runtime.jsx)("td", {
									className: TeamConfigPanel_module_css_default.mono,
									children: task.dependencies.length === 0 ? "—" : task.dependencies.join(", ")
								})
							] }, task.id)) })]
						})
					}),
					(0, react_jsx_runtime.jsx)("p", {
						className: TeamConfigPanel_module_css_default.hint,
						children: team.phase === "staged" ? t("config.stagedHint") : t("config.hint")
					})
				]
			});
		}
		//#endregion
		//#region \0dsh-css:F:\MyApp\eternal\dsh-pixel-team\src\client\SectHallOverlay.module.css.mjs
		const css$7 = ".OmBPoq_window{z-index:11000;resize:both;border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 85%, transparent);background:#151a21;border-radius:12px;flex-direction:column;width:min(620px,100vw - 32px);min-width:380px;max-width:calc(100vw - 32px);min-height:240px;max-height:calc(100vh - 32px);display:flex;position:fixed;bottom:16px;right:16px;overflow:hidden;box-shadow:0 22px 60px #00000085,inset 0 2px #ffffff0a}html{--agent-teams-hall-shift:0px}html[data-agent-teams-hall-open] [data-phase=active]{box-sizing:border-box;padding-right:var(--agent-teams-hall-shift);transition:padding-right .18s}html[data-agent-teams-hall-open]:has([data-sidebar-right-open]) [data-phase=active]{padding-right:0}html[data-agent-teams-hall-open]:has([data-sidebar-right-open]) :has(>[data-shell-overlay]){box-sizing:border-box;padding-right:var(--agent-teams-hall-shift);transition:padding-right .18s}.OmBPoq_token{z-index:11000;cursor:grab;touch-action:none;-webkit-user-select:none;user-select:none;background:0 0;border:0;padding:0;animation:.16s ease-out OmBPoq_hall-token-fade;position:fixed}.OmBPoq_token:active{cursor:grabbing}.OmBPoq_token:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:3px;border-radius:9px}.OmBPoq_tokenInner{transform-origin:0 0;width:38px;height:68px;position:absolute;top:0;left:0}.OmBPoq_tokenBody{background:linear-gradient(158deg,#4c6e6af5,#182d31fa 45%,#0a1618);border:1px solid #c9a45fd9;border-radius:9px 9px 6px 6px;transition:filter .16s;animation:4.6s ease-in-out infinite OmBPoq_hall-token-sway;position:absolute;inset:0 0 12px;overflow:hidden;box-shadow:inset 0 0 0 2px #e8c37829,inset 0 7px 10px #fff0cd17,inset 0 -7px 10px #00000073,0 7px 18px #0000006b,0 0 18px #ffc66024}.OmBPoq_tokenBody:before{content:\"\";background:#0a1416;border-radius:50%;width:6px;height:6px;position:absolute;top:8px;left:50%;translate:-50%;box-shadow:inset 0 0 0 1px #e8c378b3}.OmBPoq_tokenBody:after{content:\"\";pointer-events:none;border-radius:7px;position:absolute;inset:3px;box-shadow:inset 0 0 0 1px #e8c3782e}.OmBPoq_tokenGlyph{color:#f2d9a0;font-family:\"STKaiti\", \"KaiTi\", var(--dsw-alias-font-family,serif);text-shadow:0 0 9px #ffd0708c;place-items:center;font-size:17px;font-weight:700;line-height:1;display:grid;position:absolute;inset:14px 0 0}.OmBPoq_token:hover .OmBPoq_tokenBody{filter:brightness(1.16)}.OmBPoq_token:hover .OmBPoq_tokenGlyph{text-shadow:0 0 13px #ffd682d9}.OmBPoq_tokenTassel{background:linear-gradient(#c9a45f,#7a2f2a);width:2px;height:12px;position:absolute;bottom:0;left:50%;translate:-50%}.OmBPoq_tokenTassel:after{content:\"\";background:radial-gradient(circle at 50% 20%,#cf5a4e,#7d211d 72%);border-radius:0 0 50% 50%;width:9px;height:8px;position:absolute;bottom:-7px;left:50%;translate:-50%;box-shadow:0 0 7px #b43c3259}@keyframes OmBPoq_hall-token-fade{0%{opacity:0}}@keyframes OmBPoq_hall-token-sway{0%,to{transform:translateY(0)rotate(-1.4deg)}50%{transform:translateY(-2px)rotate(1.4deg)}}@media (prefers-reduced-motion:reduce){.OmBPoq_token,.OmBPoq_tokenBody{animation:none}}.OmBPoq_window::-webkit-resizer{background:linear-gradient(135deg, transparent 0 46%, var(--dsw-alias-label-tertiary) 46% 52%, transparent 52% 62%, var(--dsw-alias-label-tertiary) 62% 68%, transparent 68%)}.OmBPoq_head{border-bottom:1px solid var(--dsw-alias-border-l2);cursor:grab;touch-action:none;user-select:none;flex:none;align-items:center;gap:8px;padding:8px 10px 8px 12px;display:flex}.OmBPoq_head:active{cursor:grabbing}.OmBPoq_caret{color:var(--dsw-alias-label-tertiary);flex:none;font-size:11px}.OmBPoq_title{min-width:0;color:var(--dsw-alias-label-primary);align-items:center;gap:6px;font-size:12.5px;font-weight:650;line-height:18px;display:inline-flex;overflow:hidden}.OmBPoq_titleText{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.OmBPoq_brandIcon{width:18px;height:18px;image-rendering:pixelated;border-radius:4px;flex:none}.OmBPoq_meta{color:var(--dsw-alias-label-secondary);flex:none;margin-left:auto;font-size:11px}.OmBPoq_starLink{color:#f2c14e;cursor:pointer;background:#f2c14e17;border:1px solid #f2c14e80;border-radius:999px;flex:none;align-items:center;gap:3px;padding:1px 7px;font-size:10px;font-weight:650;line-height:16px;text-decoration:none;transition:background .12s,border-color .12s;display:inline-flex}.OmBPoq_starLink:hover{background:#f2c14e2e;border-color:#f2c14ebf}.OmBPoq_starLink:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.OmBPoq_viewer{font:inherit;cursor:pointer;border:1px solid var(--dsw-alias-border-l2);white-space:nowrap;border-radius:999px;flex:none;padding:1px 7px;font-size:10.5px;line-height:16px}.OmBPoq_viewer[data-kind=captain]{border-color:color-mix(in srgb, #f2c14e 55%, var(--dsw-alias-border-l2));color:#f2c14e;background:#f2c14e1f}.OmBPoq_viewer[data-kind=member]{border-color:color-mix(in srgb, var(--dsw-alias-state-business-primary) 55%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, transparent);color:var(--dsw-alias-state-business-primary)}.OmBPoq_headButton{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border-radius:6px;flex:none;padding:3px 10px;font-size:11px}.OmBPoq_headButton:hover{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary)}.OmBPoq_canvas{flex:auto;min-height:160px}.OmBPoq_floor{border-top:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 55%, #151a21);flex-wrap:wrap;flex:none;align-items:center;gap:6px;padding:8px 10px;display:flex}.OmBPoq_floorButton{border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 70%, transparent);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border-radius:999px;align-items:center;gap:6px;padding:6px 12px;font-size:14px;line-height:19px;transition:border-color .14s,color .14s,background-color .14s;display:inline-flex}.OmBPoq_floorButton:hover{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary)}.OmBPoq_floorButton span[aria-hidden=true]{font-size:15px;line-height:1}.OmBPoq_floorButton[data-active=true]{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent)}.OmBPoq_startButton{border-color:color-mix(in srgb, var(--dsw-alias-state-business-primary) 55%, var(--dsw-alias-border-l2));color:var(--dsw-alias-label-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 14%, transparent)}.OmBPoq_startButton:hover{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 22%, transparent)}.OmBPoq_settings{flex-direction:column;gap:8px;display:flex}.OmBPoq_settingsHint,.OmBPoq_settingsMeta{color:var(--dsw-alias-label-secondary);margin:0;font-size:10.5px;line-height:1.6}.OmBPoq_sizeRow{flex-wrap:wrap;gap:6px;display:flex}.OmBPoq_inventorySection{border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 70%, transparent);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 72%, transparent);border-radius:10px;flex-direction:column;gap:7px;padding:9px 10px 11px;display:flex}.OmBPoq_sectionHead{justify-content:space-between;align-items:baseline;gap:8px;display:flex}.OmBPoq_sectionCount{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;letter-spacing:.02em;font-size:9.5px}.OmBPoq_sectionHint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:9.5px;line-height:1.5}.OmBPoq_inventory{grid-template-columns:repeat(auto-fill,minmax(74px,1fr));gap:7px;display:grid}.OmBPoq_item{--item-tone:#8fa0bb;border:1px solid color-mix(in srgb, var(--item-tone) 26%, var(--dsw-alias-border-l2));background:linear-gradient(180deg, #ffffff0d, #ffffff03), var(--dsw-alias-bg-layer-1);min-width:0;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border-radius:9px;justify-items:center;gap:3px;padding:8px 4px 6px;transition:transform .12s,border-color .12s,box-shadow .12s;display:grid;position:relative}.OmBPoq_item[data-tier=rare]{--item-tone:#6fd6c8}.OmBPoq_item[data-tier=epic]{--item-tone:#b48cff}.OmBPoq_item[data-tier=legendary]{--item-tone:#f2c14e}.OmBPoq_item:hover:not(:disabled){border-color:color-mix(in srgb, #f2c14e 48%, var(--dsw-alias-border-l2));transform:translateY(-1px);box-shadow:0 2px 8px #00000038}.OmBPoq_item:focus-visible{outline:1px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.OmBPoq_item[data-equipped=true]{background:color-mix(in srgb, #f2c14e 9%, var(--dsw-alias-bg-layer-1));border-color:#f2c14e;box-shadow:0 0 0 1px #f2c14e66}.OmBPoq_item[data-locked=true]{opacity:.52;cursor:not-allowed}.OmBPoq_item[data-locked=true] .OmBPoq_itemIcon{filter:grayscale(.7)}.OmBPoq_itemIcon{background:color-mix(in srgb, var(--item-tone) 14%, transparent);border-radius:8px;place-items:center;width:30px;height:30px;font-size:16px;line-height:1;display:grid}.OmBPoq_item[data-equipped=true] .OmBPoq_itemIcon{background:#f2c14e33;box-shadow:inset 0 0 0 1px #f2c14e8c}.OmBPoq_itemName{max-width:100%;color:var(--dsw-alias-label-primary);text-align:center;text-overflow:ellipsis;white-space:nowrap;font-size:9px;line-height:12px;overflow:hidden}.OmBPoq_itemFoot{align-items:center;gap:3px;min-height:10px;display:inline-flex}.OmBPoq_itemLevel{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;font-size:8px;line-height:10px}.OmBPoq_itemBadge{color:#f2c14e;white-space:nowrap;background:#f2c14e2e;border-radius:3px;padding:0 3px;font-size:7.5px;line-height:10px}.OmBPoq_itemBadge[data-tone=locked]{background:color-mix(in srgb, var(--dsw-alias-label-tertiary) 16%, transparent);color:var(--dsw-alias-label-tertiary)}.OmBPoq_sizeChip{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border-radius:999px;padding:4px 12px;font-size:10.5px}.OmBPoq_sizeChip:hover{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary)}.OmBPoq_sizeChip[data-active=true]{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 14%, transparent)}.OmBPoq_settingsButton{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border-radius:7px;align-self:flex-start;padding:4px 10px;font-size:10.5px}.OmBPoq_settingsButton:hover{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary)}.OmBPoq_history,.OmBPoq_character{flex-direction:column;gap:12px;display:flex}.OmBPoq_characterHead{border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 70%, transparent);background:linear-gradient(180deg, #f2c14e17, transparent), color-mix(in srgb, var(--dsw-alias-bg-layer-1) 72%, transparent);border-radius:10px;justify-content:space-between;align-items:center;gap:8px;padding:9px 11px;display:flex}.OmBPoq_characterName{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:650}.OmBPoq_characterLevel{color:#f2c14e;font-size:11.5px;font-weight:650}.OmBPoq_xpTrack{background:var(--dsw-alias-border-l3);border-radius:4px;height:7px;overflow:hidden;box-shadow:inset 0 0 0 1px #0000002e}.OmBPoq_xpTrack>span{border-radius:inherit;background:#4f9a57;height:100%;transition:width .16s;display:block}.OmBPoq_sizeChip:disabled{opacity:.42;cursor:not-allowed}.OmBPoq_historyStart{border:1px solid color-mix(in srgb, #f2c14e 55%, var(--dsw-alias-border-l2));color:#f2c14e;width:100%;font:inherit;cursor:pointer;background:#f2c14e1a;border-radius:8px;justify-content:center;align-items:center;gap:6px;padding:8px 12px;font-size:11.5px;font-weight:650;display:inline-flex}.OmBPoq_historyStart:hover{background:#f2c14e2e;border-color:#f2c14e}.OmBPoq_historyBlock{flex-direction:column;gap:6px;display:flex}.OmBPoq_historyTitle{color:var(--dsw-alias-label-primary);font-size:12px;font-weight:650}.OmBPoq_historyList{flex-direction:column;gap:4px;display:flex}.OmBPoq_historyItem{border:1px solid var(--dsw-alias-border-l2);width:100%;color:var(--dsw-alias-label-primary);font:inherit;text-align:left;cursor:pointer;background:0 0;border-radius:8px;flex-direction:column;align-items:flex-start;gap:2px;padding:7px 9px;display:flex}.OmBPoq_historyItem:hover{border-color:var(--dsw-alias-state-business-primary)}.OmBPoq_historyItem[data-active=true]{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, transparent)}.OmBPoq_historyItem[data-current=true]{border-color:color-mix(in srgb, var(--dsw-alias-state-success-primary) 55%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 8%, transparent)}.OmBPoq_historyItem[data-current=true][data-active=true]{border-color:var(--dsw-alias-state-success-primary);box-shadow:0 0 0 1px color-mix(in srgb, var(--dsw-alias-state-success-primary) 45%, transparent)}.OmBPoq_historyName{font-size:12px;font-weight:600}.OmBPoq_historyMeta{color:var(--dsw-alias-label-secondary);font-size:10.5px}.OmBPoq_historyDetail{border-top:1px dashed var(--dsw-alias-border-l2);padding-top:8px}.OmBPoq_historyTasks{flex-direction:column;gap:4px;margin:0;padding:0;list-style:none;display:flex}.OmBPoq_historyTask{border:1px solid var(--dsw-alias-border-l2);border-radius:6px;grid-template-columns:40px minmax(0,1fr) auto auto;align-items:center;gap:6px;padding:5px 8px;font-size:10.5px;display:grid}.OmBPoq_historyTaskId{color:var(--dsw-alias-label-tertiary);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.OmBPoq_historyTaskSubject{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.OmBPoq_historyTaskWho{color:var(--dsw-alias-label-secondary)}.OmBPoq_historyTaskState{color:var(--dsw-alias-label-tertiary);font-size:10px}.OmBPoq_historyTaskState[data-state=completed]{color:var(--dsw-alias-state-success-primary)}.OmBPoq_historyTaskState[data-state=failed]{color:var(--dsw-alias-state-error-primary)}.OmBPoq_sheet{z-index:12000;box-sizing:border-box;width:min(480px,100vw - 32px);max-height:min(calc(100vh - 32px), var(--hall-sheet-max,calc(100vh - 32px)));border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 85%, transparent);background:#151a21;border-radius:12px;flex-direction:column;display:flex;position:fixed;overflow:hidden;box-shadow:0 18px 48px #00000080}.OmBPoq_sheetHead{border-bottom:1px solid var(--dsw-alias-border-l2);flex:none;align-items:center;gap:8px;padding:8px 10px 8px 12px;display:flex}.OmBPoq_sheetTitle{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;flex:auto;font-size:15px;font-weight:650;overflow:hidden}.OmBPoq_sheetAction{border:1px solid color-mix(in srgb, var(--dsw-alias-state-business-primary) 45%, var(--dsw-alias-border-l2));color:var(--dsw-alias-state-business-primary);font:inherit;cursor:pointer;background:0 0;border-radius:6px;flex:none;margin-left:auto;padding:3px 9px;font-size:10.5px}.OmBPoq_sheetAction:hover{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, transparent)}.OmBPoq_sheetClose{width:26px;height:26px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:1px solid #0000;border-radius:6px;flex:none;place-items:center;padding:0;font-size:16px;display:grid}.OmBPoq_sheetClose:hover{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary)}.OmBPoq_ranks{flex-direction:column;gap:10px;display:flex}.OmBPoq_rankHero{border:1px solid color-mix(in srgb, #f2c14e 45%, var(--dsw-alias-border-l2));background:linear-gradient(180deg, #f2c14e1a, transparent), color-mix(in srgb, var(--dsw-alias-bg-layer-1) 72%, transparent);border-radius:10px;flex-direction:column;gap:6px;padding:9px 11px;display:flex}.OmBPoq_rankHeroName{color:var(--dsw-alias-label-primary);font-size:12px;font-weight:650}.OmBPoq_rankList{flex-direction:column;gap:5px;margin:0;padding:0;list-style:none;display:flex}.OmBPoq_rankRow{border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 70%, transparent);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 55%, transparent);border-radius:8px;flex-direction:column;gap:3px;padding:6px 8px;display:flex}.OmBPoq_rankRow[data-current=true]{background:color-mix(in srgb, #f2c14e 9%, var(--dsw-alias-bg-layer-1));border-color:#f2c14e;box-shadow:0 0 0 1px #f2c14e66}.OmBPoq_rankTop{align-items:baseline;gap:6px;display:flex}.OmBPoq_rankName{color:var(--dsw-alias-label-primary);font-size:11.5px;font-weight:650}.OmBPoq_rankRange{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;font-size:9px}.OmBPoq_rankCurrent{color:#f2c14e;background:#f2c14e2e;border-radius:3px;margin-left:auto;padding:0 4px;font-size:8.5px;line-height:12px}.OmBPoq_rankDesc{color:var(--dsw-alias-label-secondary);margin:0;font-size:10px;line-height:1.55}.OmBPoq_tips{color:var(--dsw-alias-label-secondary);flex-direction:column;gap:4px;margin:0;padding-left:15px;font-size:10px;line-height:1.65;display:flex}.OmBPoq_tip::marker{color:#f2c14e}.OmBPoq_story{color:var(--dsw-alias-label-secondary);flex-direction:column;gap:6px;font-size:10px;line-height:1.7;display:flex}.OmBPoq_story p{margin:0}.OmBPoq_rosterList{flex-direction:column;gap:4px;margin:0;padding:0;list-style:none;display:flex}.OmBPoq_rosterRow{border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 70%, transparent);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 55%, transparent);border-radius:7px;align-items:center;gap:8px;padding:5px 9px;display:flex}.OmBPoq_rosterIndex{color:#f2c14e;font-variant-numeric:tabular-nums;text-align:right;flex:none;width:16px;font-size:9px}.OmBPoq_rosterName{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;flex:auto;font-size:10.5px;overflow:hidden}.OmBPoq_rosterLevel{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;flex:none;font-size:9px}.OmBPoq_sheetBody{zoom:1.3;scrollbar-width:thin;flex:auto;min-height:0;padding:12px 14px 14px;overflow:auto}.OmBPoq_inboxList{flex-direction:column;gap:6px;margin:0;padding:0;list-style:none;display:flex}.OmBPoq_inboxRow{border:1px solid var(--dsw-alias-border-l2);border-radius:8px;flex-direction:column;gap:2px;padding:6px 8px;font-size:11px;display:flex}.OmBPoq_inboxFrom{color:var(--dsw-alias-label-secondary);font-size:10px}.OmBPoq_inboxText{color:var(--dsw-alias-label-primary);overflow-wrap:anywhere;line-height:1.6}.OmBPoq_about{flex-direction:column;gap:10px;display:flex}.OmBPoq_aboutTabs{flex-wrap:wrap;gap:5px;display:flex}.OmBPoq_aboutTab{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border-radius:999px;padding:4px 10px;font-size:10px}.OmBPoq_aboutTab:hover{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary)}.OmBPoq_aboutTab[data-active=true]{color:var(--dsw-alias-label-primary);background:#f2c14e1f;border-color:#f2c14e}.OmBPoq_aboutSection{flex-direction:column;gap:8px;display:flex}.OmBPoq_aboutMeta{border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 70%, transparent);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 55%, transparent);color:var(--dsw-alias-label-secondary);border-radius:8px;flex-wrap:wrap;gap:6px 14px;padding:7px 10px;font-size:9.5px;display:flex}.OmBPoq_aboutActions{flex-wrap:wrap;gap:6px;display:flex}.OmBPoq_aboutLink{color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 55%, transparent);border-radius:7px;padding:4px 8px;font-size:10px;text-decoration:none}.OmBPoq_aboutLink:hover{color:#f2c14e;border-color:#f2c14e}.OmBPoq_aboutNotice{color:#4f9a57;margin:0;font-size:10px}.OmBPoq_qrGrid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;display:grid}.OmBPoq_qrCard{border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 70%, transparent);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 55%, transparent);border-radius:10px;flex-direction:column;align-items:center;gap:4px;margin:0;padding:8px;display:flex}.OmBPoq_qrCard img{image-rendering:auto;border-radius:6px;width:100%;max-width:200px;height:auto}.OmBPoq_qrCard figcaption{color:var(--dsw-alias-label-secondary);font-size:9.5px}.OmBPoq_projectList{flex-direction:column;gap:5px;margin:0;padding:0;list-style:none;display:flex}.OmBPoq_projectList li{flex-direction:column;gap:3px;display:flex}.OmBPoq_projectList li span{color:var(--dsw-alias-label-secondary);font-size:9.5px;line-height:1.5}.OmBPoq_projectList .OmBPoq_aboutLink{align-self:flex-start}.OmBPoq_feedbackText{box-sizing:border-box;resize:vertical;border:1px solid var(--dsw-alias-border-l2);width:100%;min-height:80px;color:var(--dsw-alias-label-primary);font:inherit;background:0 0;border-radius:8px;padding:7px 9px;font-size:10px;line-height:1.6}.OmBPoq_feedbackDiagHead{color:var(--dsw-alias-label-secondary);justify-content:space-between;align-items:center;gap:8px;font-size:9.5px;display:flex}.OmBPoq_feedbackDiag{border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 70%, transparent);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 55%, transparent);max-height:170px;color:var(--dsw-alias-label-secondary);white-space:pre-wrap;overflow-wrap:anywhere;border-radius:8px;margin:0;padding:7px 9px;font-size:8.5px;line-height:1.55;overflow:auto}.OmBPoq_versionBadge{color:#9aa4b2;white-space:nowrap;border:1px solid #ffffff1f;border-radius:999px;padding:1px 7px;font-size:11px}.OmBPoq_version{color:#9aa4b2;font-size:11px}.OmBPoq_token{animation:.16s ease-out OmBPoq_hall-token-fade,2.4s ease-in-out infinite OmBPoq_hall-token-pulse}.OmBPoq_tokenIcon{object-fit:contain;filter:drop-shadow(0 0 8px #f2c14ebf);width:calc(100% - 10px);height:calc(100% - 24px);position:absolute;inset:8px 5px 16px}.OmBPoq_tokenBadge{color:#16241b;background:#f2c14e;border-radius:999px;padding:0 4px;font-size:9px;font-weight:700;line-height:14px;position:absolute;bottom:16px;right:2px}@keyframes OmBPoq_hall-token-pulse{0%,to{filter:drop-shadow(0 0 7px #f2c14e59)}50%{filter:drop-shadow(0 0 18px #f2c14ecc)}}.OmBPoq_historySelect{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);width:100%;color:inherit;font:inherit;background:#151a21;border-radius:8px;padding:8px 10px;font-size:13px}.OmBPoq_historyHead{align-items:center;gap:8px;display:flex}.OmBPoq_historyHead .OmBPoq_historySelect{flex:1}.OmBPoq_historyStartSmall{border:1px solid var(--dsw-alias-border-l2);color:inherit;cursor:pointer;white-space:nowrap;background:0 0;border-radius:8px;flex:none;padding:7px 10px;font-size:12px}.OmBPoq_historyStartSmall:hover{color:#f2c14e;border-color:#f2c14e}.OmBPoq_window{max-width:min(780px,100vw - 32px);max-height:min(860px,100vh - 32px)}.OmBPoq_collapseIcon{font-size:16px;font-weight:700;line-height:1}.OmBPoq_historySelect[data-state=done]{border-color:#7fd6a8}.OmBPoq_historySelect[data-state=failed]{border-color:#ff6b6b}.OmBPoq_historySelect[data-state=running]{border-color:#f2c14e}.OmBPoq_historySelect[data-state=waiting]{border-color:#6fb6ff}.OmBPoq_archiveButton{color:#ff8a8a!important;border-color:#dc50508c!important}.OmBPoq_archiveButton:hover:not(:disabled){background:#dc505024!important;border-color:#e05a5a!important}";
		const tagId$7 = "dsh-pixel-team/SectHallOverlay.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$7) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-pixel-team";
			tag.dataset.pluginCss = tagId$7;
			tag.textContent = css$7;
			document.head.appendChild(tag);
		}
		var SectHallOverlay_module_css_default = {
			"about": "OmBPoq_about",
			"aboutActions": "OmBPoq_aboutActions",
			"aboutLink": "OmBPoq_aboutLink",
			"aboutMeta": "OmBPoq_aboutMeta",
			"aboutNotice": "OmBPoq_aboutNotice",
			"aboutSection": "OmBPoq_aboutSection",
			"aboutTab": "OmBPoq_aboutTab",
			"aboutTabs": "OmBPoq_aboutTabs",
			"archiveButton": "OmBPoq_archiveButton",
			"brandIcon": "OmBPoq_brandIcon",
			"canvas": "OmBPoq_canvas",
			"caret": "OmBPoq_caret",
			"character": "OmBPoq_character",
			"characterHead": "OmBPoq_characterHead",
			"characterLevel": "OmBPoq_characterLevel",
			"characterName": "OmBPoq_characterName",
			"collapseIcon": "OmBPoq_collapseIcon",
			"feedbackDiag": "OmBPoq_feedbackDiag",
			"feedbackDiagHead": "OmBPoq_feedbackDiagHead",
			"feedbackText": "OmBPoq_feedbackText",
			"floor": "OmBPoq_floor",
			"floorButton": "OmBPoq_floorButton",
			"hall-token-fade": "OmBPoq_hall-token-fade",
			"hall-token-pulse": "OmBPoq_hall-token-pulse",
			"hall-token-sway": "OmBPoq_hall-token-sway",
			"head": "OmBPoq_head",
			"headButton": "OmBPoq_headButton",
			"history": "OmBPoq_history",
			"historyBlock": "OmBPoq_historyBlock",
			"historyDetail": "OmBPoq_historyDetail",
			"historyHead": "OmBPoq_historyHead",
			"historyItem": "OmBPoq_historyItem",
			"historyList": "OmBPoq_historyList",
			"historyMeta": "OmBPoq_historyMeta",
			"historyName": "OmBPoq_historyName",
			"historySelect": "OmBPoq_historySelect",
			"historyStart": "OmBPoq_historyStart",
			"historyStartSmall": "OmBPoq_historyStartSmall",
			"historyTask": "OmBPoq_historyTask",
			"historyTaskId": "OmBPoq_historyTaskId",
			"historyTaskState": "OmBPoq_historyTaskState",
			"historyTaskSubject": "OmBPoq_historyTaskSubject",
			"historyTaskWho": "OmBPoq_historyTaskWho",
			"historyTasks": "OmBPoq_historyTasks",
			"historyTitle": "OmBPoq_historyTitle",
			"inboxFrom": "OmBPoq_inboxFrom",
			"inboxList": "OmBPoq_inboxList",
			"inboxRow": "OmBPoq_inboxRow",
			"inboxText": "OmBPoq_inboxText",
			"inventory": "OmBPoq_inventory",
			"inventorySection": "OmBPoq_inventorySection",
			"item": "OmBPoq_item",
			"itemBadge": "OmBPoq_itemBadge",
			"itemFoot": "OmBPoq_itemFoot",
			"itemIcon": "OmBPoq_itemIcon",
			"itemLevel": "OmBPoq_itemLevel",
			"itemName": "OmBPoq_itemName",
			"meta": "OmBPoq_meta",
			"projectList": "OmBPoq_projectList",
			"qrCard": "OmBPoq_qrCard",
			"qrGrid": "OmBPoq_qrGrid",
			"rankCurrent": "OmBPoq_rankCurrent",
			"rankDesc": "OmBPoq_rankDesc",
			"rankHero": "OmBPoq_rankHero",
			"rankHeroName": "OmBPoq_rankHeroName",
			"rankList": "OmBPoq_rankList",
			"rankName": "OmBPoq_rankName",
			"rankRange": "OmBPoq_rankRange",
			"rankRow": "OmBPoq_rankRow",
			"rankTop": "OmBPoq_rankTop",
			"ranks": "OmBPoq_ranks",
			"rosterIndex": "OmBPoq_rosterIndex",
			"rosterLevel": "OmBPoq_rosterLevel",
			"rosterList": "OmBPoq_rosterList",
			"rosterName": "OmBPoq_rosterName",
			"rosterRow": "OmBPoq_rosterRow",
			"sectionCount": "OmBPoq_sectionCount",
			"sectionHead": "OmBPoq_sectionHead",
			"sectionHint": "OmBPoq_sectionHint",
			"settings": "OmBPoq_settings",
			"settingsButton": "OmBPoq_settingsButton",
			"settingsHint": "OmBPoq_settingsHint",
			"settingsMeta": "OmBPoq_settingsMeta",
			"sheet": "OmBPoq_sheet",
			"sheetAction": "OmBPoq_sheetAction",
			"sheetBody": "OmBPoq_sheetBody",
			"sheetClose": "OmBPoq_sheetClose",
			"sheetHead": "OmBPoq_sheetHead",
			"sheetTitle": "OmBPoq_sheetTitle",
			"sizeChip": "OmBPoq_sizeChip",
			"sizeRow": "OmBPoq_sizeRow",
			"starLink": "OmBPoq_starLink",
			"startButton": "OmBPoq_startButton",
			"story": "OmBPoq_story",
			"tip": "OmBPoq_tip",
			"tips": "OmBPoq_tips",
			"title": "OmBPoq_title",
			"titleText": "OmBPoq_titleText",
			"token": "OmBPoq_token",
			"tokenBadge": "OmBPoq_tokenBadge",
			"tokenBody": "OmBPoq_tokenBody",
			"tokenGlyph": "OmBPoq_tokenGlyph",
			"tokenIcon": "OmBPoq_tokenIcon",
			"tokenInner": "OmBPoq_tokenInner",
			"tokenTassel": "OmBPoq_tokenTassel",
			"version": "OmBPoq_version",
			"versionBadge": "OmBPoq_versionBadge",
			"viewer": "OmBPoq_viewer",
			"window": "OmBPoq_window",
			"xpTrack": "OmBPoq_xpTrack"
		};
		//#endregion
		//#region lib/client/HallInbox.js
		function HallInbox({ messages, t }) {
			if (messages.length === 0) return (0, react_jsx_runtime.jsx)("p", {
				className: SectHallOverlay_module_css_default.settingsHint,
				children: t("workspace.inboxEmpty")
			});
			return (0, react_jsx_runtime.jsx)("ul", {
				className: SectHallOverlay_module_css_default.inboxList,
				tabIndex: 0,
				"aria-label": t("workspace.inbox"),
				children: messages.map((message, index) => (0, react_jsx_runtime.jsxs)("li", {
					className: SectHallOverlay_module_css_default.inboxRow,
					children: [(0, react_jsx_runtime.jsx)("span", {
						className: SectHallOverlay_module_css_default.inboxFrom,
						children: message.from
					}), (0, react_jsx_runtime.jsx)("span", {
						className: SectHallOverlay_module_css_default.inboxText,
						children: message.content
					})]
				}, `${index}:${message.from}`))
			});
		}
		//#endregion
		//#region \0dsh-css:F:\MyApp\eternal\dsh-pixel-team\src\client\MemoryModeBanner.module.css.mjs
		const css$6 = ".FOJLCG_root{z-index:13000;box-sizing:border-box;background:#1d232c;border:1px solid #f2c14e73;border-radius:10px;align-items:center;gap:8px;width:min(380px,100vw - 40px);padding:10px 12px;font-size:12px;display:flex;position:fixed;bottom:20px;right:20px;box-shadow:0 12px 32px #00000073}.FOJLCG_text{color:inherit;flex:1}.FOJLCG_action{color:#f2c14e;white-space:nowrap;text-decoration:none}.FOJLCG_action:hover{text-decoration:underline}.FOJLCG_close{color:inherit;cursor:pointer;opacity:.7;background:0 0;border:0;font-size:14px;line-height:1}.FOJLCG_connected{z-index:13000;box-sizing:border-box;background:#1d232c;border:1px solid #7fd6a859;border-radius:10px;align-items:center;gap:6px;width:min(320px,100vw - 40px);padding:8px 10px;font-size:12px;display:flex;position:fixed;bottom:20px;right:20px;box-shadow:0 12px 32px #00000073}.FOJLCG_dot{background:#7fd6a8;border-radius:50%;width:7px;height:7px}.FOJLCG_connected .FOJLCG_text{color:#9fe3bd;flex:1}";
		const tagId$6 = "dsh-pixel-team/MemoryModeBanner.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$6) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-pixel-team";
			tag.dataset.pluginCss = tagId$6;
			tag.textContent = css$6;
			document.head.appendChild(tag);
		}
		var MemoryModeBanner_module_css_default = {
			"action": "FOJLCG_action",
			"close": "FOJLCG_close",
			"connected": "FOJLCG_connected",
			"dot": "FOJLCG_dot",
			"root": "FOJLCG_root",
			"text": "FOJLCG_text"
		};
		//#endregion
		//#region lib/client/MemoryModeBanner.js
		/** Module 2 UI: probe the memory brain, then show connected or an install hint. */
		const DISMISS_KEY = "dsh-pixel-team:memory-banner-dismissed";
		const INSTALL_URL = "https://github.com/EternalNight996/memory-eternal";
		const CACHE_MS = 6e4;
		let cache;
		async function checkMemory() {
			if (cache !== void 0 && Date.now() - cache.at < CACHE_MS) return cache.state;
			try {
				const response = await fetch("/plugins/dsh-pixel-team/memory/status", { cache: "no-store" });
				if (!response.ok) throw new Error("HTTP " + response.status);
				const state = (await response.json()).connected === true ? "connected" : "missing";
				cache = {
					at: Date.now(),
					state
				};
				return state;
			} catch {
				cache = {
					at: Date.now(),
					state: "missing"
				};
				return "missing";
			}
		}
		function MemoryModeBanner({ t }) {
			const [dismissed, setDismissed] = (0, react.useState)(() => {
				try {
					return window.localStorage.getItem(DISMISS_KEY) === "1";
				} catch {
					return false;
				}
			});
			const [probe, setProbe] = (0, react.useState)("checking");
			(0, react.useEffect)(() => {
				let alive = true;
				checkMemory().then((state) => {
					if (alive) setProbe(state);
				});
				return () => {
					alive = false;
				};
			}, []);
			const dismiss = () => {
				try {
					window.localStorage.setItem(DISMISS_KEY, "1");
				} catch {}
				setDismissed(true);
			};
			if (dismissed || probe === "checking") return null;
			if (probe === "connected") return (0, react_jsx_runtime.jsxs)("div", {
				className: MemoryModeBanner_module_css_default.connected,
				"data-memory-banner": "connected",
				children: [
					(0, react_jsx_runtime.jsx)("span", {
						className: MemoryModeBanner_module_css_default.dot,
						"aria-hidden": true
					}),
					(0, react_jsx_runtime.jsx)("span", {
						className: MemoryModeBanner_module_css_default.text,
						children: t("memory.connected")
					}),
					(0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: MemoryModeBanner_module_css_default.close,
						"aria-label": t("memory.dismiss"),
						onClick: dismiss,
						children: "×"
					})
				]
			});
			return (0, react_jsx_runtime.jsxs)("div", {
				className: MemoryModeBanner_module_css_default.root,
				"data-memory-banner": "missing",
				children: [
					(0, react_jsx_runtime.jsx)("span", {
						className: MemoryModeBanner_module_css_default.text,
						children: t("memory.banner")
					}),
					(0, react_jsx_runtime.jsx)("a", {
						className: MemoryModeBanner_module_css_default.action,
						href: INSTALL_URL,
						target: "_blank",
						rel: "noreferrer",
						children: t("memory.install")
					}),
					(0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: MemoryModeBanner_module_css_default.close,
						"aria-label": t("memory.dismiss"),
						onClick: dismiss,
						children: "×"
					})
				]
			});
		}
		//#endregion
		//#region \0dsh-css:F:\MyApp\eternal\dsh-pixel-team\src\client\LibraryPanel.module.css.mjs
		const css$5 = "._Uqn9q_root{flex-direction:column;gap:10px;height:100%;display:flex}._Uqn9q_empty{color:#9aa4b2;font-size:13px}._Uqn9q_head{flex-wrap:wrap;align-items:center;gap:10px;font-size:13px;display:flex}._Uqn9q_team{font-weight:600}._Uqn9q_scale{color:#f2c14e}._Uqn9q_cost{color:#9aa4b2}._Uqn9q_live{color:#7fd6a8;margin-left:auto}._Uqn9q_offline{color:#ffb86b;margin-left:auto}._Uqn9q_canvas{background:#0a0e1659;border:1px solid #ffffff14;border-radius:10px;flex:1;min-height:240px;position:relative;overflow:auto}._Uqn9q_edges{pointer-events:none;position:absolute;inset:0}._Uqn9q_card{box-sizing:border-box;background:#131a24;border:1px solid #2c3442;border-radius:8px;flex-direction:column;gap:4px;padding:8px 10px;font-size:12px;display:flex;position:absolute;overflow:hidden}._Uqn9q_card[data-status=claimed],._Uqn9q_card[data-status=in_progress]{border-color:#f2c14e}._Uqn9q_card[data-status=completed]{border-color:#7fd6a8}._Uqn9q_card[data-status=failed]{border-color:#ff6b6b}._Uqn9q_subject{white-space:nowrap;text-overflow:ellipsis;font-weight:600;overflow:hidden}._Uqn9q_meta{color:#9aa4b2;justify-content:space-between;gap:6px;display:flex}._Uqn9q_status{text-transform:uppercase;letter-spacing:.04em}._Uqn9q_acceptance{color:#9aa4b2}._Uqn9q_acceptance[data-failed=true]{color:#ff6b6b}._Uqn9q_blocker{border:1px solid #2c3442;border-radius:8px;align-items:baseline;gap:8px;padding:8px 10px;font-size:12px;display:flex}._Uqn9q_blocker[data-blocked=true]{color:#ffb0b0;border-color:#ff6b6b80}._Uqn9q_blockerTitle{color:#9aa4b2}._Uqn9q_version{color:#9aa4b2;font-size:11px}._Uqn9q_mode{border:1px solid;border-radius:999px;padding:1px 8px;font-size:11px}._Uqn9q_gate{color:#9aa4b2;font-size:11px}._Uqn9q_stop{color:#ff9a9a;cursor:pointer;background:#ff6b6b24;border:1px solid #ff6b6bb3;border-radius:999px;padding:1px 7px;font-size:10px;position:absolute;top:6px;right:6px}._Uqn9q_stop:disabled{opacity:.6;cursor:default}._Uqn9q_details{color:#9aa4b2;margin-top:4px;font-size:12px}._Uqn9q_details summary{cursor:pointer}._Uqn9q_detailList{flex-direction:column;gap:6px;margin:8px 0 0;padding-left:18px;display:flex}._Uqn9q_detailId{color:#6fb6ff;margin-right:6px}._Uqn9q_detailMeta{color:#9aa4b2;margin-top:2px;font-size:11px;display:block}._Uqn9q_detailDesc{color:#c9d1dc;white-space:pre-wrap;margin-top:2px;font-size:11px;display:block}._Uqn9q_list{flex-direction:column;gap:6px;margin-top:8px;display:flex}._Uqn9q_row{background:#0a0e1659;border:1px solid #2c3442;border-radius:8px;position:relative}._Uqn9q_row[data-status=completed]{border-color:#7fd6a88c}._Uqn9q_row[data-status=failed]{border-color:#ff6b6b99}._Uqn9q_row[data-status=claimed],._Uqn9q_row[data-status=in_progress]{border-color:#f2c14e99}._Uqn9q_rowHead{width:100%;color:inherit;text-align:left;cursor:pointer;font:inherit;background:0 0;border:0;align-items:center;gap:8px;padding:8px 86px 8px 10px;display:flex}._Uqn9q_rowChevron{color:#9aa4b2;width:12px}._Uqn9q_rowId{color:#6fb6ff;font-size:11px}._Uqn9q_rowSubject{text-overflow:ellipsis;white-space:nowrap;flex:1;font-size:13px;overflow:hidden}._Uqn9q_rowMeta,._Uqn9q_rowStatus,._Uqn9q_rowAcceptance{color:#9aa4b2;white-space:nowrap;font-size:11px}._Uqn9q_rowAcceptance[data-failed=true]{color:#ff6b6b}._Uqn9q_rowDetail{flex-direction:column;gap:4px;padding:0 10px 10px 30px;display:flex}._Uqn9q_acceptanceList{flex-direction:column;gap:3px;margin:4px 0 0;padding:0;font-size:11px;list-style:none;display:flex}._Uqn9q_acceptanceList li{color:#9aa4b2}._Uqn9q_acceptanceList li[data-status=pass]{color:#7fd6a8}._Uqn9q_acceptanceList li[data-status=fail]{color:#ff6b6b}._Uqn9q_acceptanceMark{min-width:42px;margin-right:6px;font-weight:700;display:inline-block}._Uqn9q_requirements{background:#6fb6ff0d;border:1px solid #6fb6ff4d;border-radius:10px;flex-direction:column;gap:6px;margin:4px 0 2px;padding:10px 12px;display:flex}._Uqn9q_reqTitle{color:#9aa4b2;font-size:12px}._Uqn9q_reqList{flex-direction:column;gap:4px;margin:0;padding:0;list-style:none;display:flex}._Uqn9q_reqItem{align-items:baseline;gap:8px;font-size:12px;display:flex}._Uqn9q_reqIndex{color:#f2c14e;min-width:20px;font-weight:700}._Uqn9q_reqText{color:#e8eef6;flex:1}._Uqn9q_reqState{color:#9aa4b2;font-size:11px}._Uqn9q_reqItem[data-state=pass] ._Uqn9q_reqState{color:#7fd6a8;font-weight:700}._Uqn9q_reqItem[data-state=fail] ._Uqn9q_reqState{color:#ff6b6b;font-weight:700}._Uqn9q_skeletonTitle{color:#9aa4b2;margin:8px 0 2px;font-size:12px;display:block}._Uqn9q_rowIndex{color:#f2c14e;min-width:16px;font-weight:700}._Uqn9q_rowFailures{color:#ffb86b;font-size:11px}._Uqn9q_rowCost{color:#7fd6a8;font-variant-numeric:tabular-nums;font-size:11px}._Uqn9q_reqTable{border-collapse:collapse;width:100%;font-size:12px}._Uqn9q_reqTable th{text-align:left;color:#9aa4b2;border-bottom:1px solid #ffffff14;padding:2px 6px;font-weight:500}._Uqn9q_reqTable td{color:#e8eef6;border-bottom:1px solid #ffffff0a;padding:3px 6px}._Uqn9q_reqTable tfoot td{color:#9aa4b2;font-size:11px}._Uqn9q_reqTable tr[data-state=pass] ._Uqn9q_reqState{color:#7fd6a8;font-weight:700}._Uqn9q_reqTable tr[data-state=fail] ._Uqn9q_reqState{color:#ff6b6b;font-weight:700}._Uqn9q_reqFailuresCell{color:#ffb86b}._Uqn9q_architecture{margin:6px 0;font-size:12px}._Uqn9q_architecture summary{cursor:pointer;color:#9aa4b2}._Uqn9q_archText{white-space:pre-wrap;background:#0000002e;border-radius:8px;max-height:260px;margin:6px 0 0;padding:8px;font-size:11px;line-height:1.5;overflow:auto}._Uqn9q_rowHead{flex-wrap:wrap}._Uqn9q_rowSubject{white-space:normal;text-overflow:clip;line-height:1.4;overflow:visible}._Uqn9q_rowHead{flex-wrap:wrap;align-items:center;row-gap:4px}._Uqn9q_rowSubject{-webkit-line-clamp:2;white-space:normal;text-overflow:ellipsis;-webkit-box-orient:vertical;flex:100%;order:10;width:100%;min-width:0;line-height:1.35;display:-webkit-box;overflow:hidden}._Uqn9q_rowHuman{color:#f2c14e;font-size:11px;font-weight:700}._Uqn9q_confirmReview{color:#7fd6a8;cursor:pointer;background:#7fd6a81f;border:1px solid #7fd6a8;border-radius:6px;align-self:center;margin-left:8px;padding:2px 8px;font-size:11px}._Uqn9q_confirmReview:disabled{opacity:.55;cursor:default}";
		const tagId$5 = "dsh-pixel-team/LibraryPanel.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$5) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-pixel-team";
			tag.dataset.pluginCss = tagId$5;
			tag.textContent = css$5;
			document.head.appendChild(tag);
		}
		var LibraryPanel_module_css_default = {
			"acceptance": "_Uqn9q_acceptance",
			"acceptanceList": "_Uqn9q_acceptanceList",
			"acceptanceMark": "_Uqn9q_acceptanceMark",
			"archText": "_Uqn9q_archText",
			"architecture": "_Uqn9q_architecture",
			"blocker": "_Uqn9q_blocker",
			"blockerTitle": "_Uqn9q_blockerTitle",
			"canvas": "_Uqn9q_canvas",
			"card": "_Uqn9q_card",
			"confirmReview": "_Uqn9q_confirmReview",
			"cost": "_Uqn9q_cost",
			"detailDesc": "_Uqn9q_detailDesc",
			"detailId": "_Uqn9q_detailId",
			"detailList": "_Uqn9q_detailList",
			"detailMeta": "_Uqn9q_detailMeta",
			"details": "_Uqn9q_details",
			"edges": "_Uqn9q_edges",
			"empty": "_Uqn9q_empty",
			"gate": "_Uqn9q_gate",
			"head": "_Uqn9q_head",
			"list": "_Uqn9q_list",
			"live": "_Uqn9q_live",
			"meta": "_Uqn9q_meta",
			"mode": "_Uqn9q_mode",
			"offline": "_Uqn9q_offline",
			"reqFailuresCell": "_Uqn9q_reqFailuresCell",
			"reqIndex": "_Uqn9q_reqIndex",
			"reqItem": "_Uqn9q_reqItem",
			"reqList": "_Uqn9q_reqList",
			"reqState": "_Uqn9q_reqState",
			"reqTable": "_Uqn9q_reqTable",
			"reqText": "_Uqn9q_reqText",
			"reqTitle": "_Uqn9q_reqTitle",
			"requirements": "_Uqn9q_requirements",
			"root": "_Uqn9q_root",
			"row": "_Uqn9q_row",
			"rowAcceptance": "_Uqn9q_rowAcceptance",
			"rowChevron": "_Uqn9q_rowChevron",
			"rowCost": "_Uqn9q_rowCost",
			"rowDetail": "_Uqn9q_rowDetail",
			"rowFailures": "_Uqn9q_rowFailures",
			"rowHead": "_Uqn9q_rowHead",
			"rowHuman": "_Uqn9q_rowHuman",
			"rowId": "_Uqn9q_rowId",
			"rowIndex": "_Uqn9q_rowIndex",
			"rowMeta": "_Uqn9q_rowMeta",
			"rowStatus": "_Uqn9q_rowStatus",
			"rowSubject": "_Uqn9q_rowSubject",
			"scale": "_Uqn9q_scale",
			"skeletonTitle": "_Uqn9q_skeletonTitle",
			"status": "_Uqn9q_status",
			"stop": "_Uqn9q_stop",
			"subject": "_Uqn9q_subject",
			"team": "_Uqn9q_team",
			"version": "_Uqn9q_version"
		};
		//#endregion
		//#region lib/client/library-stream.js
		/**
		* One SSE connection per session for the library panel and cost prompts.
		* Reconnects with backoff; updates are debounced so a burst of state writes
		* cannot thrash React.
		*/
		const EMPTY = {
			team: null,
			todayCostUsd: 0,
			connected: false,
			costPrompt: void 0
		};
		let state = EMPTY;
		const listeners = /* @__PURE__ */ new Set();
		let source;
		let activeSession;
		let retry = 0;
		let timer;
		function notify() {
			if (timer !== void 0) window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				timer = void 0;
				for (const listener of listeners) listener();
			}, 80);
		}
		function connect(sessionId) {
			if (activeSession === sessionId && source !== void 0) return;
			disconnect();
			activeSession = sessionId;
			state = {
				...state,
				connected: false
			};
			notify();
			source = new EventSource("/plugins/dsh-pixel-team/events?sessionId=" + encodeURIComponent(sessionId));
			source.addEventListener("open", () => {
				retry = 0;
				state = {
					...state,
					connected: true
				};
				notify();
			});
			source.addEventListener("library", (event) => {
				try {
					const data = JSON.parse(event.data);
					state = {
						...state,
						team: data.team ?? null,
						todayCostUsd: typeof data.todayCostUsd === "number" ? data.todayCostUsd : state.todayCostUsd,
						connected: true
					};
					notify();
				} catch {}
			});
			source.addEventListener("cost", (event) => {
				try {
					const prompt = JSON.parse(event.data);
					state = {
						...state,
						costPrompt: prompt
					};
					notify();
				} catch {}
			});
			source.addEventListener("error", () => {
				state = {
					...state,
					connected: false
				};
				notify();
				if (source !== void 0) {
					source.close();
					source = void 0;
				}
				const delay = Math.min(15e3, 500 * 2 ** retry);
				retry += 1;
				window.setTimeout(() => {
					if (activeSession !== void 0) connect(activeSession);
				}, delay);
			});
		}
		function disconnect() {
			if (source !== void 0) {
				source.close();
				source = void 0;
			}
		}
		/** Resolve one cost prompt and clear it from the shared state. */
		async function decideCost(requestId, decision) {
			state = {
				...state,
				costPrompt: void 0
			};
			notify();
			await fetch("/plugins/dsh-pixel-team/cost/decision", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					requestId,
					decision
				})
			}).catch(() => void 0);
		}
		function subscribe(listener) {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		}
		/** Shared library state for one session (connection is ref-counted by usage). */
		function useLibraryState(sessionId) {
			if (sessionId !== void 0 && sessionId !== "" && sessionId !== activeSession) connect(sessionId);
			return (0, react.useSyncExternalStore)(subscribe, () => state, () => EMPTY);
		}
		//#endregion
		//#region lib/client/version.js
		/**
		* 客户端版本号：反馈异常的诊断信息会带上它。
		*
		* 与 package.json 的 version 保持一致，scripts/verify.mjs 会核对；
		* 客户端不能直接 import package.json（rootDir 只含 src），所以在这里显式声明。
		*/
		const PLUGIN_VERSION = "0.1.89";
		//#endregion
		//#region lib/currency.js
		/** Display-only USD→CNY rate; budgets and logs stay in USD. */
		const USD_TO_CNY = 7.2;
		function usdToCny(usd) {
			return Math.round(usd * USD_TO_CNY * 100) / 100;
		}
		//#endregion
		//#region lib/client/LibraryPanel.js
		/** Module 3: 道统·藏经阁 — live task progress list (single column, expand on click). */
		const STATUS_KEY = {
			pending: "library.status.pending",
			claimed: "library.status.claimed",
			in_progress: "library.status.inProgress",
			completed: "library.status.completed",
			failed: "library.status.failed"
		};
		function LibraryPanel({ sessionId, t }) {
			const { team, connected } = useLibraryState(sessionId);
			const [stopping, setStopping] = (0, react.useState)({});
			const [stopArmed, setStopArmed] = (0, react.useState)();
			const [notice, setNotice] = (0, react.useState)("");
			const [confirming, setConfirming] = (0, react.useState)({});
			const [expanded, setExpanded] = (0, react.useState)({});
			const [costByTask, setCostByTask] = (0, react.useState)({});
			(0, react.useEffect)(() => {
				let cancelled = false;
				const teamQuery = team?.teamId === void 0 ? "" : "&teamId=" + encodeURIComponent(team.teamId);
				fetch("/plugins/dsh-pixel-team/cost/report?sessionId=" + encodeURIComponent(sessionId) + teamQuery).then((response) => response.json()).then((body) => {
					if (cancelled || body.by_task === void 0) return;
					const next = {};
					for (const item of body.by_task) next[item.taskId] = item.usd;
					setCostByTask(next);
				}).catch(() => void 0);
				return () => {
					cancelled = true;
				};
			}, [
				sessionId,
				team?.teamId,
				team?.tasks.length ?? 0
			]);
			if (team === null) return (0, react_jsx_runtime.jsx)("p", {
				className: LibraryPanel_module_css_default.empty,
				children: t("library.empty")
			});
			const confirmReview = async (taskId) => {
				setConfirming((previous) => ({
					...previous,
					[taskId]: true
				}));
				try {
					const response = await fetch("/plugins/dsh-pixel-team/task/review-confirm", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							sessionId,
							taskId
						})
					});
					if (!response.ok) {
						const body = await response.json().catch(() => null);
						setNotice(body?.error ?? t("library.confirmFailed"));
					}
				} finally {
					setConfirming((previous) => ({
						...previous,
						[taskId]: false
					}));
				}
			};
			const stopTask = async (taskId) => {
				if (stopArmed !== taskId) {
					setStopArmed(taskId);
					return;
				}
				setStopArmed(void 0);
				setStopping((previous) => ({
					...previous,
					[taskId]: true
				}));
				try {
					await fetch("/plugins/dsh-pixel-team/task/stop", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							sessionId,
							taskId
						})
					});
				} finally {
					setStopping((previous) => ({
						...previous,
						[taskId]: false
					}));
				}
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: LibraryPanel_module_css_default.root,
				"data-library": true,
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: LibraryPanel_module_css_default.head,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: LibraryPanel_module_css_default.team,
								children: team.name
							}),
							(0, react_jsx_runtime.jsx)("span", {
								className: LibraryPanel_module_css_default.mode,
								style: {
									color: team.modeColor,
									borderColor: team.modeColor
								},
								children: team.modeName
							}),
							(0, react_jsx_runtime.jsx)("span", {
								className: LibraryPanel_module_css_default.scale,
								children: team.scale
							}),
							(0, react_jsx_runtime.jsx)("span", {
								className: LibraryPanel_module_css_default.gate,
								children: t("library.gate", {
									pass: team.gate.passed,
									total: team.gate.total
								})
							}),
							(0, react_jsx_runtime.jsxs)("span", {
								className: LibraryPanel_module_css_default.version,
								children: ["v", PLUGIN_VERSION]
							}),
							notice !== "" && (0, react_jsx_runtime.jsx)("span", {
								role: "alert",
								style: {
									color: "#ffb4a8",
									fontSize: 11
								},
								children: notice
							}),
							(0, react_jsx_runtime.jsx)("span", {
								className: connected ? LibraryPanel_module_css_default.live : LibraryPanel_module_css_default.offline,
								children: connected ? t("library.connected") : t("library.disconnected")
							})
						]
					}),
					team.requirements.length > 0 && (() => {
						const totalFailures = team.tasks.reduce((sum, task) => sum + task.failures, 0);
						return (0, react_jsx_runtime.jsxs)("section", {
							className: LibraryPanel_module_css_default.requirements,
							children: [(0, react_jsx_runtime.jsx)("span", {
								className: LibraryPanel_module_css_default.reqTitle,
								children: t("library.requirements")
							}), (0, react_jsx_runtime.jsxs)("table", {
								className: LibraryPanel_module_css_default.reqTable,
								children: [
									(0, react_jsx_runtime.jsx)("thead", { children: (0, react_jsx_runtime.jsxs)("tr", { children: [
										(0, react_jsx_runtime.jsx)("th", { children: "#" }),
										(0, react_jsx_runtime.jsx)("th", { children: t("library.reqCol") }),
										(0, react_jsx_runtime.jsx)("th", { children: t("library.reqState") }),
										(0, react_jsx_runtime.jsx)("th", { children: t("library.reqFailures") })
									] }) }),
									(0, react_jsx_runtime.jsx)("tbody", { children: team.requirements.map((item, index) => {
										const mapped = team.tasks.filter((task) => task.coverageOf.includes(item));
										const scoped = mapped.length > 0 ? mapped : team.tasks;
										const itemDone = scoped.length > 0 && scoped.every((task) => task.status === "completed");
										const itemFailed = scoped.some((task) => task.status === "failed");
										const itemFailures = scoped.reduce((sum, task) => sum + task.failures, 0);
										return (0, react_jsx_runtime.jsxs)("tr", {
											"data-state": itemDone ? "pass" : itemFailed ? "fail" : "pending",
											children: [
												(0, react_jsx_runtime.jsx)("td", {
													className: LibraryPanel_module_css_default.reqIndex,
													children: index + 1
												}),
												(0, react_jsx_runtime.jsx)("td", {
													className: LibraryPanel_module_css_default.reqText,
													children: item
												}),
												(0, react_jsx_runtime.jsx)("td", {
													className: LibraryPanel_module_css_default.reqState,
													children: itemDone ? "PASS" : itemFailed ? "FAIL" : t("library.inProgress")
												}),
												(0, react_jsx_runtime.jsx)("td", {
													className: LibraryPanel_module_css_default.reqFailuresCell,
													children: itemFailures
												})
											]
										}, index);
									}) }),
									(0, react_jsx_runtime.jsx)("tfoot", { children: (0, react_jsx_runtime.jsxs)("tr", { children: [(0, react_jsx_runtime.jsx)("td", {
										colSpan: 3,
										children: t("library.reqFailuresTotal")
									}), (0, react_jsx_runtime.jsx)("td", { children: totalFailures })] }) })
								]
							})]
						});
					})(),
					(0, react_jsx_runtime.jsx)("span", {
						className: LibraryPanel_module_css_default.skeletonTitle,
						children: t("library.skeleton")
					}),
					(0, react_jsx_runtime.jsxs)("details", {
						className: LibraryPanel_module_css_default.architecture,
						children: [(0, react_jsx_runtime.jsx)("summary", { children: t("library.architecture") }), (0, react_jsx_runtime.jsx)("pre", {
							className: LibraryPanel_module_css_default.archText,
							children: team.architecture
						})]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: LibraryPanel_module_css_default.list,
						children: team.tasks.map((task, index) => {
							const passed = task.acceptance.filter((item) => item.status === "pass").length;
							const failed = task.acceptance.filter((item) => item.status === "fail").length;
							const active = task.status === "claimed" || task.status === "in_progress";
							const open = expanded[task.id] === true;
							const taskCost = costByTask[task.id];
							return (0, react_jsx_runtime.jsxs)("div", {
								className: LibraryPanel_module_css_default.row,
								"data-status": task.status,
								children: [
									(0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										className: LibraryPanel_module_css_default.rowHead,
										"aria-expanded": open,
										onClick: () => {
											setExpanded((previous) => ({
												...previous,
												[task.id]: !open
											}));
										},
										children: [
											(0, react_jsx_runtime.jsx)("span", {
												className: LibraryPanel_module_css_default.rowChevron,
												"aria-hidden": true,
												children: open ? "▾" : "▸"
											}),
											(0, react_jsx_runtime.jsx)("span", {
												className: LibraryPanel_module_css_default.rowIndex,
												children: index + 1
											}),
											(0, react_jsx_runtime.jsx)("code", {
												className: LibraryPanel_module_css_default.rowId,
												children: task.id
											}),
											(0, react_jsx_runtime.jsx)("span", {
												className: LibraryPanel_module_css_default.rowSubject,
												title: task.subject,
												children: task.subject
											}),
											(0, react_jsx_runtime.jsx)("span", {
												className: LibraryPanel_module_css_default.rowMeta,
												children: task.assignee || t("library.unassigned")
											}),
											(0, react_jsx_runtime.jsx)("span", {
												className: LibraryPanel_module_css_default.rowStatus,
												children: t(STATUS_KEY[task.status] ?? "library.status.pending")
											}),
											(0, react_jsx_runtime.jsx)("span", {
												className: LibraryPanel_module_css_default.rowAcceptance,
												"data-failed": failed > 0 || void 0,
												children: t("library.acceptance", {
													pass: passed,
													total: task.acceptance.length
												})
											}),
											task.failures > 0 && (0, react_jsx_runtime.jsx)("span", {
												className: LibraryPanel_module_css_default.rowFailures,
												children: t("library.failures", { count: task.failures })
											}),
											task.awaitingHuman && (0, react_jsx_runtime.jsx)("span", {
												className: LibraryPanel_module_css_default.rowHuman,
												children: t("library.awaitingHuman")
											}),
											taskCost !== void 0 && taskCost > 0 && (0, react_jsx_runtime.jsx)("span", {
												className: LibraryPanel_module_css_default.rowCost,
												children: "¥" + usdToCny(taskCost).toFixed(2)
											})
										]
									}),
									task.awaitingHuman && (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: LibraryPanel_module_css_default.confirmReview,
										disabled: confirming[task.id] === true,
										title: t("library.confirmReview"),
										onClick: () => {
											confirmReview(task.id);
										},
										children: confirming[task.id] === true ? t("library.confirming") : "✓ " + t("library.confirmReview")
									}),
									active && (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: LibraryPanel_module_css_default.stop,
										disabled: stopping[task.id] === true,
										title: t("library.stop"),
										onClick: () => {
											stopTask(task.id);
										},
										children: stopping[task.id] === true ? t("library.stopping") : "■ " + t("library.stop")
									}),
									stopArmed === task.id && (0, react_jsx_runtime.jsxs)("span", {
										role: "alertdialog",
										style: {
											display: "inline-flex",
											gap: 6,
											alignItems: "center",
											marginLeft: 6,
											fontSize: 11,
											color: "#ffd7a0"
										},
										children: [
											(0, react_jsx_runtime.jsx)("span", { children: t("library.stopConfirm") }),
											(0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: LibraryPanel_module_css_default.stop,
												onClick: () => {
													stopTask(task.id);
												},
												children: t("library.confirm")
											}),
											(0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: LibraryPanel_module_css_default.stop,
												onClick: () => {
													setStopArmed(void 0);
												},
												children: t("library.cancel")
											})
										]
									}),
									open && (0, react_jsx_runtime.jsxs)("div", {
										className: LibraryPanel_module_css_default.rowDetail,
										children: [
											task.description !== "" && (0, react_jsx_runtime.jsx)("span", {
												className: LibraryPanel_module_css_default.detailDesc,
												children: task.description
											}),
											(0, react_jsx_runtime.jsxs)("span", {
												className: LibraryPanel_module_css_default.detailMeta,
												children: [
													t("library.deps"),
													": ",
													task.dependencies.join(", ") || t("library.noDeps"),
													" · ",
													task.kind
												]
											}),
											task.acceptance.length > 0 && (0, react_jsx_runtime.jsx)("ul", {
												className: LibraryPanel_module_css_default.acceptanceList,
												children: task.acceptance.map((item) => (0, react_jsx_runtime.jsxs)("li", {
													"data-status": item.status,
													children: [(0, react_jsx_runtime.jsx)("span", {
														className: LibraryPanel_module_css_default.acceptanceMark,
														children: item.status === "pass" ? "PASS" : item.status === "fail" ? "FAIL" : t("library.pending")
													}), item.criterion]
												}, item.criterion))
											})
										]
									})
								]
							}, task.id);
						})
					}),
					(0, react_jsx_runtime.jsxs)("footer", {
						className: LibraryPanel_module_css_default.blocker,
						"data-blocked": team.blocker === void 0 ? void 0 : true,
						children: [(0, react_jsx_runtime.jsx)("span", {
							className: LibraryPanel_module_css_default.blockerTitle,
							children: t("library.blocker")
						}), team.blocker === void 0 ? (0, react_jsx_runtime.jsx)("span", { children: t("library.noBlocker") }) : (0, react_jsx_runtime.jsxs)("span", { children: [
							team.blocker.subject,
							"：",
							team.blocker.reason
						] })]
					})
				]
			});
		}
		//#endregion
		//#region \0dsh-css:F:\MyApp\eternal\dsh-pixel-team\src\client\CostLedger.module.css.mjs
		const css$4 = ".Rlvu2W_ledger{border:1px solid var(--dsw-alias-border-l2);background:#ffffff05;border-radius:10px;flex-direction:column;gap:8px;padding:10px 12px;font-size:12px;display:flex}.Rlvu2W_head{align-items:center;gap:10px;display:flex}.Rlvu2W_head strong{font-size:13px}.Rlvu2W_today{color:#f2c14e;margin-left:auto;font-weight:700}.Rlvu2W_refresh{border:1px solid var(--dsw-alias-border-l2);color:inherit;cursor:pointer;background:0 0;border-radius:6px;padding:2px 8px;font-size:11px}.Rlvu2W_block{flex-direction:column;gap:4px;display:flex}.Rlvu2W_blockTitle{color:#9aa4b2;font-size:11px}.Rlvu2W_list{flex-direction:column;gap:2px;margin:0;padding:0;list-style:none;display:flex}.Rlvu2W_row{align-items:baseline;gap:6px;display:flex}.Rlvu2W_key{color:#e8eef6;min-width:52px}.Rlvu2W_meta{color:#9aa4b2;text-overflow:ellipsis;white-space:nowrap;flex:1;overflow:hidden}.Rlvu2W_amount{color:#7fd6a8;font-variant-numeric:tabular-nums}.Rlvu2W_error{color:#ff6b6b;margin:0}.Rlvu2W_empty{color:#9aa4b2;margin:0}.Rlvu2W_total{color:#f2c14e;margin-left:auto;font-size:12px;font-weight:700}";
		const tagId$4 = "dsh-pixel-team/CostLedger.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$4) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-pixel-team";
			tag.dataset.pluginCss = tagId$4;
			tag.textContent = css$4;
			document.head.appendChild(tag);
		}
		var CostLedger_module_css_default = {
			"amount": "Rlvu2W_amount",
			"block": "Rlvu2W_block",
			"blockTitle": "Rlvu2W_blockTitle",
			"empty": "Rlvu2W_empty",
			"error": "Rlvu2W_error",
			"head": "Rlvu2W_head",
			"key": "Rlvu2W_key",
			"ledger": "Rlvu2W_ledger",
			"list": "Rlvu2W_list",
			"meta": "Rlvu2W_meta",
			"refresh": "Rlvu2W_refresh",
			"row": "Rlvu2W_row",
			"today": "Rlvu2W_today",
			"total": "Rlvu2W_total"
		};
		//#endregion
		//#region lib/client/CostLedger.js
		/**
		* Cost report for the roster sheet: per-team option totals and, for the
		* selected team, per-task totals plus recent entries (no "today" line).
		*/
		function money(usd) {
			return "¥" + usdToCny(usd).toFixed(2);
		}
		async function loadReport(sessionId, teamId) {
			const query = "?sessionId=" + encodeURIComponent(sessionId) + (teamId === void 0 || teamId === "" ? "" : "&teamId=" + encodeURIComponent(teamId));
			const response = await fetch("/plugins/dsh-pixel-team/cost/report" + query);
			const body = await response.json();
			if (!response.ok) throw new Error(body.error ?? "failed to load costs");
			return body;
		}
		/** All-team report, used for the dropdown option totals. */
		function useCostReport(sessionId) {
			const [report, setReport] = (0, react.useState)();
			const reload = (0, react.useCallback)(() => {
				if (sessionId === void 0 || sessionId === "") return;
				loadReport(sessionId).then(setReport).catch(() => void 0);
			}, [sessionId]);
			(0, react.useEffect)(() => {
				reload();
				const timer = window.setInterval(reload, 15e3);
				return () => {
					window.clearInterval(timer);
				};
			}, [reload]);
			return {
				report,
				reload
			};
		}
		function CostDetail({ sessionId, teamId, t }) {
			const [report, setReport] = (0, react.useState)();
			const [error, setError] = (0, react.useState)("");
			const load = (0, react.useCallback)(() => {
				if (sessionId === void 0 || sessionId === "" || teamId === void 0 || teamId === "") return;
				loadReport(sessionId, teamId).then((body) => {
					setReport(body);
					setError("");
				}).catch((caught) => {
					setError(caught instanceof Error ? caught.message : String(caught));
				});
			}, [sessionId, teamId]);
			(0, react.useEffect)(() => {
				load();
			}, [load]);
			(0, react.useEffect)(() => {
				const timer = window.setInterval(load, 15e3);
				return () => {
					window.clearInterval(timer);
				};
			}, [load]);
			if (sessionId === void 0 || teamId === void 0) return null;
			const totalUsd = report === void 0 ? 0 : report.by_task.reduce((sum, item) => sum + item.usd, 0);
			return (0, react_jsx_runtime.jsxs)("section", {
				className: CostLedger_module_css_default.ledger,
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: CostLedger_module_css_default.head,
						children: [
							(0, react_jsx_runtime.jsx)("strong", { children: t("cost.ledger.title") }),
							(0, react_jsx_runtime.jsxs)("span", {
								className: CostLedger_module_css_default.total,
								children: [
									t("cost.ledger.total"),
									" ",
									money(totalUsd)
								]
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: CostLedger_module_css_default.refresh,
								onClick: load,
								children: t("cost.ledger.refresh")
							})
						]
					}),
					error !== "" && (0, react_jsx_runtime.jsx)("p", {
						className: CostLedger_module_css_default.error,
						children: error
					}),
					report !== void 0 && report.by_task.length > 0 && (0, react_jsx_runtime.jsxs)("div", {
						className: CostLedger_module_css_default.block,
						children: [(0, react_jsx_runtime.jsx)("span", {
							className: CostLedger_module_css_default.blockTitle,
							children: t("cost.ledger.byTask")
						}), (0, react_jsx_runtime.jsx)("ul", {
							className: CostLedger_module_css_default.list,
							children: report.by_task.map((item) => (0, react_jsx_runtime.jsxs)("li", {
								className: CostLedger_module_css_default.row,
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										className: CostLedger_module_css_default.key,
										children: item.taskId === "(spawn)" ? t("cost.ledger.unlinked") : item.taskId
									}),
									(0, react_jsx_runtime.jsxs)("span", {
										className: CostLedger_module_css_default.meta,
										children: [item.count, "×"]
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: CostLedger_module_css_default.amount,
										children: item.usd === 0 ? t("cost.ledger.unmetered") : money(item.usd)
									})
								]
							}, item.taskId))
						})]
					}),
					report !== void 0 && report.entries.length > 0 && (0, react_jsx_runtime.jsxs)("div", {
						className: CostLedger_module_css_default.block,
						children: [(0, react_jsx_runtime.jsx)("span", {
							className: CostLedger_module_css_default.blockTitle,
							children: t("cost.ledger.recent")
						}), (0, react_jsx_runtime.jsx)("ul", {
							className: CostLedger_module_css_default.list,
							children: report.entries.slice(0, 12).map((entry, index) => (0, react_jsx_runtime.jsxs)("li", {
								className: CostLedger_module_css_default.row,
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										className: CostLedger_module_css_default.key,
										children: new Date(entry.ts).toLocaleTimeString("zh-CN", { hour12: false })
									}),
									(0, react_jsx_runtime.jsxs)("span", {
										className: CostLedger_module_css_default.meta,
										children: [
											entry.memberName ?? "—",
											" · ",
											entry.taskId ?? t("cost.ledger.unlinked"),
											" · ",
											entry.decision === "captain-unmetered" ? t("cost.ledger.captainTask") : entry.decision === "usage-actual" ? t("cost.ledger.actual") : entry.decision ?? "—"
										]
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: CostLedger_module_css_default.amount,
										children: money(entry.estimateUsd)
									})
								]
							}, String(entry.ts) + index))
						})]
					}),
					report !== void 0 && report.by_task.length === 0 && (0, react_jsx_runtime.jsx)("p", {
						className: CostLedger_module_css_default.empty,
						children: t("cost.ledger.empty")
					})
				]
			});
		}
		//#endregion
		//#region \0dsh-css:F:\MyApp\eternal\dsh-pixel-team\src\client\CostDialog.module.css.mjs
		const css$3 = "._9SQR1q_backdrop{z-index:60;background:#080a1099;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}._9SQR1q_dialog{background:#131a24;border:1px solid #2c3442;border-radius:12px;flex-direction:column;gap:10px;width:min(440px,100vw - 40px);padding:16px;display:flex}._9SQR1q_title{margin:0;font-size:15px}._9SQR1q_body{margin:0;font-size:13px;line-height:1.5}._9SQR1q_note{color:#9aa4b2;margin:0;font-size:12px}._9SQR1q_actions{justify-content:flex-end;gap:8px;display:flex}";
		const tagId$3 = "dsh-pixel-team/CostDialog.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-pixel-team";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		var CostDialog_module_css_default = {
			"actions": "_9SQR1q_actions",
			"backdrop": "_9SQR1q_backdrop",
			"body": "_9SQR1q_body",
			"dialog": "_9SQR1q_dialog",
			"note": "_9SQR1q_note",
			"title": "_9SQR1q_title"
		};
		//#endregion
		//#region lib/client/CostDialog.js
		/** Module 4: soft cost / dead-loop prompts. Continue or terminate this one action only. */
		function CostDialog({ sessionId, t }) {
			const { costPrompt } = useLibraryState(sessionId);
			if (costPrompt === void 0) return null;
			const retry = costPrompt.reason === "retry";
			const reason = costPrompt.reason === "task" ? t("cost.task") : t("cost.day");
			return (0, react_jsx_runtime.jsx)("div", {
				className: CostDialog_module_css_default.backdrop,
				role: "dialog",
				"aria-modal": "true",
				"aria-label": retry ? t("cost.retryTitle") : t("cost.title"),
				children: (0, react_jsx_runtime.jsxs)("section", {
					className: CostDialog_module_css_default.dialog,
					children: [
						(0, react_jsx_runtime.jsx)("h3", {
							className: CostDialog_module_css_default.title,
							children: retry ? t("cost.retryTitle") : t("cost.title")
						}),
						retry ? (0, react_jsx_runtime.jsx)("p", {
							className: CostDialog_module_css_default.body,
							children: t("cost.retryBody", { count: String(costPrompt.retryCount ?? 0) })
						}) : (0, react_jsx_runtime.jsx)("p", {
							className: CostDialog_module_css_default.body,
							children: t("cost.body", {
								member: costPrompt.memberName,
								estimate: usdToCny(costPrompt.estimateUsd).toFixed(2),
								threshold: usdToCny(costPrompt.thresholdUsd).toFixed(2),
								reason
							})
						}),
						(0, react_jsx_runtime.jsx)("p", {
							className: CostDialog_module_css_default.note,
							children: retry ? t("cost.retryNote") : t("cost.note")
						}),
						(0, react_jsx_runtime.jsxs)("div", {
							className: CostDialog_module_css_default.actions,
							children: [(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									decideCost(costPrompt.requestId, "terminate");
								},
								children: retry ? t("cost.retryStop") : t("cost.terminate")
							}), (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								"data-primary": true,
								onClick: () => {
									decideCost(costPrompt.requestId, "continue");
								},
								children: t("cost.continue")
							})]
						})
					]
				})
			});
		}
		//#endregion
		//#region \0dsh-css:F:\MyApp\eternal\dsh-pixel-team\src\client\QuickStartDialog.module.css.mjs
		const css$2 = ".pcASAq_entry{color:#16241b;letter-spacing:.3px;cursor:pointer;white-space:nowrap;isolation:isolate;text-shadow:0 1px #ffffff59;background:linear-gradient(118deg,#f8e6b0 0%,#f2c14e 38%,#8fdcae 72%,#4ec98a 100%);border:1px solid #c4c35f;border-radius:999px;align-items:center;gap:6px;height:28px;padding:0 14px;font-size:12px;font-weight:700;transition:transform .12s,box-shadow .16s,filter .16s;animation:3.6s ease-in-out infinite pcASAq_entryBreathe;display:inline-flex;position:relative;overflow:hidden;box-shadow:0 0 0 1px #f2c14e38,0 3px 12px #4ec98a42,inset 0 1px #ffffff8c}.pcASAq_entry>span[aria-hidden]{filter:drop-shadow(0 0 4px #fffc);font-size:15px;line-height:1}.pcASAq_entry:after{z-index:-1;content:\"\";pointer-events:none;background:linear-gradient(90deg,#0000,#ffffffc7,#0000);width:22%;animation:4.4s ease-in-out infinite pcASAq_entryShine;position:absolute;top:-60%;bottom:-60%;left:-34%;transform:skew(-18deg)}.pcASAq_entry:hover{filter:saturate(1.12)brightness(1.05);transform:translateY(-1px);box-shadow:0 0 0 1px #f2c14e7a,0 6px 20px #4ec98a73,inset 0 1px #ffffffb3}.pcASAq_entry:active{transform:scale(.97)}.pcASAq_entry:focus-visible{outline-offset:2px;outline:2px solid #f2c14e}@keyframes pcASAq_entryBreathe{0%,to{box-shadow:0 0 0 1px #f2c14e38,0 3px 12px #4ec98a42,inset 0 1px #ffffff8c}50%{box-shadow:0 0 0 1px #f2c14e61,0 4px 16px #4ec98a6b,inset 0 1px #ffffffb3}}@keyframes pcASAq_entryShine{0%,52%{opacity:0;left:-34%}60%{opacity:1}86%,to{opacity:0;left:128%}}@media (prefers-reduced-motion:reduce){.pcASAq_entry{animation:none}.pcASAq_entry:after{display:none}}.pcASAq_actions{justify-content:flex-end;gap:8px;display:flex}.pcASAq_wizard{flex-direction:column;gap:12px;height:100%;min-height:0;display:flex}.pcASAq_wizard .pcASAq_form{flex:auto;min-height:0;overflow-y:auto}.pcASAq_wizard .pcASAq_stepPane{flex:auto;min-height:0}.pcASAq_wizard .pcASAq_templates{flex:auto;grid-auto-rows:minmax(52px,1fr);align-content:stretch;min-height:0;max-height:none}.pcASAq_wizardActions{z-index:1;border-top:1px solid var(--dsw-alias-border-l2);box-shadow:none;background:0 0;flex:none;justify-content:flex-end;gap:8px;margin:0;padding:10px 0 0;display:flex;position:static}.pcASAq_wizardActions>button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;border-radius:8px;padding:7px 14px;font-size:12px}.pcASAq_wizardActions>button[data-primary]{color:#16241b;background:linear-gradient(118deg,#f8e6b0,#f2c14e);border-color:#f2c14e;font-weight:700}.pcASAq_wizardActions>button:disabled{opacity:.55;cursor:default}.pcASAq_form{flex-direction:column;gap:12px;display:flex}.pcASAq_hint{color:var(--dsw-alias-label-secondary);margin:0;font-size:12px;line-height:1.6}.pcASAq_field{flex-direction:column;gap:6px;font-size:12px;display:flex}.pcASAq_field>span{color:var(--dsw-alias-label-secondary)}.pcASAq_field textarea,.pcASAq_field input,.pcASAq_field select{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:100%;color:var(--dsw-alias-label-primary);font:inherit;box-sizing:border-box;border-radius:8px;padding:8px 9px}.pcASAq_field textarea{resize:vertical}.pcASAq_error{color:var(--dsw-alias-state-error-primary,#ef6b6b);margin:0;font-size:12px}.pcASAq_success{color:var(--dsw-alias-state-success-primary,#3fbf9a);margin:0;font-size:12px}.pcASAq_sectRow{flex-wrap:wrap;gap:6px;display:flex}.pcASAq_sectChip{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;white-space:nowrap;border-radius:999px;align-items:center;gap:4px;padding:4px 10px;font-size:11px;line-height:15px;display:inline-flex}.pcASAq_sectChip:hover:not(:disabled){border-color:var(--dsw-alias-state-business-primary,#5b8def);color:var(--dsw-alias-label-primary)}.pcASAq_sectChip[data-active=true]{background:color-mix(in srgb, #4ec98a 12%, var(--dsw-alias-bg-layer-1));color:#4ec98a;border-color:#4ec98a}.pcASAq_sectChip:disabled{opacity:.55;cursor:default}.pcASAq_sectRoster{flex-wrap:wrap;gap:4px;margin-top:2px;display:flex}.pcASAq_multi{position:relative}.pcASAq_multiTrigger{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:100%;min-height:34px;color:var(--dsw-alias-label-primary);font:inherit;box-sizing:border-box;text-align:left;cursor:pointer;border-radius:8px;align-items:center;gap:6px;padding:5px 9px;font-size:12px;display:flex}.pcASAq_multiTrigger:hover{border-color:var(--dsw-alias-state-business-primary,#5b8def)}.pcASAq_chips{flex-wrap:wrap;flex:1;gap:4px;min-width:0;display:flex}.pcASAq_chip{background:color-mix(in srgb, var(--dsw-alias-state-business-primary,#5b8def) 14%, transparent);color:var(--dsw-alias-state-business-primary,#5b8def);border-radius:999px;align-items:center;gap:5px;padding:1px 8px 1px 3px;font-size:11px;display:inline-flex}.pcASAq_chipAvatar{object-fit:cover;width:20px;height:20px;image-rendering:pixelated;background:#00000040;border-radius:4px;flex:none}.pcASAq_chipLetter{background:color-mix(in srgb, var(--dsw-alias-state-business-primary,#5b8def) 22%, transparent);border-radius:4px;flex:none;place-items:center;width:20px;height:20px;font-size:10px;font-weight:700;display:grid}.pcASAq_optionAvatar{object-fit:cover;width:24px;height:24px;image-rendering:pixelated;background:#0003;border-radius:5px;flex:none}.pcASAq_placeholder{color:var(--dsw-alias-label-secondary);font-size:12px}.pcASAq_caret{color:var(--dsw-alias-label-secondary);margin-left:auto;font-size:10px}.pcASAq_multiPanel{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);border-radius:10px;max-height:200px;margin-top:4px;padding:6px;position:static;overflow:auto;box-shadow:0 8px 22px #00000059}.pcASAq_option{cursor:pointer;border-radius:6px;align-items:center;gap:8px;padding:4px 6px;font-size:12px;display:flex}.pcASAq_option:hover{background:var(--dsw-alias-bg-layer-1)}.pcASAq_option input{accent-color:var(--dsw-alias-state-business-primary,#5b8def)}.pcASAq_customRow{border-top:1px solid var(--dsw-alias-border-l2);gap:6px;margin-top:4px;padding:6px 4px 2px;display:flex}.pcASAq_customRow input{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);min-width:0;color:var(--dsw-alias-label-primary);font:inherit;border-radius:7px;flex:1;padding:6px 8px;font-size:12px}.pcASAq_customRow button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);cursor:pointer;border-radius:7px;padding:6px 10px;font-size:12px}.pcASAq_customRow button:disabled{opacity:.5;cursor:default}.pcASAq_templateDesc{color:var(--dsw-alias-label-secondary);font-size:11px;line-height:1.5}.pcASAq_option{flex-wrap:wrap}.pcASAq_optionName{font-weight:600}.pcASAq_optionId{color:var(--dsw-alias-label-secondary);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10px}.pcASAq_optionAbility{color:var(--dsw-alias-label-secondary);flex-basis:100%;padding-left:22px;font-size:10px}.pcASAq_replaceRow{border:1px solid color-mix(in srgb, var(--dsw-alias-state-warning-primary) 40%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 8%, transparent);border-radius:8px;flex-wrap:wrap;align-items:center;gap:8px;margin:0;padding:8px 10px;font-size:11px;display:flex}.pcASAq_replaceRow button{border:1px solid var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);color:var(--dsw-alias-state-error-primary);cursor:pointer;border-radius:7px;padding:5px 10px;font-size:11px;font-weight:600}.pcASAq_replaceRow button:hover{background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 20%, transparent)}.pcASAq_replaceRow button:disabled{cursor:wait;opacity:.55}.pcASAq_templates{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;padding:2px;display:grid;overflow:auto}.pcASAq_templateCard{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;border-radius:8px;flex-direction:column;align-items:flex-start;gap:2px;padding:7px 9px;display:flex}.pcASAq_templateCard:hover{border-color:var(--dsw-alias-state-business-primary,#5b8def)}.pcASAq_templateCard[aria-checked=true]{border-color:var(--dsw-alias-state-business-primary,#5b8def);background:color-mix(in srgb, var(--dsw-alias-state-business-primary,#5b8def) 12%, var(--dsw-alias-bg-layer-1))}.pcASAq_templateName{font-size:12px;font-weight:650}.pcASAq_templateCard .pcASAq_templateDesc{color:var(--dsw-alias-label-secondary);font-size:10px;line-height:1.45}.pcASAq_steps{align-items:center;gap:4px;margin:0;padding:0;list-style:none;display:flex}.pcASAq_stepItem{flex:1;min-width:0}.pcASAq_stepButton{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:100%;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;white-space:nowrap;border-radius:999px;align-items:center;gap:6px;padding:5px 8px;font-size:11px;display:flex;overflow:hidden}.pcASAq_stepButton:disabled{cursor:default;opacity:.7}.pcASAq_stepItem[data-state=current] .pcASAq_stepButton{color:#f2c14e;background:color-mix(in srgb, #f2c14e 12%, var(--dsw-alias-bg-layer-1));border-color:#f2c14e}.pcASAq_stepItem[data-state=done] .pcASAq_stepButton{border-color:color-mix(in srgb, #4ec98a 60%, var(--dsw-alias-border-l2));color:#4ec98a}.pcASAq_stepDot{background:color-mix(in srgb, currentcolor 18%, transparent);border-radius:50%;flex:none;justify-content:center;align-items:center;width:16px;height:16px;font-size:10px;font-weight:700;display:inline-flex}.pcASAq_stepLabel{text-overflow:ellipsis;overflow:hidden}.pcASAq_stepPane{flex-direction:column;gap:10px;display:flex}.pcASAq_templateMeta{color:var(--dsw-alias-label-secondary);opacity:.8;margin-top:2px;font-size:10px}.pcASAq_goalMeta{color:var(--dsw-alias-label-secondary);justify-content:space-between;gap:8px;margin:0;font-size:10px;display:flex}.pcASAq_summary{border:1px solid color-mix(in srgb, #f2c14e 40%, var(--dsw-alias-border-l2));background:color-mix(in srgb, #f2c14e 6%, var(--dsw-alias-bg-layer-1));border-radius:10px;flex-direction:column;gap:6px;margin:0;padding:10px 12px;display:flex}.pcASAq_summaryRow{grid-template-columns:64px 1fr;gap:8px;margin:0;display:grid}.pcASAq_summaryRow dt{color:var(--dsw-alias-label-secondary);margin:0;font-size:11px}.pcASAq_summaryRow dd{color:var(--dsw-alias-label-primary);word-break:break-word;white-space:pre-wrap;margin:0;font-size:12px;line-height:1.5}.pcASAq_oath{border:1px solid color-mix(in srgb, #4ec98a 45%, var(--dsw-alias-border-l2));color:var(--dsw-alias-label-secondary);background:#4ec98a17;border-radius:8px;margin:0;padding:8px 10px;font-size:11px;line-height:1.6}.pcASAq_polishRow{flex-wrap:wrap;align-items:center;gap:8px;margin-top:8px;display:flex}.pcASAq_polishButton{color:inherit;cursor:pointer;background:#f2c14e1a;border:1px solid #f2c14e73;border-radius:999px;padding:4px 12px;font-size:12px}.pcASAq_polishButton:disabled{opacity:.55;cursor:default}.pcASAq_polishError{color:#ff6b6b;font-size:12px}.pcASAq_polishApplied{color:#7fd6a8;font-size:12px}.pcASAq_modeRow{flex-wrap:wrap;align-items:center;gap:6px;margin-top:8px;display:flex}.pcASAq_modeLabel{color:#9aa4b2;margin-right:2px;font-size:12px}.pcASAq_modeChip{color:inherit;cursor:pointer;background:0 0;border:1px solid #2c3442;border-radius:999px;padding:3px 10px;font-size:12px}.pcASAq_modeChip[data-active=true]{color:#f2c14e;background:#f2c14e1a;border-color:#f2c14e}.pcASAq_modeChip:disabled{opacity:.55;cursor:default}.pcASAq_replaceBubble{background:#f2c14e14;border:1px solid #f2c14e8c;border-radius:10px;flex-direction:column;gap:8px;margin:8px 0 0;padding:10px 12px;display:flex}.pcASAq_replaceText{color:#f2c14e;margin:0;font-size:12px;line-height:1.5}.pcASAq_replaceActions{justify-content:flex-end;gap:8px;display:flex}.pcASAq_confirmFloat{z-index:3;background:#1b2028;border:1px solid #f2c14e99;border-radius:12px;flex-direction:column;gap:8px;width:min(320px,100vw - 60px);padding:10px 12px;display:flex;position:absolute;bottom:calc(100% + 12px);right:12px;box-shadow:0 10px 28px #00000073}.pcASAq_confirmFloatText{color:#f2c14e;margin:0;font-size:12px;line-height:1.5}.pcASAq_confirmFloatActions{justify-content:flex-end;gap:8px;display:flex}.pcASAq_confirmFloatActions button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;border-radius:8px;padding:5px 12px;font-size:12px}.pcASAq_confirmFloatActions button[data-primary]{color:#16241b;background:linear-gradient(118deg,#f8e6b0,#f2c14e);border-color:#f2c14e;font-weight:700}.pcASAq_confirmFloatTail{background:#1b2028;border-bottom:1px solid #f2c14e99;border-right:1px solid #f2c14e99;width:12px;height:12px;position:absolute;bottom:-7px;right:26px;transform:rotate(45deg)}.pcASAq_confirmFloatActions button[data-danger]{color:#ff9a9a;background:#ff6b6b29;border-color:#ff6b6b}.pcASAq_confirmFloatActions button[data-danger]:not(:disabled):hover{background:#ff6b6b42}.pcASAq_soloRow{flex-direction:column;gap:4px;margin:0;font-size:12px;display:flex}.pcASAq_soloRow label{cursor:pointer;align-items:center;gap:6px;display:flex}.pcASAq_soloRow small{color:#9aa4b2;font-size:11px}.pcASAq_soloButton{color:#f2c14e;cursor:pointer;background:0 0;border:1px solid #7f6a3a;border-radius:8px;align-self:flex-start;padding:4px 12px;font-size:12px}.pcASAq_soloButton[data-active=true]{background:#f2c14e29;border-color:#f2c14e;font-weight:700}.pcASAq_soloButton:disabled{opacity:.55;cursor:default}.pcASAq_busyNote{color:#f2c14e;background:#f2c14e14;border:1px solid #f2c14e80;border-radius:8px;margin:8px 0 0;padding:8px 10px;font-size:12px;line-height:1.5;animation:1.4s ease-in-out infinite pcASAq_busy-pulse}@keyframes pcASAq_busy-pulse{0%,to{opacity:1}50%{opacity:.6}}.pcASAq_wizardActions{margin-top:auto}.pcASAq_confirmInline{background:#f2c14e14;border:1px solid #f2c14e73;border-radius:8px;flex-direction:column;gap:8px;padding:10px;display:flex}.pcASAq_wizardActions{position:relative}.pcASAq_confirmPop{color:#f2c14e;z-index:2;background:#1b2028;border:1px solid #f2c14e73;border-radius:8px;width:min(280px,100vw - 48px);padding:10px 12px;font-size:12px;position:absolute;bottom:calc(100% + 8px);right:0;box-shadow:0 10px 28px #00000073}.pcASAq_confirmPop p{margin:0 0 8px}.pcASAq_confirmPop>div{justify-content:flex-end;gap:8px;display:flex}.pcASAq_confirmPop button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:inherit;cursor:pointer;font:inherit;border-radius:6px;padding:4px 10px}.pcASAq_confirmPop button[data-danger]{color:#ff9a9a;border-color:#ff6b6b}.pcASAq_replaceNotice{color:#f2c14e;background:#f2c14e12;border:1px solid #f2c14e66;border-radius:8px;justify-content:space-between;align-items:center;gap:10px;padding:8px 10px;font-size:12px;display:flex}.pcASAq_replaceNotice button{color:inherit;cursor:pointer;font:inherit;background:0 0;border:1px solid #f2c14e80;border-radius:6px;flex:none;padding:4px 10px}.pcASAq_replaceNotice button[data-active]{background:#f2c14e33}";
		const tagId$2 = "dsh-pixel-team/QuickStartDialog.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-pixel-team";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var QuickStartDialog_module_css_default = {
			"actions": "pcASAq_actions",
			"busy-pulse": "pcASAq_busy-pulse",
			"busyNote": "pcASAq_busyNote",
			"caret": "pcASAq_caret",
			"chip": "pcASAq_chip",
			"chipAvatar": "pcASAq_chipAvatar",
			"chipLetter": "pcASAq_chipLetter",
			"chips": "pcASAq_chips",
			"confirmFloat": "pcASAq_confirmFloat",
			"confirmFloatActions": "pcASAq_confirmFloatActions",
			"confirmFloatTail": "pcASAq_confirmFloatTail",
			"confirmFloatText": "pcASAq_confirmFloatText",
			"confirmInline": "pcASAq_confirmInline",
			"confirmPop": "pcASAq_confirmPop",
			"customRow": "pcASAq_customRow",
			"entry": "pcASAq_entry",
			"entryBreathe": "pcASAq_entryBreathe",
			"entryShine": "pcASAq_entryShine",
			"error": "pcASAq_error",
			"field": "pcASAq_field",
			"form": "pcASAq_form",
			"goalMeta": "pcASAq_goalMeta",
			"hint": "pcASAq_hint",
			"modeChip": "pcASAq_modeChip",
			"modeLabel": "pcASAq_modeLabel",
			"modeRow": "pcASAq_modeRow",
			"multi": "pcASAq_multi",
			"multiPanel": "pcASAq_multiPanel",
			"multiTrigger": "pcASAq_multiTrigger",
			"oath": "pcASAq_oath",
			"option": "pcASAq_option",
			"optionAbility": "pcASAq_optionAbility",
			"optionAvatar": "pcASAq_optionAvatar",
			"optionId": "pcASAq_optionId",
			"optionName": "pcASAq_optionName",
			"placeholder": "pcASAq_placeholder",
			"polishApplied": "pcASAq_polishApplied",
			"polishButton": "pcASAq_polishButton",
			"polishError": "pcASAq_polishError",
			"polishRow": "pcASAq_polishRow",
			"replaceActions": "pcASAq_replaceActions",
			"replaceBubble": "pcASAq_replaceBubble",
			"replaceNotice": "pcASAq_replaceNotice",
			"replaceRow": "pcASAq_replaceRow",
			"replaceText": "pcASAq_replaceText",
			"sectChip": "pcASAq_sectChip",
			"sectRoster": "pcASAq_sectRoster",
			"sectRow": "pcASAq_sectRow",
			"soloButton": "pcASAq_soloButton",
			"soloRow": "pcASAq_soloRow",
			"stepButton": "pcASAq_stepButton",
			"stepDot": "pcASAq_stepDot",
			"stepItem": "pcASAq_stepItem",
			"stepLabel": "pcASAq_stepLabel",
			"stepPane": "pcASAq_stepPane",
			"steps": "pcASAq_steps",
			"success": "pcASAq_success",
			"summary": "pcASAq_summary",
			"summaryRow": "pcASAq_summaryRow",
			"templateCard": "pcASAq_templateCard",
			"templateDesc": "pcASAq_templateDesc",
			"templateMeta": "pcASAq_templateMeta",
			"templateName": "pcASAq_templateName",
			"templates": "pcASAq_templates",
			"wizard": "pcASAq_wizard",
			"wizardActions": "pcASAq_wizardActions"
		};
		//#endregion
		//#region lib/client/hall-events.js
		/** Window event used by the hall overlay to open one of its content sheets. */
		const OPEN_HALL_SHEET_EVENT = "agent-teams:open-sheet";
		//#endregion
		//#region lib/client/sects.js
		/** 内置门派；新增门派只改这里。 */
		const SECT_PRESETS = [
			{
				id: "jian",
				nameKey: "sect.jian.name",
				descKey: "sect.jian.desc",
				roles: [
					"implementer",
					"reviewer",
					"planner"
				]
			},
			{
				id: "dan",
				nameKey: "sect.dan.name",
				descKey: "sect.dan.desc",
				roles: [
					"verifier",
					"healer",
					"reviewer"
				]
			},
			{
				id: "fuzhen",
				nameKey: "sect.fuzhen.name",
				descKey: "sect.fuzhen.desc",
				roles: [
					"talisman",
					"architect",
					"puppeteer"
				]
			},
			{
				id: "mo",
				nameKey: "sect.mo.name",
				descKey: "sect.mo.desc",
				roles: [
					"demon",
					"poisoner",
					"tester"
				]
			},
			{
				id: "fo",
				nameKey: "sect.fo.name",
				descKey: "sect.fo.desc",
				roles: [
					"monk",
					"tester",
					"documenter"
				]
			},
			{
				id: "sanxiu",
				nameKey: "sect.sanxiu.name",
				descKey: "sect.sanxiu.desc",
				roles: [
					"researcher",
					"analyst",
					"writer"
				]
			},
			{
				id: "yushou",
				nameKey: "sect.yushou.name",
				descKey: "sect.yushou.desc",
				roles: [
					"beastmaster",
					"musician",
					"auditor"
				]
			},
			{
				id: "lianqi",
				nameKey: "sect.lianqi.name",
				descKey: "sect.lianqi.desc",
				roles: [
					"operator",
					"implementer",
					"verifier"
				]
			}
		];
		/** 按 id 找门派（未知 id 返回 undefined）。 */
		function sectPreset(id) {
			return SECT_PRESETS.find((preset) => preset.id === id);
		}
		/** 随机抽一个门派（「系统动态分配」）。 */
		function randomSect(current) {
			const pool = SECT_PRESETS.filter((preset) => preset.id !== current);
			const list = pool.length > 0 ? pool : SECT_PRESETS;
			return list[Math.floor(Math.random() * list.length)];
		}
		//#endregion
		//#region \0dsh-css:F:\MyApp\eternal\dsh-pixel-team\src\client\InterviewSheet.module.css.mjs
		const css$1 = ".g3jD5a_root{flex-direction:column;gap:12px;display:flex}.g3jD5a_modeBadge{border:1px solid;border-radius:999px;align-self:flex-start;margin:0;padding:1px 9px;font-size:12px}.g3jD5a_aiNote{color:#9aa4b2;margin:0;font-size:12px}.g3jD5a_aiNote[data-state=loading]{color:#f2c14e}.g3jD5a_aiNote[data-state=fallback]{color:#ffb86b}.g3jD5a_block{flex-direction:column;gap:6px;display:flex}.g3jD5a_prompt{font-size:13px;font-weight:600}.g3jD5a_chips{flex-wrap:wrap;gap:6px;display:flex}.g3jD5a_chip{color:inherit;cursor:pointer;background:0 0;border:1px solid #2c3442;border-radius:999px;padding:4px 10px;font-size:12px}.g3jD5a_chip[data-active=true]{color:#f2c14e;background:#f2c14e1f;border-color:#f2c14e}.g3jD5a_chip:disabled{opacity:.55;cursor:default}.g3jD5a_input{box-sizing:border-box;width:100%;color:inherit;background:0 0;border:1px solid #2c3442;border-radius:8px;padding:6px 8px;font-size:13px}.g3jD5a_error{color:#ff6b6b;margin:0;font-size:12px}.g3jD5a_loading{color:#9aa4b2;margin:0;font-size:13px}.g3jD5a_retry{color:inherit;cursor:pointer;background:0 0;border:1px solid #2c3442;border-radius:999px;align-self:flex-start;padding:4px 12px;font-size:12px}.g3jD5a_customRow{align-items:center;gap:6px;display:flex}.g3jD5a_customRow .g3jD5a_input{flex:auto}.g3jD5a_addCustom{width:30px;height:30px;color:inherit;cursor:pointer;background:0 0;border:1px solid #2c3442;border-radius:6px;flex:none}.g3jD5a_addCustom:disabled{opacity:.45;cursor:default}";
		const tagId$1 = "dsh-pixel-team/InterviewSheet.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-pixel-team";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var InterviewSheet_module_css_default = {
			"addCustom": "g3jD5a_addCustom",
			"aiNote": "g3jD5a_aiNote",
			"block": "g3jD5a_block",
			"chip": "g3jD5a_chip",
			"chips": "g3jD5a_chips",
			"customRow": "g3jD5a_customRow",
			"error": "g3jD5a_error",
			"input": "g3jD5a_input",
			"loading": "g3jD5a_loading",
			"modeBadge": "g3jD5a_modeBadge",
			"prompt": "g3jD5a_prompt",
			"retry": "g3jD5a_retry",
			"root": "g3jD5a_root"
		};
		//#endregion
		//#region lib/client/InterviewSheet.js
		/** Dynamic AI interview: template-like questions generated from the requirement. */
		function InterviewSheet({ questions, answers, onChange, state, error, mode, disabled, onRetry, t }) {
			const [custom, setCustom] = (0, react.useState)({});
			const spec = getModeSpec(mode);
			const setAnswer = (id, values) => {
				onChange({
					...answers,
					[id]: values
				});
			};
			const toggle = (id, value, multi) => {
				const current = answers[id] ?? [];
				if (multi) {
					setAnswer(id, current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
					return;
				}
				setAnswer(id, current.includes(value) ? [] : [value]);
			};
			const addCustom = (id) => {
				const value = (custom[id] ?? "").trim();
				if (value === "") return;
				setAnswer(id, [.../* @__PURE__ */ new Set([...answers[id] ?? [], value])]);
				setCustom((current) => ({
					...current,
					[id]: ""
				}));
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: InterviewSheet_module_css_default.root,
				"data-step": "interview",
				children: [
					(0, react_jsx_runtime.jsxs)("p", {
						className: InterviewSheet_module_css_default.modeBadge,
						style: {
							color: spec.color,
							borderColor: spec.color
						},
						children: [
							spec.emoji,
							" ",
							t(spec.labelKey)
						]
					}),
					(0, react_jsx_runtime.jsx)("p", {
						className: InterviewSheet_module_css_default.aiNote,
						"data-state": state,
						children: state === "loading" ? t("interview.loading") : state === "fallback" ? t("interview.fallback") : t("interview.hint")
					}),
					error !== "" && (0, react_jsx_runtime.jsx)("p", {
						className: InterviewSheet_module_css_default.error,
						role: "alert",
						children: error
					}),
					state === "loading" && (0, react_jsx_runtime.jsx)("p", {
						className: InterviewSheet_module_css_default.loading,
						children: t("interview.loadingHint")
					}),
					state !== "loading" && questions.map((question) => (0, react_jsx_runtime.jsxs)("section", {
						className: InterviewSheet_module_css_default.block,
						children: [
							(0, react_jsx_runtime.jsxs)("span", {
								className: InterviewSheet_module_css_default.prompt,
								children: [question.prompt, question.multi ? t("interview.multi") : t("interview.single")]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: InterviewSheet_module_css_default.chips,
								children: [question.options.map((option) => (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: InterviewSheet_module_css_default.chip,
									"data-active": (answers[question.id] ?? []).includes(option) || void 0,
									disabled,
									onClick: () => {
										toggle(question.id, option, question.multi);
									},
									children: option
								}, option)), (answers[question.id] ?? []).filter((value) => !question.options.includes(value)).map((value) => (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: InterviewSheet_module_css_default.chip,
									"data-active": true,
									disabled,
									onClick: () => {
										setAnswer(question.id, (answers[question.id] ?? []).filter((item) => item !== value));
									},
									children: [value, " ×"]
								}, value))]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: InterviewSheet_module_css_default.customRow,
								children: [(0, react_jsx_runtime.jsx)("input", {
									className: InterviewSheet_module_css_default.input,
									value: custom[question.id] ?? "",
									disabled,
									placeholder: t("interview.customPlaceholder"),
									onChange: (event) => {
										setCustom((current) => ({
											...current,
											[question.id]: event.target.value
										}));
									},
									onKeyDown: (event) => {
										if (event.key === "Enter") {
											event.preventDefault();
											addCustom(question.id);
										}
									}
								}), (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: InterviewSheet_module_css_default.addCustom,
									disabled: disabled || (custom[question.id] ?? "").trim() === "",
									onClick: () => {
										addCustom(question.id);
									},
									children: "+"
								})]
							})
						]
					}, question.id)),
					state === "fallback" && (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: InterviewSheet_module_css_default.retry,
						disabled,
						onClick: onRetry,
						children: t("interview.retry")
					})
				]
			});
		}
		//#endregion
		//#region lib/client/QuickStartDialog.js
		/** Click-to-dispatch entry: a header button that stages a plan from a small wizard. */
		const TEMPLATES = [
			{
				id: "feat",
				labelKey: "quickstart.tplFeat",
				descKey: "quickstart.desc.feat",
				roles: [
					"planner",
					"implementer",
					"verifier",
					"reviewer"
				]
			},
			{
				id: "fix",
				labelKey: "quickstart.tplFix",
				descKey: "quickstart.desc.fix",
				roles: [
					"implementer",
					"verifier",
					"reviewer"
				]
			},
			{
				id: "research",
				labelKey: "quickstart.tplResearch",
				descKey: "quickstart.desc.research",
				roles: [
					"researcher",
					"analyst",
					"writer",
					"reviewer"
				]
			},
			{
				id: "fullstack",
				labelKey: "quickstart.tplFullstack",
				descKey: "quickstart.desc.fullstack",
				roles: [
					"integrator",
					"frontend",
					"backend",
					"verifier",
					"reviewer"
				]
			},
			{
				id: "hardening",
				labelKey: "quickstart.tplHardening",
				descKey: "quickstart.desc.hardening",
				roles: [
					"auditor",
					"security",
					"verifier",
					"reviewer"
				]
			},
			{
				id: "audit",
				labelKey: "quickstart.tplAudit",
				descKey: "quickstart.desc.audit",
				roles: ["auditor", "reviewer"]
			},
			{
				id: "build",
				labelKey: "quickstart.tplBuild",
				descKey: "quickstart.desc.build",
				roles: [
					"implementer",
					"verifier",
					"operator"
				]
			},
			{
				id: "array",
				labelKey: "quickstart.tplArray",
				descKey: "quickstart.desc.array",
				roles: [
					"architect",
					"implementer",
					"verifier",
					"reviewer"
				]
			},
			{
				id: "docs",
				labelKey: "quickstart.tplDocs",
				descKey: "quickstart.desc.docs",
				roles: [
					"writer",
					"documenter",
					"reviewer"
				]
			},
			{
				id: "debate",
				labelKey: "quickstart.tplDebate",
				descKey: "quickstart.desc.debate",
				roles: [
					"researcher",
					"analyst",
					"reviewer"
				]
			}
		];
		const QUICK_START_DRAFT_PREFIX = "dsh-pixel-team.quickstart.";
		function readQuickStartDraft(sessionId) {
			try {
				const raw = window.localStorage.getItem(QUICK_START_DRAFT_PREFIX + sessionId);
				if (raw === null) return void 0;
				const value = JSON.parse(raw);
				if (typeof value !== "object" || value === null) return void 0;
				return {
					step: typeof value.step === "number" ? value.step : 0,
					mode: typeof value.mode === "string" && TEAM_MODES.includes(value.mode) ? value.mode : DEFAULT_MODE,
					goal: typeof value.goal === "string" ? value.goal : "",
					template: typeof value.template === "string" ? value.template : TEMPLATES[0]?.id ?? "fix",
					roles: Array.isArray(value.roles) ? value.roles.filter((role) => typeof role === "string") : [...TEMPLATES[0]?.roles ?? []],
					sectMode: typeof value.sectMode === "string" ? value.sectMode : "random",
					rolledSect: typeof value.rolledSect === "string" ? value.rolledSect : randomSect().id,
					solo: value.solo === true,
					superFast: value.superFast === true,
					questions: Array.isArray(value.questions) ? value.questions : [],
					answers: typeof value.answers === "object" && value.answers !== null ? value.answers : {},
					submitting: value.submitting === true,
					submittedAt: typeof value.submittedAt === "number" ? value.submittedAt : 0
				};
			} catch {
				return;
			}
		}
		function saveQuickStartDraft(sessionId, draft) {
			try {
				window.localStorage.setItem(QUICK_START_DRAFT_PREFIX + sessionId, JSON.stringify(draft));
			} catch {}
		}
		function clearQuickStartDraft(sessionId) {
			try {
				window.localStorage.removeItem(QUICK_START_DRAFT_PREFIX + sessionId);
			} catch {}
		}
		/** 开宗五步：道统 → 立派之志 → AI 访谈 → 宗门 → 立誓。 */
		const STEPS = [
			"doctrine",
			"vow",
			"interview",
			"sect",
			"oath"
		];
		const SOLO_STEPS = [
			"doctrine",
			"vow",
			"interview",
			"oath"
		];
		const STEP_LABEL = {
			doctrine: "quickstart.stepDoctrine",
			vow: "quickstart.stepVow",
			interview: "quickstart.stepInterview",
			sect: "quickstart.stepSect",
			oath: "quickstart.stepOath"
		};
		/** Template questions used only when the host/model cannot answer. */
		function fallbackInterviewQuestions(mode) {
			const spec = getModeSpec(mode);
			return [
				{
					id: "platform",
					prompt: "目标运行平台？",
					multi: true,
					options: [
						"Windows",
						"Linux (UOS/麒麟)",
						"macOS",
						"Android",
						"iOS"
					]
				},
				{
					id: "acceptance",
					prompt: "验收以哪条为准？",
					multi: true,
					options: [...spec.acceptanceDefaults]
				},
				{
					id: "excluded",
					prompt: "哪些事情明确不做？",
					multi: true,
					options: [...spec.defaultExcluded]
				}
			];
		}
		/** Minimum valid clarification when the answer route is unavailable. */
		function fallbackClarification(mode) {
			const spec = getModeSpec(mode);
			return {
				type: "software",
				scale: "small",
				mode,
				ui: { styles: [] },
				platforms: ["Windows"],
				hardwareList: [],
				constraints: [],
				excluded: [...spec.defaultExcluded],
				acceptance: [...spec.acceptanceDefaults],
				memoryHints: []
			};
		}
		function templateOf(id) {
			return TEMPLATES.find((entry) => entry.id === id) ?? TEMPLATES[0];
		}
		function QuickStartWizard({ sessionId, existingTeam, t, onDone, onFounded }) {
			const [draft] = (0, react.useState)(() => readQuickStartDraft(sessionId));
			const [step, setStep] = (0, react.useState)(() => draft?.step ?? 0);
			const [mode, setMode] = (0, react.useState)(() => draft?.mode ?? "precision");
			const [goal, setGoal] = (0, react.useState)(() => draft?.goal ?? "");
			const [template, setTemplate] = (0, react.useState)(() => draft?.template ?? TEMPLATES[0]?.id ?? "fix");
			const [roles, setRoles] = (0, react.useState)(() => draft?.roles ?? [...TEMPLATES[0]?.roles ?? []]);
			const [sectMode, setSectMode] = (0, react.useState)(() => draft?.sectMode ?? "random");
			const [rolledSect, setRolledSect] = (0, react.useState)(() => draft?.rolledSect ?? randomSect().id);
			const [customRole, setCustomRole] = (0, react.useState)("");
			const [rolesOpen, setRolesOpen] = (0, react.useState)(false);
			const [solo, setSolo] = (0, react.useState)(() => draft?.solo ?? false);
			const [superFast, setSuperFast] = (0, react.useState)(() => draft?.superFast ?? false);
			const [submitting, setSubmitting] = (0, react.useState)(() => draft?.submitting ?? false);
			const [submittedAt, setSubmittedAt] = (0, react.useState)(() => draft?.submittedAt ?? 0);
			const [replaceConfirmed, setReplaceConfirmed] = (0, react.useState)(false);
			const steps = solo ? SOLO_STEPS : STEPS;
			const submitActive = (0, react.useRef)(false);
			(0, react.useEffect)(() => {
				if (step > steps.length - 1) setStep(steps.length - 1);
			}, [step, steps.length]);
			const [developerMode] = (0, react.useState)(() => {
				try {
					return window.localStorage.getItem("dsh-pixel-team.dev") === "1";
				} catch {
					return false;
				}
			});
			const [busy, setBusy] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)("");
			const [blocked, setBlocked] = (0, react.useState)(false);
			const [created, setCreated] = (0, react.useState)();
			const [polishBusy, setPolishBusy] = (0, react.useState)(false);
			const [polishError, setPolishError] = (0, react.useState)("");
			const [interviewQuestions, setInterviewQuestions] = (0, react.useState)(() => draft?.questions ?? []);
			const [interviewAnswers, setInterviewAnswers] = (0, react.useState)(() => draft?.answers ?? {});
			const [interviewState, setInterviewState] = (0, react.useState)(() => draft?.questions?.length ? "ready" : "loading");
			const [interviewError, setInterviewError] = (0, react.useState)("");
			const [interviewNonce, setInterviewNonce] = (0, react.useState)(0);
			const multiRef = (0, react.useRef)(null);
			const goalRef = (0, react.useRef)(null);
			const sessionRef = (0, react.useRef)(sessionId);
			const hydratingDraft = (0, react.useRef)(false);
			const foundedTimer = (0, react.useRef)(void 0);
			(0, react.useEffect)(() => () => {
				if (foundedTimer.current !== void 0) window.clearTimeout(foundedTimer.current);
			}, []);
			(0, react.useEffect)(() => {
				if (sessionRef.current === sessionId) return;
				sessionRef.current = sessionId;
				hydratingDraft.current = true;
				const next = readQuickStartDraft(sessionId);
				setStep(next?.step ?? 0);
				setMode(next?.mode ?? "precision");
				setGoal(next?.goal ?? "");
				setTemplate(next?.template ?? TEMPLATES[0]?.id ?? "fix");
				setRoles(next?.roles ?? [...TEMPLATES[0]?.roles ?? []]);
				setSectMode(next?.sectMode ?? "random");
				setRolledSect(next?.rolledSect ?? randomSect().id);
				setSolo(next?.solo ?? false);
				setSuperFast(next?.superFast ?? false);
				setSubmitting(next?.submitting ?? false);
				setSubmittedAt(next?.submittedAt ?? 0);
				setInterviewQuestions(next?.questions ?? []);
				setInterviewAnswers(next?.answers ?? {});
				setInterviewState(next?.questions?.length ? "ready" : "loading");
			}, [sessionId]);
			(0, react.useEffect)(() => {
				if (sessionRef.current !== sessionId) return;
				if (hydratingDraft.current) {
					hydratingDraft.current = false;
					return;
				}
				saveQuickStartDraft(sessionId, {
					step,
					mode,
					goal,
					template,
					roles,
					sectMode,
					rolledSect,
					solo,
					superFast,
					questions: interviewQuestions,
					answers: interviewAnswers,
					submitting,
					submittedAt
				});
			}, [
				sessionId,
				step,
				mode,
				goal,
				template,
				roles,
				sectMode,
				rolledSect,
				solo,
				superFast,
				interviewQuestions,
				interviewAnswers,
				submitting,
				submittedAt
			]);
			(0, react.useEffect)(() => {
				if (!submitting || submittedAt === 0) return;
				if (submitActive.current) return;
				let alive = true;
				let timer;
				const started = Date.now();
				setBusy(true);
				const poll = async () => {
					if (!alive) return;
					try {
						const found = ((await (await fetch("/plugins/dsh-pixel-team/state", { cache: "no-store" })).json()).teams ?? []).find((team) => team.captainSessionId === sessionId && team.phase === "staged" && (team.createdAt ?? 0) >= submittedAt - 5e3);
						if (found?.teamId !== void 0) {
							alive = false;
							if (timer !== void 0) window.clearInterval(timer);
							setSubmitting(false);
							setSubmittedAt(0);
							clearQuickStartDraft(sessionId);
							setBusy(false);
							setCreated(t("quickstart.created", {
								team: found.teamName ?? found.name ?? found.teamId,
								sect: activeSect === void 0 ? t("quickstart.sectCustomPicked") : t(activeSect.nameKey)
							}));
							window.dispatchEvent(new CustomEvent(TEAM_CREATED_EVENT, { detail: {
								teamId: found.teamId,
								sessionId
							} }));
							onFounded?.();
							return;
						}
					} catch {}
					if (Date.now() - started > 18e4) {
						alive = false;
						if (timer !== void 0) window.clearInterval(timer);
						setSubmitting(false);
						setSubmittedAt(0);
						setBusy(false);
						setError(t("quickstart.generationLost"));
					}
				};
				poll();
				timer = window.setInterval(() => {
					poll();
				}, 1500);
				return () => {
					alive = false;
					if (timer !== void 0) window.clearInterval(timer);
				};
			}, [
				submitting,
				submittedAt,
				sessionId
			]);
			(0, react.useEffect)(() => {
				if (!rolesOpen) return;
				const onPointerDown = (event) => {
					if (multiRef.current === null) return;
					if (!multiRef.current.contains(event.target)) setRolesOpen(false);
				};
				document.addEventListener("pointerdown", onPointerDown);
				return () => {
					document.removeEventListener("pointerdown", onPointerDown);
				};
			}, [rolesOpen]);
			const close = () => {
				if (busy) return;
				onDone?.();
			};
			const activeSect = sectMode === "custom" ? void 0 : sectPreset(sectMode === "random" ? rolledSect : sectMode);
			const sectRoles = activeSect?.roles ?? roles;
			const chooseTemplate = (id) => {
				setTemplate(id);
				if (sectMode === "custom") setRoles([...templateOf(id).roles]);
			};
			const chooseSect = (id) => {
				setSectMode(id);
				const preset = sectPreset(id);
				if (preset !== void 0) setRoles([...preset.roles]);
			};
			const rollSect = () => {
				const next = randomSect(rolledSect);
				setRolledSect(next.id);
				setSectMode("random");
				setRoles([...next.roles]);
			};
			const chooseCustom = () => {
				setSectMode("custom");
				if (roles.length === 0) setRoles([...templateOf(template).roles]);
			};
			const toggleRole = (role) => {
				setRoles((current) => current.includes(role) ? current.filter((entry) => entry !== role) : [...current, role]);
			};
			const roleName = (id) => {
				const meta = ROLE_META.find((entry) => entry.id === id);
				return meta === void 0 ? id : t(meta.nameKey);
			};
			/** 一枚修士 chip：优先用像素人立绘，找不到对应道途时退回首字徽记。 */
			const personChip = (role) => {
				const label = roleName(role);
				const art = memberArtUrl(label, role);
				return (0, react_jsx_runtime.jsxs)("span", {
					className: QuickStartDialog_module_css_default.chip,
					title: role,
					children: [art === null ? (0, react_jsx_runtime.jsx)("span", {
						className: QuickStartDialog_module_css_default.chipLetter,
						"aria-hidden": true,
						children: label.slice(0, 1)
					}) : (0, react_jsx_runtime.jsx)("img", {
						className: QuickStartDialog_module_css_default.chipAvatar,
						src: art,
						alt: ""
					}), label]
				}, role);
			};
			const addCustomRole = () => {
				const trimmed = customRole.trim();
				if (trimmed === "") return;
				setRoles((current) => current.includes(trimmed) ? current : [...current, trimmed]);
				setCustomRole("");
			};
			const goalTrimmed = goal.trim();
			const runPolish = async () => {
				if (goalTrimmed === "") {
					setPolishError(t("quickstart.goalRequired"));
					return;
				}
				setPolishBusy(true);
				setPolishError("");
				try {
					const response = await fetch("/plugins/dsh-pixel-team/polish", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							sessionId,
							requirement: goalTrimmed,
							mode
						})
					});
					const body = await response.json().catch(() => null);
					if (!response.ok || body?.ok !== true) throw new Error(body?.error ?? "HTTP " + response.status);
					const expanded = (body.expanded ?? goalTrimmed).trim();
					setGoal(expanded);
					if (body.degraded === true) setPolishError(t("polish.degradedDetail", { error: body.error ?? t("polish.degraded") }));
					else if (expanded === goalTrimmed) setPolishError(t("polish.unchanged"));
				} catch (cause) {
					setPolishError(cause instanceof Error ? cause.message : String(cause));
				} finally {
					setPolishBusy(false);
				}
			};
			(0, react.useEffect)(() => {
				if (steps[step] !== "interview" || goalTrimmed === "" || interviewQuestions.length > 0) return;
				const controller = new AbortController();
				setInterviewState("loading");
				setInterviewError("");
				setInterviewQuestions([]);
				(async () => {
					try {
						const response = await fetch("/plugins/dsh-pixel-team/interview/questions", {
							method: "POST",
							headers: { "content-type": "application/json" },
							body: JSON.stringify({
								sessionId,
								mode,
								requirement: goalTrimmed
							}),
							signal: controller.signal
						});
						const body = await response.json().catch(() => null);
						if (!response.ok || body?.ok !== true || !Array.isArray(body.questions)) throw new Error(body?.error ?? "HTTP " + response.status);
						setInterviewQuestions(body.questions);
						setInterviewAnswers({});
						setInterviewState("ready");
					} catch (cause) {
						if (controller.signal.aborted) return;
						setInterviewError(cause instanceof Error ? cause.message : String(cause));
						setInterviewQuestions(fallbackInterviewQuestions(mode));
						setInterviewState("fallback");
					}
				})();
				return () => {
					controller.abort();
				};
			}, [
				step,
				goalTrimmed,
				sessionId,
				mode,
				interviewNonce
			]);
			const currentStep = steps[step] ?? steps[0];
			const canAdvance = (0, react.useMemo)(() => {
				if (busy || polishBusy) return false;
				switch (currentStep) {
					case "vow": return goalTrimmed.length >= 2;
					case "interview": return interviewState !== "loading" && interviewQuestions.length > 0;
					case "sect": return (solo || sectMode !== "custom" || sectRoles.length > 0) && (existingTeam !== true || replaceConfirmed);
					default: return true;
				}
			}, [
				busy,
				polishBusy,
				currentStep,
				goalTrimmed,
				interviewState,
				interviewQuestions.length,
				sectMode,
				sectRoles.length,
				solo,
				existingTeam,
				replaceConfirmed
			]);
			const submit = async (replace) => {
				if (goalTrimmed === "") {
					setError(t("quickstart.goalRequired"));
					setStep(1);
					return;
				}
				if (!replace && existingTeam === true) {
					setBlocked(true);
					return;
				}
				setBusy(true);
				setError("");
				submitActive.current = true;
				const startedAt = Date.now();
				setSubmitting(true);
				setSubmittedAt(startedAt);
				saveQuickStartDraft(sessionId, {
					step,
					mode,
					goal,
					template,
					roles,
					sectMode,
					rolledSect,
					solo,
					superFast,
					questions: interviewQuestions,
					answers: interviewAnswers,
					submitting: true,
					submittedAt: startedAt
				});
				try {
					const interviewNotes = interviewQuestions.map((question) => ({
						question: question.prompt,
						answer: interviewAnswers[question.id] ?? []
					})).filter((item) => item.answer.length > 0).map((item) => item.question + "：" + item.answer.join(" / "));
					const base = fallbackClarification(mode);
					const clarification = {
						...base,
						constraints: [...base.constraints, ...interviewNotes].slice(0, 20)
					};
					const response = await fetch("/plugins/dsh-pixel-team/quick-start", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							sessionId,
							mode,
							goal: goalTrimmed,
							template,
							roles: solo ? [] : sectMode === "custom" ? roles : [...activeSect?.roles ?? roles],
							solo,
							replace,
							clarification
						})
					});
					const body = await response.json().catch(() => null);
					if (!response.ok || body?.ok !== true) {
						const raw = body?.error ?? "HTTP " + response.status;
						if (/already lead team/i.test(raw)) {
							setSubmitting(false);
							setSubmittedAt(0);
							setBlocked(true);
							setError("");
							return;
						}
						throw new Error(raw);
					}
					setCreated(t("quickstart.created", {
						team: body.teamName ?? body.teamId ?? "",
						sect: activeSect === void 0 ? t("quickstart.sectCustomPicked") : t(activeSect.nameKey)
					}));
					if (body.teamId !== void 0) window.dispatchEvent(new CustomEvent(TEAM_CREATED_EVENT, { detail: {
						teamId: body.teamId,
						sessionId
					} }));
					setSubmitting(false);
					setSubmittedAt(0);
					clearQuickStartDraft(sessionId);
					setBlocked(false);
					setGoal("");
					foundedTimer.current = window.setTimeout(() => {
						onFounded?.();
					}, 300);
				} catch (cause) {
					setSubmitting(false);
					setSubmittedAt(0);
					setError(cause instanceof Error ? cause.message : String(cause));
				} finally {
					submitActive.current = false;
					setBusy(false);
				}
			};
			const goTo = (next) => {
				if (busy) return;
				setError("");
				setStep(Math.max(0, Math.min(steps.length - 1, next)));
			};
			const next = () => {
				if (step === steps.length - 1) {
					submit(false);
					return;
				}
				if (!canAdvance) return;
				if (currentStep === "vow" && superFast) {
					goTo(Math.min(steps.length - 1, step + 2));
					return;
				}
				goTo(step + 1);
			};
			const doctrineName = t(templateOf(template).labelKey);
			const sectName = activeSect === void 0 ? t("quickstart.sectCustom") : t(activeSect.nameKey);
			const roster = sectMode === "custom" ? roles : [...sectRoles];
			return (0, react_jsx_runtime.jsxs)("div", {
				className: QuickStartDialog_module_css_default.wizard,
				children: [(0, react_jsx_runtime.jsxs)("div", {
					className: QuickStartDialog_module_css_default.form,
					children: [
						(0, react_jsx_runtime.jsx)("ol", {
							className: QuickStartDialog_module_css_default.steps,
							"aria-label": t("quickstart.title"),
							children: steps.map((entry, index) => {
								const state = index === step ? "current" : index < step ? "done" : "todo";
								return (0, react_jsx_runtime.jsx)("li", {
									className: QuickStartDialog_module_css_default.stepItem,
									"data-state": state,
									children: (0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										className: QuickStartDialog_module_css_default.stepButton,
										"data-control": "quickstart-step-" + index,
										"aria-current": state === "current" ? "step" : void 0,
										disabled: busy || polishBusy || index > step,
										onClick: () => {
											goTo(index);
										},
										children: [(0, react_jsx_runtime.jsx)("span", {
											className: QuickStartDialog_module_css_default.stepDot,
											children: index < step ? "✓" : index + 1
										}), (0, react_jsx_runtime.jsx)("span", {
											className: QuickStartDialog_module_css_default.stepLabel,
											children: t(STEP_LABEL[entry])
										})]
									})
								}, entry);
							})
						}),
						currentStep === "doctrine" && (0, react_jsx_runtime.jsxs)("section", {
							className: QuickStartDialog_module_css_default.stepPane,
							"data-step": "doctrine",
							children: [(0, react_jsx_runtime.jsxs)("p", {
								className: QuickStartDialog_module_css_default.soloRow,
								children: [(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: QuickStartDialog_module_css_default.soloButton,
									"data-active": solo || void 0,
									disabled: busy,
									onClick: () => {
										const next = !solo;
										setSolo(next);
										if (next) setRoles([]);
									},
									children: solo ? t("quickstart.soloActive") : t("quickstart.solo")
								}), (0, react_jsx_runtime.jsx)("small", { children: solo ? t("quickstart.soloCleared") : t("quickstart.soloHint") })]
							}), (0, react_jsx_runtime.jsx)("div", {
								className: QuickStartDialog_module_css_default.templates,
								role: "radiogroup",
								"aria-label": t("quickstart.template"),
								children: TEMPLATES.map((entry) => (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									role: "radio",
									"aria-checked": template === entry.id,
									className: QuickStartDialog_module_css_default.templateCard,
									"data-control": "quickstart-template-" + entry.id,
									disabled: busy,
									onClick: () => {
										chooseTemplate(entry.id);
									},
									children: [(0, react_jsx_runtime.jsx)("span", {
										className: QuickStartDialog_module_css_default.templateName,
										children: t(entry.labelKey)
									}), (0, react_jsx_runtime.jsxs)("span", {
										className: QuickStartDialog_module_css_default.templateMeta,
										children: [
											entry.roles.length,
											" ",
											t("quickstart.roleCount")
										]
									})]
								}, entry.id))
							})]
						}),
						currentStep === "vow" && (0, react_jsx_runtime.jsxs)("section", {
							className: QuickStartDialog_module_css_default.stepPane,
							"data-step": "vow",
							children: [
								(0, react_jsx_runtime.jsxs)("label", {
									className: QuickStartDialog_module_css_default.field,
									children: [(0, react_jsx_runtime.jsx)("span", { children: t("quickstart.goal") }), (0, react_jsx_runtime.jsx)("textarea", {
										ref: goalRef,
										value: goal,
										rows: 5,
										autoFocus: true,
										disabled: busy || polishBusy,
										placeholder: t("quickstart.goalPlaceholder"),
										onChange: (event) => {
											setGoal(event.target.value);
											setPolishError("");
											setInterviewQuestions([]);
											setInterviewAnswers({});
											setInterviewState("loading");
										},
										onKeyDown: (event) => {
											if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
												event.preventDefault();
												next();
											}
										}
									})]
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									className: QuickStartDialog_module_css_default.polishRow,
									children: [(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: QuickStartDialog_module_css_default.polishButton,
										disabled: busy || polishBusy || goalTrimmed === "",
										onClick: () => {
											runPolish();
										},
										children: polishBusy ? t("polish.busy") : t("polish.button")
									}), polishError !== "" && (0, react_jsx_runtime.jsx)("span", {
										className: QuickStartDialog_module_css_default.polishError,
										role: "alert",
										children: polishError
									})]
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									className: QuickStartDialog_module_css_default.modeRow,
									children: [
										(0, react_jsx_runtime.jsx)("span", {
											className: QuickStartDialog_module_css_default.modeLabel,
											children: t("mode.select")
										}),
										(0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: QuickStartDialog_module_css_default.modeChip,
											"data-active": superFast || void 0,
											disabled: busy,
											title: t("quickstart.superFastHint"),
											onClick: () => {
												setSuperFast((current) => !current);
												setInterviewQuestions([]);
												setInterviewAnswers({});
												setInterviewState("loading");
											},
											children: ["⚡ ", t("quickstart.superFast")]
										}),
										TEAM_MODES.filter((item) => item !== "draft").map((item) => {
											const spec = getModeSpec(item);
											return (0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												className: QuickStartDialog_module_css_default.modeChip,
												"data-active": mode === item && !superFast || void 0,
												disabled: busy,
												title: t("mode.desc." + item),
												onClick: () => {
													setMode(item);
													setSuperFast(false);
													setInterviewQuestions([]);
													setInterviewAnswers({});
													setInterviewState("loading");
												},
												children: [
													spec.emoji,
													" ",
													t(spec.labelKey)
												]
											}, item);
										}),
										(0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: QuickStartDialog_module_css_default.modeChip,
											"data-active": mode === "draft" && !superFast || void 0,
											disabled: busy,
											title: t("mode.desc.draft"),
											onClick: () => {
												setMode("draft");
												setSuperFast(false);
												setInterviewQuestions([]);
												setInterviewAnswers({});
												setInterviewState("loading");
											},
											children: [
												getModeSpec("draft").emoji,
												" ",
												t(getModeSpec("draft").labelKey)
											]
										})
									]
								})
							]
						}),
						currentStep === "interview" && (0, react_jsx_runtime.jsx)("section", {
							className: QuickStartDialog_module_css_default.stepPane,
							"data-step": "interview",
							children: (0, react_jsx_runtime.jsx)(InterviewSheet, {
								questions: interviewQuestions,
								answers: interviewAnswers,
								onChange: setInterviewAnswers,
								state: interviewState,
								error: interviewError,
								mode,
								disabled: busy,
								onRetry: () => {
									setInterviewQuestions([]);
									setInterviewState("loading");
									setInterviewNonce((value) => value + 1);
								},
								t
							})
						}),
						currentStep === "sect" && (0, react_jsx_runtime.jsxs)("section", {
							className: QuickStartDialog_module_css_default.stepPane,
							"data-step": "sect",
							children: [
								(0, react_jsx_runtime.jsx)("p", {
									className: QuickStartDialog_module_css_default.hint,
									children: t("quickstart.sectHint")
								}),
								existingTeam === true && (0, react_jsx_runtime.jsxs)("div", {
									className: QuickStartDialog_module_css_default.replaceNotice,
									role: "alertdialog",
									children: [(0, react_jsx_runtime.jsx)("span", { children: t("quickstart.replaceAtSect") }), (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										"data-active": replaceConfirmed || void 0,
										onClick: () => {
											setReplaceConfirmed((current) => !current);
										},
										children: replaceConfirmed ? t("quickstart.replaceArmed") : t("quickstart.replaceShort")
									})]
								}),
								solo ? (0, react_jsx_runtime.jsx)("p", {
									className: QuickStartDialog_module_css_default.hint,
									children: t("quickstart.soloSectHidden")
								}) : (0, react_jsx_runtime.jsxs)("div", {
									className: QuickStartDialog_module_css_default.field,
									children: [
										(0, react_jsx_runtime.jsx)("span", { children: t("quickstart.sect") }),
										(0, react_jsx_runtime.jsxs)("div", {
											className: QuickStartDialog_module_css_default.sectRow,
											children: [
												(0, react_jsx_runtime.jsxs)("button", {
													type: "button",
													className: QuickStartDialog_module_css_default.sectChip,
													"data-active": sectMode === "random" || void 0,
													disabled: busy,
													onClick: rollSect,
													children: [(0, react_jsx_runtime.jsx)("span", {
														"aria-hidden": true,
														children: "🎲"
													}), t("quickstart.sectRandom")]
												}),
												SECT_PRESETS.map((preset) => (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: QuickStartDialog_module_css_default.sectChip,
													"data-active": sectMode === preset.id || void 0,
													disabled: busy,
													onClick: () => {
														chooseSect(preset.id);
													},
													children: t(preset.nameKey)
												}, preset.id)),
												(0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: QuickStartDialog_module_css_default.sectChip,
													"data-active": sectMode === "custom" || void 0,
													disabled: busy,
													onClick: chooseCustom,
													children: t("quickstart.sectCustom")
												})
											]
										}),
										(0, react_jsx_runtime.jsx)("small", {
											className: QuickStartDialog_module_css_default.templateDesc,
											children: sectMode === "custom" ? t("quickstart.sectCustomHint") : sectMode === "random" ? t("quickstart.sectRolled", { sect: activeSect === void 0 ? "" : t(activeSect.nameKey) }) : activeSect === void 0 ? "" : t(activeSect.descKey)
										}),
										sectMode !== "custom" && (0, react_jsx_runtime.jsx)("span", {
											className: QuickStartDialog_module_css_default.sectRoster,
											children: sectRoles.map(personChip)
										})
									]
								}),
								!solo && sectMode === "custom" && (0, react_jsx_runtime.jsxs)("div", {
									className: QuickStartDialog_module_css_default.field,
									children: [(0, react_jsx_runtime.jsx)("span", { children: t("quickstart.roles") }), (0, react_jsx_runtime.jsxs)("div", {
										className: QuickStartDialog_module_css_default.multi,
										ref: multiRef,
										children: [(0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: QuickStartDialog_module_css_default.multiTrigger,
											"data-control": "quickstart-roles",
											"aria-expanded": rolesOpen,
											"aria-haspopup": "listbox",
											disabled: busy,
											onClick: () => {
												setRolesOpen((current) => !current);
											},
											children: [(0, react_jsx_runtime.jsx)("span", {
												className: QuickStartDialog_module_css_default.chips,
												children: roles.length === 0 ? (0, react_jsx_runtime.jsx)("span", {
													className: QuickStartDialog_module_css_default.placeholder,
													children: t("quickstart.rolesEmpty")
												}) : roles.map(personChip)
											}), (0, react_jsx_runtime.jsx)("span", {
												className: QuickStartDialog_module_css_default.caret,
												"aria-hidden": true,
												children: "▾"
											})]
										}), rolesOpen && (0, react_jsx_runtime.jsxs)("div", {
											className: QuickStartDialog_module_css_default.multiPanel,
											role: "listbox",
											"aria-multiselectable": "true",
											"aria-label": t("quickstart.roles"),
											children: [ROLE_META.map((meta) => (0, react_jsx_runtime.jsxs)("label", {
												className: QuickStartDialog_module_css_default.option,
												children: [
													(0, react_jsx_runtime.jsx)("input", {
														type: "checkbox",
														checked: roles.includes(meta.id),
														onChange: () => {
															toggleRole(meta.id);
														}
													}),
													(() => {
														const art = memberArtUrl(t(meta.nameKey), meta.id);
														return art === null ? null : (0, react_jsx_runtime.jsx)("img", {
															className: QuickStartDialog_module_css_default.optionAvatar,
															src: art,
															alt: ""
														});
													})(),
													(0, react_jsx_runtime.jsx)("span", {
														className: QuickStartDialog_module_css_default.optionName,
														children: t(meta.nameKey)
													}),
													(0, react_jsx_runtime.jsx)("span", {
														className: QuickStartDialog_module_css_default.optionId,
														children: meta.id
													}),
													(0, react_jsx_runtime.jsx)("span", {
														className: QuickStartDialog_module_css_default.optionAbility,
														children: t(meta.abilityKey)
													})
												]
											}, meta.id)), (0, react_jsx_runtime.jsxs)("div", {
												className: QuickStartDialog_module_css_default.customRow,
												children: [(0, react_jsx_runtime.jsx)("input", {
													value: customRole,
													placeholder: t("quickstart.customRole"),
													onChange: (event) => {
														setCustomRole(event.target.value);
													},
													onKeyDown: (event) => {
														if (event.key === "Enter") {
															event.preventDefault();
															addCustomRole();
														}
													}
												}), (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													disabled: customRole.trim() === "",
													onClick: addCustomRole,
													children: t("quickstart.addRole")
												})]
											})]
										})]
									})]
								})
							]
						}),
						currentStep === "oath" && (0, react_jsx_runtime.jsxs)("section", {
							className: QuickStartDialog_module_css_default.stepPane,
							"data-step": "oath",
							children: [submitting && (0, react_jsx_runtime.jsx)("p", {
								className: QuickStartDialog_module_css_default.busyNote,
								role: "status",
								children: t("quickstart.generating")
							}), (0, react_jsx_runtime.jsxs)("dl", {
								className: QuickStartDialog_module_css_default.summary,
								children: [
									(0, react_jsx_runtime.jsxs)("div", {
										className: QuickStartDialog_module_css_default.summaryRow,
										children: [(0, react_jsx_runtime.jsx)("dt", { children: t("mode.select") }), (0, react_jsx_runtime.jsxs)("dd", { children: [
											getModeSpec(mode).emoji,
											" ",
											t(getModeSpec(mode).labelKey)
										] })]
									}),
									(0, react_jsx_runtime.jsxs)("div", {
										className: QuickStartDialog_module_css_default.summaryRow,
										children: [(0, react_jsx_runtime.jsx)("dt", { children: t("quickstart.summaryDoctrine") }), (0, react_jsx_runtime.jsx)("dd", { children: doctrineName })]
									}),
									(0, react_jsx_runtime.jsxs)("div", {
										className: QuickStartDialog_module_css_default.summaryRow,
										children: [(0, react_jsx_runtime.jsx)("dt", { children: t("quickstart.summarySect") }), (0, react_jsx_runtime.jsx)("dd", { children: sectName })]
									}),
									(0, react_jsx_runtime.jsxs)("div", {
										className: QuickStartDialog_module_css_default.summaryRow,
										children: [(0, react_jsx_runtime.jsx)("dt", { children: t("quickstart.summaryRoster") }), (0, react_jsx_runtime.jsx)("dd", { children: (0, react_jsx_runtime.jsx)("span", {
											className: QuickStartDialog_module_css_default.chips,
											children: roster.map(personChip)
										}) })]
									}),
									(0, react_jsx_runtime.jsxs)("div", {
										className: QuickStartDialog_module_css_default.summaryRow,
										children: [(0, react_jsx_runtime.jsx)("dt", { children: t("quickstart.summaryVow") }), (0, react_jsx_runtime.jsx)("dd", { children: goalTrimmed })]
									})
								]
							})]
						}),
						error !== "" && (0, react_jsx_runtime.jsx)("p", {
							className: QuickStartDialog_module_css_default.error,
							role: "alert",
							children: error
						}),
						created !== void 0 && (0, react_jsx_runtime.jsx)("p", {
							className: QuickStartDialog_module_css_default.success,
							role: "status",
							children: created
						})
					]
				}), (0, react_jsx_runtime.jsxs)("div", {
					className: QuickStartDialog_module_css_default.wizardActions,
					children: [
						blocked && (0, react_jsx_runtime.jsxs)("div", {
							className: QuickStartDialog_module_css_default.confirmPop,
							role: "alertdialog",
							"aria-label": t("quickstart.replacePrompt"),
							children: [(0, react_jsx_runtime.jsx)("p", { children: t("quickstart.replacePrompt") }), (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: busy,
								onClick: () => {
									setBlocked(false);
								},
								children: t("quickstart.cancel")
							}), (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								"data-primary": true,
								"data-danger": true,
								disabled: busy,
								onClick: () => {
									setBlocked(false);
									submit(true);
								},
								children: t("quickstart.replaceShort")
							})] })]
						}),
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy,
							onClick: close,
							children: t("quickstart.cancel")
						}),
						step > 0 && (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							"data-control": "quickstart-back",
							disabled: busy,
							onClick: () => {
								goTo(step - 1);
							},
							children: t("quickstart.back")
						}),
						step < steps.length - 1 ? (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							"data-primary": true,
							"data-control": "quickstart-next",
							disabled: !canAdvance,
							onClick: next,
							children: t("quickstart.next")
						}) : (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							"data-primary": true,
							"data-control": "quickstart-submit",
							disabled: busy || !canAdvance,
							onClick: () => {
								submit(existingTeam === true && replaceConfirmed);
							},
							children: busy ? t("quickstart.busy") : existingTeam === true && replaceConfirmed ? t("quickstart.replaceShort") : t("quickstart.found")
						})
					]
				})]
			});
		}
		/** 对话头部的开宗入口：统一打开洞府里的内容气泡，不再弹独立窗口。 */
		function TeamQuickStart({ t }) {
			return (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: QuickStartDialog_module_css_default.entry,
				"data-quick-start-entry": true,
				title: t("quickstart.entryTitle"),
				onClick: () => {
					window.dispatchEvent(new CustomEvent(OPEN_HALL_SHEET_EVENT, { detail: { action: "start" } }));
				},
				children: [(0, react_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					children: "⛩"
				}), t("quickstart.entry")]
			});
		}
		//#endregion
		//#region lib/client/immortals.js
		/**
		* 封神榜：十五重境界的档案、升级指南与宗门故事。
		*
		* 数据与文案分离：这里只放结构（境界、等级区间、文案 key），中文/英文由
		* locales.ts 提供，保证双语字典键始终对齐。
		*/
		/** 每个境界的描述文案 key（显式列出，避免字符串拼接漏键）。 */
		const RANK_DESC = {
			"realm.mortal": "rank.desc.mortal",
			"realm.qi": "rank.desc.qi",
			"realm.foundation": "rank.desc.foundation",
			"realm.golden": "rank.desc.golden",
			"realm.nascent": "rank.desc.nascent",
			"realm.spirit": "rank.desc.spirit",
			"realm.void": "rank.desc.void",
			"realm.integration": "rank.desc.integration",
			"realm.mahayana": "rank.desc.mahayana",
			"realm.tribulation": "rank.desc.tribulation",
			"realm.trueImmortal": "rank.desc.trueImmortal",
			"realm.goldenImmortal": "rank.desc.goldenImmortal",
			"realm.taiyi": "rank.desc.taiyi",
			"realm.daluo": "rank.desc.daluo",
			"realm.dao": "rank.desc.dao"
		};
		/** 由境界带推导出的完整榜文：等级区间首尾相接、覆盖 1..9999。 */
		const ASCENSION_RANKS = CULTIVATION_REALMS.map((realm, index) => ({
			realm,
			levelMin: index === 0 ? 1 : REALM_BANDS[index - 1] + 1,
			levelMax: REALM_BANDS[index],
			descKey: RANK_DESC[realm]
		}));
		/** 快速升级的五条正路（本地化 key，按收益从高到低排）。 */
		const ASCENSION_TIPS = [
			"ascension.tip.tasks",
			"ascension.tip.captain",
			"ascension.tip.idle",
			"ascension.tip.first",
			"ascension.tip.gear"
		];
		/** 宗门故事：三段，从开山讲到当下。 */
		const ASCENSION_STORY = [
			"ascension.story.1",
			"ascension.story.2",
			"ascension.story.3"
		];
		/** 某等级落在哪一重境界（1..9999，越界夹紧）。 */
		function rankAtLevel(level) {
			const safe = Number.isFinite(level) ? Math.min(9999, Math.max(1, Math.floor(level))) : 1;
			const index = REALM_BANDS.findIndex((band) => safe <= band);
			return ASCENSION_RANKS[index < 0 ? ASCENSION_RANKS.length - 1 : index];
		}
		//#endregion
		//#region lib/client/feedback.js
		/**
		* 「反馈异常」的纯函数层：拼 GitHub issue 链接、诊断信息与给 AI 的提示词。
		*
		* 为什么不是点一下自动提交：GitHub 不允许匿名建 issue，插件里也不能内置 token
		* （asar/JS 反编译即可提取）。所以这里只把标题 / 正文 / 诊断预填进新建 issue 的
		* 链接，用户点一次 Submit 才算真正提交。
		*/
		/** 本项目仓库地址（反馈与 Star 都指这里）。 */
		const PLUGIN_REPO = "https://github.com/EternalNight996/dsh-pixel-team";
		/** issue 标题：取用户描述的第一行，限制长度；没写就给个兜底标题。 */
		function buildIssueTitle(description, fallback = "dsh-pixel-team 异常反馈") {
			const first = description.trim().split("\n")[0]?.trim() ?? "";
			const title = first === "" ? fallback : first;
			return title.length <= 60 ? title : `${title.slice(0, 59)}…`;
		}
		/** issue 正文：发生了什么 + 诊断代码块。 */
		function buildIssueBody(input) {
			return [
				"## 发生了什么",
				"",
				input.description.trim() === "" ? "（未填写）" : input.description.trim(),
				"",
				"## 诊断信息",
				"",
				"~~~",
				input.diagnostics.trim() === "" ? "（未采集到）" : input.diagnostics.trim(),
				"~~~"
			].join("\n");
		}
		/** 新建 issue 的预填链接。 */
		function buildIssueUrl(input) {
			const repo = input.repo ?? "https://github.com/EternalNight996/dsh-pixel-team";
			const title = `[Bug] ${buildIssueTitle(input.description)}`;
			const body = buildIssueBody(input);
			return `${repo}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
		}
		/** 给 AI 排障用的提示词：用户可以直接粘给任意模型。 */
		function buildAgentPrompt(input) {
			const description = input.description.trim() === "" ? "（未填写）" : input.description.trim();
			const diagnostics = input.diagnostics.trim() === "" ? "（未采集到）" : input.diagnostics.trim();
			if (input.locale === "en") return [
				"You are debugging the DeepSeek Harness plugin \"dsh-pixel-team\" (pixel sect office for AgentTeams).",
				"Reproduce and locate the problem from the report and diagnostics below, then propose a minimal fix.",
				"",
				"## Report",
				description,
				"",
				"## Diagnostics",
				diagnostics
			].join("\n");
			return [
				"你是 DeepSeek Harness 插件 dsh-pixel-team（AgentTeams 的像素宗门洞府）的排障助手。",
				"请根据下面的用户反馈与诊断信息复现问题、定位根因，并给出最小修复。",
				"",
				"## 用户反馈",
				description,
				"",
				"## 诊断信息",
				diagnostics
			].join("\n");
		}
		/** 采集诊断：版本 / 运行环境 / 当前宗门概况。不包含会话内容与路径。 */
		function collectDiagnostics(input) {
			const nav = typeof navigator === "undefined" ? void 0 : navigator;
			const win = typeof window === "undefined" ? void 0 : window;
			const lines = [
				`plugin: dsh-pixel-team@${input.version}`,
				`host: DeepSeek Harness`,
				`user agent: ${nav?.userAgent ?? "unknown"}`,
				`locale: ${nav?.language ?? "unknown"}`,
				`origin: ${typeof location === "undefined" ? "unknown" : location.origin}`,
				`viewport: ${win?.innerWidth ?? 0}x${win?.innerHeight ?? 0} @${win?.devicePixelRatio ?? 1}x`,
				`time: ${(/* @__PURE__ */ new Date()).toISOString()}`
			];
			if (input.team !== void 0) {
				const { name, phase, members, tasks } = input.team;
				lines.push(`team: ${name} [${phase}] members=${members} tasks=${tasks.done}/${tasks.total} running=${tasks.running} failed=${tasks.failed}`);
			} else lines.push("team: none");
			return lines.join("\n");
		}
		/** 气泡在当前窗口下的实际宽度：不超过 480，也不超出窗口（两侧各留 16）。 */
		function hallSheetWidth(viewportWidth) {
			return Math.max(0, Math.min(480, viewportWidth - 32));
		}
		/** 面板给对话让出的宽度：面板宽度的三分之二，且至少给对话留 360px。 */
		function hallYieldWidth(panelWidth, viewportWidth) {
			const width = Math.min(panelWidth, Math.max(0, viewportWidth - 32));
			return Math.max(0, Math.min(Math.round(width * 2 / 3), viewportWidth - 360));
		}
		/** 气泡的落点：左缘 + 宽度。右缘严格等于面板左缘 − 8px，除非被窗口夹取。 */
		function hallSheetPlacement(panelLeft, viewportWidth) {
			const width = hallSheetWidth(viewportWidth);
			const desired = panelLeft - width - 8;
			const rightmostLeft = viewportWidth - width - 16;
			return {
				width,
				left: Math.max(16, Math.min(desired, rightmostLeft))
			};
		}
		//#endregion
		//#region lib/client/SectHallOverlay.js
		/**
		* 宗门洞府浮层：整块洞府场景浮在 DSH 窗口上，可拖动、可收起。
		*
		* 由 shell.overlay 的常驻监视器渲染；墙面设施、剑盒、名册等在浮层内部展开
		* （内容气泡贴在面板左侧）。展开时给对话让位，收起成一枚可拖动的令牌。
		*/
		/** 交流群 / 赞助码由宿主插件路由提供（assets/support）。 */
		const SUPPORT_BASE = "/plugins/dsh-pixel-team/support";
		const supportAsset = (file) => `${SUPPORT_BASE}/${file}`;
		/** 复制到剪贴板：Clipboard API 失败时退回 execCommand，保持一次点击能复制。 */
		async function copyText(text) {
			if (text === "") return false;
			try {
				if (typeof navigator !== "undefined" && navigator.clipboard !== void 0) {
					await navigator.clipboard.writeText(text);
					return true;
				}
			} catch {}
			try {
				const area = document.createElement("textarea");
				area.value = text;
				area.setAttribute("readonly", "");
				area.style.position = "fixed";
				area.style.left = "-9999px";
				document.body.appendChild(area);
				area.select();
				const ok = document.execCommand("copy");
				document.body.removeChild(area);
				return ok;
			} catch {
				return false;
			}
		}
		const COLLAPSED_KEY = "dsh-pixel-team.hallCollapsed";
		const PANEL_RECT_KEY = "dsh-pixel-team.hallRect";
		const TOKEN_KEY = "dsh-pixel-team.hallToken";
		/** 名册历史列表里的“当前宗门”哨兵。 */
		const CURRENT_TEAM_SENTINEL = "__current__";
		/** 展开的面板给对话让位：写在 html 上的属性与位移变量（与右侧栏同一手法）。 */
		const HALL_OPEN_ATTRIBUTE = "data-agent-teams-hall-open";
		const HALL_SHIFT_PROPERTY = "--agent-teams-hall-shift";
		/** 收起后的令牌基准尺寸（标准面板），实际按面板大小缩放。 */
		const TOKEN_SIZE = {
			w: 38,
			h: 68
		};
		/** 把令牌夹在窗口内；留 8px 边缘，拖不出屏。 */
		function clampToken(x, y, w, h) {
			const vw = typeof window === "undefined" ? 1280 : window.innerWidth;
			const vh = typeof window === "undefined" ? 800 : window.innerHeight;
			return {
				x: Math.max(8, Math.min(x, vw - w - 8)),
				y: Math.max(8, Math.min(y, vh - h - 8))
			};
		}
		function readTokenPoint() {
			if (typeof window === "undefined") return {
				x: 16,
				y: 16
			};
			try {
				const raw = window.localStorage.getItem(TOKEN_KEY);
				if (raw !== null) {
					const parsed = JSON.parse(raw);
					if (typeof parsed.x === "number" && Number.isFinite(parsed.x) && typeof parsed.y === "number" && Number.isFinite(parsed.y)) return clampToken(parsed.x, parsed.y, TOKEN_SIZE.w, TOKEN_SIZE.h);
				}
			} catch {}
			return clampToken(window.innerWidth - TOKEN_SIZE.w - 16, window.innerHeight - TOKEN_SIZE.h - 16, TOKEN_SIZE.w, TOKEN_SIZE.h);
		}
		function writeTokenPoint(point) {
			try {
				window.localStorage.setItem(TOKEN_KEY, JSON.stringify(point));
			} catch {}
		}
		function readBool(key) {
			if (typeof window === "undefined") return false;
			try {
				return window.localStorage.getItem(key) === "1";
			} catch {
				return false;
			}
		}
		function writeBool(key, value) {
			try {
				window.localStorage.setItem(key, value ? "1" : "0");
			} catch {}
		}
		function readPanelRect() {
			if (typeof window === "undefined") return {
				x: 0,
				y: 0
			};
			try {
				const raw = window.localStorage.getItem(PANEL_RECT_KEY);
				if (raw === null) return {
					x: 0,
					y: 0
				};
				const parsed = JSON.parse(raw);
				return {
					x: typeof parsed.x === "number" && Number.isFinite(parsed.x) ? parsed.x : 0,
					y: typeof parsed.y === "number" && Number.isFinite(parsed.y) ? parsed.y : 0,
					w: typeof parsed.w === "number" && parsed.w > 240 ? parsed.w : void 0,
					h: typeof parsed.h === "number" && parsed.h > 160 ? parsed.h : void 0
				};
			} catch {
				return {
					x: 0,
					y: 0
				};
			}
		}
		function writePanelRect(rect) {
			try {
				window.localStorage.setItem(PANEL_RECT_KEY, JSON.stringify(rect));
			} catch {}
		}
		/** Visual state for the roster dropdown color marking. */
		function teamVisualState(team) {
			if (team.tasks.length > 0 && team.tasks.every((task) => task.status === "completed")) return "done";
			if (team.tasks.some((task) => task.status === "failed")) return "failed";
			if (team.tasks.some((task) => task.status === "claimed" || task.status === "in_progress")) return "running";
			return "waiting";
		}
		function stateDot(state) {
			return state === "done" ? "🟢" : state === "failed" ? "🔴" : state === "running" ? "🟡" : "🔵";
		}
		/** 物品品阶：按解锁等级着色，越晚解锁越贵气（纯展示，不参与数值）。 */
		function itemTier(level) {
			if (level >= 2800) return "legendary";
			if (level >= 350) return "epic";
			if (level >= 20) return "rare";
			return "mortal";
		}
		/** 面板预设尺寸：初始给大一些。 */
		const PANEL_SIZES = {
			compact: {
				w: 460,
				h: 380
			},
			normal: {
				w: 620,
				h: 500
			},
			large: {
				w: 820,
				h: 640
			},
			huge: {
				w: 1040,
				h: 760
			}
		};
		function SectHallOverlay({ team, history = [], t, sessionId, modelDirectories, openMember, openCaptain }) {
			const [collapsed, setCollapsed] = (0, react.useState)(() => readBool(COLLAPSED_KEY));
			const [sheet, setSheet] = (0, react.useState)();
			const [pendingReview, setPendingReview] = (0, react.useState)(false);
			const [reviewing, setReviewing] = (0, react.useState)(false);
			const [historyTeamId, setHistoryTeamId] = (0, react.useState)();
			const [cleanupBusy, setCleanupBusy] = (0, react.useState)(false);
			const [archiveArmed, setArchiveArmed] = (0, react.useState)();
			const [cleanupNotice, setCleanupNotice] = (0, react.useState)("");
			const [archivedTeamIds, setArchivedTeamIds] = (0, react.useState)([]);
			const [characterId, setCharacterId] = (0, react.useState)();
			const previousSessionRef = (0, react.useRef)(sessionId);
			const [equippedByCharacter, setEquippedByCharacter] = (0, react.useState)({});
			const equipped = characterId === void 0 ? {} : equippedByCharacter[characterId] ?? {};
			useCultivationVersion();
			const costSessionId = sessionId ?? team?.captainSessionId;
			const { report: costReport } = useCostReport(costSessionId);
			(0, react.useEffect)(() => {
				const teams = team === void 0 ? [...history] : [team, ...history];
				if (teams.length > 0) ingestCultivation(teams, sessionId);
			}, [
				team,
				history,
				sessionId
			]);
			const [aboutTab, setAboutTab] = (0, react.useState)("sponsor");
			const [feedbackText, setFeedbackText] = (0, react.useState)("");
			const [aboutNotice, setAboutNotice] = (0, react.useState)("");
			const [sheetAnchor, setSheetAnchor] = (0, react.useState)();
			const [rect, setRect] = (0, react.useState)(() => readPanelRect());
			const [token, setToken] = (0, react.useState)(() => readTokenPoint());
			const tokenDrag = (0, react.useRef)(null);
			const [size, setSize] = (0, react.useState)(() => {
				const stored = readPanelRect();
				return {
					w: stored.w ?? PANEL_SIZES.normal.w,
					h: stored.h ?? PANEL_SIZES.normal.h
				};
			});
			const panelRef = (0, react.useRef)(null);
			const dragRef = (0, react.useRef)(null);
			const latestRect = (0, react.useRef)(rect);
			latestRect.current = rect;
			const hasTeam = team !== void 0;
			const ownerSessionId = team?.captainSessionId ?? sessionId;
			(0, react.useEffect)(() => {
				if (!pendingReview || !hasTeam) return;
				setPendingReview(false);
				setReviewing(true);
				setSheet("config");
			}, [pendingReview, hasTeam]);
			const hall = team ?? {
				workspace: "",
				teamId: "",
				name: t("office.hallEmptyName"),
				captainSessionId: "",
				phase: "running",
				members: [],
				tasks: [],
				messageCount: 0,
				captainInbox: []
			};
			const done = hall.tasks.filter((task) => task.status === "completed").length;
			const total = hall.tasks.length;
			(0, react.useEffect)(() => {
				if (sheet !== "character") {
					previousSessionRef.current = sessionId;
					return;
				}
				if (previousSessionRef.current === sessionId) return;
				previousSessionRef.current = sessionId;
				if (sessionId === void 0) return;
				if (sessionId === hall.captainSessionId) {
					setCharacterId(hall.captainSessionId);
					return;
				}
				const member = hall.members.find((item) => item.id === sessionId);
				if (member !== void 0) setCharacterId(member.id || member.name);
			}, [
				sheet,
				sessionId,
				hall.captainSessionId,
				hall.members
			]);
			const goHome = () => {
				if (openCaptain !== void 0 && hall.captainSessionId !== "") openCaptain(hall.captainSessionId);
			};
			const viewingCaptain = sessionId !== void 0 && sessionId === hall.captainSessionId;
			const viewingMember = sessionId === void 0 ? void 0 : hall.members.find((member) => member.id === sessionId);
			const startNewTask = () => {
				setSheet(void 0);
				goHome();
				window.setTimeout(() => {
					document.querySelector("[data-composer-card] [contenteditable=\"true\"][role=\"textbox\"], [data-composer-card] textarea")?.focus();
				}, 160);
			};
			const openGear = () => {
				const memberRef = viewingMember === void 0 ? void 0 : viewingMember.id || viewingMember.name;
				const target = viewingCaptain ? hall.captainSessionId : memberRef ?? hall.captainSessionId;
				if (target !== "") {
					setCharacterId(target);
					setSheet("character");
				}
			};
			const staged = hall.phase === "staged";
			const tokenScale = Math.min(1.8, Math.max(.8, size.h / PANEL_SIZES.normal.h));
			const tokenSize = {
				w: Math.round(TOKEN_SIZE.w * tokenScale),
				h: Math.round(TOKEN_SIZE.h * tokenScale)
			};
			const tokenAt = clampToken(token.x, token.y, tokenSize.w, tokenSize.h);
			(0, react.useEffect)(() => {
				const open = (event) => {
					const action = event.detail?.action;
					if (action !== void 0) setSheet(action);
				};
				window.addEventListener(OPEN_HALL_SHEET_EVENT, open);
				return () => {
					window.removeEventListener(OPEN_HALL_SHEET_EVENT, open);
				};
			}, []);
			(0, react.useEffect)(() => {
				if (sheet === void 0) return;
				const measure = () => {
					const panel = panelRef.current;
					if (panel === null) return;
					const bounds = panel.getBoundingClientRect();
					const top = Math.max(8, bounds.top);
					const maxHeight = Math.max(160, window.innerHeight - top - 8);
					setSheetAnchor({
						...hallSheetPlacement(bounds.left, window.innerWidth),
						top,
						maxHeight
					});
				};
				measure();
				window.addEventListener("resize", measure);
				return () => {
					window.removeEventListener("resize", measure);
				};
			}, [
				sheet,
				collapsed,
				rect,
				size
			]);
			const beginDrag = (event) => {
				if (event.target.closest("button") !== null) return;
				if (panelRef.current === null) return;
				event.preventDefault();
				dragRef.current = {
					startX: event.clientX,
					startY: event.clientY,
					baseX: rect.x,
					baseY: rect.y
				};
				const move = (moveEvent) => {
					const drag = dragRef.current;
					if (drag === null) return;
					const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
					const next = {
						...latestRect.current,
						x: clamp(drag.baseX + (moveEvent.clientX - drag.startX), 16 - window.innerWidth, 0),
						y: clamp(drag.baseY + (moveEvent.clientY - drag.startY), -(window.innerHeight - 96), 0)
					};
					latestRect.current = next;
					setRect(next);
				};
				const up = () => {
					dragRef.current = null;
					window.removeEventListener("pointermove", move);
					window.removeEventListener("pointerup", up);
					writePanelRect(latestRect.current);
				};
				window.addEventListener("pointermove", move);
				window.addEventListener("pointerup", up);
			};
			const toggleCollapsed = () => {
				const next = !collapsed;
				setCollapsed(next);
				writeBool(COLLAPSED_KEY, next);
				if (next) setSheet(void 0);
			};
			const beginTokenDrag = (event) => {
				if (event.button !== 0) return;
				event.preventDefault();
				event.currentTarget.focus();
				const drag = {
					startX: event.clientX,
					startY: event.clientY,
					baseX: tokenAt.x,
					baseY: tokenAt.y,
					lastX: tokenAt.x,
					lastY: tokenAt.y,
					moved: false
				};
				tokenDrag.current = drag;
				const cleanup = () => {
					window.removeEventListener("pointermove", move);
					window.removeEventListener("pointerup", up);
					window.removeEventListener("pointercancel", cancel);
				};
				const move = (moveEvent) => {
					if (tokenDrag.current !== drag) return;
					const dx = moveEvent.clientX - drag.startX;
					const dy = moveEvent.clientY - drag.startY;
					if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 4) return;
					drag.moved = true;
					const next = clampToken(drag.baseX + dx, drag.baseY + dy, tokenSize.w, tokenSize.h);
					drag.lastX = next.x;
					drag.lastY = next.y;
					setToken(next);
				};
				const up = () => {
					cleanup();
					if (tokenDrag.current !== drag) return;
					tokenDrag.current = null;
					if (drag.moved) {
						writeTokenPoint({
							x: drag.lastX,
							y: drag.lastY
						});
						return;
					}
					toggleCollapsed();
				};
				const cancel = () => {
					cleanup();
					if (tokenDrag.current === drag) tokenDrag.current = null;
				};
				window.addEventListener("pointermove", move);
				window.addEventListener("pointerup", up);
				window.addEventListener("pointercancel", cancel);
			};
			(0, react.useEffect)(() => {
				setToken((current) => {
					const next = clampToken(current.x, current.y, tokenSize.w, tokenSize.h);
					return next.x === current.x && next.y === current.y ? current : next;
				});
			}, [tokenSize.w, tokenSize.h]);
			(0, react.useEffect)(() => {
				const root = document.documentElement;
				const apply = () => {
					if (collapsed) {
						root.removeAttribute(HALL_OPEN_ATTRIBUTE);
						root.style.removeProperty(HALL_SHIFT_PROPERTY);
						return;
					}
					const vw = window.innerWidth;
					const shift = hallYieldWidth(size.w, vw);
					root.setAttribute(HALL_OPEN_ATTRIBUTE, "");
					root.style.setProperty(HALL_SHIFT_PROPERTY, `${shift}px`);
				};
				apply();
				window.addEventListener("resize", apply);
				return () => {
					window.removeEventListener("resize", apply);
					root.removeAttribute(HALL_OPEN_ATTRIBUTE);
					root.style.removeProperty(HALL_SHIFT_PROPERTY);
				};
			}, [collapsed, size.w]);
			const applySize = (next) => {
				setSize(next);
				writePanelRect({
					...rect,
					...next
				});
			};
			const finishSheet = () => {
				if (reviewing) {
					setReviewing(false);
					setSheet("board");
					return;
				}
				setSheet(void 0);
			};
			const toggleSheet = (kind) => {
				if (sheet === kind) {
					finishSheet();
					return;
				}
				setReviewing(false);
				setSheet(kind);
			};
			(0, react.useEffect)(() => {
				if (collapsed) return;
				const panel = panelRef.current;
				if (panel === null || typeof ResizeObserver === "undefined") return;
				let timer;
				const observer = new ResizeObserver(() => {
					if (timer !== void 0) window.clearTimeout(timer);
					timer = window.setTimeout(() => {
						const bounds = panel.getBoundingClientRect();
						const next = {
							w: Math.round(bounds.width),
							h: Math.round(bounds.height)
						};
						setSize((current) => Math.abs(current.w - next.w) > 1 || Math.abs(current.h - next.h) > 1 ? next : current);
						writePanelRect({
							...latestRect.current,
							...next
						});
					}, 300);
				});
				observer.observe(panel);
				return () => {
					if (timer !== void 0) window.clearTimeout(timer);
					observer.disconnect();
				};
			}, [collapsed]);
			if (typeof document === "undefined") return null;
			const panelStyle = {
				transform: `translate(${rect.x}px, ${rect.y}px)`,
				width: `${size.w}px`,
				height: `${size.h}px`
			};
			const startSect = () => {
				setSheet((current) => current === "start" ? void 0 : "start");
			};
			const cleanupTeams = async () => {
				if (cleanupBusy || costSessionId === void 0) return;
				setCleanupBusy(true);
				setCleanupNotice("");
				try {
					const request = async (dryRun) => {
						const response = await fetch("/plugins/dsh-pixel-team/cleanup", {
							method: "POST",
							cache: "no-store",
							headers: { "content-type": "application/json" },
							body: JSON.stringify({
								sessionId: costSessionId,
								dry_run: dryRun,
								older_than_days: 0,
								include_archived: true
							})
						});
						if (!response.ok) throw new Error("HTTP " + response.status);
						return await response.json();
					};
					if (archiveArmed === void 0) {
						const candidates = (await request(true)).candidates ?? [];
						if (candidates.length === 0) {
							setCleanupNotice(t("office.archiveCleanupEmpty"));
							return;
						}
						setArchiveArmed(candidates.length);
						return;
					}
					const result = await request(false);
					setArchiveArmed(void 0);
					const archived = result.archived ?? [];
					setArchivedTeamIds((current) => [.../* @__PURE__ */ new Set([...current, ...archived])]);
					setHistoryTeamId(void 0);
					setCleanupNotice(t("office.archiveCleanupDone", { count: archived.length }));
				} catch {
					setCleanupNotice(t("office.archiveCleanupFailed"));
				} finally {
					setCleanupBusy(false);
				}
			};
			const flashAbout = (text) => {
				setAboutNotice(text);
				window.setTimeout(() => setAboutNotice((current) => current === text ? "" : current), 2400);
			};
			const renderSheet = () => {
				if (sheet === void 0 || sheetAnchor === void 0) return null;
				const noTeamHint = (0, react_jsx_runtime.jsxs)("div", {
					className: SectHallOverlay_module_css_default.settings,
					children: [
						(0, react_jsx_runtime.jsx)("p", {
							className: SectHallOverlay_module_css_default.settingsHint,
							children: t("workspace.emptyTitle")
						}),
						(0, react_jsx_runtime.jsx)("p", {
							className: SectHallOverlay_module_css_default.settingsMeta,
							children: t("workspace.emptyBody")
						}),
						(0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: SectHallOverlay_module_css_default.settingsButton,
							"data-control": "hall-start",
							onClick: startSect,
							children: [
								(0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "⛩"
								}),
								" ",
								t("quickstart.entry")
							]
						})
					]
				});
				const visibleHistory = history.filter((team) => !archivedTeamIds.includes(team.teamId));
				const viewingCurrent = hasTeam && (historyTeamId === void 0 || historyTeamId === CURRENT_TEAM_SENTINEL);
				const selectedHistory = visibleHistory.find((team) => team.teamId === historyTeamId);
				const selectedTeamId = viewingCurrent ? hall.teamId : selectedHistory?.teamId;
				const selectedState = viewingCurrent ? teamVisualState(hall) : selectedHistory === void 0 ? "waiting" : teamVisualState(selectedHistory);
				const costByTeam = new Map((costReport?.by_team ?? []).map((item) => [item.teamId, item.usd]));
				const historyTasks = hall.tasks.filter((task) => task.status === "completed" || task.status === "failed" || task.status === "cancelled");
				const taskStatusLabel = (status) => status === "completed" ? t("task.status.completed") : status === "failed" ? t("task.status.failed") : t("task.status.cancelled");
				const character = characterId === void 0 ? void 0 : characterId === hall.captainSessionId ? {
					id: hall.captainSessionId,
					name: t("office.captain"),
					key: captainKey(hall.name),
					isCaptain: true
				} : (() => {
					const member = hall.members.find((item) => item.id === characterId || item.name === characterId);
					return member === void 0 ? void 0 : {
						id: member.id || member.name,
						name: member.name,
						key: memberKey(member.name),
						isCaptain: false
					};
				})();
				const characterCultivation = character === void 0 ? void 0 : cultivationFromXp(xpOf(character.key));
				const viewerKey = viewingCaptain ? captainKey(hall.name) : viewingMember === void 0 ? void 0 : memberKey(viewingMember.name);
				const viewerCultivation = viewerKey === void 0 ? void 0 : cultivationFromXp(xpOf(viewerKey));
				const viewerName = viewingCaptain ? t("office.captain") : viewingMember?.name;
				const viewerRank = viewerCultivation === void 0 ? void 0 : rankAtLevel(viewerCultivation.level);
				const roster = !hasTeam ? [] : [{
					key: captainKey(hall.name),
					name: t("office.captain"),
					cultivation: cultivationFromXp(xpOf(captainKey(hall.name)))
				}, ...hall.members.map((member) => ({
					key: memberKey(member.name),
					name: member.name,
					cultivation: cultivationFromXp(xpOf(memberKey(member.name)))
				}))].sort((left, right) => right.cultivation.level - left.cultivation.level || right.cultivation.xp - left.cultivation.xp);
				const diagnostics = sheet === "about" && aboutTab === "feedback" ? collectDiagnostics({
					version: PLUGIN_VERSION,
					team: hasTeam ? {
						name: hall.name,
						phase: hall.phase,
						members: hall.members.length,
						tasks: {
							total: hall.tasks.length,
							done,
							failed: hall.tasks.filter((task) => task.status === "failed").length,
							running: hall.tasks.filter((task) => task.state === "running").length
						}
					} : void 0
				}) : "";
				const openIssue = () => {
					if (feedbackText.trim() === "") {
						flashAbout(t("about.feedbackNeedText"));
						return;
					}
					const url = buildIssueUrl({
						description: feedbackText,
						diagnostics,
						version: PLUGIN_VERSION
					});
					try {
						window.open(url, "_blank", "noopener");
					} catch {
						flashAbout(t("about.feedbackOpenFail"));
					}
				};
				const copyDiagnostics = async () => {
					const ok = await copyText(diagnostics);
					flashAbout(t(ok ? "about.feedbackCopied" : "about.feedbackCopyFail"));
				};
				const copyPrompt = async () => {
					const locale = typeof navigator !== "undefined" && String(navigator.language ?? "").toLowerCase().startsWith("en") ? "en" : "zh";
					const ok = await copyText(buildAgentPrompt({
						description: feedbackText,
						diagnostics,
						locale
					}));
					flashAbout(t(ok ? "about.feedbackCopied" : "about.feedbackCopyFail"));
				};
				const title = sheet === "settings" ? t("office.panelConfig") : sheet === "start" ? t("quickstart.title") : sheet === "character" ? t("office.equipment") : sheet === "ranks" ? t("office.ascension") : sheet === "about" ? t("office.aboutTitle") : sheet === "inbox" ? t("workspace.inbox") : sheet === "teams" ? t("office.facility.teams") : sheet === "board" ? t("workspace.tabBoard") : sheet === "library" ? t("library.title") : sheet === "config" && hasTeam && !staged ? t("library.title") : t("workspace.tabConfig");
				return (0, react_dom.createPortal)((0, react_jsx_runtime.jsxs)("aside", {
					className: SectHallOverlay_module_css_default.sheet,
					"data-sheet": sheet,
					style: {
						left: sheetAnchor.left,
						top: sheetAnchor.top,
						width: sheetAnchor.width,
						height: Math.min(size.h, sheetAnchor.maxHeight),
						maxHeight: sheetAnchor.maxHeight,
						["--hall-sheet-max"]: `${size.h}px`
					},
					role: "dialog",
					"aria-modal": "false",
					"aria-label": title,
					children: [
						(0, react_jsx_runtime.jsxs)("header", {
							className: SectHallOverlay_module_css_default.sheetHead,
							children: [
								(0, react_jsx_runtime.jsx)("span", {
									className: SectHallOverlay_module_css_default.sheetTitle,
									children: title
								}),
								sheet === "board" && hasTeam && (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: SectHallOverlay_module_css_default.sheetAction,
									onClick: startNewTask,
									title: t("office.newTaskHint"),
									children: ["＋ ", t("office.newTask")]
								}),
								hasTeam && (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: SectHallOverlay_module_css_default.sheetAction,
									"data-control": "hall-library",
									onClick: () => {
										setSheet(sheet === "library" ? "board" : "library");
									},
									children: sheet === "library" ? t("library.back") : "📚 " + t("library.title")
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: SectHallOverlay_module_css_default.sheetClose,
									onClick: finishSheet,
									"aria-label": t("office.closePanel"),
									children: "×"
								})
							]
						}),
						(0, react_jsx_runtime.jsx)("div", {
							className: SectHallOverlay_module_css_default.sheetBody,
							children: sheet === "ranks" ? (0, react_jsx_runtime.jsxs)("div", {
								className: SectHallOverlay_module_css_default.ranks,
								children: [
									(0, react_jsx_runtime.jsx)("p", {
										className: SectHallOverlay_module_css_default.settingsHint,
										children: t("office.ascensionIntro")
									}),
									viewerCultivation !== void 0 && viewerName !== void 0 && (0, react_jsx_runtime.jsxs)("div", {
										className: SectHallOverlay_module_css_default.rankHero,
										children: [
											(0, react_jsx_runtime.jsxs)("span", {
												className: SectHallOverlay_module_css_default.rankHeroName,
												children: [
													viewerName,
													" · ",
													(0, react_jsx_runtime.jsxs)("span", {
														style: { color: realmPaletteForLevel(viewerCultivation.level).border },
														children: [
															"Lv.",
															viewerCultivation.level,
															" ",
															t(viewerCultivation.rankKey)
														]
													})
												]
											}),
											(0, react_jsx_runtime.jsx)("div", {
												className: SectHallOverlay_module_css_default.xpTrack,
												children: (0, react_jsx_runtime.jsx)("span", { style: {
													width: `${Math.round(viewerCultivation.ratio * 100)}%`,
													background: realmPaletteForLevel(viewerCultivation.level).bar
												} })
											}),
											(0, react_jsx_runtime.jsxs)("span", {
												className: SectHallOverlay_module_css_default.settingsMeta,
												children: [
													viewerCultivation.xp,
													" / ",
													viewerCultivation.next,
													" XP · ",
													t("office.ascensionCurrent")
												]
											})
										]
									}),
									roster.length > 0 && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("span", {
										className: SectHallOverlay_module_css_default.historyTitle,
										children: t("office.ascensionSect")
									}), (0, react_jsx_runtime.jsx)("ol", {
										className: SectHallOverlay_module_css_default.rosterList,
										children: roster.map((entry, index) => (0, react_jsx_runtime.jsxs)("li", {
											className: SectHallOverlay_module_css_default.rosterRow,
											children: [
												(0, react_jsx_runtime.jsx)("span", {
													className: SectHallOverlay_module_css_default.rosterIndex,
													children: index + 1
												}),
												(0, react_jsx_runtime.jsx)("span", {
													className: SectHallOverlay_module_css_default.rosterName,
													children: entry.name
												}),
												(0, react_jsx_runtime.jsxs)("span", {
													className: SectHallOverlay_module_css_default.rosterLevel,
													style: { color: realmPaletteForLevel(entry.cultivation.level).border },
													children: [
														"Lv.",
														entry.cultivation.level,
														" · ",
														t(entry.cultivation.rankKey)
													]
												})
											]
										}, entry.key))
									})] }),
									(0, react_jsx_runtime.jsx)("span", {
										className: SectHallOverlay_module_css_default.historyTitle,
										children: t("office.ascensionRealmList")
									}),
									(0, react_jsx_runtime.jsx)("ol", {
										className: SectHallOverlay_module_css_default.rankList,
										children: ASCENSION_RANKS.map((rank) => {
											const current = viewerRank?.realm === rank.realm;
											return (0, react_jsx_runtime.jsxs)("li", {
												className: SectHallOverlay_module_css_default.rankRow,
												"data-current": current || void 0,
												children: [(0, react_jsx_runtime.jsxs)("div", {
													className: SectHallOverlay_module_css_default.rankTop,
													children: [
														(0, react_jsx_runtime.jsx)("span", {
															className: SectHallOverlay_module_css_default.rankName,
															children: t(rank.realm)
														}),
														(0, react_jsx_runtime.jsxs)("span", {
															className: SectHallOverlay_module_css_default.rankRange,
															style: { color: realmPaletteForLevel(rank.levelMin).border },
															children: [
																"Lv.",
																rank.levelMin,
																"–",
																rank.levelMax
															]
														}),
														current && (0, react_jsx_runtime.jsx)("span", {
															className: SectHallOverlay_module_css_default.rankCurrent,
															children: t("office.ascensionYouAre")
														})
													]
												}), (0, react_jsx_runtime.jsx)("p", {
													className: SectHallOverlay_module_css_default.rankDesc,
													children: t(rank.descKey)
												})]
											}, rank.realm);
										})
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: SectHallOverlay_module_css_default.historyTitle,
										children: t("office.ascensionFast")
									}),
									(0, react_jsx_runtime.jsx)("ul", {
										className: SectHallOverlay_module_css_default.tips,
										children: ASCENSION_TIPS.map((key) => (0, react_jsx_runtime.jsx)("li", {
											className: SectHallOverlay_module_css_default.tip,
											children: t(key)
										}, key))
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: SectHallOverlay_module_css_default.historyTitle,
										children: t("office.ascensionStory")
									}),
									(0, react_jsx_runtime.jsx)("div", {
										className: SectHallOverlay_module_css_default.story,
										children: ASCENSION_STORY.map((key) => (0, react_jsx_runtime.jsx)("p", { children: t(key) }, key))
									})
								]
							}) : sheet === "about" ? (0, react_jsx_runtime.jsxs)("div", {
								className: SectHallOverlay_module_css_default.about,
								children: [(0, react_jsx_runtime.jsx)("div", {
									className: SectHallOverlay_module_css_default.aboutTabs,
									role: "tablist",
									children: [
										["sponsor", "about.tab.sponsor"],
										["group", "about.tab.group"],
										["about", "about.tab.about"],
										["feedback", "about.tab.feedback"]
									].map(([id, key]) => (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										role: "tab",
										className: SectHallOverlay_module_css_default.aboutTab,
										"data-active": aboutTab === id || void 0,
										onClick: () => {
											setAboutTab(id);
											setAboutNotice("");
										},
										children: t(key)
									}, id))
								}), aboutTab === "group" ? (0, react_jsx_runtime.jsxs)("div", {
									className: SectHallOverlay_module_css_default.aboutSection,
									children: [
										(0, react_jsx_runtime.jsx)("p", {
											className: SectHallOverlay_module_css_default.settingsHint,
											children: t("about.groupHint")
										}),
										(0, react_jsx_runtime.jsxs)("div", {
											className: SectHallOverlay_module_css_default.qrGrid,
											children: [(0, react_jsx_runtime.jsxs)("figure", {
												className: SectHallOverlay_module_css_default.qrCard,
												children: [(0, react_jsx_runtime.jsx)("img", {
													src: supportAsset("group-qr.jpg"),
													alt: t("about.groupCaption"),
													loading: "lazy"
												}), (0, react_jsx_runtime.jsx)("figcaption", { children: t("about.groupCaption") })]
											}), (0, react_jsx_runtime.jsxs)("figure", {
												className: SectHallOverlay_module_css_default.qrCard,
												children: [(0, react_jsx_runtime.jsx)("img", {
													src: supportAsset("group-wechat.jpg"),
													alt: t("about.groupCaptionWechat"),
													loading: "lazy"
												}), (0, react_jsx_runtime.jsx)("figcaption", { children: t("about.groupCaptionWechat") })]
											})]
										}),
										(0, react_jsx_runtime.jsx)("p", {
											className: SectHallOverlay_module_css_default.settingsHint,
											children: t("about.groupNote")
										}),
										(0, react_jsx_runtime.jsx)("p", {
											className: SectHallOverlay_module_css_default.settingsMeta,
											children: t("about.groupFallback")
										}),
										(0, react_jsx_runtime.jsx)("div", {
											className: SectHallOverlay_module_css_default.aboutActions,
											children: (0, react_jsx_runtime.jsxs)("a", {
												className: SectHallOverlay_module_css_default.aboutLink,
												href: PLUGIN_REPO,
												target: "_blank",
												rel: "noreferrer",
												children: [
													"⌂ ",
													t("about.repo"),
													" ↗"
												]
											})
										})
									]
								}) : aboutTab === "sponsor" ? (0, react_jsx_runtime.jsxs)("div", {
									className: SectHallOverlay_module_css_default.aboutSection,
									children: [
										(0, react_jsx_runtime.jsx)("p", {
											className: SectHallOverlay_module_css_default.settingsHint,
											children: t("about.sponsorHint")
										}),
										(0, react_jsx_runtime.jsxs)("div", {
											className: SectHallOverlay_module_css_default.qrGrid,
											children: [(0, react_jsx_runtime.jsxs)("figure", {
												className: SectHallOverlay_module_css_default.qrCard,
												children: [(0, react_jsx_runtime.jsx)("img", {
													src: supportAsset("wechat-pay.jpg"),
													alt: t("about.sponsorPay"),
													loading: "lazy"
												}), (0, react_jsx_runtime.jsx)("figcaption", { children: t("about.sponsorPay") })]
											}), (0, react_jsx_runtime.jsxs)("figure", {
												className: SectHallOverlay_module_css_default.qrCard,
												children: [(0, react_jsx_runtime.jsx)("img", {
													src: supportAsset("wechat-reward.jpg"),
													alt: t("about.sponsorReward"),
													loading: "lazy"
												}), (0, react_jsx_runtime.jsx)("figcaption", { children: t("about.sponsorReward") })]
											})]
										}),
										(0, react_jsx_runtime.jsx)("p", {
											className: SectHallOverlay_module_css_default.settingsHint,
											children: t("about.sponsorNote")
										}),
										(0, react_jsx_runtime.jsx)("div", {
											className: SectHallOverlay_module_css_default.aboutActions,
											children: (0, react_jsx_runtime.jsxs)("a", {
												className: SectHallOverlay_module_css_default.aboutLink,
												href: "https://github.com/EternalNight996/dsh-pixel-team/blob/main/SPONSOR.md",
												target: "_blank",
												rel: "noreferrer",
												children: [
													"☕ ",
													t("about.sponsorLink"),
													" ↗"
												]
											})
										})
									]
								}) : aboutTab === "about" ? (0, react_jsx_runtime.jsxs)("div", {
									className: SectHallOverlay_module_css_default.aboutSection,
									children: [
										(0, react_jsx_runtime.jsx)("p", {
											className: SectHallOverlay_module_css_default.settingsHint,
											children: t("about.intro")
										}),
										(0, react_jsx_runtime.jsxs)("div", {
											className: SectHallOverlay_module_css_default.aboutMeta,
											children: [
												(0, react_jsx_runtime.jsxs)("span", { children: [
													t("about.version"),
													": ",
													PLUGIN_VERSION
												] }),
												(0, react_jsx_runtime.jsxs)("span", { children: [t("about.author"), ": 惠州市梦游科技有限公司"] }),
												(0, react_jsx_runtime.jsxs)("span", { children: [t("about.license"), ": MIT"] })
											]
										}),
										(0, react_jsx_runtime.jsx)("p", {
											className: SectHallOverlay_module_css_default.settingsHint,
											children: t("about.companyNote")
										}),
										(0, react_jsx_runtime.jsxs)("div", {
											className: SectHallOverlay_module_css_default.aboutActions,
											children: [
												(0, react_jsx_runtime.jsxs)("a", {
													className: SectHallOverlay_module_css_default.aboutLink,
													href: PLUGIN_REPO,
													target: "_blank",
													rel: "noreferrer",
													children: [
														"⌂ ",
														t("about.repo"),
														" ↗"
													]
												}),
												(0, react_jsx_runtime.jsxs)("a", {
													className: SectHallOverlay_module_css_default.aboutLink,
													href: "https://github.com/EternalNight996/dsh-pixel-team/issues",
													target: "_blank",
													rel: "noreferrer",
													children: [
														"🐞 ",
														t("about.issues"),
														" ↗"
													]
												}),
												(0, react_jsx_runtime.jsxs)("a", {
													className: SectHallOverlay_module_css_default.aboutLink,
													href: "https://github.com/EternalNight996/dsh-pixel-team/releases",
													target: "_blank",
													rel: "noreferrer",
													children: [
														"🏷 ",
														t("about.releases"),
														" ↗"
													]
												})
											]
										})
									]
								}) : (0, react_jsx_runtime.jsxs)("div", {
									className: SectHallOverlay_module_css_default.aboutSection,
									children: [
										(0, react_jsx_runtime.jsx)("p", {
											className: SectHallOverlay_module_css_default.settingsHint,
											children: t("about.feedbackWhy")
										}),
										(0, react_jsx_runtime.jsx)("textarea", {
											className: SectHallOverlay_module_css_default.feedbackText,
											value: feedbackText,
											onChange: (event) => setFeedbackText(event.target.value),
											placeholder: t("about.feedbackPlaceholder"),
											rows: 4
										}),
										(0, react_jsx_runtime.jsxs)("div", {
											className: SectHallOverlay_module_css_default.feedbackDiagHead,
											children: [(0, react_jsx_runtime.jsx)("span", { children: t("about.feedbackDiag") }), (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: SectHallOverlay_module_css_default.sheetAction,
												onClick: () => {
													copyDiagnostics();
												},
												children: t("about.feedbackCopyDiag")
											})]
										}),
										(0, react_jsx_runtime.jsx)("pre", {
											className: SectHallOverlay_module_css_default.feedbackDiag,
											children: diagnostics
										}),
										(0, react_jsx_runtime.jsx)("p", {
											className: SectHallOverlay_module_css_default.settingsMeta,
											children: t("about.feedbackPrivacy")
										}),
										(0, react_jsx_runtime.jsxs)("div", {
											className: SectHallOverlay_module_css_default.aboutActions,
											children: [(0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												className: SectHallOverlay_module_css_default.sheetAction,
												onClick: openIssue,
												children: ["🚀 ", t("about.feedbackOpenIssue")]
											}), (0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												className: SectHallOverlay_module_css_default.sheetAction,
												onClick: () => {
													copyPrompt();
												},
												children: ["🤖 ", t("about.feedbackCopyPrompt")]
											})]
										}),
										aboutNotice !== "" && (0, react_jsx_runtime.jsx)("p", {
											className: SectHallOverlay_module_css_default.aboutNotice,
											children: aboutNotice
										})
									]
								})]
							}) : sheet === "settings" ? (0, react_jsx_runtime.jsxs)("div", {
								className: SectHallOverlay_module_css_default.settings,
								children: [
									(0, react_jsx_runtime.jsx)("p", {
										className: SectHallOverlay_module_css_default.settingsHint,
										children: t("office.panelSizeHint")
									}),
									(0, react_jsx_runtime.jsx)("div", {
										className: SectHallOverlay_module_css_default.sizeRow,
										children: Object.keys(PANEL_SIZES).map((id) => {
											const preset = PANEL_SIZES[id];
											const active = size.w === preset.w && size.h === preset.h;
											return (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: SectHallOverlay_module_css_default.sizeChip,
												"data-active": active || void 0,
												onClick: () => {
													applySize(preset);
												},
												children: t(`office.panelSize.${id}`)
											}, id);
										})
									}),
									(0, react_jsx_runtime.jsxs)("p", {
										className: SectHallOverlay_module_css_default.settingsMeta,
										children: [
											size.w,
											" × ",
											size.h,
											" px"
										]
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: SectHallOverlay_module_css_default.settingsButton,
										onClick: () => {
											setRect({
												x: 0,
												y: 0
											});
											writePanelRect({
												x: 0,
												y: 0,
												...size
											});
										},
										children: t("office.resetPosition")
									})
								]
							}) : sheet === "start" ? sessionId === void 0 ? (0, react_jsx_runtime.jsx)("p", {
								className: SectHallOverlay_module_css_default.settingsHint,
								children: t("workspace.emptyTitle")
							}) : (0, react_jsx_runtime.jsx)(QuickStartWizard, {
								sessionId,
								existingTeam: hasTeam,
								t,
								onDone: () => {
									setSheet(void 0);
								},
								onFounded: () => {
									setPendingReview(true);
								}
							}) : sheet === "character" ? character === void 0 || characterCultivation === void 0 ? (0, react_jsx_runtime.jsx)("p", {
								className: SectHallOverlay_module_css_default.settingsHint,
								children: t("workspace.emptyTitle")
							}) : (0, react_jsx_runtime.jsxs)("div", {
								className: SectHallOverlay_module_css_default.character,
								children: [
									(0, react_jsx_runtime.jsxs)("div", {
										className: SectHallOverlay_module_css_default.characterHead,
										children: [(0, react_jsx_runtime.jsx)("span", {
											className: SectHallOverlay_module_css_default.characterName,
											children: character.name
										}), (0, react_jsx_runtime.jsxs)("span", {
											className: SectHallOverlay_module_css_default.characterLevel,
											style: { color: realmPaletteForLevel(characterCultivation.level).border },
											children: [
												"Lv.",
												characterCultivation.level,
												" ",
												t(characterCultivation.rankKey)
											]
										})]
									}),
									(0, react_jsx_runtime.jsx)("div", {
										className: SectHallOverlay_module_css_default.xpTrack,
										children: (0, react_jsx_runtime.jsx)("span", { style: {
											width: `${Math.round(characterCultivation.ratio * 100)}%`,
											background: realmPaletteForLevel(characterCultivation.level).bar
										} })
									}),
									(0, react_jsx_runtime.jsxs)("p", {
										className: SectHallOverlay_module_css_default.settingsMeta,
										children: [
											characterCultivation.xp,
											" / ",
											characterCultivation.next,
											" XP"
										]
									}),
									(0, react_jsx_runtime.jsx)("p", {
										className: SectHallOverlay_module_css_default.settingsMeta,
										children: t("office.levelEarnHint")
									}),
									(0, react_jsx_runtime.jsx)("p", {
										className: SectHallOverlay_module_css_default.settingsMeta,
										children: t("office.equipLiveHint")
									}),
									(0, react_jsx_runtime.jsx)("p", {
										className: SectHallOverlay_module_css_default.settingsMeta,
										children: t("office.idleGain", { xp: idleXpPer10s(characterCultivation.level) })
									}),
									[
										{
											kind: "weapon",
											title: t("office.weapon"),
											hint: void 0
										},
										{
											kind: "mount",
											title: t("office.mounts"),
											hint: t("office.mountHint")
										},
										{
											kind: "skill",
											title: t("office.skills"),
											hint: void 0
										}
									].map((section) => {
										const items = CULTIVATION_ITEMS.filter((item) => item.kind === section.kind);
										const unlocked = items.filter((item) => characterCultivation.level >= item.level).length;
										const equippedMount = equipped.mount ?? "mount-walk";
										return (0, react_jsx_runtime.jsxs)("section", {
											className: SectHallOverlay_module_css_default.inventorySection,
											"data-kind": section.kind,
											children: [
												(0, react_jsx_runtime.jsxs)("header", {
													className: SectHallOverlay_module_css_default.sectionHead,
													children: [(0, react_jsx_runtime.jsx)("span", {
														className: SectHallOverlay_module_css_default.historyTitle,
														children: section.title
													}), (0, react_jsx_runtime.jsxs)("span", {
														className: SectHallOverlay_module_css_default.sectionCount,
														children: [
															unlocked,
															"/",
															items.length
														]
													})]
												}),
												section.hint !== void 0 && (0, react_jsx_runtime.jsx)("p", {
													className: SectHallOverlay_module_css_default.sectionHint,
													children: section.hint
												}),
												(0, react_jsx_runtime.jsx)("div", {
													className: SectHallOverlay_module_css_default.inventory,
													children: items.map((item) => {
														const locked = characterCultivation.level < item.level;
														const isEquipped = section.kind === "mount" ? equippedMount === item.id : equipped[item.kind] === item.id;
														return (0, react_jsx_runtime.jsxs)("button", {
															type: "button",
															className: SectHallOverlay_module_css_default.item,
															"data-kind": item.kind,
															"data-tier": itemTier(item.level),
															"data-locked": locked || void 0,
															"data-equipped": isEquipped || void 0,
															disabled: locked,
															"aria-pressed": isEquipped,
															title: `${t(item.key)} · Lv.${item.level}`,
															onClick: () => {
																if (locked) return;
																setEquippedByCharacter((current) => ({
																	...current,
																	[character.id]: {
																		...current[character.id],
																		[item.kind]: item.id
																	}
																}));
																const label = t(item.key);
																if (item.kind === "mount") window.dispatchEvent(new CustomEvent("agent-teams:mount", { detail: {
																	id: character.id,
																	form: item.form ?? "off",
																	mountId: item.id,
																	label
																} }));
																else window.dispatchEvent(new CustomEvent("agent-teams:equip", { detail: {
																	id: character.id,
																	kind: item.kind,
																	tier: item.level,
																	itemId: item.id,
																	label
																} }));
															},
															children: [
																(0, react_jsx_runtime.jsx)("span", {
																	className: SectHallOverlay_module_css_default.itemIcon,
																	"aria-hidden": true,
																	children: item.icon
																}),
																(0, react_jsx_runtime.jsx)("span", {
																	className: SectHallOverlay_module_css_default.itemName,
																	children: t(item.key)
																}),
																(0, react_jsx_runtime.jsxs)("span", {
																	className: SectHallOverlay_module_css_default.itemFoot,
																	children: [(0, react_jsx_runtime.jsxs)("span", {
																		className: SectHallOverlay_module_css_default.itemLevel,
																		children: ["Lv.", item.level]
																	}), locked ? (0, react_jsx_runtime.jsx)("span", {
																		className: SectHallOverlay_module_css_default.itemBadge,
																		"data-tone": "locked",
																		children: t("office.locked")
																	}) : isEquipped ? (0, react_jsx_runtime.jsx)("span", {
																		className: SectHallOverlay_module_css_default.itemBadge,
																		children: t("office.equipped")
																	}) : null]
																})
															]
														}, item.id);
													})
												})
											]
										}, section.kind);
									})
								]
							}) : sheet === "library" ? sessionId === void 0 ? (0, react_jsx_runtime.jsx)("p", {
								className: SectHallOverlay_module_css_default.settingsHint,
								children: t("library.empty")
							}) : (0, react_jsx_runtime.jsx)(LibraryPanel, {
								sessionId,
								t
							}) : sheet === "inbox" ? (0, react_jsx_runtime.jsx)(HallInbox, {
								messages: hall.captainInbox,
								t
							}) : sheet === "config" ? !hasTeam ? noTeamHint : staged && (sessionId ?? hall.captainSessionId) !== void 0 ? (0, react_jsx_runtime.jsx)(StagingPlanEditor, {
								team: hall,
								modelDirectory: modelDirectories.directoryFor(sessionId ?? hall.captainSessionId),
								onContinuePlanning: () => {
									setSheet(void 0);
								},
								onDiscarded: () => {
									setSheet(void 0);
								},
								t
							}) : sessionId !== void 0 ? (0, react_jsx_runtime.jsx)(LibraryPanel, {
								sessionId,
								t
							}) : (0, react_jsx_runtime.jsx)(TeamConfigPanel, {
								team: hall,
								t
							}) : sheet === "teams" ? (0, react_jsx_runtime.jsxs)("div", {
								className: SectHallOverlay_module_css_default.history,
								children: [
									(0, react_jsx_runtime.jsxs)("div", {
										className: SectHallOverlay_module_css_default.historyHead,
										children: [
											(0, react_jsx_runtime.jsxs)("select", {
												className: SectHallOverlay_module_css_default.historySelect,
												"data-state": selectedState,
												"aria-label": t("office.historyTeams"),
												value: viewingCurrent ? CURRENT_TEAM_SENTINEL : selectedHistory?.teamId ?? "",
												onChange: (event) => {
													setHistoryTeamId(event.currentTarget.value);
												},
												children: [
													!hasTeam && visibleHistory.length === 0 && (0, react_jsx_runtime.jsx)("option", {
														value: "",
														children: t("office.historyEmpty")
													}),
													hasTeam && (0, react_jsx_runtime.jsxs)("option", {
														value: CURRENT_TEAM_SENTINEL,
														children: [
															stateDot(teamVisualState(hall)),
															" ",
															hall.name,
															" · ",
															t("office.historyCurrent"),
															" · ",
															done,
															"/",
															total,
															" · ",
															money(costByTeam.get(hall.teamId) ?? 0)
														]
													}),
													visibleHistory.map((team) => {
														const completed = team.tasks.filter((task) => task.status === "completed").length;
														return (0, react_jsx_runtime.jsxs)("option", {
															value: team.teamId,
															children: [
																stateDot(teamVisualState(team)),
																" ",
																team.name,
																" · ",
																t("office.historyPast"),
																" · ",
																completed,
																"/",
																team.tasks.length,
																" · ",
																money(costByTeam.get(team.teamId) ?? 0)
															]
														}, team.teamId);
													})
												]
											}),
											(0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												className: SectHallOverlay_module_css_default.historyStartSmall,
												onClick: startSect,
												title: t("quickstart.entryTitle"),
												children: [(0, react_jsx_runtime.jsx)("span", {
													"aria-hidden": true,
													children: "⛩"
												}), t("quickstart.entry")]
											}),
											costSessionId !== void 0 && (0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												className: `${SectHallOverlay_module_css_default.historyStartSmall} ${SectHallOverlay_module_css_default.archiveButton}`,
												"data-danger": true,
												onClick: () => {
													cleanupTeams();
												},
												disabled: cleanupBusy,
												title: t("office.archiveCleanupHint"),
												children: [(0, react_jsx_runtime.jsx)("span", {
													"aria-hidden": true,
													children: "🗄"
												}), cleanupBusy ? t("office.archiveBusy") : t("office.archiveCleanup")]
											}),
											archiveArmed !== void 0 && (0, react_jsx_runtime.jsxs)("span", {
												role: "alertdialog",
												style: {
													display: "inline-flex",
													gap: 6,
													alignItems: "center",
													fontSize: 11,
													color: "#ffd7a0"
												},
												children: [
													(0, react_jsx_runtime.jsx)("span", { children: t("office.archiveCleanupConfirm", { count: archiveArmed }) }),
													(0, react_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => {
															cleanupTeams();
														},
														children: t("office.archiveCleanup")
													}),
													(0, react_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => {
															setArchiveArmed(void 0);
														},
														children: t("quickstart.cancel")
													})
												]
											})
										]
									}),
									cleanupNotice !== "" && (0, react_jsx_runtime.jsx)("p", {
										className: SectHallOverlay_module_css_default.settingsHint,
										role: "status",
										children: cleanupNotice
									}),
									!hasTeam && visibleHistory.length === 0 && historyTasks.length === 0 && (0, react_jsx_runtime.jsx)("p", {
										className: SectHallOverlay_module_css_default.settingsHint,
										children: t("office.historyEmpty")
									}),
									(hasTeam || visibleHistory.length > 0) && (0, react_jsx_runtime.jsx)("div", {
										className: SectHallOverlay_module_css_default.historyBlock,
										children: selectedHistory !== void 0 ? (0, react_jsx_runtime.jsx)("div", {
											className: SectHallOverlay_module_css_default.historyDetail,
											children: (0, react_jsx_runtime.jsx)(TeamSection, {
												team: selectedHistory,
												t,
												historic: true,
												workspace: true,
												onOpenCaptain: openCaptain === void 0 ? void 0 : () => {
													openCaptain(selectedHistory.captainSessionId);
												},
												onNavigate: (_parent, child) => {
													if (ownerSessionId !== void 0) openMember(ownerSessionId, child);
												}
											})
										}) : null
									}),
									historyTasks.length > 0 && (0, react_jsx_runtime.jsxs)("div", {
										className: SectHallOverlay_module_css_default.historyBlock,
										children: [(0, react_jsx_runtime.jsx)("span", {
											className: SectHallOverlay_module_css_default.historyTitle,
											children: t("office.taskHistory")
										}), (0, react_jsx_runtime.jsx)("ul", {
											className: SectHallOverlay_module_css_default.historyTasks,
											children: historyTasks.map((task) => (0, react_jsx_runtime.jsxs)("li", {
												className: SectHallOverlay_module_css_default.historyTask,
												children: [
													(0, react_jsx_runtime.jsx)("span", {
														className: SectHallOverlay_module_css_default.historyTaskId,
														children: task.id
													}),
													(0, react_jsx_runtime.jsx)("span", {
														className: SectHallOverlay_module_css_default.historyTaskSubject,
														title: task.subject,
														children: task.subject
													}),
													(0, react_jsx_runtime.jsx)("span", {
														className: SectHallOverlay_module_css_default.historyTaskWho,
														children: task.assignee || "—"
													}),
													(0, react_jsx_runtime.jsx)("span", {
														className: SectHallOverlay_module_css_default.historyTaskState,
														"data-state": task.state,
														children: taskStatusLabel(task.status)
													})
												]
											}, task.id))
										})]
									}),
									selectedTeamId !== void 0 && (0, react_jsx_runtime.jsx)(CostDetail, {
										sessionId: costSessionId,
										teamId: selectedTeamId,
										t
									})
								]
							}) : !hasTeam ? noTeamHint : (0, react_jsx_runtime.jsx)(TeamSection, {
								team: hall,
								t,
								workspace: true,
								onOpenCaptain: goHome,
								viewingSessionId: sessionId,
								onNavigate: (_parent, child) => {
									if (ownerSessionId !== void 0) openMember(ownerSessionId, child);
								},
								onContinuePlanning: () => {
									setSheet(void 0);
								},
								onDiscarded: () => {
									setSheet(void 0);
								}
							})
						}),
						(0, react_jsx_runtime.jsx)(MemoryModeBanner, { t }),
						(0, react_jsx_runtime.jsx)(CostDialog, {
							sessionId,
							t
						})
					]
				}), document.body);
			};
			const tokenTitle = hasTeam ? `${hall.name} · ${done}/${total}` : `${hall.name} · ${t("office.hallNoTeam")}`;
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [collapsed ? (0, react_dom.createPortal)((0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: SectHallOverlay_module_css_default.token,
				"data-hall-token": true,
				style: {
					left: tokenAt.x,
					top: tokenAt.y,
					width: tokenSize.w,
					height: tokenSize.h
				},
				onPointerDown: beginTokenDrag,
				onClick: (event) => {
					if (event.detail === 0) toggleCollapsed();
				},
				"aria-label": t("office.expand"),
				"aria-expanded": false,
				title: `${t("office.expand")} · ${tokenTitle}`,
				children: (0, react_jsx_runtime.jsxs)("span", {
					className: SectHallOverlay_module_css_default.tokenInner,
					style: { transform: `scale(${tokenScale})` },
					"aria-hidden": true,
					children: [(0, react_jsx_runtime.jsx)("span", {
						className: SectHallOverlay_module_css_default.tokenBody,
						children: APP_ICON === "" ? (0, react_jsx_runtime.jsx)("span", {
							className: SectHallOverlay_module_css_default.tokenGlyph,
							"aria-hidden": true,
							children: "⛩"
						}) : (0, react_jsx_runtime.jsx)("img", {
							className: SectHallOverlay_module_css_default.tokenIcon,
							src: APP_ICON,
							alt: ""
						})
					}), (0, react_jsx_runtime.jsx)("span", {
						className: SectHallOverlay_module_css_default.tokenTassel,
						"aria-hidden": true
					})]
				})
			}), document.body) : (0, react_dom.createPortal)((0, react_jsx_runtime.jsxs)("section", {
				ref: panelRef,
				className: SectHallOverlay_module_css_default.window,
				"data-hall-window": true,
				style: panelStyle,
				"aria-label": t("office.sceneAria", { name: hall.name }),
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: SectHallOverlay_module_css_default.head,
						onPointerDown: beginDrag,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: SectHallOverlay_module_css_default.caret,
								"aria-hidden": true,
								children: "▾"
							}),
							(0, react_jsx_runtime.jsxs)("span", {
								className: SectHallOverlay_module_css_default.title,
								children: [APP_ICON !== "" && (0, react_jsx_runtime.jsx)("img", {
									className: SectHallOverlay_module_css_default.brandIcon,
									src: APP_ICON,
									alt: "",
									"aria-hidden": true
								}), (0, react_jsx_runtime.jsxs)("span", {
									className: SectHallOverlay_module_css_default.titleText,
									children: [APP_ICON === "" ? "⛩ " : "", hall.name]
								})]
							}),
							(0, react_jsx_runtime.jsx)("span", {
								className: SectHallOverlay_module_css_default.meta,
								children: hasTeam ? `${done}/${total}` : t("office.hallNoTeam")
							}),
							(0, react_jsx_runtime.jsxs)("span", {
								className: SectHallOverlay_module_css_default.versionBadge,
								title: t("about.version"),
								children: ["v", PLUGIN_VERSION]
							}),
							(0, react_jsx_runtime.jsxs)("a", {
								className: SectHallOverlay_module_css_default.starLink,
								href: `${PLUGIN_REPO}/stargazers`,
								target: "_blank",
								rel: "noreferrer",
								title: t("office.starHint"),
								"aria-label": t("office.starHint"),
								onPointerDown: (event) => {
									event.stopPropagation();
								},
								children: [(0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "⭐"
								}), (0, react_jsx_runtime.jsx)("span", {
									className: SectHallOverlay_module_css_default.starLabel,
									children: t("office.star")
								})]
							}),
							hasTeam && (viewingCaptain || viewingMember !== void 0) && (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: SectHallOverlay_module_css_default.viewer,
								"data-kind": viewingCaptain ? "captain" : "member",
								title: t("office.equipment"),
								onClick: () => {
									const id = viewingCaptain ? hall.captainSessionId : viewingMember?.id || viewingMember?.name;
									if (id !== void 0 && id !== "") {
										setCharacterId(id);
										setSheet("character");
									}
								},
								children: viewingCaptain ? `👑 ${t("office.viewingCaptain")}` : `◈ ${t("office.viewingMember", { name: viewingMember?.name ?? "" })}`
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: SectHallOverlay_module_css_default.headButton,
								"data-control": "hall-collapse",
								"aria-expanded": true,
								"aria-label": t("office.collapse"),
								title: t("office.collapse"),
								onClick: toggleCollapsed,
								children: (0, react_jsx_runtime.jsx)("span", {
									className: SectHallOverlay_module_css_default.collapseIcon,
									"aria-hidden": true,
									children: "—"
								})
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: SectHallOverlay_module_css_default.canvas,
						children: (0, react_jsx_runtime.jsx)(PixelOffice, {
							team: hall,
							t,
							activeAction: sheet === "character" ? "gear" : sheet === "settings" || sheet === "start" ? null : sheet === "library" ? "board" : sheet ?? null,
							onAction: (action) => {
								if (action === "teams" && !hasTeam) {
									startSect();
									return;
								}
								if (action === "gear") {
									openGear();
									return;
								}
								toggleSheet(action);
							},
							onOpenMember: (memberId) => {
								if (ownerSessionId !== void 0) openMember(ownerSessionId, memberId);
							},
							onOpenCaptain: goHome,
							onOpenCharacter: (memberId) => {
								setCharacterId(memberId);
								setSheet("character");
							},
							viewingSessionId: sessionId,
							onUnavailable: () => {},
							onSettings: () => {
								toggleSheet("settings");
							},
							settingsOpen: sheet === "settings",
							teamless: !hasTeam
						})
					}),
					(0, react_jsx_runtime.jsxs)("footer", {
						className: SectHallOverlay_module_css_default.floor,
						children: [
							!hasTeam && (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `${SectHallOverlay_module_css_default.floorButton} ${SectHallOverlay_module_css_default.startButton}`,
								"data-control": "hall-start",
								onClick: startSect,
								title: t("quickstart.entryTitle"),
								children: [(0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "⛩"
								}), t("quickstart.entry")]
							}),
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: SectHallOverlay_module_css_default.floorButton,
								"data-control": "hall-doctrine",
								"data-active": sheet === "config" || void 0,
								onClick: () => {
									toggleSheet("config");
								},
								children: [(0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "经"
								}), t("office.floorDoctrine")]
							}),
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: SectHallOverlay_module_css_default.floorButton,
								"data-control": "hall-progress",
								"data-active": sheet === "board" || void 0,
								onClick: () => {
									toggleSheet("board");
								},
								children: [(0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "碑"
								}), t("office.floorProgress")]
							}),
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: SectHallOverlay_module_css_default.floorButton,
								"data-control": "hall-ranks",
								"data-active": sheet === "ranks" || void 0,
								onClick: () => {
									toggleSheet("ranks");
								},
								children: [(0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "榜"
								}), t("office.floorRanks")]
							}),
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: SectHallOverlay_module_css_default.floorButton,
								"data-control": "hall-roster",
								"data-active": sheet === "teams" || void 0,
								onClick: () => {
									toggleSheet("teams");
								},
								children: [(0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "山"
								}), t("office.roster")]
							}),
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: SectHallOverlay_module_css_default.floorButton,
								"data-control": "hall-about",
								"data-active": sheet === "about" || void 0,
								onClick: () => {
									toggleSheet("about");
								},
								children: [(0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "志"
								}), t("office.floorAbout")]
							}),
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: SectHallOverlay_module_css_default.floorButton,
								"data-control": "hall-gear",
								"data-active": sheet === "character" || void 0,
								onClick: openGear,
								children: [(0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "阁"
								}), t("office.floorGear")]
							}),
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: SectHallOverlay_module_css_default.floorButton,
								"data-control": "hall-settings",
								"data-active": sheet === "settings" || void 0,
								onClick: () => {
									toggleSheet("settings");
								},
								children: [(0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "⚙"
								}), t("office.floorSettings")]
							})
						]
					})
				]
			}), document.body), renderSheet()] });
		}
		//#endregion
		//#region lib/client/TeamUiBoundary.js
		/** Renderer guard for the hall/plan UI: a bad staged plan must not kill DSH. */
		var TeamUiBoundary = class extends react.Component {
			state = {};
			static getDerivedStateFromError(error) {
				return { error: error instanceof Error ? error.message : String(error) };
			}
			componentDidCatch(error, info) {
				console.error("agent-teams UI error", error, info.componentStack);
			}
			render() {
				if (this.state.error !== void 0) return (0, react_jsx_runtime.jsxs)("div", {
					style: {
						position: "fixed",
						right: 16,
						bottom: 16,
						zIndex: 13e3,
						maxWidth: 360,
						padding: 12,
						border: "1px solid #a55",
						borderRadius: 8,
						background: "#1d232c",
						color: "#ffd7d7",
						fontSize: 12
					},
					children: [
						"宗门界面加载失败：",
						this.state.error,
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							style: { marginLeft: 8 },
							onClick: () => {
								this.setState({ error: void 0 });
							},
							children: "重试"
						})
					]
				});
				return this.props.children;
			}
		};
		//#endregion
		//#region lib/client/workspace-state.js
		function createWorkspaceState() {
			let snapshot = {
				statuses: /* @__PURE__ */ new Map(),
				history: /* @__PURE__ */ new Map(),
				selected: /* @__PURE__ */ new Map()
			};
			const listeners = /* @__PURE__ */ new Set();
			const publish = (next) => {
				snapshot = next;
				for (const listener of listeners) listener();
			};
			return {
				getSnapshot: () => snapshot,
				subscribe: (listener) => {
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				},
				status(session, status) {
					if (snapshot.statuses.get(session) === status) return;
					publish({
						...snapshot,
						statuses: new Map(snapshot.statuses).set(session, status)
					});
				},
				select(session, team) {
					if (snapshot.selected.get(session) === team) return;
					publish({
						...snapshot,
						selected: new Map(snapshot.selected).set(session, team)
					});
				},
				remember(session, data) {
					const owner = data.captainSessionId || session;
					if (owner !== session) return;
					publish({
						...snapshot,
						history: new Map(snapshot.history).set(`${owner}:${data.teamId}`, {
							...data,
							captainSessionId: owner
						}),
						selected: new Map(snapshot.selected).set(owner, data.teamId)
					});
				}
			};
		}
		/** Records restored at mount never reopen a closed tab; new teams are announced once. */
		function createTeamDiscovery() {
			let restored = false;
			let known = /* @__PURE__ */ new Set();
			return (teams) => {
				const added = restored ? teams.find((team) => !known.has(team.teamId))?.teamId : void 0;
				known = new Set(teams.map((team) => team.teamId));
				restored = true;
				return added;
			};
		}
		//#endregion
		//#region \0dsh-css:F:\MyApp\eternal\dsh-pixel-team\src\client\WorkspaceActivity.module.css.mjs
		const css = ".yEiwqG_root{--dsw-alias-state-business-primary:light-dark(#2866d7,#82b4ff);height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 78%, var(--dsw-alias-bg-base));font-variant-numeric:tabular-nums;flex-direction:column;font-family:inherit;display:flex;position:relative;overflow:hidden;container:yEiwqG_team-workspace/inline-size}.yEiwqG_content{box-sizing:border-box;scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:color-mix(in srgb, var(--dsw-alias-label-secondary) 45%, transparent) transparent;flex:0 auto;width:100%;max-width:1400px;min-height:0;margin:0 auto;padding:10px 12px 12px;overflow:auto}.yEiwqG_content::-webkit-scrollbar{width:9px;height:9px}.yEiwqG_content::-webkit-scrollbar-thumb{background:color-mix(in srgb, var(--dsw-alias-label-secondary) 42%, transparent);border-radius:8px}.yEiwqG_content::-webkit-scrollbar-thumb:hover{background:color-mix(in srgb, var(--dsw-alias-label-secondary) 62%, transparent)}.yEiwqG_content::-webkit-scrollbar-track{background:0 0}.yEiwqG_stage{box-sizing:border-box;flex-direction:column;flex:auto;justify-content:center;min-height:0;padding:6px 8px 8px;display:flex;position:relative;overflow:hidden}.yEiwqG_stageError{z-index:7;border:1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 45%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 92%, transparent);color:var(--dsw-alias-label-primary);border-radius:9px;flex-wrap:wrap;align-items:center;gap:8px;padding:6px 10px;font-size:11px;line-height:1.5;display:flex;position:absolute;top:8px;left:8px;right:8px;box-shadow:0 4px 16px #00000047}.yEiwqG_stageError>span{flex:160px}.yEiwqG_stageError button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-primary);border-radius:7px;flex:none;padding:3px 9px;font-size:11px}.yEiwqG_stagedRibbon{z-index:4;border:1px solid color-mix(in srgb, var(--dsw-alias-state-business-primary) 45%, var(--dsw-alias-border-l2));background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 94%, transparent);color:var(--dsw-alias-label-secondary);border-radius:999px;align-items:center;gap:8px;padding:5px 8px 5px 12px;font-size:11px;display:inline-flex;position:absolute;bottom:14px;left:50%;transform:translate(-50%);box-shadow:0 6px 20px #00000052}.yEiwqG_stagedRibbon button{border:1px solid var(--dsw-alias-state-business-primary);background:var(--dsw-alias-state-business-primary);color:#fff;border-radius:999px;padding:3px 10px;font-size:11px;font-weight:600}.yEiwqG_scrim{z-index:3;cursor:default;background:#080c0a38;border:0;padding:0;animation:.14s ease-out yEiwqG_scrimIn;position:absolute;inset:0}@keyframes yEiwqG_scrimIn{0%{opacity:0}to{opacity:1}}.yEiwqG_sheet{z-index:12000;transform:translate(var(--sheet-dx,0px), var(--sheet-dy,0px));border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 82%, transparent);background:var(--dsw-alias-bg-layer-1);resize:both;border-radius:12px;flex-direction:column;width:min(560px,100% - 32px);min-width:280px;max-width:calc(100% - 32px);min-height:180px;max-height:calc(100% - 32px);animation:.16s ease-out yEiwqG_sheetFloatIn;display:flex;position:fixed;bottom:16px;right:16px;overflow:hidden;box-shadow:0 22px 60px #00000085,inset 0 2px #ffffff0a}@keyframes yEiwqG_sheetFloatIn{0%{opacity:0}to{opacity:1}}.yEiwqG_sheet:focus{outline:none}.yEiwqG_sheet::-webkit-resizer{background:linear-gradient(135deg, transparent 0 46%, var(--dsw-alias-label-tertiary) 46% 52%, transparent 52% 62%, var(--dsw-alias-label-tertiary) 62% 68%, transparent 68%)}.yEiwqG_sheetHead{border-bottom:1px solid var(--dsw-alias-border-l2);cursor:move;user-select:none;touch-action:none;background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 65%, var(--dsw-alias-bg-layer-1));flex:none;align-items:center;gap:8px;padding:7px 8px 7px 10px;display:flex}.yEiwqG_sheetGrip{color:var(--dsw-alias-label-tertiary);letter-spacing:-1px;flex:none;font-size:12px;line-height:1}.yEiwqG_sheetTitle{letter-spacing:-.2px;white-space:nowrap;font-size:12px;font-weight:650}.yEiwqG_sheetMeta{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-secondary);flex:auto;font-size:10.5px;overflow:hidden}.yEiwqG_sheetClose{width:24px;height:24px;color:var(--dsw-alias-label-secondary);background:0 0;border:1px solid #0000;border-radius:7px;flex:none;place-items:center;padding:0;font-size:15px;line-height:1;display:grid}.yEiwqG_sheetClose:hover{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l2)}.yEiwqG_sheetBody{scrollbar-width:thin;flex:auto;min-height:0;padding:10px 12px 14px;overflow:auto}.yEiwqG_sheetSection{flex-direction:column;gap:8px;min-height:0;display:flex}.yEiwqG_sheetHint{color:var(--dsw-alias-label-secondary);margin:0;font-size:10.5px;line-height:1.6}.yEiwqG_sheetEmpty{color:var(--dsw-alias-label-secondary);margin:0;padding:18px 4px;font-size:11.5px;line-height:1.7}.yEiwqG_sheetBack{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-primary);border-radius:8px;align-self:flex-start;margin-top:4px;padding:5px 11px;font-size:11px}.yEiwqG_sheetBack:hover{border-color:var(--dsw-alias-state-business-primary)}.yEiwqG_teamList{flex-direction:column;gap:4px;margin:0;padding:0;list-style:none;display:flex}.yEiwqG_teamRow{border:1px solid var(--dsw-alias-border-l2);width:100%;color:var(--dsw-alias-label-primary);text-align:left;background:0 0;border-radius:8px;grid-template-columns:minmax(0,1fr) auto auto;align-items:baseline;gap:8px;padding:6px 9px;font-size:11.5px;display:grid}.yEiwqG_teamRow:hover{border-color:var(--dsw-alias-state-business-primary)}.yEiwqG_teamRow[data-current]{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent)}.yEiwqG_teamRowName{text-overflow:ellipsis;white-space:nowrap;font-weight:600;overflow:hidden}.yEiwqG_teamRowState{color:var(--dsw-alias-label-secondary);font-size:10.5px}.yEiwqG_teamRowCount{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;font-size:10.5px}.yEiwqG_inboxList{flex-direction:column;gap:6px;margin:0;padding:0;list-style:none;display:flex}.yEiwqG_inboxRow{border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 40%, transparent);border-radius:8px;flex-direction:column;gap:2px;padding:6px 9px;font-size:11px;line-height:1.6;display:flex}.yEiwqG_inboxFrom{color:var(--dsw-alias-state-business-primary);font-weight:600}.yEiwqG_inboxText{color:var(--dsw-alias-label-primary);overflow-wrap:anywhere}.yEiwqG_officeHint{z-index:3;border:1px solid color-mix(in srgb, var(--dsw-alias-state-business-primary) 55%, var(--dsw-alias-border-l2));max-width:92%;color:var(--dsw-alias-label-primary);pointer-events:none;background:#141820f0;border-radius:8px;padding:6px 12px;font-size:11px;line-height:16px;animation:.16s ease-out yEiwqG_officeHintIn;position:absolute;bottom:12px;left:50%;transform:translate(-50%);box-shadow:0 6px 18px #00000059}@keyframes yEiwqG_officeHintIn{0%{opacity:0;transform:translate(-50%,4px)}to{opacity:1;transform:translate(-50%)}}.yEiwqG_hallHint{z-index:4;border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 80%, transparent);color:#cbd5e1;letter-spacing:.2px;pointer-events:none;background:#101418b8;border-radius:999px;margin:0;padding:3px 9px;font-size:10px;line-height:15px;position:absolute;bottom:12px;left:12px}.yEiwqG_hallGuide{z-index:5;border:1px solid color-mix(in srgb, #d4af37 45%, var(--dsw-alias-border-l2));color:#e8eef8;background:#12161af0;border-radius:12px;align-items:center;gap:10px;max-width:calc(100% - 24px);padding:7px 8px 7px 12px;font-size:11px;line-height:1.55;animation:.2s ease-out yEiwqG_officeHintIn;display:flex;position:absolute;bottom:14px;left:50%;transform:translate(-50%);box-shadow:0 8px 24px #00000061}.yEiwqG_hallGuide span{flex:auto}.yEiwqG_hallGuide button{color:#ffe9a8;background:#d4af3724;border:1px solid #d4af378c;border-radius:8px;flex:none;padding:4px 9px;font-size:10.5px;font-weight:600}.yEiwqG_hallGuide button:hover{background:#d4af3742}.yEiwqG_heading{flex-wrap:wrap;align-items:center;gap:6px 8px;margin-bottom:8px;display:flex}.yEiwqG_heading img{object-fit:contain;width:26px;height:26px}.yEiwqG_heading h2{letter-spacing:-.4px;margin:0;font-size:15px;font-weight:650}.yEiwqG_heading>span{color:var(--dsw-alias-label-secondary);font-size:11px}.yEiwqG_viewTabs{border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 65%, var(--dsw-alias-bg-base));border-radius:9px;gap:2px;width:fit-content;margin:0 0 0 auto;padding:2px;display:flex}.yEiwqG_viewTabs button{color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-radius:6px;padding:4px 11px;font-size:11px;font-weight:600}.yEiwqG_viewTabs button:hover{color:var(--dsw-alias-label-primary)}.yEiwqG_viewTabs button[aria-selected=true]{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);box-shadow:0 1px 2px #0000002e}.yEiwqG_stagedNotice{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:14px;flex-direction:column;align-items:flex-start;gap:10px;padding:20px;display:flex}.yEiwqG_stagedNotice h3{margin:0;font-size:15px;font-weight:650}.yEiwqG_stagedNotice p{color:var(--dsw-alias-label-secondary);margin:0;font-size:12px;line-height:1.7}.yEiwqG_stagedNotice button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-primary);border-radius:9px;padding:8px 14px;font-size:12px}.yEiwqG_stagedNotice button:hover{border-color:var(--dsw-alias-state-business-primary)}.yEiwqG_teamPicker{align-items:center;gap:6px;min-width:0;margin:0;display:inline-flex}.yEiwqG_teamPickerCaption{color:var(--dsw-alias-label-secondary);white-space:nowrap;font-size:10px}.yEiwqG_teamPickerSelect{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);max-width:230px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:8px;padding:4px 8px;font-size:11px}.yEiwqG_teamPickerSelect:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.yEiwqG_root button{cursor:pointer;font-family:inherit}.yEiwqG_empty button,.yEiwqG_error button{color:inherit}.yEiwqG_root button:active{transform:scale(.98)}.yEiwqG_root button:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:3px}.yEiwqG_empty{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:18px;padding:32px 24px}.yEiwqG_emptyMark{width:44px;height:44px;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 8%, transparent);border-radius:13px;place-items:center;font-size:26px;display:grid}.yEiwqG_empty h3{margin:20px 0 10px;font-size:16px;font-weight:600}.yEiwqG_empty p{max-width:45ch;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:1.8}.yEiwqG_empty button,.yEiwqG_error button{background:var(--dsw-alias-bg-module-platform);border:1px solid var(--dsw-alias-border-l2);border-radius:9px;padding:9px 13px;font-size:12px}.yEiwqG_empty button:hover,.yEiwqG_error button:hover{border-color:var(--dsw-alias-state-business-primary)}.yEiwqG_error{border:1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 30%, var(--dsw-alias-border-l2));background:var(--dsw-alias-bg-layer-1);border-radius:12px;flex-wrap:wrap;align-items:start;gap:12px;margin-bottom:18px;padding:14px;font-size:12px;line-height:1.65;display:flex}.yEiwqG_error>span{flex:180px}.yEiwqG_error button{flex:none}.yEiwqG_skeleton{gap:14px;display:grid}.yEiwqG_skeleton i{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:16px;height:130px;animation:1.8s ease-in-out infinite alternate yEiwqG_breathe}.yEiwqG_skeleton i:first-child{height:74px}.yEiwqG_skeleton i:last-child{animation-delay:.3s}@keyframes yEiwqG_breathe{to{opacity:.45}}@container yEiwqG_team-workspace (width>=720px){.yEiwqG_content{padding:24px 24px 32px}.yEiwqG_heading{margin-bottom:24px}}@media (prefers-reduced-motion:reduce){.yEiwqG_skeleton i{animation:none}.yEiwqG_root button{transition:none}.yEiwqG_sheet,.yEiwqG_scrim,.yEiwqG_hallGuide{animation:none}}.yEiwqG_teamPickerSelect[data-current=true]{color:#4ec98a;background:color-mix(in srgb, #4ec98a 10%, var(--dsw-alias-bg-layer-1));border-color:#4ec98a}";
		const tagId = "dsh-pixel-team/WorkspaceActivity.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-pixel-team";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var WorkspaceActivity_module_css_default = {
			"breathe": "yEiwqG_breathe",
			"content": "yEiwqG_content",
			"empty": "yEiwqG_empty",
			"emptyMark": "yEiwqG_emptyMark",
			"error": "yEiwqG_error",
			"hallGuide": "yEiwqG_hallGuide",
			"hallHint": "yEiwqG_hallHint",
			"heading": "yEiwqG_heading",
			"inboxFrom": "yEiwqG_inboxFrom",
			"inboxList": "yEiwqG_inboxList",
			"inboxRow": "yEiwqG_inboxRow",
			"inboxText": "yEiwqG_inboxText",
			"officeHint": "yEiwqG_officeHint",
			"officeHintIn": "yEiwqG_officeHintIn",
			"root": "yEiwqG_root",
			"scrim": "yEiwqG_scrim",
			"scrimIn": "yEiwqG_scrimIn",
			"sheet": "yEiwqG_sheet",
			"sheetBack": "yEiwqG_sheetBack",
			"sheetBody": "yEiwqG_sheetBody",
			"sheetClose": "yEiwqG_sheetClose",
			"sheetEmpty": "yEiwqG_sheetEmpty",
			"sheetFloatIn": "yEiwqG_sheetFloatIn",
			"sheetGrip": "yEiwqG_sheetGrip",
			"sheetHead": "yEiwqG_sheetHead",
			"sheetHint": "yEiwqG_sheetHint",
			"sheetMeta": "yEiwqG_sheetMeta",
			"sheetSection": "yEiwqG_sheetSection",
			"sheetTitle": "yEiwqG_sheetTitle",
			"skeleton": "yEiwqG_skeleton",
			"stage": "yEiwqG_stage",
			"stageError": "yEiwqG_stageError",
			"stagedNotice": "yEiwqG_stagedNotice",
			"stagedRibbon": "yEiwqG_stagedRibbon",
			"team-workspace": "yEiwqG_team-workspace",
			"teamList": "yEiwqG_teamList",
			"teamPicker": "yEiwqG_teamPicker",
			"teamPickerCaption": "yEiwqG_teamPickerCaption",
			"teamPickerSelect": "yEiwqG_teamPickerSelect",
			"teamRow": "yEiwqG_teamRow",
			"teamRowCount": "yEiwqG_teamRowCount",
			"teamRowName": "yEiwqG_teamRowName",
			"teamRowState": "yEiwqG_teamRowState",
			"viewTabs": "yEiwqG_viewTabs"
		};
		//#endregion
		//#region lib/client/WorkspaceActivity.js
		/** Native workspace content; discovery remains mounted independently of tab lifetime. */
		const TEAM_TAB_KIND = "agent-teams";
		const TEAM_TAB_ID = "dsh-pixel-team/activity";
		/** Persisted history-page preference: progress board vs setup page. */
		const WORKSPACE_VIEW_KEY = "dsh-pixel-team.workspaceView";
		/** Floating panel geometry remembered across opens: offset + user-resized size. */
		const SHEET_RECT_KEY = "dsh-pixel-team.sheetRect";
		function readSheetRect() {
			if (typeof window === "undefined") return {
				x: 0,
				y: 0
			};
			try {
				const raw = window.localStorage.getItem(SHEET_RECT_KEY);
				if (raw === null) return {
					x: 0,
					y: 0
				};
				const parsed = JSON.parse(raw);
				return {
					x: typeof parsed.x === "number" && Number.isFinite(parsed.x) ? parsed.x : 0,
					y: typeof parsed.y === "number" && Number.isFinite(parsed.y) ? parsed.y : 0,
					w: typeof parsed.w === "number" && parsed.w > 200 ? parsed.w : void 0,
					h: typeof parsed.h === "number" && parsed.h > 120 ? parsed.h : void 0
				};
			} catch {
				return {
					x: 0,
					y: 0
				};
			}
		}
		function writeSheetRect(rect) {
			try {
				window.localStorage.setItem(SHEET_RECT_KEY, JSON.stringify(rect));
			} catch {}
		}
		/** Optional host integration is observable so installing/removing it also switches the fallback. */
		function createWorkspaceBridge() {
			let sidebar;
			const listeners = /* @__PURE__ */ new Set();
			return {
				getSnapshot: () => sidebar,
				subscribe: (listener) => {
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				},
				set(value) {
					sidebar = value;
					for (const listener of listeners) listener();
				}
			};
		}
		function ActivitySurface({ bridge, state, ...props }) {
			const sidebar = (0, react.useSyncExternalStore)(bridge.subscribe, bridge.getSnapshot);
			return (0, react_jsx_runtime.jsx)(WorkspaceMonitor, {
				...props,
				sidebar,
				state
			});
		}
		function WorkspaceMonitor({ sessionsList, sidebar, state, t, openMember, openCaptain, modelDirectories, conversationVisible = true }) {
			const current = currentSessionId((0, react.useSyncExternalStore)(sessionsList.subscribe, sessionsList.getSnapshot));
			const snapshots = (0, react.useSyncExternalStore)(subscribeActivitySnapshots, getActivitySnapshotsSnapshot);
			const local = (0, react.useSyncExternalStore)(state.subscribe, state.getSnapshot);
			const sessionTeams = current === void 0 ? [] : snapshots.teams.filter((team) => team.captainSessionId === current);
			const wanted = current === void 0 ? void 0 : local.selected.get(current);
			(0, react.useEffect)(() => {
				ingestCultivation(snapshots.teams, conversationVisible ? current : void 0);
			}, [
				snapshots,
				current,
				conversationVisible
			]);
			const linkedTeam = current === void 0 ? void 0 : [...snapshots.teams, ...snapshots.archivedTeams].find((team) => team.members.some((member) => member.id === current));
			const stagedFallback = sessionTeams.length === 0 ? snapshots.teams.find((team) => team.phase === "staged") : void 0;
			const hallTeam = sessionTeams.find((team) => team.teamId === wanted) ?? sessionTeams[0] ?? linkedTeam ?? stagedFallback;
			const ownerCaptain = hallTeam?.captainSessionId ?? current;
			const historyTeams = ownerCaptain === void 0 ? [] : snapshots.archivedTeams.filter((team) => team.captainSessionId === ownerCaptain);
			const targets = (0, react.useSyncExternalStore)(subscribeActivityMonitorTargets, getActivityMonitorTargetsSnapshot);
			const currentTargets = (0, react.useMemo)(() => targets.filter((target) => target.sessionId === current), [targets, current]);
			const discover = (0, react.useMemo)(() => createTeamDiscovery(), [current]);
			(0, react.useEffect)(() => {
				if (current === void 0) return;
				state.status(current, "loading");
				const controller = startActivityPolling(currentTargets, {
					discoverySessionId: current,
					onStatus(status) {
						state.status(current, status);
					},
					publishSnapshots(update) {
						updateActivitySnapshots(update);
						if (update.teams === void 0) return;
						const added = discover(update.teams.filter((team) => team.captainSessionId === current));
						if (added === void 0) return;
						if (!shouldRevealTeam({
							source: "discovered",
							sessionId: current,
							onScreenSessionId: sidebar?.mounted.getSnapshot() ?? current,
							teamId: added,
							expanded: sidebar?.isExpanded() ?? false
						})) return;
						state.select(current, added);
					}
				});
				return () => {
					controller.stop();
				};
			}, [
				current,
				currentTargets,
				discover,
				sidebar,
				state
			]);
			(0, react.useEffect)(() => {
				const open = (event) => {
					if (current === void 0) return;
					if (sidebar !== void 0 && sidebar.mounted.getSnapshot() !== current) return;
					const data = event.detail;
					if (data?.captainSessionId && data.captainSessionId !== current) return;
					if (data?.teamId) state.remember(current, data);
				};
				window.addEventListener(OPEN_PANEL_EVENT, open);
				return () => {
					window.removeEventListener(OPEN_PANEL_EVENT, open);
				};
			}, [
				current,
				sidebar,
				state
			]);
			(0, react.useEffect)(() => {
				const reveal = (event) => {
					const detail = event.detail;
					const teamId = detail?.teamId;
					const session = current ?? detail?.sessionId;
					if (teamId === void 0 || session === void 0) return;
					state.select(session, teamId);
					window.dispatchEvent(new CustomEvent(OPEN_HALL_SHEET_EVENT, { detail: { action: "config" } }));
				};
				window.addEventListener(TEAM_CREATED_EVENT, reveal);
				return () => {
					window.removeEventListener(TEAM_CREATED_EVENT, reveal);
				};
			}, [
				current,
				sidebar,
				state
			]);
			return (0, react_jsx_runtime.jsx)(TeamUiBoundary, { children: (0, react_jsx_runtime.jsx)(SectHallOverlay, {
				team: hallTeam,
				history: historyTeams,
				t,
				sessionId: current,
				modelDirectories,
				openMember,
				openCaptain
			}) });
		}
		/** The team tab: the sect hall is the page, its wall facilities are the menu. */
		function WorkspaceActivity({ sessionId, useTabInfo, t, state, modelDirectories, openMember }) {
			const { tab } = useTabInfo();
			const snapshots = (0, react.useSyncExternalStore)(subscribeActivitySnapshots, getActivitySnapshotsSnapshot);
			const local = (0, react.useSyncExternalStore)(state.subscribe, state.getSnapshot);
			const [retry, setRetry] = (0, react.useState)(0);
			const [view, setView] = (0, react.useState)(() => {
				if (typeof window === "undefined") return "board";
				try {
					return window.localStorage.getItem(WORKSPACE_VIEW_KEY) === "config" ? "config" : "board";
				} catch {
					return "board";
				}
			});
			const setWorkspaceView = (next) => {
				setView(next);
				try {
					window.localStorage.setItem(WORKSPACE_VIEW_KEY, next);
				} catch {}
			};
			const [sheet, setSheet] = (0, react.useState)();
			const sheetRef = (0, react.useRef)(null);
			const rootRef = (0, react.useRef)(null);
			const [sheetRight, setSheetRight] = (0, react.useState)(16);
			(0, react.useEffect)(() => {
				if (sheet === void 0) return;
				const measure = () => {
					const root = rootRef.current;
					const paneLeft = root === null ? window.innerWidth : root.getBoundingClientRect().left;
					setSheetRight(Math.max(16, Math.round(window.innerWidth - paneLeft + 16)));
				};
				measure();
				window.addEventListener("resize", measure);
				return () => {
					window.removeEventListener("resize", measure);
				};
			}, [sheet]);
			const [sheetOffset, setSheetOffset] = (0, react.useState)(() => {
				const rect = readSheetRect();
				return {
					x: rect.x,
					y: rect.y
				};
			});
			const [sheetSize, setSheetSize] = (0, react.useState)(() => {
				const rect = readSheetRect();
				return {
					w: rect.w,
					h: rect.h
				};
			});
			const sheetOffsetRef = (0, react.useRef)(sheetOffset);
			sheetOffsetRef.current = sheetOffset;
			const sheetSizeRef = (0, react.useRef)(sheetSize);
			sheetSizeRef.current = sheetSize;
			const sheetDrag = (0, react.useRef)(null);
			const beginSheetDrag = (event) => {
				if (event.target.closest("button") !== null) return;
				const panel = sheetRef.current;
				if (panel === null) return;
				event.preventDefault();
				const pr = panel.getBoundingClientRect();
				const viewportWidth = window.innerWidth;
				const viewportHeight = window.innerHeight;
				const relLeft = pr.left;
				const relTop = pr.top;
				const minX = sheetOffset.x + (8 - relLeft);
				const maxX = sheetOffset.x + (viewportWidth - 8 - (relLeft + pr.width));
				const minY = sheetOffset.y + (8 - relTop);
				const maxY = sheetOffset.y + (viewportHeight - 8 - (relTop + pr.height));
				const clampAxis = (low, high, base) => high < low ? [base, base] : [low, high];
				const [clampedMinX, clampedMaxX] = clampAxis(minX, maxX, sheetOffset.x);
				const [clampedMinY, clampedMaxY] = clampAxis(minY, maxY, sheetOffset.y);
				sheetDrag.current = {
					startX: event.clientX,
					startY: event.clientY,
					baseX: sheetOffset.x,
					baseY: sheetOffset.y,
					minX: clampedMinX,
					maxX: clampedMaxX,
					minY: clampedMinY,
					maxY: clampedMaxY
				};
				const onMove = (moveEvent) => {
					const drag = sheetDrag.current;
					if (drag === null) return;
					const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
					setSheetOffset({
						x: clamp(drag.baseX + (moveEvent.clientX - drag.startX), drag.minX, drag.maxX),
						y: clamp(drag.baseY + (moveEvent.clientY - drag.startY), drag.minY, drag.maxY)
					});
				};
				const onUp = () => {
					sheetDrag.current = null;
					window.removeEventListener("pointermove", onMove);
					window.removeEventListener("pointerup", onUp);
					writeSheetRect({
						...sheetOffsetRef.current,
						...sheetSizeRef.current
					});
				};
				window.addEventListener("pointermove", onMove);
				window.addEventListener("pointerup", onUp);
			};
			(0, react.useEffect)(() => {
				if (sheet === void 0) return;
				const frame = window.requestAnimationFrame(() => {
					const panel = sheetRef.current;
					if (panel === null) return;
					const pr = panel.getBoundingClientRect();
					const vw = window.innerWidth;
					const vh = window.innerHeight;
					if (!(pr.bottom > 0 && pr.top < vh && pr.right > 0 && pr.left < vw)) {
						setSheetOffset({
							x: 0,
							y: 0
						});
						return;
					}
					setSheetOffset((current) => {
						const lowX = current.x + (8 - pr.left);
						const highX = current.x + (vw - 8 - pr.right);
						const lowY = current.y + (8 - pr.top);
						const highY = current.y + (vh - 8 - pr.bottom);
						return {
							x: highX < lowX ? current.x : Math.min(highX, Math.max(lowX, current.x)),
							y: highY < lowY ? current.y : Math.min(highY, Math.max(lowY, current.y))
						};
					});
				});
				return () => {
					window.cancelAnimationFrame(frame);
				};
			}, [sheet]);
			(0, react.useEffect)(() => {
				const panel = sheetRef.current;
				if (sheet === void 0 || panel === null || typeof ResizeObserver === "undefined") return;
				let timer;
				const observer = new ResizeObserver(() => {
					if (timer !== void 0) window.clearTimeout(timer);
					timer = window.setTimeout(() => {
						const rect = panel.getBoundingClientRect();
						const next = {
							w: Math.round(rect.width),
							h: Math.round(rect.height)
						};
						setSheetSize((current) => Math.abs((current.w ?? 0) - next.w) > 1 || Math.abs((current.h ?? 0) - next.h) > 1 ? next : current);
						writeSheetRect({
							...sheetOffsetRef.current,
							...next
						});
					}, 400);
				});
				observer.observe(panel);
				return () => {
					if (timer !== void 0) window.clearTimeout(timer);
					observer.disconnect();
				};
			}, [sheet]);
			(0, react.useEffect)(() => {
				if (sheet === void 0) return;
				const frame = window.requestAnimationFrame(() => {
					sheetRef.current?.focus();
				});
				return () => {
					window.cancelAnimationFrame(frame);
				};
			}, [sheet]);
			(0, react.useEffect)(() => {
				if (sheet === void 0) return;
				const close = (event) => {
					if (event.key === "Escape") setSheet(void 0);
				};
				window.addEventListener("keydown", close);
				return () => {
					window.removeEventListener("keydown", close);
				};
			}, [sheet]);
			(0, react.useEffect)(() => {
				const open = (event) => {
					const action = event.detail?.action;
					if (action !== void 0) setSheet(action);
				};
				window.addEventListener(OPEN_HALL_SHEET_EVENT, open);
				return () => {
					window.removeEventListener(OPEN_HALL_SHEET_EVENT, open);
				};
			}, []);
			const live = snapshots.teams.filter((team) => team.captainSessionId === sessionId);
			const archived = snapshots.archivedTeams.filter((team) => team.captainSessionId === sessionId && !live.some((item) => item.teamId === team.teamId));
			const historic = [...local.history.values()].filter((team) => team.captainSessionId === sessionId && !live.some((item) => item.teamId === team.teamId) && !archived.some((item) => item.teamId === team.teamId)).map((team) => historicCardTeam(team, sessionId));
			const records = [
				...live,
				...archived,
				...historic
			];
			const linked = records.length === 0 ? [...snapshots.teams, ...snapshots.archivedTeams].find((team) => team.members.some((member) => member.id === sessionId)) : void 0;
			const candidates = linked === void 0 ? records : [linked];
			const selected = candidates.find((team) => team.teamId === local.selected.get(sessionId)) ?? candidates[0];
			const liveSelected = selected !== void 0 && (live.includes(selected) || snapshots.teams.some((team) => team.teamId === selected.teamId));
			const history = selected !== void 0 && !liveSelected;
			const status = local.statuses.get(sessionId) ?? "loading";
			const completedCount = selected === void 0 ? 0 : selected.tasks.filter((task) => task.status === "completed").length;
			(0, react.useEffect)(() => {
				const onCreated = (event) => {
					const detail = event.detail;
					if (detail?.teamId === void 0) return;
					state.select(detail.sessionId ?? sessionId, detail.teamId);
					setSheet("config");
				};
				window.addEventListener(TEAM_CREATED_EVENT, onCreated);
				return () => {
					window.removeEventListener(TEAM_CREATED_EVENT, onCreated);
				};
			}, [sessionId, state]);
			const lastTeamRef = (0, react.useRef)(void 0);
			const lastPhaseRef = (0, react.useRef)(void 0);
			(0, react.useEffect)(() => {
				if (selected === void 0 || !liveSelected) return;
				if (lastTeamRef.current !== selected.teamId) {
					lastTeamRef.current = selected.teamId;
					setSheet(selected.phase === "staged" ? "config" : void 0);
				} else if (lastPhaseRef.current === "staged" && selected.phase === "running") setSheet(void 0);
				lastPhaseRef.current = selected.phase;
			}, [
				liveSelected,
				selected?.teamId,
				selected?.phase
			]);
			(0, react.useEffect)(() => {
				if (retry === 0 || !tab.visible) return;
				const controller = startActivityPolling([], {
					discoverySessionId: sessionId,
					onStatus: (value) => state.status(sessionId, value)
				});
				controller.firstTick.finally(() => {
					controller.stop();
				});
				return () => {
					controller.stop();
				};
			}, [
				retry,
				sessionId,
				state,
				tab.visible
			]);
			const backToChat = () => {
				tab.actions.close();
				requestAnimationFrame(() => document.querySelector("[data-composer-card] [contenteditable=\"true\"][role=\"textbox\"], [data-composer-card] textarea")?.focus());
			};
			const sheetTitle = (kind) => t(kind === "board" ? "workspace.tabBoard" : kind === "config" ? "workspace.tabConfig" : kind === "teams" ? "workspace.switchTeam" : "workspace.inbox");
			const sheetBody = (kind, team) => {
				if (team === void 0) return null;
				if (kind === "config") return live.includes(team) && team.phase === "staged" ? (0, react_jsx_runtime.jsx)(StagingPlanEditor, {
					team,
					modelDirectory: modelDirectories.directoryFor(sessionId),
					onContinuePlanning: backToChat,
					onDiscarded: backToChat,
					t
				}) : (0, react_jsx_runtime.jsx)(TeamConfigPanel, {
					team,
					t
				});
				if (kind === "board") {
					if (live.includes(team) && team.phase === "staged") return (0, react_jsx_runtime.jsxs)("section", {
						className: WorkspaceActivity_module_css_default.stagedNotice,
						"data-staged-notice": true,
						children: [
							(0, react_jsx_runtime.jsx)("h3", { children: t("config.stagedTitle") }),
							(0, react_jsx_runtime.jsx)("p", { children: t("config.stagedBody") }),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setSheet("config");
								},
								children: t("config.openConfig")
							})
						]
					});
					return (0, react_jsx_runtime.jsx)(TeamSection, {
						team,
						workspace: true,
						viewingSessionId: sessionId,
						historic: !live.includes(team),
						modelDirectory: team.phase === "staged" ? modelDirectories.directoryFor(sessionId) : void 0,
						onContinuePlanning: backToChat,
						onDiscarded: backToChat,
						onNavigate: openMember,
						t
					}, `${sessionId}:${team.teamId}`);
				}
				if (kind === "teams") return (0, react_jsx_runtime.jsxs)("div", {
					className: WorkspaceActivity_module_css_default.sheetSection,
					children: [
						(0, react_jsx_runtime.jsx)("p", {
							className: WorkspaceActivity_module_css_default.sheetHint,
							children: t("office.teamsHint")
						}),
						(0, react_jsx_runtime.jsx)("ul", {
							className: WorkspaceActivity_module_css_default.teamList,
							children: records.map((team) => {
								const current = selected !== void 0 && team.teamId === selected.teamId;
								const isLive = live.includes(team);
								const done = team.tasks.filter((task) => task.status === "completed").length;
								const stateLabel = isLive ? t(team.phase === "staged" ? "captain.state.staged" : team.halted === true ? "team.stopped" : done === team.tasks.length && team.tasks.length > 0 ? "team.state.completed" : "team.state.running") : t("workspace.history");
								return (0, react_jsx_runtime.jsx)("li", { children: (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: WorkspaceActivity_module_css_default.teamRow,
									"data-current": current || void 0,
									"aria-current": current ? "true" : void 0,
									onClick: () => {
										state.select(sessionId, team.teamId);
										setSheet(void 0);
									},
									children: [
										(0, react_jsx_runtime.jsx)("span", {
											className: WorkspaceActivity_module_css_default.teamRowName,
											children: team.name
										}),
										(0, react_jsx_runtime.jsx)("span", {
											className: WorkspaceActivity_module_css_default.teamRowState,
											children: stateLabel
										}),
										(0, react_jsx_runtime.jsx)("span", {
											className: WorkspaceActivity_module_css_default.teamRowCount,
											children: t("team.stats.completed", {
												completed: done,
												total: team.tasks.length
											})
										})
									]
								}) }, team.teamId);
							})
						}),
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: WorkspaceActivity_module_css_default.sheetBack,
							onClick: backToChat,
							children: t("workspace.back")
						})
					]
				});
				if (team.captainInbox.length === 0) return (0, react_jsx_runtime.jsx)("p", {
					className: WorkspaceActivity_module_css_default.sheetEmpty,
					children: t("workspace.inboxEmpty")
				});
				return (0, react_jsx_runtime.jsxs)("div", {
					className: WorkspaceActivity_module_css_default.sheetSection,
					children: [(0, react_jsx_runtime.jsx)("p", {
						className: WorkspaceActivity_module_css_default.sheetHint,
						children: t("office.inboxCount", { count: team.captainInbox.length })
					}), (0, react_jsx_runtime.jsx)("ul", {
						className: WorkspaceActivity_module_css_default.inboxList,
						children: team.captainInbox.map((message, index) => (0, react_jsx_runtime.jsxs)("li", {
							className: WorkspaceActivity_module_css_default.inboxRow,
							children: [(0, react_jsx_runtime.jsx)("span", {
								className: WorkspaceActivity_module_css_default.inboxFrom,
								children: message.from
							}), (0, react_jsx_runtime.jsx)("span", {
								className: WorkspaceActivity_module_css_default.inboxText,
								children: message.content
							})]
						}, `${index}:${message.from}`))
					})]
				});
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				ref: rootRef,
				className: WorkspaceActivity_module_css_default.root,
				"data-agent-teams-workspace": true,
				"data-session-id": sessionId,
				children: [
					selected !== void 0 && liveSelected && status === "error" && (0, react_jsx_runtime.jsxs)("div", {
						className: WorkspaceActivity_module_css_default.stageError,
						role: "alert",
						children: [(0, react_jsx_runtime.jsx)("span", { children: t("workspace.error") }), (0, react_jsx_runtime.jsx)("button", {
							onClick: () => setRetry((value) => value + 1),
							children: t("workspace.retry")
						})]
					}),
					selected === void 0 ? status === "loading" ? (0, react_jsx_runtime.jsx)("div", {
						className: WorkspaceActivity_module_css_default.content,
						children: (0, react_jsx_runtime.jsxs)("div", {
							className: WorkspaceActivity_module_css_default.skeleton,
							role: "status",
							"aria-label": t("workspace.loading"),
							children: [
								(0, react_jsx_runtime.jsx)("i", {}),
								(0, react_jsx_runtime.jsx)("i", {}),
								(0, react_jsx_runtime.jsx)("i", {})
							]
						})
					}) : (0, react_jsx_runtime.jsx)("div", {
						className: WorkspaceActivity_module_css_default.content,
						children: (0, react_jsx_runtime.jsxs)("section", {
							className: WorkspaceActivity_module_css_default.empty,
							children: [
								(0, react_jsx_runtime.jsx)("span", {
									className: WorkspaceActivity_module_css_default.emptyMark,
									"aria-hidden": true,
									children: "↳"
								}),
								(0, react_jsx_runtime.jsx)("h3", { children: t("workspace.emptyTitle") }),
								(0, react_jsx_runtime.jsx)("p", { children: t("workspace.emptyBody") }),
								(0, react_jsx_runtime.jsx)("button", {
									onClick: backToChat,
									children: t("workspace.back")
								})
							]
						})
					}) : liveSelected ? (0, react_jsx_runtime.jsx)("div", {
						className: WorkspaceActivity_module_css_default.content,
						"data-workspace-board": true,
						children: (0, react_jsx_runtime.jsx)(TeamSection, {
							team: selected,
							t,
							workspace: true,
							viewingSessionId: sessionId,
							onNavigate: (_parent, child) => {
								openMember(selected.captainSessionId, child);
							},
							onContinuePlanning: backToChat,
							onDiscarded: backToChat
						})
					}) : (0, react_jsx_runtime.jsxs)("div", {
						className: WorkspaceActivity_module_css_default.content,
						children: [
							(0, react_jsx_runtime.jsxs)("header", {
								className: WorkspaceActivity_module_css_default.heading,
								children: [
									(0, react_jsx_runtime.jsx)("img", {
										src: LEAD_ART,
										alt: "",
										"aria-hidden": true
									}),
									(0, react_jsx_runtime.jsx)("h2", { children: t("app.title") }),
									(0, react_jsx_runtime.jsx)("span", { children: t("workspace.title") }),
									records.length > 0 && (0, react_jsx_runtime.jsxs)("label", {
										className: WorkspaceActivity_module_css_default.teamPicker,
										children: [(0, react_jsx_runtime.jsx)("span", {
											className: WorkspaceActivity_module_css_default.teamPickerCaption,
											children: t("workspace.switchTeam")
										}), (0, react_jsx_runtime.jsx)("select", {
											className: WorkspaceActivity_module_css_default.teamPickerSelect,
											value: selected.teamId,
											"aria-label": t("workspace.switchTeam"),
											"data-control": "team-picker",
											"data-current": history ? void 0 : "true",
											onChange: (event) => {
												state.select(sessionId, event.target.value);
											},
											children: records.map((team) => (0, react_jsx_runtime.jsx)("option", {
												value: team.teamId,
												children: live.includes(team) ? team.name : `${team.name} · ${t("workspace.history")}`
											}, team.teamId))
										})]
									}),
									(0, react_jsx_runtime.jsxs)("div", {
										className: WorkspaceActivity_module_css_default.viewTabs,
										role: "tablist",
										"data-control": "workspace-views",
										children: [(0, react_jsx_runtime.jsx)("button", {
											type: "button",
											role: "tab",
											"aria-selected": view === "board",
											"data-view": "board",
											onClick: () => {
												setWorkspaceView("board");
											},
											children: t("workspace.tabBoard")
										}), (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											role: "tab",
											"aria-selected": view === "config",
											"data-view": "config",
											onClick: () => {
												setWorkspaceView("config");
											},
											children: t("workspace.tabConfig")
										})]
									})
								]
							}),
							status === "error" && (0, react_jsx_runtime.jsxs)("div", {
								className: WorkspaceActivity_module_css_default.error,
								role: "alert",
								children: [(0, react_jsx_runtime.jsx)("span", { children: t("workspace.error") }), (0, react_jsx_runtime.jsx)("button", {
									onClick: () => setRetry((value) => value + 1),
									children: t("workspace.retry")
								})]
							}),
							view === "config" ? selected.phase === "staged" ? (0, react_jsx_runtime.jsx)(StagingPlanEditor, {
								team: selected,
								modelDirectory: modelDirectories.directoryFor(sessionId),
								onContinuePlanning: backToChat,
								onDiscarded: backToChat,
								t
							}) : (0, react_jsx_runtime.jsx)(TeamConfigPanel, {
								team: selected,
								t
							}) : selected.phase === "staged" ? (0, react_jsx_runtime.jsxs)("section", {
								className: WorkspaceActivity_module_css_default.stagedNotice,
								"data-staged-notice": true,
								children: [
									(0, react_jsx_runtime.jsx)("h3", { children: t("config.stagedTitle") }),
									(0, react_jsx_runtime.jsx)("p", { children: t("config.stagedBody") }),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setWorkspaceView("config");
										},
										children: t("config.openConfig")
									})
								]
							}) : (0, react_jsx_runtime.jsx)(TeamSection, {
								team: selected,
								historic: history,
								viewingSessionId: sessionId,
								onContinuePlanning: backToChat,
								onDiscarded: backToChat,
								onNavigate: openMember,
								t
							}, `${sessionId}:${selected.teamId}`)
						]
					}),
					selected !== void 0 && sheet !== void 0 && typeof document !== "undefined" && (0, react_dom.createPortal)((0, react_jsx_runtime.jsxs)("aside", {
						ref: sheetRef,
						className: WorkspaceActivity_module_css_default.sheet,
						"data-sheet": sheet,
						role: "dialog",
						"aria-modal": "false",
						"aria-label": sheetTitle(sheet),
						tabIndex: -1,
						style: {
							"--sheet-dx": `${sheetOffset.x}px`,
							"--sheet-dy": `${sheetOffset.y}px`,
							right: `${sheetRight}px`,
							...sheetSize.w === void 0 ? {} : { width: `${sheetSize.w}px` },
							...sheetSize.h === void 0 ? {} : { height: `${sheetSize.h}px` }
						},
						children: [(0, react_jsx_runtime.jsxs)("header", {
							className: WorkspaceActivity_module_css_default.sheetHead,
							onPointerDown: beginSheetDrag,
							children: [
								(0, react_jsx_runtime.jsx)("span", {
									className: WorkspaceActivity_module_css_default.sheetGrip,
									"aria-hidden": true,
									children: "⠿"
								}),
								(0, react_jsx_runtime.jsx)("span", {
									className: WorkspaceActivity_module_css_default.sheetTitle,
									children: sheetTitle(sheet)
								}),
								(0, react_jsx_runtime.jsxs)("span", {
									className: WorkspaceActivity_module_css_default.sheetMeta,
									children: [
										selected.name,
										" · ",
										t("team.stats.completed", {
											completed: completedCount,
											total: selected.tasks.length
										})
									]
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: WorkspaceActivity_module_css_default.sheetClose,
									"data-control": "sheet-close",
									"aria-label": t("office.closePanel"),
									title: t("office.closePanel"),
									onClick: () => {
										setSheet(void 0);
									},
									children: "×"
								})
							]
						}), (0, react_jsx_runtime.jsx)("div", {
							className: WorkspaceActivity_module_css_default.sheetBody,
							children: sheetBody(sheet, selected)
						})]
					}), document.body)
				]
			});
		}
		//#endregion
		//#region lib/client/agent-teams-card-definition.js
		/**
		* AgentTeams conversation card: a lightweight in-conversation summary shown
		* when a team is created — the captain's name, the member roster with 道途
		* avatars, and an entry point that re-activates the top-right activity
		* panel (useful after the floater was closed, or when re-opening an old
		* session for review).
		*
		* The fold anchors to the Harness's durable `tool/call` + `tool/result`
		* records for `agent_teams_create`. Those are first-party session events, so
		* the card survives restarts without writing an out-of-repo event type.
		* @module dsh-agent-teams/client/card
		*/
		/**
		* Fold a team name the way the host's `sanitizeKey` does, minus the host's
		* digest fallback. The host keeps Unicode letters and digits, so an ASCII-only
		* client derivation turned every CJK name into the shared `team` key and the
		* card could never match its live team (issue #203). Names with no letters or
		* digits at all, and names longer than the host's key limit, still need the
		* host's canonical id; the create result now carries it.
		* @param name - the create call's team name.
		* @returns the host-shaped key for the name.
		*/
		function teamKeyFromName(name) {
			const cleaned = name.normalize("NFC").trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
			return cleaned === "" ? "team" : cleaned;
		}
		/** Parse the only create-call fields the historic card owns. */
		function parseAgentTeamsCreateArgs(value) {
			try {
				const parsed = JSON.parse(value);
				if (typeof parsed !== "object" || parsed === null || !("name" in parsed) || typeof parsed.name !== "string") return;
				const name = parsed.name.trim();
				if (name === "") return void 0;
				return {
					teamId: teamKeyFromName(name),
					name
				};
			} catch {
				return;
			}
		}
		/**
		* Read the canonical identity the host attaches to the `agent_teams_create`
		* result. Records written before the host published it carry no metadata, so
		* an absent or malformed payload falls back to the client derivation.
		* @param meta - the durable `tool/result` metadata payload, if any.
		* @returns the canonical identity, or `undefined` when the host published none.
		*/
		function parseAgentTeamsCreateResult(meta) {
			if (typeof meta !== "object" || meta === null) return void 0;
			const record = meta;
			const teamId = typeof record.team_id === "string" ? record.team_id.trim() : "";
			if (teamId === "") return void 0;
			const captainSessionId = typeof record.captain_session_id === "string" ? record.captain_session_id.trim() : "";
			const members = [];
			if (Array.isArray(record.members)) for (const entry of record.members) {
				if (typeof entry !== "object" || entry === null) continue;
				const member = entry;
				const name = typeof member.name === "string" ? member.name : "";
				if (name === "") continue;
				members.push({
					id: typeof member.id === "string" ? member.id : "",
					name,
					role: typeof member.role === "string" ? member.role : ""
				});
			}
			return {
				teamId,
				captainSessionId,
				members
			};
		}
		/**
		* Read the canonical team id out of a `tool/result` recorded before the host
		* published {@link parseAgentTeamsCreateResult}'s metadata. Both historic
		* renderings carry it and have been stable since they were introduced:
		* `Team "<name>" created (id <canonical>) under <state_dir>. You are the
		* captain.` and the staged `Team "<name>" plan created under <state_dir>. It is
		* staged: …`, whose `state_dir` ends in the canonical id. This is the only
		* legacy path for names the client cannot re-derive (host digest fallback,
		* over-long names). Matches are taken right-to-left because the team name sits
		* in front of the canonical segment and may itself contain a look-alike.
		* @param text - the concatenated text blocks of one successful create result.
		* @returns the canonical id, or `undefined` when the text carries none.
		*/
		function teamIdFromCreateResultText(text) {
			const created = [...text.matchAll(/" created \(id ([^()\s]+)\) under /gu)].at(-1)?.[1];
			if (created !== void 0 && created !== "") return created;
			const stagedPath = [...text.matchAll(/plan created under (.+?)\. It is staged: /gu)].at(-1)?.[1];
			if (stagedPath === void 0) return void 0;
			const segment = stagedPath.split(/[\\/]/u).filter((part) => part !== "").at(-1);
			return segment === void 0 || segment === "" ? void 0 : segment;
		}
		/** Durable first-party tool events folded into one keyed Chat node. */
		const agentTeamsCardDefinition = {
			kind: "agent-teams",
			target: "chat",
			match: (event) => {
				if (event.type === "tool/call" && event.data.name === "agent_teams_create") return parseAgentTeamsCreateArgs(event.data.arguments) === void 0 ? null : {
					id: String(event.data.callId),
					role: "start"
				};
				if (event.type === "tool/result" && event.data.message.source.kind === "tool") return {
					id: String(event.data.message.source.callId),
					role: "update"
				};
				return null;
			},
			start: (_context, match) => {
				if (match.event.type !== "tool/call") throw new Error("agent-teams card start requires agent_teams_create tool/call");
				const parsed = parseAgentTeamsCreateArgs(match.event.data.arguments);
				if (parsed === void 0) throw new Error("agent-teams card start requires valid create arguments");
				return {
					...parsed,
					accepted: false,
					captainSessionId: "",
					members: []
				};
			},
			update: (context, match) => {
				if (match.event.type !== "tool/result") return context.state;
				if (match.event.data.error !== void 0 || toolResultFailed(match.event.data.message)) return context.state;
				const canonical = parseAgentTeamsCreateResult(match.event.data.meta);
				const legacyId = canonical === void 0 ? teamIdFromCreateResultText(resultText(match.event.data.message)) : void 0;
				if (canonical === void 0 && legacyId === void 0) return {
					...context.state,
					accepted: true
				};
				return {
					...context.state,
					accepted: true,
					teamId: canonical?.teamId ?? legacyId ?? context.state.teamId,
					captainSessionId: canonical?.captainSessionId ?? "",
					members: canonical?.members ?? []
				};
			},
			buildViewNode: (context) => {
				if (context.start === void 0) return null;
				const state = context.state;
				if (!state.accepted) return null;
				return {
					key: context.key,
					kind: "agent-teams",
					id: context.id,
					target: "chat",
					anchorSeq: context.start.event.seq,
					location: context.start.location,
					visibility: "visible",
					data: {
						teamId: state.teamId,
						captainSessionId: state.captainSessionId,
						teamName: state.name,
						members: state.members
					}
				};
			}
		};
		/** Concatenate the text blocks of one durable tool-result message. */
		function resultText(message) {
			return message.content.filter((block) => typeof block === "object" && block !== null && "type" in block && block.type === "text" && "text" in block && typeof block.text === "string").map((block) => block.text).join("\n");
		}
		/** V4 tool-role results carry isError directly; older logs nest tool-result blocks. */
		function toolResultFailed(message) {
			return message.isError === true || message.content.some((block) => typeof block === "object" && block !== null && "type" in block && block.type === "tool-result" && "isError" in block && block.isError === true);
		}
		/** Keep summaries tied to the create turn, including multiple teams in one turn. */
		function teamCardsForTurn(nodes, turn) {
			return [...nodes].filter((node) => node.kind === "agent-teams" && (node.location.kind === "turn" || node.location.kind === "step") && node.location.turn.turn === turn);
		}
		//#endregion
		//#region lib/client/TeamChatEntry.js
		/** Session-owned entry points: a persistent title action and a durable turn card. */
		function TeamTurnCard({ sessionId, turn, useChat, t, openMember }) {
			const cards = teamCardsForTurn(useChat((snapshot) => snapshot.nodes).values(), turn.turn);
			if (turn.status !== "closed" || cards.length === 0) return null;
			return (0, react_jsx_runtime.jsx)("div", {
				className: AgentTeamsCard_module_css_default.turnCards,
				"data-team-turn-cards": true,
				children: cards.map((node) => (0, react_jsx_runtime.jsx)(AgentTeamsSummary, {
					data: node.data,
					sessionId,
					t,
					openMember
				}, node.key))
			});
		}
		//#endregion
		//#region lib/client/locales.js
		/** `agentTeams` namespace dictionaries for every plugin-owned Web surface. */
		/** Dictionary namespace owned by the AgentTeams client plugin. */
		const AGENT_TEAMS_LOCALE_NAMESPACE = "agentTeams";
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"workspace.dependencies": "从左到右：完成前置后解锁 · 点击查看详情",
			"workspace.title": "宗门协作",
			"workspace.guide": "查看修士分工、任务依赖与执行进度",
			"workspace.eyebrow": "修仙大世界",
			"workspace.description": "掌门统筹分工，修士按任务依赖并行协作。",
			"workspace.relationships": "掌门协调修士分工；任务连线表示前置依赖。点击任务可定位负责修士。",
			"workspace.emptyTitle": "当前会话还没有宗门",
			"workspace.emptyBody": "点右上角「开宗立派」，或在聊天里描述目标并确认计划，就能在这里查看宗门进度。",
			"workspace.loading": "正在读取宗门状态",
			"workspace.error": "暂时无法连接宗门服务，正在自动重试。已加载的状态可能不是最新。",
			"workspace.retry": "重新连接",
			"workspace.current": "当前宗门",
			"workspace.history": "历史记录",
			"workspace.back": "返回对话",
			"workspace.tasks": "项任务",
			"workspace.members": "名修士",
			"workspace.completed": "已了结",
			"workspace.focus": "查看宗门",
			"workspace.noTasks": "等待掌门拆解任务",
			"workspace.inbox": "掌门收件箱",
			"workspace.inboxHint": "最近 5 条未读消息",
			"workspace.inboxEmpty": "暂无未读消息。修士回报会在这里显示，掌门读取后移出。",
			"workspace.taskSummary": "任务完成情况",
			"workspace.verdictStale": "结论已过期",
			"card.memberCount": "{count} 名修士",
			"card.comms": "掌门 ↔ 修士 · 实时",
			"card.task.start": "任务开始 · {taskId} · {assignee}",
			"card.task.completed": "任务完成 · {taskId} · {assignee}",
			"card.task.failed": "任务失败 · {taskId} · {assignee}",
			"action.openActivityPanel": "打开活动面板",
			"activity.panelButton": "活动面板",
			"activity.badgeAria": "修仙大世界活动与历史，{count} 条宗门记录",
			"activity.panelAria": "修仙大世界活动面板",
			"activity.title": "宗门活动",
			"activity.float": "切换为浮动面板",
			"activity.dockRight": "停靠到右侧",
			"activity.collapse": "收起活动面板",
			"activity.empty": "暂无宗门活动",
			"team.cleanup": "清理旧宗门",
			"team.cleanupHint": "归档已结束且超过 7 天的旧宗门",
			"team.cleanupEmpty": "没有可清理的旧宗门",
			"team.cleanupConfirm": "将归档 {count} 个已结束宗门，继续？",
			"team.cleanupDone": "已归档 {count} 个旧宗门",
			"team.cleanupFailed": "清理失败，请重试",
			"team.report": "交付报告",
			"team.reportHint": "下载已验证的交付报告",
			"team.accept": "验收交付",
			"team.acceptHint": "确认本次交付已被用户接受（技术门禁已通过）",
			"team.accepted": "已验收",
			"team.acceptStale": "交付后产物已变化，验收失效，请重新验证。",
			"team.stop": "停止宗门",
			"team.stopped": "已停止",
			"team.stopTitle": "确认停止“{team}”？",
			"team.stopDescription": "将取消 {tasks} 项未完成任务，并停止 {members} 名正在工作的修士。已了结的结果会保留。",
			"team.stopCancel": "继续运行",
			"team.stopConfirm": "确认停止",
			"team.stopping": "正在停止…",
			"team.stopFailed": "停止道基受损：{message}",
			"team.stopRequestFailed": "服务器未能停止宗门，请重试",
			"team.state.running": "任务中",
			"team.state.completed": "已完成",
			"team.resume": "重新开始",
			"team.resuming": "正在恢复…",
			"team.resumeReason": "从宗门面板重新开始",
			"team.resumeFailed": "恢复失败：{message}",
			"team.discarded": "已放弃",
			"format.listSeparator": "、",
			"task.status.pending": "待接令",
			"task.status.claimed": "已认领",
			"task.status.inProgress": "进行中",
			"task.status.completed": "已了结",
			"task.status.failed": "道基受损",
			"task.status.cancelled": "已弃",
			"task.status.notRun": "未执行",
			"member.state.working": "修炼中",
			"member.state.failed": "有道基受损",
			"member.state.waiting": "等待",
			"member.state.delivered": "已了结",
			"member.state.left": "已离队",
			"member.state.removed": "已移除",
			"member.state.pending": "待执行",
			"member.state.unassigned": "待派工",
			"member.state.staged": "待创建",
			"member.state.notCreated": "未创建",
			"member.state.stopped": "已停止",
			"member.status.executing": "正在执行 {taskId}",
			"member.status.executingModel": "正在执行 {taskId} · {model}",
			"member.status.working": "正在处理已派任务",
			"member.status.waitingOn": "等待 {taskId} · {assignee}",
			"member.rel.handoff": "交给 {name} · {taskId}",
			"member.status.waitingPrerequisite": "等待前置任务",
			"member.status.waitingAssignment": "等待掌门派工",
			"member.status.delivered": "任务已了结",
			"member.status.idle": "待继续执行",
			"member.status.unknown": "状态未知",
			"member.status.staged": "确认后创建并启动",
			"member.status.settled": "任务均已终结",
			"member.status.discarded": "计划已放弃，未创建",
			"member.status.stopped": "宗门已停止，需显式恢复",
			"task.assignee.unclaimed": "待认领",
			"task.summary.waitingBreakdown": "等待掌门拆解任务",
			"task.summary.staged": "{count} 项计划等待确认",
			"task.summary.discarded": "{count} 项计划已放弃，均未执行",
			"task.summary.allDelivered": "全部 {count} 项任务已了结",
			"task.summary.ended": "终态：{completed} 已了结 · {cancelled} 已弃 · {failed} 道基受损",
			"task.summary.blockedAndRunning": "{tasks}{more} 等待前置，其余已开工",
			"task.summary.more": " 等 {count} 项",
			"task.summary.running": "{tasks} 正在执行",
			"task.summary.claimed": "已认领：{tasks}",
			"task.summary.ready": "{tasks} 已就绪待开工",
			"task.summary.blocked": "{tasks} 等待前置",
			"task.summary.failedSettled": "{count} 项已道基受损，自动循环已停止",
			"task.summary.waitingSchedule": "等待下一轮调度",
			"progress.aria": "宗门气运",
			"progress.title": "宗门气运",
			"progress.running": "■ 进行中 {count}",
			"progress.claimed": "■ 已认领 {count}",
			"progress.blocked": "■ 等待依赖 {count}",
			"progress.delivered": "■ 已了结 {count}",
			"dependency.aria": "任务依赖链",
			"dependency.viewAria": "依赖图样式",
			"dependency.viewDat": "DAT 版",
			"dependency.viewFlow": "拓扑流",
			"dependency.parallel": "并行历练",
			"dependency.title": "任务依赖",
			"dependency.hint.parallel": "无前后依赖 · 点击查看详情",
			"dependency.hint.chain": "悬停高亮依赖链 · 点击固定",
			"dependency.hint.pinned": "{taskId} 已固定 · Esc 取消",
			"task.runningAria": "运行中",
			"task.model": "{model}",
			"task.detail.cancelled": "任务已弃，不会继续执行",
			"task.detail.failed": "任务道基受损，等待明确重试",
			"task.detail.completed": "已了结并交付",
			"task.detail.noPrerequisite": "无前置，可立即开工",
			"task.detail.ready": "前置已就绪，可开工",
			"task.detail.waitingOn": "等待 {tasks}",
			"task.detail.notRun": "计划已放弃，任务未执行",
			"task.detail.noDownstream": "无下游任务",
			"task.detail.unlocks": "完成后解锁 {tasks}",
			"team.ended": "已结束",
			"plan.badge": "待确认",
			"plan.title": "执行前计划审查",
			"plan.description": "修士尚未创建、任务尚未调度。可直接调整计划，也可返回对话告诉掌门哪里需要修改。",
			"plan.member.role": "角色",
			"plan.member.provider": "Provider",
			"plan.member.model": "模型",
			"plan.member.reasoning": "推理等级",
			"plan.member.reasoningHint": "留空使用默认值；可用 low、medium、high、xhigh 等",
			"plan.model.choose": "选择模型",
			"plan.model.currentUnavailable": "{provider}/{model}（当前目录不可用）",
			"plan.model.route": "路由：{provider}/{model}",
			"plan.model.defaultReasoning": "默认推理等级",
			"plan.model.providerDefault": "Provider 默认值",
			"plan.model.modelDefault": "模型默认值（{effort}）",
			"plan.model.triggerAria": "选择修士模型，当前 {model}，推理等级 {effort}",
			"plan.model.back": "返回",
			"plan.model.loading": "正在加载模型…",
			"plan.model.empty": "暂无可用模型",
			"plan.model.partialFailure": "{count} 个 Provider 的模型目录加载道基受损",
			"plan.model.retry": "重试",
			"plan.member.prompt": "角色提示词",
			"plan.member.roleFallback": "未设置角色",
			"plan.task.subject": "任务名称",
			"plan.task.description": "任务说明",
			"plan.task.assignee": "负责人",
			"plan.task.dependencies": "依赖任务 ID（逗号分隔）",
			"plan.task.dependenciesHint": "例如 task-1, task-2；不得形成循环依赖",
			"plan.task.skills": "技能（可多选）",
			"plan.task.skillsHint": "任务开始前让执行者加载这些技能",
			"plan.contract.title": "质量契约",
			"plan.contract.objective": "目标：",
			"plan.contract.acceptance": "验收标准：",
			"plan.contract.verify": "验证命令：",
			"plan.contract.inScope": "允许改动：",
			"plan.task.unassigned": "共享任务池",
			"plan.unsaved": "未保存",
			"plan.save": "保存",
			"plan.saving": "保存中…",
			"plan.remove": "删除",
			"plan.removed": "任务已删除",
			"plan.removeConfirm": "确认删除",
			"plan.removeWarning": "删除 {task} 后将重新计算依赖关系。",
			"plan.cancel": "取消",
			"plan.addTask": "添加任务",
			"plan.adding": "添加中…",
			"plan.taskAdded": "任务已添加",
			"plan.newTask": "新任务名称",
			"plan.newTaskLabel": "新增计划任务",
			"plan.readySummary": "{members} 名修士 · {tasks} 项任务 · {links} 条依赖",
			"plan.flow.aria": "宗门开启流程",
			"plan.flow.review": "审查计划",
			"plan.flow.spawn": "创建修士",
			"plan.flow.run": "开始执行",
			"plan.members.title": "修士与模型路由",
			"plan.members.count": "{count} 名修士",
			"plan.members.empty": "尚未规划修士",
			"plan.readySummarySolo": "掌门单干 · {tasks} 项任务 · {links} 条依赖",
			"plan.flow.spawnSolo": "唤醒掌门",
			"plan.approveHintSolo": "确认后由掌门本人依次执行 {tasks} 项任务。",
			"plan.members.countSolo": "0 名修士（掌门执行）",
			"plan.members.soloEmpty": "单掌门模式：不创建修士，全部任务由掌门本人依次执行。",
			"plan.align.title": "需求对齐",
			"plan.align.goal": "目标：",
			"plan.align.goalHost": "宿主目标：",
			"plan.align.nativeTeam": "原生 Team：",
			"plan.align.mode": "模式：",
			"plan.align.platforms": "平台：",
			"plan.align.constraints": "访谈约束：",
			"plan.align.root": "产物目录：",
			"plan.align.source": "计划来源：",
			"plan.align.ai": "AI 按目标与访谈生成",
			"plan.align.template": "⚠ 模板兜底（任务描述已注入目标/访谈约束，仍建议核对）",
			"plan.align.errorLabel": "生成失败原因：",
			"plan.regenerate": "重新生成计划",
			"plan.regenerateConfirm": "将丢弃当前草稿，并按已确认的目标与访谈重新生成计划，继续？",
			"plan.regenerateMissing": "缺少已确认的需求澄清，无法重新生成；请退回对话补充后重试。",
			"plan.tasks.title": "任务与依赖",
			"plan.tasks.count": "{count} 项任务 · {links} 条依赖",
			"plan.tasks.empty": "尚未规划任务",
			"plan.dependencies.none": "无依赖",
			"plan.dependencies.count": "{count} 条依赖",
			"plan.approve": "确认并开启宗门",
			"plan.approving": "正在创建修士…",
			"plan.approveTitle": "计划检查完毕？",
			"plan.approveHint": "确认后将创建 {members} 名修士并调度 {tasks} 项任务。",
			"plan.approveConfirmTitle": "确认开启此宗门",
			"plan.approveWarning": "启动后不能再在此处编辑修士和依赖。",
			"plan.approveConfirm": "确认启动",
			"plan.continue": "返回对话修改",
			"plan.returnToChat": "回到对话",
			"plan.feedbackTitle": "正在等你说明修改方向",
			"plan.feedbackHint": "掌门会在对话中追问；收到你的回复后，只修改这份草案并再次等待确认。",
			"plan.discard": "放弃本次计划",
			"plan.discardConfirmTitle": "放弃本次计划？",
			"plan.discardWarning": "该计划会结束并归档；尚未创建任何修士，也不会执行任务。",
			"plan.discardConfirm": "确认放弃",
			"plan.discarding": "正在放弃…",
			"plan.pendingEdits": "请先保存当前修改，再开启宗门。",
			"plan.saved": "计划已保存",
			"plan.failed": "操作道基受损：{message}",
			"team.stats.members": "{count} 名修士",
			"team.stats.completed": "{completed}/{total} 完成",
			"team.stats.messages": "{count} 条消息",
			"delegation.aria": "掌门派工关系",
			"captain.name": "掌门",
			"captain.role": "拆解 · 派发 · 汇总",
			"captain.summary": "已派发 {tasks} 项任务给 {members} 名修士",
			"captain.summary.staged": "已规划 {tasks} 项任务与 {members} 名修士，等待确认",
			"captain.summary.awaitingFeedback": "草案已保留，等待你在对话中说明修改方向",
			"captain.summary.discarded": "计划已放弃：{members} 名修士未创建，{tasks} 项任务未执行",
			"captain.summary.withTakeover": "已派发 {tasks} 项给修士 · 掌门接管 {captainTasks}",
			"captain.state.working": "{count} 人执行中",
			"captain.state.takeover": "正在执行 {tasks}",
			"captain.state.collected": "已收齐",
			"captain.state.waiting": "等待回报",
			"captain.state.staged": "待确认",
			"captain.state.awaitingFeedback": "待反馈",
			"captain.state.discarded": "已放弃",
			"captain.state.settled": "已终结",
			"members.toggle": "{count} 名修士",
			"members.collapse": "收起",
			"members.expand": "展开",
			"members.expandFinished": "展开已结束（{count}）",
			"members.empty": "暂无修士，等待掌门组建宗门",
			"assignment.label": "掌门派发",
			"assignment.staged": "计划任务",
			"assignment.discarded": "未执行的计划",
			"assignment.empty": "暂无任务",
			"archive.label": "已结束 · 历史归档",
			"archive.discardedLabel": "计划已放弃 · 历史归档",
			"office.title": "山门洞府",
			"office.members": "{count} 名修士",
			"office.progress": "任务 {done}/{total}",
			"office.awaiting": "等待批准",
			"office.stalled": "已停止",
			"office.empty": "暂无修士",
			"office.captain": "掌门",
			"office.working": "修炼中",
			"office.idle": "静修",
			"office.unknown": "未知",
			"office.showBoard": "看板",
			"office.noConversation": "「{name}」暂无对话：任务开始后才会生成",
			"office.showOffice": "山门洞府",
			"office.hallEmptyName": "山门洞府",
			"office.hallNoTeam": "未开宗",
			"office.collapse": "收起山门洞府",
			"office.expand": "展开山门洞府",
			"office.resize": "拖动调整山门洞府高度",
			"office.hint": "点修士看会话；点山门、藏经阁、功德碑、传音阁打开对应面板",
			"office.hintShort": "点修士看会话 · 点墙上设施开面板",
			"office.swordBox": "剑盒",
			"office.roster": "名册",
			"office.floorDoctrine": "道统",
			"office.floorProgress": "进度",
			"office.floorInbox": "收信",
			"office.floorSettings": "配置",
			"office.floorGear": "天机阁",
			"office.historyTeams": "历史宗门",
			"office.historyCurrent": "当前",
			"office.viewingState": "对话中",
			"office.levelUp": "升级！",
			"office.star": "Star",
			"office.starHint": "喜欢这座洞府？点个 Star 支持一下",
			"office.equipment": "装备",
			"office.weapon": "法器",
			"office.mounts": "坐骑",
			"office.inventory": "物品栏",
			"item.weapon.tao": "桃木剑",
			"item.weapon.spirit": "灵剑",
			"item.weapon.treasure": "灵宝",
			"item.weapon.immortal": "仙器",
			"item.weapon.divine": "神器",
			"item.weapon.core": "法宝",
			"item.weapon.spiritTreasure": "灵宝",
			"item.weapon.immortalHigh": "仙器",
			"item.weapon.trueImmortal": "真仙器",
			"item.weapon.dao": "道器",
			"item.mount.sword": "飞剑",
			"item.mount.beast": "灵兽",
			"item.mount.crane": "仙鹤",
			"item.mount.qilin": "麒麟",
			"item.mount.dragon": "神龙",
			"item.mount.jiao": "蛟龙",
			"item.mount.immortalCrane": "仙鹤",
			"item.mount.kirin": "麒麟",
			"item.mount.trueDragon": "真龙",
			"item.mount.phoenix": "凤凰",
			"item.mount.daoBeast": "道兽",
			"skill.swordArray": "剑阵",
			"skill.gale": "御风",
			"skill.law": "法相",
			"skill.swordQi": "剑气",
			"skill.pillFire": "丹火",
			"skill.infantFire": "婴火",
			"skill.divinePower": "神通",
			"skill.domain": "领域",
			"skill.dharma": "法相真身",
			"skill.immortalArt": "仙术",
			"skill.daoArt": "道法",
			"office.levelEarnHint": "修为靠完成任务和挂机慢慢累积，不能跳级。",
			"office.equipLiveHint": "换上的法器与坐骑会立刻画到洞府里，并冒出装备提示。",
			"office.idleGain": "挂机：+{xp} 修为 / 10 秒（连续在线最高 3 倍）",
			"office.mountSword": "御剑",
			"office.mountBeast": "神兽",
			"office.mountWalk": "步行",
			"office.mountHint": "寻常修士步行；御剑或乘神兽才会飞起。",
			"office.equipped": "已装备",
			"office.locked": "未解锁",
			"office.skills": "功法",
			"skill.none": "尚未解锁",
			"skill.aura": "灵光护体",
			"skill.weapon": "本命法器",
			"skill.sword": "御剑术",
			"skill.shield": "护体灵盾",
			"skill.beast": "驭兽术",
			"skill.treasure": "灵宝",
			"office.viewingCaptain": "掌门 · 主对话",
			"office.viewingMember": "{name} · 修士对话",
			"office.viewingHint": "当前打开的是谁的对话",
			"office.newTask": "新建任务",
			"office.newTaskHint": "回到主对话框，告诉掌门要新建的任务",
			"office.historyPast": "历史",
			"office.taskHistory": "已完成任务",
			"office.archiveCleanup": "归档",
			"office.archiveCleanupHint": "归档已结束的旧宗门",
			"office.archiveCleanupConfirm": "将归档 {count} 个已结束的宗门，确认？",
			"office.archiveCleanupDone": "已归档 {count} 个宗门",
			"office.archiveCleanupEmpty": "没有可归档的旧宗门",
			"office.archiveCleanupFailed": "归档失败，请稍后重试",
			"office.archiveBusy": "归档中…",
			"office.historyEmpty": "暂无历史宗门或已了结任务",
			"office.scene.settingsHint": "调整面板大小与位置",
			"office.panelConfig": "面板配置",
			"office.panelSizeHint": "选择面板初始大小；也可拖面板右下角自由缩放。",
			"office.panelSize.compact": "紧凑",
			"office.panelSize.normal": "标准",
			"office.panelSize.large": "宽大",
			"office.panelSize.huge": "超大",
			"office.resetPosition": "重置位置",
			"office.chatter.1": "今日香火不错",
			"office.chatter.2": "等掌门派活",
			"office.chatter.3": "这炉丹快成了",
			"office.chatter.4": "剑意又进一寸",
			"office.chatter.5": "隔壁宗门好热闹",
			"office.chatter.6": "歇会儿再战",
			"office.chatter.7": "誊抄经卷中",
			"office.chatter.8": "谁在论道？",
			"office.sceneAria": "{name} 的山门洞府",
			"office.rail": "洞府操作",
			"office.closePanel": "收起面板",
			"office.guide": "点墙上的山门、藏经阁、功德碑、封神榜、天机阁、宗门志，或底部按钮打开对应面板；点修士看他的会话。",
			"office.guideDismiss": "知道了",
			"office.teamsHint": "选中要查看的宗门；历史宗门只读。",
			"office.inboxCount": "{count} 条未读来音",
			"office.stagedReview": "审阅开宗计划",
			"office.facility.teams": "山门·名册",
			"office.facility.board": "功德碑·进度",
			"office.facility.config": "藏经阁·道统",
			"office.facility.gear": "天机阁·装备",
			"office.facility.ranks": "封神榜·留名",
			"office.facility.about": "宗门志",
			"office.facility.inbox": "传音阁·收信",
			"office.floorRanks": "封神榜",
			"office.ascension": "封神榜",
			"office.ascensionIntro": "榜上十五重境界，从凡人一路写到道祖；每一笔都由交付与守夜写成。",
			"office.ascensionCurrent": "当前修为",
			"office.ascensionRealmList": "境界谱",
			"office.ascensionFast": "快速升级",
			"office.ascensionStory": "宗门故事",
			"office.ascensionYouAre": "当前",
			"office.ascensionSect": "本宗留名",
			"office.floorAbout": "宗门志",
			"office.aboutTitle": "宗门志",
			"about.tab.group": "交流群",
			"about.tab.sponsor": "赞助",
			"about.tab.about": "关于",
			"about.tab.feedback": "反馈异常",
			"office.action.teamsHint": "切换宗门、查看历史名册",
			"office.action.boardHint": "查看任务依赖与派发进度",
			"office.action.configHint": "查看成员、任务契约与开宗计划",
			"office.action.gearHint": "查看法器、坐骑与技能",
			"office.action.aboutHint": "赞助、交流群、作者项目与反馈异常",
			"office.action.ranksHint": "查看本宗留名与十五重境界",
			"office.action.inboxHint": "查看掌门未读来音",
			"app.title": "修仙大世界",
			"quickstart.entry": "开宗",
			"quickstart.entryTitle": "不输入命令，点这里开宗立派",
			"quickstart.title": "开宗立派",
			"quickstart.desc": "选道统模板与修士，先生成开宗草案；你点「批准」后才会真正开山。",
			"quickstart.goal": "目标",
			"quickstart.goalPlaceholder": "例如：修复登录接口偶发 500，测试在 tests/auth",
			"quickstart.template": "任务模板",
			"quickstart.roles": "角色（多选，可自定义）",
			"quickstart.stepDoctrine": "道统",
			"quickstart.stepVow": "志向",
			"quickstart.stepSect": "宗门",
			"quickstart.stepOath": "立誓",
			"quickstart.stepClarify": "澄清",
			"quickstart.stepInterview": "访谈",
			"interview.hint": "以下问题由 AI 根据你的需求拟定，勾选你的选择即可（不选则用默认值）。",
			"interview.loading": "AI 正在根据你的需求拟定问题…",
			"interview.loadingHint": "稍等片刻，问题会按模板列出。",
			"interview.fallback": "AI 暂不可用，先显示通用问题，可手动补充。",
			"interview.retry": "重新生成问题",
			"interview.customPlaceholder": "其他答案，回车添加",
			"interview.multi": "（可多选）",
			"interview.single": "（单选）",
			"clarify.hint": "开山前先对齐：这一页会写进项目宪法，之后每个修士都会带着它上场。",
			"clarify.aiLoading": "AI 正在根据你的需求生成选项…",
			"clarify.aiOptions": "以下选项由 AI 根据这条需求生成，可增删。",
			"clarify.aiFallback": "AI 暂不可用，先显示通用选项，可手动补充。",
			"clarify.customPlaceholder": "自定义（逗号分隔）",
			"clarify.constraints": "硬约束",
			"clarify.confirmHint": "请确认模式与验收标准，确认后生成项目宪法并强制执行。",
			"mode.select": "开发模式",
			"mode.draft": "极速草稿（产量优先）",
			"mode.precision": "工业精工（质量交付）",
			"mode.legacy": "屎山抢救（存量维护）",
			"mode.compliance": "严格合规（审计优先）",
			"mode.monetize": "交付变现（交付优先）",
			"mode.desc.draft": "允许硬编码、跳过非主流程，只保主流程跑通",
			"mode.desc.precision": "异常捕获、断网重连、72h 压测、无内存泄漏",
			"mode.desc.legacy": "只加不改：先补旧冒烟，旧测试挂直接阻断",
			"mode.desc.compliance": "禁公网、禁明文密钥、依赖与日志审计",
			"mode.desc.monetize": "模板 UI + License 校验，砍掉边缘功能",
			"clarify.type": "类型",
			"clarify.hardwareDev": "软硬开发",
			"clarify.softwareDev": "纯软件开发",
			"clarify.scale": "项目规模",
			"clarify.scaleSmall": "🟢 小改动/单点突破（1-3 天）",
			"clarify.scaleMedium": "🟡 多模块联动（1-2 周）",
			"clarify.scaleFullstack": "🔴 全栈重写（按月）",
			"clarify.ui": "UI 设计",
			"clarify.referencePlaceholder": "填参考项目/网站名称",
			"clarify.notesPlaceholder": "补充：车间强光 / 单手操作…",
			"clarify.platforms": "目标平台",
			"clarify.hardware": "硬件候选（只列候选，选型由你决定）",
			"clarify.hardwareNote": "以上仅为清单，选型与采购由你决定。",
			"clarify.excluded": "禁止边界",
			"clarify.excludedPlaceholder": "每行一条自定义禁止项",
			"clarify.acceptance": "验收断言（每行一条可执行标准）",
			"clarify.acceptancePlaceholder": "例如：连续 72h 无崩溃",
			"clarify.memoryHints": "记忆关键词（可选，逗号分隔）",
			"clarify.memoryHintsPlaceholder": "例如：MES 接口、Win7、车间强光",
			"polish.button": "✨ AI 润色",
			"polish.busy": "润色中…",
			"polish.applied": "已确认润色结果",
			"polish.original": "原始需求（只读）",
			"polish.expanded": "润色后需求（可微调，≤200 字）",
			"polish.charLimit": "{count}/200 字",
			"polish.conditions": "AI 预判的隐藏条件（勾选确认）",
			"polish.conditionsEmpty": "未发现需要补充的隐藏条件",
			"polish.confirm": "确认并进入澄清",
			"polish.cancel": "取消",
			"polish.degraded": "模型暂不可用，已回退原文；可手动补充。",
			"polish.degradedDetail": "AI 未返回可用结果：{error}",
			"polish.unchanged": "润色完成，但内容没有变化。",
			"memory.banner": "当前团队记忆为“金鱼模式”。建议安装 memory-eternal 插件：记住项目约束，新 Agent 带经验上场，用越久越懂你的手艺。",
			"memory.install": "[去安装]",
			"memory.dismiss": "关闭提示",
			"memory.connected": "已连接大脑",
			"library.title": "道统·藏经阁",
			"library.back": "返回进度",
			"library.empty": "还没有宗门：先开宗立派。",
			"library.connected": "实时推送",
			"library.disconnected": "连接断开，重连中…",
			"library.todayCost": "今日成本 ¥{cost}",
			"library.blocker": "当前阻塞",
			"library.noBlocker": "没有阻塞，任务在正常流转",
			"library.unassigned": "未分配",
			"library.status.pending": "待办",
			"library.status.claimed": "已领取",
			"library.status.inProgress": "进行中",
			"library.status.completed": "通过",
			"library.status.failed": "阻断",
			"library.acceptance": "验收 {pass}/{total}",
			"library.gate": "总验收 {pass}/{total}",
			"library.stop": "停止",
			"library.stopping": "停止中…",
			"library.stopConfirm": "停止该任务？正在执行的成员会被中断，下游任务被阻断。",
			"library.confirm": "确认停止",
			"library.cancel": "取消",
			"library.details": "任务与架构明细",
			"library.deps": "依赖",
			"library.noDeps": "无",
			"library.pending": "待验",
			"library.inProgress": "进行中",
			"library.requirements": "需求清单（访谈）",
			"library.skeleton": "项目骨架",
			"library.failures": "失败 {count} 次",
			"library.reqCol": "需求 / 约束",
			"library.reqState": "状态",
			"library.reqFailures": "失败次数",
			"library.reqFailuresTotal": "失败合计",
			"library.architecture": "核心架构（开发基线）",
			"library.awaitingHuman": "待人工复核",
			"library.confirmReview": "确认复核",
			"library.confirming": "确认中…",
			"library.confirmFailed": "复核确认失败",
			"library.description": "说明",
			"cost.ledger.title": "成本账单",
			"cost.ledger.today": "今日成本",
			"cost.ledger.total": "总成本",
			"cost.ledger.refresh": "刷新",
			"cost.ledger.byTask": "按任务",
			"cost.ledger.recent": "最近记录",
			"cost.ledger.unlinked": "未关联任务",
			"cost.ledger.unmetered": "未计量",
			"cost.ledger.captainTask": "掌门执行（未计量）",
			"cost.ledger.actual": "实际用量",
			"cost.ledger.empty": "暂无成本记录",
			"cost.title": "成本提示",
			"cost.body": "{member} 本次 spawn 预计 ¥{estimate}，超过{reason} ¥{threshold}。",
			"cost.task": "单任务阈值",
			"cost.day": "当日累计阈值",
			"cost.continue": "继续执行",
			"cost.terminate": "终止此任务",
			"cost.note": "只会拦截这一次 spawn，不影响并行任务。",
			"cost.retryTitle": "死循环拦截",
			"cost.retryBody": "当前环节已重试 {count} 次，是否介入人工排查？",
			"cost.retryNote": "继续会再次派发该任务；介入会保留失败状态，由你人工处理。",
			"cost.retryStop": "介入人工排查",
			"quickstart.doctrineHint": "先定道统：道统决定首批修士的职责配置，也决定山门立派后的行事风格。",
			"quickstart.vowHint": "写下立派之志：要解决什么、验收标准是什么。掌门会据此摆出开宗草案。",
			"quickstart.sectHint": "给宗门取个名号：随机重抽、挑一个现成门派，或自定道途。",
			"quickstart.solo": "✦ 单掌门模式",
			"quickstart.soloActive": "✦ 单掌门模式（已清空修士）",
			"quickstart.soloCleared": "已清空全部修士：计划不生成成员，所有任务由掌门本人依次执行。",
			"quickstart.soloHint": "点击即清空修士并进入单掌门模式；再次点击可恢复多人配置。",
			"quickstart.superFast": "超级快速执行",
			"quickstart.superFastHint": "跳过 AI 访谈，直接进入宗门与立誓。",
			"quickstart.generationLost": "生成过程中连接中断，未收到结果；请重试立誓。",
			"quickstart.soloSectHidden": "单掌门模式只需目标与验收，不再配置门派/角色。",
			"quickstart.oathHint": "立誓前再过一眼：确认道统、宗门与首批修士。",
			"quickstart.next": "下一步",
			"quickstart.back": "上一步",
			"quickstart.found": "立誓开宗",
			"quickstart.roleCount": "名修士",
			"quickstart.goalLength": "已写 {count} 字",
			"quickstart.goalShortcut": "Ctrl/⌘ + Enter 进入下一步",
			"quickstart.summaryDoctrine": "道统",
			"quickstart.summarySect": "宗门",
			"quickstart.summaryRoster": "首批修士",
			"quickstart.summaryVow": "立派之志",
			"quickstart.oathNotice": "立誓后只生成开宗草案；你在计划里点「批准」后，山门才会真正开工。",
			"quickstart.tplFix": "斗法除魔",
			"quickstart.tplFeat": "开山立业",
			"quickstart.tplResearch": "寻仙问道",
			"quickstart.tplAudit": "巡查天机",
			"quickstart.tplFullstack": "全栈合道",
			"quickstart.tplHardening": "镇魔加固",
			"role.planner.name": "军师",
			"role.planner.ability": "拆解与排程",
			"role.implementer.name": "剑修",
			"role.implementer.ability": "攻坚与实现",
			"role.frontend.name": "灵绘师",
			"role.frontend.ability": "界面与交互",
			"role.backend.name": "地脉师",
			"role.backend.ability": "接口与数据",
			"role.integrator.name": "合契师",
			"role.integrator.ability": "联调与契约",
			"role.security.name": "镇魔师",
			"role.security.ability": "安全与加固",
			"role.verifier.name": "丹修",
			"role.verifier.ability": "校验与复现",
			"role.reviewer.name": "执法长老",
			"role.reviewer.ability": "审查与裁断",
			"role.researcher.name": "游历者",
			"role.researcher.ability": "取证与探查",
			"role.analyst.name": "推演师",
			"role.analyst.ability": "推演与汇总",
			"role.writer.name": "书记",
			"role.writer.ability": "撰写与整理",
			"role.auditor.name": "巡查使",
			"role.auditor.ability": "只读审计",
			"role.architect.name": "阵法师",
			"role.architect.ability": "架构与边界",
			"role.tester.name": "试炼官",
			"role.tester.ability": "测试与回归",
			"role.documenter.name": "传道者",
			"role.documenter.ability": "文档与示例",
			"role.operator.name": "炼器师",
			"role.operator.ability": "构建与发布",
			"role.talisman.name": "符修",
			"role.talisman.ability": "符箓与封印",
			"role.healer.name": "医修",
			"role.healer.ability": "疗伤与续命",
			"role.beastmaster.name": "驭兽师",
			"role.beastmaster.ability": "驭兽与侦察",
			"role.puppeteer.name": "傀儡师",
			"role.puppeteer.ability": "傀儡与操控",
			"role.musician.name": "音修",
			"role.musician.ability": "音律与扰乱",
			"role.poisoner.name": "毒修",
			"role.poisoner.ability": "用毒与克制",
			"role.monk.name": "佛修",
			"role.monk.ability": "禅定与护持",
			"role.demon.name": "魔修",
			"role.demon.ability": "魔道与险招",
			"sect.jian.name": "剑宗",
			"sect.jian.desc": "一剑破万法 · 主攻伐与执行",
			"sect.dan.name": "丹宗",
			"sect.dan.desc": "炼丹济世 · 主校验与疗伤",
			"sect.fuzhen.name": "符阵宗",
			"sect.fuzhen.desc": "符箓布阵 · 主封印与控制",
			"sect.mo.name": "魔宗",
			"sect.mo.desc": "魔道险招 · 出奇制胜",
			"sect.fo.name": "佛门",
			"sect.fo.desc": "禅定护持 · 稳中求进",
			"sect.sanxiu.name": "散修盟",
			"sect.sanxiu.desc": "三教九流 · 善取证推演",
			"sect.yushou.name": "御兽宗",
			"sect.yushou.desc": "驭兽音律 · 长于侦察巡查",
			"sect.lianqi.name": "炼器宗",
			"sect.lianqi.desc": "铸器交付 · 重构建发布",
			"quickstart.sect": "门派",
			"quickstart.sectRandom": "随机门派",
			"quickstart.sectCustom": "自定义",
			"quickstart.sectCustomHint": "手动挑选道途（可多选）",
			"quickstart.sectRolled": "随机到「{sect}」 · 再点一次重新抽",
			"quickstart.sectCustomPicked": "当前为自定义道途",
			"quickstart.tplBuild": "炼器成器",
			"quickstart.tplArray": "布阵改构",
			"quickstart.tplDocs": "传道著书",
			"quickstart.tplDebate": "论道裁断",
			"quickstart.desc.fix": "定位并修复缺陷，附验证与审查。",
			"quickstart.desc.feat": "从需求到实现、验证与审查的全链路。",
			"quickstart.desc.research": "多路取证后综述并核对证据。",
			"quickstart.desc.audit": "只读审计，逐条给出证据。",
			"quickstart.desc.fullstack": "先定契约，前后端并行实现，再联调、验证与审查。",
			"quickstart.desc.hardening": "只读审计 → 最小修复 → 利用复现与回归 → 安全审查。",
			"quickstart.desc.build": "收敛改动、发布前验证、打包发布。",
			"quickstart.desc.array": "先设计边界与迁移，再小步重构。",
			"quickstart.desc.docs": "列纲、成文、审阅交付文档。",
			"quickstart.desc.debate": "正反立论、合论与裁断。",
			"quickstart.replaceHint": "当前宗门尚未结束，可结束它并立即开新宗：",
			"quickstart.replaceConfirm": "已有宗门，替换并开宗？",
			"quickstart.replacePrompt": "已有宗门，替换并开宗？",
			"quickstart.replaceAtSect": "当前已有宗门；开新宗会先结束它。",
			"quickstart.replaceArmed": "已选择替换旧宗门",
			"quickstart.replaceShort": "替换并开宗",
			"quickstart.replace": "结束旧宗门并开新宗",
			"quickstart.rolesEmpty": "选择角色",
			"quickstart.customRole": "自定义角色",
			"quickstart.addRole": "添加",
			"quickstart.teamExists": "当前会话已有宗门。可以继续旧宗门，或点击下方「结束旧宗门并开新宗」。",
			"quickstart.cancel": "取消",
			"quickstart.submit": "生成草案",
			"quickstart.busy": "生成中…",
			"quickstart.generating": "正在生成开宗计划：AI 正在按目标与访谈规划任务（通常 10-60 秒），完成后自动进入计划审核。",
			"quickstart.goalRequired": "请先填写目标",
			"quickstart.created": "草案已生成：{team}（{sect}），请在右侧「宗门协作」中批准",
			"workspace.tabBoard": "宗门进度",
			"workspace.tabConfig": "道统配置",
			"workspace.switchTeam": "切换宗门",
			"config.team": "宗门",
			"config.phase": "阶段",
			"config.halted": "已停止",
			"realm.qi": "炼气",
			"realm.foundation": "筑基",
			"realm.golden": "结丹",
			"realm.nascent": "元婴",
			"realm.spirit": "化神",
			"realm.void": "炼虚",
			"realm.mahayana": "大乘",
			"realm.mortal": "凡人",
			"realm.integration": "合体",
			"realm.tribulation": "渡劫",
			"realm.trueImmortal": "真仙",
			"realm.goldenImmortal": "金仙",
			"realm.taiyi": "太乙",
			"realm.daluo": "大罗",
			"realm.dao": "道祖",
			"rank.desc.mortal": "尚未引气入体。抄经、挑水、跑腿都是修行；一柄桃木剑，也能斩出第一缕剑意。",
			"rank.desc.qi": "灵气入体，气海初成。能御剑离地三寸，开始接得下正式任务。",
			"rank.desc.foundation": "灵台筑基，气海稳固。本命法器认主，能独立主持一宗杂务。",
			"rank.desc.golden": "灵气凝成金丹，寿元大增。法诀由术入法，出手开始有章法。",
			"rank.desc.nascent": "金丹化婴，神识外放。能同时盯住多条任务线而不乱。",
			"rank.desc.spirit": "元婴与神念合一，言出法随。宗门的道统，开始由你执笔。",
			"rank.desc.void": "触摸虚空，短距挪移。案几与山门再也困不住你。",
			"rank.desc.integration": "肉身与天地相合，举手投足皆是阵纹，宗门气运随你而动。",
			"rank.desc.mahayana": "一人可镇一宗。榜上朱印常亮，仙鹤与麒麟争相来附。",
			"rank.desc.tribulation": "雷劫加身。每一次交付都是一道天雷，熬过去便是真仙。",
			"rank.desc.trueImmortal": "名列仙班，寿与天齐。能点化后辈，也能替宗门挡下一劫。",
			"rank.desc.goldenImmortal": "金身不坏，念动即至。护山大阵由你坐镇，邪祟不敢近山门。",
			"rank.desc.taiyi": "太乙救苦，能逆小势、改因果。榜上留名者，不过百人。",
			"rank.desc.daluo": "大罗之上无岁月。一梦千年，宗门兴衰只在一念之间。",
			"rank.desc.dao": "与道合真。封神榜的最后一笔，由你自己写下。",
			"ascension.tip.tasks": "完成任务：每个任务结算 60 + 15×当前等级 修为，等级越高单次收益越大。",
			"ascension.tip.captain": "带队：掌门每完成一个宗门任务，另有 40 + 8×当前等级 的带队修为。",
			"ascension.tip.idle": "挂机：当前对话面板内所有修士一起累积（1 级每 10 秒 10 点，前 100 级越升越快）；正在对话的角色每 1 分钟 +0.5 倍（最高 3 倍），离线最多补 8 小时。100 级之后逐步变慢。",
			"ascension.tip.first": "历史补结：第一次看到某位修士已完成的任务时，会按当前等级一次性补结历史修为。",
			"ascension.tip.gear": "装备节奏：Lv.5 解锁飞剑、Lv.8 解锁灵兽，之后每 20 级左右换一档坐骑；装备只改排面，不改修为。",
			"ascension.story.1": "斗法宗开山那年，山门只有一柄桃木剑。祖师把榜文钉在后山演武场的石壁上，说：此榜不记姓名，只记道行。榜上十五道金线，便是从凡人到道祖的十五重天。",
			"ascension.story.2": "后来宗门几经兴衰，榜文被雷火燎过、被海风吹过，字迹却一日比一日清楚。每逢有修士破境，榜上便亮起一枚朱印；若有弟子下山历练，榜上便暗一分。弟子们说，那不是榜在记事，是宗门在替每个人记着自己走过的路。",
			"ascension.story.3": "如今轮到你。你的每一次交付、每一次守夜、每一次不声不响的补漏，都会在榜上留下极细的一道笔锋。等十五道金线尽数点亮，你回望来路，会发现自己也成了一盏灯。",
			"about.groupHint": "扫码进入产品交流群（QQ / 微信），遇到问题可以直接问。",
			"about.groupCaption": "QQ 交流群",
			"about.groupCaptionWechat": "微信交流群",
			"about.groupNote": "插件更新与使用问题会在群里同步。",
			"about.sponsorHint": "如果这个插件帮你省了时间，可以支持梦游科技团队。",
			"about.sponsorPay": "微信收款码",
			"about.sponsorReward": "微信赞赏码",
			"about.sponsorNote": "打赏完全自愿，不影响任何功能；插件本体始终开源免费（MIT）。",
			"about.sponsorLink": "赞助说明（SPONSOR.md）",
			"about.intro": "DSH Pixel Team 把多智能体协作画成一座像素宗门：掌门派活、修士各自伏案、任务沿案几排开，修为与境界写在每个修士头顶。由惠州市梦游科技有限公司维护，开源免费，数据都留在本机。",
			"about.version": "版本",
			"about.author": "企业",
			"about.license": "许可",
			"about.companyNote": "由惠州市梦游科技有限公司维护与发布。代码以 MIT 许可开源；像素洞府、修炼体系与界面素材为本项目原创。",
			"about.repo": "GitHub 仓库",
			"about.issues": "Issues",
			"about.releases": "Releases",
			"about.feedbackWhy": "GitHub 不允许匿名创建 issue，所以这里只把标题、正文和诊断预填进新建 issue 的链接；点一次 Submit 才算真正提交。也可以复制给 AI，让模型直接排查。",
			"about.feedbackPlaceholder": "描述你遇到的问题：点哪里、期望什么、实际发生了什么。",
			"about.feedbackDiag": "诊断信息（自动采集）",
			"about.feedbackOpenIssue": "打开 GitHub 新建 issue",
			"about.feedbackCopyDiag": "复制诊断",
			"about.feedbackCopyPrompt": "复制给 AI 的提示词",
			"about.feedbackCopied": "已复制到剪贴板",
			"about.feedbackCopyFail": "复制被拦截，请手动全选复制",
			"about.feedbackNeedText": "先写一句问题描述再提交",
			"about.feedbackOpenFail": "浏览器拦截了新窗口，请允许弹窗，或直接打开 GitHub Issues。",
			"about.feedbackPrivacy": "诊断只包含版本、浏览器、视口与当前宗门概况，不含对话内容和文件路径。",
			"about.groupFallback": "二维码加载失败时，可在仓库 SPONSOR.md 查看同一张群码。",
			"config.realm": "境界",
			"office.realm": "境界",
			"config.phaseStaged": "计划待批准",
			"config.phaseRunning": "进行中",
			"config.phaseCompleted": "已完成",
			"config.kind.work": "工作",
			"config.kind.requirements": "需求",
			"config.kind.implementation": "实现",
			"config.kind.verification": "验证",
			"config.kind.review": "审查",
			"config.kind.repair": "修复",
			"config.kind.integration": "集成",
			"config.members": "修士",
			"config.tasks": "任务",
			"config.name": "名称",
			"config.role": "角色",
			"config.model": "模型",
			"config.effort": "思考档",
			"config.task": "任务",
			"config.assignee": "负责人",
			"config.status": "状态",
			"config.deps": "依赖",
			"config.unassigned": "未分配",
			"config.stagedHint": "计划尚未批准：先在「操作配置」里改修士与任务，再回到这里批准。",
			"config.hint": "运行中修士与任务为只读；调整请通过聊天让掌门处理。",
			"config.stagedTitle": "计划待批准",
			"config.stagedBody": "批准后才会创建修士、派发任务。",
			"config.openConfig": "去操作配置"
		};
		/** English dictionary, checked complete against the Chinese source key set. */
		const en = {
			"workspace.dependencies": "Left to right: prerequisites unlock tasks · Select for details",
			"workspace.title": "Sect hall",
			"workspace.guide": "Members, task dependencies, and execution progress",
			"workspace.eyebrow": "CULTIVATION WORLD",
			"workspace.description": "The captain coordinates. Members work in parallel as dependencies clear.",
			"workspace.relationships": "The captain coordinates members. Connections show task prerequisites. Select a task to locate its owner.",
			"workspace.emptyTitle": "No team in this conversation yet",
			"workspace.emptyBody": "Use the Found a sect button, or describe your goal in chat and approve the plan, to follow the sect here.",
			"workspace.loading": "Loading team activity",
			"workspace.error": "The team service is unavailable. Retrying automatically; loaded activity may be out of date.",
			"workspace.retry": "Reconnect",
			"workspace.current": "Current team",
			"workspace.history": "History",
			"workspace.back": "Back to conversation",
			"workspace.tasks": "tasks",
			"workspace.members": "members",
			"workspace.completed": "completed",
			"workspace.focus": "Open sect",
			"workspace.noTasks": "Waiting for the captain to define tasks",
			"workspace.inbox": "Captain inbox",
			"workspace.inboxHint": "Up to 5 recent unread messages",
			"workspace.inboxEmpty": "No unread messages. Member reports appear here until the captain reads them.",
			"workspace.taskSummary": "Task completion summary",
			"workspace.verdictStale": "Verdict outdated",
			"card.memberCount": "{count} members",
			"card.comms": "Captain ↔ cultivators · live",
			"card.task.start": "Task started · {taskId} · {assignee}",
			"card.task.completed": "Task completed · {taskId} · {assignee}",
			"card.task.failed": "Task failed · {taskId} · {assignee}",
			"action.openActivityPanel": "Open activity panel",
			"activity.panelButton": "Activity panel",
			"activity.badgeAria": "Cultivation World activity and history, {count} sect records",
			"activity.panelAria": "Cultivation World activity panel",
			"activity.title": "Sect activity",
			"activity.float": "Switch to floating panel",
			"activity.dockRight": "Dock to the right",
			"activity.collapse": "Collapse activity panel",
			"activity.empty": "No team activity",
			"team.cleanup": "Clean up",
			"team.cleanupHint": "Archive ended teams older than 7 days",
			"team.cleanupEmpty": "No ended teams to clean up",
			"team.cleanupConfirm": "Archive {count} ended teams?",
			"team.cleanupDone": "Archived {count} teams",
			"team.cleanupFailed": "Cleanup failed; try again",
			"team.report": "Delivery report",
			"team.reportHint": "Download the verified delivery report",
			"team.accept": "Accept delivery",
			"team.acceptHint": "Confirm the user accepted this delivery (technical gates already passed)",
			"team.accepted": "Accepted",
			"team.acceptStale": "Artifacts changed after acceptance; re-verify before accepting again.",
			"team.stop": "Stop team",
			"team.stopped": "Stopped",
			"team.stopTitle": "Stop “{team}”?",
			"team.stopDescription": "This cancels {tasks} unfinished tasks and stops {members} working members. Completed results are kept.",
			"team.stopCancel": "Keep running",
			"team.stopConfirm": "Stop team",
			"team.stopping": "Stopping…",
			"team.stopFailed": "Could not stop team: {message}",
			"team.stopRequestFailed": "The server could not stop this team. Try again.",
			"team.state.running": "In progress",
			"team.state.completed": "Completed",
			"team.resume": "Restart",
			"team.resuming": "Resuming…",
			"team.resumeReason": "Restarted from the sect panel",
			"team.resumeFailed": "Resume failed: {message}",
			"team.discarded": "Discarded",
			"format.listSeparator": ", ",
			"task.status.pending": "Unclaimed",
			"task.status.claimed": "Claimed",
			"task.status.inProgress": "In progress",
			"task.status.completed": "Completed",
			"task.status.failed": "Failed",
			"task.status.cancelled": "Cancelled",
			"task.status.notRun": "Not run",
			"member.state.working": "Working",
			"member.state.failed": "Has failures",
			"member.state.waiting": "Waiting",
			"member.state.delivered": "Delivered",
			"member.state.left": "Left team",
			"member.state.removed": "Removed",
			"member.state.pending": "Pending",
			"member.state.unassigned": "Awaiting assignment",
			"member.state.staged": "Not spawned",
			"member.state.notCreated": "Not created",
			"member.state.stopped": "Stopped",
			"member.status.executing": "Working on {taskId}",
			"member.status.executingModel": "Working on {taskId} · {model}",
			"member.status.working": "Working on assigned tasks",
			"member.status.waitingOn": "Waiting for {taskId} · {assignee}",
			"member.rel.handoff": "Hands off to {name} · {taskId}",
			"member.status.waitingPrerequisite": "Waiting for prerequisites",
			"member.status.waitingAssignment": "Waiting for the captain to assign work",
			"member.status.delivered": "Tasks delivered",
			"member.status.idle": "Ready to continue",
			"member.status.unknown": "Status unknown",
			"member.status.staged": "Will be spawned after approval",
			"member.status.settled": "All assigned work is settled",
			"member.status.discarded": "Plan discarded; member was not created",
			"member.status.stopped": "Team stopped; explicit resume required",
			"task.assignee.unclaimed": "Unclaimed",
			"task.summary.waitingBreakdown": "Waiting for the captain to break down the work",
			"task.summary.staged": "{count} planned tasks awaiting approval",
			"task.summary.discarded": "{count} planned tasks discarded; none ran",
			"task.summary.allDelivered": "All {count} tasks delivered",
			"task.summary.ended": "Final: {completed} delivered · {cancelled} cancelled · {failed} failed",
			"task.summary.blockedAndRunning": "{tasks}{more} waiting on prerequisites; other work has started",
			"task.summary.more": " and {count} more",
			"task.summary.running": "{tasks} in progress",
			"task.summary.claimed": "Claimed: {tasks}",
			"task.summary.ready": "{tasks} ready to start",
			"task.summary.blocked": "{tasks} waiting on prerequisites",
			"task.summary.failedSettled": "{count} failed; the automatic loop has stopped",
			"task.summary.waitingSchedule": "Waiting for the next scheduling round",
			"progress.aria": "Overall team progress",
			"progress.title": "Overall progress",
			"progress.running": "■ In progress {count}",
			"progress.claimed": "■ Claimed {count}",
			"progress.blocked": "■ Waiting {count}",
			"progress.delivered": "■ Delivered {count}",
			"dependency.aria": "Task dependency chain",
			"dependency.viewAria": "Diagram style",
			"dependency.viewDat": "Classic",
			"dependency.viewFlow": "Flow",
			"dependency.parallel": "Parallel tasks",
			"dependency.title": "Task dependencies",
			"dependency.hint.parallel": "No dependencies · Click for details",
			"dependency.hint.chain": "Hover to highlight dependencies · Click to pin",
			"dependency.hint.pinned": "{taskId} pinned · Esc to clear",
			"task.runningAria": "Running",
			"task.model": "{model}",
			"task.detail.cancelled": "Cancelled; execution will not continue",
			"task.detail.failed": "Failed; awaiting an explicit retry",
			"task.detail.completed": "Completed and delivered",
			"task.detail.noPrerequisite": "No prerequisites; ready to start",
			"task.detail.ready": "Prerequisites ready; can start",
			"task.detail.waitingOn": "Waiting for {tasks}",
			"task.detail.notRun": "Plan discarded; task was not run",
			"task.detail.noDownstream": "No downstream tasks",
			"task.detail.unlocks": "Unlocks {tasks} when complete",
			"team.ended": "Ended",
			"plan.badge": "Awaiting approval",
			"plan.title": "Pre-run plan review",
			"plan.description": "Members have not been spawned and tasks have not been scheduled. Edit the draft here, or return to chat and tell the Captain what should change.",
			"plan.member.role": "Role",
			"plan.member.provider": "Provider",
			"plan.member.model": "Model",
			"plan.member.reasoning": "Reasoning effort",
			"plan.member.reasoningHint": "Leave blank for default; accepts low, medium, high, xhigh, and more",
			"plan.model.choose": "Choose a model",
			"plan.model.currentUnavailable": "{provider}/{model} (not in the current catalog)",
			"plan.model.route": "Route: {provider}/{model}",
			"plan.model.defaultReasoning": "Default reasoning effort",
			"plan.model.providerDefault": "Provider default",
			"plan.model.modelDefault": "Model default ({effort})",
			"plan.model.triggerAria": "Choose member model, currently {model}, reasoning effort {effort}",
			"plan.model.back": "Back",
			"plan.model.loading": "Loading models…",
			"plan.model.empty": "No models available",
			"plan.model.partialFailure": "{count} provider catalogs could not be loaded",
			"plan.model.retry": "Retry",
			"plan.member.prompt": "Role prompt",
			"plan.member.roleFallback": "Role not set",
			"plan.task.subject": "Task subject",
			"plan.task.description": "Task description",
			"plan.task.assignee": "Assignee",
			"plan.task.dependencies": "Dependency task IDs (comma-separated)",
			"plan.task.dependenciesHint": "For example task-1, task-2; cycles are rejected",
			"plan.task.skills": "Skills (multi-select)",
			"plan.task.skillsHint": "Assignee loads these skills before working",
			"plan.contract.title": "Quality contract",
			"plan.contract.objective": "Objective: ",
			"plan.contract.acceptance": "Acceptance: ",
			"plan.contract.verify": "Verify: ",
			"plan.contract.inScope": "In scope: ",
			"plan.task.unassigned": "Shared task pool",
			"plan.unsaved": "Unsaved",
			"plan.save": "Save",
			"plan.saving": "Saving…",
			"plan.remove": "Remove",
			"plan.removed": "Task removed",
			"plan.removeConfirm": "Confirm remove",
			"plan.removeWarning": "Removing {task} will recalculate downstream dependencies.",
			"plan.cancel": "Cancel",
			"plan.addTask": "Add task",
			"plan.adding": "Adding…",
			"plan.taskAdded": "Task added",
			"plan.newTask": "New task subject",
			"plan.newTaskLabel": "Add a planned task",
			"plan.readySummary": "{members} members · {tasks} tasks · {links} dependencies",
			"plan.flow.aria": "Team launch flow",
			"plan.flow.review": "Review plan",
			"plan.flow.spawn": "Create members",
			"plan.flow.run": "Start work",
			"plan.members.title": "Members & model routes",
			"plan.members.count": "{count} members",
			"plan.members.empty": "No members planned yet",
			"plan.readySummarySolo": "Solo captain · {tasks} tasks · {links} dependencies",
			"plan.flow.spawnSolo": "Wake captain",
			"plan.approveHintSolo": "Approval lets the captain execute all {tasks} tasks itself.",
			"plan.members.countSolo": "0 members (captain runs)",
			"plan.members.soloEmpty": "Solo mode: no members are created; the captain executes every task.",
			"plan.align.title": "Requirement alignment",
			"plan.align.goal": "Goal: ",
			"plan.align.goalHost": "Host goal: ",
			"plan.align.nativeTeam": "Native Team: ",
			"plan.align.mode": "Mode: ",
			"plan.align.platforms": "Platforms: ",
			"plan.align.constraints": "Interview constraints: ",
			"plan.align.root": "Product root: ",
			"plan.align.source": "Plan source: ",
			"plan.align.ai": "AI-generated from the goal and interview",
			"plan.align.template": "⚠ Template fallback (tasks carry the goal/interview context; review anyway)",
			"plan.align.errorLabel": "Generation error: ",
			"plan.regenerate": "Regenerate plan",
			"plan.regenerateConfirm": "Discard this draft and regenerate the plan from the confirmed goal and interview?",
			"plan.regenerateMissing": "No confirmed clarification is stored, so the plan cannot be regenerated; return to chat first.",
			"plan.tasks.title": "Tasks & dependencies",
			"plan.tasks.count": "{count} tasks · {links} dependencies",
			"plan.tasks.empty": "No tasks planned yet",
			"plan.dependencies.none": "No dependencies",
			"plan.dependencies.count": "{count} dependencies",
			"plan.approve": "Approve & Run",
			"plan.approving": "Creating members…",
			"plan.approveTitle": "Plan ready?",
			"plan.approveHint": "Approval creates {members} members and schedules {tasks} tasks.",
			"plan.approveConfirmTitle": "Confirm team launch",
			"plan.approveWarning": "Member routes and dependencies cannot be edited here after launch.",
			"plan.approveConfirm": "Confirm launch",
			"plan.continue": "Return to chat & revise",
			"plan.returnToChat": "Return to chat",
			"plan.feedbackTitle": "Waiting for your revision direction",
			"plan.feedbackHint": "The Captain will ask in chat. After your reply, it will revise this draft and wait for approval again.",
			"plan.discard": "Discard this plan",
			"plan.discardConfirmTitle": "Discard this plan?",
			"plan.discardWarning": "The plan will end and be archived. No members have been spawned and no tasks will run.",
			"plan.discardConfirm": "Discard plan",
			"plan.discarding": "Discarding…",
			"plan.pendingEdits": "Save the current edits before launching the team.",
			"plan.saved": "Plan saved",
			"plan.failed": "Operation failed: {message}",
			"team.stats.members": "{count} members",
			"team.stats.completed": "{completed}/{total} completed",
			"team.stats.messages": "{count} messages",
			"delegation.aria": "Captain delegation map",
			"captain.name": "Captain",
			"captain.role": "Break down · Delegate · Synthesize",
			"captain.summary": "Assigned {tasks} tasks to {members} members",
			"captain.summary.staged": "Planned {tasks} tasks and {members} members; awaiting approval",
			"captain.summary.awaitingFeedback": "Draft preserved; waiting for your revision direction in chat",
			"captain.summary.discarded": "Plan discarded: {members} members were not created and {tasks} tasks did not run",
			"captain.summary.withTakeover": "Assigned {tasks} to members · Captain owns {captainTasks}",
			"captain.state.working": "{count} active",
			"captain.state.takeover": "Working on {tasks}",
			"captain.state.collected": "All reports received",
			"captain.state.waiting": "Waiting for reports",
			"captain.state.staged": "Awaiting approval",
			"captain.state.awaitingFeedback": "Awaiting feedback",
			"captain.state.discarded": "Discarded",
			"captain.state.settled": "Settled",
			"members.toggle": "Members {count}",
			"members.collapse": "Collapse",
			"members.expand": "Expand",
			"members.expandFinished": "Show finished ({count})",
			"members.empty": "No members yet; waiting for the captain to assemble the team",
			"assignment.label": "Captain assigned",
			"assignment.staged": "Planned task",
			"assignment.discarded": "Plan not run",
			"assignment.empty": "No tasks",
			"archive.label": "Ended · Archived history",
			"archive.discardedLabel": "Plan discarded · Archived history",
			"office.title": "Mountain gate",
			"office.members": "{count} cultivators",
			"office.progress": "Tasks {done}/{total}",
			"office.awaiting": "Awaiting approval",
			"office.stalled": "Stopped",
			"office.empty": "No members yet",
			"office.captain": "Captain",
			"office.working": "Working",
			"office.idle": "Idle",
			"office.unknown": "Unknown",
			"office.showBoard": "Board",
			"office.noConversation": "“{name}” has no conversation yet — one starts with the first task.",
			"office.showOffice": "Sect hall",
			"office.hallEmptyName": "Sect hall",
			"office.hallNoTeam": "No sect yet",
			"office.collapse": "Hide sect hall",
			"office.expand": "Show sect hall",
			"office.resize": "Drag to resize the sect hall",
			"office.hint": "Click a cultivator for their session; click the gate, library, stele or post for its panel",
			"office.hintShort": "Click a cultivator for their session · click a wall fixture for its panel",
			"office.swordBox": "Sword box",
			"office.roster": "Roster",
			"office.floorDoctrine": "Doctrine",
			"office.floorProgress": "Progress",
			"office.floorInbox": "Inbox",
			"office.floorSettings": "Settings",
			"office.floorGear": "Astral pavilion",
			"office.historyTeams": "Past sects",
			"office.historyCurrent": "Current",
			"office.viewingState": "In chat",
			"office.levelUp": "Level up!",
			"office.star": "Star",
			"office.starHint": "Like the hall? Star the repo.",
			"office.equipment": "Equipment",
			"office.weapon": "Artifacts",
			"office.mounts": "Mounts",
			"office.inventory": "Inventory",
			"item.weapon.tao": "Taoist sword",
			"item.weapon.spirit": "Spirit sword",
			"item.weapon.treasure": "Spirit treasure",
			"item.weapon.immortal": "Immortal artifact",
			"item.weapon.divine": "Divine artifact",
			"item.weapon.core": "Magic treasure",
			"item.weapon.spiritTreasure": "Spirit treasure",
			"item.weapon.immortalHigh": "Immortal artifact",
			"item.weapon.trueImmortal": "True-immortal artifact",
			"item.weapon.dao": "Dao artifact",
			"item.mount.sword": "Flying sword",
			"item.mount.beast": "Spirit beast",
			"item.mount.crane": "Immortal crane",
			"item.mount.qilin": "Qilin",
			"item.mount.dragon": "Divine dragon",
			"item.mount.jiao": "Jiao dragon",
			"item.mount.immortalCrane": "Immortal crane",
			"item.mount.kirin": "Kirin",
			"item.mount.trueDragon": "True dragon",
			"item.mount.phoenix": "Phoenix",
			"item.mount.daoBeast": "Dao beast",
			"skill.swordArray": "Sword array",
			"skill.gale": "Gale riding",
			"skill.law": "Dharma form",
			"skill.swordQi": "Sword qi",
			"skill.pillFire": "Pill fire",
			"skill.infantFire": "Infant fire",
			"skill.divinePower": "Divine power",
			"skill.domain": "Domain",
			"skill.dharma": "Dharma body",
			"skill.immortalArt": "Immortal art",
			"skill.daoArt": "Dao art",
			"office.levelEarnHint": "Cultivation grows from finished tasks and idle time — no shortcuts.",
			"office.equipLiveHint": "Equipped artifacts and mounts appear in the hall immediately, with a small equip callout.",
			"office.idleGain": "Idle: +{xp} XP / 10s (up to 3x while continuously online)",
			"office.mountSword": "Sword",
			"office.mountBeast": "Beast",
			"office.mountWalk": "Walk",
			"office.mountHint": "Cultivators walk; only a flying sword or a divine beast lifts them.",
			"office.equipped": "Equipped",
			"office.locked": "Locked",
			"office.skills": "Arts",
			"skill.none": "None yet",
			"skill.aura": "Spirit aura",
			"skill.weapon": "Natal artifact",
			"skill.sword": "Sword flight",
			"skill.shield": "Spirit shield",
			"skill.beast": "Beast taming",
			"skill.treasure": "Spirit treasure",
			"office.viewingCaptain": "Captain · main",
			"office.viewingMember": "{name} · cultivator",
			"office.viewingHint": "Whose conversation is currently open",
			"office.newTask": "New task",
			"office.newTaskHint": "Return to the main chat and tell the captain what task to create",
			"office.historyPast": "History",
			"office.taskHistory": "Completed work",
			"office.archiveCleanup": "Archive",
			"office.archiveCleanupHint": "Archive finished old teams",
			"office.archiveCleanupConfirm": "Archive {count} finished teams?",
			"office.archiveCleanupDone": "Archived {count} teams",
			"office.archiveCleanupEmpty": "No old teams to archive",
			"office.archiveCleanupFailed": "Archive failed, try again later",
			"office.archiveBusy": "Archiving…",
			"office.historyEmpty": "No past sects or finished work yet",
			"office.scene.settingsHint": "Resize and reposition the panel",
			"office.panelConfig": "Panel settings",
			"office.panelSizeHint": "Pick the panel size; you can also drag its bottom-right corner to resize freely.",
			"office.panelSize.compact": "Compact",
			"office.panelSize.normal": "Normal",
			"office.panelSize.large": "Large",
			"office.panelSize.huge": "Huge",
			"office.resetPosition": "Reset position",
			"office.chatter.1": "Incense is good today",
			"office.chatter.2": "Waiting for the captain",
			"office.chatter.3": "This pill is nearly done",
			"office.chatter.4": "My sword intent grew",
			"office.chatter.5": "Next sect is lively",
			"office.chatter.6": "A short rest, then again",
			"office.chatter.7": "Copying the sutras",
			"office.chatter.8": "Who is debating?",
			"office.sceneAria": "Sect hall of {name}",
			"office.rail": "Sect hall actions",
			"office.closePanel": "Close panel",
			"office.guide": "Click the gate, library, stele, Investiture board, astral pavilion or sect codex on the wall, or the buttons below, for its panel; click a cultivator for their session.",
			"office.guideDismiss": "Got it",
			"office.teamsHint": "Pick a sect to inspect; history is read-only.",
			"office.inboxCount": "{count} unread message(s)",
			"office.stagedReview": "Review founding plan",
			"office.facility.teams": "Gate · roster",
			"office.facility.board": "Stele · progress",
			"office.facility.config": "Library · doctrine",
			"office.facility.gear": "Astral pavilion · gear",
			"office.facility.ranks": "Ascension board · names",
			"office.facility.about": "Sect codex",
			"office.facility.inbox": "Post · inbox",
			"office.floorRanks": "Investiture",
			"office.ascension": "Investiture board",
			"office.ascensionIntro": "Fifteen realms are written here, from mortal to Dao ancestor — every stroke paid with deliveries and night watches.",
			"office.ascensionCurrent": "Current cultivation",
			"office.ascensionRealmList": "Realms",
			"office.ascensionFast": "Level faster",
			"office.ascensionStory": "Sect story",
			"office.ascensionYouAre": "current",
			"office.ascensionSect": "Sect roll",
			"office.floorAbout": "About",
			"office.aboutTitle": "Sect codex",
			"about.tab.group": "Community",
			"about.tab.sponsor": "Sponsor",
			"about.tab.about": "About",
			"about.tab.feedback": "Report a bug",
			"office.action.teamsHint": "Switch sects and read the roster history",
			"office.action.boardHint": "Open task dependencies and dispatch progress",
			"office.action.configHint": "Open members, task contracts and the founding plan",
			"office.action.gearHint": "Open artifacts, mounts and skills",
			"office.action.aboutHint": "Sponsorship, community, author projects and bug reports",
			"office.action.ranksHint": "Open the sect roll and the fifteen realms",
			"office.action.inboxHint": "Read unread messages to the captain",
			"app.title": "Cultivation World",
			"quickstart.entry": "Found sect",
			"quickstart.entryTitle": "Found a sect without typing a command",
			"quickstart.title": "Found a sect",
			"quickstart.desc": "Pick a doctrine and cultivators, then stage a sect plan. Nothing starts until you approve it.",
			"quickstart.goal": "Goal",
			"quickstart.goalPlaceholder": "e.g. Fix the intermittent 500 on the login API; tests live in tests/auth",
			"quickstart.template": "Template",
			"quickstart.roles": "Roles (multi-select, custom allowed)",
			"quickstart.stepDoctrine": "Doctrine",
			"quickstart.stepVow": "Vow",
			"quickstart.stepSect": "Sect",
			"quickstart.stepOath": "Oath",
			"quickstart.stepClarify": "Clarify",
			"quickstart.stepInterview": "Interview",
			"interview.hint": "AI drafted these questions from your requirement; pick options (defaults apply if skipped).",
			"interview.loading": "AI is drafting questions from your requirement…",
			"interview.loadingHint": "The template questions will appear in a moment.",
			"interview.fallback": "AI is unavailable; generic questions are shown and can be edited.",
			"interview.retry": "Regenerate questions",
			"interview.customPlaceholder": "Other answer, press Enter to add",
			"interview.multi": " (multi)",
			"interview.single": " (single)",
			"clarify.hint": "Align before founding: this page becomes the project constitution every member carries into the DAG.",
			"clarify.aiLoading": "AI is drafting options from this requirement…",
			"clarify.aiOptions": "These options were generated by AI from this requirement; add or remove as needed.",
			"clarify.aiFallback": "AI is unavailable; generic options are shown and can be edited.",
			"clarify.customPlaceholder": "Custom (comma separated)",
			"clarify.constraints": "Hard constraints",
			"clarify.confirmHint": "Confirm the mode and acceptance; the project constitution is then generated and enforced.",
			"mode.select": "Mode",
			"mode.draft": "Rapid draft (throughput)",
			"mode.precision": "Industrial precision (quality)",
			"mode.legacy": "Legacy rescue (maintenance)",
			"mode.compliance": "Strict compliance (audit)",
			"mode.monetize": "Monetize delivery (delivery-first)",
			"mode.desc.draft": "Hardcoding and skipped non-happy paths allowed; only the main flow must pass.",
			"mode.desc.precision": "Timeouts, reconnect, 72h soak, exception capture, no leaks.",
			"mode.desc.legacy": "Add-only surgery: old smoke first; a failing old suite blocks immediately.",
			"mode.desc.compliance": "No public network, no plaintext secrets, dependency and log audit.",
			"mode.desc.monetize": "Template UI + license check; drop non-revenue edges.",
			"clarify.type": "Type",
			"clarify.hardwareDev": "Hardware + software",
			"clarify.softwareDev": "Software only",
			"clarify.scale": "Project scale",
			"clarify.scaleSmall": "🟢 Small fix (1-3 days)",
			"clarify.scaleMedium": "🟡 Multi-module (1-2 weeks)",
			"clarify.scaleFullstack": "🔴 Full rewrite (months)",
			"clarify.ui": "UI",
			"clarify.referencePlaceholder": "Reference project or site name",
			"clarify.notesPlaceholder": "Extra notes: bright workshop light / one-handed use…",
			"clarify.platforms": "Target platforms",
			"clarify.hardware": "Hardware candidates (selection is yours)",
			"clarify.hardwareNote": "Candidates only; selection and purchase are the user decision.",
			"clarify.excluded": "Excluded",
			"clarify.excludedPlaceholder": "One custom exclusion per line",
			"clarify.acceptance": "Acceptance assertions (one executable criterion per line)",
			"clarify.acceptancePlaceholder": "e.g. no crash for 72h continuous run",
			"clarify.memoryHints": "Memory keywords (optional, comma separated)",
			"clarify.memoryHintsPlaceholder": "e.g. MES API, Win7, bright workshop light",
			"polish.button": "✨ AI polish",
			"polish.busy": "Polishing…",
			"polish.applied": "Polished requirement confirmed",
			"polish.original": "Original requirement (read-only)",
			"polish.expanded": "Polished requirement (editable, 200 chars max)",
			"polish.charLimit": "{count}/200 chars",
			"polish.conditions": "AI-suspected hidden conditions (check to confirm)",
			"polish.conditionsEmpty": "No hidden conditions suggested",
			"polish.confirm": "Confirm and clarify",
			"polish.cancel": "Cancel",
			"polish.degraded": "Model unavailable; the original text was kept. You can edit it manually.",
			"polish.degradedDetail": "AI returned no usable result: {error}",
			"polish.unchanged": "Polish finished without changing the text.",
			"memory.banner": "Team memory is currently goldfish mode. Install the memory-eternal plugin: project constraints persist, new agents arrive with experience, and the team learns your craft over time.",
			"memory.install": "[Install]",
			"memory.dismiss": "Dismiss",
			"memory.connected": "Brain connected",
			"library.title": "Dao Tradition · Scripture Library",
			"library.back": "Back to progress",
			"library.empty": "No sect yet — found one first.",
			"library.connected": "Live push",
			"library.disconnected": "Disconnected, reconnecting…",
			"library.todayCost": "Today ¥{cost}",
			"library.blocker": "Blocked at",
			"library.noBlocker": "No blocker; work is flowing",
			"library.unassigned": "unassigned",
			"library.status.pending": "todo",
			"library.status.claimed": "claimed",
			"library.status.inProgress": "running",
			"library.status.completed": "passed",
			"library.status.failed": "blocked",
			"library.acceptance": "checks {pass}/{total}",
			"library.gate": "gate {pass}/{total}",
			"library.stop": "Stop",
			"library.stopping": "Stopping…",
			"library.stopConfirm": "Stop this task? The running member is interrupted and downstream tasks are blocked.",
			"library.confirm": "Confirm stop",
			"library.cancel": "Cancel",
			"library.details": "Task & architecture details",
			"library.deps": "deps",
			"library.noDeps": "none",
			"library.pending": "pending",
			"library.inProgress": "in progress",
			"library.requirements": "Requirements (interview)",
			"library.skeleton": "Project skeleton",
			"library.failures": "{count} failed",
			"library.reqCol": "Requirement / constraint",
			"library.reqState": "State",
			"library.reqFailures": "Failures",
			"library.reqFailuresTotal": "Total failures",
			"library.architecture": "Core architecture (baseline)",
			"library.awaitingHuman": "awaiting human review",
			"library.confirmReview": "Confirm review",
			"library.confirming": "Confirming…",
			"library.confirmFailed": "Review confirmation failed",
			"library.description": "Details",
			"cost.ledger.title": "Cost ledger",
			"cost.ledger.today": "Today",
			"cost.ledger.total": "Total",
			"cost.ledger.refresh": "Refresh",
			"cost.ledger.byTask": "By task",
			"cost.ledger.recent": "Recent",
			"cost.ledger.unlinked": "unlinked",
			"cost.ledger.unmetered": "unmetered",
			"cost.ledger.captainTask": "captain execution (unmetered)",
			"cost.ledger.actual": "actual usage",
			"cost.ledger.empty": "No cost entries yet",
			"cost.title": "Cost check",
			"cost.body": "{member} spawn is estimated at ¥{estimate}, over the {reason} of ¥{threshold}.",
			"cost.task": "per-task threshold",
			"cost.day": "daily threshold",
			"cost.continue": "Continue",
			"cost.terminate": "Terminate this task",
			"cost.note": "Only this spawn is held; parallel work keeps running.",
			"cost.retryTitle": "Dead loop gate",
			"cost.retryBody": "This stage has been retried {count} times. Intervene manually?",
			"cost.retryNote": "Continue dispatches it again; intervene keeps the failure for your manual triage.",
			"cost.retryStop": "Intervene",
			"quickstart.doctrineHint": "Pick a doctrine first: it fixes the initial roster and how the sect will act.",
			"quickstart.vowHint": "Write the founding vow: what to solve and how completion is judged. The plan is staged from it.",
			"quickstart.sectHint": "Name the sect: reroll, pick a ready-made school, or define custom roles.",
			"quickstart.solo": "✦ Solo captain",
			"quickstart.soloActive": "✦ Solo captain (roster cleared)",
			"quickstart.soloCleared": "Roster cleared: the plan has no members; the captain executes every task itself.",
			"quickstart.soloHint": "One click clears the roster and enters solo mode; click again to restore a multi-member setup.",
			"quickstart.superFast": "Super fast execution",
			"quickstart.superFastHint": "Skip the AI interview and go straight to the sect and oath.",
			"quickstart.generationLost": "The generation connection was lost before a result arrived; please retry the oath.",
			"quickstart.soloSectHidden": "Solo mode only needs the goal and acceptance; no sect/role setup.",
			"quickstart.oathHint": "One last look before the oath: doctrine, sect and the first cultivators.",
			"quickstart.next": "Next",
			"quickstart.back": "Back",
			"quickstart.found": "Swear the oath",
			"quickstart.roleCount": "cultivators",
			"quickstart.goalLength": "{count} characters",
			"quickstart.goalShortcut": "Ctrl/⌘ + Enter for next step",
			"quickstart.summaryDoctrine": "Doctrine",
			"quickstart.summarySect": "Sect",
			"quickstart.summaryRoster": "First cultivators",
			"quickstart.summaryVow": "Founding vow",
			"quickstart.oathNotice": "The oath only stages a founding plan; the sect starts after you approve the plan.",
			"quickstart.tplFix": "Trial: purge",
			"quickstart.tplFeat": "Trial: build",
			"quickstart.tplResearch": "Trial: research",
			"quickstart.tplAudit": "Trial: audit",
			"quickstart.tplFullstack": "Trial: full stack",
			"quickstart.tplHardening": "Trial: hardening",
			"role.planner.name": "Strategist",
			"role.planner.ability": "plan & sequence",
			"role.implementer.name": "Sword cultivator",
			"role.implementer.ability": "build & fix",
			"role.frontend.name": "Illusion painter",
			"role.frontend.ability": "UI & interaction",
			"role.backend.name": "Ley-line master",
			"role.backend.ability": "API & data",
			"role.integrator.name": "Pact keeper",
			"role.integrator.ability": "integration & contract",
			"role.security.name": "Warden",
			"role.security.ability": "security & hardening",
			"role.verifier.name": "Pill cultivator",
			"role.verifier.ability": "verify & reproduce",
			"role.reviewer.name": "Elder",
			"role.reviewer.ability": "review & judge",
			"role.researcher.name": "Wanderer",
			"role.researcher.ability": "gather & explore",
			"role.analyst.name": "Diviner",
			"role.analyst.ability": "analyze & synthesize",
			"role.writer.name": "Scribe",
			"role.writer.ability": "write & organize",
			"role.auditor.name": "Inspector",
			"role.auditor.ability": "audit, read-only",
			"role.architect.name": "Array master",
			"role.architect.ability": "design & boundaries",
			"role.tester.name": "Trial officer",
			"role.tester.ability": "test & regress",
			"role.documenter.name": "Preacher",
			"role.documenter.ability": "document & examples",
			"role.operator.name": "Artificer",
			"role.operator.ability": "build & release",
			"role.talisman.name": "Talisman adept",
			"role.talisman.ability": "ward & seal",
			"role.healer.name": "Healer",
			"role.healer.ability": "heal & sustain",
			"role.beastmaster.name": "Beast tamer",
			"role.beastmaster.ability": "beasts & scouting",
			"role.puppeteer.name": "Puppeteer",
			"role.puppeteer.ability": "puppets & control",
			"role.musician.name": "Sound cultivator",
			"role.musician.ability": "sound & disruption",
			"role.poisoner.name": "Poison cultivator",
			"role.poisoner.ability": "venom & counter",
			"role.monk.name": "Monk",
			"role.monk.ability": "meditation & protection",
			"role.demon.name": "Demonic cultivator",
			"role.demon.ability": "dark arts & risk",
			"sect.jian.name": "Sword sect",
			"sect.jian.desc": "One blade breaks all arts · strikes and ships",
			"sect.dan.name": "Pill sect",
			"sect.dan.desc": "Alchemy and healing · verifies and restores",
			"sect.fuzhen.name": "Talisman sect",
			"sect.fuzhen.desc": "Talismans and arrays · seals and controls",
			"sect.mo.name": "Demonic sect",
			"sect.mo.desc": "Dark arts and bold moves · wins by surprise",
			"sect.fo.name": "Buddhist order",
			"sect.fo.desc": "Meditation and protection · steady progress",
			"sect.sanxiu.name": "Wanderers",
			"sect.sanxiu.desc": "Mixed paths · evidence and analysis",
			"sect.yushou.name": "Beast sect",
			"sect.yushou.desc": "Beasts and sound · scouting and inspection",
			"sect.lianqi.name": "Artifact sect",
			"sect.lianqi.desc": "Forging and delivery · build and release",
			"quickstart.sect": "Sect",
			"quickstart.sectRandom": "Random sect",
			"quickstart.sectCustom": "Custom",
			"quickstart.sectCustomHint": "Pick the 道途 yourself (multi-select)",
			"quickstart.sectRolled": "Rolled {sect} · click again to reroll",
			"quickstart.sectCustomPicked": "Custom 道途",
			"quickstart.tplBuild": "Trial: forge",
			"quickstart.tplArray": "Trial: array",
			"quickstart.tplDocs": "Trial: scripture",
			"quickstart.tplDebate": "Trial: debate",
			"quickstart.desc.fix": "Locate and fix a defect, then verify and review.",
			"quickstart.desc.feat": "Requirements to implementation, verification and review.",
			"quickstart.desc.research": "Parallel evidence gathering, synthesis and evidence check.",
			"quickstart.desc.audit": "Read-only audit with per-item evidence.",
			"quickstart.desc.fullstack": "Fix the contract first, build frontend and backend in parallel, then integrate, verify and review.",
			"quickstart.desc.hardening": "Read-only audit → minimal fix → exploit reproduction/regression → security review.",
			"quickstart.desc.build": "Converge changes, verify, then package and release.",
			"quickstart.desc.array": "Design boundaries and migration, then refactor in small steps.",
			"quickstart.desc.docs": "Outline, draft and review a document.",
			"quickstart.desc.debate": "Argue both sides, synthesize and judge.",
			"quickstart.replaceHint": "The current sect is still active. End it and found a new one:",
			"quickstart.replaceConfirm": "Replace the current sect?",
			"quickstart.replacePrompt": "Replace the current sect?",
			"quickstart.replaceAtSect": "A sect already exists; founding a new one ends it first.",
			"quickstart.replaceArmed": "Replace the old sect",
			"quickstart.replaceShort": "Replace & found",
			"quickstart.replace": "End old sect and found new",
			"quickstart.rolesEmpty": "Select roles",
			"quickstart.customRole": "Custom role",
			"quickstart.addRole": "Add",
			"quickstart.teamExists": "This session already has a sect. Continue it, or end it and start a new one below.",
			"quickstart.cancel": "Cancel",
			"quickstart.submit": "Stage plan",
			"quickstart.busy": "Staging…",
			"quickstart.generating": "Generating the founding plan: AI is planning tasks from the goal and interview (usually 10-60s), then the plan review opens automatically.",
			"quickstart.goalRequired": "Enter a goal first",
			"quickstart.created": "Plan staged: {team} ({sect}). Approve it in the team pane on the right.",
			"workspace.tabBoard": "Sect progress",
			"workspace.tabConfig": "Doctrine",
			"workspace.switchTeam": "Switch sect",
			"config.team": "Sect",
			"config.phase": "Phase",
			"config.halted": "Stopped",
			"realm.qi": "Qi refining",
			"realm.foundation": "Foundation",
			"realm.golden": "Golden core",
			"realm.nascent": "Nascent soul",
			"realm.spirit": "Spirit transformation",
			"realm.void": "Void refining",
			"realm.mahayana": "Mahayana",
			"realm.mortal": "Mortal",
			"realm.integration": "Body integration",
			"realm.tribulation": "Tribulation",
			"realm.trueImmortal": "True immortal",
			"realm.goldenImmortal": "Golden immortal",
			"realm.taiyi": "Taiyi",
			"realm.daluo": "Daluo",
			"realm.dao": "Dao ancestor",
			"rank.desc.mortal": "No qi yet. Copying scriptures, carrying water and running errands are all practice; even a peach-wood sword can cut a first spark of sword intent.",
			"rank.desc.qi": "Qi enters the body and the sea of qi takes shape. You can ride a sword three inches off the ground and take on real work.",
			"rank.desc.foundation": "A foundation is laid and the sea of qi settles. Your natal artifact answers to you; you can run a sect errand alone.",
			"rank.desc.golden": "Qi condenses into a golden core and lifespan grows. Arts become laws, and every move has form.",
			"rank.desc.nascent": "The core becomes an infant soul and divine sense reaches outward; you can track several task lines at once.",
			"rank.desc.spirit": "Infant soul and spirit merge; words become law, and the sect doctrine is written by your hand.",
			"rank.desc.void": "You touch the void and step short distances; no desk or gate can hold you.",
			"rank.desc.integration": "Body and heaven join; every gesture is a formation, and the sect fortune moves with you.",
			"rank.desc.mahayana": "One person can hold a sect. Your vermilion seal stays lit, and cranes and qilin come to serve.",
			"rank.desc.tribulation": "Lightning strikes. Every delivery is a bolt of heavenly thunder; survive it and you are a true immortal.",
			"rank.desc.trueImmortal": "Listed among immortals, lifespan equal to heaven. You can awaken juniors and shield the sect from a calamity.",
			"rank.desc.goldenImmortal": "A golden body that never decays; a thought brings you anywhere. The grand mountain array answers to you.",
			"rank.desc.taiyi": "Taiyi saves the suffering; small fates can be reversed and karma re-inked. Fewer than a hundred names remain on the board.",
			"rank.desc.daluo": "Above Daluo there are no years. One dream lasts a thousand autumns; a sect rise and fall is a single thought.",
			"rank.desc.dao": "One with the Dao. The final stroke on the Investiture board is yours to write.",
			"ascension.tip.tasks": "Finish tasks: each completed task grants 60 + 15 x current level XP — the higher your level, the bigger the payout.",
			"ascension.tip.captain": "Lead: the captain earns an extra 40 + 8 x current level XP for every completed sect task.",
			"ascension.tip.idle": "Idle: every cultivator in the current conversation panel earns XP (10 per 10s at Lv.1, faster up to Lv.100); the one being spoken to adds +0.5x each minute (up to 3x), with up to 8 hours of offline catch-up. After 100 it slows down gradually.",
			"ascension.tip.first": "Back-pay: the first time a cultivator finished tasks are seen, their history is settled once at the current level.",
			"ascension.tip.gear": "Gear cadence: Lv.5 unlocks the flying sword, Lv.8 the spirit beast, then a new mount roughly every 20 levels. Gear changes style, not XP.",
			"ascension.story.1": "In the year Doufa Sect was founded, the mountain gate held only one peach-wood sword. The founder nailed a notice to the stone wall of the training yard and said: this board records no names, only cultivation. Fifteen golden lines mark the fifteen heavens from mortal to Dao ancestor.",
			"ascension.story.2": "The sect rose and fell; the board was scorched by thunder and salted by sea wind, yet its words grew clearer each day. When a cultivator breaks through, a vermilion seal lights up; when a disciple leaves the mountain, the board dims a little. The disciples say the board does not record events — the sect is remembering, for each of them, the road already walked.",
			"ascension.story.3": "Now it is your turn. Every delivery, every night watch, every quiet patch you fix leaves a very fine stroke on the board. When all fifteen golden lines are lit, you will look back and find that you, too, have become a lamp.",
			"about.groupHint": "Scan to join the product community (QQ or WeChat); ask questions directly.",
			"about.groupCaption": "QQ community",
			"about.groupCaptionWechat": "WeChat community",
			"about.groupNote": "Plugin updates and usage questions are announced there.",
			"about.sponsorHint": "If this plugin saved you time, you can support the Mengyou team.",
			"about.sponsorPay": "WeChat pay code",
			"about.sponsorReward": "WeChat reward code",
			"about.sponsorNote": "Sponsorship is optional and changes nothing; the plugin stays MIT and free.",
			"about.sponsorLink": "Sponsorship notes (SPONSOR.md)",
			"about.intro": "DSH Pixel Team draws multi-agent teamwork as a pixel sect: the captain assigns work, cultivators sit at their desks, tasks line the tables, and cultivation levels float above every head. Maintained by Huizhou Mengyou Technology Co., Ltd.; open source, free, and all data stays local.",
			"about.version": "Version",
			"about.author": "Company",
			"about.license": "License",
			"about.companyNote": "Maintained and published by Huizhou Mengyou Technology Co., Ltd. Code is MIT; the pixel hall, cultivation system and interface assets are original to this project.",
			"about.repo": "GitHub repository",
			"about.issues": "Issues",
			"about.releases": "Releases",
			"about.feedbackWhy": "GitHub does not allow anonymous issues, so this only prefills the new-issue link with title, body and diagnostics; it is submitted when you press Submit. You can also copy it to an AI.",
			"about.feedbackPlaceholder": "What happened: where you clicked, what you expected, what actually occurred.",
			"about.feedbackDiag": "Diagnostics (collected automatically)",
			"about.feedbackOpenIssue": "Open a GitHub issue",
			"about.feedbackCopyDiag": "Copy diagnostics",
			"about.feedbackCopyPrompt": "Copy AI prompt",
			"about.feedbackCopied": "Copied to clipboard",
			"about.feedbackCopyFail": "Copy blocked; select and copy manually",
			"about.feedbackNeedText": "Write a short problem description first",
			"about.feedbackOpenFail": "The browser blocked the new window; allow popups or open GitHub Issues directly.",
			"about.feedbackPrivacy": "Diagnostics only include version, browser, viewport and a team summary — no conversation content or file paths.",
			"about.groupFallback": "If the QR code fails to load, the same code is in SPONSOR.md in the repository.",
			"config.realm": "Realm",
			"office.realm": "Realm",
			"config.phaseStaged": "Awaiting approval",
			"config.phaseRunning": "Running",
			"config.phaseCompleted": "Completed",
			"config.kind.work": "Work",
			"config.kind.requirements": "Requirements",
			"config.kind.implementation": "Implementation",
			"config.kind.verification": "Verification",
			"config.kind.review": "Review",
			"config.kind.repair": "Repair",
			"config.kind.integration": "Integration",
			"config.members": "Cultivators",
			"config.tasks": "Tasks",
			"config.name": "Name",
			"config.role": "Role",
			"config.model": "Model",
			"config.effort": "Effort",
			"config.task": "Task",
			"config.assignee": "Assignee",
			"config.status": "Status",
			"config.deps": "Deps",
			"config.unassigned": "Unassigned",
			"config.stagedHint": "The plan is not approved yet: edit members and tasks under Setup, then approve it there.",
			"config.hint": "Members and tasks are read-only while running; ask the captain in chat to change them.",
			"config.stagedTitle": "Plan awaiting approval",
			"config.stagedBody": "Members are spawned and tasks dispatched only after approval.",
			"config.openConfig": "Open setup"
		};
		//#endregion
		//#region lib/client/index.js
		/** Required services: conversation nodes, slots, sessions navigation, and locale. */
		const inject = [
			"uiConversation",
			"slots",
			"sessions",
			"locale",
			"modelDirectories",
			"layout"
		];
		const useLegacyPanelInfo = (select) => select({ activePanelId: null });
		/** The replayed user message is the canonical transcript entry. */
		function HiddenAgentTeamsCommand() {
			return null;
		}
		/**
		* Register the activity monitor in the shell's additive overlay and the
		* in-conversation team card. The card's activity button re-opens a folded
		* monitor via a window event — the recovery path for an old session.
		*/
		function apply(ctx) {
			const bridge = createWorkspaceBridge();
			const state = createWorkspaceState();
			ctx.effect(() => ctx.locale.register(AGENT_TEAMS_LOCALE_NAMESPACE, {
				zh,
				en
			}), "agent-teams: dictionaries");
			const openCaptain = (captainSessionId) => {
				try {
					openAgentTeamCaptain(ctx.sessions, captainSessionId, ctx.layout, ctx.get("uiWorkspace"));
				} catch (error) {
					console.warn(`agent-teams: failed to open captain transcript ${captainSessionId}: ${String(error)}`);
				}
			};
			const openMember = (parentId, childId) => {
				openAgentTeamMember(ctx.sessions, parentId, childId, ctx.layout, ctx.get("uiWorkspace")).catch((error) => {
					console.warn(`agent-teams: failed to open member transcript ${childId}: ${String(error)}`);
				});
			};
			const Panel = ({ t, usePanelInfo }) => {
				const conversationVisible = (usePanelInfo ?? useLegacyPanelInfo)((panel) => panel.activePanelId === null);
				return (0, react_jsx_runtime.jsx)(ActivitySurface, {
					bridge,
					state,
					conversationVisible,
					sessionsList: ctx.sessions.list,
					modelDirectories: ctx.modelDirectories,
					openMember,
					openCaptain,
					t
				});
			};
			ctx.inject(["sidebarRight", "sidebarRightTabs"], (native) => {
				const t = native.locale.bind(AGENT_TEAMS_LOCALE_NAMESPACE);
				native.effect(() => native.sidebarRightTabs.register({
					id: TEAM_TAB_ID,
					kind: TEAM_TAB_KIND,
					title: () => t("workspace.title")
				}));
				native.slots.inject("conversation.session.header.actions", () => native.slots.register({
					name: "conversation.session.header.actions",
					id: "agent-teams-create",
					order: 49,
					locale: AGENT_TEAMS_LOCALE_NAMESPACE
				}, TeamQuickStart));
				native.slots.inject("conversation.chat.turnTail", () => native.slots.register({
					name: "conversation.chat.turnTail",
					id: "agent-teams-summary",
					order: 50,
					locale: AGENT_TEAMS_LOCALE_NAMESPACE,
					inject: () => ({ openMember })
				}, TeamTurnCard));
				native.slots.inject("sidebar.right.pane.tab", () => {
					const dispose = native.slots.register({
						name: "sidebar.right.pane.tab",
						key: TEAM_TAB_ID,
						locale: AGENT_TEAMS_LOCALE_NAMESPACE,
						inject: () => ({
							state,
							modelDirectories: native.modelDirectories,
							openMember
						})
					}, WorkspaceActivity);
					bridge.set(native.sidebarRight);
					return () => {
						bridge.set(void 0);
						dispose();
					};
				});
			});
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "agent-teams-activity",
				order: 80,
				label: "AgentTeams activity",
				locale: AGENT_TEAMS_LOCALE_NAMESPACE
			}, Panel));
			ctx.slots.inject("conversation.chat.commandview", () => ctx.slots.register({
				name: "conversation.chat.commandview",
				key: "agent-teams"
			}, HiddenAgentTeamsCommand));
			ctx.uiConversation.events.register(agentTeamsCardDefinition);
			ctx.slots.inject("conversation.chat.node", () => ctx.slots.register({
				name: "conversation.chat.node",
				key: "agent-teams",
				locale: AGENT_TEAMS_LOCALE_NAMESPACE,
				inject: () => ({
					openMember,
					workspaceBridge: bridge
				})
			}, AgentTeamsCard));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map