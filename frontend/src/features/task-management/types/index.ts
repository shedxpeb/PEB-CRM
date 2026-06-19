/**
 * Task Management Types
 * 
 * Comprehensive task management system with:
 * - Mandatory photo proof for completion
 * - Employee performance tracking
 * - Payment per task
 * - Salary adjustments
 * - Verification workflow
 * - Cross-module links
 */

// ─── Task Priority ──────────────────────────────────────────────────────────────

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';

// ─── Task Status ────────────────────────────────────────────────────────────────

export type TaskStatus = 
  | 'Created'
  | 'Assigned'
  | 'In Progress'
  | 'Completed'
  | 'Verified'
  | 'Closed'
  | 'Cancelled';

// ─── Linked Module Types ─────────────────────────────────────────────────────────

export type LinkedModule = 
  | 'Leads'
  | 'Customers'
  | 'Projects'
  | 'Inventory'
  | 'Finance'
  | 'Documents'
  | 'General';

// ─── Task Entity ────────────────────────────────────────────────────────────────

export interface Task {
  // Core Fields
  id: string;
  taskId: string; // Task ID (e.g., "TSK-001")
  title: string;
  description?: string;
  
  // Assignment
  assignedUserId: string;
  assignedUserName: string;
  createdBy: string;
  createdByName: string;
  
  // Dates
  dueDate: Date;
  completedAt?: Date;
  verifiedAt?: Date;
  closedAt?: Date;
  
  // Status & Priority
  priority: TaskPriority;
  status: TaskStatus;
  
  // Cross-Module Links
  linkedModule?: LinkedModule;
  linkedRecordId?: string;
  linkedRecordName?: string;
  projectId?: string; // Direct link to Project for hierarchy
  
  // Payment (Incentive-based, not full salary)
  incentiveValue: number; // Set by Admin/Manager - this is the incentive amount, not full salary
  isPaymentEditable: boolean; // Only for authorized users
  
  // Completion Proof (Mandatory)
  completionProof?: {
    beforePhotoUrls: string[]; // Photos before task started
    afterPhotoUrls: string[]; // Photos after task completed (mandatory)
    videoUrl?: string; // Optional video proof (future)
    notes?: string;
    uploadedAt?: Date;
    uploadedBy?: string;
  };
  
  // Verification
  verifiedBy?: string;
  verifiedByName?: string;
  verificationNotes?: string;
  
  // General Notes
  notes?: string;
  internalNotes?: string;
  
  // Activity History (Audit Trail)
  activityHistory?: TaskActivity[];
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  
  // Tags
  tags?: string[];
}

// ─── Task Activity History (Audit Trail) ───────────────────────────────────────

export type TaskActivityType =
  | 'Created'
  | 'Assigned'
  | 'Started'
  | 'In Progress'
  | 'Photos Uploaded'
  | 'Completed'
  | 'Verified'
  | 'Rejected'
  | 'Closed'
  | 'Cancelled'
  | 'Reassigned'
  | 'Priority Changed'
  | 'Due Date Changed';

export interface TaskActivity {
  id: string;
  taskId: string;
  activityType: TaskActivityType;
  description: string;
  performedBy: string;
  performedByName: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// ─── Notification Types ───────────────────────────────────────────────────────

export type NotificationType =
  | 'Task Assigned'
  | 'Task Verified'
  | 'Task Rejected'
  | 'Task Completed'
  | 'Task Due Soon'
  | 'Task Overdue';

export interface TaskNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  taskId: string;
  taskTitle: string;
  isRead: boolean;
  createdAt: Date;
  metadata?: Record<string, any>;
}

// ─── Employee Performance Stats ─────────────────────────────────────────────────

export interface EmployeePerformanceStats {
  employeeId: string;
  employeeName: string;
  
  // Task Counts
  tasksAssigned: number;
  tasksCompleted: number;
  tasksPending: number;
  tasksOverdue: number;
  tasksVerified: number;
  tasksRejected: number;
  
  // Performance Metrics
  completionRate: number; // percentage
  onTimeCompletionRate: number; // percentage
  averageCompletionTime: number; // in days
  
  // Financial (Incentive-based)
  baseSalary: number; // Monthly base salary
  verifiedTaskIncentives: number; // Total from verified tasks only
  bonuses: number; // Additional bonuses
  advances: number; // Advances taken
  penalties: number; // Penalties applied
  finalPayable: number; // Base + Incentives + Bonus - Advance - Penalty
  
  // Payment Status
  totalPaymentPending: number;
  totalPaymentReceived: number;
  
  // Performance Score
  totalPerformanceScore: number; // calculated based on completion rate, timeliness, quality
  
  // Rankings
  rank?: number;
  percentile?: number;
}

// ─── Salary Adjustment Types ────────────────────────────────────────────────────

export type AdjustmentType = 
  | 'Credit'
  | 'Deduction'
  | 'Advance'
  | 'Bonus'
  | 'Penalty';

