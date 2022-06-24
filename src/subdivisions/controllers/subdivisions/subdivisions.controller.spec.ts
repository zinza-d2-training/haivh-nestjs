import { Test, TestingModule } from '@nestjs/testing';
import { SubdivisionsController } from './subdivisions.controller';

describe('SubdivisionsController', () => {
  let controller: SubdivisionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubdivisionsController],
    }).compile();

    controller = module.get<SubdivisionsController>(SubdivisionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
