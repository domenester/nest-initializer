import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RoleEntity } from '../entities'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  hasRole(userRoles: Array<RoleEntity>, roles: string []): boolean {
    return userRoles.some((role) => roles.includes(role.name))
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) { return true }
    const { user } = context.switchToHttp().getRequest()
    return this.hasRole(user.roles, roles)
  }
}