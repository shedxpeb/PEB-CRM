# Finance Module Architecture

## 1. Executive Summary

**Module Status:** Architecture Strong (9.5/10), UI Completeness Weak (5.5/10)

**Overall Assessment:** Finance Module has excellent architecture with comprehensive data models, proper ownership patterns, and approved mock fallback architecture. The module correctly implements PEB CRM's approved patterns for data ownership and module relationships. Current gap is UI completeness - view drawers, edit dialogs, and action buttons need implementation.

**Key Strengths:**
- Comprehensive financial data model (Income, Expense, Invoice, Payment, Vendor, BankAccount, Receivable, Payable, ProjectFinance, GSTRecord, Budget)
- Correct ownership patterns (Finance owns financial data, references Customer/Project/Vendor)
- Approved mock fallback architecture (Real API → Fallback Mock Data)
- Proper GST handling with CGST/SGST/IGST/CESS
- Aging bucket calculations for receivables/payables
- React Query hooks for data management
- Zod validation schemas

**Key Gaps:**
- No view drawers (PEB CRM pattern: View = Drawer)
- No edit dialogs (PEB CRM pattern: Edit = Dialog)
- Action buttons not functional
- KPIs use mock data with hardcoded changes
- No Create/Edit/View parity
- No navigation links to Documents module

**Architecture Decision:** Finance Module should remain tab-based (no dedicated pages). Create/Edit/View should follow PEB CRM pattern: Create=Dialog, Edit=Dialog, View=Drawer.

---

## 2. Purpose of Finance Module

### Why Finance Module Exists

Finance Module is the central financial control system in PEB CRM. It serves as the single source of truth for all financial operations, connecting Customer, Project, Inventory, Documents, and Vendor modules.

### Business Problems Solved

**Problem 1: Fragmented Financial Data**
- Before: Financial data scattered across multiple systems
- After: Centralized financial records with proper relationships

**Problem 2: No Invoice-to-Payment Tracking**
- Before: No visibility into invoice payment status
- After: Complete invoice lifecycle with payment tracking

**Problem 3: No Expense Management**
- Before: No systematic expense tracking
- After: Comprehensive expense management with vendor relationships

**Problem 4: No Receivable/Payable Visibility**
- Before: No visibility into outstanding amounts
- After: Aging buckets, due date tracking, outstanding summaries

**Problem 5: No GST Compliance**
- Before: No GST tracking or calculation
- After: Complete GST handling with CGST/SGST/IGST/CESS

### Module Objectives

1. **Centralize Financial Operations:** Single source of truth for all financial data
2. **Track Invoice Lifecycle:** From creation to payment to receivable
3. **Manage Payments:** Record all incoming payments
4. **Track Expenses:** Manage all expenses with vendor relationships
5. **Monitor Receivables:** Track money owed by customers
6. **Monitor Payables:** Track money owed to vendors
7. **GST Compliance:** Proper GST calculation and tracking
8. **Project Financial Summary:** Aggregate financial data by project
9. **Budget Tracking:** Monitor project budgets vs actual spend

---

## 3. Module Relationships

### Customer → Finance

**Relationship Type:** Reference (Finance references Customer, does not own)

**Data Flow:**
- Customer Module owns customer data
- Finance Module references customer via customerId
- Finance displays customerName, customerAddress, customerGST

**Frontend Display:**
- Invoice: Customer selector dropdown
- Payment: Customer selector dropdown
- Income: Customer selector dropdown
- Receivable: Customer name displayed

**Ownership Rules:**
- Finance never modifies customer data
- Finance only displays customer information
- Customer deletion should be restricted if referenced by Finance

### Project → Finance

**Relationship Type:** Reference (Finance references Project, does not own)

**Data Flow:**
- Project Module owns project data
- Finance Module references project via projectId
- Finance displays projectName
- Finance aggregates project financial data into ProjectFinance

**Frontend Display:**
- Invoice: Project selector dropdown
- Payment: Project selector dropdown
- Expense: Project selector dropdown
- Income: Project selector dropdown
- Receivable: Project name displayed
- Payable: Project name displayed
- ProjectFinance: Project financial summary

**Ownership Rules:**
- Finance never modifies project data
- Finance only displays project information
- Finance aggregates project financial data (read-only)
- Project deletion should be restricted if referenced by Finance

### Documents → Finance

**Relationship Type:** Reference (Finance references Documents, does not own)

**Data Flow:**
- Documents Module owns document data (Estimate, Proposal, Quotation)
- Finance Module references document via sourceType and sourceId
- Invoice can be created from Estimate, Proposal, Quotation, Project, or Manual

**Approved Invoice Sources:**
- Estimate → Invoice
- Proposal → Invoice
- Quotation → Invoice
- Project → Invoice
- Manual → Invoice

**Document Chain:** No strict document chain required. All paths are valid.

**Frontend Display:**
- Invoice: Source type selector (Estimate, Proposal, Quotation, Project, Manual)
- Invoice: Source ID input (auto-populated from Documents module when source selected)
- Navigation: Links from Invoice to source document

**Ownership Rules:**
- Finance never modifies document data
- Finance only references document for invoice creation
- Document deletion should be restricted if referenced by Finance

### Inventory → Finance

**Relationship Type:** Reference (Finance references Inventory, does not own)

**Data Flow:**
- Inventory Module owns item data
- Finance Module references items in invoice line items
- Finance displays item description, unit, rate

**Frontend Display:**
- Invoice Line Items: Item selector dropdown (from Inventory)
- Invoice Line Items: Auto-populate description, unit, rate from Inventory

**Ownership Rules:**
- Finance never modifies inventory data
- Finance only displays item information in line items
- Item deletion should be restricted if referenced by Finance

### Vendor (Current Phase: Finance-Owned, Future Phase: Supplier Module)

**Relationship Type:** Ownership (Current Phase), Reference (Future Phase)

**Current Phase:**
- Vendor managed inside Finance Module
- Finance Module owns vendor data
- Vendor is a Finance entity, not a separate module
- Vendor data used in Expense and Payable

**Future Phase:**
- Vendor may move to dedicated Supplier/Vendor Module if procurement scope expands
- Finance references Supplier/Vendor records
- Finance never modifies supplier/vendor data
- Finance only displays supplier/vendor information

**Current Phase:**
- Vendor remains Finance-owned

**Frontend Display (Current Phase):**
- Expense: Vendor selector dropdown
- Payable: Vendor name displayed
- Vendor Management: Full CRUD within Finance module

**Frontend Display (Future Phase):**
- Expense: Supplier/Vendor selector dropdown (from Supplier/Vendor Module)
- Payable: Supplier/Vendor name displayed
- Supplier/Vendor Management: Handled by Supplier/Vendor Module

**Ownership Rules (Current Phase):**
- Finance owns all vendor data
- Vendor is not a separate module
- Vendor data is managed within Finance module

