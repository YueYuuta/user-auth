import { User } from '../../domain/entity/user.entity';

export interface IUserRepository {
  save(user: User): Promise<number>;
  findById(userId: number): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  vefifyUser(id: number): Promise<void>;
}
