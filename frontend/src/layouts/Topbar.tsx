'use client';

import { memo } from 'react';
import { Bell, Search, User, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useSidebarToggle } from '@/store/useSidebarStore';

interface TopbarProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const Topbar = memo(function Topbar({ title, subtitle, showBackButton, onBackClick }: TopbarProps) {
  const toggleSidebar = useSidebarToggle();

  return (
    <header className="h-14 md:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 md:px-6 sticky top-0 z-30 w-full overflow-hidden">
      {/* Left side - Title */}
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0 min-w-0">
        {/* Hamburger Menu Button */}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
          <Menu className="h-4 w-4 md:h-5 md:w-5" />
        </Button>

        {/* Back Button */}
        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={onBackClick} className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Button>
        )}

        <div className="min-w-0 flex-shrink-0">
          <h1 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs text-gray-500 hidden md:block truncate">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-1 md:gap-2 lg:gap-4 flex-shrink-0">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="w-48 lg:w-64 pl-9"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 flex-shrink-0">
          <Bell className="h-4 w-4 md:h-5 md:w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 bg-red-500 text-[10px] md:text-xs">
            3
          </Badge>
        </Button>

        {/* Quick Actions */}
        <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 hidden lg:flex flex-shrink-0">
          <Settings className="h-4 w-4 md:h-5 md:w-5" />
        </Button>

        {/* Profile */}
        <div className="flex items-center gap-1 md:gap-2 lg:gap-3 pl-2 md:pl-3 lg:pl-4 border-l border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs md:text-sm font-medium">JD</span>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Owner</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 flex-shrink-0">
            <LogOut className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
});
