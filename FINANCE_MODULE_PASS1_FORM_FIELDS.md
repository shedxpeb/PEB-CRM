# Finance Module Form Field Audit (Pass 1)

**Generated:** 2025-01-06  
**Scope:** Finance Module Form Fields  
**Objective:** Identify all form fields in Finance Create/Edit forms with details.

---

## Form Information

**Components Analyzed:**
- InvoiceForm.tsx (lines 1-326)
- PaymentForm.tsx (lines 1-231)
- IncomeForm.tsx (lines 1-197)
- ExpenseForm.tsx (lines 1-224)
- VendorForm.tsx (referenced in validation schema)
- BankAccountForm.tsx (referenced in validation schema)
- Validation Schema: validations/index.ts (lines 1-179)
- Type Definition: types/index.ts (lines 1-782)

**Architecture Note:** Finance module is the central financial control system - connects Customers, Projects, Inventory, Vendors, GST. Finance module has multiple entities: Invoice, Payment, Income, Expense, Vendor, Bank Account, Budget, Transaction, Ledger Entry, Receivable, Payable.

**Form Sections:**
1. Invoice Form (InvoiceForm.tsx)
2. Payment Form (PaymentForm.tsx)
3. Income Form (IncomeForm.tsx)
4. Expense Form (ExpenseForm.tsx)
5. Vendor Form (validation schema)
6. Bank Account Form (validation schema)
7. Budget Form (validation schema)

---

## Field Inventory

### Section 1: Invoice Form (InvoiceForm.tsx)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| customerId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Invoice Details |
| projectId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Invoice Details |
| sourceType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Manual | Must be Estimate, Proposal, Quotation, Project, Manual | Invoice Details |
| sourceId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Invoice Details |
| subtotal | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | Must be positive | Calculated |
| taxAmount | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | Must be positive | Calculated |
| totalAmount | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | Must be positive | Calculated |
| gstType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | CGST | Must be CGST, SGST, IGST, CESS | Invoice Details |
| dueDate | date | ✅ Yes | ❌ No | ❌ No | ❌ No | Current date | Date format | Invoice Details |
| paymentTerms | string | ✅ Yes | ❌ No | ❌ No | ❌ No | Net 30 | Min 2 char, Max 200 char | Invoice Details |
| lineItems | array | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 item | Line Items |

**Evidence:** Lines 32-44 (initial form state), Lines 128-175 (form fields), Lines 28-30 (line items)

**Line Item Fields:**
| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| description | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 char | Line Item |
| quantity | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 1 | Must be positive | Line Item |
| unit | string | ✅ Yes | ❌ No | ❌ No | ❌ No | Nos | Min 1 char | Line Item |
| rate | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 0 | Must be positive | Line Item |
| amount | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | Must be positive | Line Item |
| taxRate | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 18 | Must be 0-100 | Line Item |
| taxAmount | number | ❌ No | ✅ Yes | ❌ No | ✅ Yes | Calculated | Must be positive | Line Item |

**Evidence:** Lines 28-30 (initial line item), Lines 195-200 (line item fields)

**Notes:**
- subtotal, taxAmount, totalAmount are calculated from line items
- gstType defaults to CGST
- dueDate defaults to current date
- paymentTerms defaults to Net 30
- line items must have at least 1 item

---

### Section 2: Payment Form (PaymentForm.tsx)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| type | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Stage | Must be Advance, Stage, Partial, Full, Refund | Payment Details |
| invoiceId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Payment Details |
| customerId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Payment Details |
| projectId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Payment Details |
| amount | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 0 | Must be positive | Payment Information |
| taxAmount | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 0 | Must be positive | Payment Information |
| paymentDate | date | ✅ Yes | ❌ No | ❌ No | ❌ No | Current date | Date format | Payment Information |
| paymentMethod | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Bank Transfer | Must be valid payment method | Payment Information |
| referenceNumber | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Payment Information |
| transactionId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Payment Information |
| notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Max 500 char | Payment Information |
| attachments | array | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Payment Information |

**Evidence:** Lines 27-40 (initial form state), Lines 78-135 (form fields), Lines 144-200 (payment information)

**Notes:**
- type defaults to Stage
- paymentDate defaults to current date
- paymentMethod defaults to Bank Transfer
- invoiceId is optional (for partial payments)

---

### Section 3: Income Form (IncomeForm.tsx)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| customerId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Income Details |
| projectId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Income Details |
| invoiceId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Income Details |
| amount | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 0 | Must be positive | Payment Information |
| taxAmount | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 0 | Must be positive | Payment Information |
| paymentDate | date | ✅ Yes | ❌ No | ❌ No | ❌ No | Current date | Date format | Payment Information |
| paymentMethod | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Bank Transfer | Must be valid payment method | Payment Information |
| referenceNumber | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Payment Information |
| transactionId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Payment Information |
| notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Max 500 char | Payment Information |
| category | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Project Revenue | Must be valid income category | Income Details |