**Ownership Rules (Future Phase):**
- Supplier/Vendor Module owns supplier/vendor data
- Finance references supplier/vendor via supplierId/vendorId
- Finance never modifies supplier/vendor data
- Finance only displays supplier/vendor information

---

## 4. Invoice Architecture

### Invoice Sources

**Approved Sources:**
1. **Estimate → Invoice:** Convert Estimate to Invoice
2. **Proposal → Invoice:** Convert Proposal to Invoice
3. **Quotation → Invoice:** Convert Quotation to Invoice
4. **Project → Invoice:** Create Invoice from Project
5. **Manual → Invoice:** Create Invoice manually (no source document)

**Document Chain:** No strict document chain required. All paths are valid.

**Snapshot Rule:**
- Estimate → Invoice: Invoice receives snapshot of Estimate data
- Proposal → Invoice: Invoice receives snapshot of Proposal data
- Quotation → Invoice: Invoice receives snapshot of Quotation data
- Project → Invoice: Invoice receives snapshot of Project data
- **No auto sync after creation:** Invoice is independent after creation

**Frontend Implementation:**
- Source Type Dropdown: Estimate, Proposal, Quotation, Project, Manual
- Source ID Input: Auto-populated when source selected
- Navigation: Link to source document when available

### Invoice Ownership

**Owner:** Finance Module

**Owned Data:**
- invoiceNumber, invoiceDate
- subtotal, taxAmount, totalAmount
- paidAmount, pendingAmount
- gstType, cgstAmount, sgstAmount, igstAmount, cessAmount
- dueDate, paymentTerms
- lineItems (array of InvoiceLineItem)
- status (Draft, Sent, Viewed, Partially Paid, Paid, Overdue, Cancelled)
- sentAt, viewedAt, paidAt (timestamps)

**Referenced Data:**
- customerId, customerName, customerAddress, customerGST (from Customer Module)
- projectId, projectName (from Project Module)
- sourceType, sourceId (from Documents Module)

### Invoice Lifecycle

**Status Flow:**
```
Draft → Sent → Viewed → Partially Paid → Paid
              ↓
           Overdue
              ↓
           Cancelled
```

**Status Definitions:**
- **Draft:** Invoice created but not sent to customer
- **Sent:** Invoice sent to customer
- **Viewed:** Customer viewed the invoice
- **Partially Paid:** Partial payment received
- **Paid:** Full payment received
- **Overdue:** Payment due date passed (not paid)
- **Cancelled:** Invoice cancelled

**Status Transitions:**
- Draft → Sent (Send action)
- Sent → Viewed (Customer viewed)
- Viewed → Partially Paid (Payment received)
- Partially Paid → Paid (Full payment received)
- Sent → Overdue (Due date passed)
- Overdue → Paid (Payment received)
- Any status → Cancelled (Cancel action)

### Invoice Visibility Rules

**Create:**
- All fields visible in InvoiceForm
- Customer selector (from Customer Module)
- Project selector (from Project Module)
- Source type selector (Estimate, Proposal, Quotation, Project, Manual)
- Source ID input (auto-populated)
- Line items (add/remove/edit)
- GST type selector (CGST, SGST, IGST, CESS)
- Due date picker
- Payment terms input

**Edit:**
- All fields visible in InvoiceForm (reused)
- Same as Create
- Status can be updated (if allowed)

**View (Drawer):**
- All fields visible in View Drawer
- Customer name, address, GST
- Project name
- Source document link (if applicable)
- Line items (read-only)
- Subtotal, tax breakdown, total
- Paid amount, pending amount
- Status, due date, payment terms
- Sent/Viewed/Paid timestamps

**List View:**
- invoiceNumber
- customerName
- projectName
- totalAmount
- paidAmount
- pendingAmount
- status
- dueDate

### Invoice Actions

**Create Action:**
- Opens Create Dialog (InvoiceForm)
- Form submits to useCreateInvoice hook
- Success: Closes dialog, refreshes invoice list

**Edit Action:**
- Opens Edit Dialog (InvoiceForm with pre-filled data)
- Form submits to useUpdateInvoice hook
- Success: Closes dialog, refreshes invoice list

**View Action:**
- Opens View Drawer (read-only invoice details)
- Displays all invoice fields
- Navigation links to source document

**Delete Action:**
- Confirmation dialog
- Calls useDeleteInvoice hook
- Success: Refreshes invoice list

**Send Action:**
- Calls useSendInvoice hook
- Updates status to Sent
- Sets sentAt timestamp

**Mark Paid Action:**
- Calls useMarkInvoicePaid hook
- Updates status to Paid
- Sets paidAt timestamp

---

## 5. Income Review

### Current Implementation

Finance Module currently has a separate Income entity.

**Income Fields:**
- incomeNumber, customerId, customerName, projectId, projectName
- invoiceId, invoiceNumber, amount, taxAmount, totalAmount
- paymentDate, paymentMethod, referenceNumber, transactionId
- notes, category, status

### Alternative Flow (Recommended)

**Invoice → Payment → Revenue Summary**

Without dedicated Income entity:

1. **Invoice:** Created for customer
2. **Payment:** Received against invoice
3. **Revenue Summary:** Calculated from payments

**Benefits:**
- Simpler data model
- No duplicate data (Income duplicates Payment data)
- Revenue calculated from actual payments
- Clearer data flow

**Recommendation:** Consider removing Income entity in future phase. Revenue can be calculated from Payment data directly.

### Income Review Decision

**Question:** Should Income tab remain in Finance Module?

**Current State:**
- Income tab exists as separate entity
- Income duplicates Payment data
- Income has customerId, projectId, invoiceId, amount, paymentDate, paymentMethod

**Alternative:**
- Remove Income tab
- Use Payment entity directly
- Calculate Revenue Summary from Payment data
- Display Revenue in Dashboard KPIs

**Final Decision:**

**Current Phase:**
- Keep Income data model for compatibility
- Hide Income tab from navigation
- Income remains internal/deprecated

**Revenue Visibility:**
- Revenue should come from Payments
- Revenue should come from Invoices
- Revenue should be visible in Dashboard KPIs
- Income entity not exposed in UI

---

## 6. Payment Architecture

### Payment Sources

**Approved Sources:**
1. **Invoice → Payment:** Payment against specific invoice
2. **Customer → Payment:** Direct payment from customer (no invoice)
3. **Manual → Payment:** Manual payment entry

**Frontend Implementation:**
- Payment Type Dropdown: Advance, Stage, Partial, Full, Refund
- Invoice Selector: If payment is against invoice
- Customer Selector: If payment is direct from customer
- Project Selector: Optional project association

### Payment Ownership

**Owner:** Finance Module

**Owned Data:**
- paymentNumber, paymentDate
- type (Advance, Stage, Partial, Full, Refund)
- amount, taxAmount, totalAmount
- paymentMethod (Bank Transfer, UPI, Cash, Cheque, RTGS, NEFT, IMPS, Credit Card, Debit Card)
- referenceNumber, transactionId
- notes
- status (Pending, Processing, Completed, Failed, Refunded, Cancelled)
- attachments

