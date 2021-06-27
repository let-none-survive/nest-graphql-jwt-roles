import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { UserRolesEnum } from 'src/users/enums/user-roles.enum';

@InputType()
export class AuthRegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  @IsEnum(UserRolesEnum)
  role: UserRolesEnum;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
