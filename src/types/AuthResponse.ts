import { User } from './User';

export interface IAuthResponse {
  accessToken: string;
  user: User;
}

export interface IRegisterResponse {
  accessToken: string;
  user: User;
}

export interface IGetMeResponse {
  user: User;
}
