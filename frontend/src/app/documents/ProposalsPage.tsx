'use client';

import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable } from '@/components/data-table/DataTable';
import { ProposalBuilder } from '@/features/documents/components/ProposalBuilder';
import { useProposals, useProposalStats } from '@/features/documents/hooks';
import { Proposal, CreateProposalDto, Estimate } from '@/features/documents/types/peb-commercial';
import { DOCUMENT_STATUS_BADGE_VARIANTS } from '@/features/documents/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { File, Plus, ArrowRight } from 'lucide-react';

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
    console.log('Send proposal:', proposal);
    // Implement send functionality
  };

  const handleConvertToQuotation = (proposal: Proposal) => {
    // Navigate to quotation creation with proposal data
    console.log('Convert to quotation:', proposal);
    // TODO: Implement navigation to quotation builder
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
      key: 'estimateNumber',
      label: 'From Estimate',
      sortable: true,
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
      render: (_: any, row: Proposal) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => handleViewProposal(row)}>
            View
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleEditProposal(row)}>
            Edit
          </Button>
          {row.status === 'Draft' && (
            <Button size="sm" variant="ghost" onClick={() => handleConvertToQuotation(row)}>
              <ArrowRight className="h-4 w-4 mr-1" />
              Convert
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <MainLayout title="Proposals" subtitle="Manage proposal documents">
      <div className="space-y-6">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProposals}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Draft</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.draftProposals}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.sentProposals}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Converted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.convertedProposals}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Proposals: {proposals.length}</p>
          </div>
          <Button onClick={handleCreateNew}>
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
      </div>
    </MainLayout>
  );
}
