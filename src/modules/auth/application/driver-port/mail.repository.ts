export interface MailRepository {
  sendVerificationEmail(email: string, token: string): Promise<void>;
  sendLoginNotification(email: string): Promise<void>;
}
