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
import { Customer } from '@/features/customers/types';
import { INDUSTRIES, BUSINESS_TYPES, CUSTOMER_SOURCES, CUSTOMER_STATUSES } from '@/features/customers/constants';
import { X } from 'lucide-react';

interface CustomerFormProps {
  initialData?: Partial<Customer>;
  onSubmit: (data: Partial<Customer>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CustomerForm({ initialData, onSubmit, onCancel, isLoading }: CustomerFormProps) {
  const [formData, setFormData] = useState<Partial<Customer>>({
    customerName: '',
    companyName: '',
    mobile: '',
    alternateMobile: '',
    email: '',
    gstNumber: '',
    panNumber: '',
    industry: 'Manufacturing',
    businessType: 'Pvt Ltd',
    website: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    leadSource: 'Website',
    status: 'Prospect',
    notes: '',
    ...initialData,
  });

  const handleChange = (field: keyof Customer, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section 1: Customer Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer Name *</label>
              <Input
                value={formData.customerName || ''}
                onChange={(e) => handleChange('customerName', e.target.value)}
                placeholder="Enter customer name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name *</label>
              <Input
                value={formData.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile *</label>
              <Input
                value={formData.mobile || ''}
                onChange={(e) => handleChange('mobile', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Alternate Mobile</label>
              <Input
                value={formData.alternateMobile || ''}
                onChange={(e) => handleChange('alternateMobile', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Business Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">GST Number</label>
              <Input
                value={formData.gstNumber || ''}
                onChange={(e) => handleChange('gstNumber', e.target.value)}
                placeholder="22AAAAA0000A1Z5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">PAN Number</label>
              <Input
                value={formData.panNumber || ''}
                onChange={(e) => handleChange('panNumber', e.target.value)}
                placeholder="AAAAA0000A"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry *</label>
              <Select
                value={formData.industry}
                onValueChange={(v) => handleChange('industry', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind.value} value={ind.value}>
                      {ind.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Type *</label>
              <Select
                value={formData.businessType}
                onValueChange={(v) => handleChange('businessType', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_TYPES.map((bt) => (
                    <SelectItem key={bt.value} value={bt.value}>
                      {bt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Website</label>
              <Input
                value={formData.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://www.example.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Address Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Address Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Address *</label>
              <Input
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Enter full address"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">City *</label>
              <Input
                value={formData.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="Enter city"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">State *</label>
              <Input
                value={formData.state || ''}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="Enter state"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Input
                value={formData.country || ''}
                onChange={(e) => handleChange('country', e.target.value)}
                placeholder="Enter country"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pincode</label>
              <Input
                value={formData.pincode || ''}
                onChange={(e) => handleChange('pincode', e.target.value)}
                placeholder="6-digit pincode"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Additional Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Lead Source *</label>
              <Select
                value={formData.leadSource}
                onValueChange={(v) => handleChange('leadSource', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CUSTOMER_SOURCES.map((src) => (
                    <SelectItem key={src.value} value={src.value}>
                      {src.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={formData.status}
                onValueChange={(v) => handleChange('status', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CUSTOMER_STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Additional notes about the customer..."
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                rows={3}
              />
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
          {isLoading ? 'Saving...' : initialData?.id ? 'Update Customer' : 'Create Customer'}
        </Button>
      </div>
    </form>
  );
}
