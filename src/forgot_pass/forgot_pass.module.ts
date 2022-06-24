import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { jwtConstants } from 'src/auth/constants';
import { User } from 'src/typeorm/entities/user.entity';

import { ForgotPassController } from './controllers/forgot_pass/forgot_pass.controller';
import { ForgotPassService } from './services/forgot_pass/forgot_pass.service';

dotenv.config();
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: +process.env.MAIL_PORT,
        secure: false,
        auth: {
          user: process.env.MAIL_AUTH_EMAIL,
          pass: process.env.MAIL_AUTH_PASSWORD,
        },
      },
      defaults: {
        from: "'No Reply' <noreply@gmail.com>",
      },
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
      verifyOptions: { ignoreExpiration: false },
    }),
  ],
  controllers: [ForgotPassController],
  providers: [ForgotPassService],
})
export class ForgotPassModule {}
