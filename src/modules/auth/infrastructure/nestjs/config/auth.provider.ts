import { Provider } from '@nestjs/common';
import { EventPublisherRepository } from 'src/modules/auth/application/driver-port/event-publisher.repository';
import { LoggerRepository } from 'src/modules/auth/application/driver-port/logger.repository';
import { LoginTokenRepository } from 'src/modules/auth/application/driver-port/login-token.repository';
import { NotificationTokenRepository } from 'src/modules/auth/application/driver-port/notification-token.repository';
import { PasswordHasherRepository } from 'src/modules/auth/application/driver-port/password-hasher.repository';
import { AuthUseCaseImplementation } from 'src/modules/auth/application/use-case/auth-use-case-implementation';
import { PasswordValidationDomainService } from 'src/modules/auth/domain/service/password-validator.service';
import { IUserRepository } from 'src/modules/user/application/driver-port/user.repository';
import { PasswordHasherRepositoryImplementation } from '../../repository/password-hasher-repository-implementation,';
import { NotificationTokenRepositoryImplementation } from '../../repository/notification-token-repository-implementation';
import { MailRepositoryImplementation } from '../../repository/mail-repository-implementation';
import { LoggerRepositoryImplementation } from '../../repository/logger-repository-implementation';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventPublisherRepositoryImplementation } from '../../repository/eventPublisher-repository-implementation';
import { JwtService } from '@nestjs/jwt';
import { LoginTokenRepositoryImplementation } from '../../repository/login-token-repository-implementation';
import { USER_REPOSITORY_TOKENS } from 'src/modules/user/infrastructure/nestjs/config/user.provider';

// src/auth/constants.ts
export const AUTH_PROVIDER_TOKENS = {
  PASSWORD_HASHER_REPOSITORY: 'PasswordHasherRepository',
  PASSWORD_VALIDATION_DOMAIN_SERVICE: 'PasswordValidationDomainService',
  NOTIFICATION_TOKEN_REPOSITORY: 'NotificationTokenRepository',
  MAIL_REPOSITORY: 'MailRepository',
  LOGGER_REPOSITORY: 'LoggerRepository',
  EVENT_PUBLISHER_REPOSITORY: 'eventPublisherRepository',
  LOGIN_TOKEN_REPOSITORY: 'LoginTokenRepository',
  AUTH_USE_CASE: 'AuthUseCase',
};

export const authRepositoryProviders: Provider[] = [
  {
    provide: AUTH_PROVIDER_TOKENS.PASSWORD_HASHER_REPOSITORY,
    useClass: PasswordHasherRepositoryImplementation,
  },
  {
    provide: AUTH_PROVIDER_TOKENS.PASSWORD_VALIDATION_DOMAIN_SERVICE,
    useClass: PasswordValidationDomainService,
  },
  {
    provide: AUTH_PROVIDER_TOKENS.NOTIFICATION_TOKEN_REPOSITORY,
    useClass: NotificationTokenRepositoryImplementation,
  },
  {
    provide: AUTH_PROVIDER_TOKENS.MAIL_REPOSITORY,
    useClass: MailRepositoryImplementation,
  },
  {
    provide: AUTH_PROVIDER_TOKENS.LOGGER_REPOSITORY,
    useClass: LoggerRepositoryImplementation,
  },
  {
    provide: AUTH_PROVIDER_TOKENS.EVENT_PUBLISHER_REPOSITORY,
    useFactory: (eventEmitter2: EventEmitter2) => {
      return new EventPublisherRepositoryImplementation(eventEmitter2);
    },
    inject: [EventEmitter2],
  },
  {
    provide: AUTH_PROVIDER_TOKENS.LOGIN_TOKEN_REPOSITORY,
    useFactory: (jwtService: JwtService) => {
      return new LoginTokenRepositoryImplementation(jwtService);
    },
    inject: [JwtService],
  },
];
export const authUseCaseProviders: Provider[] = [
  {
    provide: AUTH_PROVIDER_TOKENS.AUTH_USE_CASE,
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
      AUTH_PROVIDER_TOKENS.PASSWORD_HASHER_REPOSITORY,
      AUTH_PROVIDER_TOKENS.LOGIN_TOKEN_REPOSITORY,
      USER_REPOSITORY_TOKENS.USER_REPOSITORY, // Puedes crear otra constante para esto si deseas
      AUTH_PROVIDER_TOKENS.PASSWORD_VALIDATION_DOMAIN_SERVICE, // Opcional crear constante
      AUTH_PROVIDER_TOKENS.NOTIFICATION_TOKEN_REPOSITORY,
      AUTH_PROVIDER_TOKENS.EVENT_PUBLISHER_REPOSITORY,
      AUTH_PROVIDER_TOKENS.LOGGER_REPOSITORY,
    ],
  },
];
