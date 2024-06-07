import { User } from './User';

export interface ILoginResponse {
  token: string;
  user: User;
}

export interface IRegisterResponse {
  token: string;
  user: User;
}
