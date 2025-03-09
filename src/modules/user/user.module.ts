import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './domain/entity/user.entity';

import { User } from './infrastructure/typeorm/entity/user.entity';
import {
  USER_REPOSITORY_TOKENS,
  userRepositoryProviders,
} from './infrastructure/nestjs/config/user.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [...userRepositoryProviders],
  exports: [USER_REPOSITORY_TOKENS.USER_REPOSITORY],
})
export class UserModule {}