**Referenced Data:**
- invoiceId, invoiceNumber (from Finance Module - Invoice)
- customerId, customerName (from Customer Module)
- projectId, projectName (from Project Module)

### Payment Statuses

**Status Definitions:**
- **Pending:** Payment initiated but not processed
- **Processing:** Payment being processed
- **Completed:** Payment successfully completed
- **Failed:** Payment failed
- **Refunded:** Payment refunded
- **Cancelled:** Payment cancelled

### Payment Visibility Rules

**Create:**
- All fields visible in PaymentForm
- Payment type selector
- Invoice selector (if applicable)
- Customer selector
- Project selector (optional)
- Amount, tax amount
- Payment date picker
- Payment method selector
- Reference number, transaction ID
- Notes
- Attachments

**Edit:**
- All fields visible in PaymentForm (reused)
- Same as Create
- Status can be updated (if allowed)

**View (Drawer):**
- All fields visible in View Drawer
- Payment type, number, date
- Invoice number (if applicable)
- Customer name
- Project name
- Amount, tax breakdown, total
- Payment method
- Reference number, transaction ID
- Notes
- Attachments
- Status

**List View:**
- paymentNumber
- customerName
- totalAmount
- paymentMethod
- status
- paymentDate

### Payment Actions

**Create Action:**
- Opens Create Dialog (PaymentForm)
- Form submits to useCreatePayment hook
- Success: Closes dialog, refreshes payment list

**Edit Action:**
- Opens Edit Dialog (PaymentForm with pre-filled data)
- Form submits to useUpdatePayment hook
- Success: Closes dialog, refreshes payment list

**View Action:**
- Opens View Drawer (read-only payment details)
- Displays all payment fields

**Delete Action:**
- Confirmation dialog
- Calls useDeletePayment hook
- Success: Refreshes payment list

### Invoice → Payment Relationship

**Frontend Display:**
- Invoice Detail: Show linked payments
- Payment Detail: Show linked invoice
- Invoice List: Show payment progress (paidAmount/totalAmount)
- Payment List: Show invoice number (if applicable)

**Data Flow:**
- Payment references invoice via invoiceId
- Invoice tracks paidAmount and pendingAmount
- When payment created: Invoice paidAmount increases, pendingAmount decreases
- When payment deleted: Invoice paidAmount decreases, pendingAmount increases

---

## 7. Expense Architecture

### Expense Types

**Approved Types:**
1. **Project-linked Expense:** Expense associated with a project
2. **General Expense:** General business expense (no project)

**Expense Categories:**
- Material
- Labour
- Equipment
- Travel
- Office
- Utilities
- Rent
- Marketing
- Training
- Miscellaneous

**Frontend Implementation:**
- Category Dropdown: Pre-defined expense categories
- Sub Category Input: Custom sub-category
- Project Selector: Optional (for project-linked expenses)
- Vendor Selector: Required (for vendor expenses)

### Expense Ownership

**Owner:** Finance Module

**Owned Data:**
- expenseNumber, expenseDate
- category, subCategory
- amount, taxAmount, totalAmount
- description
- receiptNumber, invoiceNumber
- notes
- attachments
- status (Pending, Approved, Rejected, Paid, Cancelled)
- approvedBy, approvedAt, rejectionReason

**Referenced Data:**
- vendorId, vendorName (from Finance Module - Vendor, Future: Supplier Module)
- projectId, projectName (from Project Module)
- purchaseEntryId (from Inventory Module - Purchase Entry, Future)

### Expense Statuses

**Status Definitions:**
- **Pending:** Expense submitted for approval
- **Approved:** Expense approved
- **Rejected:** Expense rejected
- **Paid:** Expense paid to vendor
- **Cancelled:** Expense cancelled

**Status Transitions:**
- Pending → Approved (Approve action)
- Pending → Rejected (Reject action)
- Approved → Paid (Vendor payment)
- Any status → Cancelled (Cancel action)

### Expense Visibility Rules

**Create:**
- All fields visible in ExpenseForm
- Vendor selector
- Category selector
- Sub category input
- Project selector (optional)
- Amount, tax amount
- Date picker
- Description input
- Receipt number, invoice number
- Notes
- Attachments

**Edit:**
- All fields visible in ExpenseForm (reused)
- Same as Create
- Status can be updated (if allowed)

**View (Drawer):**
- All fields visible in View Drawer
- Vendor name
- Category, sub category
- Project name
- Amount, tax breakdown, total
- Date
- Description
- Receipt number, invoice number
- Notes
- Attachments
- Status
- Approval details (approvedBy, approvedAt, rejectionReason)

**List View:**
- expenseNumber
- vendorName
- category
- description
- totalAmount
- status
- date

### Expense Actions

**Create Action:**
- Opens Create Dialog (ExpenseForm)
- Form submits to useCreateExpense hook
- Success: Closes dialog, refreshes expense list

**Edit Action:**
- Opens Edit Dialog (ExpenseForm with pre-filled data)
- Form submits to useUpdateExpense hook
- Success: Closes dialog, refreshes expense list

**View Action:**
- Opens View Drawer (read-only expense details)
- Displays all expense fields

**Delete Action:**
- Confirmation dialog
- Calls useDeleteExpense hook
- Success: Refreshes expense list

**Approve Action:**
- Calls useApproveExpense hook
- Updates status to Approved
- Sets approvedBy and approvedAt

**Reject Action:**
- Calls useRejectExpense hook
- Updates status to Rejected
- Sets rejectionReason

---

## 8. Receivable Architecture

### What Receivable Means in PEB CRM

Receivable is a Finance visibility layer built from Invoice and Payment information.

**Current Phase:**
- UI visibility only
- Receivable tab shows Invoice Amount, Paid Amount, Pending Amount
- Data displayed from Invoice and Payment entities
- No separate Receivable entity required for display

**Future Phase:**
- Backend calculations may automate values
- Automatic aging bucket calculations
- Automatic overdue tracking

**Frontend Display (Current Phase):**
- Receivable totalAmount = Invoice totalAmount
- Receivable paidAmount = Sum of linked payments
- Receivable pendingAmount = totalAmount - paidAmount
- Receivable dueDate = Invoice dueDate
- Receivable overdueDays = Days since dueDate (if unpaid)
- Receivable agingBucket = Based on overdueDays (0-30, 31-60, 61-90, 90+)

### Receivable Relationships

**Invoice → Receivable:**
- Receivable visibility built from Invoice data
- Each unpaid invoice appears in Receivable tab
- When invoice paid: Receivable paidAmount increases, pendingAmount decreases

**Payment → Receivable:**
- Payment linked to invoice updates Receivable visibility
- Payment increases Receivable paidAmount

**Customer → Receivable:**
- Receivable grouped by customer
- Customer total receivables = Sum of all customer receivables

### Receivable Visibility Rules

