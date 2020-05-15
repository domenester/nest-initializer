import { UserEntity, EntityBase, RoleEntity } from '../../src/entities'
import { CreateUserDto } from '../../src/dtos'

export const baseMock: EntityBase = {
  id: 1,
  createdBy: null,
  updatedBy: null,
  createdAt: new Date(),
  updatedAt: new Date()
}

export const roleMock: RoleEntity = {
  ...baseMock,
  name: 'owner'
}

export const userEntityMock: UserEntity = {
  ...baseMock,
  username: 'admin',
  email: 'admin@mail.com',
  password: '12345678',
  roles: [roleMock]
}

export const userCreateDtoMock: CreateUserDto = {
  username: 'admin',
  email: 'admin@mail.com',
  password: '12345678',
  roles: [roleMock.name]
}