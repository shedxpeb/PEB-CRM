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
import { Badge } from '@/components/ui/badge';
import {
  Lead,
  ProjectType,
  StructureType,
  RoofType,
  WallType,
  MaterialPreference,
  LeadSource,
  LeadPriority,
  LeadStatus,
} from '@/types/leads';
import { X, Upload, AlertTriangle, AlertCircle } from 'lucide-react';
import { DEFAULT_LEAD_CONFIGURATION, LeadModuleConfiguration } from '@/features/leads/hooks/useLeads';
import { LeadCustomFields } from '@/features/leads/components/LeadCustomFields';
import { createLeadSchema } from '@/features/leads/validations';

interface LeadFormProps {
  initialData?: Partial<Lead>;
  existingLeads?: Lead[];
  configuration?: LeadModuleConfiguration & { isLoading?: boolean };
  onSubmit: (data: Partial<Lead>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const LeadForm = memo(function LeadForm({ initialData, existingLeads = [], configuration, onSubmit, onCancel, isLoading }: LeadFormProps) {
  const config = configuration ?? DEFAULT_LEAD_CONFIGURATION;
  const [formData, setFormData] = useState<Partial<Lead>>({
    customerName: '',
    companyName: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    projectTitle: '',
    projectType: (config.projectTypes[0] ?? 'Factory') as ProjectType,
    structureType: (config.structureTypes[0] ?? 'PEB') as StructureType,
    source: (config.sources[0] ?? 'Website') as LeadSource,
    priority: (config.priorities[1] ?? 'Medium') as LeadPriority,
    status: (config.statuses[0] ?? 'New') as LeadStatus,
    customFields: initialData?.customFields ?? {},
    ...initialData,
  });
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleCustomFieldChange = (key: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      customFields: { ...prev.customFields, [key]: value },
    }));
  };

  const checkDuplicates = (data: Partial<Lead>) => {
    const duplicates = existingLeads.filter((lead) => {
      if (initialData?.id && lead.id === initialData.id) return false;
      const sameMobile = data.mobile && lead.mobile === data.mobile;
      const sameEmail = data.email && lead.email.toLowerCase() === data.email.toLowerCase();
      return sameMobile || sameEmail;
    });

    if (duplicates.length > 0) {
      const match = duplicates[0];
      setDuplicateWarning(
        `Possible duplicate: Lead #${match.leadId} (${match.customerName}) has the same ${data.mobile === match.mobile ? 'mobile' : 'email'}.`
      );
      return true;
    }
    setDuplicateWarning(null);
    return false;
  };

