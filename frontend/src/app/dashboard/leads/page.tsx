'use client';

import { useState, useCallback, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable } from '@/components/data-table/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LeadForm } from '@/features/leads/components/LeadForm';
import { LeadRowActions } from '@/features/leads/components/LeadRowActions';
import { KanbanBoard } from '@/features/leads/components/KanbanBoard';
import { Lead, LeadStatus, LeadPriority } from '@/types/leads';
import { 
  Plus, 
  Search, 
  Filter,
  Download,
  Calendar,
  RefreshCw,
  Trash2,
  CheckCircle,
  Send,
  FileText,
  LayoutList,
  Grid3X3
} from 'lucide-react';

// Mock data
const mockLeads: Lead[] = [
  {
    id: '1',
    leadId: 1001,
    customerName: 'Rahul Sharma',
    companyName: 'ABC Construction',
    mobile: '+91 98765 43210',
    email: 'rahul@abc.com',
    address: '123 Industrial Area',
    city: 'Mumbai',
    state: 'Maharashtra',
    projectTitle: 'Warehouse Expansion',
    projectType: 'Warehouse',
    structureType: 'PEB',
    width: 50,
    length: 100,
    height: 12,
    source: 'Website',
    priority: 'High',
    assignedEmployee: 'Vikram Singh',
    status: 'New',
    createdDate: new Date('2024-05-28'),
    lastFollowUp: new Date('2024-05-29'),
    nextFollowUpDate: new Date('2024-06-05'),
  },
  {
    id: '2',
    leadId: 1002,
    customerName: 'Priya Patel',
    companyName: 'XYZ Industries',
    mobile: '+91 87654 32109',
    email: 'priya@xyz.com',
    address: '456 Tech Park',
    city: 'Bangalore',
    state: 'Karnataka',
    projectTitle: 'Factory Shed',
    projectType: 'Factory',
    structureType: 'Steel Structure',
    width: 80,
    length: 150,
    height: 15,
    source: 'Referral',
    priority: 'Medium',
    assignedEmployee: 'Sneha Reddy',
    status: 'Contacted',
    createdDate: new Date('2024-05-25'),
    lastFollowUp: new Date('2024-05-27'),
    nextFollowUpDate: new Date('2024-06-02'),
  },
  {
    id: '3',
    leadId: 1003,
    customerName: 'Amit Kumar',
    companyName: 'DEF Builders',
    mobile: '+91 76543 21098',
    email: 'amit@def.com',
    address: '789 Construction Zone',
    city: 'Delhi',
    state: 'Delhi',
    projectTitle: 'Industrial Shed',
    projectType: 'Industrial Shed',
    structureType: 'PEB',
    width: 60,
    length: 120,
    height: 10,
    source: 'Cold Call',
    priority: 'Urgent',
    assignedEmployee: 'Rajesh Kumar',
    status: 'Design Pending',
    createdDate: new Date('2024-05-20'),
    lastFollowUp: new Date('2024-05-26'),
    nextFollowUpDate: new Date('2024-06-01'),
  },
  {
    id: '4',
    leadId: 1004,
    customerName: 'Sneha Reddy',
    companyName: 'GHI Structures',
    mobile: '+91 65432 10987',
    email: 'sneha@ghi.com',
    address: '321 Steel Market',
    city: 'Chennai',
    state: 'Tamil Nadu',
    projectTitle: 'Commercial Complex',
    projectType: 'Commercial',
    structureType: 'Hybrid',
    width: 40,
    length: 80,
    height: 18,
    source: 'Email',
    priority: 'High',
    assignedEmployee: 'Neha Gupta',
    status: 'BOQ Pending',
    createdDate: new Date('2024-05-15'),
    lastFollowUp: new Date('2024-05-24'),
    nextFollowUpDate: new Date('2024-05-31'),
  },
  {
    id: '5',
    leadId: 1005,
    customerName: 'Vikram Singh',
    companyName: 'MNO Steel Works',
    mobile: '+91 54321 09876',
    email: 'vikram@mno.com',
    address: '654 Metal Hub',
    city: 'Pune',
    state: 'Maharashtra',
    projectTitle: 'Residential Building',
    projectType: 'Residential',
    structureType: 'PEB',
    width: 25,
    length: 50,
    height: 9,
    source: 'Social Media',
    priority: 'Medium',
    assignedEmployee: 'Anita Desai',
    status: 'Estimate Sent',
    createdDate: new Date('2024-05-10'),
    lastFollowUp: new Date('2024-05-23'),
    nextFollowUpDate: new Date('2024-05-30'),
  },
];

