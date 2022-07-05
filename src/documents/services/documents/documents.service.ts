import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/typeorm/entities/document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async getAll() {
    return await this.documentRepository.find();
  }

  async upload(file: Express.Multer.File, description: string) {
    const { filename } = file;
    await this.documentRepository.save({
      description,
      link: filename,
    });

    return {
      message: 'upload success',
    };
  }

  async getById(id: number) {
    const document = await this.documentRepository.findOne({ id });
    return document.link;
  }
}
