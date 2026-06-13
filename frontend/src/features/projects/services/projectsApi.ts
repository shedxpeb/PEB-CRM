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
import { MOCK_PROJECTS, MOCK_ACTIVITIES, MOCK_TASKS } from '@/features/projects/data/mockProjects';

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
