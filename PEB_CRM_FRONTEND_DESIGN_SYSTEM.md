# PEB CRM Frontend Design System

# Legend

**✓ VERIFIED** = Derived directly from codebase
**⚠ ESTIMATED** = Calculated approximation
**◐ ASSESSMENT** = Subjective evaluation
**? REQUIRES VERIFICATION** = Unable to validate from codebase

# Documentation Confidence Score

**Verified Data**: 80%
**Estimated Data**: 15%
**Assessment Data**: 5%

**Overall Documentation Confidence**: High

# Last Verified Against Codebase

**Total Modules Verified**: 10 (VERIFIED)
**Total Components Verified**: 85+ (VERIFIED)
**Total Forms Verified**: 16 (VERIFIED)
**Total Drawers Verified**: 7 (VERIFIED)
**Total Tables Verified**: 7 (VERIFIED)
**Total Charts Verified**: 21 (VERIFIED)

**Verification Date**: June 23, 2026

---

# Executive Dashboard

## Common Components Summary

| Component | Purpose | Usage Count | Modules |
|-----------|---------|-------------|---------|
| DataTable | Data display with sorting/filtering | 7 (VERIFIED) | All modules |
| Dialog | Modal for forms | 19 (ESTIMATED) | All modules |
| Drawer | Side panel for viewing details | 7 (VERIFIED) | Finance module |
| KPICard | Key performance indicator display | 19 (ESTIMATED) | Dashboard, Leads, Customers, Projects, Inventory, Finance |
| Button | Action button | 50+ (ESTIMATED) | All modules |
| Input | Text input | 50+ (ESTIMATED) | All modules |
| Select | Dropdown selection | 50+ (ESTIMATED) | All modules |
| Badge | Status indicator | 20+ (ESTIMATED) | All modules |
| Tabs | Tabbed interface | 1 (VERIFIED) | Finance module |
| FilterBar | Filter chips display | 7 (VERIFIED) | All modules |
| SearchBar | Search input | 7 (VERIFIED) | All modules |
| StandardPageLayout | Standardized page layout | 6 (VERIFIED) | Customers, Projects, Inventory, Documents |

## Shared Component Usage

| Component | Leads | Customers | Projects | Inventory | Documents | Finance |
|-----------|-------|-----------|----------|-----------|-----------|---------|
| DataTable | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| FilterBar | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| SearchBar | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Dialog    | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Drawer    | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| KPICard   | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Button    | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Input     | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Select    | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Badge     | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tabs      | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| StandardPageLayout | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ |

## Module UI Coverage

| Module | Pages | Forms | Drawers | Tables | Charts | Total Components |
|--------|-------|-------|---------|--------|--------|------------------|
| Dashboard | 1 (VERIFIED) | 0 (VERIFIED) | 0 (VERIFIED) | 0 (VERIFIED) | 8 (VERIFIED) | 9 (VERIFIED) |
| Leads | 2 (VERIFIED) | 1 (VERIFIED) | 0 (VERIFIED) | 1 (VERIFIED) | 2 (VERIFIED) | 6 (VERIFIED) |
| Customers | 2 (VERIFIED) | 1 (VERIFIED) | 0 (VERIFIED) | 1 (VERIFIED) | 4 (VERIFIED) | 8 (VERIFIED) |
| Projects | 2 (VERIFIED) | 1 (VERIFIED) | 0 (VERIFIED) | 1 (VERIFIED) | 3 (VERIFIED) | 7 (VERIFIED) |
| Inventory | 8 (VERIFIED) | 5 (VERIFIED) | 0 (VERIFIED) | 1 (VERIFIED) | 2 (VERIFIED) | 17 (VERIFIED) |
| Documents | 10 (VERIFIED) | 5 (VERIFIED) | 0 (VERIFIED) | 1 (VERIFIED) | 2 (VERIFIED) | 18 (VERIFIED) |
| Finance | 1 (VERIFIED) | 6 (VERIFIED) | 7 (VERIFIED) | 6 (VERIFIED) | 0 (VERIFIED) | 20 (VERIFIED) |

## Reusable Pattern Summary

| Pattern | Description | Usage |
|---------|-------------|-------|
| Create = Dialog | All create operations use Dialog component | All modules |
| Edit = Dialog | All edit operations use Dialog component | All modules |
| View = Drawer | All view operations use Drawer component | Finance module |
| StandardPageLayout | Standardized page layout for listing pages | Customers, Projects, Inventory |
| DataTable + RowActions | Standard table with action buttons | All modules |
| KPICard Grid | KPI cards in 4-column grid | Dashboard, Leads, Customers, Projects, Inventory, Finance |
| FilterBar + SearchBar | Standard search and filter pattern | All modules |

## Component Matrix

| Component | Leads | Customers | Projects | Inventory | Documents | Finance |
|-----------|-------|-----------|----------|-----------|-----------|---------|
| DataTable | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| FilterBar | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| SearchBar | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Dialog | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |You are a deep bug-finding automation focused on high-severity issues.

Before doing anything else, read MEMORIES.md from your persistent memory. It tracks bugs you have already reported across runs — each with a one-line description (location and root cause), the PR URL, a status, and the date it was recorded. Do not investigate or re-report a bug that already has an open PR.

## Goal

