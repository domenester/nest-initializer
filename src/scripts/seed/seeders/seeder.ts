import { success, error } from 'log-symbols'

export abstract class Seeder {
  name: string

  abstract async setup()

  async seed(): Promise<void> {
    try {
      await this.setup()
      console.log(success, `${this.name} seeded.`)
    } catch (err) {
      console.log(error, `Error seeding ${this.name}: ${err}`)
    }
  }
}
