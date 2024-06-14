import React, { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import MoreInfoModal from './MoreInfoModal/MoreInfoModal';
import DeleteModal from './DeleteModal';

interface IEditDropDownProps {
  todoId: number;
}

const EditDropDown: FC<IEditDropDownProps> = ({ todoId }) => {
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
          <MoreInfoModal todoId={todoId} trigger={<Link to={'/todos'}>More info</Link>} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DeleteModal
            trigger={
              <Link to={'/todos'} className="flex flex-row gap-2 cursor-pointer">
                <TrashIcon className="h-[12px] w-[12px] text-red-900" /> <p className="text-red-900">Delete</p>
              </Link>
            }
            id={todoId}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditDropDown;
