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

export const deleteTodo = async (todoId: number) => {
  const response = await axiosInstance.delete(`${TODO_ENDPOINTS.DELETE_TODO}/${todoId}`);
  return response.data;
};

export const changeTodo = async (todoId: number): Promise<ITodo> => {
  const response = await axiosInstance.patch(`${TODO_ENDPOINTS.CHANGE_TODO}/${todoId}`);
  return response.data;
};
