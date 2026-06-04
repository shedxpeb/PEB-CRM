/**
 * Inventory Module Constants
 * Centralized constants for material types, stock statuses, movement types, units, categories
 */

import type { MaterialType, StockStatus, MovementType, UnitType, InventoryCategory } from '@/features/inventory/types';

/**
 * Material Type options
 */
export const MATERIAL_TYPES: { value: MaterialType; label: string }[] = [
  { value: 'Raw Material', label: 'Raw Material' },
  { value: 'Finished Goods', label: 'Finished Goods' },
  { value: 'Semi Finished', label: 'Semi Finished' },
  { value: 'Consumable', label: 'Consumable' },
  { value: 'Accessory', label: 'Accessory' },
  { value: 'Hardware', label: 'Hardware' },
  { value: 'Fastener', label: 'Fastener' },
  { value: 'Roofing Sheet', label: 'Roofing Sheet' },
  { value: 'Wall Sheet', label: 'Wall Sheet' },
  { value: 'Structural Steel', label: 'Structural Steel' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'Civil Material', label: 'Civil Material' },
];

/**
 * Stock Status definitions with badge variants
 */
export const STOCK_STATUSES: {
  value: StockStatus;
  label: string;
  variant: 'default' | 'success' | 'warning' | 'destructive' | 'info' | 'secondary';
}[] = [
  { value: 'In Stock', label: 'In Stock', variant: 'success' },
  { value: 'Low Stock', label: 'Low Stock', variant: 'warning' },
  { value: 'Out of Stock', label: 'Out of Stock', variant: 'destructive' },
  { value: 'Critical', label: 'Critical', variant: 'destructive' },
  { value: 'On Order', label: 'On Order', variant: 'info' },
  { value: 'Discontinued', label: 'Discontinued', variant: 'secondary' },
];

/**
 * Movement Type definitions with badge variants
 */
export const MOVEMENT_TYPES: {
  value: MovementType;
  label: string;
  variant: 'default' | 'success' | 'warning' | 'destructive' | 'info' | 'secondary';
}[] = [
  { value: 'Stock In', label: 'Stock In', variant: 'success' },
  { value: 'Stock Out', label: 'Stock Out', variant: 'warning' },
  { value: 'Transfer', label: 'Transfer', variant: 'info' },
  { value: 'Adjustment', label: 'Adjustment', variant: 'secondary' },
  { value: 'Reservation', label: 'Reservation', variant: 'default' },
  { value: 'Release', label: 'Release', variant: 'default' },
  { value: 'Consumption', label: 'Consumption', variant: 'warning' },
];

/**
 * Unit options
 */
export const UNITS: { value: UnitType; label: string }[] = [
  { value: 'Kg', label: 'Kilogram (Kg)' },
  { value: 'Ton', label: 'Ton' },
  { value: 'Meter', label: 'Meter' },
  { value: 'SqMeter', label: 'Sq. Meter' },
  { value: 'CuMeter', label: 'Cu. Meter' },
  { value: 'Nos', label: 'Numbers (Nos)' },
  { value: 'Box', label: 'Box' },
  { value: 'Bundle', label: 'Bundle' },
  { value: 'Set', label: 'Set' },
  { value: 'Liter', label: 'Liter' },
  { value: 'Bag', label: 'Bag' },
  { value: 'Roll', label: 'Roll' },
];

/**
 * Inventory Category options
 */
export const INVENTORY_CATEGORIES: { value: InventoryCategory; label: string }[] = [
  { value: 'Primary Steel', label: 'Primary Steel' },
  { value: 'Secondary Steel', label: 'Secondary Steel' },
  { value: 'Roofing Sheet', label: 'Roofing Sheet' },
  { value: 'Wall Sheet', label: 'Wall Sheet' },
  { value: 'Insulation', label: 'Insulation' },
  { value: 'Flashing', label: 'Flashing' },
  { value: 'Fasteners', label: 'Fasteners' },
  { value: 'Accessories', label: 'Accessories' },
  { value: 'Paint', label: 'Paint' },
  { value: 'Hardware', label: 'Hardware' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'Civil Material', label: 'Civil Material' },
  { value: 'Fabrication Material', label: 'Fabrication Material' },
  { value: 'Finished Goods', label: 'Finished Goods' },
  { value: 'Consumables', label: 'Consumables' },
  { value: 'Other', label: 'Other' },
];

/**
 * Get stock status badge variant
 */
export function getStockStatusVariant(status: StockStatus) {
  return STOCK_STATUSES.find((s) => s.value === status)?.variant ?? 'secondary';
}

/**
 * Get movement type badge variant
 */
export function getMovementTypeVariant(type: MovementType) {
  return MOVEMENT_TYPES.find((m) => m.value === type)?.variant ?? 'secondary';
}
