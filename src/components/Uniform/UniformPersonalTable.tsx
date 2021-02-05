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
import { UniformPersonalType } from '../../types/Payload';
import convertDepartmentIdToString from '../../utils/Converter/Department';

const ScrollContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    border-radius: 3px;
    border: 1px solid var(--color-gray);
  }

  overflow-x: auto;
`;

interface UniformPersonalTableProps {
  readonly list: UniformPersonalType[];
  readonly count: number;
  readonly onPageChange: (currentOffset: number) => void;
  readonly isRank?: boolean;
}

const UniformPersonalTable: React.FC<UniformPersonalTableProps> = ({
  list,
  count,
  onPageChange,
  isRank
}) => {
  return (
    <>
      <ScrollContainer>
        <Table>
          <TableHead>
            <tr>
              {!isRank && <HeaderItem>일</HeaderItem>}
              <HeaderItem>이름</HeaderItem>
              <HeaderItem>학과</HeaderItem>
              <HeaderItem>학년</HeaderItem>
              <HeaderItem>반</HeaderItem>
              <HeaderItem>번호</HeaderItem>
              <HeaderItem>점수</HeaderItem>
            </tr>
          </TableHead>
          <tbody>
            {list.map((item: UniformPersonalType) => {
              return (
                <BodyItem key={item.id}>
                  {!isRank && <td>{new Date(item.date).getDate()}일</td>}
                  <td>{item.user.name}</td>
                  <td>{convertDepartmentIdToString(item.user.department)}</td>
                  <td>{item.user.studentGrade}</td>
                  <td>{item.user.studentClass}</td>
                  <td>{item.user.studentNumber}</td>
                  {isRank ? (
                    <td>
                      <b>{item.totalScore}</b>
                    </td>
                  ) : (
                    <td>
                      <b>{item.score}</b>
                    </td>
                  )}
                </BodyItem>
              );
            })}
          </tbody>
        </Table>
      </ScrollContainer>

      <BlankLine gap={30} />

      <Pagination onPageChange={onPageChange} dataCount={count} pageLimit={10} />
    </>
  );
};

export default UniformPersonalTable;
