'use client';

import { useState, useCallback, memo } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { DataTable } from '@/components/data-table/DataTable';
import { useItemMasters, useItemMasterStats, useCreateItemMaster, useUpdateItemMaster, useDeleteItemMaster } from '@/features/item-master/hooks/useItemMaster';
import { ItemMaster, ItemCategory, ItemStatus, UnitType } from '@/features/item-master/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Package, Plus, Search, Edit, Trash2, AlertCircle } from 'lucide-react';
import { CategoryFilter } from '@/features/item-master/components/CategoryFilter';
import { CategorySelector } from '@/features/item-master/components/CategorySelector';
import { categoryMasterData, getCategoryById } from '@/features/item-master/data/categoryMasterData';

export default function ItemMasterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ItemCategory | 'all'>('all');
  const [categoryTypeFilter, setCategoryTypeFilter] = useState<'PRODUCT' | 'PROCESS' | 'SPECIALIZED' | undefined>();
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
  const updateMutation = useUpdateItemMaster();
  const deleteMutation = useDeleteItemMaster();

  const categories: (ItemCategory | 'all')[] = [
    'all',
    ...categoryMasterData.map((cat: { name: string }) => cat.name),
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

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ItemMaster | null>(null);

  const handleDelete = (item: ItemMaster) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteMutation.mutate(itemToDelete.id, {
        onSuccess: () => {
          console.log(`${itemToDelete.itemName} has been deleted.`);
          setDeleteDialogOpen(false);
          setItemToDelete(null);
        },
        onError: (error: unknown) => {
          console.error('Failed to delete item:', error);
          alert(error instanceof Error ? error.message : 'Failed to delete item.');
        },
      });
    }
  };

  const handleEdit = (item: ItemMaster) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (data: Partial<ItemMaster>) => {
    if (selectedItem) {
      updateMutation.mutate(
        { id: selectedItem.id, data },
        {
          onSuccess: () => {
            console.log(`${selectedItem.itemName} has been updated.`);
            setIsEditDialogOpen(false);
            setSelectedItem(null);
          },
          onError: (error: unknown) => {
            console.error('Failed to update item:', error);
            alert(error instanceof Error ? error.message : 'Failed to update item.');
          },
        }
      );
    }
  };

  return (
    <MainLayout title="Item" subtitle="Product Catalog - Source of Truth for All Products">
      <div className="space-y-4 sm:space-y-6 w-full overflow-hidden">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative flex-1 sm:flex-none max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new product to the catalog.
                </DialogDescription>
              </DialogHeader>
              <ItemForm 
                mode="create"
                onSubmit={() => setIsCreateDialogOpen(false)} 
                onCancel={() => setIsCreateDialogOpen(false)} 
              />
            </DialogContent>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>
                  Update the product details below.
                </DialogDescription>
              </DialogHeader>
              {selectedItem && (
                <ItemForm 
                  mode="edit"
                  initialData={selectedItem}
                  onSubmit={handleEditSubmit}
                  onCancel={() => {
                    setIsEditDialogOpen(false);
                    setSelectedItem(null);
                  }}
                />
              )}
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  Confirm Delete
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to delete <span className="font-medium text-foreground">{itemToDelete?.itemName}</span>? This action cannot be undone.
                </p>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDeleteDialogOpen(false);
                    setItemToDelete(null);
                  }}
                  disabled={deleteMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </DialogFooter>
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
        <CategoryFilter
          onFilterChange={(filter: { categoryId?: string }) => {
            if (filter.categoryId) {
              const category = getCategoryById(filter.categoryId);
              setCategoryFilter(category?.name || 'all');
            } else {
              setCategoryFilter('all');
            }
          }}
        />

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
              rowActions={(row: unknown) => (
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

const ItemForm = memo(function ItemForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  updateMutation,
}: {
  mode: 'create' | 'edit';
  initialData?: ItemMaster;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  updateMutation?: any;
}) {
  const createMutation = useCreateItemMaster();
  const [formData, setFormData] = useState({
    itemCode: initialData?.itemCode || '',
    sku: initialData?.sku || '',
    itemName: initialData?.itemName || '',
    category: initialData?.category || '' as ItemCategory,
    subCategory: initialData?.subCategory || '',
    categoryId: initialData?.categoryId || '',
    subcategoryId: initialData?.subcategoryId || '',
    itemTypeId: initialData?.itemTypeId || '',
    brand: initialData?.brand || '',
    grade: initialData?.grade || '',
    unit: initialData?.unit || 'PCS' as UnitType,
    defaultRate: initialData?.defaultRate?.toString() || '',
    gstRate: initialData?.gstRate?.toString() || '18',
    hsnCode: initialData?.hsnCode || '',
    description: initialData?.description || '',
    specification: initialData?.specification || '',
    technicalDescription: initialData?.technicalDescription || '',
    weight: initialData?.weight?.toString() || '',
    status: initialData?.status || 'Active' as ItemStatus,
    manufacturer: initialData?.manufacturer || '',
    countryOfOrigin: initialData?.countryOfOrigin || '',
    notes: initialData?.notes || '',
    internalNotes: initialData?.internalNotes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.itemCode.trim()) {
      alert('Item Code is required.');
      return;
    }

    if (!formData.itemName.trim()) {
      alert('Item Name is required.');
      return;
    }

    if (!formData.category && !formData.categoryId) {
      alert('Category is required.');
      return;
    }

    if (!formData.unit) {
      alert('Unit is required.');
      return;
    }

    const defaultRateNum = parseFloat(formData.defaultRate);
    if (formData.defaultRate && (isNaN(defaultRateNum) || defaultRateNum < 0)) {
      alert('Default Rate must be a valid positive number.');
      return;
    }

    const gstRateNum = parseFloat(formData.gstRate);
    if (formData.gstRate && (isNaN(gstRateNum) || gstRateNum < 0 || gstRateNum > 100)) {
      alert('GST Rate must be between 0 and 100.');
      return;
    }

    const weightNum = parseFloat(formData.weight);
    if (formData.weight && (isNaN(weightNum) || weightNum < 0)) {
      alert('Weight must be a valid positive number.');
      return;
    }

    const submitData = {
      sku: formData.sku || formData.itemCode,
      itemCode: formData.itemCode,
      itemName: formData.itemName,
      category: formData.category,
      subCategory: formData.subCategory || undefined,
      categoryId: formData.categoryId || undefined,
      subcategoryId: formData.subcategoryId || undefined,
      itemTypeId: formData.itemTypeId || undefined,
      brand: formData.brand || undefined,
      grade: formData.grade || undefined,
      unit: formData.unit,
      defaultRate: defaultRateNum || undefined,
      gstRate: gstRateNum || undefined,
      hsnCode: formData.hsnCode || undefined,
      description: formData.description || undefined,
      specification: formData.specification || undefined,
      technicalDescription: formData.technicalDescription || undefined,
      weight: weightNum || undefined,
      status: formData.status,
      manufacturer: formData.manufacturer || undefined,
      countryOfOrigin: formData.countryOfOrigin || undefined,
      notes: formData.notes || undefined,
      internalNotes: formData.internalNotes || undefined,
    };

    if (mode === 'create') {
      createMutation.mutate(submitData, {
        onSuccess: () => {
          console.log('Product has been created successfully.');
          onSubmit(submitData);
        },
        onError: (error: unknown) => {
          console.error('Failed to create product:', error);
          alert(error instanceof Error ? error.message : 'Failed to create product.');
        },
      });
    } else {
      onSubmit(submitData);
    }
  };

  const categories: ItemCategory[] = categoryMasterData.map((cat: { name: ItemCategory }) => cat.name);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Information */}
        <div>
          <Label htmlFor="itemCode">Item Code *</Label>
          <Input
            id="itemCode"
            value={formData.itemCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, itemCode: e.target.value })}
            placeholder="e.g., SS-PLT-001"
          />
        </div>
        <div>
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            value={formData.sku}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, sku: e.target.value })}
            placeholder="e.g., SS-PLT-001"
          />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <CategorySelector
            onCategoryChange={(categoryId: string, itemTypeId?: string, itemName?: string, categoryPath?: string) => {
              setFormData({
                ...formData,
                categoryId,
                subcategoryId: '',
                itemTypeId: itemTypeId || '',
                itemName: itemName || '',
                category: categoryPath || '',
              });
            }}
            initialCategoryId={initialData?.categoryId}
            initialItemTypeId={initialData?.itemTypeId}
            initialItemName={initialData?.itemName}
          />
        </div>
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={formData.brand}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, brand: e.target.value })}
            placeholder="e.g., TATA Steel"
          />
        </div>
        <div>
          <Label htmlFor="grade">Grade</Label>
          <Input
            id="grade"
            value={formData.grade}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, grade: e.target.value })}
            placeholder="e.g., IS 2062 Grade A"
          />
        </div>
        <div>
          <Label htmlFor="unit">Unit *</Label>
          <Select value={formData.unit} onValueChange={(value: string) => setFormData({ ...formData, unit: value as UnitType })}>
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
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value: string) => setFormData({ ...formData, status: value as ItemStatus })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Discontinued">Discontinued</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pricing & Tax */}
        <div>
          <Label htmlFor="defaultRate">Default Rate (₹)</Label>
          <Input
            id="defaultRate"
            type="number"
            min="0"
            step="0.01"
            value={formData.defaultRate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, defaultRate: e.target.value })}
            placeholder="e.g., 5500"
          />
        </div>
        <div>
          <Label htmlFor="gstRate">GST Rate (%)</Label>
          <Input
            id="gstRate"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={formData.gstRate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, gstRate: e.target.value })}
            placeholder="e.g., 18"
          />
        </div>
        <div>
          <Label htmlFor="hsnCode">HSN Code</Label>
          <Input
            id="hsnCode"
            value={formData.hsnCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, hsnCode: e.target.value })}
            placeholder="e.g., 7208"
          />
        </div>

        {/* Physical Properties */}
        <div>
          <Label htmlFor="weight">Weight (per unit)</Label>
          <Input
            id="weight"
            type="number"
            min="0"
            step="0.01"
            value={formData.weight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="e.g., 47.1"
          />
        </div>
        <div>
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Input
            id="manufacturer"
            value={formData.manufacturer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, manufacturer: e.target.value })}
            placeholder="e.g., TATA Steel"
          />
        </div>
        <div>
          <Label htmlFor="countryOfOrigin">Country of Origin</Label>
          <Input
            id="countryOfOrigin"
            value={formData.countryOfOrigin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, countryOfOrigin: e.target.value })}
            placeholder="e.g., India"
          />
        </div>
      </div>

      {/* Descriptions */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
            placeholder="General description of the product"
            rows={2}
          />
        </div>
        <div>
          <Label htmlFor="specification">Specification</Label>
          <Textarea
            id="specification"
            value={formData.specification}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, specification: e.target.value })}
            placeholder="Technical specifications"
            rows={2}
          />
        </div>
        <div>
          <Label htmlFor="technicalDescription">Technical Description</Label>
          <Textarea
            id="technicalDescription"
            value={formData.technicalDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, technicalDescription: e.target.value })}
            placeholder="Detailed technical information"
            rows={2}
          />
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Additional notes"
            rows={2}
          />
        </div>
        <div>
          <Label htmlFor="internalNotes">Internal Notes</Label>
          <Textarea
            id="internalNotes"
            value={formData.internalNotes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, internalNotes: e.target.value })}
            placeholder="Internal notes (not visible to customers)"
            rows={2}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={createMutation.isPending || updateMutation?.isPending}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={createMutation.isPending || updateMutation?.isPending}
        >
          {createMutation.isPending || updateMutation?.isPending ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Update Product'}
        </Button>
      </div>
    </form>
  );
});
