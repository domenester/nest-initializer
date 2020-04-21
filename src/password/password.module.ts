import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule
  ],
  controllers: [PasswordController],
  providers: [PasswordService]
})
export class PasswordModule {}
