'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Lead, LeadStatus } from '@/types/leads';
import { 
  MoreVertical,
  Edit,
  TrendingUp,
  Activity,
  FileText,
  Trash2,
  CheckCircle,
  GitBranch,
  Eye,
  Clock,
  User
} from 'lucide-react';
import { LeadTracker } from './LeadTracker';
import { LeadLogsDialog } from './LeadLogsDialog';
import { AddScoreDialog } from './AddScoreDialog';
import { StatusChangeDialog } from './StatusChangeDialog';

interface LeadRowActionsProps {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
  onConvertToCustomer?: (lead: Lead) => void;
  onTrack?: (lead: Lead) => void;
  onViewLogs?: (lead: Lead) => void;
  onAddScore?: (lead: Lead, score: number) => void;
  onStatusChange?: (lead: Lead, status: LeadStatus) => void;
}

export function LeadRowActions({
  lead,
  onEdit,
  onDelete,
  onConvert,
  onConvertToCustomer,
  onTrack,
  onViewLogs,
  onAddScore,
  onStatusChange,
}: LeadRowActionsProps) {
  const [showTracker, setShowTracker] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showStatusChange, setShowStatusChange] = useState(false);
  const [open, setOpen] = useState(false);

  const handleStatusChange = (status: LeadStatus) => {
    onStatusChange?.(lead, status);
    setOpen(false);
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {/* View & Edit */}
          <DropdownMenuItem onClick={() => onEdit(lead)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Lead
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setShowTracker(true)}>
            <Eye className="h-4 w-4 mr-2" />
            Track Lead
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setShowLogs(true)}>
            <FileText className="h-4 w-4 mr-2" />
            View Logs
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Scoring */}
          <DropdownMenuItem onClick={() => setShowScore(true)}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Add Score
          </DropdownMenuItem>

          {/* Status Change */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <GitBranch className="h-4 w-4 mr-2" />
              Change Status
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {['New', 'Contacted', 'Design Pending', 'BOQ Pending', 'Estimate Sent', 'Proposal Sent', 'Negotiation', 'Approved', 'Rejected', 'Converted'].map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => handleStatusChange(status as LeadStatus)}
                  className={lead.status === status ? 'bg-muted' : ''}
                >
                  {lead.status === status && <CheckCircle className="h-4 w-4 mr-2" />}
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          {/* Actions */}
          {onConvertToCustomer && (
            <DropdownMenuItem onClick={() => onConvertToCustomer(lead)}>
              <User className="h-4 w-4 mr-2" />
              Convert to Customer
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={() => onConvert(lead)}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Convert to Project
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Delete */}
          <DropdownMenuItem
            onClick={() => onDelete(lead)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Lead
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Lead Tracker Dialog */}
      <LeadTracker
        lead={lead}
        open={showTracker}
        onOpenChange={setShowTracker}
      />

      {/* Activity Logs Dialog */}
      <LeadLogsDialog
        lead={lead}
        open={showLogs}
        onOpenChange={setShowLogs}
      />

      {/* Add Score Dialog */}
      <AddScoreDialog
        lead={lead}
        open={showScore}
        onOpenChange={setShowScore}
        onSubmit={(score: number) => {
          onAddScore?.(lead, score);
          setShowScore(false);
        }}
      />

      {/* Status Change Dialog */}
      <StatusChangeDialog
        lead={lead}
        open={showStatusChange}
        onOpenChange={setShowStatusChange}
        onSubmit={(status: LeadStatus) => {
          onStatusChange?.(lead, status);
          setShowStatusChange(false);
        }}
      />
    </>
  );
}
