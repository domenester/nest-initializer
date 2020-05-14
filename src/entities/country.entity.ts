import { Entity, Column, OneToMany } from 'typeorm';
import { EntityBase } from '../interfaces';
import { StateEntity } from './state.entity';

@Entity({name: 'country'})

export class CountryEntity extends EntityBase {
  @Column({
    type: 'varchar',
    unique: true
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 2
  })
  initials: string;

  @OneToMany(() => StateEntity, states => states)
  states: [];
}
