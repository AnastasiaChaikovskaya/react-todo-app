import { axiosInstance } from '@/api/api';
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from '@/constants';
import { ILoginResponse, IRegisterResponse, IUpdatePasswordRequest } from '@/types/AuthResponse';
import { User } from '@/types/User';

export type TRegisterRequestData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type TRefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export const login = async (requestData: { email: string; password: string }) => {
  const response = await axiosInstance.post<ILoginResponse>(AUTH_ENDPOINTS.LOGIN, requestData);
  return response.data;
};

export const register = async (requestData: TRegisterRequestData) => {
  const response = await axiosInstance.post<IRegisterResponse>(AUTH_ENDPOINTS.REGISTER, requestData);
  return response.data;
};

export const refreshToken = async (requesrData: { refreshToken: string }): Promise<TRefreshResponse> => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.REFRESH, requesrData);
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get<User>(USER_ENDPOINTS.GET_CURRENT_USER);
  return response.data;
};

export const updatePassword = async (requestData: IUpdatePasswordRequest): Promise<User> => {
  const response = await axiosInstance.post(USER_ENDPOINTS.UPDATE_PASSWORD, requestData);
  return response.data;
};
