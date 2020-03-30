import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  keepConnectionAlive: true,
}

export default (): TypeOrmModuleOptions => typeOrmOptions as TypeOrmModuleOptions;
