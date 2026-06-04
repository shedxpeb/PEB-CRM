import axios from 'axios';
import { Quotation, CreateQuotationDto } from '../types/peb-commercial';

const API_BASE = '/api/quotations';

export const quotationApi = {
  // Create a new quotation from proposal
  createFromProposal: async (data: CreateQuotationDto): Promise<Quotation> => {
    const response = await axios.post(API_BASE, data);
    return response.data;
  },

  // Get all quotations with pagination
  findAll: async (params?: {
    page?: number;
    pageSize?: number;
    customerId?: string;
    status?: string;
    proposalId?: string;
    search?: string;
  }): Promise<{ data: Quotation[]; total: number }> => {
    const response = await axios.get(API_BASE, { params });
    return response.data;
  },

  // Get quotation statistics
  getStats: async (): Promise<any> => {
    const response = await axios.get(`${API_BASE}/stats`);
    return response.data;
  },

  // Get quotation by ID
  findOne: async (id: string): Promise<Quotation> => {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  },

  // Update quotation
  update: async (id: string, data: any): Promise<Quotation> => {
    const response = await axios.patch(`${API_BASE}/${id}`, data);
    return response.data;
  },

  // Update quotation status
  updateStatus: async (id: string, status: string): Promise<Quotation> => {
    const response = await axios.patch(`${API_BASE}/${id}/status`, { status });
    return response.data;
  },

  // Convert quotation to project
  convertToProject: async (id: string, projectData: any): Promise<Quotation> => {
    const response = await axios.patch(`${API_BASE}/${id}/convert-to-project`, projectData);
    return response.data;
  },

  // Delete quotation
  remove: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/${id}`);
  },
};
