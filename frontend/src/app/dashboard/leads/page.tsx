'use client';

import { useState, useMemo, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
import { ConsolidatedFilterBox, FilterConfig } from '@/components/layout/ConsolidatedFilterBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { componentTextSizes } from '@/lib/design-system';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Lazy load heavy components to reduce initial bundle size
const LeadForm = dynamic(() => import('@/features/leads/components/LeadForm').then(mod => ({ default: mod.LeadForm })), {
  loading: () => <div className="p-8 text-center">Loading form...</div>,
  ssr: false
});
const LeadRowActions = dynamic(() => import('@/features/leads/components/LeadRowActions').then(mod => ({ default: mod.LeadRowActions })), {
  loading: () => <div className="p-2">Loading...</div>,
  ssr: false
});
const LeadToCustomerConversionDialog = dynamic(() => import('@/features/leads/components/LeadToCustomerConversionDialog').then(mod => ({ default: mod.LeadToCustomerConversionDialog })), {
  loading: () => <div className="p-8 text-center">Loading...</div>,
  ssr: false
});
const KanbanBoard = dynamic(() => import('@/features/leads/components/KanbanBoard').then(mod => ({ default: mod.KanbanBoard })), {
  loading: () => <div className="p-8 text-center">Loading kanban...</div>,
  ssr: false
});
const LeadCalendarView = dynamic(() => import('@/features/leads/components/LeadCalendarView').then(mod => ({ default: mod.LeadCalendarView })), {
  loading: () => <div className="p-8 text-center">Loading calendar...</div>,
  ssr: false
});
import { Lead, LeadStatus, LeadPriority } from '@/types/leads';
import { useConvertLeadToCustomer } from '@/features/customers/hooks/useCustomers';
import { ROUTES } from '@/core/routes';
import { mockLeads } from '@/features/leads/data/mockLeads';
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
  Grid3X3,
  Settings,
  CalendarDays
} from 'lucide-react';

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

