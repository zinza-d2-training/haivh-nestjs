import { Controller, Get } from '@nestjs/common';
import { GroupService } from 'src/group/services/group/group.service';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}
  @Get()
  getAll() {
    return this.groupService.getAll();
  }
}
