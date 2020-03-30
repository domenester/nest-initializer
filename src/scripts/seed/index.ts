import { setupDatabase } from './setup'

setupDatabase()
  .then(() => process.exit(0))
  .catch(err => console.error(err))
