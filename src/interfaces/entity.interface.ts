import { IUserEntity } from "./user.interface";
import { OneToMany, Column, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../users/user.entity";

export type IEntityBaseId = number

export interface IEntityBase {
  id: IEntityBaseId;
  createdBy: IUserEntity;
  updatedBy: IUserEntity;
  createdAt: Date;
  updatedAt: Date;
}

export class EntityBase implements IEntityBase {
  @PrimaryGeneratedColumn()
  id: IEntityBaseId;

  @OneToMany( type => UserEntity, user => user.createdBy)
  @Column({ type: 'integer', nullable: true })
  createdBy: UserEntity;

  @OneToMany( type => UserEntity, user => user.updatedBy)
  @Column({ type: 'integer', nullable: true })
  updatedBy: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}