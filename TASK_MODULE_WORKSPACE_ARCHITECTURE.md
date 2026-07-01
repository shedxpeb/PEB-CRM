# TASK MODULE WORKSPACE ARCHITECTURE
## PEB CRM — Phase 3.1B Enterprise Workspace UX Design

**Document Date:** June 30, 2026  
**Phase:** 3.1B — Enterprise Workspace UX Architecture  
**Scope:** UX Architecture Only (No Implementation)  
**Status:** Frozen — Ready for Phase 3.2+ Implementation

---

## EXECUTIVE SUMMARY

The current PEB CRM Task Module exposes powerful capabilities (list, kanban, calendar, matrix, verification, photo proof, performance, salary) but presents them as a **single monolithic page** with no workspace hierarchy, no role-based entry points, and no enterprise-grade information architecture. Users cannot answer basic questions without scrolling: *Where am I? What is my job right now? What needs verification? What is blocked on site?*

This document redesigns the **Task Module workflow only**. It does not change the PEB CRM design system (cards, buttons, typography, tokens). It defines a **workspace-first** architecture where every screen represents a **workflow**, not a collection of components.

**Core shift:**

| Today (wrong mental model) | Target (correct mental model) |
|---------------------------|------------------------------|
| One page with tabs and view buttons | Role-based workspaces with dedicated routes |
| List / Kanban / Calendar / Matrix as peers | Views as **lenses** inside a workspace |
| KPI cards on every screen | KPIs only where they drive decisions |
| Task detail in modal / dialog | Task Detail as the primary work surface |
| Filters as clickable badges | Professional filter system with saved views |
| Employee = Manager = Admin same UI | Distinct journeys per role |

---

## 1. CURRENT UX PROBLEMS

### 1.1 Structural Problems (Critical)

| # | Problem | Evidence | Impact |
|---|---------|----------|--------|
| P1 | **Monolithic single page** | `task-management/page.tsx` ~1,300 lines; Tasks + Performance + Salary + all views on one route | Cognitive overload, no deep links, poor maintainability |
| P2 | **No workspace hierarchy** | Flat list of tasks; no My Tasks / Team Tasks / Project Tasks as routes | Users cannot orient by role or context |
| P3 | **No dedicated Task Detail route** | Activity opens in dialog; `TaskDetailPage` exists but is not the primary navigation target | Real work (photos, checklist, verification) cramped in modals |
| P4 | **Tab navigation instead of routes** | Tasks \| Performance \| Salary tabs | No bookmarking, broken browser history, no shareable URLs |
| P5 | **View switcher at wrong level** | List / Kanban / Calendar / Matrix equal to page header | Views compete with workspaces; no context (whose tasks? which project?) |

### 1.2 Navigation & Discoverability

| # | Problem | Impact |
|---|---------|--------|
| P6 | No command palette (Cmd/Ctrl+K) despite blueprint | Power users cannot jump to tasks, projects, or actions |
| P7 | Breadcrumbs missing on task screens | Users don't know: Home → Tasks → ? |
| P8 | Sidebar links to generic "Task Management" only | No entry to Dashboard, My Tasks, Team Tasks, Verification Queue |
| P9 | `TaskFilterPanel` built but not wired on main page | Advanced filters unreachable; badge filters only |
| P10 | Search scoped to current in-page state | Not true global task search |

### 1.3 Information Hierarchy

| # | Problem | Impact |
|---|---------|--------|
| P11 | KPI row on task list view | Statistics push task list below fold; duplicates Dashboard purpose |
| P12 | Status + priority badge rows + view buttons + search + Add Task in one band | Toolbar clutter; no primary/secondary action distinction |
| P13 | Performance and Salary mixed into Task page | Finance workflow pollutes task execution workflow |
| P14 | Task cards inline in dashboard components duplicate weak patterns | Inconsistent density; no compact/expanded modes |
| P15 | Verification queue not a first-class workspace | Managers hunt for Review-status tasks in generic list |

### 1.4 Task Detail & Collaboration

| # | Problem | Impact |
|---|---------|--------|
| P16 | Modal-based task inspection | Cannot open task in new tab; poor for field photo review |
| P17 | Comments, checklist, attachments exist as components but not unified in one routable workspace | Fragmented collaboration |
| P18 | No followers / watchers surface on list; only in blueprint | Team visibility reduced |
| P19 | Dependencies not visible until detail (no list indicators) | Construction sequencing invisible |
| P20 | Photo proof workflow buried in Complete dialog | Before/after/progress not first-class in detail layout |

### 1.5 Filters & Saved Views

| # | Problem | Impact |
|---|---------|--------|
| P21 | Badge filters = single dimension at a time | Cannot combine status + assignee + project + site |
| P22 | No saved views on main page | Users re-apply filters every session |
| P23 | No active filter count or filter chips | Users forget filters are applied |
| P24 | No pinned / recent filters | Repetitive work for managers |

### 1.6 Construction & Role Fit

| # | Problem | Impact |
|---|---------|--------|
| P25 | No site/phase context in list density | Field workers see office-style table |
| P26 | No "photo required" / "verification pending" badges at card level | Supervisors miss review queue |
| P27 | Employee, Manager, Admin see same layout | Wrong actions visible; permission noise |
| P28 | Project tasks not reachable from project context as workspace | Project module disconnect |
| P29 | Matrix view (Eisenhower) on same level as operational list | Analysis view mixed with daily execution |

