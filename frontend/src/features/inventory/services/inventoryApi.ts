/**
 * Inventory API Service
 * All API calls for inventory module - never use axios directly
 *
 * Mock fallback: When backend is unavailable, returns mock data.
 * Remove mock fallbacks once backend is connected.
 */
import { api } from '@/core/api';
import {
  InventoryItem, Warehouse, Supplier, Category, StockMovement,
  InventoryActivity, InventoryAlert, InventoryStats, InventoryFilters,
  CreateInventoryItemDto, CreateStockMovementDto,
} from '@/features/inventory/types';
import { PaginatedData, PaginationParams } from '@/shared/types/pagination';

// ─── Mock Data (development only - remove when backend is ready) ─────────────

const MOCK_WAREHOUSES: Warehouse[] = [
  { id: 'w1', warehouseCode: 'WH-001', name: 'Main Warehouse', location: 'Pune MIDC, Maharashtra', manager: 'Rajesh Patil', contactNumber: '+91 98765 43210', capacity: 50000, currentOccupancy: 32000, status: 'Active' },
  { id: 'w2', warehouseCode: 'WH-002', name: 'Fabrication Yard', location: 'Hinjewadi Phase 2, Pune', manager: 'Sunil Kamble', contactNumber: '+91 87654 32109', capacity: 20000, currentOccupancy: 14500, status: 'Active' },
  { id: 'w3', warehouseCode: 'WH-003', name: 'Site Store - Mumbai', location: 'BKC, Mumbai', manager: 'Amit Shah', contactNumber: '+91 76543 21098', capacity: 10000, currentOccupancy: 6800, status: 'Active' },
  { id: 'w4', warehouseCode: 'WH-004', name: 'Regional Store - Nashik', location: 'Satpur, Nashik', manager: 'Vikas More', contactNumber: '+91 65432 10987', capacity: 8000, currentOccupancy: 3200, status: 'Active' },
];

const MOCK_SUPPLIERS: Supplier[] = [
  { id: 's1', name: 'Tata Steel Ltd', gstNumber: '27AAACT1234A1Z5', contactPerson: 'Anil Mehta', mobile: '+91 98765 11111', email: 'sales@tatasteel.com', address: 'Bombay House', city: 'Mumbai', state: 'Maharashtra', suppliedMaterials: ['Structural Steel', 'Roofing Sheet'], leadTime: 14, status: 'Active' },
  { id: 's2', name: 'JSW Steel', gstNumber: '27AAACJ5678B1Z3', contactPerson: 'Ravi Kumar', mobile: '+91 87654 22222', email: 'supply@jswsteel.com', address: 'Bandra Kurla Complex', city: 'Mumbai', state: 'Maharashtra', suppliedMaterials: ['Primary Steel', 'Secondary Steel'], leadTime: 21, status: 'Active' },
  { id: 's3', name: 'Hindustan Fasteners', gstNumber: '27AABCH9012C1Z1', contactPerson: 'Deepak Joshi', mobile: '+91 76543 33333', email: 'orders@hindfasteners.com', address: 'MIDC Bhosari', city: 'Pune', state: 'Maharashtra', suppliedMaterials: ['Fasteners', 'Hardware'], leadTime: 7, status: 'Active' },
  { id: 's4', name: 'Asian Paints Industrial', gstNumber: '27AABCA3456D1Z2', contactPerson: 'Sneha Reddy', mobile: '+91 65432 44444', email: 'industrial@asianpaints.com', address: 'GIDC Ankleshwar', city: 'Ankleshwar', state: 'Gujarat', suppliedMaterials: ['Paint', 'Coating'], leadTime: 5, status: 'Active' },
  { id: 's5', name: 'Everest Roofing', gstNumber: '27AABCE7890E1Z4', contactPerson: 'Manoj Tiwari', mobile: '+91 54321 55555', email: 'sales@everestroofing.com', address: 'Industrial Area Phase 1', city: 'Noida', state: 'Uttar Pradesh', suppliedMaterials: ['Roofing Sheet', 'Wall Sheet', 'Insulation'], leadTime: 10, status: 'Active' },
];

