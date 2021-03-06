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
import { CodeType } from '../../types/Payload';

const ScrollContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    border-radius: 3px;
    border: 1px solid var(--color-gray);
  }

  overflow-x: auto;
`;

interface CodeTableProps {
  readonly list: CodeType[];
  readonly count: number;
  readonly onPageChange: (currentOffset: number) => void;
}

const CodeTable: React.FC<CodeTableProps> = ({ list, count, onPageChange }) => {
  return (
    <>
      <ScrollContainer>
        <Table>
          <TableHead>
            <tr>
              <HeaderItem>#</HeaderItem>
              <HeaderItem>코드</HeaderItem>
              <HeaderItem>사용일</HeaderItem>
              <HeaderItem>생성일</HeaderItem>
            </tr>
          </TableHead>
          <tbody>
            {list.map((item: CodeType) => {
              const useDate = item.useAt ? new Date(item.useAt).toLocaleDateString() : '-';
              const date = new Date(item.createdAt).toLocaleDateString();
              return (
                <BodyItem key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.code}</td>
                  <td>{useDate}</td>
                  <td>{date}</td>
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

export default CodeTable;
