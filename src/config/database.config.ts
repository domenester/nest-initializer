import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE_NAME
} = process.env

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE_NAME,
  synchronize: true,
  keepConnectionAlive: true
}

export default (entitiesRelativePath = '.'): TypeOrmModuleOptions => ({
  ...typeOrmOptions,
  entities: [`${entitiesRelativePath}/**/*.entity{.ts,.js}`]
}) as TypeOrmModuleOptions
