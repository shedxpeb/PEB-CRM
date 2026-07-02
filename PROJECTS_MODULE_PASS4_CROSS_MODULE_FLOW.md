# Projects Module Cross-Module Flow Audit (Pass 4)

**Generated:** 2025-01-06  
**Scope:** Projects Module Cross-Module Data Flow  
**Objective:** Verify which project fields actually flow into other modules (Finance, Inventory, Task, Documents, Dashboard).

---

## Cross-Module Flow Summary

**Project → Finance:** 3 fields mapped (projectId, projectName, budget)  
**Project → Inventory:** 2 fields mapped (projectId, projectName)  
**Project → Task:** 1 field linked (projectId only)  
**Project → Documents:** 1 field linked (projectId only)  
**Project → Dashboard:** 0 fields (only aggregated stats)

---

## Project → Finance Flow

**File:** `finance/types/index.ts` (lines 77-78, 119-120, 161-162, 230-231, 405-406, 440-441, 466-467, 533-534)  
**Type Definition:** Various finance types

### Mapped Fields (3 fields)

| Project Field | Finance Field | Status | Evidence |
|-----------------|---------------|--------|----------|
| projectId | projectId | ✅ Optional | Income, Expense, Invoice, Payment types |
| projectName | projectName | ✅ Optional | Income, Expense, Invoice, Payment types |
| budget | plannedBudget | ✅ Required | Budget type |

### Finance Types Using Project Fields

**Income (lines 77-78):**
- projectId: optional
- projectName: optional

**Expense (lines 119-120):**
- projectId: optional
- projectName: optional

**Invoice (lines 161-162):**
- projectId: optional
- projectName: optional

**Payment (lines 230-231):**
- projectId: optional
- projectName: optional

**ProjectFinance (lines 466-467):**
- projectId: required
- projectName: required

**Budget (lines 533-534):**
- projectId: required
- projectName: required

**Receivable (lines 405-406):**
- projectId: optional
- projectName: optional

**Payable (lines 440-441):**
- projectId: optional
- projectName: optional

### Unmapped Fields

**Project fields NOT mapped to Finance:**
- projectCode - Not needed
- customerId - Not needed (finance has customerId directly)
- customerName - Not needed (finance has customerName directly)
- leadId - Not needed
- projectType - Not needed
- value - Not needed (finance tracks amounts separately)
- location - Not needed
- city - Not needed
- state - Not needed
- pincode - Not needed
- startDate - Not needed
- endDate - Not needed
- priority - Not needed
- projectManagerId - Not needed
- projectManager - Not needed
- All PEB specifications - Not needed
- All status/progress fields - Not needed
- All health status fields - Not needed
- All budget tracking fields - Not needed (except budget itself)
- milestones - Not needed
- team - Not needed
- All cross-module references - Not needed

**Assessment:** Project identification (projectId, projectName) and budget are mapped to Finance. This is appropriate for financial tracking.

---

## Project → Inventory Flow

**File:** `inventory/types/index.ts` (lines 110-112), `inventory/types/peb-inventory.ts` (lines 619-620, 371-372)  
**Type Definition:** ProjectStockAllocation, StockReservation, InventoryItem

### Mapped Fields (2 fields)

| Project Field | Inventory Field | Status | Evidence |
|-----------------|-----------------|--------|----------|
| projectId | projectId | ✅ Required | ProjectStockAllocation, StockReservation |
| projectName | projectName | ✅ Required | ProjectStockAllocation, StockReservation |

### Inventory Types Using Project Fields

**ProjectStockAllocation (lines 110-112):**
- projectId: required
- projectNumber: required
- projectName: required
- customerName: required

**StockReservation (lines 619-620):**
- projectId: required
- projectName: required
- quotationId: optional
- quotationNumber: optional

**InventoryItem (lines 371-372):**
- reservedByProjects: array of project IDs
- consumedByProjects: array of project IDs

**Stockovement (referenceType):**
- referenceType can be 'Project'
- referenceNumber can be project number

### Unmapped Fields

**Project fields NOT mapped to Inventory:**
- projectCode - Not needed
- customerId - Not needed (inventory has customerName in allocation)
- customerName - Not needed (inventory has customerName in allocation)
- leadId - Not needed
- projectType - Not needed
- value - Not needed
- budget - Not needed
- location - Not needed
- city - Not needed
- state - Not needed
- pincode - Not needed
- startDate - Not needed
- endDate - Not needed
- priority - Not needed
- projectManagerId - Not needed
- projectManager - Not needed
- All PEB specifications - Not needed
- All status/progress fields - Not needed
- All health status fields - Not needed
- All budget tracking fields - Not needed
- milestones - Not needed
- team - Not needed
- All cross-module references - Not needed

**Assessment:** Project identification (projectId, projectName) is mapped to Inventory for stock allocation and reservation. This is appropriate for inventory management.

---

## Project → Task Flow

**File:** `task-management/types/index.ts` (lines 136)  
**Type Definition:** Task interface

