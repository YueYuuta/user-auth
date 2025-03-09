import { DomainError } from 'src/modules/shared/error/error.domain';

export class UserNotVerifiedError extends DomainError {
  constructor() {
    super('User account is not verified.', 'USER_NOT_VERIFIED');
  }
}
