import { axiosInstance } from '@/api/api';
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from '@/constants';
import { ILoginResponse, IRegisterResponse } from '@/types/AuthResponse';
import { User } from '@/types/User';

export const login = async (requestData: { email: string; password: string }) => {
  const response = await axiosInstance.post<ILoginResponse>(AUTH_ENDPOINTS.LOGIN, requestData);
  return response.data;
};

export const register = async (requestData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post<IRegisterResponse>(AUTH_ENDPOINTS.REGISTER, requestData);
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get<User>(USER_ENDPOINTS.GET_CURRENT_USER);
  return response.data;
};
