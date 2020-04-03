import * as dotenv from 'dotenv'
import { setupDatabase } from './setup'

dotenv.config({
  path: `${process.cwd()}/.env`
})

setupDatabase()
  .then(() => process.exit(0))
  .catch(err => console.error(err))
