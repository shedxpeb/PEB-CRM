'use client';

import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable } from '@/components/data-table/DataTable';
import { DocumentViewDialog } from '@/features/documents/components/DocumentViewDialog';
import { EstimateBuilder } from '@/features/documents/components/EstimateBuilder';
import { useEstimates, useEstimateStats } from '@/features/documents/hooks';
import { Estimate, CreateEstimateDto } from '@/features/documents/types/peb-commercial';
import { DOCUMENT_STATUS_BADGE_VARIANTS } from '@/features/documents/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DocumentRowActions } from '@/features/documents/components/DocumentRowActions';
import { FileText, Plus, ArrowRight } from 'lucide-react';

export function EstimatesPage() {
  const { data: estimatesResponse, loading, error, createEstimate, updateEstimate, deleteEstimate, refetch } = useEstimates({ page: 1, pageSize: 50 });
  const { data: stats } = useEstimateStats();
  
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isBuilderDialogOpen, setIsBuilderDialogOpen] = useState(false);
  const [editingEstimate, setEditingEstimate] = useState<Estimate | null>(null);

  const estimates = estimatesResponse || [];

  const handleViewEstimate = (estimate: Estimate) => {
    setSelectedEstimate(estimate);
    setIsViewDialogOpen(true);
  };

  const handleEditEstimate = (estimate: Estimate) => {
    setEditingEstimate(estimate);
    setIsBuilderDialogOpen(true);
  };

  const handleDeleteEstimate = async (estimate: Estimate) => {
    if (confirm(`Are you sure you want to delete ${estimate.estimateNumber}?`)) {
      try {
        await deleteEstimate(estimate.id);
        refetch();
      } catch (err) {
        console.error('Failed to delete estimate:', err);
      }
    }
  };

  const handleSendEstimate = (estimate: Estimate) => {
    console.log('Send estimate:', estimate);
    // Implement send functionality
  };

  const handleConvertToProposal = (estimate: Estimate) => {
    // Navigate to proposal creation with estimate data
    console.log('Convert to proposal:', estimate);
    // TODO: Implement navigation to proposal builder
  };

  const handleBuilderSave = async (data: CreateEstimateDto) => {
    try {
      if (editingEstimate) {
        await updateEstimate(editingEstimate.id, data as any);
      } else {
        await createEstimate(data);
      }
      setIsBuilderDialogOpen(false);
      setEditingEstimate(null);
      refetch();
    } catch (err) {
      console.error('Failed to save estimate:', err);
    }
  };

  const handleCreateNew = () => {
    setEditingEstimate(null);
    setIsBuilderDialogOpen(true);
  };

  const columns = [
    {
      key: 'estimateNumber',
      label: 'Estimate #',
      sortable: true,
    },
    {
      key: 'customerName',
      label: 'Customer',
      sortable: true,
    },
    {
      key: 'projectName',
      label: 'Project',
      sortable: true,
    },
    {
      key: 'totalAmount',
      label: 'Amount',
      sortable: true,
      render: (value: number) => value ? `₹${value.toLocaleString()}` : '-',
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge variant={DOCUMENT_STATUS_BADGE_VARIANTS[value as keyof typeof DOCUMENT_STATUS_BADGE_VARIANTS]}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (value: Date) => value ? new Date(value).toLocaleDateString() : '-',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: Estimate) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => handleViewEstimate(row)}>
            View
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleEditEstimate(row)}>
            Edit
          </Button>
          {row.status === 'Draft' && (
            <Button size="sm" variant="ghost" onClick={() => handleConvertToProposal(row)}>
              <ArrowRight className="h-4 w-4 mr-1" />
              Convert
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <MainLayout title="Estimates" subtitle="Manage estimate documents">
      <div className="space-y-6">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Estimates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalEstimates}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Draft</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.draftEstimates}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.sentEstimates}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Converted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.convertedEstimates}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Estimates: {estimates.length}</p>
          </div>
          <Button onClick={handleCreateNew}>
            <Plus className="h-4 w-4 mr-2" />
            New Estimate
          </Button>
        </div>

        {/* Estimates Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Estimates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={estimates}
              columns={columns as any}
              loading={loading}
              emptyMessage="No estimates found"
            />
          </CardContent>
        </Card>

        {/* Estimate Builder Dialog */}
        <Dialog open={isBuilderDialogOpen} onOpenChange={setIsBuilderDialogOpen}>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEstimate ? `Edit Estimate ${editingEstimate.estimateNumber}` : 'Create New Estimate'}
              </DialogTitle>
            </DialogHeader>
            <EstimateBuilder
              estimate={editingEstimate || undefined}
              onSave={handleBuilderSave}
              onCancel={() => {
                setIsBuilderDialogOpen(false);
                setEditingEstimate(null);
              }}
              customerId=""
              customerName=""
            />
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
