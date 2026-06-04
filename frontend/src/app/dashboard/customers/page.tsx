'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable, Column } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
import { CustomerForm } from '@/features/customers/components/CustomerForm';
import { CustomerRowActions } from '@/features/customers/components/CustomerRowActions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Customer, CustomerStatus } from '@/features/customers';
import { getStatusVariant } from '@/features/customers/constants';
import {
  useCustomers,
  useCustomersStats,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
} from '@/features/customers/hooks/useCustomers';
import { ROUTES } from '@/core/routes';
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
} from 'lucide-react';

export default function CustomersPage() {
  const router = useRouter();

  // React Query hooks - single source of truth for server data
  const [params, setParams] = useState({ page: 1, pageSize: 20 });
  const { data: customersResponse, isLoading, error } = useCustomers(params);
  const { data: stats } = useCustomersStats();
  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();
  const deleteMutation = useDeleteCustomer();

  // UI state only - no server data in useState
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  // Extract data from query results
  const customers = customersResponse?.data ?? [];
  const statsData = stats;

  // KPI cards from live stats API
  const kpiData = [
    { title: 'Total Customers', value: String(statsData?.totalCustomers ?? 0), change: 12.5, icon: <Users className="h-6 w-6 text-blue-600" />, color: 'text-blue-600' },
    { title: 'Active Customers', value: String(statsData?.activeCustomers ?? 0), change: 8.2, icon: <UserCheck className="h-6 w-6 text-green-600" />, color: 'text-green-600' },
    { title: 'New This Month', value: String(statsData?.newThisMonth ?? 0), change: 15.3, icon: <UserPlus className="h-6 w-6 text-purple-600" />, color: 'text-purple-600' },
    { title: 'Active Projects', value: String(statsData?.activeProjects ?? 0), change: 5.7, icon: <FolderKanban className="h-6 w-6 text-orange-600" />, color: 'text-orange-600' },
    { title: 'Completed Projects', value: String(statsData?.completedProjects ?? 0), change: 3.2, icon: <CheckCircle className="h-6 w-6 text-emerald-600" />, color: 'text-emerald-600' },
    { title: 'Total Revenue', value: `₹${((statsData?.totalRevenue ?? 0) / 10000000).toFixed(1)}Cr`, change: 18.9, icon: <DollarSign className="h-6 w-6 text-green-700" />, color: 'text-green-700' },
    { title: 'Pending Quotations', value: String(statsData?.pendingQuotations ?? 0), change: -4.5, icon: <FileText className="h-6 w-6 text-amber-600" />, color: 'text-amber-600' },
    { title: 'Pending Followups', value: String(statsData?.pendingFollowups ?? 0), change: -2.1, icon: <Clock className="h-6 w-6 text-red-500" />, color: 'text-red-500' },
  ];

  // Table columns
  const columns: Column<Customer>[] = [
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
      filterable: true,
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
  ];

  // Handlers using React Query mutations
  const handleCreateCustomer = (data: Partial<Customer>) => {
    createMutation.mutate(data as any, {
      onSuccess: () => setIsCreateDialogOpen(false),
    });
  };

  const handleEditCustomer = (data: Partial<Customer>) => {
    if (!selectedCustomer) return;
    updateMutation.mutate(
      { id: selectedCustomer.id, data: data as any },
      {
        onSuccess: () => {
          setIsEditDialogOpen(false);
          setSelectedCustomer(null);
        },
      }
    );
  };

  const handleDeleteCustomer = (customer: Customer) => {
    if (confirm(`Delete customer "${customer.customerName}"?`)) {
      deleteMutation.mutate(customer.id);
    }
  };

  const handleRowClick = (row: Customer) => {
    router.push(ROUTES.customersDetail(row.id));
  };

  const handleViewDetails = (customer: Customer) => {
    router.push(ROUTES.customersDetail(customer.id));
  };

  const handleEditFromRow = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditDialogOpen(true);
  };

  const handleStatusChange = (customer: Customer, status: CustomerStatus) => {
    updateMutation.mutate({ id: customer.id, data: { status } });
  };

  // Loading state
  if (isLoading) {
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
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi) => (
            <KPICard key={kpi.title} data={kpi} />
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Customers</h2>
            <p className="text-sm text-muted-foreground">{customers.length} total customers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
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

        {/* Create Customer Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Customer</DialogTitle>
            </DialogHeader>
            <CustomerForm
              onSubmit={handleCreateCustomer}
              onCancel={() => setIsCreateDialogOpen(false)}
              isLoading={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Customer Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
            </DialogHeader>
            {selectedCustomer && (
              <CustomerForm
                initialData={selectedCustomer}
                onSubmit={handleEditCustomer}
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