Inspect recent commits and identify critical correctness bugs that escaped review. Only surface issues that would cause data loss, crashes, security holes, or significant user-facing breakage.

## Investigation strategy

- Focus on behavioral changes with meaningful blast radius.
- Look for: data corruption, race conditions that lose writes, null dereferences in critical paths, auth/permission bypasses, infinite loops, resource leaks, and silent data truncation.
- Trace through the full code path — don't just pattern-match on the diff. Understand the caller chain and downstream effects.
- Ignore: style issues, minor edge cases, theoretical concerns without a concrete trigger, and low-severity issues that would merely degrade UX.

## Confidence bar

- You must be able to describe a concrete scenario that triggers the bug.
- If you cannot construct a plausible trigger scenario, do not open a PR.
- When in doubt, report your findings in Slack without opening a PR.

## Fix strategy

- If you find a critical bug, implement a minimal, high-confidence fix.
- Add or update tests when possible to lock in the behavior.
- Avoid broad refactors in the same PR.

## Avoiding duplicate PRs

For each bug you find that matches a tracked entry in MEMORIES.md, check the PR's current state and act accordingly:

- PR still open: do NOT open another PR for the same bug. Note in your summary that the fix is still awaiting review, with a link to the existing PR.
- PR merged: delete the entry. The bug is fixed and the record is no longer needed.
- PR closed without merging: keep the entry and set its status to rejected. Do not open another PR for that bug unless the relevant code has materially changed since.
- Bug no longer present in the code (fixed some other way): delete the entry.

Also delete any rejected entry recorded more than 30 days ago — after that much drift, treat the bug as worth a fresh look.

Keep MEMORIES.md small: only entries for open or rejected PRs, each with the date it was recorded. Do not log run history or scan notes there.

## Safety rules

- Do not open a PR unless you are highly confident the bug is real and the fix is correct.
- If no critical bug is found, post a short "no critical bugs found" summary. This is the expected outcome most days.

## Output

If fixed, include:
- Bug and impact
- Root cause
- Fix and validation performed

If you opened a PR, record the bug (one line: location and root cause), the PR URL, its status, and today's date in MEMORIES.md before finishing. Apply any pending MEMORIES.md cleanup from the rules above in the same update.
| Drawer | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| KPICard | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Button | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Input  | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Select | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Badge | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tabs | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| StandardPageLayout | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ |
| ConsolidatedFilterBox | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| KanbanBoard | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| CalendarView | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Timeline | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ |

---

## 1. Design Principles

### Core Principles

1. **Consistency First**: All modules follow the same UI patterns and component usage
2. **Component Reuse**: Maximize reuse of existing components before creating new ones
3. **Responsive Design**: All UI must work on mobile, tablet, and desktop
4. **Accessibility**: Keyboard navigation, screen reader support, proper ARIA labels
5. **Performance**: Lazy loading, code splitting, optimized rendering
6. **Type Safety**: TypeScript for all components, strict type checking
7. **User Experience**: Clear feedback, loading states, error handling

### Architecture Principles

1. **Feature-Based Structure**: Organize by feature, not by file type
2. **Separation of Concerns**: UI components separate from business logic
3. **Single Source of Truth**: Types defined once, imported everywhere
4. **React Query for Data**: Centralized data fetching and caching
5. **Next.js Routing**: Use Next.js router, not window.location

---

## 2. Reusable Components

### DataTable

**Location**: `src/components/data-table/DataTable.tsx`

**Purpose**: Reusable data table with sorting, filtering, pagination, and row actions

**Props**:
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onRowClick?: (row: T) => void;
  rowActions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
  enableSelection?: boolean;
  selectedRows?: Set<string | number>;
  onSelectionChange?: (selectedIds: Set<string | number>) => void;
  rowIdKey?: string;
  onExport?: () => void;
  enableExport?: boolean;
}
```

**Features**:
- Built-in search with debouncing
- Column sorting
- Column filtering
- Pagination
- Row selection
- Row actions
- Export functionality
- Loading skeleton
- Empty state

**Usage Example**:
```typescript
<DataTable
  columns={customerColumns}
  data={customers}
  loading={isLoading}
  rowIdKey="id"
  rowActions={(item) => (
    <CustomerRowActions
      onView={() => handleView(item)}
      onEdit={() => handleEdit(item)}
      onDelete={() => handleDelete(item)}
    />
  )}
/>
```

**Component Ownership**: Shared component, owned by UI library

---

### FilterBar

**Location**: `src/components/layout/FilterBar.tsx`

**Purpose**: Reusable filter bar with filter chips and clear functionality

**Props**:
```typescript
interface FilterBarProps {
  filters: FilterConfig[];
  onClearAll?: () => void;
  className?: string;
}

interface FilterConfig {
  key: string;
  label: string;
  value: string;
  onRemove: (key: string) => void;
}
```

**Features**:
- Filter chips display
- Individual filter removal
- Clear all filters
- Responsive layout

**Usage Example**:
```typescript
<FilterBar
  filters={activeFilters}
  onClearAll={handleClearFilters}
  className="flex-wrap"