### 1.7 Responsiveness & Performance UX

| # | Problem | Impact |
|---|---------|--------|
| P30 | Kanban + table + KPIs on one scrollable page | Mobile unusable; horizontal + vertical scroll conflict |
| P31 | No keyboard workflow documented or implemented | Enterprise users slower than Linear/ClickUp |
| P32 | Bulk actions bar not consistently available | Team task management inefficient |
| P33 | Empty states generic; not role-specific | "No tasks" doesn't guide next action |

### 1.8 Why Enterprise Tools Feel Better (Research Synthesis)

| Product | Why it works (principle, not UI copy) |
|---------|--------------------------------------|
| **Linear** | Issue-centric; keyboard-first; inbox/triage; detail page is the unit of work |
| **ClickUp** | Hierarchy (Space → Folder → List); views are lenses on same data; command palette |
| **Jira** | Project/board context; saved filters (JQL); verification/review queues |
| **Asana** | "My Tasks" as home for doers; portfolios for leaders; clean separation |
| **Monday** | Workspace → Board; dashboards for oversight; workload as separate lens |
| **Notion** | Same database, multiple layouts; context preserved in breadcrumbs |
| **Height / Motion** | Focus modes; scheduling intelligence (future); less chrome |
| **Todoist / TickTick** | Smart lists (Today, Upcoming); filters as views; low friction capture |

**PEB CRM must adopt the principles, not the pixels.**

---

## 2. ENTERPRISE UX GOALS

### 2.1 Primary Goals

1. **Workflow-first screens** — Every route answers one question for one role.
2. **Task Detail as the center of gravity** — List/Kanban are indexes; detail is where work happens.
3. **Clear hierarchy** — Module → Workspace → View → Task → Section.
4. **Construction-native** — Site, phase, photo proof, verification visible in hierarchy.
5. **Minimal cognitive load** — One primary action per workspace; progressive disclosure.
6. **Fast orientation** — Breadcrumbs, sidebar, command palette, consistent toolbar.
7. **Reuse PEB design system** — No new visual language; new layout and IA only.

### 2.2 Success Criteria (UX)

| Metric | Target |
|--------|--------|
| Clicks to open assigned task from login | ≤ 2 (Employee) |
| Clicks to verification queue (Manager) | ≤ 2 |
| Shareable task URL | Yes (`/tasks/:taskId`) |
| KPI visibility on list workspaces | No (moved to Dashboard) |
| Filter combinations savable | Yes |
| Mobile primary workflow (field) | My Tasks → Detail → Complete with photos |

### 2.3 Non-Goals (This Phase)

- Backend, API, S3, realtime, automation engine
- New design tokens or component library
- Changing non–Task Module CRM screens

---

## 3. COMPLETE INFORMATION ARCHITECTURE

### 3.1 Module Boundary

**Task Module** owns:
- Task workspaces (Dashboard, My Tasks, Team Tasks, Project Tasks, Verification Queue, Reports*)
- Task Detail and sub-routes (activity, images, time log)
- Task creation/edit flows (modals or dedicated routes)
- Task-scoped notifications entry (links into module)

**Task Module does NOT own** (link only):
- Global CRM Dashboard (main `/dashboard`)
- Performance/Salary administration (separate Finance/HR surfaces; task module links out)
- Project record editing (Projects module; Tasks tab embeds Project Tasks workspace)

*Reports workspace = read-only analytics phase; placeholder in nav until Phase 4.

### 3.2 Entity Model (Frontend)

```
Organization (PEB CRM)
└── Task Module
    ├── Workspaces (navigation contexts)
    │   ├── Dashboard
    │   ├── My Tasks
    │   ├── Team Tasks
    │   ├── Project Tasks (scoped by projectId)
    │   ├── Verification Queue
    │   └── Reports (future)
    ├── Views (lenses within workspace)
    │   ├── List (default)
    │   ├── Kanban
    │   ├── Calendar (phase 3+)
    │   ├── Timeline (project workspace only, phase 4)
    │   └── Matrix (analysis, optional)
    ├── Task (unit of work)
    │   ├── Detail sections (17 per IA doc)
    │   └── Sub-routes (/activity, /images, /time-log)
    └── Supporting concepts
        ├── Saved View (filter + sort + view mode)
        ├── Template (construction)
        ├── Site / Phase (display + filter)
        └── Linked Record (CRM module)
```

### 3.3 URL Architecture (Frozen)

| Route | Workspace | Role |
|-------|-----------|------|
| `/tasks` | Redirect → `/tasks/dashboard` or role default | All |
| `/tasks/dashboard` | Task Dashboard | Manager, Admin |
| `/tasks/my-tasks` | My Tasks | All |
| `/tasks/team-tasks` | Team Tasks | Manager, Admin |
| `/tasks/verification` | Verification Queue | Manager, Admin |
| `/tasks/reports` | Reports (future) | Manager, Admin |
| `/tasks/project/:projectId` | Project Tasks | All (scoped) |
| `/tasks/:taskId` | Task Detail | All (permission) |
| `/tasks/:taskId/activity` | Activity (full page) | All |
| `/tasks/:taskId/images` | Image Gallery | All |
| `/tasks/:taskId/time-log` | Time Log | All |
| `/tasks/create` | Create Task (modal preferred) | All |

