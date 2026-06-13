'use client';

import { useState, useMemo, useCallback, lazy, Suspense, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable, Column } from '@/components/data-table/DataTable';
import { LeadActivityTimeline } from '@/features/leads/components/LeadActivityTimeline';
import { LeadQuickActions } from '@/features/leads/components/LeadQuickActions';
import { CustomerHealthScore } from '@/features/customers/components/CustomerHealthScore';
import { CustomerSummary } from '@/features/customers/components/CustomerSummary';
import { ClickableKPICard } from '@/features/customers/components/ClickableKPICard';
import { CustomerRevenueTrendChart } from '@/features/customers/components/CustomerRevenueTrendChart';
import { CustomerProjectTrendChart } from '@/features/customers/components/CustomerProjectTrendChart';
import { CustomerActivityTrendChart } from '@/features/customers/components/CustomerActivityTrendChart';
import { CustomerQuotationTrendChart } from '@/features/customers/components/CustomerQuotationTrendChart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Customer, CustomerStatus } from '@/features/customers';
import { getStatusVariant } from '@/features/customers/constants';
import { useCustomer, useCustomerActivities } from '@/features/customers/hooks/useCustomers';
import { useProjects } from '@/features/projects/hooks/useProjects';
import { useQuotations } from '@/features/documents/hooks';
import { ROUTES } from '@/core/routes';

