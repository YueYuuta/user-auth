import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './infrastructure/nestjs/api/auth.controller';
import { AuthUseCase } from './application/use-case/AuthUseCase';

import { BcryptPasswordHasher } from './infrastructure/repository/getPasswordHash';
import { JwtTokenService } from './infrastructure/repository/JwtTokenService';
import { UserModule } from '../user/user.module';
import { IPasswordHasher } from './application/driver-port/IPasswordHasher';
import { ITokenService } from './application/driver-port/ITokenService';
import { IUserRepository } from '../user/application/driver-port/IUserRepositor';
import { UserRepository } from '../user/infrastructure/nestjs/repository/user.repository';
import { JwtStrategy } from './infrastructure/jwt/jwt-strategy';
import { PasswordValidationService } from './domain/service/password-validator';
import { IVerificationToken } from './application/driver-port/IVerificationToken';
import { JwtVerificationTokenRepository } from './infrastructure/repository/JwtVerificationTokenRepository';
import { NodemailerMailService } from './infrastructure/repository/mail-repository';
import { IMail } from './application/driver-port/IMail';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log('JWT_SECRET:', configService.get<string>('JWT_SECRET')); // Asegúrate de que no sea undefined
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1d' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: 'IAuthInputPort',
      useClass: AuthUseCase,
    },
    // Implementación del puerto IPasswordHasher
    {
      provide: 'IPasswordHasher',
      useClass: BcryptPasswordHasher,
    },
    // Implementación del puerto ITokenService
    {
      provide: 'ITokenService',
      useClass: JwtTokenService,
    },
    {
      provide: 'PasswordValidationService', // Token para la clase
      useClass: PasswordValidationService, // Instancia concreta de la clase
    },
    {
      provide: 'IVerificationToken', // Token para la clase
      useClass: JwtVerificationTokenRepository, // Instancia concreta de la clase
    },
    {
      provide: 'IMail', // Token para la clase
      useClass: NodemailerMailService, // Instancia concreta de la clase
    },

    {
      provide: 'ITokenService',
      useFactory: (jwtService: JwtService) => {
        return new JwtTokenService(jwtService);
      },
      inject: [JwtService],
    },
    {
      provide: 'IAuthInputPort',
      useFactory: (
        passwordHasher: IPasswordHasher,
        tokenService: ITokenService,
        userRepository: IUserRepository,
        passwordValidationService: PasswordValidationService,
        verificationToken: IVerificationToken,
        mail: IMail,
      ) => {
        console.log('passwordHasher:', passwordHasher); // Debería estar definido
        console.log('tokenService:', tokenService); // Debería estar definido
        console.log('userRepository:', userRepository); // Debería estar definido
        console.log('passwordValidationService:', passwordValidationService); // Debería estar definido
        console.log('verificationToken:', verificationToken); // Debería estar definido
        console.log('mail:', mail); // Debería estar definido
        return new AuthUseCase(
          passwordHasher,
          tokenService,
          userRepository,
          passwordValidationService,
          verificationToken,
          mail,
        );
      },
      inject: [
        'IPasswordHasher',
        'ITokenService',
        'IUserRepository',
        'PasswordValidationService',
        'IVerificationToken',
        'IMail',
      ],
    },
  ],
  exports: ['IAuthInputPort', 'ITokenService'],
})
export class AuthModule {}
