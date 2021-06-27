import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Role } from 'src/auth/decorators/role.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AddMovieInput, UpdateMovieInput } from 'src/movies/dto';
import { Movie } from 'src/movies/models/movie.model';
import { Movies } from 'src/movies/models/movies.model';
import { MoviesService } from 'src/movies/movies.service';
import { UserRolesEnum } from 'src/users/enums/user-roles.enum';
import { PubSub } from 'apollo-server-express'

const pubSub = new PubSub()

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => Movie)
  movie(@Args('id') id: number) {
    return this.moviesService.getOne(id);
  }

  @Query(() => Movies)
  moviesList() {
    return this.moviesService.list();
  }

  @Role(UserRolesEnum.moderator)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Movie)
  async addMovie(@Args('input') input: AddMovieInput) {
    const movie = await this.moviesService.addMovie(input);
    pubSub.publish('movieAdded', { movieAdded: movie })
    return movie
  }

  @Role(UserRolesEnum.moderator)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Movie)
  updateMovie(@Args('id') id: number, @Args('input') input: UpdateMovieInput) {
    return this.moviesService.updateMovie(id, input);
  }

  @Role(UserRolesEnum.admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  removeMovie(@Args('id') id: number) {
    return this.moviesService.removeMovie(id);
  }

  @Subscription(() => Movie)
  async movieAdded() {
    return pubSub.asyncIterator('movieAdded')
  }
}