// Lazy load heavy components
const CommunicationCenter = lazy(() => import('@/features/customers/components/CommunicationCenter').then(m => ({ default: m.CommunicationCenter })));
import {
  ArrowLeft,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  User,
  Hash,
  CreditCard,
  DollarSign,
  FolderKanban,
  CheckCircle,
  FileText,
  MessageSquare,
  Zap,
} from 'lucide-react';

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;

  // React Query hooks - single source of truth
  const { data: customer, isLoading, error } = useCustomer(customerId);
  const { data: activities } = useCustomerActivities(customerId);
  const { data: projectsData } = useProjects({ page: 1, pageSize: 100, customer: customerId });
  const { data: quotationsData } = useQuotations({ customerId });

  // UI state only
  const [activeTab, setActiveTab] = useState('overview');
  const [documents, setDocuments] = useState<any[]>([]);

  // Extract projects from data
  const projects = projectsData?.data || [];

  // Extract documents from quotations data and sync with state
  useEffect(() => {
    if (quotationsData) {
      setDocuments(quotationsData);
    }
  }, [quotationsData]);

  const handleEditDocument = useCallback((docId: string) => {
    router.push(`/dashboard/documents/quotations/${docId}`);
  }, [router]);

  const handleDeleteDocument = useCallback((docId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== docId));
    }
  }, []);

  const handleCreateProject = useCallback(() => {
    // Navigate to projects page with customer pre-selected
    router.push(`/dashboard/projects?customerId=${customerId}&create=true`);
  }, [router, customerId]);

  const handleCreateDocument = useCallback(() => {
    // Navigate to documents page with customer pre-selected
    router.push(`/dashboard/documents?customerId=${customerId}&create=true`);
  }, [router, customerId]);

  const handleExportReport = useCallback(() => {
    alert('Export report functionality - will be implemented with backend');
  }, []);

  const handleTimelineFilter = useCallback((filter: string) => {
    // Timeline filter
  }, []);

  const handleProjectRowClick = useCallback((row: any) => {
    router.push(`/dashboard/projects/${row.id}`);
  }, [router]);

  // Communications will come from their respective module hooks
  const communications: any[] = [];

  // Memoized computed values
  const healthScore = useMemo(() => {
    let score = 50;
    if (customer && customer.totalRevenue > 1000000) score += 15;
    if (customer && customer.activeProjects > 0) score += 10;
    if (customer && customer.completedProjects > 0) score += 10;
    if (customer && customer.status === 'Active') score += 10;
    if (customer && customer.pendingQuotations === 0) score += 5;
    return Math.min(score, 100);
  }, [customer]);

  const lastActivity = useMemo(() => {
    return activities && activities.length > 0
      ? new Date(activities[0].performedAt)
      : undefined;
  }, [activities]);

  const detailKPIs = useMemo(() => {
    if (!customer) return [];
    return [
      {
        title: 'Total Revenue',
        value: `₹${(customer.totalRevenue / 100000).toFixed(1)}L`,
        change: 12.5,
        icon: <DollarSign className="h-5 w-5 text-green-600" />,
        color: 'text-green-600',
        onClick: () => setActiveTab('analytics'),
      },
      {
        title: 'Active Projects',
        value: String(customer.activeProjects),
        change: 0,
        icon: <FolderKanban className="h-5 w-5 text-blue-600" />,
        color: 'text-blue-600',
        onClick: () => setActiveTab('projects'),
      },
      {
        title: 'Completed',
        value: String(customer.completedProjects),
        change: 8.3,
        icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
        color: 'text-emerald-600',
        onClick: () => setActiveTab('projects'),
      },
      {
        title: 'Pending Quotes',
        value: String(customer.pendingQuotations),
        change: -5,
        icon: <FileText className="h-5 w-5 text-amber-600" />,
        color: 'text-amber-600',
        onClick: () => setActiveTab('documents'),
      },
    ];
  }, [customer]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const handleBack = useCallback(() => {
    router.push(ROUTES.customers);
  }, [router]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'documents', label: 'Documents' },
    { id: 'communication', label: 'Communication' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'analytics', label: 'Analytics' },
  ];

  const handleTabKeyDown = useCallback((e: React.KeyboardEvent, tabId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabChange(tabId);
    }
  }, [handleTabChange]);

  // Project table columns
  const projectColumns: Column<any>[] = [
    { key: 'projectId', label: 'Project ID', render: (v) => <span className="font-mono text-xs">{v}</span> },
    { key: 'name', label: 'Project Name', sortable: true },
    { key: 'type', label: 'Type', filterable: true },
    { key: 'status', label: 'Status', sortable: true, filterable: true, render: (v) => <Badge variant={v === 'Completed' ? 'success' : v === 'In Progress' ? 'info' : 'warning'}>{v}</Badge> },
    { key: 'value', label: 'Value', sortable: true, render: (v) => <span className="text-xs font-medium">₹{(v / 100000).toFixed(1)}L</span> },
    { key: 'startDate', label: 'Start Date', sortable: true, render: (v) => <span className="text-xs">{v}</span> },
  ];

  // Document table columns
  const documentColumns: Column<any>[] = [
    { key: 'documentType', label: 'Type', filterable: true, render: (v) => <Badge variant="secondary">{v || 'Quotation'}</Badge> },
    { key: 'quotationNumber', label: 'Number', render: (v) => <span className="font-mono text-xs">{v}</span> },
    { key: 'createdAt', label: 'Date', sortable: true, render: (v) => <span className="text-xs">{v ? new Date(v).toLocaleDateString() : '-'}</span> },
    { key: 'totalAmount', label: 'Amount', sortable: true, render: (v) => <span className="text-xs font-medium">₹{(v / 100000).toFixed(1)}L</span> },
    { key: 'status', label: 'Status', filterable: true, render: (v) => <Badge variant={v === 'Accepted' ? 'success' : v === 'Sent' ? 'info' : v === 'Draft' ? 'secondary' : 'warning'}>{v}</Badge> },
    { key: 'actions', label: 'Actions', render: (_: any, row: any) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => handleEditDocument(row.id)}>
          Edit
        </Button>
        <Button size="sm" variant="destructive" onClick={() => handleDeleteDocument(row.id)}>
          Delete
        </Button>
      </div>
    )},
  ];

  // Communication table columns
  const communicationColumns: Column<any>[] = [
    { key: 'userName', label: 'User' },
    { key: 'action', label: 'Activity' },
    { key: 'module', label: 'Module', render: (v) => <Badge variant="secondary" className="text-[10px]">{v}</Badge> },
    { key: 'time', label: 'When', render: (v) => <span className="text-xs text-muted-foreground">{v}</span> },
  ];

  // Loading state
  if (isLoading) {
    return (
      <MainLayout title="Loading..." subtitle="">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Loading customer details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Error or not found state
  if (error || !customer) {
    return (
      <MainLayout title="Customer Not Found" subtitle="">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <p className="text-sm text-destructive">Failed to load customer details</p>
            <Button variant="outline" size="sm" onClick={() => router.push(ROUTES.customers)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Customers
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={customer.customerName} subtitle={customer.companyName}>
      <div className="space-y-6">
        {/* Back Button + Quick Actions */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Button>
          <LeadQuickActions
            isDropdown={true}
            onAddFollowUp={() => {}}
            onSendEstimate={() => {}}
            onSendProposal={() => {}}
            onConvertToProject={() => {}}
          />
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <Badge variant={getStatusVariant(customer.status as CustomerStatus)} className="text-sm px-3 py-1">
            {customer.status}
          </Badge>
          <span className="text-sm text-muted-foreground">Customer since {customer.customerSince.toLocaleDateString()}</span>
        </div>

        {/* Tabs */}
        <div className="border-b" role="tablist" aria-label="Customer details tabs">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6" role="tabpanel" id="panel-overview" aria-labelledby="tab-overview">
            {/* KPI Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {detailKPIs.map((kpi) => (
                <ClickableKPICard key={kpi.title} {...kpi} />
              ))}
            </div>

            {/* Customer Summary & Health Score */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CustomerSummary
                  customer={customer}
                  lastActivity={lastActivity}
                />
              </div>
              <CustomerHealthScore
                score={healthScore}
                trend="stable"
                lastUpdated={lastActivity}
              />
            </div>

            {/* Profile Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Information */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{customer.customerName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.companyName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.mobile}</span>
                    {customer.alternateMobile && <span className="text-muted-foreground">| {customer.alternateMobile}</span>}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.address}, {customer.city}, {customer.state} {customer.pincode}</span>
                  </div>
                  {customer.website && (
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={customer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {customer.website}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Business Information */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground w-24">GST:</span>
                    <span className="font-mono">{customer.gstNumber || '-'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground w-24">PAN:</span>
                    <span className="font-mono">{customer.panNumber || '-'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground w-24">Industry:</span>
                    <span>{customer.industry}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground w-24">Business Type:</span>
                    <span>{customer.businessType}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground w-24">Source:</span>
                    <span>{customer.leadSource}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notes */}
            {customer.notes && (
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{customer.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6" role="tabpanel" id="panel-projects" aria-labelledby="tab-projects">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Linked Projects</h3>
              <Button size="sm" onClick={handleCreateProject}>
                <FolderKanban className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </div>

            {/* Project Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Projects</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {projects.filter((p: any) => p.status === 'Design' || p.status === 'BOQ' || p.status === 'Procurement' || p.status === 'Fabrication' || p.status === 'Installation').length}
                      </p>
                    </div>
                    <FolderKanban className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold text-green-600">
                        {projects.filter((p: any) => p.status === 'Completion' || p.status === 'After Sales').length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">On Hold</p>
                      <p className="text-2xl font-bold text-amber-600">
                        {projects.filter((p: any) => p.status === 'On Hold').length}
                      </p>
                    </div>
                    <Zap className="h-8 w-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Projects Table */}
            <DataTable 
              columns={projectColumns} 
              data={projects} 
              emptyMessage="No projects linked to this customer yet"
              onRowClick={handleProjectRowClick}
            />
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6" role="tabpanel" id="panel-documents" aria-labelledby="tab-documents">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Documents</h3>
              <Button size="sm" onClick={handleCreateDocument}>
                <FileText className="h-4 w-4 mr-2" />
                Create Document
              </Button>
            </div>

            {/* Document Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold">{documents.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Draft</p>
                      <p className="text-2xl font-bold text-gray-600">
                        {documents.filter((d: any) => d.status === 'Draft').length}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-gray-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Sent</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {documents.filter((d: any) => d.status === 'Sent').length}
                      </p>
                    </div>
                    <Mail className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Accepted</p>
                      <p className="text-2xl font-bold text-green-600">
                        {documents.filter((d: any) => d.status === 'Accepted').length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Documents Table */}
            <DataTable 
              columns={documentColumns} 
              data={documents} 
              emptyMessage="No documents for this customer yet"
              onRowClick={(row) => router.push(`/dashboard/documents/quotations/${(row as any).id}`)}
            />
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="space-y-4" role="tabpanel" id="panel-communication" aria-labelledby="tab-communication">
            <Suspense fallback={<div className="h-64 flex items-center justify-center text-muted-foreground">Loading communication center...</div>}>
              <CommunicationCenter customerId={customerId} customerName={customer.customerName} />
            </Suspense>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4" role="tabpanel" id="panel-timeline" aria-labelledby="tab-timeline">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Customer Journey Timeline</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleTimelineFilter('all')}>
                  All Activities
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleTimelineFilter('projects')}>
                  Projects
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleTimelineFilter('documents')}>
                  Documents
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleTimelineFilter('communication')}>
                  Communication
                </Button>
              </div>
            </div>
            <LeadActivityTimeline
              activities={(activities ?? []).map((a) => ({
                id: a.id,
                leadId: a.customerId,
                type: a.type === 'customer_created' ? 'created'
                  : a.type === 'lead_created' ? 'created'
                  : a.type === 'estimate_sent' ? 'document_sent'
                  : a.type === 'quotation_sent' ? 'document_sent'
                  : a.type === 'project_started' ? 'status_changed'
                  : a.type === 'project_completed' ? 'converted'
                  : a.type === 'payment_received' ? 'updated'
                  : a.type === 'note_added' ? 'updated'
                  : 'updated',
                description: a.description,
                performedBy: a.performedBy,
                performedAt: a.performedAt,
                metadata: {},
              }))}
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6" role="tabpanel" id="panel-analytics" aria-labelledby="tab-analytics">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Customer Analytics</h3>
              <Button size="sm" variant="outline" onClick={handleExportReport}>
                Export Report
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomerRevenueTrendChart
                data={[
                  { month: 'Jan', revenue: 150000 },
                  { month: 'Feb', revenue: 200000 },
                  { month: 'Mar', revenue: 180000 },
                  { month: 'Apr', revenue: 250000 },
                  { month: 'May', revenue: 300000 },
                  { month: 'Jun', revenue: 280000 },
                ]}
              />
              <CustomerProjectTrendChart
                data={[
                  { month: 'Jan', projects: 2, completed: 1 },
                  { month: 'Feb', projects: 3, completed: 2 },
                  { month: 'Mar', projects: 1, completed: 1 },
                  { month: 'Apr', projects: 4, completed: 2 },
                  { month: 'May', projects: 2, completed: 1 },
                  { month: 'Jun', projects: 3, completed: 2 },
                ]}
              />
              <CustomerActivityTrendChart
                data={[
                  { month: 'Jan', activities: 15 },
                  { month: 'Feb', activities: 22 },
                  { month: 'Mar', activities: 18 },
                  { month: 'Apr', activities: 25 },
                  { month: 'May', activities: 30 },
                  { month: 'Jun', activities: 28 },
                ]}
              />
              <CustomerQuotationTrendChart
                data={[
                  { name: 'Draft', value: 3 },
                  { name: 'Sent', value: 5 },
                  { name: 'Accepted', value: 4 },
                  { name: 'Rejected', value: 1 },
                  { name: 'Expired', value: 2 },
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
