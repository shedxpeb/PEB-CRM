# Frontend Evidence Audit

**Generated:** 2025-01-06  
**Scope:** PEB-CRM Frontend Application  
**Objective:** Evidence-based audit of all UI components and their exact data sources. Every statement backed by source code references.

---

## Executive Summary

This audit traces the exact data source chain for every visible UI component in the PEB-CRM frontend. The application uses:

- **React Query hooks** for server data (Leads, Customers, Projects, Inventory, Finance, Item Master, Tasks)
- **Mock data** for dashboard visualizations (Project Status Grid, Project Timeline)
- **Prop passing** for component data flow
- **Static arrays** for reference data (task templates, saved views)

---

## Dashboard Components

### 1. Dashboard KPI Cards

**Component:** `ModernKPICard` (rendered in `dashboard/page.tsx`)

**Data Chain:**
```
dashboard/page.tsx (line 84)
↓
useDashboardRealData() hook
↓
File: frontend/src/features/dashboard/hooks/useDashboardRealData.ts
↓
Aggregates from:
  - useLeadsStats() → leadsApi.getStats()
  - useProjectsStats() → projectsApi.getStats()
  - useCustomersStats() → customersApi.getStats()
  - useInventoryStats() → inventoryApi.getStats()
  - useFinanceStats() → financeApi.getStats()
  - useQuotationStats() → MOCK DATA
```

**Evidence:**
- Line 84 in `dashboard/page.tsx`: `const { data: dashboardData, isLoading, error } = useDashboardRealData();`
- Lines 77-82 in `useDashboardRealData.ts`: Calls `useLeadsStats()`, `useProjectsStats()`, `useCustomersStats()`, `useInventoryStats()`, `useFinanceStats()`, `useQuotationStats()`
- Lines 183-438 in `useQuotation.ts`: Uses `mockQuotations` and `mockStats` static arrays

**Final Data Source:**
- Leads: `leadsApi.getStats()` (React Query)
- Projects: `projectsApi.getStats()` (React Query)
- Customers: `customersApi.getStats()` (React Query)
- Inventory: `inventoryApi.getStats()` (React Query)
- Finance: `financeApi.getStats()` (React Query)
- Quotations: `mockStats` static array in `useQuotation.ts` (MOCK DATA)

---

### 2. Dashboard Charts

**Component:** `DynamicChart` (rendered in `dashboard/page.tsx`)

**Data Chain:**
```
dashboard/page.tsx
↓
Chart data prepared via useMemo in dashboard/page.tsx
↓
Passed as props to DynamicChart component
↓
File: frontend/src/components/dashboard/DynamicChart.tsx
↓
Receives data prop
```

**Evidence:**
- Line 38-39 in `dashboard/page.tsx`: `const DynamicChart = lazy(() => import('@/components/dashboard/DynamicChart')`
- Lines 81-87 in `DynamicChart.tsx`: `export const DynamicChart = memo(function DynamicChart({ type, data, dataKey, secondKey, nameKey }: SeriesProps)`

**Final Data Source:**
- Chart data is prepared in `dashboard/page.tsx` via `useMemo` transformations of `dashboardData` from `useDashboardRealData()`
- Parent component transforms data before passing to chart
- **ORPHAN DATA**: Chart data transformations happen in parent component, not traced in this audit

---

### 3. Project Status Grid

**Component:** `ProjectStatusGrid`

**Data Chain:**
```
dashboard/page.tsx (line 14)
↓
Lazy import: ProjectStatusGrid
↓
File: frontend/src/components/dashboard/ProjectStatusGrid.tsx
↓
Line 13: import { projectStatusCounts } from '@/features/dashboard/data/projectMockData'
↓
File: frontend/src/features/dashboard/data/projectMockData.ts
↓
Lines 315-320: projectStatusCounts object
↓
Line 307: projects array derived from rawProjects
↓
Lines 135-296: rawProjects static array
```

