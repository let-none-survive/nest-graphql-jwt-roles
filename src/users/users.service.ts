import { AuthHelper } from 'src/auth/auth.helper';
import { AuthRegisterInput } from 'src/auth/dto';
import { UserArgs } from './dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  findAll(userArgs: UserArgs): Promise<User[]> {
    return this.userRepository.find({
      take: userArgs.take,
      skip: userArgs.skip,
    });
  }

  async createUser(input: AuthRegisterInput): Promise<User> {
    return this.userRepository.save({
      ...input,
      password: await AuthHelper.hash(input.password),
    });
  }
}
