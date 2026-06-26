# PEB CRM — Environment Maintenance Checklist

Recurring tasks to keep the development environment stable long-term.
All commands run from `PEB-CRM/frontend`.

## Daily (before starting work)
- [ ] `nvm use 22` (confirm Node 22 LTS).
- [ ] `npm run doctor` — resolve any CRITICAL before coding.
- [ ] Start `npm run dev` once, manually (do not rely on terminal restore).
- [ ] Keep Chrome tabs minimal.

## After a crash / slowdown
- [ ] `npm run clean:workers` — clear stray Next/PostCSS workers.
- [ ] `npm run doctor` — confirm 0 stray workers and RAM headroom.
- [ ] If Turbopack panicked: `npm run clean` then restart dev.

## Weekly
- [ ] `npm run clean` (clear `.next`/`.turbo`) and restart dev fresh.
- [ ] Restart Cursor to release Extension Host / TS server memory.
- [ ] Verify only `PEB-CRM/frontend` is the open workspace.

## Monthly
- [ ] Review `node_modules` size; run a reviewed depcheck before removing anything.
- [ ] Confirm `.vscode/settings.json` excludes and `.cursorignore` are intact.
- [ ] Verify no unrelated projects were added to the workspace folder.
- [ ] Check disk free space (> 10 GB) via `npm run doctor`.

## Quarterly
- [ ] Rotate MCP (TestSprite) API key.
- [ ] Review Node LTS status; bump `.nvmrc` + `engines` when moving LTS.
- [ ] Review dependencies for deprecations (no auto-upgrades).

## Before backend integration
- [ ] Add the API host to `next.config.ts` `images.remotePatterns`.
- [ ] Re-run `npm run doctor` after wiring the backend dev server (avoid port clashes with 3000).
