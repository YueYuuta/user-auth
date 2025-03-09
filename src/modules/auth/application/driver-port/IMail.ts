export interface IMail {
  sendVerificationEmail(email: string, token: string): Promise<void>;
  sendLoginNotification(email: string): Promise<void>;
}
