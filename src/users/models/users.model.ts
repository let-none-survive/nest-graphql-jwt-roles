import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserRolesEnum } from 'src/users/enums/user-roles.enum';

registerEnumType(UserRolesEnum, {
  name: 'UserRoles',
});

@ObjectType()
export class User {
  @Field(type => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(type => UserRolesEnum)
  role: UserRolesEnum;

  @Field()
  email: string;
}
