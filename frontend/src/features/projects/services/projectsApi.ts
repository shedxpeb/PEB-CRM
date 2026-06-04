/**
 * Projects API Service
 * All API calls for projects module - never use axios directly
 *
 * Mock fallback: When backend is unavailable, returns mock data.
 * Remove mock fallbacks once backend is connected.
 */
import { api } from '@/core/api';
import {
  Project,
  ProjectActivity,
  ProjectFilters,
  ProjectStats,
  ProjectTask,
  CreateProjectDto,
  UpdateProjectDto,
} from '@/features/projects/types';
import { PaginatedData, PaginationParams } from '@/shared/types/pagination';

// ─── Mock Data (development only - remove when backend is ready) ─────────────

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    projectId: 3001,
    projectCode: 'PRJ-2024-001',
    projectName: 'Kumar Steel Industries - Factory Expansion',
    customerId: '1',
    customerName: 'Kumar Steel Industries',
    leadId: '1001',
    projectType: 'Industrial Shed',
    value: 4500000,
    budget: 4200000,
    location: '42 Industrial Area',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-08-15'),
    priority: 'High',
    projectManager: 'Rahul Mehta',
    projectManagerId: 'EMP001',
    structureType: 'PEB Building',
    width: 60,
    length: 100,
    height: 12,
    baySpacing: 6,
    roofType: 'Standing Seam',
    craneSystem: 'Double Girder',
    mezzanine: true,
    wallType: 'Sandwich Panel',
    insulation: true,
    coveredArea: 6000,
    totalWeight: 450,
    status: 'Fabrication',
    stage: 'Fabrication',
    progress: 65,
    designProgress: 100,
    procurementProgress: 90,
    fabricationProgress: 65,
    installationProgress: 0,
    healthStatus: 'Healthy',
    timelineHealth: 'Healthy',
    budgetHealth: 'Healthy',
    materialHealth: 'Healthy',
    resourceHealth: 'Healthy',
    materialCost: 2800000,
    procurementCost: 2950000,
    fabricationCost: 850000,
    installationCost: 400000,
    profitMargin: 15,
    milestones: [
      {
        id: 'm1',
        name: 'Design Complete',
        plannedDate: new Date('2024-03-30'),
        actualDate: new Date('2024-03-28'),
        status: 'Completed',
        delay: -2,
      },
      {
        id: 'm2',
        name: 'BOQ Complete',
        plannedDate: new Date('2024-04-15'),
        actualDate: new Date('2024-04-12'),
        status: 'Completed',
        delay: -3,
      },
      {
        id: 'm3',
        name: 'Procurement Complete',
        plannedDate: new Date('2024-05-30'),
        actualDate: new Date('2024-05-28'),
        status: 'Completed',
        delay: -2,
      },
      {
        id: 'm4',
        name: 'Fabrication Complete',
        plannedDate: new Date('2024-07-15'),
        status: 'In Progress',
      },
      {
        id: 'm5',
        name: 'Dispatch Complete',
        plannedDate: new Date('2024-07-30'),
        status: 'Pending',
      },
      {
        id: 'm6',
        name: 'Installation Complete',
        plannedDate: new Date('2024-08-15'),
        status: 'Pending',
      },
    ],
    team: [
      {
        id: 'tm1',
        employeeId: 'EMP001',
        name: 'Rahul Mehta',
        role: 'Project Manager',
        assignedDate: new Date('2024-03-01'),
        workload: 80,
      },
      {
        id: 'tm2',
        employeeId: 'EMP002',
        name: 'Vikram Singh',
        role: 'Design Engineer',
        assignedDate: new Date('2024-03-01'),
        workload: 100,
      },
      {
        id: 'tm3',
        employeeId: 'EMP003',
        name: 'Sneha Reddy',
        role: 'Procurement Manager',
        assignedDate: new Date('2024-04-01'),
        workload: 75,
      },
    ],
    boqId: 'BOQ-2024-001',
    designId: 'DES-2024-001',
    reservedItems: ['INV001', 'INV002', 'INV003'],
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-06-10'),
  },
  {
    id: '2',
    projectId: 3002,
    projectCode: 'PRJ-2024-002',
    projectName: 'Sharma Constructions - Warehouse',
    customerId: '2',
    customerName: 'Sharma Constructions',
    leadId: '1002',
    projectType: 'Warehouse',
    value: 2800000,
    budget: 2600000,
    location: '15 MG Road',
    city: 'Bangalore',
    state: 'Karnataka',
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-07-30'),
    priority: 'Medium',
    projectManager: 'Sneha Reddy',
    projectManagerId: 'EMP003',
    structureType: 'PEB Building',
    width: 40,
    length: 80,
    height: 10,
    baySpacing: 5,
    roofType: 'Ribbed',
    craneSystem: 'Single Girder',
    mezzanine: false,
    wallType: 'Single Skin',
    insulation: false,
    coveredArea: 3200,
    totalWeight: 280,
    status: 'Installation',
    stage: 'Installation',
    progress: 85,
    designProgress: 100,
    procurementProgress: 100,
    fabricationProgress: 100,
    installationProgress: 85,
    healthStatus: 'Healthy',
    timelineHealth: 'Healthy',
    budgetHealth: 'Healthy',
    materialHealth: 'Healthy',
    resourceHealth: 'Healthy',
    materialCost: 1800000,
    procurementCost: 1900000,
    fabricationCost: 600000,
    installationCost: 300000,
    profitMargin: 12,
    milestones: [
      {
        id: 'm1',
        name: 'Design Complete',
        plannedDate: new Date('2024-04-20'),
        actualDate: new Date('2024-04-18'),
        status: 'Completed',
        delay: -2,
      },
      {
        id: 'm2',
        name: 'BOQ Complete',
        plannedDate: new Date('2024-05-05'),
        actualDate: new Date('2024-05-03'),
        status: 'Completed',
        delay: -2,
      },
      {
        id: 'm3',
        name: 'Procurement Complete',
        plannedDate: new Date('2024-05-30'),
        actualDate: new Date('2024-05-28'),
        status: 'Completed',
        delay: -2,
      },
      {
        id: 'm4',
        name: 'Fabrication Complete',
        plannedDate: new Date('2024-06-30'),
        actualDate: new Date('2024-06-28'),
        status: 'Completed',
        delay: -2,
      },
      {
        id: 'm5',
        name: 'Dispatch Complete',
        plannedDate: new Date('2024-07-10'),
        actualDate: new Date('2024-07-08'),
        status: 'Completed',
        delay: -2,
      },
      {
        id: 'm6',
        name: 'Installation Complete',
        plannedDate: new Date('2024-07-30'),
        status: 'In Progress',
      },
    ],
    team: [
      {
        id: 'tm1',
        employeeId: 'EMP003',
        name: 'Sneha Reddy',
        role: 'Project Manager',
        assignedDate: new Date('2024-04-01'),
        workload: 85,
      },
      {
        id: 'tm2',
        employeeId: 'EMP004',
        name: 'Anil Kumar',
        role: 'Site Manager',
        assignedDate: new Date('2024-06-01'),
        workload: 90,
      },
    ],
    boqId: 'BOQ-2024-002',
    designId: 'DES-2024-002',
    reservedItems: ['INV004', 'INV005'],
    createdAt: new Date('2024-03-25'),
    updatedAt: new Date('2024-07-12'),
  },
  {
    id: '3',
    projectId: 3003,
    projectCode: 'PRJ-2024-003',
    projectName: 'Patel Warehousing - Cold Storage',
    customerId: '3',
    customerName: 'Patel Warehousing Ltd',
    leadId: '1003',
    projectType: 'Warehouse',
    value: 7200000,
    budget: 6800000,
    location: '78 GIDC Phase 2',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '382445',
    startDate: new Date('2024-05-01'),
    endDate: new Date('2024-10-30'),
    priority: 'Urgent',
    projectManager: 'Rahul Mehta',
    projectManagerId: 'EMP001',
    structureType: 'Cold Storage',
    width: 80,
    length: 120,
    height: 15,
    baySpacing: 8,
    roofType: 'Insulated Panel',
    craneSystem: 'Double Girder',
    mezzanine: true,
    wallType: 'Sandwich Panel',
    insulation: true,
    coveredArea: 9600,
    totalWeight: 850,
    status: 'Procurement',
    stage: 'Procurement',
    progress: 45,
    designProgress: 100,
    procurementProgress: 45,
    fabricationProgress: 0,
    installationProgress: 0,
    healthStatus: 'At Risk',
    timelineHealth: 'At Risk',
    budgetHealth: 'Healthy',
    materialHealth: 'At Risk',
    resourceHealth: 'Healthy',
    materialCost: 4500000,
    procurementCost: 4800000,
    fabricationCost: 1500000,
    installationCost: 500000,
    profitMargin: 10,
    milestones: [
      {
        id: 'm1',
        name: 'Design Complete',
        plannedDate: new Date('2024-05-20'),
        actualDate: new Date('2024-05-25'),
        status: 'Completed',
        delay: 5,
      },
      {
        id: 'm2',
        name: 'BOQ Complete',
        plannedDate: new Date('2024-06-05'),
        actualDate: new Date('2024-06-08'),
        status: 'Completed',
        delay: 3,
      },
      {
        id: 'm3',
        name: 'Procurement Complete',
        plannedDate: new Date('2024-07-15'),
        status: 'In Progress',
      },
      {
        id: 'm4',
        name: 'Fabrication Complete',
        plannedDate: new Date('2024-09-15'),
        status: 'Pending',
      },
      {
        id: 'm5',
        name: 'Dispatch Complete',
        plannedDate: new Date('2024-10-15'),
        status: 'Pending',
      },
      {
        id: 'm6',
        name: 'Installation Complete',
        plannedDate: new Date('2024-10-30'),
        status: 'Pending',
      },
    ],
    team: [
      {
        id: 'tm1',
        employeeId: 'EMP001',
        name: 'Rahul Mehta',
        role: 'Project Manager',
        assignedDate: new Date('2024-05-01'),
        workload: 95,
      },
      {
        id: 'tm2',
        employeeId: 'EMP002',
        name: 'Vikram Singh',
        role: 'Design Engineer',
        assignedDate: new Date('2024-05-01'),
        workload: 100,
      },
      {
        id: 'tm3',
        employeeId: 'EMP005',
        name: 'Priya Sharma',
        role: 'Procurement Manager',
        assignedDate: new Date('2024-06-01'),
        workload: 90,
      },
    ],
    boqId: 'BOQ-2024-003',
    designId: 'DES-2024-003',
    reservedItems: ['INV006', 'INV007', 'INV008', 'INV009'],
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-07-05'),
  },
  {
    id: '4',
    projectId: 3004,
    projectCode: 'PRJ-2024-004',
    projectName: 'Reddy Agro - Storage Shed',
    customerId: '4',
    customerName: 'Reddy Agro Industries',
    leadId: '1004',
    projectType: 'Industrial Shed',
    value: 1500000,
    budget: 1400000,
    location: '23 Agri Park',
    city: 'Hyderabad',
    state: 'Telangana',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-09-15'),
    priority: 'Low',
    projectManager: 'Vikram Singh',
    projectManagerId: 'EMP002',
    structureType: 'PEB Building',
    width: 30,
    length: 50,
    height: 8,
    baySpacing: 5,
    roofType: 'Corrugated',
    craneSystem: 'None',
    mezzanine: false,
    wallType: 'Single Skin',
    insulation: false,
    coveredArea: 1500,
    totalWeight: 120,
    status: 'Design',
    stage: 'Design',
    progress: 30,
    designProgress: 30,
    procurementProgress: 0,
    fabricationProgress: 0,
    installationProgress: 0,
    healthStatus: 'Healthy',
    timelineHealth: 'Healthy',
    budgetHealth: 'Healthy',
    materialHealth: 'Healthy',
    resourceHealth: 'Healthy',
    materialCost: 900000,
    procurementCost: 950000,
    fabricationCost: 350000,
    installationCost: 200000,
    profitMargin: 12,
    milestones: [
      {
        id: 'm1',
        name: 'Design Complete',
        plannedDate: new Date('2024-06-20'),
        status: 'In Progress',
      },
      {
        id: 'm2',
        name: 'BOQ Complete',
        plannedDate: new Date('2024-07-05'),
        status: 'Pending',
      },
      {
        id: 'm3',
        name: 'Procurement Complete',
        plannedDate: new Date('2024-08-15'),
        status: 'Pending',
      },
      {
        id: 'm4',
        name: 'Fabrication Complete',
        plannedDate: new Date('2024-08-30'),
        status: 'Pending',
      },
      {
        id: 'm5',
        name: 'Dispatch Complete',
        plannedDate: new Date('2024-09-10'),
        status: 'Pending',
      },
      {
        id: 'm6',
        name: 'Installation Complete',
        plannedDate: new Date('2024-09-15'),
        status: 'Pending',
      },
    ],
    team: [
      {
        id: 'tm1',
        employeeId: 'EMP002',
        name: 'Vikram Singh',
        role: 'Project Manager',
        assignedDate: new Date('2024-06-01'),
        workload: 70,
      },
    ],
    createdAt: new Date('2024-05-25'),
    updatedAt: new Date('2024-06-20'),
  },
  {
    id: '5',
    projectId: 3005,
    projectCode: 'PRJ-2024-005',
    projectName: 'Gupta Manufacturing - Factory Unit 2',
    customerId: '5',
    customerName: 'Gupta Manufacturing Co',
    leadId: '1005',
    projectType: 'Factory',
    value: 12000000,
    budget: 11500000,
    location: '56 Sector 12',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-07-30'),
    priority: 'High',
    projectManager: 'Rahul Mehta',
    projectManagerId: 'EMP001',
    structureType: 'PEB Building',
    width: 100,
    length: 150,
    height: 18,
    baySpacing: 10,
    roofType: 'Standing Seam',
    craneSystem: 'Double Girder',
    mezzanine: true,
    wallType: 'Sandwich Panel',
    insulation: true,
    coveredArea: 15000,
    totalWeight: 1200,
    status: 'Installation',
    stage: 'Installation',
    progress: 90,
    designProgress: 100,
    procurementProgress: 100,
    fabricationProgress: 100,
    installationProgress: 90,
    healthStatus: 'Healthy',
    timelineHealth: 'Healthy',
    budgetHealth: 'Healthy',
    materialHealth: 'Healthy',
    resourceHealth: 'Healthy',
    materialCost: 7500000,
    procurementCost: 7800000,
    fabricationCost: 2500000,
    installationCost: 1200000,
    profitMargin: 14,
    milestones: [
      {
        id: 'm1',
        name: 'Design Complete',
        plannedDate: new Date('2024-02-20'),
        actualDate: new Date('2024-02-18'),
        status: 'Completed',
        delay: -2,
      },
      {
        id: 'm2',
        name: 'BOQ Complete',
        plannedDate: new Date('2024-03-05'),
        actualDate: new Date('2024-03-02'),
        status: 'Completed',
        delay: -3,
      },
      {
        id: 'm3',
        name: 'Procurement Complete',
        plannedDate: new Date('2024-04-15'),
        actualDate: new Date('2024-04-12'),
        status: 'Completed',
        delay: -3,
      },
      {
        id: 'm4',
        name: 'Fabrication Complete',
        plannedDate: new Date('2024-06-15'),
        actualDate: new Date('2024-06-12'),
        status: 'Completed',
        delay: -3,
      },
      {
        id: 'm5',
        name: 'Dispatch Complete',
        plannedDate: new Date('2024-07-10'),
        actualDate: new Date('2024-07-08'),
        status: 'Completed',
        delay: -2,
      },
      {
        id: 'm6',
        name: 'Installation Complete',
        plannedDate: new Date('2024-07-30'),
        status: 'In Progress',
      },
    ],
    team: [
      {
        id: 'tm1',
        employeeId: 'EMP001',
        name: 'Rahul Mehta',
        role: 'Project Manager',
        assignedDate: new Date('2024-02-01'),
        workload: 90,
      },
      {
        id: 'tm2',
        employeeId: 'EMP006',
        name: 'Amit Patel',
        role: 'Site Manager',
        assignedDate: new Date('2024-06-01'),
        workload: 95,
      },
      {
        id: 'tm3',
        employeeId: 'EMP007',
        name: 'Sunita Reddy',
        role: 'Installation Lead',
        assignedDate: new Date('2024-06-15'),
        workload: 100,
      },
    ],
    boqId: 'BOQ-2024-005',
    designId: 'DES-2024-005',
    reservedItems: ['INV010', 'INV011', 'INV012', 'INV013', 'INV014'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-07-15'),
  },
];

