import { IEntityBase, IEntityBaseId } from "./entity.interface";

export interface IUser {
  id: IEntityBaseId;
  username: string;
  email: string;
  password?: string;
}

export interface IUserEntity extends IUser, IEntityBase { }
