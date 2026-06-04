/**
 * useLeads Hook
 * React Query hooks for leads - never use useState/useEffect for server data
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsApi, LeadsFilters } from '@/features/leads/services/leadsApi';
import { CreateLeadDto, UpdateLeadDto } from '@/features/leads/types';
import { PaginationParams } from '@/shared/types/pagination';

/**
 * Fetch all leads with pagination and filters
 */
export function useLeads(params?: PaginationParams & LeadsFilters) {
  return useQuery({
    queryKey: ['leads', params],
    queryFn: () => leadsApi.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

/**
 * Fetch single lead by ID
 */
export function useLead(id: string) {
  return useQuery({
    queryKey: ['lead', id],
    queryFn: () => leadsApi.getById(id),
    enabled: !!id, // Only fetch if ID is provided
  });
}

/**
 * Create new lead
 */
export function useCreateLead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateLeadDto) => leadsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['leads', 'stats'] });
    },
  });
}

/**
 * Update existing lead
 */
export function useUpdateLead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLeadDto }) =>
      leadsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead', id] });
    },
  });
}

/**
 * Delete lead
 */
export function useDeleteLead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => leadsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['leads', 'stats'] });
    },
  });
}

/**
 * Bulk update leads
 */
export function useBulkUpdateLeads() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ ids, data }: { ids: string[]; data: Partial<UpdateLeadDto> }) =>
      leadsApi.bulkUpdate(ids, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

/**
 * Bulk delete leads
 */
export function useBulkDeleteLeads() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (ids: string[]) => leadsApi.bulkDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['leads', 'stats'] });
    },
  });
}

/**
 * Get lead statistics
 */
export function useLeadsStats() {
  return useQuery({
    queryKey: ['leads', 'stats'],
    queryFn: () => leadsApi.getStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Usage Example:
 * 
 * const { data, isLoading, error } = useLeads({ page: 1, pageSize: 20, search: 'John' });
 * const createLead = useCreateLead();
 * 
 * const handleCreate = () => {
 *   createLead.mutate({
 *     customerName: 'John Doe',
 *     mobile: '+91 98765 43210',
 *     // ... other fields
 *   });
 * };
 */
