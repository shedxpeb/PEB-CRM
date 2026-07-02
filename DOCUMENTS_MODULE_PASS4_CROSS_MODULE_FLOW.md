# Documents Module Cross-Module Flow Audit (Pass 4)

**Generated:** 2025-01-06  
**Scope:** Documents Module Cross-Module Data Flow  
**Objective:** Verify which document fields actually flow into other modules (Finance, Projects, Task, Inventory, Dashboard).

---

## Cross-Module Flow Summary

**Documents → Projects:** 6 fields mapped (customerId, customerName, projectId, projectName, estimateId, estimateNumber) in Project type  
**Documents → Finance:** 6 fields mapped (customerId, customerName, projectId, projectName, documentId, documentNumber) in Finance types  
**Documents → Task:** 2 fields mapped (documentId, documentNumber) in Task type  
**Documents → Inventory:** 0 fields mapped (Inventory references project, not documents directly)  
**Documents → Dashboard:** 0 fields (only aggregated stats)

**Note:** Documents module is the starting point of the commercial workflow (Lead → Customer → Estimate → Proposal → Quotation → Project). Document fields flow to Projects and Finance for project creation and invoicing. Document fields do not flow to Inventory (Inventory references project, not documents).

---

## Documents → Projects Flow

**File:** `documents/types/peb-commercial.ts` (lines 185-190, 223-230), `projects/types/index.ts` (lines 1-50)  
**Type Definition:** Estimate interface, Project interface

### Mapped Fields (6 fields)

| Document Field | Project Field | Status | Evidence |
|-----------------|---------------|--------|----------|
| customerId | customerId | ✅ Required | Project type definition |
| customerName | customerName | ✅ Required | Project type definition |
| projectId | projectId | ✅ Optional | Project type definition |
| projectName | projectName | ✅ Optional | Project type definition |
| estimateId | estimateId | ✅ Optional | Project type definition |
| estimateNumber | estimateNumber | ✅ Optional | Project type definition |

### Document Types Using Project Fields

**Estimate (lines 185-190):**
- projectId: optional
- projectName: optional

**Project (projects/types/index.ts):**
- customerId: required
- customerName: required
- projectId: required (system field)
- projectName: required
- estimateId: optional
- estimateNumber: optional

### Unmapped Fields

**Document fields NOT mapped to Projects:**
- leadId, leadNumber - Not needed (project already has leadId)
- documentType - Not needed (project knows it came from Estimate)
- status - Not needed (project has its own status)
- approvalStatus - Not needed (project has its own approval workflow)
- All pricing fields - Not needed (project has budget tracking)
- All line items - Not needed (project has material tracking)
- All scope configuration - Not needed (project has PEB specifications)
- All technical specifications - Not needed (project has PEB specifications)
- All terms fields - Not needed (project has its own terms)

**Assessment:** Customer and project identification fields are mapped from Documents to Projects. This is appropriate for project creation from documents.

---

## Documents → Finance Flow

**File:** `documents/types/peb-commercial.ts` (lines 177-183), `finance/types/index.ts` (lines 1-100)  
**Type Definition:** Estimate interface, Invoice interface

### Mapped Fields (6 fields)

| Document Field | Finance Field | Status | Evidence |
|-----------------|---------------|--------|----------|
| customerId | customerId | ✅ Required | Invoice type definition |
| customerName | customerName | ✅ Required | Invoice type definition |
| projectId | projectId | ✅ Optional | Invoice type definition |
| projectName | projectName | ✅ Optional | Invoice type definition |
| estimateId | sourceId | ✅ Optional | Invoice type definition (sourceType) |
| estimateNumber | sourceNumber | ✅ Optional | Invoice type definition (sourceType) |

### Document Types Using Finance Fields

**Estimate (lines 177-183):**
- customerId: required
- customerName: required
- customerEmail: optional
- customerPhone: optional
- customerAddress: optional
- customerGST: optional

**Invoice (finance/types/index.ts):**
- customerId: required
- customerName: required
- customerAddress: required
- customerGST: optional
- projectId: optional
- projectName: optional
- sourceType: enum (Estimate, Proposal, Quotation, Project, Manual)
- sourceId: optional
- invoiceNumber: required

### Unmapped Fields

**Document fields NOT mapped to Finance:**
- leadId, leadNumber - Not needed (invoice references project, not lead)
- documentType - Not needed (invoice has sourceType)
- status - Not needed (invoice has its own status)
- approvalStatus - Not needed (invoice has its own approval workflow)
- All pricing fields - Not needed (invoice has its own pricing)
- All line items - Not needed (invoice has its own line items)
- All scope configuration - Not needed (invoice is financial, not technical)
- All technical specifications - Not needed (invoice is financial, not technical)
- All terms fields - Not needed (invoice has its own terms)

**Assessment:** Customer and project identification fields are mapped from Documents to Finance. This is appropriate for invoice generation from documents.

---

## Documents → Task Flow

**File:** `task-management/types/index.ts` (lines 1-150)  
**Type Definition:** Task interface

### Mapped Fields (2 fields)

