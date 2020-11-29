import React from 'react';
import styled from 'styled-components';
import { BodyItem, HeaderItem, Table, TableHead } from '../../atomics/Table';
import SCREEN_SIZE from '../../styles/screen-size';
import BlankLine from '../../utils/BlankLine';
import usePagination from '../../hooks/usePagination';
import Pagination from '../Pagination';
import { UserType } from '../../types/User';
import convertDepartmentIdToString from '../../utils/Converter/Department';

const ScrollContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    border-radius: 3px;
    border: 1px solid var(--color-gray);
  }

  overflow-x: auto;
`;

interface UserTableProps {
  readonly list: UserType[];
  readonly count: number;
  readonly onPageChange: (currentOffset: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ list, count, onPageChange }) => {
  const pageNumber = usePagination(count, 30);

  return (
    <>
      <ScrollContainer>
        <Table>
          <TableHead>
            <tr>
              <HeaderItem>ID</HeaderItem>
              <HeaderItem>이름</HeaderItem>
              <HeaderItem>학과</HeaderItem>
              <HeaderItem>학년</HeaderItem>
              <HeaderItem>반</HeaderItem>
              <HeaderItem>번호</HeaderItem>
              <HeaderItem>가입일</HeaderItem>
            </tr>
          </TableHead>
          <tbody>
            {list.map((item: UserType) => {
              return (
                <BodyItem key={item.uuid}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{convertDepartmentIdToString(item.department)}</td>
                  <td>{item.studentGrade}</td>
                  <td>{item.studentClass}</td>
                  <td>{item.studentNumber}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
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

export default UserTable;
