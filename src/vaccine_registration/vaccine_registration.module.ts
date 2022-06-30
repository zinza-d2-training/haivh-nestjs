import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineRegistration } from 'src/typeorm/entities/vaccine_registrations';
import { VaccineRegistrationController } from './controllers/vaccine_registration/vaccine_registration.controller';
import { VaccineRegistrationService } from './services/vaccine_registration/vaccine_registration.service';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineRegistration])],
  controllers: [VaccineRegistrationController],
  providers: [VaccineRegistrationService],
})
export class VaccineRegistrationModule {}
