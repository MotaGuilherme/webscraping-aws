import { Test, TestingModule } from '@nestjs/testing';
import { AwsProductsController } from './aws-products.controller';

describe('AwsProductsController', () => {
  let controller: AwsProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsProductsController],
    }).compile();

    controller = module.get<AwsProductsController>(AwsProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
