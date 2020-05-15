import { UserEntity, EntityBase, RoleEntity } from '../../src/entities'

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

export const userMock: UserEntity = {
  ...baseMock,
  username: 'admin',
  email: 'admin@mail.com',
  roles: [roleMock]
}