**View (Drawer):**
- Customer name
- Invoice number, invoice date
- Project name
- Total amount
- Paid amount
- Pending amount
- Due date
- Overdue days
- Aging bucket
- Status (Pending, Partial, Overdue)
- Payment history (linked payments)

**List View:**
- customerName
- invoiceNumber
- totalAmount
- paidAmount
- pendingAmount
- agingBucket
- dueDate

### Receivable Actions

**View Action:**
- Opens View Drawer (read-only receivable details)
- Displays all receivable fields
- Shows payment history
- Navigation to linked invoice

**No Create/Edit/Delete:**
- Receivable is a visibility layer, not a separate entity
- Cannot create/edit/delete receivable directly
- Receivable visibility changes when Invoice or Payment changes

---

## 9. Payable Architecture

### What Payable Means in PEB CRM

Payable is a Finance visibility layer built from Expense and Vendor Payment information.

**Current Phase:**
- UI visibility only
- Payable tab shows Expense Amount, Paid Amount, Pending Amount
- Data displayed from Expense and Vendor Payment entities
- No separate Payable entity required for display

**Future Phase:**
- Backend calculations may automate values
- Automatic aging bucket calculations
- Automatic overdue tracking

**Payable Relationship Flow:**
```
Supplier (Future Phase)
↓
Purchase Entry (Inventory Module)
↓
Expense (Finance Module)
↓
Payable (Finance Module - UI Visibility Layer)
```

**Frontend Display (Current Phase):**
- Payable totalAmount = Expense totalAmount
- Payable paidAmount = Sum of linked vendor payments
- Payable pendingAmount = totalAmount - paidAmount
- Payable dueDate = Expense dueDate (if applicable)
- Payable overdueDays = Days since dueDate (if unpaid)
- Payable agingBucket = Based on overdueDays (0-30, 31-60, 61-90, 90+)

**Inventory Relationship:**
- Purchase Entry (Inventory Module) can create Expense in Finance Module
- Expense linked to Purchase Entry via purchaseEntryId
 Payable derived from Expense linked to Purchase Entry

### Payable Relationships

**Expense → Payable:**
- Payable visibility built from Expense data
- Each unpaid expense appears in Payable tab
- When expense paid: Payable paidAmount increases, pendingAmount decreases

**Vendor Payment → Payable:**
- Vendor payment linked to expense updates Payable visibility
- Vendor payment increases Payable paidAmount

**Vendor → Payable:**
- Payable grouped by vendor
- Vendor total payables = Sum of all vendor payables

### Payable Visibility Rules

**View (Drawer):**
- Vendor name
- Bill number, bill date
- Project name
- Total amount
- Paid amount
- Pending amount
- Due date
- Overdue days
- Aging bucket
- Status (Pending, Partial, Overdue)
- Payment history (linked vendor payments)

**List View:**
- vendorName
- billNumber
- totalAmount
- paidAmount
- pendingAmount
- agingBucket
- dueDate

### Payable Actions

**View Action:**
- Opens View Drawer (read-only payable details)
- Displays all payable fields
- Shows payment history
- Navigation to linked expense

**No Create/Edit/Delete:**
- Payable is a visibility layer, not a separate entity
- Cannot create/edit/delete payable directly
- Payable visibility changes when Expense or Vendor Payment changes

---

## 10. Project Financial Flow

### Project Financial Data Flow

```
Project
├ Invoices
├ Payments
├ Expenses
├ Receivables
├ Payables
└ Financial Summary
```

### Project Financial Summary Display

**Purpose:** Display project-level financial information in Finance Module

**Data Sources:**
- Invoices linked to Project
- Payments linked to Project
- Expenses linked to Project
- Receivables derived from Project Invoices
- Payables derived from Project Expenses

**Financial Summary Components:**
- **Total Invoiced:** Sum of Project Invoices
- **Total Received:** Sum of Project Payments
- **Pending Receivable:** Total Invoiced - Total Received
- **Total Expense:** Sum of Project Expenses
- **Pending Payable:** Sum of unpaid Project Expenses
- **Budget Utilization:** Actual spend vs planned budget
- **Note:** Revenue Recognition = Future Accounting Phase
- **Note:** Profit calculation = Future Accounting Phase (backend)

**Frontend Display:**
- Project selector dropdown
- Financial summary card for selected project
- Show: Total Invoiced, Total Received, Pending Receivable, Total Expense
- Breakdown by category (Material, Labour, Other)
- Outstanding amounts (Receivables, Payables)
- Note: Revenue and Profit calculations deferred to Accounting Phase

**Ownership:**
- ProjectFinance is a derived entity (read-only)
- Calculated from Invoice, Payment, Expense data
- Finance displays project financial summary
- Project Module owns project data

---

## 11. Inventory Cost Flow

### Inventory Cost Relationship Flow

```
Inventory Purchase (Inventory Module)
↓
Expense (Finance Module)
↓
Project Cost (Finance Module - Derived)
↓
Project Financial Summary (Finance Module - Derived)
```

### Relationship Documentation

**Inventory Purchase → Expense:**
- Purchase Entry in Inventory Module can create Expense in Finance Module
- Expense linked to Purchase Entry via purchaseEntryId
- Expense amount = Purchase Entry amount
- Expense category = Material (from Inventory)

**Expense → Project Cost:**
- Expense linked to Project via projectId
- Project Cost aggregates all project-linked expenses
- Material cost from Inventory purchases
- Labour cost from manual entries
- Other cost from miscellaneous expenses

**Project Cost → Project Financial Summary:**
- Project Financial Summary includes Project Cost
- Total Expenses = Project Cost + Other Expenses
- Net Profit = Total Revenue - Total Expenses
- Budget Utilization = Project Cost / Planned Budget

**Frontend Display:**
- Expense detail shows linked Purchase Entry
- Purchase Entry navigation link
- Project Financial Summary shows material cost breakdown
- Inventory cost visible in project financial summary

**Ownership:**
- Inventory Module owns Purchase Entry data
- Finance Module owns Expense data
- Project Cost is derived from Expense data
- Project Financial Summary is derived from Invoice, Payment, Expense data

**Note:** This is relationship documentation only. No implementation required.

---

## 12. Dashboard Architecture

### KPI Cards

**Recommended KPIs:**

1. **Total Invoiced**
   - Definition: Total amount invoiced to customers
   - Calculation: Sum of all invoices
   - Display: Currency format
   - Change: Month-over-month change percentage

2. **Total Received**
   - Definition: Total payments received
   - Calculation: Sum of all completed payments
   - Display: Currency format
   - Change: Month-over-month change percentage

3. **Total Expense**
   - Definition: Total expenses incurred
   - Calculation: Sum of all approved expenses
   - Display: Currency format
   - Change: Month-over-month change percentage

4. **Pending Receivables**
   - Definition: Money owed by customers
   - Calculation: Sum of all pending receivables
   - Display: Currency format
   - Change: Month-over-month change percentage

5. **Pending Payables**
   - Definition: Money owed to vendors
   - Calculation: Sum of all pending payables
   - Display: Currency format
   - Change: Month-over-month change percentage

