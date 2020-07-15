import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({transform: true}))
  app.enableCors()
  const { SERVER_PORT } = process.env
  await app.listen(+SERVER_PORT, '0.0.0.0')
}
bootstrap()
