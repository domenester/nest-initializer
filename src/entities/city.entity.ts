import { Entity, Column, ManyToOne } from 'typeorm'
import { EntityBase } from './base.entity'
import { StateEntity } from './state.entity'

@Entity({name: 'city'})

export class CityEntity extends EntityBase {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => StateEntity, state => state.cities)
  state: StateEntity;
}
