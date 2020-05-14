import { Module } from '@nestjs/common'
import { PasswordController } from './password.controller'
import { PasswordService } from './password.service'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../auth/constants'
import jwtConfig from '../config/jwt'

export const JwtModuleRegister = JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: jwtConfig.expirsInForgotPassword }
})

@Module({
  imports:[
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    UsersModule,
    JwtModuleRegister
  ],
  controllers: [PasswordController],
  providers: [PasswordService]
})
export class PasswordModule {}
