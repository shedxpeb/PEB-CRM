'use client';

import { useState, useMemo } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Search, 
  Filter,
  FileText,
  CreditCard,
  Receipt,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Building2,
  BarChart3,
  X,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { CardSkeleton } from '@/components/loading/CardSkeleton';
import { EmptyState } from '@/components/states/EmptyState';
import { useFinanceStats, useInvoices, usePayments, useExpenses, useFinanceActivities, useReceivables, usePayables } from '@/features/finance/hooks/useFinance';
import { formatCurrency, getInvoiceStatusVariant, getPaymentStatusVariant, getExpenseStatusVariant } from '@/features/finance/constants';
import { FinanceRowActions } from '@/features/finance/components/FinanceRowActions';

type FinanceTab = 'dashboard' | 'invoices' | 'payments' | 'expenses' | 'receivables' | 'payables';

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<FinanceTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [actionType, setActionType] = useState<'edit' | 'delete' | 'send' | 'approve' | null>(null);

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setActionType('edit');
    console.log('Edit item:', item);
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setActionType('delete');
    console.log('Delete item:', item);
  };

  const handleSend = (item: any) => {
    setSelectedItem(item);
    setActionType('send');
    console.log('Send item:', item);
  };

  const handleApprove = (item: any) => {
    setSelectedItem(item);
    setActionType('approve');
    console.log('Approve item:', item);
  };

  const closeAction = () => {
    setSelectedItem(null);
    setActionType(null);
  };
  
  const { data: stats, isLoading: statsLoading } = useFinanceStats(activeTab === 'dashboard');
  const { data: invoices, isLoading: invoicesLoading } = useInvoices(
    { search: searchQuery, status: filterStatus !== 'all' ? filterStatus : undefined, page: 1, pageSize: 20 },
    activeTab === 'invoices'
  );
  const { data: payments, isLoading: paymentsLoading } = usePayments(
    { search: searchQuery, status: filterStatus !== 'all' ? filterStatus : undefined, page: 1, pageSize: 20 },
    activeTab === 'payments'
  );
  const { data: expenses, isLoading: expensesLoading } = useExpenses(
    { search: searchQuery, status: filterStatus !== 'all' ? filterStatus : undefined, page: 1, pageSize: 20 },
    activeTab === 'expenses'
  );
  const { data: receivables, isLoading: receivablesLoading } = useReceivables(
    { search: searchQuery, page: 1, pageSize: 20 }
  );
  const { data: payables, isLoading: payablesLoading } = usePayables(
    { search: searchQuery, page: 1, pageSize: 20 }
  );
  const { data: activities, isLoading: activitiesLoading } = useFinanceActivities(undefined, activeTab === 'dashboard');

  const kpiData = useMemo(() => stats ? [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      change: 12.5,
      icon: <TrendingUp />,
      color: 'text-green-600',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(stats.totalExpenses),
      change: -8.2,
      icon: <TrendingDown />,
      color: 'text-red-600',
    },
    {
      title: 'Net Profit',
      value: formatCurrency(stats.netProfit),
      change: 15.3,
      icon: <DollarSign />,
      color: 'text-blue-600',
    },
    {
      title: 'Pending Receivables',
      value: formatCurrency(stats.pendingReceivables),
      change: -5.1,
      icon: <Clock />,
      color: 'text-orange-600',
    },
    {
      title: 'Pending Payables',
      value: formatCurrency(stats.pendingPayables),
      change: 3.2,
      icon: <Wallet />,
      color: 'text-purple-600',
    },
    {
      title: 'Cash Inflow',
      value: formatCurrency(stats.cashInflow),
      change: 18.7,
      icon: <ArrowUpRight />,
      color: 'text-green-600',
    },
    {
      title: 'Cash Outflow',
      value: formatCurrency(stats.cashOutflow),
      change: -12.4,
      icon: <ArrowDownRight />,
      color: 'text-red-600',
    },
    {
      title: 'Available Cash',
      value: formatCurrency(stats.availableCashPosition),
      change: 8.9,
      icon: <Wallet />,
      color: 'text-blue-600',
    },
  ] : [], [stats]);

  const invoiceColumns = useMemo(() => [
    { key: 'invoiceNumber', label: 'Invoice No', render: (val: string) => <span className="font-semibold">{val}</span> },
    { key: 'customerName', label: 'Customer' },
    { key: 'totalAmount', label: 'Amount', render: (val: number) => formatCurrency(val) },
    { key: 'paidAmount', label: 'Paid', render: (val: number) => <span className="text-green-600">{formatCurrency(val)}</span> },
    { key: 'pendingAmount', label: 'Pending', render: (val: number) => <span className="text-orange-600">{formatCurrency(val)}</span> },
    { 
      key: 'status', 
      label: 'Status',
      render: (val: string) => <Badge variant={getInvoiceStatusVariant(val)}>{val}</Badge>
    },
    { 
      key: 'dueDate', 
      label: 'Due Date',
      render: (val: Date) => new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    },
  ], []);

  const paymentColumns = useMemo(() => [
    { key: 'paymentNumber', label: 'Payment No', render: (val: string) => <span className="font-semibold">{val}</span> },
    { key: 'customerName', label: 'Customer' },
    { key: 'totalAmount', label: 'Amount', render: (val: number) => <span className="text-green-600">{formatCurrency(val)}</span> },
    { key: 'paymentMethod', label: 'Method' },
    { 
      key: 'status', 
      label: 'Status',
      render: (val: string) => <Badge variant={getPaymentStatusVariant(val)}>{val}</Badge>
    },
    { 
      key: 'paymentDate', 
      label: 'Date',
      render: (val: Date) => new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    },
  ], []);

  const expenseColumns = useMemo(() => [
    { key: 'expenseNumber', label: 'Expense ID', render: (val: string) => <span className="font-semibold">{val}</span> },
    { key: 'vendorName', label: 'Vendor' },
    { key: 'category', label: 'Category' },
    { key: 'description', label: 'Description' },
    { key: 'totalAmount', label: 'Amount', render: (val: number) => <span className="text-red-600">{formatCurrency(val)}</span> },
    { 
      key: 'status', 
      label: 'Status',
      render: (val: string) => <Badge variant={getExpenseStatusVariant(val)}>{val}</Badge>
    },
    { 
      key: 'date', 
      label: 'Date',
      render: (val: Date) => new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    },
  ], []);

  const receivableColumns = useMemo(() => [
    { key: 'customerName', label: 'Customer' },
    { key: 'invoiceNumber', label: 'Invoice No', render: (val: string) => <span className="font-semibold">{val}</span> },
    { key: 'totalAmount', label: 'Total Amount', render: (val: number) => formatCurrency(val) },
    { key: 'paidAmount', label: 'Paid', render: (val: number) => <span className="text-green-600">{formatCurrency(val)}</span> },
    { key: 'pendingAmount', label: 'Pending', render: (val: number) => <span className="text-orange-600">{formatCurrency(val)}</span> },
    { 
      key: 'agingBucket', 
      label: 'Aging',
      render: (val: string) => <Badge variant={val === '90+ Days' ? 'destructive' : val === '61-90 Days' ? 'secondary' : 'default'}>{val}</Badge>
    },
    { 
      key: 'dueDate', 
      label: 'Due Date',
      render: (val: Date) => new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    },
  ], []);

  const payableColumns = useMemo(() => [
    { key: 'vendorName', label: 'Vendor' },
    { key: 'billNumber', label: 'Bill No', render: (val: string) => <span className="font-semibold">{val}</span> },
    { key: 'totalAmount', label: 'Total Amount', render: (val: number) => formatCurrency(val) },
    { key: 'paidAmount', label: 'Paid', render: (val: number) => <span className="text-green-600">{formatCurrency(val)}</span> },
    { key: 'pendingAmount', label: 'Pending', render: (val: number) => <span className="text-orange-600">{formatCurrency(val)}</span> },
    { 
      key: 'agingBucket', 
      label: 'Aging',
      render: (val: string) => <Badge variant={val === '90+ Days' ? 'destructive' : val === '61-90 Days' ? 'secondary' : 'default'}>{val}</Badge>
    },
    { 
      key: 'dueDate', 
      label: 'Due Date',
      render: (val: Date) => new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    },
  ], []);

  const activityData = useMemo(() => activities?.map((activity) => ({
    id: activity.id,
    type: (activity.type === 'income_created' ? 'lead' as const : 
          activity.type === 'expense_created' ? 'project' as const : 
          activity.type === 'invoice_sent' ? 'quotation' as const : 'task' as const),
    title: activity.description,
    description: activity.performedBy,
    timestamp: activity.performedAt,
    user: activity.performedBy,
    status: activity.type.includes('approved') ? 'completed' as const : 
            activity.type.includes('rejected') ? 'warning' as const : undefined,
  })) || [], [activities]);

  return (
    <MainLayout title="Finance" subtitle="Overview of financial operations">
      <div className="space-y-4 sm:space-y-6 w-full overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Finance Dashboard</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Overview of financial operations</p>
          </div>
          <Button className="flex-1 sm:flex-none">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Create Invoice</span>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as FinanceTab)}>
          <TabsList className="h-auto w-full justify-start overflow-x-auto p-1">
            <TabsTrigger value="dashboard" className="gap-2 text-xs sm:text-sm">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="invoices" className="gap-2 text-xs sm:text-sm">
              <Receipt className="h-4 w-4" />
              <span className="hidden sm:inline">Invoices</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2 text-xs sm:text-sm">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="expenses" className="gap-2 text-xs sm:text-sm">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="receivables" className="gap-2 text-xs sm:text-sm">
              <ArrowUpRight className="h-4 w-4" />
              <span className="hidden sm:inline">Receivables</span>
            </TabsTrigger>
            <TabsTrigger value="payables" className="gap-2 text-xs sm:text-sm">
              <ArrowDownRight className="h-4 w-4" />
              <span className="hidden sm:inline">Payables</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
              {statsLoading ? (
                <CardSkeleton count={8} />
              ) : (
                kpiData.map((kpi) => (
                  <KPICard
                    key={kpi.title}
                    data={kpi}
                  />
                ))
              )}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {activitiesLoading ? <CardSkeleton /> : <RecentActivity activities={activityData} />}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Content */}
          <Card className="min-w-0">
            <CardContent className="p-0">
              {/* Search */}
              <div className="p-2 sm:p-3 space-y-2 sm:space-y-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="relative flex-1 w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                      className={filterStatus !== 'all' ? 'bg-accent' : ''}
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                    {showFilterDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-background border rounded-md shadow-lg z-10 p-2">
                        <div className="text-xs font-medium mb-2">Filter by Status</div>
                        <div className="space-y-1">
                          <button
                            onClick={() => { setFilterStatus('all'); setShowFilterDropdown(false); }}
                            className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-accent ${filterStatus === 'all' ? 'bg-accent' : ''}`}
                          >
                            All Status
                          </button>
                          {activeTab === 'invoices' && (
                            <>
                              <button
                                onClick={() => { setFilterStatus('Draft'); setShowFilterDropdown(false); }}
                                className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-accent ${filterStatus === 'Draft' ? 'bg-accent' : ''}`}
                              >
                                Draft
                              </button>
                              <button
                                onClick={() => { setFilterStatus('Sent'); setShowFilterDropdown(false); }}
                                className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-accent ${filterStatus === 'Sent' ? 'bg-accent' : ''}`}
                              >
                                Sent
                              </button>
                              <button
                                onClick={() => { setFilterStatus('Paid'); setShowFilterDropdown(false); }}
                                className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-accent ${filterStatus === 'Paid' ? 'bg-accent' : ''}`}
                              >
                                Paid
                              </button>
                              <button
                                onClick={() => { setFilterStatus('Overdue'); setShowFilterDropdown(false); }}
                                className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-accent ${filterStatus === 'Overdue' ? 'bg-accent' : ''}`}
                              >
                                Overdue
                              </button>
                            </>
                          )}
                          {activeTab === 'payments' && (
                            <>
                              <button
                                onClick={() => { setFilterStatus('Completed'); setShowFilterDropdown(false); }}
                                className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-accent ${filterStatus === 'Completed' ? 'bg-accent' : ''}`}
                              >
                                Completed
                              </button>
                              <button
                                onClick={() => { setFilterStatus('Pending'); setShowFilterDropdown(false); }}
                                className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-accent ${filterStatus === 'Pending' ? 'bg-accent' : ''}`}
                              >
                                Pending
                              </button>
                            </>
                          )}
                          {activeTab === 'expenses' && (
                            <>
                              <button
                                onClick={() => { setFilterStatus('Approved'); setShowFilterDropdown(false); }}
                                className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-accent ${filterStatus === 'Approved' ? 'bg-accent' : ''}`}
                              >
                                Approved
                              </button>
                              <button
                                onClick={() => { setFilterStatus('Pending'); setShowFilterDropdown(false); }}
                                className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-accent ${filterStatus === 'Pending' ? 'bg-accent' : ''}`}
                              >
                                Pending
                              </button>
                              <button
                                onClick={() => { setFilterStatus('Rejected'); setShowFilterDropdown(false); }}
                                className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-accent ${filterStatus === 'Rejected' ? 'bg-accent' : ''}`}
                              >
                                Rejected
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {(searchQuery || filterStatus !== 'all') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setSearchQuery(''); setFilterStatus('all'); }}
                      className="text-xs"
                    >
                      Clear
                    </Button>
                  )}
                </div>

                <TabsContent value="invoices">
                  <DataTable
                    columns={invoiceColumns}
                    data={invoices?.data || []}
                    loading={invoicesLoading}
                    rowIdKey="id"
                    rowActions={(item) => (
                      <FinanceRowActions
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item)}
                        onSend={() => handleSend(item)}
                        onApprove={() => handleApprove(item)}
                      />
                    )}
                  />
                </TabsContent>

                <TabsContent value="payments">
                  <DataTable
                    columns={paymentColumns}
                    data={payments?.data || []}
                    loading={paymentsLoading}
                    rowIdKey="id"
                    rowActions={(item) => (
                      <FinanceRowActions
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item)}
                      />
                    )}
                  />
                </TabsContent>

                <TabsContent value="expenses">
                  <DataTable
                    columns={expenseColumns}
                    data={expenses?.data || []}
                    loading={expensesLoading}
                    rowIdKey="id"
                    rowActions={(item) => (
                      <FinanceRowActions
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item)}
                        onApprove={() => handleApprove(item)}
                      />
                    )}
                  />
                </TabsContent>

                <TabsContent value="receivables">
                  <DataTable
                    columns={receivableColumns}
                    data={receivables?.data || []}
                    loading={receivablesLoading}
                    rowIdKey="id"
                  />
                </TabsContent>

                <TabsContent value="payables">
                  <DataTable
                    columns={payableColumns}
                    data={payables?.data || []}
                    loading={payablesLoading}
                    rowIdKey="id"
                  />
                </TabsContent>
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </MainLayout>
  );
}
