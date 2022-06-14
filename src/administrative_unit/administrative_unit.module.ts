import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from 'src/typeorm/entity/district.entity';
import { Province } from 'src/typeorm/entity/province.entity';
import { Ward } from 'src/typeorm/entity/ward.entity';
import { AdministrativeUnitController } from './controller/administrative_unit/administrative_unit.controller';
import { AdministrativeUnitService } from './service/administrative_unit/administrative_unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [AdministrativeUnitController],
  providers: [
    {
      provide: 'IMPORT_UNIT_ADMINISTRATIVE_SERVER',
      useClass: AdministrativeUnitService,
    },
  ],
})
export class AdministrativeUnitModule {}