**Evidence:**
- Line 13 in `ProjectStatusGrid.tsx`: `import { projectStatusCounts, type ProjectStatus } from '@/features/dashboard/data/projectMockData';`
- Line 52 in `ProjectStatusGrid.tsx`: `const data = projectStatusCounts[st];`
- Lines 315-320 in `projectMockData.ts`: `export const projectStatusCounts = { ... }`
- Line 307 in `projectMockData.ts`: `export const projects: ProjectRow[] = rawProjects.map((p) => ({ ...p, status: deriveStatus(p) }));`
- Lines 135-296 in `projectMockData.ts`: `const rawProjects: Omit<ProjectRow, "status">[] = [...]`

**Final Data Source:**
- **MOCK DATA**: Static array `rawProjects` in `projectMockData.ts` (lines 135-296)
- Status is derived via `deriveStatus()` function (lines 298-305)

---

### 4. Project Timeline

**Component:** `ProjectTimeline`

**Data Chain:**
```
dashboard/page.tsx (line 15)
↓
Lazy import: ProjectTimeline
↓
File: frontend/src/components/dashboard/ProjectTimeline.tsx
↓
Line 6: import { projects, TODAY } from '@/features/dashboard/data/projectMockData'
↓
File: frontend/src/features/dashboard/data/projectMockData.ts
↓
Line 307: projects array
↓
Lines 135-296: rawProjects static array
```

**Evidence:**
- Line 6 in `ProjectTimeline.tsx`: `import { projects, TODAY, type ProjectStatus } from "@/features/dashboard/data/projectMockData";`
- Line 46 in `ProjectTimeline.tsx`: `const filtered = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.status === filter)), [filter]);`
- Line 70 in `ProjectTimeline.tsx`: `const p = projects.find((x) =>x.id === activeId) ?? projects[0];`
- Line 307 in `projectMockData.ts`: `export const projects: ProjectRow[] = rawProjects.map((p) => ({ ...p, status: deriveStatus(p) }));`

**Final Data Source:**
- **MOCK DATA**: Static array `rawProjects` in `projectMockData.ts` (lines 135-296)

---

### 5. Recent Status Updates

**Component:** `RecentStatusUpdates`

**Data Chain:**
```
dashboard/page.tsx (line 17)
↓
Lazy import: RecentStatusUpdates
↓
File: frontend/src/components/dashboard/RecentStatusUpdates.tsx
↓
Receives statusUpdates prop from parent
↓
dashboard/page.tsx (line 87)
↓
useRecentStatusUpdates(10) hook
↓
File: frontend/src/features/dashboard/hooks/useRecentStatusUpdates.ts
↓
Line 58: useProjects({ page: 1, pageSize: 100 })
↓
Lines 70-81: projectsApi.getActivities(project.id)
```

**Evidence:**
- Line 87 in `dashboard/page.tsx`: `const { data: statusUpdates, isLoading: statusUpdatesLoading, error: statusUpdatesError } = useRecentStatusUpdates(10);`
- Line 58 in `useRecentStatusUpdates.ts`: `const { data: projectsData, isLoading: projectsLoading } = useProjects({ page: 1, pageSize: 100 });`
- Line 72 in `useRecentStatusUpdates.ts`: `const activities = await projectsApi.getActivities(project.id);`
- Lines 44-51 in `useProjects.ts`: `export function useProjects(params?: PaginationParams & ProjectFilters) { return useQuery({ queryKey: ['projects', params], queryFn: () => projectsApi.getAll(params) }); }`

**Final Data Source:**
- `projectsApi.getActivities(project.id)` (React Query)
- Projects fetched via `projectsApi.getAll()` (React Query)

---

## Leads Module Components

### 6. Leads Kanban Board

**Component:** `KanbanBoard`

**Data Chain:**
```
leads/page.tsx (or parent component)
↓
Passes leads array as prop
↓
File: frontend/src/features/leads/components/KanbanBoard.tsx
↓
Line 9: interface KanbanBoardProps { leads: Lead[]; ... }
↓
Line 15: export const KanbanBoard = memo(function KanbanBoard({ leads, ... })
```

