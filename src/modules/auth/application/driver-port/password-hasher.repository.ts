export interface PasswordHasherRepository {
  hash(password: string): Promise<string>;
  compare(rawPassword: string, hashedPassword: string): Promise<boolean>;
}
