'use client';

import { AlertCircle, FileX, Search, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: 'inbox' | 'search' | 'file' | 'error';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Empty State Component
 * Use this for every module when there's no data
 */
export function EmptyState({ 
  icon = 'inbox', 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  const icons = {
    inbox: Inbox,
    search: Search,
    file: FileX,
    error: AlertCircle,
  };

  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-md mb-4">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

/**
 * Usage Examples:
 * 
 * // Empty list
 * <EmptyState
 *   icon="inbox"
 *   title="No leads found"
 *   description="Create your first lead to get started"
 *   action={{ label: 'Add Lead', onClick: handleAddLead }}
 * />
 * 
 * // No search results
 * <EmptyState
 *   icon="search"
 *   title="No results found"
 *   description="Try adjusting your search or filters"
 * />
 * 
 * // Error state
 * <EmptyState
 *   icon="error"
 *   title="Something went wrong"
 *   description="Please try again later"
 *   action={{ label: 'Retry', onClick: handleRetry }}
 * />
 */
