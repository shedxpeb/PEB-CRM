'use client';

import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { DataTable } from '@/components/data-table/DataTable';
import { useDocuments } from '@/features/documents/hooks/useDocuments';
import { Document } from '@/features/documents/types';
import { DOCUMENT_STATUS_BADGE_VARIANTS } from '@/features/documents/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderOpen, Search, Download, Eye, FileText, File, FileSpreadsheet } from 'lucide-react';

export function DocumentLibraryPage() {
  const { data: documentsResponse, isLoading } = useDocuments({ page: 1, pageSize: 100 });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Estimate' | 'Proposal' | 'Quotation'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const documents = (documentsResponse as any)?.data || [];

  const filteredDocuments = documents.filter((doc: Document) => {
    const matchesSearch = searchTerm
      ? doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.projectName?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesType = filterType === 'all' || doc.documentType === filterType;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const columns = [
    {
      key: 'documentNumber',
      label: 'Document #',
      sortable: true,
    },
    {
      key: 'documentType',
      label: 'Type',
      sortable: true,
      render: (value: string) => {
        const Icon = value === 'Estimate' ? FileText : value === 'Proposal' ? File : FileSpreadsheet;
        return (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <span>{value}</span>
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
      key: 'projectName',
      label: 'Project',
      sortable: true,
    },
    {
      key: 'totalAmount',
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
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (value: Date) => value ? new Date(value).toLocaleDateString() : '-',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: Document) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {}}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {}}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <MainLayout title="Document Library" subtitle="Browse and manage all documents">
      <div className="space-y-6">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-[300px]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Estimate">Estimates</SelectItem>
                <SelectItem value="Proposal">Proposals</SelectItem>
                <SelectItem value="Quotation">Quotations</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Sent">Sent</SelectItem>
                <SelectItem value="Viewed">Viewed</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Converted">Converted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              All Documents ({filteredDocuments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredDocuments}
              columns={columns as any}
              loading={isLoading}
              emptyMessage="No documents found"
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-blue-600">
              {filteredDocuments.filter((d: Document) => d.documentType === 'Estimate').length}
            </p>
            <p className="text-sm text-gray-600">Estimates</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-purple-600">
              {filteredDocuments.filter((d: Document) => d.documentType === 'Proposal').length}
            </p>
            <p className="text-sm text-gray-600">Proposals</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-green-600">
              {filteredDocuments.filter((d: Document) => d.documentType === 'Quotation').length}
            </p>
            <p className="text-sm text-gray-600">Quotations</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-gray-600">
              {filteredDocuments.reduce((sum: number, d: Document) => sum + d.totalAmount, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Value (₹)</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
