export interface ITodo {
  todoId: number;
  userId: number;
  todoTitle: string;
  todoDescription: string;
  completed: boolean;
  overdue: boolean;
  hasReminder: boolean;
  scheduledTime: string | null;
}
