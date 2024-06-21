export const getPages = (count: number) => {
  const pages: number[] = [];

  for (let i = 0; i < count; i++) {
    pages.push(i + 1);
  }
  console.log(pages);

  return pages;
};
