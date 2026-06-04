'use client';

import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable } from '@/components/data-table/DataTable';
import { QuotationBuilder } from '@/features/documents/components/QuotationBuilder';
import { useQuotations, useQuotationStats } from '@/features/documents/hooks';
import { Quotation, CreateQuotationDto, Proposal } from '@/features/documents/types/peb-commercial';
import { DOCUMENT_STATUS_BADGE_VARIANTS } from '@/features/documents/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileSpreadsheet, Plus, ArrowRight } from 'lucide-react';

export function QuotationsPage() {
  const { data: quotationsResponse, loading, error, createQuotation, updateQuotation, deleteQuotation, refetch } = useQuotations({ page: 1, pageSize: 50 });
  const { data: stats } = useQuotationStats();
  
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isBuilderDialogOpen, setIsBuilderDialogOpen] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const quotations = quotationsResponse || [];

  const handleViewQuotation = (quotation: Quotation) => {
    setSelectedQuotation(quotation);
    setIsViewDialogOpen(true);
  };

  const handleEditQuotation = (quotation: Quotation) => {
    setEditingQuotation(quotation);
    setIsBuilderDialogOpen(true);
  };

  const handleDeleteQuotation = async (quotation: Quotation) => {
    if (confirm(`Are you sure you want to delete ${quotation.quotationNumber}?`)) {
      try {
        await deleteQuotation(quotation.id);
        refetch();
      } catch (err) {
        console.error('Failed to delete quotation:', err);
      }
    }
  };

  const handleSendQuotation = (quotation: Quotation) => {
    console.log('Send quotation:', quotation);
    // Implement send functionality
  };

  const handleConvertToProject = (quotation: Quotation) => {
    // Navigate to project creation with quotation data
    console.log('Convert to project:', quotation);
    // TODO: Implement navigation to project creation
  };

  const handleBuilderSave = async (data: CreateQuotationDto) => {
    try {
      if (editingQuotation) {
        await updateQuotation(editingQuotation.id, data as any);
      } else {
        await createQuotation(data);
      }
      setIsBuilderDialogOpen(false);
      setEditingQuotation(null);
      setSelectedProposal(null);
      refetch();
    } catch (err) {
      console.error('Failed to save quotation:', err);
    }
  };

  const handleCreateNew = () => {
    // For now, quotations must be created from proposals
    alert('Quotations must be created from a Proposal. Please go to Proposals and convert a proposal to a quotation.');
  };

  const handleCreateFromProposal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setEditingQuotation(null);
    setIsBuilderDialogOpen(true);
  };

  const columns = [
    {
      key: 'quotationNumber',
      label: 'Quotation #',
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
      key: 'proposalNumber',
      label: 'From Proposal',
      sortable: true,
    },
    {
      key: 'grandTotal',
      label: 'Amount',
      sortable: true,
      render: (value: number) => `₹${value.toLocaleString()}`,
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
      key: 'validUntil',
      label: 'Valid Until',
      sortable: true,
      render: (value: Date) => value ? new Date(value).toLocaleDateString() : '-',
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
      render: (_: any, row: Quotation) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => handleViewQuotation(row)}>
            View
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleEditQuotation(row)}>
            Edit
          </Button>
          {row.status === 'Accepted' && (
            <Button size="sm" variant="ghost" onClick={() => handleConvertToProject(row)}>
              <ArrowRight className="h-4 w-4 mr-1" />
              Convert
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <MainLayout title="Quotations" subtitle="Manage quotation documents">
      <div className="space-y-6">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Quotations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalQuotations}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Draft</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.draftQuotations}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.sentQuotations}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.acceptedQuotations}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Revenue Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{(stats.totalRevenuePipeline || 0).toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Quotations: {quotations.length}</p>
          </div>
          <Button onClick={handleCreateNew}>
            <Plus className="h-4 w-4 mr-2" />
            New Quotation
          </Button>
        </div>

        {/* Quotations Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              All Quotations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={quotations}
              columns={columns as any}
              loading={loading}
              emptyMessage="No quotations found"
            />
          </CardContent>
        </Card>

        {/* Quotation Builder Dialog */}
        <Dialog open={isBuilderDialogOpen} onOpenChange={setIsBuilderDialogOpen}>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingQuotation ? `Edit Quotation ${editingQuotation.quotationNumber}` : 'Create New Quotation'}
              </DialogTitle>
            </DialogHeader>
            {selectedProposal && (
              <QuotationBuilder
                proposal={selectedProposal}
                quotation={editingQuotation || undefined}
                onSave={handleBuilderSave}
                onCancel={() => {
                  setIsBuilderDialogOpen(false);
                  setEditingQuotation(null);
                  setSelectedProposal(null);
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