  const validateForm = () => {
    try {
      createLeadSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err: any) {
      const fieldErrors: Record<string, string> = {};
      if (err.errors) {
        err.errors.forEach((e: any) => {
          const path = e.path[0];
          if (path) {
            fieldErrors[path] = e.message;
          }
        });
      }
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    checkDuplicates(formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {duplicateWarning && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{duplicateWarning}</span>
        </div>
      )}
      {/* Customer Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Customer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer Name *</label>
              <Input
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                className={errors.customerName ? 'border-red-500' : ''}
              />
              {errors.customerName && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.customerName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name *</label>
              <Input
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className={errors.companyName ? 'border-red-500' : ''}
              />
              {errors.companyName && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.companyName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile *</label>
              <Input
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                className={errors.mobile ? 'border-red-500' : ''}
              />
              {errors.mobile && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.mobile}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Alternate Mobile</label>
              <Input
                placeholder="Enter alternate mobile"
                value={formData.alternateMobile}
                onChange={(e) => handleInputChange('alternateMobile', e.target.value)}
                className={errors.alternateMobile ? 'border-red-500' : ''}
              />
              {errors.alternateMobile && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.alternateMobile}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">GST Number</label>
              <Input
                placeholder="Enter GST number"
                value={formData.gstNumber}
                onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                className={errors.gstNumber ? 'border-red-500' : ''}
              />
              {errors.gstNumber && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.gstNumber}
                </p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Address *</label>
              <Input
                placeholder="Enter complete address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.address}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">City *</label>
              <Input
                placeholder="Enter city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={errors.city ? 'border-red-500' : ''}
              />
              {errors.city && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.city}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">State *</label>
              <Input
                placeholder="Enter state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className={errors.state ? 'border-red-500' : ''}
              />
              {errors.state && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.state}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pincode</label>
              <Input
                placeholder="Enter pincode"
                value={formData.pincode || ''}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className={errors.pincode ? 'border-red-500' : ''}
              />
              {errors.pincode && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.pincode}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Project Title *</label>
              <Input
                placeholder="Enter project title"
                value={formData.projectTitle}
                onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Type *</label>
              <Select
                value={formData.projectType}
                onValueChange={(value) => handleInputChange('projectType', value as ProjectType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {config.projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Structure Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Structure Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Structure Type *</label>
              <Select
                value={formData.structureType}
                onValueChange={(value) => handleInputChange('structureType', value as StructureType)}
              >
                <SelectTrigger className={errors.structureType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select structure type" />
                </SelectTrigger>
                <SelectContent>
                  {config.structureTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.structureType && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.structureType}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Width (m)</label>
              <Input
                type="number"
                placeholder="Enter width"
                value={formData.width || ''}
                onChange={(e) => handleInputChange('width', parseFloat(e.target.value) || undefined)}
                className={errors.width ? 'border-red-500' : ''}
              />
              {errors.width && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.width}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Length (m)</label>
              <Input
                type="number"
                placeholder="Enter length"
                value={formData.length || ''}
                onChange={(e) => handleInputChange('length', parseFloat(e.target.value) || undefined)}
                className={errors.length ? 'border-red-500' : ''}
              />
              {errors.length && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.length}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Height (m)</label>
              <Input
                type="number"
                placeholder="Enter height"
                value={formData.height || ''}
                onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || undefined)}
                className={errors.height ? 'border-red-500' : ''}
              />
              {errors.height && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.height}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bay Spacing (m)</label>
              <Input
                type="number"
                placeholder="Enter bay spacing"
                value={formData.baySpacing || ''}
                onChange={(e) => handleInputChange('baySpacing', parseFloat(e.target.value) || undefined)}
                className={errors.baySpacing ? 'border-red-500' : ''}
              />
              {errors.baySpacing && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.baySpacing}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Roof Type</label>
              <Select
                value={formData.roofType}
                onValueChange={(value) => handleInputChange('roofType', value as RoofType)}
              >
                <SelectTrigger className={errors.roofType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select roof type" />
                </SelectTrigger>
                <SelectContent>
                  {config.roofTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.roofType && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.roofType}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Wall Type</label>
              <Select
                value={formData.wallType}
                onValueChange={(value) => handleInputChange('wallType', value as WallType)}
              >
                <SelectTrigger className={errors.wallType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select wall type" />
                </SelectTrigger>
                <SelectContent>
                  {config.wallTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.wallType && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.wallType}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Material Preference</label>
              <Select
                value={formData.materialPreference}
                onValueChange={(value) => handleInputChange('materialPreference', value as MaterialPreference)}
              >
                <SelectTrigger className={errors.materialPreference ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  {config.materialPreferences.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.materialPreference && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.materialPreference}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Crane Required</label>
              <Select
                value={formData.craneRequired ? 'true' : 'false'}
                onValueChange={(value) => {
                  const required = value === 'true';
                  handleInputChange('craneRequired', required);
                  if (!required) {
                    handleInputChange('craneCapacity', undefined);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.craneRequired && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Crane Capacity (tons) *</label>
                <Input
                  type="number"
                  placeholder="Enter capacity"
                  value={formData.craneCapacity || ''}
                  onChange={(e) => handleInputChange('craneCapacity', parseFloat(e.target.value) || undefined)}
                  className={errors.craneCapacity ? 'border-red-500' : ''}
                />
                {errors.craneCapacity && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.craneCapacity}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Mezzanine</label>
              <Select
                value={formData.mezzanine ? 'true' : 'false'}
                onValueChange={(value) => {
                  const required = value === 'true';
                  handleInputChange('mezzanine', required);
                  if (!required) {
                    handleInputChange('mezzanineArea', undefined);
                    handleInputChange('mezzanineLoad', undefined);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.mezzanine && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mezzanine Area (sqm) *</label>
                  <Input
                    type="number"
                    placeholder="Enter mezzanine area"
                    value={formData.mezzanineArea || ''}
                    onChange={(e) => handleInputChange('mezzanineArea', parseFloat(e.target.value) || undefined)}
                    className={errors.mezzanineArea ? 'border-red-500' : ''}
                  />
                  {errors.mezzanineArea && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.mezzanineArea}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mezzanine Design Load (kg/sqm) *</label>
                  <Input
                    type="number"
                    placeholder="Enter design load"
                    value={formData.mezzanineLoad || ''}
                    onChange={(e) => handleInputChange('mezzanineLoad', parseFloat(e.target.value) || undefined)}
                    className={errors.mezzanineLoad ? 'border-red-500' : ''}
                  />
                  {errors.mezzanineLoad && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.mezzanineLoad}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Insulation Required</label>
              <Select
                value={formData.insulationRequired ? 'true' : 'false'}
                onValueChange={(value) => {
                  const required = value === 'true';
                  handleInputChange('insulationRequired', required);
                  if (!required) {
                    handleInputChange('insulationType', undefined);
                    handleInputChange('insulationThickness', undefined);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.insulationRequired && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Insulation Type *</label>
                  <Select
                    value={formData.insulationType || ''}
                    onValueChange={(value) => handleInputChange('insulationType', value)}
                  >
                    <SelectTrigger className={errors.insulationType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select insulation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Glasswool">Glasswool</SelectItem>
                      <SelectItem value="Rockwool">Rockwool</SelectItem>
                      <SelectItem value="XLPE">XLPE</SelectItem>
                      <SelectItem value="Bubble Wrap">Bubble Wrap</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.insulationType && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.insulationType}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Insulation Thickness (mm) *</label>
                  <Input
                    type="number"
                    placeholder="Enter thickness"
                    value={formData.insulationThickness || ''}
                    onChange={(e) => handleInputChange('insulationThickness', parseFloat(e.target.value) || undefined)}
                    className={errors.insulationThickness ? 'border-red-500' : ''}
                  />
                  {errors.insulationThickness && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.insulationThickness}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Site Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Site Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Site Location</label>
              <Input
                placeholder="Enter site location"
                value={formData.siteLocation}
                onChange={(e) => handleInputChange('siteLocation', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Map Coordinates</label>
              <Input
                placeholder="Enter coordinates"
                value={formData.mapCoordinates}
                onChange={(e) => handleInputChange('mapCoordinates', e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Site Address</label>
              <Input
                placeholder="Enter site address"
                value={formData.siteAddress}
                onChange={(e) => handleInputChange('siteAddress', e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Soil Notes</label>
              <Input
                placeholder="Enter soil condition notes"
                value={formData.soilNotes}
                onChange={(e) => handleInputChange('soilNotes', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirement Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Requirement Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Customer Notes</label>
            <textarea
              className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter customer notes"
              value={formData.customerNotes}
              onChange={(e) => handleInputChange('customerNotes', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Special Requirement</label>
            <textarea
              className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter special requirements"
              value={formData.specialRequirement}
              onChange={(e) => handleInputChange('specialRequirement', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Attachments</label>
            <div className="border-2 border-dashed border-input rounded-lg p-6 text-center bg-muted/40 cursor-not-allowed">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground/75 mb-1">
                Attachment Upload is Disabled
              </p>
              <p className="text-xs text-muted-foreground/60">
                File upload functionality will be enabled in a future release.
              </p>
              <input type="file" className="hidden" disabled multiple />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Lead Source *</label>
              <Select
                value={formData.source}
                onValueChange={(value) => handleInputChange('source', value as LeadSource)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {config.sources.map((source) => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority *</label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange('priority', value as LeadPriority)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {config.priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Assigned Employee</label>
              <Input
                placeholder="Select employee"
                value={formData.assignedEmployee}
                onChange={(e) => handleInputChange('assignedEmployee', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Next Follow-up Date</label>
              <Input
                type="date"
                value={formData.nextFollowUpDate ? new Date(formData.nextFollowUpDate).toISOString().split('T')[0] : ''}
                onChange={(e) => handleInputChange('nextFollowUpDate', e.target.value ? new Date(e.target.value) : undefined)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Remarks</label>
              <textarea
                className="w-full min-h-[80px] px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Enter remarks"
                value={formData.remarks || ''}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <LeadCustomFields
        mode="form"
        fields={config.customFields ?? []}
        values={formData.customFields}
        onChange={handleCustomFieldChange}
      />

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData?.id ? 'Update Lead' : 'Create Lead'}
        </Button>
      </div>
    </form>
  );
});
