/**
 * Task Management API Service
 * API calls for Task Management, Employee Performance, and Salary Adjustments
 */

import {
  Task,
  EmployeePerformanceStats,
  SalaryAdjustment,
  EmployeeSalaryLedger,
  CreateTaskDto,
  UpdateTaskDto,
  CompleteTaskDto,
  VerifyTaskDto,
  CreateSalaryAdjustmentDto,
  UpdateSalaryAdjustmentDto,
  TaskQuery,
  TaskStats,
  DashboardTaskKPIs,
  SalaryAdjustmentQuery,
  TaskActivity,
  TaskActivityType,
} from '../types';

// Helper function to create activity entries
function createActivity(
  taskId: string,
  activityType: TaskActivityType,
  description: string,
  performedBy: string,
  performedByName: string,
  metadata?: Record<string, any>
): TaskActivity {
  return {
    id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    taskId,
    activityType,
    description,
    performedBy,
    performedByName,
    timestamp: new Date(),
    metadata,
  };
}

// Mock data for development (replace with actual API calls)
const mockTasks: Task[] = [
  {
    id: '1',
    taskId: 'TSK-001',
    title: 'Install Roofing Sheets - Warehouse A',
    description: 'Install PPGL roofing sheets on Warehouse A building',
    assignedUserId: 'user-1',
    assignedUserName: 'Rajesh Kumar',
    createdBy: 'admin-1',
    createdByName: 'Admin User',
    dueDate: new Date('2024-01-20'),
    priority: 'High',
    status: 'Completed',
    linkedModule: 'Projects',
    linkedRecordId: 'proj-1',
    linkedRecordName: 'Warehouse Construction',
    incentiveValue: 2500,
    isPaymentEditable: false,
    completionProof: {
      beforePhotoUrls: ['/uploads/task-1-before-1.jpg'],
      afterPhotoUrls: ['/uploads/task-1-after-1.jpg', '/uploads/task-1-after-2.jpg'],
      notes: 'Installation completed as per specifications',
      uploadedAt: new Date('2024-01-19'),
      uploadedBy: 'user-1',
    },
    completedAt: new Date('2024-01-19'),
    verifiedBy: 'admin-1',
    verifiedByName: 'Admin User',
    verifiedAt: new Date('2024-01-19'),
    verificationNotes: 'Verified - quality check passed',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-19'),
    activityHistory: [
      {
        id: 'activity-1',
        taskId: 'TSK-001',
        activityType: 'Created',
        description: 'Task created',
        performedBy: 'admin-1',
        performedByName: 'Admin User',
        timestamp: new Date('2024-01-15T09:00:00'),
      },
      {
        id: 'activity-2',
        taskId: 'TSK-001',
        activityType: 'Assigned',
        description: 'Assigned to Rajesh Kumar',
        performedBy: 'admin-1',
        performedByName: 'Admin User',
        timestamp: new Date('2024-01-15T09:05:00'),
      },
      {
        id: 'activity-3',
        taskId: 'TSK-001',
        activityType: 'Started',
        description: 'Task started',
        performedBy: 'user-1',
        performedByName: 'Rajesh Kumar',
        timestamp: new Date('2024-01-18T09:00:00'),
      },
      {
        id: 'activity-4',
        taskId: 'TSK-001',
        activityType: 'Photos Uploaded',
        description: 'Uploaded before and after photos',
        performedBy: 'user-1',
        performedByName: 'Rajesh Kumar',
        timestamp: new Date('2024-01-19T14:15:00'),
      },
      {
        id: 'activity-5',
        taskId: 'TSK-001',
        activityType: 'Completed',
        description: 'Task marked as complete',
        performedBy: 'user-1',
        performedByName: 'Rajesh Kumar',
        timestamp: new Date('2024-01-19T14:20:00'),
      },
      {
        id: 'activity-6',
        taskId: 'TSK-001',
        activityType: 'Verified',
        description: 'Task verified by Admin User',
        performedBy: 'admin-1',
        performedByName: 'Admin User',
        timestamp: new Date('2024-01-19T15:00:00'),
      },
    ],
  },
  {
    id: '2',
    taskId: 'TSK-002',
    title: 'Steel Frame Assembly - Section B',
    description: 'Assemble steel frame for Section B of the building',
    assignedUserId: 'user-2',
    assignedUserName: 'Amit Singh',
    createdBy: 'admin-1',
    createdByName: 'Admin User',
    dueDate: new Date('2024-01-25'),
    priority: 'Critical',
    status: 'In Progress',
    linkedModule: 'Projects',
    linkedRecordId: 'proj-1',
    linkedRecordName: 'Warehouse Construction',
    incentiveValue: 5000,
    isPaymentEditable: false,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    taskId: 'TSK-003',
    title: 'Electrical Wiring - Floor 1',
    description: 'Complete electrical wiring for first floor',
    assignedUserId: 'user-3',
    assignedUserName: 'Suresh Patel',
    createdBy: 'admin-1',
    createdByName: 'Admin User',
    dueDate: new Date('2024-01-22'),
    priority: 'High',
    status: 'Assigned',
    linkedModule: 'Projects',
    linkedRecordId: 'proj-2',
    linkedRecordName: 'Office Building',
    incentiveValue: 3500,
    isPaymentEditable: false,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: '4',
    taskId: 'TSK-004',
    title: 'Inventory Count - Steel Plates',
    description: 'Perform physical count of steel plate inventory',
    assignedUserId: 'user-1',
    assignedUserName: 'Rajesh Kumar',
    createdBy: 'admin-1',
    createdByName: 'Admin User',
    dueDate: new Date('2024-01-18'),
    priority: 'Medium',
    status: 'Verified',
    linkedModule: 'Inventory',
    linkedRecordId: 'inv-1',
    linkedRecordName: 'Steel Plates Stock',
    incentiveValue: 800,
    isPaymentEditable: false,
    completionProof: {
      beforePhotoUrls: ['/uploads/task-4-before.jpg'],
      afterPhotoUrls: ['/uploads/task-4-after.jpg'],
      notes: 'Count completed - 150 plates verified',
      uploadedAt: new Date('2024-01-17'),
      uploadedBy: 'user-1',
    },
    completedAt: new Date('2024-01-17'),
    verifiedBy: 'admin-1',
    verifiedByName: 'Admin User',
    verifiedAt: new Date('2024-01-18'),
    verificationNotes: 'Count verified against system records',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-18'),
    activityHistory: [
      {
        id: 'activity-7',
        taskId: 'TSK-004',
        activityType: 'Created',
        description: 'Task created',
        performedBy: 'admin-1',
        performedByName: 'Admin User',
        timestamp: new Date('2024-01-15T10:00:00'),
      },
      {
        id: 'activity-8',
        taskId: 'TSK-004',
        activityType: 'Assigned',
        description: 'Assigned to Rajesh Kumar',
        performedBy: 'admin-1',
        performedByName: 'Admin User',
        timestamp: new Date('2024-01-15T10:05:00'),
      },
      {
        id: 'activity-9',
        taskId: 'TSK-004',
        activityType: 'Photos Uploaded',
        description: 'Uploaded before and after photos',
        performedBy: 'user-1',
        performedByName: 'Rajesh Kumar',
        timestamp: new Date('2024-01-17T16:00:00'),
      },
      {
        id: 'activity-10',
        taskId: 'TSK-004',
        activityType: 'Completed',
        description: 'Task marked as complete',
        performedBy: 'user-1',
        performedByName: 'Rajesh Kumar',
        timestamp: new Date('2024-01-17T16:30:00'),
      },
      {
        id: 'activity-11',
        taskId: 'TSK-004',
        activityType: 'Verified',
        description: 'Task verified by Admin User',
        performedBy: 'admin-1',
        performedByName: 'Admin User',
        timestamp: new Date('2024-01-18T10:00:00'),
      },
    ],
  },
  {
    id: '5',
    taskId: 'TSK-005',
    title: 'Client Follow-up - Lead #45',
    description: 'Follow up with client regarding quotation for PEB structure',
    assignedUserId: 'user-4',
    assignedUserName: 'Priya Sharma',
    createdBy: 'admin-1',
    createdByName: 'Admin User',
    dueDate: new Date('2024-01-21'),
    priority: 'Medium',
    status: 'In Progress',
    linkedModule: 'Leads',
    linkedRecordId: 'lead-45',
    linkedRecordName: 'ABC Manufacturing - PEB Quotation',
    incentiveValue: 500,
    isPaymentEditable: false,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-19'),
  },
];

