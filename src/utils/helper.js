export const trimTitle = (title) => {
  return title.trim();
};

export const shouldIncrementNextPage = (totalResults, currentPage) => {
  const totalPages = Math.ceil(totalResults / 10);
  return currentPage < totalPages;
};
