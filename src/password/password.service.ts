import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import * as path from 'path'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { ApiResponse } from '../interfaces'

@Injectable()
export class PasswordService {

  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async sendResetPasswordLink(email: string): Promise<ApiResponse> {
    const url = this.configService.get<string>('FRONTEND_URL')
    if (!url) throw new Error('FRONTEND_URL env should be defined')
    const payload = { email }
    const token = this.jwtService.sign(payload)
    process.env.NODE_ENV !== 'test' && await this
      .mailerService
      .sendMail({
        to: email,
        from: 'noreply@nestinitializer.com',
        subject: 'Reset Password Requested',
        template: path.join(__dirname, '../../templates/email/reset-password'),
        context: {
          email,
          url: `${url}/reset-password?token=${token}`
        }
      }).catch((error: any) => {
        console.log(error)
        throw new InternalServerErrorException('Erro ao enviar email')
      })
    return { message: 'Link to reset password sent' }
  }

  
  async resetPassword(email: string, password: string): Promise<ApiResponse> {
    const updated = await this.userService.setPassword(email, password)
    if (!updated) {
      throw new BadRequestException('Problem reseting password')
    }
    return { message: 'Password reset successfully' }
  }
}
