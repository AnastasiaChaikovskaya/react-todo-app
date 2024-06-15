import React, { useCallback } from 'react';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteTodoMutation } from '@/quaries/delete-todo';
import { Loader } from 'lucide-react';
import { useModal } from '@/hooks/useModal';
import useTodosStore from '@/store/TodosStore';

const DeleteModal = () => {
  const { isOpen, toggleModal } = useModal('delete-to-do');

  const storeTodo = useTodosStore((store) => store.currentTodo);
  const setTodo = useTodosStore((store) => store.setTodo);

  const { mutate, isPending } = useDeleteTodoMutation();

  const handleToggleModal = useCallback(() => {
    setTodo(null);
    toggleModal(!isOpen);
  }, [isOpen, setTodo, toggleModal]);

  const handleDeleteTodo = () => {
    if (!storeTodo?._id) return;
    mutate(storeTodo._id, {
      onSuccess: () => {
        handleToggleModal();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle>Delete Todo</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Do you want to delete <span className="font-semibold">{storeTodo?.title}</span>? This action is permanent.
          Proceed?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" onClick={handleToggleModal}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleDeleteTodo} className="gap-2 bg-red-800 hover:bg-red-800/80" disabled={isPending}>
            {isPending && <Loader className="w-4 h-4 animate-spin" />}
            Yes, delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
