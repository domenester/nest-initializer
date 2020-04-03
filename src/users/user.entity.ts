import { Entity, Column } from 'typeorm';
import { EntityBase } from '../interfaces';
import { IsEmail } from 'class-validator';

@Entity({name: 'user'})

export class UserEntity extends EntityBase {
  @Column({ type: 'varchar' })
  username: string;

  @Column({
    type: 'varchar',
    unique: true
  })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar' })
  password?: string;
}
