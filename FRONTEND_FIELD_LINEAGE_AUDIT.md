# Frontend Field Lineage & Data Usage Audit

**Generated:** 2025-01-06  
**Scope:** PEB-CRM Frontend Application  
**Objective:** Trace form field lifecycles, data flow patterns, and cross-module dependencies across all CRM modules.

---

## Executive Summary

This audit documents the complete field lineage and data usage patterns across the PEB-CRM frontend. The application follows a consistent pattern of:
- **Form Components** → Data entry with validation
- **List Pages** → Data tables with search/filter/export
- **Detail Pages** → Comprehensive views with cross-module links
- **Custom Fields** → Extensible field system per module
- **Cross-Module References** → Foreign key relationships (customerId, projectId, leadId, etc.)

---

## Module-by-Module Field Lineage

### 1. Leads Module

**Form Component:** `LeadForm.tsx`  
**List Page:** `leads/page.tsx`  
**Detail Page:** `leads/[id]/page.tsx`  
**Visual Components:** `KanbanBoard.tsx`, `LeadCalendarView.tsx`

#### Form Fields Lifecycle

| Field | Source | Validation | Cross-Module Usage |
|-------|--------|------------|-------------------|
| customerName | User input | Required | → Customer.customerName (on conversion) |
| companyName | User input | Optional | → Customer.companyName (on conversion) |
| mobile | User input | Required | → Customer.mobile (on conversion) |
| email | User input | Optional | → Customer.email (on conversion) |
| projectType | Select (enum) | Required | → Project.projectType (on conversion) |
| structureType | Select (enum) | Required | → Project.structureType (on conversion) |
| roofType | Select (enum) | Required | → Project.roofType (on conversion) |
| wallType | Select (enum) | Required | → Project.wallType (on conversion) |
| location | User input | Required | → Project.location (on conversion) |
| city | User input | Required | → Customer.city, Project.city |
| state | User input | Required | → Customer.state, Project.state |
| pincode | User input | Optional | → Customer.pincode, Project.pincode |
| leadSource | Select (enum) | Required | Dashboard aggregation |
| leadPriority | Select (enum) | Required | Kanban sorting |
| estimatedValue | Number input | Optional | Finance pipeline calculation |
| customFields | Dynamic | Config-driven | Module-specific extensions |

#### Data Flow Patterns

1. **Lead → Customer Conversion:** Fields flow from LeadForm to CustomerForm via `prefillFromLead` prop
2. **Lead → Project Conversion:** PEB specifications flow to ProjectForm
3. **Dashboard Aggregation:** Lead counts by source, status, priority
4. **Kanban Board:** Status-based grouping with drag-and-drop updates
5. **Calendar View:** Creation date-based display with bulk actions

---

### 2. Customers Module

**Form Component:** `CustomerForm.tsx`  
**List Page:** `customers/page.tsx`  
**Detail Page:** `customers/[id]/page.tsx`

#### Form Fields Lifecycle

| Field | Source | Validation | Cross-Module Usage |
|-------|--------|------------|-------------------|
| customerName | User input | Required | → Lead.customerName (reference) |
| companyName | User input | Required | → Project.customerName |
| mobile | User input | Required | Task assignment lookup |
| email | User input | Optional | Communication |
| gstNumber | User input | Optional | Finance invoicing |
| address | User input | Optional | Project auto-fill |
| city | User input | Required | Filter/search |
| state | User input | Required | Filter/search |
| pincode | User input | Optional | Shipping |
| leadId | Select (from leads) | Optional | → Lead detail link |
| customFields | Dynamic | Config-driven | Module-specific extensions |

#### Data Flow Patterns

1. **Lead → Customer:** Conversion preserves contact and business info
2. **Customer → Project:** Location auto-fills to project (one-time snapshot)
3. **Customer → Finance:** Invoicing uses customer GST, address
4. **Customer → Tasks:** Assignment lookup by customer
5. **Customer → Documents:** Linked to estimates, quotations, invoices

---

### 3. Projects Module

