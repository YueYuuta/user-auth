import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './domain/entity/user.entity';
import { UserUseCase } from './application/use-case/UserUseCase';
import { UserRepository } from './infrastructure/nestjs/repository/user.repository';
import { User } from './infrastructure/typeorm/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'IUserInputPort',
      useClass: UserUseCase,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: ['IUserRepository'],
})
export class UserModule {}
