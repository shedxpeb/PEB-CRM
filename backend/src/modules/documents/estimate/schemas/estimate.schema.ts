import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EstimateDocument = Estimate & Document;

@Schema({ timestamps: true })
export class Estimate {
  @Prop({ required: true, unique: true })
  estimateNumber: string;

  @Prop({ required: true })
  version: number;

  // Customer
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

  // Lead/Project
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

  // Estimate Configuration
  @Prop({ required: true })
  includePricing: boolean;
  @Prop()
  subtotal?: number;
  @Prop()
  totalAmount?: number;

  // Material Selection
  @Prop({ type: [Object] })
  materialSelections: any[];

  // Scope Configuration
  @Prop({ type: Object })
  scopeConfiguration: any;

  // Technical Specifications
  @Prop({ type: Object })
  technicalSpecifications: any;

  // Inclusions/Exclusions
  @Prop({ type: [String] })
  inclusions: string[];
  @Prop({ type: [String] })
  exclusions: string[];

  // Notes
  @Prop()
  notes?: string;
  @Prop()
  internalNotes?: string;

  // Conversion Tracking
  @Prop()
  convertedToProposalId?: string;
  @Prop()
  convertedAt?: Date;

  // Template
  @Prop()
  templateId?: string;
}

export const EstimateSchema = SchemaFactory.createForClass(Estimate);
