import { ApplicationError } from 'src/modules/shared/error/error.application';

export class InactiveAccountError extends ApplicationError {
  constructor() {
    super('User account is inactive.', 'INACTIVE_ACCOUNT', 403); // Forbidden
  }
}
