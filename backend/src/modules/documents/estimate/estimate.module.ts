import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstimateController } from './estimate.controller';
import { EstimateService } from './estimate.service';
import { Estimate, EstimateSchema } from './schemas/estimate.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Estimate.name, schema: EstimateSchema }])],
  controllers: [EstimateController],
  providers: [EstimateService],
  exports: [EstimateService],
})
export class EstimateModule {}
