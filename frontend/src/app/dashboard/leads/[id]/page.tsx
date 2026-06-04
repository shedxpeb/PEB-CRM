'use client';

import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LeadActivityTimeline } from '@/features/leads/components/LeadActivityTimeline';
import { LeadQuickActions } from '@/features/leads/components/LeadQuickActions';
import { Lead, LeadActivity } from '@/types/leads';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Ruler,
  FileText,
  User,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Mock lead data
const mockLead: Lead = {
  id: '1',
  leadId: 1001,
  customerName: 'Rahul Sharma',
  companyName: 'ABC Construction',
  mobile: '+91 98765 43210',
  alternateMobile: '+91 87654 32109',
  email: 'rahul@abc.com',
  gstNumber: '27ABCDE1234F1Z5',
  address: '123 Industrial Area, Phase 2',
  city: 'Mumbai',
  state: 'Maharashtra',
  projectTitle: 'Warehouse Expansion',
  projectType: 'Warehouse',
  structureType: 'PEB',
  width: 50,
  length: 100,
  height: 12,
  baySpacing: 8,
  roofType: 'Metal Sheet',
  craneRequired: true,
  craneCapacity: 10,
  mezzanine: false,
  wallType: 'Metal Sheet',
  insulationRequired: true,
  materialPreference: 'Standard',
  siteLocation: 'Andheri East',
  siteAddress: 'Plot 45, MIDC, Andheri East, Mumbai - 400069',
  mapCoordinates: '19.1156° N, 72.8496° E',
  soilNotes: 'Normal soil condition, good bearing capacity',
  customerNotes: 'Need urgent delivery, project deadline is tight',
  specialRequirement: 'Fire resistant material required',
  source: 'Website',
  priority: 'High',
  assignedEmployee: 'Vikram Singh',
  nextFollowUpDate: new Date('2024-06-05'),
  status: 'New',
  createdDate: new Date('2024-05-28'),
  lastFollowUp: new Date('2024-05-29'),
  createdBy: 'Admin',
  updatedAt: new Date('2024-05-29'),
  updatedBy: 'Vikram Singh',
};

// Mock activity data
const mockActivities: LeadActivity[] = [
  {
    id: '1',
    leadId: '1',
    type: 'created',
    description: 'Lead created from website enquiry',
    performedBy: 'Admin',
    performedAt: new Date('2024-05-28T10:30:00'),
  },
  {
    id: '2',
    leadId: '1',
    type: 'assigned',
    description: 'Assigned to Vikram Singh',
    performedBy: 'Admin',
    performedAt: new Date('2024-05-28T10:35:00'),
    metadata: { assignedTo: 'Vikram Singh' },
  },
  {
    id: '3',
    leadId: '1',
    type: 'followup',
    description: 'Initial follow-up call completed',
    performedBy: 'Vikram Singh',
    performedAt: new Date('2024-05-29T14:00:00'),
    metadata: { callDuration: '15 min', outcome: 'Interested' },
  },
  {
    id: '4',
    leadId: '1',
    type: 'updated',
    description: 'Updated project requirements',
    performedBy: 'Vikram Singh',
    performedAt: new Date('2024-05-29T14:30:00'),
    metadata: { field: 'height', oldValue: '10m', newValue: '12m' },
  },
];

type TabType = 'overview' | 'customer' | 'project' | 'design' | 'boq' | 'estimate' | 'proposal' | 'activity' | 'notes' | 'files';