const MOCK_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Primary Steel', description: 'Main structural steel members', itemCount: 12, status: 'Active' },
  { id: 'c2', name: 'Secondary Steel', description: 'Purlins, girts, secondary members', itemCount: 8, status: 'Active' },
  { id: 'c3', name: 'Roofing Sheet', description: 'Metal roofing sheets and accessories', itemCount: 6, status: 'Active' },
  { id: 'c4', name: 'Wall Sheet', description: 'Wall cladding sheets', itemCount: 4, status: 'Active' },
  { id: 'c5', name: 'Insulation', description: 'Thermal and acoustic insulation', itemCount: 3, status: 'Active' },
  { id: 'c6', name: 'Flashing', description: 'Ridge cap, eave flashing, corner flashing', itemCount: 5, status: 'Active' },
  { id: 'c7', name: 'Fasteners', description: 'Bolts, nuts, screws, anchors', itemCount: 18, status: 'Active' },
  { id: 'c8', name: 'Accessories', description: 'Gutters, downspouts, ventilators', itemCount: 7, status: 'Active' },
  { id: 'c9', name: 'Paint', description: 'Primer, finish coat, epoxy coatings', itemCount: 4, status: 'Active' },
  { id: 'c10', name: 'Hardware', description: 'Door hardware, hinges, locks', itemCount: 9, status: 'Active' },
  { id: 'c11', name: 'Electrical', description: 'Wiring, panels, lighting', itemCount: 6, status: 'Active' },
  { id: 'c12', name: 'Civil Material', description: 'Cement, sand, aggregate, bricks', itemCount: 8, status: 'Active' },
  { id: 'c13', name: 'Fabrication Material', description: 'Welding rods, gas, grinding discs', itemCount: 11, status: 'Active' },
  { id: 'c14', name: 'Finished Goods', description: 'Completed PEB components', itemCount: 3, status: 'Active' },
  { id: 'c15', name: 'Consumables', description: 'Safety equipment, tools, PPE', itemCount: 14, status: 'Active' },
  { id: 'c16', name: 'Other', description: 'Miscellaneous items', itemCount: 2, status: 'Active' },
];