**Evidence:** Lines 25-37 (initial form state), Lines 55-101 (form fields), Lines 110-182 (payment information)

**Notes:**
- category defaults to Project Revenue
- paymentDate defaults to current date
- paymentMethod defaults to Bank Transfer
- invoiceId is optional (for linking to invoice)

---

### Section 4: Expense Form (ExpenseForm.tsx)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| vendorId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Expense Details |
| category | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | Material Purchase | Must be valid expense category | Expense Details |
| subCategory | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Expense Details |
| projectId | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Expense Details |
| amount | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 0 | Must be positive | Payment Information |
| taxAmount | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 0 | Must be positive | Payment Information |
| date | date | ✅ Yes | ❌ No | ❌ No | ❌ No | Current date | Date format | Payment Information |
| description | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 char, Max 500 char | Payment Information |
| receiptNumber | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Payment Information |
| invoiceNumber | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Payment Information |
| notes | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Max 500 char | Payment Information |
| attachments | array | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Payment Information |

**Evidence:** Lines 27-40 (initial form state), Lines 78-135 (form fields), Lines 144-200 (payment information)

**Notes:**
- category defaults to Material Purchase
- date defaults to current date
- vendorId is required (expense must be linked to vendor)

---

### Section 5: Vendor Form (Validation Schema)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| name | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 char, Max 100 char | Basic Info |
| gstNumber | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | GST format regex | Basic Info |
| panNumber | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | PAN format regex | Basic Info |
| contactPerson | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 char, Max 100 char | Contact |
| mobile | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Mobile format regex (+91 XXXXX XXXXX) | Contact |
| email | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Email format | Contact |
| address | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 char, Max 500 char | Address |
| city | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 char, Max 50 char | Address |
| state | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 char, Max 50 char | Address |
| pincode | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Pincode format regex (6 digits) | Address |
| creditLimit | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Financial |
| creditPeriod | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive (days) | Financial |
| paymentTerms | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Max 200 char | Financial |

**Evidence:** Lines 96-122 in validations/index.ts

**Notes:**
- gstNumber format: 2 digits + 5 letters + 4 digits + 1 letter + 1 alphanumeric + Z + 1 alphanumeric
- panNumber format: 5 letters + 4 digits + 1 letter
- mobile format: +91 XXXXX XXXXX
- pincode format: 6 digits
- creditPeriod is in days

---

### Section 6: Bank Account Form (Validation Schema)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| accountName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 char, Max 100 char | Account Details |
| bankName | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 char, Max 100 char | Account Details |
| accountNumber | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 8 char, Max 18 char | Account Details |
| ifscCode | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | IFSC format regex (4 letters + 0 + 6 alphanumeric) | Account Details |
| branch | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 2 char, Max 100 char | Account Details |
| accountType | enum | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be Current or Savings | Account Details |

**Evidence:** Lines 129-145 in validations/index.ts

**Notes:**
- ifscCode format: 4 letters + 0 + 6 alphanumeric
- accountType: Current or Savings

---

### Section 7: Budget Form (Validation Schema)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| projectId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Min 1 char | Budget Details |
| plannedBudget | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be positive | Budget Details |
| warningThreshold | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be 0-100 (%) | Budget Details |
| criticalThreshold | number | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must be 0-100 (%) | Budget Details |
| materialBudget | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Budget Breakdown |
| labourBudget | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Budget Breakdown |
| overheadBudget | number | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Must be positive | Budget Breakdown |

**Evidence:** Lines 152-160 in validations/index.ts

**Notes:**
- warningThreshold and criticalThreshold are percentages (0-100)
- materialBudget, labourBudget, overheadBudget are optional budget breakdowns

---

## Summary Statistics

**Total Fields Identified:** 80+ (across all Finance forms)

**By Entity:**
- Invoice: 12 fields + 7 line item fields = 19 fields
- Payment: 12 fields
- Income: 12 fields
- Expense: 13 fields
- Vendor: 13 fields
- Bank Account: 6 fields
- Budget: 7 fields

**By Category:**
- Customer/Project Reference: 8 (customerId, projectId, customerName, projectName)
- Invoice Reference: 3 (invoiceId, invoiceNumber, sourceId)
- Vendor Reference: 2 (vendorId, vendorName)
- Amount Fields: 12 (amount, taxAmount, totalAmount, subtotal, paidAmount, pendingAmount, etc.)
- Payment Fields: 8 (paymentDate, paymentMethod, referenceNumber, transactionId, etc.)
- GST Fields: 5 (gstType, gstNumber, cgstAmount, sgstAmount, igstAmount, cessAmount)
- Line Item Fields: 7 (description, quantity, unit, rate, amount, taxRate, taxAmount)
- Status Fields: 4 (status, approvalStatus, paymentStatus, expenseStatus)
- Category Fields: 3 (category, subCategory, incomeCategory, expenseCategory)
- Terms Fields: 3 (paymentTerms, dueDate, creditPeriod)
- Contact Fields: 5 (contactPerson, mobile, email, address, city, state, pincode)
- Financial Fields: 4 (creditLimit, plannedBudget, warningThreshold, criticalThreshold)
- System Fields: 15 (id, invoiceNumber, paymentNumber, incomeNumber, expenseNumber, etc.)

