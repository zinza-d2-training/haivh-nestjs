import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminRoleGuard } from 'src/custom/admin-role.guard';
import { GetUser } from 'src/custom/get-user.decorators';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') user_id: number,
    @GetUser('role') role: number,
  ) {
    return this.userService.getById(id, user_id, role);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') user_id: number,
    @GetUser('role') role: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, user_id, role, updateUserDto);
  }
}
