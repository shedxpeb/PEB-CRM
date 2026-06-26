# PEB CRM - Module Comparison Report

**Generated:** June 26, 2026  
**Scope:** Frontend Application Architecture Audit  
**Purpose:** Compare modules with overlapping functionality to identify consolidation opportunities.

---

## Executive Summary

After comprehensive analysis of all 12 modules, **3 potential consolidation opportunities** have been identified:

1. **Item Master vs Inventory** - Route duplication and navigation confusion
2. **Finance vs Accounting** - Navigation duplication (architecturally separate but confusing sidebar presentation)
3. **Legacy Route Cleanup** - `/dashboard/item-master` redirect to `/dashboard/item`

**Critical Finding:** The architecture already has clear separation of concerns. The issues are primarily **navigation/presentation layer problems**, not functional duplication.

---

## Comparison 1: Item Master vs Inventory

### Module A: Item Master
- **Purpose:** Product catalog - single source of truth for product definitions
- **Route:** `/dashboard/item` (canonical)
- **Legacy Route:** `/dashboard/item-master` (redirects to canonical)
- **Navigation Label:** "Item"
- **Icon:** Package icon
- **Roles:** Owner, Admin, Employee

### Module B: Inventory
- **Purpose:** Stock management - tracks operational stock levels and movements
- **Route:** `/dashboard/inventory`
- **Navigation Label:** "Inventory"
- **Icon:** Package icon
- **Roles:** Owner, Admin

### Shared Features

| Feature | Item Master | Inventory |
|---------|-------------|-----------|
| Package icon in navigation | ✅ | ✅ |
| Item code field | ✅ | ✅ |
| Item name field | ✅ | ✅ |
| Category field | ✅ | ✅ |
| Brand field | ✅ | ✅ |
| Unit field | ✅ | ✅ |
| Status field | ✅ | ✅ |
| Custom field support | ✅ | ✅ |
| Data table view | ✅ | ✅ |
| Create/Edit dialogs | ✅ | ✅ |
| View drawer | ✅ | ✅ |
| Row actions | ✅ | ✅ |
| Activity timeline | ✅ | ✅ |
| Export functionality | ✅ | ✅ |
| KPI cards | ✅ | ✅ |
| Filtering | ✅ | ✅ |
| Search | ✅ | ✅ |

### Unique Features - Item Master

| Feature | Description |
|---------|-------------|
| SKU field | Unique stock keeping unit |
| Sub-category field | Hierarchical categorization |
| Category ID reference | Foreign key to category master |
| Item type ID reference | Foreign key to item type |
| Grade field | Material grade specification |
| Specification field | Technical specification |
| HSN code field | GST HSN classification |
| Weight field | Item weight |
| Default rate field | Default selling price |
| GST rate field | GST percentage |
| Technical description | Detailed technical specs |
| Datasheet URL | Link to technical datasheet |
| Product image URL | Product image |
| Tags field | Searchable tags |
| Manufacturer field | Manufacturer name |
| Country of origin | Manufacturing country |
| Standard dimensions | Length, width, height, thickness, diameter |
| Currency field | Multi-currency support |
| Images array | Multiple product images |
| Preferred supplier ID | Default supplier reference |
| Preferred supplier name | Default supplier name |
| Inventory item ID reference | Link to inventory stock record |
| Item variants support | Product variants (e.g., different thicknesses) |
| Item bundles support | Pre-configured product bundles |
| PEB classification fields | Structural, Cladding, Accessory, Service flags |
| Tax type field | CGST_SGST, IGST, Exempt |
| Material grade field | Material grade specification |
| Thickness field | Specific thickness |
| Length field | Specific length |
| Width field | Specific width |
| Category selector component | Hierarchical category selection |
| Category filter component | Category-based filtering |
| Item suggestion component | Autocomplete item selection |
| Item master selector component | Dropdown item selection |
| Category hierarchy data | Multi-level category structure |
| Item status types | Active, Inactive, Discontinued |
| Unit types | KG, MT, PCS, NOS, SQM, SQFT, M, FT, LTR, SET, BUNDLE |
| Tax types | CGST_SGST, IGST, Exempt |
| Item type classes | Structural, Cladding, Accessory, Service, Other |
| Item variant types | Variant-specific properties |
| Bundle item types | Bundle composition |
| Item master stats | Total items, active items, variants, bundles |
| Item master filters | Category, brand, status, item type, tax type, unit, search, tags, HSN |

