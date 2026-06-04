'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Building2,
  GitBranch,
  Users,
  Shield,
  Lock,
  Grid3x3,
  Settings as SettingsIcon,
  LayoutDashboard,
  Menu,
  ArrowLeft,
} from 'lucide-react';
import { ROUTES } from '@/core/routes';

interface SettingsNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  route: string;
  section: string;
}

const SETTINGS_NAV_ITEMS: SettingsNavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    route: ROUTES.settingsDashboard,
    section: 'overview',
  },
  {
    id: 'company',
    label: 'Company',
    icon: <Building2 className="h-4 w-4" />,
    route: ROUTES.settingsCompany,
    section: 'organization',
  },
  {
    id: 'branches',
    label: 'Branches',
    icon: <GitBranch className="h-4 w-4" />,
    route: ROUTES.settingsBranches,
    section: 'organization',
  },
  {
    id: 'users',
    label: 'Users',
    icon: <Users className="h-4 w-4" />,
    route: ROUTES.settingsUsers,
    section: 'access',
  },
  {
    id: 'roles',
    label: 'Roles',
    icon: <Shield className="h-4 w-4" />,
    route: ROUTES.settingsRoles,
    section: 'access',
  },
  {
    id: 'permissions',
    label: 'Permissions',
    icon: <Lock className="h-4 w-4" />,
    route: ROUTES.settingsPermissions,
    section: 'access',
  },
  {
    id: 'modules',
    label: 'Modules',
    icon: <Grid3x3 className="h-4 w-4" />,
    route: ROUTES.settingsModules,
    section: 'system',
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: <SettingsIcon className="h-4 w-4" />,
    route: ROUTES.settingsPreferences,
    section: 'system',
  },
];

const SECTIONS = {
  overview: 'Overview',
  organization: 'Organization',
  access: 'Access Control',
  system: 'System',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('overview');

  const activeItem = SETTINGS_NAV_ITEMS.find((item) => pathname === item.route);

  const groupedNavItems = SETTINGS_NAV_ITEMS.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, SettingsNavItem[]>);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r bg-card overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Settings
            </h2>
            <Button variant="ghost" size="icon" onClick={() => window.location.href = '/dashboard'}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-6">
            {Object.entries(groupedNavItems).map(([section, items]) => (
              <div key={section}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {SECTIONS[section as keyof typeof SECTIONS] || section}
                </h3>
                <nav className="space-y-1">
                  {items.map((item) => (
                    <Button
                      key={item.id}
                      variant={pathname === item.route ? 'secondary' : 'ghost'}
                      className={cn(
                        'w-full justify-start',
                        pathname === item.route && 'bg-primary text-primary-foreground'
                      )}
                      onClick={() => window.location.href = item.route}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </Button>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {activeItem && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {activeItem.icon}
                {activeItem.label}
              </h1>
              <p className="text-muted-foreground mt-1">
                Configure your {activeItem.label.toLowerCase()} settings
              </p>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
