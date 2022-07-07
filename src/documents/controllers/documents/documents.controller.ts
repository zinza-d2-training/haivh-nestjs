import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DocumentsService } from 'src/documents/services/documents/documents.service';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminRoleGuard } from 'src/custom/admin-role.guard';
import { Observable, of } from 'rxjs';
import { UpdateDocumentDto } from 'src/documents/dto/update-document.dto';

const storage = {
  storage: diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('documents')
export class DocumentsController {
  constructor(private documentService: DocumentsService) {}

  @Get()
  async getAll() {
    return await this.documentService.getAll();
  }

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', storage))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
  ) {
    return this.documentService.upload(file, description);
  }

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.update(id, updateDocumentDto);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.getById(id);
  }

  @Get('download/:filename')
  findImage(@Param('filename') filename, @Res() res) {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + filename)));
  }
}
