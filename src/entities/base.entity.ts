import { OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './_user.entity'

export type IEntityBaseId = number

export class EntityBase {
  @PrimaryGeneratedColumn()
  id: IEntityBaseId;

  @OneToMany( () => UserEntity, user => user)
  @Column({ type: 'integer', nullable: true })
  createdBy: UserEntity;

  @OneToMany( () => UserEntity, user => user)
  @Column({ type: 'integer', nullable: true })
  updatedBy: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
