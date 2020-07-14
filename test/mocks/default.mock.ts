import { UserEntity, EntityBase, RoleEntity } from '../../src/entities'
import { CreateUserDto, UpdateUserDto } from '../../src/dtos'

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
  name: 'Administrador',
  roles: [roleMock]
}

export const userCreateDtoMock: CreateUserDto = {
  username: 'admin',
  email: 'admin@mail.com',
  password: '12345678',
  name: 'Administrador',
  roles: [roleMock.name]
}

export const userUpdateDtoMock: UpdateUserDto = {
  id: baseMock.id,
  username: 'adminupdated',
  email: 'adminupdated@mail.com',
  name: 'Administrador Updated'
}