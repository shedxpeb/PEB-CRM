# Inventory Module Form Field Audit (Pass 1)

**Generated:** 2025-01-06  
**Scope:** Inventory Module Form Fields  
**Objective:** Identify all form fields in Inventory Create/Edit forms with details.

---

## Form Information

**Component:** `InventoryItemForm.tsx` (lines 1-339)  
**Type Definition:** `types/peb-inventory.ts` (lines 1-728)  
**Architecture Note:** Inventory module works with Item Master module. Product definition (Brand, Grade, Spec, HSN, Dimensions, Weight, Technical Files, Default Pricing) is owned by Item Master. Inventory module only handles stock operations (Current Stock, Reserved, Issued, Available, Warehouse, Stock Movement).

**Form Sections:**
1. Item Reference (Read-only from Item Master)
2. Stock Levels
3. Warehouse & Reorder
4. Custom Fields

---

## Field Inventory

### Section 1: Item Reference (Read-only from Item Master)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| itemMasterId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must match Item Master ID | Item Reference |
| itemCode | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Item Master | - | Item Reference |
| itemName | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Item Master | - | Item Reference |
| category | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Item Master | - | Item Reference |
| brand | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Item Master | - | Item Reference |
| itemTypeClass | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From Item Master | - | Item Reference |
| unit | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | From Item Master | - | Item Reference |

**Evidence:** Lines 132-167 in InventoryItemForm.tsx, Lines 86-103 (auto-fill logic)

**Notes:**
- Item Master selection is available in create mode only
- All Item Reference fields are read-only (owned by Item Master module)
- Auto-fill logic populates fields from selected Item Master
- In edit mode, Item Master cannot be changed (reference-only)

**Auto-Fill Logic (lines 86-103):**
```typescript
const handleMasterSelect = useCallback(
  (masterId: string) => {
    const master = itemMasters?.find((m) => m.id === masterId);
    if (!master) return;
    setFormData((prev) => ({
      ...prev,
      itemMasterId: master.id,
      itemCode: master.itemCode,
      itemName: master.itemName,
      unit: prev.unit ?? (master.unit as InventoryItem['unit']),
      category: master.category,
      brand: master.brand,
      itemTypeClass: master.itemTypeClass,
      purchaseRate: master.defaultRate ?? prev.purchaseRate,
    }));
  },
  [itemMasters]
);
```

---

### Section 2: Stock Levels

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| currentStock | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 0 | Must be positive | Stock Levels |
| reservedStock | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 0 | Must be positive (if entered) | Stock Levels |
| issuedStock | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 0 | Must be positive (if entered) | Stock Levels |
| incomingStock | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 0 | Must be positive (if entered) | Stock Levels |
| outgoingStock | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 0 | Must be positive (if entered) | Stock Levels |
| purchaseRate | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 0 | Must be positive (if entered) | Stock Levels |
| status | enum | ❌ No | ✅ Yes | ❌ No | ❌ No | In Stock | Must be valid stock status enum | Stock Levels |

**Evidence:** Lines 169-246 in InventoryItemForm.tsx

**Notes:**
- currentStock is required field
- reservedStock, issuedStock, incomingStock, outgoingStock are optional
- purchaseRate is optional (can be auto-filled from Item Master defaultRate)
- status is optional with default "In Stock"

**Stock Status Options:** In Stock, Low Stock, Out of Stock, Critical, On Order, Discontinued

---

### Section 3: Warehouse & Reorder

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| warehouseId | string | ✅ Yes | ❌ No | ❌ No | ❌ No | - | Must match warehouse ID | Warehouse & Reorder |
| warehouseName | string | ❌ No | ✅ Yes | ❌ No | ✅ Yes | From warehouse selection | - | Warehouse & Reorder |
| binLocation | string | ❌ No | ✅ Yes | ❌ No | ❌ No | - | - | Warehouse & Reorder |
| minimumStock | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 0 | Must be positive | Warehouse & Reorder |
| reorderLevel | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 0 | Must be positive | Warehouse & Reorder |
| reorderQuantity | number | ❌ No | ✅ Yes | ❌ No | ❌ No | 0 | Must be positive (if entered) | Warehouse & Reorder |
| safetyStock | number | ✅ Yes | ❌ No | ❌ No | ❌ No | 0 | Must be positive | Warehouse & Reorder |

**Evidence:** Lines 248-316 in InventoryItemForm.tsx, Lines 105-115 (warehouse auto-fill logic)

**Notes:**
- warehouseId is required field
- warehouseName is auto-filled from warehouse selection
- binLocation is optional (e.g., "A-12-03")
- minimumStock, reorderLevel, safetyStock are required fields
- reorderQuantity is optional