### Unique Features - Inventory

| Feature | Description |
|---------|-------------|
| Item master ID reference | Foreign key to Item Master |
| Current stock field | Current stock quantity |
| Reserved stock field | Stock reserved for projects |
| Issued stock field | Stock issued to projects |
| Available stock field | Calculated available quantity |
| Total value field | Stock value calculation |
| Minimum stock field | Reorder threshold |
| Reorder level field | Reorder trigger point |
| Safety stock field | Buffer stock quantity |
| Warehouse ID field | Foreign key to warehouse |
| Warehouse name field | Warehouse name |
| Bin location field | Physical storage location |
| Reorder quantity field | Standard reorder quantity |
| Incoming stock field | Stock on order |
| Outgoing stock field | Stock allocated for issue |
| Purchase rate field | Purchase cost rate |
| Stock status types | In Stock, Low Stock, Out of Stock, Critical, On Order, Discontinued |
| Movement type types | Stock In, Stock Out, Transfer, Adjustment, Reservation, Release, Consumption |
| Unit types | Kg, Ton, Meter, SqMeter, CuMeter, Nos, Box, Bundle, Set, Liter, Bag, Roll |
| Item type classes | Structural, Cladding, Accessory, Service, Other |
| Stock movement tracking | All stock transactions logged |
| Warehouse management | Multiple warehouse support |
| Supplier management | Vendor/supplier master |
| Category management | Inventory-specific categories |
| Stock alerts | Low stock, out of stock, reorder required, critical |
| Project stock allocation | Track stock allocated to projects |
| Stock movement form | Record stock movements |
| Category form | Manage inventory categories |
| Supplier form | Manage suppliers |
| Warehouse form | Manage warehouses |
| Inventory activity timeline | Stock activity tracking |
| Inventory custom fields | Inventory-specific custom fields |
| Inventory filters | Warehouse, stock status, unit, category, brand, item type, low stock, reorder required |
| Inventory stats | Total items, total value, low stock items, out of stock items, incoming stock, outgoing stock, reserved stock, active suppliers, pending purchase requests, material shortages |
| Stock movement types | All movement types with tracking |
| Project stock allocation types | Reserved, Issued, Balance quantities |
| Inventory alert types | Low Stock, Out of Stock, Reorder Required, Critical Stock |
| Inventory activity types | Item created, updated, stock in/out, transfer, adjustment, reservation, release, reorder triggered, status changed, warehouse changed, consumption |

### Navigation Differences

| Aspect | Item Master | Inventory |
|--------|-------------|-----------|
| Sidebar label | "Item" | "Inventory" |
| Icon | Package | Package (same icon) |
| Route | `/dashboard/item` | `/dashboard/inventory` |
| Legacy route | `/dashboard/item-master` (redirect) | None |
| Access roles | Owner, Admin, Employee | Owner, Admin only |
| Position in sidebar | After Customers | After Projects |
| Navigation source | MODULE_NAV_MAP['items'] | MODULE_NAV_MAP['inventory'] |

### Component Differences

| Component Type | Item Master | Inventory |
|---------------|-------------|-----------|
| Form | ItemForm.tsx | InventoryItemForm.tsx |
| View Drawer | ItemViewDrawer.tsx | InventoryViewDrawer.tsx |
| Row Actions | ItemRowActions.tsx | InventoryRowActions.tsx |
| Custom Fields | ItemCustomFields.tsx | InventoryCustomFields.tsx |
| Selector | ItemMasterSelector.tsx | None |
| Suggestion | ItemSuggestion.tsx | None |
| Category Filter | CategoryFilter.tsx | None |
| Category Selector | CategorySelector.tsx | None |
| Stock Movement Form | None | StockMovementForm.tsx |
| Category Form | None | CategoryForm.tsx |
| Supplier Form | None | SupplierForm.tsx |
| Warehouse Form | None | WarehouseForm.tsx |
| Activity Timeline | None | InventoryActivityTimeline.tsx |

