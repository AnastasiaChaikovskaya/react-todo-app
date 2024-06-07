import { PlusIcon } from 'lucide-react';
import React from 'react';

const TodoSkeleton = () => {
  return (
    <div className="flex items-center justify-center w-[300px] h-[300px] bg-stone-900 rounded-lg opacity-55">
      <PlusIcon className="h-[70px] w-[70px] text-stone-950" />
    </div>
  );
};

export default TodoSkeleton;
