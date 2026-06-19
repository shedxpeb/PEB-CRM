'use client';

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable, Column } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
import { InventoryRowActions } from '@/features/inventory/components/InventoryRowActions';

// Lazy load InventoryItemForm to reduce initial bundle size
const InventoryItemForm = dynamic(() => import('@/features/inventory/components/InventoryItemForm').then(mod => ({ default: mod.InventoryItemForm })), {
  loading: () => <div className="p-8 text-center">Loading form...</div>,
  ssr: false
});
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InventoryItem, StockStatus } from '@/features/inventory/types';
import { getStockStatusVariant } from '@/features/inventory/constants';
import {
  useInventoryItems,
  useInventoryStats,
  useCreateInventoryItem,
  useUpdateInventoryItem,
  useDeleteInventoryItem,
} from '@/features/inventory/hooks/useInventory';
import { ROUTES } from '@/core/routes';
import { useDebounce } from '@/shared/hooks/useDebounce';
import {
  Package,
  DollarSign,
  AlertTriangle,
  XCircle,
  ArrowDownToLine,
  ArrowUpFromLine,
  Lock,
  Truck,
  ShoppingCart,
  AlertOctagon,
  Plus,
  Download,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function InventoryPage() {
  const router = useRouter();

  // Search and filter state with debounce
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // React Query hooks
  const [params, setParams] = useState({ page: 1, pageSize: 20, search: '' });
  const { data: itemsResponse, isLoading, error } = useInventoryItems(params);
  const { data: stats } = useInventoryStats();
  const createMutation = useCreateInventoryItem();
  const updateMutation = useUpdateInventoryItem();
  const deleteMutation = useDeleteInventoryItem();

  // Update search in params when debounced search changes
  useEffect(() => {
    setParams(prev => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);

  // UI state only
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  // Extract data
  const items = itemsResponse?.data ?? [];
  const statsData = stats;

  // 10 KPI Cards - memoized to prevent recreation on every render
  const kpiData = useMemo(() => [
    { title: 'Total Items', value: String(statsData?.totalItems ?? 0), change: 5.2, icon: <Package className="h-6 w-6 text-blue-600" />, color: 'text-blue-600' },
    { title: 'Total Value', value: `₹${((statsData?.totalValue ?? 0) / 100000).toFixed(1)}L`, change: 8.7, icon: <DollarSign className="h-6 w-6 text-green-600" />, color: 'text-green-600' },
    { title: 'Low Stock', value: String(statsData?.lowStockItems ?? 0), change: -3.1, icon: <AlertTriangle className="h-6 w-6 text-amber-600" />, color: 'text-amber-600' },
    { title: 'Out of Stock', value: String(statsData?.outOfStockItems ?? 0), change: -12.0, icon: <XCircle className="h-6 w-6 text-red-600" />, color: 'text-red-600' },
    { title: 'Incoming Stock', value: String(statsData?.incomingStock ?? 0), change: 15.3, icon: <ArrowDownToLine className="h-6 w-6 text-emerald-600" />, color: 'text-emerald-600' },
    { title: 'Outgoing Stock', value: String(statsData?.outgoingStock ?? 0), change: 7.8, icon: <ArrowUpFromLine className="h-6 w-6 text-orange-600" />, color: 'text-orange-600' },
    { title: 'Reserved Stock', value: String(statsData?.reservedStock ?? 0), change: 4.5, icon: <Lock className="h-6 w-6 text-purple-600" />, color: 'text-purple-600' },
    { title: 'Active Suppliers', value: String(statsData?.activeSuppliers ?? 0), change: 2.0, icon: <Truck className="h-6 w-6 text-teal-600" />, color: 'text-teal-600' },
    { title: 'Pending PRs', value: String(statsData?.pendingPurchaseRequests ?? 0), change: -5.5, icon: <ShoppingCart className="h-6 w-6 text-indigo-600" />, color: 'text-indigo-600' },
    { title: 'Material Shortages', value: String(statsData?.materialShortages ?? 0), change: -8.2, icon: <AlertOctagon className="h-6 w-6 text-rose-600" />, color: 'text-rose-600' },
  ], [statsData]);

  // 16-column DataTable - memoized to prevent recreation on every render
  const columns: Column<InventoryItem>[] = useMemo(() => [
    {
      key: 'itemCode',
      label: 'Item Code',
      sortable: true,
      render: (value) => <span className="font-mono text-xs text-muted-foreground">{value}</span>,
    },
    {
      key: 'itemName',
      label: 'Item Name',
      sortable: true,
      filterable: true,
      render: (_, row) => (
        <div>
          <p className="font-medium text-sm">{row.itemName}</p>
          <p className="text-xs text-muted-foreground">{row.itemCode}</p>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      filterable: true,
      render: (value) => <span className="text-xs">{value}</span>,
    },
    {
      key: 'materialType',
      label: 'Material Type',
      sortable: true,
      filterable: true,
      render: (value) => <span className="text-xs">{value}</span>,
    },
    {
      key: 'unit',
      label: 'Unit',
      render: (value) => <span className="text-xs">{value}</span>,
    },
    {
      key: 'currentStock',
      label: 'Current Stock',
      sortable: true,
      render: (value) => (
        <span className="text-xs font-medium">{Number(value).toLocaleString()}</span>
      ),
    },
    {
      key: 'reservedStock',
      label: 'Reserved',
      sortable: true,
      render: (value) => (
        <span className="text-xs text-purple-600">{Number(value).toLocaleString()}</span>
      ),
    },
    {
      key: 'availableStock',
      label: 'Available',
      sortable: true,
      render: (value) => (
        <span className="text-xs font-medium text-green-700">{Number(value).toLocaleString()}</span>
      ),
    },
    {
      key: 'minimumStock',
      label: 'Min Stock',
      render: (value) => <span className="text-xs text-muted-foreground">{Number(value).toLocaleString()}</span>,
    },
    {
      key: 'reorderLevel',
      label: 'Reorder',
      render: (value) => <span className="text-xs text-muted-foreground">{Number(value).toLocaleString()}</span>,
    },
    {
      key: 'warehouseName',
      label: 'Warehouse',
      sortable: true,
      filterable: true,
      render: (value) => <span className="text-xs">{value}</span>,
    },
    {
      key: 'purchaseRate',
      label: 'Purchase Rate',
      sortable: true,
      render: (value) => (
        <span className="text-xs">₹{Number(value).toFixed(2)}</span>
      ),
    },
    {
      key: 'totalValue',
      label: 'Current Value',
      sortable: true,
      render: (value) => (
        <span className="text-xs font-medium">₹{Number(value).toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true,
      render: (value) => (
        <Badge variant={getStockStatusVariant(value as StockStatus)}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'lastUpdated',
      label: 'Last Updated',
      sortable: true,
      render: (value) => {
        if (!value) return <span className="text-xs text-muted-foreground">-</span>;
        const date = new Date(value);
        return (
          <span className="text-xs text-muted-foreground">
            {date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
          </span>
        );
      },
    },
  ], []);

  // Mutation handlers - memoized to prevent recreation on every render
  const handleCreate = useCallback((data: Partial<InventoryItem>) => {
    createMutation.mutate(data as any, {
      onSuccess: () => setIsCreateDialogOpen(false),
    });
  }, [createMutation]);

  const handleEdit = useCallback((data: Partial<InventoryItem>) => {
    if (!selectedItem) return;
    updateMutation.mutate(
      { id: selectedItem.id, data: data as any },
      {
        onSuccess: () => {
          setIsEditDialogOpen(false);
          setSelectedItem(null);
        },
      }
    );
  }, [selectedItem, updateMutation]);

  const handleDelete = useCallback((item: InventoryItem) => {
    if (confirm(`Delete inventory item "${item.itemName}"?`)) {
      deleteMutation.mutate(item.id);
    }
  }, [deleteMutation]);

  const handleRowClick = useCallback((row: InventoryItem) => {
    router.push(`${ROUTES.inventory}/${row.id}`);
  }, [router]);

  const handleViewDetails = useCallback((item: InventoryItem) => {
    router.push(`${ROUTES.inventory}/${item.id}`);
  }, [router]);

  const handleEditFromRow = useCallback((item: InventoryItem) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  }, []);

  const handleStatusChange = useCallback((item: InventoryItem, status: StockStatus) => {
    updateMutation.mutate({ id: item.id, data: { status } });
  }, [updateMutation]);

  // Loading state
  if (isLoading) {
    return (
      <MainLayout title="Inventory" subtitle="Manage materials and stock">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Loading inventory...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <MainLayout title="Inventory" subtitle="Manage materials and stock">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <p className="text-sm text-destructive">Failed to load inventory</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Inventory" subtitle="Manage materials and stock">
      <div className="space-y-2 sm:space-y-3 w-full overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Inventory</h1>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="w-full sm:w-auto h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <KPICard
            data={{
              title: 'Total Items',
              value: statsData?.totalItems ?? 0,
              change: 0,
              icon: <Package />,
              color: 'text-blue-500'
            }}
          />
          <KPICard
            data={{
              title: 'Total Value',
              value: `₹${((statsData?.totalValue ?? 0) / 100000).toFixed(1)}L`,
              change: 0,
              icon: <DollarSign />,
              color: 'text-green-500'
            }}
          />
          <KPICard
            data={{
              title: 'Low Stock',
              value: statsData?.lowStockItems ?? 0,
              change: 0,
              icon: <AlertTriangle />,
              color: 'text-yellow-500'
            }}
          />
          <KPICard
            data={{
              title: 'Out of Stock',
              value: statsData?.outOfStockItems ?? 0,
              change: 0,
              icon: <XCircle />,
              color: 'text-emerald-500'
            }}
          />
        </div>

        {/* Filters */}
        <Card className="min-w-0">
          <CardContent className="p-2 sm:p-3">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Search inventory..."
                  className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-1 w-full sm:w-auto ml-auto">
                <Button variant="outline" className="flex-1 sm:flex-none gap-1.5 px-2 sm:px-3 py-2 h-8 sm:h-9 text-xs">
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
                {searchQuery && (
                  <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')} className="flex-1 sm:flex-none h-8 sm:h-9 px-2 sm:px-3 text-xs">
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <div className="min-w-0">
          <DataTable
          columns={columns}
          data={items}
          onRowClick={handleRowClick}
          enableSelection={true}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          rowIdKey="id"
          rowActions={(row) => (
            <InventoryRowActions
              item={row as InventoryItem}
              onEdit={handleEditFromRow}
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
            />
          )}
        />
        </div>

        {/* Create Item Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Inventory Item</DialogTitle>
            </DialogHeader>
            <InventoryItemForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateDialogOpen(false)}
              isLoading={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Item Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Inventory Item</DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <InventoryItemForm
                initialData={selectedItem}
                onSubmit={handleEdit}
                onCancel={() => setIsEditDialogOpen(false)}
                isLoading={updateMutation.isPending}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