const MOCK_ITEMS: InventoryItem[] = [
  {
    id: '1', itemCode: 'INV-0001', itemName: 'ISMB 300 Steel Beam', category: 'Primary Steel', unit: 'Kg',
    materialType: 'Structural Steel', grade: 'E250', weight: 46.1, length: 12000,
    purchaseRate: 65, sellingRate: 85, taxPercentage: 18, minimumStock: 5000, reorderLevel: 2000, safetyStock: 1000,
    warehouseId: 'w1', warehouseName: 'Main Warehouse', preferredSupplierId: 's2', preferredSupplier: 'JSW Steel',
    currentStock: 8500, reservedStock: 2000, availableStock: 6500, totalValue: 552500, status: 'In Stock',
    lastUpdated: new Date('2024-06-10'),
  },
  {
    id: '2', itemCode: 'INV-0002', itemName: 'ISMB 200 Steel Beam', category: 'Primary Steel', unit: 'Kg',
    materialType: 'Structural Steel', grade: 'E250', weight: 25.4, length: 12000,
    purchaseRate: 62, sellingRate: 80, taxPercentage: 18, minimumStock: 3000, reorderLevel: 1500, safetyStock: 500,
    warehouseId: 'w1', warehouseName: 'Main Warehouse', preferredSupplierId: 's2', preferredSupplier: 'JSW Steel',
    currentStock: 4200, reservedStock: 1500, availableStock: 2700, totalValue: 260400, status: 'In Stock',
    lastUpdated: new Date('2024-06-08'),
  },
  {
    id: '3', itemCode: 'INV-0003', itemName: 'Z-Purlin 200x75x20x2mm', category: 'Secondary Steel', unit: 'Meter',
    materialType: 'Structural Steel', grade: 'E300', thickness: 2, weight: 4.2, length: 12000,
    purchaseRate: 95, sellingRate: 120, taxPercentage: 18, minimumStock: 500, reorderLevel: 200, safetyStock: 100,
    warehouseId: 'w2', warehouseName: 'Fabrication Yard', preferredSupplierId: 's1', preferredSupplier: 'Tata Steel Ltd',
    currentStock: 320, reservedStock: 100, availableStock: 220, totalValue: 30400, status: 'Low Stock',
    lastUpdated: new Date('2024-06-12'),
  },
  {
    id: '4', itemCode: 'INV-0004', itemName: 'Trapezoidal Roof Sheet 0.5mm', category: 'Roofing Sheet', unit: 'SqMeter',
    materialType: 'Roofing Sheet', thickness: 0.5, color: 'Blue', coating: 'Galvalume',
    purchaseRate: 320, sellingRate: 420, taxPercentage: 18, minimumStock: 200, reorderLevel: 100, safetyStock: 50,
    warehouseId: 'w1', warehouseName: 'Main Warehouse', preferredSupplierId: 's5', preferredSupplier: 'Everest Roofing',
    currentStock: 450, reservedStock: 150, availableStock: 300, totalValue: 144000, status: 'In Stock',
    lastUpdated: new Date('2024-06-11'),
  },
  {
    id: '5', itemCode: 'INV-0005', itemName: 'High Strength Bolt M20x70 (8.8)', category: 'Fasteners', unit: 'Nos',
    materialType: 'Fastener', grade: '8.8',
    purchaseRate: 45, sellingRate: 65, taxPercentage: 18, minimumStock: 500, reorderLevel: 200, safetyStock: 100,
    warehouseId: 'w2', warehouseName: 'Fabrication Yard', preferredSupplierId: 's3', preferredSupplier: 'Hindustan Fasteners',
    currentStock: 0, reservedStock: 0, availableStock: 0, totalValue: 0, status: 'Out of Stock',
    lastUpdated: new Date('2024-06-05'),
  },
  {
    id: '6', itemCode: 'INV-0006', itemName: 'Anchor Bolt M24x600', category: 'Fasteners', unit: 'Nos',
    materialType: 'Fastener', grade: '4.6',
    purchaseRate: 180, sellingRate: 250, taxPercentage: 18, minimumStock: 100, reorderLevel: 50, safetyStock: 25,
    warehouseId: 'w1', warehouseName: 'Main Warehouse', preferredSupplierId: 's3', preferredSupplier: 'Hindustan Fasteners',
    currentStock: 45, reservedStock: 30, availableStock: 15, totalValue: 8100, status: 'Low Stock',
    lastUpdated: new Date('2024-06-09'),
  },
  {
    id: '7', itemCode: 'INV-0007', itemName: 'Red Oxide Primer 20L', category: 'Paint', unit: 'Liter',
    materialType: 'Consumable',
    purchaseRate: 280, sellingRate: 380, taxPercentage: 18, minimumStock: 50, reorderLevel: 20, safetyStock: 10,
    warehouseId: 'w2', warehouseName: 'Fabrication Yard', preferredSupplierId: 's4', preferredSupplier: 'Asian Paints Industrial',
    currentStock: 120, reservedStock: 0, availableStock: 120, totalValue: 33600, status: 'In Stock',
    lastUpdated: new Date('2024-06-07'),
  },
  {
    id: '8', itemCode: 'INV-0008', itemName: 'Glass Wool Insulation 50mm', category: 'Insulation', unit: 'SqMeter',
    materialType: 'Raw Material', thickness: 50,
    purchaseRate: 180, sellingRate: 250, taxPercentage: 18, minimumStock: 100, reorderLevel: 50, safetyStock: 25,
    warehouseId: 'w1', warehouseName: 'Main Warehouse', preferredSupplierId: 's5', preferredSupplier: 'Everest Roofing',
    currentStock: 15, reservedStock: 10, availableStock: 5, totalValue: 2700, status: 'Critical',
    lastUpdated: new Date('2024-06-13'),
  },
  {
    id: '9', itemCode: 'INV-0009', itemName: 'C-Channel 150x75x20x3mm', category: 'Secondary Steel', unit: 'Meter',
    materialType: 'Structural Steel', grade: 'E250', thickness: 3, weight: 5.1, length: 6000,
    purchaseRate: 110, sellingRate: 145, taxPercentage: 18, minimumStock: 300, reorderLevel: 150, safetyStock: 50,
    warehouseId: 'w2', warehouseName: 'Fabrication Yard', preferredSupplierId: 's1', preferredSupplier: 'Tata Steel Ltd',
    currentStock: 280, reservedStock: 80, availableStock: 200, totalValue: 30800, status: 'Low Stock',
    lastUpdated: new Date('2024-06-10'),
  },
  {
    id: '10', itemCode: 'INV-0010', itemName: 'Wall Cladding Sheet 0.45mm', category: 'Wall Sheet', unit: 'SqMeter',
    materialType: 'Wall Sheet', thickness: 0.45, color: 'Off White', coating: 'Galvalume',
    purchaseRate: 290, sellingRate: 380, taxPercentage: 18, minimumStock: 150, reorderLevel: 75, safetyStock: 30,
    warehouseId: 'w1', warehouseName: 'Main Warehouse', preferredSupplierId: 's5', preferredSupplier: 'Everest Roofing',
    currentStock: 0, reservedStock: 0, availableStock: 0, totalValue: 0, status: 'Out of Stock',
    lastUpdated: new Date('2024-06-01'),
  },
  {
    id: '11', itemCode: 'INV-0011', itemName: 'Welding Rod E7018 3.15mm', category: 'Fabrication Material', unit: 'Kg',
    materialType: 'Consumable',
    purchaseRate: 120, sellingRate: 160, taxPercentage: 18, minimumStock: 100, reorderLevel: 50, safetyStock: 20,
    warehouseId: 'w2', warehouseName: 'Fabrication Yard',
    currentStock: 250, reservedStock: 50, availableStock: 200, totalValue: 30000, status: 'In Stock',
    lastUpdated: new Date('2024-06-12'),
  },
  {
    id: '12', itemCode: 'INV-0012', itemName: 'Turbo Ventilator 24 inch', category: 'Accessories', unit: 'Nos',
    materialType: 'Accessory',
    purchaseRate: 3500, sellingRate: 4800, taxPercentage: 18, minimumStock: 10, reorderLevel: 5, safetyStock: 2,
    warehouseId: 'w3', warehouseName: 'Site Store - Mumbai',
    currentStock: 8, reservedStock: 4, availableStock: 4, totalValue: 28000, status: 'Low Stock',
    lastUpdated: new Date('2024-06-11'),
  },
];

