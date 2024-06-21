import {
  Pagination,
  PaginationItem,
  PaginationContent,
  PaginationLink,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination';
import { getPages } from '@/helpers/getPages';
import { ITodo } from '@/types/Todo';
import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  todos: ITodo[];
}

const PaginationComponent: FC<PaginationProps> = ({ todos }) => {
  const [serarchParams, setSearchParams] = useSearchParams('?page=1&perPage=11');
  const perPage = serarchParams.get('perPage') ?? 11;
  const currentPage = serarchParams.get('page') ?? 1;
  const count = Math.ceil(todos.length / +perPage);
  const pages = getPages(count);
  const isPrevDisable = +currentPage === 1;
  const isNextDisable = +currentPage === todos.length;

  const handleChoosePage = (page: number) => {
    serarchParams.set('page', page.toString());
    setSearchParams(serarchParams);
  };

  const handleNextPage = () => {
    serarchParams.set('page', (+currentPage + 1).toString());
    setSearchParams(serarchParams);
  };

  const handlePrevPage = () => {
    serarchParams.set('page', (+currentPage - 1).toString());
    setSearchParams(serarchParams);
  };

  useEffect(() => {
    setSearchParams(`?page=${currentPage}&perPage=11`);
  }, [currentPage]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevPage} disabled={isPrevDisable} />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink onClick={() => handleChoosePage(page)} isActive={currentPage === page}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} disabled={isNextDisable} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
