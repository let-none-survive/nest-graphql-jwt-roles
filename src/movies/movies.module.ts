import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { MovieResolver } from 'src/movies/movie.resolver';
import { MoviesService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MoviesService, MovieResolver],
  exports: [MoviesService],
})
export class MoviesModule {}
