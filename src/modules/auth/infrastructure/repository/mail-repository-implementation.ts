import * as nodemailer from 'nodemailer';
import { MailRepository } from '../../application/driver-port/mail.repository';

export class MailRepositoryImplementation implements MailRepository {
  private transporter = nodemailer.createTransport({
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

    const emailContent = `
      <html>
        <body style="background-color: #e6f7ff; margin: 0; padding: 0; font-family: 'Arial', sans-serif;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="text-align: center;">
                <img src="https://yourapp.com/logo.png" alt="Your App Logo" width="150" style="margin-bottom: 20px;"/>
                <h2 style="font-size: 30px; color: #003366; font-weight: 600; margin-bottom: 10px;">Almost There!</h2>
                <p style="font-size: 18px; color: #555; margin-bottom: 30px;">You're just one step away from activating your account. Please verify your email to get started.</p>
                <a href="${verificationLink}" style="background: linear-gradient(90deg, #00bfff, #1e90ff); color: #fff; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-size: 18px; font-weight: bold; display: inline-block; transition: all 0.3s ease;">Click here to verify</a>
                <p style="font-size: 14px; color: #777; margin-top: 20px;">If you're unable to click the button, please copy and paste this link into your browser:</p>
                <p style="font-size: 14px; color: #0072ff;"><a href="${verificationLink}" style="color: #0072ff; text-decoration: none; font-weight: bold;">${verificationLink}</a></p>
                <p style="font-size: 14px; color: #555; margin-top: 10px;">If you're unable to click the button, <a href="${verificationLink}" style="color: #0072ff; font-weight: bold; text-decoration: none;">copy this URL</a> and paste it in your browser.</p>
              </td>
            </tr>
            <tr>
              <td style="text-align: center; padding: 20px; font-size: 12px; color: #aaa; background-color: #f4f4f4; border-top: 1px solid #f0f0f0;">
                <p>If you are having trouble viewing this email, please <a href="${verificationLink}" style="color: #0072ff; text-decoration: none;">click here</a> to view it in your browser.</p>
                <p>&copy; 2025 YourApp. All rights reserved.</p>
                <!-- Redes Sociales -->
                <!--<div style="margin-top: 20px;">
                  <a href="https://facebook.com/yourapp" style="margin: 0 10px; text-decoration: none; color: #3b5998;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" width="24" style="vertical-align: middle;"/>
                  </a>
                  <a href="https://twitter.com/yourapp" style="margin: 0 10px; text-decoration: none; color: #1da1f2;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Twitter_Logo_As_of_2021.svg" alt="Twitter" width="24" style="vertical-align: middle;"/>
                  </a>
                  <a href="https://instagram.com/yourapp" style="margin: 0 10px; text-decoration: none; color: #c13584;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width="24" style="vertical-align: middle;"/>
                  </a>
                  <a href="https://linkedin.com/company/yourapp" style="margin: 0 10px; text-decoration: none; color: #0077b5;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/LinkedIn_Logo_2019.svg" alt="LinkedIn" width="24" style="vertical-align: middle;"/>
                  </a>
                </div>-->
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    await this.transporter.sendMail({
      from: 'noreply@yourapp.com',
      to: email,
      subject: 'Almost there! Verify your email to get started',
      html: emailContent,
    });
  }

  async sendLoginNotification(email: string): Promise<void> {
    const emailContent = `
      <html>
        <body style="background-color: #f4f4f4; margin: 0; padding: 0; font-family: 'Arial', sans-serif;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="text-align: center; padding: 30px;">
                <h2 style="font-size: 30px; color: #003366; font-weight: 600; margin-bottom: 10px;">Login Notification</h2>
                <p style="font-size: 18px; color: #555; margin-bottom: 30px;">You have successfully logged in to your account.</p>
                <p style="font-size: 16px; color: #555;">If this wasn't you, please <a href="https://yourapp.com/contact" style="color: #0072ff; font-weight: bold; text-decoration: none;">contact support</a> immediately to secure your account.</p>
              </td>
            </tr>
            <tr>
              <td style="text-align: center; padding: 20px; font-size: 12px; color: #aaa; background-color: #f4f4f4; border-top: 1px solid #f0f0f0;">
                <p>If you are having trouble viewing this email, please <a href="https://yourapp.com" style="color: #0072ff; text-decoration: none;">click here</a> to view it in your browser.</p>
                <p>&copy; 2025 YourApp. All rights reserved.</p>
                <!-- Redes Sociales -->
               <!-- <div style="margin-top: 20px;">
                  <a href="https://facebook.com/yourapp" style="margin: 0 10px; text-decoration: none; color: #3b5998;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" width="24" style="vertical-align: middle;"/>
                  </a>
                  <a href="https://twitter.com/yourapp" style="margin: 0 10px; text-decoration: none; color: #1da1f2;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Twitter_Logo_As_of_2021.svg" alt="Twitter" width="24" style="vertical-align: middle;"/>
                  </a>
                  <a href="https://instagram.com/yourapp" style="margin: 0 10px; text-decoration: none; color: #c13584;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width="24" style="vertical-align: middle;"/>
                  </a>
                  <a href="https://linkedin.com/company/yourapp" style="margin: 0 10px; text-decoration: none; color: #0077b5;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/LinkedIn_Logo_2019.svg" alt="LinkedIn" width="24" style="vertical-align: middle;"/>
                  </a>
                </div>-->
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    await this.transporter.sendMail({
      from: 'noreply@yourapp.com',
      to: email,
      subject: 'Login Notification: Secure Your Account',
      html: emailContent,
    });
  }
}
