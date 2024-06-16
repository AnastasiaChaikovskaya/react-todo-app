import { useToast } from '@/components/ui/use-toast';
import { TODOS_QUERY_KEY } from '@/constants/query-keys';
import { getTodos } from '@/servises/servises';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useTodos = () => {
  const { toast } = useToast();

  const { isLoading, isError, data } = useQuery({
    queryKey: [TODOS_QUERY_KEY.ALL_TODOS],
    queryFn: getTodos,
  });

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }
  }, [isError]);

  return { isLoading, data };
};
