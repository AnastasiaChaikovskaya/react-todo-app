import React, { FC, useCallback } from 'react';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TUpdateTodoRequestData } from '@/types/Todo';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditTodoSchema } from '@/schema';
import { TEditTodoForm } from '@/types/EditTodoForm';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getTodoStatus } from '@/helpers/getTodoStatus';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useEditTodoMutation } from '@/quaries/edit-todo';
import useTodosStore from '@/store/TodosStore';
import { useModal } from '@/hooks/useModal';
import { Loader } from 'lucide-react';

const EditTodoModal: FC = () => {
  const { isOpen, toggleModal } = useModal('edit-to-do');
  const setTodo = useTodosStore((store) => store.setTodo);
  const storeTodo = useTodosStore((store) => store.currentTodo);
  const { isPending, mutate } = useEditTodoMutation();
  const form = useForm<TEditTodoForm>({
    mode: 'onBlur',
    resolver: zodResolver(EditTodoSchema),
    defaultValues: {
      title: storeTodo?.title || '',
      description: storeTodo?.description || '',
      status: getTodoStatus(storeTodo?.status || 'active'),
    },
  });

  const hasError = Object.keys(form.formState.errors).length !== 0;
  const hasDirtyFields = Object.keys(form.formState.dirtyFields).length !== 0;

  const isSubmitButtonDisabled = hasError || isPending || !hasDirtyFields;

  const handleSubmit = (formData: TEditTodoForm) => {
    if (!storeTodo) return;
    const requestObject: TUpdateTodoRequestData = {
      ...formData,
      _id: storeTodo._id,
      status: formData.status ? 'completed' : 'active',
    };
    mutate(requestObject, {
      onSuccess: () => {
        handleToggleModal();
      },
    });
  };

  const handleToggleModal = useCallback(() => {
    setTodo(null);
    toggleModal(!isOpen);
  }, [isOpen, setTodo, toggleModal]);

  return (
    <Dialog open={isOpen} onOpenChange={handleToggleModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} isErrored={!!form.formState.errors.title} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                      <p>{field.value ? 'Done' : 'In process'}</p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-3">
              <DialogClose asChild>
                <Button variant="ghost" onClick={handleToggleModal}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitButtonDisabled} className="gap-2">
                {isPending && <Loader className="w-4 h-4 animate-spin" />}
                Update & Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoModal;
