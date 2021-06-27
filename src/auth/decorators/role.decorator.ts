import { SetMetadata } from '@nestjs/common';
import { UserRolesEnum } from 'src/users/enums/user-roles.enum';

export const Role = (role: UserRolesEnum) => SetMetadata('role', role);
