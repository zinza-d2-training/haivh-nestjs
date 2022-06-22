import { RegisterUserDto } from './../../dto/register-user.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { comparePassword, encodePassword } from 'src/auth/bcrypt';
import { UserLogin } from 'src/auth/types/user-login.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      const match = comparePassword(password, user.password);
      if (match) {
        return user;
      }
    }
    return null;
  }

  async login(user: UserLogin) {
    const payload = { email: user.email, id: user.id };
    const access_token = this.jwtService.sign(payload);
    const { password, ...userInfo } = user;
    return {
      user: {
        ...userInfo,
        access_token,
      },
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const { email } = registerUserDto;
    const identityCard = this.userRepository.findOne(email);
    if (!identityCard) {
      const password = encodePassword(registerUserDto.password);
      return await this.userRepository.save({ ...registerUserDto, password });
    } else {
      throw new HttpException('Số CMND/CCCD đã tồn tại', 442);
    }
  }

  logout() {
    return {
      status: '200',
      message: 'Logout successful',
    };
  }

  async getUserInfoById(id: number) {
    return await this.userRepository.findOne({ id });
  }
}
