import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthHelper } from 'src/auth/auth.helper';
import { AuthLoginInput, AuthRegisterInput, JwtDto } from 'src/auth/dto';
import { UserToken } from 'src/auth/models/user-token';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(userId: number): Promise<any> {
    return this.usersService.findOne(userId);
  }

  async register(input: AuthRegisterInput): Promise<UserToken> {
    const found = await this.usersService.getByEmail(input.email);

    if (found) {
      throw new BadRequestException(
        `Cannot register with email ${input.email}`,
      );
    }

    const user = await this.usersService.createUser(input);

    return { user, token: this.signToken(user.id) };
  }

  async login(input: AuthLoginInput): Promise<UserToken> {
    const found = await this.usersService.getByEmail(input.email);

    if (!found) {
      throw new NotFoundException(
        `User with email ${input.email} does not exist.`,
      );
    }

    const passwordValid = await AuthHelper.validate(
      input.password,
      found.password,
    );

    if (!passwordValid) {
      throw new Error('invalid password');
    }

    return { user: found, token: this.signToken(found.id) };
  }

  private signToken(id: number): string {
    const payload: JwtDto = { userId: id };
    return this.jwt.sign(payload);
  }
}
