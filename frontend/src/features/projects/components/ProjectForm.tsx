'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Combobox } from '@/components/ui/combobox';
import { Badge } from '@/components/ui/badge';
import { createProjectSchema, CreateProjectInput } from '@/features/projects/validations';
import { PROJECT_TYPES, PROJECT_PRIORITIES, STRUCTURE_TYPES, ROOF_TYPES, CRANE_SYSTEMS, WALL_TYPES } from '@/features/projects/constants';
import { useCustomers } from '@/features/customers/hooks/useCustomers';
import { Info, Lock } from 'lucide-react';

interface ProjectFormProps {
  onSubmit: (data: Partial<CreateProjectInput>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<CreateProjectInput>;
  prefillCustomerId?: string;
}

export function ProjectForm({ onSubmit, onCancel, isLoading, initialData, prefillCustomerId }: ProjectFormProps) {
  const { data: customers } = useCustomers();
  const [showAutoFillNotice, setShowAutoFillNotice] = useState(false);
  const isLinkedToCustomer = !!initialData?.customerId;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      ...initialData,
      projectType: 'Industrial Shed',
      priority: 'Medium',
      structureType: 'PEB Building',
      roofType: 'Standing Seam',
      craneSystem: 'None',
      wallType: 'Single Skin',
      mezzanine: false,
      insulation: false,
      ...(prefillCustomerId && { customerId: prefillCustomerId }),
    },
  });

  const customerId = watch('customerId');

  // Auto-fill project fields from selected customer
  useEffect(() => {
    if (customerId && customers?.data) {
      const selectedCustomer = customers.data.find((c) => c.id === customerId);
      if (selectedCustomer) {
        setValue('location', selectedCustomer.address || '');
        setValue('city', selectedCustomer.city || '');
        setValue('state', selectedCustomer.state || '');
        setValue('pincode', selectedCustomer.pincode || '');
        setShowAutoFillNotice(true);

        // Hide notice after 3 seconds
        const timer = setTimeout(() => {
          setShowAutoFillNotice(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [customerId, customers?.data, setValue]);

  const mezzanine = watch('mezzanine');
  const insulation = watch('insulation');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Auto-fill Notice */}
      {showAutoFillNotice && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-start gap-2">
          <Info className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-green-700">
            Location details have been auto-filled from the selected Customer. You can edit any field before saving.
          </p>
        </div>
      )}

      {/* General Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">General Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Name *</label>
              <Input {...register('projectName')} placeholder="Enter project name" />
              {errors.projectName && <p className="text-sm text-red-500">{errors.projectName.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer *</label>
              <Combobox
                options={customers?.data?.map((customer) => ({
                  value: customer.id,
                  label: `${customer.customerName} (${customer.companyName})`
                })) || []}
                value={watch('customerId') || ''}
                onValueChange={(value) => setValue('customerId', value)}
                placeholder="Select customer"
                searchPlaceholder="Search customers..."
                emptyMessage="No customer found"
              />
              {errors.customerId && <p className="text-sm text-red-500">{errors.customerId.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Type *</label>
              <Select onValueChange={(value) => setValue('projectType', value as any)} defaultValue={initialData?.projectType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.projectType && <p className="text-sm text-red-500">{errors.projectType.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority *</label>
              <Select onValueChange={(value) => setValue('priority', value as any)} defaultValue={initialData?.priority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_PRIORITIES.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      <Badge variant={priority === 'Urgent' ? 'destructive' : priority === 'High' ? 'warning' : 'default'}>
                        {priority}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Value (₹) *</label>
              <Input type="number" {...register('value', { valueAsNumber: true })} placeholder="Enter project value" />
              {errors.value && <p className="text-sm text-red-500">{errors.value.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Budget (₹) *</label>
              <Input type="number" {...register('budget', { valueAsNumber: true })} placeholder="Enter budget" />
              {errors.budget && <p className="text-sm text-red-500">{errors.budget.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date *</label>
              <Input type="date" {...register('startDate', { valueAsDate: true })} />
              {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date *</label>
              <Input type="date" {...register('endDate', { valueAsDate: true })} />
              {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location *</label>
            <div className="relative">
              <Input {...register('location')} placeholder="Enter project location" disabled={isLinkedToCustomer} />
              {isLinkedToCustomer && (
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
            {isLinkedToCustomer && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Info className="h-3 w-3" />
                This value is synchronized from the linked Customer. Edit it from the Customer record.
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">City *</label>
              <div className="relative">
                <Input {...register('city')} placeholder="City" disabled={isLinkedToCustomer} />
                {isLinkedToCustomer && (
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
              </div>
              {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
              {isLinkedToCustomer && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Synchronized from Customer
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">State *</label>
              <div className="relative">
                <Input {...register('state')} placeholder="State" disabled={isLinkedToCustomer} />
                {isLinkedToCustomer && (
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
              </div>
              {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
              {isLinkedToCustomer && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Synchronized from Customer
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pincode</label>
              <div className="relative">
                <Input {...register('pincode')} placeholder="Pincode" disabled={isLinkedToCustomer} />
                {isLinkedToCustomer && (
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
              </div>
              {isLinkedToCustomer && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Synchronized from Customer
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Project Manager *</label>
            <Input {...register('projectManagerId')} placeholder="Enter project manager ID" />
            {errors.projectManagerId && <p className="text-sm text-red-500">{errors.projectManagerId.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* PEB Specific Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">PEB Specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Structure Type *</label>
              <Select onValueChange={(value) => setValue('structureType', value as any)} defaultValue={initialData?.structureType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select structure type" />
                </SelectTrigger>
                <SelectContent>
                  {STRUCTURE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.structureType && <p className="text-sm text-red-500">{errors.structureType.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Roof Type *</label>
              <Select onValueChange={(value) => setValue('roofType', value as any)} defaultValue={initialData?.roofType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select roof type" />
                </SelectTrigger>
                <SelectContent>
                  {ROOF_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.roofType && <p className="text-sm text-red-500">{errors.roofType.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Width (m)</label>
              <Input type="number" {...register('width', { valueAsNumber: true })} placeholder="Width" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Length (m)</label>
              <Input type="number" {...register('length', { valueAsNumber: true })} placeholder="Length" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Height (m)</label>
              <Input type="number" {...register('height', { valueAsNumber: true })} placeholder="Height" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bay Spacing (m)</label>
              <Input type="number" {...register('baySpacing', { valueAsNumber: true })} placeholder="Bay spacing" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Crane System *</label>
              <Select onValueChange={(value) => setValue('craneSystem', value as any)} defaultValue={initialData?.craneSystem}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crane system" />
                </SelectTrigger>
                <SelectContent>
                  {CRANE_SYSTEMS.map((system) => (
                    <SelectItem key={system} value={system}>
                      {system}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.craneSystem && <p className="text-sm text-red-500">{errors.craneSystem.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Wall Type *</label>
              <Select onValueChange={(value) => setValue('wallType', value as any)} defaultValue={initialData?.wallType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select wall type" />
                </SelectTrigger>
                <SelectContent>
                  {WALL_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.wallType && <p className="text-sm text-red-500">{errors.wallType.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Covered Area (sq.m)</label>
              <Input type="number" {...register('coveredArea', { valueAsNumber: true })} placeholder="Covered area" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Total Weight (tons)</label>
              <Input type="number" {...register('totalWeight', { valueAsNumber: true })} placeholder="Total weight" />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <input type="checkbox" {...register('mezzanine')} className="h-4 w-4" />
              <label className="text-sm font-medium">Mezzanine</label>
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <input type="checkbox" {...register('insulation')} className="h-4 w-4" />
              <label className="text-sm font-medium">Insulation</label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}
