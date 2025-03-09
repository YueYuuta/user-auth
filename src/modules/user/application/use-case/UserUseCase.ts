import { User } from '../../domain/entity/user.entity';
import { IUserInputPort } from '../driven-port/IUserInputPort';
import { IUserRepository } from '../driver-port/IUserRepositor';

export class UserUseCase implements IUserInputPort {
  constructor(private readonly userRepository: IUserRepository) {}

  async findById(userId: number): Promise<User | null> {
    return await this.userRepository.findById(userId);
  }
}
