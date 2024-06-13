import { format } from 'date-fns';

export const reformatDate = (dateString: string) => {
  const date = new Date(dateString);
  console.log(format(date, 'yyyy-MM-dd'));
  return format(date, 'yyyy-MM-dd');
};
