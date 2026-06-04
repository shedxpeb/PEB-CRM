import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proposal, ProposalDocument } from './schemas/proposal.schema';
import { EstimateService } from '../estimate/estimate.service';

@Injectable()
export class ProposalService {
  constructor(
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
    private estimateService: EstimateService,
  ) {}

  async createFromEstimate(estimateId: string, proposalData: any): Promise<Proposal> {
    const estimate = await this.estimateService.findOne(estimateId);
    
    // Generate proposal number
    const proposalNumber = await this.generateProposalNumber();
    
    const proposal = new this.proposalModel({
      ...proposalData,
      proposalNumber,
      version: 1,
      estimateId: estimate.id,
      estimateNumber: estimate.estimateNumber,
      customerId: estimate.customerId,
      customerName: estimate.customerName,
      customerEmail: estimate.customerEmail,
      customerPhone: estimate.customerPhone,
      customerAddress: estimate.customerAddress,
      customerGST: estimate.customerGST,
      leadId: estimate.leadId,
      leadNumber: estimate.leadNumber,
      projectId: estimate.projectId,
      projectName: estimate.projectName,
      status: 'Draft',
      // Inherit data from estimate
      materialSelections: estimate.materialSelections,
      scopeConfiguration: estimate.scopeConfiguration,
      technicalSpecifications: estimate.technicalSpecifications,
      inclusions: estimate.inclusions,
      exclusions: estimate.exclusions,
    });

    const savedProposal = await proposal.save();
    
    // Update estimate with conversion reference
    await this.estimateService.convertToProposal(estimateId, { proposalId: savedProposal.id });
    
    return savedProposal;
  }

  async findAll(page = 1, pageSize = 10, filters?: any): Promise<{ data: Proposal[]; total: number }> {
    const query = this.buildQuery(filters);
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.proposalModel.find(query).skip(skip).limit(pageSize).sort({ createdAt: -1 }).exec(),
      this.proposalModel.countDocuments(query),
    ]);

    return { data, total };
  }

  async findOne(id: string): Promise<Proposal> {
    const proposal = await this.proposalModel.findById(id).exec();
    if (!proposal) {
      throw new NotFoundException(`Proposal with ID ${id} not found`);
    }
    return proposal;
  }

  async update(id: string, updateData: any): Promise<Proposal> {
    const proposal = await this.findOne(id);
    const updated = await this.proposalModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    ).exec();
    return updated;
  }

  async remove(id: string): Promise<void> {
    const proposal = await this.findOne(id);
    await this.proposalModel.findByIdAndDelete(id).exec();
  }

  async updateStatus(id: string, status: string): Promise<Proposal> {
    const proposal = await this.findOne(id);
    proposal.status = status;
    
    if (status === 'Sent') {
      proposal.sentAt = new Date();
    } else if (status === 'Viewed') {
      proposal.viewedAt = new Date();
    } else if (status === 'Accepted') {
      proposal.acceptedAt = new Date();
    } else if (status === 'Rejected') {
      proposal.rejectedAt = new Date();
    } else if (status === 'Converted') {
      proposal.convertedAt = new Date();
    }

    return proposal.save();
  }

  async convertToQuotation(id: string, quotationData: any): Promise<any> {
    const proposal = await this.findOne(id);

    if (proposal.status !== 'Draft' && proposal.status !== 'Sent') {
      throw new BadRequestException('Proposal must be in Draft or Sent status to convert to Quotation');
    }

    if (proposal.convertedToQuotationId) {
      throw new BadRequestException('Proposal has already been converted to a Quotation');
    }

    proposal.status = 'Converted';
    proposal.convertedToQuotationId = quotationData.quotationId;
    proposal.convertedAt = new Date();
    await proposal.save();

    return proposal;
  }

  async getStats(): Promise<any> {
    const totalProposals = await this.proposalModel.countDocuments().exec();
    const draftProposals = await this.proposalModel.countDocuments({ status: 'Draft' }).exec();
    const sentProposals = await this.proposalModel.countDocuments({ status: 'Sent' }).exec();
    const convertedProposals = await this.proposalModel.countDocuments({ status: 'Converted' }).exec();

    return {
      totalProposals,
      draftProposals,
      sentProposals,
      convertedProposals,
    };
  }

  private async generateProposalNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.proposalModel.countDocuments({
      proposalNumber: new RegExp(`^PROP-${year}`),
    }).exec();
    
    return `PROP-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  private buildQuery(filters?: any): any {
    const query: any = {};

    if (filters?.customerId) {
      query.customerId = filters.customerId;
    }

    if (filters?.status) {
      query.status = filters.status;
    }

    if (filters?.estimateId) {
      query.estimateId = filters.estimateId;
    }

    if (filters?.search) {
      query.$or = [
        { proposalNumber: { $regex: filters.search, $options: 'i' } },
        { customerName: { $regex: filters.search, $options: 'i' } },
      ];
    }

    return query;
  }
}
