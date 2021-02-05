import React from 'react';
import styled from 'styled-components';
import {
  BlankLine,
  BodyItem,
  HeaderItem,
  Pagination,
  SCREEN_SIZE,
  Table,
  TableHead
} from 'sinamon-sikhye';
import { ContestType } from '../../types/Payload';

const ScrollContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    border-radius: 3px;
    border: 1px solid var(--color-gray);
  }

  overflow-x: auto;
`;

interface ContestTableProps {
  readonly list: ContestType[];
  readonly count: number;
  readonly onPageChange: (currentOffset: number) => void;
}

const ContestTable: React.FC<ContestTableProps> = ({ list, count, onPageChange }) => {
  const convertRole = (role: number) => {
    if (role === 0) return '기획';
    if (role === 1) return '개발';
    if (role === 2) return '디자인';
    return '알수없음';
  };

  return (
    <>
      <ScrollContainer>
        <Table>
          <TableHead>
            <tr>
              <HeaderItem>이름</HeaderItem>
              <HeaderItem>역할</HeaderItem>
              <HeaderItem>신청일</HeaderItem>
            </tr>
          </TableHead>
          <tbody>
            {list.map((item: ContestType) => {
              return (
                <BodyItem key={item.name}>
                  <td>{item.name}</td>
                  <td>{convertRole(item.role)}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                </BodyItem>
              );
            })}
          </tbody>
        </Table>
      </ScrollContainer>

      <BlankLine gap={30} />

      <Pagination onPageChange={onPageChange} dataCount={count} pageLimit={30} />
    </>
  );
};

export default ContestTable;