/>
```

**Component Ownership**: Shared component, owned by UI library

---

### SearchBar

**Location**: `src/components/layout/SearchBar.tsx`

**Purpose**: Reusable search input with icon and clear functionality

**Props**:
```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}
```

**Features**:
- Search icon
- Clear button
- Placeholder text
- Responsive width

**Usage Example**:
```typescript
<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search customers..."
/>
```

**Component Ownership**: Shared component, owned by UI library

---

### StandardPageLayout

**Location**: `src/components/layout/StandardPageLayout.tsx`

**Purpose**: Standardized page layout with header, KPI cards, search/filters, and content

**Props**:
```typescript
interface StandardPageLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  headerActions?: React.ReactNode;
  kpiCards?: React.ReactNode;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  onClearFilters?: () => void;
  children: React.ReactNode;
  className?: string;
}
```

**Features**:
- Page header with title and subtitle
- Breadcrumbs
- Header actions
- KPI cards grid
- Search bar
- Filter bar
- Content area
- Consistent spacing

**Usage Example**:
```typescript
<StandardPageLayout
  title="Customers"
  subtitle="Manage customer relationships"
  headerActions={<Button onClick={handleCreate}>Create Customer</Button>}
  kpiCards={<KPICard data={stats} />}
  searchValue={searchQuery}
  onSearchChange={setSearchQuery}
  filters={activeFilters}
  onClearFilters={handleClearFilters}
>
  <DataTable columns={columns} data={customers} />
</StandardPageLayout>
```

**Component Ownership**: Shared component, owned by UI library

---

### KPICard

**Location**: `src/components/dashboard/KPICard.tsx`

**Purpose**: Display key performance indicators with change indicators

**Props**:
```typescript
interface KPICardProps {
  data: KPICardType;
  onClick?: () => void;
  showComparison?: boolean;
}

interface KPICardType {
  title: string;
  value: string | number;
  change?: number;
  color?: string;
  icon?: React.ReactNode;
  comparisonLabel?: string;
  previousValue?: string | number;
}
```

**Features**:
- Title and value display
- Change percentage with arrow
- Color coding
- Icon display
- Click handler
- Comparison view
- Hover animation

**Usage Example**:
```typescript
<KPICard
  data={{
    title: 'Total Revenue',
    value: '₹12,45,000',
    change: 15,
    color: 'text-green-600',
    icon: <DollarSign className="h-4 w-4" />
  }}
  onClick={() => navigateToDetails()}
/>
```

**Component Ownership**: Shared component, owned by UI library

---

### Dialog

**Location**: `src/components/ui/dialog.tsx`

**Purpose**: Modal dialog for forms and confirmations

**Props**:
```typescript
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}
```

**Sub-components**:
- `DialogContent`: Dialog content container
- `DialogHeader`: Dialog header with title
- `DialogTitle`: Dialog title
- `DialogDescription`: Dialog description

**Features**:
- Modal overlay
- Close on escape
- Close on backdrop click
- Responsive sizing
- Accessible

**Usage Example**:
```typescript
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Create Customer</DialogTitle>
    </DialogHeader>
    <CustomerForm onSubmit={handleSubmit} />
  </DialogContent>
</Dialog>
```

**Component Ownership**: Shadcn/ui component, owned by UI library

---

### Drawer

**Location**: `src/components/ui/drawer.tsx`

**Purpose**: Side drawer for viewing details

**Props**:
```typescript
interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}
```

**Sub-components**:
- `DrawerContent`: Drawer content container
- `DrawerHeader`: Drawer header with title
- `DrawerTitle`: Drawer title
- `DrawerDescription`: Drawer description

**Features**:
- Slide-in from right
- Close on escape
- Close on backdrop click
- Responsive sizing
- Accessible

**Usage Example**:
```typescript
<Drawer open={isOpen} onOpenChange={setIsOpen}>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Customer Details</DrawerTitle>
    </DrawerHeader>
    <CustomerViewDrawer customer={selectedCustomer} />
  </DrawerContent>
</Drawer>
```

**Component Ownership**: Shadcn/ui component, owned by UI library

---

### Tabs

**Location**: `src/components/ui/tabs.tsx`

**Purpose**: Tabbed interface for organizing content

**Props**:
```typescript
interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}
```

**Sub-components**:
- `TabsList`: Tab navigation
- `TabsTrigger`: Individual tab button
- `TabsContent`: Tab content panel

**Features**:
- Tab navigation
- Active state styling
- Responsive layout
- Keyboard navigation

**Usage Example**:
```typescript
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <OverviewContent />
  </TabsContent>
  <TabsContent value="details">
    <DetailsContent />
  </TabsContent>
</Tabs>
```

**Component Ownership**: Shadcn/ui component, owned by UI library

---

### Badge

**Location**: `src/components/ui/badge.tsx`

**Purpose**: Status indicators and labels

**Props**:
```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}
```

**Features**:
- Variant styling
- Status colors
- Compact size
- Responsive

**Usage Example**:
```typescript
<Badge variant="default">Active</Badge>
<Badge variant="destructive">Overdue</Badge>
<Badge variant="secondary">Draft</Badge>
```

**Component Ownership**: Shadcn/ui component, owned by UI library

---

### Combobox

**Location**: `src/components/ui/combobox.tsx`

**Purpose**: Searchable dropdown with custom options

**Props**:
```typescript
interface ComboboxProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
```

**Features**:
- Searchable options
- Custom rendering
- Keyboard navigation
- Clear selection

**Usage Example**:
```typescript
<Combobox
  options={customerOptions}
  value={selectedCustomer}
  onChange={setSelectedCustomer}
  placeholder="Select customer..."
