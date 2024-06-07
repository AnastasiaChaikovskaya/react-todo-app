import { axiosInstance } from '@/api/api';
import { TODOS, USERS } from '@/constants';
import { ITodo } from '@/types/Todo';

export const getTodos = async (userId: string): Promise<ITodo[]> => {
  const response = await axiosInstance.get(`${USERS.GET}/${userId}/${TODOS.GET}`);

  return response.data;
};
