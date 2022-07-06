import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

class DocumentDto {
  @IsString()
  @IsNotEmpty({ message: 'name cannot be left blank' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'link cannot be left blank' })
  link: string;
}

export class UpdateDocumentDto extends PartialType(DocumentDto) {}
