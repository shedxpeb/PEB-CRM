import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quotation, QuotationDocument } from './schemas/quotation.schema';
import { ProposalService } from '../proposal/proposal.service';

@Injectable()
export class QuotationService {
  constructor(
    @InjectModel(Quotation.name) private quotationModel: Model<QuotationDocument>,
    private proposalService: ProposalService,
  ) {}

  async createFromProposal(proposalId: string, quotationData: any): Promise<Quotation> {
    const proposal = await this.proposalService.findOne(proposalId);
    
    // Generate quotation number
    const quotationNumber = await this.generateQuotationNumber();
    
    // Calculate amounts
    const calculatedAmounts = this.calculateAmounts(quotationData.pricingConfiguration);
    
    const quotation = new this.quotationModel({
      ...quotationData,
      quotationNumber,
      version: 1,
      proposalId: proposal.id,
      proposalNumber: proposal.proposalNumber,
      sourceEstimateId: proposal.estimateId,
      sourceEstimateNumber: proposal.estimateNumber,
      customerId: proposal.customerId,
      customerName: proposal.customerName,
      customerEmail: proposal.customerEmail,
      customerPhone: proposal.customerPhone,
      customerAddress: proposal.customerAddress,
      customerGST: proposal.customerGST,
      leadId: proposal.leadId,
      leadNumber: proposal.leadNumber,
      projectId: proposal.projectId,
      projectName: proposal.projectName,
      status: 'Draft',
      // Inherit data from proposal
      materialSelections: proposal.materialSelections,
      scopeConfiguration: proposal.scopeConfiguration,
      technicalSpecifications: proposal.technicalSpecifications,
      inclusions: proposal.inclusions,
      exclusions: proposal.exclusions,
      proposalConfiguration: proposal.proposalConfiguration,
      timeline: proposal.timeline,
      // Calculated amounts
      ...calculatedAmounts,
      amountInWords: this.numberToWords(calculatedAmounts.grandTotal),
    });

    const savedQuotation = await quotation.save();
    
    // Update proposal with conversion reference
    await this.proposalService.convertToQuotation(proposalId, { quotationId: savedQuotation.id });
    
    return savedQuotation;
  }