**Employee default landing:** `/tasks/my-tasks`  
**Manager default landing:** `/tasks/dashboard`  
**Admin default landing:** `/tasks/dashboard`

Performance and Salary **removed from Task Module tab bar**; linked from Dashboard widgets or Finance module.

---

## 4. WORKSPACE HIERARCHY

```
PEB CRM
└── Tasks (Module)
    ├── Dashboard Workspace          → Oversight & KPIs
    ├── My Tasks Workspace           → Individual execution
    ├── Team Tasks Workspace         → Manager coordination
    ├── Project Tasks Workspace      → Project-scoped execution
    ├── Verification Queue Workspace → Review & approve
    └── Reports Workspace (future)   → Analytics & export
```

### 4.1 Workspace Definitions

| Workspace | Purpose | Primary User | Entry |
|-----------|---------|--------------|-------|
| **Dashboard** | Org/team snapshot; drill-down to queues | Manager, Admin | Sidebar, Cmd+K |
| **My Tasks** | Tasks assigned to me; daily execution | Employee, all | Sidebar, default for Employee |
| **Team Tasks** | All team tasks; assign, bulk, monitor | Manager, Admin | Sidebar |
| **Project Tasks** | Tasks for one project; phase filters | All on project | Project → Tasks tab, breadcrumb |
| **Verification Queue** | Review-status tasks; verify/reject | Manager, Admin | Sidebar, Dashboard widget |
| **Reports** | Trends, export (future) | Manager, Admin | Sidebar |

Each workspace is a **route**, not a tab inside one page.

---

## 5. NAVIGATION HIERARCHY

### 5.1 Global (CRM Shell)

```
MainLayout
├── Sidebar
│   └── Tasks (expandable)
│       ├── Dashboard
│       ├── My Tasks
│       ├── Team Tasks
│       ├── Verification Queue
│       └── Reports (disabled until phase)
├── Topbar
│   ├── Breadcrumbs (task routes)
│   ├── Global Search (tasks) — future
│   └── Notifications bell → Notification Center
└── Content (workspace outlet)
```

### 5.2 In-Module Breadcrumbs

| Screen | Breadcrumb |
|--------|------------|
| Dashboard | Home → Tasks → Dashboard |
| My Tasks | Home → Tasks → My Tasks |
| Team Tasks | Home → Tasks → Team Tasks |
| Project Tasks | Home → Projects → {Project} → Tasks |
| Verification | Home → Tasks → Verification Queue |
| Task Detail | Home → Tasks → {Workspace} → {Task Title} |

### 5.3 Command Palette (Frozen Scope)

**Trigger:** Cmd/Ctrl + K

| Section | Actions |
|---------|---------|
| Navigate | Dashboard, My Tasks, Team Tasks, Verification |
| Search | Tasks by title/ID, Projects, Employees |
| Quick Actions | Create Task, Create from Template |
| Recent | Last 5 tasks viewed |
| Saved Views | Personal + Team views |

---

## 6. SCREEN HIERARCHY

### 6.1 Screen Map

```
Tasks Module
├── Dashboard (/tasks/dashboard)
├── My Tasks (/tasks/my-tasks)
│   └── Views: List | Kanban | Calendar*
├── Team Tasks (/tasks/team-tasks)
│   └── Views: List | Kanban | Calendar*
├── Project Tasks (/tasks/project/:id)
│   └── Views: List | Kanban | Calendar* | Timeline*
├── Verification Queue (/tasks/verification)
│   └── View: List only (default)
├── Task Detail (/tasks/:id)
│   ├── Sections (single page, scroll)
│   └── Sub-pages: Activity, Images, Time Log
├── Create Task (modal from any workspace)
└── Edit Task (modal from detail)

* Calendar = phase 3.x; Timeline = phase 4
```

### 6.2 What Moves Off the Monolithic Page

| Current (page.tsx) | New location |
|--------------------|--------------|
| Tasks tab + views | My Tasks / Team Tasks routes |
| KPI cards on list | Dashboard only |
| Performance tab | Finance / HR module or `/performance` |
| Salary tab | Finance module or `/salary` |
| Activity dialog | Task Detail route |
| Inline TaskForm | Create/Edit modal (unchanged pattern) |

---

## 7. TOOLBAR DESIGN

### 7.1 Toolbar Zones (All List Workspaces)

Every list workspace uses a **three-zone toolbar** (top to bottom):

