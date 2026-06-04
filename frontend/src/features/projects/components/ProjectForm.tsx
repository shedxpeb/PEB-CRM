'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { createProjectSchema, CreateProjectInput } from '@/features/projects/validations';
import { PROJECT_TYPES, PROJECT_PRIORITIES, STRUCTURE_TYPES, ROOF_TYPES, CRANE_SYSTEMS, WALL_TYPES } from '@/features/projects/constants';
import { useCustomers } from '@/features/customers/hooks/useCustomers';

interface ProjectFormProps {
  onSubmit: (data: Partial<CreateProjectInput>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<CreateProjectInput>;
}

export function ProjectForm({ onSubmit, onCancel, isLoading, initialData }: ProjectFormProps) {
  const { data: customers } = useCustomers();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: initialData || {
      projectType: 'Industrial Shed',
      priority: 'Medium',
      structureType: 'PEB Building',
      roofType: 'Standing Seam',
      craneSystem: 'None',
      wallType: 'Single Skin',
      mezzanine: false,
      insulation: false,
    },
  });

  const mezzanine = watch('mezzanine');
  const insulation = watch('insulation');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <Select onValueChange={(value) => setValue('customerId', value)} defaultValue={initialData?.customerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers?.data?.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.customerName} ({customer.companyName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <Input {...register('location')} placeholder="Enter project location" />
            {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">City *</label>
              <Input {...register('city')} placeholder="City" />
              {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">State *</label>
              <Input {...register('state')} placeholder="State" />
              {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pincode</label>
              <Input {...register('pincode')} placeholder="Pincode" />
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