**Form Component:** `ProjectForm.tsx`  
**List Page:** `projects/page.tsx`  
**Detail Page:** `projects/[id]/page.tsx`

#### Form Fields Lifecycle

| Field | Source | Validation | Cross-Module Usage |
|-------|--------|------------|-------------------|
| projectName | User input | Required | Dashboard display |
| customerId | Select (customers) | Required | → Customer detail link |
| leadId | Select (leads) | Optional | → Lead detail link |
| projectType | Select (enum) | Required | Dashboard filtering |
| priority | Select (enum) | Required | Kanban sorting |
| value | Number input | Required | Finance revenue |
| budget | Number input | Required | Budget tracking |
| startDate | Date input | Required | Timeline calculation |
| endDate | Date input | Required | Delay detection |
| location | Auto-fill from customer | Required | Site information |
| city | Auto-fill from customer | Required | Filter/search |
| state | Auto-fill from customer | Required | Filter/search |
| pincode | Auto-fill from customer | Optional | Shipping |
| projectManagerId | User input | Required | Task assignment |
| structureType | Select (enum) | Required | PEB specifications |
| roofType | Select (enum) | Required | PEB specifications |
| craneSystem | Select (enum) | Required | PEB specifications |
| wallType | Select (enum) | Required | PEB specifications |
| width/length/height | Number inputs | Optional | Material calculation |
| baySpacing | Number input | Optional | Structural design |
| coveredArea | Calculated | Optional | Inventory planning |
| totalWeight | Calculated | Optional | Transport planning |
| mezzanine | Checkbox | Optional | Cost calculation |
| insulation | Checkbox | Optional | Cost calculation |
| customFields | Dynamic | Config-driven | Module-specific extensions |

#### Data Flow Patterns

1. **Customer → Project:** Location auto-fills (create mode only, one-time snapshot)
2. **Lead → Project:** PEB specs preserved on conversion
3. **Project → Finance:** Revenue tracking, invoicing
4. **Project → Tasks:** Task assignment by project
5. **Project → Documents:** Estimates, proposals, quotations linked
6. **Project → Inventory:** Material reservations
7. **Dashboard:** KPI aggregation (active, delayed, revenue)

---

### 4. Task Management Module

**Form Component:** `CreateTaskDialog.tsx`  
**List Page:** `task-management/page.tsx`  
**Visual Views:** Kanban, Calendar, Eisenhower Matrix

#### Form Fields Lifecycle

| Field | Source | Validation | Cross-Module Usage |
|-------|--------|------------|-------------------|
| title | User input | Required | Display everywhere |
| description | Textarea | Optional | Task details |
| assignedUserId | Select (employees) | Required | Performance tracking |
| dueDate | Date input | Required | Overdue detection |
| startDate | Date input | Optional | Timeline |
| reminderDate | Date input | Optional | Notifications |
| priority | Select (enum) | Optional | Matrix positioning |
| category | Select (enum) | Optional | Filtering |
| linkedModule | Select (enum) | Optional | Cross-module link |
| linkedRecordId | Dynamic select | Conditional | → Detail navigation |
| projectId | Select (projects) | Optional | → Project link |
| leadId | Select (leads) | Optional | → Lead link |
| customerId | Select (customers) | Optional | → Customer link |
| documentId | Select (documents) | Optional | → Document link |
| incentiveValue | Number input | Optional | Salary calculation |
| estimatedHours | Number input | Optional | Performance metrics |
| tags | Multi-select | Optional | Search/filter |
| notes | Textarea | Optional | Internal notes |
| beforeImages | File upload | Optional | Evidence |
| checklist | Dynamic | Optional | Progress tracking |

#### Data Flow Patterns

1. **Cross-Module Linking:** Tasks can link to Projects, Leads, Customers, Documents
2. **Performance Tracking:** Tasks → Employee performance → Salary adjustments
3. **Visual Views:** Same data displayed as Kanban, Calendar, Matrix
4. **Dashboard:** Task counts (open, overdue, completed today, pending verification)
5. **Notifications:** Task assignment triggers notifications

---

### 5. Inventory Module