```
┌─────────────────────────────────────────────────────────────────┐
│ ZONE A — Context Header                                            │
│ Title + Breadcrumb | Workspace-specific badge (e.g. project name) │
├─────────────────────────────────────────────────────────────────┤
│ ZONE B — Primary Toolbar (single row, sticky)                      │
│ [Search………………] [Quick Filters] [Saved View ▼] [Filter] [Sort ▼]   │
│                    [View Switcher]     [+ Create Task] [··· More]   │
├─────────────────────────────────────────────────────────────────┤
│ ZONE C — Secondary (conditional)                                   │
│ Active filter chips | Bulk action bar (when selection > 0)        │
└─────────────────────────────────────────────────────────────────┘
│ CONTENT — List | Kanban | Calendar                               │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 Control Placement (Frozen)

| Control | Placement | Primary/Secondary |
|---------|-----------|-------------------|
| Search | Zone B, left, min 240px | Primary |
| Quick filter chips | Zone B or collapsible row | Primary |
| Saved View dropdown | Zone B, center-left | Primary |
| Advanced Filter | Zone B, icon → slide-over panel | Secondary |
| Sort | Zone B, dropdown | Secondary |
| Group By | Zone B, dropdown (Team/Project only) | Secondary |
| View Switcher | Zone B, right of sort | Primary |
| Create Task | Zone B, far right, primary button | Primary |
| Export | More menu (···) | Tertiary |
| Archive | More menu | Tertiary |
| Settings | More menu (workspace prefs) | Tertiary |
| Command Palette | Global (keyboard), not in toolbar | — |
| Bulk actions | Zone C, sticky bottom or top of table | Contextual |

### 7.3 Workspace-Specific Toolbar Variants

| Workspace | Extra controls |
|-----------|----------------|
| My Tasks | Quick: All, Pending, In Progress, Review, Overdue |
| Team Tasks | Team selector, Assignee filter, Stats strip (counts, not KPI cards) |
| Project Tasks | Phase chips, Back to Project, Project status badge |
| Verification | Priority chips, Submitted date sort, Bulk Verify/Reject |
| Dashboard | Date range, Refresh, Export — **no** view switcher |

### 7.4 Verification Queue Toolbar

- **No Kanban/Calendar/Matrix** — list optimized for throughput.
- Primary actions: Quick Verify, Quick Reject (row), Open Detail (row).
- Bulk: Verify, Reject, Assign to Me.

---

## 8. SEARCH STRATEGY

### 8.1 Levels

| Level | Scope | Where |
|-------|-------|-------|
| **Workspace search** | Current workspace dataset | Toolbar search (instant, debounced) |
| **Global search** | All tasks user can see | Cmd+K + optional topbar |
| **Detail search** | Attachments, comments (future) | Within section |

### 8.2 Workspace Search Behavior

- Searches: title, taskId, assignee name, project name, linked record name.
- Debounce: 300ms (reuse `useDebounce`).
- Clear button when query non-empty.
- Empty result → EmptyState with "Clear search" action.

### 8.3 Global Search (Command Palette)

- Fuzzy match on title and ID.
- Results grouped: Tasks, Projects, Employees, Saved Views.
- Enter → navigate; Cmd+Enter → new tab (future).

---

## 9. FILTER STRATEGY

### 9.1 Filter System Layers

```
Layer 1 — Quick Filters (chips)
    One-click presets: Overdue, Due Today, Review, Critical, My Open

Layer 2 — Advanced Filter Panel (slide-over right)
    Status (multi), Priority (multi), Assignee, Project, Site, Phase,
    Due range, Module, Has photos, Verification status

Layer 3 — Saved Views
    Named combinations of Layer 1 + 2 + sort + view mode

Layer 4 — Recent / Pinned
    Last 3 applied; user-pinned views (frontend mock → persistence later)
