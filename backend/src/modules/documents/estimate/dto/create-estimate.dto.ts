import { ApiProperty } from '@nestjs/swagger';

export class CreateEstimateDto {
  @ApiProperty()
  customerId: string;

  @ApiProperty({ required: false })
  leadId?: string;

  @ApiProperty({ required: false })
  projectId?: string;

  @ApiProperty()
  includePricing: boolean;

  @ApiProperty({ type: [Object] })
  materialSelections: any[];

  @ApiProperty({ type: Object })
  scopeConfiguration: any;

  @ApiProperty({ required: false, type: Object })
  technicalSpecifications?: any;

  @ApiProperty({ required: false, type: [String] })
  inclusions?: string[];

  @ApiProperty({ required: false, type: [String] })
  exclusions?: string[];

  @ApiProperty({ required: false })
  notes?: string;

  @ApiProperty({ required: false })
  internalNotes?: string;

  @ApiProperty({ required: false })
  templateId?: string;
}
