import { Connection } from 'typeorm'
import { Seeder } from '../seeder'
import { StateEntity, CityEntity } from '../../../../entities'
import Countries from '../country/seed'

export class CitySeed extends Seeder {
  constructor(
    private connection: Connection
  ) {
    super()
  }

  name = 'City'

  countryInitialsToSeed

  cityByStateInitials: { [key: string]: Array<string> } = {}

  mapCities (): void {
    Countries[this.countryInitialsToSeed].forEach(
      state => this.cityByStateInitials[state.initials] = state.cities
    )
  }

  async setup (): Promise<void> {
    const stateRepository = await this.connection.getRepository(StateEntity)
    const cityRepository = await this.connection.getRepository(CityEntity)
    const states = await stateRepository.find({ relations: ['country'] })
    await Promise.all(
      states.map(async state => {
        if (state.country.initials !== this.countryInitialsToSeed) {
          this.countryInitialsToSeed = state.country.initials
          this.mapCities()
        }
        await Promise.all(this.cityByStateInitials[state.initials].map(
          name => cityRepository.save({ name, state })
        ))
      })
    )
  }
}

export const citySeed = (
  connection: Connection
): CitySeed => new CitySeed(connection)