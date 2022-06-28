import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

export enum RoleID {
  Admin = 1,
  User = 2,
}

@Injectable()
export class RoleGuard implements CanActivate {
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
