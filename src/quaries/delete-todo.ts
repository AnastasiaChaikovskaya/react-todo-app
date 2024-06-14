import { useToast } from '@/components/ui/use-toast';
import { TODOS_QUERY_KEY } from '@/constants/query-keys';
import { deleteTodo } from '@/servises/servises';
import useTodosStore from '@/store/TodosStore';
import { useMutation } from '@tanstack/react-query';

export const useDeleteTodoMutation = (id: number) => {
  const deleteTodoById = useTodosStore((state) => state.deleteTodoById);
  const { toast } = useToast();

  return useMutation({
    mutationKey: [TODOS_QUERY_KEY.DELETE_TODO, id],
    mutationFn: deleteTodo,
    onSuccess: () => {
      deleteTodoById(id);
      toast({
        title: 'Success',
        description: 'Your todo deleted',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Ooops :(',
        description: 'Something went wrong',
      });
    },
  });
};
