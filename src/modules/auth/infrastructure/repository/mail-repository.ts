import * as nodemailer from 'nodemailer';
import { IMail } from '../../application/driver-port/IMail';

export class NodemailerMailService implements IMail {
  private transporter = nodemailer.createTransport({
    // host: 'smtp.mailtrap.io', // Usa Mailtrap para pruebas
    // port: 587,
    // auth: {
    //   user: 'yourUsername', // Tus credenciales de Mailtrap
    //   pass: 'yourPassword',
    // },
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationLink = `http://localhost:3000/auth/verify?token=${token}`;

    await this.transporter.sendMail({
      from: 'noreply@yourapp.com',
      to: email,
      subject: 'Verify Your Email',
      html: `
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationLink}">Verify Email</a>
      `,
    });
  }
  async sendLoginNotification(email: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'noreply@yourapp.com',
      to: email,
      subject: 'Login Notification',
      text: `You have successfully logged in to your account.`,
      html: `<p>You have successfully logged in to your account.</p>`,
    });
  }
}
