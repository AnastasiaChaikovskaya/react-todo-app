import { axiosInstance } from '@/api/api';
import { LOGIN, USERS } from '@/constants';
import { IAuthResponse, IGetMeResponse, IRegisterResponse } from '@/types/AuthResponse';
import { AxiosResponse } from 'axios';

export const login = (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
  return axiosInstance.post<IAuthResponse>(LOGIN.POST, { email, password });
};

export const register = (
  username: string,
  email: string,
  password: string,
): Promise<AxiosResponse<IRegisterResponse>> => {
  return axiosInstance.post<IRegisterResponse>(USERS.POST, { username, email, password });
};

export const getMe = (): Promise<AxiosResponse<IGetMeResponse>> => {
  return axiosInstance.get<IGetMeResponse>(USERS.GET);
};
