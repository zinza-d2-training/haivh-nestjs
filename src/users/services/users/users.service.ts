import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    if (role === RoleID.Admin) {
      return await this.userRepository.findOne({
        where: { id },
        relations: ['ward', 'ward.district', 'ward.district.province'],
      });
    } else {
      if (id === user_id) {
        return await this.userRepository.findOne({
          where: { id },
          relations: ['ward', 'ward.district', 'ward.district.province'],
        });
      } else {
        throw new UnauthorizedException('You not have permission', '403');
      }
    }
  }

  async update(
    id: number,
    user_id: number,
    role: number,
    updateUserDto: UpdateUserDto,
  ) {
    if (role === RoleID.Admin) {
      await this.userRepository.update({ id }, updateUserDto);
      return await this.userRepository.find({
        where: { id },
        relations: ['ward', 'ward.district', 'ward.district.province'],
      });
    } else {
      if (id === user_id) {
        await this.userRepository.update({ id }, updateUserDto);
        return await this.userRepository.find({
          where: { id },
          relations: ['ward', 'ward.district', 'ward.district.province'],
        });
      } else {
        throw new UnauthorizedException('You not have permission', '403');
      }
    }
  }
}
