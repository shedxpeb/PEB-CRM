# Finance Module Cross-Module Flow Audit (Pass 4)

**Generated:** 2025-01-06  
**Scope:** Finance Module Cross-Module Data Flow  
**Objective:** Verify which finance fields actually flow into other modules (Projects, Documents, Task, Inventory, Dashboard).

---

## Cross-Module Flow Summary

**Finance → Projects:** 6 fields mapped (customerId, customerName, projectId, projectName, invoiceId, invoiceNumber) in Project type  
**Finance → Documents:** 6+ fields mapped (customerId, customerName, customerAddress, customerGST, projectId, projectName, sourceId, sourceNumber) in Document types  
**Finance → Task:** 2 fields mapped (invoiceId, invoiceNumber) in Task type  
**Finance → Inventory:** 0 fields mapped (Inventory references project, not finance directly)  
**Finance → Dashboard:** 0 fields (only aggregated stats)

**Note:** Finance module is the central financial control system - connects Customers, Projects, Inventory, Vendors, GST. Finance module generates invoices from documents, receives payments from customers, tracks expenses to vendors. Finance fields flow to Projects and Documents for project and document tracking. Finance fields do not flow to Inventory (Inventory references project, not finance). Finance fields do not flow to Task (Task references invoice by ID only). Dashboard shows aggregated stats only.

---

## Finance → Projects Flow

**File:** `finance/types/index.ts` (lines 149-198), `projects/types/index.ts` (lines 1-50)  
**Type Definition:** Invoice interface, Project interface

### Mapped Fields (6 fields)

| Finance Field | Project Field | Status | Evidence |
|---------------|---------------|--------|----------|
| customerId | customerId | ✅ Required | Project type definition |
| customerName | customerName | ✅ Required | Project type definition |
| projectId | projectId | ✅ Optional | Project type definition |
| projectName | projectName | ✅ Optional | Project type definition |
| invoiceId | invoiceId | ✅ Optional | Project type definition |
| invoiceNumber | invoiceNumber | ✅ Optional | Project type definition |

### Finance Types Using Project Fields

**Invoice (lines 160-162):**
- projectId: optional
- projectName: optional

**Project (projects/types/index.ts):**
- customerId: required
- customerName: required
- projectId: required (system field)
- projectName: required
- invoiceId: optional
- invoiceNumber: optional

### Unmapped Fields

**Finance fields NOT mapped to Projects:**
- All pricing fields (subtotal, taxAmount, totalAmount, paidAmount, pendingAmount) - Not needed (project has budget tracking)
- All GST fields (gstType, cgstAmount, sgstAmount, igstAmount, cessAmount) - Not needed (project has its own GST tracking)
- All line items - Not needed (project has material tracking)
- All payment fields (paymentDate, paymentMethod, referenceNumber, transactionId) - Not needed (project has its own payment tracking)
- All terms fields (dueDate, paymentTerms) - Not needed (project has its own terms)
- sourceType, sourceId - Not needed (project knows it came from invoice)

**Assessment:** Customer and project identification fields are mapped from Finance to Projects. This is appropriate for project tracking from invoices.

---

## Finance → Documents Flow

**File:** `finance/types/index.ts` (lines 154-158), `documents/types/peb-commercial.ts` (lines 1-921)  
**Type Definition:** Invoice interface, Estimate/Proposal/Quotation interfaces

### Mapped Fields (6+ fields)

| Finance Field | Document Field | Status | Evidence |
|---------------|----------------|--------|----------|
| customerId | customerId | ✅ Required | Document type definition |
| customerName | customerName | ✅ Required | Document type definition |
| customerAddress | customerAddress | ✅ Required | Document type definition |
| customerGST | customerGST | ✅ Optional | Document type definition |
| projectId | projectId | ✅ Optional | Document type definition |
| projectName | projectName | ✅ Optional | Document type definition |
| sourceId | sourceId | ✅ Optional | Document type definition (sourceType) |
| sourceNumber | sourceNumber | ✅ Optional | Document type definition (sourceType) |

### Finance Types Using Document Fields

**Invoice (lines 154-167):**
- customerId: required
- customerName: required
- customerAddress: required
- customerGST: optional
- projectId: optional
- projectName: optional
- sourceType: enum (Estimate, Proposal, Quotation, Project, Manual)
- sourceId: optional

**Document (documents/types/peb-commercial.ts):**
- customerId: required
- customerName: required
- customerAddress: required
- customerGST: optional
- projectId: optional
- projectName: optional
- sourceType: enum (for invoice tracking)
- sourceId: optional

### Unmapped Fields

