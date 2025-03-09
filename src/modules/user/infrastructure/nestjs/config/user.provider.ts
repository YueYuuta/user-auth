import { Provider } from '@nestjs/common';
import { UserUseCaseImplementation } from 'src/modules/user/application/use-case/user-use-case-implementation';
import { UserRepositoryImplementation } from '../../repository/user-repository-implementation';

// src/user/constants.ts
export const USER_REPOSITORY_TOKENS = {
  USER_USE_CASE: 'UserUseCase',
  USER_REPOSITORY: 'IUserRepository',
};

export const userRepositoryProviders: Provider[] = [
  {
    provide: USER_REPOSITORY_TOKENS.USER_USE_CASE,
    useClass: UserUseCaseImplementation,
  },
  {
    provide: USER_REPOSITORY_TOKENS.USER_REPOSITORY,
    useClass: UserRepositoryImplementation,
  },
];
