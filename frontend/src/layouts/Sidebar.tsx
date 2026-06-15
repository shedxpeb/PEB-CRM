'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Building,
  Package as ItemMasterIcon,
  FolderKanban,
  CheckSquare,
  Package,
  DollarSign,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useSidebarIsOpen, useSidebarIsCollapsed, useSidebarToggle } from '@/store/useSidebarStore';
import { cn } from '@/lib/utils';

interface SidebarProps {
  currentPath?: string;
  userRole?: 'owner' | 'admin' | 'employee';
}

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['owner', 'admin', 'employee'],
  },
  {
    title: 'Leads',
    href: '/dashboard/leads',
    icon: Users,
    roles: ['owner', 'admin', 'employee'],
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    icon: Building,
    roles: ['owner', 'admin', 'employee'],
  },
  {
    title: 'Item',
    href: '/dashboard/item',
    icon: ItemMasterIcon,
    roles: ['owner', 'admin', 'employee'],
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: FolderKanban,
    roles: ['owner', 'admin', 'employee'],
  },
  {
    title: 'Task Management',
    href: '/dashboard/task-management',
    icon: CheckSquare,
    roles: ['owner', 'admin', 'employee'],
  },
  {
    title: 'Inventory',
    href: '/dashboard/inventory',
    icon: Package,
    roles: ['owner', 'admin'],
  },
  {
    title: 'Finance',
    href: '/dashboard/finance',
    icon: DollarSign,
    roles: ['owner', 'admin'],
  },
  {
    title: 'Documents',
    href: '/dashboard/documents',
    icon: FileText,
    roles: ['owner', 'admin', 'employee'],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['owner', 'admin'],
  },
];

export const Sidebar = memo(function Sidebar({ currentPath, userRole = 'owner' }: SidebarProps) {
  const pathname = currentPath || usePathname();
  const router = useRouter();
  const isOpen = useSidebarIsOpen();
  const isCollapsed = useSidebarIsCollapsed();
  const toggleSidebar = useSidebarToggle();

  const filteredItems = navigationItems.filter(item =>
    item.roles.includes(userRole)
  );

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300',
        isOpen ? (isCollapsed ? 'w-16' : 'w-64') : 'w-0 -translate-x-full',
        'overflow-hidden'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo/Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <h1 className="text-xl font-bold">PEB CRM</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={`${item.href}-${index}`}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => router.prefetch(item.href)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    )}
                  >
                    <Icon size={20} />
                    {!isCollapsed && <span className="font-medium">{item.title}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © 2026 PEB CRM
          </p>
        </div>
      </div>
    </aside>
  );
});
