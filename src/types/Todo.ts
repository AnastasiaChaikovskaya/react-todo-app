export interface ITodo {
  _id: number;
  title: string;
  description: string;
  status: 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface ITodosResponse {
  id: number;
  username: string;
  todos: ITodo[];
}
