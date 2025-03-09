import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infrastructure/nestjs/api/auth.controller';

import { UserModule } from '../user/user.module';

import {
  authRepositoryProviders,
  authUseCaseProviders,
} from './infrastructure/nestjs/config/auth.provider';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { jwtConfig } from './infrastructure/nestjs/config/jwtconfig';
import { JwtStrategy } from './infrastructure/jwt/jwt-strategy';
import { UserRegisterInEventHandler } from './infrastructure/events/user-register.event';
import { UserLoggedInEventHandler } from './infrastructure/events/user-loggedin.event';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UserModule,
    JwtModule.registerAsync(jwtConfig()),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    UserRegisterInEventHandler,
    UserLoggedInEventHandler,
    ...authUseCaseProviders,
    ...authRepositoryProviders,
  ],
})
export class AuthModule {}
