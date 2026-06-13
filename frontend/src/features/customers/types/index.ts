/**
 * Customer Module Types
 * Single Source of Truth for all customer data across the CRM platform
 */

export type CustomerStatus =
  | 'Active'
  | 'Inactive'
  | 'Prospect'
  | 'Converted'
  | 'Churned';

export type Industry =
  | 'Manufacturing'
  | 'Construction'
  | 'Infrastructure'
  | 'Logistics'
  | 'Agriculture'
  | 'Commercial'
  | 'Healthcare'
  | 'Education'
  | 'Retail'
  | 'Other';

export type BusinessType =
  | 'Pvt Ltd'
  | 'LLP'
  | 'Partnership'
  | 'Proprietorship'
  | 'Trust'
  | 'Government'
  | 'Other';

export type CustomerSource =
  | 'Website'
  | 'Referral'
  | 'Cold Call'
  | 'Email'
  | 'Social Media'
  | 'Trade Show'
  | 'Advertisement'
  | 'Other';

/**
 * Customer interface - the central customer record
 * Referenced by: Leads, Projects, Quotations, Estimates, Proposals,
 * Documents, Design, BOQ, Inventory, Finance
 */
export interface Customer {
  id: string;
  customerId: number;

  // Customer Information
  customerName: string;
  companyName: string;
  mobile: string;
  alternateMobile?: string;
  email: string;

  // Business Information
  gstNumber?: string;
  panNumber?: string;
  industry: Industry;
  businessType: BusinessType;
  website?: string;

  // Address Information
  address: string;
  city: string;
  state: string;
  country?: string;
  pincode?: string;

  // Assignment
  assignedEmployee?: string;
  assignedEmployeeId?: string;
  leadSource: CustomerSource;

  // Timestamps
  customerSince: Date;

  // Aggregate Stats (populated by backend joins)
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalRevenue: number;
  pendingQuotations: number;
  pendingFollowups: number;

  // Cross-module relationships
  leadId?: string; // The lead that converted to this customer
  projectIds?: string[]; // List of project IDs for this customer
  estimateIds?: string[]; // List of estimate IDs for this customer
  proposalIds?: string[]; // List of proposal IDs for this customer
  quotationIds?: string[]; // List of quotation IDs for this customer

  // Status & Meta
  status: CustomerStatus;
  notes?: string;
  attachments?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Customer Activity - Timeline events for a customer
 */
export type CustomerActivityType =
  | 'lead_created'
  | 'customer_created'
  | 'estimate_sent'
  | 'quotation_sent'
  | 'proposal_sent'
  | 'meeting_scheduled'
  | 'project_started'
  | 'project_completed'
  | 'note_added'
  | 'status_changed'
  | 'assigned'
  | 'document_created'
  | 'payment_received';

export interface CustomerActivity {
  id: string;
  customerId: string;
  type: CustomerActivityType;
  description: string;
  performedBy: string;
  performedAt: Date;
  metadata?: Record<string, any>;
}

/**
 * Customer Filters - used by DataTable, API, and hooks
 */
export interface CustomerFilters {
  status?: CustomerStatus;
  state?: string;
  city?: string;
  industry?: Industry;
  assignedEmployee?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

/**
 * Create Customer DTO
 */
export interface CreateCustomerDto {
  customerName: string;
  companyName: string;
  mobile: string;
  alternateMobile?: string;
  email: string;
  gstNumber?: string;
  panNumber?: string;
  industry: Industry;
  businessType: BusinessType;
  website?: string;
  address: string;
  city: string;
  state: string;
  country?: string;
  pincode?: string;
  assignedEmployeeId?: string;
  leadSource: CustomerSource;
  status?: CustomerStatus;
  notes?: string;
}

/**
 * Update Customer DTO (all fields optional)
 */
export interface UpdateCustomerDto {
  customerName?: string;
  companyName?: string;
  mobile?: string;
  alternateMobile?: string;
  email?: string;
  gstNumber?: string;
  panNumber?: string;
  industry?: Industry;
  businessType?: BusinessType;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  assignedEmployeeId?: string;
  leadSource?: CustomerSource;
  status?: CustomerStatus;
  notes?: string;
}

/**
 * Convert Lead to Customer DTO
 * Used when converting a lead to a customer
 */
export interface ConvertLeadToCustomerDto {
  leadId: string;
  customerName: string;
  companyName: string;
  mobile: string;
  alternateMobile?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  industry?: Industry;
  businessType?: BusinessType;
  website?: string;
  leadSource: CustomerSource;
  assignedEmployeeId?: string;
  notes?: string;
}
