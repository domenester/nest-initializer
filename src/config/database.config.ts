import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export default (entitiesRelativePath = '.'): TypeOrmModuleOptions => {
  const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE_NAME
  } = process.env

  return {
    type: 'postgres',
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE_NAME,
    synchronize: true,
    keepConnectionAlive: true,
    entities: [`${entitiesRelativePath}/**/*.entity{.ts,.js}`]
  } as TypeOrmModuleOptions
}
