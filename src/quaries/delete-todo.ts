import { queryClient } from '@/api/api';
import { useToast } from '@/components/ui/use-toast';
import { TODOS_QUERY_KEY } from '@/constants/query-keys';
import { deleteTodo } from '@/servises/servises';
import { useMutation } from '@tanstack/react-query';

export const useDeleteTodoMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: [TODOS_QUERY_KEY.DELETE_TODO],
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY.ALL_TODOS] });
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
