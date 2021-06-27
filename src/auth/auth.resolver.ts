import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { AuthLoginInput, AuthRegisterInput } from 'src/auth/dto';
import { UserToken } from 'src/auth/models/user-token';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserToken)
  register(@Args('input') input: AuthRegisterInput) {
    return this.authService.register(input);
  }

  @Mutation(() => UserToken)
  login(@Args('input') input: AuthLoginInput) {
    return this.authService.login(input);
  }
}
