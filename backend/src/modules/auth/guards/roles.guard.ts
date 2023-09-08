import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AppRole } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<AppRole>('roles', [
      context.getHandler(),
      context.getClass()
    ]);

    if (!role) return true;

    const { user } = context.switchToHttp().getRequest();

    return role == user.role.name ? true : false;
  }
}
