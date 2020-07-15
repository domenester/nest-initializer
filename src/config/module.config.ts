import { ConfigModule } from '@nestjs/config'
import { DynamicModule } from '@nestjs/common'

export const ConfigModuleForRoot = (): DynamicModule => ConfigModule.forRoot({
  envFilePath: `${process.cwd()}/.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
  isGlobal: true
})