const MOCK_MOVEMENTS: StockMovement[] = [
  { id: 'm1', movementNumber: 'SM-0001', itemId: '1', itemName: 'ISMB 300 Steel Beam', type: 'Stock In', quantity: 5000, warehouseId: 'w1', warehouse: 'Main Warehouse', referenceNumber: 'PO-2024-045', referenceType: 'Purchase Order', performedBy: 'Rajesh Patil', remarks: 'Received from JSW Steel', date: new Date('2024-06-10') },
  { id: 'm2', movementNumber: 'SM-0002', itemId: '4', itemName: 'Trapezoidal Roof Sheet 0.5mm', type: 'Stock Out', quantity: 100, warehouseId: 'w1', warehouse: 'Main Warehouse', referenceNumber: 'PRJ-2024-008', referenceType: 'Project', performedBy: 'Amit Shah', remarks: 'Issued for Warehouse project', date: new Date('2024-06-11') },
  { id: 'm3', movementNumber: 'SM-0003', itemId: '3', itemName: 'Z-Purlin 200x75x20x2mm', type: 'Reservation', quantity: 100, warehouseId: 'w2', warehouse: 'Fabrication Yard', referenceNumber: 'PRJ-2024-012', referenceType: 'Project', performedBy: 'Sunil Kamble', remarks: 'Reserved for Factory Shed', date: new Date('2024-06-12') },
  { id: 'm4', movementNumber: 'SM-0004', itemId: '7', itemName: 'Red Oxide Primer 20L', type: 'Consumption', quantity: 20, warehouseId: 'w2', warehouse: 'Fabrication Yard', referenceNumber: 'FAB-045', referenceType: 'Fabrication', performedBy: 'Sunil Kamble', remarks: 'Used for beam painting', date: new Date('2024-06-07') },
  { id: 'm5', movementNumber: 'SM-0005', itemId: '1', itemName: 'ISMB 300 Steel Beam', type: 'Transfer', quantity: 1500, warehouseId: 'w2', warehouse: 'Fabrication Yard', referenceNumber: 'TR-012', referenceType: 'Transfer', performedBy: 'Rajesh Patil', remarks: 'Transferred to fabrication yard', date: new Date('2024-06-09') },
  { id: 'm6', movementNumber: 'SM-0006', itemId: '11', itemName: 'Welding Rod E7018 3.15mm', type: 'Stock In', quantity: 100, warehouseId: 'w2', warehouse: 'Fabrication Yard', referenceNumber: 'PO-2024-052', referenceType: 'Purchase Order', performedBy: 'Sunil Kamble', date: new Date('2024-06-12') },
  { id: 'm7', movementNumber: 'SM-0007', itemId: '9', itemName: 'C-Channel 150x75x20x3mm', type: 'Adjustment', quantity: -20, warehouseId: 'w2', warehouse: 'Fabrication Yard', referenceNumber: 'ADJ-005', referenceType: 'Adjustment', performedBy: 'Sunil Kamble', remarks: 'Physical count correction', date: new Date('2024-06-10') },
  { id: 'm8', movementNumber: 'SM-0008', itemId: '6', itemName: 'Anchor Bolt M24x600', type: 'Stock Out', quantity: 30, warehouseId: 'w1', warehouse: 'Main Warehouse', referenceNumber: 'PRJ-2024-008', referenceType: 'Project', performedBy: 'Amit Shah', remarks: 'Foundation bolts for site', date: new Date('2024-06-09') },
];

