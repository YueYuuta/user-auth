import * as jwt from 'jsonwebtoken';
import { NotificationTokenRepository } from '../../application/driver-port/notification-token.repository';

export class NotificationTokenRepositoryImplementation
  implements NotificationTokenRepository
{
  private readonly secret = 'yourSecretKey'; // Usa una clave segura y coloca esto en variables de entorno

  generateToken(userId: number): string {
    return jwt.sign({ userId }, this.secret, { expiresIn: '1h' }); // Expiración de 1 hora
  }

  validateToken(token: string): { userId: number } {
    try {
      return jwt.verify(token, this.secret) as { userId: number };
    } catch (error) {
      throw new Error('Invalid or expired token.');
    }
  }
}
