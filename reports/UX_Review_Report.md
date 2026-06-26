# PEB CRM — UX Review Report

**Generated:** June 26, 2026  
**Phase:** 8 — UX validation (first-time user perspective)

---

## Overall assessment

The consolidated navigation **improves discoverability** for related modules (Items + Stock under Inventory; Operations + Accounting under Finance) without removing functionality. The experience aligns with modern ERP/CRM patterns. Issues found are **minor** and mostly optional polish — no redesign recommended.

---

## What works well

| Area | Observation |
|------|-------------|
| **Grouping** | Inventory and Finance groups reduce cognitive load (11 → 9 top-level items) |
| **Labels** | "Items" / "Stock" / "Operations" clarify module purpose vs legacy names |
| **Icons** | Distinct icons per node; no more Item/Inventory `Package` collision |
| **Active states** | Clear primary gradient + left accent on active rows |
| **Auto-expand** | Active section opens automatically — user always sees current context |
| **Documents** | Parent links to landing page; children expose Estimates/Proposals/Quotations |
| **Breadcrumbs** | Group context (Inventory/Finance) helps orientation on nested pages |
| **Collapsed rail** | Icon tooltips preserve access after BUG-001 fix |
| **Role visibility** | Employee sees simplified tree (Items only; no Finance) — consistent with permissions |

---

## Genuine issues & friction points

### 1. Breadcrumbs vs subtitle (UX-001) — Low

**Issue:** Many module pages pass `MainLayout subtitle`, which **hides breadcrumbs** on desktop.

**Impact:** Users on Finance/Inventory landing pages see descriptive subtitle but not `Dashboard / Finance / Operations` trail.

**Suggestion (small):** Show breadcrumbs above subtitle when trail ≥ 2 crumbs. No redesign — one-line Topbar layout tweak.

### 2. Document children in collapsed rail (UX-003) — Info

**Issue:** Estimates, Proposals, Quotations are not individual icons when sidebar is collapsed.

**Impact:** One extra click via Documents page, or use direct URL/bookmark.

**Suggestion:** Acceptable tradeoff for rail simplicity. Optional: add flyout submenu on Documents icon (future enhancement — not required for release).

### 3. "Operations" label for Finance module (UX-004) — Info

**Issue:** Users familiar with "Finance" as module name now see "Operations" under Finance group.

**Impact:** Brief learning curve; breadcrumbs and page titles still say "Finance" on the module page.

**Suggestion:** No change — aligns with IA report intent. Consider tooltip on first visit (optional).

### 4. Expanded state not persisted (UX-002) — Low

**Issue:** Manually collapsed Inventory section resets on full page reload (except auto-expand for active route).

**Impact:** Minor — active section still opens.

**Suggestion:** Optional `sessionStorage` persistence.

### 5. Group parents not clickable (Inventory, Finance) — By design

**Issue:** Inventory and Finance headers toggle only — no landing page.

**Impact:** Expected for pure grouping parents.

**Suggestion:** None.

---

## First-time user journey (simulated)

| Step | Experience | Rating |
|------|------------|--------|
| 1. Land on Dashboard | Clear single entry | ✅ Good |
| 2. Find item catalog | Inventory → Items (2 clicks) | ✅ Good |
| 3. Find stock levels | Inventory → Stock | ✅ Good |
| 4. Find invoices | Finance → Operations (module page has invoices) | ✅ Good |
| 5. Find estimates | Documents → Estimates | ✅ Good |
| 6. Collapse sidebar | Icon rail with tooltips | ✅ Good (after fix) |
| 7. Employee login | Simpler tree, no Finance | ✅ Good |

---

## Accessibility UX

| Check | Rating |
|-------|--------|
| Screen reader labels on icons (collapsed) | ✅ Good |
| Expand/collapse announced | ✅ `aria-expanded` |
| Keyboard navigation | ✅ Native tab order |
| Color contrast (active/hover) | ✅ Uses theme tokens |
| Breadcrumb navigation | ✅ Semantic `<nav>` |

---

## Dark theme

Sidebar hover (`glass-sidebar-hover`) has explicit dark-theme rules. Active gradient uses primary token — readable in both themes.

---

## Recommendations summary

| Priority | Item | Effort |
|----------|------|--------|
| Optional | Breadcrumbs + subtitle coexistence | Small |
| Optional | Session-persist expanded sections | Small |
| Optional | Documents flyout in collapsed mode | Medium |
| None required | Full redesign | — |

---

## Result

**PASS** — Navigation consolidation achieves UX goals (clarity, discoverability, fewer top-level items) with only minor optional improvements. No blocking UX issues for release.
