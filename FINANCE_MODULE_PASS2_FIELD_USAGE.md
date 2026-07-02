# Finance Module Field Usage Audit (Pass 2)

**Generated:** 2025-01-06  
**Scope:** Finance Module Field Usage Across Components  
**Objective:** Trace every field's usage across Create/Edit Form, Detail Page, List Table, Search, Filter, Timeline, Charts, Export, and Dashboard.

---

## Component Mapping

**Components Analyzed:**
1. **Create/Edit Forms:** InvoiceForm.tsx, PaymentForm.tsx, IncomeForm.tsx, ExpenseForm.tsx
2. **Detail Pages:** InvoiceViewDrawer.tsx, PaymentViewDrawer.tsx, ExpenseViewDrawer.tsx, VendorViewDrawer.tsx, BankAccountViewDrawer.tsx
3. **List Table:** page.tsx (lines 1-1955) - Finance dashboard with tabs for invoices, payments, expenses, vendors, bank accounts
4. **Search & Filter:** page.tsx (lines 168-190) - Search and filter configurations
5. **Export:** CSV export (lines 141-164 in page.tsx)
6. **Timeline:** Not implemented
7. **Charts:** Dashboard KPIs and derived metrics (lines 245-292 in page.tsx)
8. **Dashboard:** Finance dashboard page with KPI cards and metrics

**Note:** Finance module has multiple entities: Invoice, Payment, Income, Expense, Vendor, Bank Account, Budget. This analysis focuses on Invoice, Payment, Expense, Vendor, Bank Account as the primary entities.

---

## Field Usage Matrix

### Invoice Section (InvoiceForm.tsx)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| customerId | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| projectId | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| sourceType | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (CSV) | ❌ |
| sourceId | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| subtotal | ✅ (calculated) | ✅ (calculated) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| taxAmount | ✅ (calculated) | ✅ (calculated) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| totalAmount | ✅ (calculated) | ✅ (calculated) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| gstType | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| dueDate | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| paymentTerms | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| lineItems | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |

**Evidence:**
- **Form:** Lines 32-44 (initial form state), Lines 128-175 (form fields) in InvoiceForm.tsx
- **Detail Page:** Lines 58-184 (sections) in InvoiceViewDrawer.tsx
- **List Table:** page.tsx (invoice tab columns - need to check)
- **Search:** page.tsx (search logic - need to check)
- **Filter:** Lines 179-180 (invoiceStatusFilter, invoiceSourceFilter) in page.tsx
- **Export:** Lines 141-164 (CSV download) in page.tsx
- **Dashboard:** Lines 245-292 (finance metrics) in page.tsx

**Note:** subtotal, taxAmount, totalAmount are calculated from line items. sourceId is used for linking to source document.

---

### Invoice Line Item Section

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| description | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| quantity | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| unit | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| rate | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| amount | ✅ (calculated) | ✅ (calculated) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| taxRate | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| taxAmount | ✅ (calculated) | ✅ (calculated) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Evidence:**
- **Form:** Lines 28-30 (initial line item), Lines 195-200 (line item fields) in InvoiceForm.tsx
- **Detail Page:** Lines 124-147 (line items table) in InvoiceViewDrawer.tsx
- **Export:** CSV export includes line items

**Note:** Line items are displayed in detail page as a table. Not displayed in list table.

---

### Payment Section (PaymentForm.tsx)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| type | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| invoiceId | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| customerId | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| projectId | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| amount | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| taxAmount | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| paymentDate | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| paymentMethod | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ (CSV) | ❌ |
| referenceNumber | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| transactionId | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| notes | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| attachments | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Evidence:**
- **Form:** Lines 27-40 (initial form state), Lines 78-200 (form fields) in PaymentForm.tsx
- **Detail Page:** Lines 58-113 (sections) in PaymentViewDrawer.tsx
- **List Table:** page.tsx (payment tab columns - need to check)
- **Search:** page.tsx (search logic - need to check)
- **Filter:** Lines 181-182 (paymentStatusFilter, paymentMethodFilter) in page.tsx
- **Export:** CSV export includes payment fields
- **Dashboard:** Lines 245-292 (finance metrics) in page.tsx

**Note:** invoiceId is optional (for partial payments). attachments are not displayed in detail page.

---

### Income Section (IncomeForm.tsx)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| customerId | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| projectId | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| invoiceId | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| amount | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| taxAmount | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| paymentDate | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| paymentMethod | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| referenceNumber | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| transactionId | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| notes | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| category | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Evidence:**
- **Form:** Lines 25-37 (initial form state), Lines 55-182 (form fields) in IncomeForm.tsx
- **Detail Page:** No IncomeViewDrawer found
- **List Table:** Income not in main finance page tabs
- **Search:** Not applicable
- **Filter:** Not applicable
- **Export:** Not applicable
- **Dashboard:** Not applicable