```

### 9.2 Filter UX Rules

| Rule | Behavior |
|------|----------|
| Active filter count | Badge on Filter icon: e.g. "3" |
| Filter chips | Zone C; each chip removable |
| Clear all | One control clears Layer 2 + chips |
| Reset | Restores workspace default view |
| Apply | Advanced panel applies on "Apply"; preview count optional |
| URL sync | Filters encoded in query string for shareable list URLs (implementation phase) |

### 9.3 Construction-Specific Filters

- **Site location** (multi)
- **Project phase** (Design, Fabrication, Site Prep, Erection, Finishing)
- **Task category** (Installation, Inspection, etc.)
- **Photo proof status** (Before missing, After missing, Ready for review)
- **Verification status** (Pending, Verified, Rejected)

### 9.4 Integration with Existing `TaskFilterPanel`

- **Replace** badge-only filters on main page.
- **Wire** existing `TaskFilterPanel` as Advanced Filter slide-over.
- **Unify** `TaskFilters` interface with `TaskFilter` type (single source).

---

## 10. SAVED VIEW STRATEGY

### 10.1 View Model

```typescript
SavedView {
  id, name, scope: 'personal' | 'team' | 'public' | 'default',
  isPinned?,
  filter: TaskFilter,
  sortBy, sortOrder,
  viewMode: 'list' | 'kanban' | 'calendar' | 'matrix'
}
```

### 10.2 Default System Views

| View | Scope | Filter |
|------|-------|--------|
| All Tasks | default | none |
| My Open Tasks | personal | assignee=me, status not Completed/Cancelled |
| Overdue | personal | overdue=true |
| Pending Review | team | status=Review |
| Critical Priority | public | priority=Critical |
| Due Today | personal | due=today |

### 10.3 UX

- Dropdown in toolbar (reuse `SavedViewDropdown` from Phase 3.1).
- Pin favourite → star icon; pinned view loads on workspace entry (user pref).
- Managers can save **team** views; Admins **public**.
- "Save current view" in Filter panel footer.

---

## 11. TASK CARD BLUEPRINT

### 11.1 Design Intent

Enterprise task cards must communicate **status, risk, and construction context** at a glance. One `TaskCard` component; density controlled by props.

### 11.2 Modes

| Mode | Use | Density |
|------|-----|---------|
| **Compact** | Dashboard widgets, dense lists | Title, status, priority, due |
| **Default** | Kanban, My Tasks cards | + assignee, progress, project chip |
| **Expanded** | Dashboard critical list, optional | + checklist count, comment count, photo indicator |

### 11.3 Field Visibility Matrix

| Field | Compact | Default | Expanded |
|-------|---------|---------|----------|
| Title | ✓ | ✓ | ✓ |
| Task ID | — | ✓ (mono) | ✓ |
| Priority badge | ✓ | ✓ | ✓ |
| Status badge | ✓ | ✓ | ✓ |
| Due (DateDisplay due mode) | ✓ | ✓ | ✓ |
| Assignee + Avatar | — | ✓ | ✓ |
| Progress bar | — | ✓ if >0 | ✓ |
| Project / Module chip | — | ✓ | ✓ |
| Site (if applicable) | — | — | ✓ |
| Checklist x/y | — | — | ✓ |
| Comments count | — | — | ✓ |
| Photo indicator (before/after) | — | — | ✓ |
| Verification badge | — | — | ✓ if Review |
| Dependencies indicator | — | — | ✓ if blocked |
| Watchers (avatar stack) | — | — | optional |

### 11.4 States

| State | Treatment |
|-------|-----------|
| Default | Card border, hover shadow |
| Selected | Ring 2px primary |
| Overdue | Left border red-500 |
| Critical priority | Subtle red tint background |
| Review / verification | Orange left border |
| Loading | Skeleton (existing CardSkeleton pattern) |
| Empty | N/A (parent EmptyState) |

### 11.5 Interaction

| Input | Behavior |
|-------|----------|
| Single click | Open Task Detail route |
| Checkbox (list mode) | Bulk selection; stop propagation |
| Click priority/status badge | Optional: apply filter (Team workspace) |
| Hover | Show row actions menu (···) on list; lift on card |
| Long press (mobile) | Context menu |
| Keyboard | Enter open; Space select (list) |

### 11.6 List Row vs Card

- **List view** uses `DataTable` with columns + compact row density; optional card column on mobile.
- **Kanban** uses `TaskCard` default mode only.
- **Do not** build separate TaskCardEmployee / TaskCardDashboard.

---

## 12. TASK DETAIL BLUEPRINT

### 12.1 Principle

**Real work happens here** — photos, checklist, completion, verification notes, comments. Full route, not modal. Minimum width comfortable at 1280px; responsive stack below 1024px.

### 12.2 Layout (Desktop)

```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER (sticky)                                                   │
│ [← Back] Task ID | Title (editable) | Status ▼ | Priority ▼     │
│ [Follow] [Share] [Edit] [··· More]                                │
├──────────────────────────────────────────────────────────────────┤
│ OVERVIEW BAR                                                      │
│ Type | Module → Record | Site | Assignee | Due | Progress bar    │
│ Due warning badge | Verification badge | Incentive* (*role gated) │
├───────────────────────────────┬──────────────────────────────────┤
│ MAIN (70%)                    │ SIDEBAR (30%, sticky)             │
│                               │                                   │
│ Description                   │ Activity (last 20)                │
│ Checklist                     │ Time Log summary                  │
│ Before Images                 │ Verification card                 │
│ Progress Images               │ Dependencies                      │
│ After Images                  │ Related Tasks                     │
│ Attachments                   │ Followers                         │
│ Comments                      │ History (summary)                 │
│                               │ Linked Records                    │
├───────────────────────────────┴──────────────────────────────────┤
│ ACTION BAR (sticky bottom) — context by status + role             │
│ [Accept] [Start Work] [Complete] [Submit for Review] [Verify]    │
└──────────────────────────────────────────────────────────────────┘
```

### 12.3 Section Priority (Construction)

| Priority | Section | Why |
|----------|---------|-----|
| P0 | Header + Overview | Orientation |
| P0 | Checklist | Field execution |
| P0 | Before / Progress / After Images | Photo proof workflow |
| P0 | Verification | Supervisor review |
| P1 | Description | Specs and instructions |
| P1 | Comments + Followers | Coordination |
| P1 | Dependencies | Sequencing |
| P2 | Activity, History, Time Log | Audit |
| P2 | Attachments, Related Records | Reference |

### 12.4 Action Bar (Status-Driven)

| Status | Employee actions | Manager actions |
|--------|------------------|-----------------|
| Pending | Accept, Start | Reassign, Edit |
| In Progress | Update progress, Upload photos, Block | Reassign |
| Blocked | Unblock (with reason) | Cancel |
| Review | — | Verify, Reject |
| Rejected / Reopened | Resubmit | — |
| Completed | View only | Archive |

### 12.5 Sub-Routes

| Sub-route | When to use |
|-----------|-------------|
| `/activity` | Full audit export, deep history |
| `/images` | Gallery, before/after compare |
| `/time-log` | Timer, entries, export |

### 12.6 Mobile Task Detail

- Single column; sections as **accordions** (Checklist and Photos expanded by default).
- Sticky bottom action bar (primary action only + More).
- Swipeable image gallery.

---

## 13. WORKSPACE LAYOUT BLUEPRINT

### 13.1 Standard List Workspace Template

| Region | Content |
|--------|---------|
| Header | Title, breadcrumb, optional workspace meta |
| Toolbar | Zones A–C (see §7) |
| Content | View outlet (table / kanban / calendar) |
| Footer | Pagination (desktop); Load More (mobile) |
| Right panel | Optional: task preview peek (future); default off |
| Sidebar | None (CRM sidebar only) |

### 13.2 Dashboard Workspace Layout

| Region | Content |
|--------|---------|
| Header | Task Dashboard + date range |
| KPI row | 4 cards only: Open, Overdue, Completed Today, Pending Verification |
| Grid | My Tasks summary (5) \| Critical tasks \| Recent activity |
| Secondary | Team performance table (Manager+) |
| No | View switcher, no full task table |

### 13.3 Verification Queue Layout

| Region | Content |
|--------|---------|
| Header | Title + pending count badge |
| Stats strip | Inline counts (not KPI cards): Pending, Verified today, etc. |
| Toolbar | Search, priority chips, sort |
| Content | DataTable only |
| Footer | Pagination + bulk bar |

### 13.4 Project Tasks Layout

| Region | Content |
|--------|---------|
| Project info card | Name, status, phase, progress (one card, collapsible on mobile) |
| Phase filter chips | Horizontal |
| Toolbar | Standard + Back to Project |
| Content | Views |

### 13.5 States (Every Workspace)

| State | Pattern |
|-------|---------|
| Loading | TableSkeleton / CardSkeleton / ChartSkeleton |
| Empty | Role-specific EmptyState + CTA |
| Error | ErrorState + Retry |
| Success | Toast on actions (existing toast) |

---

## 14. DASHBOARD STRATEGY

### 14.1 Problem with Current Approach

KPI cards on the **task list page** duplicate Dashboard purpose and consume vertical space before users reach their work queue.

### 14.2 Frozen Rule

| Surface | KPIs? | Rationale |
|---------|-------|-----------|
| **Task Dashboard** | Yes — 4 KPIs only | Oversight is the purpose |
| **My Tasks** | No | Execution workspace |
| **Team Tasks** | No — use **stats strip** (text counts) | Lightweight team pulse |
| **Project Tasks** | No — project card has progress | Project context sufficient |
| **Verification Queue** | No — stats strip only | Queue throughput |
| **Task Detail** | No KPI cards | Task-level metrics in Overview bar only |

### 14.3 What Belongs on Task Dashboard Only

- Open tasks (org or team scope by role)
- Overdue count
- Completed today
- Pending verification
- Widgets: My Tasks summary, Critical tasks, Recent activity, Team performance (Manager+)

### 14.4 What Belongs on Task Detail Only

- Progress %, time spent vs estimated
- Verification status
- Due warning indicators
- Incentive value (role gated)
- Checklist completion ratio

---

## 15. VIEW STRATEGY

### 15.1 Problem with Current Hierarchy

List, Kanban, Calendar, and Matrix are **siblings of the page**, implying equal importance. Enterprise tools treat views as **lenses on the same dataset inside a workspace**.

### 15.2 Correct Hierarchy

```
Workspace (My Tasks)
└── Dataset (tasks assigned to me, filtered)
    └── View Mode (lens)
        ├── List      ← default, daily driver
        ├── Kanban    ← status workflow
        ├── Calendar  ← schedule (later)
        └── Matrix    ← prioritization analysis (optional, not default)
