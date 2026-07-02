# Customer Module Cross-Module Flow Audit (Pass 4)

**Generated:** 2025-01-06  
**Scope:** Customer Module Cross-Module Data Flow  
**Objective:** Verify which customer fields actually flow into other modules (Project, Quotation, Estimate, Proposal, Invoice, Finance, Task).

---

## Cross-Module Flow Summary

**Customer → Project:** 5 fields mapped (location auto-fill)  
**Customer → Estimate:** 5 fields mapped  
**Customer → Proposal:** 5 fields mapped (inherited from Estimate)  
**Customer → Quotation:** 5 fields mapped (inherited from Proposal)  
**Customer → Invoice:** 4 fields mapped  
**Customer → Income:** 2 fields mapped  
**Customer → Payment:** 1 field linked (customerId only)  
**Customer → Task:** 1 field linked (customerId only)  
**Customer → Dashboard:** 0 fields (only aggregated stats)

---

## Customer → Project Flow

**File:** `ProjectForm.tsx` (lines 68-87)  
**Type Definition:** `projects/types/index.ts` (lines 90-91)

### Mapped Fields (5 fields)

| Customer Field | Project Field | Status | Evidence |
|-----------------|---------------|--------|----------|
| address | location | ✅ Auto-filled | ProjectForm.tsx line 74 |
| city | city | ✅ Auto-filled | ProjectForm.tsx line 75 |
| state | state | ✅ Auto-filled | ProjectForm.tsx line 76 |
| pincode | pincode | ✅ Auto-filled | ProjectForm.tsx line 77 |
| customerId | customerId | ✅ Required selection | ProjectForm.tsx line 66, 130-142 |

### Auto-Fill Logic

**Implementation:** `ProjectForm.tsx` lines 68-87

```typescript
useEffect(() => {
  if (isEditMode) return;
  if (customerId && customers?.data) {
    const selectedCustomer = customers.data.find((c) => c.id === customerId);
    if (selectedCustomer) {
      setValue('location', selectedCustomer.address || '');
      setValue('city', selectedCustomer.city || '');
      setValue('state', selectedCustomer.state || '');
      setValue('pincode', selectedCustomer.pincode || '');
      setShowAutoFillNotice(true);
    }
  }
}, [customerId, customers?.data, setValue, isEditMode]);
```

**Behavior:**
- Auto-fill only in create mode (not edit mode - snapshot rule)
- One-time snapshot - project owns its data after creation
- User can edit auto-filled fields before saving
- Shows auto-fill notice to user

### Unmapped Fields (Not Auto-Filled)

**Customer fields NOT mapped to Project:**
- customerName - Not needed (customerName stored separately in project)
- companyName - Not needed
- mobile - Not needed
- alternateMobile - Not needed
- email - Not needed
- gstNumber - Not needed
- panNumber - Not needed
- industry - Not needed
- businessType - Not needed
- website - Not needed
- country - Not needed
- leadSource - Not needed
- status - Not needed
- notes - Not needed
- assignedEmployee - Not needed
- assignedEmployeeId - Not needed
- customFields - Not needed

**Assessment:** Location auto-fill is appropriate. Other customer details are not needed in project execution context.

---

## Customer → Estimate Flow

**File:** `types/peb-commercial.ts` (lines 177-183)  
**Type Definition:** `CreateEstimateDto` (line 765)

### Mapped Fields (5 fields)

| Customer Field | Estimate Field | Status | Evidence |
|-----------------|----------------|--------|----------|
| customerId | customerId | ✅ Required | types/peb-commercial.ts line 178 |
| customerName | customerName | ✅ Mapped | types/peb-commercial.ts line 179 |
| email | customerEmail | ✅ Mapped | types/peb-commercial.ts line 180 |
| mobile | customerPhone | ✅ Mapped | types/peb-commercial.ts line 181 |
| address | customerAddress | ✅ Mapped | types/peb-commercial.ts line 182 |
| gstNumber | customerGST | ✅ Mapped | types/peb-commercial.ts line 183 |

### Unmapped Fields

**Customer fields NOT mapped to Estimate:**
- companyName - Not needed
- alternateMobile - Not needed
- panNumber - Not needed
- industry - Not needed
- businessType - Not needed
- website - Not needed
- city - Not needed (address includes city)
- state - Not needed (address includes state)
- country - Not needed
- pincode - Not needed (address includes pincode)
- leadSource - Not needed
- status - Not needed
- notes - Not needed
- assignedEmployee - Not needed
- assignedEmployeeId - Not needed
- customFields - Not needed

