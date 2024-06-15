import { axiosInstance } from '@/api/api';
import { TODO_ENDPOINTS } from '@/constants';
import { ITodo, TUpdateTodoRequestData } from '@/types/Todo';

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
  await axiosInstance.delete<void>(`${TODO_ENDPOINTS.DELETE_TODO}/${todoId}`);
};

export const changeTodo = async (todo: TUpdateTodoRequestData): Promise<ITodo> => {
  const response = await axiosInstance.patch(`${TODO_ENDPOINTS.CHANGE_TODO}/${todo._id}`, todo);
  return response.data;
};
