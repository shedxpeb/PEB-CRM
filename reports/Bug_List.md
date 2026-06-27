# PEB CRM — Navigation QA Bug List

**Generated:** June 26, 2026  
**Scope:** Frontend navigation regression QA after consolidation

---

## Summary

| ID | Severity | Status | Area |
|----|----------|--------|------|
| BUG-001 | High | **Fixed** | Sidebar — collapsed rail unreachable |
| BUG-002 | Medium | **Fixed** | Breadcrumbs — group missing on nested routes |
| BUG-003 | Low | **Fixed** | Topbar — unused import warning |
| UX-001 | Low | Open (documented) | Breadcrumbs hidden when `subtitle` prop set |
| UX-002 | Low | Open (documented) | Expanded sections not persisted across reload |
| UX-003 | Info | By design | Document children absent from collapsed icon rail |

---

## Fixed bugs

### BUG-001 — Collapsed sidebar icon rail unreachable

| Field | Detail |
|-------|--------|
| **Severity** | High |
| **Status** | Fixed |
| **File** | `src/layouts/Sidebar.tsx` |
| **Repro** | Open app → sidebar always `w-64`; no control sets `isCollapsed=true` in store |
| **Expected** | Chevron in sidebar header collapses to 64px icon rail |
| **Actual** | Header button called `toggleSidebar()` (hide/show), never `collapseSidebar()` |
| **Evidence** | `collapseSidebar` / `expandSidebar` defined in `useSidebarStore.ts` but grep shows zero callers before fix |
| **Fix** | Wire header chevron to `collapseSidebar()` / `expandSidebar()` with `aria-expanded` |

### BUG-002 — Breadcrumb group missing on nested grouped routes

| Field | Detail |
|-------|--------|
| **Severity** | Medium |
| **Status** | Fixed |
| **File** | `src/layouts/Breadcrumbs.tsx` |
| **Repro** | Navigate to `/dashboard/inventory/warehouses` or `/dashboard/items/[id]` |
| **Expected** | `Dashboard / Inventory / Stock / Warehouses` and `Dashboard / Inventory / Items / Details` |
| **Actual** | `Inventory` group crumb omitted (exact-path `GROUP_CONTEXT` only matched leaf URLs) |
| **Fix** | Prefix-based `resolveGroupContext()` for `/dashboard/item`, `/dashboard/items`, `/dashboard/inventory`, `/dashboard/finance`, `/dashboard/accounting` |

### BUG-003 — Unused import in Topbar

| Field | Detail |
|-------|--------|
| **Severity** | Low |
| **Status** | Fixed |
| **File** | `src/layouts/Topbar.tsx` |
| **Repro** | `eslint src/layouts/Topbar.tsx` |
| **Fix** | Remove unused `User` import from `lucide-react` |

---

## Open items (documented, not fixed)

### UX-001 — Breadcrumbs suppressed when MainLayout has `subtitle`

| Field | Detail |
|-------|--------|
| **Severity** | Low |
| **Type** | UX / design tradeoff |
| **Repro** | Pages passing `MainLayout title="Finance" subtitle="..."` show subtitle, not breadcrumbs |
| **Affected** | Finance, Accounting, Inventory landing, Leads, Customers, Projects, Task Management, etc. |
| **Not affected** | Pages using `MainLayout` without title (e.g. Items via `StandardPageLayout`) |
| **Recommendation** | Optional follow-up: render breadcrumbs above subtitle on `md+` when trail ≥ 2 crumbs |

### UX-002 — Expanded nav sections not remembered across reload

| Field | Detail |
|-------|--------|
| **Severity** | Low |
| **Type** | Enhancement |
| **Behavior** | `expanded` state is React `useState`; resets on full reload except auto-expand for active section |
| **Recommendation** | Optional: persist to `sessionStorage` if product requires it |

### UX-003 — Document children not on collapsed icon rail

| Field | Detail |
|-------|--------|
| **Severity** | Info |
| **Type** | By design |
| **Behavior** | Collapsed rail flattens routable leaves; Estimates/Proposals/Quotations reachable via Documents page + direct URL |
| **Route loss** | None |

---

## Pre-existing issues (out of scope)

| Item | Notes |
|------|-------|
| Full-repo ESLint | 820 problems (423 errors) — predates navigation QA; not introduced by consolidation |
| `ThemeProvider` setState-in-effect | Pre-existing lint error |
| `/dashboard/item` vs `/dashboard/items/[id]` | Pre-existing route asymmetry; both pages exist and build |
| Legacy `/dashboard/item-master` redirect | Intentionally preserved |
