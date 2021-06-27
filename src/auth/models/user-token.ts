import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/users.model';

@ObjectType()
export class UserToken {
  @Field()
  token: string;

  @Field()
  user: User;
}
