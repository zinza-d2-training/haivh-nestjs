import { VaccineCertificate } from './vaccination-certificate.entity';
import { District } from './district.entity';
import { Group } from './group.entity';
import { Province } from './province.entity';
import { Role } from './role.entity';
import { User } from './user.entity';
import { VaccineRegistration } from './vaccine-registration.entity';
import { Ward } from './ward.entity';
import { Vaccine } from './vaccine.entity';
import { InjectionSite } from './injection-site.entity';

const entities = [
  User,
  Province,
  District,
  Ward,
  Role,
  Group,
  VaccineRegistration,
  VaccineCertificate,
  Vaccine,
  InjectionSite,
];

export default entities;
