import { District } from 'src/typeorm/entities/district.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from 'src/typeorm/entities/province.entity';
import { Repository } from 'typeorm';
import { Ward } from 'src/typeorm/entities/ward.entity';

@Injectable()
export class SubdivisionsService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
  ) {}

  async getSubdivisionInfo() {
    const wardFromDB = await this.wardRepository.find();
    const districtFromDB = await this.districtRepository.find();
    const provinceFromDB = await this.provinceRepository.find();

    const districts = districtFromDB.map((district) => {
      district.wards = [];
      wardFromDB.map((ward) => {
        if (district.id === ward.district_id) {
          district.wards.push(ward);
        }
      });
      return district;
    });

    const provinces = provinceFromDB.map((province) => {
      province.districts = [];
      districts.map((district) => {
        if (province.id === district.province_id) {
          province.districts.push(district);
        }
      });
      return province;
    });

    return provinces;
  }
}
