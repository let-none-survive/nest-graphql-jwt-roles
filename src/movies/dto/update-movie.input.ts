import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateMovieInput {
  @Field()
  title?: string;

  @Field()
  description?: string;
}
