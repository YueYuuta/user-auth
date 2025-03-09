export interface AuthUseCase {
  login(username: string, password: string): Promise<{ accessToken: string }>;
  register(username: string, password: string, email: string): Promise<void>;
  verifyAccount(token: string): Promise<void>;
}
