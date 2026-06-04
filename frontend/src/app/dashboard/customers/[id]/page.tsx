'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable, Column } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
import { ChartPlaceholder } from '@/components/dashboard/ChartPlaceholder';
import { LeadActivityTimeline } from '@/features/leads/components/LeadActivityTimeline';
import { LeadQuickActions } from '@/features/leads/components/LeadQuickActions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Customer, CustomerStatus } from '@/features/customers';
import { getStatusVariant } from '@/features/customers/constants';
import { useCustomer, useCustomerActivities } from '@/features/customers/hooks/useCustomers';
import { ROUTES } from '@/core/routes';
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

  // UI state only
  const [activeTab, setActiveTab] = useState('overview');

  // Projects, documents, communications will come from their respective module hooks
  // when those modules are built. For now using empty arrays with proper structure.
  const projects: any[] = [];
  const documents: any[] = [];
  const communications: any[] = [];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'documents', label: 'Documents' },
    { id: 'communication', label: 'Communication' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'analytics', label: 'Analytics' },
  ];

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
    { key: 'type', label: 'Type', filterable: true, render: (v) => <Badge variant="secondary">{v}</Badge> },
    { key: 'number', label: 'Number', render: (v) => <span className="font-mono text-xs">{v}</span> },
    { key: 'date', label: 'Date', sortable: true, render: (v) => <span className="text-xs">{v}</span> },
    { key: 'amount', label: 'Amount', sortable: true, render: (v) => <span className="text-xs font-medium">₹{(v / 100000).toFixed(1)}L</span> },
    { key: 'status', label: 'Status', filterable: true, render: (v) => <Badge variant={v === 'Accepted' ? 'success' : v === 'Pending' ? 'warning' : 'info'}>{v}</Badge> },
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

  const detailKPIs = [
    { title: 'Total Revenue', value: `₹${(customer.totalRevenue / 100000).toFixed(1)}L`, change: 12.5, icon: <DollarSign className="h-5 w-5 text-green-600" />, color: 'text-green-600' },
    { title: 'Active Projects', value: String(customer.activeProjects), change: 0, icon: <FolderKanban className="h-5 w-5 text-blue-600" />, color: 'text-blue-600' },
    { title: 'Completed', value: String(customer.completedProjects), change: 8.3, icon: <CheckCircle className="h-5 w-5 text-emerald-600" />, color: 'text-emerald-600' },
    { title: 'Pending Quotes', value: String(customer.pendingQuotations), change: -5, icon: <FileText className="h-5 w-5 text-amber-600" />, color: 'text-amber-600' },
  ];

  return (
    <MainLayout title={customer.customerName} subtitle={customer.companyName}>
      <div className="space-y-6">
        {/* Back Button + Quick Actions */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.push(ROUTES.customers)}>
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
        <div className="border-b">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
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
          <div className="space-y-6">
            {/* KPI Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {detailKPIs.map((kpi) => (
                <KPICard key={kpi.title} data={kpi} />
              ))}
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
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground w-24">Assigned:</span>
                    <span>{customer.assignedEmployee || '-'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground w-24">Source:</span>
                    <span>{customer.leadSource}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground w-24">Customer Since:</span>
                    <span>{customer.customerSince.toLocaleDateString()}</span>
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Linked Projects</h3>
              <Button size="sm">
                <FolderKanban className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </div>
            <DataTable columns={projectColumns} data={projects} emptyMessage="No projects linked to this customer yet" />
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Documents</h3>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Create Document
              </Button>
            </div>
            <DataTable columns={documentColumns} data={documents} emptyMessage="No documents for this customer yet" />
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Communication History</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Meeting
                </Button>
              </div>
            </div>
            <DataTable columns={communicationColumns} data={communications} emptyMessage="No communication recorded yet" />
          </div>
        )}

        {activeTab === 'timeline' && (
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
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartPlaceholder title="Revenue Trend" type="line" />
            <ChartPlaceholder title="Project Trend" type="bar" />
            <ChartPlaceholder title="Activity Trend" type="line" />
            <ChartPlaceholder title="Quotation Trend" type="donut" />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
