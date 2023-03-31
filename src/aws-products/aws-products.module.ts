import { Module } from '@nestjs/common';
import {MomentModule} from "@ccmos/nestjs-moment";

import { AwsProductsController } from './aws-products.controller';
import {ProductsSchema} from "./interfaces/products.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {AwsProductsService} from "./aws-products.service";

@Module({
  imports: [MongooseModule.forFeature([{name: 'Products', schema: ProductsSchema}]),
    MomentModule.forRoot({
      tz: 'Brasil/Sao-Paulo',})],
  controllers: [AwsProductsController],
  providers: [AwsProductsService]
})
export class AwsProductsModule {}
