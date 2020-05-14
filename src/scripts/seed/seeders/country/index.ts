import { Connection } from "typeorm";
import { Seeder } from "../seeder";
import { CountryEntity } from "../../../../entities";

export class CountrySeed extends Seeder {
  constructor(
    private connection: Connection
  ) {
    super()
  }

  name = 'Country'

  async setup () {
    const countrySeed = [{
      name: 'Brasil',
      initials: 'BR'
    }]
    const countryRepository = await this.connection.getRepository(CountryEntity)
    await  Promise.all(
      countrySeed.map(country => countryRepository.save(country))
    ).catch(err => {
      console.log('Error seeding countries: ', err)
    })
  }
  
}

export const countrySeed = (
  connection: Connection
) => new CountrySeed(connection)