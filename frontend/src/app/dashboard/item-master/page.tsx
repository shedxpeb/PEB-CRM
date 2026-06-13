'use client';

import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { DataTable } from '@/components/data-table/DataTable';
import { useItemMasters, useItemMasterStats, useCreateItemMaster, useDeleteItemMaster } from '@/features/item-master/hooks/useItemMaster';
import { ItemMaster, ItemCategory, ItemStatus } from '@/features/item-master/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function ItemMasterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ItemCategory | 'all'>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemMaster | null>(null);

  const { data: items, isLoading } = useItemMasters({
    filter: {
      category: categoryFilter === 'all' ? undefined : categoryFilter,
      search: searchQuery || undefined,
    },
  });

  const { data: stats } = useItemMasterStats();
  const createMutation = useCreateItemMaster();
  const deleteMutation = useDeleteItemMaster();

  const categories: (ItemCategory | 'all')[] = [
    'all',
    'Structural Steel',
    'Cladding',
    'Roofing',
    'Insulation',
    'Fasteners',
    'Accessories',
    'Doors',
    'Windows',
    'Gutters',
    'Downspouts',
    'Ventilation',
    'Foundation',
    'Electrical',
    'Plumbing',
    'Other',
    'Roofing Sheets',
  ];

  const columns = [
    {
      key: 'itemCode',
      label: 'Item Code',
      sortable: true,
    },
    {
      key: 'itemName',
      label: 'Item Name',
      sortable: true,
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value: ItemCategory) => (
        <Badge variant="outline" className="text-xs">
          {value}
        </Badge>
      ),
    },
    {
      key: 'brand',
      label: 'Brand',
      sortable: true,
    },
    {
      key: 'unit',
      label: 'Unit',
      sortable: true,
    },
    {
      key: 'defaultRate',
      label: 'Default Rate',
      sortable: true,
      render: (value: number) => (
        <span className="text-sm font-medium">
          ₹{value?.toLocaleString() || '-'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: ItemStatus) => (
        <Badge
          variant={value === 'Active' ? 'default' : value === 'Inactive' ? 'secondary' : 'destructive'}
          className="text-xs"
        >
          {value}
        </Badge>
      ),
    },
  ];

  const handleDelete = (item: ItemMaster) => {
    if (confirm(`Are you sure you want to delete ${item.itemName}?`)) {
      deleteMutation.mutate(item.id);
    }
  };

  const handleEdit = (item: ItemMaster) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  return (
    <MainLayout title="Item Master" subtitle="Product Catalog - Source of Truth for All Products">
      <div className="space-y-4 sm:space-y-6 w-full overflow-hidden">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative flex-1 sm:flex-none max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <ItemForm onSubmit={() => setIsCreateDialogOpen(false)} onCancel={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <KPICard
            data={{
              title: 'Total Products',
              value: (stats?.totalItems ?? 0).toString(),
              change: 0,
              color: 'text-blue-600',
              icon: <Package className="h-5 w-5" />,
            }}
          />
          <KPICard
            data={{
              title: 'Active Products',
              value: (stats?.activeItems ?? 0).toString(),
              change: 0,
              color: 'text-green-600',
              icon: <Package className="h-5 w-5" />,
            }}
          />
          <KPICard
            data={{
              title: 'Categories',
              value: Object.keys(stats?.itemsByCategory || {}).filter(k => stats?.itemsByCategory[k as ItemCategory]! > 0).length.toString(),
              change: 0,
              color: 'text-purple-600',
              icon: <Package className="h-5 w-5" />,
            }}
          />
          <KPICard
            data={{
              title: 'Brands',
              value: Object.keys(stats?.itemsByBrand || {}).length.toString(),
              change: 0,
              color: 'text-orange-600',
              icon: <Package className="h-5 w-5" />,
            }}
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Badge
              key={category}
              variant={categoryFilter === category ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Items Table */}
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={items || []}
              columns={columns}
              loading={isLoading}
              rowActions={(row) => (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(row as ItemMaster)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(row as ItemMaster)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

function ItemForm({ onSubmit, onCancel }: { onSubmit: () => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    category: '' as ItemCategory,
    brand: '',
    unit: 'PCS' as const,
    defaultRate: '',
    gstRate: '18',
    hsnCode: '',
    description: '',
    specifications: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit form data
    onSubmit();
  };

  const categories: ItemCategory[] = [
    'Structural Steel',
    'Cladding',
    'Roofing',
    'Insulation',
    'Fasteners',
    'Accessories',
    'Doors',
    'Windows',
    'Gutters',
    'Downspouts',
    'Ventilation',
    'Foundation',
    'Electrical',
    'Plumbing',
    'Other',
    'Roofing Sheets',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="itemCode">Item Code *</Label>
          <Input
            id="itemCode"
            value={formData.itemCode}
            onChange={(e) => setFormData({ ...formData, itemCode: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="itemName">Item Name *</Label>
          <Input
            id="itemName"
            value={formData.itemName}
            onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as ItemCategory })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="unit">Unit *</Label>
          <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KG">KG</SelectItem>
              <SelectItem value="MT">MT</SelectItem>
              <SelectItem value="PCS">PCS</SelectItem>
              <SelectItem value="NOS">NOS</SelectItem>
              <SelectItem value="SQM">SQM</SelectItem>
              <SelectItem value="SQFT">SQFT</SelectItem>
              <SelectItem value="M">M</SelectItem>
              <SelectItem value="FT">FT</SelectItem>
              <SelectItem value="LTR">LTR</SelectItem>
              <SelectItem value="SET">SET</SelectItem>
              <SelectItem value="BUNDLE">BUNDLE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="defaultRate">Default Rate (₹)</Label>
          <Input
            id="defaultRate"
            type="number"
            value={formData.defaultRate}
            onChange={(e) => setFormData({ ...formData, defaultRate: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="gstRate">GST Rate (%)</Label>
          <Input
            id="gstRate"
            type="number"
            value={formData.gstRate}
            onChange={(e) => setFormData({ ...formData, gstRate: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="hsnCode">HSN Code</Label>
          <Input
            id="hsnCode"
            value={formData.hsnCode}
            onChange={(e) => setFormData({ ...formData, hsnCode: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="specifications">Specifications</Label>
        <Input
          id="specifications"
          value={formData.specifications}
          onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Product</Button>
      </div>
    </form>
  );
}
