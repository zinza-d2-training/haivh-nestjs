import { RegisterUserDto } from './../../dto/register-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { ComparePassword, EnCodePassword } from 'src/auth/bcrypt';
import { UserLogin } from 'src/auth/types/user-login.inteface';
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
      const match = ComparePassword(password, user.password);
      if (match) {
        return user;
      }
    }
    return null;
  }

  async login(user: UserLogin) {
    const payload = { email: user.email, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const password = EnCodePassword(registerUserDto.password);
    return this.userRepository.save({ ...registerUserDto, password });
  }

  logout() {
    return {
      status: '200',
      message: 'Logout successful',
    };
  }
}
