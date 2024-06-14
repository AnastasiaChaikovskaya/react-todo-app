import React, { FC, ReactNode } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteTodoMutation } from '@/quaries/delete-todo';
import { Loader } from 'lucide-react';

interface IDeleteModalProps {
  trigger: ReactNode;
  id: number;
}

const DeleteModal: FC<IDeleteModalProps> = ({ trigger, id }) => {
  const { mutate, isPending } = useDeleteTodoMutation(id);

  const handleDeleteTodo = (todoId: number) => {
    mutate(todoId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle>Delete Todo</DialogTitle>
        </DialogHeader>
        <DialogDescription>Are you sure you want to delete a task?</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-red-800">No</Button>
          </DialogClose>
          <Button onClick={() => handleDeleteTodo(id)} className="gap-2">
            {isPending && <Loader className="h-4 w-4" />}Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
