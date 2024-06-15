import { cn } from '@/lib/utils';
import { useMemo } from 'react';

type TTodoItemStatus = {
  status: 'active' | 'completed';
};

export const ToDoItemStatus = ({ status }: TTodoItemStatus) => {
  const isToDoCompleted = useMemo(() => status === 'completed', [status]);
  const statusText = useMemo(() => (isToDoCompleted ? 'Completed' : 'Active'), [isToDoCompleted]);
  return (
    <div className="flex items-center gap-2">
      <div className={cn('w-3.5 h-3.5 rounded-full bg-orange-300', isToDoCompleted && 'bg-green-600')} />
      <p className={cn('text-base text-orange-300', isToDoCompleted && 'text-green-600')}>{statusText}</p>
    </div>
  );
};
