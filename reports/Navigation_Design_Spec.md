# PEB CRM — Navigation & Information Architecture Design Spec

**Status:** Figma-ready specification (companion to partial Figma file)  
**Date:** 2026-06-26  
**Scope:** Sidebar, navigation hierarchy, states, icons, breadcrumbs — **no page/form/table redesign**

---

## Figma file (partial)

| Item | Value |
|------|-------|
| File name | PEB CRM — Sidebar Navigation Redesign |
| File key | `SWfQqBkpMTH4SY3Ssfa5tP` |
| URL | https://www.figma.com/design/SWfQqBkpMTH4SY3Ssfa5tP |
| Built | Board header + **Expanded · default (groups collapsed)** artboard |
| Pending | Remaining artboards listed in §10 — build when Figma MCP quota resets |

This document is the authoritative spec for completing the Figma deliverable and validating the implemented UI.

---

## 1. Design principles

- **Zero feature loss** — every route and workflow preserved; navigation-only change.
- **Evolution, not revolution** — reuse existing theme tokens, spacing, typography, Lucide icons.
- **Fewer top-level items** — group by business domain (Inventory, Finance, Documents).
- **Discoverability** — expandable parents, clear child labels, breadcrumbs inject group context.

---

## 2. Information architecture (target sidebar tree)

```
Dashboard
Leads
Customers
Projects
Inventory                    ← parent (no route)
    ├── Items                → /dashboard/item
    └── Stock                → /dashboard/inventory
Finance                        ← parent (no route)
    ├── Operations           → /dashboard/finance
    └── Accounting           → /dashboard/accounting
Documents                      → /dashboard/documents
    ├── Estimates            → /dashboard/documents/estimates
    ├── Proposals            → /dashboard/documents/proposals
    └── Quotations           → /dashboard/documents/quotations
Task Management
Settings
```

**Not in Documents:** Invoice (stays under Finance/Accounting routes).

---

## 3. Layout dimensions

| Element | Expanded | Collapsed |
|---------|----------|-----------|
| Sidebar width | `256px` (`w-64`) | `64px` (`w-16`) |
| Brand bar height | `64px` (`h-16`) | `64px` |
| Nav padding | `16px` (`p-4`) | `16px` |
| Row gap (expanded) | `4px` (`space-y-1`) | `8px` (`space-y-2`) |
| Corner radius (rows) | `8px` (`rounded-lg`) | `8px` |
| Border | `1px` right `border-border` | same |

---

## 4. Color & typography tokens (light theme)

From `frontend/src/theme/colors.ts` — use these in Figma fills/text:

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#F7FAFC` | Canvas / page behind sidebar |
| `sidebar` | `#FFFFFF` | Sidebar surface |
| `foreground` | `#1E293B` | Primary nav text |
| `mutedForeground` | `#64748B` | Captions, breadcrumb trail |
| `border` | `#E8EDF3` | Dividers, child rail, sidebar edge |
| `primary` | `#3ABEFF` | Active text, active icon |
| `cardHover` | `#F0F9FF` | Hover fill (subtle) |
| `accent` | `#EAF8FF` | Optional hover alternative |
| Active gradient | `linear-gradient(90deg, rgba(58,190,255,0.18), rgba(58,190,255,0.10))` | Active row background |
| Active border | `rgba(58,190,255,0.25)` | Active row border / left accent |

**Typography**

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Brand “PEB CRM” | Inter | 20px (`text-xl`) | Bold (700) |
| Top-level nav label | Inter | 14px | Medium (500) |
| Child nav label | Inter | 14px (`text-sm`) | Medium (500) |
| Breadcrumb | Inter | 12px (`text-xs`) | Regular (400) |
| Artboard caption (Figma) | Inter | 13px | Medium (500), `mutedForeground` |

---

## 5. Icon system

All icons: **Lucide React**, `stroke-width: 2`, round caps/joins.

