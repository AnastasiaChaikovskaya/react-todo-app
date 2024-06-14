import { useToast } from '@/components/ui/use-toast';
import { TODOS_QUERY_KEY } from '@/constants/query-keys';
import { postTodo } from '@/servises/servises';
import useTodosStore from '@/store/TodosStore';
import { useMutation } from '@tanstack/react-query';

export const useTodoMutation = () => {
  const addTodo = useTodosStore((state) => state.addTodo);
  const { toast } = useToast();
  return useMutation({
    mutationKey: [TODOS_QUERY_KEY.POST_TODO],
    mutationFn: postTodo,
    onSuccess: (responseData) => {
      addTodo(responseData);
      toast({
        title: 'Your todo have been added',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'Your todo have not been added',
      });
    },
  });
};