### Data Differences

| Field Category | Item Master | Inventory |
|----------------|-------------|-----------|
| **Product Metadata** | Brand, Grade, Spec, HSN, Dimensions, Weight, Technical Files, Default Pricing | None (read-only reference from Item Master) |
| **Stock Data** | None (reference only) | Current Stock, Reserved, Issued, Available, Total Value |
| **Stock Rules** | None | Minimum Stock, Reorder Level, Safety Stock |
| **Warehouse Data** | None | Warehouse ID, Warehouse Name, Bin Location |
| **Stock Movement** | None | Incoming Stock, Outgoing Stock, Purchase Rate |
| **Variants/Bundles** | Full support | None |
| **PEB Classification** | Structural, Cladding, Accessory, Service flags | Read-only reference |
| **Tax Data** | GST Rate, Tax Type | None |
| **Supplier Data** | Preferred Supplier ID | Full supplier management |
| **Warehouse Management** | None | Full warehouse management |
| **Stock Movement Tracking** | None | Full movement history |
| **Project Allocation** | None | Project stock allocation tracking |
| **Stock Alerts** | None | Alert generation and tracking |

### Workflow Differences

| Workflow | Item Master | Inventory |
|----------|-------------|-----------|
| **Product Definition** | Create product with full specifications | N/A |
| **Product Variant Management** | Create/manage variants | N/A |
| **Product Bundle Management** | Create/manage bundles | N/A |
| **Category Management** | Manage product categories | Manage inventory categories |
| **Stock Entry** | N/A | Create inventory entry linked to Item Master |
| **Stock Movement** | N/A | Record stock in/out/transfers |
| **Stock Monitoring** | N/A | Track stock levels, generate alerts |
| **Stock Allocation** | N/A | Reserve stock for projects |
| **Stock Replenishment** | N/A | Trigger reorders based on levels |
| **Supplier Management** | Preferred supplier assignment only | Full supplier management |
| **Warehouse Management** | N/A | Full warehouse management |

### Dependency Analysis

| Dependency | Item Master | Inventory |
|------------|-------------|-----------|
| **Depends on** | Settings (custom fields) | Item Master (product catalog), Settings (custom fields) |
| **Used by** | Inventory, Documents, Projects | Projects, Finance |
| **Data Flow** | Provides product definitions | Consumes product definitions, provides stock data |
| **Reference Type** | Master data (source of truth) | Transactional data (stock operations) |

---

## Comparison 2: Finance vs Accounting

### Module A: Finance
- **Purpose:** Operational financial transactions - invoices, payments, expenses, vendors, bank accounts
- **Route:** `/dashboard/finance`
- **Navigation Label:** "Finance"
- **Icon:** DollarSign icon
- **Roles:** Owner, Admin

### Module B: Accounting
- **Purpose:** Statutory accounting and financial reporting - chart of accounts, journal entries, ledger, GST reports
- **Route:** `/dashboard/accounting`
- **Navigation Label:** "Accounting"
- **Icon:** Calculator icon
- **Roles:** Owner, Admin

### Shared Features