| Document Field | Task Field | Status | Evidence |
|-----------------|-------------|--------|----------|
| documentId | documentId | ✅ Optional | Task type definition |
| documentNumber | documentNumber | ✅ Optional | Task type definition |

### Document Types Using Task Fields

**Task (task-management/types/index.ts):**
- documentId: optional
- documentNumber: optional
- linkedModule: enum (Customers, Leads, Projects, Documents, Finance, Inventory)
- linkedRecordId: optional
- linkedRecordName: optional

### Unmapped Fields

**Document fields NOT mapped to Task:**
- All other document fields - Not needed (task references document by ID only)

**Assessment:** Document identification fields are mapped from Documents to Task. This is appropriate for creating tasks related to documents.

---

## Documents → Inventory Flow

**File:** `inventory/types/index.ts` (lines 1-150)  
**Type Definition:** InventoryItem interface

### Mapped Fields (0 fields)

**Analysis:** Inventory module does not directly reference document fields. Inventory module references projects for stock allocation, not documents.

**Inventory Types:**
- InventoryItem: Has projectId, projectName (for project-based stock allocation)
- StockReservation: Has projectId, projectName (for project-based stock reservation)

**Note:** Inventory may reference documents for material selection in BOQ, but this is not implemented in the current type definitions.

**Assessment:** Document fields do not flow to Inventory. This is acceptable as Inventory references projects, not documents. Stock allocation happens at project level, not document level.

---

## Documents → Dashboard Flow

**File:** `documents/pages/EstimatesPage.tsx` (lines 97-117)

### Mapped Fields (0 fields)

**Dashboard uses aggregated stats only:**
- Total Estimates (count)
- Draft (count of estimates with status Draft)
- Sent (count of estimates with status Sent)
- Converted (count of estimates with status Converted)

**No individual document fields are displayed in dashboard.**

**Assessment:** This is by design. Dashboard shows high-level metrics only.

---

## Critical Findings

### 1. Documents → Projects Flow is Good

**Current Mapping:**
- customerId ✅
- customerName ✅
- projectId ✅
- projectName ✅
- estimateId ✅
- estimateNumber ✅

**Assessment:** Customer and project identification is appropriately mapped from Documents to Projects. This is essential for project creation from documents.

---

### 2. Documents → Finance Flow is Good

**Current Mapping:**
- customerId ✅
- customerName ✅
- customerAddress ✅
- customerGST ✅
- projectId ✅
- projectName ✅
- sourceId (estimateId) ✅
- sourceNumber (estimateNumber) ✅

**Assessment:** Customer and project identification is appropriately mapped from Documents to Finance. This is essential for invoice generation from documents.

---

### 3. Documents → Task Flow is Minimal

**Current Mapping:**
- documentId ✅
- documentNumber ✅

**Assessment:** Document identification is mapped from Documents to Task. This is appropriate for creating tasks related to documents.

---

### 4. Documents → Inventory Flow is Missing

**Issue:** Document fields do not flow to Inventory module.

**Current Behavior:** Inventory module references projects, not documents.

**Impact:** Inventory cannot track material selection from documents.

**Assessment:** This is acceptable. Inventory references projects for stock allocation. Material selection from documents is used for BOQ, not stock tracking. Stock allocation happens at project level, not document level.

---

### 5. No Document Details Flow to Other Modules

**Issue:** Document details (line items, scope configuration, technical specifications, pricing) do not flow to other modules.

**Current Behavior:** Other modules reference documents by ID only.

**Impact:** Other modules cannot access document details.

**Assessment:** This is acceptable. Other modules can reference documents by ID if needed. Document details are owned by Documents module. Projects and Finance have their own material and pricing tracking.

---

## Cross-Module Flow Improvements

### Low Priority (Optional)

**1. Add Document Material Reference to Inventory**

**Current State:** Inventory module does not reference documents.

**Potential Use Case:** Track material selection from Estimate/Proposal/Quotation in Inventory.

**Implementation:** Add documentId, documentNumber to InventoryItem or StockReservation if needed.

**Priority:** Low - Inventory currently references projects, which is sufficient.

---

**2. Add Document Scope Reference to Projects**

**Current State:** Projects module has its own PEB specifications, not document scope configuration.

**Potential Use Case:** Reference document scope configuration in project.

**Implementation:** Add scopeConfiguration reference to Project type if needed.

**Priority:** Low - Projects has its own PEB specifications, which is sufficient.

---

**3. Add Document Pricing Reference to Finance**

**Current State:** Finance module has its own pricing, not document pricing.

**Potential Use Case:** Reference document pricing in invoice.

**Implementation:** Add pricingConfiguration reference to Invoice type if needed.

**Priority:** Low - Finance has its own pricing, which is sufficient.

---

## Final Cross-Module Flow Summary

**Documents → Projects:** ✅ Good (6 fields mapped)  
**Documents → Finance:** ✅ Good (6+ fields mapped)  
**Documents → Task:** ✅ Good (2 fields mapped)  
**Documents → Inventory:** ✅ Acceptable (no direct mapping, references projects)  
**Documents → Dashboard:** ✅ Good (aggregated stats only)

---

**End of Pass 4 Report**
