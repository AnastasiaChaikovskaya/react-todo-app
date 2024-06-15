import { ITodo } from '@/types/Todo';
import { create } from 'zustand';

interface ITodosStore {
  todos: ITodo[];
  currentTodo: ITodo | null;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  setTodos: (todos: ITodo[]) => void;
  setTodo: (todo: ITodo | null) => void;
  addTodo: (todo: ITodo) => void;
  deleteTodoById: (todoId: number) => void;
  changeTodo: (todo: ITodo) => void;
}

const initState = {
  todos: [],
  currentTodo: null,
  isLoading: true,
};

const useTodosStore = create<ITodosStore>((set) => ({
  ...initState,
  setTodos: (todos: ITodo[]) => set((state) => ({ ...state, todos: todos })),
  setTodo: (todo: ITodo | null) => set((state) => ({ ...state, currentTodo: todo })),
  setLoading: (isLoading: boolean) => set((state) => ({ ...state, isLoading: isLoading })),
  addTodo: (todo: ITodo) => set((state) => ({ ...state, todos: [...state.todos, todo] })),
  deleteTodoById: (id: number) =>
    set((state) => ({
      ...state,
      todos: state.todos.filter((todo) => todo._id !== id),
    })),
  changeTodo: (todoChange: ITodo) =>
    set((state) => ({
      ...state,
      todos: state.todos.map((todo) => {
        if (todoChange._id === todo._id) {
          return todoChange;
        }
        return todo;
      }),
    })),
}));

export default useTodosStore;
