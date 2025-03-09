import { User } from '../../domain/entity/user.entity';
import { UserUseCase } from '../driven-port/user-use-case';
import { IUserRepository } from '../driver-port/user.repository';

export class UserUseCaseImplementation implements UserUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async findById(userId: number): Promise<User | null> {
    return await this._userRepository.findById(userId);
  }
}