const MOCK_ACTIVITIES: InventoryActivity[] = [
  { id: 'a1', itemId: '1', type: 'item_created', description: 'Item ISMB 300 Steel Beam created', performedBy: 'Vikram Singh', performedAt: new Date('2024-01-15T10:00:00') },
  { id: 'a2', itemId: '1', type: 'stock_in', description: 'Stock In: 5000 Kg received from JSW Steel', performedBy: 'Rajesh Patil', performedAt: new Date('2024-06-10T09:30:00') },
  { id: 'a3', itemId: '1', type: 'transfer', description: '1500 Kg transferred to Fabrication Yard', performedBy: 'Rajesh Patil', performedAt: new Date('2024-06-09T14:00:00') },
  { id: 'a4', itemId: '1', type: 'stock_out', description: '2000 Kg reserved for PRJ-2024-008', performedBy: 'Amit Shah', performedAt: new Date('2024-06-08T11:00:00') },
  { id: 'a5', itemId: '5', type: 'reorder_triggered', description: 'High Strength Bolt M20x70 below minimum stock - reorder required', performedBy: 'System', performedAt: new Date('2024-06-05T08:00:00') },
  { id: 'a6', itemId: '8', type: 'status_changed', description: 'Status changed to Critical - stock at 15 SqMeter', performedBy: 'System', performedAt: new Date('2024-06-13T06:00:00') },
];

