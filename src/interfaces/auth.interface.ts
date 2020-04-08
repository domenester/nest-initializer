import { UserEntity } from "../users/user.entity";

export interface IAuthLoginResponse {
  access_token: string;
  user: UserEntity
}