**Evidence:**
- Line 9 in `KanbanBoard.tsx`: `interface KanbanBoardProps { leads: Lead[]; pipelineStages?: LeadStatus[]; onLeadUpdate: (lead: Lead) => void; onLeadsReorder?: (leads: Lead[]) => void; }`
- Line 15 in `KanbanBoard.tsx`: `export const KanbanBoard = memo(function KanbanBoard({ leads, pipelineStages, onLeadUpdate, onLeadsReorder }: KanbanBoardProps)`

**Final Data Source:**
- **PROPS**: `leads` array passed from parent component
- Parent component typically uses `useLeads()` hook from `useLeads.ts`
- `useLeads()` → `leadsApi.getAll()` (React Query)

---

### 7. Leads Calendar View

**Component:** `LeadCalendarView`

**Data Chain:**
```
leads/page.tsx (or parent component)
↓
Passes leads array as prop
↓
File: frontend/src/features/leads/components/LeadCalendarView.tsx
↓
Line 12: interface LeadCalendarViewProps { leads: Lead[]; ... }
↓
Line 17: export const LeadCalendarView = memo(function LeadCalendarView({ leads, ... })
```

**Evidence:**
- Line 12 in `LeadCalendarView.tsx`: `interface LeadCalendarViewProps { leads: Lead[]; onLeadClick: (lead: Lead) => void; }`
- Line 17 in `LeadCalendarView.tsx`: `export const LeadCalendarView = memo(function LeadCalendarView({ leads, onLeadClick }: LeadCalendarViewProps)`

**Final Data Source:**
- **PROPS**: `leads` array passed from parent component
- Parent component typically uses `useLeads()` hook from `useLeads.ts`
- `useLeads()` → `leadsApi.getAll()` (React Query)

---

## Task Management Components

### 8. Tasks Kanban View

**Component:** `TaskKanbanView`

**Data Chain:**
```
task-management/page.tsx (or parent component)
↓
Passes tasks array as prop
↓
File: frontend/src/features/task-management/views/TaskKanbanView.tsx
↓
Line 11: interface TaskKanbanViewProps { tasks: Task[]; ... }
↓
Line 28: export const TaskKanbanView: React.FC<TaskKanbanViewProps> = ({ tasks, ... })
```

**Evidence:**
- Line 11 in `TaskKanbanView.tsx`: `interface TaskKanbanViewProps { tasks: Task[]; onTaskClick: (task: Task) => void; onStatusChange: (taskId: string, newStatus: TaskStatus) => void; onEdit?: (task: Task) => void; onComplete?: (task: Task) => void; }`
- Line 28 in `TaskKanbanView.tsx`: `export const TaskKanbanView: React.FC<TaskKanbanViewProps> = ({ tasks, onTaskClick, onStatusChange, onEdit, onComplete }) => {`

**Final Data Source:**
- **PROPS**: `tasks` array passed from parent component
- Parent component typically uses `useTasks()` hook from `useTaskManagement.ts`
- `useTasks()` → `taskManagementApi.getAll()` (React Query)

---

### 9. Tasks Calendar View

**Component:** `TaskCalendarView`

**Data Chain:**
```
task-management/page.tsx (or parent component)
↓
Passes tasks array as prop
↓
File: frontend/src/features/task-management/views/TaskCalendarView.tsx
↓
Line 13: interface TaskCalendarViewProps { tasks: Task[]; ... }
↓
Line 18: export const TaskCalendarView: React.FC<TaskCalendarViewProps> = ({ tasks, ... })
```

**Evidence:**
- Line 13 in `TaskCalendarView.tsx`: `interface TaskCalendarViewProps { tasks: Task[]; onTaskClick: (task: Task) => void; }`
- Line 18 in `TaskCalendarView.tsx`: `export const TaskCalendarView: React.FC<TaskCalendarViewProps> = ({ tasks, onTaskClick }) => {`