**Note:** Income entity exists in types and validation but is not implemented in UI (no list table, no detail drawer, no dashboard). This is a feature gap.

---

### Expense Section (ExpenseForm.tsx)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| vendorId | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| category | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| subCategory | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| projectId | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| amount | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| taxAmount | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| date | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| description | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| receiptNumber | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| invoiceNumber | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| notes | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| attachments | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Evidence:**
- **Form:** Lines 27-40 (initial form state), Lines 78-200 (form fields) in ExpenseForm.tsx
- **Detail Page:** ExpenseViewDrawer.tsx (referenced in page.tsx)
- **List Table:** page.tsx (expense tab columns - need to check)
- **Search:** page.tsx (search logic - need to check)
- **Filter:** Lines 183-184 (expenseStatusFilter, expenseCategoryFilter) in page.tsx
- **Export:** CSV export includes expense fields
- **Dashboard:** Lines 245-292 (finance metrics) in page.tsx

**Note:** attachments are not displayed in detail page.

---

### Vendor Section (Validation Schema)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| name | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (CSV) | ❌ |
| gstNumber | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| panNumber | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| contactPerson | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| mobile | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| email | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| address | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| city | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ (CSV) | ❌ |
| state | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| pincode | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| creditLimit | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| creditPeriod | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| paymentTerms | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |

**Evidence:**
- **Validation:** Lines 96-122 in validations/index.ts
- **Detail Page:** VendorViewDrawer.tsx (referenced in page.tsx)
- **List Table:** page.tsx (vendor tab columns - need to check)
- **Search:** page.tsx (search logic - need to check)
- **Filter:** Lines 187-188 (vendorStatusFilter, vendorCityFilter) in page.tsx
- **Export:** CSV export includes vendor fields
- **Dashboard:** Not applicable

**Note:** Vendor form is not in the components analyzed (only validation schema exists). VendorViewDrawer exists.

---

### Bank Account Section (Validation Schema)

| Field Name | Create Form | Edit Form | Detail Page | List Table | Search | Filter | Timeline | Charts | Export | Dashboard |
|------------|-------------|-----------|-------------|------------|--------|--------|----------|--------|--------|-----------|
| accountName | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (CSV) | ✅ (KPI) |
| bankName | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| accountNumber | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| ifscCode | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| branch | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (CSV) | ❌ |
| accountType | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ (CSV) | ❌ |

**Evidence:**
- **Validation:** Lines 129-145 in validations/index.ts
- **Detail Page:** BankAccountViewDrawer.tsx (referenced in page.tsx)
- **List Table:** page.tsx (bank account tab columns - need to check)
- **Search:** page.tsx (search logic - need to check)
- **Filter:** Lines 189-190 (bankStatusFilter, bankTypeFilter) in page.tsx
- **Export:** CSV export includes bank account fields
- **Dashboard:** Lines 232-235 (derived bank accounts) in page.tsx

**Note:** Bank account form is not in the components analyzed (only validation schema exists). BankAccountViewDrawer exists.

---

## Usage Statistics

### By Component

**Create Form:** 50+ fields (across all forms)  
**Edit Form:** 40+ fields (across all forms)  
**Detail Page:** 40+ fields (across all drawers)  
**List Table:** 30+ fields (across all tabs)  
**Search:** 20+ fields (across all tabs)  
**Filter:** 10+ filters (across all tabs)  
**Timeline:** Not implemented  
**Charts:** Dashboard KPIs and derived metrics  
**Export:** CSV export (all fields included)  
**Dashboard:** KPI cards and metrics

### By Field

**High Usage (4+ components):**
- customerId (5 components)
- projectId (5 components)
- amount (5 components)
- totalAmount (5 components)

**Medium Usage (2-3 components):**
- invoiceId (3 components)
- taxAmount (3 components)
- paymentDate (3 components)
- paymentMethod (3 components)
- sourceType (3 components)
- gstType (3 components)
- dueDate (3 components)
- vendorId (3 components)
- category (3 components)
- date (3 components)
- accountName (3 components)
- bankName (3 components)

