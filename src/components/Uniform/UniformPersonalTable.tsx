import React from 'react';
import styled from 'styled-components';
import { BodyItem, HeaderItem, Table, TableHead } from '../../atomics/Table';
import SCREEN_SIZE from '../../styles/screen-size';
import { UniformPersonalDateType } from '../../types/Payload';
import convertDepartmentIdToString from '../../utils/Converter/Department';
import BlankLine from '../../utils/BlankLine';
import Pagination from '../Pagination';
import usePagination from '../../hooks/usePagination';

const ScrollContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    border-radius: 3px;
    border: 1px solid var(--color-gray);
  }

  overflow-x: auto;
`;

interface UniformPersonalTableProps {
  readonly list: UniformPersonalDateType[];
  readonly count: number;
  readonly onPageChange: (currentOffset: number) => void;
}

const UniformPersonalTable: React.FC<UniformPersonalTableProps> = ({
  list,
  count,
  onPageChange
}) => {
  const pageNumber = usePagination(count, 10);

  return (
    <>
      <ScrollContainer>
        <Table>
          <TableHead>
            <tr>
              <HeaderItem>일</HeaderItem>
              <HeaderItem>이름</HeaderItem>
              <HeaderItem>학과</HeaderItem>
              <HeaderItem>학년</HeaderItem>
              <HeaderItem>반</HeaderItem>
              <HeaderItem>번호</HeaderItem>
              <HeaderItem>점수</HeaderItem>
            </tr>
          </TableHead>
          <tbody>
            {list.map((item: UniformPersonalDateType) => {
              return (
                <BodyItem key={item.id}>
                  <td>{new Date(item.date).getDate()}일</td>
                  <td>{item.user.name}</td>
                  <td>{convertDepartmentIdToString(item.user.department)}</td>
                  <td>{item.user.studentGrade}</td>
                  <td>{item.user.studentClass}</td>
                  <td>{item.user.studentNumber}</td>
                  <td>
                    <b>{item.score}</b>
                  </td>
                </BodyItem>
              );
            })}
          </tbody>
        </Table>
      </ScrollContainer>

      <BlankLine gap={30} />

      <Pagination onPageChange={onPageChange} pageNumber={pageNumber} />
    </>
  );
};

export default UniformPersonalTable;
