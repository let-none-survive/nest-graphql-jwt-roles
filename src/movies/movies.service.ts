import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddMovieInput, UpdateMovieInput } from 'src/movies/dto';
import { Movie } from 'src/movies/entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async list(): Promise<{ movies: Movie[]; count: number }> {
    const [movies, count] = await this.movieRepository.findAndCount();

    return { movies, count };
  }

  getOne(id: number): Promise<Movie> {
    return this.movieRepository.findOne({ id });
  }

  async addMovie(input: AddMovieInput): Promise<Movie> {
    return this.movieRepository.save(input);
  }

  async updateMovie(id: number, input: UpdateMovieInput): Promise<Movie> {
    const found = await this.movieRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Movie with id ${id} does not exist`);
    }

    return this.movieRepository
      .update(id, {
        ...found,
        ...input,
      })
      .then(data => data.raw);
  }

  removeMovie(id: number): Promise<boolean> {
    return this.movieRepository
      .delete(id)
      .then(() => true)
      .catch(() => false);
  }
}