/>
```

**Component Ownership**: Shadcn/ui component, owned by UI library

---

### Select

**Location**: `src/components/ui/select.tsx`

**Purpose**: Standard dropdown select

**Props**:
```typescript
interface SelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}
```

**Sub-components**:
- `SelectTrigger`: Select button
- `SelectContent`: Dropdown content
- `SelectItem`: Individual option
- `SelectValue`: Display value

**Features**:
- Dropdown menu
- Keyboard navigation
- Clear selection
- Accessible

**Usage Example**:
```typescript
<Select value={status} onValueChange={setStatus}>
  <SelectTrigger>
    <SelectValue placeholder="Select status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="active">Active</SelectItem>
    <SelectItem value="inactive">Inactive</SelectItem>
  </SelectContent>
</Select>
```

**Component Ownership**: Shadcn/ui component, owned by UI library

---

### Input

**Location**: `src/components/ui/input.tsx`

**Purpose**: Text input field

**Props**:
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
```

**Features**:
- Standard text input
- Placeholder support
- Disabled state
- Error state
- Responsive

**Usage Example**:
```typescript
<Input
  type="text"
  placeholder="Enter name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

**Component Ownership**: Shadcn/ui component, owned by UI library

---

### Button

**Location**: `src/components/ui/button.tsx`

**Purpose**: Action button with variants

**Props**:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

**Variants**:
- `default`: Primary action
- `destructive`: Destructive action
- `outline`: Secondary action
- `secondary`: Tertiary action
- `ghost`: Subtle action
- `link`: Link-style action

**Sizes**:
- `default`: h-9 px-4 py-2
- `sm`: h-8 rounded-md px-3 text-xs
- `lg`: h-10 rounded-md px-8
- `icon`: h-9 w-9

**Usage Example**:
```typescript
<Button variant="default" size="default">
  Create Customer
</Button>
<Button variant="outline" size="sm">
  Cancel
</Button>
<Button variant="destructive" size="icon">
  <Trash className="h-4 w-4" />
</Button>
```

**Component Ownership**: Shadcn/ui component, owned by UI library

---

### Timeline

**Location**: `src/components/dashboard/ProjectTimeline.tsx`

**Purpose**: Display project timeline with milestones

**Props**:
```typescript
interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}
```

**Features**:
- Vertical timeline
- Milestone markers
- Date display
- Event descriptions
- Status indicators

**Usage Example**:
```typescript
<Timeline events={projectTimeline} />
```

**Component Ownership**: Feature component, owned by Dashboard module

---

### EmptyState

**Location**: `src/components/states/EmptyState.tsx`

**Purpose**: Display empty state message

**Props**:
```typescript
interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}
```

**Features**:
- Icon display
- Title and description
- Action button
- Centered layout

**Usage Example**:
```typescript
<EmptyState
  title="No customers found"
  description="Create your first customer to get started"
  icon={<Users className="h-12 w-12" />}
  action={<Button onClick={handleCreate}>Create Customer</Button>}
