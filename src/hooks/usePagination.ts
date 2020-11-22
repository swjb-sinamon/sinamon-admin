import { useState } from 'react';

const usePagination = (data: any, limit: number) => {
  const [offset, setOffset] = useState(1);

  const indexOfLastPost = offset * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPageData = data.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumber = [];
  const maxPage = Math.ceil(data.length / limit);
  for (let i = 1; i <= maxPage; i += 1) {
    pageNumber.push(i);
  }

  return {
    offset,
    setOffset,
    currentPageData,
    pageNumber
  };
};

export default usePagination;
