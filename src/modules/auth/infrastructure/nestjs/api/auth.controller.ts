import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { AuthUseCase } from 'src/modules/auth/application/driven-port/auth-use-case';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthUseCase') // Asegúrate de usar el mismo token registrado en el módulo
    private readonly _authUseCase: AuthUseCase,
  ) {}
  @Post('login')
  async create(@Body() login: { username: string; password: string }) {
    return await this._authUseCase.login(login.username, login.password);
  }
  @Post('register')
  async register(
    @Body() user: { username: string; password: string; email: string },
  ) {
    return await this._authUseCase.register(
      user.username,
      user.password,
      user.email,
    );
  }
  @Get('verify')
  async verifyAccount(
    @Query('token') token: string,
  ): Promise<{ message: string }> {
    await this._authUseCase.verifyAccount(token);
    return { message: 'Account verified successfully.' };
  }
}