export default function LeadDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'customer', label: 'Customer', icon: User },
    { id: 'project', label: 'Project', icon: FileText },
    { id: 'design', label: 'Design', icon: Ruler },
    { id: 'boq', label: 'BOQ', icon: FileText },
    { id: 'estimate', label: 'Estimate', icon: FileText },
    { id: 'proposal', label: 'Proposal', icon: FileText },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'files', label: 'Files', icon: FileText },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Lead Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Lead Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Badge 
                    variant={
                      mockLead.status === 'New' ? 'info' :
                      mockLead.status === 'Contacted' ? 'warning' :
                      mockLead.status === 'Converted' || mockLead.status === 'Approved' ? 'success' :
                      mockLead.status === 'Rejected' ? 'destructive' :
                      'secondary'
                    }
                    className="text-sm px-3 py-1"
                  >
                    {mockLead.status}
                  </Badge>
                  <Badge 
                    variant={
                      mockLead.priority === 'Urgent' ? 'destructive' :
                      mockLead.priority === 'High' ? 'warning' :
                      mockLead.priority === 'Medium' ? 'info' :
                      'secondary'
                    }
                    className="text-sm px-3 py-1"
                  >
                    {mockLead.priority} Priority
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Next Follow-up: {mockLead.nextFollowUpDate?.toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-500/15 rounded-lg flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Project Type</p>
                      <p className="font-medium">{mockLead.projectType}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-500/15 rounded-lg flex items-center justify-center">
                      <Ruler className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Structure Type</p>
                      <p className="font-medium">{mockLead.structureType}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-purple-500/15 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{mockLead.city}, {mockLead.state}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Structure Dimensions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Structure Dimensions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Width</p>
                    <p className="font-medium">{mockLead.width}m</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Length</p>
                    <p className="font-medium">{mockLead.length}m</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Height</p>
                    <p className="font-medium">{mockLead.height}m</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Bay Spacing</p>
                    <p className="font-medium">{mockLead.baySpacing}m</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Roof Type</p>
                    <p className="font-medium">{mockLead.roofType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Wall Type</p>
                    <p className="font-medium">{mockLead.wallType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Crane</p>
                    <p className="font-medium">{mockLead.craneRequired ? `${mockLead.craneCapacity} tons` : 'No'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Mezzanine</p>
                    <p className="font-medium">{mockLead.mezzanine ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'customer':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Customer Name</p>
                    <p className="font-medium">{mockLead.customerName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Company Name</p>
                    <p className="font-medium">{mockLead.companyName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Mobile</p>
                    <p className="font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {mockLead.mobile}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Alternate Mobile</p>
                    <p className="font-medium">{mockLead.alternateMobile || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {mockLead.email}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">GST Number</p>
                    <p className="font-medium">{mockLead.gstNumber || '-'}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium">{mockLead.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">City</p>
                    <p className="font-medium">{mockLead.city}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">State</p>
                    <p className="font-medium">{mockLead.state}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Site Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Site Location</p>
                  <p className="font-medium">{mockLead.siteLocation || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Site Address</p>
                  <p className="font-medium">{mockLead.siteAddress || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Map Coordinates</p>
                  <p className="font-medium">{mockLead.mapCoordinates || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Soil Notes</p>
                  <p className="font-medium">{mockLead.soilNotes || '-'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'project':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Project Title</p>
                <p className="font-medium">{mockLead.projectTitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Project Type</p>
                  <p className="font-medium">{mockLead.projectType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Structure Type</p>
                  <p className="font-medium">{mockLead.structureType}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Material Preference</p>
                <p className="font-medium">{mockLead.materialPreference}</p>
              </div>
            </CardContent>
          </Card>
        );

      case 'design':
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <Ruler className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Design requirements pending</p>
              <Button className="mt-4">Create Design</Button>
            </CardContent>
          </Card>
        );

      case 'boq':
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">BOQ not yet generated</p>
              <Button className="mt-4">Generate BOQ</Button>
            </CardContent>
          </Card>
        );

      case 'estimate':
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Estimate not yet created</p>
              <Button className="mt-4">Create Estimate</Button>
            </CardContent>
          </Card>
        );

      case 'proposal':
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Proposal not yet created</p>
              <Button className="mt-4">Create Proposal</Button>
            </CardContent>
          </Card>
        );

      case 'activity':
        return <LeadActivityTimeline activities={mockActivities} />;

      case 'notes':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Customer Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{mockLead.customerNotes || 'No notes added'}</p>
              <div className="mt-4 space-y-1">
                <p className="text-xs text-muted-foreground">Special Requirement</p>
                <p className="text-sm">{mockLead.specialRequirement || 'None'}</p>
              </div>
            </CardContent>
          </Card>
        );

      case 'files':
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No files attached</p>
              <Button className="mt-4">Upload Files</Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <MainLayout title={`Lead #${mockLead.leadId}`} subtitle={mockLead.customerName}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Back to Leads
            </Button>
          </div>
          <LeadQuickActions
            onEdit={() => console.log('Edit lead')}
            onAddFollowUp={() => console.log('Add follow-up')}
            onSendEstimate={() => console.log('Send estimate')}
            onSendProposal={() => console.log('Send proposal')}
            onConvertToProject={() => console.log('Convert to project')}
          />
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-foreground font-medium'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </MainLayout>
  );
}
