'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InventoryItem } from '@/features/inventory/types';
import { MATERIAL_TYPES, UNITS, INVENTORY_CATEGORIES } from '@/features/inventory/constants';
import { useWarehouses, useSuppliers } from '@/features/inventory/hooks/useInventory';
import { X } from 'lucide-react';

interface InventoryItemFormProps {
  initialData?: Partial<InventoryItem>;
  onSubmit: (data: Partial<InventoryItem>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function InventoryItemForm({ initialData, onSubmit, onCancel, isLoading }: InventoryItemFormProps) {
  const { data: warehouses } = useWarehouses();
  const { data: suppliers } = useSuppliers();

  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    itemName: '',
    category: undefined,
    subCategory: '',
    unit: undefined,
    materialType: undefined,
    grade: '',
    thickness: undefined,
    weight: undefined,
    length: undefined,
    width: undefined,
    height: undefined,
    color: '',
    coating: '',
    purchaseRate: undefined,
    sellingRate: undefined,
    taxPercentage: undefined,
    minimumStock: 0,
    reorderLevel: 0,
    safetyStock: 0,
    warehouseId: '',
    preferredSupplierId: '',
    ...initialData,
  });

  const handleChange = (field: keyof InventoryItem, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section 1: General Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">General Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Item Name *</label>
              <Input
                value={formData.itemName || ''}
                onChange={(e) => handleChange('itemName', e.target.value)}
                placeholder="e.g., ISMB 300 Steel Beam"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category *</label>
              <Select
                value={formData.category}
                onValueChange={(v) => handleChange('category', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {INVENTORY_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sub Category</label>
              <Input
                value={formData.subCategory || ''}
                onChange={(e) => handleChange('subCategory', e.target.value)}
                placeholder="e.g., Hot Rolled"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Unit *</label>
              <Select
                value={formData.unit}
                onValueChange={(v) => handleChange('unit', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((u) => (
                    <SelectItem key={u.value} value={u.value}>
                      {u.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: PEB Material Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">PEB Material Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Material Type *</label>
              <Select
                value={formData.materialType}
                onValueChange={(v) => handleChange('materialType', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select material type" />
                </SelectTrigger>
                <SelectContent>
                  {MATERIAL_TYPES.map((mt) => (
                    <SelectItem key={mt.value} value={mt.value}>
                      {mt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Grade</label>
              <Input
                value={formData.grade || ''}
                onChange={(e) => handleChange('grade', e.target.value)}
                placeholder="e.g., IS 2062 E250"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Thickness (mm)</label>
              <Input
                type="number"
                step="0.01"
                value={formData.thickness ?? ''}
                onChange={(e) => handleChange('thickness', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="e.g., 6.0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Weight (Kg)</label>
              <Input
                type="number"
                step="0.01"
                value={formData.weight ?? ''}
                onChange={(e) => handleChange('weight', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="e.g., 468.0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Length (mm)</label>
              <Input
                type="number"
                step="0.01"
                value={formData.length ?? ''}
                onChange={(e) => handleChange('length', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="e.g., 12000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Width (mm)</label>
              <Input
                type="number"
                step="0.01"
                value={formData.width ?? ''}
                onChange={(e) => handleChange('width', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="e.g., 300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Height (mm)</label>
              <Input
                type="number"
                step="0.01"
                value={formData.height ?? ''}
                onChange={(e) => handleChange('height', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="e.g., 300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Color</label>
              <Input
                value={formData.color || ''}
                onChange={(e) => handleChange('color', e.target.value)}
                placeholder="e.g., Blue, RAL 5012"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Coating</label>
              <Input
                value={formData.coating || ''}
                onChange={(e) => handleChange('coating', e.target.value)}
                placeholder="e.g., Galvanized, AZ-150"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Commercial Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Commercial Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Purchase Rate (₹) *</label>
              <Input
                type="number"
                step="0.01"
                value={formData.purchaseRate ?? ''}
                onChange={(e) => handleChange('purchaseRate', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="e.g., 55.00"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Selling Rate (₹)</label>
              <Input
                type="number"
                step="0.01"
                value={formData.sellingRate ?? ''}
                onChange={(e) => handleChange('sellingRate', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="e.g., 72.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tax % (GST)</label>
              <Input
                type="number"
                step="0.01"
                value={formData.taxPercentage ?? ''}
                onChange={(e) => handleChange('taxPercentage', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="e.g., 18"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Inventory Rules */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Inventory Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Stock *</label>
              <Input
                type="number"
                step="0.01"
                value={formData.minimumStock ?? 0}
                onChange={(e) => handleChange('minimumStock', Number(e.target.value))}
                placeholder="e.g., 100"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reorder Level *</label>
              <Input
                type="number"
                step="0.01"
                value={formData.reorderLevel ?? 0}
                onChange={(e) => handleChange('reorderLevel', Number(e.target.value))}
                placeholder="e.g., 200"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Safety Stock *</label>
              <Input
                type="number"
                step="0.01"
                value={formData.safetyStock ?? 0}
                onChange={(e) => handleChange('safetyStock', Number(e.target.value))}
                placeholder="e.g., 50"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Warehouse *</label>
              <Select
                value={formData.warehouseId}
                onValueChange={(v) => handleChange('warehouseId', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select warehouse" />
                </SelectTrigger>
                <SelectContent>
                  {(warehouses ?? []).map((wh) => (
                    <SelectItem key={wh.id} value={wh.id}>
                      {wh.name} ({wh.warehouseCode})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 5: Supplier Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Supplier Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Supplier</label>
              <Select
                value={formData.preferredSupplierId || undefined}
                onValueChange={(v) => handleChange('preferredSupplierId', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {(suppliers ?? []).map((sup) => (
                    <SelectItem key={sup.id} value={sup.id}>
                      {sup.name} - {sup.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData?.id ? 'Update Item' : 'Create Item'}
        </Button>
      </div>
    </form>
  );
}
