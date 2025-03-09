import { IUserRepository } from 'src/modules/user/application/driver-port/user.repository';
import { AuthUseCase } from '../driven-port/auth-use-case';
import { PasswordHasherRepository } from '../driver-port/password-hasher.repository';
import { LoginTokenRepository } from '../driver-port/login-token.repository';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { PasswordValidationDomainService } from '../../domain/service/password-validator.service';
import { UserNotFoundError } from 'src/modules/shared/error/not-found-user.error';
import { InactiveAccountError } from '../errors/inactive-user.error';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { UsernameAlreadyTakenError } from 'src/modules/shared/error/username-already-taken.error';
import { UserNotVerifiedError } from '../../domain/errors/user-not-verified.error';
import { NotificationTokenRepository } from '../driver-port/notification-token.repository';
import { EventPublisherRepository } from '../driver-port/event-publisher.repository';
import { UserRegisterEvent } from '../event/user-register.event';
import { UserLoggedInEvent } from '../event/user-logged-in.event';
import { LoggerRepository } from '../driver-port/logger.repository';

export class AuthUseCaseImplementation implements AuthUseCase {
  constructor(
    private readonly passwordHasher: PasswordHasherRepository,
    private readonly _loginTokenRepository: LoginTokenRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _passwordValidationDomainService: PasswordValidationDomainService,
    private readonly _notificationTokenRepository: NotificationTokenRepository,
    private readonly _eventPlublisherRepository: EventPublisherRepository,
    private readonly _loggerRepository: LoggerRepository,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    this._loggerRepository.log(
      'AuthUseCase',
      `Attempting login for username: ${username}`,
    );
    const user = await this._userRepository.findByUsername(username);
    this._loggerRepository.log(`AuthUseCase: `, `User found: ${username}`);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (!user.isActive) {
      throw new InactiveAccountError();
    }

    if (!user.isVerified) {
      throw new UserNotVerifiedError();
    }

    const isPasswordValid = await this.passwordHasher.compare(
      password,
      user.getPasswordHash,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const token = await this._loginTokenRepository.generateToken({
      id: user.id,
    });
    this._loggerRepository.log(`AuthUseCase: `, `Token generated: ${token}`);

    this._eventPlublisherRepository.publishEvent(
      'user.loggedin', //TODO: Cambiar por una constante
      new UserLoggedInEvent(user.email),
    );
    this._loggerRepository.log(
      `AuthUseCase: `,
      `Even notification to: ${user.email}`,
    );

    return { accessToken: token };
  }

  async register(
    username: string,
    password: string,
    email: string,
  ): Promise<void> {
    this._passwordValidationDomainService.validate(password);
    const existingUser = await this._userRepository.findByUsername(username);
    if (existingUser) {
      throw new UsernameAlreadyTakenError();
    }

    // Genera el hash de la contraseña
    const hashedPassword = await this.passwordHasher.hash(password);

    const user = new User(username, hashedPassword, email);

    // Crea y persiste el usuario
    const user_id = await this._userRepository.save(user);

    const token =
      await this._notificationTokenRepository.generateToken(user_id); // Generar token
    this._eventPlublisherRepository.publishEvent(
      'user.registered', //TODO: Cambiar por una constante
      new UserRegisterEvent(user.email, token),
    );
    // await this.mail.sendVerificationEmail(email, token);
  }
  async verifyAccount(token: string): Promise<void> {
    const { userId } = this._notificationTokenRepository.validateToken(token);
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    user.verify();
    await this._userRepository.vefifyUser(user.id);
  }
}