| Feature | Finance | Accounting |
|---------|---------|------------|
| Access roles | Owner, Admin | Owner, Admin |
| Data table views | ✅ | ✅ |
| Create/Edit dialogs | ✅ | ✅ |
| View drawers | ✅ | ✅ |
| Row actions | ✅ | ✅ |
| KPI cards | ✅ | ✅ |
| Filtering | ✅ | ✅ |
| Search | ✅ | ✅ |
| Export functionality | ✅ | ✅ |
| Multi-tab interface | ✅ | ✅ |
| Dashboard tab | ✅ | ✅ |
| GST tracking | ✅ | ✅ |
| Transaction data | ✅ (creates) | ✅ (consumes) |
| Invoice data | ✅ (creates) | ✅ (consumes) |
| Payment data | ✅ (creates) | ✅ (consumes) |
| Expense data | ✅ (creates) | ✅ (consumes) |
| Bank account data | ✅ (creates) | ✅ (consumes) |
| Vendor data | ✅ (creates) | ✅ (consumes) |
| Derived data calculations | ✅ | ✅ |
| Consistency checks | ✅ | ✅ |

### Unique Features - Finance

| Feature | Description |
|---------|-------------|
| **Dashboard Tab** | Financial overview with KPIs, charts, recent activities |
| **Invoices Tab** | Invoice creation, management, sending, tracking |
| **Payments Tab** | Payment recording, tracking, reconciliation |
| **Expenses Tab** | Expense creation, approval workflow, tracking |
| **Receivables Tab** | Customer aging analysis, collection tracking |
| **Payables Tab** | Vendor aging analysis, payment scheduling |
| **Vendors Tab** | Vendor management, performance tracking |
| **Bank Accounts Tab** | Bank account management, balance tracking |
| Invoice creation | Create invoice from Quotation/Project/Manual |
| Invoice sending | Send invoice via email/SMS |
| Invoice tracking | Track invoice status, due dates |
| Payment recording | Record customer payments |
| Payment reconciliation | Match payments to invoices |
| Expense creation | Create expense entries |
| Expense approval workflow | Multi-level approval process |
| Expense rejection | Reject expenses with reason |
| Vendor creation | Add new vendors |
| Vendor performance tracking | Track vendor ratings |
| Credit limit management | Set vendor credit limits |
| Bank account creation | Add bank accounts |
| Bank balance tracking | Track account balances |
| Receivables aging | Calculate aging buckets |
| Payables aging | Calculate aging buckets |
| Collection prioritization | Prioritize overdue receivables |
| Payment scheduling | Schedule vendor payments |
| GST calculation | Calculate CGST, SGST, IGST, CESS |
| Multi-currency support | Handle multiple currencies |
| Payment method management | Manage payment methods |
| Expense category management | Manage expense categories |
| Income category management | Manage income categories |
| Project finance tracking | Track project-specific finances |
| Budget tracking | Track budget vs actual |
| Revenue pipeline tracking | Track quotation-to-conversion pipeline |
| Top customers analysis | Identify top revenue customers |
| Top vendors analysis | Identify top purchase vendors |
| Monthly collections | Track monthly payment trends |
| Cash position health | Assess cash position health |
| Finance activity tracking | Track all finance activities |
| Derived invoice data | Calculate pending amounts, aging |
| Derived vendor data | Calculate outstanding balances |
| Derived bank account data | Calculate account summaries |
| Derived finance metrics | Calculate overall financial metrics |
| Derived monthly collections | Track monthly collection trends |
| Derived recent activities | Show recent finance activities |
| Invoice form | Invoice creation/editing form |
| Payment form | Payment recording form |
| Expense form | Expense creation/editing form |
| Vendor form | Vendor creation/editing form |
| Bank account form | Bank account creation/editing form |
| Income form | Income recording form |
| Invoice view drawer | Invoice detail view |
| Payment view drawer | Payment detail view |
| Expense view drawer | Expense detail view |
| Vendor view drawer | Vendor detail view |
| Bank account view drawer | Bank account detail view |
| Receivables view drawer | Receivables detail view |
| Payables view drawer | Payables detail view |
| Finance row actions | Row action menu |
| Invoice status types | Draft, Sent, Viewed, Partially Paid, Paid, Overdue, Cancelled |
| Payment status types | Pending, Processing, Completed, Failed, Refunded, Cancelled |
| Expense status types | Pending, Approved, Rejected, Paid, Cancelled |
| Payment method types | Bank Transfer, UPI, Cash, Cheque, RTGS, NEFT, IMPS, Credit Card, Debit Card |
| Income category types | Project Revenue, Advance Payment, Stage Payment, Partial Payment, Final Payment, Miscellaneous Income |
| Expense category types | Material Purchase, Labour Cost, Transport, Machinery, Fabrication, Installation, Site Expenses, Administrative Expenses, Miscellaneous Expenses |
| GST types | CGST, SGST, IGST, CESS |
| Aging buckets | 0-30 Days, 31-60 Days, 61-90 Days, 90+ Days |
| Financial health types | Healthy, At Risk, Critical |
| Finance activity types | 20+ activity types for tracking |
| Finance filters | Search, date range, customer, project, vendor, status, category, payment method |
| Finance stats | 20+ statistical metrics |

