# Inventory Module Cross-Module Flow Audit (Pass 4)

**Generated:** 2025-01-06  
**Scope:** Inventory Module Cross-Module Data Flow  
**Objective:** Verify which inventory fields actually flow into other modules (Finance, Projects, Documents, Task, Dashboard).

---

## Cross-Module Flow Summary

**Inventory → Projects:** 2 fields mapped (projectId, projectName) in ProjectStockAllocation  
**Inventory → Finance:** 0 fields mapped (Finance references project, not inventory directly)  
**Inventory → Task:** 0 fields mapped  
**Inventory → Documents:** 0 fields mapped  
**Inventory → Dashboard:** 0 fields (only aggregated stats)

**Note:** Inventory module is primarily a stock management system. It references projects for stock allocation, but inventory fields do not flow into other modules. Other modules reference inventory for stock availability, but this is a read-only reference, not data flow.

---

## Inventory → Projects Flow

**File:** `inventory/types/index.ts` (lines 110-112), `inventory/types/peb-inventory.ts` (lines 619-620, 371-372)  
**Type Definition:** ProjectStockAllocation, StockReservation, InventoryItem

### Mapped Fields (2 fields)

| Inventory Field | Project Field | Status | Evidence |
|-----------------|---------------|--------|----------|
| projectId | projectId | ✅ Required | ProjectStockAllocation, StockReservation |
| projectName | projectName | ✅ Required | ProjectStockAllocation, StockReservation |

### Inventory Types Using Project Fields

**ProjectStockAllocation (lines 110-112):**
- projectId: required
- projectNumber: required
- projectName: required
- customerName: required
- reservedQuantity: required
- issuedQuantity: required
- availableQuantity: required
- status: required

**StockReservation (lines 619-620):**
- projectId: required
- projectName: required
- quotationId: optional
- quotationNumber: optional
- items: array of reserved items

**InventoryItem (lines 371-372):**
- reservedByProjects: array of project IDs that reserved this item
- consumedByProjects: array of project IDs that consumed this item

**StockMovement (referenceType):**
- referenceType can be 'Project'
- referenceNumber can be project number

### Unmapped Fields

**Inventory fields NOT mapped to Projects:**
- itemCode - Not needed
- itemName - Not needed
- category - Not needed
- brand - Not needed
- unit - Not needed
- All stock levels - Not needed
- All warehouse fields - Not needed
- All reorder fields - Not needed
- All custom fields - Not needed

**Assessment:** Project identification (projectId, projectName) is mapped to Inventory for stock allocation and reservation. This is appropriate for inventory management.

---

## Inventory → Finance Flow

**File:** `finance/types/index.ts` (lines 119-120, 161-162, 230-231, 405-406, 440-441)  
**Type Definition:** Expense, Invoice, Payment, Receivable, Payable

### Mapped Fields (0 fields)

**Analysis:** Finance module does not directly reference inventory fields. Finance module references projects (projectId, projectName) for expense/invoice tracking, but not inventory items.

**Finance Types:**
- Expense: Has projectId, projectName (for project-based expenses)
- Invoice: Has projectId, projectName (for project-based invoices)
- Payment: Has projectId, projectName (for project-based payments)
- Receivable: Has projectId, projectName (for project-based receivables)
- Payable: Has projectId, projectName (for project-based payables)

**Note:** Finance module may reference inventory items for material cost tracking, but this is not implemented in the current type definitions.

**Assessment:** Inventory fields do not flow to Finance. This is acceptable as Finance tracks financial transactions, not inventory details.

---

## Inventory → Task Flow

**File:** `task-management/types/index.ts` (lines 136)  
**Type Definition:** Task interface

### Mapped Fields (0 fields)

**Analysis:** Task module does not reference inventory fields. Task module references projects (projectId) for hierarchy, but not inventory items.

**Task Type:**
- Task: Has projectId (optional) for project hierarchy
- Task: Has linkedModule which can be 'Inventory' (but this is a reference, not data flow)

**Note:** Tasks can be linked to Inventory module via linkedModule, but this is a reference, not data flow.

**Assessment:** Inventory fields do not flow to Task. This is acceptable as tasks reference inventory for context, not data.

---

## Inventory → Documents Flow

**File:** `documents/types/peb-commercial.ts` (lines 186-187, 410-411, 579-580)  
**Type Definition:** Estimate, Proposal, Quotation

### Mapped Fields (0 fields)

