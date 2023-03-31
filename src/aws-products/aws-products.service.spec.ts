import { Test, TestingModule } from '@nestjs/testing';
import { AwsProductsService } from './aws-products.service';
import { getModelToken } from '@nestjs/mongoose';

describe('AwsProductsService', () => {
  let service: AwsProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AwsProductsService,
        {
          provide: getModelToken('Products'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AwsProductsService>(AwsProductsService);
  });

  describe('scrape', () => {
    it('should scrape data from all urls and save to database', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      const productsModelSpy = jest.spyOn(service, 'scrape');
      await service.scrape();
      expect(consoleLogSpy).toHaveBeenCalled();
      expect(productsModelSpy).toHaveBeenCalled();
    });
  });

  describe('scrape', () => {
    it('should scrape data from all urls and save to database', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      const productModelSaveSpy = jest.spyOn(service.productsModel.prototype, 'save');
      await service.scrape();
      expect(consoleLogSpy).toHaveBeenCalled();
      expect(productModelSaveSpy).toHaveBeenCalled();
    });
  });

});

