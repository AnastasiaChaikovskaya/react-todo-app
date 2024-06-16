import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
import { useRefreshToken } from '@/quaries/refresh';

export const axiosInstance = axios.create({
  baseURL: 'https://todo-3sid.onrender.com/api/v1',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken') as string;
    const { mutate, data } = useRefreshToken();

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      mutate({ refreshToken });

      originalRequest.headers['Authorization'] = `Bearer ${data?.accessToken}`;

      return axiosInstance(originalRequest);
    }
  },
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 15000,
    },
  },
});
