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
import { 
  Save,
  ArrowLeft,
  FileText,
  Building2,
  Settings,
  Clock,
  DollarSign,
  FileCheck,
  Info,
} from 'lucide-react';
import { 
  Proposal, 
  Estimate,
  ProposalConfiguration,
  CommercialSummary,
  ProposalTimeline,
  TimelineMilestone,
  CoverPage,
  CreateProposalDto,
} from '../types/peb-commercial';

interface ProposalBuilderProps {
  estimate: Estimate;
  proposal?: Proposal;
  onSave: (proposal: CreateProposalDto) => void;
  onCancel: () => void;
}

export function ProposalBuilder({
  estimate,
  proposal,
  onSave,
  onCancel,
}: ProposalBuilderProps) {
  // Proposal Configuration (User can configure these options)
  const [proposalConfiguration, setProposalConfiguration] = useState<ProposalConfiguration>(
    proposal?.proposalConfiguration || {
      labourIncluded: false,
      installationIncluded: false,
      transportationIncluded: false,
      craneIncluded: false,
      civilWorkIncluded: false,
      accommodationIncluded: false,
      erectionIncluded: false,
      freightIncluded: false,
      includeTechnicalDrawings: false,
      include3DRenderings: false,
      includeMaterialSamples: false,
      includePastProjects: false,
    }
  );
  
  // Commercial Summary (Optional - may include indicative pricing)
  const [includeCommercialSummary, setIncludeCommercialSummary] = useState(
    proposal?.includeCommercialSummary || false
  );
  const [commercialSummary, setCommercialSummary] = useState<CommercialSummary>(
    proposal?.commercialSummary || {
      subtotal: estimate.subtotal,
      indicativeTotal: estimate.totalAmount,
      notes: '',
      disclaimer: 'This is an indicative quotation. Final pricing will be provided in the formal quotation.',
    }
  );
  
  // Timeline
  const [timeline, setTimeline] = useState<ProposalTimeline>(
    proposal?.timeline || {
      estimatedDuration: 30,
      unit: 'days',
      milestones: [
        {
          id: '1',
          milestone: 'Design Approval',
          description: 'Client approval of design drawings',
        },
        {
          id: '2',
          milestone: 'Material Procurement',
          description: 'Procurement of structural steel and cladding materials',
        },
        {
          id: '3',
          milestone: 'Fabrication',
          description: 'Fabrication at factory',
        },
        {
          id: '4',
          milestone: 'Delivery to Site',
          description: 'Transportation of materials to project site',
        },
        {
          id: '5',
          milestone: 'Erection & Installation',
          description: 'Site erection and installation',
        },
        {
          id: '6',
          milestone: 'Completion',
          description: 'Project handover',
        },
      ],
    }
  );
  
  // Cover Page
  const [coverPage, setCoverPage] = useState<CoverPage>(
    proposal?.coverPage || {
      title: 'PROPOSAL',
      subtitle: 'Pre-Engineered Building Solution',
      date: new Date(),
      referenceNumber: estimate.estimateNumber,
      preparedFor: estimate.customerName,
      preparedBy: 'Your Company Name',
    }
  );
  
  // Document Content
  const [companyProfile, setCompanyProfile] = useState(proposal?.companyProfile || '');
  const [projectOverview, setProjectOverview] = useState(proposal?.projectOverview || '');
  const [scopeOfWork, setScopeOfWork] = useState(proposal?.scopeOfWork || '');
  const [termsAndConditions, setTermsAndConditions] = useState(proposal?.termsAndConditions || '');
  
  // Notes
  const [notes, setNotes] = useState(proposal?.notes || '');
  const [internalNotes, setInternalNotes] = useState(proposal?.internalNotes || '');
  
  // UI State
  const [activeTab, setActiveTab] = useState('configuration');
  
  const handleSave = () => {
    const proposalDto: CreateProposalDto = {
      estimateId: estimate.id,
      proposalConfiguration,
      includeCommercialSummary,
      commercialSummary: includeCommercialSummary ? commercialSummary : undefined,
      timeline,
      coverPage,
      companyProfile,
      projectOverview,
      scopeOfWork,
      termsAndConditions,
      notes,
      internalNotes,
    };
    
    onSave(proposalDto);
  };
  
  const updateProposalConfig = (key: keyof ProposalConfiguration, value: boolean) => {
    setProposalConfiguration({ ...proposalConfiguration, [key]: value });
  };
  
  const addMilestone = () => {
    const newMilestone: TimelineMilestone = {
      id: `temp-${Date.now()}`,
      milestone: 'New Milestone',
      description: '',
    };
    setTimeline({ ...timeline, milestones: [...(timeline.milestones || []), newMilestone] });
  };
  
  const updateMilestone = (id: string, updates: Partial<TimelineMilestone>) => {
    setTimeline({
      ...timeline,
      milestones: (timeline.milestones || []).map(m => m.id === id ? { ...m, ...updates } : m),
    });
  };
  
  const removeMilestone = (id: string) => {
    setTimeline({
      ...timeline,
      milestones: (timeline.milestones || []).filter(m => m.id !== id),
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Proposal Builder</h2>
          <p className="text-muted-foreground">
            From Estimate: {estimate.estimateNumber} | Customer: {estimate.customerName}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Proposal
          </Button>
        </div>
      </div>
      
      {/* Inherited Data Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            Inherited from Estimate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium">Materials Selected</p>
              <p className="text-muted-foreground">{estimate.materialSelections.length} items</p>
            </div>
            <div>
              <p className="font-medium">Technical Specs</p>
              <p className="text-muted-foreground">
                {estimate.technicalSpecifications.buildingLength ? `${estimate.technicalSpecifications.buildingLength}m x ${estimate.technicalSpecifications.buildingWidth}m` : 'Not specified'}
              </p>
            </div>
            <div>
              <p className="font-medium">Inclusions</p>
              <p className="text-muted-foreground">{estimate.inclusions.length} items</p>
            </div>
            <div>
              <p className="font-medium">Exclusions</p>
              <p className="text-muted-foreground">{estimate.exclusions.length} items</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="cover">Cover Page</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        {/* Configuration Tab */}
        <TabsContent value="configuration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Proposal Configuration
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure which services and options to include in the proposal
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service Inclusions */}
              <div>
                <h4 className="font-semibold mb-4">Service Inclusions</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ConfigCheckbox
                    label="Labour"
                    checked={proposalConfiguration.labourIncluded}
                    onChange={(checked) => updateProposalConfig('labourIncluded', checked)}
                    description="Include labour costs"
                  />
                  <ConfigCheckbox
                    label="Installation"
                    checked={proposalConfiguration.installationIncluded}
                    onChange={(checked) => updateProposalConfig('installationIncluded', checked)}
                    description="Include installation services"
                  />
                  <ConfigCheckbox
                    label="Transportation"
                    checked={proposalConfiguration.transportationIncluded}
                    onChange={(checked) => updateProposalConfig('transportationIncluded', checked)}
                    description="Include transportation costs"
                  />
                  <ConfigCheckbox
                    label="Crane"
                    checked={proposalConfiguration.craneIncluded}
                    onChange={(checked) => updateProposalConfig('craneIncluded', checked)}
                    description="Include crane services"
                  />
                  <ConfigCheckbox
                    label="Civil Work"
                    checked={proposalConfiguration.civilWorkIncluded}
                    onChange={(checked) => updateProposalConfig('civilWorkIncluded', checked)}
                    description="Include civil work"
                  />
                  <ConfigCheckbox
                    label="Accommodation"
                    checked={proposalConfiguration.accommodationIncluded}
                    onChange={(checked) => updateProposalConfig('accommodationIncluded', checked)}
                    description="Include accommodation"
                  />
                  <ConfigCheckbox
                    label="Erection"
                    checked={proposalConfiguration.erectionIncluded}
                    onChange={(checked) => updateProposalConfig('erectionIncluded', checked)}
                    description="Include erection services"
                  />
                  <ConfigCheckbox
                    label="Freight"
                    checked={proposalConfiguration.freightIncluded}
                    onChange={(checked) => updateProposalConfig('freightIncluded', checked)}
                    description="Include freight charges"
                  />
                </div>
              </div>
              
              {/* Presentation Options */}
              <div>
                <h4 className="font-semibold mb-4">Presentation Options</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ConfigCheckbox
                    label="Technical Drawings"
                    checked={proposalConfiguration.includeTechnicalDrawings}
                    onChange={(checked) => updateProposalConfig('includeTechnicalDrawings', checked)}
                    description="Include technical drawings"
                  />
                  <ConfigCheckbox
                    label="3D Renderings"
                    checked={proposalConfiguration.include3DRenderings}
                    onChange={(checked) => updateProposalConfig('include3DRenderings', checked)}
                    description="Include 3D renderings"
                  />
                  <ConfigCheckbox
                    label="Material Samples"
                    checked={proposalConfiguration.includeMaterialSamples}
                    onChange={(checked) => updateProposalConfig('includeMaterialSamples', checked)}
                    description="Include material samples"
                  />
                  <ConfigCheckbox
                    label="Past Projects"
                    checked={proposalConfiguration.includePastProjects}
                    onChange={(checked) => updateProposalConfig('includePastProjects', checked)}
                    description="Include past projects"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Cover Page Tab */}
        <TabsContent value="cover" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Cover Page
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={coverPage.title || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoverPage({ ...coverPage, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Input
                    value={coverPage.subtitle || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoverPage({ ...coverPage, subtitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Reference Number</Label>
                  <Input
                    value={coverPage.referenceNumber || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoverPage({ ...coverPage, referenceNumber: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={coverPage.date ? new Date(coverPage.date).toISOString().split('T')[0] : ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoverPage({ ...coverPage, date: new Date(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Prepared For</Label>
                  <Input
                    value={coverPage.preparedFor || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoverPage({ ...coverPage, preparedFor: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Prepared By</Label>
                  <Input
                    value={coverPage.preparedBy || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoverPage({ ...coverPage, preparedBy: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Proposal Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Company Profile</Label>
                <Textarea
                  value={companyProfile}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCompanyProfile(e.target.value)}
                  rows={4}
                  placeholder="Enter company profile and background..."
                />
              </div>
              <div>
                <Label>Project Overview</Label>
                <Textarea
                  value={projectOverview}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProjectOverview(e.target.value)}
                  rows={4}
                  placeholder="Enter project overview and objectives..."
                />
              </div>
              <div>
                <Label>Scope of Work</Label>
                <Textarea
                  value={scopeOfWork}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setScopeOfWork(e.target.value)}
                  rows={6}
                  placeholder="Enter detailed scope of work..."
                />
              </div>
              <div>
                <Label>Terms & Conditions</Label>
                <Textarea
                  value={termsAndConditions}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTermsAndConditions(e.target.value)}
                  rows={4}
                  placeholder="Enter terms and conditions..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Project Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Estimated Duration</Label>
                  <Input
                    type="number"
                    value={timeline.estimatedDuration || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeline({ ...timeline, estimatedDuration: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Unit</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={timeline.unit || 'days'}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTimeline({ ...timeline, unit: e.target.value as any })}
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Milestones</h4>
                  <Button size="sm" onClick={addMilestone}>
                    Add Milestone
                  </Button>
                </div>
                <div className="space-y-3">
                  {(timeline.milestones || []).map((milestone, index) => (
                    <div key={milestone.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{index + 1}</Badge>
                          <span className="font-medium">{milestone.milestone}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMilestone(milestone.id)}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs">Milestone Name</Label>
                          <Input
                            value={milestone.milestone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateMilestone(milestone.id, { milestone: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Description</Label>
                          <Textarea
                            value={milestone.description || ''}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateMilestone(milestone.id, { description: e.target.value })}
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Commercial Tab */}
        <TabsContent value="commercial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Commercial Summary
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Optional indicative pricing for the proposal
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="includeCommercialSummary"
                  checked={includeCommercialSummary}
                  onCheckedChange={(checked: boolean) => setIncludeCommercialSummary(checked)}
                />
                <Label htmlFor="includeCommercialSummary">Include Commercial Summary (Indicative Pricing)</Label>
              </div>
              
              {includeCommercialSummary && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Subtotal (₹)</Label>
                      <Input
                        type="number"
                        value={commercialSummary.subtotal || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommercialSummary({ ...commercialSummary, subtotal: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label>Indicative Total (₹)</Label>
                      <Input
                        type="number"
                        value={commercialSummary.indicativeTotal || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommercialSummary({ ...commercialSummary, indicativeTotal: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Notes</Label>
                    <Textarea
                      value={commercialSummary.notes || ''}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCommercialSummary({ ...commercialSummary, notes: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Disclaimer</Label>
                    <Textarea
                      value={commercialSummary.disclaimer || ''}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCommercialSummary({ ...commercialSummary, disclaimer: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Notes
              </CardTitle>
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

// Helper Component for Configuration Checkbox
interface ConfigCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

function ConfigCheckbox({ label, checked, onChange, description }: ConfigCheckboxProps) {
  return (
    <div className="flex items-start space-x-3 p-3 border rounded-lg">
      <Checkbox
        id={label}
        checked={checked}
        onCheckedChange={(checked: boolean) => onChange(checked)}
        className="mt-1"
      />
      <div className="flex-1">
        <Label htmlFor={label} className="font-medium cursor-pointer">
          {label}
        </Label>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
