# Inventory Module Missing Field Usage Audit (Pass 3)

**Generated:** 2025-01-06  
**Scope:** Inventory Module Missing Field Usage  
**Objective:** Identify fields that exist in form but are missing from detail page, table, search, filter, export, timeline, charts, or dashboard.

---

## Missing Usage Summary

**Total Fields in Form:** 18  
**Fields Missing from Detail Page:** 2  
**Fields Missing from List Table:** 8  
**Fields Missing from Search:** 11  
**Fields Missing from Filter:** 11  
**Fields Missing from Export:** 18 (export not implemented)  
**Fields Missing from Timeline:** 18 (timeline not implemented)  
**Fields Missing from Charts:** 18 (charts not implemented)  
**Fields Missing from Dashboard:** 12 (only aggregated stats)

---

## Fields Missing from Detail Page

| Field Name | Section | Reason |
|------------|---------|--------|
| warehouseId | Warehouse & Reorder | Not displayed (warehouseName shown instead) |
| itemTypeClass | Item Reference | Only shown in badge, not in field grid |

**Evidence:** `InventoryViewDrawer.tsx` lines 98-111

**Note:** warehouseId is not displayed in detail page (warehouseName is shown instead). itemTypeClass is shown in badge but not in field grid. This is acceptable.

---

## Fields Missing from List Table

| Field Name | Section | Reason |
|------------|---------|--------|
| itemMasterId | Item Reference | Not critical for list view |
| reservedStock | Stock Levels | Not critical for list view |
| issuedStock | Stock Levels | Not critical for list view |
| incomingStock | Stock Levels | Not critical for list view |
| outgoingStock | Stock Levels | Not critical for list view |
| purchaseRate | Stock Levels | Not critical for list view |
| minimumStock | Warehouse & Reorder | Not critical for list view |
| reorderLevel | Warehouse & Reorder | Not critical for list view |
| reorderQuantity | Warehouse & Reorder | Not critical for list view |
| safetyStock | Warehouse & Reorder | Not critical for list view |

**Evidence:** `page.tsx` lines 236-275 (baseColumns definition)

**Note:** List table shows essential fields: itemCode, itemName, category, brand, currentStock, availableStock, warehouseName, binLocation, totalValue, status. Custom fields are dynamically added.

---

## Fields Missing from Search

| Field Name | Section | Reason |
|------------|---------|--------|
| itemMasterId | Item Reference | Not commonly searched |
| reservedStock | Stock Levels | Not commonly searched |
| availableStock | Stock Levels | Not commonly searched (shown in table) |
| issuedStock | Stock Levels | Not commonly searched |
| incomingStock | Stock Levels | Not commonly searched |
| outgoingStock | Stock Levels | Not commonly searched |
| purchaseRate | Stock Levels | Not commonly searched |
| minimumStock | Warehouse & Reorder | Not commonly searched (has filter) |
| reorderLevel | Warehouse & Reorder | Not commonly searched (has filter) |
| reorderQuantity | Warehouse & Reorder | Not commonly searched |
| safetyStock | Warehouse & Reorder | Not commonly searched |
| itemTypeClass | Item Reference | Not commonly searched (has filter) |
| customFields | Custom Fields | Not searchable (dynamic) |

**Evidence:** `page.tsx` lines 104-112 (search logic)

---

## Fields Missing from Filter

| Field Name | Section | Reason |
|------------|---------|--------|
| itemMasterId | Item Reference | Not commonly filtered |
| reservedStock | Stock Levels | Not commonly filtered |
| availableStock | Stock Levels | Not commonly filtered (shown in table) |
| issuedStock | Stock Levels | Not commonly filtered |
| incomingStock | Stock Levels | Not commonly filtered |
| outgoingStock | Stock Levels | Not commonly filtered |
| purchaseRate | Stock Levels | Not commonly filtered |
| minimumStock | Warehouse & Reorder | Not commonly filtered (has calculated lowStock filter) |
| reorderLevel | Warehouse & Reorder | Not commonly filtered (has calculated reorder filter) |
| reorderQuantity | Warehouse & Reorder | Not commonly filtered |
| safetyStock | Warehouse & Reorder | Not commonly filtered |
| binLocation | Warehouse & Reorder | Not commonly filtered (searched instead) |
| customFields | Custom Fields | Not filterable (dynamic) |

**Evidence:** `page.tsx` lines 162-223 (filterConfigs)

**Note:** Calculated filters (lowStock, reorder) provide the needed functionality for minimumStock and reorderLevel.

---

## Fields Missing from Export

**All Fields** - Export functionality is not implemented for inventory module.

**Evidence:** No export function found in `page.tsx`

**Note:** This is a feature gap. Export should be implemented for inventory module.

---

## Fields Missing from Timeline

**All Fields** - Timeline functionality is not implemented for inventory module.

**Note:** This is a feature gap. Timeline should be added for stock movement tracking.

---

## Fields Missing from Charts

**All Fields** - Charts functionality is not implemented for inventory module.

**Note:** This is a feature gap. Charts should be added for inventory analytics.

