import { Entity, Column } from 'typeorm';
import { IUserEntity, EntityBase } from '../interfaces';

@Entity({name: 'user'})

export class UserEntity extends EntityBase implements IUserEntity {
  @Column({ type: 'varchar' })
  username: string;

  @Column({
    type: 'varchar',
    unique: true
  })
  email: string;

  @Column({ type: 'varchar' })
  password: string;
}
