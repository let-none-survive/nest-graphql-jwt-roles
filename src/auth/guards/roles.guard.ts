import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRolesEnum } from 'src/users/enums/user-roles.enum';

const rolesHierarchy = [
  UserRolesEnum.admin,
  UserRolesEnum.moderator,
  UserRolesEnum.worker,
];

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<UserRolesEnum>(
      'role',
      context.getHandler(),
    );

    if (!role) {
      return true;
    }

    const user = GqlExecutionContext.create(context).getContext().req.user;
    const userIndex = rolesHierarchy.findIndex(
      r => UserRolesEnum[r] === UserRolesEnum[user.role],
    );

    return (
      user &&
      user.role &&
      rolesHierarchy.findIndex(r => UserRolesEnum[r] === UserRolesEnum[role]) >=
        userIndex
    );
  }
}
