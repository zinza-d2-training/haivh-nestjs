import { UpdateVaccinationRegistrationDto } from './../../dto/update-registration.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccineRegistration } from 'src/typeorm/entities/vaccine_registrations';
import { VaccineRegistrationDto } from 'src/vaccine_registration/dto/vaccine-registration.dto';
import { Repository } from 'typeorm';
import { RoleID } from 'src/custom/role.enum';

@Injectable()
export class VaccineRegistrationService {
  constructor(
    @InjectRepository(VaccineRegistration)
    private readonly vaccineRegistrationRepository: Repository<VaccineRegistration>,
  ) {}

  async getAll(id: number, role: number) {
    if (role === RoleID.Admin) {
      return this.vaccineRegistrationRepository.find();
    } else {
      return await this.vaccineRegistrationRepository.find({
        where: { user_id: id },
      });
    }
  }

  async create(createVaccineRegistrationDto: VaccineRegistrationDto) {
    const newVaccineRegistration = this.vaccineRegistrationRepository.create(
      createVaccineRegistrationDto,
    );
    return await this.vaccineRegistrationRepository.save(
      newVaccineRegistration,
    );
  }

  async getById(id: number) {
    return await this.vaccineRegistrationRepository.findOne({ id });
  }

  async update(id: number, data: UpdateVaccinationRegistrationDto) {
    await this.vaccineRegistrationRepository.update({ id }, data);
    return await this.vaccineRegistrationRepository.find({ id });
  }
}
