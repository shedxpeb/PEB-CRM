'use client';

import { useState } from 'react';
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
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { useFinanceStats, useInvoices, usePayments, useExpenses, useFinanceActivities } from '@/features/finance/hooks/useFinance';
import { formatCurrency, getInvoiceStatusVariant, getPaymentStatusVariant, getExpenseStatusVariant } from '@/features/finance/constants';
import { FinanceRowActions } from '@/features/finance/components/FinanceRowActions';

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'invoices' | 'payments' | 'expenses' | 'receivables' | 'payables'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: stats, isLoading: statsLoading } = useFinanceStats();
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();
  const { data: payments, isLoading: paymentsLoading } = usePayments();
  const { data: expenses, isLoading: expensesLoading } = useExpenses();
  const { data: activities, isLoading: activitiesLoading } = useFinanceActivities();

  const kpiData = stats ? [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      change: 12.5,
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      color: 'text-green-600',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(stats.totalExpenses),
      change: -8.2,
      icon: <TrendingDown className="h-6 w-6 text-red-600" />,
      color: 'text-red-600',
    },
    {
      title: 'Net Profit',
      value: formatCurrency(stats.netProfit),
      change: 15.3,
      icon: <DollarSign className="h-6 w-6 text-blue-600" />,
      color: 'text-blue-600',
    },
    {
      title: 'Pending Receivables',
      value: formatCurrency(stats.pendingReceivables),
      change: -5.1,
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      color: 'text-orange-600',
    },
    {
      title: 'Pending Payables',
      value: formatCurrency(stats.pendingPayables),
      change: 3.2,
      icon: <Wallet className="h-6 w-6 text-purple-600" />,
      color: 'text-purple-600',
    },
    {
      title: 'Cash Inflow',
      value: formatCurrency(stats.cashInflow),
      change: 18.7,
      icon: <ArrowUpRight className="h-6 w-6 text-green-600" />,
      color: 'text-green-600',
    },
    {
      title: 'Cash Outflow',
      value: formatCurrency(stats.cashOutflow),
      change: -12.4,
      icon: <ArrowDownRight className="h-6 w-6 text-red-600" />,
      color: 'text-red-600',
    },
    {
      title: 'Available Cash',
      value: formatCurrency(stats.availableCashPosition),
      change: 8.9,
      icon: <Wallet className="h-6 w-6 text-blue-600" />,
      color: 'text-blue-600',
    },
  ] : [];

  const invoiceColumns: any[] = [
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
    {
      key: 'id',
      label: 'Actions',
      render: (val: any, row: any) => (
        <FinanceRowActions
          onView={() => console.log('View invoice:', row)}
          onEdit={() => console.log('Edit invoice:', row)}
          onSend={() => console.log('Send invoice:', row)}
        />
      )
    }
  ];

  const paymentColumns: any[] = [
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
    {
      key: 'id',
      label: 'Actions',
      render: (val: any, row: any) => (
        <FinanceRowActions
          onView={() => console.log('View payment:', row)}
          onEdit={() => console.log('Edit payment:', row)}
        />
      )
    }
  ];

  const expenseColumns: any[] = [
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
    {
      key: 'id',
      label: 'Actions',
      render: (val: any, row: any) => (
        <FinanceRowActions
          onView={() => console.log('View expense:', row)}
          onEdit={() => console.log('Edit expense:', row)}
          onApprove={() => console.log('Approve expense:', row)}
          onReject={() => console.log('Reject expense:', row)}
        />
      )
    }
  ];

  const activityData: any[] = activities?.map((activity) => ({
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
  })) || [];

  return (
    <MainLayout title="Finance" subtitle="Overview of financial operations">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Finance Dashboard</h1>
            <p className="text-sm text-muted-foreground">Overview of financial operations</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex items-center gap-1 p-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'invoices'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <Receipt className="h-4 w-4" />
              Invoices
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'payments'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Payments
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'expenses'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <FileText className="h-4 w-4" />
              Expenses
            </button>
            <button
              onClick={() => setActiveTab('receivables')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'receivables'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <ArrowUpRight className="h-4 w-4" />
              Receivables
            </button>
            <button
              onClick={() => setActiveTab('payables')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'payables'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <ArrowDownRight className="h-4 w-4" />
              Payables
            </button>
          </div>
        </div>

      {activeTab === 'dashboard' && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                data={kpi}
                onClick={() => console.log('KPI clicked:', kpi.title)}
              />
            ))}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity activities={activityData} />
            </CardContent>
          </Card>
        </>
      )}

      {/* Tab Content */}
      <Card>
        <CardContent className="p-0">
          {/* Search */}
          <div className="p-4 space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            {activeTab === 'invoices' && (
              <DataTable
                columns={invoiceColumns}
                data={invoices?.data || []}
                loading={invoicesLoading}
                onRowClick={(row) => console.log('Invoice clicked:', row)}
                rowIdKey="id"
              />
            )}

            {activeTab === 'payments' && (
              <DataTable
                columns={paymentColumns}
                data={payments?.data || []}
                loading={paymentsLoading}
                onRowClick={(row) => console.log('Payment clicked:', row)}
                rowIdKey="id"
              />
            )}

            {activeTab === 'expenses' && (
              <DataTable
                columns={expenseColumns}
                data={expenses?.data || []}
                loading={expensesLoading}
                onRowClick={(row) => console.log('Expense clicked:', row)}
                rowIdKey="id"
              />
            )}

            {activeTab === 'receivables' && (
              <div className="p-8 text-center text-muted-foreground">
                <Building2 className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>Receivables management coming soon...</p>
              </div>
            )}

            {activeTab === 'payables' && (
              <div className="p-8 text-center text-muted-foreground">
                <Building2 className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>Payables management coming soon...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
    </MainLayout>
  );
}
