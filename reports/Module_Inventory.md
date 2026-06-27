# PEB CRM - Module Inventory Report

**Generated:** June 26, 2026  
**Scope:** Frontend Application Architecture Audit  
**Purpose:** Complete inventory of all modules, their purposes, entry points, pages, components, features, workflows, navigation, and dependencies.

---

## Executive Summary

The PEB CRM frontend consists of **12 primary modules** organized under the `/src/features` directory. Each module represents a distinct business domain with its own pages, components, hooks, services, types, and utilities.

### Module Count by Category

- **Core Business Modules:** 8 (Leads, Customers, Projects, Documents, Inventory, Item Master, Finance, Accounting)
- **Operational Modules:** 2 (Task Management, Dashboard)
- **Configuration Modules:** 2 (Settings, Super Admin)

---

## Module 1: Leads

### Purpose
Lead management system for tracking potential customers from initial contact through conversion to projects or customers.

### Entry Points
- **Route:** `/dashboard/leads`
- **Navigation:** Sidebar → Leads (Users icon)
- **Roles:** Owner, Admin, Employee

### Pages
- **List Page:** `/dashboard/leads/page.tsx` (46,187 bytes)
- **Detail Page:** `/dashboard/leads/[id]/page.tsx`

### Child Pages
- None (detail page is nested under [id])

### Detail Pages
- Lead detail view with full information, activity timeline, conversion options

### Dialogs
- `AddScoreDialog.tsx` - Add lead score
- `ConversionConfirmationDialog.tsx` - Confirm lead conversion
- `ConversionTypeSelector.tsx` - Select conversion type (Customer/Project)
- `LeadConversionDialog.tsx` - Convert lead to customer/project
- `LeadToCustomerConversionDialog.tsx` - Specific customer conversion
- `StatusChangeDialog.tsx` - Change lead status
- `LeadLogsDialog.tsx` - View lead activity logs

### Tables
- Kanban board view (KanbanBoard.tsx, KanbanColumn.tsx, KanbanCard.tsx)
- Calendar view (LeadCalendarView.tsx)
- Standard data table with row actions

### Components
- `LeadHeroCard.tsx` - Hero card with key metrics
- `LeadQuickActions.tsx` - Quick action buttons
- `LeadActivityTimeline.tsx` - Activity timeline
- `LeadTracker.tsx` - Lead tracking visualization
- `LeadForm.tsx` - Create/edit form
- `LeadViewDrawer.tsx` - Side drawer view
- `LeadRowActions.tsx` - Row action menu
- `LeadCustomFields.tsx` - Custom field support

### Features
- Lead scoring system
- Kanban board management
- Calendar view for follow-ups
- Lead to Customer conversion
- Lead to Project conversion
- Activity tracking and logging
- Status workflow management
- Assignment to employees
- Priority management
- Source tracking

### Business Workflows
1. **Lead Creation:** New lead entry with customer details and project requirements
2. **Lead Qualification:** Scoring and priority assignment
3. **Lead Follow-up:** Calendar-based follow-up scheduling
4. **Lead Conversion:** Convert to Customer and/or Project
5. **Lead Rejection:** Mark as rejected with reason

### Navigation Links
- Sidebar: Leads
- Internal links to Customer and Project modules upon conversion

### Dependencies
- **External Modules:** Customers, Projects, Documents
- **Shared Components:** DataTable, KPICard, Dialog, Badge
- **Hooks:** useLeads, useCreateLead, useUpdateLead, useDeleteLead
- **Services:** Lead service API
- **Types:** Lead types (LeadStatus, LeadPriority, LeadSource)

---

## Module 2: Customers

### Purpose
Customer relationship management - central customer database referenced by all other modules.

### Entry Points
- **Route:** `/dashboard/customers`
- **Navigation:** Sidebar → Customers (Building icon)
- **Roles:** Owner, Admin, Employee

### Pages
- **List Page:** `/dashboard/customers/page.tsx` (19,829 bytes)
- **Detail Page:** `/dashboard/customers/[id]/page.tsx`

### Child Pages
- None (detail page is nested under [id])

### Detail Pages
- Customer detail with full profile, projects, quotations, activity timeline

### Dialogs
- Customer create/edit dialog (embedded in form)
- Communication center dialog

### Tables
- Standard data table with customer list
- Project trend table
- Quotation trend table
- Revenue trend table

### Components
- `CustomerHeroCard.tsx` - Hero card with key metrics
- `CustomerSummary.tsx` - Customer summary card
- `CustomerQuickActions.tsx` - Quick action buttons
- `CustomerActivityTimeline.tsx` - Activity timeline
- `CustomerHealthScore.tsx` - Health score indicator
- `CustomerForm.tsx` - Create/edit form
- `CustomerViewDrawer.tsx` - Side drawer view
- `CustomerRowActions.tsx` - Row action menu
- `CustomerCustomFields.tsx` - Custom field support
- `ClickableKPICard.tsx` - Interactive KPI cards
- `CommunicationCenter.tsx` - Communication hub
- Trend charts: `CustomerActivityTrendChart.tsx`, `CustomerProjectTrendChart.tsx`, `CustomerQuotationTrendChart.tsx`, `CustomerRevenueTrendChart.tsx`

