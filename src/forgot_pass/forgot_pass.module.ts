import { Module } from '@nestjs/common';
import { ForgotPassController } from './controllers/forgot_pass/forgot_pass.controller';
import { ForgotPassService } from './services/forgot_pass/forgot_pass.service';

@Module({
  controllers: [ForgotPassController],
  providers: [ForgotPassService],
})
export class ForgotPassModule {}
