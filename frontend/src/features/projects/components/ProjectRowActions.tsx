'use client';

import React from 'react';
import { MoreHorizontal, Eye, Edit, Trash2, Play, FileText, Package, Users, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Project } from '@/features/projects/types';

interface ProjectRowActionsProps {
  project: Project;
  onView: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onStartDesign?: (project: Project) => void;
  onCreateBOQ?: (project: Project) => void;
  onReserveInventory?: (project: Project) => void;
  onAssignTeam?: (project: Project) => void;
  onMarkComplete?: (project: Project) => void;
}

export const ProjectRowActions = React.memo(function ProjectRowActions({
  project,
  onView,
  onEdit,
  onDelete,
  onStartDesign,
  onCreateBOQ,
  onReserveInventory,
  onAssignTeam,
  onMarkComplete,
}: ProjectRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onView(project)}>
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(project)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Project
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {project.status === 'Approved' && onStartDesign && (
          <DropdownMenuItem onClick={() => onStartDesign(project)}>
            <FileText className="h-4 w-4 mr-2" />
            Start Design
          </DropdownMenuItem>
        )}
        {project.status === 'Design' && onCreateBOQ && (
          <DropdownMenuItem onClick={() => onCreateBOQ(project)}>
            <FileText className="h-4 w-4 mr-2" />
            Create BOQ
          </DropdownMenuItem>
        )}
        {(project.status === 'BOQ' || project.status === 'Procurement') && onReserveInventory && (
          <DropdownMenuItem onClick={() => onReserveInventory(project)}>
            <Package className="h-4 w-4 mr-2" />
            Reserve Inventory
          </DropdownMenuItem>
        )}
        {onAssignTeam && (
          <DropdownMenuItem onClick={() => onAssignTeam(project)}>
            <Users className="h-4 w-4 mr-2" />
            Assign Team
          </DropdownMenuItem>
        )}
        {project.status === 'Installation' && onMarkComplete && (
          <DropdownMenuItem onClick={() => onMarkComplete(project)}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark Complete
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDelete(project)} className="text-red-600">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