**Analysis:** Documents module does not directly reference inventory fields. Documents module references projects (projectId, projectName) for document context, but not inventory items.

**Document Types:**
- Estimate: Has projectId, projectName (for project-based estimates)
- Proposal: Has projectId, projectName (for project-based proposals)
- Quotation: Has projectId, projectName (for project-based quotations)

**Note:** Documents may reference inventory items for material selection in BOQ, but this is not implemented in the current type definitions.

**Assessment:** Inventory fields do not flow to Documents. This is acceptable as documents reference projects, not inventory details.

---

## Inventory → Dashboard Flow

**File:** `inventory/page.tsx` (lines 123-155)

### Mapped Fields (0 fields)

**Dashboard uses aggregated stats only:**
- Total Items (count)
- Total Stock (sum of currentStock)
- Low Stock Items (count of items with status Low Stock/Critical or currentStock <= minimumStock)
- Reorder Required (count of items with currentStock <= reorderLevel)
- Warehouses (count of unique warehouseName)
- Stock Value (sum of totalValue)

**No individual inventory fields are displayed in dashboard.**

**Assessment:** This is by design. Dashboard shows high-level metrics only.

---

## Critical Findings

### 1. Inventory → Projects Flow is Good

**Current Mapping:**
- projectId ✅
- projectName ✅

**Assessment:** Project identification is appropriately mapped to Inventory for stock allocation and reservation.

---

### 2. Inventory → Finance Flow is Missing

**Issue:** Inventory fields do not flow to Finance module.

**Current Behavior:** Finance module references projects, not inventory items.

**Impact:** Finance cannot track material costs by inventory item.

**Assessment:** This is acceptable for current implementation. Finance tracks financial transactions at project level, not inventory item level. If needed, inventory items can be referenced for material cost tracking in future.

---

### 3. Inventory → Documents Flow is Missing

**Issue:** Inventory fields do not flow to Documents module.

**Current Behavior:** Documents module references projects, not inventory items.

**Impact:** Documents cannot reference inventory items for material selection in BOQ.

**Assessment:** This is acceptable for current implementation. Documents reference projects for context. If needed, inventory items can be referenced for material selection in BOQ in future.

---

### 4. Inventory → Task Flow is Minimal

**Issue:** Inventory fields do not flow to Task module.

**Current Behavior:** Task module references projects, not inventory items.

**Impact:** Tasks cannot reference inventory items for material-related tasks.

**Assessment:** This is acceptable. Tasks reference inventory for context via linkedModule, not data flow.

---

### 5. No Inventory Item Details Flow to Other Modules

**Issue:** Inventory item details (itemCode, itemName, category, brand, unit, stock levels, etc.) do not flow to other modules.

**Current Behavior:** Other modules reference projects, not inventory items.

**Impact:** Other modules cannot access inventory item details.

**Assessment:** This is acceptable. Other modules can reference inventory items by ID if needed. Inventory item details are owned by Inventory module (and Item Master module for product metadata).

---

## Cross-Module Flow Improvements

### Low Priority (Optional)

**1. Add Inventory Item Reference to Finance**

**Current State:** Finance module does not reference inventory items.

**Potential Use Case:** Track material costs by inventory item in expenses.

**Implementation:** Add itemId, itemName to Expense type if needed.

**Priority:** Low - Finance currently tracks at project level, which is sufficient.

---

**2. Add Inventory Item Reference to Documents**

**Current State:** Documents module does not reference inventory items.

**Potential Use Case:** Reference inventory items in BOQ for material selection.

**Implementation:** Add itemId, itemName to Estimate/Proposal/Quotation BOQ items if needed.

**Priority:** Low - Documents currently reference projects, which is sufficient.

---

**3. Add Inventory Item Reference to Task**

**Current State:** Task module does not reference inventory items.

**Potential Use Case:** Create tasks for inventory-related activities (stock movement, material delivery).

**Implementation:** Add itemId, itemName to Task type if needed.

**Priority:** Low - Tasks currently reference projects, which is sufficient.

---

## Final Cross-Module Flow Summary

**Inventory → Projects:** ✅ Good (2 fields mapped)  
**Inventory → Finance:** ✅ Acceptable (no direct mapping, references projects)  
**Inventory → Task:** ✅ Acceptable (no direct mapping, references projects)  
**Inventory → Documents:** ✅ Acceptable (no direct mapping, references projects)  
**Inventory → Dashboard:** ✅ Good (aggregated stats only)

---

**End of Pass 4 Report**
