'use client';

import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable, Column } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
import { StandardPageLayout } from '@/components/layout/StandardPageLayout';
import { FilterBar, FilterConfig } from '@/components/layout/FilterBar';
const CustomerForm = lazy(() => import('@/features/customers/components/CustomerForm').then(m => ({ default: m.CustomerForm })));
const CustomerRowActions = lazy(() => import('@/features/customers/components/CustomerRowActions').then(m => ({ default: m.CustomerRowActions })));
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Customer, CustomerStatus } from '@/features/customers';
import { getStatusVariant, CUSTOMER_STATUSES } from '@/features/customers/constants';
import {
  useCustomers,
  useCustomersStats,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
} from '@/features/customers/hooks/useCustomers';
import { useUpdateLead } from '@/features/leads/hooks/useLeads';
import { customersApi } from '@/features/customers';
import { ROUTES } from '@/core/routes';
import { useDebounce } from '@/shared/hooks/useDebounce';
import {
  Users,
  UserCheck,
  UserPlus,
  FolderKanban,
  CheckCircle,
  DollarSign,
  FileText,
  Clock,
  Plus,
  Download,
  Search,
} from 'lucide-react';

export default function CustomersPage() {
  const router = useRouter();

  // Search and filter state with debounce
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'all'>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');

  // React Query hooks - single source of truth for server data
  // Fetch all customers once without filters, then filter client-side
  const { data: allCustomersResponse, isLoading, error } = useCustomers({ page: 1, pageSize: 1000 });
  const { data: stats } = useCustomersStats();

  // Client-side filtering
  const filteredCustomers = useMemo(() => {
    if (!allCustomersResponse?.data) return [];
    return allCustomersResponse.data.filter((customer: Customer) => {
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      const matchesCity = cityFilter === 'all' || customer.city === cityFilter;
      const matchesState = stateFilter === 'all' || customer.state === stateFilter;
      const matchesSearch = !debouncedSearch ||
        customer.customerName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        customer.companyName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        customer.email?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        customer.mobile.includes(debouncedSearch);
      return matchesStatus && matchesCity && matchesState && matchesSearch;
    });
  }, [allCustomersResponse?.data, statusFilter, cityFilter, stateFilter, debouncedSearch]);
  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();
  const deleteMutation = useDeleteCustomer();
  const updateLeadMutation = useUpdateLead();

  // UI state only - no server data in useState
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [formError, setFormError] = useState<string | null>(null);

  // Extract data from query results
  const customers = filteredCustomers;
  const statsData = stats;

  // Calculate KPI stats based on filtered customers
  const filteredStats = useMemo(() => {
    const total = customers.length;
    const active = customers.filter(c => c.status === 'Active').length;
    const newThisMonth = customers.filter(c => {
      const now = new Date();
      const customerDate = new Date(c.customerSince);
      return customerDate.getMonth() === now.getMonth() && customerDate.getFullYear() === now.getFullYear();
    }).length;
    const activeProjects = customers.reduce((sum, c) => sum + (c.activeProjects || 0), 0);
    const completedProjects = customers.reduce((sum, c) => sum + ((c.totalProjects || 0) - (c.activeProjects || 0)), 0);
    const totalRevenue = customers.reduce((sum, c) => sum + (c.totalRevenue || 0), 0);
    const pendingQuotations = customers.reduce((sum, c) => sum + (c.pendingQuotations || 0), 0);
    const pendingFollowups = customers.reduce((sum, c) => sum + (c.pendingFollowups || 0), 0);

    return { total, active, newThisMonth, activeProjects, completedProjects, totalRevenue, pendingQuotations, pendingFollowups };
  }, [customers]);

  // Memoized KPI cards from filtered data
  const kpiData = useMemo(() => [
    { title: 'Total Customers', value: String(filteredStats.total), change: 12.5, icon: <Users className="h-6 w-6 text-blue-600" />, color: 'text-blue-600' },
    { title: 'Active Customers', value: String(filteredStats.active), change: 8.2, icon: <UserCheck className="h-6 w-6 text-green-600" />, color: 'text-green-600' },
    { title: 'New This Month', value: String(filteredStats.newThisMonth), change: 15.3, icon: <UserPlus className="h-6 w-6 text-purple-600" />, color: 'text-purple-600' },
    { title: 'Total Revenue', value: `₹${(filteredStats.totalRevenue / 10000000).toFixed(1)}Cr`, change: 18.9, icon: <DollarSign className="h-6 w-6 text-green-700" />, color: 'text-green-700' },
  ], [filteredStats]);

  // Filter configuration for FilterBar
  const filterConfigs: FilterConfig[] = useMemo(() => [
    {
      key: 'status',
      label: 'Status',
      value: statusFilter,
      onChange: (value: string) => setStatusFilter(value as CustomerStatus | 'all'),
      options: [{ value: 'all', label: 'All Status' }, ...CUSTOMER_STATUSES.map(s => ({ value: s.value, label: s.label }))],
    },
    {
      key: 'city',
      label: 'City',
      value: cityFilter,
      onChange: setCityFilter,
      options: [
        { value: 'all', label: 'All Cities' },
        ...Array.from(new Set(allCustomersResponse?.data?.map(c => c.city) || []))
          .filter(Boolean)
          .sort()
          .map(city => ({ value: city, label: city }))
      ],
    },
    {
      key: 'state',
      label: 'State',
      value: stateFilter,
      onChange: setStateFilter,
      options: [
        { value: 'all', label: 'All States' },
        ...Array.from(new Set(allCustomersResponse?.data?.map(c => c.state) || []))
          .filter(Boolean)
          .sort()
          .map(state => ({ value: state, label: state }))
      ],
    },
  ], [statusFilter, cityFilter, stateFilter, allCustomersResponse?.data]);

  const handleClearFilters = useCallback(() => {
    setStatusFilter('all');
    setCityFilter('all');
    setStateFilter('all');
    setSearchQuery('');
  }, []);

  // Memoized table columns
  const columns: Column<Customer>[] = useMemo(() => [
    {
      key: 'customerId',
      label: 'ID',
      sortable: true,
      render: (value) => <span className="font-mono text-xs text-muted-foreground">#{value}</span>,
    },
    {
      key: 'customerName',
      label: 'Customer Name',
      sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-medium text-sm">{row.customerName}</p>
          <p className="text-xs text-muted-foreground">{row.companyName}</p>
        </div>
      ),
    },
    {
      key: 'mobile',
      label: 'Mobile',
      render: (value) => <span className="text-xs">{value}</span>,
    },
    {
      key: 'email',
      label: 'Email',
      render: (value) => <span className="text-xs truncate max-w-[150px] block">{value}</span>,
    },
    {
      key: 'gstNumber',
      label: 'GST',
      render: (value) => (
        <span className="text-xs font-mono">{value || '-'}</span>
      ),
    },
    {
      key: 'city',
      label: 'City',
      sortable: true,
      filterable: true,
    },
    {
      key: 'state',
      label: 'State',
      sortable: true,
      filterable: true,
    },
    {
      key: 'totalProjects',
      label: 'Projects',
      sortable: true,
      render: (_, row) => (
        <span className="text-xs">
          {row.activeProjects}/{row.totalProjects}
        </span>
      ),
    },
    {
      key: 'totalRevenue',
      label: 'Revenue',
      sortable: true,
      render: (value) => (
        <span className="text-xs font-medium">
          ₹{(value / 100000).toFixed(1)}L
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true,
      render: (value) => (
        <Badge variant={getStatusVariant(value as CustomerStatus)}>
          {value}
        </Badge>
      ),
    },
  ], []);

  // Memoized handlers using React Query mutations
  const handleCreateCustomer = useCallback((data: Partial<Customer>) => {
    setFormError(null);
    createMutation.mutate(data as any, {
      onSuccess: (response: any) => {
        // If customer was created from a lead, update the lead status
        if (data.leadId) {
          updateLeadMutation.mutate(
            {
              id: data.leadId,
              data: {
                status: 'Converted',
                customerId: response?.customer?.id || response?.id,
                convertedDate: new Date(),
              },
            },
            {
              onError: (error: any) => {
                console.error('Failed to update lead status:', error);
                // Don't block customer creation if lead update fails
              },
            }
          );
        }
        setIsCreateDialogOpen(false);
        setFormError(null);
      },
      onError: (error: any) => {
        setFormError(error.message || 'Failed to create customer. Please try again.');
      },
    });
  }, [createMutation, updateLeadMutation]);

  const handleEditCustomer = useCallback((data: Partial<Customer>) => {
    if (!selectedCustomer) return;
    setFormError(null);
    updateMutation.mutate(
      { id: selectedCustomer.id, data: data as any },
      {
        onSuccess: () => {
          setIsEditDialogOpen(false);
          setSelectedCustomer(null);
          setFormError(null);
        },
        onError: (error: any) => {
          setFormError(error.message || 'Failed to update customer. Please try again.');
        },
      }
    );
  }, [selectedCustomer, updateMutation]);

  const handleDeleteCustomer = useCallback((customer: Customer) => {
    if (confirm(`Delete customer "${customer.customerName}"?`)) {
      deleteMutation.mutate(customer.id);
    }
  }, [deleteMutation]);

  const handleRowClick = useCallback((row: Customer) => {
    router.push(ROUTES.customersDetail(row.id));
  }, [router]);

  const handleViewDetails = useCallback((customer: Customer) => {
    router.push(ROUTES.customersDetail(customer.id));
  }, [router]);

  const handleEditFromRow = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditDialogOpen(true);
  }, []);

  const handleStatusChange = useCallback((customer: Customer, status: CustomerStatus) => {
    updateMutation.mutate({ id: customer.id, data: { status } });
  }, [updateMutation]);

  const handleExport = useCallback(async () => {
    try {
      const blob = await customersApi.export();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting customers:', error);
      alert('Failed to export customers. Please try again.');
    }
  }, []);

  // Loading state - only show full loading screen on initial load
  if (isLoading && !allCustomersResponse) {
    return (
      <MainLayout title="Customers" subtitle="Manage your customer database">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Loading customers...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <MainLayout title="Customers" subtitle="Manage your customer database">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <p className="text-sm text-destructive">Failed to load customers</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <StandardPageLayout
        title="Customers"
        subtitle="Manage your customer database"
        headerActions={
          <Button onClick={() => setIsCreateDialogOpen(true)} className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        }
        kpiCards={
          <>
            <KPICard data={kpiData[0]} />
            <KPICard data={kpiData[1]} />
            <KPICard data={kpiData[2]} />
            <KPICard data={kpiData[3]} />
          </>
        }
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search customers..."
        filters={filterConfigs}
        onClearFilters={handleClearFilters}
      >
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" onClick={handleExport} className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={customers}
          onRowClick={handleRowClick}
          enableSelection={true}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          rowIdKey="id"
          emptyMessage="No customers found. Adjust your filters or add a new customer."
          rowActions={(row) => (
            <CustomerRowActions
              customer={row as Customer}
              onEdit={handleEditFromRow}
              onDelete={handleDeleteCustomer}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
            />
          )}
        />
      </StandardPageLayout>

      {/* Create Customer Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Customer</DialogTitle>
          </DialogHeader>
          <Suspense fallback={<div className="flex items-center justify-center h-32">Loading form...</div>}>
            <CustomerForm
              onSubmit={handleCreateCustomer}
              onCancel={() => {
                setIsCreateDialogOpen(false);
                setFormError(null);
              }}
              isLoading={createMutation.isPending}
              error={formError}
              isEditMode={false}
            />
          </Suspense>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <Suspense fallback={<div className="flex items-center justify-center h-32">Loading form...</div>}>
              <CustomerForm
                initialData={selectedCustomer}
                onSubmit={handleEditCustomer}
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setSelectedCustomer(null);
                  setFormError(null);
                }}
                isLoading={updateMutation.isPending}
                error={formError}
                isEditMode={true}
              />
            </Suspense>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
