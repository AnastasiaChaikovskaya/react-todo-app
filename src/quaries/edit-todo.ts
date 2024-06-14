import { TODOS_QUERY_KEY } from '@/constants/query-keys';
import { changeTodo } from '@/servises/servises';
import { useMutation } from '@tanstack/react-query';

import useTodosStore from '@/store/TodosStore';
import { useToast } from '@/components/ui/use-toast';

export const useEditTodoMutation = (id: number) => {
  const changeTodoStore = useTodosStore((state) => state.changeTodo);
  const { toast } = useToast();
  return useMutation({
    mutationKey: [TODOS_QUERY_KEY.PATCH_TODO, id],
    mutationFn: changeTodo,
    onSuccess: (responseData) => {
      changeTodoStore(responseData);
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
