import { createConnection, Connection } from "typeorm";
import Seeders from './seeders'
import { Seeder } from "./seeders/seeder";
import { typeOrmOptions } from "../../config/database.config";

export const setupDatabase = async () => {
  const connection = await createConnection({
    ...typeOrmOptions,
    entities: ['../**/*.entity.js'],
  } as any)
  const seeders: Array<(connection: Connection) => Seeder> = Seeders
  return Promise.all(
    seeders.map( seeder => seeder(connection).seed() )
  )
}