const MOCK_ACTIVITIES: ProjectActivity[] = [
  {
    id: 'a1',
    projectId: '1',
    type: 'project_created',
    description: 'Project created from Lead #1001',
    performedBy: 'Rahul Mehta',
    performedAt: new Date('2024-02-28T10:00:00'),
  },
  {
    id: 'a2',
    projectId: '1',
    type: 'design_started',
    description: 'Design phase started',
    performedBy: 'Vikram Singh',
    performedAt: new Date('2024-03-01T09:00:00'),
  },
  {
    id: 'a3',
    projectId: '1',
    type: 'design_completed',
    description: 'Design completed and uploaded',
    performedBy: 'Vikram Singh',
    performedAt: new Date('2024-03-28T17:00:00'),
  },
  {
    id: 'a4',
    projectId: '1',
    type: 'boq_created',
    description: 'BOQ created (BOQ-2024-001)',
    performedBy: 'Vikram Singh',
    performedAt: new Date('2024-04-01T14:00:00'),
  },
  {
    id: 'a5',
    projectId: '1',
    type: 'procurement_started',
    description: 'Procurement phase started',
    performedBy: 'Sneha Reddy',
    performedAt: new Date('2024-04-15T10:00:00'),
  },
  {
    id: 'a6',
    projectId: '1',
    type: 'material_reserved',
    description: 'Material reserved from inventory (3 items)',
    performedBy: 'Sneha Reddy',
    performedAt: new Date('2024-05-01T11:00:00'),
  },
  {
    id: 'a7',
    projectId: '1',
    type: 'fabrication_started',
    description: 'Fabrication phase started',
    performedBy: 'Rahul Mehta',
    performedAt: new Date('2024-06-01T09:00:00'),
  },
  {
    id: 'a8',
    projectId: '1',
    type: 'milestone_completed',
    description: 'Milestone: Procurement Complete',
    performedBy: 'System',
    performedAt: new Date('2024-05-28T18:00:00'),
  },
];

