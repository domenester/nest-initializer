import { createConnection, Connection } from "typeorm";
import Seeds from './seeders'
import { Seeder } from "./seeders/seeder";
import { typeOrmOptions } from "../../config/database.config";

export const setupDatabase = async () => {
  if (!process.env.FAKER_LENGTH) {
    throw new Error('FAKER_LENGTH environment variable not defined.')
  }

  const connection = await createConnection({
    ...typeOrmOptions,
    entities: ['./**/*.entity.js'],
  } as any)

  console.log('\n Start seeding database:\n')
  const seeders: Array<(connection: Connection) => Seeder> = Seeds

  for (let i = 0; i < seeders.length; i++) {
    await seeders[i](connection).seed()
  }
}
