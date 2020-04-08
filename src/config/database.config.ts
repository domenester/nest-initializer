import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  keepConnectionAlive: true,
}

export default (entitiesRelativePath = '.'): TypeOrmModuleOptions => ({
  ...typeOrmOptions,
  entities: [`${entitiesRelativePath}/**/*.entity{.ts,.js}`],
}) as TypeOrmModuleOptions;
