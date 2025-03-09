export interface IPasswordHasher {
  hash(password: string): Promise<string>;
  compare(rawPassword: string, hashedPassword: string): Promise<boolean>;
}
