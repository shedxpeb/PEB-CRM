import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';
import { Proposal, ProposalSchema } from './schemas/proposal.schema';
import { EstimateModule } from '../estimate/estimate.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Proposal.name, schema: ProposalSchema }]),
    EstimateModule,
  ],
  controllers: [ProposalController],
  providers: [ProposalService],
  exports: [ProposalService],
})
export class ProposalModule {}
