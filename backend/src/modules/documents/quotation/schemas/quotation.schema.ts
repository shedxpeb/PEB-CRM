import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuotationDocument = Quotation & Document;

@Schema({ timestamps: true })
export class Quotation {
  @Prop({ required: true, unique: true })
  quotationNumber: string;

  @Prop({ required: true })
  version: number;

  // Source Proposal
  @Prop({ required: true })
  proposalId: string;
  @Prop({ required: true })
  proposalNumber: string;
  @Prop({ required: true })
  sourceEstimateId: string;
  @Prop({ required: true })
  sourceEstimateNumber: string;

  // Customer (inherited from Proposal)
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

  // Validity
  @Prop()
  validUntil?: Date;
  @Prop({ required: true })
  paymentTerms: string;
  @Prop()
  deliveryTerms?: string;

  // Inherited Data (from Proposal)
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
  @Prop({ type: Object })
  proposalConfiguration: any;
  @Prop({ type: Object })
  timeline?: any;

  // Quotation Pricing Configuration
  @Prop({ required: true, type: Object })
  pricingConfiguration: any;

  // Calculated Amounts (System Calculated)
  @Prop({ required: true })
  materialCost: number;
  @Prop({ required: true })
  labourCost: number;
  @Prop({ required: true })
  installationCost: number;
  @Prop({ required: true })
  transportationCost: number;
  @Prop({ required: true })
  craneCost: number;
  @Prop({ required: true })
  civilCost: number;
  @Prop({ required: true })
  accommodationCost: number;
  @Prop({ required: true })
  erectionCost: number;
  @Prop({ required: true })
  freightCost: number;
  @Prop({ required: true })
  otherCosts: number;

  // Totals
  @Prop({ required: true })
  subtotal: number;
  @Prop({ required: true })
  discountAmount: number;
  @Prop()
  discountPercentage?: number;
  @Prop({ required: true })
  taxAmount: number;
  @Prop({ required: true, enum: ['CGST', 'SGST', 'IGST', 'CESS'] })
  gstType: string;
  @Prop()
  cgstAmount?: number;
  @Prop()
  sgstAmount?: number;
  @Prop()
  igstAmount?: number;
  @Prop()
  cessAmount?: number;
  @Prop({ required: true })
  grandTotal: number;

  // Amount in Words
  @Prop()
  amountInWords?: string;

  // Terms
  @Prop()
  termsAndConditions?: string;
  @Prop()
  notes?: string;
  @Prop()
  internalNotes?: string;

  // Conversion Tracking
  @Prop()
  convertedToProjectId?: string;
  @Prop()
  convertedAt?: Date;

  // Template
  @Prop()
  templateId?: string;
}

export const QuotationSchema = SchemaFactory.createForClass(Quotation);
