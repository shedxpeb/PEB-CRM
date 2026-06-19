'use client';

import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { DataTable } from '@/components/data-table/DataTable';
import { 
  useTasks, 
  useTaskStats, 
  useCreateTask, 
  useUpdateTask, 
  useDeleteTask,
  useCompleteTask,
  useVerifyTask,
  useEmployeePerformance,
  useSalaryAdjustments,
  useCreateSalaryAdjustment,
  useApproveSalaryAdjustment,
  useProcessSalaryAdjustment,
  createTaskNotification
} from '@/features/task-management/hooks/useTaskManagement';
import { 
  Task, 
  TaskStatus, 
  TaskPriority, 
  LinkedModule,
  CreateTaskDto,
  CompleteTaskDto,
  VerifyTaskDto,
  SalaryAdjustment,
  AdjustmentType,
  CreateSalaryAdjustmentDto,
  TaskActivity
} from '@/features/task-management/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Camera, 
  Upload,
  User,
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react';
import { TaskRowActions } from '@/features/task-management/components/TaskRowActions';

function SalaryAdjustmentForm({ 
  onSubmit, 
  onCancel,
  createMutation
}: { 
  onSubmit: () => void; 
  onCancel: () => void; 
  createMutation: any;
}) {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    type: 'Credit' as AdjustmentType,
    amount: '',
    description: '',
    reason: '',
    referenceType: 'Manual' as 'Task' | 'Manual' | 'Bonus' | 'Penalty' | 'Other',
    referenceId: '',
    referenceName: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dto = {
      employeeId: formData.employeeId,
      employeeName: formData.employeeName,
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      reason: formData.reason || undefined,
      referenceType: formData.referenceType || undefined,
      referenceId: formData.referenceId || undefined,
      referenceName: formData.referenceName || undefined,
      notes: formData.notes || undefined,
    };
    createMutation.mutate(dto);
    onSubmit();
  };

  const adjustmentTypes: AdjustmentType[] = ['Credit', 'Deduction', 'Advance', 'Bonus', 'Penalty'];
  const referenceTypes: ('Task' | 'Manual' | 'Bonus' | 'Penalty' | 'Other')[] = ['Task', 'Manual', 'Bonus', 'Penalty', 'Other'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="employeeId">Employee ID *</Label>
          <Input
            id="employeeId"
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="employeeName">Employee Name *</Label>
          <Input
            id="employeeName"
            value={formData.employeeName}
            onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Adjustment Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as AdjustmentType })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {adjustmentTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="amount">Amount (₹) *</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description *</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="reason">Reason</Label>
        <Input
          id="reason"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="referenceType">Reference Type</Label>
          <Select value={formData.referenceType} onValueChange={(value) => setFormData({ ...formData, referenceType: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {referenceTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="referenceId">Reference ID</Label>
          <Input
            id="referenceId"
            value={formData.referenceId}
            onChange={(e) => setFormData({ ...formData, referenceId: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="referenceName">Reference Name</Label>
        <Input
          id="referenceName"
          value={formData.referenceName}
          onChange={(e) => setFormData({ ...formData, referenceName: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={2}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Adjustment</Button>
      </div>
    </form>
  );
}

export default function TaskManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<'tasks' | 'performance' | 'salary'>('tasks');
  const [isSalaryDialogOpen, setIsSalaryDialogOpen] = useState(false);

  const { data: tasks, isLoading } = useTasks({
    filter: {
      status: statusFilter === 'all' ? undefined : statusFilter,
      priority: priorityFilter === 'all' ? undefined : priorityFilter,
      search: searchQuery || undefined,
    },
  });

  const { data: stats } = useTaskStats();
  const { data: employeePerformance } = useEmployeePerformance();
  const { data: salaryAdjustments, isLoading: salaryLoading } = useSalaryAdjustments();
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();
  const completeMutation = useCompleteTask();
  const verifyMutation = useVerifyTask();
  const createSalaryMutation = useCreateSalaryAdjustment();
  const approveSalaryMutation = useApproveSalaryAdjustment();
  const processSalaryMutation = useProcessSalaryAdjustment();

  // Create notification when task is assigned
  const handleCreateTask = (data: CreateTaskDto) => {
    createMutation.mutate(data, {
      onSuccess: (task) => {
        createTaskNotification(
          data.assignedUserId,
          'Task Assigned',
          task.taskId,
          task.title,
          'New task assigned to you'
        );
      },
    });
  };

  const statuses: (TaskStatus | 'all')[] = ['all', 'Created', 'Assigned', 'In Progress', 'Completed', 'Verified', 'Closed', 'Cancelled'];
  const priorities: (TaskPriority | 'all')[] = ['all', 'Low', 'Medium', 'High', 'Critical'];

  const columns = [
    {
      key: 'taskId',
      label: 'Task ID',
      sortable: true,
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
    },
    {
      key: 'assignedUserName',
      label: 'Assigned To',
      sortable: true,
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (value: TaskPriority) => (
        <Badge
          variant={value === 'Critical' ? 'destructive' : value === 'High' ? 'default' : value === 'Medium' ? 'secondary' : 'outline'}
          className="text-xs"
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: TaskStatus) => (
        <Badge
          variant={value === 'Completed' || value === 'Verified' ? 'default' : value === 'In Progress' ? 'secondary' : 'outline'}
          className="text-xs"
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      sortable: true,
      render: (value: Date) => (
        <span className="text-sm">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'incentiveValue',
      label: 'Incentive (₹)',
      sortable: true,
      render: (value: number) => (
        <span className="text-sm font-medium">
          ₹{value?.toLocaleString() || '-'}
        </span>
      ),
    },
    {
      key: 'linkedModule',
      label: 'Linked To',
      sortable: true,
      render: (value: LinkedModule, row: Task) => (
        <div className="text-xs">
          <div className="text-muted-foreground">{value || '-'}</div>
          {row.linkedRecordName && <div className="font-medium">{row.linkedRecordName}</div>}
        </div>
      ),
    },
  ];

  const handleDelete = (task: Task) => {
    if (confirm(`Are you sure you want to delete ${task.title}?`)) {
      deleteMutation.mutate(task.id);
    }
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsEditDialogOpen(true);
  };

  const handleComplete = (task: Task) => {
    setSelectedTask(task);
    setIsCompleteDialogOpen(true);
  };

  const handleVerify = (task: Task) => {
    setSelectedTask(task);
    setIsVerifyDialogOpen(true);
  };

  const handleViewActivity = (task: Task) => {
    setSelectedTask(task);
    setIsActivityDialogOpen(true);
  };

  return (
    <MainLayout title="Task Management" subtitle="Track tasks, performance, and payments">
      <div className="space-y-4 sm:space-y-6 w-full overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex items-center bg-muted rounded-lg p-1 w-full sm:w-auto">
          <Button
            variant={activeTab === 'tasks' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('tasks')}
            className="flex-1 sm:flex-none"
          >
            <CheckSquare className="h-4 w-4 mr-2" />
            Tasks
          </Button>
          <Button
            variant={activeTab === 'performance' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('performance')}
            className="flex-1 sm:flex-none"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance
          </Button>
          <Button
            variant={activeTab === 'salary' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('salary')}
            className="flex-1 sm:flex-none"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Salary
          </Button>
        </div>

        {activeTab === 'tasks' ? (
          <>
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="relative flex-1 sm:flex-none max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                  </DialogHeader>
                  <TaskForm onSubmit={(data) => { handleCreateTask(data); setIsCreateDialogOpen(false); }} onCancel={() => setIsCreateDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
              <KPICard
                data={{
                  title: 'Open Tasks',
                  value: (stats?.openTasks ?? 0).toString(),
                  change: 0,
                  color: 'text-blue-600',
                  icon: <CheckSquare className="h-5 w-5" />,
                }}
              />
              <KPICard
                data={{
                  title: 'Overdue Tasks',
                  value: (stats?.overdueTasks ?? 0).toString(),
                  change: 0,
                  color: 'text-red-600',
                  icon: <Clock className="h-5 w-5" />,
                }}
              />
              <KPICard
                data={{
                  title: 'Completed Today',
                  value: (stats?.completedToday ?? 0).toString(),
                  change: 0,
                  color: 'text-green-600',
                  icon: <CheckSquare className="h-5 w-5" />,
                }}
              />
              <KPICard
                data={{
                  title: 'Pending Verification',
                  value: (stats?.pendingVerification ?? 0).toString(),
                  change: 0,
                  color: 'text-orange-600',
                  icon: <User className="h-5 w-5" />,
                }}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">Status:</span>
                {statuses.map(status => (
                  <Badge
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">Priority:</span>
                {priorities.map(priority => (
                  <Badge
                    key={priority}
                    variant={priorityFilter === priority ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setPriorityFilter(priority)}
                  >
                    {priority}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tasks Table */}
            <Card className="min-w-0">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={tasks || []}
                  columns={columns}
                  loading={isLoading}
                  rowActions={(row) => (
                    <TaskRowActions
                      task={row as Task}
                      onComplete={handleComplete}
                      onVerify={handleVerify}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onViewActivity={handleViewActivity}
                    />
                  )}
                />
              </CardContent>
            </Card>
          </>
        ) : activeTab === 'performance' ? (
          <>
            {/* Performance Tab */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
              <KPICard
                data={{
                  title: 'Total Employees',
                  value: (employeePerformance?.length ?? 0).toString(),
                  change: 0,
                  color: 'text-blue-600',
                  icon: <User className="h-5 w-5" />,
                }}
              />
              <KPICard
                data={{
                  title: 'Total Tasks Assigned',
                  value: employeePerformance?.reduce((sum, emp) => sum + emp.tasksAssigned, 0).toString() || '0',
                  change: 0,
                  color: 'text-purple-600',
                  icon: <CheckSquare className="h-5 w-5" />,
                }}
              />
              <KPICard
                data={{
                  title: 'Tasks Completed',
                  value: employeePerformance?.reduce((sum, emp) => sum + emp.tasksCompleted, 0).toString() || '0',
                  change: 0,
                  color: 'text-green-600',
                  icon: <CheckSquare className="h-5 w-5" />,
                }}
              />
              <KPICard
                data={{
                  title: 'Total Payments',
                  value: `₹${employeePerformance?.reduce((sum, emp) => sum + emp.finalPayable, 0).toLocaleString() || '0'}`,
                  change: 0,
                  color: 'text-orange-600',
                  icon: <DollarSign className="h-5 w-5" />,
                }}
              />
            </div>

            {/* Employee Performance Table */}
            <Card className="min-w-0">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Employee Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={employeePerformance || []}
                  columns={[
                    {
                      key: 'employeeName',
                      label: 'Employee',
                      sortable: true,
                    },
                    {
                      key: 'tasksAssigned',
                      label: 'Assigned',
                      sortable: true,
                    },
                    {
                      key: 'tasksCompleted',
                      label: 'Completed',
                      sortable: true,
                    },
                    {
                      key: 'tasksPending',
                      label: 'Pending',
                      sortable: true,
                    },
                    {
                      key: 'completionRate',
                      label: 'Completion Rate',
                      sortable: true,
                      render: (value: number) => (
                        <span className="text-sm font-medium">
                          {value}%
                        </span>
                      ),
                    },
                    {
                      key: 'verifiedTaskIncentives',
                      label: 'Total Earned (₹)',
                      sortable: true,
                      render: (value: number) => (
                        <span className="text-sm font-medium">
                          ₹{value?.toLocaleString() || '-'}
                        </span>
                      ),
                    },
                    {
                      key: 'totalPerformanceScore',
                      label: 'Performance Score',
                      sortable: true,
                      render: (value: number) => (
                        <Badge
                          variant={value >= 90 ? 'default' : value >= 75 ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {value}
                        </Badge>
                      ),
                    },
                  ]}
                  loading={isLoading}
                />
              </CardContent>
            </Card>
          </>
        ) : activeTab === 'salary' ? (
          <>
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="relative flex-1 sm:flex-none max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search adjustments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Dialog open={isSalaryDialogOpen} onOpenChange={setIsSalaryDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Adjustment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Salary Adjustment</DialogTitle>
                  </DialogHeader>
                  <SalaryAdjustmentForm onSubmit={() => setIsSalaryDialogOpen(false)} onCancel={() => setIsSalaryDialogOpen(false)} createMutation={createSalaryMutation} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Salary Adjustments Table */}
            <Card>
              <CardHeader>
                <CardTitle>Salary Adjustments</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={salaryAdjustments || []}
                  columns={[
                    {
                      key: 'employeeName',
                      label: 'Employee',
                      sortable: true,
                    },
                    {
                      key: 'type',
                      label: 'Type',
                      sortable: true,
                      render: (value: AdjustmentType) => (
                        <Badge
                          variant={value === 'Credit' || value === 'Bonus' ? 'default' : value === 'Deduction' || value === 'Penalty' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {value}
                        </Badge>
                      ),
                    },
                    {
                      key: 'amount',
                      label: 'Amount (₹)',
                      sortable: true,
                      render: (value: number) => (
                        <span className="text-sm font-medium">
                          ₹{value?.toLocaleString() || '-'}
                        </span>
                      ),
                    },
                    {
                      key: 'description',
                      label: 'Description',
                      sortable: true,
                    },
                    {
                      key: 'status',
                      label: 'Status',
                      sortable: true,
                      render: (value: string) => (
                        <Badge
                          variant={value === 'Approved' || value === 'Processed' ? 'default' : value === 'Rejected' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {value}
                        </Badge>
                      ),
                    },
                    {
                      key: 'createdAt',
                      label: 'Created',
                      sortable: true,
                      render: (value: Date) => (
                        <span className="text-sm">
                          {new Date(value).toLocaleDateString()}
                        </span>
                      ),
                    },
                  ]}
                  loading={salaryLoading}
                />
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <TaskForm 
              task={selectedTask}
              onSubmit={(data) => { 
                updateMutation.mutate({ id: selectedTask!.id, data });
                setIsEditDialogOpen(false); 
              }} 
              onCancel={() => setIsEditDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Complete Task Dialog with Photo Proof */}
      <Dialog open={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Task - Photo Proof Required</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <CompleteTaskForm 
              task={selectedTask}
              onSubmit={(data) => {
                completeMutation.mutate({ id: selectedTask.id, data });
                // Create notification for task completion
                createTaskNotification(
                  selectedTask.assignedUserId,
                  'Task Completed',
                  selectedTask.taskId,
                  selectedTask.title,
                  'Task marked as complete and pending verification'
                );
                setIsCompleteDialogOpen(false);
              }} 
              onCancel={() => setIsCompleteDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Verify Task Dialog */}
      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Verify Task Completion</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <VerifyTaskForm 
              task={selectedTask}
              onSubmit={(data) => {
                verifyMutation.mutate({ 
                  id: selectedTask.id, 
                  data,
                  verifiedBy: 'admin-1', // Should come from auth context
                  verifiedByName: 'Admin User' // Should come from auth context
                });
                // Create notification for task verification/rejection
                const notificationType = data.status === 'Verified' ? 'Task Verified' : 'Task Rejected';
                createTaskNotification(
                  selectedTask.assignedUserId,
                  notificationType,
                  selectedTask.taskId,
                  selectedTask.title,
                  data.status === 'Verified' 
                    ? 'Task verified by manager' 
                    : `Task rejected: ${data.verificationNotes || 'No reason provided'}`
                );
                setIsVerifyDialogOpen(false);
              }} 
              onCancel={() => setIsVerifyDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Activity History Dialog */}
      <Dialog open={isActivityDialogOpen} onOpenChange={setIsActivityDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Activity History</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold">{selectedTask.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedTask.taskId}</p>
              </div>
              {selectedTask.activityHistory && selectedTask.activityHistory.length > 0 ? (
                <div className="space-y-3">
                  {selectedTask.activityHistory.map((activity: TaskActivity) => (
                    <div key={activity.id} className="flex gap-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{activity.activityType}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">By: {activity.performedByName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No activity history available</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}

function TaskForm({
  task,
  onSubmit,
  onCancel
}: {
  task?: Task;
  onSubmit: (data: CreateTaskDto) => void;
  onCancel: () => void;
}) {
  const isEdit = !!task;
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    assignedUserId: task?.assignedUserId || '',
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    priority: task?.priority || 'Medium' as TaskPriority,
    linkedModule: task?.linkedModule || 'General' as LinkedModule,
    linkedRecordId: task?.linkedRecordId || '',
    linkedRecordName: task?.linkedRecordName || '',
    projectId: task?.projectId || '',
    incentiveValue: task?.incentiveValue?.toString() || '',
    notes: task?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dto: CreateTaskDto = {
      title: formData.title,
      description: formData.description,
      assignedUserId: formData.assignedUserId,
      dueDate: new Date(formData.dueDate),
      priority: formData.priority,
      linkedModule: formData.linkedModule,
      linkedRecordId: formData.linkedRecordId || undefined,
      linkedRecordName: formData.linkedRecordName || undefined,
      projectId: formData.projectId || undefined,
      incentiveValue: parseFloat(formData.incentiveValue),
      notes: formData.notes || undefined,
    };

    // This would call the mutation - for now just close the dialog
    // In production: createMutation.mutate(dto);
    onSubmit(dto);
  };

  const modules: LinkedModule[] = ['Leads', 'Customers', 'Projects', 'Inventory', 'Finance', 'Documents', 'General'];
  const priorities: TaskPriority[] = ['Low', 'Medium', 'High', 'Critical'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="assignedUserId">Assigned User ID *</Label>
          <Input
            id="assignedUserId"
            value={formData.assignedUserId}
            onChange={(e) => setFormData({ ...formData, assignedUserId: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date *</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate || ''}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="priority">Priority *</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value as TaskPriority })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {priorities.map(prio => (
                <SelectItem key={prio} value={prio}>
                  {prio}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="incentiveValue">Incentive Value (₹) *</Label>
          <Input
            id="incentiveValue"
            type="number"
            value={formData.incentiveValue}
            onChange={(e) => setFormData({ ...formData, incentiveValue: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkedModule">Linked Module</Label>
          <Select value={formData.linkedModule} onValueChange={(value) => setFormData({ ...formData, linkedModule: value as LinkedModule })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {modules.map(mod => (
                <SelectItem key={mod} value={mod}>
                  {mod}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="linkedRecordId">Linked Record ID</Label>
          <Input
            id="linkedRecordId"
            value={formData.linkedRecordId}
            onChange={(e) => setFormData({ ...formData, linkedRecordId: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="linkedRecordName">Linked Record Name</Label>
        <Input
          id="linkedRecordName"
          value={formData.linkedRecordName}
          onChange={(e) => setFormData({ ...formData, linkedRecordName: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="projectId">Project ID (Direct Link)</Label>
        <Input
          id="projectId"
          value={formData.projectId}
          onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
          placeholder="Enter project ID for direct hierarchy link"
        />
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={2}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{task ? 'Update Task' : 'Create Task'}</Button>
      </div>
    </form>
  );
}

function CompleteTaskForm({ 
  task, 
  onSubmit, 
  onCancel 
}: { 
  task: Task; 
  onSubmit: (data: CompleteTaskDto) => void; 
  onCancel: () => void; 
}) {
  const [beforePhotoUrls, setBeforePhotoUrls] = useState<string[]>([]);
  const [afterPhotoUrls, setAfterPhotoUrls] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const handleBeforePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newUrls = Array.from(files).map((file, index) => 
        `/uploads/task-${task.id}-before-${Date.now()}-${index}.jpg`
      );
      setBeforePhotoUrls([...beforePhotoUrls, ...newUrls]);
    }
  };

  const handleAfterPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newUrls = Array.from(files).map((file, index) => 
        `/uploads/task-${task.id}-after-${Date.now()}-${index}.jpg`
      );
      setAfterPhotoUrls([...afterPhotoUrls, ...newUrls]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (afterPhotoUrls.length === 0) {
      alert('After photo proof is mandatory for task completion');
      return;
    }

    onSubmit({
      completionProof: {
        beforePhotoUrls,
        afterPhotoUrls,
        notes,
      },
      completedAt: new Date(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800 font-medium mb-2">
          <Camera className="h-4 w-4 inline mr-2" />
          Photo Proof is Mandatory
        </p>
        <p className="text-xs text-yellow-700">
          You must upload at least one photo as proof of task completion before marking it as complete.
        </p>
      </div>

      <div>
        <Label htmlFor="before-photos">Before Photos (Optional)</Label>
        <div className="flex items-center gap-2">
          <Input
            id="before-photos"
            type="file"
            accept="image/*"
            multiple
            onChange={handleBeforePhotoUpload}
            className="flex-1"
          />
          <Button type="button" variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
        {beforePhotoUrls.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {beforePhotoUrls.map((url: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                Before Photo {index + 1}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="after-photos">After Photos *</Label>
        <div className="flex items-center gap-2">
          <Input
            id="after-photos"
            type="file"
            accept="image/*"
            multiple
            onChange={handleAfterPhotoUpload}
            className="flex-1"
          />
          <Button type="button" variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
        {afterPhotoUrls.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {afterPhotoUrls.map((url: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                After Photo {index + 1}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="notes">Completion Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Describe how the task was completed..."
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={afterPhotoUrls.length === 0}>
          <CheckSquare className="h-4 w-4 mr-2" />
          Complete Task
        </Button>
      </div>
    </form>
  );
}

function VerifyTaskForm({ 
  task, 
  onSubmit, 
  onCancel 
}: { 
  task: Task; 
  onSubmit: (data: VerifyTaskDto) => void; 
  onCancel: () => void; 
}) {
  const [status, setStatus] = useState<'Verified' | 'Rejected'>('Verified');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      status,
      verificationNotes: notes,
      verifiedAt: new Date(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {task.completionProof?.afterPhotoUrls && (
        <div>
          <Label>Completion Proof Photos</Label>
          {task.completionProof.beforePhotoUrls && task.completionProof.beforePhotoUrls.length > 0 && (
            <div className="mt-2">
              <span className="text-xs font-medium text-muted-foreground">Before:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {task.completionProof.beforePhotoUrls.map((url: string, index: number) => (
                  <Badge key={`before-${index}`} variant="outline" className="text-xs">
                    Before Photo {index + 1}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <div className="mt-2">
            <span className="text-xs font-medium text-muted-foreground">After:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {task.completionProof.afterPhotoUrls.map((url: string, index: number) => (
                <Badge key={`after-${index}`} variant="outline" className="text-xs">
                  After Photo {index + 1}
                </Badge>
              ))}
            </div>
          </div>
          {task.completionProof.videoUrl && (
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                Video Proof Available
              </Badge>
            </div>
          )}
          {task.completionProof.notes && (
            <p className="text-sm text-muted-foreground mt-2">
              Notes: {task.completionProof.notes}
            </p>
          )}
        </div>
      )}

      <div>
        <Label htmlFor="status">Verification Decision *</Label>
        <Select value={status} onValueChange={(value) => setStatus(value as 'Verified' | 'Rejected')}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Verified">Verified</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="notes">Verification Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Add verification notes..."
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant={status === 'Verified' ? 'default' : 'destructive'}>
          {status === 'Verified' ? 'Verify Task' : 'Reject Task'}
        </Button>
      </div>
    </form>
  );
}
