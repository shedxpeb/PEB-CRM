'use client';

import { KPICard } from '@/components/dashboard/KPICard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSettingsStats } from '../hooks/useSettings';
import { SettingsLayout } from '../components/SettingsLayout';
import { ROUTES } from '@/core/routes';
import type { SettingsStats } from '../types';
import {
  Users,
  Package,
  CheckCircle,
  UserCog,
  FileText,
} from 'lucide-react';

export function SettingsDashboard() {
  const { data: stats, isLoading } = useSettingsStats();
  const typedStats = stats as SettingsStats | undefined;

  const kpiData = typedStats ? [
    {
      title: 'Total Users',
      value: typedStats.totalUsers.toString(),
      change: 5,
      color: 'text-blue-600',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Active Users',
      value: typedStats.activeUsers.toString(),
      change: 8,
      color: 'text-green-600',
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: 'Enabled Modules',
      value: typedStats.enabledModules.toString(),
      change: 0,
      color: 'text-purple-600',
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: 'Pending Approvals',
      value: typedStats.pendingApprovals.toString(),
      change: 3,
      color: 'text-yellow-600',
      icon: <FileText className="h-5 w-5" />,
    },
  ] : [];

  const quickActions = [
    { icon: <UserCog className="h-4 w-4" />, label: 'Manage Users', href: ROUTES.settingsUsers },
    { icon: <Package className="h-4 w-4" />, label: 'Manage Modules', href: ROUTES.settingsModules },
  ];

  return (
    <SettingsLayout>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={index}
              data={kpi}
              onClick={() => console.log('KPI clicked:', kpi.title)}
            />
          ))}
        </div>


        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start"
                  onClick={() => window.location.href = action.href}
                >
                  {action.icon}
                  <span className="ml-2">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </SettingsLayout>
  );
}