**Assessment:** Essential billing/contact fields are mapped. This is appropriate for commercial documents.

---

## Customer → Proposal Flow

**File:** `types/peb-commercial.ts` (lines 410-416)  
**Type Definition:** Proposal interface

### Mapped Fields (5 fields - Inherited from Estimate)

| Customer Field | Proposal Field | Status | Evidence |
|-----------------|----------------|--------|----------|
| customerId | customerId | ✅ Inherited | types/peb-commercial.ts line 411 |
| customerName | customerName | ✅ Inherited | types/peb-commercial.ts line 412 |
| email | customerEmail | ✅ Inherited | types/peb-commercial.ts line 413 |
| mobile | customerPhone | ✅ Inherited | types/peb-commercial.ts line 414 |
| address | customerAddress | ✅ Inherited | types/peb-commercial.ts line 415 |
| gstNumber | customerGST | ✅ Inherited | types/peb-commercial.ts line 416 |

**Note:** Proposal inherits customer fields from Estimate. No direct mapping from Customer to Proposal.

---

## Customer → Quotation Flow

**File:** `types/peb-commercial.ts` (lines 579-585)  
**Type Definition:** Quotation interface

### Mapped Fields (5 fields - Inherited from Proposal)

| Customer Field | Quotation Field | Status | Evidence |
|-----------------|-----------------|--------|----------|
| customerId | customerId | ✅ Inherited | types/peb-commercial.ts line 580 |
| customerName | customerName | ✅ Inherited | types/peb-commercial.ts line 581 |
| email | customerEmail | ✅ Inherited | types/peb-commercial.ts line 582 |
| mobile | customerPhone | ✅ Inherited | types/peb-commercial.ts line 583 |
| address | customerAddress | ✅ Inherited | types/peb-commercial.ts line 584 |
| gstNumber | customerGST | ✅ Inherited | types/peb-commercial.ts line 585 |

**Note:** Quotation inherits customer fields from Proposal. No direct mapping from Customer to Quotation.

---

## Customer → Invoice Flow

**File:** `finance/types/index.ts` (lines 154-158)  
**Type Definition:** `CreateInvoiceDto` (line 674)

### Mapped Fields (4 fields)

| Customer Field | Invoice Field | Status | Evidence |
|-----------------|---------------|--------|----------|
| customerId | customerId | ✅ Required | finance/types/index.ts line 155 |
| customerName | customerName | ✅ Mapped | finance/types/index.ts line 156 |
| address | customerAddress | ✅ Mapped | finance/types/index.ts line 157 |
| gstNumber | customerGST | ✅ Mapped | finance/types/index.ts line 158 |

### Unmapped Fields

**Customer fields NOT mapped to Invoice:**
- companyName - Not needed
- mobile - Not needed
- alternateMobile - Not needed
- email - Not needed
- panNumber - Not needed
- industry - Not needed
- businessType - Not needed
- website - Not needed
- city - Not needed (address includes city)
- state - Not needed (address includes state)
- country - Not needed
- pincode - Not needed (address includes pincode)
- leadSource - Not needed
- status - Not needed
- notes - Not needed
- assignedEmployee - Not needed
- assignedEmployeeId - Not needed
- customFields - Not needed

**Assessment:** Essential billing fields are mapped. Email and mobile could be useful for invoice communication but not currently mapped.

---

## Customer → Income Flow

**File:** `finance/types/index.ts` (lines 75-77)  
**Type Definition:** `CreateIncomeDto` (line 645)

### Mapped Fields (2 fields)

| Customer Field | Income Field | Status | Evidence |
|-----------------|--------------|--------|----------|
| customerId | customerId | ✅ Required | finance/types/index.ts line 75 |
| customerName | customerName | ✅ Mapped | finance/types/index.ts line 76 |

### Unmapped Fields

**Customer fields NOT mapped to Income:**
- All other customer fields

**Assessment:** Only customer identification is needed for income tracking. This is appropriate.

---

## Customer → Payment Flow

**File:** `finance/types/index.ts` (line 79)  
**Type Definition:** `CreatePaymentDto` (line 690)

### Mapped Fields (1 field)