**Form Component:** `InventoryItemForm.tsx`  
**List Page:** `inventory/page.tsx`

#### Form Fields Lifecycle

| Field | Source | Validation | Cross-Module Usage |
|-------|--------|------------|-------------------|
| itemMasterId | Select (Item Master) | Required | → Item Master reference |
| itemCode | Auto-fill from master | Read-only | Display only |
| itemName | Auto-fill from master | Read-only | Display only |
| category | Auto-fill from master | Read-only | Filter/search |
| brand | Auto-fill from master | Read-only | Filter/search |
| itemTypeClass | Auto-fill from master | Read-only | Classification |
| unit | Auto-fill from master | Read-only | Calculations |
| currentStock | Number input | Required | Available calculation |
| reservedStock | Number input | Optional | Project reservations |
| issuedStock | Number input | Optional | Consumption tracking |
| incomingStock | Number input | Optional | Procurement planning |
| outgoingStock | Number input | Optional | Shipment tracking |
| minimumStock | Number input | Required | Low stock alert |
| reorderLevel | Number input | Required | Reorder trigger |
| reorderQuantity | Number input | Optional | Purchase planning |
| safetyStock | Number input | Required | Buffer calculation |
| purchaseRate | Number input | Optional | Valuation |
| warehouseId | Select (warehouses) | Required | Location tracking |
| binLocation | User input | Optional | Physical location |
| status | Select (enum) | Required | Filter/search |
| customFields | Dynamic | Config-driven | Module-specific extensions |

#### Data Flow Patterns

1. **Item Master → Inventory:** Product data owned by Item Master (read-only in Inventory)
2. **Inventory → Projects:** Stock reservations for projects
3. **Inventory → Finance:** Stock valuation, cost tracking
4. **Dashboard:** Stock value, low stock alerts, reorder requirements
5. **Calculated Fields:** availableStock = currentStock - reservedStock - issuedStock

---

### 6. Item Master Module

**Form Component:** `ItemForm.tsx`  
**List Page:** `item/page.tsx` (redirects from item-master)

#### Form Fields Lifecycle

| Field | Source | Validation | Cross-Module Usage |
|-------|--------|------------|-------------------|
| categoryId | CategorySelector | Required | Item code generation |
| itemTypeId | CategorySelector | Optional | Sub-category |
| itemCode | Auto-generated | Read-only | Inventory reference |
| sku | Auto-generated | Read-only | Unique identifier |
| itemName | User input | Required | Display everywhere |
| unit | Select (enum) | Required | Inventory calculations |
| brand | User input | Optional | Filter/search |
| grade | User input | Optional | Quality tracking |
| status | Select (enum) | Required | Availability |
| defaultRate | Number input | Required | Finance pricing |
| gstRate | Number input | Required | Tax calculation |
| hsnCode | User input | Optional | Tax compliance |
| itemTypeClass | Select (enum) | Optional | Classification |
| taxType | Select (enum) | Optional | Tax treatment |
| materialGrade | User input | Optional | Specifications |
| thickness | Number input | Optional | Specifications |
| length | Number input | Optional | Specifications |
| width | Number input | Optional | Specifications |
| isStructural | Checkbox | Optional | Classification |
| isCladding | Checkbox | Optional | Classification |
| isAccessory | Checkbox | Optional | Classification |
| isService | Checkbox | Optional | Classification |
| description | Textarea | Optional | Documentation |
| specification | Textarea | Optional | Technical specs |
| technicalDescription | Textarea | Optional | Engineering |
| weight | Number input | Optional | Transport |
| manufacturer | User input | Optional | Sourcing |
| countryOfOrigin | User input | Optional | Import tracking |
| notes | Textarea | Optional | Internal |
| internalNotes | Textarea | Optional | Internal |
| customFields | Dynamic | Config-driven | Module-specific extensions |

#### Data Flow Patterns

1. **Item Master → Inventory:** Source of truth for product data
2. **Item Master → Finance:** Default rates for pricing
3. **Category → Item Code:** Auto-generation based on category
4. **Dashboard:** Item counts, inventory value

---

### 7. Finance Module

