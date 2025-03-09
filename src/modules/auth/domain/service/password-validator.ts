import { WeakPasswordError } from '../errors/weak-password.error';

export class PasswordValidationService {
  // Valida las reglas del dominio para contraseñas
  validate(password: string): void {
    this.ensureMinLength(password);
    this.ensureContainsUpperCase(password);
    this.ensureContainsNumber(password);
  }

  // Regla: La contraseña debe tener una longitud mínima
  private ensureMinLength(password: string): void {
    const minLength = 8;
    if (password.length < minLength) {
      throw new WeakPasswordError(
        'Password must be at least 8 characters long.',
      );
    }
  }

  // Regla: La contraseña debe contener al menos una letra mayúscula
  private ensureContainsUpperCase(password: string): void {
    if (!/[A-Z]/.test(password)) {
      throw new WeakPasswordError(
        'Password must contain at least one uppercase letter.',
      );
    }
  }

  // Regla: La contraseña debe contener al menos un número
  private ensureContainsNumber(password: string): void {
    if (!/\d/.test(password)) {
      throw new WeakPasswordError('Password must contain at least one number.');
    }
  }
}
