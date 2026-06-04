import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProposalService } from './proposal.service';

@ApiTags('proposals')
@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new proposal from estimate' })
  @ApiResponse({ status: 201, description: 'Proposal created successfully' })
  createFromEstimate(@Body() proposalData: any) {
    return this.proposalService.createFromEstimate(proposalData.estimateId, proposalData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all proposals with pagination' })
  @ApiResponse({ status: 200, description: 'Proposals retrieved successfully' })
  findAll(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('customerId') customerId?: string,
    @Query('status') status?: string,
    @Query('estimateId') estimateId?: string,
    @Query('search') search?: string,
  ) {
    const filters = { customerId, status, estimateId, search };
    return this.proposalService.findAll(
      parseInt(page) || 1,
      parseInt(pageSize) || 10,
      filters,
    );
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get proposal statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  getStats() {
    return this.proposalService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get proposal by ID' })
  @ApiResponse({ status: 200, description: 'Proposal retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.proposalService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update proposal' })
  @ApiResponse({ status: 200, description: 'Proposal updated successfully' })
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.proposalService.update(id, updateData);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update proposal status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.proposalService.updateStatus(id, status);
  }

  @Patch(':id/convert-to-quotation')
  @ApiOperation({ summary: 'Convert proposal to quotation' })
  @ApiResponse({ status: 200, description: 'Converted successfully' })
  convertToQuotation(@Param('id') id: string, @Body() quotationData: any) {
    return this.proposalService.convertToQuotation(id, quotationData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete proposal' })
  @ApiResponse({ status: 200, description: 'Proposal deleted successfully' })
  remove(@Param('id') id: string) {
    return this.proposalService.remove(id);
  }
}