### Mapped Fields (1 field)

| Project Field | Task Field | Status | Evidence |
|-----------------|-----------|--------|----------|
| projectId | projectId | ✅ Optional | Task interface line 136 |

### Task Types Using Project Fields

**Task (line 136):**
- projectId: optional (direct link to Project for hierarchy)
- linkedModule: can be 'Projects'
- linkedRecordId: can reference project ID
- linkedRecordName: can reference project name

### Unmapped Fields

**Project fields NOT mapped to Task:**
- All other project fields

**Assessment:** Only projectId is linked to Task for hierarchy. This is appropriate for task context.

---

## Project → Documents Flow

**File:** `documents/types/peb-commercial.ts` (lines 186-187, 410-411, 579-580)  
**Type Definition:** Estimate, Proposal, Quotation

### Mapped Fields (1 field)

| Project Field | Document Field | Status | Evidence |
|-----------------|-----------------|--------|----------|
| projectId | projectId | ✅ Optional | Estimate, Proposal, Quotation types |
| projectName | projectName | ✅ Optional | Estimate, Proposal, Quotation types |

### Document Types Using Project Fields

**Estimate (lines 186-187):**
- projectId: optional
- projectName: optional

**Proposal (lines 410-411):**
- projectId: optional
- projectName: optional

**Quotation (lines 579-580):**
- projectId: optional
- projectName: optional

### Unmapped Fields

**Project fields NOT mapped to Documents:**
- All other project fields

**Assessment:** Project identification (projectId, projectName) is mapped to Documents. This is appropriate for document context.

---

## Project → Dashboard Flow

**File:** `projects/page.tsx` (lines 190-238)

### Mapped Fields (0 fields)

**Dashboard uses aggregated stats only:**
- Total Projects (count)
- Active Projects (status in ACTIVE_STATUSES)
- Delayed Projects (endDate < now and not completed/cancelled)
- Total Revenue (sum of value)

**No individual project fields are displayed in dashboard.**

**Assessment:** This is by design. Dashboard shows high-level metrics only.

---

## Critical Findings

### 1. Project → Finance Flow is Good

**Current Mapping:**
- projectId ✅
- projectName ✅
- budget ✅ (for Budget type)

**Assessment:** Project identification and budget are appropriately mapped to Finance for financial tracking.

---

### 2. Project → Inventory Flow is Good

**Current Mapping:**
- projectId ✅
- projectName ✅

**Assessment:** Project identification is appropriately mapped to Inventory for stock allocation and reservation.

---

### 3. Project → Task Flow is Minimal

**Current Mapping:**
- projectId ✅ (optional)

**Assessment:** Only projectId is linked to Task. This is appropriate for task hierarchy.

---

### 4. Project → Documents Flow is Minimal

**Current Mapping:**
- projectId ✅ (optional)
- projectName ✅ (optional)

**Assessment:** Project identification is mapped to Documents. This is appropriate for document context.

---

### 5. No PEB Specifications Flow to Other Modules

**Issue:** PEB specifications (structureType, roofType, wallType, craneSystem, dimensions, etc.) do not flow to any other module.

**Current Behavior:** PEB specifications are only stored in Project module.

**Impact:** Other modules cannot access PEB technical specifications.

**Assessment:** This is acceptable. PEB specifications are project-specific technical details. Other modules (Finance, Inventory, Task) don't need these specifications. If needed, they can access via project reference.

---

### 6. No Project Dates Flow to Other Modules

**Issue:** Project dates (startDate, endDate) do not flow to other modules.

**Current Behavior:** Project dates are only stored in Project module.

**Impact:** Other modules cannot access project timeline information.

**Assessment:** This is acceptable. Project dates are project-specific. Other modules can access via project reference if needed.

---

### 7. No Project Location Flow to Other Modules

**Issue:** Project location (location, city, state, pincode) does not flow to other modules.

**Current Behavior:** Project location is only stored in Project module.

**Impact:** Other modules cannot access project location information.

**Assessment:** This is acceptable. Project location is project-specific. Other modules can access via project reference if needed.

---

## Cross-Module Flow Improvements

### Low Priority (Optional)

1. **Consider Adding Project Dates to Task**
   - Could be useful for task scheduling based on project timeline
   - Not critical as tasks have their own due dates
   - **Implementation:** Add projectStartDate, projectEndDate to Task type if needed

2. **Consider Adding Project Location to Inventory**
   - Could be useful for logistics planning
   - Not critical as inventory has warehouse locations
   - **Implementation:** Add projectLocation to StockReservation if needed

---

## Final Cross-Module Flow Summary

**Project → Finance:** ✅ Good (3 fields mapped)  
**Project → Inventory:** ✅ Good (2 fields mapped)  
**Project → Task:** ✅ Good (1 field linked)  
**Project → Documents:** ✅ Good (2 fields mapped)  
**Project → Dashboard:** ✅ Good (aggregated stats only)

---

**End of Pass 4 Report**
