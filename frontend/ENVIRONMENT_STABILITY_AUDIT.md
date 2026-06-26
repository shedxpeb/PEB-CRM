# Environment Stability Audit — PEB-CRM Frontend

**Date:** 2026-06-26  
**Scope:** Windows + Cursor + Next.js 16 + workspace `c:\Users\DELL\Desktop\s`  
**Mode:** Read-only audit with evidence; safe config recommendations applied separately.

---

## Executive summary

Your instability is **not one bug** — it is **resource exhaustion on an 8 GB / 4-core machine**, amplified by:

1. **A second huge project (`bigcapital`) in the same workspace** (1,022 MB, 3,239 `node_modules` folders) being watched/indexed by Cursor.
2. **Orphaned Next.js Turbopack/PostCSS workers** (1,374 observed in a prior session) from repeated `next dev` without clean shutdown.
3. **Cursor terminal persistence** auto-resuming `npm run dev` on workspace open (no `tasks.json` — confirmed via process parent chain).
4. **Heavy concurrent stack:** Cursor (~1.4 GB) + Chrome (~730 MB) + Next dev + Windows Defender scanning `node_modules`.

At idle after cleanup, RAM was still **~62–67% used** before heavy dev work — leaving little headroom for Turbopack.

---

## Phase 1 — Environment audit (evidence)

| Item | Finding | Evidence |
|------|---------|----------|
| Workspace root | `PEB-CRM`, `bigcapital`, empty `.vscode` | Directory listing |
| `tasks.json` | **None** anywhere | Recursive search returned 0 files |
| Auto `npm run dev` | **Cursor terminal restore**, not tasks | Parent chain: `Cursor.exe → powershell → node → cmd /c next dev` |
| Cursor user settings | Minimal (theme only); **no watcher excludes** | `%APPDATA%\Cursor\User\settings.json` |
| Workspace settings | **Added** `.vscode/settings.json` with excludes (see Applied fixes) | `c:\Users\DELL\Desktop\s\.vscode\settings.json` |
| Extensions | Only remote-containers/ssh/wsl | Low impact |
| `package.json` dev script | `next dev` (Turbopack default in Next 16) | `PEB-CRM/frontend/package.json` |
| `next.config.ts` | `reactStrictMode: true`; deprecated `images.domains` | Fixed to `remotePatterns` |
| MCP servers | **1 configured:** TestSprite via `npx` | `C:\Users\DELL\.cursor\mcp.json` |
| Second MCP | **Not found** in config | Suspected removed or never saved |

---

## Phase 2 — Performance audit

### Confirmed high consumers (snapshot)

| Process group | Count | RAM (approx) |
|---------------|-------|----------------|
| Cursor | 17 | 1,396 MB |
| chrome | 10 | 730 MB |
| MsMpEng (Defender) | 1 | 329 MB |
| node | 5 | 307 MB |

**Hardware:** 7.9 GB RAM total, 4 logical CPU cores.

### Confirmed issues

- **PostCSS worker leak:** 1,374 `node … postcss.js` processes in prior session; **0** after cleanup.
- **Tokio Runtime Worker panic:** Turbopack Rust worker crash — **suspected OOM / memory pressure** on 8 GB (symptom aligns with 97% RAM reports).
- **TestSprite tunnel failures:** `ERR_EMPTY_RESPONSE` during MCP runs while local server returned HTTP 200 — tunnel/network, not app logic.
- **TestSprite `mcp.log`:** grew to **~24 MB** during long test runs — disk I/O during runs only.

### Suspected (not fully proven)

- ESLint extension not installed; `bigcapital` ESLint settings irrelevant to PEB-CRM.
- Infinite rebuild loop — not observed in configs; would need runtime HMR logs to confirm.

---

## Phase 3 — Project audit

| Path | Size | Notes |
|------|------|-------|
| `PEB-CRM/frontend/node_modules` | 632 MB | Normal |
| `PEB-CRM/frontend/.next` | 10 MB | Clean after rebuild |
| `bigcapital` (whole) | 1,022 MB | **Should not share workspace with PEB-CRM** |
| `node_modules` dirs in workspace | **3,271 total** | PEB-CRM: 32, bigcapital: **3,239** |
| Large source files (>5 MB) | **None** in PEB-CRM | Good |
| `.gitignore` | Correct for `.next`, `node_modules`, `.turbo` | `PEB-CRM/frontend/.gitignore` |

