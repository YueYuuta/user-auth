import { IUserRepository } from 'src/modules/user/application/driver-port/IUserRepositor';
import { IAuthInputPort } from '../driven-port/IAuthInputPort';
import { IPasswordHasher } from '../driver-port/IPasswordHasher';
import { ITokenService } from '../driver-port/ITokenService';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { PasswordValidationService } from '../../domain/service/password-validator';
import { UserNotFoundError } from 'src/modules/shared/error/not-found-user.error';
import { InactiveAccountError } from '../error/inactive-user.error';
import { InvalidCredentialsError } from '../error/invalid-credentials.error';
import { UsernameAlreadyTakenError } from 'src/modules/shared/error/username-already-taken.error';
import { UserNotVerifiedError } from '../../domain/error/user-not-verified.error';
import { IVerificationToken } from '../driver-port/IVerificationToken';
import { IMail } from '../driver-port/IMail';

export class AuthUseCase implements IAuthInputPort {
  constructor(
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
    private readonly userRepository: IUserRepository,
    private readonly passwordValidator: PasswordValidationService,
    private readonly verificationToken: IVerificationToken,
    private readonly mail: IMail,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findByUsername(username);

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
    await this.mail.sendVerificationEmail(email, token);
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
