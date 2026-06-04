'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Save,
  ArrowLeft,
  Calculator,
  DollarSign,
  FileText,
  Settings,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { 
  Quotation, 
  Proposal,
  PricingConfiguration,
  MaterialRate,
  AdditionalServiceCost,
  CreateQuotationDto,
} from '../types/peb-commercial';

interface QuotationBuilderProps {
  proposal: Proposal;
  quotation?: Quotation;
  onSave: (quotation: CreateQuotationDto) => void;
  onCancel: () => void;
}

export function QuotationBuilder({
  proposal,
  quotation,
  onSave,
  onCancel,
}: QuotationBuilderProps) {
  // Pricing Configuration
  const [pricingConfiguration, setPricingConfiguration] = useState<PricingConfiguration>(
    quotation?.pricingConfiguration || {
      materialRates: proposal.materialSelections.map(m => ({
        materialSelectionId: m.id,
        rate: m.rate || 0,
        quantity: m.quantity || 0,
        amount: (m.rate || 0) * (m.quantity || 0),
      })),
      labourCost: 0,
      installationCost: 0,
      transportationCost: 0,
      craneCost: 0,
      civilCost: 0,
      accommodationCost: 0,
      erectionCost: 0,
      freightCost: 0,
      additionalServiceCosts: [],
      discountType: 'percentage',
      discountValue: 0,
      gstRate: 18,
      gstType: 'CGST',
      cessRate: 0,
      markupPercentage: 0,
      roundingMethod: 'nearest',
    }
  );
  
  // Validity and Terms
  const [validUntil, setValidUntil] = useState<Date | undefined>(
    quotation?.validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );
  const [paymentTerms, setPaymentTerms] = useState(quotation?.paymentTerms || '50% Advance, 50% on Delivery');
  const [deliveryTerms, setDeliveryTerms] = useState(quotation?.deliveryTerms || '4-6 weeks from order confirmation');
  
  // Calculated Amounts
  const [calculatedAmounts, setCalculatedAmounts] = useState({
    materialCost: 0,
    labourCost: 0,
    installationCost: 0,
    transportationCost: 0,
    craneCost: 0,
    civilCost: 0,
    accommodationCost: 0,
    erectionCost: 0,
    freightCost: 0,
    otherCosts: 0,
    subtotal: 0,
    discountAmount: 0,
    taxAmount: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount: 0,
    cessAmount: 0,
    grandTotal: 0,
  });
  
  // Terms and Notes
  const [termsAndConditions, setTermsAndConditions] = useState(quotation?.termsAndConditions || '');
  const [notes, setNotes] = useState(quotation?.notes || '');
  const [internalNotes, setInternalNotes] = useState(quotation?.internalNotes || '');
  
  // UI State
  const [activeTab, setActiveTab] = useState('pricing');
  
  // Calculate amounts whenever pricing configuration changes
  useEffect(() => {
    calculateAmounts();
  }, [pricingConfiguration]);
  
  const calculateAmounts = () => {
    const materialCost = pricingConfiguration.materialRates.reduce(
      (sum, m) => sum + (m.amount || 0),
      0
    );
    
    const labourCost = pricingConfiguration.labourCost || 0;
    const installationCost = pricingConfiguration.installationCost || 0;
    const transportationCost = pricingConfiguration.transportationCost || 0;
    const craneCost = pricingConfiguration.craneCost || 0;
    const civilCost = pricingConfiguration.civilCost || 0;
    const accommodationCost = pricingConfiguration.accommodationCost || 0;
    const erectionCost = pricingConfiguration.erectionCost || 0;
    const freightCost = pricingConfiguration.freightCost || 0;
    
    const otherCosts = pricingConfiguration.additionalServiceCosts.reduce(
      (sum, s) => sum + (s.cost || 0),
      0
    );
    
    let subtotal = materialCost + labourCost + installationCost + transportationCost + 
                   craneCost + civilCost + accommodationCost + erectionCost + freightCost + otherCosts;
    
    // Apply markup
    if (pricingConfiguration.markupPercentage && pricingConfiguration.markupPercentage > 0) {
      subtotal = subtotal * (1 + pricingConfiguration.markupPercentage / 100);
    }
    
    // Apply discount
    let discountAmount = 0;
    if (pricingConfiguration.discountType === 'percentage' && pricingConfiguration.discountValue) {
      discountAmount = subtotal * (pricingConfiguration.discountValue / 100);
    } else if (pricingConfiguration.discountType === 'fixed' && pricingConfiguration.discountValue) {
      discountAmount = pricingConfiguration.discountValue;
    }
    
    const afterDiscount = subtotal - discountAmount;
    
    // Calculate GST
    let taxAmount = 0;
    let cgstAmount = 0;
    let sgstAmount = 0;
    let igstAmount = 0;
    let cessAmount = 0;
    
    if (pricingConfiguration.gstType === 'CGST' || pricingConfiguration.gstType === 'SGST') {
      const gstRate = pricingConfiguration.gstRate || 0;
      cgstAmount = afterDiscount * (gstRate / 2 / 100);
      sgstAmount = afterDiscount * (gstRate / 2 / 100);
      taxAmount = cgstAmount + sgstAmount;
    } else if (pricingConfiguration.gstType === 'IGST') {
      const gstRate = pricingConfiguration.gstRate || 0;
      igstAmount = afterDiscount * (gstRate / 100);
      taxAmount = igstAmount;
    }
    
    if (pricingConfiguration.cessRate && pricingConfiguration.cessRate > 0) {
      cessAmount = afterDiscount * (pricingConfiguration.cessRate / 100);
      taxAmount += cessAmount;
    }
    
    const grandTotal = afterDiscount + taxAmount;
    
    // Apply rounding
    let roundedTotal = grandTotal;
    if (pricingConfiguration.roundingMethod === 'nearest') {
      roundedTotal = Math.round(grandTotal);
    } else if (pricingConfiguration.roundingMethod === 'up') {
      roundedTotal = Math.ceil(grandTotal);
    } else if (pricingConfiguration.roundingMethod === 'down') {
      roundedTotal = Math.floor(grandTotal);
    }
    
    setCalculatedAmounts({
      materialCost,
      labourCost,
      installationCost,
      transportationCost,
      craneCost,
      civilCost,
      accommodationCost,
      erectionCost,
      freightCost,
      otherCosts,
      subtotal,
      discountAmount,
      taxAmount,
      cgstAmount,
      sgstAmount,
      igstAmount,
      cessAmount,
      grandTotal: roundedTotal,
    });
  };
  
  const updateMaterialRate = (materialSelectionId: string, updates: Partial<MaterialRate>) => {
    setPricingConfiguration({
      ...pricingConfiguration,
      materialRates: pricingConfiguration.materialRates.map(m =>
        m.materialSelectionId === materialSelectionId ? { ...m, ...updates } : m
      ),
    });
  };
  
  const updateServiceCost = (key: keyof PricingConfiguration, value: number) => {
    setPricingConfiguration({ ...pricingConfiguration, [key]: value });
  };
  
  const addAdditionalServiceCost = () => {
    const newCost: AdditionalServiceCost = {
      serviceId: `temp-${Date.now()}`,
      cost: 0,
    };
    setPricingConfiguration({
      ...pricingConfiguration,
      additionalServiceCosts: [...pricingConfiguration.additionalServiceCosts, newCost],
    });
  };
  
  const updateAdditionalServiceCost = (serviceId: string, updates: Partial<AdditionalServiceCost>) => {
    setPricingConfiguration({
      ...pricingConfiguration,
      additionalServiceCosts: pricingConfiguration.additionalServiceCosts.map(s =>
        s.serviceId === serviceId ? { ...s, ...updates } : s
      ),
    });
  };
  
  const removeAdditionalServiceCost = (serviceId: string) => {
    setPricingConfiguration({
      ...pricingConfiguration,
      additionalServiceCosts: pricingConfiguration.additionalServiceCosts.filter(s => s.serviceId !== serviceId),
    });
  };
  
  const handleSave = () => {
    const quotationDto: CreateQuotationDto = {
      proposalId: proposal.id,
      validUntil,
      paymentTerms,
      deliveryTerms,
      pricingConfiguration,
      termsAndConditions,
      notes,
      internalNotes,
    };
    
    onSave(quotationDto);
  };
  
  const amountInWords = (amount: number): string => {
    // Simple implementation - in production, use a proper number-to-words library
    return `Rupees ${amount.toFixed(2)} Only`;
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quotation Builder</h2>
          <p className="text-muted-foreground">
            From Proposal: {proposal.proposalNumber} | Customer: {proposal.customerName}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Quotation
          </Button>
        </div>
      </div>
      
      {/* Inherited Data Summary */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Inherited from Proposal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium">Materials Selected</p>
              <p className="text-muted-foreground">{proposal.materialSelections.length} items</p>
            </div>
            <div>
              <p className="font-medium">Scope Configuration</p>
              <p className="text-muted-foreground">
                {proposal.proposalConfiguration.labourIncluded ? 'Labour' : ''}{' '}
                {proposal.proposalConfiguration.installationIncluded ? 'Installation' : ''}{' '}
                {proposal.proposalConfiguration.transportationIncluded ? 'Transportation' : ''}
              </p>
            </div>
            <div>
              <p className="font-medium">Technical Specs</p>
              <p className="text-muted-foreground">
                {proposal.technicalSpecifications.buildingLength ? `${proposal.technicalSpecifications.buildingLength}m x ${proposal.technicalSpecifications.buildingWidth}m` : 'Not specified'}
              </p>
            </div>
            <div>
              <p className="font-medium">Timeline</p>
              <p className="text-muted-foreground">
                {proposal.timeline?.estimatedDuration} {proposal.timeline?.unit}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="terms">Terms</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Material Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {proposal.materialSelections.map((material) => {
                  const materialRate = pricingConfiguration.materialRates.find(
                    m => m.materialSelectionId === material.id
                  );
                  return (
                    <div key={material.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium">{material.itemName}</p>
                          <p className="text-sm text-muted-foreground">
                            {material.brand} | {material.grade} | {material.specification}
                          </p>
                        </div>
                        <Badge variant="outline">{material.category}</Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <Label className="text-xs">Quantity</Label>
                          <Input
                            type="number"
                            value={materialRate?.quantity || material.quantity || 0}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const qty = parseFloat(e.target.value) || 0;
                              updateMaterialRate(material.id, {
                                quantity: qty,
                                amount: qty * (materialRate?.rate || 0),
                              });
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Rate (₹)</Label>
                          <Input
                            type="number"
                            value={materialRate?.rate || material.rate || 0}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const rate = parseFloat(e.target.value) || 0;
                              updateMaterialRate(material.id, {
                                rate,
                                amount: (materialRate?.quantity || material.quantity || 0) * rate,
                              });
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Amount (₹)</Label>
                          <Input
                            type="number"
                            value={materialRate?.amount || 0}
                            readOnly
                            className="bg-muted"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Unit</Label>
                          <Input value={material.unit || ''} readOnly className="bg-muted" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Service Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Labour Cost (₹)</Label>
                  <Input
                    type="number"
                    value={pricingConfiguration.labourCost || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateServiceCost('labourCost', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Installation Cost (₹)</Label>
                  <Input
                    type="number"
                    value={pricingConfiguration.installationCost || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateServiceCost('installationCost', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Transportation Cost (₹)</Label>
                  <Input
                    type="number"
                    value={pricingConfiguration.transportationCost || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateServiceCost('transportationCost', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Crane Cost (₹)</Label>
                  <Input
                    type="number"
                    value={pricingConfiguration.craneCost || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateServiceCost('craneCost', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Civil Work Cost (₹)</Label>
                  <Input
                    type="number"
                    value={pricingConfiguration.civilCost || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateServiceCost('civilCost', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Accommodation Cost (₹)</Label>
                  <Input
                    type="number"
                    value={pricingConfiguration.accommodationCost || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateServiceCost('accommodationCost', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Erection Cost (₹)</Label>
                  <Input
                    type="number"
                    value={pricingConfiguration.erectionCost || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateServiceCost('erectionCost', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Freight Cost (₹)</Label>
                  <Input
                    type="number"
                    value={pricingConfiguration.freightCost || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateServiceCost('freightCost', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              {/* Additional Services */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold">Additional Services</h4>
                  <Button size="sm" onClick={addAdditionalServiceCost}>
                    Add Service
                  </Button>
                </div>
                <div className="space-y-2">
                  {pricingConfiguration.additionalServiceCosts.map((service) => (
                    <div key={service.serviceId} className="flex gap-2 items-center">
                      <Input
                        placeholder="Service name"
                        value={service.serviceId}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAdditionalServiceCost(service.serviceId, { serviceId: e.target.value })}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        placeholder="Cost"
                        value={service.cost || 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAdditionalServiceCost(service.serviceId, { cost: parseFloat(e.target.value) || 0 })}
                        className="w-32"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAdditionalServiceCost(service.serviceId)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Tax & Discount Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Discount Type</Label>
                  <Select
                    value={pricingConfiguration.discountType}
                    onValueChange={(value) => setPricingConfiguration({ ...pricingConfiguration, discountType: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Discount Value</Label>
                  <Input
                    type="number"
                    value={pricingConfiguration.discountValue || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPricingConfiguration({ ...pricingConfiguration, discountValue: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>GST Type</Label>
                  <Select
                    value={pricingConfiguration.gstType}
                    onValueChange={(value) => setPricingConfiguration({ ...pricingConfiguration, gstType: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CGST">CGST + SGST</SelectItem>
                      <SelectItem value="IGST">IGST</SelectItem>
                      <SelectItem value="CESS">CESS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>GST Rate (%)</Label>
                  <Input
                    type="number"
                    value={pricingConfiguration.gstRate || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPricingConfiguration({ ...pricingConfiguration, gstRate: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Cess Rate (%)</Label>
                  <Input
                    type="number"
                    value={pricingConfiguration.cessRate || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPricingConfiguration({ ...pricingConfiguration, cessRate: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Markup (%)</Label>
                  <Input
                    type="number"
                    value={pricingConfiguration.markupPercentage || 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPricingConfiguration({ ...pricingConfiguration, markupPercentage: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Rounding</Label>
                  <Select
                    value={pricingConfiguration.roundingMethod}
                    onValueChange={(value) => setPricingConfiguration({ ...pricingConfiguration, roundingMethod: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="nearest">Nearest</SelectItem>
                      <SelectItem value="up">Round Up</SelectItem>
                      <SelectItem value="down">Round Down</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Terms Tab */}
        <TabsContent value="terms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Terms & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Valid Until</Label>
                  <Input
                    type="date"
                    value={validUntil ? new Date(validUntil).toISOString().split('T')[0] : ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValidUntil(new Date(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Payment Terms</Label>
                  <Input
                    value={paymentTerms}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentTerms(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Delivery Terms</Label>
                <Input
                  value={deliveryTerms}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeliveryTerms(e.target.value)}
                />
              </div>
              <div>
                <Label>Terms & Conditions</Label>
                <Textarea
                  value={termsAndConditions}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTermsAndConditions(e.target.value)}
                  rows={6}
                  placeholder="Enter terms and conditions..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5" />
                Commercial Summary
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                System calculated amounts - No manual calculations required
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Material Cost</span>
                  <span className="font-medium">₹{calculatedAmounts.materialCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Labour Cost</span>
                  <span className="font-medium">₹{calculatedAmounts.labourCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Installation Cost</span>
                  <span className="font-medium">₹{calculatedAmounts.installationCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transportation Cost</span>
                  <span className="font-medium">₹{calculatedAmounts.transportationCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Crane Cost</span>
                  <span className="font-medium">₹{calculatedAmounts.craneCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Civil Work Cost</span>
                  <span className="font-medium">₹{calculatedAmounts.civilCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accommodation Cost</span>
                  <span className="font-medium">₹{calculatedAmounts.accommodationCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Erection Cost</span>
                  <span className="font-medium">₹{calculatedAmounts.erectionCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Freight Cost</span>
                  <span className="font-medium">₹{calculatedAmounts.freightCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Costs</span>
                  <span className="font-medium">₹{calculatedAmounts.otherCosts.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>₹{calculatedAmounts.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Discount</span>
                  <span>- ₹{calculatedAmounts.discountAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>CGST</span>
                  <span>₹{calculatedAmounts.cgstAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST</span>
                  <span>₹{calculatedAmounts.sgstAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>IGST</span>
                  <span>₹{calculatedAmounts.igstAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>CESS</span>
                  <span>₹{calculatedAmounts.cessAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Tax</span>
                  <span>₹{calculatedAmounts.taxAmount.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-xl font-bold">
                  <span>Grand Total</span>
                  <span>₹{calculatedAmounts.grandTotal.toLocaleString()}</span>
                </div>
                <div className="text-sm text-muted-foreground italic">
                  {amountInWords(calculatedAmounts.grandTotal)}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Customer Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Notes visible to customer..."
                />
              </div>
              <div>
                <Label>Internal Notes</Label>
                <Textarea
                  value={internalNotes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInternalNotes(e.target.value)}
                  rows={4}
                  placeholder="Internal notes only visible to team..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
