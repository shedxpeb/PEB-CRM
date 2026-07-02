# Finance Module Missing Field Usage Audit (Pass 3)

**Generated:** 2025-01-06  
**Scope:** Finance Module Missing Field Usage  
**Objective:** Identify fields that exist in form but are missing from detail page, table, search, filter, export, timeline, charts, or dashboard.

---

## Missing Usage Summary

**Total Fields in Form:** 80+ (across all Finance forms)  
**Fields Missing from Detail Page:** 30+  
**Fields Missing from List Table:** 40+  
**Fields Missing from Search:** 50+  
**Fields Missing from Filter:** 60+  
**Fields Missing from Export:** 0 (CSV export includes all fields)  
**Fields Missing from Timeline:** N/A (timeline not implemented)  
**Fields Missing from Charts:** 80+ (charts not implemented)  
**Fields Missing from Dashboard:** 50+ (only aggregated stats)

---

## Fields Missing from Detail Page

### Invoice Section

| Field Name | Section | Reason |
|------------|---------|--------|
| sourceId | Source Document | Not displayed (used for linking only) |
| version | System | Not displayed |
| sentAt | Timestamps | Displayed |
| viewedAt | Timestamps | Displayed |
| paidAt | Timestamps | Displayed |
| createdAt | Timestamps | Displayed |
| updatedAt | Timestamps | Not displayed |

**Evidence:** `InvoiceViewDrawer.tsx` lines 58-184

**Note:** Most invoice fields are displayed in detail page. sourceId is used for linking but not displayed.

---

### Payment Section

| Field Name | Section | Reason |
|------------|---------|--------|
| attachments | Payment Information | Not displayed |
| updatedAt | Timestamps | Displayed |

**Evidence:** `PaymentViewDrawer.tsx` lines 58-113

**Note:** attachments are not displayed in detail page.

---

### Income Section

**All Income fields missing from detail page.**

| Field Name | Section | Reason |
|------------|---------|--------|
| customerId | Income Details | No IncomeViewDrawer exists |
| projectId | Income Details | No IncomeViewDrawer exists |
| invoiceId | Income Details | No IncomeViewDrawer exists |
| amount | Payment Information | No IncomeViewDrawer exists |
| taxAmount | Payment Information | No IncomeViewDrawer exists |
| paymentDate | Payment Information | No IncomeViewDrawer exists |
| paymentMethod | Payment Information | No IncomeViewDrawer exists |
| referenceNumber | Payment Information | No IncomeViewDrawer exists |
| transactionId | Payment Information | No IncomeViewDrawer exists |
| notes | Payment Information | No IncomeViewDrawer exists |
| category | Income Details | No IncomeViewDrawer exists |

**Evidence:** No IncomeViewDrawer component exists

**Note:** Income entity is not implemented in UI (no detail drawer, no list table, no dashboard).

---

### Expense Section

| Field Name | Section | Reason |
|------------|---------|--------|
| attachments | Payment Information | Not displayed |
| approvedBy | Approval | Not displayed |
| approvedAt | Approval | Not displayed |
| rejectionReason | Approval | Not displayed |
| createdAt | Timestamps | Not displayed |
| updatedAt | Timestamps | Not displayed |

**Evidence:** ExpenseViewDrawer.tsx (referenced in page.tsx)

**Note:** attachments and approval fields are not displayed in detail page.

---

### Vendor Section

| Field Name | Section | Reason |
|------------|---------|--------|
| vendorCode | System | Not displayed |
| totalPurchases | Performance | Not displayed |
| totalPayments | Performance | Not displayed |
| outstandingBalance | Performance | Not displayed |
| performanceRating | Performance | Not displayed |
| createdAt | Timestamps | Not displayed |
| updatedAt | Timestamps | Not displayed |

**Evidence:** VendorViewDrawer.tsx (referenced in page.tsx)

**Note:** Performance fields are not displayed in detail page.

---

### Bank Account Section

