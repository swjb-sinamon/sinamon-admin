import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SCREEN_SIZE from '../../styles/screen-size';

const PaginationWrapper = styled.ul`
  display: flex;
  flex-direction: row;

  justify-content: center;
  flex-wrap: wrap;

  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    justify-content: normal;
  }
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
  readonly onPageChange: (currentOffset: number) => void;
  readonly pageNumber: number[];
}

const Pagination: React.FC<PaginationProps> = ({ onPageChange, pageNumber }) => {
  const [offset, setOffset] = useState<number>(1);

  const onPrevClick = () => {
    if (offset === 1) {
      onPageChange(1);
      return;
    }
    setOffset((current) => {
      onPageChange(current - 1);
      return current - 1;
    });
  };

  const onNextClick = () => {
    if (offset === pageNumber.length) {
      onPageChange(pageNumber.length);
      return;
    }
    setOffset((current) => {
      onPageChange(current + 1);
      return current + 1;
    });
  };

  return (
    <PaginationWrapper>
      <PaginationItem onClick={onPrevClick}>
        <FontAwesomeIcon icon={faAngleLeft} /> 이전
      </PaginationItem>
      {pageNumber.map((pageNum) => (
        <PaginationItem
          key={pageNum}
          onClick={() => {
            setOffset(pageNum);
            onPageChange(pageNum);
          }}
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
