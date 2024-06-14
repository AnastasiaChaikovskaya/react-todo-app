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
import { ITodo } from '@/types/Todo';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditTodoSchema } from '@/schema';
import { TEditTodoForm } from '@/types/EditTodoForm';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getTodoStatus } from '@/helpers/getTodoStatus';

interface IEditTodoModalProps {
  trigger: ReactNode;
  todo: ITodo;
}

const EditTodoModal: FC<IEditTodoModalProps> = ({ trigger, todo }) => {
  const form = useForm<TEditTodoForm>({
    mode: 'onBlur',
    resolver: zodResolver(EditTodoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description,
      completed: getTodoStatus(todo.status),
    },
  });

  const handleSumit = (formData: TEditTodoForm) => {};

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form>
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} isErrored={!!form.formState.errors.title} />
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="completed"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <input type="checkbox" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoModal;
