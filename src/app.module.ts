import { Module } from '@nestjs/common'
import { PugAdapter, MailerModule } from '@nestjs-modules/mailer'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './auth/constants'
import { JwtStrategy } from './auth/strategies/jwt.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PasswordModule } from './password/password.module'
import { RegisterModule } from './register/register.module'
import databaseConfig from './config/database.config'
import jwtConfig from './config/jwt'

const { NODE_ENV } = process.env

const entitiesRelativePath = NODE_ENV === 'test' ? '.' : 'dist'

export const MailerModuleForRoot = MailerModule.forRoot({
  transport: 'smtps://domene.dev@gmail.com:DomeneDevPa$$@smtp.gmail.com',
  defaults: {
    from:'Nest Initializer <initializer@nestjs.com>'
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new PugAdapter(),
    options: {
      strict: true
    }
  }
})

export const ConfigModuleForRoot = ConfigModule.forRoot({
  envFilePath: '../.env'
})

@Module({
  imports: [
    ConfigModuleForRoot,
    AuthModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConfig.expiresInDefault }
    }),
    TypeOrmModule.forRoot(
      databaseConfig(entitiesRelativePath),
    ),
    PasswordModule,
    MailerModuleForRoot,
    RegisterModule
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService,
    JwtStrategy
  ]
})
export class AppModule {}
