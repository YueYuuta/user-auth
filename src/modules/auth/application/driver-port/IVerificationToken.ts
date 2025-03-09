export interface IVerificationToken {
  generateToken(userId: number): string;
  validateToken(token: string): { userId: number };
}
