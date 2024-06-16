export const USER_ENDPOINTS = {
  GET_CURRENT_USER: '/me',
  UPDATE_PASSWORD: '/update-password',
} as const;

export const TODO_ENDPOINTS = {
  GET_TODOS: '/todos',
  GET_TODO: '/todo',
  POST_TODO: '/todo',
  DELETE_TODO: '/todo',
  CHANGE_TODO: '/todo',
} as const;

export const AUTH_ENDPOINTS = {
  LOGIN: '/sign-in',
  REGISTER: '/sign-up',
  REFRESH: '/refresh',
} as const;