// Move baseColumns outside component to prevent recreation on every render
const baseColumns = [
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
  { key: 'converted' as const, label: 'Converted', render: (_: any, row: Lead) => (
    <Badge
      variant={row.customerId ? 'success' : 'secondary'}
      className="text-xs"
    >
      {row.customerId ? 'Yes' : 'No'}
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

export default function LeadsPage() {
  const router = useRouter();
  const convertLeadToCustomerMutation = useConvertLeadToCustomer();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [kpiFilterMode, setKpiFilterMode] = useState<string>('none');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isConvertToCustomerDialogOpen, setIsConvertToCustomerDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [viewMode, setViewMode] = useState<'table' | 'kanban' | 'calendar'>('table');
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [customColumns, setCustomColumns] = useState<Array<{key: string, label: string}>>([]);
  const [isCustomColumnDialogOpen, setIsCustomColumnDialogOpen] = useState(false);
  
  // Date filters
  const [dateRangeFilter, setDateRangeFilter] = useState<{from: Date | null, to: Date | null}>({ from: null, to: null });
  const [quickDateFilter, setQuickDateFilter] = useState<string>('all');
  
  // Lazy loading / pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  // Filter leads based on status, priority, and date filters
  const filteredLeads = useMemo(() => leads.filter(lead => {
    const matchesSearch = debouncedSearch === '' ||
      lead.customerName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      lead.mobile.includes(debouncedSearch) ||
      lead.leadId.toString().includes(debouncedSearch);

    let matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    // Handle KPI filter mode for in-progress
    if (kpiFilterMode === 'in-progress') {
      matchesStatus = ['Contacted', 'Design Pending', 'BOQ Pending', 'Estimate Sent', 'Proposal Sent', 'Negotiation'].includes(lead.status);
    }
    const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;

    // Date filtering based on quick date filter
    let matchesDate = true;
    if (quickDateFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const leadDate = new Date(lead.createdDate);
      leadDate.setHours(0, 0, 0, 0);

      switch (quickDateFilter) {
        case 'today':
          matchesDate = leadDate.getTime() === today.getTime();
          break;
        case 'tomorrow':
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          matchesDate = leadDate.getTime() === tomorrow.getTime();
          break;
        case 'this_week':
          const weekEnd = new Date(today);
          weekEnd.setDate(weekEnd.getDate() + 7);
          matchesDate = leadDate >= today && leadDate <= weekEnd;
          break;
        case 'this_month':
          const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          matchesDate = leadDate.getMonth() === today.getMonth() && leadDate.getFullYear() === today.getFullYear();
          break;
        case 'this_year':
          matchesDate = leadDate.getFullYear() === today.getFullYear();
          break;
      }
    }

    // Date range filtering
    if (dateRangeFilter.from || dateRangeFilter.to) {
      const leadDate = new Date(lead.createdDate);
      if (dateRangeFilter.from) {
        const fromDate = new Date(dateRangeFilter.from);
        fromDate.setHours(0, 0, 0, 0);
        if (leadDate < fromDate) matchesDate = false;
      }
      if (dateRangeFilter.to) {
        const toDate = new Date(dateRangeFilter.to);
        toDate.setHours(23, 59, 59, 999);
        if (leadDate > toDate) matchesDate = false;
      }
    }

    return matchesSearch && matchesStatus && matchesPriority && matchesDate;
  }), [leads, debouncedSearch, statusFilter, priorityFilter, kpiFilterMode, quickDateFilter, dateRangeFilter]);

  const customColumnDefs = useMemo(() => customColumns.map(col => ({
    key: col.key as any,
    label: col.label,
    sortable: true,
    render: (value: any) => value || '-'
  })), [customColumns]);

  const columns = useMemo(() => [...baseColumns, ...customColumnDefs], [baseColumns, customColumnDefs]);

  // Memoize paginated data to prevent DataTable re-renders on every state change
  const paginatedLeads = useMemo(() => 
    filteredLeads.slice(0, currentPage * itemsPerPage),
    [filteredLeads, currentPage, itemsPerPage]
  );

  const handleCreateLead = useCallback((data: Partial<Lead>) => {
    setLeads(prevLeads => {
      const maxLeadId = prevLeads.length > 0 ? Math.max(...prevLeads.map(l => l.leadId)) : 0;
      const newLead: Lead = {
        ...data,
        id: String(prevLeads.length + 1),
        leadId: maxLeadId + 1,
        createdDate: new Date(),
        status: data.status || 'New',
      } as Lead;
      return [...prevLeads, newLead];
    });
    setIsCreateDialogOpen(false);
  }, []);

  const handleEditLead = useCallback((data: Partial<Lead> | Lead) => {
    if ('id' in data) {
      setLeads((prevLeads) =>
        prevLeads.map((l) => (l.id === data.id ? { ...l, ...data, updatedAt: new Date() } : l))
      );
    }
    setIsEditDialogOpen(false);
  }, []);

  const handleLeadUpdate = useCallback((updatedLead: Lead) => {
    setLeads((prevLeads) => {
      const newLeads = prevLeads.map((lead) => 
        lead.id === updatedLead.id || lead.leadId === updatedLead.leadId ? updatedLead : lead
      );
      return newLeads;
    });
  }, []);

  const handleLeadsReorder = useCallback((updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
  }, []);

  const handleRowClick = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    setIsViewDialogOpen(true);
  }, []);

  const handleKpiCardClick = useCallback((filter: string) => {
    if (filter === 'all') {
      setStatusFilter('all');
      setPriorityFilter('all');
      setKpiFilterMode('none');
    } else if (filter === 'in-progress') {
      setStatusFilter('all');
      setKpiFilterMode('in-progress');
    } else {
      setStatusFilter(filter);
      setKpiFilterMode('none');
    }
  }, []);

  const handleExport = useCallback(() => {
    setLeads(prevLeads => {
      // Export leads to CSV
      const headers = ['Lead ID', 'Customer Name', 'Company', 'Mobile', 'Email', 'City', 'State', 'Project Title', 'Project Type', 'Structure Type', 'Status', 'Priority', 'Assigned To', 'Source', 'Created Date'];
      const csvContent = [
        headers.join(','),
        ...prevLeads.map(lead => [
          lead.leadId,
          lead.customerName,
          lead.companyName,
          lead.mobile,
          lead.email,
          lead.city,
          lead.state,
          lead.projectTitle,
          lead.projectType,
          lead.structureType,
          lead.status,
          lead.priority,
          lead.assignedEmployee,
          lead.source,
          new Date(lead.createdDate).toLocaleDateString()
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return prevLeads;
    });
  }, []);

  const handleImport = useCallback(() => {
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          const lines = text.split('\n');
          const headers = lines[0].split(',');
          
          // Parse CSV data
          const newLeads: Lead[] = [];
          for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length === headers.length) {
              const lead: Partial<Lead> = {};
              headers.forEach((header, index) => {
                const key = header.trim();
                const value = values[index]?.trim();
                
                // Map CSV headers to lead fields
                if (key === 'Lead ID') lead.leadId = parseInt(value);
                else if (key === 'Customer Name') lead.customerName = value;
                else if (key === 'Company') lead.companyName = value;
                else if (key === 'Mobile') lead.mobile = value;
                else if (key === 'Email') lead.email = value;
                else if (key === 'City') lead.city = value;
                else if (key === 'State') lead.state = value;
                else if (key === 'Project Title') lead.projectTitle = value;
                else if (key === 'Project Type') lead.projectType = value as any;
                else if (key === 'Structure Type') lead.structureType = value as any;
                else if (key === 'Status') lead.status = value as LeadStatus;
                else if (key === 'Priority') lead.priority = value as LeadPriority;
                else if (key === 'Assigned To') lead.assignedEmployee = value;
                else if (key === 'Source') lead.source = value as any;
                else if (key === 'Width') lead.width = parseFloat(value);
                else if (key === 'Length') lead.length = parseFloat(value);
                else if (key === 'Height') lead.height = parseFloat(value);
                else if (key === 'Address') lead.address = value;
                else (lead as any)[key] = value;
              });
              
              if (lead.customerName && lead.leadId) {
                // Generate unique ID using timestamp to avoid conflicts
                const uniqueId = `import-${Date.now()}-${newLeads.length}`;
                newLeads.push({
                  ...lead,
                  id: uniqueId,
                  createdDate: new Date(),
                } as Lead);
              }
            }
          }
          
          // Add imported leads to state
          setLeads(prevLeads => [...prevLeads, ...newLeads]);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, []);

  const handleAddCustomColumn = useCallback((key: string, label: string) => {
    setCustomColumns(prevColumns => [...prevColumns, { key, label }]);
    setIsCustomColumnDialogOpen(false);
  }, []);

  const handleRemoveCustomColumn = useCallback((key: string) => {
    setCustomColumns(prevColumns => prevColumns.filter(col => col.key !== key));
  }, []);

  // Date filter handlers
  const handleQuickDateFilterChange = useCallback((filter: string) => {
    setQuickDateFilter(filter);
    setDateRangeFilter({ from: null, to: null }); // Clear custom range when quick filter is selected
    setCurrentPage(1); // Reset to first page
  }, []);

  const handleDateRangeChange = useCallback((field: 'from' | 'to', value: Date | null) => {
    setDateRangeFilter(prev => ({ ...prev, [field]: value }));
    setQuickDateFilter('all'); // Clear quick filter when custom range is set
    setCurrentPage(1); // Reset to first page
  }, []);

  const clearDateFilters = useCallback(() => {
    setQuickDateFilter('all');
    setDateRangeFilter({ from: null, to: null });
    setCurrentPage(1);
  }, []);

  // Reset pagination when view mode changes
  const handleViewModeChange = useCallback((mode: 'table' | 'kanban' | 'calendar') => {
    setViewMode(mode);
    setCurrentPage(1);
    setSelectedRows(new Set());
  }, []);

  // Lazy loading handlers
  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoading(false);
    }, 500);
  }, []);

  // Extract unique cities from leads data
  const cityOptions = useMemo(() => {
    const cities = [...new Set(leads.map(l => l.city).filter(Boolean))];
    return cities.sort();
  }, [leads]);

  // Filter configuration for ConsolidatedFilterBox
  const filterConfigs: FilterConfig[] = useMemo(() => [
    {
      key: 'status',
      label: 'Status',
      value: statusFilter,
      onChange: setStatusFilter,
      options: [{ value: 'all', label: 'All Status' }, ...statusOptions.map(s => ({ value: s, label: s }))],
    },
    {
      key: 'priority',
      label: 'Priority',
      value: priorityFilter,
      onChange: setPriorityFilter,
      options: [{ value: 'all', label: 'All Priority' }, ...priorityOptions.map(p => ({ value: p, label: p }))],
    },
    {
      key: 'city',
      label: 'City',
      value: '',
      onChange: () => {},
      options: [{ value: 'all', label: 'All Cities' }, ...cityOptions.map(c => ({ value: c, label: c }))],
    },
  ], [statusFilter, priorityFilter, cityOptions]);

  const handleClearFilters = useCallback(() => {
    setStatusFilter('all');
    setPriorityFilter('all');
    setKpiFilterMode('none');
    setSearchQuery('');
    setDateRangeFilter({ from: null, to: null });
    setQuickDateFilter('all');
  }, []);

  const handleDateRangeChangeWrapper = useCallback((range: { from?: Date | null; to?: Date | null }) => {
    setDateRangeFilter({ from: range.from || null, to: range.to || null });
  }, []);

  const handleEditLeadFromRow = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    setIsEditDialogOpen(true);
  }, []);

  const handleDeleteLead = useCallback((lead: Lead) => {
    if (confirm(`Are you sure you want to delete lead #${lead.leadId}?`)) {
      setLeads((prevLeads) => prevLeads.filter((l) => l.id !== lead.id));
    }
  }, []);

  const handleConvertLead = useCallback((lead: Lead) => {
    // Convert to project
  }, []);

  const handleConvertToCustomer = useCallback((lead: Lead) => {
    // Duplicate prevention: Check if lead already has customerId
    if (lead.customerId) {
      alert('This lead has already been converted to a customer.');
      return;
    }

    setSelectedLead(lead);
    setIsConvertToCustomerDialogOpen(true);
  }, []);

  const handleCustomerCreated = useCallback((customer: any) => {
    // Update lead with customerId and status
    setLeads((prevLeads) =>
      prevLeads.map((l) =>
        l.id === selectedLead?.id
          ? {
              ...l,
              customerId: customer.id,
              status: 'Converted' as LeadStatus,
              convertedDate: new Date(),
              updatedAt: new Date(),
            }
          : l
      )
    );
    setIsConvertToCustomerDialogOpen(false);
    setSelectedLead(null);
  }, [selectedLead]);

  const handleAddScore = useCallback((lead: Lead, score: number) => {
    // Add score to lead
  }, []);

  const handleStatusChange = useCallback((lead: Lead, status: LeadStatus) => {
    setLeads((prevLeads) => {
      const newLeads = prevLeads.map((l) => {
        if (l.id === lead.id || l.leadId === lead.leadId) {
          return { ...l, status, updatedAt: new Date() };
        }
        return l;
      });
      return newLeads;
    });
  }, []);

  const handleBulkDelete = useCallback(() => {
    if (confirm(`Delete ${selectedRows.size} selected leads?`)) {
      setLeads((prevLeads) => prevLeads.filter((l) => !selectedRows.has(l.id)));
      setSelectedRows(new Set());
    }
  }, [selectedRows]);

  const handleBulkStatusChange = useCallback((status: LeadStatus) => {
    setLeads((prevLeads) =>
      prevLeads.map((l) =>
        selectedRows.has(l.id) ? { ...l, status, updatedAt: new Date() } : l
      )
    );
    setSelectedRows(new Set());
  }, [selectedRows]);

  return (
    <MainLayout title="Leads" subtitle="Manage customer enquiries and PEB requirements">
      <div className="space-y-4">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className={cn(componentTextSizes.pageHeader.title, 'font-bold')}>Leads</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsCreateDialogOpen(true)} className="h-9">
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>

            {/* View Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => handleViewModeChange('table')}
                className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  viewMode === 'table'
                    ? 'bg-background shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LayoutList className="h-4 w-4" />
                <span className="hidden sm:inline">Table</span>
              </button>
              <button
                onClick={() => handleViewModeChange('kanban')}
                className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-background shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="hidden sm:inline">Kanban</span>
              </button>
              <button
                onClick={() => handleViewModeChange('calendar')}
                className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  viewMode === 'calendar'
                    ? 'bg-background shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <CalendarDays className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <KPICard
            data={{
              title: 'Total Leads',
              value: leads.length,
              change: 0,
              icon: <Plus />,
              color: 'text-blue-500'
            }}
            onClick={() => handleKpiCardClick('all')}
          />
          <KPICard
            data={{
              title: 'New Leads',
              value: leads.filter(l => l.status === 'New').length,
              change: 0,
              icon: <Calendar />,
              color: 'text-green-500'
            }}
            onClick={() => handleKpiCardClick('New')}
          />
          <KPICard
            data={{
              title: 'In Progress',
              value: leads.filter(l =>
                ['Contacted', 'Design Pending', 'BOQ Pending', 'Estimate Sent', 'Proposal Sent', 'Negotiation'].includes(l.status)
              ).length,
              change: 0,
              icon: <RefreshCw />,
              color: 'text-yellow-500'
            }}
            onClick={() => handleKpiCardClick('in-progress')}
          />
          <KPICard
            data={{
              title: 'Converted',
              value: leads.filter(l => l.status === 'Converted').length,
              change: 0,
              icon: <Filter />,
              color: 'text-emerald-500'
            }}
            onClick={() => handleKpiCardClick('Converted')}
          />
        </div>

        {/* Consolidated Filter Box */}
        <ConsolidatedFilterBox
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search by customer name, company, mobile number, or lead ID..."
          filters={filterConfigs}
          onClearFilters={handleClearFilters}
          dateRange={dateRangeFilter}
          onDateRangeChange={handleDateRangeChangeWrapper}
          onExport={handleExport}
          onImport={handleImport}
          onColumns={() => setIsCustomColumnDialogOpen(true)}
        />

          {/* Data Table / Kanban / Calendar View */}
          {viewMode === 'kanban' ? (
            <KanbanBoard
              leads={filteredLeads}
              onLeadUpdate={handleLeadUpdate}
              onLeadsReorder={handleLeadsReorder}
              onAddLead={() => setIsCreateDialogOpen(true)}
            />
          ) : viewMode === 'calendar' ? (
            <LeadCalendarView
              leads={filteredLeads}
              onLeadClick={handleRowClick}
            />
          ) : (
            <div className="min-w-0">
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
                data={paginatedLeads}
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

              {/* Lazy Loading - Load More Button */}
              {filteredLeads.length > currentPage * itemsPerPage && (
                <div className="flex justify-center mt-4">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : `Load More (${filteredLeads.length - currentPage * itemsPerPage} remaining)`}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

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
          {selectedLead ? (
            <LeadForm
              initialData={selectedLead as Partial<Lead>}
              onSubmit={handleEditLead}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      {/* View Lead Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lead ID</p>
                  <p className="text-lg font-semibold">{selectedLead!.leadId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={
                    selectedLead!.status === 'New' ? 'info' :
                    selectedLead!.status === 'Contacted' ? 'warning' :
                    selectedLead!.status === 'Converted' || selectedLead!.status === 'Approved' ? 'success' :
                    selectedLead!.status === 'Rejected' ? 'destructive' :
                    'secondary'
                  }>{selectedLead!.status}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer Name</p>
                  <p className="text-lg font-semibold">{selectedLead!.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company</p>
                  <p className="text-lg font-semibold">{selectedLead!.companyName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mobile</p>
                  <p className="text-lg font-semibold">{selectedLead!.mobile}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-lg font-semibold">{selectedLead!.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">City</p>
                  <p className="text-lg font-semibold">{selectedLead!.city}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">State</p>
                  <p className="text-lg font-semibold">{selectedLead!.state}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Project Title</p>
                  <p className="text-lg font-semibold">{selectedLead!.projectTitle}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Project Type</p>
                  <p className="text-lg font-semibold">{selectedLead!.projectType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Structure Type</p>
                  <p className="text-lg font-semibold">{selectedLead!.structureType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Priority</p>
                  <Badge variant={
                    selectedLead!.priority === 'Urgent' ? 'destructive' :
                    selectedLead!.priority === 'High' ? 'warning' :
                    selectedLead!.priority === 'Medium' ? 'info' :
                    'secondary'
                  }>{selectedLead!.priority}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                  <p className="text-lg font-semibold">{selectedLead!.assignedEmployee}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Source</p>
                  <p className="text-lg font-semibold">{selectedLead!.source}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created Date</p>
                  <p className="text-lg font-semibold">{new Date(selectedLead!.createdDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Next Follow-up</p>
                  <p className="text-lg font-semibold">{selectedLead!.nextFollowUpDate ? new Date(selectedLead!.nextFollowUpDate || '').toLocaleDateString() : '-'}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setIsViewDialogOpen(false);
                  setIsEditDialogOpen(true);
                }}>
                  Edit
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Custom Columns Dialog */}
      <Dialog open={isCustomColumnDialogOpen} onOpenChange={setIsCustomColumnDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Custom Columns</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Column Key</label>
              <input
                type="text"
                placeholder="e.g., customField1"
                className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                id="customColumnKey"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Column Label</label>
              <input
                type="text"
                placeholder="e.g., Custom Field 1"
                className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                id="customColumnLabel"
              />
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setIsCustomColumnDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                const keyInput = document.getElementById('customColumnKey') as HTMLInputElement;
                const labelInput = document.getElementById('customColumnLabel') as HTMLInputElement;
                if (keyInput?.value && labelInput?.value) {
                  handleAddCustomColumn(keyInput.value, labelInput.value);
                  keyInput.value = '';
                  labelInput.value = '';
                }
              }}>
                Add Column
              </Button>
            </div>
            {customColumns.length > 0 && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Existing Custom Columns</p>
                <div className="space-y-2">
                  {customColumns.map((col) => (
                    <div key={col.key} className="flex items-center justify-between p-2 border rounded-md">
                      <span className="text-sm">{col.label} ({col.key})</span>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveCustomColumn(col.key)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Lead to Customer Conversion Dialog */}
      {selectedLead ? (
        <LeadToCustomerConversionDialog
          open={isConvertToCustomerDialogOpen}
          onOpenChange={setIsConvertToCustomerDialogOpen}
          lead={selectedLead!}
          onCustomerCreated={handleCustomerCreated}
        />
      ) : null}
    </MainLayout>
  );
}
