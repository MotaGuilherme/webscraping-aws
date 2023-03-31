import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsProductsModule } from './aws-products/aws-products.module';
import { MongooseModule } from "@nestjs/mongoose";


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://',
      { useNewUrlParser: true, useUnifiedTopology: true }),
    AwsProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
