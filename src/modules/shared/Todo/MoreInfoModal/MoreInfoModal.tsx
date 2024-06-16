import { useCallback, useMemo } from 'react';
import { useTodo } from '@/hooks/useTodo';
import useTodosStore from '@/store/TodosStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { reformatDate } from '@/helpers/formatData';
import { Skeleton } from '@/components/ui/skeleton';
import { useModal } from '@/hooks/useModal';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { CopyCheck, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditTodoMutation } from '@/quaries/edit-todo';
import { queryClient } from '@/api/api';
import { TODOS_QUERY_KEY } from '@/constants/query-keys';

const MoreInfoModal = () => {
  const { isOpen, toggleModal } = useModal('more-info');

  const setTodo = useTodosStore((state) => state.setTodo);
  const storeTodo = useTodosStore((state) => state.currentTodo);

  const { isLoading, data } = useTodo(storeTodo?._id as number);
  const { isPending, mutate } = useEditTodoMutation();

  const isToDoActive = useMemo(() => data && data.status === 'active', [data]);
  const isToDoCompleted = useMemo(() => data && data.status === 'completed', [data]);

  const handleUpdateTodoStatus = useCallback(() => {
    if (!data?._id) return;
    const updatedTodoStatus = isToDoActive ? 'completed' : 'active';
    mutate(
      { _id: data._id, status: updatedTodoStatus },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY.GET_SINGLE_TODO, data._id] });
          queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY.ALL_TODOS] });
        },
      },
    );
  }, [data, mutate]);

  const handleToggleModal = useCallback(() => {
    setTodo(null);
    toggleModal(!isOpen);
  }, [isOpen, setTodo, toggleModal]);

  return (
    <Dialog open={isOpen} onOpenChange={handleToggleModal}>
      <DialogContent className="rounded-md">
        <DialogHeader>
          {isLoading && !data && <Skeleton className="h-[20px] w-[300px] bg-stone-300" />}
          {data && !isLoading && <DialogTitle>{data.title}</DialogTitle>}
        </DialogHeader>
        <Separator className="bg-stone-300 h-[1px]" />
        {isLoading && !data && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-[20px] w-full bg-stone-300" />
            ))}
          </div>
        )}
        {data && !isLoading && (
          <DialogDescription className="max-h-[500px] overflow-y-auto">{data.description}</DialogDescription>
        )}
        <Separator className="bg-stone-300 h-[1px]" />
        {isLoading && !data && (
          <div className="flex items-end justify-between">
            <Skeleton className="w-32 h-8 bg-stone-300" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-[120px] h-4 bg-stone-300" />
              <Skeleton className="w-[120px] h-4 bg-stone-300" />
            </div>
          </div>
        )}
        {data && !isLoading && (
          <DialogFooter className="flex items-end justify-between">
            <div className="w-full">
              {(isToDoActive || isToDoCompleted) && (
                <Button
                  variant="ghost"
                  onClick={handleUpdateTodoStatus}
                  disabled={isPending}
                  className={cn(
                    'text-sm gap-2',
                    isToDoActive && 'bg-green-600 hover:bg-green-600/80',
                    isToDoCompleted && 'bg-orange-300 hover:bg-orange-300/80',
                  )}
                >
                  {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <CopyCheck className="w-4 h-4" />}

                  {data.status === 'active' ? 'Mark as completed' : 'Mark as active'}
                </Button>
              )}
            </div>
            <div className="flex flex-col items-start gap-1 shrink-0">
              <div className="flex items-center gap-1 text-stone-400">
                <span className="text-[12px]">Create At: {reformatDate(data.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1 text-stone-400">
                <span className="text-[12px]">Updated At: {reformatDate(data.updatedAt)}</span>
              </div>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MoreInfoModal;
