'use client';

import { useRouter } from 'next/navigation';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KPICard } from '@/components/dashboard/KPICard';
import { EmptyState } from '@/components/states/EmptyState';
import {
  BookOpen,
  FileEdit,
  Book,
  Scale,
  BarChart3,
  CheckCircle,
  FolderTree,
  Shield,
} from 'lucide-react';

export default function AccountingPage() {
  const router = useRouter();

  // Mock KPI Data
  const accountingKPIs = [
    {
      title: 'Total Accounts',
      value: '48',
      change: 5,
      icon: <BookOpen className="h-6 w-6" />,
      color: 'text-blue-600',
    },
    {
      title: 'Active Accounts',
      value: '42',
      change: 3,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'text-green-600',
    },
    {
      title: 'Account Groups',
      value: '8',
      change: 0,
      icon: <FolderTree className="h-6 w-6" />,
      color: 'text-purple-600',
    },
    {
      title: 'System Accounts',
      value: '6',
      change: 0,
      icon: <Shield className="h-6 w-6" />,
      color: 'text-orange-600',
    },
  ];

  // Module card configurations
  const modules = [
    {
      id: 'chart-of-accounts',
      title: 'Chart of Accounts',
      description: 'Manage your account structure and categories',
      icon: BookOpen,
      status: 'ready' as const,
      route: '/dashboard/accounting/chart-of-accounts',
    },
    {
      id: 'journal-entries',
      title: 'Journal Entries',
      description: 'Record financial transactions and adjustments',
      icon: FileEdit,
      status: 'coming-soon' as const,
    },
    {
      id: 'ledger-viewer',
      title: 'Ledger Viewer',
      description: 'View detailed transaction ledgers',
      icon: Book,
      status: 'coming-soon' as const,
    },
    {
      id: 'trial-balance',
      title: 'Trial Balance',
      description: 'View account balances and verify books',
      icon: Scale,
      status: 'coming-soon' as const,
    },
    {
      id: 'reports',
      title: 'Reports',
      description: 'Financial reports including P&L, Balance Sheet, and Cash Flow',
      icon: BarChart3,
      status: 'coming-soon' as const,
    },
  ];

  return (
    <MainLayout title="Accounting" subtitle="Manage your accounting structure and transactions">
      <div className="space-y-4 sm:space-y-6 w-full overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Accounting Dashboard</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage accounts, transactions, and financial records
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {accountingKPIs.map((kpi, index) => (
            <KPICard key={`${kpi.title}-${index}`} data={kpi} />
          ))}
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            const isReady = module.status === 'ready';

            return (
              <Card
                key={module.id}
                className={
                  isReady
                    ? 'hover:shadow-lg transition-shadow cursor-pointer'
                    : 'opacity-60'
                }
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-lg ${
                          isReady
                            ? 'bg-primary/10 text-primary'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </div>
                    <Badge variant={isReady ? 'success' : 'secondary'} className="ml-2">
                      {isReady ? 'Ready' : 'Coming Soon'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                  {isReady && module.route ? (
                    <Button
                      onClick={() => router.push(module.route)}
                      className="w-full"
                    >
                      Open {module.title}
                    </Button>
                  ) : (
                    <EmptyState
                      title="Coming Soon"
                      description={`${module.title} module will be available soon`}
                      className="py-6"
                    />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
