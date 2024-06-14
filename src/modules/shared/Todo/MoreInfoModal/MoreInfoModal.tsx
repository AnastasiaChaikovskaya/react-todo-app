import React, { FC, ReactNode } from 'react';
import { useTodo } from '@/hooks/useTodo';
import useTodosStore from '@/store/TodosStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { reformatDate } from '@/helpers/formatData';
import { ITodo } from '@/types/Todo';

interface IMoreInfoModal {
  trigger: ReactNode;
  todoId: number;
}

const MoreInfoModal: FC<IMoreInfoModal> = ({ trigger, todoId }) => {
  const { isLoading } = useTodo(todoId);
  const todo = useTodosStore((state) => state.currentTodo) as ITodo;

  const createAt = todo ? reformatDate(todo.createdAt) : '2024-06-12T17:52:50.286Z';
  const updateAt = todo ? reformatDate(todo.updatedAt) : '2024-06-12T17:52:50.286Z';

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {!isLoading && (
        <DialogContent className="rounded-md">
          <DialogHeader>
            <DialogTitle>{todo?.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{todo?.description}</DialogDescription>
          <DialogFooter>
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex gap-2 items-center">
                <Input type="checkbox" className="h-4 w-4" />
                {todo?.status === 'active' ? <p className="text-xs">In process</p> : <p className="text-xs">Done</p>}
              </div>
              <div className="flex flex-col gap-1 items-end">
                <p className="text-xs">{`Crate at: ${createAt}`}</p>
                <p className="text-xs">{`Update at: ${updateAt}`}</p>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default MoreInfoModal;
