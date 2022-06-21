import { Controller, Get } from '@nestjs/common';
import { SubdivisionsService } from 'src/subdivisions/services/subdivisions/subdivisions.service';

@Controller('subdivisions')
export class SubdivisionsController {
  constructor(private subdivisionService: SubdivisionsService) {}

  @Get()
  async getSubdivisionInfo() {
    return await this.subdivisionService.getSubdivisionInfo();
  }
}
