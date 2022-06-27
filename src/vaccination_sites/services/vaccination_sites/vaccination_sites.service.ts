import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccinationSite } from 'src/typeorm/entities/vaccination_sites.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VaccinationSitesService {
  constructor(
    @InjectRepository(VaccinationSite)
    private readonly vaccinationSiteRepository: Repository<VaccinationSite>,
  ) {}

  async getAll() {
    return await this.vaccinationSiteRepository.find();
  }

  async getById(id: number) {
    const site = await this.vaccinationSiteRepository.findOne({ id });
    if (site) {
      return site;
    } else {
      return new UnauthorizedException('Site is not exist', '404');
    }
  }
}
