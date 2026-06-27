# PEB CRM — Development Environment Standard

Official development standard for the PEB CRM frontend. Keep this environment
healthy as the CRM grows. This document is configuration/process only — it does
not change application code or business logic.

**Project type:** Frontend-only (Next.js 16, React 19, TypeScript, Tailwind 4).
Backend will be added later.

---

## 1. Supported toolchain

| Tool | Required | Notes |
|------|----------|-------|
| Node.js | **22 LTS** (range `>=20.9.0 <23.0.0`) | Pinned in `.nvmrc` and `package.json` `engines`. Non-LTS Node (e.g. 24) is a confirmed stability risk with Turbopack. |
| npm | **>=10** | Single package manager. Do not mix yarn/pnpm. |
| Next.js | 16.2.6 | Do not upgrade major without a dedicated task. |
| React | 19.2.4 | — |
| TypeScript | 5.x | — |
| Cursor | Latest stable | — |

Run `nvm use` (Windows: `nvm use 22`) before working.

---

## 2. Required extensions
Keep minimal. Currently installed remote-* extensions are fine. Recommended only:
- ESLint (if you want inline lint) — scoped to `PEB-CRM/frontend`.
- Prettier (matches `prettier` dep).

Avoid heavy extensions (extra language servers, AI add-ons) on an 8 GB machine.

---

## 3. Required MCP servers
| MCP | Status | Rule |
|-----|--------|------|
| TestSprite | Keep (only when testing) | Pin version instead of `@latest`; **rotate the API key** and move it out of plaintext `mcp.json`. |

No other MCP should be installed without review (each adds processes/network).

---

## 4. Folder structure rule
Open **only** `PEB-CRM/frontend` as the Cursor workspace folder.

Do NOT open the parent `Desktop\s` folder — that causes Cursor to index/watch
unrelated sibling projects (previously `bigcapital`, now removed). One project
per window.

```
PEB-CRM/
  frontend/        <-- open THIS as the workspace
    src/
    docs/
    scripts/
    .vscode/ (or workspace-root .vscode)
```

---

## 5. Workspace rules
- `.vscode/settings.json` (workspace root) must contain watcher/search/file
  excludes for `node_modules`, `.next`, `.turbo`, `dist`, `out`.
- `terminal.integrated.enablePersistentSessions: false` — prevents auto-resuming
  `npm run dev` on open (confirmed prior cause of surprise dev servers).
- `task.allowAutomaticTasks: off`.
- `git.autofetch: false`.

## 6. Git rules
- Keep `.gitignore` covering `.next/`, `.turbo`, `node_modules`, `*.tsbuildinfo`, `.env*`.
- Never commit `.next`, caches, or secrets.
- Commit only when explicitly intended.

## 7. AI / indexing rules
- Maintain `.cursorignore` in `PEB-CRM/frontend` (must be created manually — Cursor
  blocks agents from writing ignore files):
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

## 8. Performance rules
- One dev server at a time. Never run `next dev` and `next start` on port 3000 together.
- Limit Chrome tabs while developing (Chrome was ~730 MB).
- Add a Windows Defender exclusion for `PEB-CRM\frontend` (reduces compile CPU).
- Target a 16 GB RAM upgrade for sustained large-CRM work (8 GB is the core constraint).

## 9. Cache rules
- After any Turbopack/Tokio panic: `npm run clean`, then restart dev.
- Do not delete `.next` while the dev server is running.

## 10. Startup rules
1. `nvm use 22`
2. Open `PEB-CRM/frontend` in Cursor.
3. `npm run doctor` (verify environment).
4. `npm run dev` — once, manually.

## 11. Recovery rules
- Slow/frozen machine: `npm run clean:workers` (kills only Next/PostCSS workers).
- Never `taskkill /IM node.exe /F` (kills Cursor/MCP helpers too).
- Port 3000 stuck: find owner via `npm run doctor`, stop that PID only.

---

## 12. Troubleshooting guide

| Symptom | Likely cause | Action |
|---------|--------------|--------|
| Tokio Runtime Worker panic | Non-LTS Node + memory pressure | Switch to Node 22; `npm run clean`; restart |
| RAM ~97%, PC slow | Multiple node procs + Chrome + Cursor | `npm run doctor`, `npm run clean:workers`, close tabs |
| "Another next dev server is already running" | Terminal persistence revived it | Stop old PID; ensure persistence disabled |
| Hundreds of node procs | PostCSS/Turbopack worker leak | `npm run clean:workers` |
| Search/indexing slow | Unrelated project in workspace | Open only `frontend`; verify `.cursorignore` |
| Image config warning | Deprecated `images.domains` | Already migrated to `remotePatterns` |
| `rm -rf` fails on Windows | Unix command | Use `npm run clean` (rimraf) |

---

## 13. Health check
Run anytime:
```
npm run doctor
```
Reports Healthy / Warning / Critical for Node, npm, React, Next, TypeScript,
RAM, CPU, port 3000, stray workers, cache, Cursor excludes, git, disk, and MCP.
Exit code 1 if any Critical.

---

*Maintained as the official PEB CRM development standard. Update the supported
Node version here when the team moves to a newer LTS.*
