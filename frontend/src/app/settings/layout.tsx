'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/layouts/Sidebar';
import { cn } from '@/lib/utils';

interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayoutWrapper({ children }: SettingsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/settings" />
      
      <main className="lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