**Final Data Source:**
- **PROPS**: `tasks` array passed from parent component
- Parent component typically uses `useTasks()` hook from `useTaskManagement.ts`
- `useTasks()` → `taskManagementApi.getAll()` (React Query)

---

### 10. Tasks Eisenhower Matrix

**Component:** `TaskEisenhowerMatrixView`

**Data Chain:**
```
task-management/page.tsx (or parent component)
↓
Passes tasks array as prop
↓
File: frontend/src/features/task-management/views/TaskEisenhowerMatrixView.tsx
↓
Line 10: interface TaskEisenhowerMatrixViewProps { tasks: Task[]; ... }
↓
Line 53: export const TaskEisenhowerMatrixView: React.FC<TaskEisenhowerMatrixViewProps> = ({ tasks, ... })
```

**Evidence:**
- Line 10 in `TaskEisenhowerMatrixView.tsx`: `interface TaskEisenhowerMatrixViewProps { tasks: Task[]; onTaskClick: (task: Task) => void; onShowMore?: () => void; }`
- Line 53 in `TaskEisenhowerMatrixView.tsx`: `export const TaskEisenhowerMatrixView: React.FC<TaskEisenhowerMatrixViewProps> = ({ tasks, onTaskClick, onShowMore }) => {`

**Final Data Source:**
- **PROPS**: `tasks` array passed from parent component
- Parent component typically uses `useTasks()` hook from `useTaskManagement.ts`
- `useTasks()` → `taskManagementApi.getAll()` (React Query)

---

## Table Components

### 11. DataTable (Generic)

**Component:** `DataTable`

**Data Chain:**
```
Parent component (any list page)
↓
Passes data array as prop
↓
File: frontend/src/components/data-table/DataTable.tsx
↓
Line 32: interface DataTableProps<T> { data: T[]; ... }
↓
Line 50: export const DataTable = React.memo(function DataTable<T>({ data, ... })
```

**Evidence:**
- Line 32 in `DataTable.tsx`: `interface DataTableProps<T = Record<string, any>> { data: T[]; columns: Column<any>[]; loading?: boolean; onRowClick?: (row: any) => void; ... }`
- Line 50 in `DataTable.tsx`: `export const DataTable = React.memo(function DataTable<T = Record<string, any>>({ data, columns, loading, onRowClick, ... }: DataTableProps<T>)`

**Final Data Source:**
- **PROPS**: `data` array passed from parent component
- Parent component uses module-specific hooks:
  - Leads: `useLeads()` → `leadsApi.getAll()`
  - Customers: `useCustomers()` → `customersApi.getAll()`
  - Projects: `useProjects()` → `projectsApi.getAll()`
  - Inventory: `useInventoryItems()` → `inventoryApi.getAll()`
  - Finance: `useInvoices()`, `usePayments()`, `useExpenses()` → `financeApi.getAllInvoices()`, etc.
  - Documents: `useUnifiedDocuments()` → documents API

---

## Form Components

### 12. Form Submissions (Pattern)

**Pattern across all forms:**
```
Form Component (e.g., LeadForm, CustomerForm, ProjectForm)
↓
handleSubmit function
↓
Calls mutation hook (e.g., useCreateLead, useCreateCustomer)
↓
Mutation hook calls API service
↓
API service makes HTTP request to backend
```

**Evidence - LeadForm:**
- `LeadForm.tsx` uses `onSubmit` prop (line not visible in audit, but standard pattern)
- Parent component passes `createLead.mutate()` from `useCreateLead()`
- Lines 73-82 in `useLeads.ts`: `export function useCreateLead() { return useMutation({ mutationFn: (data: CreateLeadDto) => leadsApi.create(data), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['leads'] }); } }); }`

**Evidence - CustomerForm:**
- Similar pattern using `useCreateCustomer()` from `useCustomers.ts`
- Lines 66-76 in `useCustomers.ts`: `export function useCreateCustomer() { return useMutation({ mutationFn: (data: CreateCustomerDto) => customersApi.create(data), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['customers'] }); } }); }`

