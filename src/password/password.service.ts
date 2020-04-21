import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class PasswordService {

  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendResetPasswordLink(email: string): Promise<any> {
    const url = this.configService.get<string>('FRONTEND_URL')
    if (!url) throw new Error('FRONTEND_URL env should be defined')
    process.env.NODE_ENV !== 'test' && await this
      .mailerService
      .sendMail({
        to: 'diogodomene@gmail.com',
        from: 'noreply@nestinitializer.com',
        subject: 'Reset Password Requested',
        template: path.join(__dirname, '../templates/email/reset-password'),
        context: {
          email,
          url: `${url}/reset-password`
        },
      })
    return { message: 'Link to reset password sent' }
  }
}
