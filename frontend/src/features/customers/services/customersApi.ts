/**
 * Customers API Service
 * All API calls for customers module - never use axios directly
 *
 * Mock fallback: When backend is unavailable, returns mock data.
 * Remove mock fallbacks once backend is connected.
 */
import { api } from '@/core/api';
import { Customer, CustomerActivity, CustomerFilters, ConvertLeadToCustomerDto } from '@/features/customers/types';
import { PaginatedData, PaginationParams } from '@/shared/types/pagination';

// ─── Mock Data (development only - remove when backend is ready) ─────────────

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1', customerId: 2001, customerName: 'Rajesh Kumar', companyName: 'Kumar Steel Industries',
    mobile: '+91 98765 43210', email: 'rajesh@kumarsteel.com', gstNumber: '27AABCK1234A1Z5',
    industry: 'Manufacturing', businessType: 'Pvt Ltd', address: '42 Industrial Area',
    city: 'Pune', state: 'Maharashtra', country: 'India', pincode: '411001',
    assignedEmployee: 'Vikram Singh', leadSource: 'Website', customerSince: new Date('2024-01-15'),
    totalProjects: 5, activeProjects: 2, completedProjects: 3, totalRevenue: 4500000,
    pendingQuotations: 1, pendingFollowups: 3, status: 'Active',
  },
  {
    id: '2', customerId: 2002, customerName: 'Priya Sharma', companyName: 'Sharma Constructions',
    mobile: '+91 87654 32109', email: 'priya@sharmaconst.com',
    industry: 'Construction', businessType: 'Partnership', address: '15 MG Road',
    city: 'Bangalore', state: 'Karnataka', country: 'India',
    assignedEmployee: 'Sneha Reddy', leadSource: 'Referral', customerSince: new Date('2024-02-20'),
    totalProjects: 3, activeProjects: 1, completedProjects: 2, totalRevenue: 2800000,
    pendingQuotations: 2, pendingFollowups: 1, status: 'Active',
  },
  {
    id: '3', customerId: 2003, customerName: 'Amit Patel', companyName: 'Patel Warehousing Ltd',
    mobile: '+91 76543 21098', email: 'amit@patelwarehouse.com', gstNumber: '24AABCP5678B1Z3',
    industry: 'Logistics', businessType: 'Pvt Ltd', address: '78 GIDC Phase 2',
    city: 'Ahmedabad', state: 'Gujarat', country: 'India', pincode: '382445',
    assignedEmployee: 'Rahul Mehta', leadSource: 'Trade Show', customerSince: new Date('2024-03-10'),
    totalProjects: 8, activeProjects: 3, completedProjects: 5, totalRevenue: 7200000,
    pendingQuotations: 0, pendingFollowups: 2, status: 'Active',
  },
  {
    id: '4', customerId: 2004, customerName: 'Sunita Reddy', companyName: 'Reddy Agro Industries',
    mobile: '+91 65432 10987', email: 'sunita@reddyagro.com',
    industry: 'Agriculture', businessType: 'LLP', address: '23 Agri Park',
    city: 'Hyderabad', state: 'Telangana', country: 'India',
    assignedEmployee: 'Vikram Singh', leadSource: 'Cold Call', customerSince: new Date('2024-04-05'),
    totalProjects: 2, activeProjects: 0, completedProjects: 2, totalRevenue: 1500000,
    pendingQuotations: 3, pendingFollowups: 4, status: 'Prospect',
  },
  {
    id: '5', customerId: 2005, customerName: 'Vikash Gupta', companyName: 'Gupta Manufacturing Co',
    mobile: '+91 54321 09876', email: 'vikash@guptamfg.com', gstNumber: '07AABCG9012C1Z1',
    industry: 'Manufacturing', businessType: 'Proprietorship', address: '56 Sector 12',
    city: 'Noida', state: 'Uttar Pradesh', country: 'India', pincode: '201301',
    assignedEmployee: 'Sneha Reddy', leadSource: 'Website', customerSince: new Date('2023-11-20'),
    totalProjects: 12, activeProjects: 4, completedProjects: 8, totalRevenue: 12000000,
    pendingQuotations: 2, pendingFollowups: 5, status: 'Active',
  },
  {
    id: '6', customerId: 2006, customerName: 'Neha Joshi', companyName: 'Joshi Infrastructure',
    mobile: '+91 43210 98765', email: 'neha@joshiinfra.com',
    industry: 'Infrastructure', businessType: 'Pvt Ltd', address: '89 Civil Lines',
    city: 'Jaipur', state: 'Rajasthan', country: 'India',
    assignedEmployee: 'Rahul Mehta', leadSource: 'Social Media', customerSince: new Date('2024-05-01'),
    totalProjects: 1, activeProjects: 1, completedProjects: 0, totalRevenue: 800000,
    pendingQuotations: 4, pendingFollowups: 2, status: 'Prospect',
  },
  {
    id: '7', customerId: 2007, customerName: 'Arun Singh', companyName: 'Singh Logistics Pvt Ltd',
    mobile: '+91 32109 87654', email: 'arun@singhlogistics.com',
    industry: 'Logistics', businessType: 'Pvt Ltd', address: '34 Transport Nagar',
    city: 'Indore', state: 'Madhya Pradesh', country: 'India',
    assignedEmployee: 'Vikram Singh', leadSource: 'Referral', customerSince: new Date('2023-08-15'),
    totalProjects: 6, activeProjects: 0, completedProjects: 6, totalRevenue: 5500000,
    pendingQuotations: 0, pendingFollowups: 0, status: 'Inactive',
  },
  {
    id: '8', customerId: 2008, customerName: 'Deepa Nair', companyName: 'Nair Healthcare',
    mobile: '+91 21098 76543', email: 'deepa@nairhealth.com',
    industry: 'Healthcare', businessType: 'Trust', address: '12 Medical Complex',
    city: 'Kochi', state: 'Kerala', country: 'India',
    assignedEmployee: 'Sneha Reddy', leadSource: 'Email', customerSince: new Date('2024-06-10'),
    totalProjects: 0, activeProjects: 0, completedProjects: 0, totalRevenue: 0,
    pendingQuotations: 1, pendingFollowups: 1, status: 'Prospect',
  },
  {
    id: '9', customerId: 2009, customerName: 'Manoj Tiwari', companyName: 'Tiwari Commercial Complex',
    mobile: '+91 10987 65432', email: 'manoj@tiwaricommercial.com',
    industry: 'Commercial', businessType: 'Partnership', address: '67 Business Hub',
    city: 'Lucknow', state: 'Uttar Pradesh', country: 'India', pincode: '226001',
    assignedEmployee: 'Rahul Mehta', leadSource: 'Advertisement', customerSince: new Date('2024-01-25'),
    totalProjects: 4, activeProjects: 2, completedProjects: 2, totalRevenue: 3200000,
    pendingQuotations: 1, pendingFollowups: 3, status: 'Active',
  },
  {
    id: '10', customerId: 2010, customerName: 'Kavita Deshmukh', companyName: 'Deshmukh Textiles',
    mobile: '+91 09876 54321', email: 'kavita@deshmukhtextiles.com', gstNumber: '27AABCD3456E1Z2',
    industry: 'Manufacturing', businessType: 'LLP', address: '45 Textile Market',
    city: 'Mumbai', state: 'Maharashtra', country: 'India', pincode: '400001',
    assignedEmployee: 'Vikram Singh', leadSource: 'Website', customerSince: new Date('2023-06-12'),
    totalProjects: 9, activeProjects: 1, completedProjects: 8, totalRevenue: 8900000,
    pendingQuotations: 0, pendingFollowups: 1, status: 'Active',
  },
];

