/**
 * useCustomers Hook
 * React Query hooks for customers - never use useState/useEffect for server data
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customersApi } from '@/features/customers/services/customersApi';
import { CustomerFilters, CreateCustomerDto, UpdateCustomerDto, ConvertLeadToCustomerDto } from '@/features/customers/types';
import { PaginationParams } from '@/shared/types/pagination';

/**
 * Fetch all customers with pagination and filters
 */
export function useCustomers(params?: PaginationParams & CustomerFilters) {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => customersApi.getAll(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

/**
 * Fetch single customer by ID
 */
export function useCustomer(id: string) {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => customersApi.getById(id),
    enabled: !!id,
    refetchOnMount: false,
  });
}

/**
 * Create new customer
 */
export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCustomerDto) => customersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customers', 'stats'] });
    },
  });
}

/**
 * Update existing customer
 */
export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCustomerDto }) =>
      customersApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customer', id] });
    },
  });
}

/**
 * Delete customer
 */
export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => customersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customers', 'stats'] });
    },
  });
}

/**
 * Bulk update customers
 */
export function useBulkUpdateCustomers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ids, data }: { ids: string[]; data: Partial<UpdateCustomerDto> }) =>
      customersApi.bulkUpdate(ids, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
}

/**
 * Bulk delete customers
 */
export function useBulkDeleteCustomers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => customersApi.bulkDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customers', 'stats'] });
    },
  });
}

/**
 * Get customer statistics
 * Optimized for dashboard with faster retry
 */
export function useCustomersStats() {
  return useQuery({
    queryKey: ['customers', 'stats'],
    queryFn: () => customersApi.getStats(),
    staleTime: 2 * 60 * 1000,
    refetchOnMount: false,
    retry: 0, // No retry for dashboard - fail fast
  });
}

/**
 * Get customer activities (timeline)
 */
export function useCustomerActivities(id: string) {
  return useQuery({
    queryKey: ['customer', id, 'activities'],
    queryFn: () => customersApi.getActivities(id),
    enabled: !!id,
    staleTime: 3 * 60 * 1000,
  });
}

/**
 * Convert lead to customer
 * Creates a new customer from lead data and updates the lead with customer reference
 */
export function useConvertLeadToCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ConvertLeadToCustomerDto) => customersApi.convertLeadToCustomer(data),
    onSuccess: () => {
      // Invalidate customers queries
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customers', 'stats'] });
      // Note: Lead queries should also be invalidated, but that's handled in the leads module
    },
  });
}