const mockSalaryAdjustments: SalaryAdjustment[] = [
  {
    id: 'adj-1',
    employeeId: 'user-1',
    employeeName: 'Rajesh Kumar',
    type: 'Bonus',
    amount: 2000,
    description: 'Performance bonus for completing 10 tasks on time',
    reason: 'Exceeds performance targets',
    referenceType: 'Bonus',
    status: 'Processed',
    approvedBy: 'admin-1',
    approvedByName: 'Admin User',
    approvedAt: new Date('2024-01-15'),
    processedAt: new Date('2024-01-16'),
    processedBy: 'admin-1',
    createdAt: new Date('2024-01-15'),
    createdBy: 'admin-1',
  },
  {
    id: 'adj-2',
    employeeId: 'user-2',
    employeeName: 'Amit Singh',
    type: 'Advance',
    amount: 5000,
    description: 'Salary advance for personal emergency',
    reason: 'Personal emergency',
    referenceType: 'Manual',
    status: 'Approved',
    approvedBy: 'admin-1',
    approvedByName: 'Admin User',
    approvedAt: new Date('2024-01-10'),
    createdAt: new Date('2024-01-10'),
    createdBy: 'admin-1',
  },
];

const mockTaskStats: TaskStats = {
  totalTasks: 5,
  openTasks: 2,
  inProgressTasks: 2,
  completedTasks: 2,
  verifiedTasks: 2,
  closedTasks: 0,
  cancelledTasks: 0,
  overdueTasks: 0,
  dueToday: 0,
  dueThisWeek: 2,
  tasksByPriority: {
    Low: 0,
    Medium: 2,
    High: 2,
    Critical: 1,
  },
  tasksByStatus: {
    Created: 0,
    Assigned: 1,
    'In Progress': 2,
    Completed: 1,
    Verified: 1,
    Closed: 0,
    Cancelled: 0,
  },
  tasksByModule: {
    Leads: 1,
    Customers: 0,
    Projects: 3,
    Inventory: 1,
    Finance: 0,
    Documents: 0,
    General: 0,
  },
  pendingVerification: 1,
  completedToday: 0,
  totalPaymentValue: 12300,
  paymentPending: 8500,
  paymentProcessed: 3800,
};

