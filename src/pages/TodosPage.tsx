import Todo from '@/modules/shared/Todo/Todo';
import TodoSkeleton from '@/modules/shared/Todo/TodoSkeleton';
import React from 'react';

const todo = {
  todoId: 1,
  userId: 1,
  todoTitle: 'Todo 1',
  todoDescription: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  completed: true,
  overdue: false,
  hasReminder: false,
  scheduledTime: null,
};

function TodosPage() {
  return (
    <div className="flex flex-col items-center gap-3 pt-11 w-full md:flex-row md:flex-wrap md:items-start md:justify-center">
      <TodoSkeleton />
      <Todo todo={todo} />
    </div>
  );
}

export default TodosPage;
