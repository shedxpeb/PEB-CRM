import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EstimateService } from './estimate.service';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { UpdateEstimateDto } from './dto/update-estimate.dto';

@ApiTags('estimates')
@Controller('estimates')
export class EstimateController {
  constructor(private readonly estimateService: EstimateService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new estimate' })
  @ApiResponse({ status: 201, description: 'Estimate created successfully' })
  create(@Body() createEstimateDto: CreateEstimateDto) {
    return this.estimateService.create(createEstimateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all estimates with pagination' })
  @ApiResponse({ status: 200, description: 'Estimates retrieved successfully' })
  findAll(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('customerId') customerId?: string,
    @Query('status') status?: string,
    @Query('leadId') leadId?: string,
    @Query('projectId') projectId?: string,
    @Query('search') search?: string,
  ) {
    const filters = { customerId, status, leadId, projectId, search };
    return this.estimateService.findAll(
      parseInt(page) || 1,
      parseInt(pageSize) || 10,
      filters,
    );
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get estimate statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  getStats() {
    return this.estimateService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get estimate by ID' })
  @ApiResponse({ status: 200, description: 'Estimate retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.estimateService.findOne(id);
  }

  @Get('number/:estimateNumber')
  @ApiOperation({ summary: 'Get estimate by estimate number' })
  @ApiResponse({ status: 200, description: 'Estimate retrieved successfully' })
  findByNumber(@Param('estimateNumber') estimateNumber: string) {
    return this.estimateService.findByNumber(estimateNumber);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update estimate' })
  @ApiResponse({ status: 200, description: 'Estimate updated successfully' })
  update(@Param('id') id: string, @Body() updateEstimateDto: UpdateEstimateDto) {
    return this.estimateService.update(id, updateEstimateDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update estimate status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.estimateService.updateStatus(id, status);
  }

  @Patch(':id/convert-to-proposal')
  @ApiOperation({ summary: 'Convert estimate to proposal' })
  @ApiResponse({ status: 200, description: 'Converted successfully' })
  convertToProposal(@Param('id') id: string, @Body() proposalData: any) {
    return this.estimateService.convertToProposal(id, proposalData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete estimate' })
  @ApiResponse({ status: 200, description: 'Estimate deleted successfully' })
  remove(@Param('id') id: string) {
    return this.estimateService.remove(id);
  }
}