| Nav item | Lucide icon | Size (expanded parent) | Size (child) | Size (collapsed rail) |
|----------|-------------|--------------------------|--------------|------------------------|
| Dashboard | `LayoutDashboard` | 20 | — | 20 |
| Leads | `Users` | 20 | — | 20 |
| Customers | `Building` | 20 | — | 20 |
| Projects | `FolderKanban` | 20 | — | 20 |
| Inventory (parent) | `Boxes` | 20 | — | — |
| Items | `Package` | — | 18 | 20 |
| Stock | `Warehouse` | — | 18 | 20 |
| Finance (parent) | `Wallet` | 20 | — | — |
| Operations | `DollarSign` | — | 18 | 20 |
| Accounting | `Calculator` | — | 18 | 20 |
| Documents | `FileText` | 20 | — | 20 |
| Estimates | `FileSpreadsheet` | — | 18 | 20 |
| Proposals | `ScrollText` | — | 18 | 20 |
| Quotations | `ReceiptText` | — | 18 | 20 |
| Task Management | `CheckSquare` | 20 | — | 20 |
| Settings | `Settings` | 20 | — | 20 |
| Collapse toggle | `ChevronLeft` / `ChevronRight` | 20 | — | 20 |
| Section expand | `ChevronDown` | 16 | — | — |

**Icon color states**

| State | Color |
|-------|-------|
| Default | `foreground` (`#1E293B`) |
| Muted (optional in Figma static frames) | `mutedForeground` (`#64748B`) |
| Active / section active | `primary` (`#3ABEFF`) |
| Chevron | `current` at 80% opacity; hover → 100% |

---

## 6. Navigation row anatomy

### 6.1 Top-level leaf (e.g. Dashboard, Leads)

```
┌─────────────────────────────────────────┐
│ [icon 20]  Label                   │
│  px-4 py-3, gap-3, rounded-lg           │
│  border-l-3 transparent → primary when active │
└─────────────────────────────────────────┘
```

### 6.2 Parent with children (Inventory, Finance)

- **No `href`** on Inventory and Finance — entire label row is a button; chevron toggles expand.
- **Documents** has `href` — label links to `/dashboard/documents`; chevron toggles children.

```
┌─────────────────────────────────────────┐
│ [icon]  Parent label          [chev 16] │
└─────────────────────────────────────────┘
     │ (when expanded)
     ├── child row (indented)
     └── child row
```

**Child indent:** `ml-4` + `border-l border-border` + `pl-3`; child rows `px-3 py-2.5`.

### 6.3 Collapsed rail

- Flatten tree: every routable leaf gets one icon button (`p-3`, centered).
- Group parents (Inventory, Finance) are **omitted**; only Items, Stock, Operations, Accounting appear as icons.
- `title` + `aria-label` = full label for tooltip on hover.

---

## 7. Interaction states

### 7.1 Default (idle)

- Background: transparent
- Text: `foreground`
- Left border: transparent (`border-l-3`)

### 7.2 Hover

- Class: `glass-sidebar-hover` (existing utility)
- Visual: subtle lift / `cardHover` tint (`#F0F9FF`)
- Transition: `220ms` (`duration-220`)
- Prefetch route on `mouseEnter` (implementation detail)

### 7.3 Active (leaf)

- Text: `text-primary`
- Left border: `border-primary` (3px)
- Background: active gradient (see §4)
- Border: `border-primary/30` on collapsed icon button

### 7.4 Section active (parent)

- Parent row uses **section active** when any child route matches (or own `href` for Documents).
- Same active styling as leaf; chevron rotated 180° when expanded.

### 7.5 Parent expanded vs collapsed

| State | Chevron | Children |
|-------|---------|----------|
| Collapsed | `ChevronDown`, 0° rotation | hidden |
| Expanded | `ChevronDown`, `rotate-180` | visible list below parent |

**Auto-expand:** On route change, parent containing active child opens automatically.

---

## 8. Breadcrumb behaviour

Rendered in **Topbar** when no explicit `subtitle` is passed (`Breadcrumbs.tsx`).

**Rules**

1. Parse URL segments → human labels via `SEGMENT_LABELS`.
2. Numeric/UUID segments → **Details**.
3. Inject non-routable group crumb after Dashboard for grouped routes:
   - `/dashboard/item`, `/dashboard/inventory` → insert **Inventory**
   - `/dashboard/finance`, `/dashboard/accounting` → insert **Finance**
4. Final crumb is plain text (not a link); earlier crumbs are links.
5. Hidden on mobile (`hidden md:flex`); shown below page title on desktop.

### 8.1 Breadcrumb examples (design frames to build)

