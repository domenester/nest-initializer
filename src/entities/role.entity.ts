/**
 * The underline at the begining of the file name, is for sorting purpose,
 * the files at the top is compiled first, and this file has a circular dependencie
 * with bas.entity.ts file.
 */
import { Entity, Column } from 'typeorm'
import { EntityBase } from '../entities/base.entity'

@Entity({name: 'role'})
export class RoleEntity extends EntityBase {
  @Column({
    type: 'varchar',
    unique: true
  })
  name: string;
}
