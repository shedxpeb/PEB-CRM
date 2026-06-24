'use client';

import { useMemo } from 'react';
import {
  LayoutDashboard,
  Users,
  Building,
  Package as ItemMasterIcon,
  FolderKanban,
  CheckSquare,
  Package,
  DollarSign,
  Calculator,
  FileText,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { useModules } from '@/features/settings/hooks/useSettings';
import type { ModuleName } from '@/features/settings/types';

export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: Array<'owner' | 'admin' | 'employee'>;
  moduleId?: ModuleName;
}

const MODULE_NAV_MAP: Record<
  ModuleName,
  { href: string; icon: LucideIcon; title?: string; roles: NavigationItem['roles'] }
> = {
  leads: { href: '/dashboard/leads', icon: Users, roles: ['owner', 'admin', 'employee'] },
  customers: { href: '/dashboard/customers', icon: Building, roles: ['owner', 'admin', 'employee'] },
  items: { href: '/dashboard/item', icon: ItemMasterIcon, title: 'Item', roles: ['owner', 'admin', 'employee'] },
  projects: { href: '/dashboard/projects', icon: FolderKanban, roles: ['owner', 'admin', 'employee'] },
  inventory: { href: '/dashboard/inventory', icon: Package, roles: ['owner', 'admin'] },
  finance: { href: '/dashboard/finance', icon: DollarSign, roles: ['owner', 'admin'] },
  accounting: { href: '/dashboard/accounting', icon: Calculator, roles: ['owner', 'admin'] },
  documents: { href: '/dashboard/documents', icon: FileText, roles: ['owner', 'admin', 'employee'] },
  boq: { href: '/dashboard/boq', icon: FileText, roles: ['owner', 'admin'] },
  design: { href: '/dashboard/design', icon: FileText, roles: ['owner', 'admin'] },
  automation: { href: '/dashboard/automation', icon: FileText, roles: ['owner', 'admin'] },
};

const STATIC_NAVIGATION: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['owner', 'admin', 'employee'],
  },
  {
    title: 'Task Management',
    href: '/dashboard/task-management',
    icon: CheckSquare,
    roles: ['owner', 'admin', 'employee'],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['owner', 'admin'],
  },
];

export function useNavigationItems(userRole: NavigationItem['roles'][number] = 'owner') {
  const { data: modules, isLoading } = useModules();

  return useMemo(() => {
    const moduleItems = (modules ?? [])
      .filter((module) => module.isEnabled && module.isVisible)
      .map((module) => {
        const nav = MODULE_NAV_MAP[module.name];
        if (!nav) return null;
        return {
          title: nav.title ?? module.displayName,
          href: nav.href,
          icon: nav.icon,
          roles: nav.roles,
          moduleId: module.name,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    const dashboard = STATIC_NAVIGATION.filter((item) => item.href === '/dashboard');
    const taskManagement = STATIC_NAVIGATION.filter((item) => item.href === '/dashboard/task-management');
    const settings = STATIC_NAVIGATION.filter((item) => item.href === '/settings');

    const items = [...dashboard, ...moduleItems, ...taskManagement, ...settings].filter((item) =>
      item.roles.includes(userRole)
    );

    return { items, isLoading };
  }, [modules, userRole]);
}