**List Page:** `finance/page.tsx`  
**Forms:** InvoiceForm, PaymentForm, ExpenseForm, VendorForm, BankAccountForm (lazy-loaded)

#### Invoice Fields Lifecycle

| Field | Source | Validation | Cross-Module Usage |
|-------|--------|------------|-------------------|
| invoiceNumber | Auto-generated | Read-only | Reference |
| customerId | Select (customers) | Required | → Customer link |
| projectId | Select (projects) | Optional | → Project link |
| sourceType | Select (enum) | Required | Document origin |
| sourceId | Dynamic | Conditional | → Document link |
| subtotal | Calculated | Required | Line items sum |
| taxAmount | Calculated | Required | GST calculation |
| totalAmount | Calculated | Required | Revenue tracking |
| paidAmount | Calculated | Optional | Outstanding calc |
| pendingAmount | Calculated | Required | Receivables |
| gstType | Select (enum) | Required | Tax treatment |
| cgstAmount | Calculated | Optional | Tax breakdown |
| sgstAmount | Calculated | Optional | Tax breakdown |
| igstAmount | Calculated | Optional | Tax breakdown |
| dueDate | Date input | Required | Aging calculation |
| paymentTerms | User input | Optional | Terms |
| status | Select (enum) | Required | Workflow |
| lineItems | Dynamic | Required | Itemized billing |

#### Payment Fields Lifecycle

| Field | Source | Validation | Cross-Module Usage |
|-------|--------|------------|-------------------|
| paymentNumber | Auto-generated | Read-only | Reference |
| invoiceId | Select (invoices) | Optional | → Invoice link |
| customerId | Select (customers) | Required | → Customer link |
| projectId | Select (projects) | Optional | → Project link |
| type | Select (enum) | Required | Payment type |
| amount | Number input | Required | Revenue |
| taxAmount | Number input | Optional | Tax |
| totalAmount | Calculated | Required | Bank transaction |
| paymentDate | Date input | Required | Cash flow |
| paymentMethod | Select (enum) | Required | Reconciliation |
| referenceNumber | User input | Optional | External ref |
| transactionId | Auto-generated | Read-only | Bank link |
| notes | Textarea | Optional | Documentation |
| attachments | File upload | Optional | Evidence |
| status | Select (enum) | Required | Workflow |

#### Expense Fields Lifecycle

| Field | Source | Validation | Cross-Module Usage |
|-------|--------|------------|-------------------|
| expenseNumber | Auto-generated | Read-only | Reference |
| vendorId | Select (vendors) | Required | → Vendor link |
| category | Select (enum) | Required | Reporting |
| subCategory | User input | Optional | Detailed reporting |
| projectId | Select (projects) | Optional | → Project link |
| amount | Number input | Required | Cost tracking |
| taxAmount | Number input | Optional | Tax |
| totalAmount | Calculated | Required | Payables |
| date | Date input | Required | Cash flow |
| description | User input | Optional | Documentation |
| receiptNumber | User input | Optional | Proof |
| invoiceNumber | User input | Optional | Vendor ref |
| notes | Textarea | Optional | Documentation |
| attachments | File upload | Optional | Evidence |
| status | Select (enum) | Required | Approval workflow |

#### Data Flow Patterns

1. **Customer → Finance:** Invoicing uses customer details
2. **Project → Finance:** Revenue attribution to projects
3. **Documents → Finance:** Quotations/Estimates → Invoices
4. **Inventory → Finance:** Stock valuation
5. **Bank Accounts → Transactions:** Cash position tracking
6. **Dashboard:** Revenue, cash position, receivables, payables
7. **Derived Data:** Receivables, payables, vendor summaries, bank summaries

---

### 8. Documents Module

**List Page:** `DocumentsDashboard.tsx`  
**Sub-pages:** Estimates, Proposals, Quotations, Invoices

#### Unified Document Fields

