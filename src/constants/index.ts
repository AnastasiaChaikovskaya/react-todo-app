export const USER_ENDPOINTS = {
  GET_CURRENT_USER: '/me',
} as const;

export const TODOS = {
  GET: '/todos',
} as const;

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
} as const;
