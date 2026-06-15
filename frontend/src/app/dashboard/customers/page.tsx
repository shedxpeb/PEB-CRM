'use client';

import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable, Column } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
const CustomerForm = lazy(() => import('@/features/customers/components/CustomerForm').then(m => ({ default: m.CustomerForm })));
const CustomerRowActions = lazy(() => import('@/features/customers/components/CustomerRowActions').then(m => ({ default: m.CustomerRowActions })));
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    { title: 'Active Projects', value: String(filteredStats.activeProjects), change: 5.7, icon: <FolderKanban className="h-6 w-6 text-orange-600" />, color: 'text-orange-600' },
    { title: 'Completed Projects', value: String(filteredStats.completedProjects), change: 3.2, icon: <CheckCircle className="h-6 w-6 text-emerald-600" />, color: 'text-emerald-600' },
    { title: 'Total Revenue', value: `₹${(filteredStats.totalRevenue / 10000000).toFixed(1)}Cr`, change: 18.9, icon: <DollarSign className="h-6 w-6 text-green-700" />, color: 'text-green-700' },
    { title: 'Pending Quotations', value: String(filteredStats.pendingQuotations), change: -4.5, icon: <FileText className="h-6 w-6 text-amber-600" />, color: 'text-amber-600' },
    { title: 'Pending Followups', value: String(filteredStats.pendingFollowups), change: -2.1, icon: <Clock className="h-6 w-6 text-red-500" />, color: 'text-red-500' },
  ], [filteredStats]);

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
    <MainLayout title="Customers" subtitle="Manage your customer database">
      <div className="space-y-4 sm:space-y-6 w-full overflow-hidden">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {kpiData.map((kpi) => (
            <KPICard key={kpi.title} data={kpi} />
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-semibold">All Customers</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">{customers.length} total customers</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Filters */}
            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={(v: CustomerStatus | 'all') => setStatusFilter(v)}>
                <SelectTrigger className="w-full sm:w-[140px] h-8 sm:h-9 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {CUSTOMER_STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-full sm:w-[140px] h-8 sm:h-9 text-xs">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {Array.from(new Set(allCustomersResponse?.data?.map(c => c.city) || [])).filter(Boolean).sort().map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-full sm:w-[140px] h-8 sm:h-9 text-xs">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {Array.from(new Set(allCustomersResponse?.data?.map(c => c.state) || [])).filter(Boolean).sort().map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Search and Actions */}
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full sm:w-64 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" size="sm" onClick={handleExport} className="flex-1 sm:flex-none">
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button size="sm" onClick={() => setIsCreateDialogOpen(true)} className="flex-1 sm:flex-none">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </div>
        </div>

        {/* Data Table */}
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
        </div>

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
