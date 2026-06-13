'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable, Column } from '@/components/data-table/DataTable';
import { InventoryActivityTimeline } from '@/features/inventory/components/InventoryActivityTimeline';
import { InventoryItem, StockMovement, StockStatus } from '@/features/inventory/types';
import { getStockStatusVariant, getMovementTypeVariant } from '@/features/inventory/constants';
import { useInventoryItem, useInventoryActivities, useStockMovementHistory } from '@/features/inventory/hooks/useInventory';
import {
  ArrowLeft,
  Package,
  DollarSign,
  AlertTriangle,
  Warehouse,
  Truck,
  Building2,
  FileText,
  Clock,
  ArrowUpFromLine,
  ArrowDownToLine,
  ArrowRightLeft,
  Lock,
  Edit,
  Download,
} from 'lucide-react';

export default function InventoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [activeTab, setActiveTab] = useState('overview');

  const { data: item, isLoading } = useInventoryItem(id);
  const { data: activities } = useInventoryActivities(id, activeTab === 'activity');
  const { data: movements } = useStockMovementHistory(id, activeTab === 'stock-history');

  if (isLoading) {
    return (
      <MainLayout title="Inventory Details" subtitle="View item information">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Loading item details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!item) {
    return (
      <MainLayout title="Inventory Details" subtitle="View item information">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <p className="text-sm text-destructive">Item not found</p>
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              Go Back
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const movementColumns: Column<StockMovement>[] = [
    {
      key: 'movementNumber',
      label: 'Movement #',
      sortable: true,
      render: (value) => <span className="font-mono text-xs">{value}</span>,
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value) => (
        <Badge variant={getMovementTypeVariant(value as any)}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'quantity',
      label: 'Quantity',
      sortable: true,
      render: (value) => <span className="text-xs font-medium">{Number(value).toLocaleString()}</span>,
    },
    {
      key: 'warehouse',
      label: 'Warehouse',
      sortable: true,
    },
    {
      key: 'referenceNumber',
      label: 'Reference',
      render: (value) => <span className="text-xs font-mono">{value || '-'}</span>,
    },
    {
      key: 'performedBy',
      label: 'Performed By',
    },
    {
      key: 'date',
      label: 'Date',
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

  return (
    <MainLayout title={item.itemName} subtitle={item.itemCode}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Item
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Stock</p>
                  <p className="text-lg font-bold">{Number(item.currentStock).toLocaleString()} {item.unit}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Value</p>
                  <p className="text-lg font-bold">₹{Number(item.totalValue).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Lock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reserved Stock</p>
                  <p className="text-lg font-bold">{Number(item.reservedStock).toLocaleString()} {item.unit}</p>
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
                  <p className="text-xs text-muted-foreground">Available</p>
                  <p className="text-lg font-bold">{Number(item.availableStock).toLocaleString()} {item.unit}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stock-history">Stock History</TabsTrigger>
            <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* General Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    General Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Item Code</p>
                      <p className="text-sm font-medium font-mono">{item.itemCode}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Unit</p>
                      <p className="text-sm font-medium">{item.unit}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>



              {/* Inventory Rules */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Inventory Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Minimum Stock</p>
                      <p className="text-sm font-medium">{Number(item.minimumStock).toLocaleString()} {item.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Reorder Level</p>
                      <p className="text-sm font-medium">{Number(item.reorderLevel).toLocaleString()} {item.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Safety Stock</p>
                      <p className="text-sm font-medium">{Number(item.safetyStock).toLocaleString()} {item.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Warehouse</p>
                      <p className="text-sm font-medium">{item.warehouseName}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* Stock History Tab */}
          <TabsContent value="stock-history">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Stock Movement History</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={movementColumns}
                  data={movements || []}
                  rowIdKey="id"
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Warehouses Tab */}
          <TabsContent value="warehouses">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Warehouse className="h-4 w-4" />
                  Warehouse Stock Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Main Warehouse</h3>
                      <Badge variant="default">Primary</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Current</p>
                        <p className="font-medium">5,000 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Reserved</p>
                        <p className="font-medium">1,200 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Issued</p>
                        <p className="font-medium">800 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Available</p>
                        <p className="font-medium">3,000 Kg</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Fabrication Yard</h3>
                      <Badge variant="secondary">Secondary</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Current</p>
                        <p className="font-medium">3,500 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Reserved</p>
                        <p className="font-medium">800 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Issued</p>
                        <p className="font-medium">700 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Available</p>
                        <p className="font-medium">2,000 Kg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


          {/* Suppliers Tab */}
          <TabsContent value="suppliers">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Supplier Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">JSW Steel</h3>
                    <Badge variant="default">Last Purchase</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Contact Person</p>
                      <p className="font-medium">Rajesh Patil</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Purchase Date</p>
                      <p className="font-medium">10 Jun 2024</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Purchase Qty</p>
                      <p className="font-medium">5,000 Kg</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Purchase Rate</p>
                      <p className="font-medium">₹65/Kg</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Project Stock Allocations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">Factory Shed - Ahmedabad</h3>
                        <p className="text-xs text-muted-foreground">Reliance Industries</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Reserved Qty</p>
                        <p className="font-medium">2,500 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Issued Qty</p>
                        <p className="font-medium">1,500 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Balance Qty</p>
                        <p className="font-medium">1,000 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <Badge variant="default" className="text-xs">Active</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">Warehouse - Mumbai</h3>
                        <p className="text-xs text-muted-foreground">Tata Motors</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Reserved Qty</p>
                        <p className="font-medium">1,500 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Issued Qty</p>
                        <p className="font-medium">800 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Balance Qty</p>
                        <p className="font-medium">700 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <Badge variant="default" className="text-xs">Active</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">Industrial Building - Pune</h3>
                        <p className="text-xs text-muted-foreground">Mahindra & Mahindra</p>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Reserved Qty</p>
                        <p className="font-medium">1,000 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Issued Qty</p>
                        <p className="font-medium">1,000 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Balance Qty</p>
                        <p className="font-medium">0 Kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <Badge variant="secondary" className="text-xs">Completed</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Stock Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Stock Movement History</p>
                        <p className="text-xs text-muted-foreground">Complete stock transaction log</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">GRN Documents</p>
                        <p className="text-xs text-muted-foreground">Goods Received Notes</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Internal Notes</p>
                        <p className="text-xs text-muted-foreground">Warehouse internal notes</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="font-medium">Warehouse Documents</p>
                        <p className="text-xs text-muted-foreground">Warehouse-related documents</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <InventoryActivityTimeline activities={activities || []} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
