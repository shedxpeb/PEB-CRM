/**
 * Leads Validation Schemas
 * Using Zod for type-safe form validation
 */
import { z } from 'zod';

/**
 * Create Lead Validation Schema
 */
export const createLeadSchema = z.object({
  customerName: z.string()
    .min(2, 'Customer name must be at least 2 characters')
    .max(100, 'Customer name must be less than 100 characters'),
  
  companyName: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),
  
  mobile: z.string()
    .regex(/^\+91\s\d{5}\s\d{5}$/, 'Mobile number must be in format: +91 XXXXX XXXXX'),
  
  email: z.string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
  
  address: z.string()
    .max(500, 'Address must be less than 500 characters')
    .optional(),
  
  city: z.string()
    .min(2, 'City is required')
    .max(50, 'City must be less than 50 characters'),
  
  state: z.string()
    .min(2, 'State is required')
    .max(50, 'State must be less than 50 characters'),
  
  pincode: z.string()
    .regex(/^\d{6}$/, 'Pincode must be 6 digits')
    .optional()
    .or(z.literal('')),
  
  projectTitle: z.string()
    .max(200, 'Project title must be less than 200 characters')
    .optional(),
  
  projectType: z.string()
    .min(1, 'Project type is required'),
  
  structureType: z.string()
    .min(1, 'Structure type is required'),
  
  width: z.number()
    .positive('Width must be positive')
    .optional(),
  
  length: z.number()
    .positive('Length must be positive')
    .optional(),
  
  height: z.number()
    .positive('Height must be positive')
    .optional(),
  
  source: z.enum(['Website', 'Referral', 'Cold Call', 'Social Media', 'Advertisement', 'Other']),
  
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']),
  
  assignedEmployeeId: z.string()
    .optional(),
  
  status: z.enum([
    'New',
    'Contacted',
    'Design Pending',
    'BOQ Pending',
    'Estimate Sent',
    'Proposal Sent',
    'Negotiation',
    'Approved',
    'Rejected',
    'Converted',
  ]).optional().default('New'),
  
  remarks: z.string()
    .max(1000, 'Remarks must be less than 1000 characters')
    .optional(),
  
  nextFollowUpDate: z.date()
    .optional()
    .refine(
      (date) => !date || date >= new Date(),
      'Follow-up date cannot be in the past'
    ),
});

/**
 * Update Lead Validation Schema (all fields optional)
 */
export const updateLeadSchema = createLeadSchema.partial();

export type CreateLeadFormData = z.infer<typeof createLeadSchema>;
export type UpdateLeadFormData = z.infer<typeof updateLeadSchema>;

/**
 * Usage Example with React Hook Form:
 * 
 * import { useForm } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * import { createLeadSchema, CreateLeadFormData } from '@/features/leads/validations';
 * 
 * const form = useForm<CreateLeadFormData>({
 *   resolver: zodResolver(createLeadSchema),
 *   defaultValues: {
 *     customerName: '',
 *     mobile: '+91 ',
 *     status: 'New',
 *   },
 * });
 */
