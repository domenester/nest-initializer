import { UserEntity } from '../entities'

export interface AuthLoginResponse {
  access_token: string;
  user: UserEntity
}