const MOCK_TASKS: ProjectTask[] = [
  {
    id: 't1',
    projectId: '1',
    title: 'Complete structural drawings',
    description: 'Finalize all structural steel drawings',
    assignedTo: 'EMP002',
    assignedToName: 'Vikram Singh',
    dueDate: new Date('2024-03-25'),
    priority: 'High',
    status: 'Completed',
  },
  {
    id: 't2',
    projectId: '1',
    title: 'Approve BOQ with customer',
    description: 'Get final BOQ approval from customer',
    assignedTo: 'EMP001',
    assignedToName: 'Rahul Mehta',
    dueDate: new Date('2024-04-10'),
    priority: 'High',
    status: 'Completed',
  },
  {
    id: 't3',
    projectId: '1',
    title: 'Procure primary steel',
    description: 'Order primary steel materials',
    assignedTo: 'EMP003',
    assignedToName: 'Sneha Reddy',
    dueDate: new Date('2024-05-15'),
    priority: 'Urgent',
    status: 'Completed',
  },
  {
    id: 't4',
    projectId: '1',
    title: 'Complete fabrication of columns',
    description: 'Fabricate all structural columns',
    assignedTo: 'EMP008',
    assignedToName: 'Rajesh Kumar',
    dueDate: new Date('2024-06-30'),
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 't5',
    projectId: '1',
    title: 'Complete fabrication of roof trusses',
    description: 'Fabricate all roof trusses',
    assignedTo: 'EMP008',
    assignedToName: 'Rajesh Kumar',
    dueDate: new Date('2024-07-10'),
    priority: 'High',
    status: 'Pending',
  },
];

