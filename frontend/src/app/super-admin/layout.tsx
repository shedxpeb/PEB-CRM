'use client';

import { SuperAdminSidebar } from '@/features/super-admin/components/SuperAdminSidebar';
import { ThemeToggle } from '@/features/super-admin/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { LogOut, Bell, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSAThemeStore } from '@/store/useSAThemeStore';

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSAThemeStore((s) => s.theme);

  return (
    <div className="min-h-screen bg-sa-bg text-sa-text" data-sa-theme={theme}>
      <SuperAdminSidebar />

      <div className="lg:pl-[220px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 bg-sa-topbar backdrop-blur-xl border-b border-sa-border flex items-center justify-between px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs text-sa-text-muted hover:text-sa-text-secondary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to App
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="h-4 w-px bg-sa-border" />
            <Button
              variant="ghost"
              size="icon"
              className="text-sa-text-muted hover:text-sa-text hover:bg-sa-border/50 h-8 w-8"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <div className="h-4 w-px bg-sa-border" />
            <Button
              variant="ghost"
              size="sm"
              className="text-sa-text-muted hover:text-sa-text hover:bg-sa-border/50 gap-1.5 h-8 text-xs"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
