import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEmailDto } from 'src/forgot_pass/dto/user-email.dto';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class ForgotPassService {
  constructor(
    private mailerService: MailerService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async forgotPassword(userEmail: UserEmailDto) {
    const newPassword = Math.random().toString(36).slice(-8);
    const { email } = userEmail;
    const user = await this.userRepository.findOne({ email });
    if (user) {
      await this.mailerService.sendMail({
        to: 'vhh291200@gmail.com',
        from: process.env.MAIL_AUTH_EMAIL,
        subject: 'Your new password',
        html: newPassword,
      });
    } else {
      return new UnauthorizedException('Email does not exist', '404');
    }
  }
}
