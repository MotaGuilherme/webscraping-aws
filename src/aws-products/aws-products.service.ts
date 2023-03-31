import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import puppeteer from "puppeteer";
import * as moment from 'moment';
import * as ejs from 'ejs';
import * as path from "path";

import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./interfaces/products.interface";
import { Model } from "mongoose";

@Injectable()
export class AwsProductsService {

    constructor(
        @InjectModel('Products') public readonly productsModel: Model<Product>
    ) {
    }
    public renderTable(products: Product[]): string {
        const data = { products };
        const templatePath = path.resolve(  'src', 'views', 'index.ejs');
        return ejs.renderFile(templatePath, data);
    }



    private readonly urls = [
         'https://www.amazon.com.br/dp/B0043E2UW0/',
         'https://www.amazon.com.br/dp/6554480471',
        'https://www.amazon.com.br/dp/B07QV2M1L8',
        'https://www.amazon.com.br/dp/B086Y75MF9',
        'https://www.amazon.com.br/dp/B01MS6MO77',
        'https://www.amazon.com.br/dp/B07FPT3MSD',
        'https://www.amazon.com.br/dp/B076BCVVV4/',
        'https://www.amazon.com.br/dp/B09FTMSK9Y',
        'https://www.amazon.com.br/dp/B00075U5IA',
        'https://www.amazon.com.br/dp/B084DWCZY6'
    ];

    // run every hour
    @Cron('0 0 * * * *')

    async scrape() {

        // launch browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();


       for (const url of this.urls) {

            // starting loop of url and go to urls
            console.log(`Scraping data from ${url}`);
            const start = moment();
            const response = await page.goto(url, {waitUntil: 'networkidle2'});


            // get title, price and description
            const title = await page.$eval('#productTitle', el => el.textContent.trim());
            const price = await page.$eval('.a-offscreen', el => el.textContent.trim());

           let description = '';
           try {
                 description = await page.$eval('#productDescription p', el => el ? el.textContent?.trim() || '' : '');
            } catch (e) {
                console.log("doesnt exist")

            }

           let rating = '';
           try {
               rating = await page.$eval('.reviewCountTextLinkedHistogram', el => el ? el.textContent?.trim() || '' : '');
           } catch (e) {
               console.log('Rating not found');
           }

            //get comments
            const comments = await page.$$eval('#cm-cr-dp-review-list [data-hook="review"]', els => {
                return els.map(el => {
                    const author = el.querySelector('.a-profile-name')?.textContent.trim() || '';
                    const date = el.querySelector('.review-date')?.textContent.trim() || '';
                    const comment = el.querySelector('.review-text')?.textContent.trim() || '';
                    return {author, date, comment};
                });
            });


            const end = moment();
            const duration = moment.duration(end.diff(start)).asSeconds();
            const size = await page.content().then(c => c.length);
            const status = response.status();

            const data = {
                url,
                 title,
                price,
                description,
                rating,
                comments,
                scrapedAt: moment().toLocaleString(),
                duration,
                size,
                status,

            };

            console.log('Data:', data);

            // insert into database
            const product = new this.productsModel({
                url,
                title,
                price,
                description,
                rating,
               comments,
                scrapedAt: moment().toLocaleString(),
                duration,
                size,
                status
            });
            await product.save();

        }

        const products = await this.productsModel.find().exec();
        const table = this.renderTable(products);
        console.log(table);

        await browser.close();


    };

}


