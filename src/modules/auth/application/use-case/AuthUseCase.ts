import { IUserRepository } from 'src/modules/user/application/driver-port/IUserRepositor';
import { IAuthInputPort } from '../driven-port/IAuthInputPort';
import { IPasswordHasher } from '../driver-port/IPasswordHasher';
import { ITokenService } from '../driver-port/ITokenService';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { PasswordValidationService } from '../../domain/service/password-validator';
import { UserNotFoundError } from 'src/modules/shared/error/not-found-user.error';
import { InactiveAccountError } from '../errors/inactive-user.error';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { UsernameAlreadyTakenError } from 'src/modules/shared/error/username-already-taken.error';
import { UserNotVerifiedError } from '../../domain/errors/user-not-verified.error';
import { IVerificationToken } from '../driver-port/IVerificationToken';
import { IEventPublisher } from '../driver-port/IEventPublusher';
import { UserRegisterInEvent } from '../event/user-register-in.event';
import { UserLoggedInEvent } from '../event/user-logged-in.event';
import { ILogger } from '../driver-port/ILogger';

export class AuthUseCase implements IAuthInputPort {
  constructor(
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
    private readonly userRepository: IUserRepository,
    private readonly passwordValidator: PasswordValidationService,
    private readonly verificationToken: IVerificationToken,
    private readonly eventPublisher: IEventPublisher,
    private readonly logger: ILogger,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    this.logger.log(
      'AuthUseCase',
      `Attempting login for username: ${username}`,
    );
    const user = await this.userRepository.findByUsername(username);
    this.logger.log(`AuthUseCase: `, `User found: ${username}`);

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

    const token = await this.tokenService.generateToken({
      id: user.id,
    });
    this.logger.log(`AuthUseCase: `, `Token generated: ${token}`);

    this.eventPublisher.publishEvent(
      'user.loggedin', //TODO: Cambiar por una constante
      new UserLoggedInEvent(user.email),
    );
    this.logger.log(`AuthUseCase: `, `Even notification to: ${user.email}`);

    return { accessToken: token };
  }

  async register(
    username: string,
    password: string,
    email: string,
  ): Promise<void> {
    this.passwordValidator.validate(password);
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new UsernameAlreadyTakenError();
    }

    // Genera el hash de la contraseña
    const hashedPassword = await this.passwordHasher.hash(password);

    const user = new User(username, hashedPassword, email);

    // Crea y persiste el usuario
    const user_id = await this.userRepository.save(user);

    const token = await this.verificationToken.generateToken(user_id); // Generar token
    this.eventPublisher.publishEvent(
      'user.registered', //TODO: Cambiar por una constante
      new UserRegisterInEvent(user.email, token),
    );
    // await this.mail.sendVerificationEmail(email, token);
  }
  async verifyAccount(token: string): Promise<void> {
    const { userId } = this.verificationToken.validateToken(token);
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    user.verify();
    await this.userRepository.vefifyUser(user.id);
  }
}