const statusOptions: LeadStatus[] = [
  'New',
  'Contacted',
  'Design Pending',
  'BOQ Pending',
  'Estimate Sent',
  'Proposal Sent',
  'Negotiation',
  'Approved',
  'Rejected',
  'Converted',
];

const priorityOptions: LeadPriority[] = ['Low', 'Medium', 'High', 'Urgent'];

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const columns = [
    { key: 'leadId' as const, label: 'Lead ID', sortable: true },
    { key: 'customerName' as const, label: 'Customer Name', sortable: true },
    { key: 'companyName' as const, label: 'Company', sortable: true },
    { key: 'mobile' as const, label: 'Mobile' },
    { key: 'city' as const, label: 'City / State', render: (_: any, row: Lead) => `${row.city}, ${row.state}` },
    { key: 'projectType' as const, label: 'Project Type', filterable: true },
    { key: 'structureType' as const, label: 'Structure Type', filterable: true },
    { key: 'width' as const, label: 'Area (sqm)', render: (_: any, row: Lead) => `${(row.width || 0) * (row.length || 0)}` },
    { key: 'status' as const, label: 'Status', sortable: true, render: (value: LeadStatus) => (
      <Badge 
        variant={
          value === 'New' ? 'info' :
          value === 'Contacted' ? 'warning' :
          value === 'Converted' || value === 'Approved' ? 'success' :
          value === 'Rejected' ? 'destructive' :
          'secondary'
        }
        className="text-xs"
      >
        {value}
      </Badge>
    )},
    { key: 'assignedEmployee' as const, label: 'Assigned To' },
    { key: 'priority' as const, label: 'Priority', sortable: true, render: (value: LeadPriority) => (
      <Badge 
        variant={
          value === 'Urgent' ? 'destructive' :
          value === 'High' ? 'warning' :
          value === 'Medium' ? 'info' :
          'secondary'
        }
        className="text-xs"
      >
        {value}
      </Badge>
    )},
    { key: 'createdDate' as const, label: 'Created', sortable: true, render: (value: Date) => {
      if (!value) return '-';
      const date = new Date(value);
      return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }},
    { key: 'nextFollowUpDate' as const, label: 'Next Follow-up', render: (value: Date) => {
      if (!value) return '-';
      const date = new Date(value);
      return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }},
  ];

  const handleCreateLead = (data: Partial<Lead>) => {
    const newLead: Lead = {
      ...data,
      id: String(leads.length + 1),
      leadId: Math.max(...leads.map(l => l.leadId)) + 1,
      createdDate: new Date(),
      status: data.status || 'New',
    } as Lead;
    
    setLeads([...leads, newLead]);
    console.log('Create lead:', newLead);
    setIsCreateDialogOpen(false);
  };

  const handleEditLead = (data: Partial<Lead> | Lead) => {
    if ('id' in data) {
      setLeads((prevLeads) =>
        prevLeads.map((l) => (l.id === data.id ? { ...l, ...data, updatedAt: new Date() } : l))
      );
      console.log('Edit lead:', data);
    }
    setIsEditDialogOpen(false);
  };

  const handleLeadUpdate = (updatedLead: Lead) => {
    console.log('handleLeadUpdate called:', updatedLead);
    setLeads((prevLeads) => {
      const newLeads = prevLeads.map((lead) => 
        lead.id === updatedLead.id || lead.leadId === updatedLead.leadId ? updatedLead : lead
      );
      console.log('Leads updated, count:', newLeads.length);
      return newLeads;
    });
  };

  const handleLeadsReorder = (updatedLeads: Lead[]) => {
    console.log('handleLeadsReorder called, count:', updatedLeads.length);
    setLeads(updatedLeads);
  };

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
    // Navigate to lead details page
    console.log('Navigate to lead:', lead.id);
  };

  const handleEditLeadFromRow = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditDialogOpen(true);
  };

  const handleDeleteLead = (lead: Lead) => {
    if (confirm(`Are you sure you want to delete lead #${lead.leadId}?`)) {
      setLeads((prevLeads) => prevLeads.filter((l) => l.id !== lead.id));
      console.log('Delete lead:', lead.id);
    }
  };

  const handleConvertLead = (lead: Lead) => {
    console.log('Convert to project:', lead.id);
  };

  const handleConvertToCustomer = (lead: Lead) => {
    console.log('Convert to customer:', lead.id);
    // TODO: Implement customer conversion logic
    // This should:
    // 1. Create a new customer from lead data
    // 2. Update lead with customerId
    // 3. Update lead status to 'Converted'
    // 4. Navigate to customer details page
  };

  const handleAddScore = (lead: Lead, score: number) => {
    console.log('Add score to lead:', lead.id, 'Score:', score);
  };

  const handleStatusChange = (lead: Lead, status: LeadStatus) => {
    console.log('handleStatusChange called:', lead.id, 'New status:', status);
    setLeads((prevLeads) => {
      const newLeads = prevLeads.map((l) => {
        if (l.id === lead.id || l.leadId === lead.leadId) {
          return { ...l, status, updatedAt: new Date() };
        }
        return l;
      });
      console.log('Status updated, leads count:', newLeads.length);
      return newLeads;
    });
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedRows.size} selected leads?`)) {
      setLeads((prevLeads) => prevLeads.filter((l) => !selectedRows.has(l.id)));
      setSelectedRows(new Set());
      console.log('Bulk delete:', Array.from(selectedRows));
    }
  };

  const handleBulkStatusChange = (status: LeadStatus) => {
    setLeads((prevLeads) =>
      prevLeads.map((l) =>
        selectedRows.has(l.id) ? { ...l, status, updatedAt: new Date() } : l
      )
    );
    setSelectedRows(new Set());
    console.log('Bulk status change:', Array.from(selectedRows), 'to', status);
  };

  return (
    <MainLayout title="Leads" subtitle="Manage customer enquiries and PEB requirements">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Leads</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
            
            {/* View Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'table'
                    ? 'bg-background shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LayoutList className="h-4 w-4" />
                Table
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-background shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
                Kanban
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-3xl font-bold mt-1">{leads.length}</p>
                </div>
                <div className="h-10 w-10 bg-blue-500/15 rounded-lg flex items-center justify-center">
                  <Plus className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New Leads</p>
                  <p className="text-3xl font-bold mt-1">
                    {leads.filter(l => l.status === 'New').length}
                  </p>
                </div>
                <div className="h-10 w-10 bg-green-500/15 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-3xl font-bold mt-1">
                    {leads.filter(l => 
                      ['Contacted', 'Design Pending', 'BOQ Pending', 'Estimate Sent', 'Proposal Sent', 'Negotiation'].includes(l.status)
                    ).length}
                  </p>
                </div>
                <div className="h-10 w-10 bg-yellow-500/15 rounded-lg flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Converted</p>
                  <p className="text-3xl font-bold mt-1">
                    {leads.filter(l => l.status === 'Converted').length}
                  </p>
                </div>
                <div className="h-10 w-10 bg-emerald-500/15 rounded-lg flex items-center justify-center">
                  <Filter className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by customer, company, mobile, or lead ID..."
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <select
                className="px-3 py-2 text-sm rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <select
                className="px-3 py-2 text-sm rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priority</option>
                {priorityOptions.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Table / Kanban View */}
        {viewMode === 'kanban' ? (
          <KanbanBoard
            leads={leads}
            onLeadUpdate={handleLeadUpdate}
            onLeadsReorder={handleLeadsReorder}
            onAddLead={() => setIsCreateDialogOpen(true)}
          />
        ) : (
          <>
            {selectedRows.size > 0 && (
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{selectedRows.size} lead(s) selected</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleBulkStatusChange('Contacted')}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Contacted
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Send Estimate
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Send Proposal
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <DataTable
          columns={columns}
          data={leads}
          onRowClick={handleRowClick}
          enableSelection={true}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          rowIdKey="id"
          rowActions={(row) => (
            <LeadRowActions
              lead={row as Lead}
              onEdit={handleEditLeadFromRow}
              onDelete={handleDeleteLead}
              onConvert={handleConvertLead}
              onConvertToCustomer={handleConvertToCustomer}
              onAddScore={handleAddScore}
              onStatusChange={handleStatusChange}
            />
          )}
        />
          </>
        )}

        {/* Create Lead Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Lead</DialogTitle>
            </DialogHeader>
            <LeadForm
              onSubmit={handleCreateLead}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Lead Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Lead</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <LeadForm
                initialData={selectedLead}
                onSubmit={handleEditLead}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
