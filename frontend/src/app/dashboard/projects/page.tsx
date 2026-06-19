'use client';

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable, Column } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
import { StandardPageLayout } from '@/components/layout/StandardPageLayout';
import { FilterBar, FilterConfig } from '@/components/layout/FilterBar';
import { ProjectRowActions } from '@/features/projects/components/ProjectRowActions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Project } from '@/features/projects/types';
import { useProjects, useProjectsStats, useCreateProject, useDeleteProject } from '@/features/projects/hooks/useProjects';
import { getProjectStatusVariant, getPriorityVariant, getHealthStatusVariant } from '@/features/projects/constants';
import { Plus, Download, Building2, CheckCircle, Clock, DollarSign, Users, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { componentTextSizes } from '@/lib/design-system';
import { useDebounce } from '@/shared/hooks/useDebounce';

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

  // Filter configuration for FilterBar (projects page doesn't have filters yet, so empty for now)
  const filterConfigs: FilterConfig[] = useMemo(() => [], []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
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
      <StandardPageLayout
        title="Projects"
        subtitle="Manage all projects"
        headerActions={
          <Button onClick={() => setIsCreateDialogOpen(true)} className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        }
        kpiCards={
          <>
            <KPICard
              data={{
                title: 'Total Projects',
                value: stats?.totalProjects || 0,
                change: 0,
                icon: <Building2 />,
                color: 'text-blue-500'
              }}
            />
            <KPICard
              data={{
                title: 'Active',
                value: stats?.activeProjects || 0,
                change: 0,
                icon: <CheckCircle />,
                color: 'text-green-500'
              }}
            />
            <KPICard
              data={{
                title: 'Delayed',
                value: stats?.delayedProjects || 0,
                change: 0,
                icon: <Clock />,
                color: 'text-yellow-500'
              }}
            />
            <KPICard
              data={{
                title: 'Revenue',
                value: `₹${((stats?.projectRevenue || 0) / 1000000).toFixed(1)}M`,
                change: 0,
                icon: <DollarSign />,
                color: 'text-emerald-500'
              }}
            />
          </>
        }
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search projects..."
        filters={filterConfigs}
        onClearFilters={handleClearFilters}
      >
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>

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
      </StandardPageLayout>

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
    </MainLayout>
  );
}
