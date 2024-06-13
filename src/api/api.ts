import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

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

// axiosInstance.interceptors.response.use();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 15000,
    },
  },
});
