import React from 'react';
import { useTodos } from '@/hooks/useTodos';
import Todo from '@/modules/shared/Todo/Todo';
import useTodosStore from '@/store/TodosStore';
import { Loader, PlusIcon, SquareCheckBig } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddTodoModal from '@/modules/shared/Todo/AddTodoModal';

function TodosPage() {
  const { isLoading } = useTodos();
  const todos = useTodosStore((store) => store.todos);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">You don't have any tasks now</h1>
            <h2 className="text-xl font-normal">You can add them!</h2>
          </div>
          <AddTodoModal trigger={<Button variant={'default'}>Add your first todo</Button>} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row gap-2 items-center">
        <h1 className="text-2xl md:text-5xl text-stone-950 font-bold">Your tasks!</h1>
        <SquareCheckBig className="h-6 w-6 text-stone-950 md:h-10 md:w-10" />
      </div>
      <div className="flex flex-col items-center gap-3 pt-11 w-full md:flex-row md:flex-wrap md:items-start md:justify-center m-auto">
        <AddTodoModal
          trigger={
            <button className="flex items-center justify-center w-[300px] h-[300px] bg-stone-900 rounded-lg opacity-55">
              <PlusIcon className="h-[70px] w-[70px] text-stone-950" />
            </button>
          }
        />
        {todos.map((todo) => (
          <Todo todo={todo} key={todo._id} />
        ))}
      </div>
    </div>
  );
}

export default TodosPage;