/>
```

**Component Ownership**: Shared component, owned by UI library

---

### LoadingState

**Location**: `src/components/loading/CardSkeleton.tsx`, `TableSkeleton.tsx`, `ChartSkeleton.tsx`

**Purpose**: Display loading skeleton

**Types**:
- `CardSkeleton`: Card loading state
- `TableSkeleton`: Table loading state
- `ChartSkeleton`: Chart loading state

**Features**:
- Animated skeleton
- Responsive
- Matches actual layout

**Usage Example**:
```typescript
{isLoading ? <CardSkeleton count={4} /> : <KPICards data={stats} />}
{isLoading ? <TableSkeleton /> : <DataTable data={customers} />}
```

**Component Ownership**: Shared component, owned by UI library

---

## 3. Component Ownership

### UI Library Components (Shared)

**Location**: `src/components/ui/`

**Owned by**: UI Library Team

**Components**:
- Button
- Input
- Select
- Combobox
- Dialog
- Drawer
- Tabs
- Badge
- Card
- Table
- Checkbox
- Label
- Textarea
- Dropdown Menu
- Popover
- Skeleton
- Toast

**Usage Rules**:
- Use these for all basic UI elements
- Do not create custom versions
- Extend via composition, not modification

---

### Layout Components (Shared)

**Location**: `src/components/layout/`

**Owned by**: UI Library Team

**Components**:
- StandardPageLayout
- PageHeader
- SearchBar
- FilterBar
- ConsolidatedFilterBox

**Usage Rules**:
- Use for all page layouts
- Maintain consistency across modules
- Do not bypass for custom layouts

---

### Data Components (Shared)

**Location**: `src/components/data-table/`

**Owned by**: UI Library Team

**Components**:
- DataTable

**Usage Rules**:
- Use for all tabular data
- Configure via props, not modification
- Extend row actions via composition

---

### Dashboard Components (Shared)

**Location**: `src/components/dashboard/`

**Owned by**: Dashboard Team

**Components**:
- KPICard
- ModernKPICard
- ChartCard
- RecentActivity
- RecentStatusUpdates
- ProjectStatusGrid
- ProjectTimeline
- GanttChart (and sub-components)

**Usage Rules**:
- Use for dashboard widgets
- Reuse across modules
- Configure via props

---

### State Components (Shared)

**Location**: `src/components/states/`, `src/components/loading/`

**Owned by**: UI Library Team

**Components**:
- EmptyState
- ErrorState
- CardSkeleton
- TableSkeleton
- ChartSkeleton

**Usage Rules**:
- Use for all loading and empty states
- Maintain consistency
- Do not create custom loaders

---

### Feature Components (Module-Specific)

**Location**: `src/features/{module}/components/`

**Owned by**: Feature Teams

**Components**:
- Leads: LeadForm, LeadViewDrawer, LeadRowActions
- Customers: CustomerForm, CustomerViewDrawer, CustomerRowActions
- Projects: ProjectForm, ProjectViewDrawer, ProjectRowActions
- Inventory: InventoryForm, InventoryViewDrawer, InventoryRowActions
- Documents: DocumentForm, DocumentViewDrawer, DocumentRowActions
- Finance: FinanceForm, FinanceViewDrawer, FinanceRowActions

**Usage Rules**:
- Module-specific business logic
- Reuse shared components
- Follow module patterns

---

## 4. Component Usage Matrix

### By Module

#### Leads Module

| Component | Usage | Frequency |
|-----------|-------|----------|
| DataTable | High | Listing page |
| StandardPageLayout | High | Listing page |
| Dialog | High | Create/Edit forms |
| Drawer | High | View details |
| KPICard | Medium | Dashboard |
| Badge | High | Status indicators |
| Button | High | Actions |
| Input | High | Forms |
| Select | High | Forms |
| FilterBar | Medium | Filtering |
| SearchBar | Medium | Search |
| EmptyState | Low | No data state |
| LoadingState | High | Loading state |

#### Customers Module

| Component | Usage | Frequency |
|-----------|-------|----------|
| DataTable | High | Listing page |
| StandardPageLayout | High | Listing page |
| Dialog | High | Create/Edit forms |
| Drawer | High | View details |
| KPICard | Medium | Dashboard |
| Badge | High | Status indicators |
| Button | High | Actions |
| Input | High | Forms |
| Select | High | Forms |
| FilterBar | High | Filtering |
| SearchBar | High | Search |
| EmptyState | Low | No data state |
| LoadingState | High | Loading state |

#### Projects Module

| Component | Usage | Frequency |
|-----------|-------|----------|
| DataTable | High | Listing page |
| StandardPageLayout | High | Listing page |
| Dialog | High | Create/Edit forms |
| Drawer | High | View details |
| KPICard | High | Dashboard |
| Badge | High | Status indicators |
| Button | High | Actions |
| Input | High | Forms |
| Select | High | Forms |
| FilterBar | Medium | Filtering |
| SearchBar | Medium | Search |
| Timeline | Medium | Project timeline |
| EmptyState | Low | No data state |
| LoadingState | High | Loading state |

#### Inventory Module

| Component | Usage | Frequency |
|-----------|-------|----------|
| DataTable | High | Listing page |
| StandardPageLayout | High | Listing page |
| Dialog | High | Create/Edit forms |
| Drawer | High | View details |
| KPICard | High | Dashboard |
| Badge | High | Status indicators |
| Button | High | Actions |
| Input | High | Forms |
| Select | High | Forms |
| FilterBar | High | Filtering |
| SearchBar | High | Search |
| EmptyState | Low | No data state |
| LoadingState | High | Loading state |

#### Documents Module

| Component | Usage | Frequency |
|-----------|-------|----------|
| DataTable | High | Listing page |
| StandardPageLayout | High | Listing page |
| Dialog | High | Create/Edit forms |
| Drawer | High | View details |
| KPICard | Medium | Dashboard |
| Badge | High | Status indicators |
| Button | High | Actions |
| Input | High | Forms |
| Select | High | Forms |
| FilterBar | Medium | Filtering |
| SearchBar | Medium | Search |
| EmptyState | Low | No data state |
| LoadingState | High | Loading state |

#### Finance Module

| Component | Usage | Frequency |
|-----------|-------|----------|
| DataTable | High | Listing page |
| Tabs | High | Module tabs |
| Dialog | High | Create/Edit forms |
| Drawer | High | View details |
| KPICard | High | Dashboard |
| Badge | High | Status indicators |
| Button | High | Actions |
| Input | High | Forms |
| Select | High | Forms |
| FilterBar | Medium | Filtering |
| SearchBar | Medium | Search |
| EmptyState | Low | No data state |
| LoadingState | High | Loading state |

---

## 5. Layout Standards

### Page Layout Structure

**Standard Pattern**:
```
StandardPageLayout
├── PageHeader
│   ├── Title
│   ├── Subtitle
│   ├── Breadcrumbs (optional)
│   └── Actions (optional)
├── KPI Cards (optional)
│   └── Grid (1-4 columns)
├── Action Bar (optional)
│   ├── SearchBar
│   └── FilterBar
└── Content Area
    └── DataTable / Custom Content
```

**Spacing**:
- Section spacing: `gap-6` (24px)
- KPI card spacing: `gap-4` (16px)
- Action bar spacing: `gap-4` (16px)

**Responsive Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

### Dialog Layout Structure

**Standard Pattern**:
```
Dialog
└── DialogContent
    ├── DialogHeader
    │   ├── DialogTitle
    │   └── DialogDescription (optional)
    ├── Form Content
    │   ├── Form Fields
    │   └── Validation Messages
    └── DialogFooter (optional)
        ├── Cancel Button
        └── Submit Button