  async findAll(page = 1, pageSize = 10, filters?: any): Promise<{ data: Quotation[]; total: number }> {
    const query = this.buildQuery(filters);
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.quotationModel.find(query).skip(skip).limit(pageSize).sort({ createdAt: -1 }).exec(),
      this.quotationModel.countDocuments(query),
    ]);

    return { data, total };
  }

  async findOne(id: string): Promise<Quotation> {
    const quotation = await this.quotationModel.findById(id).exec();
    if (!quotation) {
      throw new NotFoundException(`Quotation with ID ${id} not found`);
    }
    return quotation;
  }

  async update(id: string, updateData: any): Promise<Quotation> {
    const quotation = await this.findOne(id);
    
    // Recalculate amounts if pricing configuration is updated
    if (updateData.pricingConfiguration) {
      const calculatedAmounts = this.calculateAmounts(updateData.pricingConfiguration);
      updateData = { ...updateData, ...calculatedAmounts, amountInWords: this.numberToWords(calculatedAmounts.grandTotal) };
    }
    
    const updated = await this.quotationModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    ).exec();
    return updated;
  }

  async remove(id: string): Promise<void> {
    const quotation = await this.findOne(id);
    await this.quotationModel.findByIdAndDelete(id).exec();
  }

  async updateStatus(id: string, status: string): Promise<Quotation> {
    const quotation = await this.findOne(id);
    quotation.status = status;
    
    if (status === 'Sent') {
      quotation.sentAt = new Date();
    } else if (status === 'Viewed') {
      quotation.viewedAt = new Date();
    } else if (status === 'Accepted') {
      quotation.acceptedAt = new Date();
    } else if (status === 'Rejected') {
      quotation.rejectedAt = new Date();
    } else if (status === 'Converted') {
      quotation.convertedAt = new Date();
    }

    return quotation.save();
  }

  async convertToProject(id: string, projectData: any): Promise<any> {
    const quotation = await this.findOne(id);

    if (quotation.status !== 'Accepted') {
      throw new BadRequestException('Quotation must be Accepted before conversion to Project');
    }

    if (quotation.convertedToProjectId) {
      throw new BadRequestException('Quotation has already been converted to a Project');
    }

    quotation.status = 'Converted';
    quotation.convertedToProjectId = projectData.projectId;
    quotation.convertedAt = new Date();
    await quotation.save();

    return quotation;
  }

  async getStats(): Promise<any> {
    const totalQuotations = await this.quotationModel.countDocuments().exec();
    const draftQuotations = await this.quotationModel.countDocuments({ status: 'Draft' }).exec();
    const sentQuotations = await this.quotationModel.countDocuments({ status: 'Sent' }).exec();
    const acceptedQuotations = await this.quotationModel.countDocuments({ status: 'Accepted' }).exec();
    const convertedQuotations = await this.quotationModel.countDocuments({ status: 'Converted' }).exec();

    const totalRevenuePipeline = await this.quotationModel.aggregate([
      { $match: { status: { $in: ['Sent', 'Viewed'] } } },
      { $group: { _id: null, total: { $sum: '$grandTotal' } } },
    ]).exec();

    return {
      totalQuotations,
      draftQuotations,
      sentQuotations,
      acceptedQuotations,
      convertedQuotations,
      totalRevenuePipeline: totalRevenuePipeline[0]?.total || 0,
    };
  }

  private async generateQuotationNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.quotationModel.countDocuments({
      quotationNumber: new RegExp(`^QUOT-${year}`),
    }).exec();
    
    return `QUOT-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  private calculateAmounts(pricingConfig: any): any {
    const materialCost = pricingConfig.materialRates?.reduce((sum: number, m: any) => sum + (m.amount || 0), 0) || 0;
    
    const labourCost = pricingConfig.labourCost || 0;
    const installationCost = pricingConfig.installationCost || 0;
    const transportationCost = pricingConfig.transportationCost || 0;
    const craneCost = pricingConfig.craneCost || 0;
    const civilCost = pricingConfig.civilCost || 0;
    const accommodationCost = pricingConfig.accommodationCost || 0;
    const erectionCost = pricingConfig.erectionCost || 0;
    const freightCost = pricingConfig.freightCost || 0;
    
    const otherCosts = pricingConfig.additionalServiceCosts?.reduce((sum: number, s: any) => sum + (s.cost || 0), 0) || 0;
    
    let subtotal = materialCost + labourCost + installationCost + transportationCost + 
                   craneCost + civilCost + accommodationCost + erectionCost + freightCost + otherCosts;
    
    // Apply markup
    if (pricingConfig.markupPercentage && pricingConfig.markupPercentage > 0) {
      subtotal = subtotal * (1 + pricingConfig.markupPercentage / 100);
    }
    
    // Apply discount
    let discountAmount = 0;
    if (pricingConfig.discountType === 'percentage' && pricingConfig.discountValue) {
      discountAmount = subtotal * (pricingConfig.discountValue / 100);
    } else if (pricingConfig.discountType === 'fixed' && pricingConfig.discountValue) {
      discountAmount = pricingConfig.discountValue;
    }
    
    const afterDiscount = subtotal - discountAmount;
    
    // Calculate GST
    let taxAmount = 0;
    let cgstAmount = 0;
    let sgstAmount = 0;
    let igstAmount = 0;
    let cessAmount = 0;
    
    if (pricingConfig.gstType === 'CGST' || pricingConfig.gstType === 'SGST') {
      const gstRate = pricingConfig.gstRate || 0;
      cgstAmount = afterDiscount * (gstRate / 2 / 100);
      sgstAmount = afterDiscount * (gstRate / 2 / 100);
      taxAmount = cgstAmount + sgstAmount;
    } else if (pricingConfig.gstType === 'IGST') {
      const gstRate = pricingConfig.gstRate || 0;
      igstAmount = afterDiscount * (gstRate / 100);
      taxAmount = igstAmount;
    }
    
    if (pricingConfig.cessRate && pricingConfig.cessRate > 0) {
      cessAmount = afterDiscount * (pricingConfig.cessRate / 100);
      taxAmount += cessAmount;
    }
    
    const grandTotal = afterDiscount + taxAmount;
    
    // Apply rounding
    let roundedTotal = grandTotal;
    if (pricingConfig.roundingMethod === 'nearest') {
      roundedTotal = Math.round(grandTotal);
    } else if (pricingConfig.roundingMethod === 'up') {
      roundedTotal = Math.ceil(grandTotal);
    } else if (pricingConfig.roundingMethod === 'down') {
      roundedTotal = Math.floor(grandTotal);
    }
    
    return {
      materialCost,
      labourCost,
      installationCost,
      transportationCost,
      craneCost,
      civilCost,
      accommodationCost,
      erectionCost,
      freightCost,
      otherCosts,
      subtotal,
      discountAmount,
      discountPercentage: pricingConfig.discountType === 'percentage' ? pricingConfig.discountValue : undefined,
      taxAmount,
      cgstAmount,
      sgstAmount,
      igstAmount,
      cessAmount,
      grandTotal: roundedTotal,
    };
  }

  private numberToWords(amount: number): string {
    // Simple implementation - in production, use a proper number-to-words library
    return `Rupees ${amount.toFixed(2)} Only`;
  }

  private buildQuery(filters?: any): any {
    const query: any = {};

    if (filters?.customerId) {
      query.customerId = filters.customerId;
    }

    if (filters?.status) {
      query.status = filters.status;
    }

    if (filters?.proposalId) {
      query.proposalId = filters.proposalId;
    }

    if (filters?.search) {
      query.$or = [
        { quotationNumber: { $regex: filters.search, $options: 'i' } },
        { customerName: { $regex: filters.search, $options: 'i' } },
      ];
    }

    return query;
  }
}
