'use client';

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable, Column } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
import { ProjectRowActions } from '@/features/projects/components/ProjectRowActions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Project } from '@/features/projects/types';
import { useProjects, useProjectsStats, useCreateProject, useDeleteProject } from '@/features/projects/hooks/useProjects';
import { getProjectStatusVariant, getPriorityVariant, getHealthStatusVariant } from '@/features/projects/constants';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Plus, Download, Building2, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock, Users, Search } from 'lucide-react';

// Lazy load ProjectForm to reduce initial bundle size
const ProjectForm = dynamic(() => import('@/features/projects/components/ProjectForm').then(mod => ({ default: mod.ProjectForm })), {
  loading: () => <div className="p-8 text-center">Loading form...</div>,
  ssr: false
});

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get('customerId');
  const shouldCreate = searchParams.get('create') === 'true';

  // Search and filter state with debounce
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: projects, isLoading } = useProjects();
  const { data: stats } = useProjectsStats();
  const createMutation = useCreateProject();
  const deleteMutation = useDeleteProject();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  // Auto-open create dialog if coming from customer page
  useEffect(() => {
    if (shouldCreate && customerId) {
      setIsCreateDialogOpen(true);
    }
  }, [shouldCreate, customerId]);

  // Auto-open create dialog if coming from quotation conversion
  useEffect(() => {
    const quotationData = sessionStorage.getItem('convertFromQuotation');
    if (quotationData) {
      try {
        const quotation = JSON.parse(quotationData);
        // Store quotation data for the ProjectForm to use
        sessionStorage.setItem('quotationForProject', quotationData);
        setIsCreateDialogOpen(true);
        // Clear the convertFromQuotation key
        sessionStorage.removeItem('convertFromQuotation');
      } catch (err) {
        console.error('Failed to parse quotation data:', err);
      }
    }
  }, []);

  const columns: Column<Project>[] = useMemo(() => [
    {
      key: 'projectCode',
      label: 'Project Code',
      sortable: true,
      render: (value) => <span className="font-mono text-xs">{value}</span>,
    },
    {
      key: 'projectName',
      label: 'Project Name',
      sortable: true,
      filterable: true,
      render: (_, row) => (
        <div>
          <p className="font-medium text-sm">{row.projectName}</p>
          <p className="text-xs text-muted-foreground">{row.customerName}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true,
      render: (value) => <Badge variant={getProjectStatusVariant(value as string)}>{value}</Badge>,
    },
    {
      key: 'stage',
      label: 'Stage',
      sortable: true,
      filterable: true,
      render: (value) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      filterable: true,
      render: (value) => <Badge variant={getPriorityVariant(value as string)}>{value}</Badge>,
    },
    {
      key: 'progress',
      label: 'Progress',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600" style={{ width: `${Number(value)}%` }} />
          </div>
          <span className="text-xs">{Number(value)}%</span>
        </div>
      ),
    },
    {
      key: 'startDate',
      label: 'Start Date',
      sortable: true,
      render: (value) => {
        if (!value) return <span className="text-xs text-muted-foreground">-</span>;
        const date = new Date(value);
        return (
          <span className="text-xs text-muted-foreground">
            {date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        );
      },
    },
    {
      key: 'endDate',
      label: 'End Date',
      sortable: true,
      render: (value) => {
        if (!value) return <span className="text-xs text-muted-foreground">-</span>;
        const date = new Date(value);
        return (
          <span className="text-xs text-muted-foreground">
            {date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        );
      },
    },
    {
      key: 'projectManager',
      label: 'Manager',
      sortable: true,
      filterable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs">{value}</span>
        </div>
      ),
    },
    {
      key: 'value',
      label: 'Value',
      sortable: true,
      render: (value) => (
        <span className="text-xs font-medium">₹{Number(value).toLocaleString()}</span>
      ),
    },
    {
      key: 'healthStatus',
      label: 'Health',
      sortable: true,
      filterable: true,
      render: (value) => <Badge variant={getHealthStatusVariant(value as string)}>{value}</Badge>,
    },
  ], []);

  const handleCreate = useCallback((data: any) => {
    createMutation.mutate(data, {
      onSuccess: () => setIsCreateDialogOpen(false),
    });
  }, [createMutation]);

  const handleDelete = useCallback((project: Project) => {
    if (confirm(`Are you sure you want to delete project ${project.projectName}?`)) {
      deleteMutation.mutate(project.id);
    }
  }, [deleteMutation]);

  const handleView = useCallback((project: Project) => {
    window.location.href = `/dashboard/projects/${project.id}`;
  }, []);

  const handleEdit = useCallback((project: Project) => {
    // TODO: Implement edit dialog
  }, []);

  if (isLoading) {
    return (
      <MainLayout title="Projects" subtitle="Manage all projects">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Projects" subtitle="Manage all projects">
      <div className="space-y-4 sm:space-y-6 w-full overflow-hidden">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <KPICard
            data={{
              title: 'Total Projects',
              value: stats?.totalProjects || 0,
              change: 0,
              icon: <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
              color: 'text-blue-600'
            }}
          />
          <KPICard
            data={{
              title: 'Active Projects',
              value: stats?.activeProjects || 0,
              change: 0,
              icon: <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
              color: 'text-green-600'
            }}
          />
          <KPICard
            data={{
              title: 'Delayed Projects',
              value: stats?.delayedProjects || 0,
              change: 0,
              icon: <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
              color: 'text-amber-600'
            }}
          />
          <KPICard
            data={{
              title: 'Project Revenue',
              value: `₹${((stats?.projectRevenue || 0) / 1000000).toFixed(1)}M`,
              change: 0,
              icon: <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
              color: 'text-purple-600'
            }}
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <KPICard
            data={{
              title: 'Upcoming Deadlines',
              value: stats?.upcomingDeadlines || 0,
              change: 0,
              icon: <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
              color: 'text-indigo-600'
            }}
          />
          <KPICard
            data={{
              title: 'In Design',
              value: stats?.projectsInDesign || 0,
              change: 0,
              icon: <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
              color: 'text-cyan-600'
            }}
          />
          <KPICard
            data={{
              title: 'In Procurement',
              value: stats?.projectsInProcurement || 0,
              change: 0,
              icon: <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
              color: 'text-pink-600'
            }}
          />
          <KPICard
            data={{
              title: 'Critical Projects',
              value: stats?.criticalProjects || 0,
              change: 0,
              icon: <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
              color: 'text-orange-600'
            }}
          />
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-semibold">All Projects</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">{projects?.data?.length || 0} total projects</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-full sm:w-64 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button size="sm" onClick={() => setIsCreateDialogOpen(true)} className="flex-1 sm:flex-none">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={projects?.data || []}
          enableSelection={true}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          rowIdKey="id"
          onRowClick={handleView}
          rowActions={(row) => (
            <ProjectRowActions
              project={row as any}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        />

        {/* Create Project Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <ProjectForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateDialogOpen(false)}
              isLoading={createMutation.isPending}
              prefillCustomerId={customerId || undefined}
            />
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