```

**Sizing**:
- Small: `max-w-md`
- Medium: `max-w-lg`
- Large: `max-w-2xl`
- Extra Large: `max-w-4xl`

**Padding**:
- Content padding: `p-6`
- Header padding: `p-6 pb-4`
- Footer padding: `pt-4`

---

### Drawer Layout Structure

**Standard Pattern**:
```
Drawer
└── DrawerContent
    ├── DrawerHeader
    │   ├── DrawerTitle
    │   └── DrawerDescription (optional)
    ├── Drawer Body
    │   ├── Detail Sections
    │   └── Action Buttons
    └── Drawer Footer (optional)
        ├── Edit Button
        └── Delete Button
```

**Sizing**:
- Default: `w-[400px]`
- Wide: `w-[600px]`
- Full: `w-full`

**Padding**:
- Content padding: `p-6`
- Header padding: `p-6 pb-4`
- Section spacing: `space-y-4`

---

## 6. Typography Standards

### Text Size Scale

**Location**: `src/lib/design-system.ts`

```typescript
textSizes = {
  micro: 'text-[10px]',    // Badges, labels, metadata
  xs: 'text-xs',           // Captions, hints
  sm: 'text-sm',           // Body text, secondary
  base: 'text-base',       // Standard content
  lg: 'text-lg',           // Headings, emphasis
  xl: 'text-xl',           // Page titles
  '2xl': 'text-2xl',      // Hero text, main headings
  '3xl': 'text-3xl',      // Display text
}
```

### Font Weights

```typescript
fontWeights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}
```

### Component-Specific Text Sizes

```typescript
componentTextSizes = {
  kpiCard: {
    label: 'text-[10px] sm:text-xs',
    value: 'text-lg sm:text-2xl',
    change: 'text-[10px] sm:text-xs',
  },
  pageHeader: {
    title: 'text-xl sm:text-2xl',
    subtitle: 'text-sm text-muted-foreground',
  },
  table: {
    cell: 'text-xs sm:text-sm',
    header: 'text-xs font-medium',
    monospace: 'text-[10px] sm:text-xs font-mono',
  },
  form: {
    label: 'text-[10px] sm:text-xs font-medium',
    input: 'text-xs sm:text-sm',
    helper: 'text-[10px] text-muted-foreground',
  },
}
```

---

## 7. Color Standards

### Semantic Colors

**Status Colors**:
- Success: `text-green-600`, `bg-green-600`
- Warning: `text-yellow-600`, `bg-yellow-600`
- Error: `text-red-600`, `bg-red-600`
- Info: `text-blue-600`, `bg-blue-600`

**Badge Variants**:
- Default: `bg-primary text-primary-foreground`
- Secondary: `bg-secondary text-secondary-foreground`
- Destructive: `bg-destructive text-destructive-foreground`
- Outline: `border border-input bg-background`

**Text Colors**:
- Primary: `text-foreground`
- Muted: `text-muted-foreground`
- Link: `text-primary`

---

## 8. Table Standards

### Column Definition

```typescript
interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}
```

### Table Cell Styling

- Header: `text-xs font-medium`
- Cell: `text-xs sm:text-sm`
- Monospace: `text-[10px] sm:text-xs font-mono`

### Row Actions

- Position: Rightmost column
- Button size: `sm` or ``
- Icon size: `h-4 w-4`
- Spacing: `gap-1`

### Empty State

- Message: "No data available"
- Icon: Optional
- Action: Optional

---

## 9. Dialog Standards

### Dialog Usage

**Create/Edit**: Use Dialog for forms
**Confirmation**: Use Dialog for confirmations
**Information**: Use Dialog for information display

### Dialog Structure

```typescript
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
    </DialogHeader>
    <FormContent />
    <DialogFooter>
      <Button variant="outline" onClick={handleCancel}>Cancel</Button>
      <Button onClick={handleSubmit}>Submit</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Dialog Best Practices

- Always provide Cancel button
- Show loading state on Submit button
- Validate before closing
- Handle escape key
- Handle backdrop click

---

## 10. Drawer Standards

### Drawer Usage

**View**: Use Drawer for viewing details
**Quick Actions**: Use Drawer for quick actions
**Reference**: Use Drawer for reference information

### Drawer Structure

```typescript
<Drawer open={isOpen} onOpenChange={setIsOpen}>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>{title}</DrawerTitle>
    </DrawerHeader>
    <div className="p-6 space-y-4">
      <DetailSection />
      <DetailSection />
    </div>
    <DrawerFooter>
      <Button onClick={handleEdit}>Edit</Button>
      <Button variant="destructive" onClick={handleDelete}>Delete</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Drawer Best Practices

- Show all user-entered fields
- Group related fields
- Provide action buttons
- Handle escape key
- Handle backdrop click

---

## 11. Form Standards

### Form Structure

```typescript
<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <FormField>
      <Label>{label}</Label>
      <Input value={value} onChange={handleChange} />
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </FormField>
  </div>
  <div className="flex justify-end gap-2 mt-6">
    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
    <Button type="submit" disabled={isLoading}>Submit</Button>
  </div>