**By Required Status:**
- Required in Form: 50+ fields
- Optional in Form: 30+ fields
- System Generated: 15 fields

**By Section:**
- Invoice Details: 5
- Line Items: 7
- Payment Details: 5
- Payment Information: 7
- Income Details: 4
- Expense Details: 4
- Vendor Basic Info: 3
- Vendor Contact: 4
- Vendor Address: 4
- Vendor Financial: 3
- Bank Account Details: 6
- Budget Details: 4
- Budget Breakdown: 3

---

## Form Behavior Notes

**Invoice Create Mode:**
- Customer selection dropdown available
- Project selection optional
- Source type selection (Estimate, Proposal, Quotation, Project, Manual)
- Line items can be added/removed
- subtotal, taxAmount, totalAmount calculated from line items
- gstType defaults to CGST
- dueDate defaults to current date
- paymentTerms defaults to Net 30

**Invoice Edit Mode:**
- Customer cannot be changed (reference-only)
- Line items can be edited
- Pricing can be edited

**Payment Create Mode:**
- Payment type selection (Advance, Stage, Partial, Full, Refund)
- Customer selection dropdown available
- Project selection optional
- Invoice selection optional (for partial payments)
- Payment date defaults to current date
- Payment method defaults to Bank Transfer

**Income Create Mode:**
- Customer selection dropdown available
- Project selection optional
- Invoice selection optional (for linking to invoice)
- Income category selection
- Payment date defaults to current date
- Payment method defaults to Bank Transfer

**Expense Create Mode:**
- Vendor selection dropdown available
- Project selection optional
- Expense category selection
- Date defaults to current date
- Description required

**Vendor Create Mode:**
- GST number validation (regex)
- PAN number validation (regex)
- Mobile validation (regex format: +91 XXXXX XXXXX)
- Pincode validation (6 digits)
- Credit limit and credit period optional

**Bank Account Create Mode:**
- IFSC code validation (regex)
- Account type: Current or Savings

**Budget Create Mode:**
- Project selection required
- Warning threshold and critical threshold (0-100%)
- Material, labour, overhead budgets optional

---

## Validation Rules Summary

**Numeric Validation:**
- All amount fields: Must be positive (if entered)
- All tax fields: Must be positive (if entered)
- All quantity fields: Must be positive
- All rate fields: Must be positive
- warningThreshold, criticalThreshold: Must be 0-100
- creditLimit, creditPeriod: Must be positive (if entered)

**String Validation:**
- name: Min 2 char, Max 100 char
- description: Min 2 char, Max 500 char
- notes: Max 500 char
- paymentTerms: Min 2 char, Max 200 char
- address: Min 2 char, Max 500 char
- city, state: Min 2 char, Max 50 char
- accountNumber: Min 8 char, Max 18 char

**Regex Validation:**
- gstNumber: GST format regex
- panNumber: PAN format regex
- mobile: +91 XXXXX XXXXX format
- pincode: 6 digits
- ifscCode: IFSC format regex

**Email Validation:**
- email: Valid email format

**Enum Validation:**
- sourceType: Must be Estimate, Proposal, Quotation, Project, Manual
- gstType: Must be CGST, SGST, IGST, CESS
- paymentMethod: Must be valid payment method
- type: Must be Advance, Stage, Partial, Full, Refund
- category: Must be valid income/expense category
- accountType: Must be Current or Savings

**Cross-Field Validation:**
- lineItems must have at least 1 item
- subtotal, taxAmount, totalAmount must be positive

**Calculated Fields (Invoice):**
- subtotal: Calculated from line items
- taxAmount: Calculated from line items
- totalAmount: Calculated from line items
- line item amount: quantity * rate
- line item taxAmount: (amount * taxRate) / 100

---

## Architecture Note

**Finance Module Entities:**
- Invoice - Billing document for customers
- Payment - Payment record
- Income - Money received from customers
- Expense - Money spent on operations
- Vendor - Supplier for expenses
- Bank Account - Company bank accounts
- Budget - Project budget tracking
- Transaction - Ledger entry
- Ledger Entry - Central financial ledger
- Receivable - Money owed by customers
- Payable - Money owed to vendors

**Key Principles:**
- Finance is the central financial control system
- Connects Customers, Projects, Inventory, Vendors, GST
- Invoice can be generated from Estimate, Proposal, Quotation, Project, or Manual
- Payment can be Advance, Stage, Partial, Full, or Refund
- Income and Expense track money in and out
- Vendor management for expenses
- Bank account management for transactions
- Budget tracking for projects

---

**End of Pass 1 Report**
