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
import { Document, DocumentStatus } from '../types';
import {
  MoreVertical,
  Eye,
  Edit,
  Send,
  FileText,
  CheckCircle,
  XCircle,
  RefreshCw,
  GitBranch,
  MessageSquare,
  Mail,
  Printer,
  Download,
  Trash2,
  Clock,
  Copy,
} from 'lucide-react';

interface DocumentRowActionsProps {
  document: Document;
  onView: (document: Document) => void;
  onEdit: (document: Document) => void;
  onDelete: (document: Document) => void;
  onSend?: (document: Document) => void;
  onConvert?: (document: Document, targetType: 'Estimate' | 'Proposal' | 'Quotation') => void;
  onApprove?: (document: Document) => void;
  onReject?: (document: Document) => void;
  onVersion?: (document: Document) => void;
  onEmail?: (document: Document) => void;
  onWhatsApp?: (document: Document) => void;
  onPrint?: (document: Document) => void;
  onDownload?: (document: Document) => void;
  onCopy?: (document: Document) => void;
}

export function DocumentRowActions({
  document,
  onView,
  onEdit,
  onDelete,
  onSend,
  onConvert,
  onApprove,
  onReject,
  onVersion,
  onEmail,
  onWhatsApp,
  onPrint,
  onDownload,
  onCopy,
}: DocumentRowActionsProps) {
  const [open, setOpen] = useState(false);

  const handleConvert = (targetType: 'Estimate' | 'Proposal' | 'Quotation') => {
    onConvert?.(document, targetType);
    setOpen(false);
  };

  const canConvert = document.status === 'Accepted' || document.status === 'Sent';
  const canApprove = document.status === 'Draft' && !document.approvalStatus;
  const canReject = document.status === 'Draft' && !document.approvalStatus;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* View & Edit */}
        <DropdownMenuItem onClick={() => onView(document)}>
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit(document)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Document
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Send */}
        <DropdownMenuItem onClick={() => onSend?.(document)}>
          <Send className="h-4 w-4 mr-2" />
          Send Document
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Convert */}
        {canConvert && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <RefreshCw className="h-4 w-4 mr-2" />
              Convert To
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {document.documentType !== 'Estimate' && (
                <DropdownMenuItem onClick={() => handleConvert('Estimate')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Estimate
                </DropdownMenuItem>
              )}
              {document.documentType !== 'Proposal' && (
                <DropdownMenuItem onClick={() => handleConvert('Proposal')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Proposal
                </DropdownMenuItem>
              )}
              {document.documentType !== 'Quotation' && (
                <DropdownMenuItem onClick={() => handleConvert('Quotation')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Quotation
                </DropdownMenuItem>
              )}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}

        <DropdownMenuSeparator />

        {/* Approval */}
        {canApprove && (
          <DropdownMenuItem onClick={() => onApprove?.(document)}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </DropdownMenuItem>
        )}

        {canReject && (
          <DropdownMenuItem onClick={() => onReject?.(document)}>
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Version */}
        <DropdownMenuItem onClick={() => onVersion?.(document)}>
          <GitBranch className="h-4 w-4 mr-2" />
          Create Version
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Communication */}
        <DropdownMenuItem onClick={() => onEmail?.(document)}>
          <Mail className="h-4 w-4 mr-2" />
          Send Email
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onWhatsApp?.(document)}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Send WhatsApp
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Export */}
        <DropdownMenuItem onClick={() => onPrint?.(document)}>
          <Printer className="h-4 w-4 mr-2" />
          Print
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onDownload?.(document)}>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onCopy?.(document)}>
          <Copy className="h-4 w-4 mr-2" />
          Copy Document
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Delete */}
        <DropdownMenuItem
          onClick={() => onDelete(document)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Document
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
