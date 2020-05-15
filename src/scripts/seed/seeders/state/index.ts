import { Connection } from 'typeorm'
import { Seeder } from '../seeder'
import { CountryEntity, StateEntity } from '../../../../entities'
import Countries from '../country/seed'

export class StateSeed extends Seeder {
  constructor(
    private connection: Connection
  ) {
    super()
  }

  name = 'State'

  async setup (): Promise<void> {
    const stateRepository = this.connection.getRepository(StateEntity)
    const count = await stateRepository.count()
    if (count > 0) {
      return console.log(`${this.name} seed already inserted`)
    }
    const countryRepository = this.connection.getRepository(CountryEntity)
    const countries = await countryRepository.find()
    await Promise.all(countries.map(async country => {
      const states = Countries[country.initials]
      await Promise.all(states.map(state => stateRepository.save({
        name: state.name,
        initials: state.initials,
        country
      })))
    }))
  }
}

export const stateSeed = (
  connection: Connection
): StateSeed => new StateSeed(connection)