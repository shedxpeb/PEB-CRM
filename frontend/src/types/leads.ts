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

export type ProjectType = 
  | 'Factory'
  | 'Warehouse'
  | 'Industrial Shed'
  | 'Commercial'
  | 'Residential'
  | 'Other';

export type StructureType = 
  | 'PEB'
  | 'Steel Structure'
  | 'Hybrid'
  | 'Other';

export type RoofType = 
  | 'Metal Sheet'
  | 'Deck Sheet'
  | 'Sandwich Panel'
  | 'Other';

export type WallType = 
  | 'Metal Sheet'
  | 'Brick Wall'
  | 'Sandwich Panel'
  | 'Other';

export type MaterialPreference = 
  | 'Standard'
  | 'Premium'
  | 'Economy';

export type LeadSource = 
  | 'Website'
  | 'Referral'
  | 'Cold Call'
  | 'Email'
  | 'Social Media'
  | 'Trade Show'
  | 'Advertisement'
  | 'Other';

export type LeadPriority = 
  | 'Low'
  | 'Medium'
  | 'High'
  | 'Urgent';

export interface Lead {
  id: string;
  leadId: number;
  
  // Customer Details
  customerName: string;
  companyName: string;
  mobile: string;
  alternateMobile?: string;
  email: string;
  gstNumber?: string;
  address: string;
  city: string;
  state: string;
  
  // Project Details
  projectTitle: string;
  projectType: ProjectType;
  
  // Structure Details
  structureType: StructureType;
  width?: number;
  length?: number;
  height?: number;
  baySpacing?: number;
  roofType?: RoofType;
  craneRequired?: boolean;
  craneCapacity?: number;
  mezzanine?: boolean;
  wallType?: WallType;
  insulationRequired?: boolean;
  materialPreference?: MaterialPreference;
  
  // Site Details
  siteLocation?: string;
  siteAddress?: string;
  mapCoordinates?: string;
  soilNotes?: string;
  
  // Requirement Details
  customerNotes?: string;
  attachments?: string[];
  specialRequirement?: string;
  
  // Business Details
  source: LeadSource;
  priority: LeadPriority;
  assignedEmployee?: string;
  assignedEmployeeId?: string;

  // Status & Tracking
  status: LeadStatus;
  score?: number;
  createdDate: Date;
  lastFollowUp?: Date;
  nextFollowUpDate?: Date;
  createdBy?: string;
  updatedBy?: string;
  updatedAt?: Date;

  // Cross-module relationships
  customerId?: string; // Links to Customer when lead is converted
  convertedDate?: Date; // Date when lead was converted to customer

  // Additional fields
  pincode?: string;
  remarks?: string;

  /** Settings-defined custom field values */
  customFields?: Record<string, string | number | boolean>;
}

export type LeadCustomFieldType = 'text' | 'number' | 'select' | 'textarea' | 'boolean';

export interface LeadCustomFieldDefinition {
  key: string;
  label: string;
  type: LeadCustomFieldType;
  options?: string[];
  required?: boolean;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: 'created' | 'updated' | 'followup' | 'document_sent' | 'assigned' | 'converted' | 'status_changed';
  description: string;
  performedBy: string;
  performedAt: Date;
  metadata?: Record<string, any>;
}

export interface LeadFilter {
  status?: LeadStatus;
  projectType?: ProjectType;
  structureType?: StructureType;
  city?: string;
  assignedEmployee?: string;
  source?: LeadSource;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface LeadSearchParams {
  query?: string;
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: LeadFilter;
}
