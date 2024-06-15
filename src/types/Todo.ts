export interface ITodo {
  _id: number;
  title: string;
  description: string;
  status: 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export type TUpdateTodoRequestData = Required<Pick<ITodo, '_id'>> &
  Partial<Omit<ITodo, '_id' | 'createdAt' | 'updatedAt'>>;

export interface ITodosResponse {
  id: number;
  username: string;
  todos: ITodo[];
}