const MOCK_ALERTS: InventoryAlert[] = [
  { id: 'al1', itemId: '5', itemName: 'High Strength Bolt M20x70 (8.8)', itemCode: 'INV-0005', type: 'Out of Stock', currentStock: 0, threshold: 500, severity: 'critical', createdAt: new Date('2024-06-05') },
  { id: 'al2', itemId: '10', itemName: 'Wall Cladding Sheet 0.45mm', itemCode: 'INV-0010', type: 'Out of Stock', currentStock: 0, threshold: 150, severity: 'critical', createdAt: new Date('2024-06-01') },
  { id: 'al3', itemId: '8', itemName: 'Glass Wool Insulation 50mm', itemCode: 'INV-0008', type: 'Critical Stock', currentStock: 15, threshold: 100, severity: 'critical', createdAt: new Date('2024-06-13') },
  { id: 'al4', itemId: '3', itemName: 'Z-Purlin 200x75x20x2mm', itemCode: 'INV-0003', type: 'Low Stock', currentStock: 320, threshold: 500, severity: 'warning', createdAt: new Date('2024-06-12') },
  { id: 'al5', itemId: '6', itemName: 'Anchor Bolt M24x600', itemCode: 'INV-0006', type: 'Low Stock', currentStock: 45, threshold: 100, severity: 'warning', createdAt: new Date('2024-06-09') },
  { id: 'al6', itemId: '9', itemName: 'C-Channel 150x75x20x3mm', itemCode: 'INV-0009', type: 'Low Stock', currentStock: 280, threshold: 300, severity: 'warning', createdAt: new Date('2024-06-10') },
  { id: 'al7', itemId: '12', itemName: 'Turbo Ventilator 24 inch', itemCode: 'INV-0012', type: 'Reorder Required', currentStock: 8, threshold: 10, severity: 'warning', createdAt: new Date('2024-06-11') },
];