const mockEmployeePerformance: EmployeePerformanceStats[] = [
  {
    employeeId: 'user-1',
    employeeName: 'Rajesh Kumar',
    tasksAssigned: 2,
    tasksCompleted: 2,
    tasksPending: 0,
    tasksOverdue: 0,
    tasksVerified: 2,
    tasksRejected: 0,
    completionRate: 100,
    onTimeCompletionRate: 100,
    averageCompletionTime: 2,
    baseSalary: 25000,
    verifiedTaskIncentives: 3300,
    bonuses: 2000,
    advances: 0,
    penalties: 0,
    finalPayable: 30300,
    totalPaymentPending: 0,
    totalPaymentReceived: 30300,
    totalPerformanceScore: 95,
    rank: 1,
    percentile: 95,
  },
  {
    employeeId: 'user-2',
    employeeName: 'Amit Singh',
    tasksAssigned: 1,
    tasksCompleted: 0,
    tasksPending: 1,
    tasksOverdue: 0,
    tasksVerified: 0,
    tasksRejected: 0,
    completionRate: 0,
    onTimeCompletionRate: 0,
    averageCompletionTime: 0,
    baseSalary: 22000,
    verifiedTaskIncentives: 0,
    bonuses: 0,
    advances: 5000,
    penalties: 0,
    finalPayable: 17000,
    totalPaymentPending: 17000,
    totalPaymentReceived: 0,
    totalPerformanceScore: 75,
    rank: 3,
    percentile: 75,
  },
  {
    employeeId: 'user-3',
    employeeName: 'Suresh Patel',
    tasksAssigned: 1,
    tasksCompleted: 0,
    tasksPending: 1,
    tasksOverdue: 0,
    tasksVerified: 0,
    tasksRejected: 0,
    completionRate: 0,
    onTimeCompletionRate: 0,
    averageCompletionTime: 0,
    baseSalary: 23000,
    verifiedTaskIncentives: 0,
    bonuses: 0,
    advances: 0,
    penalties: 0,
    finalPayable: 23000,
    totalPaymentPending: 23000,
    totalPaymentReceived: 0,
    totalPerformanceScore: 80,
    rank: 2,
    percentile: 80,
  },
];