---

## Fields Missing from Dashboard

| Field Name | Section | Reason |
|------------|---------|--------|
| itemMasterId | Item Reference | Not displayed (only aggregated stats) |
| itemCode | Item Reference | Not displayed (only aggregated stats) |
| itemName | Item Reference | Not displayed (only aggregated stats) |
| category | Item Reference | Not displayed (only aggregated stats) |
| brand | Item Reference | Not displayed (only aggregated stats) |
| itemTypeClass | Item Reference | Not displayed (only aggregated stats) |
| unit | Item Reference | Not displayed (only aggregated stats) |
| reservedStock | Stock Levels | Not displayed (only aggregated stats) |
| issuedStock | Stock Levels | Not displayed (only aggregated stats) |
| incomingStock | Stock Levels | Not displayed (only aggregated stats) |
| outgoingStock | Stock Levels | Not displayed (only aggregated stats) |
| purchaseRate | Stock Levels | Not displayed (only aggregated stats) |
| warehouseId | Warehouse & Reorder | Not displayed (only aggregated stats) |
| binLocation | Warehouse & Reorder | Not displayed (only aggregated stats) |
| minimumStock | Warehouse & Reorder | Not displayed (only aggregated stats) |
| reorderLevel | Warehouse & Reorder | Not displayed (only aggregated stats) |
| reorderQuantity | Warehouse & Reorder | Not displayed (only aggregated stats) |
| safetyStock | Warehouse & Reorder | Not displayed (only aggregated stats) |
| customFields | Custom Fields | Not displayed (only aggregated stats) |

**Evidence:** `page.tsx` lines 123-155 (KPI cards)

**Dashboard Stats Used:**
- Total Items (count)
- Total Stock (sum of currentStock)
- Low Stock Items (count of items with status Low Stock/Critical or currentStock <= minimumStock)
- Reorder Required (count of items with currentStock <= reorderLevel)
- Warehouses (count of unique warehouseName)
- Stock Value (sum of totalValue)

**Note:** This is by design. Dashboard shows high-level metrics only, not individual field values.

---

## Critical Findings

### 1. Export Not Implemented

**Issue:** Export functionality is not implemented for inventory module.

**Current State:** No export function exists.

**Impact:** Users cannot export inventory data for analysis.

**Assessment:** This is a feature gap. Export should be implemented for inventory module.

---

### 2. Timeline Not Implemented

**Issue:** Timeline functionality is not implemented for inventory module.

**Current State:** No timeline component exists.

**Impact:** No visual representation of stock movement history.

**Assessment:** This is a feature gap. Timeline should be added for stock movement tracking.

---

### 3. Charts Not Implemented

**Issue:** Charts functionality is not implemented for inventory module.

**Current State:** No charts component exists.

**Impact:** No visual representation of inventory trends, stock distribution, or other analytics.

**Assessment:** This is a feature gap. Charts should be added for inventory analytics.

---

### 4. Stock Movement Fields - Low Visibility

**Fields:** reservedStock, issuedStock, incomingStock, outgoingStock

**Issue:** These fields only appear in form and detail page.

**Missing from:**
- List Table ❌
- Search ❌
- Filter ❌
- Export ❌
- Timeline ❌
- Charts ❌
- Dashboard ❌

**Impact:** Users cannot filter or search by stock movement fields.

**Assessment:** This is acceptable. Stock movement fields are operational details not commonly searched/filtered. They are available in detail view.

---

### 5. Reorder Fields - Low Visibility

**Fields:** minimumStock, reorderLevel, reorderQuantity, safetyStock

**Issue:** These fields only appear in form and detail page.

**Missing from:**
- List Table ❌
- Search ❌
- Filter ❌ (except calculated lowStock/reorder filters)
- Export ❌
- Timeline ❌
- Charts ❌
- Dashboard ❌ (except calculated lowStock/reorder stats)

**Impact:** Users cannot filter by exact reorder levels.

**Assessment:** This is acceptable. Calculated filters (lowStock, reorder) provide the needed functionality. Exact values are available in detail view.

---

## Recommendations for Pass 5

Based on the missing usage analysis, the following fields should be evaluated in Pass 5:

**🟡 Implement Export Functionality:**
- Add export function for inventory module
- Include all form fields in export
- Include system fields (availableStock, totalValue, lastMovementDate) in export

**🟡 Implement Timeline Functionality:**
- Add timeline component for stock movement tracking
- Display stock movement history (Stock In, Stock Out, Reservation, Consumption, Transfer, Adjustment)

**🟡 Implement Charts Functionality:**
- Add charts component for inventory analytics
- Display inventory trends, stock distribution, category breakdown, warehouse breakdown

**🟢 Keep (Current Usage is Good):**
- All form fields
- All read-only Item Reference fields
- Custom fields
- Stock movement fields (low visibility is acceptable for operational details)
- Reorder fields (calculated filters provide needed functionality)

**🟢 Keep (Dashboard):**
- Dashboard shows high-level metrics only (by design)

---

**End of Pass 3 Report**
