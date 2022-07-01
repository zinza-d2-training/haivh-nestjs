import { RegisterUserDto } from './../../dto/register-user.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { comparePassword, encodePassword } from 'src/auth/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/auth/types/user-role.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
    if (user) {
      const match = comparePassword(password, user.password);
      if (match) {
        return user;
      }
    }
    return null;
  }

  async login(user: UserRole) {
    const payload = { email: user.email, id: user.id, role_id: user.role_id };
    const access_token = this.jwtService.sign(payload);
    const { password, ...userInfo } = user;
    return {
      user: userInfo,
      access_token,
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const { identity_card } = registerUserDto;
    const identityCard = await this.userRepository.findOne({ identity_card });
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
