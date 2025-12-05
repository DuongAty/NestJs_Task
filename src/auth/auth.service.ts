import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.usersRepository.createUser(authCredentialsDto);
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.usersRepository.signIn(authCredentialsDto);
  }
}
