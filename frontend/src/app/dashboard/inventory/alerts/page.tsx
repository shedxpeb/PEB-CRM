'use client';

import { MainLayout } from '@/layouts/MainLayout';
import { DataTable, Column } from '@/components/data-table/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InventoryAlert } from '@/features/inventory/types';
import { useInventoryAlerts } from '@/features/inventory/hooks/useInventory';
import {
  AlertTriangle,
  AlertOctagon,
  XCircle,
  Download,
  Package,
  ArrowUpFromLine,
  ShoppingCart,
} from 'lucide-react';

export default function AlertsPage() {
  const { data: alerts, isLoading } = useInventoryAlerts();

  const columns: Column<InventoryAlert>[] = [
    {
      key: 'itemCode',
      label: 'Item Code',
      sortable: true,
      render: (value) => <span className="font-mono text-xs">{value}</span>,
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
      key: 'type',
      label: 'Alert Type',
      sortable: true,
      filterable: true,
      render: (value) => {
        const icons = {
          'Low Stock': <AlertTriangle className="h-3 w-3" />,
          'Out of Stock': <XCircle className="h-3 w-3" />,
          'Reorder Required': <ShoppingCart className="h-3 w-3" />,
          'Critical Stock': <AlertOctagon className="h-3 w-3" />,
        };
        return (
          <div className="flex items-center gap-1">
            {icons[value as keyof typeof icons]}
            <span className="text-xs">{value}</span>
          </div>
        );
      },
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
      key: 'threshold',
      label: 'Threshold',
      sortable: true,
      render: (value) => (
        <span className="text-xs text-muted-foreground">{Number(value).toLocaleString()}</span>
      ),
    },
    {
      key: 'severity',
      label: 'Severity',
      sortable: true,
      filterable: true,
      render: (value) => (
        <Badge
          variant={
            value === 'critical'
              ? 'destructive'
              : value === 'warning'
              ? 'warning'
              : 'default'
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (value) => {
        if (!value) return <span className="text-xs text-muted-foreground">-</span>;
        const date = new Date(value);
        return (
          <span className="text-xs text-muted-foreground">
            {date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <MainLayout title="Inventory Alerts" subtitle="Low stock and shortage alerts">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Loading alerts...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const criticalAlerts = alerts?.filter((a) => a.severity === 'critical') || [];
  const warningAlerts = alerts?.filter((a) => a.severity === 'warning') || [];
  const infoAlerts = alerts?.filter((a) => a.severity === 'info') || [];

  return (
    <MainLayout title="Inventory Alerts" subtitle="Low stock and shortage alerts">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100">
                  <AlertOctagon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Critical Alerts</p>
                  <p className="text-2xl font-bold text-red-600">{criticalAlerts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Warnings</p>
                  <p className="text-2xl font-bold text-amber-600">{warningAlerts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                  <p className="text-2xl font-bold">
                    {alerts?.filter((a) => a.type === 'Out of Stock').length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <ShoppingCart className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reorder Required</p>
                  <p className="text-2xl font-bold">
                    {alerts?.filter((a) => a.type === 'Reorder Required').length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Alerts</h2>
            <p className="text-sm text-muted-foreground">{alerts?.length || 0} total alerts</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" variant="destructive">
              <ArrowUpFromLine className="h-4 w-4 mr-2" />
              Create Purchase Requests
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={alerts || []}
          rowIdKey="id"
        />
      </div>
    </MainLayout>
  );
}
