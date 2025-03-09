import { ApplicationError } from 'src/modules/shared/error/error.application';

export class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super('Invalid credentials provided.', 'INVALID_CREDENTIALS', 401); // Unauthorized
  }
}