**Warehouse Auto-Fill Logic (lines 105-115):**
```typescript
const handleWarehouseSelect = useCallback(
  (warehouseId: string) => {
    const wh = warehouses?.find((w) => w.id === warehouseId);
    setFormData((prev) => ({
      ...prev,
      warehouseId,
      warehouseName: wh?.name ?? prev.warehouseName,
    }));
  },
  [warehouses]
);
```

---

### Section 4: Custom Fields

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| customFields | Record<string, string | number | boolean> | ❌ No | ✅ Yes | ❌ No | ❌ No | - | Based on configuration | Custom Fields |

**Evidence:** Lines 318-323 in InventoryItemForm.tsx

**Notes:**
- Dynamic fields based on inventory configuration
- Can be text, number, boolean, select, or textarea type
- Validation depends on field definition

---

### System Fields (Not in Form)

| Field Name | Data Type | Required | Optional | Hidden | System Generated | Default Value | Validation | Section Name |
|------------|-----------|----------|----------|--------|------------------|--------------|------------|-------------|
| id | string | ✅ Yes | ❌ No | ❌ No | ✅ Yes | - | UUID | System |
| availableStock | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | Calculated from stock levels | System |
| totalValue | number | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Calculated | Calculated from currentStock * purchaseRate | System |
| lastUpdated | Date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current timestamp | - | System |
| createdAt | Date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current timestamp | - | System |
| updatedAt | Date | ✅ Yes | ❌ No | ❌ No | ✅ Yes | Current timestamp | - | System |

**Evidence:** Lines 119-127 (calculated fields), Lines 126 (lastUpdated)

**Calculated Fields Logic (lines 119-127):**
```typescript
const availableStock =
  (formData.currentStock ?? 0) - (formData.reservedStock ?? 0) - (formData.issuedStock ?? 0);
const totalValue = (formData.currentStock ?? 0) * (formData.purchaseRate ?? 0);
onSubmit({
  ...formData,
  availableStock,
  totalValue,
  lastUpdated: new Date(),
});
```

---

## Summary Statistics

**Total Fields Identified:** 18

**By Category:**
- Form Fields (User Input): 11
- Read-only Fields (from Item Master): 7
- System Fields: 6

**By Required Status:**
- Required in Form: 5
- Optional in Form: 6
- Read-only (from Item Master): 7
- System Generated: 6

**By Section:**
- Item Reference: 7 (all read-only from Item Master)
- Stock Levels: 7
- Warehouse & Reorder: 7
- Custom Fields: 1
- System Fields: 6

---

## Form Behavior Notes

**Create Mode:**
- Item Master selection dropdown available
- Auto-fill product data from Item Master (itemCode, itemName, category, brand, itemTypeClass, unit, purchaseRate)
- Warehouse selection dropdown available
- Auto-fill warehouseName from warehouse selection

**Edit Mode:**
- Item Master selection disabled (reference-only)
- All other fields editable
- Auto-fill does not trigger (snapshot rule)

**Item Master Auto-Fill Fields:**
- itemCode (from Item Master)
- itemName (from Item Master)
- category (from Item Master)
- brand (from Item Master)
- itemTypeClass (from Item Master)
- unit (from Item Master)
- purchaseRate (from Item Master defaultRate, if not set)

**Not Auto-Filled from Item Master:**
- All stock levels (currentStock, reservedStock, issuedStock, incomingStock, outgoingStock)
- status
- warehouseId, warehouseName, binLocation
- minimumStock, reorderLevel, reorderQuantity, safetyStock

---

## Validation Rules Summary

**Numeric Validation:**
- currentStock: Must be positive (required)
- reservedStock: Must be positive (if entered)
- issuedStock: Must be positive (if entered)
- incomingStock: Must be positive (if entered)
- outgoingStock: Must be positive (if entered)
- purchaseRate: Must be positive (if entered)
- minimumStock: Must be positive (required)
- reorderLevel: Must be positive (required)
- reorderQuantity: Must be positive (if entered)
- safetyStock: Must be positive (required)

**Enum Validation:**
- status: Must be valid stock status enum

**Cross-Field Validation:**
- availableStock is calculated: currentStock - reservedStock - issuedStock
- totalValue is calculated: currentStock * purchaseRate

---

## Architecture Note

**Item Master vs Inventory Module Separation:**

**Item Master Module (separate):**
- Product definition (Brand, Grade, Spec, HSN, Dimensions, Weight, Technical Files, Default Pricing)
- Single source of truth for product metadata
- Referenced by Inventory module

**Inventory Module (this module):**
- Stock operations only (Current Stock, Reserved, Issued, Available, Warehouse, Stock Movement)
- References Item Master for product data
- Owns stock levels and warehouse information

**Benefits of Separation:**
- Single source of truth for product data
- Inventory can reference multiple warehouses for same product
- Product metadata changes don't affect inventory records
- Clear separation of concerns

---

**End of Pass 1 Report**
