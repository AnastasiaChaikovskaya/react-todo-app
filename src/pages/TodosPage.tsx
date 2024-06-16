import { useTodos } from '@/hooks/useTodos';
import Todo from '@/modules/shared/Todo/Todo';
import { Frown, PlusIcon, SquareCheckBig } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddTodoModal from '@/modules/shared/Todo/AddTodoModal';
import { useModal } from '@/hooks/useModal';
import { AddToDoButton } from '@/modules/shared/Todo/AddTodoButton';
import EditTodoModal from '@/modules/shared/Todo/EditTodoModal';
import DeleteModal from '@/modules/shared/Todo/DeleteModal';
import MoreInfoModal from '@/modules/shared/Todo/MoreInfoModal/MoreInfoModal';
import { Skeleton } from '@/components/ui/skeleton';

function TodosPage() {
  const { isOpen, openModal } = useModal('add-to-do');
  const { isOpen: isEditOpen } = useModal('edit-to-do');
  const { isOpen: isDeleteOpen } = useModal('delete-to-do');
  const { isOpen: isMoreInfoOpen } = useModal('more-info');

  const { isLoading, data } = useTodos();

  const hasTodos = data && data.length > 0;

  return (
    <>
      <div className="flex gap-2 items-center">
        <SquareCheckBig className=" relative top-1 h-6 w-6 text-stone-950 md:h-10 md:w-10" />
        <h1 className="text-2xl md:text-5xl text-stone-950 font-bold">Your tasks</h1>
      </div>
      {isLoading && !hasTodos && (
        <div className="grid grid-cols-1 gap-y-5 self-center md:grid-cols-2 md:gap-x-5 lg:grid-cols-3 lg:gap-x-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="w-[300px] h-[300px] bg-stone-300" />
          ))}
        </div>
      )}
      {hasTodos && !isLoading && (
        <div className="grid grid-cols-1 gap-y-5 self-center md:grid-cols-2 md:gap-x-5 lg:grid-cols-3 lg:gap-x-6">
          <AddToDoButton onClick={openModal} />
          {hasTodos && data.map((todo) => <Todo todo={todo} key={todo._id} />)}
        </div>
      )}
      {!hasTodos && !isLoading && (
        <div className="flex flex-col h-80 items-center justify-center gap-4">
          <Frown className="w-10 h-10" />
          <h1 className="text-3xl font-bold">You don't have any tasks now</h1>
          <Button variant="default" className="flex items-center gap-2" onClick={openModal}>
            <PlusIcon className="w-4 h-4" />
            Add new To Do
          </Button>
        </div>
      )}
      {isOpen && <AddTodoModal />}
      {isEditOpen && <EditTodoModal />}
      {isDeleteOpen && <DeleteModal />}
      {isMoreInfoOpen && <MoreInfoModal />}
    </>
  );
}

export default TodosPage;