### Features
- Customer profile management
- Activity timeline tracking
- Health score calculation
- Project association
- Quotation tracking
- Revenue tracking
- Communication center
- Custom field support
- Employee assignment
- Industry and business type categorization

### Business Workflows
1. **Customer Creation:** Manual entry or Lead conversion
2. **Customer Management:** Update profile, assign employees
3. **Customer Communication:** Track communications via Communication Center
4. **Customer Analytics:** View project trends, quotation trends, revenue trends

### Navigation Links
- Sidebar: Customers
- Links from Leads (upon conversion)
- Links to Projects, Documents, Finance

### Dependencies
- **External Modules:** Leads, Projects, Documents, Finance
- **Shared Components:** DataTable, KPICard, Dialog, Badge
- **Hooks:** useCustomers, useCreateCustomer, useUpdateCustomer, useDeleteCustomer
- **Services:** Customer service API
- **Types:** Customer types (CustomerStatus, Industry, BusinessType, CustomerSource)

---

## Module 3: Projects

### Purpose
Project execution management - central project tracking from design through handover.

### Entry Points
- **Route:** `/dashboard/projects`
- **Navigation:** Sidebar → Projects (FolderKanban icon)
- **Roles:** Owner, Admin, Employee

### Pages
- **List Page:** `/dashboard/projects/page.tsx` (21,788 bytes)
- **Detail Page:** `/dashboard/projects/[id]/page.tsx`
- **Reports:** `/dashboard/projects/reports/page.tsx`

### Child Pages
- Reports sub-page

### Detail Pages
- Project detail with full information, milestones, timeline, team, inventory links

### Dialogs
- Project create/edit dialog (embedded in form)

### Tables
- Standard data table with project list
- Project reports table

### Components
- `ProjectHealthCard.tsx` - Health status indicator
- `ProjectTimeline.tsx` - Project timeline visualization
- `MilestoneTracker.tsx` - Milestone tracking
- `ProjectForm.tsx` - Create/edit form
- `ProjectViewDrawer.tsx` - Side drawer view
- `ProjectRowActions.tsx` - Row action menu
- `ProjectCustomFields.tsx` - Custom field support

### Features
- Project profile management
- Milestone tracking
- Timeline visualization
- Health status monitoring (timeline, budget, material, resource)
- Team assignment
- Progress tracking (design, procurement, fabrication, installation)
- Budget tracking
- PEB-specific fields (structure type, dimensions, roof type, crane system, etc.)
- Custom field support

### Business Workflows
1. **Project Creation:** Manual entry or Lead/Quotation conversion
2. **Project Planning:** Set milestones, assign team, define budget
3. **Project Execution:** Track progress through stages (Design → BOQ → Procurement → Fabrication → Installation)
4. **Project Monitoring:** Health status, timeline adherence, budget variance
5. **Project Completion:** Handover and closure

### Navigation Links
- Sidebar: Projects
- Links from Leads, Customers, Documents
- Links to Inventory, Finance

### Dependencies
- **External Modules:** Leads, Customers, Documents, Inventory, Finance
- **Shared Components:** DataTable, KPICard, Dialog, Badge
- **Hooks:** useProjects, useCreateProject, useUpdateProject, useDeleteProject
- **Services:** Project service API
- **Types:** Project types (ProjectStatus, ProjectStage, ProjectType, StructureType, etc.)

---

## Module 4: Documents

### Purpose
Document management system for Estimates, Proposals, Quotations, Templates, and Approvals.

### Entry Points
- **Route:** `/dashboard/documents`
- **Navigation:** Sidebar → Documents (FileText icon)
- **Roles:** Owner, Admin, Employee

### Pages
- **Main Page:** `/dashboard/documents/page.tsx` (177 bytes - wrapper)
- **Detail Page:** `/dashboard/documents/[id]/page.tsx`
- **Estimates:** `/dashboard/documents/estimates/page.tsx`
- **Proposals:** `/dashboard/documents/proposals/page.tsx`
- **Quotations:** `/dashboard/documents/quotations/page.tsx`
- **Templates:** `/dashboard/documents/templates/page.tsx`
- **Approvals:** `/dashboard/documents/approvals/page.tsx`
- **Library:** `/dashboard/documents/library/page.tsx`
- **Analytics:** `/dashboard/documents/analytics/page.tsx`
- **Activity Logs:** `/dashboard/documents/activity-logs/page.tsx`
- **Version History:** `/dashboard/documents/version-history/page.tsx`

