'use client';

import { useState, memo } from 'react';
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
import { UNITS } from '@/features/inventory/constants';
import { useWarehouses } from '@/features/inventory/hooks/useInventory';
import { X } from 'lucide-react';

interface InventoryItemFormProps {
  initialData?: Partial<InventoryItem>;
  onSubmit: (data: Partial<InventoryItem>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const InventoryItemForm = memo(function InventoryItemForm({ initialData, onSubmit, onCancel, isLoading }: InventoryItemFormProps) {
  const { data: warehouses } = useWarehouses();

  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    itemCode: '',
    itemMasterId: '',
    itemName: '',
    unit: undefined,
    minimumStock: 0,
    reorderLevel: 0,
    safetyStock: 0,
    warehouseId: '',
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Item Code *</label>
              <Input
                value={formData.itemCode || ''}
                onChange={(e) => handleChange('itemCode', e.target.value)}
                placeholder="e.g., STEEL-001"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Item Master ID *</label>
              <Input
                value={formData.itemMasterId || ''}
                onChange={(e) => handleChange('itemMasterId', e.target.value)}
                placeholder="Reference to Item Master"
                required
              />
            </div>
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

      {/* Section 2: Inventory Rules */}
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
});

export { InventoryItemForm };
