import { Module } from '@nestjs/common';
import { EstimateModule } from './estimate/estimate.module';
import { ProposalModule } from './proposal/proposal.module';
import { QuotationModule } from './quotation/quotation.module';

@Module({
  imports: [
    EstimateModule,
    ProposalModule,
    QuotationModule,
  ],
  exports: [
    EstimateModule,
    ProposalModule,
    QuotationModule,
  ],
})
export class DocumentsModule {}
