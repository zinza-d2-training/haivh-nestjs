import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command, _cli } from '@squareboat/nest-console';
import { District } from 'src/typeorm/entities/district.entity';
import { Province } from 'src/typeorm/entities/province.entity';
import { Ward } from 'src/typeorm/entities/ward.entity';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';

@Injectable()
export class AdministrativeUnitService {
  constructor(
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
  ) {}
  @Command('import', {
    desc: 'import data from excel to mysql server',
    args: { name: { req: false } },
  })
  async importFile() {
    const provinces = [];
    const districts = [];
    const wards = [];
    _cli.info(`import file`);
    const dataUnitAdministrative = XLSX.readFile(
      'src/utils/excels/Danh sách cấp tỉnh kèm theo quận huyện, phường xã ___13_06_2022.xls',
    ).Sheets;
    const unitAdministratives = XLSX.utils.sheet_to_json(
      dataUnitAdministrative['Sheet1'],
    );
    for (const province of unitAdministratives) {
      const isExistListProvince: boolean = provinces.some(
        (elementProvince) => elementProvince.name == province['Tỉnh Thành Phố'],
      );
      if (!isExistListProvince) {
        provinces.push({ name: province['Tỉnh Thành Phố'] });
      }
    }
    await this.provinceRepository.insert(provinces);

    const listProvinceFromDB = await this.provinceRepository.find();
    for (const unitAdministrative of unitAdministratives) {
      for (const provinceFromDB of listProvinceFromDB) {
        if (provinceFromDB.name === unitAdministrative['Tỉnh Thành Phố']) {
          const isExistedDistrict = districts.some(
            (district) => district.name === unitAdministrative['Quận Huyện'],
          );
          if (!isExistedDistrict) {
            districts.push({
              name: unitAdministrative['Quận Huyện'],
              province_id: provinceFromDB.id,
            });
          }
        }
      }
    }
    await this.districtRepository.insert(districts);

    const listDistrictFromDB = await this.districtRepository.find();
    for (const unitAdministrative of unitAdministratives) {
      for (const district of listDistrictFromDB) {
        if (district.name === unitAdministrative['Quận Huyện']) {
          wards.push({
            name: unitAdministrative['Phường Xã'] || 'Undefined data',
            district_id: district.id,
          });
        }
      }
    }
    await this.wardRepository.insert(wards);
  }
}