### Child Pages
- 10 sub-pages for different document types and functions

### Detail Pages
- Document detail view with full information, line items, approval status, version history

### Dialogs
- `DocumentViewDialog.tsx` - Full document view
- `DocumentPdfPreviewDialog.tsx` - PDF preview
- `SendDocumentDialog.tsx` - Send document via email/SMS
- Status dropdown dialog

### Tables
- Standard data table for each document type
- Analytics tables
- Activity logs table

### Components
- `DocumentViewDrawer.tsx` - Side drawer view
- `DocumentRowActions.tsx` - Row action menu
- `DocumentActivityTimeline.tsx` - Activity timeline
- `DocumentCustomFields.tsx` - Custom field support
- `EstimateBuilder.tsx` - Estimate creation builder
- `ProposalBuilder.tsx` - Proposal creation builder
- `QuotationBuilder.tsx` - Quotation creation builder
- `EstimateHeaderForm.tsx` - Estimate header form
- `ItemPicker.tsx` - Item selection from Item Master
- `PricingConfigurationEditor.tsx` - Pricing configuration
- `ScopeConfigurationEditor.tsx` - Scope configuration
- `TechnicalSpecsForm.tsx` - Technical specifications form
- `StatusDropdown.tsx` - Status selection dropdown
- Print components in `print/` subdirectory

### Features
- Document creation (Estimate, Proposal, Quotation)
- Document templates management
- Approval workflow system
- Version history tracking
- Activity logging
- PDF generation and preview
- Email/SMS sending
- Line item management with Item Master integration
- Pricing configuration
- Scope configuration
- Technical specifications
- GST calculation (CGST, SGST, IGST, CESS)
- Document conversion (Estimate → Proposal → Quotation → Invoice)
- Analytics and reporting

### Business Workflows
1. **Document Creation:** Create Estimate from Lead/Project
2. **Document Review:** Internal review and approval
3. **Document Sending:** Send to customer via email/SMS
4. **Document Conversion:** Convert to next stage (Estimate → Proposal → Quotation)
5. **Document Approval:** Multi-level approval workflow
6. **Document Versioning:** Track all changes with version history

### Navigation Links
- Sidebar: Documents
- Links from Leads, Customers, Projects
- Links to Finance (for Invoice generation)

### Dependencies
- **External Modules:** Leads, Customers, Projects, Item Master, Finance
- **Shared Components:** DataTable, KPICard, Dialog, Badge
- **Hooks:** useDocuments, useCreateDocument, useUpdateDocument, useDeleteDocument
- **Services:** Document service API
- **Types:** Document types (DocumentType, DocumentStatus, ApprovalStatus, TemplateType)

---

## Module 5: Inventory

