export const getTodoStatus = (status: 'active' | 'completed') => {
  return status === 'active' ? false : true;
};
