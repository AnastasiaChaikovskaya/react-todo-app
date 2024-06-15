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
import { ITodo, TUpdateTodoRequestData } from '@/types/Todo';
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

interface IEditTodoModalProps {
  trigger: ReactNode;
  todo: ITodo;
}

const EditTodoModal: FC<IEditTodoModalProps> = ({ trigger, todo }) => {
  const { isPending, mutate } = useEditTodoMutation();
  const form = useForm<TEditTodoForm>({
    mode: 'onBlur',
    resolver: zodResolver(EditTodoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description,
      status: getTodoStatus(todo.status),
    },
  });
  const hasError = Object.keys(form.formState.errors).length !== 0;

  const handleSubmit = (formData: TEditTodoForm) => {
    const requestObject: TUpdateTodoRequestData = {
      ...formData,
      _id: todo._id,
      status: formData.status ? 'completed' : 'active',
    };
    mutate(requestObject);
    console.log(requestObject);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
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
            <DialogFooter>
              <DialogClose asChild>
                <Button>Clean</Button>
              </DialogClose>
              <Button type="submit" disabled={hasError || isPending}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoModal;
