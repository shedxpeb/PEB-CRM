# PEB CRM — Navigation Implementation Plan

**Generated:** June 26, 2026
**Scope:** Frontend only. Navigation / Information-Architecture consolidation.
**Type:** Reorganize navigation. **No** module merge, **no** feature merge, **no** business-logic change, **no** API/backend/database change.

> **Mandate:** Every page, route, CRUD, detail page, drawer, dialog, table, search, filter, export, KPI, and quick action must keep working exactly as before. Expected functionality loss: **0%**. We only change *how users navigate*.

---

## 0. Source of Truth (verified against live code, not just prior reports)

The earlier reports referenced `BOQ`, `Design`, and `Automation` as visible sidebar modules. The **actual** running code differs, so this plan is based on the verified current state:

| Fact | Verified location |
|------|-------------------|
| Navigation is data-driven from a flat module list + static items | `src/features/settings/hooks/useNavigationItems.ts` |
| Sidebar renders a **flat** `<ul>` of items, no nesting | `src/layouts/Sidebar.tsx` |
| Module list (mock/seed) drives visibility | `src/features/settings/constants/settingsConstants.ts` → `MODULES` |
| `boq` exists but `isVisible: false`; `design` / `automation` are **not** in `MODULES` (never render, no pages) | `settingsConstants.ts`, `app/dashboard/**` |
| Routes are protected via `startsWith('/dashboard/...')` | `middleware.ts` |
| No breadcrumb component exists; Topbar shows only `title`/`subtitle` | `src/layouts/Topbar.tsx` |
| Only `Sidebar.tsx` + the hook itself consume `useNavigationItems` / `NavigationItem` | grep verified |

---

## 1. Current Sidebar Tree (verified, role = owner)

```
Dashboard            → /dashboard
Leads                → /dashboard/leads
Customers            → /dashboard/customers
Item                 → /dashboard/item            (Item Master module)
Projects             → /dashboard/projects
Inventory            → /dashboard/inventory        (Stock module)
Finance              → /dashboard/finance
Accounting           → /dashboard/accounting
Documents            → /dashboard/documents
Task Management      → /dashboard/task-management
Settings             → /settings
```

(`boq` is hidden via `isVisible:false`; `design`/`automation` do not render.)

---

## 2. Proposed Sidebar Tree

```
Dashboard                        → /dashboard
Leads                            → /dashboard/leads
Customers                        → /dashboard/customers
Projects                         → /dashboard/projects
Inventory            (group)                                   ← NEW parent, no own route
   ├── Items                     → /dashboard/item             (existing Item Master module)
   └── Stock                     → /dashboard/inventory        (existing Inventory module)
Finance              (group)                                   ← NEW parent, no own route
   ├── Operations                → /dashboard/finance          (existing Finance module)
   └── Accounting                → /dashboard/accounting       (existing Accounting module)
Documents            (group + own page)                        → /dashboard/documents
   ├── Estimates                 → /dashboard/documents/estimates
   ├── Proposals                 → /dashboard/documents/proposals
   └── Quotations                → /dashboard/documents/quotations
Task Management                  → /dashboard/task-management
Settings                         → /settings
```

**Design rules applied:**
- **No route is removed.** Every existing `href` still has a clickable entry point.
- `Inventory` and `Finance` parents are **pure group headers** (expand/collapse only — they had no standalone page before, so none is invented).
- `Documents` parent **keeps its own landing route** (`/dashboard/documents`) *and* gains an expandable section. Clicking the label navigates; the chevron toggles children. Its other internal pages (Templates, Approvals, Library, Analytics, Activity Logs, Version History) remain reachable from inside the Documents page exactly as today — they are simply not promoted to the sidebar.
- **Invoice stays in Finance**, never moved into Documents (explicit requirement).
- Top-level count drops from **11 → 9** while exposing more deep links.

---

## 3. Navigation Items Affected

| Item | Change | Route impact |
|------|--------|--------------|
| `Item` (label) | Becomes child **"Items"** under new **Inventory** group | none — still `/dashboard/item` |
| `Inventory` (label) | Becomes child **"Stock"** under new **Inventory** group | none — still `/dashboard/inventory` |
| `Finance` (label) | Becomes child **"Operations"** under new **Finance** group | none — still `/dashboard/finance` |
| `Accounting` (label) | Becomes child **"Accounting"** under new **Finance** group | none — still `/dashboard/accounting` |
| `Documents` | Becomes an expandable parent that still links to its page | none — still `/dashboard/documents` |
| Estimates / Proposals / Quotations | **Newly surfaced** as Documents children | reuse existing routes |
| Dashboard, Leads, Customers, Projects, Task Management, Settings | Unchanged | none |
| `Inventory` group, `Finance` group | **New** non-routable parent headers | n/a |

---

## 4. Routes Affected

**No route is created, removed, moved, or renamed.** All target routes already exist and are verified present:

| Route | Page file | Status |
|-------|-----------|--------|
| `/dashboard/item` | `app/dashboard/item/page.tsx` | reused, unchanged |
| `/dashboard/inventory` | `app/dashboard/inventory/page.tsx` | reused, unchanged |
| `/dashboard/finance` | `app/dashboard/finance/page.tsx` | reused, unchanged |
| `/dashboard/accounting` | `app/dashboard/accounting/page.tsx` | reused, unchanged |
| `/dashboard/documents` | `app/dashboard/documents/page.tsx` | reused, unchanged |
| `/dashboard/documents/estimates` | `app/dashboard/documents/estimates/page.tsx` | reused, unchanged |
| `/dashboard/documents/proposals` | `app/dashboard/documents/proposals/page.tsx` | reused, unchanged |
| `/dashboard/documents/quotations` | `app/dashboard/documents/quotations/page.tsx` | reused, unchanged |

