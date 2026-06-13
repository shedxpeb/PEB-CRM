/**
 * Leads API Service
 * All API calls for leads module - never use axios directly
 *
 * Mock fallback: When backend is unavailable, returns mock data.
 * Remove mock fallbacks once backend is connected.
 */
import { api } from '@/core/api';
import { Lead, CreateLeadDto, UpdateLeadDto } from '@/features/leads/types';
import { PaginatedData, PaginationParams } from '@/shared/types/pagination';

// ─── Mock Data (development only - remove when backend is ready) ─────────────

const MOCK_STATS = {
  total: 156,
  new: 42,
  contacted: 38,
  converted: 28,
  revenue: 4500000,
};

/** Check if error is a connection failure (no backend) */
function isConnectionError(error: unknown): boolean {
  if (error && typeof error === 'object') {
    const err = error as any;
    if (err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED' || err.code === 'ERR_CONNECTION_REFUSED') return true;
    if (!err.response && err.message && err.message.toLowerCase().includes('network')) return true;
  }
  return false;
}

export interface LeadsFilters {
  search?: string;
  status?: string;
  priority?: string;
  assignedEmployee?: string;
  createdFrom?: string;
  createdTo?: string;
}

export const leadsApi = {
  /**
   * Get all leads with pagination and filters
   */
  getAll: (params?: PaginationParams & LeadsFilters) =>
    api.get<PaginatedData<Lead>>('/api/leads', { params }),

  /**
   * Get single lead by ID
   */
  getById: (id: string) =>
    api.get<Lead>(`/api/leads/${id}`),

  /**
   * Create new lead
   */
  create: (data: CreateLeadDto) =>
    api.post<Lead>('/api/leads', data),

  /**
   * Update existing lead
   */
  update: (id: string, data: UpdateLeadDto) =>
    api.patch<Lead>(`/api/leads/${id}`, data),

  /**
   * Delete lead
   */
  delete: (id: string) =>
    api.delete(`/api/leads/${id}`),

  /**
   * Bulk update leads
   */
  bulkUpdate: (ids: string[], data: Partial<UpdateLeadDto>) =>
    api.patch<{ count: number }>('/api/leads/bulk', { ids, data }),

  /**
   * Bulk delete leads
   */
  bulkDelete: (ids: string[]) =>
    api.delete<{ count: number }>('/api/leads/bulk', { data: { ids } }),

  /**
   * Export leads to CSV/Excel
   */
  export: (params?: LeadsFilters) =>
    api.get<Blob>('/api/leads/export', { params, responseType: 'blob' }),

  /**
   * Import leads from CSV/Excel
   */
  import: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<{ count: number }>('/api/leads/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /**
   * Get lead statistics
   */
  getStats: async () => {
    try {
      return await api.get<{
        total: number;
        new: number;
        contacted: number;
        converted: number;
        revenue: number;
      }>('/api/leads/stats');
    } catch (error) {
      if (isConnectionError(error)) {
        return MOCK_STATS;
      }
      throw error;
    }
  },
};
