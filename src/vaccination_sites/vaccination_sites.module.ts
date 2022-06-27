import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VaccinationSitesController } from './controllers/vaccination_sites/vaccination_sites.controller';
import { VaccinationSitesService } from './services/vaccination_sites/vaccination_sites.service';
import { VaccinationSite } from 'src/typeorm/entities/vaccination_sites.entity';
import { Ward } from 'src/typeorm/entities/ward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VaccinationSite, Ward])],
  controllers: [VaccinationSitesController],
  providers: [VaccinationSitesService],
})
export class VaccinationSitesModule {}
