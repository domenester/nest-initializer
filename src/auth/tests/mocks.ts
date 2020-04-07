import { UserEntity } from "src/users/user.entity";

export const loginMock: UserEntity = {
  id: 1,
  createdBy: null,
  updatedBy: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  username: 'admin',
  email: 'admin@mail.com',
}