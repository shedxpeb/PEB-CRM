import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotationController } from './quotation.controller';
import { QuotationService } from './quotation.service';
import { Quotation, QuotationSchema } from './schemas/quotation.schema';
import { ProposalModule } from '../proposal/proposal.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quotation.name, schema: QuotationSchema }]),
    ProposalModule,
  ],
  controllers: [QuotationController],
  providers: [QuotationService],
  exports: [QuotationService],
})
export class QuotationModule {}
