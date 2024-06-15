import { useToast } from '@/components/ui/use-toast';
import { TODOS_QUERY_KEY } from '@/constants/query-keys';
import { getTodos } from '@/servises/servises';
import useTodosStore from '@/store/TodosStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useTodos = () => {
  const setTodos = useTodosStore((state) => state.setTodos);
  const setLoading = useTodosStore((state) => state.setLoading);
  const { toast } = useToast();

  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: [TODOS_QUERY_KEY.ALL_TODOS],
    queryFn: getTodos,
  });

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      setTodos(data);
    }

    if (isError) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }
  }, [isError, isSuccess, setTodos, setLoading, data, toast]);

  return { isLoading };
};
