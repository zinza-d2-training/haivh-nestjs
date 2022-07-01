import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class VerifyUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const bodyUserId = request.body.user_id;
    const user = request.user;
    if (bodyUserId === user.id) {
      return true;
    } else {
      return false;
    }
  }
}
