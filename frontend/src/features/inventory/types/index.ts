/**
 * Inventory Module Types
 * Single Source of Truth for all inventory data across the ERP platform
 */

export type MaterialType =
  | 'Raw Material'
  | 'Finished Goods'
  | 'Semi Finished'
  | 'Consumable'
  | 'Accessory'
  | 'Hardware'
  | 'Fastener'
  | 'Roofing Sheet'
  | 'Wall Sheet'
  | 'Structural Steel'
  | 'Electrical'
  | 'Civil Material';

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

export type InventoryCategory =
  | 'Primary Steel'
  | 'Secondary Steel'
  | 'Roofing Sheet'
  | 'Wall Sheet'
  | 'Insulation'
  | 'Flashing'
  | 'Fasteners'
  | 'Accessories'
  | 'Paint'
  | 'Hardware'
  | 'Electrical'
  | 'Civil Material'
  | 'Fabrication Material'
  | 'Finished Goods'
  | 'Consumables'
  | 'Other';

/**
 * InventoryItem -- the central material record
 * Referenced by: Projects, BOQ, Design, Procurement, Fabrication, Dispatch, Finance
 */
export interface InventoryItem {
  id: string;
  itemCode: string;

  // General Information
  itemName: string;
  category: InventoryCategory;
  subCategory?: string;
  unit: UnitType;

  // PEB Material Information
  materialType: MaterialType;
  grade?: string;
  thickness?: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  color?: string;
  coating?: string;

  // Commercial Information
  purchaseRate: number;
  sellingRate?: number;
  taxPercentage?: number;

  // Inventory Rules
  minimumStock: number;
  reorderLevel: number;
  safetyStock: number;
  warehouseId: string;
  warehouseName: string;

  // Supplier
  preferredSupplierId?: string;
  preferredSupplier?: string;

  // Stock Levels (computed)
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  totalValue: number;

  // Status
  status: StockStatus;
  lastUpdated: Date;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
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
 */
export interface Category {
  id: string;
  name: InventoryCategory | string;
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
 */
export interface InventoryFilters {
  category?: InventoryCategory;
  materialType?: MaterialType;
  warehouse?: string;
  supplier?: string;
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
  itemName: string;
  category: InventoryCategory;
  subCategory?: string;
  unit: UnitType;
  materialType: MaterialType;
  grade?: string;
  thickness?: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  color?: string;
  coating?: string;
  purchaseRate: number;
  sellingRate?: number;
  taxPercentage?: number;
  minimumStock: number;
  reorderLevel: number;
  safetyStock: number;
  warehouseId: string;
  preferredSupplierId?: string;
  status?: StockStatus;
}

export interface UpdateInventoryItemDto {
  itemName?: string;
  category?: InventoryCategory;
  subCategory?: string;
  unit?: UnitType;
  materialType?: MaterialType;
  grade?: string;
  thickness?: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  color?: string;
  coating?: string;
  purchaseRate?: number;
  sellingRate?: number;
  taxPercentage?: number;
  minimumStock?: number;
  reorderLevel?: number;
  safetyStock?: number;
  warehouseId?: string;
  preferredSupplierId?: string;
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