### Unique Features - Accounting

| Feature | Description |
|---------|-------------|
| **Dashboard Tab** | Accounting overview with KPIs, consistency checks |
| **Chart of Accounts Tab** | Account management, account types, categories |
| **Journal Entries Tab** | Manual journal entry creation, posting, reversal |
| **Ledger Tab** | General ledger view with all transactions |
| **GST Center Tab** | GST summary, input/output tax tracking, filing status |
| **Trial Balance Tab** | Trial balance generation, debit/credit verification |
| **Profit & Loss Tab** | P&L statement generation |
| **Balance Sheet Tab** | Balance sheet generation |
| Chart of accounts management | Create/manage accounting accounts |
| Account type management | Asset, Liability, Equity, Revenue, Expense |
| Account category management | Account categorization |
| System account creation | Auto-create accounts from bank accounts |
| Manual journal entry creation | Create adjusting entries |
| Journal entry posting | Post entries to ledger |
| Journal entry reversal | Reverse posted entries |
| General ledger view | View all ledger transactions |
| Ledger account filtering | Filter by account |
| GST summary generation | Calculate GST liability |
| Input GST tracking | Track input tax credit |
| Output GST tracking | Track output tax liability |
| GST filing status | Track filing status |
| Trial balance generation | Generate trial balance |
| Debit/credit verification | Verify balance |
| Trial balance health check | Check if balanced |
| Profit & Loss generation | Generate P&L statement |
| Revenue calculation | Calculate total revenue |
| Expense calculation | Calculate total expenses |
| Gross profit calculation | Calculate gross profit |
| Net profit calculation | Calculate net profit |
| Balance sheet generation | Generate balance sheet |
| Asset calculation | Calculate total assets |
| Liability calculation | Calculate total liabilities |
| Equity calculation | Calculate total equity |
| Balance sheet verification | Verify A = L + E |
| Consistency checks | Verify data integrity across modules |
| Net profit verification | Verify P&L calculation |
| Balance sheet verification | Verify balance sheet equation |
| GST verification | Verify GST calculations |
| Account configuration | Configure account types and groups |
| Journal entry workflow | Draft → Posted → Reversed |
| Accounting KPIs | Assets, Liabilities, Equity, Net Profit, Cash & Bank, Receivables, Payables, GST Payable |
| Trial balance rows | Account-wise debit/credit/balance |
| Ledger rows | Transaction-wise ledger entries |
| GST summary rows | Tax type-wise GST data |
| Profit & loss data | Revenue, expenses, gross profit, net profit |
| Balance sheet data | Assets, liabilities, equity breakdown |
| Accounting activity types | Account-related activities |
| Accounting filters | Account type, status, journal source, trial type |
| Account dialog mode | Create/edit account dialog |
| Journal entry dialog mode | Create/edit journal entry dialog |
| Account form | Account creation/editing form |
| Journal entry form | Journal entry creation/editing form |
| Entity view drawer | Shared drawer component |
| Entity row actions | Shared row action menu |
| Account types | Asset, Liability, Equity, Revenue, Expense |
| Account groups | System-defined account groups |
| Journal entry statuses | Draft, Posted, Reversed |
| Journal source types | Invoice, Payment, Expense, Manual |
| Derived journal entries | Auto-generated from finance transactions |
| Derived trial balance | Calculated from journal entries |
| Derived profit & loss | Calculated from trial balance |
| Derived balance sheet | Calculated from trial balance |
| Derived GST summary | Calculated from invoices and expenses |
| Derived accounting KPIs | Calculated from all accounting data |
| Cash and bank calculation | Sum of bank account balances |
| Receivables total calculation | Sum of pending invoice amounts |
| Payables total calculation | Sum of pending expense amounts |
| Total equity calculation | From balance sheet |
| Trial balance totals | Debit and credit totals |
| Trial balance difference | Difference between debit and credit |
| Trial balance health | Whether trial balance is balanced |
| GST summary totals | Output, input, payable totals, filing status |
| Net profit verification | Verify revenue - expenses = net profit |
| Balance sheet difference | Difference between assets and (liabilities + equity) |
| Balance sheet matches | Whether balance sheet balances |
| GST checks | Verify GST calculations |
| Accounting module configuration | Configure account types and groups |

