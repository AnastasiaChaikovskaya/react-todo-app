import { FC } from 'react';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { TAddTodoForm } from '@/types/AddTodoForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddTodoSchema } from '@/schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTodoMutation } from '@/quaries/post-todo';
import { CalendarIcon, Loader } from 'lucide-react';
import { useModal } from '@/hooks/useModal';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { ITodo } from '@/types/Todo';

const AddTodoModal: FC = () => {
  const { isOpen, toggleModal } = useModal('add-to-do');
  const { isPending, mutate } = useTodoMutation();
  const form = useForm<TAddTodoForm>({
    mode: 'onBlur',
    resolver: zodResolver(AddTodoSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleSubmit = (formData: TAddTodoForm) => {
    const { title, description, dataWhen } = formData;
    mutate(
      { title, description },
      {
        onSuccess: (data: ITodo) => {
          console.log(data);
          toggleModal(!isOpen);
          localStorage.setItem(`${data?._id || 0}`, format(dataWhen, 'PPP'));
        },
      },
    );
  };

  const hasErrors = Object.keys(form.formState.errors).length !== 0;

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle>Add new todo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Todo title"
                      isErrored={!!form.formState.errors.title}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Todo description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Write todo description" disabled={isPending} />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataWhen"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pick date when you want to do this task</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[280px] justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, 'PPP') : <span>Pick date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date <= new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-row gap-3 justify-end">
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button variant={'default'} type="submit" disabled={hasErrors || isPending} className="gap-2">
                {isPending && <Loader className="w-4 h-4 animate-spin" />}Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoModal;
