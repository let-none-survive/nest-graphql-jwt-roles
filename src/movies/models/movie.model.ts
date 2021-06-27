import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Movie {
  @Field(type => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;
}
