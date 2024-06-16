import { User } from './User';

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface IRegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IUpdatePasswordRequest {
  password: string;
  newPassword: string;
}
