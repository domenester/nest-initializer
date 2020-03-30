export class Seeder {
  name: string

  async setup() {}

  async seed() {
    try {
      await this.setup()
      console.log(`${this.name} created.`)
    } catch (err) {
      console.log(`Error creating user: ${err}`)
    }
  }
}
