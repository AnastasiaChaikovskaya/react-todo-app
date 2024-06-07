import React, { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ITodo } from '@/types/Todo';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import EditDropDown from './EditDropDown';

interface ITodoProps {
  todo: ITodo;
}

const Todo: FC<ITodoProps> = ({ todo }) => {
  const { todoTitle, todoDescription, completed, todoId } = todo;
  return (
    <Card className="max-w-[300px] max-h[300px] space-y-6 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between bg-stone-900 rounded-t-lg">
        <h2 className={cn('text-xl text-stone-100 md:text-2xl', { 'line-through text-stone-500': completed })}>
          {todoTitle}
        </h2>
        <EditDropDown todoId={todoId} />
      </CardHeader>
      <CardContent className="py-0">
        <p className="text-stone-950 text-xs md:text-sm break-words">{todoDescription}</p>
      </CardContent>
      <CardFooter className="flex gap-2 items-center justify-start">
        <Input type="checkbox" className="w-[16px] h-[16px]" />
        {completed ? (
          <p className="text-stone-950 text-sm">Done</p>
        ) : (
          <p className="text-stone-950 text-sm">In process</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default Todo;
