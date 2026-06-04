import axios from 'axios';
import { Estimate, CreateEstimateDto, UpdateEstimateDto } from '../types/peb-commercial';

const API_BASE = '/api/estimates';

export const estimateApi = {
  // Create a new estimate
  create: async (data: CreateEstimateDto): Promise<Estimate> => {
    const response = await axios.post(API_BASE, data);
    return response.data;
  },

  // Get all estimates with pagination
  findAll: async (params?: {
    page?: number;
    pageSize?: number;
    customerId?: string;
    status?: string;
    leadId?: string;
    projectId?: string;
    search?: string;
  }): Promise<{ data: Estimate[]; total: number }> => {
    const response = await axios.get(API_BASE, { params });
    return response.data;
  },

  // Get estimate statistics
  getStats: async (): Promise<any> => {
    const response = await axios.get(`${API_BASE}/stats`);
    return response.data;
  },

  // Get estimate by ID
  findOne: async (id: string): Promise<Estimate> => {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  },

  // Get estimate by number
  findByNumber: async (estimateNumber: string): Promise<Estimate> => {
    const response = await axios.get(`${API_BASE}/number/${estimateNumber}`);
    return response.data;
  },

  // Update estimate
  update: async (id: string, data: UpdateEstimateDto): Promise<Estimate> => {
    const response = await axios.patch(`${API_BASE}/${id}`, data);
    return response.data;
  },

  // Update estimate status
  updateStatus: async (id: string, status: string): Promise<Estimate> => {
    const response = await axios.patch(`${API_BASE}/${id}/status`, { status });
    return response.data;
  },

  // Convert estimate to proposal
  convertToProposal: async (id: string, proposalData: any): Promise<Estimate> => {
    const response = await axios.patch(`${API_BASE}/${id}/convert-to-proposal`, proposalData);
    return response.data;
  },

  // Delete estimate
  remove: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/${id}`);
  },
};
