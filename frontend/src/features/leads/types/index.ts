/**
 * Leads Module Types
 * All types related to leads
 */

export type LeadStatus = 
  | 'New'
  | 'Contacted'
  | 'Design Pending'
  | 'BOQ Pending'
  | 'Estimate Sent'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Approved'
  | 'Rejected'
  | 'Converted';

export type LeadPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type LeadSource = 
  | 'Website'
  | 'Referral'
  | 'Cold Call'
  | 'Social Media'
  | 'Advertisement'
  | 'Other';

export interface Lead {
  id: string;
  leadId: number;
  customerName: string;
  companyName: string;
  mobile: string;
  email: string;
  address?: string;
  city: string;
  state: string;
  pincode?: string;
  projectTitle?: string;
  projectType: string;
  structureType: string;
  width?: number;
  length?: number;
  height?: number;
  area?: number;
  source: LeadSource;
  priority: LeadPriority;
  assignedEmployee?: string;
  assignedEmployeeId?: string;
  status: LeadStatus;
  score?: number;
  remarks?: string;
  createdDate: Date;
  lastFollowUp?: Date;
  nextFollowUpDate?: Date;
  convertedDate?: Date;
  // Cross-module relationships
  customerId?: string; // Links to Customer when lead is converted
  convertedProjectId?: string; // Links to Project when lead is converted
  estimateId?: string; // Links to Estimate
  proposalId?: string; // Links to Proposal
  quotationId?: string; // Links to Quotation
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Create Lead DTO (Data Transfer Object)
 */
export interface CreateLeadDto {
  customerName: string;
  companyName: string;
  mobile: string;
  email: string;
  address?: string;
  city: string;
  state: string;
  pincode?: string;
  projectTitle?: string;
  projectType: string;
  structureType: string;
  width?: number;
  length?: number;
  height?: number;
  source: LeadSource;
  priority: LeadPriority;
  assignedEmployeeId?: string;
  status?: LeadStatus;
  remarks?: string;
  nextFollowUpDate?: Date;
}

/**
 * Update Lead DTO
 */
export interface UpdateLeadDto {
  customerName?: string;
  companyName?: string;
  mobile?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  projectTitle?: string;
  projectType?: string;
  structureType?: string;
  width?: number;
  length?: number;
  height?: number;
  source?: LeadSource;
  priority?: LeadPriority;
  assignedEmployeeId?: string;
  status?: LeadStatus;
  score?: number;
  remarks?: string;
  nextFollowUpDate?: Date;
}