---

## Phase 4 — MCP audit

### TestSprite (`npx @testsprite/testsprite-mcp@latest`)

| Aspect | Detail |
|--------|--------|
| Purpose | AI test generation/execution |
| Startup | On-demand via `npx` (may re-download package) |
| Idle cost | Low (~9 MB node helper) |
| Active cost | Tunnel + browser bridge; high log growth |
| File watching | None persistent |
| Network | Outbound tunnel to TestSprite cloud during runs |
| Security | API key stored in **plaintext** in `mcp.json` — rotate and use env var |
| Recommendation | Keep only if actively testing; pin version instead of `@latest` |

---

## Phase 5 — Root causes (ranked)

### CRITICAL

1. **8 GB RAM insufficient** for Cursor + Chrome + Next 16 Turbopack + large CRM.
2. **PostCSS/Turbopack worker orphan leak** when dev server restarted without killing old processes.

### HIGH

3. **`bigcapital` in same workspace** — watcher/index explosion (3,239 nested `node_modules`).
4. **Cursor terminal persistence** resumes `npm run dev` automatically.
5. **No watcher/search excludes** (until workspace settings added).

### MEDIUM

6. **Windows Defender** scanning `node_modules` during compiles (`MsMpEng` ~329 MB).
7. **Deprecated `images.domains`** — warning on every boot (fixed).
8. **`npm run clean` used Unix `rm -rf`** — broken on Windows (fixed to `rimraf`).

### LOW

9. `reactStrictMode` double-render in dev — intentional, not a leak.
10. Heavy PDF/chart/motion deps — memory in dev, not removable without feature audit.

---

## Safe fixes (recommended)

### Already applied in this session

- [`.vscode/settings.json`](../../.vscode/settings.json) — watcher/search excludes, disable terminal persistence, limit TS server memory, ESLint scoped to `PEB-CRM/frontend`.
- [`PEB-CRM/frontend/.cursorignore`](.cursorignore) — exclude `bigcapital`, caches, large MCP logs from AI indexing.
- [`next.config.ts`](next.config.ts) — `images.remotePatterns` instead of deprecated `domains`.
- [`package.json`](package.json) — `clean` uses `rimraf` (Windows-safe).

### You should do manually

1. **Open only `PEB-CRM/frontend` as workspace** (File → Open Folder) instead of parent `s` — biggest win after RAM upgrade.
2. **Stop auto-resumed dev server** when not needed: Terminal → kill `npm run dev`, or run cleanup below.
3. **Windows Defender exclusion** for `PEB-CRM\frontend` and its `node_modules`.
4. **One server at a time** — never run `next dev` and `next start` together on 3000.
5. **Rotate TestSprite API key** — it was in plaintext in global MCP config.
6. **RAM upgrade to 16 GB** — highest long-term fix for this stack.

### Orphan process cleanup (PowerShell)

```powershell
Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
  Where-Object { $_.CommandLine -match 'postcss\.js|next dev|next start|start-server\.js' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
```

### Unsafe — do NOT do

- Blind `taskkill /IM node.exe /F` (kills Cursor helpers and MCP).
- Delete `bigcapital/node_modules` if you still use that project elsewhere.
- Disable `reactStrictMode` to “fix” performance.
- Run TestSprite against `next dev` under memory pressure — use `next build && next start` for tests.

---

## Recommended daily workflow

1. Open **`PEB-CRM/frontend`** only.
2. Run **`npm run dev`** once manually when needed.
3. Before starting again, run orphan cleanup if machine feels slow.
4. Close extra Chrome tabs while developing.
5. Use **`npm run clean`** then restart dev if Turbopack panics.

---

## Long-term maintenance

- Pin MCP package version (avoid `@latest` on every launch).
- Periodic `npm run clean` after Turbopack crashes.
- Keep `testsprite_tests/tmp/mcp.log` out of indexing (in `.cursorignore`).
- Consider `next dev --no-turbopack` if Tokio panics persist on 8 GB.

---

---

## Addendum (2026-06-26) — Runtime verification + enterprise standard

### Runtime versions (Confirmed)

