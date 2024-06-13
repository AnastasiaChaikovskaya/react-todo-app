import { axiosInstance } from '@/api/api';
import { TODO_ENDPOINTS } from '@/constants';
import { ITodo } from '@/types/Todo';

export const getTodos = async (): Promise<ITodo[]> => {
  const response = await axiosInstance.get(TODO_ENDPOINTS.GET_TODOS);

  return response.data;
};

export const getTodo = async (todoId: number): Promise<ITodo> => {
  const response = await axiosInstance.get(`${TODO_ENDPOINTS.GET_TODO}/${todoId}`);

  return response.data;
};

export const postTodo = async (requestData: { title: string; description: string }): Promise<ITodo> => {
  const response = await axiosInstance.post(TODO_ENDPOINTS.POST_TODO, requestData);
  return response.data;
};