### Navigation Differences

| Aspect | Finance | Accounting |
|--------|---------|------------|
| Sidebar label | "Finance" | "Accounting" |
| Icon | DollarSign | Calculator |
| Route | `/dashboard/finance` | `/dashboard/accounting` |
| Access roles | Owner, Admin | Owner, Admin |
| Position in sidebar | After Inventory | After Finance |
| Navigation source | MODULE_NAV_MAP['finance'] | MODULE_NAV_MAP['accounting'] |
| Tab count | 8 tabs | 8 tabs |

### Component Differences

| Component Type | Finance | Accounting |
|---------------|---------|------------|
| Forms | InvoiceForm, PaymentForm, ExpenseForm, VendorForm, BankAccountForm, IncomeForm | AccountForm, JournalEntryForm (inline) |
| View Drawers | InvoiceViewDrawer, PaymentViewDrawer, ExpenseViewDrawer, VendorViewDrawer, BankAccountViewDrawer, ReceivableViewDrawer, PayableViewDrawer | EntityViewDrawer (shared) |
| Row Actions | FinanceRowActions | EntityRowActions (shared) |
| Custom Fields | None (not implemented) | None (not implemented) |
| Activity Timeline | None (uses derived activities) | None (uses derived activities) |
| Tab Components | Custom tab implementations | Custom tab implementations |
| KPI Cards | Custom finance KPIs | Custom accounting KPIs |
| Charts | Custom finance charts | Custom accounting charts |

### Data Differences

| Field Category | Finance | Accounting |
|----------------|---------|------------|
| **Transaction Creation** | Creates invoices, payments, expenses | None (read-only) |
| **Master Data** | Manages vendors, bank accounts | Manages chart of accounts |
| **Operational Data** | Invoices, payments, expenses | Journal entries (derived + manual) |
| **Derived Data** | Receivables, payables, vendor summaries | Trial balance, P&L, balance sheet, GST summary |
| **Reporting Data** | Operational reports | Statutory reports |
| **GST Data** | GST calculation on invoices/expenses | GST summary and filing status |
| **Budget Data** | Project budgets, budget tracking | None |
| **Revenue Pipeline** | Quotation-to-invoice pipeline | None |
| **Aging Data** | Receivables aging, payables aging | None (uses finance aging) |
| **Cash Position** | Bank account balances | Cash & bank from trial balance |
| **Profit Data** | Project profit margins | Net profit from P&L |
| **Consistency Data** | Internal consistency checks | Cross-module consistency checks |

### Workflow Differences