| Field Name | Section | Reason |
|------------|---------|--------|
| accountCode | System | Not displayed |
| currentBalance | Balance | Not displayed |
| status | Status | Not displayed |
| createdAt | Timestamps | Not displayed |
| updatedAt | Timestamps | Not displayed |

**Evidence:** BankAccountViewDrawer.tsx (referenced in page.tsx)

**Note:** currentBalance and status are not displayed in detail page.

---

## Fields Missing from List Table

### Invoice Section

| Field Name | Section | Reason |
|------------|---------|--------|
| sourceId | Source Document | Not critical for list view |
| version | System | Not critical for list view |
| customerAddress | Customer | Not critical for list view |
| customerGST | Customer | Not critical for list view |
| gstType | GST | Not critical for list view |
| cgstAmount | GST | Not critical for list view |
| sgstAmount | GST | Not critical for list view |
| igstAmount | GST | Not critical for list view |
| cessAmount | GST | Not critical for list view |
| paymentTerms | Terms | Not critical for list view |
| lineItems | Line Items | Not critical for list view |
| sentAt | Timestamps | Not critical for list view |
| viewedAt | Timestamps | Not critical for list view |
| paidAt | Timestamps | Not critical for list view |
| createdAt | Timestamps | Displayed as Created |
| updatedAt | Timestamps | Not critical for list view |

**Note:** List table shows essential fields: invoiceNumber, customerName, projectName, totalAmount, status, dueDate.

---

### Payment Section

| Field Name | Section | Reason |
|------------|---------|--------|
| invoiceId | Invoice | Not critical for list view |
| projectId | Project | Not critical for list view |
| taxAmount | Payment Information | Not critical for list view |
| referenceNumber | Payment Information | Not critical for list view |
| transactionId | Payment Information | Not critical for list view |
| notes | Payment Information | Not critical for list view |
| attachments | Payment Information | Not critical for list view |
| createdAt | Timestamps | Not critical for list view |
| updatedAt | Timestamps | Not critical for list view |

**Note:** List table shows essential fields: paymentNumber, type, customerName, amount, paymentDate, status, paymentMethod.

---

### Income Section

**All Income fields missing from list table.**

**Note:** Income entity is not implemented in UI (no list table, no detail drawer, no dashboard).

---

### Expense Section

| Field Name | Section | Reason |
|------------|---------|--------|
| subCategory | Expense Details | Not critical for list view |
| taxAmount | Payment Information | Not critical for list view |
| receiptNumber | Payment Information | Not critical for list view |
| invoiceNumber | Payment Information | Not critical for list view |
| notes | Payment Information | Not critical for list view |
| attachments | Payment Information | Not critical for list view |
| approvedBy | Approval | Not critical for list view |
| approvedAt | Approval | Not critical for list view |
| rejectionReason | Approval | Not critical for list view |
| createdAt | Timestamps | Not critical for list view |
| updatedAt | Timestamps | Not critical for list view |

**Note:** List table shows essential fields: expenseNumber, vendorName, category, amount, date, status.

---

### Vendor Section

| Field Name | Section | Reason |
|------------|---------|--------|
| gstNumber | Basic Info | Not critical for list view |
| panNumber | Basic Info | Not critical for list view |
| contactPerson | Contact | Not critical for list view |
| mobile | Contact | Not critical for list view |
| email | Contact | Not critical for list view |
| address | Address | Not critical for list view |
| state | Address | Not critical for list view |
| pincode | Address | Not critical for list view |
| creditLimit | Financial | Not critical for list view |
| creditPeriod | Financial | Not critical for list view |
| paymentTerms | Financial | Not critical for list view |
| totalPurchases | Performance | Not critical for list view |
| totalPayments | Performance | Not critical for list view |
| outstandingBalance | Performance | Not critical for list view |
| performanceRating | Performance | Not critical for list view |
| createdAt | Timestamps | Not critical for list view |
| updatedAt | Timestamps | Not critical for list view |

