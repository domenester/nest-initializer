import { UserEntity } from "../entities";

export interface IAuthLoginResponse {
  access_token: string;
  user: UserEntity
}