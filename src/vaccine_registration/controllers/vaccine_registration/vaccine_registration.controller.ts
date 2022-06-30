import { UpdateVaccinationRegistrationDto } from './../../dto/update-registration.dto';
import { VaccineRegistrationService } from './../../services/vaccine_registration/vaccine_registration.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VaccineRegistrationDto } from 'src/vaccine_registration/dto/vaccine-registration.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRoleGuard } from 'src/vaccine_registration/user-role.guard';
import { GetUser } from 'src/vaccine_registration/get-user.decorators';
import { RoleGuard } from 'src/vaccination_sites/role.guard';

@Controller('vaccine-registrations')
export class VaccineRegistrationController {
  constructor(private vaccineRegistrationService: VaccineRegistrationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@GetUser('id') id: number, @GetUser('role') role: number) {
    return await this.vaccineRegistrationService.getAll(id, role);
  }

  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createVaccineRegistrationDto: VaccineRegistrationDto) {
    return await this.vaccineRegistrationService.create(
      createVaccineRegistrationDto,
    );
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.vaccineRegistrationService.getById(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVaccineRegistrationDto: UpdateVaccinationRegistrationDto,
  ) {
    return this.vaccineRegistrationService.update(
      id,
      updateVaccineRegistrationDto,
    );
  }
}
