'use client';

import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
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
import { FileText, Plus, ArrowRight, DollarSign, Clock, CheckCircle } from 'lucide-react';

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
    // Implement send functionality
  };

  const handleConvertToProposal = (estimate: Estimate) => {
    // Navigate to proposal creation with estimate data
    // Store estimate data in sessionStorage for the proposal builder to use
    sessionStorage.setItem('convertFromEstimate', JSON.stringify(estimate));
    
    // Navigate to proposals page
    window.location.href = '/dashboard/documents/proposals';
  };

  const handleBuilderSave = async (data: CreateEstimateDto) => {
    try {
      if (editingEstimate) {
        await updateEstimate(editingEstimate.id, data as any);
        alert('Estimate updated successfully!');
      } else {
        await createEstimate(data);
        alert('Estimate created successfully!');
      }
      setIsBuilderDialogOpen(false);
      setEditingEstimate(null);
      refetch();
    } catch (err) {
      console.error('Failed to save estimate:', err);
      alert('Failed to save estimate. Please try again.');
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
      filterable: true,
    },
    {
      key: 'customerName',
      label: 'Customer',
      sortable: true,
      filterable: true,
    },
    {
      key: 'projectName',
      label: 'Project',
      sortable: true,
      filterable: true,
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
      filterable: true,
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
  ];

  return (
    <MainLayout title="Estimates" subtitle="Manage estimate documents">
      <div className="space-y-6">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <KPICard
              data={{
                title: 'Total Estimates',
                value: stats.totalEstimates?.toString() || '0',
                change: 0,
                color: 'text-blue-600',
                icon: <FileText className="h-4 w-4" />,
              }}
            />
            <KPICard
              data={{
                title: 'Draft',
                value: stats.draftEstimates?.toString() || '0',
                change: 0,
                color: 'text-gray-600',
                icon: <Clock className="h-4 w-4" />,
              }}
            />
            <KPICard
              data={{
                title: 'Sent',
                value: stats.sentEstimates?.toString() || '0',
                change: 0,
                color: 'text-orange-600',
                icon: <DollarSign className="h-4 w-4" />,
              }}
            />
            <KPICard
              data={{
                title: 'Converted',
                value: stats.convertedEstimates?.toString() || '0',
                change: 0,
                color: 'text-green-600',
                icon: <CheckCircle className="h-4 w-4" />,
              }}
            />
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
              onRowClick={(row) => handleViewEstimate(row as Estimate)}
              rowActions={(row) => (
                <DocumentRowActions
                  document={row as any}
                  onView={() => handleViewEstimate(row as Estimate)}
                  onEdit={() => handleEditEstimate(row as Estimate)}
                  onDelete={() => handleDeleteEstimate(row as Estimate)}
                  onSend={() => handleSendEstimate(row as Estimate)}
                  onVersion={() => {}}
                  onEmail={() => {}}
                  onWhatsApp={() => {}}
                  onPrint={() => {}}
                  onDownload={() => {}}
                  onCopy={() => {}}
                />
              )}
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
            />
          </DialogContent>
        </Dialog>

        {/* Estimate View Dialog */}
        <DocumentViewDialog
          document={selectedEstimate}
          open={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
        />
      </div>
    </MainLayout>
  );
}