| Field | Source | Validation | Cross-Module Usage |
|-------|--------|------------|-------------------|
| documentNumber | Auto-generated | Read-only | Reference |
| documentType | Select (enum) | Required | Routing |
| customerId | Select (customers) | Required | → Customer link |
| projectName | Auto-fill from project | Optional | → Project link |
| totalAmount | Calculated | Required | Finance |
| status | Select (enum) | Required | Workflow |
| createdBy | Auto-filled | Read-only | Audit trail |
| createdAt | Auto-generated | Read-only | Sorting |
| lineItems | Dynamic | Required | Itemized billing |
| customFields | Dynamic | Config-driven | Module-specific extensions |

#### Data Flow Patterns

1. **Customer → Documents:** Customer details on documents
2. **Project → Documents:** Project-linked documents
3. **Documents → Finance:** Approved quotations → Invoices
4. **Item Master → Documents:** Line items with rates
5. **Dashboard:** Document counts by type and status
6. **PDF Generation:** Print/download functionality
7. **Version History:** Document tracking

---

### 9. Dashboard Module

**Page:** `dashboard/page.tsx`

#### KPI Widget Data Sources

| KPI | Data Source | Fields Used | Calculation |
|-----|-------------|-------------|-------------|
| Total Purchases | Customers | monthly, yearly, change | Customer count |
| Total Sales | Finance | monthly, yearly, change | Revenue sum |
| Active Projects | Projects | active, total, change | Status filter |
| Total Leads | Leads | monthly, yearly, change | Date filter |
| Total Revenue | Finance | monthly, yearly, change | Invoice sum |
| Total Turnover | Finance | monthly, yearly, change | Delivered revenue |
| Project Timeline | Projects | active, total, change | Status/due date |
| Overdue Projects | Projects | total, change | Due date filter |

#### Chart Data Sources

| Chart | Data Source | Fields Used | Aggregation |
|-------|-------------|-------------|-------------|
| Purchases Trend | Customers | monthly | Monthly count |
| Sales Trend | Finance | monthly | Pipeline vs won |
| Leads by Source | Leads | sourceType, monthly | Source distribution |
| Revenue Trend | Finance | monthly | Revenue over time |
| Projects Trend | Projects | active, completed | Status over time |
| Inventory Value | Inventory | totalValue | Value over time |

#### Data Flow Patterns

1. **Real-time Data:** All KPIs use `useDashboardRealData` hook
2. **Prefetching:** Critical data prefetched on mount
3. **Derived Calculations:** Currency formatting, percentage changes
4. **Export:** PDF export with charts and KPIs
5. **Filtering:** Date range filter affects all widgets

---

## Cross-Module Dependencies

### Primary Foreign Key Relationships

```
Customer
  ├── leadId → Lead
  ├── Projects (customerId)
  ├── Invoices (customerId)
  ├── Payments (customerId)
  ├── Tasks (customerId)
  └── Documents (customerId)

Project
  ├── customerId → Customer
  ├── leadId → Lead
  ├── estimateId → Document
  ├── proposalId → Document
  ├── quotationId → Document
  ├── invoiceIds → Invoice[]
  ├── reservedItems → Inventory[]
  └── Tasks (projectId)

Lead
  └── → Customer (on conversion)
  └── → Project (on conversion)

Invoice
  ├── customerId → Customer
  ├── projectId → Project
  ├── sourceId → Document
  └── Payments (invoiceId)

Payment
  ├── invoiceId → Invoice
  ├── customerId → Customer
  └── projectId → Project

Expense
  ├── vendorId → Vendor
  └── projectId → Project

Task
  ├── projectId → Project
  ├── leadId → Lead
  ├── customerId → Customer
  └── documentId → Document

Inventory
  ├── itemMasterId → Item Master
  └── warehouseId → Warehouse

Document
  ├── customerId → Customer
  └── projectId → Project
```

---

## Custom Fields System

### Implementation Pattern

Each module implements custom fields consistently:

1. **Configuration:** `use{Module}Configuration()` hook fetches field definitions
2. **Form Component:** `{Module}CustomFields` component renders dynamic fields
3. **Data Storage:** `customFields` object stores key-value pairs
4. **Display:** Custom field values rendered in tables and detail views
5. **Validation:** Required custom fields validated on form submit

