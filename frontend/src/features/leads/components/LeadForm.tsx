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
import { X, Upload } from 'lucide-react';

interface LeadFormProps {
  initialData?: Partial<Lead>;
  onSubmit: (data: Partial<Lead>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function LeadForm({ initialData, onSubmit, onCancel, isLoading }: LeadFormProps) {
  const [formData, setFormData] = useState<Partial<Lead>>({
    customerName: '',
    companyName: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    projectTitle: '',
    projectType: 'Factory' as ProjectType,
    structureType: 'PEB' as StructureType,
    source: 'Website' as LeadSource,
    priority: 'Medium' as LeadPriority,
    status: 'New' as LeadStatus,
    ...initialData,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name *</label>
              <Input
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile *</label>
              <Input
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Alternate Mobile</label>
              <Input
                placeholder="Enter alternate mobile"
                value={formData.alternateMobile}
                onChange={(e) => handleInputChange('alternateMobile', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">GST Number</label>
              <Input
                placeholder="Enter GST number"
                value={formData.gstNumber}
                onChange={(e) => handleInputChange('gstNumber', e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Address *</label>
              <Input
                placeholder="Enter complete address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">City *</label>
              <Input
                placeholder="Enter city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">State *</label>
              <Input
                placeholder="Enter state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                required
              />
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
                  <SelectItem value="Factory">Factory</SelectItem>
                  <SelectItem value="Warehouse">Warehouse</SelectItem>
                  <SelectItem value="Industrial Shed">Industrial Shed</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
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
                <SelectTrigger>
                  <SelectValue placeholder="Select structure type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PEB">PEB</SelectItem>
                  <SelectItem value="Steel Structure">Steel Structure</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Width (m)</label>
              <Input
                type="number"
                placeholder="Enter width"
                value={formData.width || ''}
                onChange={(e) => handleInputChange('width', parseFloat(e.target.value) || undefined)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Length (m)</label>
              <Input
                type="number"
                placeholder="Enter length"
                value={formData.length || ''}
                onChange={(e) => handleInputChange('length', parseFloat(e.target.value) || undefined)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Height (m)</label>
              <Input
                type="number"
                placeholder="Enter height"
                value={formData.height || ''}
                onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || undefined)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bay Spacing (m)</label>
              <Input
                type="number"
                placeholder="Enter bay spacing"
                value={formData.baySpacing || ''}
                onChange={(e) => handleInputChange('baySpacing', parseFloat(e.target.value) || undefined)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Roof Type</label>
              <Select
                value={formData.roofType}
                onValueChange={(value) => handleInputChange('roofType', value as RoofType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select roof type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Metal Sheet">Metal Sheet</SelectItem>
                  <SelectItem value="Deck Sheet">Deck Sheet</SelectItem>
                  <SelectItem value="Sandwich Panel">Sandwich Panel</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Crane Required</label>
              <Select
                value={formData.craneRequired ? 'true' : 'false'}
                onValueChange={(value) => handleInputChange('craneRequired', value === 'true')}
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Crane Capacity (tons)</label>
              <Input
                type="number"
                placeholder="Enter capacity"
                value={formData.craneCapacity || ''}
                onChange={(e) => handleInputChange('craneCapacity', parseFloat(e.target.value) || undefined)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mezzanine</label>
              <Select
                value={formData.mezzanine ? 'true' : 'false'}
                onValueChange={(value) => handleInputChange('mezzanine', value === 'true')}
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Wall Type</label>
              <Select
                value={formData.wallType}
                onValueChange={(value) => handleInputChange('wallType', value as WallType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select wall type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Metal Sheet">Metal Sheet</SelectItem>
                  <SelectItem value="Brick Wall">Brick Wall</SelectItem>
                  <SelectItem value="Sandwich Panel">Sandwich Panel</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Insulation Required</label>
              <Select
                value={formData.insulationRequired ? 'true' : 'false'}
                onValueChange={(value) => handleInputChange('insulationRequired', value === 'true')}
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Material Preference</label>
              <Select
                value={formData.materialPreference}
                onValueChange={(value) => handleInputChange('materialPreference', value as MaterialPreference)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Economy">Economy</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            <div className="border-2 border-dashed border-input rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                Accepts PDF, Images, Documents (Max 10MB)
              </p>
              <input type="file" className="hidden" multiple />
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
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Cold Call">Cold Call</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="Trade Show">Trade Show</SelectItem>
                  <SelectItem value="Advertisement">Advertisement</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
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
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
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
                value={formData.nextFollowUpDate ? formData.nextFollowUpDate.toISOString().split('T')[0] : ''}
                onChange={(e) => handleInputChange('nextFollowUpDate', new Date(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

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
}
