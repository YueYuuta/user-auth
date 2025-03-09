export interface IMail {
  sendVerificationEmail(email: string, token: string): Promise<void>;
}
