import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from 'src/common/scalars/date.scalar';
import { User } from 'src/users/entities/users.entity';
import { UsersResolver } from 'src/users/users.resolver';
import { UsersService } from './users.service';
// import { LoggingPlugin } from 'src/common/plugins/loggin.plugin';
// import { ComplexityPlugin } from 'src/common/plugins/complexity.plugin';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersResolver,
    UsersService,
    DateScalar,
    // LoggingPlugin,
    // ComplexityPlugin,
  ],
  exports: [UsersService],
})
export class UsersModule {}
