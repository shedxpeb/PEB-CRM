import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estimate, EstimateDocument } from './schemas/estimate.schema';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { UpdateEstimateDto } from './dto/update-estimate.dto';

@Injectable()
export class EstimateService {
  constructor(
    @InjectModel(Estimate.name) private estimateModel: Model<EstimateDocument>,
  ) {}

  async create(createEstimateDto: CreateEstimateDto): Promise<Estimate> {
    // Generate estimate number
    const estimateNumber = await this.generateEstimateNumber();
    
    const estimate = new this.estimateModel({
      ...createEstimateDto,
      estimateNumber,
      version: 1,
      status: 'Draft',
      subtotal: createEstimateDto.includePricing ? this.calculateSubtotal(createEstimateDto.materialSelections) : undefined,
      totalAmount: createEstimateDto.includePricing ? this.calculateSubtotal(createEstimateDto.materialSelections) : undefined,
    });

    return estimate.save();
  }

  async findAll(page = 1, pageSize = 10, filters?: any): Promise<{ data: Estimate[]; total: number }> {
    const query = this.buildQuery(filters);
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.estimateModel.find(query).skip(skip).limit(pageSize).sort({ createdAt: -1 }).exec(),
      this.estimateModel.countDocuments(query),
    ]);

    return { data, total };
  }

  async findOne(id: string): Promise<Estimate> {
    const estimate = await this.estimateModel.findById(id).exec();
    if (!estimate) {
      throw new NotFoundException(`Estimate with ID ${id} not found`);
    }
    return estimate;
  }

  async findByNumber(estimateNumber: string): Promise<Estimate> {
    const estimate = await this.estimateModel.findOne({ estimateNumber }).exec();
    if (!estimate) {
      throw new NotFoundException(`Estimate with number ${estimateNumber} not found`);
    }
    return estimate;
  }

  async update(id: string, updateEstimateDto: UpdateEstimateDto): Promise<Estimate> {
    const estimate = await this.findOne(id);
    
    // If pricing is included, recalculate totals
    if (updateEstimateDto.includePricing !== undefined || updateEstimateDto.materialSelections) {
      const materialSelections = updateEstimateDto.materialSelections || estimate.materialSelections;
      const includePricing = updateEstimateDto.includePricing !== undefined ? updateEstimateDto.includePricing : estimate.includePricing;
      
      if (includePricing) {
        updateEstimateDto.subtotal = this.calculateSubtotal(materialSelections);
        updateEstimateDto.totalAmount = updateEstimateDto.subtotal;
      }
    }

    const updated = await this.estimateModel.findByIdAndUpdate(
      id,
      { $set: updateEstimateDto },
      { new: true },
    ).exec();

    return updated;
  }

  async remove(id: string): Promise<void> {
    const estimate = await this.findOne(id);
    await this.estimateModel.findByIdAndDelete(id).exec();
  }

  async updateStatus(id: string, status: string): Promise<Estimate> {
    const estimate = await this.findOne(id);
    
    // Validate status transition
    if (!this.isValidStatusTransition(estimate.status, status)) {
      throw new BadRequestException(`Invalid status transition from ${estimate.status} to ${status}`);
    }

    estimate.status = status;
    
    if (status === 'Sent') {
      estimate.sentAt = new Date();
    } else if (status === 'Viewed') {
      estimate.viewedAt = new Date();
    } else if (status === 'Accepted') {
      estimate.acceptedAt = new Date();
    } else if (status === 'Rejected') {
      estimate.rejectedAt = new Date();
    } else if (status === 'Converted') {
      estimate.convertedAt = new Date();
    }

    return estimate.save();
  }

  async convertToProposal(id: string, proposalData: any): Promise<any> {
    const estimate = await this.findOne(id);

    // Validate conversion
    if (estimate.status !== 'Draft' && estimate.status !== 'Sent') {
      throw new BadRequestException('Estimate must be in Draft or Sent status to convert to Proposal');
    }

    if (estimate.convertedToProposalId) {
      throw new BadRequestException('Estimate has already been converted to a Proposal');
    }

    // Mark estimate as converted
    estimate.status = 'Converted';
    estimate.convertedToProposalId = proposalData.proposalId;
    estimate.convertedAt = new Date();
    await estimate.save();

    return estimate;
  }

  async getStats(): Promise<any> {
    const totalEstimates = await this.estimateModel.countDocuments().exec();
    const draftEstimates = await this.estimateModel.countDocuments({ status: 'Draft' }).exec();
    const sentEstimates = await this.estimateModel.countDocuments({ status: 'Sent' }).exec();
    const convertedEstimates = await this.estimateModel.countDocuments({ status: 'Converted' }).exec();

    return {
      totalEstimates,
      draftEstimates,
      sentEstimates,
      convertedEstimates,
    };
  }

  // Private helper methods

  private async generateEstimateNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.estimateModel.countDocuments({
      estimateNumber: new RegExp(`^EST-${year}`),
    }).exec();
    
    return `EST-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  private calculateSubtotal(materialSelections: any[]): number {
    return materialSelections.reduce((sum, item) => {
      return sum + ((item.quantity || 0) * (item.rate || 0));
    }, 0);
  }

  private buildQuery(filters?: any): any {
    const query: any = {};

    if (filters?.customerId) {
      query.customerId = filters.customerId;
    }

    if (filters?.status) {
      query.status = filters.status;
    }

    if (filters?.leadId) {
      query.leadId = filters.leadId;
    }

    if (filters?.projectId) {
      query.projectId = filters.projectId;
    }

    if (filters?.search) {
      query.$or = [
        { estimateNumber: { $regex: filters.search, $options: 'i' } },
        { customerName: { $regex: filters.search, $options: 'i' } },
      ];
    }

    return query;
  }

  private isValidStatusTransition(currentStatus: string, newStatus: string): boolean {
    const validTransitions: Record<string, string[]> = {
      'Draft': ['Sent', 'Cancelled'],
      'Sent': ['Viewed', 'Accepted', 'Rejected', 'Expired', 'Cancelled'],
      'Viewed': ['Accepted', 'Rejected', 'Expired', 'Cancelled'],
      'Accepted': ['Converted', 'Cancelled'],
      'Rejected': ['Draft', 'Cancelled'],
      'Expired': ['Draft', 'Cancelled'],
      'Converted': [],
      'Cancelled': [],
    };

    return validTransitions[currentStatus]?.includes(newStatus) || false;
  }
}
