import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuotationService } from './quotation.service';

@ApiTags('quotations')
@Controller('quotations')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quotation from proposal' })
  @ApiResponse({ status: 201, description: 'Quotation created successfully' })
  createFromProposal(@Body() quotationData: any) {
    return this.quotationService.createFromProposal(quotationData.proposalId, quotationData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quotations with pagination' })
  @ApiResponse({ status: 200, description: 'Quotations retrieved successfully' })
  findAll(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('customerId') customerId?: string,
    @Query('status') status?: string,
    @Query('proposalId') proposalId?: string,
    @Query('search') search?: string,
  ) {
    const filters = { customerId, status, proposalId, search };
    return this.quotationService.findAll(
      parseInt(page) || 1,
      parseInt(pageSize) || 10,
      filters,
    );
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get quotation statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  getStats() {
    return this.quotationService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quotation by ID' })
  @ApiResponse({ status: 200, description: 'Quotation retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.quotationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update quotation' })
  @ApiResponse({ status: 200, description: 'Quotation updated successfully' })
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.quotationService.update(id, updateData);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update quotation status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.quotationService.updateStatus(id, status);
  }

  @Patch(':id/convert-to-project')
  @ApiOperation({ summary: 'Convert quotation to project' })
  @ApiResponse({ status: 200, description: 'Converted successfully' })
  convertToProject(@Param('id') id: string, @Body() projectData: any) {
    return this.quotationService.convertToProject(id, projectData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete quotation' })
  @ApiResponse({ status: 200, description: 'Quotation deleted successfully' })
  remove(@Param('id') id: string) {
    return this.quotationService.remove(id);
  }
}