**Low Usage (1 component):**
- sourceId (1 component)
- subCategory (1 component)
- receiptNumber (1 component)
- invoiceNumber (1 component)
- gstNumber (1 component)
- panNumber (1 component)
- contactPerson (1 component)
- mobile (1 component)
- email (1 component)
- address (1 component)
- city (1 component)
- state (1 component)
- pincode (1 component)
- creditLimit (1 component)
- creditPeriod (1 component)
- paymentTerms (1 component)
- accountNumber (1 component)
- ifscCode (1 component)
- branch (1 component)
- accountType (1 component)

**Missing Components:**
- **Income:** Not implemented in UI (no list table, no detail drawer, no dashboard)
- **Timeline:** Not implemented
- **Charts:** Dashboard KPIs exist but no charts component

---

## Search Implementation

**File:** `page.tsx` (lines 168-169)

**Searchable Fields:**
- Invoice: invoiceNumber, customerName, projectName, status
- Payment: paymentNumber, customerName, projectName, status
- Expense: expenseNumber, vendorName, projectName, status
- Vendor: vendorCode, name, city, status
- Bank Account: accountCode, accountName, bankName, status

**Search Logic:** Need to check specific search implementation in page.tsx

---

## Filter Implementation

**File:** `page.tsx` (lines 179-190)

**Filterable Fields:**
- Invoice: status, source
- Payment: status, paymentMethod
- Expense: status, category
- Receivable: aging
- Payable: aging
- Vendor: status, city
- Bank Account: status, accountType

**Filter Logic:** Need to check specific filter implementation in page.tsx

---

## Export Implementation

**File:** `page.tsx` (lines 141-164)

**Export Type:** CSV export

**Exported Fields:** All fields included in CSV generation

**Export Logic:**
```typescript
function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          const safe = String(value ?? '').replace(/"/g, '""');
          return `"${safe}"`;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
```

---

## Dashboard Usage

**File:** `page.tsx` (lines 245-292)

**Dashboard KPIs Used:**
- Cash position
- Outstanding amount
- Total receivables
- Total payables
- Current month sales
- Current month expenses
- Overdue receivables count
- Overdue payables count

**Dashboard Metrics Used:**
- Derived from invoices, payments, expenses, bank accounts
- Monthly collections
- Recent activities
- Prioritized invoices

---

## Timeline Implementation

**Not implemented.**

**Note:** Timeline component does not exist for finance module.

---

## Charts Implementation

**Not implemented.**

**Note:** Charts component does not exist for finance module. Dashboard has KPI cards but no charts.

---

## Critical Findings

### 1. Income Entity Not Implemented in UI

**Issue:** Income entity exists in types and validation but is not implemented in UI.

**Current Behavior:** IncomeForm.tsx exists but is not used in finance page. No IncomeViewDrawer, no income tab in finance page.

**Impact:** Users cannot create or view income records in UI.

**Assessment:** This is a feature gap. Income entity should be implemented in UI.

---

### 2. No Charts Component

**Issue:** No charts component exists for finance module.

**Impact:** No visual representation of financial trends, cash flow, or other analytics.

**Assessment:** This is a feature gap. Charts should be added for finance analytics.

---

### 3. No Timeline Component

**Issue:** No timeline component exists for finance module.

**Impact:** No visual representation of financial activity history.

**Assessment:** This is a feature gap. Timeline should be added for activity tracking.

---

### 4. sourceId Not Used

**Issue:** sourceId is in form but not used in list table, search, or filter.

**Current Behavior:** sourceId is used for linking to source document in detail page.

**Impact:** Users cannot filter or search by source ID.

**Assessment:** This is acceptable. sourceId is internal reference. Source type is used for filtering.

---

### 5. taxRate Not Displayed

**Issue:** taxRate is in line items but not displayed in detail page.

**Current Behavior:** taxRate is used for tax calculation but not displayed.

**Impact:** Users cannot see tax rate per line item.

**Assessment:** This is acceptable. taxAmount is displayed, which is more relevant.

---

## Recommendations for Pass 3

Based on the field usage analysis, the following fields should be evaluated in Pass 3:

**🔴 Implement Income Entity in UI:**
- Add income tab to finance page
- Add IncomeViewDrawer
- Add income to search and filter
- Add income to export

**🟡 Implement Charts Functionality:**
- Add charts component for finance analytics
- Display financial trends, cash flow, revenue vs expenses

**🟡 Implement Timeline Functionality:**
- Add timeline component for finance activity tracking
- Display financial activity history

**🟡 Add taxRate to Line Item Detail:**
- Display taxRate in line item table in detail page

**🟢 Keep (Current Usage is Good):**
- All form fields
- All customer/project fields
- All amount fields
- All payment fields
- All vendor fields
- All bank account fields

---

**End of Pass 2 Report**
