import axios from 'axios';
import { Proposal, CreateProposalDto } from '../types/peb-commercial';

const API_BASE = '/api/proposals';

export const proposalApi = {
  // Create a new proposal from estimate
  createFromEstimate: async (data: CreateProposalDto): Promise<Proposal> => {
    const response = await axios.post(API_BASE, data);
    return response.data;
  },

  // Get all proposals with pagination
  findAll: async (params?: {
    page?: number;
    pageSize?: number;
    customerId?: string;
    status?: string;
    estimateId?: string;
    search?: string;
  }): Promise<{ data: Proposal[]; total: number }> => {
    const response = await axios.get(API_BASE, { params });
    return response.data;
  },

  // Get proposal statistics
  getStats: async (): Promise<any> => {
    const response = await axios.get(`${API_BASE}/stats`);
    return response.data;
  },

  // Get proposal by ID
  findOne: async (id: string): Promise<Proposal> => {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  },

  // Update proposal
  update: async (id: string, data: any): Promise<Proposal> => {
    const response = await axios.patch(`${API_BASE}/${id}`, data);
    return response.data;
  },

  // Update proposal status
  updateStatus: async (id: string, status: string): Promise<Proposal> => {
    const response = await axios.patch(`${API_BASE}/${id}/status`, { status });
    return response.data;
  },

  // Convert proposal to quotation
  convertToQuotation: async (id: string, quotationData: any): Promise<Proposal> => {
    const response = await axios.patch(`${API_BASE}/${id}/convert-to-quotation`, quotationData);
    return response.data;
  },

  // Delete proposal
  remove: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/${id}`);
  },
};