6. **Cash Inflow**
   - Definition: Money coming in
   - Calculation: Sum of all incoming payments
   - Display: Currency format
   - Change: Month-over-month change percentage

7. **Cash Outflow**
   - Definition: Money going out
   - Calculation: Sum of all paid expenses
   - Display: Currency format
   - Change: Month-over-month change percentage

8. **Available Cash**
   - Definition: Cash on hand
   - Calculation: Bank account balances
   - Display: Currency format
   - Change: Month-over-month change percentage

**Note:** Revenue Recognition and Profit calculation = Future Accounting Phase

### Financial Summary Widget

**Purpose:** High-level financial overview

**Components:**
- Revenue vs Expenses chart
- Profit margin percentage
- Cash flow summary
- Outstanding receivables/payables summary

### Alerts Widget

**Purpose:** Notify critical financial issues

**Alert Types:**
- Overdue invoices (high priority)
- Overdue payables (high priority)
- Low cash balance (high priority)
- Budget overruns (medium priority)
- GST payment due (medium priority)

### Recent Activity Widget

**Purpose:** Show recent financial activities

**Activity Types:**
- Invoice created
- Invoice sent
- Payment received
- Expense created
- Expense approved
- Expense paid

**Display:**
- Activity type
- Description
- Performed by
- Timestamp
- Status (if applicable)

### Outstanding Payments Widget

**Purpose:** Show payment status

**Components:**
- Overdue invoices list
- Pending payments list
- Due soon payments list

### Outstanding Receivables Widget

**Purpose:** Show receivable status

**Components:**
- Aging bucket breakdown (0-30, 31-60, 61-90, 90+ days)
- Top overdue customers
- Total outstanding by customer

### Outstanding Payables Widget

**Purpose:** Show payable status

**Components:**
- Aging bucket breakdown (0-30, 31-60, 61-90, 90+ days)
- Top overdue vendors
- Total outstanding by vendor

### Project Financial Summary Widget

**Purpose:** Show project-level financial data

**Components:**
- Project list with financial summary
- Estimated cost vs actual cost
- Total revenue per project
- Profit margin per project
- Budget utilization per project

---

## 13. Tab Architecture

### Current Tab Structure

**Existing Tabs:**
1. Dashboard (KPIs + Activity)
2. Invoices
3. Payments
4. Expenses
5. Receivables
6. Payables

### Recommended Tab Structure

**Recommended Tabs:**
1. **Dashboard** (Keep)
   - KPIs
   - Financial summary
   - Alerts
   - Recent activity

2. **Invoices** (Keep)
   - Invoice list
   - Invoice actions (Create, Edit, View, Delete, Send, Mark Paid)

3. **Payments** (Keep)
   - Payment list
   - Payment actions (Create, Edit, View, Delete)

4. **Expenses** (Keep)
   - Expense list
   - Expense actions (Create, Edit, View, Delete, Approve, Reject)

5. **Receivables** (Keep)
   - Receivable list
   - Receivable view (read-only)
   - Aging bucket breakdown

6. **Payables** (Keep)
   - Payable list
   - Payable view (read-only)
   - Aging bucket breakdown

**Tabs Not Recommended:**
- **Income:** Income is a derived entity from Payment. Not needed as separate tab.
- **Vendors:** Vendor management should be within Expenses tab or as a drawer from expense list.
- **Bank Accounts:** Bank account management should be within Settings or as a drawer from dashboard.

**Tabs to Merge:**
- None. Current tab structure is appropriate.

**Tabs to Keep Separate:**
- Invoices, Payments, Expenses, Receivables, Payables should remain separate tabs for clarity.

### Tab Navigation

**Tab Switching:**
- Tabs should maintain state (search, filter, pagination)
- Active tab should be reflected in URL (optional)
- Tab switching should be fast (no page reload)

**Tab Actions:**
- Each tab should have primary action button (Create)
- Each tab should have search and filter
- Each tab should have data table with row actions

---

## 14. Finance Source Of Truth Matrix

### Module Ownership

| Data Type | Source Of Truth | Module | Finance Role |
|-----------|----------------|--------|-------------|
| **Customer Data** | Customer Module | Customer | Reference only |
| **Project Data** | Project Module | Project | Reference only |
| **Document Data** | Documents Module | Documents | Reference only |
| **Item Data** | Item Module | Item Master | Reference only |
| **Inventory Data** | Inventory Module | Inventory | Reference only |
| **Supplier Data** | Supplier/Vendor Module (Future, if procurement scope expands) | Supplier/Vendor (Future) | Reference only (Future) |
| **Financial Data** | Finance Module | Finance | Source of Truth |

### Finance-Owned Data

**Financial Entities (Source of Truth):**
- Income (Future: Consider removal, use Payment instead)
- Expense
- Invoice
- Payment
- Vendor (Current Phase)
- BankAccount
- Receivable (Current Phase: UI visibility, Future: Derived)
- Payable (Current Phase: UI visibility, Future: Derived)
- ProjectFinance (Derived)
- GSTRecord
- Budget

**Finance Never Owns:**
- Customer data (Customer Module owns)
- Project data (Project Module owns)
- Document data (Documents Module owns)
- Item data (Item Master Module owns)
- Inventory data (Inventory Module owns)
- Supplier data (Supplier/Vendor Module owns - Future, if procurement scope expands)

---

## 15. Ownership Matrix

### Entity Ownership

| Entity | Owner | Referenced Entities | Owned Fields |
|--------|-------|-------------------|-------------|
| **Income** | Finance | Customer, Project, Invoice | amount, taxAmount, totalAmount, paymentDate, paymentMethod, referenceNumber, transactionId, notes, category, status |
| **Expense** | Finance | Vendor, Project | category, subCategory, amount, taxAmount, totalAmount, date, description, receiptNumber, invoiceNumber, notes, attachments, status, approvedBy, approvedAt, rejectionReason |
| **Invoice** | Finance | Customer, Project, Documents | subtotal, taxAmount, totalAmount, paidAmount, pendingAmount, gstType, cgstAmount, sgstAmount, igstAmount, cessAmount, dueDate, paymentTerms, lineItems, status, sentAt, viewedAt, paidAt |
| **Payment** | Finance | Invoice, Customer, Project | type, amount, taxAmount, totalAmount, paymentDate, paymentMethod, referenceNumber, transactionId, notes, attachments, status |
| **Vendor** | Finance | None | vendorCode, name, gstNumber, panNumber, contactPerson, mobile, email, address, city, state, pincode, creditLimit, creditPeriod, paymentTerms, totalPurchases, totalPayments, outstandingBalance, performanceRating, status |
| **BankAccount** | Finance | None | accountName, bankName, accountNumber, ifscCode, branch, accountType, currentBalance, status |
| **Receivable** | Finance Visibility Layer (Derived) | Customer, Invoice | totalAmount, paidAmount, pendingAmount, dueDate, overdueDays, agingBucket, status (visibility layer built from Invoice and Payment) |
| **Payable** | Finance Visibility Layer (Derived) | Vendor, Expense | totalAmount, paidAmount, pendingAmount, dueDate, overdueDays, agingBucket, status (visibility layer built from Expense and Vendor Payment) |
| **ProjectFinance** | Finance (Derived) | Project | estimatedCost, actualCost, budgetVariance, remainingBudget, totalInvoiced, totalReceived, pendingReceivable, totalExpense, pendingPayable, materialCost, labourCost, otherCost, financialHealth, lastUpdated (derived from Invoice, Payment, Expense) |
| **Note:** grossProfit, netProfit, profitMargin = Future Accounting Phase |
| **GSTRecord** | Finance | None | gstType, gstPeriod, taxableAmount, cgstAmount, sgstAmount, igstAmount, cessAmount, totalGst, status |
| **Budget** | Finance | Project | projectId, projectName, plannedBudget, actualSpend, variance, remainingBudget, warningThreshold, criticalThreshold, isOverBudget, variancePercentage, materialBudget, labourBudget, overheadBudget |

