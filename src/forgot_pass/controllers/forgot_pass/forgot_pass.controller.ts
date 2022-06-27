import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserEmailDto } from 'src/forgot_pass/dto/user-email.dto';
import { ForgotPassService } from 'src/forgot_pass/services/forgot_pass/forgot_pass.service';

@Controller('/forgot-password')
export class ForgotPassController {
  constructor(private forgotPasswordService: ForgotPassService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async forgotPassword(@Body() userEmailDto: UserEmailDto) {
    return await this.forgotPasswordService.forgotPassword(userEmailDto);
  }

  @Get('/reset')
  async resetPassword(@Query('token') token: string) {
    return this.forgotPasswordService.resetPassword(token);
  }
}
