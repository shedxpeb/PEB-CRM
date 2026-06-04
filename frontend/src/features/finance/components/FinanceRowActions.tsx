'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Pencil, Trash2, Send, CheckCircle, XCircle, FileText } from 'lucide-react';

interface FinanceRowActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSend?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onGenerateReport?: () => void;
}

export function FinanceRowActions({
  onView,
  onEdit,
  onDelete,
  onSend,
  onApprove,
  onReject,
  onGenerateReport,
}: FinanceRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onView && (
          <DropdownMenuItem onClick={onView}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
        )}
        {onSend && (
          <DropdownMenuItem onClick={onSend}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </DropdownMenuItem>
        )}
        {onApprove && (
          <DropdownMenuItem onClick={onApprove}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </DropdownMenuItem>
        )}
        {onReject && (
          <DropdownMenuItem onClick={onReject}>
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </DropdownMenuItem>
        )}
        {onGenerateReport && (
          <DropdownMenuItem onClick={onGenerateReport}>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem onClick={onDelete} className="text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
