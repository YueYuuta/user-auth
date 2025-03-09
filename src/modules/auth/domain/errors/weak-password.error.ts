import { DomainError } from 'src/modules/shared/error/error.domain';

export class WeakPasswordError extends DomainError {
  constructor(message: string) {
    super(`Password validation failed: ${message}`, 'WEAK_PASSWORD');
  }
}