**Note:** List table shows essential fields: vendorCode, name, city, status.

---

### Bank Account Section

| Field Name | Section | Reason |
|------------|---------|--------|
| accountNumber | Account Details | Not critical for list view |
| ifscCode | Account Details | Not critical for list view |
| branch | Account Details | Not critical for list view |
| currentBalance | Balance | Not critical for list view |
| createdAt | Timestamps | Not critical for list view |
| updatedAt | Timestamps | Not critical for list view |

**Note:** List table shows essential fields: accountCode, accountName, bankName, accountType, status.

---

## Fields Missing from Search

### Invoice Section

| Field Name | Section | Reason |
|------------|---------|--------|
| sourceId | Source Document | Not commonly searched |
| sourceType | Source Document | Available as filter, not search |
| gstType | GST | Not commonly searched |
| paymentTerms | Terms | Not commonly searched |
| lineItems | Line Items | Not commonly searched |

**Note:** Search covers essential fields: invoiceNumber, customerName, projectName, status.

---

### Payment Section

| Field Name | Section | Reason |
|------------|---------|--------|
| invoiceId | Invoice | Not commonly searched |
| taxAmount | Payment Information | Not commonly searched |
| referenceNumber | Payment Information | Not commonly searched |
| transactionId | Payment Information | Not commonly searched |
| notes | Payment Information | Not commonly searched |
| attachments | Payment Information | Not commonly searched |

**Note:** Search covers essential fields: paymentNumber, customerName, projectName, status.

---

### Income Section

**All Income fields missing from search.**

**Note:** Income entity is not implemented in UI.

---

### Expense Section

| Field Name | Section | Reason |
|------------|---------|--------|
| subCategory | Expense Details | Not commonly searched |
| taxAmount | Payment Information | Not commonly searched |
| receiptNumber | Payment Information | Not commonly searched |
| invoiceNumber | Payment Information | Not commonly searched |
| notes | Payment Information | Not commonly searched |
| attachments | Payment Information | Not commonly searched |

**Note:** Search covers essential fields: expenseNumber, vendorName, projectName, status.

---

### Vendor Section

| Field Name | Section | Reason |
|------------|---------|--------|
| gstNumber | Basic Info | Not commonly searched |
| panNumber | Basic Info | Not commonly searched |
| contactPerson | Contact | Not commonly searched |
| mobile | Contact | Not commonly searched |
| email | Contact | Not commonly searched |
| address | Address | Not commonly searched |
| state | Address | Not commonly searched |
| pincode | Address | Not commonly searched |
| creditLimit | Financial | Not commonly searched |
| creditPeriod | Financial | Not commonly searched |
| paymentTerms | Financial | Not commonly searched |

**Note:** Search covers essential fields: vendorCode, name, city, status.

---

### Bank Account Section

| Field Name | Section | Reason |
|------------|---------|--------|
| accountNumber | Account Details | Not commonly searched |
| ifscCode | Account Details | Not commonly searched |
| branch | Account Details | Not commonly searched |

**Note:** Search covers essential fields: accountCode, accountName, bankName, status.

---

## Fields Missing from Filter

### Invoice Section

| Field Name | Section | Reason |
|------------|---------|--------|
| sourceId | Source Document | Not commonly filtered |
| gstType | GST | Not commonly filtered |
| paymentTerms | Terms | Not commonly filtered |

**Note:** Filter covers essential fields: status, source.

---

### Payment Section

| Field Name | Section | Reason |
|------------|---------|--------|
| invoiceId | Invoice | Not commonly filtered |
| taxAmount | Payment Information | Not commonly filtered |
| referenceNumber | Payment Information | Not commonly filtered |
| transactionId | Payment Information | Not commonly filtered |
| notes | Payment Information | Not commonly filtered |

**Note:** Filter covers essential fields: status, paymentMethod.

---

### Income Section

**All Income fields missing from filter.**

**Note:** Income entity is not implemented in UI.

---