| Customer Field | Payment Field | Status | Evidence |
|-----------------|---------------|--------|----------|
| customerId | customerId | ✅ Required | finance/types/index.ts line 79 |

### Unmapped Fields

**Customer fields NOT mapped to Payment:**
- All other customer fields

**Assessment:** Only customer identification is needed for payment tracking. This is appropriate.

---

## Customer → Task Flow

**File:** `task-management/types/index.ts` (line 138)  
**Type Definition:** Task interface

### Mapped Fields (1 field)

| Customer Field | Task Field | Status | Evidence |
|-----------------|-----------|--------|----------|
| customerId | customerId | ✅ Optional | task-management/types/index.ts line 138 |

### Unmapped Fields

**Customer fields NOT mapped to Task:**
- All other customer fields

**Assessment:** Only customer reference is needed for task context. This is appropriate.

---

## Customer → Dashboard Flow

**File:** `useDashboardRealData.ts` (lines 128-136)

### Mapped Fields (0 fields)

**Dashboard uses aggregated stats only:**
- Total Customers (count)
- Active Customers (status = 'Active')
- New This Month (customerSince date filter)
- Total Revenue (sum of totalRevenue)

**No individual customer fields are displayed in dashboard.**

**Assessment:** This is by design. Dashboard shows high-level metrics only.

---

## Critical Findings

### 1. Invoice Missing Contact Fields

**Issue:** Invoice does not map customer email and mobile.

**Current Mapping:**
- customerId ✅
- customerName ✅
- customerAddress ✅
- customerGST ✅

**Missing:**
- customerEmail ❌
- customerPhone ❌

**Impact:** Invoice PDF cannot include customer contact information for communication (email for sending invoice, mobile for follow-up).

**Recommendation:** Add customerEmail and customerPhone to Invoice type and mapping.

---

### 2. Project Auto-Fill is Good

**Current Behavior:** Project auto-fills location details from customer (address, city, state, pincode).

**Assessment:** This is appropriate and reduces data entry redundancy.

**Snapshot Rule:** Auto-fill only happens in create mode. In edit mode, customer reference is read-only. Project owns its data after creation.

---

### 3. Document Flow is Good

**Current Behavior:** Estimate, Proposal, Quotation all have customer fields mapped (customerId, customerName, customerEmail, customerPhone, customerAddress, customerGST).

**Assessment:** This is appropriate for commercial documents. All essential billing/contact fields are included.

---

### 4. Finance Flow is Minimal

**Current Behavior:** Income and Payment only map customerId and customerName. Invoice maps 4 fields.

**Assessment:** This is appropriate for financial tracking. Only identification and billing details are needed.

---

### 5. Task Flow is Minimal

**Current Behavior:** Task only has optional customerId field.

**Assessment:** This is appropriate. Task is focused on execution, not customer details.

---

## Cross-Module Flow Improvements

### High Priority (Critical)

1. **Add Customer Contact Fields to Invoice**
   - Add customerEmail to Invoice type
   - Add customerPhone to Invoice type
   - Update Invoice PDF to display contact information
   - **Implementation:** Update `finance/types/index.ts` Invoice interface and `pdf/InvoicePDF.tsx`

### Medium Priority (UX Improvement)

2. **Consider Adding Customer Contact to Estimate/Proposal/Quotation Print**
   - Already mapped in types
   - Ensure print templates display customer email and phone
   - **Implementation:** Verify print templates use customerEmail and customerPhone

### Low Priority (Optional)

3. **Consider Adding Customer Contact to Project**
   - Could be useful for on-site communication
   - Not critical as project has its own communication channels
   - **Implementation:** Add customerEmail and customerPhone to Project type if needed

---

## Final Cross-Module Flow Summary

**Customer → Project:** ✅ Good (5 fields auto-filled)  
**Customer → Estimate:** ✅ Good (6 fields mapped)  
**Customer → Proposal:** ✅ Good (6 fields inherited)  
**Customer → Quotation:** ✅ Good (6 fields inherited)  
**Customer → Invoice:** ⚠️ Needs improvement (missing email/phone)  
**Customer → Income:** ✅ Good (2 fields)  
**Customer → Payment:** ✅ Good (1 field)  
**Customer → Task:** ✅ Good (1 field)  
**Customer → Dashboard:** ✅ Good (aggregated stats only)

---

**End of Pass 4 Report**
