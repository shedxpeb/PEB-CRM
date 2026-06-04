/**
 * useInventory Hooks
 * React Query hooks for inventory - never use useState/useEffect for server data
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi } from '@/features/inventory/services/inventoryApi';
import { InventoryFilters, CreateInventoryItemDto, UpdateInventoryItemDto, CreateWarehouseDto, CreateSupplierDto, CreateCategoryDto, CreateStockMovementDto } from '@/features/inventory/types';
import { PaginationParams } from '@/shared/types/pagination';

// ─── Items ──────────────────────────────────────────────────────────────────

export function useInventoryItems(params?: PaginationParams & InventoryFilters) {
  return useQuery({
    queryKey: ['inventory', params],
    queryFn: () => inventoryApi.getAll(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useInventoryItem(id: string) {
  return useQuery({
    queryKey: ['inventory', id],
    queryFn: () => inventoryApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInventoryItemDto) => inventoryApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stats'] });
    },
  });
}

export function useUpdateInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInventoryItemDto }) =>
      inventoryApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', id] });
    },
  });
}

export function useDeleteInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stats'] });
    },
  });
}

export function useInventoryStats() {
  return useQuery({
    queryKey: ['inventory', 'stats'],
    queryFn: () => inventoryApi.getStats(),
    staleTime: 2 * 60 * 1000,
  });
}

export function useInventoryActivities(id: string) {
  return useQuery({
    queryKey: ['inventory', id, 'activities'],
    queryFn: () => inventoryApi.getActivities(id),
    enabled: !!id,
    staleTime: 3 * 60 * 1000,
  });
}

// ─── Warehouses ─────────────────────────────────────────────────────────────

export function useWarehouses() {
  return useQuery({
    queryKey: ['warehouses'],
    queryFn: () => inventoryApi.getWarehouses(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCreateWarehouse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateWarehouseDto) => inventoryApi.createWarehouse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
    },
  });
}

// ─── Suppliers ──────────────────────────────────────────────────────────────

export function useSuppliers() {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: () => inventoryApi.getSuppliers(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSupplierDto) => inventoryApi.createSupplier(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
  });
}

// ─── Categories ─────────────────────────────────────────────────────────────

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => inventoryApi.getCategories(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryDto) => inventoryApi.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

// ─── Stock Movements ────────────────────────────────────────────────────────

export function useStockMovements(params?: PaginationParams) {
  return useQuery({
    queryKey: ['stockMovements', params],
    queryFn: () => inventoryApi.getMovements(params),
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useCreateStockMovement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateStockMovementDto) => inventoryApi.createMovement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['stockMovements'] });
    },
  });
}

export function useStockMovementHistory(itemId: string) {
  return useQuery({
    queryKey: ['inventory', itemId, 'movements'],
    queryFn: () => inventoryApi.getMovementHistory(itemId),
    enabled: !!itemId,
    staleTime: 3 * 60 * 1000,
  });
}

// ─── Alerts ─────────────────────────────────────────────────────────────────

export function useInventoryAlerts() {
  return useQuery({
    queryKey: ['inventory', 'alerts'],
    queryFn: () => inventoryApi.getAlerts(),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