const mockDashboardKPIs: DashboardTaskKPIs = {
  openTasks: 2,
  overdueTasks: 0,
  completedToday: 0,
  pendingVerification: 1,
  verifiedToday: 0,
  topPerformers: mockEmployeePerformance.slice(0, 3),
};

export const taskManagementApi = {
  // Task CRUD
  async getAll(query?: TaskQuery): Promise<Task[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let tasks = [...mockTasks];
    
    // Apply filters
    if (query?.filter) {
      const { status, priority, assignedUserId, linkedModule, search } = query.filter;
      
      if (status) {
        tasks = tasks.filter(task => task.status === status);
      }
      
      if (priority) {
        tasks = tasks.filter(task => task.priority === priority);
      }
      
      if (assignedUserId) {
        tasks = tasks.filter(task => task.assignedUserId === assignedUserId);
      }
      
      if (linkedModule) {
        tasks = tasks.filter(task => task.linkedModule === linkedModule);
      }
      
      if (search) {
        const searchLower = search.toLowerCase();
        tasks = tasks.filter(task =>
          task.title.toLowerCase().includes(searchLower) ||
          task.taskId.toLowerCase().includes(searchLower) ||
          task.description?.toLowerCase().includes(searchLower)
        );
      }
    }
    
    // Apply pagination
    if (query?.page && query?.pageSize) {
      const start = (query.page - 1) * query.pageSize;
      const end = start + query.pageSize;
      tasks = tasks.slice(start, end);
    }
    
    return tasks;
  },

  async getById(id: string): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const task = mockTasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');
    return task;
  },

  async create(data: CreateTaskDto): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newTask: Task = {
      id: (mockTasks.length + 1).toString(),
      taskId: `TSK-${String(mockTasks.length + 1).padStart(3, '0')}`,
      ...data,
      assignedUserName: 'Unknown', // Should come from user service
      createdBy: 'system',
      createdByName: 'System',
      status: 'Created',
      isPaymentEditable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      activityHistory: [
        createActivity(
          `TSK-${String(mockTasks.length + 1).padStart(3, '0')}`,
          'Created',
          'Task created',
          'system',
          'System'
        ),
        createActivity(
          `TSK-${String(mockTasks.length + 1).padStart(3, '0')}`,
          'Assigned',
          `Assigned to Unknown`,
          'system',
          'System'
        ),
      ],
    };
    mockTasks.push(newTask);
    return newTask;
  },

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    mockTasks[index] = {
      ...mockTasks[index],
      ...data,
      updatedAt: new Date(),
    };
    
    return mockTasks[index];
  },

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    mockTasks.splice(index, 1);
  },

  // Task Completion with Photo Proof
  async complete(id: string, data: CompleteTaskDto): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    // Validate after photo proof is provided (mandatory)
    if (!data.completionProof.afterPhotoUrls || data.completionProof.afterPhotoUrls.length === 0) {
      throw new Error('After photo proof is mandatory for task completion');
    }
    
    const task = mockTasks[index];
    const newActivity = createActivity(
      task.taskId,
      'Photos Uploaded',
      `Uploaded ${data.completionProof.beforePhotoUrls.length} before and ${data.completionProof.afterPhotoUrls.length} after photos`,
      task.assignedUserId,
      task.assignedUserName
    );
    
    const completeActivity = createActivity(
      task.taskId,
      'Completed',
      'Task marked as complete',
      task.assignedUserId,
      task.assignedUserName
    );
    
    mockTasks[index] = {
      ...mockTasks[index],
      status: 'Completed',
      completionProof: {
        ...data.completionProof,
        uploadedAt: new Date(),
      },
      completedAt: data.completedAt,
      updatedAt: new Date(),
      activityHistory: [
        ...(task.activityHistory || []),
        newActivity,
        completeActivity,
      ],
    };
    
    return mockTasks[index];
  },

  // Task Verification
  async verify(id: string, data: VerifyTaskDto, verifiedBy: string, verifiedByName: string): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    // Payment and performance only count after verification
    // If rejected, status goes back to 'In Progress' for re-completion
    const newStatus = data.status === 'Verified' ? 'Verified' : 'In Progress';
    
    const task = mockTasks[index];
    const activityType = data.status === 'Verified' ? 'Verified' : 'Rejected';
    const description = data.status === 'Verified' 
      ? `Task verified by ${verifiedByName}`
      : `Task rejected by ${verifiedByName}: ${data.verificationNotes || 'No reason provided'}`;
    
    const newActivity = createActivity(
      task.taskId,
      activityType,
      description,
      verifiedBy,
      verifiedByName
    );
    
    mockTasks[index] = {
      ...mockTasks[index],
      status: newStatus,
      verifiedBy,
      verifiedByName,
      verificationNotes: data.verificationNotes,
      verifiedAt: data.verifiedAt,
      updatedAt: new Date(),
      activityHistory: [
        ...(task.activityHistory || []),
        newActivity,
      ],
    };
    
    return mockTasks[index];
  },

  // Stats
  async getStats(): Promise<TaskStats> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockTaskStats;
  },

  async getDashboardKPIs(): Promise<DashboardTaskKPIs> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockDashboardKPIs;
  },

  // Employee Performance
  async getEmployeePerformance(employeeId?: string): Promise<EmployeePerformanceStats[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Calculate performance stats dynamically from tasks
    // Payment only counts after verification
    const employeeIds = employeeId ? [employeeId] : [...new Set(mockTasks.map(t => t.assignedUserId))];
    
    const performanceStats: EmployeePerformanceStats[] = employeeIds.map(empId => {
      const employeeTasks = mockTasks.filter(t => t.assignedUserId === empId);
      const verifiedTasks = employeeTasks.filter(t => t.status === 'Verified');
      const rejectedTasks = employeeTasks.filter(t => t.status === 'In Progress' && t.verificationNotes); // Tasks that were rejected
      
      const tasksAssigned = employeeTasks.length;
      const tasksCompleted = employeeTasks.filter(t => t.status === 'Completed' || t.status === 'Verified').length;
      const tasksPending = employeeTasks.filter(t => t.status === 'Assigned' || t.status === 'In Progress').length;
      const tasksOverdue = employeeTasks.filter(t => 
        t.status !== 'Verified' && 
        t.status !== 'Closed' && 
        t.dueDate < new Date()
      ).length;
      const tasksVerified = verifiedTasks.length;
      
      // Calculate earnings only from verified tasks
      const verifiedTaskIncentives = verifiedTasks.reduce((sum, t) => sum + t.incentiveValue, 0);
      
      // Get base salary from mock data (in production, this would come from employee record)
      const baseSalary = mockEmployeePerformance.find(e => e.employeeId === empId)?.baseSalary || 25000;
      
      // Get bonuses, advances, penalties from salary adjustments
      const employeeAdjustments = mockSalaryAdjustments.filter(adj => adj.employeeId === empId);
      const bonuses = employeeAdjustments
        .filter(adj => adj.type === 'Bonus' && adj.status === 'Processed')
        .reduce((sum, adj) => sum + adj.amount, 0);
      const advances = employeeAdjustments
        .filter(adj => adj.type === 'Advance' && adj.status === 'Processed')
        .reduce((sum, adj) => sum + adj.amount, 0);
      const penalties = employeeAdjustments
        .filter(adj => adj.type === 'Penalty' && adj.status === 'Processed')
        .reduce((sum, adj) => sum + adj.amount, 0);
      
      const finalPayable = baseSalary + verifiedTaskIncentives + bonuses - advances - penalties;
      
      const completionRate = tasksAssigned > 0 ? Math.round((tasksVerified / tasksAssigned) * 100) : 0;
      
      // Calculate average completion time (in days)
      const completedTasksWithTime = verifiedTasks.filter(t => t.completedAt && t.createdAt);
      const avgCompletionTime = completedTasksWithTime.length > 0
        ? completedTasksWithTime.reduce((sum, t) => {
            const days = Math.floor((t.completedAt!.getTime() - t.createdAt.getTime()) / (1000 * 60 * 60 * 24));
            return sum + days;
          }, 0) / completedTasksWithTime.length
        : 0;
      
      // Calculate on-time completion rate
      const onTimeCompletions = verifiedTasks.filter(t => t.completedAt && t.completedAt <= t.dueDate).length;
      const onTimeCompletionRate = tasksVerified > 0 ? Math.round((onTimeCompletions / tasksVerified) * 100) : 0;
      
      // Calculate performance score (based on completion rate, timeliness, and quality)
      const performanceScore = Math.round(
        (completionRate * 0.4) + 
        (onTimeCompletionRate * 0.3) + 
        (tasksVerified > 0 ? 30 : 0) // Bonus for having verified tasks
      );
      
      return {
        employeeId: empId,
        employeeName: mockTasks.find(t => t.assignedUserId === empId)?.assignedUserName || 'Unknown',
        tasksAssigned,
        tasksCompleted,
        tasksPending,
        tasksOverdue,
        tasksVerified,
        tasksRejected: rejectedTasks.length,
        completionRate,
        onTimeCompletionRate,
        averageCompletionTime: Math.round(avgCompletionTime),
        baseSalary,
        verifiedTaskIncentives,
        bonuses,
        advances,
        penalties,
        finalPayable,
        totalPaymentPending: finalPayable,
        totalPaymentReceived: 0, // In production, this would track actual payments
        totalPerformanceScore: performanceScore,
      };
    });
    
    // Sort by performance score
    performanceStats.sort((a, b) => b.totalPerformanceScore - a.totalPerformanceScore);
    
    // Add rankings
    performanceStats.forEach((emp, index) => {
      emp.rank = index + 1;
      emp.percentile = Math.round(((performanceStats.length - index) / performanceStats.length) * 100);
    });
    
    if (employeeId) {
      return performanceStats.filter(emp => emp.employeeId === employeeId);
    }
    
    return performanceStats;
  },

  async getEmployeeSalaryLedger(employeeId: string, periodStart: Date, periodEnd: Date): Promise<EmployeeSalaryLedger> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const employee = mockEmployeePerformance.find(emp => emp.employeeId === employeeId);
    if (!employee) throw new Error('Employee not found');
    
    const employeeAdjustments = mockSalaryAdjustments.filter(
      adj => adj.employeeId === employeeId &&
      adj.createdAt >= periodStart &&
      adj.createdAt <= periodEnd
    );
    
    const bonuses = employeeAdjustments
      .filter(adj => adj.type === 'Bonus' && adj.status === 'Processed')
      .reduce((sum, adj) => sum + adj.amount, 0);
    
    const advances = employeeAdjustments
      .filter(adj => adj.type === 'Advance' && adj.status === 'Processed')
      .reduce((sum, adj) => sum + adj.amount, 0);
    
    const penalties = employeeAdjustments
      .filter(adj => adj.type === 'Penalty' && adj.status === 'Processed')
      .reduce((sum, adj) => sum + adj.amount, 0);
    
    return {
      employeeId,
      employeeName: employee.employeeName,
      openingBalance: 0,
      taskEarnings: employee.verifiedTaskIncentives,
      bonuses,
      otherCredits: 0,
      advances,
      penalties,
      otherDeductions: 0,
      currentPayable: employee.verifiedTaskIncentives + bonuses - advances - penalties,
      totalPaid: employee.totalPaymentReceived,
      lastPaymentDate: new Date(),
      adjustments: employeeAdjustments,
      periodStart,
      periodEnd,
    };
  },

  // Salary Adjustments CRUD
  async getSalaryAdjustments(query?: SalaryAdjustmentQuery): Promise<SalaryAdjustment[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let adjustments = [...mockSalaryAdjustments];
    
    // Apply filters
    if (query?.filter) {
      const { employeeId, type, status } = query.filter;
      
      if (employeeId) {
        adjustments = adjustments.filter(adj => adj.employeeId === employeeId);
      }
      
      if (type) {
        adjustments = adjustments.filter(adj => adj.type === type);
      }
      
      if (status) {
        adjustments = adjustments.filter(adj => adj.status === status);
      }
    }
    
    // Apply pagination
    if (query?.page && query?.pageSize) {
      const start = (query.page - 1) * query.pageSize;
      const end = start + query.pageSize;
      adjustments = adjustments.slice(start, end);
    }
    
    return adjustments;
  },

  async getSalaryAdjustmentById(id: string): Promise<SalaryAdjustment> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const adjustment = mockSalaryAdjustments.find(a => a.id === id);
    if (!adjustment) throw new Error('Salary adjustment not found');
    return adjustment;
  },

  async createSalaryAdjustment(data: CreateSalaryAdjustmentDto): Promise<SalaryAdjustment> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newAdjustment: SalaryAdjustment = {
      id: `adj-${mockSalaryAdjustments.length + 1}`,
      ...data,
      status: 'Pending',
      createdAt: new Date(),
      createdBy: 'admin-1', // Should come from auth context
    };
    mockSalaryAdjustments.push(newAdjustment);
    return newAdjustment;
  },

  async updateSalaryAdjustment(id: string, data: UpdateSalaryAdjustmentDto): Promise<SalaryAdjustment> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockSalaryAdjustments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Salary adjustment not found');
    
    mockSalaryAdjustments[index] = {
      ...mockSalaryAdjustments[index],
      ...data,
    };
    
    return mockSalaryAdjustments[index];
  },

  async deleteSalaryAdjustment(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockSalaryAdjustments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Salary adjustment not found');
    mockSalaryAdjustments.splice(index, 1);
  },

  async approveSalaryAdjustment(id: string, approvedBy: string, approvedByName: string): Promise<SalaryAdjustment> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockSalaryAdjustments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Salary adjustment not found');
    
    mockSalaryAdjustments[index] = {
      ...mockSalaryAdjustments[index],
      status: 'Approved',
      approvedBy,
      approvedByName,
      approvedAt: new Date(),
    };
    
    return mockSalaryAdjustments[index];
  },

  async processSalaryAdjustment(id: string, processedBy: string): Promise<SalaryAdjustment> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockSalaryAdjustments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Salary adjustment not found');
    
    mockSalaryAdjustments[index] = {
      ...mockSalaryAdjustments[index],
      status: 'Processed',
      processedBy,
      processedAt: new Date(),
    };
    
    return mockSalaryAdjustments[index];
  },
};
