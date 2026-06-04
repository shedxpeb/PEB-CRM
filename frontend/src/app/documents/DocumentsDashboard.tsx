'use client';

import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { DataTable } from '@/components/data-table/DataTable';
import { DocumentActivityTimeline } from '@/features/documents/components/DocumentActivityTimeline';
import { DocumentViewDialog } from '@/features/documents/components/DocumentViewDialog';
import { useEstimates, useProposals, useQuotations, useEstimateStats, useProposalStats, useQuotationStats } from '@/features/documents/hooks';
import { Estimate, Proposal, Quotation } from '@/features/documents/types/peb-commercial';
import { DOCUMENT_STATUS_BADGE_VARIANTS } from '@/features/documents/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentRowActions } from '@/features/documents/components/DocumentRowActions';
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
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export function DocumentsDashboard() {
  const router = useRouter();
  const { data: estimatesResponse, loading: estimatesLoading } = useEstimates({ page: 1, pageSize: 5 });
  const { data: proposalsResponse, loading: proposalsLoading } = useProposals({ page: 1, pageSize: 5 });
  const { data: quotationsResponse, loading: quotationsLoading } = useQuotations({ page: 1, pageSize: 5 });
  const { data: estimateStats } = useEstimateStats();
  const { data: proposalStats } = useProposalStats();
  const { data: quotationStats } = useQuotationStats();
  
  const [selectedDocument, setSelectedDocument] = useState<Estimate | Proposal | Quotation | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'estimates' | 'proposals' | 'quotations'>('all');

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
        let Icon = FileText;
        if (row.estimateNumber) { type = 'Estimate'; Icon = FileText; }
        else if (row.proposalNumber) { type = 'Proposal'; Icon = File; }
        else if (row.quotationNumber) { type = 'Quotation'; Icon = FileSpreadsheet; }
        return (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <span>{type}</span>
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
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (value: Date) => value ? new Date(value).toLocaleDateString() : '-',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <Button size="sm" variant="ghost" onClick={() => handleViewDocument(row)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <MainLayout title="Documents" subtitle="Manage estimates, proposals, and quotations">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end">
          <Button onClick={() => router.push('/documents/estimates')}>
            <Plus className="h-4 w-4 mr-2" />
            New Estimate
          </Button>
        </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="estimates">Estimates</TabsTrigger>
              <TabsTrigger value="proposals">Proposals</TabsTrigger>
              <TabsTrigger value="quotations">Quotations</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <DataTable
                data={filteredDocuments}
                columns={columns as any}
                loading={estimatesLoading || proposalsLoading || quotationsLoading}
              />
            </TabsContent>
            <TabsContent value="estimates" className="mt-4">
              <DataTable
                data={filteredDocuments}
                columns={columns as any}
                loading={estimatesLoading}
              />
            </TabsContent>
            <TabsContent value="proposals" className="mt-4">
              <DataTable
                data={filteredDocuments}
                columns={columns as any}
                loading={proposalsLoading}
              />
            </TabsContent>
            <TabsContent value="quotations" className="mt-4">
              <DataTable
                data={filteredDocuments}
                columns={columns as any}
                loading={quotationsLoading}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/documents/estimates')}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Estimate
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/documents/proposals')}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Proposal
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/documents/quotations')}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Quotation
          </Button>
        </div>
      </div>
      </div>
    </MainLayout>
  );
}
