import { Module } from '@nestjs/common';
import { AwsProductsController } from './aws-products.controller';

@Module({
  controllers: [AwsProductsController]
})
export class AwsProductsModule {}
