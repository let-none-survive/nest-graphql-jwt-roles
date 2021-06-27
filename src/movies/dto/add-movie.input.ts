import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddMovieInput {
  @Field()
  title: string;

  @Field()
  description: string;
}
