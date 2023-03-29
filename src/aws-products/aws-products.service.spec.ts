import { Test, TestingModule } from '@nestjs/testing';
import { AwsProductsService } from './aws-products.service';

describe('AwsProductsService', () => {
  let service: AwsProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsProductsService],
    }).compile();

    service = module.get<AwsProductsService>(AwsProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