/** Check if error is a connection failure (no backend) */
function isConnectionError(error: unknown): boolean {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as any).code;
    return code === 'ERR_NETWORK' || code === 'ECONNREFUSED' || code === 'ERR_CONNECTION_REFUSED';
  }
  return false;
}

// ─── API Service ──────────────────────────────────────────────────────────────

export const projectsApi = {
  /**
   * Get all projects with pagination and filters
   */
  getAll: async (params?: PaginationParams & ProjectFilters): Promise<PaginatedData<Project>> => {
    try {
      return await api.get<PaginatedData<Project>>('/api/projects', { params });
    } catch (error) {
      if (isConnectionError(error)) {
        // Mock fallback - paginated response
        const page = params?.page ?? 1;
        const pageSize = params?.pageSize ?? 20;
        let filteredData = [...MOCK_PROJECTS];

        // Apply filters
        if (params?.status) {
          filteredData = filteredData.filter((p) => p.status === params.status);
        }
        if (params?.stage) {
          filteredData = filteredData.filter((p) => p.stage === params.stage);
        }
        if (params?.priority) {
          filteredData = filteredData.filter((p) => p.priority === params.priority);
        }
        if (params?.projectManager) {
          filteredData = filteredData.filter((p) => p.projectManager === params.projectManager);
        }
        if (params?.customer) {
          filteredData = filteredData.filter((p) => p.customerName === params.customer);
        }
        if (params?.city) {
          filteredData = filteredData.filter((p) => p.city === params.city);
        }
        if (params?.healthStatus) {
          filteredData = filteredData.filter((p) => p.healthStatus === params.healthStatus);
        }

        return {
          data: filteredData.slice((page - 1) * pageSize, page * pageSize),
          meta: {
            page,
            pageSize,
            total: filteredData.length,
            totalPages: Math.ceil(filteredData.length / pageSize),
            hasNext: false,
            hasPrevious: false,
          },
        };
      }
      throw error;
    }
  },

  /**
   * Get single project by ID
   */
  getById: async (id: string): Promise<Project> => {
    try {
      return await api.get<Project>(`/api/projects/${id}`);
    } catch (error) {
      if (isConnectionError(error)) {
        const project = MOCK_PROJECTS.find((p) => p.id === id);
        if (project) return project;
        throw new Error(`Project not found: ${id}`);
      }
      throw error;
    }
  },

  /**
   * Create new project
   */
  create: (data: CreateProjectDto) => api.post<Project>('/api/projects', data),

  /**
   * Update existing project
   */
  update: (id: string, data: UpdateProjectDto) => api.patch<Project>(`/api/projects/${id}`, data),

  /**
   * Delete project
   */
  delete: (id: string) => api.delete(`/api/projects/${id}`),

  /**
   * Bulk update projects
   */
  bulkUpdate: (ids: string[], data: Partial<UpdateProjectDto>) =>
    api.patch<{ count: number }>('/api/projects/bulk', { ids, data }),

  /**
   * Bulk delete projects
   */
  bulkDelete: (ids: string[]) =>
    api.delete<{ count: number }>('/api/projects/bulk', { data: { ids } }),

  /**
   * Export projects to CSV/Excel
   */
  export: (params?: ProjectFilters) =>
    api.get<Blob>('/api/projects/export', { params, responseType: 'blob' }),

  /**
   * Get project statistics
   */
  getStats: async () => {
    try {
      return await api.get<ProjectStats>('/api/projects/stats');
    } catch (error) {
      if (isConnectionError(error)) {
        // Mock fallback - computed from mock data
        return {
          totalProjects: MOCK_PROJECTS.length,
          activeProjects: MOCK_PROJECTS.filter((p) => ['Design', 'BOQ', 'Procurement', 'Fabrication', 'Dispatch', 'Installation'].includes(p.status)).length,
          completedProjects: MOCK_PROJECTS.filter((p) => p.status === 'Completion').length,
          delayedProjects: MOCK_PROJECTS.filter((p) => p.milestones.some((m) => m.delay && m.delay > 0)).length,
          upcomingDeadlines: MOCK_PROJECTS.filter((p) => {
            const nextMilestone = p.milestones.find((m) => m.status === 'Pending' || m.status === 'In Progress');
            if (nextMilestone) {
              const daysUntil = Math.ceil((nextMilestone.plannedDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              return daysUntil <= 7 && daysUntil >= 0;
            }
            return false;
          }).length,
          projectsInDesign: MOCK_PROJECTS.filter((p) => p.stage === 'Design').length,
          projectsInProcurement: MOCK_PROJECTS.filter((p) => p.stage === 'Procurement').length,
          projectsInFabrication: MOCK_PROJECTS.filter((p) => p.stage === 'Fabrication').length,
          projectsInInstallation: MOCK_PROJECTS.filter((p) => p.stage === 'Installation').length,
          pendingApprovals: 2,
          projectRevenue: MOCK_PROJECTS.reduce((sum, p) => sum + p.value, 0),
          materialCost: MOCK_PROJECTS.reduce((sum, p) => sum + (p.materialCost || 0), 0),
          healthyProjects: MOCK_PROJECTS.filter((p) => p.healthStatus === 'Healthy').length,
          atRiskProjects: MOCK_PROJECTS.filter((p) => p.healthStatus === 'At Risk').length,
          criticalProjects: MOCK_PROJECTS.filter((p) => p.healthStatus === 'Critical').length,
        };
      }
      throw error;
    }
  },

  /**
   * Get project activities (timeline)
   */
  getActivities: async (id: string): Promise<ProjectActivity[]> => {
    try {
      return await api.get<ProjectActivity[]>(`/api/projects/${id}/activities`);
    } catch (error) {
      if (isConnectionError(error)) {
        return MOCK_ACTIVITIES.filter((a) => a.projectId === id);
      }
      throw error;
    }
  },

  /**
   * Get project tasks
   */
  getTasks: async (id: string): Promise<ProjectTask[]> => {
    try {
      return await api.get<ProjectTask[]>(`/api/projects/${id}/tasks`);
    } catch (error) {
      if (isConnectionError(error)) {
        return MOCK_TASKS.filter((t) => t.projectId === id);
      }
      throw error;
    }
  },

  /**
   * Create project task
   */
  createTask: (projectId: string, data: Partial<ProjectTask>) =>
    api.post<ProjectTask>(`/api/projects/${projectId}/tasks`, data),

  /**
   * Update project task
   */
  updateTask: (projectId: string, taskId: string, data: Partial<ProjectTask>) =>
    api.patch<ProjectTask>(`/api/projects/${projectId}/tasks/${taskId}`, data),

  /**
   * Delete project task
   */
  deleteTask: (projectId: string, taskId: string) =>
    api.delete(`/api/projects/${projectId}/tasks/${taskId}`),
};
