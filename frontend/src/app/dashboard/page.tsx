'use client';

import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { KPIDetailsDialog } from '@/components/dashboard/KPIDetailsDialog';
import { ChartPlaceholder } from '@/components/dashboard/ChartPlaceholder';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { DataTable } from '@/components/data-table/DataTable';
import { KPICard as KPICardType, KPIDetail } from '@/types';
import { 
  Users, 
  FolderKanban, 
  FileText, 
  Package, 
  AlertTriangle,
  TrendingUp,
  DollarSign,
  CheckCircle
} from 'lucide-react';

export default function DashboardPage() {
  const [selectedKPI, setSelectedKPI] = useState<KPIDetail | null>(null);
  const [kpiDialogOpen, setKpiDialogOpen] = useState(false);

  // Mock KPI data - will be replaced with API calls
  const kpiData: KPICardType[] = [
    {
      title: 'Total Leads',
      value: 156,
      change: 8,
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600',
    },
    {
      title: 'Active Projects',
      value: 24,
      change: 12,
      icon: <FolderKanban className="h-6 w-6" />,
      color: 'text-green-600',
    },
    {
      title: 'Completed Projects',
      value: 18,
      change: 22,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'text-purple-600',
    },
    {
      title: 'Pending Quotations',
      value: 45,
      change: 10,
      icon: <FileText className="h-6 w-6" />,
      color: 'text-orange-600',
    },
    {
      title: 'Inventory Alerts',
      value: 3,
      change: -2,
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'text-red-600',
    },
    {
      title: 'Total Revenue',
      value: '$2.4M',
      change: 25,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-green-600',
    },
    {
      title: 'Employee Activity',
      value: 89,
      change: 5,
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600',
    },
    {
      title: 'Growth Rate',
      value: '+18%',
      change: 18,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-green-600',
    },
  ];

  // Mock recent activity data
  const recentActivities = [
    {
      id: '1',
      type: 'lead' as const,
      title: 'New lead created',
      description: 'ABC Construction - Industrial Warehouse Project',
      timestamp: new Date(Date.now() - 300000),
      user: 'John Smith',
      status: 'pending' as const,
    },
    {
      id: '2',
      type: 'project' as const,
      title: 'Project milestone completed',
      description: 'Design phase completed for Project #1234',
      timestamp: new Date(Date.now() - 1800000),
      user: 'Sarah Johnson',
      status: 'completed' as const,
    },
    {
      id: '3',
      type: 'quotation' as const,
      title: 'Quotation approved',
      description: 'Quotation #5678 approved by client',
      timestamp: new Date(Date.now() - 3600000),
      user: 'Mike Wilson',
      status: 'completed' as const,
    },
    {
      id: '4',
      type: 'alert' as const,
      title: 'Inventory low stock alert',
      description: 'Steel beams - 50 units remaining',
      timestamp: new Date(Date.now() - 7200000),
      user: 'System',
      status: 'warning' as const,
    },
    {
      id: '5',
      type: 'task' as const,
      title: 'Task assigned',
      description: 'BOQ generation assigned to Design Team',
      timestamp: new Date(Date.now() - 10800000),
      user: 'Admin',
      status: 'pending' as const,
    },
  ];

  // Mock recent projects data
  const recentProjects = [
    {
      id: '1',
      name: 'Industrial Warehouse - ABC Corp',
      client: 'ABC Corporation',
      status: 'In Progress',
      value: '$450,000',
      startDate: '2024-01-15',
      progress: 65,
    },
    {
      id: '2',
      name: 'Commercial Complex - XYZ Ltd',
      client: 'XYZ Limited',
      status: 'Design Phase',
      value: '$820,000',
      startDate: '2024-02-01',
      progress: 30,
    },
    {
      id: '3',
      name: 'Storage Facility - DEF Inc',
      client: 'DEF Incorporated',
      status: 'Completed',
      value: '$320,000',
      startDate: '2023-11-20',
      progress: 100,
    },
    {
      id: '4',
      name: 'Factory Building - GHI Corp',
      client: 'GHI Corporation',
      status: 'Quotation Sent',
      value: '$680,000',
      startDate: '2024-03-10',
      progress: 15,
    },
    {
      id: '5',
      name: 'Retail Store - JKL Ltd',
      client: 'JKL Limited',
      status: 'Pending Approval',
      value: '$210,000',
      startDate: '2024-03-15',
      progress: 5,
    },
  ];

  const projectColumns = [
    { key: 'name' as const, label: 'Project Name', sortable: true },
    { key: 'client' as const, label: 'Client', sortable: true },
    { key: 'status' as const, label: 'Status', sortable: true, filterable: true },
    { key: 'value' as const, label: 'Value', sortable: true },
    { key: 'progress' as const, label: 'Progress', sortable: true },
  ];

  const handleKPIClick = (kpi: KPICardType) => {
    // Mock detail data - will be replaced with API calls
    const mockDetail: KPIDetail = {
      title: kpi.title,
      data: [
        { id: '1', name: 'Item 1', value: '100', status: 'Active' },
        { id: '2', name: 'Item 2', value: '200', status: 'Active' },
        { id: '3', name: 'Item 3', value: '150', status: 'Pending' },
      ],
      columns: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'value', label: 'Value' },
        { key: 'status', label: 'Status' },
      ],
    };
    setSelectedKPI(mockDetail);
    setKpiDialogOpen(true);
  };

  return (
    <MainLayout 
      title="Dashboard" 
      subtitle="Company Overview"
      currentPath="/dashboard"
    >
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={index}
              data={kpi}
              onClick={() => handleKPIClick(kpi)}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartPlaceholder title="Project Pipeline" type="bar" height={300} />
          <ChartPlaceholder title="Revenue Trend" type="line" height={300} />
        </div>

        {/* Recent Projects & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <DataTable
              data={recentProjects}
              columns={projectColumns}
              onRowClick={(row) => console.log('Row clicked:', row)}
            />
          </div>
          <div>
            <RecentActivity activities={recentActivities} />
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ChartPlaceholder title="Quotation Status" type="donut" height={250} />
          <ChartPlaceholder title="Project Status" type="pie" height={250} />
          <ChartPlaceholder title="Inventory by Category" type="bar" height={250} />
        </div>
      </div>

      {/* KPI Details Dialog */}
      <KPIDetailsDialog
        open={kpiDialogOpen}
        onClose={() => setKpiDialogOpen(false)}
        details={selectedKPI}
      />
    </MainLayout>
  );
}
