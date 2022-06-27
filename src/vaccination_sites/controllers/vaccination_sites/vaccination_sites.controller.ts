import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
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
}
