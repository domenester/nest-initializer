import * as dotenv from 'dotenv'
import { setupDatabase } from './setup'

const { NODE_ENV } = process.env

dotenv.config({
  path: `${process.cwd()}/.env${NODE_ENV ? `.${NODE_ENV}` : '.development'}`
})

setupDatabase()
  .then(() => process.exit(0))
  .catch(err => console.error(err))
