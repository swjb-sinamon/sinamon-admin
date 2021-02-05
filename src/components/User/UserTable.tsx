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
import { ProfileType } from '../../types/Payload';
import convertDepartmentIdToString from '../../utils/Converter/Department';

const ScrollContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    border-radius: 3px;
    border: 1px solid var(--color-gray);
  }

  overflow-x: auto;
`;

interface UserTableProps {
  readonly list: ProfileType[];
  readonly count: number;
  readonly onPageChange: (currentOffset: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ list, count, onPageChange }) => {
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
            {list.map((item: ProfileType) => {
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

      <Pagination onPageChange={onPageChange} dataCount={count} pageLimit={30} />
    </>
  );
};

export default UserTable;
