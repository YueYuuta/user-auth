export interface NotificationTokenRepository {
  generateToken(userId: number): string;
  validateToken(token: string): { userId: number };
}