### Modules with Custom Fields

- Leads
- Customers
- Projects
- Inventory
- Item Master
- Documents

---

## Search & Filter Patterns

### Standard Filter Configuration

All list pages use `FilterConfig` array with:

| Filter Type | Common Fields | Implementation |
|-------------|---------------|----------------|
| Status | status | Enum-based options |
| Priority | priority | Enum-based options |
| Date | createdAt, dueDate | Date range presets |
| Entity | customerId, projectId | Foreign key lookup |
| Category | category, type | Enum/string options |
| Location | city, state, warehouse | Geographic filters |
| Custom | module-specific | Dynamic options |

### Search Implementation

- **Debounced Search:** 300ms delay using `useDebounce` hook
- **Multi-field Search:** Searches across name, code, description, etc.
- **Case-insensitive:** All searches use `toLowerCase()`
- **Filter Key:** Memoized key for DataTable re-render optimization

---

## Export Functionality

### CSV Export Pattern

Consistent across all modules:

```typescript
const handleExport = () => {
  const headers = ['Field1', 'Field2', ...];
  const csv = [
    headers.join(','),
    ...data.map(row => [
      row.field1,
      `"${row.field2.replace(/"/g, '""')}"`, // Escape quotes
      ...
    ].join(','))
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `{module}_{date}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};
```

### Exported Fields by Module

| Module | Exported Fields |
|--------|----------------|
| Leads | leadId, customerName, status, source, priority, value, city, state |
| Customers | customerId, customerName, companyName, mobile, email, city, state, status |
| Projects | projectCode, projectName, customer, status, stage, priority, progress, manager, city, value |
| Tasks | taskId, title, assignedTo, priority, status, dueDate, incentive, linkedModule |
| Inventory | itemCode, itemName, category, brand, stock, available, warehouse, bin, status, value |
| Documents | documentNumber, type, customer, project, amount, status, createdBy |
| Finance | invoiceNumber, customer, amount, status, paymentDate, method |

---

## Visual Components

### Kanban Board

**Modules:** Leads, Tasks

**Data Source:** Filtered list grouped by status

**Fields Displayed:**
- Title/Name
- Status (column)
- Priority (badge)
- Assigned To (tasks)
- Due Date (tasks)
- Value (leads)

**Interactions:**
- Drag-and-drop status change
- Click to view details
- Inline actions (edit, delete)

### Calendar View

**Modules:** Leads, Tasks

**Data Source:** Items with date fields

**Fields Displayed:**
- Date-based grouping
- Title/Name
- Status indicator
- Priority indicator

**Interactions:**
- Click date to view items
- Month navigation
- Bulk actions

### Timeline View

**Modules:** Projects

**Data Source:** Projects with start/end dates

**Fields Displayed:**
- Project name
- Date range
- Status
- Progress

**Interactions:**
- Gantt chart visualization
- Status filtering
- Detail view

### Eisenhower Matrix

**Modules:** Tasks

**Data Source:** Tasks with priority and due date

**Quadrants:**
- Urgent & Important (Critical, High priority, overdue)
- Not Urgent & Important (Medium priority, future due)
- Urgent & Not Important (Low priority, near due)
- Not Urgent & Not Important (Low priority, future due)

**Fields Used:**
- priority
- dueDate
- status

---

## Data Validation Patterns

### Form Validation

**Zod Schemas:** Used for type-safe validation

**Common Validations:**
- Required fields
- Positive numbers
- Date ranges (end date >= start date)
- Email format
- Phone format
- GST format
- Enum values

**Custom Field Validation:**
- Required custom fields checked at submit
- Type validation based on field type
- Error display per field

---

## State Management Patterns

### React Query Hooks

**Data Fetching:**
- `use{Module}s()` - List queries
- `use{Module}(id)` - Detail queries
- `use{Module}Configuration()` - Config queries

**Mutations:**
- `useCreate{Module}()` - Create operations
- `useUpdate{Module}()` - Update operations
- `useDelete{Module}()` - Delete operations

### Local State

