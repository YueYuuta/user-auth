import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/modules/user/application/driver-port/IUserRepositor';
import { User as UserEntity } from '../../typeorm/entity/user.entity';
import { User } from 'src/modules/user/domain/entity/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}
  async vefifyUser(id: number): Promise<void> {
    console.log('🚀 ~ UserRepository ~ vefifyUser ~ id:', id);
    await this.repository.update(id, { isVerified: true });
  }

  async save(user: User): Promise<number> {
    console.log('🚀 ~ UserRepository ~ save ~ user:', user);
    const userDb = await this.repository.save({
      email: user.email,
      username: user.username,
      password: user.getPasswordHash,
    });
    return userDb.id;
  }

  async findById(userId: number): Promise<User | null> {
    const userEntity = await this.repository.findOneBy({ id: userId });

    // Si no se encuentra el usuario, devuelve null
    if (!userEntity) {
      return null;
    }

    // Mapea los datos de la entidad de la base de datos a la clase de dominio User
    return new User(
      userEntity.username,
      userEntity.password,
      userEntity.email,
      userEntity.isActive,
      userEntity.isVerified,
      userEntity.id, // Opcional, ya que el id puede ser undefined
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const userEntity = await this.repository.findOneBy({ username });

    // Si no se encuentra el usuario, devuelve null
    if (!userEntity) {
      return null;
    }

    // Mapea los datos de la entidad de la base de datos a la clase de dominio User
    return new User(
      userEntity.username,
      userEntity.password,
      userEntity.email,
      userEntity.isActive,
      userEntity.isVerified,
      userEntity.id, // Opcional, ya que el id puede ser undefined
    );
  }
}
