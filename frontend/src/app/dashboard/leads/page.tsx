'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
import { StandardPageLayout } from '@/components/layout/StandardPageLayout';
import { FilterConfig } from '@/components/layout/FilterBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LeadViewDrawer } from '@/features/leads/components/LeadViewDrawer';

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
import { Lead, LeadStatus, LeadPriority, LeadActivity } from '@/types/leads';
import { mockLeads, getLeadActivities } from '@/features/leads/data/mockLeads';
import { useLeadConfiguration } from '@/features/leads/hooks/useLeads';
import { getLeadCustomFieldValue } from '@/features/leads/components/LeadCustomFields';
import {
  Plus,
  Download,
  RefreshCw,
  Trash2,
  CheckCircle,
  Send,
  FileText,
  LayoutList,
  Grid3X3,
  CalendarDays,
  Upload,
  Users,
  Sparkles,
} from 'lucide-react';

const statusBadge = (value: LeadStatus) => (
  <Badge
    variant={
      value === 'New' ? 'info' :
      value === 'Contacted' ? 'warning' :
      value === 'Converted' || value === 'Approved' ? 'success' :
      value === 'Rejected' ? 'destructive' :
      'secondary'
    }
    className="text-[10px] sm:text-xs whitespace-nowrap"
  >
    {value}
  </Badge>
);

const priorityBadge = (value: LeadPriority) => (
  <Badge
    variant={
      value === 'Urgent' ? 'destructive' :
      value === 'High' ? 'warning' :
      value === 'Medium' ? 'info' :
      'secondary'
    }
    className="text-[10px] sm:text-xs whitespace-nowrap"
  >
    {value}
  </Badge>
);

