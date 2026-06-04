/**
 * Leads API Service
 * All API calls for leads module - never use axios directly
 */
import { api } from '@/core/api';
import { Lead, CreateLeadDto, UpdateLeadDto } from '@/features/leads/types';
import { PaginatedData, PaginationParams } from '@/shared/types/pagination';

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
  getStats: () =>
    api.get<{
      total: number;
      new: number;
      contacted: number;
      converted: number;
      revenue: number;
    }>('/api/leads/stats'),
};