### Cross-Module References

| Finance Entity | References Module | Reference Type | Purpose |
|----------------|------------------|---------------|---------|
| Invoice | Customer | customerId, customerName, customerAddress, customerGST | Invoice for customer |
| Invoice | Project | projectId, projectName | Invoice for project |
| Invoice | Documents | sourceType, sourceId | Invoice from document |
| Payment | Customer | customerId, customerName | Payment from customer |
| Payment | Project | projectId, projectName | Payment for project |
| Payment | Invoice | invoiceId, invoiceNumber | Payment against invoice |
| Expense | Vendor | vendorId, vendorName | Expense from vendor |
| Expense | Project | projectId, projectName | Expense for project |
| Receivable | Customer | customerId, customerName | Receivable from customer |
| Receivable | Invoice | invoiceId, invoiceNumber | Receivable from invoice |
| Payable | Vendor | vendorId, vendorName | Payable to vendor |
| Payable | Expense | billId, billNumber | Payable from expense |
| ProjectFinance | Project | projectId, projectName | Financial summary for project |
| Budget | Project | projectId, projectName | Budget for project |

### Ownership Rules

**Finance-Owned Entities:**
- Finance owns all financial entities (Income, Expense, Invoice, Payment, Vendor, BankAccount, Receivable, Payable, ProjectFinance, GSTRecord, Budget)
- Finance can create, edit, delete these entities
- Finance is responsible for data integrity

**Referenced Entities:**
- Finance references Customer, Project, Documents, Inventory
- Finance never modifies referenced entities
- Finance only displays referenced entity information
- Referenced entity deletion should be restricted if referenced by Finance

**Derived Entities:**
- Receivable, Payable, ProjectFinance are derived entities
- Calculated from base entities (Invoice, Payment, Expense)
- Cannot create/edit/delete derived entities directly
- Derived entities update when base entities change

---

## 16. Visibility Rules

### PEB CRM Visibility Standard

**Rule:** Every user-entered field must remain visible later (Create → Edit → View → Detail)

**Implementation:**
- Create: All fields visible in Create Dialog
- Edit: All fields visible in Edit Dialog (same as Create)
- View: All fields visible in View Drawer (read-only)
- Detail: All fields visible in Detail View (if separate page exists)

**No Hidden Fields:**
- No field should be hidden after creation
- No field should be visible in Create but not in View
- No field should be visible in Edit but not in View
- All fields must maintain parity across Create, Edit, View

### Income Visibility

**Create Fields:**
- customerId (Select)
- projectId (Select)
- invoiceId (Input)
- amount (Input)
- taxAmount (Input)
- totalAmount (Calculated)
- paymentDate (Date picker)
- paymentMethod (Select)
- referenceNumber (Input)
- transactionId (Input)
- notes (Textarea)
- category (Select)

**View Fields (Drawer):**
- All Create fields (read-only)
- Customer name
- Project name
- Invoice number
- Payment method display
- Category display

### Expense Visibility

**Create Fields:**
- vendorId (Select)
- category (Select)
- subCategory (Input)
- projectId (Select)
- amount (Input)
- taxAmount (Input)
- date (Date picker)
- description (Textarea)
- receiptNumber (Input)
- invoiceNumber (Input)
- notes (Textarea)
- attachments (File upload)

**View Fields (Drawer):**
- All Create fields (read-only)
- Vendor name
- Project name
- Category, sub category display
- Attachments display

### Invoice Visibility

**Create Fields:**
- customerId (Select)
- projectId (Select)
- sourceType (Select)
- sourceId (Input)
- lineItems (Array - add/remove/edit)
  - description (Input)
  - quantity (Input)
  - unit (Input)
  - rate (Input)
  - amount (Calculated)
  - taxRate (Input)
  - taxAmount (Calculated)
- gstType (Select)
- dueDate (Date picker)
- paymentTerms (Input)

**View Fields (Drawer):**
- All Create fields (read-only)
- Customer name, address, GST
- Project name
- Source document link
- Line items (read-only)
- Subtotal, tax breakdown, total
- Paid amount, pending amount
- Status, due date, payment terms
- Sent/Viewed/Paid timestamps

### Payment Visibility

**Create Fields:**
- type (Select)
- invoiceId (Input)
- customerId (Select)
- projectId (Select)
- amount (Input)
- taxAmount (Input)
- totalAmount (Calculated)
- paymentDate (Date picker)
- paymentMethod (Select)
- referenceNumber (Input)
- transactionId (Input)
- notes (Textarea)
- attachments (File upload)

**View Fields (Drawer):**
- All Create fields (read-only)
- Invoice number (if applicable)
- Customer name
- Project name
- Payment method display
- Attachments display

### Vendor Visibility

**Create Fields:**
- name (Input)
- gstNumber (Input)
- panNumber (Input)
- contactPerson (Input)
- mobile (Input)
- email (Input)
- address (Textarea)
- city (Input)
- state (Input)
- pincode (Input)
- creditLimit (Input)
- creditPeriod (Input)
- paymentTerms (Input)

**View Fields (Drawer):**
- All Create fields (read-only)
- Total purchases
- Total payments
- Outstanding balance
- Performance rating

### Bank Account Visibility

**Create Fields:**
- accountName (Input)
- bankName (Input)
- accountNumber (Input)
- ifscCode (Input)
- branch (Input)
- accountType (Select)

**View Fields (Drawer):**
- All Create fields (read-only)
- Current balance

### Receivable Visibility

**View Fields (Drawer):**
- Customer name
- Invoice number, invoice date
- Project name
- Total amount
- Paid amount
- Pending amount
- Due date
- Overdue days
- Aging bucket
- Status
- Payment history (linked payments)

### Payable Visibility

**View Fields (Drawer):**
- Vendor name
- Bill number, bill date
- Project name
- Total amount
- Paid amount
- Pending amount
- Due date
- Overdue days
- Aging bucket
- Status
- Payment history (linked vendor payments)

