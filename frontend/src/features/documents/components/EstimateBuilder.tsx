'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Search,
  Save,
  X,
  Info,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { 
  Estimate, 
  MaterialSelection, 
  ScopeConfiguration, 
  TechnicalSpecifications,
  CommercialItemConfig,
  DEFAULT_COMMERICAL_CONFIGS,
  CreateEstimateDto,
} from '../types/peb-commercial';
import { 
  PEBInventoryItem, 
  PEBMaterialCategory, 
  MaterialSelectionOptions,
  MaterialSelectionFilter,
} from '../../inventory/types/peb-inventory';

interface EstimateBuilderProps {
  estimate?: Estimate;
  onSave: (estimate: CreateEstimateDto) => void;
  onCancel: () => void;
  customerId: string;
  customerName: string;
  leadId?: string;
  projectId?: string;
}

export function EstimateBuilder({
  estimate,
  onSave,
  onCancel,
  customerId,
  customerName,
  leadId,
  projectId,
}: EstimateBuilderProps) {
  // Material Selection State
  const [materialSelections, setMaterialSelections] = useState<MaterialSelection[]>(
    estimate?.materialSelections || []
  );
  const [selectedCategory, setSelectedCategory] = useState<PEBMaterialCategory | ''>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [availableMaterials, setAvailableMaterials] = useState<PEBInventoryItem[]>([]);
  const [materialOptions, setMaterialOptions] = useState<MaterialSelectionOptions | null>(null);
  
  // Scope Configuration State
  const [scopeConfiguration, setScopeConfiguration] = useState<ScopeConfiguration>(
    estimate?.scopeConfiguration || {
      labour: DEFAULT_COMMERICAL_CONFIGS.labour,
      installation: DEFAULT_COMMERICAL_CONFIGS.installation,
      transportation: DEFAULT_COMMERICAL_CONFIGS.transportation,
      crane: DEFAULT_COMMERICAL_CONFIGS.crane,
      civilWork: DEFAULT_COMMERICAL_CONFIGS.civil_work,
      accommodation: DEFAULT_COMMERICAL_CONFIGS.accommodation,
      erection: DEFAULT_COMMERICAL_CONFIGS.erection,
      freight: DEFAULT_COMMERICAL_CONFIGS.freight,
      additionalServices: [],
    }
  );
  
  // Technical Specifications State
  const [technicalSpecs, setTechnicalSpecs] = useState<TechnicalSpecifications>(
    estimate?.technicalSpecifications || {}
  );
  
  // Inclusions/Exclusions State
  const [inclusions, setInclusions] = useState<string[]>(estimate?.inclusions || []);
  const [exclusions, setExclusions] = useState<string[]>(estimate?.exclusions || []);
  const [newInclusion, setNewInclusion] = useState('');
  const [newExclusion, setNewExclusion] = useState('');
  
  // Options
  const [includePricing, setIncludePricing] = useState(estimate?.includePricing || false);
  const [notes, setNotes] = useState(estimate?.notes || '');
  const [internalNotes, setInternalNotes] = useState(estimate?.internalNotes || '');
  
  // UI State
  const [activeTab, setActiveTab] = useState('materials');
  const [expandedMaterials, setExpandedMaterials] = useState<Set<string>>(new Set());
  
  // Load available materials when category changes
  useEffect(() => {
    if (selectedCategory) {
      loadMaterialsForCategory(selectedCategory);
    }
  }, [selectedCategory]);
  
  const loadMaterialsForCategory = async (category: PEBMaterialCategory) => {
    // TODO: Call API to get materials for category
    // For now, using mock data
    const mockMaterials: PEBInventoryItem[] = [];
    setAvailableMaterials(mockMaterials);
    
    // TODO: Call API to get material options (brands, grades, etc.)
    const mockOptions: MaterialSelectionOptions = {
      category,
      subCategories: [],
      brands: [],
      grades: [],
      specifications: [],
      variants: [],
    };
    setMaterialOptions(mockOptions);
  };
  
  const addMaterialSelection = (material: PEBInventoryItem) => {
    const newSelection: MaterialSelection = {
      id: `temp-${Date.now()}`,
      inventoryItemId: material.id,
      itemCode: material.itemCode,
      itemName: material.itemName,
      category: material.category,
      subCategory: material.subCategory,
      brand: material.brand,
      grade: material.grade,
      specification: material.specification,
      variant: material.variant,
      thickness: material.thickness,
      color: material.color,
      coating: material.coating,
      config: {
        state: 'Included',
        requirement: 'Required',
        chargeability: includePricing ? 'Chargeable' : 'Non-Chargeable',
        visibility: 'Visible',
      },
      quantity: 1,
      unit: material.unit,
      rate: includePricing ? material.sellingRate : undefined,
      amount: includePricing ? material.sellingRate : undefined,
    };
    
    setMaterialSelections([...materialSelections, newSelection]);
    setExpandedMaterials(new Set([...expandedMaterials, newSelection.id]));
  };
  
  const removeMaterialSelection = (id: string) => {
    setMaterialSelections(materialSelections.filter(m => m.id !== id));
    setExpandedMaterials(new Set([...expandedMaterials].filter(x => x !== id)));
  };
  
  const updateMaterialSelection = (id: string, updates: Partial<MaterialSelection>) => {
    setMaterialSelections(
      materialSelections.map(m => 
        m.id === id ? { ...m, ...updates } : m
      )
    );
  };
  
  const updateMaterialConfig = (id: string, config: Partial<CommercialItemConfig>) => {
    setMaterialSelections(
      materialSelections.map(m => 
        m.id === id ? { ...m, config: { ...m.config, ...config } } : m
      )
    );
  };
  
  const updateScopeConfig = (key: keyof ScopeConfiguration, config: CommercialItemConfig) => {
    setScopeConfiguration({ ...scopeConfiguration, [key]: config });
  };
  
  const addInclusion = () => {
    if (newInclusion.trim()) {
      setInclusions([...inclusions, newInclusion.trim()]);
      setNewInclusion('');
    }
  };
  
  const removeInclusion = (index: number) => {
    setInclusions(inclusions.filter((_, i) => i !== index));
  };
  
  const addExclusion = () => {
    if (newExclusion.trim()) {
      setExclusions([...exclusions, newExclusion.trim()]);
      setNewExclusion('');
    }
  };
  
  const removeExclusion = (index: number) => {
    setExclusions(exclusions.filter((_, i) => i !== index));
  };
  
  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedMaterials);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedMaterials(newExpanded);
  };
  
  const handleSave = () => {
    const estimateDto: CreateEstimateDto = {
      customerId,
      leadId,
      projectId,
      includePricing,
      materialSelections,
      scopeConfiguration,
      technicalSpecifications: technicalSpecs,
      inclusions,
      exclusions,
      notes,
      internalNotes,
    };
    
    onSave(estimateDto);
  };
  
  const calculateTotal = () => {
    if (!includePricing) return 0;
    return materialSelections.reduce((sum, m) => sum + (m.amount || 0), 0);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Estimate Builder</h2>
          <p className="text-muted-foreground">
            Customer: {customerName} | {includePricing ? 'With Pricing' : 'Material Selection Only'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Estimate
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="scope">Scope</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="inclusions">Inclusions/Exclusions</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Material Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Material Selection Controls */}
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label>Category</Label>
                  <Select value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as PEBMaterialCategory)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Primary Structural Steel">Primary Structural Steel</SelectItem>
                      <SelectItem value="Secondary Structural Steel">Secondary Structural Steel</SelectItem>
                      <SelectItem value="Roofing Sheets">Roofing Sheets</SelectItem>
                      <SelectItem value="Wall Sheets">Wall Sheets</SelectItem>
                      <SelectItem value="Insulation">Insulation</SelectItem>
                      <SelectItem value="Fasteners">Fasteners</SelectItem>
                      <SelectItem value="Paint">Paint</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Gutters">Gutters</SelectItem>
                      <SelectItem value="Downspouts">Downspouts</SelectItem>
                      <SelectItem value="Skylights">Skylights</SelectItem>
                      <SelectItem value="Ridge Ventilators">Ridge Ventilators</SelectItem>
                      <SelectItem value="Flashings">Flashings</SelectItem>
                      <SelectItem value="Doors">Doors</SelectItem>
                      <SelectItem value="Windows">Windows</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search materials..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              {/* Available Materials */}
              {selectedCategory && (
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Available Materials</h4>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {availableMaterials.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No materials found for this category</p>
                    ) : (
                      availableMaterials.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                          onClick={() => addMaterialSelection(material)}
                        >
                          <div>
                            <p className="font-medium">{material.itemName}</p>
                            <p className="text-sm text-muted-foreground">
                              {material.brand} | {material.grade} | {material.specification}
                            </p>
                          </div>
                          <Plus className="h-4 w-4" />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
              
              {/* Selected Materials */}
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3">
                  Selected Materials ({materialSelections.length})
                </h4>
                {materialSelections.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No materials selected</p>
                ) : (
                  <div className="space-y-3">
                    {materialSelections.map((selection) => (
                      <div key={selection.id} className="border rounded-lg p-4">
                        {/* Material Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpand(selection.id)}
                            >
                              {expandedMaterials.has(selection.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                            <div>
                              <p className="font-medium">{selection.itemName}</p>
                              <p className="text-sm text-muted-foreground">
                                {selection.brand} | {selection.grade} | {selection.specification}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={selection.config.state === 'Included' ? 'default' : 'secondary'}>
                              {selection.config.state}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMaterialSelection(selection.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Expanded Details */}
                        {expandedMaterials.has(selection.id) && (
                          <div className="mt-4 space-y-4">
                            {/* Commercial Configuration */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                <Label className="text-xs">State</Label>
                                <Select
                                  value={selection.config.state}
                                  onValueChange={(v) => updateMaterialConfig(selection.id, { state: v as any })}
                                >
                                  <SelectTrigger className="h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Included">Included</SelectItem>
                                    <SelectItem value="Excluded">Excluded</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-xs">Requirement</Label>
                                <Select
                                  value={selection.config.requirement}
                                  onValueChange={(v) => updateMaterialConfig(selection.id, { requirement: v as any })}
                                >
                                  <SelectTrigger className="h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Required">Required</SelectItem>
                                    <SelectItem value="Optional">Optional</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-xs">Chargeability</Label>
                                <Select
                                  value={selection.config.chargeability}
                                  onValueChange={(v) => updateMaterialConfig(selection.id, { chargeability: v as any })}
                                >
                                  <SelectTrigger className="h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Chargeable">Chargeable</SelectItem>
                                    <SelectItem value="Non-Chargeable">Non-Chargeable</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-xs">Visibility</Label>
                                <Select
                                  value={selection.config.visibility}
                                  onValueChange={(v) => updateMaterialConfig(selection.id, { visibility: v as any })}
                                >
                                  <SelectTrigger className="h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Visible">Visible</SelectItem>
                                    <SelectItem value="Hidden">Hidden</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            {/* Quantity and Unit */}
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label className="text-xs">Quantity</Label>
                                <Input
                                  type="number"
                                  value={selection.quantity || 0}
                                  onChange={(e) => updateMaterialSelection(selection.id, { 
                                    quantity: parseFloat(e.target.value) || 0,
                                    amount: includePricing ? (parseFloat(e.target.value) || 0) * (selection.rate || 0) : undefined
                                  })}
                                  className="h-8"
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Unit</Label>
                                <Input
                                  value={selection.unit || ''}
                                  onChange={(e) => updateMaterialSelection(selection.id, { unit: e.target.value })}
                                  className="h-8"
                                />
                              </div>
                              {includePricing && (
                                <div>
                                  <Label className="text-xs">Rate</Label>
                                  <Input
                                    type="number"
                                    value={selection.rate || 0}
                                    onChange={(e) => updateMaterialSelection(selection.id, { 
                                      rate: parseFloat(e.target.value) || 0,
                                      amount: (selection.quantity || 0) * (parseFloat(e.target.value) || 0)
                                    })}
                                    className="h-8"
                                  />
                                </div>
                              )}
                            </div>
                            
                            {/* Notes */}
                            <div>
                              <Label className="text-xs">Notes</Label>
                              <Input
                                value={selection.config.notes || ''}
                                onChange={(e) => updateMaterialConfig(selection.id, { notes: e.target.value })}
                                className="h-8"
                                placeholder="Add notes..."
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Pricing Toggle */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="includePricing"
                  checked={includePricing}
                  onCheckedChange={(checked: boolean) => setIncludePricing(checked)}
                />
                <Label htmlFor="includePricing">Include Pricing (Optional)</Label>
              </div>
              
              {includePricing && (
                <div className="text-right">
                  <p className="text-lg font-semibold">Total: ₹{calculateTotal().toLocaleString()}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Scope Tab */}
        <TabsContent value="scope" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Scope Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScopeConfigRow
                label="Labour"
                config={scopeConfiguration.labour}
                onChange={(config) => updateScopeConfig('labour', config)}
              />
              <ScopeConfigRow
                label="Installation"
                config={scopeConfiguration.installation}
                onChange={(config) => updateScopeConfig('installation', config)}
              />
              <ScopeConfigRow
                label="Transportation"
                config={scopeConfiguration.transportation}
                onChange={(config) => updateScopeConfig('transportation', config)}
              />
              <ScopeConfigRow
                label="Crane"
                config={scopeConfiguration.crane}
                onChange={(config) => updateScopeConfig('crane', config)}
              />
              <ScopeConfigRow
                label="Civil Work"
                config={scopeConfiguration.civilWork}
                onChange={(config) => updateScopeConfig('civilWork', config)}
              />
              <ScopeConfigRow
                label="Accommodation"
                config={scopeConfiguration.accommodation}
                onChange={(config) => updateScopeConfig('accommodation', config)}
              />
              <ScopeConfigRow
                label="Erection"
                config={scopeConfiguration.erection}
                onChange={(config) => updateScopeConfig('erection', config)}
              />
              <ScopeConfigRow
                label="Freight"
                config={scopeConfiguration.freight}
                onChange={(config) => updateScopeConfig('freight', config)}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Technical Tab */}
        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Building Length (m)</Label>
                  <Input
                    type="number"
                    value={technicalSpecs.buildingLength || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, buildingLength: parseFloat(e.target.value) || undefined })}
                  />
                </div>
                <div>
                  <Label>Building Width (m)</Label>
                  <Input
                    type="number"
                    value={technicalSpecs.buildingWidth || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, buildingWidth: parseFloat(e.target.value) || undefined })}
                  />
                </div>
                <div>
                  <Label>Building Height (m)</Label>
                  <Input
                    type="number"
                    value={technicalSpecs.buildingHeight || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, buildingHeight: parseFloat(e.target.value) || undefined })}
                  />
                </div>
                <div>
                  <Label>Building Area (sqm)</Label>
                  <Input
                    type="number"
                    value={technicalSpecs.buildingArea || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, buildingArea: parseFloat(e.target.value) || undefined })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Bay Spacing (m)</Label>
                  <Input
                    type="number"
                    value={technicalSpecs.baySpacing || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, baySpacing: parseFloat(e.target.value) || undefined })}
                  />
                </div>
                <div>
                  <Label>Roof Slope (deg)</Label>
                  <Input
                    type="number"
                    value={technicalSpecs.roofSlope || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, roofSlope: parseFloat(e.target.value) || undefined })}
                  />
                </div>
                <div>
                  <Label>Wind Load</Label>
                  <Input
                    type="number"
                    value={technicalSpecs.windLoad || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, windLoad: parseFloat(e.target.value) || undefined })}
                  />
                </div>
                <div>
                  <Label>Seismic Zone</Label>
                  <Input
                    value={technicalSpecs.seismicZone || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, seismicZone: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Roof Cladding</Label>
                  <Input
                    value={technicalSpecs.roofCladding || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, roofCladding: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Wall Cladding</Label>
                  <Input
                    value={technicalSpecs.wallCladding || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, wallCladding: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Insulation Type</Label>
                  <Input
                    value={technicalSpecs.insulationType || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, insulationType: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Insulation Thickness (mm)</Label>
                  <Input
                    type="number"
                    value={technicalSpecs.insulationThickness || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, insulationThickness: parseFloat(e.target.value) || undefined })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Overhead Doors</Label>
                  <Input
                    type="number"
                    value={technicalSpecs.overheadDoors || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, overheadDoors: parseInt(e.target.value) || undefined })}
                  />
                </div>
                <div>
                  <Label>Walk Doors</Label>
                  <Input
                    type="number"
                    value={technicalSpecs.walkDoors || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, walkDoors: parseInt(e.target.value) || undefined })}
                  />
                </div>
                <div>
                  <Label>Windows</Label>
                  <Input
                    type="number"
                    value={technicalSpecs.windows || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, windows: parseInt(e.target.value) || undefined })}
                  />
                </div>
                <div>
                  <Label>Skylights</Label>
                  <Input
                    type="number"
                    value={technicalSpecs.skylights || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, skylights: parseInt(e.target.value) || undefined })}
                  />
                </div>
              </div>
              
              <div>
                <Label>Foundation Type</Label>
                <Input
                  value={technicalSpecs.foundationType || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnicalSpecs({ ...technicalSpecs, foundationType: e.target.value })}
                />
              </div>
              
              <div>
                <Label>Technical Notes</Label>
                <Textarea
                  value={technicalSpecs.notes || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTechnicalSpecs({ ...technicalSpecs, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Inclusions/Exclusions Tab */}
        <TabsContent value="inclusions" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inclusions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add inclusion..."
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addInclusion()}
                  />
                  <Button onClick={addInclusion} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {inclusions.map((inclusion, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">{inclusion}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeInclusion(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exclusions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add exclusion..."
                    value={newExclusion}
                    onChange={(e) => setNewExclusion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addExclusion()}
                  />
                  <Button onClick={addExclusion} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {exclusions.map((exclusion, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm">{exclusion}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExclusion(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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

// Helper Component for Scope Configuration Row
interface ScopeConfigRowProps {
  label: string;
  config: CommercialItemConfig;
  onChange: (config: CommercialItemConfig) => void;
}

function ScopeConfigRow({ label, config, onChange }: ScopeConfigRowProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center p-3 border rounded-lg">
      <div className="font-medium">{label}</div>
      <div>
        <Select value={config.state} onValueChange={(v) => onChange({ ...config, state: v as any })}>
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Included">Included</SelectItem>
            <SelectItem value="Excluded">Excluded</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select value={config.requirement} onValueChange={(v) => onChange({ ...config, requirement: v as any })}>
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Required">Required</SelectItem>
            <SelectItem value="Optional">Optional</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select value={config.chargeability} onValueChange={(v) => onChange({ ...config, chargeability: v as any })}>
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Chargeable">Chargeable</SelectItem>
            <SelectItem value="Non-Chargeable">Non-Chargeable</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select value={config.visibility} onValueChange={(v) => onChange({ ...config, visibility: v as any })}>
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Visible">Visible</SelectItem>
            <SelectItem value="Hidden">Hidden</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