**Form State:**
- `useState` for form data
- `useForm` (react-hook-form) for complex forms
- `watch` for field dependencies

**UI State:**
- Dialog open/close
- Drawer open/close
- Filter states
- Search query
- Selected rows

### Derived State

**Memoized Calculations:**
- Filtered lists
- KPI aggregations
- Chart data
- Statistics
- Custom field values

---

## Performance Optimizations

### Lazy Loading

**Components:**
- Forms (dynamic import)
- Row actions (dynamic import)
- Charts (lazy + Suspense)
- Heavy components (lazy + Suspense)

**Benefits:**
- Reduced initial bundle size
- Faster page load
- Code splitting by route

### Memoization

**useMemo Usage:**
- Filtered data lists
- Column definitions
- KPI calculations
- Chart data transformations
- Filter options

**useCallback Usage:**
- Event handlers
- Filter functions
- Export functions
- Navigation handlers

### Debouncing

**Search Debounce:**
- 300ms delay
- Prevents excessive filtering
- Improves typing performance

---

## Key Findings & Recommendations

### Strengths

1. **Consistent Patterns:** All modules follow similar structure (form, list, detail)
2. **Type Safety:** TypeScript used throughout with Zod validation
3. **Cross-Module Integration:** Well-defined foreign key relationships
4. **Extensibility:** Custom fields system allows per-module extensions
5. **Performance:** Lazy loading, memoization, debouncing implemented
6. **User Experience:** Search, filter, export available everywhere

### Areas for Improvement

1. **Form Duplication:** Similar form fields across modules could be abstracted
2. **Validation Consistency:** Some modules use Zod, others use manual validation
3. **Error Handling:** Inconsistent error display patterns
4. **Loading States:** Some modules lack skeleton loaders
5. **Field Naming:** Inconsistent naming (customerId vs customer_id)
6. **Data Caching:** React Query stale times could be optimized per module

### Recommendations

1. **Create Shared Form Components:** Abstract common field patterns (address, contact, PEB specs)
2. **Standardize Validation:** Migrate all forms to Zod schemas
3. **Implement Error Boundary:** Add global error handling
4. **Add Loading Skeletons:** Ensure consistent loading states
5. **Standardize Field Naming:** Use camelCase consistently
6. **Optimize Query Caching:** Set appropriate stale times per data type

---

## Appendix: File Reference

### Form Components

- `LeadForm.tsx` - Lead creation/editing
- `CustomerForm.tsx` - Customer creation/editing
- `ProjectForm.tsx` - Project creation/editing
- `CreateTaskDialog.tsx` - Task creation
- `InventoryItemForm.tsx` - Inventory entry
- `ItemForm.tsx` - Item master management
- `InvoiceForm.tsx` - Invoice creation
- `PaymentForm.tsx` - Payment recording
- `ExpenseForm.tsx` - Expense tracking
- `VendorForm.tsx` - Vendor management
- `BankAccountForm.tsx` - Bank account management

### List Pages

- `leads/page.tsx` - Leads list with Kanban/Calendar
- `customers/page.tsx` - Customers list
- `projects/page.tsx` - Projects list
- `task-management/page.tsx` - Tasks with multiple views
- `inventory/page.tsx` - Inventory list
- `item/page.tsx` - Item master list
- `finance/page.tsx` - Finance dashboard
- `documents/page.tsx` - Documents dashboard

### Detail Pages

- `leads/[id]/page.tsx` - Lead detail
- `customers/[id]/page.tsx` - Customer detail
- `projects/[id]/page.tsx` - Project detail
- `documents/[id]/page.tsx` - Document detail

### Visual Components

- `KanbanBoard.tsx` - Leads Kanban
- `LeadCalendarView.tsx` - Leads Calendar
- `TaskKanbanView.tsx` - Tasks Kanban
- `TaskCalendarView.tsx` - Tasks Calendar
- `TaskEisenhowerMatrixView.tsx` - Tasks Matrix
- `ProjectTimeline.tsx` - Projects Timeline
- `DetailedGanttChart.tsx` - Projects Gantt

---

**End of Audit Report**