| Workflow | Finance | Accounting |
|----------|---------|------------|
| **Invoice Creation** | Create invoice from Quotation/Project/Manual | N/A |
| **Invoice Management** | Send, track, follow up on invoices | N/A |
| **Payment Recording** | Record customer payments | N/A |
| **Payment Reconciliation** | Match payments to invoices | N/A |
| **Expense Management** | Create expenses, approve, pay vendors | N/A |
| **Vendor Management** | Manage vendor relationships | N/A |
| **Bank Management** | Manage bank accounts | N/A |
| **Receivables Management** | Track aging, prioritize collections | N/A |
| **Payables Management** | Track aging, schedule payments | N/A |
| **Account Setup** | N/A | Create chart of accounts |
| **Journal Entry** | N/A | Create manual journal entries |
| **Transaction Posting** | Auto-post to accounting | N/A (auto from finance) |
| **Reporting Generation** | Operational reports | Statutory reports |
| **GST Filing** | GST calculation | GST liability tracking, filing status |
| **Period Closing** | N/A | Close accounting periods |
| **Trial Balance** | N/A | Generate and verify trial balance |
| **P&L Generation** | N/A | Generate profit & loss statement |
| **Balance Sheet Generation** | N/A | Generate balance sheet |
| **Consistency Verification** | Internal checks | Cross-module verification |

### Dependency Analysis

| Dependency | Finance | Accounting |
|------------|---------|------------|
| **Depends on** | Customers, Projects, Documents, Item Master, Settings | Finance (primary data source), Settings |
| **Used by** | Accounting (consumes data) | None (reporting layer) |
| **Data Flow** | Creates financial transactions | Consumes financial transactions, generates reports |
| **Reference Type** | Transactional data (source of truth) | Reporting layer (derived data) |
| **Write Access** | Full CRUD on financial entities | Read-only on finance data, write on accounting entities (accounts, journal entries) |
| **Data Ownership** | Owns financial transaction data | Owns accounting structure (accounts, journal entries) |

---

## Comparison 3: Route Duplication - Item vs Item-Master

### Route A: `/dashboard/item`
- **Status:** Canonical route
- **Purpose:** Main Item Master page
- **Page:** `/dashboard/item/page.tsx` (16,175 bytes)
- **Navigation Label:** "Item"
- **Module:** Item Master

### Route B: `/dashboard/item-master`
- **Status:** Legacy redirect
- **Purpose:** Redirects to `/dashboard/item`
- **Page:** `/dashboard/item-master/page.tsx` (10 bytes)
- **Navigation Label:** Not in navigation
- **Module:** Item Master (redirect only)

### Shared Features

| Feature | `/dashboard/item` | `/dashboard/item-master` |
|---------|------------------|------------------------|
| Module | Item Master | Item Master (redirect) |
| Purpose | Item Master page | Redirect to Item Master page |
| Data | Full Item Master data | N/A (redirects) |
| Components | Full Item Master components | N/A (redirects) |
| Features | Full Item Master features | N/A (redirects) |

### Unique Features - `/dashboard/item`

| Feature | Description |
|---------|-------------|
| Full page implementation | Complete Item Master page with all features |
| Data table | Item list with all columns |
| Create/Edit dialogs | Full form functionality |
| View drawer | Side drawer view |
| Row actions | Complete action menu |
| KPI cards | Item statistics |
| Filtering | All filter options |
| Search | Full search functionality |
| Export | CSV export |
| Custom fields | Custom field support |
| All Item Master features | Complete feature set |

### Unique Features - `/dashboard/item-master`

| Feature | Description |
|---------|-------------|
| Redirect only | 10-byte redirect file |
| No implementation | Just redirects to `/dashboard/item` |
| No data | N/A (redirects) |
| No components | N/A (redirects) |
| No features | N/A (redirects) |
| Legacy support | Maintained for backward compatibility |

### Navigation Differences

| Aspect | `/dashboard/item` | `/dashboard/item-master` |
|--------|------------------|------------------------|
| In navigation | ✅ (as "Item") | ❌ |
| Navigation label | "Item" | N/A |
| Route in ROUTES | ✅ (ROUTES.items) | ❌ |
| Legacy route reference | N/A | ✅ (commented in code) |
| Accessible via sidebar | ✅ | ❌ |
| Accessible via URL | ✅ | ✅ (redirects) |

### Component Differences