### Purpose
Stock management system - tracks operational stock levels, movements, and warehouse operations. **NOT a product catalog** (that's Item Master).

### Entry Points
- **Route:** `/dashboard/inventory`
- **Navigation:** Sidebar → Inventory (Package icon)
- **Roles:** Owner, Admin

### Pages
- **Main Page:** `/dashboard/inventory/page.tsx` (20,048 bytes)
- **Detail Page:** `/dashboard/inventory/[id]/page.tsx`
- **Alerts:** `/dashboard/inventory/alerts/page.tsx`
- **Categories:** `/dashboard/inventory/categories/page.tsx`
- **Reports:** `/dashboard/inventory/reports/page.tsx`
- **Stock Movements:** `/dashboard/inventory/stock-movements/page.tsx`
- **Suppliers:** `/dashboard/inventory/suppliers/page.tsx`
- **Warehouses:** `/dashboard/inventory/warehouses/page.tsx`

### Child Pages
- 7 sub-pages for different inventory functions

### Detail Pages
- Inventory item detail with stock levels, movements, allocations

### Dialogs
- `InventoryItemForm.tsx` - Create/edit inventory item
- `StockMovementForm.tsx` - Record stock movement
- `CategoryForm.tsx` - Create/edit category
- `SupplierForm.tsx` - Create/edit supplier
- `WarehouseForm.tsx` - Create/edit warehouse

### Tables
- Standard data table with inventory items
- Stock movements table
- Suppliers table
- Warehouses table
- Alerts table
- Reports tables

### Components
- `InventoryViewDrawer.tsx` - Side drawer view
- `InventoryRowActions.tsx` - Row action menu
- `InventoryActivityTimeline.tsx` - Activity timeline
- `InventoryCustomFields.tsx` - Custom field support
- `InventoryItemForm.tsx` - Main form
- `StockMovementForm.tsx` - Stock movement recording
- `CategoryForm.tsx` - Category management
- `SupplierForm.tsx` - Supplier management
- `WarehouseForm.tsx` - Warehouse management

### Features
- Stock level tracking (current, reserved, issued, available)
- Stock movement recording (in, out, transfer, adjustment, reservation, release, consumption)
- Warehouse management
- Supplier management
- Category management
- Stock alerts (low stock, out of stock, reorder required, critical)
- Bin location tracking
- Reorder level management
- Safety stock management
- Project stock allocation tracking
- Stock value calculation
- Custom field support

### Business Workflows
1. **Inventory Entry:** Create inventory item linked to Item Master
2. **Stock Management:** Record stock movements (in/out/transfers)
3. **Stock Monitoring:** Track stock levels, generate alerts
4. **Stock Allocation:** Reserve stock for projects
5. **Stock Replenishment:** Trigger reorders based on reorder levels

### Navigation Links
- Sidebar: Inventory
- Links from Projects (for stock allocation)
- Links to Item Master (for product details)

### Dependencies
- **External Modules:** Item Master (product catalog reference), Projects
- **Shared Components:** DataTable, KPICard, Dialog, Badge
- **Hooks:** useInventoryItems, useCreateInventoryItem, useUpdateInventoryItem, useDeleteInventoryItem
- **Services:** Inventory service API
- **Types:** Inventory types (StockStatus, MovementType, UnitType, ItemTypeClass)

### Architecture Note
Inventory is **NOT** a product catalog. Product metadata (Brand, Grade, Spec, HSN, Dimensions, Weight, Technical Files, Default Pricing) belongs in Item Master module. Inventory only tracks stock quantities and movements.

---

## Module 6: Item Master

### Purpose
Product catalog - single source of truth for all products/items in the system. Contains product definitions, specifications, pricing, and technical data.

### Entry Points
- **Route:** `/dashboard/item` (canonical)
- **Legacy Route:** `/dashboard/item-master` (redirects to `/dashboard/item`)
- **Navigation:** Sidebar → Items (Package icon - labeled as "Item")
- **Roles:** Owner, Admin, Employee

### Pages
- **Main Page:** `/dashboard/item/page.tsx` (16,175 bytes)
- **Detail Page:** `/dashboard/items/[id]/page.tsx`
- **Legacy Redirect:** `/dashboard/item-master/page.tsx` (10 bytes - redirect only)

### Child Pages
- None (detail page is nested under [id])

### Detail Pages
- Item detail with full product specifications, variants, bundles

### Dialogs
- `ItemForm.tsx` - Create/edit item

### Tables
- Standard data table with item list

### Components
- `ItemViewDrawer.tsx` - Side drawer view
- `ItemRowActions.tsx` - Row action menu
- `ItemCustomFields.tsx` - Custom field support
- `ItemForm.tsx` - Main form
- `ItemMasterSelector.tsx` - Item selection dropdown
- `ItemSuggestion.tsx` - Item suggestion/autocomplete
- `CategoryFilter.tsx` - Category filtering
- `CategorySelector.tsx` - Category selection

### Features
- Product catalog management
- Category hierarchy management
- Product variants support
- Product bundles support
- Technical specifications (dimensions, weight, thickness, etc.)
- HSN code and GST rate management
- Default pricing
- Unit management
- Brand and grade tracking
- Manufacturer and country of origin
- Product images and datasheets
- PEB classification (Structural, Cladding, Accessory, Service)
- Tax type management (CGST_SGST, IGST, Exempt)
- Custom field support
- Preferred supplier assignment

### Business Workflows
1. **Item Creation:** Add new product to catalog with full specifications
2. **Item Management:** Update specifications, pricing, images
3. **Variant Management:** Create product variants (e.g., different thicknesses)
4. **Bundle Management:** Create product bundles
5. **Category Management:** Manage category hierarchy

### Navigation Links
- Sidebar: Items (labeled as "Item" in navigation)
- Links from Inventory (for product details)
- Links from Documents (for line item selection)

### Dependencies
- **External Modules:** Inventory (stock reference), Documents
- **Shared Components:** DataTable, KPICard, Dialog, Badge
- **Hooks:** useItemMasters, useCreateItemMaster, useUpdateItemMaster, useDeleteItemMaster
- **Services:** Item Master service API
- **Types:** Item Master types (ItemStatus, UnitType, ItemTypeClass, TaxType)

### Architecture Note
Item Master is the **single source of truth** for product definitions. Inventory module only manages stock quantities. Documents should store snapshots of item data, not itemMasterId directly, to ensure historical accuracy.

---

## Module 7: Finance

### Purpose
Financial operations management - invoices, payments, expenses, vendors, bank accounts, receivables, payables. Central financial control system.

### Entry Points
- **Route:** `/dashboard/finance`
- **Navigation:** Sidebar → Finance (DollarSign icon)
- **Roles:** Owner, Admin

### Pages
- **Main Page:** `/dashboard/finance/page.tsx` (80,521 bytes - very large, multi-tab)
- **Invoice Detail:** `/dashboard/finance/invoices/[id]/page.tsx`

### Child Pages
- Invoice detail page (nested)

### Detail Pages
- Invoice detail with full information, payments, line items

### Dialogs
- `InvoiceForm.tsx` - Create/edit invoice
- `PaymentForm.tsx` - Record payment
- `ExpenseForm.tsx` - Create/edit expense
- `VendorForm.tsx` - Create/edit vendor
- `BankAccountForm.tsx` - Create/edit bank account
- Various view drawers for each entity

### Tables
- Invoices table
- Payments table
- Expenses table
- Vendors table
- Bank accounts table
- Receivables table
- Payables table
- Transactions table

### Components
- `InvoiceViewDrawer.tsx` - Invoice side drawer
- `PaymentViewDrawer.tsx` - Payment side drawer
- `ExpenseViewDrawer.tsx` - Expense side drawer
- `VendorViewDrawer.tsx` - Vendor side drawer
- `BankAccountViewDrawer.tsx` - Bank account side drawer
- `ReceivableViewDrawer.tsx` - Receivables side drawer
- `PayableViewDrawer.tsx` - Payables side drawer
- `FinanceRowActions.tsx` - Row action menu
- `IncomeForm.tsx` - Income recording form

### Features
- **Dashboard Tab:** Financial overview with KPIs, charts, recent activities
- **Invoices Tab:** Invoice creation, management, sending, tracking
- **Payments Tab:** Payment recording, tracking, reconciliation
- **Expenses Tab:** Expense creation, approval workflow, tracking
- **Receivables Tab:** Customer aging analysis, collection tracking
- **Payables Tab:** Vendor aging analysis, payment scheduling
- **Vendors Tab:** Vendor management, performance tracking
- **Bank Accounts Tab:** Bank account management, balance tracking
- GST calculation and tracking
- Multi-currency support
- Payment method management
- Expense category management
- Vendor performance rating
- Credit limit management
- Project finance tracking
- Budget tracking
- Revenue pipeline tracking

### Business Workflows
1. **Invoice Creation:** Create invoice from Quotation/Project/Manual
2. **Invoice Management:** Send, track, follow up on invoices
3. **Payment Recording:** Record customer payments, reconcile with invoices
4. **Expense Management:** Create expenses, approve, pay vendors
5. **Vendor Management:** Manage vendor relationships, track performance
6. **Bank Management:** Manage bank accounts, track balances
7. **Receivables Management:** Track aging, prioritize collections
8. **Payables Management:** Track aging, schedule payments

### Navigation Links
- Sidebar: Finance
- Links from Customers, Projects, Documents
- Links to Accounting (for statutory reporting)

### Dependencies
- **External Modules:** Customers, Projects, Documents, Accounting
- **Shared Components:** DataTable, KPICard, Dialog, Badge, Tabs
- **Hooks:** useInvoices, usePayments, useExpenses, useVendors, useBankAccounts, useTransactions
- **Services:** Finance service API
- **Types:** Finance types (PaymentMethod, InvoiceStatus, PaymentStatus, ExpenseStatus, etc.)

### Architecture Note
Finance is the **central financial control system**. It connects Customers, Projects, Inventory, Vendors, and GST. Accounting module uses Finance data for statutory reporting.

---

## Module 8: Accounting

### Purpose
Statutory accounting and financial reporting - chart of accounts, journal entries, ledger, GST reporting, trial balance, profit & loss, balance sheet.

### Entry Points
- **Route:** `/dashboard/accounting`
- **Navigation:** Sidebar → Accounting (Calculator icon)
- **Roles:** Owner, Admin

### Pages
- **Main Page:** `/dashboard/accounting/page.tsx` (64,207 bytes - multi-tab)

### Child Pages
- None (all functionality in tabs)

### Detail Pages
- Account detail drawer
- Journal entry detail drawer

### Dialogs
- Account create/edit dialog (inline)
- Journal entry create/edit dialog (inline)

### Tables
- Chart of accounts table
- Journal entries table
- Ledger table
- Trial balance table
- GST summary table

### Components
- Uses shared EntityViewDrawer components
- Entity row actions menu
- KPI cards for dashboard

### Features
- **Dashboard Tab:** Accounting overview with KPIs, consistency checks
- **Chart of Accounts Tab:** Account management, account types, categories
- **Journal Entries Tab:** Manual journal entry creation, posting, reversal
- **Ledger Tab:** General ledger view with all transactions
- **GST Center Tab:** GST summary, input/output tax tracking, filing status
- **Trial Balance Tab:** Trial balance generation, debit/credit verification
- **Profit & Loss Tab:** P&L statement generation
- **Balance Sheet Tab:** Balance sheet generation
- Account type management (Asset, Liability, Equity, Revenue, Expense)
- Journal entry workflow (Draft → Posted → Reversed)
- GST liability calculation
- Trial balance health checks
- Balance sheet verification
- Consistency checks between modules

### Business Workflows
1. **Account Setup:** Create chart of accounts, define account types
2. **Journal Entry:** Create manual journal entries for adjustments
3. **Transaction Posting:** Auto-post from Finance module (invoices, payments, expenses)
4. **Reporting Generation:** Generate trial balance, P&L, balance sheet
5. **GST Filing:** Track GST liability, filing status
6. **Period Closing:** Close accounting periods

### Navigation Links
- Sidebar: Accounting
- Links from Finance (data source)

### Dependencies
- **External Modules:** Finance (primary data source)
- **Shared Components:** DataTable, KPICard, Dialog, Badge, Tabs, EntityViewDrawer
- **Hooks:** useInvoices, usePayments, useExpenses, useBankAccounts, useTransactions (from Finance)
- **Services:** Accounting utilities (derived data calculation)
- **Types:** Accounting types (AccountType, AccountingAccount, AccountingJournalEntry)

### Architecture Note
Accounting is a **read-only reporting layer** that derives data from Finance module. It does not create financial transactions - Finance does. Accounting provides statutory reports and ensures accounting accuracy through consistency checks.

---

## Module 9: Task Management

### Purpose
Task assignment, tracking, verification, and salary adjustment management for employees.

### Entry Points
- **Route:** `/dashboard/task-management`
- **Navigation:** Sidebar → Task Management (CheckSquare icon)
- **Roles:** Owner, Admin, Employee

### Pages
- **Main Page:** `/dashboard/task-management/page.tsx` (44,818 bytes - multi-tab)

### Child Pages
- None (all functionality in tabs)

### Detail Pages
- Task detail dialog with activity history

### Dialogs
- Task create/edit dialog
- Task completion dialog (with photo proof)
- Task verification dialog
- Salary adjustment create dialog
- Activity history dialog

### Tables
- Tasks table
- Employee performance table
- Salary adjustments table

### Components
- `TaskRowActions.tsx` - Row action menu

### Features
- **Tasks Tab:** Task creation, assignment, tracking, completion, verification
- **Performance Tab:** Employee performance metrics, task completion rates, earnings
- **Salary Tab:** Salary adjustment creation, approval, processing
- Task assignment to employees
- Priority management (Low, Medium, High, Critical)
- Status workflow (Created → Assigned → In Progress → Completed → Verified → Closed)
- Photo proof requirement for task completion
- Manager verification workflow
- Incentive value tracking
- Linked module support (link tasks to Projects, Customers, etc.)
- Activity history tracking
- Employee performance scoring
- Salary adjustment types (Credit, Deduction, Advance, Bonus, Penalty)
- Salary adjustment approval workflow
- Notification system for task assignment/completion/verification

### Business Workflows
1. **Task Creation:** Create task, assign to employee, set priority and due date
2. **Task Assignment:** Employee receives notification, accepts task
3. **Task Execution:** Employee works on task, updates status
4. **Task Completion:** Employee marks complete, uploads photo proof
5. **Task Verification:** Manager verifies work, approves/rejects
6. **Salary Processing:** Calculate incentives, process salary adjustments

### Navigation Links
- Sidebar: Task Management
- Links from Projects (for project-specific tasks)

### Dependencies
- **External Modules:** Projects (for linked tasks)
- **Shared Components:** DataTable, KPICard, Dialog, Badge, Tabs
- **Hooks:** useTasks, useTaskStats, useCreateTask, useUpdateTask, useDeleteTask, useCompleteTask, useVerifyTask, useEmployeePerformance, useSalaryAdjustments
- **Services:** Task management service API
- **Types:** Task types (TaskStatus, TaskPriority, LinkedModule, SalaryAdjustment)

---

## Module 10: Dashboard

### Purpose
Main dashboard with overview charts, KPIs, and analytics for all modules.

### Entry Points
- **Route:** `/dashboard`
- **Navigation:** Sidebar → Dashboard (LayoutDashboard icon)
- **Roles:** Owner, Admin, Employee

### Pages
- **Main Page:** `/dashboard/page.tsx` (31,004 bytes)

### Child Pages
- None

### Detail Pages
- None (dashboard is overview only)

### Dialogs
- None

### Tables
- Various summary tables embedded in dashboard

### Components
- Located in `/src/features/dashboard/`
- Charts: `charts/` (7 chart components)
- Components: `components/` (3 dashboard components)
- Tables: `tables/` (3 table components)
- Widgets: `widgets/` (3 widget components)
- Data: `data/` (mock data)
- Services: `services/` (15 service files)
- Types: `types/` (2 type files)
- Hooks: `hooks/` (2 hooks)

### Features
- Overall system overview
- Module-specific KPIs
- Revenue charts
- Project status charts
- Lead conversion charts
- Inventory status charts
- Financial summaries
- Recent activities feed
- Performance metrics

### Business Workflows
1. **Dashboard View:** User logs in, sees overall system status
2. **Drill-down:** User clicks on KPI/card to navigate to specific module

### Navigation Links
- Sidebar: Dashboard (first item)
- Links to all modules via drill-down

### Dependencies
- **External Modules:** All modules (aggregates data from all)
- **Shared Components:** Charts, KPICards, Tables
- **Hooks:** Various data fetching hooks
- **Services:** Dashboard aggregation services
- **Types:** Dashboard types

---

## Module 11: Settings

### Purpose
System configuration - company settings, branches, users, roles, permissions, modules, preferences, security.

### Entry Points
- **Route:** `/settings`
- **Navigation:** Sidebar → Settings (Settings icon)
- **Roles:** Owner, Admin

### Pages
- **Main Page:** `/settings/page.tsx` (172 bytes - wrapper)
- **Company:** `/settings/company/page.tsx`
- **Branches:** `/settings/branches/page.tsx`
- **Users/Roles:** `/settings/users/page.tsx`
- **Permissions:** `/settings/permissions/page.tsx`
- **Modules:** `/settings/modules/page.tsx`
- **Preferences:** `/settings/preferences/page.tsx`

### Child Pages
- 6 sub-pages for different settings areas

### Detail Pages
- None (settings are forms/pages)

### Dialogs
- Various create/edit dialogs embedded in pages

### Tables
- Users table
- Roles table
- Permissions table
- Modules table
- Branches table

### Components
- Located in `/src/features/settings/pages/`
- `SettingsDashboard.tsx` - Settings overview
- `CompanyManagement.tsx` - Company settings
- `BranchManagement.tsx` - Branch management
- `UsersRoles.tsx` - User and role management
- `PermissionEngine.tsx` - Permission configuration
- `ModuleManagement.tsx` - Module enable/disable
- `SystemPreferences.tsx` - System preferences
- `SecuritySettings.tsx` - Security configuration
- `ProjectConfiguration.tsx` - Project-specific settings
- `FinanceConfiguration.tsx` - Finance-specific settings
- `DocumentEngineSettings.tsx` - Document engine settings

### Features
- Company profile management
- Multi-branch support
- User management
- Role management
- Permission engine (granular permissions)
- Module management (enable/disable modules per role)
- System preferences
- Security settings
- Project configuration
- Finance configuration
- Document engine configuration
- Custom field definitions per module

### Business Workflows
1. **Company Setup:** Configure company profile, GST details, address
2. **Branch Setup:** Add branches, assign managers
3. **User Management:** Create users, assign roles
4. **Role Management:** Define roles, assign permissions
5. **Module Configuration:** Enable/disable modules per role
6. **Custom Fields:** Define custom fields for each module

### Navigation Links
- Sidebar: Settings
- Links from all modules (for configuration)

### Dependencies
- **External Modules:** All modules (configures all)
- **Shared Components:** Forms, Tables, Dialogs
- **Hooks:** useSettings, useModules, useUsers, useRoles
- **Services:** Settings service API
- **Types:** Settings types

---

## Module 12: Super Admin

### Purpose
Multi-tenant administration - company management, subscription management, system-wide monitoring.

### Entry Points
- **Route:** `/super-admin`
- **Navigation:** Separate Super Admin sidebar
- **Roles:** Super Admin only

### Pages
- **Main Page:** `/super-admin/page.tsx` (28,307 bytes)
- **Companies:** `/super-admin/companies/page.tsx`
- **Users:** `/super-admin/users/page.tsx`
- **Subscriptions:** `/super-admin/subscriptions/page.tsx`
- **Audit Logs:** `/super-admin/audit-logs/page.tsx`
- **Backup:** `/super-admin/backup/page.tsx`
- **Settings:** `/super-admin/settings/page.tsx`

### Child Pages
- 6 sub-pages for different admin functions

### Detail Pages
- Company detail dialog
- User detail dialog

### Dialogs
- `AdminDetailDialog.tsx` - Entity detail view

### Tables
- Companies table
- Users table
- Subscriptions table
- Audit logs table

### Components
- Located in `/src/features/super-admin/components/`
- `SuperAdminSidebar.tsx` - Super Admin navigation
- `AdminTable.tsx` - Generic admin table
- `AdminKPICard.tsx` - KPI card
- `AnalyticsCharts.tsx` - Analytics charts
- `CompanyMonitoring.tsx` - Company monitoring
- `EmployeeMonitoring.tsx` - Employee monitoring
- `LiveActivityFeed.tsx` - Live activity feed
- `SystemAlerts.tsx` - System alerts
- `ThemeToggle.tsx` - Theme toggle

### Features
- Multi-tenant company management
- Subscription management
- User management across all companies
- Audit logging
- System backup
- System-wide monitoring
- Analytics across all tenants
- Live activity feed
- System alerts
- Theme management

### Business Workflows
1. **Company Onboarding:** Create new company tenant
2. **Subscription Management:** Manage subscriptions, billing
3. **User Administration:** Manage users across all companies
4. **System Monitoring:** Monitor system health, performance
5. **Audit Review:** Review audit logs for compliance
6. **Backup Management:** Schedule and restore backups

### Navigation Links
- Separate Super Admin sidebar
- No links to regular modules (separate admin interface)

### Dependencies
- **External Modules:** None (system-level)
- **Shared Components:** Tables, Charts, KPICards
- **Hooks:** Super Admin specific hooks
- **Services:** Super Admin service API
- **Types:** Super Admin types

---

## Route Configuration

All routes are centralized in `/src/core/routes/index.ts`:

```typescript
export const ROUTES = {
  // Auth
  login: '/login',
  
  // Dashboard
  dashboard: '/dashboard',
  
  // Modules
  leads: '/dashboard/leads',
  customers: '/dashboard/customers',
  items: '/dashboard/item',           // Canonical Item Master
  itemMaster: '/dashboard/item-master', // Legacy redirect
  projects: '/dashboard/projects',
  inventory: '/dashboard/inventory',
  finance: '/dashboard/finance',
  accounting: '/dashboard/accounting',
  documents: '/dashboard/documents',
  taskManagement: '/dashboard/task-management',
  
  // Settings
  settings: '/settings',
  // ... various settings sub-routes
  
  // Super Admin
  superAdmin: '/super-admin',
  // ... various super-admin sub-routes
}
```

---

## Navigation Configuration

Navigation items are configured in `/src/features/settings/hooks/useNavigationItems.ts`:

```typescript
const MODULE_NAV_MAP: Record<ModuleName, { href: string; icon: LucideIcon; title?: string; roles: NavigationItem['roles'] }> = {
  leads: { href: '/dashboard/leads', icon: Users, roles: ['owner', 'admin', 'employee'] },
  customers: { href: '/dashboard/customers', icon: Building, roles: ['owner', 'admin', 'employee'] },
  items: { href: '/dashboard/item', icon: ItemMasterIcon, title: 'Item', roles: ['owner', 'admin', 'employee'] },
  projects: { href: '/dashboard/projects', icon: FolderKanban, roles: ['owner', 'admin', 'employee'] },
  inventory: { href: '/dashboard/inventory', icon: Package, roles: ['owner', 'admin'] },
  finance: { href: '/dashboard/finance', icon: DollarSign, roles: ['owner', 'admin'] },
  accounting: { href: '/dashboard/accounting', icon: Calculator, roles: ['owner', 'admin'] },
  documents: { href: '/dashboard/documents', icon: FileText, roles: ['owner', 'admin', 'employee'] },
  // ... additional modules
}
```

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total Modules | 12 |
| Total Pages | 30+ |
| Total Components | 100+ |
| Total Dialogs | 40+ |
| Total Tables | 25+ |
| Total Hooks | 30+ |
| Total Services | 25+ |
| Total Type Definitions | 50+ |

---

## Module Dependency Graph

```
Dashboard (aggregates from all)
    ↓
├── Leads
│   └── → Customers
│       └── → Projects
│           ├── → Documents
│           │   └── → Finance
│           ├── → Inventory
│           │   └── → Item Master
│           └── → Task Management
│
├── Customers
│   ├── → Projects
│   ├── → Documents
│   └── → Finance
│
├── Projects
│   ├── → Documents
│   ├── → Inventory
│   ├── → Finance
│   └── → Task Management
│
├── Documents
│   ├── → Item Master
│   └── → Finance
│
├── Inventory
│   └── → Item Master
│
├── Finance
│   └── → Accounting (read-only)
│
├── Settings (configures all)
│
└── Super Admin (system-level)
```

---

## Key Architectural Decisions

1. **Item Master vs Inventory:** Clear separation - Item Master is product catalog, Inventory is stock management
2. **Finance vs Accounting:** Finance is operational transactions, Accounting is statutory reporting
3. **Leads vs Customers:** Leads are prospects, Customers are converted entities
4. **Module-based Architecture:** Each module is self-contained with its own components, hooks, services, types
5. **Centralized Routes:** All routes defined in one location for consistency
6. **Dynamic Navigation:** Navigation items driven by module configuration in Settings
7. **Custom Field Support:** All major modules support settings-driven custom fields
8. **Activity Timeline:** All major modules have activity tracking
9. **Role-based Access:** Navigation and features filtered by user role
10. **Multi-tenant Support:** Super Admin module for multi-tenant management

---

## Conclusion

The PEB CRM frontend is well-architected with clear separation of concerns. Each module has a distinct business purpose with minimal overlap. The architecture supports:

- Clear module boundaries
- Reusable components
- Centralized routing
- Dynamic navigation
- Role-based access control
- Custom field extensibility
- Activity tracking
- Multi-tenant capability

The next phase of this audit will identify any duplicate functionality and assess consolidation opportunities.
