import { Test, TestingModule } from '@nestjs/testing';
import { SubdivisionsService } from './subdivisions.service';

describe('SubdivisionsService', () => {
  let service: SubdivisionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubdivisionsService],
    }).compile();

    service = module.get<SubdivisionsService>(SubdivisionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
