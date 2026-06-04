'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useSidebarStore } from '@/store/useSidebarStore';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  currentPath?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function MainLayout({ children, title, subtitle, currentPath, showBackButton, onBackClick }: MainLayoutProps) {
  const { isOpen, isCollapsed } = useSidebarStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath={currentPath} />
      
      <main
        className={cn(
          'transition-all duration-300 min-h-screen',
          isOpen ? (isCollapsed ? 'lg:ml-16' : 'lg:ml-64') : 'lg:ml-0',
          'ml-0'
        )}
      >
        <Topbar title={title} subtitle={subtitle} showBackButton={showBackButton} onBackClick={onBackClick} />
        
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
