import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { User } from 'src/users/models/users.model';
import { UsersService } from './users.service';
import { UserArgs } from './dto';

const pubSub = new PubSub();

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User)
  async user(@Args('id') id: number) {
    return this.userService.findOne(id).catch(() => {
      throw new NotFoundException();
    });
  }

  @Query(() => [User])
  users(@Args() userArgs: UserArgs) {
    return this.userService.findAll(userArgs);
  }

  @Subscription(() => User)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}
