/**
 * The underline at the begining of the file name, is for sorting purpose,
 * the files at the top is compiled first, and this file has a circular dependencie
 * with bas.entity.ts file.
 */
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'
import { EntityBase } from '../entities/base.entity'
import { IsEmail } from 'class-validator'
import { RoleEntity } from './role.entity'

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
  name: string;

  @Column({ type: 'varchar' })
  password?: string;

  @ManyToMany( () => RoleEntity )
  @JoinTable()
  roles: Array<RoleEntity>;
}
