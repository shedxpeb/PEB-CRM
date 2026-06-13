'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { MainLayout } from '@/layouts/MainLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { DataTable } from '@/components/data-table/DataTable';
import { DocumentActivityTimeline } from '@/features/documents/components/DocumentActivityTimeline';
import { DocumentViewDialog } from '@/features/documents/components/DocumentViewDialog';
import { SendDocumentDialog } from '@/features/documents/components/SendDocumentDialog';
import { useEstimates, useProposals, useQuotations, useEstimateStats, useProposalStats, useQuotationStats } from '@/features/documents/hooks';
import { Estimate, Proposal, Quotation } from '@/features/documents/types/peb-commercial';
import { DOCUMENT_STATUS_BADGE_VARIANTS } from '@/features/documents/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentRowActions } from '@/features/documents/components/DocumentRowActions';
import { useDebounce } from '@/shared/hooks/useDebounce';
import {
  FileText,
  File,
  FileSpreadsheet,
  Plus,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ChevronDown,
  Edit,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export function DocumentsDashboard() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get('customerId');
  const shouldCreate = searchParams.get('create') === 'true';

  // Search and filter state with debounce
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const router = useRouter();
  const { data: estimatesResponse, loading: estimatesLoading, refetch: refetchEstimates, deleteEstimate, updateStatus: updateEstimateStatus } = useEstimates({ page: 1, pageSize: 5 });
  const { data: proposalsResponse, loading: proposalsLoading, refetch: refetchProposals, deleteProposal, updateStatus: updateProposalStatus } = useProposals({ page: 1, pageSize: 5 });
  const { data: quotationsResponse, loading: quotationsLoading, refetch: refetchQuotations, deleteQuotation, updateStatus: updateQuotationStatus } = useQuotations({ page: 1, pageSize: 5 });
  const { data: estimateStats, refetch: refetchEstimateStats } = useEstimateStats();
  const { data: proposalStats, refetch: refetchProposalStats } = useProposalStats();
  const { data: quotationStats, refetch: refetchQuotationStats } = useQuotationStats();

  const [selectedDocument, setSelectedDocument] = useState<Estimate | Proposal | Quotation | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'estimates' | 'proposals' | 'quotations'>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-navigate to quotations page with create mode if coming from customer page
  useEffect(() => {
    if (shouldCreate && customerId) {
      router.push(`/dashboard/documents/quotations?customerId=${customerId}&create=true`);
    }
  }, [shouldCreate, customerId, router]);

  const estimates = estimatesResponse || [];
  const proposals = proposalsResponse || [];
  const quotations = quotationsResponse || [];
  
  const allDocuments = [...estimates, ...proposals, ...quotations];
  const filteredDocuments = activeTab === 'all' 
    ? allDocuments 
    : activeTab === 'estimates' ? estimates 
    : activeTab === 'proposals' ? proposals 
    : quotations;

  const handleViewDocument = (document: Estimate | Proposal | Quotation) => {
    setSelectedDocument(document);
    setIsViewDialogOpen(true);
  };

  const handleEditDocument = (document: any) => {
    // Navigate to edit page based on document type
    if (document.estimateNumber) {
      router.push(`/dashboard/documents/estimates?id=${document.id}`);
    } else if (document.proposalNumber) {
      router.push(`/dashboard/documents/proposals?id=${document.id}`);
    } else if (document.quotationNumber) {
      router.push(`/dashboard/documents/quotations?id=${document.id}`);
    }
  };

  const handleDeleteDocument = async (document: any) => {
    if (confirm(`Are you sure you want to delete ${document.estimateNumber || document.proposalNumber || document.quotationNumber}?`)) {
      try {
        // Call the appropriate delete function based on document type
        if (document.estimateNumber && deleteEstimate) {
          await deleteEstimate(document.id);
        } else if (document.proposalNumber && deleteProposal) {
          await deleteProposal(document.id);
        } else if (document.quotationNumber && deleteQuotation) {
          await deleteQuotation(document.id);
        }
        // Refetch all data to update UI
        await Promise.all([
          refetchEstimates?.(),
          refetchProposals?.(),
          refetchQuotations?.(),
          refetchEstimateStats?.(),
          refetchProposalStats?.(),
          refetchQuotationStats?.(),
        ]);
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete document');
      }
    }
  };

  const handleApproveDocument = async (document: any) => {
    if (confirm(`Are you sure you want to approve ${document.estimateNumber || document.proposalNumber || document.quotationNumber}?`)) {
      try {
        if (document.estimateNumber && updateEstimateStatus) {
          await updateEstimateStatus(document.id, 'Approved');
        } else if (document.proposalNumber && updateProposalStatus) {
          await updateProposalStatus(document.id, 'Approved');
        } else if (document.quotationNumber && updateQuotationStatus) {
          await updateQuotationStatus(document.id, 'Approved');
        }
        // Refetch all data to update UI
        await Promise.all([
          refetchEstimates?.(),
          refetchProposals?.(),
          refetchQuotations?.(),
          refetchEstimateStats?.(),
          refetchProposalStats?.(),
          refetchQuotationStats?.(),
        ]);
      } catch (error) {
        console.error('Approve failed:', error);
        alert('Failed to approve document');
      }
    }
  };

  const handleRejectDocument = async (document: any) => {
    const reason = prompt('Please enter rejection reason:');
    if (reason) {
      try {
        if (document.estimateNumber && updateEstimateStatus) {
          await updateEstimateStatus(document.id, 'Rejected');
        } else if (document.proposalNumber && updateProposalStatus) {
          await updateProposalStatus(document.id, 'Rejected');
        } else if (document.quotationNumber && updateQuotationStatus) {
          await updateQuotationStatus(document.id, 'Rejected');
        }
        // Refetch all data to update UI
        await Promise.all([
          refetchEstimates?.(),
          refetchProposals?.(),
          refetchQuotations?.(),
          refetchEstimateStats?.(),
          refetchProposalStats?.(),
          refetchQuotationStats?.(),
        ]);
      } catch (error) {
        console.error('Reject failed:', error);
        alert('Failed to reject document');
      }
    }
  };

  const handleCopyDocument = async (document: any) => {
    try {
      const newDoc = { ...document, id: undefined, estimateNumber: undefined, proposalNumber: undefined, quotationNumber: undefined, status: 'Draft', version: 1, createdAt: new Date(), updatedAt: new Date() };
      // For now, just show alert since create functions need proper implementation
      alert('Document copied successfully (mock)');
      // Refetch all data to update UI
      await Promise.all([
        refetchEstimates?.(),
        refetchProposals?.(),
        refetchQuotations?.(),
        refetchEstimateStats?.(),
        refetchProposalStats?.(),
        refetchQuotationStats?.(),
      ]);
    } catch (error) {
      console.error('Copy failed:', error);
      alert('Failed to copy document');
    }
  };

  const handleSendDocument = (document: any) => {
    // Default to email for send action
    handleSendEmail(document);
  };

  const handleSendEmail = (document: any) => {
    const docNumber = document.estimateNumber || document.proposalNumber || document.quotationNumber;
    const docType = document.estimateNumber ? 'Estimate' : document.proposalNumber ? 'Proposal' : 'Quotation';
    const customerEmail = document.customerEmail || '';
    const subject = encodeURIComponent(`${docType} ${docNumber}`);
    const body = encodeURIComponent(`Please find attached the ${docType} ${docNumber}.\n\nThank you.`);
    
    // Open email client directly
    window.location.href = `mailto:${customerEmail}?subject=${subject}&body=${body}`;
  };

  const handleSendWhatsApp = (document: any) => {
    const docNumber = document.estimateNumber || document.proposalNumber || document.quotationNumber;
    const docType = document.estimateNumber ? 'Estimate' : document.proposalNumber ? 'Proposal' : 'Quotation';
    const customerPhone = document.customerPhone || '';
    const message = encodeURIComponent(`Please find attached the ${docType} ${docNumber}.`);
    
    // Open WhatsApp directly
    window.open(`https://wa.me/${customerPhone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handlePrint = (document: any) => {
    // Open the document in a new window for printing
    const docNumber = document.estimateNumber || document.proposalNumber || document.quotationNumber;
    const docType = document.estimateNumber ? 'Estimate' : document.proposalNumber ? 'Proposal' : 'Quotation';
    // For now, use browser print - in production, this would generate a print-friendly view
    window.print();
  };

  const handleDownloadPDF = async (document: any) => {
    try {
      // For now, show alert - in production, this would use the PDF generation module
      const docNumber = document.estimateNumber || document.proposalNumber || document.quotationNumber;
      alert(`Download PDF for ${docNumber} - PDF generation will use @react-pdf/renderer module`);
      // TODO: Implement actual PDF download using the existing PDF generation module
      // The PDF module is already in: frontend/src/features/documents/pdf/EstimatePDF.tsx
    } catch (error) {
      console.error('PDF download failed:', error);
      alert('Failed to download PDF');
    }
  };

  const handleCreateVersion = async (document: any) => {
    try {
      const currentVersion = document.version || 1;
      const newVersion = currentVersion + 1;
      const docNumber = document.estimateNumber || document.proposalNumber || document.quotationNumber;
      
      // Create a new version by duplicating the document with incremented version number
      const newDoc = {
        ...document,
        id: undefined,
        version: newVersion,
        status: 'Draft',
        createdAt: new Date(),
        updatedAt: new Date(),
        // Keep the original document number but add version suffix
        estimateNumber: document.estimateNumber ? `${document.estimateNumber}-V${newVersion}` : undefined,
        proposalNumber: document.proposalNumber ? `${document.proposalNumber}-V${newVersion}` : undefined,
        quotationNumber: document.quotationNumber ? `${document.quotationNumber}-V${newVersion}` : undefined,
      };

      // For now, just show alert since create functions need proper implementation
      alert(`Created version ${newVersion} of ${docNumber} (mock)`);
      
      // Refetch all data to update UI
      await Promise.all([
        refetchEstimates?.(),
        refetchProposals?.(),
        refetchQuotations?.(),
        refetchEstimateStats?.(),
        refetchProposalStats?.(),
        refetchQuotationStats?.(),
      ]);
    } catch (error) {
      console.error('Create version failed:', error);
      alert('Failed to create version');
    }
  };

  const columns = [
    {
      key: 'documentNumber',
      label: 'Document #',
      sortable: true,
      render: (_: any, row: any) => {
        if (row.estimateNumber) return row.estimateNumber;
        if (row.proposalNumber) return row.proposalNumber;
        if (row.quotationNumber) return row.quotationNumber;
        return '-';
      },
    },
    {
      key: 'documentType',
      label: 'Type',
      sortable: true,
      render: (_: any, row: any) => {
        let type = 'Unknown';
        let shortType = 'Unknown';
        let Icon = FileText;
        if (row.estimateNumber) { type = 'Estimate'; shortType = 'Est'; Icon = FileText; }
        else if (row.proposalNumber) { type = 'Proposal'; shortType = 'Prop'; Icon = File; }
        else if (row.quotationNumber) { type = 'Quotation'; shortType = 'Quot'; Icon = FileSpreadsheet; }
        return (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <span className="font-medium">{shortType}</span>
          </div>
        );
      },
    },
    {
      key: 'customerName',
      label: 'Customer',
      sortable: true,
    },
    {
      key: 'totalAmount',
      label: 'Amount',
      sortable: true,
      render: (_: any, row: any) => {
        const amount = row.grandTotal || row.totalAmount || 0;
        return amount ? `₹${amount.toLocaleString()}` : '-';
      },
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
  ];

  return (
    <MainLayout title="Documents" subtitle="Manage estimates, proposals, and quotations">
      <div className="space-y-4 sm:space-y-6 w-full overflow-hidden">
        {/* Header Actions */}
        <div className="flex justify-end min-w-0">
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Document
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      router.push('/dashboard/documents/estimates?create=true');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    New Estimate
                  </button>
                  <button
                    onClick={() => {
                      router.push('/dashboard/documents/proposals?create=true');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                  >
                    <File className="h-4 w-4" />
                    New Proposal
                  </button>
                  <button
                    onClick={() => {
                      router.push('/dashboard/documents/quotations?create=true');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    New Quotation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <KPICard
          data={{
            title: 'Total Documents',
            value: ((estimateStats?.totalEstimates || 0) + (proposalStats?.totalProposals || 0) + (quotationStats?.totalQuotations || 0)).toString(),
            change: 12,
            color: 'text-blue-600',
            icon: <FileText className="h-5 w-5" />,
          }}
        />
        <KPICard
          data={{
            title: 'Revenue Pipeline',
            value: `₹${(quotationStats?.totalRevenuePipeline || 0).toLocaleString()}`,
            change: 8,
            color: 'text-green-600',
            icon: <DollarSign className="h-5 w-5" />,
          }}
        />
        <KPICard
          data={{
            title: 'Conversion Rate',
            value: '0%',
            change: 5,
            color: 'text-purple-600',
            icon: <TrendingUp className="h-5 w-5" />,
          }}
        />
        <KPICard
          data={{
            title: 'Pending Approvals',
            value: '0',
            change: -2,
            color: 'text-orange-600',
            icon: <Clock className="h-5 w-5" />,
          }}
        />
      </div>

      {/* Document Type Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
        <KPICard
          data={{
            title: 'Estimates',
            value: (estimateStats?.totalEstimates || 0).toString(),
            change: 15,
            color: 'text-blue-600',
            icon: <FileText className="h-5 w-5" />,
          }}
        />
        <KPICard
          data={{
            title: 'Proposals',
            value: (proposalStats?.totalProposals || 0).toString(),
            change: 10,
            color: 'text-purple-600',
            icon: <File className="h-5 w-5" />,
          }}
        />
        <KPICard
          data={{
            title: 'Quotations',
            value: (quotationStats?.totalQuotations || 0).toString(),
            change: 8,
            color: 'text-green-600',
            icon: <FileSpreadsheet className="h-5 w-5" />,
          }}
        />
      </div>

      {/* Documents Section */}
      <Card className="min-w-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-base sm:text-lg">Documents</CardTitle>
            <div className="relative flex-1 sm:flex-none max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All Docs</TabsTrigger>
              <TabsTrigger value="estimates" className="text-xs sm:text-sm">Estimates</TabsTrigger>
              <TabsTrigger value="proposals" className="text-xs sm:text-sm">Proposals</TabsTrigger>
              <TabsTrigger value="quotations" className="text-xs sm:text-sm">Quotes</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <DataTable
                data={filteredDocuments}
                columns={columns as any}
                loading={estimatesLoading || proposalsLoading || quotationsLoading}
                onRowClick={(row) => handleViewDocument(row)}
                rowActions={(row) => (
                  <DocumentRowActions
                    document={row as any}
                    onView={() => handleViewDocument(row)}
                    onEdit={() => handleEditDocument(row)}
                    onDelete={() => handleDeleteDocument(row)}
                    onSend={() => handleSendDocument(row)}
                    onApprove={() => handleApproveDocument(row)}
                    onReject={() => handleRejectDocument(row)}
                    onVersion={() => handleCreateVersion(row)}
                    onEmail={() => handleSendEmail(row)}
                    onWhatsApp={() => handleSendWhatsApp(row)}
                    onPrint={() => handlePrint(row)}
                    onDownload={() => handleDownloadPDF(row)}
                    onCopy={() => handleCopyDocument(row)}
                  />
                )}
              />
            </TabsContent>
            <TabsContent value="estimates" className="mt-4">
              <DataTable
                data={filteredDocuments}
                columns={columns as any}
                loading={estimatesLoading}
                onRowClick={(row) => handleViewDocument(row)}
                rowActions={(row) => (
                  <DocumentRowActions
                    document={row as any}
                    onView={() => handleViewDocument(row)}
                    onEdit={() => handleEditDocument(row)}
                    onDelete={() => handleDeleteDocument(row)}
                    onSend={() => handleSendDocument(row)}
                    onApprove={() => handleApproveDocument(row)}
                    onReject={() => handleRejectDocument(row)}
                    onVersion={() => handleCreateVersion(row)}
                    onEmail={() => handleSendEmail(row)}
                    onWhatsApp={() => handleSendWhatsApp(row)}
                    onPrint={() => handlePrint(row)}
                    onDownload={() => handleDownloadPDF(row)}
                    onCopy={() => handleCopyDocument(row)}
                  />
                )}
              />
            </TabsContent>
            <TabsContent value="proposals" className="mt-4">
              <DataTable
                data={filteredDocuments}
                columns={columns as any}
                loading={proposalsLoading}
                onRowClick={(row) => handleViewDocument(row)}
                rowActions={(row) => (
                  <DocumentRowActions
                    document={row as any}
                    onView={() => handleViewDocument(row)}
                    onEdit={() => handleEditDocument(row)}
                    onDelete={() => handleDeleteDocument(row)}
                    onSend={() => handleSendDocument(row)}
                    onApprove={() => handleApproveDocument(row)}
                    onReject={() => handleRejectDocument(row)}
                    onVersion={() => handleCreateVersion(row)}
                    onEmail={() => handleSendEmail(row)}
                    onWhatsApp={() => handleSendWhatsApp(row)}
                    onPrint={() => handlePrint(row)}
                    onDownload={() => handleDownloadPDF(row)}
                    onCopy={() => handleCopyDocument(row)}
                  />
                )}
              />
            </TabsContent>
            <TabsContent value="quotations" className="mt-4">
              <DataTable
                data={filteredDocuments}
                columns={columns as any}
                loading={quotationsLoading}
                onRowClick={(row) => handleViewDocument(row)}
                rowActions={(row) => (
                  <DocumentRowActions
                    document={row as any}
                    onView={() => handleViewDocument(row)}
                    onEdit={() => handleEditDocument(row)}
                    onDelete={() => handleDeleteDocument(row)}
                    onSend={() => handleSendDocument(row)}
                    onApprove={() => handleApproveDocument(row)}
                    onReject={() => handleRejectDocument(row)}
                    onVersion={() => handleCreateVersion(row)}
                    onEmail={() => handleSendEmail(row)}
                    onWhatsApp={() => handleSendWhatsApp(row)}
                    onPrint={() => handlePrint(row)}
                    onDownload={() => handleDownloadPDF(row)}
                    onCopy={() => handleCopyDocument(row)}
                  />
                )}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Document View Dialog */}
      <DocumentViewDialog
        document={selectedDocument}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />

      {/* Send Document Dialog */}
      <SendDocumentDialog
        document={selectedDocument}
        open={isSendDialogOpen}
        onOpenChange={setIsSendDialogOpen}
      />
      </div>
    </MainLayout>
  );
}