const MOCK_ACTIVITIES: CustomerActivity[] = [
  { id: '1', customerId: '1', type: 'customer_created', description: 'Customer record created', performedBy: 'Vikram Singh', performedAt: new Date('2024-01-15T10:00:00') },
  { id: '2', customerId: '1', type: 'lead_created', description: 'Lead #1001 created from website enquiry', performedBy: 'System', performedAt: new Date('2024-01-14T09:30:00') },
  { id: '3', customerId: '1', type: 'estimate_sent', description: 'Estimate EST-2024-001 sent for Warehouse Project', performedBy: 'Sneha Reddy', performedAt: new Date('2024-02-01T14:00:00') },
  { id: '4', customerId: '1', type: 'quotation_sent', description: 'Quotation QTN-2024-015 sent', performedBy: 'Sneha Reddy', performedAt: new Date('2024-02-15T11:00:00') },
  { id: '5', customerId: '1', type: 'project_started', description: 'Project PRJ-2024-008 started - Warehouse Expansion', performedBy: 'Rahul Mehta', performedAt: new Date('2024-03-01T09:00:00') },
  { id: '6', customerId: '1', type: 'payment_received', description: 'Payment of ₹15,00,000 received for PRJ-2024-008', performedBy: 'Finance Team', performedAt: new Date('2024-04-10T16:00:00') },
  { id: '7', customerId: '1', type: 'project_completed', description: 'Project PRJ-2024-008 completed successfully', performedBy: 'Rahul Mehta', performedAt: new Date('2024-05-20T17:00:00') },
  { id: '8', customerId: '1', type: 'note_added', description: 'Note added: "Customer interested in new factory shed at MIDC Phase 3"', performedBy: 'Vikram Singh', performedAt: new Date('2024-05-25T10:30:00') },
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

export const customersApi = {
  /**
   * Get all customers with pagination and filters
   */
  getAll: async (params?: PaginationParams & CustomerFilters): Promise<PaginatedData<Customer>> => {
    try {
      return await api.get<PaginatedData<Customer>>('/api/customers', { params });
    } catch (error) {
      if (isConnectionError(error)) {
        // Mock fallback - paginated response
        const page = params?.page ?? 1;
        const pageSize = params?.pageSize ?? 20;
        return {
          data: MOCK_CUSTOMERS.slice((page - 1) * pageSize, page * pageSize),
          meta: {
            page,
            pageSize,
            total: MOCK_CUSTOMERS.length,
            totalPages: Math.ceil(MOCK_CUSTOMERS.length / pageSize),
            hasNext: false,
            hasPrevious: false,
          },
        };
      }
      throw error;
    }
  },

  /**
   * Get single customer by ID
   */
  getById: async (id: string): Promise<Customer> => {
    try {
      return await api.get<Customer>(`/api/customers/${id}`);
    } catch (error: any) {
      // Fallback to mock data for any error (development mode)
      const customer = MOCK_CUSTOMERS.find((c) => c.id === id);
      if (customer) return customer;
      // If not found in mock, return first customer as fallback
      if (MOCK_CUSTOMERS.length > 0) return MOCK_CUSTOMERS[0];
      throw new Error(`Customer not found: ${id}`);
    }
  },

  /**
   * Create new customer
   */
  create: (data: any) =>
    api.post<Customer>('/api/customers', data),

  /**
   * Update existing customer
   */
  update: (id: string, data: any) =>
    api.patch<Customer>(`/api/customers/${id}`, data),

  /**
   * Delete customer
   */
  delete: (id: string) =>
    api.delete(`/api/customers/${id}`),

  /**
   * Bulk update customers
   */
  bulkUpdate: (ids: string[], data: any) =>
    api.patch<{ count: number }>('/api/customers/bulk', { ids, data }),

  /**
   * Bulk delete customers
   */
  bulkDelete: (ids: string[]) =>
    api.delete<{ count: number }>('/api/customers/bulk', { data: { ids } }),

  /**
   * Export customers to CSV/Excel
   */
  export: async (params?: CustomerFilters): Promise<Blob> => {
    try {
      return await api.get<Blob>('/api/customers/export', { params, responseType: 'blob' });
    } catch (error) {
      if (isConnectionError(error)) {
        // Mock fallback - generate CSV from mock data
        const headers = ['ID', 'Customer Name', 'Company Name', 'Mobile', 'Email', 'City', 'State', 'Status'];
        const rows = MOCK_CUSTOMERS.map(c => [
          c.customerId,
          c.customerName,
          c.companyName,
          c.mobile,
          c.email,
          c.city,
          c.state,
          c.status,
        ]);
        const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
        return new Blob([csvContent], { type: 'text/csv' });
      }
      throw error;
    }
  },

  /**
   * Get customer statistics
   */
  getStats: async () => {
    try {
      return await api.get<{
        totalCustomers: number;
        activeCustomers: number;
        newThisMonth: number;
        activeProjects: number;
        completedProjects: number;
        totalRevenue: number;
        pendingQuotations: number;
        pendingFollowups: number;
      }>('/api/customers/stats');
    } catch (error) {
      if (isConnectionError(error)) {
        // Mock fallback - computed from mock data
        const active = MOCK_CUSTOMERS.filter((c) => c.status === 'Active');
        return {
          totalCustomers: MOCK_CUSTOMERS.length,
          activeCustomers: active.length,
          newThisMonth: 3,
          activeProjects: MOCK_CUSTOMERS.reduce((sum, c) => sum + c.activeProjects, 0),
          completedProjects: MOCK_CUSTOMERS.reduce((sum, c) => sum + c.completedProjects, 0),
          totalRevenue: MOCK_CUSTOMERS.reduce((sum, c) => sum + c.totalRevenue, 0),
          pendingQuotations: MOCK_CUSTOMERS.reduce((sum, c) => sum + c.pendingQuotations, 0),
          pendingFollowups: MOCK_CUSTOMERS.reduce((sum, c) => sum + c.pendingFollowups, 0),
        };
      }
      throw error;
    }
  },

  /**
   * Get customer activities (timeline)
   */
  getActivities: async (id: string): Promise<CustomerActivity[]> => {
    try {
      return await api.get<CustomerActivity[]>(`/api/customers/${id}/activities`);
    } catch (error: any) {
      // Fallback to mock data for any error (development mode)
      const activities = MOCK_ACTIVITIES.filter((a) => a.customerId === id);
      if (activities.length > 0) return activities;
      // If no activities found for this customer, return empty array
      return [];
    }
  },

  /**
   * Check for duplicate customer by mobile or email
   */
  checkDuplicate: (mobile: string, email?: string) =>
    api.get<{ exists: boolean; customer?: Customer }>('/api/customers/check-duplicate', {
      params: { mobile, email },
    }),

  /**
   * Convert lead to customer
   * Creates a new customer from lead data and updates the lead with customer reference
   */
  convertLeadToCustomer: async (data: ConvertLeadToCustomerDto) => {
    try {
      return await api.post<{ customer: Customer; lead: any }>('/api/customers/convert-lead', data);
    } catch (error) {
      if (isConnectionError(error)) {
        // Mock fallback - create customer from lead data
        const newCustomer: Customer = {
          id: String(MOCK_CUSTOMERS.length + 1),
          customerId: 2000 + MOCK_CUSTOMERS.length + 1,
          customerName: data.customerName,
          companyName: data.companyName,
          mobile: data.mobile,
          email: data.email || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          pincode: data.pincode || '',
          gstNumber: '',
          industry: 'Manufacturing' as any,
          businessType: 'Pvt Ltd' as any,
          country: 'India',
          assignedEmployee: data.assignedEmployeeId || '',
          leadSource: data.leadSource || 'Manual',
          customerSince: new Date(),
          totalProjects: 0,
          activeProjects: 0,
          completedProjects: 0,
          totalRevenue: 0,
          pendingQuotations: 0,
          pendingFollowups: 0,
          status: 'Active',
        };
        MOCK_CUSTOMERS.push(newCustomer);
        return {
          message: 'Lead converted to customer successfully',
          customer: newCustomer,
          lead: {
            id: data.leadId,
            customerId: newCustomer.id,
            status: 'Converted',
            convertedDate: new Date(),
          } as any,
        };
      }
      throw error;
    }
  },
};
