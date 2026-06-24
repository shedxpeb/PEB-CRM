'use client';

import { ReactNode, memo } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useSidebarIsOpen, useSidebarIsCollapsed } from '@/store/useSidebarStore';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  currentPath?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const MainLayout = memo(function MainLayout({ children, title = '', subtitle, currentPath, showBackButton, onBackClick }: MainLayoutProps) {
  const isOpen = useSidebarIsOpen();
  const isCollapsed = useSidebarIsCollapsed();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath={currentPath} />
      
      <main
        className={cn(
          'transition-all duration-300 min-h-screen overflow-x-hidden overflow-y-auto',
          isOpen ? (isCollapsed ? 'lg:ml-16 lg:w-[calc(100%-4rem)]' : 'lg:ml-64 lg:w-[calc(100%-16rem)]') : 'lg:ml-0 lg:w-full',
          'ml-0 w-full'
        )}
      >
        <Topbar title={title} subtitle={subtitle} showBackButton={showBackButton} onBackClick={onBackClick} />
        
        <div className="p-6 w-full max-w-full">
          {children}
        </div>
      </main>
    </div>
  );
});
