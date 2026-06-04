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
import { Document, DocumentType, CreateDocumentDto, UpdateDocumentDto } from '../types';
import { DOCUMENT_TYPES, GST_TYPES, PAYMENT_TERMS, DELIVERY_TERMS, VALID_DAYS_OPTIONS } from '../constants';
import { X, Plus, Trash2, Upload } from 'lucide-react';

interface DocumentFormProps {
  initialData?: Partial<Document>;
  documentType: DocumentType;
  onSubmit: (data: CreateDocumentDto | UpdateDocumentDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DocumentForm({ initialData, documentType, onSubmit, onCancel, isLoading }: DocumentFormProps) {
  const [formData, setFormData] = useState<Partial<Document>>({
    documentType,
    customerId: '',
    leadId: '',
    projectId: '',
    subtotal: 0,
    taxAmount: 0,
    totalAmount: 0,
    discountAmount: 0,
    discountPercentage: 0,
    gstType: 'CGST',
    validUntil: undefined,
    paymentTerms: '30% Advance + 70% Before Delivery',
    deliveryTerms: 'Ex-Works',
    notes: '',
    termsAndConditions: '',
    lineItems: [],
    templateId: '',
    ...initialData,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addLineItem = () => {
    setFormData((prev) => ({
      ...prev,
      lineItems: [
        ...(prev.lineItems || []),
        {
          id: String(Date.now()),
          description: '',
          quantity: 1,
          unit: '',
          rate: 0,
          amount: 0,
          taxRate: 18,
          taxAmount: 0,
        },
      ],
    }));
  };

  const removeLineItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      lineItems: prev.lineItems?.filter((_, i) => i !== index) || [],
    }));
  };

  const updateLineItem = (index: number, field: string, value: any) => {
    const updatedItems = [...(formData.lineItems || [])];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Recalculate amount
    if (field === 'quantity' || field === 'rate') {
      const item = updatedItems[index];
      item.amount = (item.quantity || 0) * (item.rate || 0);
      item.taxAmount = item.amount * ((item.taxRate || 0) / 100);
    }
    
    setFormData((prev) => ({ ...prev, lineItems: updatedItems }));
  };

  const calculateTotals = () => {
    const subtotal = (formData.lineItems || []).reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalTax = (formData.lineItems || []).reduce((sum, item) => sum + (item.taxAmount || 0), 0);
    const discount = formData.discountPercentage 
      ? subtotal * (formData.discountPercentage / 100)
      : formData.discountAmount || 0;
    const total = subtotal + totalTax - discount;

    setFormData((prev) => ({
      ...prev,
      subtotal,
      taxAmount: totalTax,
      totalAmount: total,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateTotals();
    
    const data: CreateDocumentDto | UpdateDocumentDto = {
      documentType: formData.documentType!,
      customerId: formData.customerId!,
      leadId: formData.leadId,
      projectId: formData.projectId,
      subtotal: formData.subtotal!,
      taxAmount: formData.taxAmount!,
      totalAmount: formData.totalAmount!,
      discountAmount: formData.discountAmount,
      discountPercentage: formData.discountPercentage,
      gstType: formData.gstType!,
      validUntil: formData.validUntil,
      paymentTerms: formData.paymentTerms!,
      deliveryTerms: formData.deliveryTerms,
      notes: formData.notes,
      termsAndConditions: formData.termsAndConditions,
      lineItems: formData.lineItems || [],
      templateId: formData.templateId,
    };
    
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer & Project */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Customer & Project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer *</label>
              <Select
                value={formData.customerId}
                onValueChange={(value) => handleInputChange('customerId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CUST-001">Acme Corporation</SelectItem>
                  <SelectItem value="CUST-002">Tech Solutions Ltd</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Lead</label>
              <Select
                value={formData.leadId}
                onValueChange={(value) => handleInputChange('leadId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select lead (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LEAD-001">LD-001 - Warehouse Project</SelectItem>
                  <SelectItem value="LEAD-002">LD-002 - Industrial Shed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Project</label>
              <Select
                value={formData.projectId}
                onValueChange={(value) => handleInputChange('projectId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PROJ-001">PROJ-001 - Warehouse Construction</SelectItem>
                  <SelectItem value="PROJ-002">PROJ-002 - Industrial Shed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            Line Items
            <Badge variant="secondary">{formData.lineItems?.length || 0} items</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(formData.lineItems || []).map((item, index) => (
            <div key={item.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Item {index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => removeLineItem(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Description *</label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                    placeholder="Enter item description"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity *</label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Unit *</label>
                  <Input
                    value={item.unit}
                    onChange={(e) => updateLineItem(index, 'unit', e.target.value)}
                    placeholder="e.g., MT, Nos, Sqft"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rate (₹) *</label>
                  <Input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tax %</label>
                  <Input
                    type="number"
                    value={item.taxRate}
                    onChange={(e) => updateLineItem(index, 'taxRate', parseFloat(e.target.value) || 0)}
                    placeholder="18"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Amount: ₹{item.amount.toFixed(2)}</span>
                    <span className="text-gray-600">Tax: ₹{(item.taxAmount || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addLineItem}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Line Item
          </Button>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pricing & Tax</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subtotal</label>
              <Input
                type="number"
                value={formData.subtotal}
                onChange={(e) => handleInputChange('subtotal', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">GST Type</label>
              <Select
                value={formData.gstType}
                onValueChange={(value) => handleInputChange('gstType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GST_TYPES.map((gst) => (
                    <SelectItem key={gst.value} value={gst.value}>
                      {gst.label} ({gst.rate}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tax Amount</label>
              <Input
                type="number"
                value={formData.taxAmount}
                onChange={(e) => handleInputChange('taxAmount', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Discount %</label>
              <Input
                type="number"
                value={formData.discountPercentage}
                onChange={(e) => handleInputChange('discountPercentage', parseFloat(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Discount Amount</label>
              <Input
                type="number"
                value={formData.discountAmount}
                onChange={(e) => handleInputChange('discountAmount', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Total Amount</label>
              <Input
                type="number"
                value={formData.totalAmount}
                onChange={(e) => handleInputChange('totalAmount', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                readOnly
                className="bg-gray-50 font-semibold"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Terms *</label>
              <Select
                value={formData.paymentTerms}
                onValueChange={(value) => handleInputChange('paymentTerms', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_TERMS.map((term) => (
                    <SelectItem key={term.value} value={term.value}>
                      {term.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Delivery Terms</label>
              <Select
                value={formData.deliveryTerms}
                onValueChange={(value) => handleInputChange('deliveryTerms', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DELIVERY_TERMS.map((term) => (
                    <SelectItem key={term.value} value={term.value}>
                      {term.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Valid Until</label>
              <Input
                type="date"
                value={formData.validUntil ? formData.validUntil.toISOString().split('T')[0] : ''}
                onChange={(e) => handleInputChange('validUntil', new Date(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Template</label>
              <Select
                value={formData.templateId}
                onValueChange={(value) => handleInputChange('templateId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TPL-001">Standard Estimate</SelectItem>
                  <SelectItem value="TPL-002">Detailed Proposal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <textarea
              className="w-full min-h-[80px] px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Terms and Conditions</label>
            <textarea
              className="w-full min-h-[120px] px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter terms and conditions"
              value={formData.termsAndConditions}
              onChange={(e) => handleInputChange('termsAndConditions', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData?.id ? 'Update Document' : 'Create Document'}
        </Button>
      </div>
    </form>
  );
}
