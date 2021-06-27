import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/movies/models/movie.model';

@ObjectType()
export class Movies {
  @Field(type => [Movie])
  movies: Movie[];

  @Field()
  count: number;
}
