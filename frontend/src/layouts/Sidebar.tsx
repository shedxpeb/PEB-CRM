'use client';

import React, { memo, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useSidebarIsOpen,
  useSidebarIsCollapsed,
  useSidebarStore,
} from '@/store/useSidebarStore';
import { useNavigationItems, type NavigationItem } from '@/features/settings/hooks/useNavigationItems';
import { cn } from '@/lib/utils';

interface SidebarProps {
  currentPath?: string;
  userRole?: 'owner' | 'admin' | 'employee';
}

const ACTIVE_STYLE: React.CSSProperties = {
  background: 'linear-gradient(90deg, rgba(58,190,255,0.18), rgba(58,190,255,0.10))',
  borderColor: 'rgba(58,190,255,0.25)',
};

/** Exact match for leaf highlight. */
const isLeafActive = (pathname: string, href?: string) => !!href && pathname === href;

/** Section match: the parent/own page or any descendant route is active. */
const isSectionActive = (pathname: string, item: NavigationItem): boolean => {
  if (item.href && (pathname === item.href || pathname.startsWith(`${item.href}/`))) return true;
  return (item.children ?? []).some((child) => isSectionActive(pathname, child));
};

/** Flatten the tree to reachable icons for the collapsed rail. */
const flattenForRail = (items: NavigationItem[]): NavigationItem[] => {
  const out: NavigationItem[] = [];
  for (const item of items) {
    if (item.href) {
      out.push(item);
    } else if (item.children) {
      out.push(...item.children.filter((child) => child.href));
    }
  }
  return out;
};

export const Sidebar = memo(function Sidebar({ currentPath, userRole = 'owner' }: SidebarProps) {
  const nextPathname = usePathname();
  const pathname = currentPath || nextPathname;
  const router = useRouter();
  const isOpen = useSidebarIsOpen();
  const isCollapsed = useSidebarIsCollapsed();
  const collapseSidebar = useSidebarStore((state) => state.collapseSidebar);
  const expandSidebar = useSidebarStore((state) => state.expandSidebar);
  const { items: navigationItems } = useNavigationItems(userRole);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Auto-expand the section that contains the active route.
  useEffect(() => {
    setExpanded((prev) => {
      const next = { ...prev };
      navigationItems.forEach((item) => {
        if (item.children && item.children.length > 0 && isSectionActive(pathname, item)) {
          next[item.title] = true;
        }
      });
      return next;
    });
  }, [pathname, navigationItems]);

  const railItems = useMemo(() => flattenForRail(navigationItems), [navigationItems]);

  const toggleSection = (title: string) =>
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-border transition-all duration-300',
        isOpen ? (isCollapsed ? 'w-16' : 'w-64') : 'w-0 -translate-x-full',
        'overflow-hidden'
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          {!isCollapsed && <h1 className="text-xl font-bold text-foreground">PEB CRM</h1>}
          <button
            type="button"
            onClick={() => (isCollapsed ? expandSidebar() : collapseSidebar())}
            className="p-2 rounded-lg hover:bg-card-hover transition-colors text-foreground"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4" aria-label="Primary">
          {isCollapsed ? (
            <ul className="space-y-2">
              {railItems.map((item, index) => {
                const Icon = item.icon;
                const active = isLeafActive(pathname, item.href);
                return (
                  <li key={`${item.href}-${index}`}>
                    <Link
                      href={item.href ?? '#'}
                      title={item.title}
                      aria-label={item.title}
                      onMouseEnter={() => item.href && router.prefetch(item.href)}
                      className={cn(
                        'flex items-center justify-center p-3 rounded-lg transition-all duration-220 glass-sidebar-hover',
                        active ? 'text-primary border border-primary/30' : 'text-foreground'
                      )}
                      style={active ? ACTIVE_STYLE : undefined}
                    >
                      <Icon size={20} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="space-y-1">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const hasChildren = !!item.children && item.children.length > 0;
                const sectionActive = isSectionActive(pathname, item);
                const isExpanded = expanded[item.title] ?? false;

                if (!hasChildren) {
                  const active = isLeafActive(pathname, item.href);
                  return (
                    <li key={`${item.href}-${index}`}>
                      <Link
                        href={item.href ?? '#'}
                        onMouseEnter={() => item.href && router.prefetch(item.href)}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-220 glass-sidebar-hover border-l-3 border-transparent',
                          active ? 'text-primary border-primary' : 'text-foreground'
                        )}
                        style={active ? ACTIVE_STYLE : undefined}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </li>
                  );
                }

                // Parent with children. If it has its own href, the label
                // navigates and a chevron toggles; otherwise the whole row toggles.
                return (
                  <li key={`${item.title}-${index}`}>
                    <div
                      className={cn(
                        'flex items-center rounded-lg transition-all duration-220 glass-sidebar-hover border-l-3 border-transparent',
                        sectionActive ? 'text-primary border-primary' : 'text-foreground'
                      )}
                      style={sectionActive ? ACTIVE_STYLE : undefined}
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          onMouseEnter={() => router.prefetch(item.href!)}
                          className="flex flex-1 items-center gap-3 px-4 py-3 min-w-0"
                        >
                          <Icon size={20} />
                          <span className="font-medium truncate">{item.title}</span>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleSection(item.title)}
                          className="flex flex-1 items-center gap-3 px-4 py-3 min-w-0 text-left"
                          aria-expanded={isExpanded}
                        >
                          <Icon size={20} />
                          <span className="font-medium truncate">{item.title}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleSection(item.title)}
                        className="px-3 py-3 text-current/80 hover:text-current"
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.title}`}
                        aria-expanded={isExpanded}
                      >
                        <ChevronDown
                          size={16}
                          className={cn('transition-transform duration-200', isExpanded ? 'rotate-180' : '')}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <ul className="mt-1 ml-4 space-y-1 border-l border-border pl-3">
                        {item.children!.map((child, childIndex) => {
                          const ChildIcon = child.icon;
                          const childActive =
                            isLeafActive(pathname, child.href) ||
                            (!!child.href && pathname.startsWith(`${child.href}/`));
                          return (
                            <li key={`${child.href}-${childIndex}`}>
                              <Link
                                href={child.href ?? '#'}
                                onMouseEnter={() => child.href && router.prefetch(child.href)}
                                className={cn(
                                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-220 glass-sidebar-hover border-l-3 border-transparent text-sm',
                                  childActive ? 'text-primary border-primary' : 'text-foreground'
                                )}
                                style={childActive ? ACTIVE_STYLE : undefined}
                              >
                                <ChildIcon size={18} />
                                <span className="font-medium">{child.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </nav>

        <div className="p-4 border-t border-border">
          {!isCollapsed && (
            <p className="text-sm text-muted-foreground text-center">© 2026 PEB CRM</p>
          )}
        </div>
      </div>
    </aside>
  );
});
