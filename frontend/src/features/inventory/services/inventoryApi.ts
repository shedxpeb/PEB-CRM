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
import {
  MOCK_WAREHOUSES,
  MOCK_SUPPLIERS,
  MOCK_CATEGORIES,
  MOCK_ITEMS,
  MOCK_MOVEMENTS,
  MOCK_ACTIVITIES,
  MOCK_ALERTS,
} from '../data/mockInventoryData';

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