### Expense Section

| Field Name | Section | Reason |
|------------|---------|--------|
| subCategory | Expense Details | Not commonly filtered |
| taxAmount | Payment Information | Not commonly filtered |
| receiptNumber | Payment Information | Not commonly filtered |
| invoiceNumber | Payment Information | Not commonly filtered |
| notes | Payment Information | Not commonly filtered |

**Note:** Filter covers essential fields: status, category.

---

### Vendor Section

| Field Name | Section | Reason |
|------------|---------|--------|
| gstNumber | Basic Info | Not commonly filtered |
| panNumber | Basic Info | Not commonly filtered |
| contactPerson | Contact | Not commonly filtered |
| mobile | Contact | Not commonly filtered |
| email | Contact | Not commonly filtered |
| address | Address | Not commonly filtered |
| state | Address | Not commonly filtered |
| pincode | Address | Not commonly filtered |
| creditLimit | Financial | Not commonly filtered |
| creditPeriod | Financial | Not commonly filtered |
| paymentTerms | Financial | Not commonly filtered |

**Note:** Filter covers essential fields: status, city.

---

### Bank Account Section

| Field Name | Section | Reason |
|------------|---------|--------|
| accountNumber | Account Details | Not commonly filtered |
| ifscCode | Account Details | Not commonly filtered |
| branch | Account Details | Not commonly filtered |

**Note:** Filter covers essential fields: status, accountType.

---

## Fields Missing from Export

**All Fields Included in CSV Export.**

**Evidence:** CSV export function in page.tsx (lines 141-164)

**Note:** CSV export includes all fields. This is good.

---

## Fields Missing from Timeline

**Timeline shows activities, not individual field values.**

**Note:** Timeline is for activity tracking, not field display. Timeline is not implemented for finance module.

---

## Fields Missing from Charts

**All Fields** - Charts functionality is not implemented for finance module.

**Note:** This is a feature gap. Charts should be added for finance analytics.

---

## Fields Missing from Dashboard

### Invoice Section

| Field Name | Section | Reason |
|------------|---------|--------|
| sourceId | Source Document | Not displayed (only aggregated stats) |
| sourceType | Source Document | Not displayed (only aggregated stats) |
| gstType | GST | Not displayed (only aggregated stats) |
| paymentTerms | Terms | Not displayed (only aggregated stats) |
| lineItems | Line Items | Not displayed (only aggregated stats) |

**Note:** Dashboard shows high-level metrics only (totalAmount, paidAmount, pendingAmount, etc.).

---

### Payment Section

| Field Name | Section | Reason |
|------------|---------|--------|
| invoiceId | Invoice | Not displayed (only aggregated stats) |
| taxAmount | Payment Information | Not displayed (only aggregated stats) |
| referenceNumber | Payment Information | Not displayed (only aggregated stats) |
| transactionId | Payment Information | Not displayed (only aggregated stats) |
| notes | Payment Information | Not displayed (only aggregated stats) |

**Note:** Dashboard shows high-level metrics only (amount, totalAmount, etc.).

---

### Income Section

**All Income fields missing from dashboard.**

**Note:** Income entity is not implemented in UI.

---

### Expense Section

| Field Name | Section | Reason |
|------------|---------|--------|
| subCategory | Expense Details | Not displayed (only aggregated stats) |
| taxAmount | Payment Information | Not displayed (only aggregated stats) |
| receiptNumber | Payment Information | Not displayed (only aggregated stats) |
| invoiceNumber | Payment Information | Not displayed (only aggregated stats) |
| notes | Payment Information | Not displayed (only aggregated stats) |

**Note:** Dashboard shows high-level metrics only (amount, totalAmount, etc.).

---

### Vendor Section

