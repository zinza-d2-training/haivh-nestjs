import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from 'src/typeorm/entities/district.entity';
import { Province } from 'src/typeorm/entities/province.entity';
import { Ward } from 'src/typeorm/entities/ward.entity';
import { SubdivisionsController } from './controllers/subdivisions/subdivisions.controller';
import { SubdivisionsService } from './services/subdivisions/subdivisions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [SubdivisionsController],
  providers: [SubdivisionsService],
})
export class SubdivisionsModule {}
