import { User } from '../../domain/entity/user.entity';

export interface UserUseCase {
  // register(username: string, passwordHash: string): Promise<void>;
  findById(userId: number): Promise<User | null>;
}
