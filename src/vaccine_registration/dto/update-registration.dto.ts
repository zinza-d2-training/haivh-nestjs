import { PartialType } from '@nestjs/mapped-types';
import { VaccineRegistrationDto } from './vaccine-registration.dto';
export class UpdateVaccinationRegistrationDto extends PartialType(
  VaccineRegistrationDto,
) {}