/** Check if error is a connection failure (no backend) */
function isConnectionError(error: unknown): boolean {
  if (error && typeof error === 'object') {
    const err = error as any;
    if (err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED' || err.code === 'ERR_CONNECTION_REFUSED') return true;
    if (!err.response && err.message && err.message.toLowerCase().includes('network')) return true;
  }
  return false;
}

// ─── API Service ──────────────────────────────────────────────────────────────

export const inventoryApi = {
  // ─── Items ───────────────────────────────────────────────────────────────

  getAll: async (params?: PaginationParams & InventoryFilters): Promise<PaginatedData<InventoryItem>> => {
    try {
      return await api.get<PaginatedData<InventoryItem>>('/api/inventory', { params });
    } catch (error) {
      if (isConnectionError(error)) {
        const page = params?.page ?? 1;
        const pageSize = params?.pageSize ?? 20;
        return {
          data: MOCK_ITEMS.slice((page - 1) * pageSize, page * pageSize),
          meta: { page, pageSize, total: MOCK_ITEMS.length, totalPages: Math.ceil(MOCK_ITEMS.length / pageSize), hasNext: false, hasPrevious: false },
        };
      }
      throw error;
    }
  },

  getById: async (id: string): Promise<InventoryItem> => {
    try {
      return await api.get<InventoryItem>(`/api/inventory/${id}`);
    } catch (error) {
      if (isConnectionError(error)) {
        const item = MOCK_ITEMS.find((i) => i.id === id);
        if (item) return item;
        throw new Error(`Inventory item not found: ${id}`);
      }
      throw error;
    }
  },

  create: (data: any) => api.post<InventoryItem>('/api/inventory', data),
  update: (id: string, data: any) => api.patch<InventoryItem>(`/api/inventory/${id}`, data),
  delete: (id: string) => api.delete(`/api/inventory/${id}`),

  getStats: async (): Promise<InventoryStats> => {
    try {
      return await api.get<InventoryStats>('/api/inventory/stats');
    } catch (error) {
      if (isConnectionError(error)) {
        return {
          totalItems: MOCK_ITEMS.length,
          totalValue: MOCK_ITEMS.reduce((s, i) => s + i.totalValue, 0),
          lowStockItems: MOCK_ITEMS.filter((i) => i.status === 'Low Stock').length,
          outOfStockItems: MOCK_ITEMS.filter((i) => i.status === 'Out of Stock').length,
          incomingStock: 3,
          outgoingStock: 5,
          reservedStock: MOCK_ITEMS.reduce((s, i) => s + i.reservedStock, 0),
          activeSuppliers: MOCK_SUPPLIERS.filter((s) => s.status === 'Active').length,
          pendingPurchaseRequests: 4,
          materialShortages: MOCK_ALERTS.filter((a) => a.severity === 'critical').length,
        };
      }
      throw error;
    }
  },

  getActivities: async (id: string): Promise<InventoryActivity[]> => {
    try {
      return await api.get<InventoryActivity[]>(`/api/inventory/${id}/activities`);
    } catch (error) {
      if (isConnectionError(error)) return MOCK_ACTIVITIES.filter((a) => a.itemId === id);
      throw error;
    }
  },

  // ─── Warehouses ──────────────────────────────────────────────────────────

  getWarehouses: async (): Promise<Warehouse[]> => {
    try {
      return await api.get<Warehouse[]>('/api/inventory/warehouses');
    } catch (error) {
      if (isConnectionError(error)) return MOCK_WAREHOUSES;
      throw error;
    }
  },

  createWarehouse: (data: any) => api.post<Warehouse>('/api/inventory/warehouses', data),
  updateWarehouse: (id: string, data: any) => api.patch<Warehouse>(`/api/inventory/warehouses/${id}`, data),

  // ─── Suppliers ───────────────────────────────────────────────────────────

  getSuppliers: async (): Promise<Supplier[]> => {
    try {
      return await api.get<Supplier[]>('/api/inventory/suppliers');
    } catch (error) {
      if (isConnectionError(error)) return MOCK_SUPPLIERS;
      throw error;
    }
  },

  createSupplier: (data: any) => api.post<Supplier>('/api/inventory/suppliers', data),
  updateSupplier: (id: string, data: any) => api.patch<Supplier>(`/api/inventory/suppliers/${id}`, data),

  // ─── Categories ──────────────────────────────────────────────────────────

  getCategories: async (): Promise<Category[]> => {
    try {
      return await api.get<Category[]>('/api/inventory/categories');
    } catch (error) {
      if (isConnectionError(error)) return MOCK_CATEGORIES;
      throw error;
    }
  },

  createCategory: (data: any) => api.post<Category>('/api/inventory/categories', data),

  // ─── Stock Movements ─────────────────────────────────────────────────────

  getMovements: async (params?: PaginationParams): Promise<PaginatedData<StockMovement>> => {
    try {
      return await api.get<PaginatedData<StockMovement>>('/api/inventory/movements', { params });
    } catch (error) {
      if (isConnectionError(error)) {
        const page = params?.page ?? 1;
        const pageSize = params?.pageSize ?? 20;
        return {
          data: MOCK_MOVEMENTS.slice((page - 1) * pageSize, page * pageSize),
          meta: { page, pageSize, total: MOCK_MOVEMENTS.length, totalPages: Math.ceil(MOCK_MOVEMENTS.length / pageSize), hasNext: false, hasPrevious: false },
        };
      }
      throw error;
    }
  },

  createMovement: (data: any) => api.post<StockMovement>('/api/inventory/movements', data),

  getMovementHistory: async (itemId: string): Promise<StockMovement[]> => {
    try {
      return await api.get<StockMovement[]>(`/api/inventory/${itemId}/movements`);
    } catch (error) {
      if (isConnectionError(error)) return MOCK_MOVEMENTS.filter((m) => m.itemId === itemId);
      throw error;
    }
  },

  // ─── Alerts ──────────────────────────────────────────────────────────────

  getAlerts: async (): Promise<InventoryAlert[]> => {
    try {
      return await api.get<InventoryAlert[]>('/api/inventory/alerts');
    } catch (error) {
      if (isConnectionError(error)) return MOCK_ALERTS;
      throw error;
    }
  },
};