```

### 15.3 View Availability by Workspace

| View | My Tasks | Team Tasks | Project Tasks | Verification | Dashboard |
|------|----------|------------|---------------|--------------|-----------|
| List | ✓ default | ✓ default | ✓ default | ✓ only | — |
| Kanban | ✓ | ✓ | ✓ | ✗ | — |
| Calendar | ✓ (phase) | ✓ (phase) | ✓ (phase) | ✗ | — |
| Timeline | ✗ | ✗ | ✓ (phase 4) | ✗ | — |
| Matrix | optional | optional | ✗ | ✗ | — |

### 15.4 Why Matrix Is Demoted

- Eisenhower matrix is an **analysis** tool, not daily execution.
- Available under "More views" or user preference, not primary toggle.
- Reduces toolbar clutter and matches Linear (focus on list/board).

### 15.5 View Persistence

- View mode saved per workspace in user preference (localStorage mock).
- Saved Views can include view mode (e.g. "My Kanban — High Priority").

---

## 16. MOBILE STRATEGY

### 16.1 Breakpoints (Aligned with Blueprint)

| Breakpoint | Layout |
|------------|--------|
| < 768px | Mobile |
| 768–1024px | Tablet |
| 1024–1440px | Laptop |
| > 1440px | Desktop / Ultra-wide |

### 16.2 Mobile Priorities

1. **My Tasks** — primary employee surface
2. **Task Detail** — photos, checklist, complete
3. **Verification** — manager quick approve

### 16.3 Adaptations

| Element | Mobile |
|---------|--------|
| Sidebar | Hamburger → drawer |
| Toolbar | Search icon expands; filters → bottom sheet |
| View switcher | Icon-only or under "Views" menu |
| Table | Card list; hide Task ID column |
| Kanban | Horizontal scroll columns |
| Bulk actions | Bottom action sheet |
| Breadcrumb | Back button + title |
| Task Detail | Accordions; sticky action bar |
| Touch targets | Min 44px |

### 16.4 Field Worker Flow (Mobile)

```
Open app → My Tasks → Due Today filter → Task card tap
→ Detail → Checklist → Take photos → Submit for Review
```

Offline indicators per blueprint (badges only; full offline = future mobile phase).

---

## 17. CONSTRUCTION WORKFLOW

### 17.1 PEB Phase Alignment

Tasks map to construction phases:

| Phase | Task types | Workspace |
|-------|------------|-----------|
| Design | Design Task, Drawing approval | Project Tasks |
| Fabrication | Fabrication, QC | Project Tasks |
| Site Prep | Site Task | Project Tasks + Site filter |
| Erection | Installation, Site Task | Project Tasks |
| Finishing | Maintenance, Inspection | Project Tasks |

### 17.2 Photo Proof Workflow (UX)

| Stage | UX location | Rule |
|-------|-------------|------|
| Before | Task Detail — Before Images | Required for Project/Installation create |
| Progress | Task Detail — Progress Images | Optional during In Progress |
| After | Task Detail — After Images | Mandatory before Review |
| Compare | Image Gallery sub-route | Before/after slider |
| Verification | Verification card + Queue | Manager compares photos |

### 17.3 Site Work Pattern

- Project Tasks workspace filtered by site
- Task card shows site chip (expanded mode)
- My Tasks shows site only when task has site location

### 17.4 Verification Chain

```
Employee completes → Uploads after images → Submit for Review
→ Task appears in Verification Queue
→ Manager opens Detail → Reviews photos + checklist
→ Verify or Reject → Employee notified → Reopen if rejected
```

### 17.5 Templates (Construction)

Template selector on Create Task (Installation, Inspection, Fabrication, etc.) — pre-fills checklist and category; UX only in create flow.

---

## 18. EMPLOYEE JOURNEY

```
Login
  → /tasks/my-tasks (default)
  → Quick filter: Due Today / Overdue
  → Open task (/tasks/:id)
  → Accept → Start Work
  → Checklist + Progress photos
  → Complete → After images + notes
  → Submit for Review
  → Notification: Verified or Rejected
  → If rejected: fix → Resubmit
