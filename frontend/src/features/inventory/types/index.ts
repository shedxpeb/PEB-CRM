/**
 * Inventory Module Types
 * Stock Management Only - No Product Metadata
 * 
 * Architecture:
 * - Item Master → Product definition (Brand, Grade, Spec, HSN, Dimensions, Weight, Technical Files, Default Pricing)
 * - Inventory → Stock operations only (Current Stock, Reserved, Issued, Available, Warehouse, Stock Movement)
 * 
 * Inventory is NOT a product catalog. It only tracks stock levels and movements.
 */

export type StockStatus =
  | 'In Stock'
  | 'Low Stock'
  | 'Out of Stock'
  | 'Critical'
  | 'On Order'
  | 'Discontinued';

export type MovementType =
  | 'Stock In'
  | 'Stock Out'
  | 'Transfer'
  | 'Adjustment'
  | 'Reservation'
  | 'Release'
  | 'Consumption';

export type UnitType =
  | 'Kg' | 'Ton' | 'Meter' | 'SqMeter' | 'CuMeter'
  | 'Nos' | 'Box' | 'Bundle' | 'Set' | 'Liter' | 'Bag' | 'Roll';

/**
 * InventoryItem -- Stock Management Only
 * Referenced by: Projects, Dispatch, Finance
 * 
 * This is NOT a product catalog. Product metadata (Brand, Grade, Spec, HSN, etc.)
 * belongs in Item Master module.
 * 
 * Inventory only tracks:
 * - Stock levels (current, reserved, issued, available)
 * - Stock movements
 * - Warehouse location
 * - Stock rules (min, reorder, safety)
 */
export interface InventoryItem {
  id: string;
  itemCode: string;
  itemMasterId: string; // Reference to Item Master for product details
  itemName: string; // Display name only, full details in Item Master
  unit: UnitType;

  // Stock Levels
  currentStock: number;
  reservedStock: number;
  issuedStock: number;
  availableStock: number;
  totalValue: number;

  // Inventory Rules
  minimumStock: number;
  reorderLevel: number;
  safetyStock: number;
  
  // Warehouse
  warehouseId: string;
  warehouseName: string;

  // Status
  status: StockStatus;
  lastUpdated: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * ProjectStockAllocation -- Stock allocated to projects
 * Shows actual quantities: Reserved, Issued, Remaining
 */
export interface ProjectStockAllocation {
  projectId: string;
  projectNumber: string;
  projectName: string;
  customerName: string;
  reservedQuantity: number;
  issuedQuantity: number;
  balanceQuantity: number;
  status: 'Active' | 'Completed' | 'Cancelled';
}

/**
 * Warehouse master
 */
export interface Warehouse {
  id: string;
  warehouseCode: string;
  name: string;
  location: string;
  manager: string;
  contactNumber: string;
  capacity: number;
  currentOccupancy: number;
  status: 'Active' | 'Inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Supplier master
 */
export interface Supplier {
  id: string;
  name: string;
  gstNumber?: string;
  contactPerson: string;
  mobile: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  suppliedMaterials: string[];
  leadTime?: number;
  status: 'Active' | 'Inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Material Category
 * Note: Category belongs in Item Master, not Inventory
 * Keeping here for backward compatibility during migration
 */
export interface Category {
  id: string;
  name: string;
  parentId?: string;
  description?: string;
  itemCount: number;
  status: 'Active' | 'Inactive';
}

/**
 * Stock Movement -- every inventory transaction is tracked
 */
export interface StockMovement {
  id: string;
  movementNumber: string;
  itemId: string;
  itemName: string;
  type: MovementType;
  quantity: number;
  warehouseId: string;
  warehouse: string;
  referenceNumber?: string;
  referenceType?: string;
  performedBy: string;
  remarks?: string;
  date: Date;
}

/**
 * Inventory Activity -- timeline events
 */
export type InventoryActivityType =
  | 'item_created'
  | 'item_updated'
  | 'stock_in'
  | 'stock_out'
  | 'transfer'
  | 'adjustment'
  | 'reservation'
  | 'release'
  | 'reorder_triggered'
  | 'status_changed'
  | 'warehouse_changed'
  | 'consumption';

export interface InventoryActivity {
  id: string;
  itemId: string;
  type: InventoryActivityType;
  description: string;
  performedBy: string;
  performedAt: Date;
  metadata?: Record<string, any>;
}

/**
 * Inventory Alert
 */
export interface InventoryAlert {
  id: string;
  itemId: string;
  itemName: string;
  itemCode: string;
  type: 'Low Stock' | 'Out of Stock' | 'Reorder Required' | 'Critical Stock';
  currentStock: number;
  threshold: number;
  severity: 'info' | 'warning' | 'critical';
  createdAt: Date;
}

/**
 * Inventory Filters
 * Note: Category and MaterialType filters belong in Item Master
 * Inventory filters should only be stock-related
 */
export interface InventoryFilters {
  warehouse?: string;
  stockStatus?: StockStatus;
  unit?: UnitType;
  dateFrom?: Date;
  dateTo?: Date;
}

/**
 * Inventory Stats
 */
export interface InventoryStats {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  incomingStock: number;
  outgoingStock: number;
  reservedStock: number;
  activeSuppliers: number;
  pendingPurchaseRequests: number;
  materialShortages: number;
}

// ─── DTOs ──────────────────────────────────────────────────────────────────────

export interface CreateInventoryItemDto {
  itemMasterId: string;
  itemCode: string;
  itemName: string;
  unit: UnitType;
  minimumStock: number;
  reorderLevel: number;
  safetyStock: number;
  warehouseId: string;
  status?: StockStatus;
}

export interface UpdateInventoryItemDto {
  itemCode?: string;
  itemName?: string;
  unit?: UnitType;
  minimumStock?: number;
  reorderLevel?: number;
  safetyStock?: number;
  warehouseId?: string;
  status?: StockStatus;
}

export interface CreateWarehouseDto {
  name: string;
  location: string;
  manager: string;
  contactNumber: string;
  capacity: number;
}

export interface CreateSupplierDto {
  name: string;
  gstNumber?: string;
  contactPerson: string;
  mobile: string;
  email?: string;
  address: string;
  city: string;
  state: string;
}

export interface CreateCategoryDto {
  name: string;
  parentId?: string;
  description?: string;
}

export interface CreateStockMovementDto {
  itemId: string;
  type: MovementType;
  quantity: number;
  warehouseId: string;
  referenceNumber?: string;
  referenceType?: string;
  remarks?: string;
}
