import { useToast } from '@/components/ui/use-toast';
import { TODOS_QUERY_KEY } from '@/constants/query-keys';
import { getTodo } from '@/servises/servises';
import useTodosStore from '@/store/TodosStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useTodo = (todoId: number) => {
  const setCurrentTodo = useTodosStore((state) => state.setTodo);
  const { toast } = useToast();
  const { isSuccess, isError, isLoading, data } = useQuery({
    queryKey: [TODOS_QUERY_KEY.GET_SINGLE_TODO, todoId],
    queryFn: () => getTodo(todoId),
  });

  useEffect(() => {
    if (isSuccess) {
      setCurrentTodo(data);
    }

    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
    }
  }, [isSuccess, isError, data, setCurrentTodo]);

  return { isLoading };
};