```

| Step | Screen | Primary action |
|------|--------|----------------|
| 1 | My Tasks | Find today's work |
| 2 | Task Detail | Execute |
| 3 | Task Detail | Document (photos) |
| 4 | Task Detail | Submit for Review |
| 5 | My Tasks | See updated status |

**Employee never needs:** Team Tasks, Verification Queue, Dashboard KPIs.

---

## 19. MANAGER JOURNEY

```
Login
  → /tasks/dashboard
  → Scan KPIs + Critical tasks
  → /tasks/team-tasks OR /tasks/verification
  → Assign / bulk update OR Verify
  → /tasks/:id for deep review
  → Reports (future) for trends
```

| Step | Screen | Primary action |
|------|--------|----------------|
| 1 | Dashboard | Situation awareness |
| 2 | Team Tasks | Assign, reassign, monitor |
| 3 | Verification Queue | Throughput review |
| 4 | Task Detail | Verify/Reject with notes |
| 5 | Team Tasks | Filter overdue / critical |

---

## 20. ADMIN JOURNEY

```
Login
  → /tasks/dashboard (workspace-wide)
  → Team Tasks (all teams)
  → Verification Queue (all pending)
  → Task Detail (audit, incentive fields)
  → Reports / export (future)
  → Settings (task module config, future)
