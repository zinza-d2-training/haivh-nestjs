import { Test, TestingModule } from '@nestjs/testing';
import { ForgotPassController } from './forgot_pass.controller';

describe('ForgotPassController', () => {
  let controller: ForgotPassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForgotPassController],
    }).compile();

    controller = module.get<ForgotPassController>(ForgotPassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
