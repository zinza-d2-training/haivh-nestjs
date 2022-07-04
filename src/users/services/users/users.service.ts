import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/auth/bcrypt';
import { RoleID } from 'src/custom/role.enum';
import { User } from 'src/typeorm/entities/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll() {
    return await this.userRepository.find({
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
  }

  async getById(id: number, user_id: number, role: number) {
    if (role === RoleID.Admin || id === user_id) {
      return await this.userRepository.findOne({
        where: { id },
        relations: ['ward', 'ward.district', 'ward.district.province'],
      });
    } else {
      throw new UnauthorizedException('You not have permission', '403');
    }
  }

  async update(
    id: number,
    user_id: number,
    role: number,
    updateUserDto: UpdateUserDto,
  ) {
    if (role === RoleID.Admin || id === user_id) {
      const newPassword = updateUserDto.password;
      if (newPassword) {
        const password = encodePassword(updateUserDto.password);
        const newInfo = { ...updateUserDto, password };
        await this.userRepository.update({ id }, newInfo);
        return await this.userRepository.find({
          where: { id },
          relations: ['ward', 'ward.district', 'ward.district.province'],
        });
      } else {
        await this.userRepository.update({ id }, updateUserDto);
        return await this.userRepository.find({
          where: { id },
          relations: ['ward', 'ward.district', 'ward.district.province'],
        });
      }
    } else {
      throw new UnauthorizedException('You not have permission', '403');
    }
  }
}
