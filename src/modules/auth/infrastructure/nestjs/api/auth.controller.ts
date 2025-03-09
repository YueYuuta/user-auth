import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { IAuthInputPort } from 'src/modules/auth/application/driven-port/IAuthInputPort';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthInputPort') // Asegúrate de usar el mismo token registrado en el módulo
    private readonly _iAuthInputPort: IAuthInputPort,
  ) {}
  @Post('login')
  async create(@Body() login: { username: string; password: string }) {
    return await this._iAuthInputPort.login(login.username, login.password);
  }
  @Post('register')
  async register(
    @Body() user: { username: string; password: string; email: string },
  ) {
    return await this._iAuthInputPort.register(
      user.username,
      user.password,
      user.email,
    );
  }
  @Get('verify')
  async verifyAccount(
    @Query('token') token: string,
  ): Promise<{ message: string }> {
    await this._iAuthInputPort.verifyAccount(token);
    return { message: 'Account verified successfully.' };
  }
}
