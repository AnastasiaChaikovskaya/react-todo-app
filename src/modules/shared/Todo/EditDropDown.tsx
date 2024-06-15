import React, { FC, useCallback } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useModal } from '@/hooks/useModal';
import { ITodo } from '@/types/Todo';
import useTodosStore from '@/store/TodosStore';

type TEditDropDownProperties = {
  todo: ITodo;
};

const EditDropDown: FC<TEditDropDownProperties> = ({ todo }) => {
  const setTodo = useTodosStore((store) => store.setTodo);
  const { openModal: openEditModal } = useModal('edit-to-do');
  const { openModal: openDeleteModal } = useModal('delete-to-do');
  const { openModal: openMoreInfoModal } = useModal('more-info');

  const handleOpenEditModal = useCallback(() => {
    setTodo(todo);
    openEditModal();
  }, [todo, openEditModal, setTodo]);

  const handleOpenDeleteModal = useCallback(() => {
    setTodo(todo);
    openDeleteModal();
  }, [openDeleteModal, setTodo, todo]);

  const handleOpenMoreInfoModal = useCallback(() => {
    setTodo(todo);
    openMoreInfoModal();
  }, [openMoreInfoModal, setTodo, todo]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon className="text-stone-100 shrink-0 h-5 w-5 relative top-[-2px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleOpenEditModal} className="flex flex-row gap-2 cursor-pointer">
          <PencilIcon className="h-3 w-3" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row gap-2 cursor-pointer" onClick={handleOpenMoreInfoModal}>
          <EllipsisIcon className="h-3 w-3" />
          More
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-800 flex flex-row gap-2 cursor-pointer focus:text-red-800"
          onClick={handleOpenDeleteModal}
        >
          <TrashIcon className="h-3 w-3" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditDropDown;