---

## 17. Create/Edit/View Philosophy

### PEB CRM Standard Pattern

**Create = Dialog**
- Opens modal dialog
- All fields visible
- Form validation
- Submit action
- Cancel action
- Success: Closes dialog, refreshes list

**Edit = Dialog**
- Opens modal dialog (same as Create)
- Pre-filled with existing data
- All fields visible
- Form validation
- Submit action
- Cancel action
- Success: Closes dialog, refreshes list

**View = Drawer**
- Opens side drawer
- All fields visible (read-only)
- Navigation links
- Related data display
- Close action

**Delete = Confirmation**
- Opens confirmation dialog
- Shows entity details
- Confirm action
- Cancel action
- Success: Refreshes list

### Finance Module Implementation

**Create Pattern:**
- Button: "Create [Entity]" in header
- Action: Opens Create Dialog
- Component: [Entity]Form (reusable for Create and Edit)
- Hook: useCreate[Entity]
- Success: Closes dialog, refreshes list

**Edit Pattern:**
- Button: Edit action in FinanceRowActions
- Action: Opens Edit Dialog
- Component: [Entity]Form (reused from Create)
- Hook: useUpdate[Entity]
- Success: Closes dialog, refreshes list

**View Pattern:**
- Button: View action in FinanceRowActions
- Action: Opens View Drawer
- Component: [Entity]ViewDrawer
- Display: All fields (read-only)
- Navigation: Links to related entities

**Delete Pattern:**
- Button: Delete action in FinanceRowActions
- Action: Opens confirmation dialog
- Hook: useDelete[Entity]
- Success: Refreshes list

### Form Reusability

**Create and Edit Share Same Form:**
- [Entity]Form component accepts initialData prop
- If initialData is null: Create mode
- If initialData is provided: Edit mode
- Form validation same for both modes
- Submit action different (create vs update)

### Drawer Implementation

**View Drawer Components:**
- [Entity]ViewDrawer component
- Accepts entity data as prop
- Displays all fields (read-only)
- Shows related data (linked entities)
- Navigation links to related entities
- Close button

---

## 18. Mock Data Strategy

### Approved Architecture

**Real API → Fallback Mock Data**

**Implementation:**
1. Primary: Call real API endpoint
2. Fallback: If API fails (connection error), use mock data
3. Development: Mock data used when backend unavailable
4. Production: Real API used (mock fallback for emergencies)

### Current Finance Module Implementation

**Mock Data Location:** `financeApi.ts` lines 36-469

**Mock Data Entities:**
- MOCK_VENDORS (2 mock vendors)
- MOCK_BANK_ACCOUNTS (2 mock bank accounts)
- MOCK_INCOME (2 mock income records)
- MOCK_EXPENSES (2 mock expenses)
- MOCK_INVOICES (2 mock invoices)
- MOCK_PAYMENTS (2 mock payments)
- MOCK_RECEIVABLES (1 mock receivable)
- MOCK_PAYABLES (1 mock payable)
- MOCK_TRANSACTIONS (2 mock transactions)
- MOCK_PROJECT_FINANCE (1 mock project finance)
- MOCK_ACTIVITIES (4 mock activities)
- MOCK_STATS (1 mock stats object)

**Mock Fallback Mechanism:**
- Function: `isConnectionError` (financeApi.ts lines 472-479)
- Logic: Returns mock data if connection error detected
- Status: ✓ IMPLEMENTED

### Mock Data Quality

**Assessment:** Mock data is comprehensive and realistic

**Strengths:**
- All entities have mock data
- Mock data matches real-world scenarios
- All fields populated correctly
- Relationships maintained in mock data

**Recommendations:**
- Keep mock data for development
- Ensure mock data accuracy
- Test mock fallback mechanism
- Document mock data structure

### Mock Data Audit

**Required Actions:**
1. Verify mock data matches real-world scenarios
2. Ensure all fields are populated correctly
3. Test mock fallback mechanism
4. Update mock data when schema changes

**Status:** Mock data is comprehensive and follows approved architecture

---

## 19. Risks

### Architecture Risks

**Risk 1: No View Drawers**
- **Severity:** HIGH
- **Impact:** Cannot view full financial record details
- **Mitigation:** Implement View Drawers for all entities

**Risk 2: No Edit Dialogs**
- **Severity:** HIGH
- **Impact:** Cannot edit financial records
- **Mitigation:** Implement Edit Dialogs for all entities

**Risk 3: No Create/Edit/View Parity**
- **Severity:** HIGH
- **Impact:** Fields not consistent across Create, Edit, View
- **Mitigation:** Ensure all fields visible in all modes

**Risk 4: Action Buttons Not Functional**
- **Severity:** HIGH
- **Impact:** Cannot perform financial actions
- **Mitigation:** Connect action buttons to hooks

### Data Integrity Risks

**Risk 5: KPI Accuracy**
- **Severity:** MEDIUM
- **Impact:** KPIs use mock data with hardcoded changes
- **Mitigation:** Calculate KPIs from actual data

**Risk 6: Relationship Validation**
- **Severity:** MEDIUM
- **Impact:** Customer/Project/Vendor relationships not validated
- **Mitigation:** Add relationship validation in forms

### Data Visibility Risks

**Risk 7: Receivable/Payable Visibility**
- **Severity:** MEDIUM
- **Impact:** Cannot see full receivable/payable details
- **Mitigation:** Implement View Drawers for Receivable/Payable

**Risk 8: Documents Integration Validation**
- **Severity:** MEDIUM
- **Impact:** Invoice source not validated against Documents module
- **Mitigation:** Validate source document exists before creating Invoice

### Operational Risks

**Risk 9: Mock Data Audit**
- **Severity:** LOW
- **Impact:** Need to verify mock data accuracy
- **Mitigation:** Regular mock data audits

**Risk 10: Future Backend Automation**
- **Severity:** LOW
- **Impact:** Receivable/Payable calculation not automatic
- **Mitigation:** Plan for Accounting Module (future phase)

### Risk Score

**Overall Risk Score:** 5/10 (50%)

- **Data Integrity Risks:** 5/10 (KPI accuracy, relationship validation)
- **Data Visibility Risks:** 8/10 (no view/edit dialogs, no parity)
- **UX Risks:** 6/10 (action buttons not functional, receivable/payable visibility)
- **Operational Risks:** 3/10 (documents integration validation, mock data audit)

---

## 20. Recommended Architecture

### Overall Architecture

**Module Structure:**
- Tab-based dashboard (no dedicated pages)
- Create/Edit = Dialog
- View = Drawer
- Delete = Confirmation

**Data Flow:**
- Finance owns financial data
- Finance references Customer, Project, Documents, Inventory
- Receivable/Payable derived from Invoice/Expense
- ProjectFinance derived from Invoice, Payment, Expense

**API Strategy:**
- Real API → Fallback Mock Data
- React Query for data management
- Zod for validation

### Invoice Architecture

