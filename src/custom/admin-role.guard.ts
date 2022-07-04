import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleID } from './role.enum';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user['role'] === RoleID.Admin) {
      return true;
    } else {
      return false;
    }
  }
}