| Component Type | `/dashboard/item` | `/dashboard/item-master` |
|---------------|------------------|------------------------|
| Page implementation | Full page | Redirect only |
| Forms | ItemForm | None |
| View Drawer | ItemViewDrawer | None |
| Row Actions | ItemRowActions | None |
| Custom Fields | ItemCustomFields | None |
| Selectors | ItemMasterSelector, ItemSuggestion | None |
| Category Components | CategoryFilter, CategorySelector | None |
| Data Table | Full table | None |
| KPI Cards | Full KPIs | None |
| Filters | Full filters | None |
| Search | Full search | None |
| Export | Full export | None |

### Data Differences

| Data Category | `/dashboard/item` | `/dashboard/item-master` |
|----------------|------------------|------------------------|
| **Product Data** | Full Item Master data | N/A (redirects) |
| **Category Data** | Full category hierarchy | N/A (redirects) |
| **Variant Data** | Full variant support | N/A (redirects) |
| **Bundle Data** | Full bundle support | N/A (redirects) |
| **Custom Field Data** | Full custom field support | N/A (redirects) |
| **Stats Data** | Full statistics | N/A (redirects) |
| **Filter Data** | Full filter options | N/A (redirects) |

### Workflow Differences

| Workflow | `/dashboard/item` | `/dashboard/item-master` |
|----------|------------------|------------------------|
| **Item Creation** | ✅ | N/A (redirects) |
| **Item Management** | ✅ | N/A (redirects) |
| **Variant Management** | ✅ | N/A (redirects) |
| **Bundle Management** | ✅ | N/A (redirects) |
| **Category Management** | ✅ | N/A (redirects) |
| **View Item Details** | ✅ | N/A (redirects) |
| **Edit Item** | ✅ | N/A (redirects) |
| **Delete Item** | ✅ | N/A (redirects) |
| **Export Items** | ✅ | N/A (redirects) |
| **Search Items** | ✅ | N/A (redirects) |
| **Filter Items** | ✅ | N/A (redirects) |

### Dependency Analysis

| Dependency | `/dashboard/item` | `/dashboard/item-master` |
|------------|------------------|------------------------|
| **Depends on** | Settings, Inventory (reference) | None (redirects) |
| **Used by** | Inventory, Documents, Projects | None (redirects) |
| **Data Flow** | Provides product definitions | N/A (redirects) |
| **Reference Type** | Master data (source of truth) | N/A (redirects) |
| **Status** | Active canonical route | Legacy redirect (deprecated) |

---

## Summary of Key Findings

### Finding 1: Item Master vs Inventory
- **Architecture:** Already correctly separated (Item Master = product catalog, Inventory = stock management)
- **Issue:** Navigation confusion - both use Package icon, similar naming
- **Impact:** Users may confuse product catalog with stock management
- **Recommendation:** Keep separate, improve navigation clarity

### Finding 2: Finance vs Accounting
- **Architecture:** Already correctly separated (Finance = operational transactions, Accounting = statutory reporting)
- **Issue:** Navigation duplication - both appear as separate sidebar items
- **Impact:** Users may not understand the distinction between operational finance and statutory accounting
- **Recommendation:** Keep separate, consider nesting Accounting under Finance or clarifying navigation

### Finding 3: Route Duplication
- **Architecture:** Legacy redirect exists (`/dashboard/item-master` → `/dashboard/item`)
- **Issue:** Unnecessary route duplication
- **Impact:** Minimal (redirect works correctly)
- **Recommendation:** Remove legacy route after confirming no external dependencies

### Overall Assessment
The architecture is sound with clear separation of concerns. The issues are primarily **presentation/navigation layer problems**, not functional duplication. No modules should be merged - they serve distinct business purposes.

---

## Next Steps

1. **Navigation Clarity:** Improve sidebar labels and icons to distinguish modules better
2. **Route Cleanup:** Remove legacy `/dashboard/item-master` route
3. **User Education:** Add tooltips or help text to clarify module purposes
4. **Navigation Restructuring:** Consider nesting Accounting under Finance for better hierarchy