**Final Data Destination:**
- Submitted data goes to backend API via mutation hooks
- Data is read by:
  - List pages via `use{Module}s()` hooks
  - Detail pages via `use{Module}(id)` hooks
  - Dashboard via stats hooks
- Data is **NOT** read by: unrelated modules (no cross-module data reading except via foreign keys)

---

## Search Implementations

### 13. DataTable Search

**Component:** `DataTable`

**Data Chain:**
```
DataTable component
↓
Line 66: const [searchTerm, setSearchTerm] = useState('')
↓
Line 67: const debouncedSearchTerm = useDebounce(searchTerm, 300)
↓
Lines 80-86: Filters data based on searchTerm
↓
Searches across all columns
```

**Evidence:**
- Line 66 in `DataTable.tsx`: `const [searchTerm, setSearchTerm] = useState('');`
- Line 67 in `DataTable.tsx`: `const debouncedSearchTerm = useDebounce(searchTerm, 300);`
- Lines 80-86 in `DataTable.tsx`: `if (debouncedSearchTerm) { result = result.filter((row) => columns.some((col) => { const value = (row as any)[col.key]; return value?.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase()); })); }`

**Fields Searched:**
- All columns defined in the `columns` prop
- Case-insensitive string matching
- Debounced by 300ms

---

### 14. Module-Specific Search

**Pattern across list pages:**
```
List page (e.g., leads/page.tsx)
↓
searchQuery state
↓
Passed to use{Module}s() hook as params
↓
Hook passes to API service
↓
API service includes in HTTP request
```

**Evidence - Documents Dashboard:**
- Line 43 in `DocumentsDashboard.tsx`: `const [searchQuery, setSearchQuery] = useState('');`
- Line 44 in `DocumentsDashboard.tsx`: `const debouncedSearch = useDebounce(searchQuery, 300);`
- Lines 93-100 in `DocumentsDashboard.tsx`: Search filters on `documentNumber`, `customerName`, `projectName`, `status`, `documentType`, `createdBy`

**Fields Searched (Documents):**
- documentNumber
- customerName
- projectName
- status
- documentType
- createdBy

---

## Filter Implementations

### 15. DataTable Filter

**Component:** `DataTable`

**Data Chain:**
```
DataTable component
↓
Line 72: const [filterColumn, setFilterColumn] = useState<string>('')
↓
Line 73: const [filterValue, setFilterValue] = useState<string>('')
↓
Lines 89-94: Filters data based on filterColumn and filterValue
↓
Exact match filtering
```