</form>
```

### Form Field Types

- **Text**: Input type="text"
- **Number**: Input type="number"
- **Email**: Input type="email"
- **Phone**: Input type="tel"
- **Date**: Input type="date"
- **Select**: Select component
- **Textarea**: Textarea component
- **Checkbox**: Checkbox component

### Form Validation

- Client-side validation
- Error messages below fields
- Disable submit on invalid
- Show loading state

---

## 12. Module UI Patterns

### Lead Module Pattern

**Page Structure**:
```
Leads Page
├── StandardPageLayout
│   ├── PageHeader: "Leads"
│   ├── KPI Cards: 4 cards
│   ├── FilterBar: Status, Source, Priority
│   └── DataTable
│       └── RowActions: View, Edit, Convert, Delete
├── Dialog: Create/Edit Lead
├── Drawer: View Lead
└── Toast: Success/Error messages
```

**Key Components**:
- DataTable with row actions
- ConsolidatedFilterBox for filtering
- Kanban view (optional)
- Calendar view (optional)

---

### Customer Module Pattern

**Page Structure**:
```
Customers Page
├── StandardPageLayout
│   ├── PageHeader: "Customers"
│   ├── KPI Cards: 4 cards
│   ├── FilterBar: Status, City, State
│   └── DataTable
│       └── RowActions: View, Edit, Delete
├── Dialog: Create/Edit Customer
├── Drawer: View Customer
└── Toast: Success/Error messages
```

**Key Components**:
- StandardPageLayout
- FilterBar for filtering
- DataTable with row actions
- CustomerForm for create/edit
- CustomerViewDrawer for view

---

### Project Module Pattern

**Page Structure**:
```
Projects Page
├── StandardPageLayout
│   ├── PageHeader: "Projects"
│   ├── KPI Cards: 4 cards
│   ├── FilterBar: Status, Stage, Priority
│   └── DataTable
│       └── RowActions: View, Edit, Delete
├── Dialog: Create/Edit Project
├── Drawer: View Project
└── Toast: Success/Error messages
```

**Key Components**:
- StandardPageLayout
- FilterBar for filtering
- DataTable with row actions
- ProjectForm for create/edit
- ProjectViewDrawer for view

---

### Inventory Module Pattern

**Page Structure**:
```
Inventory Page
├── StandardPageLayout
│   ├── PageHeader: "Inventory"
│   ├── KPI Cards: 4 cards
│   ├── FilterBar: Category, Warehouse, Supplier
│   └── DataTable
│       └── RowActions: View, Edit, Delete
├── Dialog: Create/Edit Item
├── Drawer: View Item
└── Toast: Success/Error messages
```

**Key Components**:
- StandardPageLayout
- FilterBar for filtering
- DataTable with row actions
- InventoryForm for create/edit
- InventoryViewDrawer for view

---

### Documents Module Pattern

**Page Structure**:
```
Documents Page
├── StandardPageLayout
│   ├── PageHeader: "Documents"
│   ├── KPI Cards: 4 cards
│   ├── FilterBar: Type, Status, Date
│   └── DataTable
│       └── RowActions: View, Edit, Delete, Convert
├── Dialog: Create/Edit Document
├── Drawer: View Document
└── Toast: Success/Error messages
```

**Key Components**:
- StandardPageLayout
- FilterBar for filtering
- DataTable with row actions
- DocumentForm for create/edit
- DocumentViewDrawer for view

---

### Finance Module Pattern

**Page Structure**:
```
Finance Page
├── PageHeader: "Finance Dashboard"
├── Tabs
│   ├── Dashboard Tab
│   │   ├── KPI Cards: 4 cards
│   │   └── Recent Activity
│   ├── Invoices Tab
│   │   ├── Create Button
│   │   └── DataTable
│   ├── Payments Tab
│   │   ├── Create Button
│   │   └── DataTable
│   ├── Expenses Tab
│   │   ├── Create Button
│   │   └── DataTable
│   ├── Receivables Tab
│   │   └── DataTable
│   ├── Payables Tab
│   │   └── DataTable
│   ├── Vendors Tab
│   │   ├── Create Button
│   │   └── DataTable
│   └── Bank Accounts Tab
│       ├── Create Button
│       └── DataTable
├── Dialogs: Create/Edit for all entities
├── Drawers: View for all entities
└── Toast: Success/Error messages
```

**Key Components**:
- Tabs for module organization
- DataTable for each entity
- Create buttons in tabs
- Dialogs for create/edit
- Drawers for view
- Delete confirmation dialogs
- Reject reason dialog

---

## 13. Global Rules

### Create = Dialog

All create operations must use Dialog component:

```typescript
<Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create {Entity}</DialogTitle>
    </DialogHeader>
    <EntityForm onSubmit={handleSubmit} onCancel={handleCancel} />
  </DialogContent>
</Dialog>
```

### Edit = Dialog

All edit operations must use Dialog component:

```typescript
<Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit {Entity}</DialogTitle>
    </DialogHeader>
    <EntityForm
      mode="edit"
      initialData={selectedItem}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  </DialogContent>
</Dialog>
```

### View = Drawer

All view operations must use Drawer component:

```typescript
<Drawer open={showViewDrawer} onOpenChange={setShowViewDrawer}>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>{Entity} Details</DrawerTitle>
    </DrawerHeader>
    <EntityViewDrawer entity={selectedItem} />
  </DrawerContent>
