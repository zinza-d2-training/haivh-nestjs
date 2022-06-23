import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserEmailDto } from 'src/forgot_pass/dto/user-email.dto';
import { ForgotPassService } from 'src/forgot_pass/services/forgot_pass/forgot_pass.service';

@Controller('forgot-pass')
export class ForgotPassController {
  constructor(private forgotPasswordService: ForgotPassService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async forgotPassword(@Body() userEmailDto: UserEmailDto) {
    return await this.forgotPasswordService.forgotPassword(userEmailDto);
  }
}
