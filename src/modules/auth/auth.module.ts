import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './infrastructure/nestjs/api/auth.controller';
import { AuthUseCaseImplementation } from './application/use-case/auth-use-case-implementation';

import { PasswordHasherRepositoryImplementation } from './infrastructure/repository/password-hasher-repository-implementation,';
import { LoginTokenRepositoryImplementation } from './infrastructure/repository/login-token-repository-implementation';
import { UserModule } from '../user/user.module';
import { PasswordHasherRepository } from './application/driver-port/password-hasher.repository';
import { LoginTokenRepository } from './application/driver-port/login-token.repository';
import { IUserRepository } from '../user/application/driver-port/user.repository';
import { JwtStrategy } from './infrastructure/jwt/jwt-strategy';
import { PasswordValidationDomainService } from './domain/service/password-validator.service';
import { NotificationTokenRepository } from './application/driver-port/notification-token.repository';
import { NotificationTokenRepositoryImplementation } from './infrastructure/repository/notification-token-repository-implementation';
import { MailRepositoryImplementation } from './infrastructure/repository/mail-repository-implementation';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { UserRegisterInEventHandler } from './infrastructure/events/user-register.event';
import { EventPublisherRepositoryImplementation } from './infrastructure/repository/eventPublisher-repository-implementation';
import { EventPublisherRepository } from './application/driver-port/event-publisher.repository';
import { UserLoggedInEventHandler } from './infrastructure/events/user-loggedin.event';
import { LoggerRepositoryImplementation } from './infrastructure/repository/logger-repository-implementation';
import { LoggerRepository } from './application/driver-port/logger.repository';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
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
      provide: 'AuthUseCase',
      useClass: AuthUseCaseImplementation,
    },
    // Implementación del puerto IPasswordHasher
    {
      provide: 'PasswordHasherRepository',
      useClass: PasswordHasherRepositoryImplementation,
    },

    {
      provide: 'PasswordValidationDomainService', // Token para la clase
      useClass: PasswordValidationDomainService, // Instancia concreta de la clase
    },
    {
      provide: 'NotificationTokenRepository', // Token para la clase
      useClass: NotificationTokenRepositoryImplementation, // Instancia concreta de la clase
    },
    {
      provide: 'MailRepository', // Token para la clase
      useClass: MailRepositoryImplementation, // Instancia concreta de la clase
    },
    {
      provide: 'LoggerRepository', // Token para la clase
      useClass: LoggerRepositoryImplementation, // Instancia concreta de la clase
    },

    UserRegisterInEventHandler,
    UserLoggedInEventHandler,
    // { provide: 'eventPublisherRepository', useClass: NestEventPublisher },

    {
      provide: 'eventPublisherRepository',
      useFactory: (eventEmitter2: EventEmitter2) => {
        return new EventPublisherRepositoryImplementation(eventEmitter2);
      },
      inject: [EventEmitter2],
    },
    {
      provide: 'LoginTokenRepository',
      useFactory: (jwtService: JwtService) => {
        return new LoginTokenRepositoryImplementation(jwtService);
      },
      inject: [JwtService],
    },
    {
      provide: 'AuthUseCase',
      useFactory: (
        passwordHasherRepository: PasswordHasherRepository,
        loginTokenRepository: LoginTokenRepository,
        userRepository: IUserRepository,
        passwordValidationDomainService: PasswordValidationDomainService,
        notificationTokenRepository: NotificationTokenRepository,
        eventPublisherRepository: EventPublisherRepository,
        loggerRepository: LoggerRepository,
      ) => {
        return new AuthUseCaseImplementation(
          passwordHasherRepository,
          loginTokenRepository,
          userRepository,
          passwordValidationDomainService,
          notificationTokenRepository,
          eventPublisherRepository,
          loggerRepository,
        );
      },
      inject: [
        'PasswordHasherRepository',
        'LoginTokenRepository',
        'IUserRepository',
        'PasswordValidationDomainService',
        'NotificationTokenRepository',
        'eventPublisherRepository',
        'LoggerRepository',
      ],
    },
  ],
})
export class AuthModule {}
