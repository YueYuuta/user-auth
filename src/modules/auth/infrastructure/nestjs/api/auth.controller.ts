import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { AuthUseCase } from 'src/modules/auth/application/driven-port/auth-use-case';
import { AUTH_PROVIDER_TOKENS } from '../config/auth.provider';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_PROVIDER_TOKENS.AUTH_USE_CASE) // Asegúrate de usar el mismo token registrado en el módulo
    private readonly _authUseCase: AuthUseCase,
  ) {}
  @Post('login')
  async create(@Body() login: LoginDto) {
    return await this._authUseCase.login(login.username, login.password);
  }

  @Post('register')
  // @ApiResponse({ status: 201, description: 'User successfully registered' })
  // @ApiResponse({ status: 400, description: 'User already exists' }) // Documentar un error específico
  // @ApiResponse({ status: 400, description: 'Validation error: Invalid input' }) // Documentar errores de class-validator
  async register(@Body() user: RegisterDto) {
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
