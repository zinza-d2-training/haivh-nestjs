import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from 'src/typeorm/entities/district.entity';
import { Province } from 'src/typeorm/entities/province.entity';
import { VaccinationSite } from 'src/typeorm/entities/vaccination_sites.entity';
import { Ward } from 'src/typeorm/entities/ward.entity';
import { UpdateVaccinationSiteDto } from 'src/vaccination_sites/dto/update-site.dto';
import { VaccinationSiteDto } from 'src/vaccination_sites/dto/vaccination-site.dto';
import { Repository } from 'typeorm';

@Injectable()
export class VaccinationSitesService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
    @InjectRepository(VaccinationSite)
    private readonly vaccinationSiteRepository: Repository<VaccinationSite>,
  ) {}

  async getAll() {
    return await this.vaccinationSiteRepository.find({
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
  }

  async getById(id: number) {
    const site = await this.vaccinationSiteRepository.find({
      where: { id },
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
    if (site) {
      return site;
    } else {
      return new UnauthorizedException('Site is not exist', '404');
    }
  }

  async create(createVaccinationSiteDto: VaccinationSiteDto) {
    const newVaccinationSite = this.vaccinationSiteRepository.create(
      createVaccinationSiteDto,
    );
    return await this.vaccinationSiteRepository.save(newVaccinationSite);
  }

  async update(id: number, data: UpdateVaccinationSiteDto) {
    await this.vaccinationSiteRepository.update({ id }, data);
    return await this.vaccinationSiteRepository.find({ id });
  }
}