`middleware.ts` already protects everything under `/dashboard` via `startsWith`, so nesting changes need **no** middleware edits. The legacy `/dashboard/item-master` redirect is **left intact** (out of scope for this navigation-only task; its removal is a separate decision).

---

## 5. Components Affected

| Component | File | Change |
|-----------|------|--------|
| Navigation hook | `src/features/settings/hooks/useNavigationItems.ts` | Add optional `children` + optional `href` to `NavigationItem`; build a nested tree; role/visibility filtering for parents+children. |
| Sidebar | `src/layouts/Sidebar.tsx` | Render parent/child, expand/collapse, chevrons, active states, collapsed-rail behavior. |
| Breadcrumbs (new) | `src/layouts/Breadcrumbs.tsx` (new file) | Derive breadcrumb trail from pathname + nav tree. |
| Topbar | `src/layouts/Topbar.tsx` | Optionally render breadcrumbs under/next to title. |
| MainLayout | `src/layouts/MainLayout.tsx` | Pass-through wiring only if needed for breadcrumbs. |

No feature module (`leads`, `customers`, `projects`, `item-master`, `inventory`, `finance`, `accounting`, `documents`, …) is touched. No form, table, drawer, dialog, hook, service, type, or util inside feature folders is modified.

---

## 6. Pages Affected

**None of the page implementations change.** Page components under `src/app/dashboard/**` and `src/features/**/pages/**` are reused verbatim. The only files edited are the four navigation/layout files in §5 plus one new breadcrumb file.

---

## 7. Reusable Components (reused as-is)

- `Sidebar`, `Topbar`, `MainLayout` (extended, not replaced).
- Existing icon system (`lucide-react`).
- Existing theme tokens / Tailwind classes (`bg-sidebar`, `glass-sidebar-hover`, `text-primary`, active gradient) — reused for child rows and active states so the redesign is an *evolution*, not a new design language.
- `useModules()` (settings) — still the source of enabled/visible modules; grouping is layered on top.

---

## 8. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| A route becomes unreachable from the sidebar | Low | High | Every existing `href` retained as a clickable node; route-validation report enumerates each. |
| Role-based access regression (e.g., employee sees Stock) | Medium | High | Parent visibility = union of *visible* children; each child still filtered by its own roles. Employee sees Inventory→Items only; Finance group hidden entirely. |
| Module enable/disable from Settings stops affecting sidebar | Medium | Medium | Tree assembly still reads `useModules()`; disabled/invisible modules drop out; empty groups are removed. |
| Collapsed (rail) sidebar can't reach children | Medium | Medium | In collapsed mode, parent shows icon; hover/click reveals children (flyout) or auto-expands on navigation. |
| Active-state ambiguity for nested routes | Low | Low | Active = exact match for leaves; parent shown active when any descendant matches; auto-expand active section. |
| Breadcrumb shows wrong trail for detail routes (`/[id]`) | Low | Low | Breadcrumb derives from nav tree with graceful fallback to humanized path segments. |
| Visual inconsistency with current design | Low | Low | Reuse existing tokens/spacing/typography; no new palette. |
| TypeScript breakage in consumers | Low | Medium | `href` made optional and `children` additive; only 2 consumers, both updated. |

**Overall risk: LOW** (navigation/presentation layer only).

---

## 9. Feature Preservation Checklist

To be re-verified after implementation (see `Route_Validation_Report.md` / `Navigation_Test_Report.md`):

- [ ] Every route still opens (item, inventory, finance, accounting, documents + estimates/proposals/quotations, dashboard, leads, customers, projects, task-management, settings).
- [ ] Every CRUD still works (create/edit/delete dialogs unchanged).
- [ ] Every Detail page works (`/[id]` routes unchanged).
- [ ] Every Drawer works (view drawers unchanged).
- [ ] Every Dialog works.
- [ ] Every Table works.
- [ ] Every Search works.
- [ ] Every Filter works.
- [ ] Every Export works.
- [ ] Every KPI works.
- [ ] Every Quick Action works.
- [ ] Every existing URL still opens correctly (typed directly / bookmarked).
- [ ] No component duplication introduced.
- [ ] No business-logic change.
- [ ] No feature loss.
- [ ] Role filtering preserved (owner/admin/employee).
- [ ] Settings → Module enable/disable still toggles sidebar entries.

---

## 10. Rollback Strategy

1. All changes are confined to **4 edited files + 1 new file** (§5). Each is committed in a **small, isolated commit** mapped to the implementation steps.
2. Rollback granularity:
   - Revert the breadcrumb commit → Topbar returns to title/subtitle only.
   - Revert the Sidebar commit → flat rendering restored.
   - Revert the nav-config commit → original flat `NavigationItem[]` restored.
3. Because no routes, pages, types in feature modules, or business logic are altered, reverting the navigation commits fully restores prior behavior with **zero data or feature impact**.
4. A pre-change git tag/branch point is recorded; `git revert <commit>` per step or `git reset` to the tag returns the app to the exact prior state.

---

## Implementation Order (small commits)

1. **Navigation configuration** — nested tree model + labels + icons in `useNavigationItems.ts`.
2. **Sidebar rendering** — parent/child markup.
3. **Parent–child navigation** — expand/collapse + collapsed-rail flyout + auto-expand.
4. **Icons** — distinct icons per node.
5. **Labels** — Items / Stock / Operations / Accounting / Estimates / Proposals / Quotations.
6. **Breadcrumbs** — derive from nav tree.
7. **Navigation permissions** — role + module enabled/visible filtering for tree.
8. **Route validation** — enumerate and confirm every href.
9. **Regression testing** — lint, typecheck, manual route sweep.

---

*This plan is the gate. Source code is modified only after this document exists.*