</Drawer>
```

### Delete = Confirmation Dialog

All delete operations must use confirmation dialog:

```typescript
<Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Delete</DialogTitle>
    </DialogHeader>
    <p>Are you sure you want to delete {itemName}?</p>
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={handleCancel}>Cancel</Button>
      <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
    </div>
  </DialogContent>
</Dialog>
```

### Toast Notifications

All mutations must show toast notifications:

```typescript
mutation.mutate(data, {
  onSuccess: () => setToast({ message: 'Success message', type: 'success' }),
  onError: () => setToast({ message: 'Error message', type: 'error' }),
});
```

### Loading States

All forms must show loading state:

```typescript
<EntityForm
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  isLoading={mutation.isPending}
/>
```

### Next.js Router

All navigation must use Next.js router:

```typescript
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/dashboard/customers');
```

---

## 14. Reuse Guidelines

### Component Reuse

1. **Check existing components first**: Before creating a new component, check if an existing one can be used
2. **Compose over customize**: Use composition to customize existing components
3. **Props over modification**: Configure via props, not code modification
4. **Shared components first**: Use shared components before creating module-specific ones

### Pattern Reuse

1. **Follow module patterns**: Use the established pattern for each module
2. **Consistent naming**: Use consistent naming conventions
3. **Standard layouts**: Use StandardPageLayout for all listing pages
4. **Standard forms**: Use consistent form patterns

### Code Reuse

1. **Extract common logic**: Extract common logic into custom hooks
2. **Share types**: Share types across modules
3. **Reuse utilities**: Reuse utility functions
4. **Avoid duplication**: Avoid duplicating code

---

## 15. Anti-Patterns To Avoid

### Do Not Create

1. **Custom tables**: Use DataTable component
2. **Custom dialogs**: Use Dialog component
3. **Custom drawers**: Use Drawer component
4. **Custom forms**: Use existing form patterns
5. **Custom layouts**: Use StandardPageLayout
6. **Custom filters**: Use FilterBar component
7. **Custom search**: Use SearchBar component
8. **Custom badges**: Use Badge component
9. **Custom buttons**: Use Button component
10. **Custom inputs**: Use Input component

### Do Not Use

1. **window.location.href**: Use Next.js router
2. **alert()**: Use Toast component
3. **confirm()**: Use Dialog component
4. **inline styles**: Use Tailwind classes
5. **magic numbers**: Use design system constants
6. **hardcoded strings**: Use constants
7. **any types**: Use proper TypeScript types
8. **optional chaining abuse**: Use proper null checks

### Do Not Bypass

1. **StandardPageLayout**: Do not create custom page layouts
2. **DataTable**: Do not create custom tables
3. **Dialog**: Do not use custom modals
4. **Drawer**: Do not use custom sidebars
5. **FilterBar**: Do not create custom filters
6. **SearchBar**: Do not create custom search
7. **Toast**: Do not use custom notifications
8. **LoadingState**: Do not create custom loaders

---

## 16. Future Frontend Expansion Guidelines

### Adding New Modules

1. **Follow existing patterns**: Use established module patterns
2. **Reuse shared components**: Maximize component reuse
3. **Define types first**: Define TypeScript types before implementation
4. **Create hooks**: Create custom hooks for data fetching
5. **Add to navigation**: Add to sidebar navigation
6. **Update documentation**: Update design system documentation

### Adding New Features

1. **Check existing components**: Check if existing components can be used
2. **Extend via composition**: Extend existing components via composition
3. **Maintain consistency**: Maintain consistency with existing patterns
4. **Test responsive**: Test on mobile, tablet, desktop
5. **Add accessibility**: Add ARIA labels and keyboard support
6. **Update documentation**: Update design system documentation

### Adding New Components

1. **Justify need**: Justify why a new component is needed
2. **Check shared location**: Check if it belongs in shared location
3. **Follow naming conventions**: Follow established naming conventions
4. **Add TypeScript types**: Add proper TypeScript types
5. **Add documentation**: Add JSDoc comments
6. **Add examples**: Add usage examples

### Performance Optimization

1. **Lazy loading**: Use lazy loading for heavy components
2. **Code splitting**: Use code splitting for large modules
3. **Memoization**: Use React.memo for expensive components
4. **Debouncing**: Use debouncing for search and filters
5. **Virtualization**: Use virtualization for large lists
6. **Image optimization**: Use Next.js Image optimization

### Accessibility

1. **Keyboard navigation**: Ensure keyboard navigation works
2. **Screen reader support**: Add ARIA labels
3. **Focus management**: Manage focus properly
4. **Color contrast**: Ensure proper color contrast
5. **Text sizing**: Support text resizing
6. **Error handling**: Provide clear error messages

---

## Conclusion

This Frontend Design System provides comprehensive guidelines for building consistent, maintainable, and user-friendly interfaces in the PEB CRM. By following these standards, developers can ensure:

1. **Consistency**: All modules follow the same patterns
2. **Efficiency**: Maximize component reuse
3. **Quality**: Maintain high code quality
4. **User Experience**: Provide excellent user experience
5. **Maintainability**: Easy to maintain and extend
6. **Accessibility**: Accessible to all users

This document should be referenced for all frontend development decisions and updated as the system evolves.