**Evidence:**
- Line 72 in `DataTable.tsx`: `const [filterColumn, setFilterColumn] = useState<string>('');`
- Line 73 in `DataTable.tsx`: `const [filterValue, setFilterValue] = useState<string>('');`
- Lines 89-94 in `DataTable.tsx**: `if (filterColumn && filterValue && filterValue !== 'all') { result = result.filter((row) => { const value = (row as any)[filterColumn]; return value?.toString().toLowerCase() === filterValue.toLowerCase(); }); }`

**Fields Filtered:**
- Any column specified by `filterColumn` state
- Exact match (case-insensitive)

---

### 16. Module-Specific Filters

**Pattern across list pages:**
```
List page (e.g., customers/page.tsx)
↓
Filter state variables (statusFilter, cityFilter, etc.)
↓
Passed to use{Module}s() hook as params
↓
Hook passes to API service
↓
API service includes in HTTP request
```

**Evidence - Documents Dashboard:**
- Lines 45-50 in `DocumentsDashboard.tsx`: Filter states for `typeFilter`, `statusFilter`, `customerFilter`, `projectFilter`, `createdByFilter`, `dateFilter`
- Lines 79-103 in `DocumentsDashboard.tsx`: Filter logic in `filteredDocuments` useMemo

**Fields Filtered (Documents):**
- documentType
- status
- customerName
- projectName
- createdBy
- createdAt (date range)

---

## Export Implementations

### 17. DataTable Export

**Component:** `DataTable`

**Data Chain:**
```
DataTable component
↓
Line 42: onExport?: () => void
↓
Parent component passes export function
↓
Export function generates CSV
↓
Downloads file
```

**Evidence:**
- Line 42 in `DataTable.tsx`: `onExport?: () => void;`

**Exported Fields:**
- **ORPHAN DATA**: Export function is passed as prop, not defined in DataTable component
- Each module defines its own export function

---

### 18. Documents Dashboard Export

**Component:** `DocumentsDashboard`

**Data Chain:**
```
DocumentsDashboard.tsx
↓
Lines 286-300: handleExport function
↓
Lines 287-293: CSV generation
↓
Lines 288: headers = ['Document #', 'Type', 'Customer', 'Project', 'Amount', 'Status', 'Created By']
↓
Lines 290-292: Maps filteredDocuments to CSV rows
↓
Line 297: Downloads as documents_{date}.csv
```

**Evidence:**
- Lines 286-300 in `DocumentsDashboard.tsx`: `const handleExport = useCallback(() => { const headers = ['Document #', 'Type', 'Customer', 'Project', 'Amount', 'Status', 'Created By']; const csv = [headers.join(','), ...filteredDocuments.map((d) => [d.documentNumber, d.documentType, `"${d.customerName}"`, d.projectName || '', d.totalAmount, d.status, d.createdBy || ''].join(','))].join('\n'); ... }, [filteredDocuments]);`

**Exported Fields:**
- documentNumber
- documentType
- customerName
- projectName
- totalAmount
- status
- createdBy

---

### 19. Dashboard Export

**Component:** `ExportButton`

**Data Chain:**
```
dashboard/page.tsx
↓
Line 8: import { ExportButton } from '@/features/dashboard/components/ExportButton'
↓
Line 37: onExport callback passed to ExportButton
↓
ExportButton.tsx
↓
Lines 37-38: handleExport calls onExport(type)
↓
dashboard/page.tsx handleExport function
↓
Uses PDFExportService
↓
Generates PDF with charts and KPIs
```

**Evidence:**
- Line 8 in `dashboard/page.tsx`: `import { ExportButton } from '@/features/dashboard/components/ExportButton';`
- Lines 37-38 in `ExportButton.tsx`: `const handleExport = (type: ExportType) => { onExport(type); };`

**Exported Data:**
- **ORPHAN DATA**: PDF export service implementation not traced in this audit
- Export button only triggers the export callback

---

## Mock Data Sources

### 20. Project Mock Data

**File:** `frontend/src/features/dashboard/data/projectMockData.ts`

**Static Arrays:**
- `rawProjects` (lines 135-296): 10 project records with hardcoded data
- `projects` (line 307): Derived from rawProjects with status calculation
- `projectStatusCounts` (lines 315-320): Aggregated counts from projects
- `detailedGanttData` (lines 53-130): Gantt chart phases and tasks
- `TODAY` (line 133): Fixed date "2026-06-12"

**Used By:**
- ProjectStatusGrid component
- ProjectTimeline component
- DetailedGanttChart component (not traced in this audit)

**Evidence:**
- Lines 135-296: `const rawProjects: Omit<ProjectRow, "status">[] = [...]`
- Line 307: `export const projects: ProjectRow[] = rawProjects.map((p) => ({ ...p, status: deriveStatus(p) }));`

---

### 21. Task Mock Data

**File:** `frontend/src/features/task-management/constants/taskMockData.ts`

**Static Arrays:**
- `MOCK_TASK_EMPLOYEES` (lines 12-18): 5 employee records
- `DEFAULT_SAVED_VIEWS` (lines 20-26): 5 saved view configurations
- `CONSTRUCTION_TASK_TEMPLATES` (lines 29-100): 8 task templates

**Used By:**
- Task management components for reference data (not actual task records)
- Task records come from `taskManagementApi` via `useTasks()` hook

**Evidence:**
- Lines 12-18: `export const MOCK_TASK_EMPLOYEES: TaskUser[] = [...]`
- Lines 20-26: `export const DEFAULT_SAVED_VIEWS: SavedView[] = [...]`
- Lines 29-100: `export const CONSTRUCTION_TASK_TEMPLATES: TaskTemplate[] = [...]`

---

### 22. Quotation Mock Data

**File:** `frontend/src/features/documents/hooks/useQuotation.ts`

**Static Arrays:**
- `mockQuotations` (lines 5-172): 2 quotation records
- `mockStats` (lines 174-181): Statistics object

**Used By:**
- `useQuotations()` hook
- `useQuotationStats()` hook
- Dashboard KPI aggregation

**Evidence:**
- Lines 5-172: `const mockQuotations: Quotation[] = [...]`
- Lines 174-181: `const mockStats = { total: 2, draft: 1, sent: 1, accepted: 0, rejected: 0, totalValue: 862557 };`

---

## React Query Hooks Summary

### Data Fetching Hooks

| Hook | File | API Function | Data Source |
|------|------|-------------|-------------|
| useLeads | `leads/hooks/useLeads.ts` | leadsApi.getAll() | Backend API |
| useLeadsStats | `leads/hooks/useLeads.ts` | leadsApi.getStats() | Backend API |
| useCustomers | `customers/hooks/useCustomers.ts` | customersApi.getAll() | Backend API |
| useCustomersStats | `customers/hooks/useCustomers.ts` | customersApi.getStats() | Backend API |
| useProjects | `projects/hooks/useProjects.ts` | projectsApi.getAll() | Backend API |
| useProjectsStats | `projects/hooks/useProjects.ts` | projectsApi.getStats() | Backend API |
| useInventoryItems | `inventory/hooks/useInventory.ts` | inventoryApi.getAll() | Backend API |
| useInventoryStats | `inventory/hooks/useInventory.ts` | inventoryApi.getStats() | Backend API |
| useInvoices | `finance/hooks/useFinance.ts` | financeApi.getAllInvoices() | Backend API |
| usePayments | `finance/hooks/useFinance.ts` | financeApi.getAllPayments() | Backend API |
| useExpenses | `finance/hooks/useFinance.ts` | financeApi.getAllExpenses() | Backend API |
| useFinanceStats | `finance/hooks/useFinance.ts` | financeApi.getStats() | Backend API |
| useItemMasters | `item-master/hooks/useItemMaster.ts` | itemMasterApi.getAll() | Backend API |
| useTasks | `task-management/hooks/useTaskManagement.ts` | taskManagementApi.getAll() | Backend API |
| useTaskStats | `task-management/hooks/useTaskManagement.ts` | taskManagementApi.getStats() | Backend API |
| useQuotations | `documents/hooks/useQuotation.ts` | N/A (mock) | MOCK DATA |
| useQuotationStats | `documents/hooks/useQuotation.ts` | N/A (mock) | MOCK DATA |

---

## Orphan Data

The following data sources could not be fully traced in this audit:

1. **Chart Data Transformations**: Dashboard page transforms `dashboardData` into chart-specific formats via `useMemo`. The exact transformation logic for each chart was not traced.

2. **PDF Export Service**: The `PDFExportService` implementation was not traced. Export button only shows the trigger mechanism.

3. **Form Submission Handlers**: Individual form components (LeadForm, CustomerForm, etc.) submission handlers were not traced. Only the mutation hooks were traced.

4. **Parent Component Data Passing**: For components that receive data via props (KanbanBoard, CalendarView, etc.), the exact parent component implementation was not traced for each instance.

5. **Detailed Gantt Chart**: Component exists but was not traced in this audit.

---

## Data Flow Patterns

### Pattern 1: Server Data via React Query
```
Component → use{Module}() Hook → API Service → Backend API
```
Used by: Leads, Customers, Projects, Inventory, Finance, Item Master, Tasks

### Pattern 2: Mock Data
```
Component → Static Array in File
```
Used by: ProjectStatusGrid, ProjectTimeline, Quotations

### Pattern 3: Props from Parent
```
Parent Component → Child Component (via props)
```
Used by: KanbanBoard, CalendarView, EisenhowerMatrix, DataTable, DynamicChart

### Pattern 4: Local State
```
Component → useState → Local manipulation
```
Used by: DataTable (search, filter, sort), CalendarView (current date), Forms (form data)

---

## Critical Findings

1. **Dashboard Visualizations Use Mock Data**: ProjectStatusGrid and ProjectTimeline use hardcoded mock data in `projectMockData.ts`, not real project data.

2. **Quotations Use Mock Data**: The quotations module uses mock data in `useQuotation.ts`, not connected to backend API.

3. **All Other Modules Use React Query**: Leads, Customers, Projects, Inventory, Finance, Item Master, and Tasks all use React Query hooks connected to backend APIs.

4. **Consistent Prop Pattern**: Visual components (Kanban, Calendar, Matrix) consistently receive data via props from parent components.

5. **DataTable is Generic**: The DataTable component is a generic component that receives data via props. Each module defines its own columns and data source.

6. **Search/Filter in DataTable**: DataTable has built-in search and filter functionality when `showToolbar` is true. Some modules use this, others use page-level filters.

---

## File References

### Dashboard Components
- `frontend/src/app/dashboard/page.tsx` - Main dashboard page
- `frontend/src/features/dashboard/hooks/useDashboardRealData.ts` - Dashboard data aggregation
- `frontend/src/features/dashboard/hooks/useRecentStatusUpdates.ts` - Status updates hook
- `frontend/src/components/dashboard/ProjectStatusGrid.tsx` - Project status grid
- `frontend/src/components/dashboard/ProjectTimeline.tsx` - Project timeline
- `frontend/src/components/dashboard/RecentStatusUpdates.tsx` - Recent status updates
- `frontend/src/components/dashboard/DynamicChart.tsx` - Dynamic chart component
- `frontend/src/features/dashboard/data/projectMockData.ts` - Project mock data
- `frontend/src/features/dashboard/components/ExportButton.tsx` - Export button

### Leads Components
- `frontend/src/features/leads/components/KanbanBoard.tsx` - Leads Kanban board
- `frontend/src/features/leads/components/LeadCalendarView.tsx` - Leads calendar view
- `frontend/src/features/leads/hooks/useLeads.ts` - Leads hooks

### Task Management Components
- `frontend/src/features/task-management/views/TaskKanbanView.tsx` - Tasks Kanban view
- `frontend/src/features/task-management/views/TaskCalendarView.tsx` - Tasks calendar view
- `frontend/src/features/task-management/views/TaskEisenhowerMatrixView.tsx` - Tasks Eisenhower matrix
- `frontend/src/features/task-management/hooks/useTaskManagement.ts` - Task management hooks
- `frontend/src/features/task-management/constants/taskMockData.ts` - Task mock data

### Documents Components
- `frontend/src/features/documents/hooks/useQuotation.ts` - Quotation hooks (mock data)
- `frontend/src/features/documents/pages/DocumentsDashboard.tsx` - Documents dashboard

### Shared Components
- `frontend/src/components/data-table/DataTable.tsx` - Generic data table

### Module Hooks
- `frontend/src/features/customers/hooks/useCustomers.ts` - Customers hooks
- `frontend/src/features/projects/hooks/useProjects.ts` - Projects hooks
- `frontend/src/features/inventory/hooks/useInventory.ts` - Inventory hooks
- `frontend/src/features/finance/hooks/useFinance.ts` - Finance hooks
- `frontend/src/features/item-master/hooks/useItemMaster.ts` - Item master hooks

---

**End of Audit Report**
