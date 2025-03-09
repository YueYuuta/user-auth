import { User } from '../../domain/entity/user.entity';

export interface IUserInputPort {
  // register(username: string, passwordHash: string): Promise<void>;
  findById(userId: number): Promise<User | null>;
}
