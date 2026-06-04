'use client';

import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable, Column } from '@/components/data-table/DataTable';
import { ProjectForm } from '@/features/projects/components/ProjectForm';
import { ProjectRowActions } from '@/features/projects/components/ProjectRowActions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Project } from '@/features/projects/types';
import { useProjects, useProjectsStats, useCreateProject, useDeleteProject } from '@/features/projects/hooks/useProjects';
import { getProjectStatusVariant, getPriorityVariant, getHealthStatusVariant } from '@/features/projects/constants';
import { Plus, Download, Building2, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react';

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const { data: stats } = useProjectsStats();
  const createMutation = useCreateProject();
  const deleteMutation = useDeleteProject();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  const columns: Column<Project>[] = [
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
  ];

  const handleCreate = (data: any) => {
    createMutation.mutate(data, {
      onSuccess: () => setIsCreateDialogOpen(false),
    });
  };

  const handleDelete = (project: Project) => {
    if (confirm(`Are you sure you want to delete project ${project.projectName}?`)) {
      deleteMutation.mutate(project.id);
    }
  };

  const handleView = (project: Project) => {
    window.location.href = `/dashboard/projects/${project.id}`;
  };

  const handleEdit = (project: Project) => {
    // TODO: Implement edit dialog
    console.log('Edit project:', project);
  };

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
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{stats?.totalProjects || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">{stats?.activeProjects || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delayed Projects</p>
                <p className="text-2xl font-bold">{stats?.delayedProjects || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Project Revenue</p>
                <p className="text-2xl font-bold">
                  ₹{((stats?.projectRevenue || 0) / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-100">
                <Calendar className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Deadlines</p>
                <p className="text-2xl font-bold">{stats?.upcomingDeadlines || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-100">
                <Building2 className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Design</p>
                <p className="text-2xl font-bold">{stats?.projectsInDesign || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-pink-100">
                <Users className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Procurement</p>
                <p className="text-2xl font-bold">{stats?.projectsInProcurement || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Critical Projects</p>
                <p className="text-2xl font-bold">{stats?.criticalProjects || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Projects</h2>
            <p className="text-sm text-muted-foreground">{projects?.data?.length || 0} total projects</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
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
              project={row}
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
            />
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
