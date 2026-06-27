'use client';

import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, CheckSquare, Edit, Trash2, Clock } from 'lucide-react';
import { Task } from '../types';

interface TaskRowActionsProps {
  task: Task;
  onComplete: (task: Task) => void;
  onVerify: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onViewActivity: (task: Task) => void;
}

export const TaskRowActions = memo(function TaskRowActions({
  task,
  onComplete,
  onVerify,
  onEdit,
  onDelete,
  onViewActivity,
}: TaskRowActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {task.status === 'In Progress' && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onComplete(task)}
          title="Complete Task"
        >
          <Camera className="h-4 w-4" />
        </Button>
      )}
      {task.status === 'Completed' && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onVerify(task)}
          title="Verify Task"
        >
          <CheckSquare className="h-4 w-4" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(task)}
        title="Edit Task"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(task)}
        title="Delete Task"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewActivity(task)}
        title="View Activity History"
      >
        <Clock className="h-4 w-4" />
      </Button>
    </div>
  );
});
