import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/typeorm/entities/group.entity';
import { GroupController } from './controllers/group/group.controller';
import { GroupService } from './services/group/group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
