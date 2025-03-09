import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './domain/entity/user.entity';
import { UserUseCaseImplementation } from './application/use-case/user-use-case-implementation';
import { UserRepositoryImplementation } from './infrastructure/repository/user-repository-implementation';
import { User } from './infrastructure/typeorm/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'UserUseCase',
      useClass: UserUseCaseImplementation,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryImplementation,
    },
  ],
  exports: ['IUserRepository'],
})
export class UserModule {}