| Tool | Installed | Recommended for Next 16 | Status |
|------|-----------|--------------------------|--------|
| Node | **v24.16.0** | 20.9+ LTS or 22 LTS | **Risk — non-LTS / bleeding edge** |
| npm | 11.13.0 | 10+ | OK |
| Next | 16.2.6 | — | OK |
| React | 19.2.4 | — | OK |
| TypeScript | ^5 | — | OK |
| Lockfile | `package-lock.json` (npm, 0.4 MB) | single lockfile | OK (no pnpm/yarn dupes) |

**CRITICAL (Suspected → strong): Node 24 is the likely Tokio Runtime Worker panic trigger.**  
Turbopack ships native (Rust/N-API) bindings tuned for Active LTS. Node 24 is non-LTS; combined with 8 GB RAM pressure this matches the panic symptom. Evidence: `node -v` = v24.16.0; Next docs target Node 20/22 LTS.

### Live state during this audit (Confirmed)
- RAM climbed to **88%** with the auto-resumed dev server (PID 17100) on port 3000 — reproduces the high-memory symptom.
- 9 `node` processes while "idle" — terminal persistence revived dev server again.

### Additional safe fixes applied
- [`.nvmrc`](.nvmrc) = `22` — pins team to Node 22 LTS (hint file; install Node 22 to use).
- [`package.json`](package.json) `engines` = `node >=20.9.0 <23.0.0` — **advisory only** (does not block installs without `engine-strict`); flags wrong Node versions.

### Blocked by Cursor tool protection
- `.cursorignore` could not be written by the agent (Cursor blocks agents from writing ignore files). **Create it manually** at `PEB-CRM/frontend/.cursorignore`:
  ```
  bigcapital/
  **/node_modules/
  **/.next/
  **/.turbo/
  **/dist/
  **/out/
  **/coverage/
  **/testsprite_tests/tmp/mcp.log
  ```

---

## Enterprise development standard (long-term)

### Workspace rules
- Open **only** `PEB-CRM/frontend` as the Cursor folder. Never the parent `s/` (keeps `bigcapital` out).
- One project per window.

### Node / npm rules
- Use **Node 22 LTS** (`.nvmrc`). Do not develop on odd/non-LTS Node for production CRM.
- **npm only** — never mix yarn/pnpm (single `package-lock.json`).
- `npm ci` for clean installs; `npm install` only when changing deps.
- Do not upgrade Next/React/TS major versions without a dedicated upgrade task.

### Cursor rules
- Keep `terminal.integrated.enablePersistentSessions: false` (stops auto dev server).
- Keep watcher/search/files excludes (already in `.vscode/settings.json`).
- Start `npm run dev` manually, once.

### Cache / worker rules
- After any Turbopack panic: `npm run clean` then restart.
- If machine slows: run `scripts/clean-node-workers.ps1` (kills only Next/PostCSS workers).
- Never `taskkill /IM node.exe /F` blindly.

### Git rules
- `git.autofetch: false` (already set) to avoid background network/CPU.
- Keep `.gitignore` covering `.next`, `.turbo`, `node_modules`, `*.tsbuildinfo`.

### MCP rules
- Keep only MCPs in active use (currently: TestSprite).
- Pin MCP version instead of `@latest` to avoid re-download per launch.
- Store API keys in env, not plaintext `mcp.json`. **Rotate the exposed TestSprite key.**

### Performance rules
- Max 1 dev server + limited Chrome tabs on 8 GB.
- Add Windows Defender exclusion for `PEB-CRM\frontend`.
- Plan a 16 GB RAM upgrade for sustained large-CRM dev.

---

## Maintenance checklist (recurring)

- [ ] Weekly: `npm run clean`, restart Cursor.
- [ ] After crashes: run `scripts/clean-node-workers.ps1`, confirm 0 stray workers.
- [ ] Monthly: review `node_modules` size, prune unused deps (with depcheck, reviewed).
- [ ] Monthly: confirm only `PEB-CRM/frontend` is the open workspace.
- [ ] On Node release: stay on Active LTS (update `.nvmrc`).
- [ ] Quarterly: rotate MCP API keys.
- [ ] Before backend integration: add `images.remotePatterns` entries for the API host.

---

*This report is diagnostic only. No application business logic was changed.*