| Current path | Trail |
|--------------|-------|
| `/dashboard` | *(hidden — fewer than 2 crumbs)* |
| `/dashboard/item` | Dashboard › **Inventory** › Items |
| `/dashboard/inventory` | Dashboard › **Inventory** › Stock |
| `/dashboard/inventory/warehouses` | Dashboard › **Inventory** › Stock › Warehouses |
| `/dashboard/finance` | Dashboard › **Finance** › Operations |
| `/dashboard/accounting` | Dashboard › **Finance** › Accounting |
| `/dashboard/documents/estimates` | Dashboard › Documents › Estimates |
| `/dashboard/documents/estimates/42` | Dashboard › Documents › Estimates › Details |
| `/dashboard/leads` | Dashboard › Leads |

**Visual:** `text-xs text-muted-foreground`, chevron separator `ChevronRight` 12px, links underline on hover.

---

## 9. Artboards to complete in Figma

Build on file `SWfQqBkpMTH4SY3Ssfa5tP`, board `PEB CRM — Sidebar Navigation Redesign`.

### Row 1 — Expanded states (horizontal, 40px gap)

| # | Caption | Content |
|---|---------|---------|
| A | Expanded · default (groups collapsed) | ✅ **Done** — Dashboard active |
| B | Expanded · Inventory open (Items active) | Inventory expanded; Items active; Finance/Documents collapsed |
| C | Expanded · Finance open (Accounting active) | Finance expanded; Accounting active |
| D | Expanded · Documents open | Documents expanded; Estimates active |
| E | Expanded · hover state | Leads row with hover fill (no active) |

### Row 2 — Collapsed states

| # | Caption | Content |
|---|---------|---------|
| F | Collapsed · icon rail | 64px width; all flattened icons; one active |
| G | Collapsed · tooltip | Optional: show tooltip “Items” on hover |

### Row 3 — Component detail

| # | Caption | Content |
|---|---------|---------|
| H | Nav row states | Swatches: default, hover, active, section-active parent, child active |
| I | Icon system | Grid of all icons with labels |
| J | Breadcrumb examples | 4–5 trails from §8.1 in a mock topbar strip |

---

## 10. Accessibility & keyboard

- `<nav aria-label="Primary">` on sidebar.
- Parent toggles: `aria-expanded`, `aria-label` on chevron buttons.
- Collapsed links: `aria-label` + native `title` tooltip.
- Focus: visible focus ring using `ring` token (`#3ABEFF`).
- Keyboard: Tab through links/buttons; Enter activates; chevron buttons toggle sections.

---

## 11. Role & module visibility (design note)

Design frames assume **owner** role with all modules enabled. In production:

- **Employee** does not see Stock, Operations, Accounting, or Settings (per `MODULE_NAV_MAP` roles).
- Disabled/hidden modules omit entire groups if no children remain.
- Figma optional variant: “Admin — reduced nav” frame for employee role.

---

## 12. Implementation cross-reference

| Spec area | Code location |
|-----------|---------------|
| Nav tree & labels | `frontend/src/features/settings/hooks/useNavigationItems.ts` |
| Sidebar UI & states | `frontend/src/layouts/Sidebar.tsx` |
| Breadcrumbs | `frontend/src/layouts/Breadcrumbs.tsx` |
| Topbar integration | `frontend/src/layouts/Topbar.tsx` |
| Theme tokens | `frontend/src/theme/colors.ts` |

---

## 13. Success criteria checklist

- [x] Cleaner sidebar (fewer top-level items)
- [x] Logical grouping (Inventory, Finance, Documents children)
- [x] Zero route changes
- [x] Zero business logic changes
- [x] Active / hover / expand behaviour implemented in code
- [x] Breadcrumbs with group context
- [ ] Full Figma artboard set (blocked on MCP quota — spec complete for manual finish)

---

## 14. Completing Figma manually

1. Open https://www.figma.com/design/SWfQqBkpMTH4SY3Ssfa5tP
2. Duplicate artboard **A** for B–E; adjust expansion and active rows per §9.
3. Create Row 2 at y ≈ 760px with 64px-wide sidebars.
4. Create Row 3 with state swatches, icon grid, and topbar breadcrumb strip (height 56px, `navbar` fill `#FFFFFF`, bottom border `#E8EDF3`).
5. Or re-run agent Figma build when MCP Starter quota resets.
