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
import { Estimate, Proposal, Quotation } from '../types/peb-commercial';
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
  Building2,
} from 'lucide-react';

interface DocumentRowActionsProps {
  document: Estimate | Proposal | Quotation;
  onView: (document: Estimate | Proposal | Quotation) => void;
  onEdit: (document: Estimate | Proposal | Quotation) => void;
  onDelete: (document: Estimate | Proposal | Quotation) => void;
  onSend?: (document: Estimate | Proposal | Quotation) => void;
  onConvert?: (document: Estimate | Proposal | Quotation, targetType: 'Estimate' | 'Proposal' | 'Quotation') => void;
  onConvertToProject?: (document: Estimate | Proposal | Quotation) => void;
  onApprove?: (document: Estimate | Proposal | Quotation) => void;
  onReject?: (document: Estimate | Proposal | Quotation) => void;
  onVersion?: (document: Estimate | Proposal | Quotation) => void;
  onEmail?: (document: Estimate | Proposal | Quotation) => void;
  onWhatsApp?: (document: Estimate | Proposal | Quotation) => void;
  onPrint?: (document: Estimate | Proposal | Quotation) => void;
  onDownload?: (document: Estimate | Proposal | Quotation) => void;
  onCopy?: (document: Estimate | Proposal | Quotation) => void;
}

export function DocumentRowActions({
  document,
  onView,
  onEdit,
  onDelete,
  onSend,
  onConvert,
  onConvertToProject,
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

  const getDocumentType = () => {
    const doc = document as any;
    if (doc.estimateNumber) return 'Estimate';
    if (doc.proposalNumber) return 'Proposal';
    if (doc.quotationNumber) return 'Quotation';
    return 'Unknown';
  };

  const docType = getDocumentType();
  const canConvert = (document as any).status === 'Accepted' || (document as any).status === 'Sent';
  const canConvertToProject = docType === 'Quotation' && (document as any).status === 'Accepted' && !(document as any).convertedToProjectId;
  const canApprove = (document as any).status === 'Draft' && !(document as any).approvalStatus;
  const canReject = (document as any).status === 'Draft' && !(document as any).approvalStatus;

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
              {docType !== 'Estimate' && (
                <DropdownMenuItem onClick={() => handleConvert('Estimate')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Estimate
                </DropdownMenuItem>
              )}
              {docType !== 'Proposal' && (
                <DropdownMenuItem onClick={() => handleConvert('Proposal')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Proposal
                </DropdownMenuItem>
              )}
              {docType !== 'Quotation' && (
                <DropdownMenuItem onClick={() => handleConvert('Quotation')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Quotation
                </DropdownMenuItem>
              )}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}

        {/* Convert to Project */}
        {canConvertToProject && onConvertToProject && (
          <DropdownMenuItem onClick={() => onConvertToProject(document)}>
            <Building2 className="h-4 w-4 mr-2" />
            Convert to Project
          </DropdownMenuItem>
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
