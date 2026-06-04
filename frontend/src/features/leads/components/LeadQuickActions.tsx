'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Edit, 
  Phone, 
  FileText, 
  Send, 
  CheckCircle,
  MoreVertical
} from 'lucide-react';

interface LeadQuickActionsProps {
  onAddLead?: () => void;
  onEdit?: () => void;
  onAddFollowUp?: () => void;
  onSendEstimate?: () => void;
  onSendProposal?: () => void;
  onConvertToProject?: () => void;
  isDropdown?: boolean;
}

export function LeadQuickActions({
  onAddLead,
  onEdit,
  onAddFollowUp,
  onSendEstimate,
  onSendProposal,
  onConvertToProject,
  isDropdown = false,
}: LeadQuickActionsProps) {
  const actions = [
    { icon: Plus, label: 'Add Lead', onClick: onAddLead, variant: 'default' as const },
    { icon: Edit, label: 'Edit', onClick: onEdit, variant: 'outline' as const },
    { icon: Phone, label: 'Add Follow-up', onClick: onAddFollowUp, variant: 'outline' as const },
    { icon: FileText, label: 'Send Estimate', onClick: onSendEstimate, variant: 'outline' as const },
    { icon: Send, label: 'Send Proposal', onClick: onSendProposal, variant: 'outline' as const },
    { icon: CheckCircle, label: 'Convert to Project', onClick: onConvertToProject, variant: 'outline' as const },
  ];

  if (isDropdown) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map((action) => (
            <DropdownMenuItem
              key={action.label}
              onClick={action.onClick}
              disabled={!action.onClick}
            >
              <action.icon className="h-4 w-4 mr-2" />
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant={action.variant}
          size="sm"
          onClick={action.onClick}
          disabled={!action.onClick}
          className="gap-2"
        >
          <action.icon className="h-4 w-4" />
          {action.label}
        </Button>
      ))}
    </div>
  );
}
