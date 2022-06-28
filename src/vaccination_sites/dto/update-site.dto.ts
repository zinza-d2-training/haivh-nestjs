import { VaccinationSiteDto } from './vaccination-site.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateVaccinationSiteDto extends PartialType(VaccinationSiteDto) {}
