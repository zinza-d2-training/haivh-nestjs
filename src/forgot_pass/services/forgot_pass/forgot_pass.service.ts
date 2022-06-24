import { encodePassword } from 'src/auth/bcrypt';
import { JwtService } from '@nestjs/jwt';
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
    private jwtService: JwtService,
    private mailerService: MailerService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async forgotPassword(userEmail: UserEmailDto) {
    const { email } = userEmail;
    const user = await this.userRepository.findOne({ email });
    if (user) {
      const payload = { email: user.email, id: user.id };
      const token = this.jwtService.sign(payload);
      this.userRepository.update(user, {
        ...user,
        reset_pass_token: token,
      });
      const link = `http://localhost:5000/api/forgot-pass/reset?token=${token}`;
      await this.mailerService.sendMail({
        to: 'vhh291200@gmail.com',
        from: process.env.MAIL_AUTH_EMAIL,
        subject: 'Password Reset',
        html: `Follow <a href=${link}>here</a> to reset your password`,
      });
      return {
        message: 'Please check your mail',
      };
    } else {
      return new UnauthorizedException('Email does not exist', '404');
    }
  }

  async resetPassword(token: string) {
    const newPassword = Math.random().toString(36).slice(-8);
    const userHaveToken = await this.userRepository.findOne({
      where: { reset_pass_token: token },
    });
    if (userHaveToken) {
      try {
        this.jwtService.verify(token);
        const hashNewPassword = encodePassword(newPassword);
        await this.userRepository.update(userHaveToken, {
          ...userHaveToken,
          password: hashNewPassword,
        });
      } catch (error) {
        return error;
      }
    } else {
      return new UnauthorizedException('Token is not exist', '404');
    }
  }
}
