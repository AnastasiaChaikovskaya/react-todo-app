import React, { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface IEditDropDown {
  todoId: number;
}

const EditDropDown: FC<IEditDropDown> = ({ todoId }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon className="text-stone-100 shrink-0 h- w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex flex-row gap-2 cursor-pointer">
          <PencilIcon className="h-[12px] w-[12px]" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row gap-2 cursor-pointer">
          <EllipsisIcon className="h-[12px] w-[12px]" />
          <NavLink to={`/todos/${todoId}`}>More info</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row gap-2 cursor-pointer">
          <TrashIcon className="h-[12px] w-[12px] text-red-900" /> <p className="text-red-900">Delete</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditDropDown;