// Move baseColumns outside component to prevent recreation on every render
const baseColumns = [
  {
    key: 'leadId' as const,
    label: 'ID',
    sortable: true,
    className: 'w-[72px] min-w-[72px]',
    render: (value: number) => <span className="font-mono text-xs text-muted-foreground">#{value}</span>,
  },
  {
    key: 'customerName' as const,
    label: 'Customer',
    sortable: true,
    className: 'min-w-[140px] max-w-[180px]',
    render: (_: string, row: Lead) => (
      <div className="min-w-0">
        <p className="font-medium text-sm truncate">{row.customerName}</p>
        <p className="text-xs text-muted-foreground truncate">{row.companyName}</p>
      </div>
    ),
  },
  {
    key: 'companyName' as const,
    label: 'Company',
    sortable: true,
    className: 'min-w-[120px] max-w-[160px] hidden xl:table-cell',
    headerClassName: 'hidden xl:table-cell',
    render: (value: string) => <span className="text-xs truncate block">{value}</span>,
  },
  {
    key: 'mobile' as const,
    label: 'Mobile',
    className: 'min-w-[110px] whitespace-nowrap',
    render: (value: string) => <span className="text-xs">{value}</span>,
  },
  {
    key: 'city' as const,
    label: 'Location',
    className: 'min-w-[120px] max-w-[150px]',
    render: (_: unknown, row: Lead) => (
      <span className="text-xs truncate block">{row.city}, {row.state}</span>
    ),
  },
  {
    key: 'projectType' as const,
    label: 'Project',
    filterable: true,
    className: 'min-w-[100px] max-w-[130px] hidden lg:table-cell',
    headerClassName: 'hidden lg:table-cell',
    render: (value: string) => <span className="text-xs truncate block">{value}</span>,
  },
  {
    key: 'structureType' as const,
    label: 'Structure',
    filterable: true,
    className: 'min-w-[100px] max-w-[130px] hidden lg:table-cell',
    headerClassName: 'hidden lg:table-cell',
    render: (value: string) => <span className="text-xs truncate block">{value}</span>,
  },
  {
    key: 'width' as const,
    label: 'Area',
    className: 'min-w-[72px] whitespace-nowrap hidden md:table-cell',
    headerClassName: 'hidden md:table-cell',
    render: (_: unknown, row: Lead) => (
      <span className="text-xs tabular-nums">{(row.width || 0) * (row.length || 0)}</span>
    ),
  },
  {
    key: 'status' as const,
    label: 'Status',
    sortable: true,
    className: 'min-w-[96px]',
    render: (value: LeadStatus) => statusBadge(value),
  },
  {
    key: 'converted' as const,
    label: 'Converted',
    className: 'min-w-[80px] hidden md:table-cell',
    headerClassName: 'hidden md:table-cell',
    render: (_: unknown, row: Lead) => (
      <Badge variant={row.customerId ? 'success' : 'secondary'} className="text-[10px] sm:text-xs">
        {row.customerId ? 'Yes' : 'No'}
      </Badge>
    ),
  },
  {
    key: 'assignedEmployee' as const,
    label: 'Assigned',
    className: 'min-w-[110px] max-w-[140px] hidden xl:table-cell',
    headerClassName: 'hidden xl:table-cell',
    render: (value: string | undefined) => (
      <span className="text-xs truncate block">{value || '-'}</span>
    ),
  },
  {
    key: 'priority' as const,
    label: 'Priority',
    sortable: true,
    className: 'min-w-[88px]',
    render: (value: LeadPriority) => priorityBadge(value),
  },
  {
    key: 'score' as const,
    label: 'Score',
    sortable: true,
    className: 'min-w-[56px] hidden sm:table-cell',
    headerClassName: 'hidden sm:table-cell',
    render: (value: number | undefined) => (
      <span className="text-xs tabular-nums font-medium">{value ?? '-'}</span>
    ),
  },
  {
    key: 'createdDate' as const,
    label: 'Created',
    sortable: true,
    className: 'min-w-[88px] whitespace-nowrap hidden lg:table-cell',
    headerClassName: 'hidden lg:table-cell',
    render: (value: Date) => {
      if (!value) return '-';
      return (
        <span className="text-xs tabular-nums">
          {new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
        </span>
      );
    },
  },
  {
    key: 'nextFollowUpDate' as const,
    label: 'Follow-up',
    className: 'min-w-[88px] whitespace-nowrap hidden xl:table-cell',
    headerClassName: 'hidden xl:table-cell',
    render: (value: Date) => {
      if (!value) return '-';
      return (
        <span className="text-xs tabular-nums">
          {new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
        </span>
      );
    },
  },
];

export default function LeadsPage() {
  const router = useRouter();
  const leadConfig = useLeadConfiguration();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>('all');
  const [structureTypeFilter, setStructureTypeFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [assignedEmployeeFilter, setAssignedEmployeeFilter] = useState<string>('all');
  const [kpiFilterMode, setKpiFilterMode] = useState<string>('none');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [isConvertToCustomerDialogOpen, setIsConvertToCustomerDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [viewMode, setViewMode] = useState<'table' | 'kanban' | 'calendar'>('table');
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [leadActivities, setLeadActivities] = useState<Record<string, LeadActivity[]>>({});
  const [customColumns, setCustomColumns] = useState<Array<{key: string, label: string}>>([]);
  const [isCustomColumnDialogOpen, setIsCustomColumnDialogOpen] = useState(false);
  const [quickDateFilter, setQuickDateFilter] = useState<string>('all');

  const inProgressStatuses = useMemo(
    () => new Set(leadConfig.statuses.filter((s) => !['New', 'Approved', 'Rejected', 'Converted'].includes(s))),
    [leadConfig.statuses]
  );

  // Combine lead stats and KPI data computation to reduce re-renders
  const { leadStats, kpiData } = useMemo(() => {
    let newCount = 0;
    let inProgress = 0;
    let converted = 0;
    for (const lead of leads) {
      if (lead.status === 'New') newCount++;
      if (lead.status === 'Converted') converted++;
      if (inProgressStatuses.has(lead.status)) inProgress++;
    }
    const stats = { total: leads.length, newCount, inProgress, converted };
    
    const kpi = [
      {
        title: 'Total Leads',
        value: String(stats.total),
        change: 0,
        icon: <Users className="h-5 w-5 text-blue-600" />,
        color: 'text-blue-600',
      },
      {
        title: 'New Leads',
        value: String(stats.newCount),
        change: 0,
        icon: <Sparkles className="h-5 w-5 text-green-600" />,
        color: 'text-green-600',
      },
      {
        title: 'In Progress',
        value: String(stats.inProgress),
        change: 0,
        icon: <RefreshCw className="h-5 w-5 text-amber-600" />,
        color: 'text-amber-600',
      },
      {
        title: 'Converted',
        value: String(stats.converted),
        change: 0,
        icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
        color: 'text-emerald-600',
      },
    ];
    
    return { leadStats: stats, kpiData: kpi };
  }, [leads, inProgressStatuses]);

  const leadFilterOptions = useMemo(() => {
    const cities = new Set<string>();
    const projectTypes = new Set<string>();
    const structureTypes = new Set<string>();
    const sources = new Set<string>();
    const assignedEmployees = new Set<string>();
    for (const lead of leads) {
      if (lead.city) cities.add(lead.city);
      if (lead.projectType) projectTypes.add(lead.projectType);
      if (lead.structureType) structureTypes.add(lead.structureType);
      if (lead.source) sources.add(lead.source);
      if (lead.assignedEmployee) assignedEmployees.add(lead.assignedEmployee);
    }
    return {
      cities: [...cities].sort(),
      projectTypes: [...projectTypes].sort(),
      structureTypes: [...structureTypes].sort(),
      sources: [...sources].sort(),
      assignedEmployees: [...assignedEmployees].sort(),
    };
  }, [leads]);

  const selectedLead = useMemo(
    () => (selectedLeadId ? leads.find((l) => l.id === selectedLeadId) ?? null : null),
    [leads, selectedLeadId]
  );

  const viewedLead = selectedLead;

  const viewedLeadActivities = useMemo(() => {
    if (!viewedLead) return [];
    return leadActivities[viewedLead.id] ?? getLeadActivities(viewedLead.id, viewedLead);
  }, [viewedLead, leadActivities]);

  const appendActivity = useCallback((leadId: string, activity: Omit<LeadActivity, 'id' | 'leadId'>) => {
    const newActivity: LeadActivity = {
      ...activity,
      id: `${leadId}-${Date.now()}`,
      leadId,
    };
    setLeadActivities((prev) => ({
      ...prev,
      [leadId]: [newActivity, ...(prev[leadId] ?? getLeadActivities(leadId))],
    }));
  }, []);

  // Filter leads based on status, priority, and date filters
  const filteredLeads = useMemo(() => leads.filter(lead => {
    const matchesSearch = debouncedSearch === '' ||
      lead.customerName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      lead.mobile.includes(debouncedSearch) ||
      lead.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      lead.city.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      lead.state.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (lead.projectTitle?.toLowerCase().includes(debouncedSearch.toLowerCase()) ?? false) ||
      lead.leadId.toString().includes(debouncedSearch);

    let matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    // Handle KPI filter mode for in-progress
    if (kpiFilterMode === 'in-progress') {
      matchesStatus = inProgressStatuses.has(lead.status);
    }
    const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;
    const matchesCity = cityFilter === 'all' || lead.city === cityFilter;
    const matchesProjectType = projectTypeFilter === 'all' || lead.projectType === projectTypeFilter;
    const matchesStructureType = structureTypeFilter === 'all' || lead.structureType === structureTypeFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    const matchesAssignedEmployee = assignedEmployeeFilter === 'all' || lead.assignedEmployee === assignedEmployeeFilter;

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

    return matchesSearch && matchesStatus && matchesPriority && matchesCity &&
      matchesProjectType && matchesStructureType && matchesSource && matchesAssignedEmployee && matchesDate;
  }), [leads, debouncedSearch, statusFilter, priorityFilter, cityFilter, projectTypeFilter, structureTypeFilter, sourceFilter, assignedEmployeeFilter, kpiFilterMode, quickDateFilter, inProgressStatuses]);

  const tableFilterKey = useMemo(
    () =>
      [debouncedSearch, statusFilter, priorityFilter, cityFilter, projectTypeFilter, structureTypeFilter, sourceFilter, assignedEmployeeFilter, kpiFilterMode, quickDateFilter].join('|'),
    [debouncedSearch, statusFilter, priorityFilter, cityFilter, projectTypeFilter, structureTypeFilter, sourceFilter, assignedEmployeeFilter, kpiFilterMode, quickDateFilter]
  );

  const customColumnDefs = useMemo(() => customColumns.map(col => ({
    key: col.key as any,
    label: col.label,
    sortable: true,
    render: (value: any, row: Lead) => value ?? getLeadCustomFieldValue(row, col.key)?.toString() ?? '-'
  })), [customColumns]);

  const settingsCustomColumnDefs = useMemo(() => {
    const manualKeys = new Set(customColumns.map((c) => c.key));
    return leadConfig.customFields
      .filter((field) => !manualKeys.has(field.key))
      .map((field) => ({
        key: field.key as any,
        label: field.label,
        sortable: true,
        className: 'min-w-[100px] max-w-[130px] hidden 2xl:table-cell',
        headerClassName: 'hidden 2xl:table-cell',
        render: (_: unknown, row: Lead) => (
          <span className="text-xs truncate block">
            {getLeadCustomFieldValue(row, field.key)?.toString() ?? '-'}
          </span>
        ),
      }));
  }, [leadConfig.customFields, customColumns]);

  const columns = useMemo(
    () => [...baseColumns, ...settingsCustomColumnDefs, ...customColumnDefs],
    [settingsCustomColumnDefs, customColumnDefs]
  );

  const handleCreateLead = useCallback((data: Partial<Lead>) => {
    const newLeadId = `lead-${Date.now()}`;
    setLeads(prevLeads => {
      const maxLeadId = prevLeads.length > 0 ? Math.max(...prevLeads.map(l => l.leadId)) : 0;
      const newLead: Lead = {
        ...data,
        id: newLeadId,
        leadId: maxLeadId + 1,
        createdDate: new Date(),
        createdAt: new Date(),
        status: data.status || 'New',
      } as Lead;
      return [...prevLeads, newLead];
    });
    appendActivity(newLeadId, {
      type: 'created',
      description: 'Lead created',
      performedBy: 'Current User',
      performedAt: new Date(),
    });
    setIsCreateDialogOpen(false);
  }, [appendActivity]);

  const handleEditLead = useCallback((data: Partial<Lead> | Lead) => {
    if ('id' in data && data.id) {
      const updatedLead = { ...data, updatedAt: new Date() } as Lead;
      setLeads((prevLeads) =>
        prevLeads.map((l) => (l.id === data.id ? { ...l, ...updatedLead } : l))
      );
      appendActivity(data.id, {
        type: 'updated',
        description: 'Lead details updated',
        performedBy: 'Current User',
        performedAt: new Date(),
      });
    }
    setIsEditDialogOpen(false);
  }, [appendActivity]);

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
    setSelectedLeadId(lead.id);
    setIsViewDrawerOpen(true);
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
    const headers = [
      'Lead ID', 'Customer Name', 'Company', 'Mobile', 'Alternate Mobile', 'Email', 'GST Number',
      'Address', 'City', 'State', 'Pincode', 'Project Title', 'Project Type', 'Structure Type',
      'Width', 'Length', 'Height', 'Bay Spacing', 'Roof Type', 'Crane Required', 'Crane Capacity',
      'Mezzanine', 'Wall Type', 'Insulation Required', 'Material Preference',
      'Site Location', 'Site Address', 'Map Coordinates', 'Soil Notes',
      'Customer Notes', 'Special Requirement', 'Status', 'Priority', 'Score', 'Assigned To', 'Source',
      'Created Date', 'Next Follow-up', 'Remarks'
    ];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        lead.leadId,
        `"${lead.customerName}"`,
        `"${lead.companyName}"`,
        lead.mobile,
        lead.alternateMobile || '',
        lead.email,
        lead.gstNumber || '',
        `"${(lead.address || '').replace(/"/g, '""')}"`,
        lead.city,
        lead.state,
        lead.pincode || '',
        `"${(lead.projectTitle || '').replace(/"/g, '""')}"`,
        lead.projectType,
        lead.structureType,
        lead.width ?? '',
        lead.length ?? '',
        lead.height ?? '',
        lead.baySpacing ?? '',
        lead.roofType || '',
        lead.craneRequired ?? '',
        lead.craneCapacity ?? '',
        lead.mezzanine ?? '',
        lead.wallType || '',
        lead.insulationRequired ?? '',
        lead.materialPreference || '',
        `"${(lead.siteLocation || '').replace(/"/g, '""')}"`,
        `"${(lead.siteAddress || '').replace(/"/g, '""')}"`,
        lead.mapCoordinates || '',
        `"${(lead.soilNotes || '').replace(/"/g, '""')}"`,
        `"${(lead.customerNotes || '').replace(/"/g, '""')}"`,
        `"${(lead.specialRequirement || '').replace(/"/g, '""')}"`,
        lead.status,
        lead.priority,
        lead.score ?? '',
        lead.assignedEmployee || '',
        lead.source,
        new Date(lead.createdDate).toLocaleDateString(),
        lead.nextFollowUpDate ? new Date(lead.nextFollowUpDate).toLocaleDateString() : '',
        `"${(lead.remarks || '').replace(/"/g, '""')}"`,
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
    URL.revokeObjectURL(url);
  }, [leads]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          const lines = text.split('\n').filter((line) => line.trim());
          if (lines.length < 2) {
            alert('Import failed: CSV file is empty or has no data rows.');
            return;
          }
          const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
          const newLeads: Lead[] = [];
          let skipped = 0;

          for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
            const lead: Partial<Lead> = {};
            headers.forEach((header, index) => {
              const key = header.trim();
              const value = values[index]?.trim();
              if (!value) return;

              if (key === 'Lead ID') lead.leadId = parseInt(value);
              else if (key === 'Customer Name') lead.customerName = value;
              else if (key === 'Company') lead.companyName = value;
              else if (key === 'Mobile') lead.mobile = value;
              else if (key === 'Alternate Mobile') lead.alternateMobile = value;
              else if (key === 'Email') lead.email = value;
              else if (key === 'GST Number') lead.gstNumber = value;
              else if (key === 'Address') lead.address = value;
              else if (key === 'City') lead.city = value;
              else if (key === 'State') lead.state = value;
              else if (key === 'Pincode') lead.pincode = value;
              else if (key === 'Project Title') lead.projectTitle = value;
              else if (key === 'Project Type') lead.projectType = value as any;
              else if (key === 'Structure Type') lead.structureType = value as any;
              else if (key === 'Status') lead.status = value as LeadStatus;
              else if (key === 'Priority') lead.priority = value as LeadPriority;
              else if (key === 'Score') lead.score = parseInt(value);
              else if (key === 'Assigned To') lead.assignedEmployee = value;
              else if (key === 'Source') lead.source = value as any;
              else if (key === 'Width') lead.width = parseFloat(value);
              else if (key === 'Length') lead.length = parseFloat(value);
              else if (key === 'Height') lead.height = parseFloat(value);
              else if (key === 'Bay Spacing') lead.baySpacing = parseFloat(value);
              else if (key === 'Roof Type') lead.roofType = value as any;
              else if (key === 'Wall Type') lead.wallType = value as any;
              else if (key === 'Material Preference') lead.materialPreference = value as any;
              else if (key === 'Site Location') lead.siteLocation = value;
              else if (key === 'Site Address') lead.siteAddress = value;
              else if (key === 'Map Coordinates') lead.mapCoordinates = value;
              else if (key === 'Soil Notes') lead.soilNotes = value;
              else if (key === 'Customer Notes') lead.customerNotes = value;
              else if (key === 'Special Requirement') lead.specialRequirement = value;
              else if (key === 'Remarks') lead.remarks = value;
              else (lead as any)[key] = value;
            });

            if (!lead.customerName || !lead.mobile || !lead.email) {
              skipped++;
              continue;
            }

            const uniqueId = `import-${Date.now()}-${newLeads.length}`;
            newLeads.push({
              ...lead,
              id: uniqueId,
              leadId: lead.leadId || Date.now() + newLeads.length,
              createdDate: new Date(),
              status: lead.status || 'New',
              priority: lead.priority || 'Medium',
              source: lead.source || 'Other',
              projectType: lead.projectType || 'Factory',
              structureType: lead.structureType || 'PEB',
              city: lead.city || '',
              state: lead.state || '',
              companyName: lead.companyName || lead.customerName,
              email: lead.email || '',
            } as Lead);
          }

          if (newLeads.length === 0) {
            alert(`Import failed: No valid rows. ${skipped} row(s) skipped (missing customer name, mobile, or email).`);
            return;
          }

          setLeads((prevLeads) => [...prevLeads, ...newLeads]);
          if (skipped > 0) {
            alert(`Imported ${newLeads.length} lead(s). ${skipped} row(s) skipped due to missing required fields.`);
          }
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

  const handleQuickDateFilterChange = useCallback((filter: string) => {
    setQuickDateFilter(filter);
  }, []);

  const handleViewModeChange = useCallback((mode: 'table' | 'kanban' | 'calendar') => {
    setViewMode(mode);
    setSelectedRows(new Set());
  }, []);

  const filterConfigs: FilterConfig[] = useMemo(() => [
    {
      key: 'status',
      label: 'Status',
      value: statusFilter,
      onChange: setStatusFilter,
      options: [{ value: 'all', label: 'All Status' }, ...leadConfig.statuses.map(s => ({ value: s, label: s }))],
    },
    {
      key: 'priority',
      label: 'Priority',
      value: priorityFilter,
      onChange: setPriorityFilter,
      options: [{ value: 'all', label: 'All Priority' }, ...leadConfig.priorities.map(p => ({ value: p, label: p }))],
    },
    {
      key: 'source',
      label: 'Source',
      value: sourceFilter,
      onChange: setSourceFilter,
      options: [{ value: 'all', label: 'All Sources' }, ...leadFilterOptions.sources.map(s => ({ value: s, label: s }))],
    },
    {
      key: 'createdDate',
      label: 'Created',
      value: quickDateFilter,
      onChange: handleQuickDateFilterChange,
      options: [
        { value: 'all', label: 'All Dates' },
        { value: 'today', label: 'Today' },
        { value: 'tomorrow', label: 'Tomorrow' },
        { value: 'this_week', label: 'This Week' },
        { value: 'this_month', label: 'This Month' },
        { value: 'this_year', label: 'This Year' },
      ],
    },
    {
      key: 'city',
      label: 'City',
      value: cityFilter,
      onChange: setCityFilter,
      options: [{ value: 'all', label: 'All Cities' }, ...leadFilterOptions.cities.map(c => ({ value: c, label: c }))],
    },
    {
      key: 'projectType',
      label: 'Project Type',
      value: projectTypeFilter,
      onChange: setProjectTypeFilter,
      options: [{ value: 'all', label: 'All Types' }, ...leadFilterOptions.projectTypes.map(p => ({ value: p, label: p }))],
    },
    {
      key: 'structureType',
      label: 'Structure Type',
      value: structureTypeFilter,
      onChange: setStructureTypeFilter,
      options: [{ value: 'all', label: 'All Structures' }, ...leadFilterOptions.structureTypes.map(s => ({ value: s, label: s }))],
    },
    {
      key: 'assignedEmployee',
      label: 'Assigned To',
      value: assignedEmployeeFilter,
      onChange: setAssignedEmployeeFilter,
      options: [{ value: 'all', label: 'All Employees' }, ...leadFilterOptions.assignedEmployees.map(e => ({ value: e, label: e }))],
    },
  ], [statusFilter, priorityFilter, cityFilter, projectTypeFilter, structureTypeFilter, sourceFilter, assignedEmployeeFilter, quickDateFilter, leadFilterOptions, leadConfig.statuses, leadConfig.priorities, handleQuickDateFilterChange]);

  const handleClearFilters = useCallback(() => {
    setStatusFilter('all');
    setPriorityFilter('all');
    setCityFilter('all');
    setProjectTypeFilter('all');
    setStructureTypeFilter('all');
    setSourceFilter('all');
    setAssignedEmployeeFilter('all');
    setKpiFilterMode('none');
    setSearchQuery('');
    setQuickDateFilter('all');
  }, []);

  const handleEditLeadFromRow = useCallback((lead: Lead) => {
    setSelectedLeadId(lead.id);
    setIsEditDialogOpen(true);
  }, []);

  const handleDeleteLead = useCallback((lead: Lead) => {
    if (confirm(`Are you sure you want to delete lead #${lead.leadId}?`)) {
      setLeads((prevLeads) => prevLeads.filter((l) => l.id !== lead.id));
    }
  }, []);

  const handleConvertLead = useCallback((lead: Lead) => {
    if (!lead.customerId) {
      alert('This lead has not been converted to a customer yet. Please convert the lead to a customer first.');
      return;
    }
    sessionStorage.setItem('convertFromLead', JSON.stringify(lead));
    router.push(`/dashboard/projects?create=true&customerId=${lead.customerId}`);
  }, [router]);

  const handleConvertToCustomer = useCallback((lead: Lead) => {
    // Duplicate prevention: Check if lead already has customerId
    if (lead.customerId) {
      alert('This lead has already been converted to a customer.');
      return;
    }

    setSelectedLeadId(lead.id);
    setIsConvertToCustomerDialogOpen(true);
  }, []);

  const handleCustomerCreated = useCallback((customer: any) => {
    setLeads((prevLeads) =>
      prevLeads.map((l) =>
        l.id === selectedLeadId
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
    if (selectedLeadId) {
      appendActivity(selectedLeadId, {
        type: 'converted',
        description: 'Lead converted to customer',
        performedBy: 'Current User',
        performedAt: new Date(),
        metadata: { customerId: customer.id },
      });
    }
    setIsConvertToCustomerDialogOpen(false);
    setSelectedLeadId(null);
  }, [selectedLeadId, appendActivity]);

  const handleEditFromDrawer = useCallback((lead: Lead) => {
    setSelectedLeadId(lead.id);
    setIsViewDrawerOpen(false);
    setIsEditDialogOpen(true);
  }, []);

  const handleAddScore = useCallback((lead: Lead, score: number) => {
    setLeads((prevLeads) =>
      prevLeads.map((l) =>
        l.id === lead.id ? { ...l, score, updatedAt: new Date() } : l
      )
    );
    appendActivity(lead.id, {
      type: 'updated',
      description: `Lead score updated to ${score}`,
      performedBy: 'Current User',
      performedAt: new Date(),
      metadata: { score },
    });
  }, [appendActivity]);

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
    appendActivity(lead.id, {
      type: 'status_changed',
      description: `Status changed to ${status}`,
      performedBy: 'Current User',
      performedAt: new Date(),
      metadata: { oldStatus: lead.status, newStatus: status },
    });
  }, [appendActivity]);

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

  const viewToggle = (
    <div className="flex items-center bg-card-hover rounded-lg p-1">
      <button
        type="button"
        onClick={() => handleViewModeChange('table')}
        className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
          viewMode === 'table'
            ? 'bg-card shadow-sm text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <LayoutList className="h-4 w-4" />
        <span className="hidden sm:inline">Table</span>
      </button>
      <button
        type="button"
        onClick={() => handleViewModeChange('kanban')}
        className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
          viewMode === 'kanban'
            ? 'bg-card shadow-sm text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Grid3X3 className="h-4 w-4" />
        <span className="hidden sm:inline">Kanban</span>
      </button>
      <button
        type="button"
        onClick={() => handleViewModeChange('calendar')}
        className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
          viewMode === 'calendar'
            ? 'bg-card shadow-sm text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <CalendarDays className="h-4 w-4" />
        <span className="hidden sm:inline">Calendar</span>
      </button>
    </div>
  );

  return (
    <MainLayout>
      <StandardPageLayout
        title="Leads"
        subtitle="Manage customer enquiries and PEB requirements"
        headerActions={
          <div className="flex flex-wrap items-center justify-end gap-2">
            {viewToggle}
            <Button onClick={() => setIsCreateDialogOpen(true)} className="h-9">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Lead</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        }
        kpiCards={
          <>
            <KPICard data={kpiData[0]} onClick={() => handleKpiCardClick('all')} />
            <KPICard data={kpiData[1]} onClick={() => handleKpiCardClick('New')} />
            <KPICard data={kpiData[2]} onClick={() => handleKpiCardClick('in-progress')} />
            <KPICard data={kpiData[3]} onClick={() => handleKpiCardClick('Converted')} />
          </>
        }
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search leads by name, company, mobile, email, or ID..."
        filters={filterConfigs}
        onClearFilters={handleClearFilters}
        filterMode="popover"
        toolbarActions={
          <>
            <Button variant="outline" size="sm" onClick={handleExport} className="h-9 gap-1.5 text-xs">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleImport} className="h-9 gap-1.5 text-xs">
              <Upload className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Import</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsCustomColumnDialogOpen(true)} className="h-9 gap-1.5 text-xs">
              <FileText className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Columns</span>
            </Button>
          </>
        }
        className="gap-4 sm:gap-6"
      >
        {viewMode === 'kanban' ? (
          <KanbanBoard
            leads={filteredLeads}
            pipelineStages={leadConfig.statuses as LeadStatus[]}
            onLeadUpdate={handleLeadUpdate}
            onLeadsReorder={handleLeadsReorder}
          />
        ) : viewMode === 'calendar' ? (
          <LeadCalendarView leads={filteredLeads} onLeadClick={handleRowClick} />
        ) : (
          <div className="min-w-0">
            {selectedRows.size > 0 && (
              <Card className="bg-card-hover border-dashed mb-3 sm:mb-4">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-sm font-medium">{selectedRows.size} lead(s) selected</p>
                    <div className="flex flex-wrap gap-2">
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
              key={tableFilterKey}
              columns={columns}
              data={filteredLeads}
              showToolbar={false}
              compact
              onRowClick={handleRowClick}
              enableSelection={true}
              selectedRows={selectedRows}
              onSelectionChange={setSelectedRows}
              rowIdKey="id"
              emptyMessage="No leads found. Adjust your filters or add a new lead."
              rowActions={(row) => (
                <LeadRowActions
                  lead={row as Lead}
                  statusOptions={leadConfig.statuses as LeadStatus[]}
                  onEdit={handleEditLeadFromRow}
                  onDelete={handleDeleteLead}
                  onConvert={handleConvertLead}
                  onConvertToCustomer={handleConvertToCustomer}
                  onAddScore={handleAddScore}
                  onStatusChange={handleStatusChange}
                />
              )}
            />

          </div>
        )}
      </StandardPageLayout>

      {/* Create Lead Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Lead</DialogTitle>
          </DialogHeader>
          <LeadForm
            configuration={leadConfig}
            existingLeads={leads}
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
              configuration={leadConfig}
              existingLeads={leads}
              onSubmit={handleEditLead}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      {/* View Lead Drawer */}
      <LeadViewDrawer
        lead={viewedLead}
        open={isViewDrawerOpen}
        onOpenChange={setIsViewDrawerOpen}
        onEdit={handleEditFromDrawer}
        onConvertToCustomer={handleConvertToCustomer}
        activities={viewedLeadActivities}
      />

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
          lead={selectedLead}
          onCustomerCreated={handleCustomerCreated}
        />
      ) : null}
    </MainLayout>
  );
}
