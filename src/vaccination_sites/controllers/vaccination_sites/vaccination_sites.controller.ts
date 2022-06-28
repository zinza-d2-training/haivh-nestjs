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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateVaccinationSiteDto } from 'src/vaccination_sites/dto/update-site.dto';
import { VaccinationSiteDto } from 'src/vaccination_sites/dto/vaccination-site.dto';
import { RoleGuard } from 'src/vaccination_sites/role.guard';
import { VaccinationSitesService } from 'src/vaccination_sites/services/vaccination_sites/vaccination_sites.service';

@Controller('vaccination-sites')
export class VaccinationSitesController {
  constructor(private vaccinationSitesService: VaccinationSitesService) {}

  @Get()
  async getAll() {
    return await this.vaccinationSitesService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.vaccinationSitesService.getById(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/creates')
  @UsePipes(ValidationPipe)
  async create(@Body() createVaccinationSiteDto: VaccinationSiteDto) {
    return await this.vaccinationSitesService.create(createVaccinationSiteDto);
  }

  @Patch('/updates/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVaccinationSite: UpdateVaccinationSiteDto,
  ) {
    return this.vaccinationSitesService.update(id, updateVaccinationSite);
  }
}