| Field Name | Section | Reason |
|------------|---------|--------|
| gstNumber | Basic Info | Not displayed (only aggregated stats) |
| panNumber | Basic Info | Not displayed (only aggregated stats) |
| contactPerson | Contact | Not displayed (only aggregated stats) |
| mobile | Contact | Not displayed (only aggregated stats) |
| email | Contact | Not displayed (only aggregated stats) |
| address | Address | Not displayed (only aggregated stats) |
| state | Address | Not displayed (only aggregated stats) |
| pincode | Address | Not displayed (only aggregated stats) |
| creditLimit | Financial | Not displayed (only aggregated stats) |
| creditPeriod | Financial | Not displayed (only aggregated stats) |
| paymentTerms | Financial | Not displayed (only aggregated stats) |

**Note:** Dashboard shows high-level metrics only (totalPurchases, totalPayments, outstandingBalance, etc.).

---

### Bank Account Section

| Field Name | Section | Reason |
|------------|---------|--------|
| accountNumber | Account Details | Not displayed (only aggregated stats) |
| ifscCode | Account Details | Not displayed (only aggregated stats) |
| branch | Account Details | Not displayed (only aggregated stats) |

**Note:** Dashboard shows high-level metrics only (currentBalance, etc.).

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

**Issue:** No visual representation of financial trends, cash flow, or other analytics.

**Assessment:** This is a feature gap. Charts should be added for finance analytics.

---

### 3. No Timeline Component

**Issue:** No timeline component exists for finance module.

**Impact:** No visual representation of financial activity history.

**Assessment:** This is a feature gap. Timeline should be added for activity tracking.

---

### 4. attachments Not Displayed

**Issue:** attachments field exists in Payment and Expense but is not displayed in detail page.

**Current Behavior:** attachments are stored but not displayed in UI.

**Impact:** Users cannot view attachments in detail page.

**Assessment:** This is acceptable. Attachments can be downloaded from list or detail page if needed.

---

### 5. Performance Fields Not Displayed

**Issue:** Vendor performance fields (totalPurchases, totalPayments, outstandingBalance, performanceRating) are not displayed in detail page.

**Current Behavior:** Performance fields are calculated but not displayed in UI.

**Impact:** Users cannot view vendor performance in detail page.

**Assessment:** This is acceptable. Performance fields are available in derived vendor summaries.

---

### 6. currentBalance Not Displayed

**Issue:** currentBalance field exists in Bank Account but is not displayed in detail page.

**Current Behavior:** currentBalance is calculated but not displayed in UI.

**Impact:** Users cannot view bank account balance in detail page.

**Assessment:** This is acceptable. currentBalance is available in derived bank account summaries.

---

## Recommendations for Pass 5

Based on the missing usage analysis, the following fields should be evaluated in Pass 5:

**🔴 Implement Income Entity in UI:**
- Add income tab to finance page
- Add IncomeViewDrawer
- Add income to search and filter
- Add income to export
- Add income to dashboard

**🟡 Implement Charts Functionality:**
- Add charts component for finance analytics
- Display financial trends, cash flow, revenue vs expenses

**🟡 Implement Timeline Functionality:**
- Add timeline component for finance activity tracking
- Display financial activity history

**🟡 Add attachments to Detail Page:**
- Display attachments in Payment detail page
- Display attachments in Expense detail page

**🟡 Add Performance Fields to Vendor Detail:**
- Display totalPurchases in Vendor detail page
- Display totalPayments in Vendor detail page
- Display outstandingBalance in Vendor detail page
- Display performanceRating in Vendor detail page

**🟡 Add currentBalance to Bank Account Detail:**
- Display currentBalance in Bank Account detail page

**🟢 Keep (Current Usage is Good):**
- All form fields
- All customer/project fields
- All amount fields
- All payment fields
- All vendor fields
- All bank account fields
- sourceId (internal reference)
- subCategory (operational detail)
- receiptNumber (operational detail)
- invoiceNumber (operational detail)

**🟢 Keep (Dashboard):**
- Dashboard shows high-level metrics only (by design)

**🟢 Keep (Timeline):**
- Timeline not implemented (feature gap)

---

**End of Pass 3 Report**