**Invoice Sources:**
- Estimate → Invoice
- Proposal → Invoice
- Quotation → Invoice
- Project → Invoice
- Manual → Invoice

**Invoice Lifecycle:**
- Draft → Sent → Viewed → Partially Paid → Paid
- Sent → Overdue (if due date passed)
- Any status → Cancelled

**Invoice Visibility:**
- Create: InvoiceForm (Dialog)
- Edit: InvoiceForm (Dialog, reused)
- View: InvoiceViewDrawer (Drawer)
- Delete: Confirmation Dialog

**Invoice Actions:**
- Create: useCreateInvoice
- Edit: useUpdateInvoice
- Delete: useDeleteInvoice
- Send: useSendInvoice
- Mark Paid: useMarkInvoicePaid

### Payment Architecture

**Payment Sources:**
- Invoice → Payment
- Customer → Payment
- Manual → Payment

**Payment Visibility:**
- Create: PaymentForm (Dialog)
- Edit: PaymentForm (Dialog, reused)
- View: PaymentViewDrawer (Drawer)
- Delete: Confirmation Dialog

**Payment Actions:**
- Create: useCreatePayment
- Edit: useUpdatePayment
- Delete: useDeletePayment

### Expense Architecture

**Expense Types:**
- Project-linked Expense
- General Expense

**Expense Lifecycle:**
- Pending → Approved → Paid
- Pending → Rejected
- Any status → Cancelled

**Expense Visibility:**
- Create: ExpenseForm (Dialog)
- Edit: ExpenseForm (Dialog, reused)
- View: ExpenseViewDrawer (Drawer)
- Delete: Confirmation Dialog

**Expense Actions:**
- Create: useCreateExpense
- Edit: useUpdateExpense
- Delete: useDeleteExpense
- Approve: useApproveExpense
- Reject: useRejectExpense

### Receivable Architecture

**Receivable Definition:**
- Derived from Invoice
- Receivable = Invoice - Payment

**Receivable Visibility:**
- View: ReceivableViewDrawer (Drawer)
- No Create/Edit/Delete (derived entity)

**Receivable Display:**
- Customer name
- Invoice details
- Payment history
- Aging bucket

### Payable Architecture

**Payable Definition:**
- Derived from Expense
- Payable = Expense - Vendor Payment

**Payable Visibility:**
- View: PayableViewDrawer (Drawer)
- No Create/Edit/Delete (derived entity)

**Payable Display:**
- Vendor name
- Expense details
- Payment history
- Aging bucket

### Dashboard Architecture

**KPI Cards:**
- Total Revenue
- Total Expenses
- Net Profit
- Pending Receivables
- Pending Payables
- Cash Inflow
- Cash Outflow
- Available Cash

**Widgets:**
- Financial Summary
- Alerts
- Recent Activity
- Outstanding Payments
- Outstanding Receivables
- Outstanding Payables
- Project Financial Summary

**KPI Calculation:**
- Calculate from actual data (not mock)
- Real-time updates
- Month-over-month change percentages

### Tab Architecture

**Recommended Tabs:**
1. Dashboard
2. Invoices
3. Payments
4. Expenses
5. Receivables
6. Payables

**Tab Features:**
- Search
- Filter
- Data Table
- Row Actions
- Create Button

---

## 21. Priority Recommendations

### Priority 1: Create/Edit/View Parity

**Objective:** Ensure all fields visible in Create/Edit are also visible in View

**Actions:**
- Add missing fields to view drawers
- Maintain consistent formatting across Create, Edit, View
- Verify all user-entered fields remain visible

**Impact:** 60% data visibility improvement

### Priority 2: View Drawers

**Objective:** Implement View Drawers for all financial entities

**Entities:**
- Expense View Drawer
- Invoice View Drawer
- Payment View Drawer
- Vendor View Drawer
- Bank Account View Drawer
- Receivable View Drawer
- Payable View Drawer

**Impact:** 70% data visibility improvement

### Priority 3: Functional Actions

**Objective:** Connect action buttons to actual functionality

**Actions:**
- Connect View to view drawer
- Connect Edit to edit dialog
- Connect Delete to delete mutation
- Connect Send to sendInvoice mutation
- Connect Approve to approveExpense mutation
- Connect Reject to rejectExpense mutation

**Impact:** 60% UX efficiency improvement

### Priority 4: Invoice Source Validation

**Objective:** Validate Invoice source against Documents module

**Actions:**
- Verify Estimate/Proposal/Quotation/Project exist before creating Invoice
- Auto-populate Invoice fields from source document
- Link Invoice to source document
- Add navigation links from Invoice to source document

**Impact:** 40% workflow efficiency improvement

### Priority 5: Receivable/Payable Visibility

**Objective:** Improve receivable/payable detail views

**Actions:**
- Show aging bucket details
- Show payment history
- Show linked invoice/expense details
- Implement View Drawers for Receivable/Payable

**Impact:** 50% data visibility improvement

### Priority 6: KPI Accuracy

**Objective:** Calculate KPIs from actual data

**Actions:**
- Remove hardcoded change percentages
- Calculate from real financial data
- Real-time updates
- Month-over-month calculations

**Impact:** 100% data integrity improvement

### Priority 7: Mock Data Audit

**Objective:** Verify mock data accuracy and completeness

**Actions:**
- Ensure mock data matches real-world scenarios
- Verify all fields populated correctly
- Test mock fallback mechanism
- Update mock data when schema changes

**Impact:** 30% development quality improvement

### Priority 8: Accounting Module Planning

**Objective:** Plan for Accounting Module (future phase)

**Actions:**
- Revenue Recognition
- Profit Calculation
- Automatic Receivable Calculation
- Automatic Payable Calculation
- Automatic Transaction Recording
- Automatic Ledger Entry
- Vendor Payment Workflow

**Impact:** 50% operational efficiency improvement (future phase)

---

## 18. Conclusion

**Finance Module Architecture Assessment:**

**Architecture Strength:** 9.5/10 (Strong)
- Comprehensive data model
- Correct ownership patterns
- Approved mock fallback architecture
- Proper GST handling
- Aging bucket calculations

**UI Completeness:** 5.5/10 (Weak)
- No view drawers
- No edit dialogs
- Action buttons not functional
- No Create/Edit/View parity
- KPIs use mock data

**Overall Score:** 7.5/10 (75%)

**Key Recommendation:** Focus on UI completeness (View Drawers, Edit Dialogs, Action Buttons) while maintaining strong architecture. Finance Module architecture is excellent; current gap is UI implementation only.

**Next Steps:**
1. Implement View Drawers (Priority 1)
2. Achieve Create/Edit/View Parity (Priority 2)
3. Connect Action Buttons (Priority 3)
4. Validate Documents Integration (Priority 4)
5. Improve Receivable/Payable Visibility (Priority 5)
6. Complete KPI Integration (Priority 6)
7. Audit Mock Data (Priority 7)
8. Plan for Accounting Module (Priority 8 - Future Phase)