**Finance fields NOT mapped to Documents:**
- All pricing fields (subtotal, taxAmount, totalAmount, paidAmount, pendingAmount) - Not needed (documents have their own pricing)
- All GST fields (gstType, cgstAmount, sgstAmount, igstAmount, cessAmount) - Not needed (documents have their own GST tracking)
- All line items - Not needed (documents have their own line items)
- All payment fields (paymentDate, paymentMethod, referenceNumber, transactionId) - Not needed (documents don't track payments)
- All terms fields (dueDate, paymentTerms) - Not needed (documents have their own terms)

**Assessment:** Customer and project identification fields are mapped from Finance to Documents. This is appropriate for document tracking from invoices.

---

## Finance → Task Flow

**File:** `finance/types/index.ts` (lines 149-198), `task-management/types/index.ts` (lines 1-150)  
**Type Definition:** Invoice interface, Task interface

### Mapped Fields (2 fields)

| Finance Field | Task Field | Status | Evidence |
|---------------|-------------|--------|----------|
| invoiceId | documentId | ✅ Optional | Task type definition |
| invoiceNumber | documentNumber | ✅ Optional | Task type definition |

### Finance Types Using Task Fields

**Invoice (lines 149-198):**
- invoiceNumber: required (system field)

**Task (task-management/types/index.ts):**
- documentId: optional
- documentNumber: optional
- linkedModule: enum (Customers, Leads, Projects, Documents, Finance, Inventory)
- linkedRecordId: optional
- linkedRecordName: optional

### Unmapped Fields

**Finance fields NOT mapped to Task:**
- All other finance fields - Not needed (task references invoice by ID only)

**Assessment:** Invoice identification fields are mapped from Finance to Task. This is appropriate for creating tasks related to invoices.

---

## Finance → Inventory Flow

**File:** `inventory/types/index.ts` (lines 1-150)  
**Type Definition:** InventoryItem interface

### Mapped Fields (0 fields)

**Analysis:** Inventory module does not directly reference finance fields. Inventory module references projects for stock allocation, not finance.

**Inventory Types:**
- InventoryItem: Has projectId, projectName (for project-based stock allocation)
- StockReservation: Has projectId, projectName (for project-based stock reservation)

**Note:** Inventory may reference invoices for material tracking, but this is not implemented in the current type definitions.

**Assessment:** Finance fields do not flow to Inventory. This is acceptable as Inventory references projects, not finance. Stock allocation happens at project level, not invoice level.

---

## Finance → Dashboard Flow

**File:** `finance/page.tsx` (lines 245-292)

### Mapped Fields (0 fields)

**Dashboard uses aggregated stats only:**
- Cash position
- Outstanding amount
- Total receivables
- Total payables
- Current month sales
- Current month expenses
- Overdue receivables count
- Overdue payables count

**No individual finance fields are displayed in dashboard.**

**Assessment:** This is by design. Dashboard shows high-level metrics only.

---

## Critical Findings

### 1. Finance → Projects Flow is Good

**Current Mapping:**
- customerId ✅
- customerName ✅
- projectId ✅
- projectName ✅
- invoiceId ✅
- invoiceNumber ✅

**Assessment:** Customer and project identification is appropriately mapped from Finance to Projects. This is essential for project tracking from invoices.

---

### 2. Finance → Documents Flow is Good

**Current Mapping:**
- customerId ✅
- customerName ✅
- customerAddress ✅
- customerGST ✅
- projectId ✅
- projectName ✅
- sourceId ✅
- sourceNumber ✅

**Assessment:** Customer and project identification is appropriately mapped from Finance to Documents. This is essential for document tracking from invoices.

---

### 3. Finance → Task Flow is Minimal

**Current Mapping:**
- invoiceId ✅
- invoiceNumber ✅

**Assessment:** Invoice identification is mapped from Finance to Task. This is appropriate for creating tasks related to invoices.

---

### 4. Finance → Inventory Flow is Missing

**Issue:** Finance fields do not flow to Inventory module.

**Current Behavior:** Inventory module references projects, not finance.

**Impact:** Inventory cannot track material usage from invoices.

**Assessment:** This is acceptable. Inventory references projects for stock allocation. Material tracking from invoices is used for BOQ, not stock tracking. Stock allocation happens at project level, not invoice level.

---

### 5. No Finance Details Flow to Other Modules

**Issue:** Finance details (line items, pricing, GST, payments) do not flow to other modules.

**Current Behavior:** Other modules reference finance by ID only.

**Impact:** Other modules cannot access finance details.

**Assessment:** This is acceptable. Other modules can reference finance by ID if needed. Finance details are owned by Finance module. Projects and Documents have their own material and pricing tracking.

---

## Cross-Module Flow Improvements

### Low Priority (Optional)

**1. Add Invoice Material Reference to Inventory**

**Current State:** Inventory module does not reference invoices.

**Potential Use Case:** Track material usage from Invoice in Inventory.

**Implementation:** Add invoiceId, invoiceNumber to InventoryItem or StockReservation if needed.

**Priority:** Low - Inventory currently references projects, which is sufficient.

---

**2. Add Invoice Payment Reference to Projects**

**Current State:** Projects module has its own budget tracking, not invoice payment tracking.

**Potential Use Case:** Track invoice payments in project.

**Implementation:** Add payment tracking reference to Project type if needed.

**Priority:** Low - Projects has its own budget tracking, which is sufficient.

---

**3. Add Invoice Pricing Reference to Documents**

**Current State:** Documents module has its own pricing, not invoice pricing.

**Potential Use Case:** Reference invoice pricing in document.

**Implementation:** Add pricing reference to Document type if needed.

**Priority:** Low - Documents has its own pricing, which is sufficient.

---

## Final Cross-Module Flow Summary

**Finance → Projects:** ✅ Good (6 fields mapped)  
**Finance → Documents:** ✅ Good (6+ fields mapped)  
**Finance → Task:** ✅ Good (2 fields mapped)  
**Finance → Inventory:** ✅ Acceptable (no direct mapping, references projects)  
**Finance → Dashboard:** ✅ Good (aggregated stats only)

---

**End of Pass 4 Report**
