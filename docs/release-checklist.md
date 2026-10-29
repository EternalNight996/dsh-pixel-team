# Release checklist (dsh-pixel-team)

Date: 2026-10-29 (v0.1.56). Automated gates are reproducible; manual gates are
still required before a public release.

## Automated (green)

| Gate | Command | Status |
|---|---|---|
| TypeScript | pnpm typecheck | pass |
| Build + artifact stamp | pnpm build | pass |
| Browser-side contracts | pnpm verify:web-routes | 108/108 |
| Release metadata + package smoke | pnpm verify:release | pass |
| Tracked lib + import graph | pnpm verify:release-guard | pass (run after `git add` of every new lib file, before tagging) |
| Source/build/config stamps | node scripts/verify.mjs | pass |
| Full suite | pnpm verify | exit 0 |
| CI | .github/workflows/verify.yml | typecheck + build + committed lib + verify + release-guard on push/PR |

## Package smoke

pnpm verify:release runs npm pack --dry-run and asserts:

- lib/index.js, lib/client.js and the pixel-office scene are shipped;
- assets/support/group-qr.jpg, group-wechat.jpg, wechat-pay.jpg, wechat-reward.jpg are shipped and
  match the host route allowlist;
- SPONSOR.md, README.md, cordis.patch.yml and package.json are shipped;
- no src/, docs/ or *.test.mjs ships; only the intended runtime scripts
  (compatibility, doctor, legacy-session-source-repair) are included;
- tarball is non-trivial and under the 8 MB budget.

The dry-run tarball is checked for the required runtime files and the 8 MB budget.

## Manual gates (not yet run for this build)

1. Real browser smoke: 6 wall facilities + 7 bottom-bar entries, 宗门志 scroll and
   QR loading, equipment switch feedback, feedback copy/prefilled issue.
2. Packaged artifact into an isolated profile: cold start + real host support
   route /plugins/dsh-pixel-team/support/*.
3. Real-model minimal business: clarify → polish → plan → create → dispatch →
   execute → verify → review.
4. SSE library panel: /plugins/dsh-pixel-team/events push (EventSource auth,
   no buffering) after an app restart.
5. Cost dialog: an over-threshold spawn shows the prompt and "terminate" cancels
   only that spawn while parallel work continues.
6. A/B: single agent vs 5-person fullstack, compare wall clock, tokens, first-pass
   pass rate (suggest wall clock -25%, tokens <=1.3x, pass rate not lower).

## Deploy note

GitHub-only releases: npm `latest` intentionally stays on 0.1.16.
Every generated lib file must be tracked before tagging (0.1.44 missed
lib/architecture.js; `pnpm verify:release-guard` now checks this).
The desktop profile follows the latest GitHub tag.
