import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { Logger } from './logger/logger.service'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger()
  })
  app.useGlobalPipes(new ValidationPipe({transform: true}))
  app.enableCors({origin: true})
  const { SERVER_PORT } = process.env
  const server = await app.listen(+SERVER_PORT)
  server.setTimeout(10000)
}
bootstrap()
