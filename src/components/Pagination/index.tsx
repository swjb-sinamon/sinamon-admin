import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const PaginationWrapper = styled.ul`
  display: flex;
  flex-direction: row;

  justify-content: center;
`;

const PaginationItem = styled.li<{ active?: boolean }>`
  list-style-type: none;

  border-radius: 3px;
  border: 1px solid var(--color-gray);

  background-color: ${(props) => (props.active ? 'var(--color-button)' : 'white')};
  color: ${(props) => (props.active ? 'white' : 'black')};

  font-size: 14px;

  padding: 0.35rem 0.75rem;

  cursor: pointer;

  &:hover {
    background-color: var(--color-button-hover);
    color: white;
  }

  &:first-child {
    margin-right: 5px;
  }

  &:last-child {
    margin-left: 5px;
  }
`;

interface PaginationProps {
  readonly onPrevClick: React.MouseEventHandler;
  readonly onNextClick: React.MouseEventHandler;
  readonly pageNumber: number[];
  readonly offset: number;
  readonly setOffset: Dispatch<SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  onPrevClick,
  onNextClick,
  pageNumber,
  offset,
  setOffset
}) => {
  return (
    <PaginationWrapper>
      <PaginationItem onClick={onPrevClick}>
        <FontAwesomeIcon icon={faAngleLeft} /> 이전
      </PaginationItem>
      {pageNumber.map((pageNum) => (
        <PaginationItem
          key={pageNum}
          onClick={() => setOffset(pageNum)}
          active={pageNum === offset}
        >
          {pageNum}
        </PaginationItem>
      ))}
      <PaginationItem onClick={onNextClick}>
        다음 <FontAwesomeIcon icon={faAngleRight} />
      </PaginationItem>
    </PaginationWrapper>
  );
};

export default Pagination;
