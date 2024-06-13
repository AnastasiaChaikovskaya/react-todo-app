import { ITodo } from '@/types/Todo';
import { create } from 'zustand';

interface ITodosStore {
  todos: ITodo[];
  currentTodo: ITodo | null;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  setTodos: (todos: ITodo[]) => void;
  setTodo: (todo: ITodo) => void;
  addTodo: (todo: ITodo) => void;
}

const initState = {
  todos: [],
  currentTodo: null,
  isLoading: true,
};

const useTodosStore = create<ITodosStore>((set) => ({
  ...initState,
  setTodos: (todos: ITodo[]) => set((state) => ({ ...state, todos: todos })),
  setTodo: (todo: ITodo) => set((state) => ({ ...state, currentTodo: todo })),
  setLoading: (isLoading: boolean) => set((state) => ({ ...state, isLoading: isLoading })),
  addTodo: (todo: ITodo) => set((state) => ({ ...state, todos: [...state.todos, todo] })),
}));

export default useTodosStore;
