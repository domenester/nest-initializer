import { OneToMany, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm'
import { UserEntity } from './_user.entity'

export type IEntityBaseId = number

export class EntityBase {
  @PrimaryGeneratedColumn()
  id: IEntityBaseId;

  @OneToMany( () => UserEntity, user => user)
  @Column({
    type: 'integer',
    nullable: true,
    select: false
  })
  createdBy: UserEntity;

  @OneToMany( () => UserEntity, user => user)
  @Column({
    type: 'integer',
    nullable: true,
    select: false
  })
  updatedBy: UserEntity;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    default: () => null,
    select: true
  })
  deletedAt?: Date
}
