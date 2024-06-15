import { TODOS_QUERY_KEY } from '@/constants/query-keys';
import { changeTodo } from '@/servises/servises';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { queryClient } from '@/api/api';

export const useEditTodoMutation = () => {
  const { toast } = useToast();
  return useMutation({
    mutationKey: [TODOS_QUERY_KEY.PATCH_TODO],
    mutationFn: changeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TODOS_QUERY_KEY.ALL_TODOS],
      });
      toast({
        title: 'Success',
        description: 'You have changed your todo',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Warning',
        description: 'Something went wrong(',
      });
    },
  });
};