// ─── Salary Adjustment ─────────────────────────────────────────────────────────

export interface SalaryAdjustment {
  id: string;
  employeeId: string;
  employeeName: string;
  
  // Adjustment Details
  type: AdjustmentType;
  amount: number;
  description: string;
  reason?: string;
  
  // Reference
  referenceType?: 'Task' | 'Manual' | 'Bonus' | 'Penalty' | 'Other';
  referenceId?: string;
  referenceName?: string;
  
  // Status
  status: 'Pending' | 'Approved' | 'Rejected' | 'Processed';
  
  // Approval
  approvedBy?: string;
  approvedByName?: string;
  approvedAt?: Date;
  
  // Processing
  processedAt?: Date;
  processedBy?: string;
  
  // Metadata
  createdAt: Date;
  createdBy: string;
  notes?: string;
}

// ─── Employee Salary Ledger ─────────────────────────────────────────────────────

export interface EmployeeSalaryLedger {
  employeeId: string;
  employeeName: string;
  
  // Opening Balance
  openingBalance: number;
  
  // Earnings
  taskEarnings: number;
  bonuses: number;
  otherCredits: number;
  
  // Deductions
  advances: number;
  penalties: number;
  otherDeductions: number;
  
  // Current Payable
  currentPayable: number;
  
  // Payment History
  totalPaid: number;
  lastPaymentDate?: Date;
  
  // Adjustments
  adjustments: SalaryAdjustment[];
  
  // Period
  periodStart: Date;
  periodEnd: Date;
}

// ─── DTOs ───────────────────────────────────────────────────────────────────────

export interface CreateTaskDto {
  title: string;
  description?: string;
  assignedUserId: string;
  dueDate: Date;
  priority: TaskPriority;
  linkedModule?: LinkedModule;
  linkedRecordId?: string;
  linkedRecordName?: string;
  projectId?: string; // Direct link to Project for hierarchy
  incentiveValue: number; // Incentive amount, not full salary
  notes?: string;
  tags?: string[];
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  assignedUserId?: string;
  dueDate?: Date;
  priority?: TaskPriority;
  status?: TaskStatus;
  linkedModule?: LinkedModule;
  linkedRecordId?: string;
  linkedRecordName?: string;
  projectId?: string; // Direct link to Project for hierarchy
  incentiveValue?: number;
  notes?: string;
  tags?: string[];
}

export interface CompleteTaskDto {
  completionProof: {
    beforePhotoUrls: string[];
    afterPhotoUrls: string[];
    videoUrl?: string;
    notes?: string;
  };
  completedAt: Date;
}

export interface VerifyTaskDto {
  status: 'Verified' | 'Rejected';
  verificationNotes?: string;
  verifiedAt: Date;
}

export interface CreateSalaryAdjustmentDto {
  employeeId: string;
  employeeName: string;
  type: AdjustmentType;
  amount: number;
  description: string;
  reason?: string;
  referenceType?: 'Task' | 'Manual' | 'Bonus' | 'Penalty' | 'Other';
  referenceId?: string;
  referenceName?: string;
  notes?: string;
}

export interface UpdateSalaryAdjustmentDto {
  type?: AdjustmentType;
  amount?: number;
  description?: string;
  reason?: string;
  status?: 'Pending' | 'Approved' | 'Rejected' | 'Processed';
  notes?: string;
}

// ─── Filter & Query Types ───────────────────────────────────────────────────────

export interface TaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedUserId?: string;
  linkedModule?: LinkedModule;
  search?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  completedDateFrom?: Date;
  completedDateTo?: Date;
  tags?: string[];
}

export interface TaskQuery {
  page?: number;
  pageSize?: number;
  filter?: TaskFilter;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SalaryAdjustmentFilter {
  employeeId?: string;
  type?: AdjustmentType;
  status?: 'Pending' | 'Approved' | 'Rejected' | 'Processed';
  dateFrom?: Date;
  dateTo?: Date;
}

export interface SalaryAdjustmentQuery {
  page?: number;
  pageSize?: number;
  filter?: SalaryAdjustmentFilter;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ─── Stats Types ────────────────────────────────────────────────────────────────

export interface TaskStats {
  totalTasks: number;
  openTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  verifiedTasks: number;
  closedTasks: number;
  cancelledTasks: number;
  
  overdueTasks: number;
  dueToday: number;
  dueThisWeek: number;
  
  tasksByPriority: Record<TaskPriority, number>;
  tasksByStatus: Record<TaskStatus, number>;
  tasksByModule: Record<LinkedModule, number>;
  
  pendingVerification: number;
  completedToday: number;
  
  totalPaymentValue: number;
  paymentPending: number;
  paymentProcessed: number;
}

export interface DashboardTaskKPIs {
  openTasks: number;
  overdueTasks: number;
  completedToday: number;
  pendingVerification: number;
  verifiedToday: number;
  topPerformers: EmployeePerformanceStats[];
}
