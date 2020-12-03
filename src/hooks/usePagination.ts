const usePagination = (count: number, limit: number): number[] => {
  const pageNumber = [];
  const maxPage = Math.ceil(count / limit);
  for (let i = 1; i <= maxPage; i += 1) {
    pageNumber.push(i);
  }

  return pageNumber;
};

export default usePagination;
