import { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ITodo } from '@/types/Todo';
import { cn } from '@/lib/utils';
import EditDropDown from './EditDropDown';
import { ListTodo } from 'lucide-react';
import { ToDoItemStatus } from './TodoItemStatus';

interface ITodoProps {
  todo: ITodo;
}

const Todo: FC<ITodoProps> = ({ todo }) => {
  const { title, description, status } = todo;
  return (
    <Card className="flex flex-col max-w-[300px] min-h-[300px] min-w-[300px] max-h[300px] overflow-hidden shadow-md bg-stone-100">
      <CardHeader className="flex flex-row items-center justify-between bg-stone-900 rounded-t-lg">
        <div className="flex gap-2 items-center max-w-[240px]">
          <ListTodo className="text-stone-100 relative" />
          <h2 className={cn('text-xl text-stone-100 truncate')}>{title}</h2>
        </div>

        <EditDropDown todo={todo} />
      </CardHeader>
      <CardContent className="py-4 flex-1">
        <p className="text-stone-950 text-sm md:text-base break-words line-clamp-6">{description}</p>
      </CardContent>
      <CardFooter className="flex gap-2 items-center justify-start">
        <ToDoItemStatus status={status} />
      </CardFooter>
    </Card>
  );
};

export default Todo;
