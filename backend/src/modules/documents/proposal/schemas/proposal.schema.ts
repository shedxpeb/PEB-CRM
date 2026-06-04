import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProposalDocument = Proposal & Document;

@Schema({ timestamps: true })
export class Proposal {
  @Prop({ required: true, unique: true })
  proposalNumber: string;

  @Prop({ required: true })
  version: number;

  // Source Estimate
  @Prop({ required: true })
  estimateId: string;
  @Prop({ required: true })
  estimateNumber: string;

  // Customer (inherited from Estimate)
  @Prop({ required: true })
  customerId: string;
  @Prop({ required: true })
  customerName: string;
  @Prop()
  customerEmail?: string;
  @Prop()
  customerPhone?: string;
  @Prop()
  customerAddress?: string;
  @Prop()
  customerGST?: string;

  // Lead/Project Reference
  @Prop()
  leadId?: string;
  @Prop()
  leadNumber?: string;
  @Prop()
  projectId?: string;
  @Prop()
  projectName?: string;

  // Status
  @Prop({ required: true, enum: ['Draft', 'Sent', 'Viewed', 'Accepted', 'Rejected', 'Expired', 'Converted', 'Cancelled'] })
  status: string;
  @Prop({ enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'] })
  approvalStatus?: string;

  // Inherited Data (from Estimate)
  @Prop({ type: [Object] })
  materialSelections: any[];
  @Prop({ type: Object })
  scopeConfiguration: any;
  @Prop({ type: Object })
  technicalSpecifications: any;
  @Prop({ type: [String] })
  inclusions: string[];
  @Prop({ type: [String] })
  exclusions: string[];

  // Proposal-Specific Configuration
  @Prop({ type: Object })
  proposalConfiguration: any;

  // Commercial Summary (Optional)
  @Prop()
  includeCommercialSummary: boolean;
  @Prop({ type: Object })
  commercialSummary?: any;

  // Timeline
  @Prop({ type: Object })
  timeline?: any;

  // Document Content
  @Prop({ type: Object })
  coverPage?: any;
  @Prop()
  companyProfile?: string;
  @Prop()
  projectOverview?: string;
  @Prop()
  scopeOfWork?: string;
  @Prop()
  termsAndConditions?: string;

  // Notes
  @Prop()
  notes?: string;
  @Prop()
  internalNotes?: string;

  // Conversion Tracking
  @Prop()
  convertedToQuotationId?: string;
  @Prop()
  convertedAt?: Date;

  // Template
  @Prop()
  templateId?: string;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);