```

Admin sees all Manager capabilities plus workspace-wide scope and incentive visibility per permission matrix in IA doc.

---

## 21. UX PRINCIPLES

1. **Workflow over widgets** — Screen exists to finish a job, not display components.
2. **Detail is home for work** — Lists are indexes.
3. **One primary action** — Per screen, visually dominant.
4. **Progressive disclosure** — Advanced filters, matrix view, history behind explicit actions.
5. **Consistent toolbar** — Same zones across list workspaces.
6. **Role-appropriate defaults** — Landing route and nav differ by role.
7. **Construction context visible** — Site, phase, photos, verification never hidden.
8. **Reuse design system** — No new colors/radius; layout and IA only.
9. **Shareable state** — URLs for tasks, filters (query), saved views.
10. **Forgiving filters** — Clear chips, clear all, visible active count.

### 21.1 Interaction Rules (Frozen)

| Interaction | Rule |
|-------------|------|
| Single click | Open task, apply filter chip, select row |
| Double click | Open task in new tab (future) |
| Right click | Context menu on row/card |
| Hover | Row actions, tooltips on truncated text |
| Drag | Kanban status change only (list order future) |
| Keyboard | See §21.2 |
| Bulk select | Checkbox + shift range |

### 21.2 Keyboard Shortcuts (Frozen)

| Shortcut | Action |
|----------|--------|
| Cmd/Ctrl + K | Command palette |
| Cmd/Ctrl + N | Create task |
| Cmd/Ctrl + F | Focus workspace search |
| G then D | Go Dashboard |
| G then M | Go My Tasks |
| G then T | Go Team Tasks |
| G then V | Go Verification |
| J / K | Next/previous row (list) |
| Enter | Open selected task |
| Esc | Close panel/modal; back from detail optional |

---

## 22. PERFORMANCE PRINCIPLES

1. **No KPI computation on list workspaces** — Reduces render cost.
2. **Virtualize long lists** — When > 100 rows (implementation decision).
3. **Lazy load** — Image gallery, activity full page, timeline view.
4. **Debounce search** — 300ms; no search on every keystroke re-render table.
5. **No duplicate task fetches** — React Query cache per task id.
6. **View mode lazy** — Don't mount Kanban until selected.
7. **Minimal animation** — Existing transition tokens only; no heavy motion libs.
8. **Single TaskCard component** — No duplicate card implementations.
9. **Avoid right panel by default** — Peek preview optional later.
10. **Bundle discipline** — No new packages; cmdk already installed for palette.

---

## 23. ACCESSIBILITY PRINCIPLES

1. **Keyboard** — All toolbar controls tabbable; list navigable J/K.
2. **Focus visible** — Ring on interactive elements (existing focus styles).
3. **ARIA** — View switcher as `role="group"`; progress `role="progressbar"`.
4. **Color + text** — Status/priority never color-only; badges include text.
5. **Touch targets** — 44px minimum on mobile.
6. **Screen reader** — Task row announces title, status, priority, due.
7. **Reduced motion** — Respect `prefers-reduced-motion` for transitions.
8. **Contrast** — Use existing Badge variants (dark-mode safe alphas).
9. **Error association** — Form errors linked to fields (create/edit).
10. **Skip link** — Skip to main content (MainLayout pattern).

---

## 24. FINAL FROZEN ARCHITECTURE

### 24.1 Architecture Summary

The Task Module is restructured from **one monolithic page** into **six workspaces** with **dedicated routes**, a **standard three-zone toolbar**, **views as lenses** inside workspaces, **Task Detail as full-page work surface**, and **KPIs only on Dashboard**.

### 24.2 Implementation Phases (UX → Build Mapping)

| UX Phase | Build phase | Deliverable |
|----------|-------------|-------------|
| 3.1B | — | This document (frozen) |
| 3.1 | Done | Shared components (TaskCard, badges, etc.) |
| 3.2 | Dashboard route only | `/tasks/dashboard` |
| 3.3 | My Tasks route | `/tasks/my-tasks` + toolbar |
| 3.4 | Team Tasks route | `/tasks/team-tasks` |
| 3.5 | Project Tasks route | `/tasks/project/:id` |
| 3.6–3.8 | Create, Edit, Detail | `/tasks/:id` primary |
| 3.9 | Verification route | `/tasks/verification` |
| Split | Performance/Salary | Move out of task page |

### 24.3 Frozen Decisions Checklist

- [x] Workspaces are routes, not tabs
- [x] Employee lands on My Tasks; Manager on Dashboard
- [x] KPI cards only on Task Dashboard
- [x] Views are lenses inside workspaces
- [x] Matrix demoted to optional analysis view
- [x] Verification Queue is list-only workspace
- [x] Task Detail is full page at `/tasks/:taskId`
- [x] Toolbar three-zone pattern on all list workspaces
- [x] TaskFilterPanel wired as advanced filters
- [x] Saved views in toolbar
- [x] Single TaskCard with compact/default/expanded modes
- [x] Performance/Salary removed from Task Module tabs
- [x] PEB design system unchanged
- [x] Construction photo proof centered in Task Detail
- [x] Command palette Cmd+K scope defined
- [x] Mobile-first field worker path through My Tasks → Detail

### 24.4 Document Status

**Architecture Version:** 1.0  
**Status:** Frozen  
**Supersedes:** Ad-hoc layout in `task-management/page.tsx` (for UX purposes only)  
**Complements:** TASK_MODULE_INFORMATION_ARCHITECTURE.md, TASK_MODULE_UX_BLUEPRINT.md  
**Next Step:** Phase 3.2 — Implement Task Dashboard workspace route (no other workspaces until phased)

---

## APPENDIX A — COMPONENT REUSE MAP (Phase 3.1 → Workspaces)

| Shared component (3.1) | Workspace usage |
|----------------------|-----------------|
| TaskCard | Dashboard widgets, Kanban, mobile list |
| StatusBadge / PriorityBadge | Table, cards, detail header |
| DateDisplay | Table due column, cards, overview |
| ProgressBar | Cards, detail overview |
| ViewSwitcher | My/Team/Project toolbars |
| SavedViewDropdown | My/Team toolbars |
| TemplateSelector | Create Task modal |
| DependenciesCard | Task Detail sidebar |
| FollowersSection | Task Detail above comments |
| Avatar | Cards, table, followers |
| DataTable | List views |
| EmptyState / ErrorState | All workspaces |
| KPICard | Dashboard only |
| PageHeader / Breadcrumbs | All workspaces |
| TaskFilterPanel | Advanced filter slide-over |

---

## APPENDIX B — ANTI-PATTERNS (Do Not Implement)

1. KPI row above every task list
2. Performance and Salary tabs inside Task Module
3. Task detail as primary modal
4. Four equal view buttons without workspace context
5. Badge-only filters without advanced panel
6. Separate TaskCard per screen
7. Matrix as default view
8. New design system or color palette for tasks
9. Duplicate mock services for tasks
10. Backend/API work in UX phases

---

**End of Document**
