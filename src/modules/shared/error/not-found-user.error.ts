import { ApplicationError } from './error.application';

export class UserNotFoundError extends ApplicationError {
  constructor() {
    super('User not found.', 'USER_NOT_FOUND', 404); // Not Found
  }
}
