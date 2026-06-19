'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable } from '@/components/data-table/DataTable';
import { KPICard } from '@/components/dashboard/KPICard';
import { DocumentViewDialog } from '@/features/documents/components/DocumentViewDialog';
import { QuotationBuilder } from '@/features/documents/components/QuotationBuilder';
import { DocumentRowActions } from '@/features/documents/components/DocumentRowActions';
import { useQuotations, useQuotationStats } from '@/features/documents/hooks';
import { Quotation, CreateQuotationDto, Proposal } from '@/features/documents/types/peb-commercial';
import { DOCUMENT_STATUS_BADGE_VARIANTS } from '@/features/documents/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileSpreadsheet, Plus, ArrowRight, DollarSign, Clock, CheckCircle, TrendingUp } from 'lucide-react';

export function QuotationsPage() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get('customerId');
  const shouldCreate = searchParams.get('create') === 'true';

  const { data: quotationsResponse, loading, error, createQuotation, updateQuotation, deleteQuotation, refetch } = useQuotations({ page: 1, pageSize: 50 });
  const { data: stats } = useQuotationStats();

  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isBuilderDialogOpen, setIsBuilderDialogOpen] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const quotations = quotationsResponse || [];

  // Auto-open create dialog if coming from customer page
  useEffect(() => {
    if (shouldCreate && customerId) {
      setEditingQuotation(null);
      setIsBuilderDialogOpen(true);
    }
  }, [shouldCreate, customerId]);

  // Auto-open create dialog if coming from proposal conversion
  useEffect(() => {
    const proposalData = sessionStorage.getItem('convertFromProposal');
    if (proposalData) {
      try {
        const proposal = JSON.parse(proposalData) as Proposal;
        setSelectedProposal(proposal);
        setEditingQuotation(null);
        setIsBuilderDialogOpen(true);
        // Clear sessionStorage after reading
        sessionStorage.removeItem('convertFromProposal');
      } catch (err) {
        console.error('Failed to parse proposal data:', err);
      }
    }
  }, []);

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
    // Implement send functionality
  };

  const handleConvertToProject = (quotation: Quotation) => {
    // Only allow conversion from Accepted quotations
    if (quotation.status !== 'Accepted') {
      alert('Only Accepted quotations can be converted to projects.');
      return;
    }
    
    // Navigate to project creation with quotation data
    // Store quotation data in sessionStorage for the project creation to use
    sessionStorage.setItem('convertFromQuotation', JSON.stringify(quotation));
    
    // Navigate to projects page
    window.location.href = '/dashboard/projects';
  };

  const handleDuplicateQuotation = async (quotation: Quotation) => {
    try {
      const duplicateData: CreateQuotationDto = {
        proposalId: quotation.proposalId,
        customerId: quotation.customerId,
        quotationNumber: `${quotation.quotationNumber}-COPY`,
        validUntil: quotation.validUntil,
        items: quotation.items,
        subtotal: quotation.subtotal,
        taxAmount: quotation.taxAmount,
        totalAmount: quotation.totalAmount,
        paymentTerms: quotation.paymentTerms,
        termsAndConditions: quotation.termsAndConditions,
        notes: quotation.notes,
        status: 'Draft',
      };
      
      await createQuotation(duplicateData);
      alert('Quotation duplicated successfully!');
      refetch();
    } catch (err) {
      console.error('Failed to duplicate quotation:', err);
      alert('Failed to duplicate quotation. Please try again.');
    }
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
      key: 'proposalNumber',
      label: 'From Proposal',
      sortable: true,
      filterable: true,
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
      filterable: true,
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
  ];

  return (
    <MainLayout title="Quotations" subtitle="Manage quotation documents">
      <div className="space-y-6">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
            <KPICard
              data={{
                title: 'Total Quotations',
                value: stats.totalQuotations?.toString() || '0',
                change: 0,
                color: 'text-blue-600',
                icon: <FileSpreadsheet />,
              }}
            />
            <KPICard
              data={{
                title: 'Draft',
                value: stats.draftQuotations?.toString() || '0',
                change: 0,
                color: 'text-gray-600',
                icon: <Clock />,
              }}
            />
            <KPICard
              data={{
                title: 'Sent',
                value: stats.sentQuotations?.toString() || '0',
                change: 0,
                color: 'text-orange-600',
                icon: <DollarSign />,
              }}
            />
            <KPICard
              data={{
                title: 'Accepted',
                value: stats.acceptedQuotations?.toString() || '0',
                change: 0,
                color: 'text-green-600',
                icon: <CheckCircle />,
              }}
            />
            <KPICard
              data={{
                title: 'Revenue Pipeline',
                value: `₹${(stats.totalRevenuePipeline || 0).toLocaleString()}`,
                change: 0,
                color: 'text-purple-600',
                icon: <TrendingUp />,
              }}
            />
          </div>
        )}

        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Total Quotations: {quotations.length}</p>
          </div>
          <Button onClick={handleCreateNew} className="h-9">
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
              onRowClick={(row) => handleViewQuotation(row as Quotation)}
              rowActions={(row) => (
                <DocumentRowActions
                  document={row as any}
                  onView={() => handleViewQuotation(row as Quotation)}
                  onEdit={() => handleEditQuotation(row as Quotation)}
                  onDelete={() => handleDeleteQuotation(row as Quotation)}
                  onSend={() => handleSendQuotation(row as Quotation)}
                  onVersion={() => {}}
                  onEmail={() => {}}
                  onWhatsApp={() => {}}
                  onPrint={() => {}}
                  onDownload={() => {}}
                  onCopy={() => {}}
                  onDuplicate={() => handleDuplicateQuotation(row as Quotation)}
                />
              )}
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

        {/* Quotation View Dialog */}
        <DocumentViewDialog
          document={selectedQuotation}
          open={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
        />
      </div>
    </MainLayout>
  );
}
