'use client';

import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
import { DocumentViewDialog } from '@/features/documents/components/DocumentViewDialog';
import { ProposalBuilder } from '@/features/documents/components/ProposalBuilder';
import { DocumentRowActions } from '@/features/documents/components/DocumentRowActions';
import { useProposals, useProposalStats } from '@/features/documents/hooks';
import { Proposal, CreateProposalDto, Estimate } from '@/features/documents/types/peb-commercial';
import { DOCUMENT_STATUS_BADGE_VARIANTS } from '@/features/documents/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { File, Plus, ArrowRight, DollarSign, Clock, CheckCircle } from 'lucide-react';

export function ProposalsPage() {
  const { data: proposalsResponse, loading, error, createProposal, updateProposal, deleteProposal, refetch } = useProposals({ page: 1, pageSize: 50 });
  const { data: stats } = useProposalStats();
  
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isBuilderDialogOpen, setIsBuilderDialogOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);

  const proposals = proposalsResponse || [];

  const handleViewProposal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsViewDialogOpen(true);
  };

  const handleEditProposal = (proposal: Proposal) => {
    setEditingProposal(proposal);
    setIsBuilderDialogOpen(true);
  };

  const handleDeleteProposal = async (proposal: Proposal) => {
    if (confirm(`Are you sure you want to delete ${proposal.proposalNumber}?`)) {
      try {
        await deleteProposal(proposal.id);
        refetch();
      } catch (err) {
        console.error('Failed to delete proposal:', err);
      }
    }
  };

  const handleSendProposal = (proposal: Proposal) => {
    // Implement send functionality
  };

  const handleConvertToQuotation = (proposal: Proposal) => {
    // Navigate to quotation creation with proposal data
    // Store proposal data in sessionStorage for the quotation builder to use
    sessionStorage.setItem('convertFromProposal', JSON.stringify(proposal));
    
    // Navigate to quotations page
    window.location.href = '/dashboard/documents/quotations';
  };

  const handleDuplicateProposal = async (proposal: Proposal) => {
    try {
      const duplicateData: CreateProposalDto = {
        estimateId: proposal.estimateId,
        customerId: proposal.customerId,
        proposalNumber: `${proposal.proposalNumber}-COPY`,
        validUntil: proposal.validUntil,
        items: proposal.items,
        subtotal: proposal.subtotal,
        taxAmount: proposal.taxAmount,
        totalAmount: proposal.totalAmount,
        paymentTerms: proposal.paymentTerms,
        termsAndConditions: proposal.termsAndConditions,
        notes: proposal.notes,
        status: 'Draft',
      };
      
      await createProposal(duplicateData);
      alert('Proposal duplicated successfully!');
      refetch();
    } catch (err) {
      console.error('Failed to duplicate proposal:', err);
      alert('Failed to duplicate proposal. Please try again.');
    }
  };

  const handleBuilderSave = async (data: CreateProposalDto) => {
    try {
      if (editingProposal) {
        await updateProposal(editingProposal.id, data as any);
      } else {
        await createProposal(data);
      }
      setIsBuilderDialogOpen(false);
      setEditingProposal(null);
      setSelectedEstimate(null);
      refetch();
    } catch (err) {
      console.error('Failed to save proposal:', err);
    }
  };

  const handleCreateNew = () => {
    // For now, proposals must be created from estimates
    alert('Proposals must be created from an Estimate. Please go to Estimates and convert an estimate to a proposal.');
  };

  const handleCreateFromEstimate = (estimate: Estimate) => {
    setSelectedEstimate(estimate);
    setEditingProposal(null);
    setIsBuilderDialogOpen(true);
  };

  const columns = [
    {
      key: 'proposalNumber',
      label: 'Proposal #',
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
      key: 'estimateNumber',
      label: 'From Estimate',
      sortable: true,
      filterable: true,
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
    <MainLayout title="Proposals" subtitle="Manage proposal documents">
      <div className="space-y-6">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <KPICard
              data={{
                title: 'Total Proposals',
                value: stats.totalProposals?.toString() || '0',
                change: 0,
                color: 'text-blue-600',
                icon: <File />,
              }}
            />
            <KPICard
              data={{
                title: 'Draft',
                value: stats.draftProposals?.toString() || '0',
                change: 0,
                color: 'text-gray-600',
                icon: <Clock />,
              }}
            />
            <KPICard
              data={{
                title: 'Sent',
                value: stats.sentProposals?.toString() || '0',
                change: 0,
                color: 'text-orange-600',
                icon: <DollarSign />,
              }}
            />
            <KPICard
              data={{
                title: 'Converted',
                value: stats.convertedProposals?.toString() || '0',
                change: 0,
                color: 'text-green-600',
                icon: <CheckCircle />,
              }}
            />
          </div>
        )}

        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Total Proposals: {proposals.length}</p>
          </div>
          <Button onClick={handleCreateNew} className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            New Proposal
          </Button>
        </div>

        {/* Proposals Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <File className="h-5 w-5" />
              All Proposals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={proposals}
              columns={columns as any}
              loading={loading}
              emptyMessage="No proposals found"
              onRowClick={(row) => handleViewProposal(row as Proposal)}
              rowActions={(row) => (
                <DocumentRowActions
                  document={row as any}
                  onView={() => handleViewProposal(row as Proposal)}
                  onEdit={() => handleEditProposal(row as Proposal)}
                  onDelete={() => handleDeleteProposal(row as Proposal)}
                  onSend={() => handleSendProposal(row as Proposal)}
                  onVersion={() => {}}
                  onEmail={() => {}}
                  onWhatsApp={() => {}}
                  onPrint={() => {}}
                  onDownload={() => {}}
                  onCopy={() => {}}
                  onDuplicate={() => handleDuplicateProposal(row as Proposal)}
                />
              )}
            />
          </CardContent>
        </Card>

        {/* Proposal Builder Dialog */}
        <Dialog open={isBuilderDialogOpen} onOpenChange={setIsBuilderDialogOpen}>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProposal ? `Edit Proposal ${editingProposal.proposalNumber}` : 'Create New Proposal'}
              </DialogTitle>
            </DialogHeader>
            {selectedEstimate && (
              <ProposalBuilder
                estimate={selectedEstimate}
                proposal={editingProposal || undefined}
                onSave={handleBuilderSave}
                onCancel={() => {
                  setIsBuilderDialogOpen(false);
                  setEditingProposal(null);
                  setSelectedEstimate(null);
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Proposal View Dialog */}
        <DocumentViewDialog
          document={selectedProposal}
          open={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
        />
      </div>
    </MainLayout>
  );
}
