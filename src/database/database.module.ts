import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', //process.env.POSTGRES_HOST,
      port: 5432, //+process.env.POSTGRES_PORT,
      username: 'postgres', //process.env.POSTGRES_USER,
      password: 'admin', //process.env.POSTGRES_PASSWORD,
      database: 'nest_test', //process.env.POSTGRES_DATABASE,
      entities: [User, Movie],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
