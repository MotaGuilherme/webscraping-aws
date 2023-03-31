import {Controller, Get, Res} from '@nestjs/common';
import { AwsProductsService } from "./aws-products.service";
import { Response } from 'express';

@Controller('aws-products')
export class AwsProductsController {
    constructor(private readonly awsProductsService: AwsProductsService,) {
    }

    @Get()
    async scrapeProducts(@Res() res: Response){

        const products = await this.awsProductsService.scrape();
        return res.render('index', { products });

    }
}
