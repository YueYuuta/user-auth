import { ApplicationError } from './error.application';

export class UsernameAlreadyTakenError extends ApplicationError {
  constructor() {
    super('Username is already taken.', 'USERNAME_ALREADY_TAKEN', 400); // Bad Request
  }
}
