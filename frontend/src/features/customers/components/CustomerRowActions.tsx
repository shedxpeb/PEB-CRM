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
import { Customer, CustomerStatus } from '@/features/customers/types';
import {
  MoreVertical,
  Edit,
  Eye,
  FolderKanban,
  FileText,
  Trash2,
  CheckCircle,
  GitBranch,
  MessageSquare,
  Mail,
  Calendar,
  Phone,
} from 'lucide-react';

interface CustomerRowActionsProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onViewDetails?: (customer: Customer) => void;
  onViewProjects?: (customer: Customer) => void;
  onViewDocuments?: (customer: Customer) => void;
  onCreateProject?: (customer: Customer) => void;
  onSendWhatsApp?: (customer: Customer) => void;
  onSendEmail?: (customer: Customer) => void;
  onScheduleMeeting?: (customer: Customer) => void;
  onStatusChange?: (customer: Customer, status: CustomerStatus) => void;
}

export function CustomerRowActions({
  customer,
  onEdit,
  onDelete,
  onViewDetails,
  onViewProjects,
  onViewDocuments,
  onCreateProject,
  onSendWhatsApp,
  onSendEmail,
  onScheduleMeeting,
  onStatusChange,
}: CustomerRowActionsProps) {
  const [open, setOpen] = useState(false);

  const handleStatusChange = (status: CustomerStatus) => {
    onStatusChange?.(customer, status);
    setOpen(false);
  };

  const statuses: CustomerStatus[] = ['Active', 'Inactive', 'Prospect', 'Converted', 'Churned'];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {/* View & Edit */}
        <DropdownMenuItem onClick={() => onViewDetails?.(customer)}>
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit(customer)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Customer
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Related Data */}
        <DropdownMenuItem onClick={() => onViewProjects?.(customer)}>
          <FolderKanban className="h-4 w-4 mr-2" />
          View Projects
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onViewDocuments?.(customer)}>
          <FileText className="h-4 w-4 mr-2" />
          View Documents
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Status */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <GitBranch className="h-4 w-4 mr-2" />
            Change Status
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => handleStatusChange(status)}
                className={customer.status === status ? 'bg-muted' : ''}
              >
                {customer.status === status && <CheckCircle className="h-4 w-4 mr-2" />}
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Actions */}
        <DropdownMenuItem onClick={() => onCreateProject?.(customer)}>
          <FolderKanban className="h-4 w-4 mr-2" />
          Create Project
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Communication */}
        <DropdownMenuItem onClick={() => onSendWhatsApp?.(customer)}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Send WhatsApp
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onSendEmail?.(customer)}>
          <Mail className="h-4 w-4 mr-2" />
          Send Email
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onScheduleMeeting?.(customer)}>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Meeting
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit(customer)}>
          <Phone className="h-4 w-4 mr-2" />
          Log Call
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Delete */}
        <DropdownMenuItem
          onClick={() => onDelete(customer)}
          className="text-destructIVE focus:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Customer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
