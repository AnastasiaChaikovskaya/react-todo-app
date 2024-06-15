import { useToast } from '@/components/ui/use-toast';
import { TODOS_QUERY_KEY } from '@/constants/query-keys';
import { getTodo } from '@/servises/servises';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useTodo = (todoId: number) => {
  const { toast } = useToast();
  const { isError, isLoading, data } = useQuery({
    queryKey: [TODOS_QUERY_KEY.GET_SINGLE_TODO, todoId],
    queryFn: () => getTodo(todoId),
    enabled: !!todoId,
    staleTime: 0,
  });

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
    }
  }, [isError]);

  return { isLoading, data };
};
