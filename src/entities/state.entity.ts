import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { EntityBase } from '../interfaces';
import { CountryEntity } from './country.entity';
import { CityEntity } from './city.entity';

@Entity({name: 'state'})

export class StateEntity extends EntityBase {
  @Column({ type: 'varchar' })
  name: string;

  @Column({
    type: 'varchar',
    length: 2
  })
  initials: string;

  @ManyToOne(() => CountryEntity, country => country.states)
  country: CountryEntity;

  @OneToMany(() => CityEntity, cities => cities)
  cities: CityEntity;
}
