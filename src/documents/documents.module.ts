import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/typeorm/entities/document.entity';
import { DocumentsController } from './controllers/documents/documents.controller';
import { DocumentsService } from './services/documents/documents.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
