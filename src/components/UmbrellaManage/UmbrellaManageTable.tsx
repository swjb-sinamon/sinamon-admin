import React from 'react';
import styled from 'styled-components';
import { BodyItem, HeaderItem, Table, TableHead } from '../../atomics/Table';
import SCREEN_SIZE from '../../styles/screen-size';
import { UmbrellaWithRentalType } from '../../types/Umbrella';
import BlankLine from '../../utils/BlankLine';
import usePagination from '../../hooks/usePagination';
import Pagination from '../Pagination';

const ScrollContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    border-radius: 3px;
    border: 1px solid var(--color-gray);
  }

  overflow-x: auto;
`;

interface UmbrellaManageTableProps {
  readonly list: UmbrellaWithRentalType[];
  readonly count: number;
  readonly onPageChange: (currentOffset: number) => void;
}

const UmbrellaManageTable: React.FC<UmbrellaManageTableProps> = ({ list, count, onPageChange }) => {
  const getStatus = (status: 'good' | 'worse') =>
    status.replace('good', '좋음').replace('worse', '나쁨');

  const pageNumber = usePagination(count, 10);

  return (
    <>
      <ScrollContainer>
        <Table>
          <TableHead>
            <tr>
              <HeaderItem>이름</HeaderItem>
              <HeaderItem>상태</HeaderItem>
              <HeaderItem>대여자</HeaderItem>
              <HeaderItem>반납일</HeaderItem>
              <HeaderItem>연체여부</HeaderItem>
              <HeaderItem>등록일</HeaderItem>
            </tr>
          </TableHead>
          <tbody>
            {list.map((item: UmbrellaWithRentalType) => {
              const date = new Date(item.rental?.expiryDate).toLocaleDateString();
              return (
                <BodyItem key={item.name}>
                  <td>{item.name}</td>
                  <td>{getStatus(item.status)}</td>
                  <td>{item.rental?.lender || '-'}</td>
                  <td>{date !== 'Invalid Date' ? date : '-'}</td>
                  <td>{item.rental?.isExpire.toString() || '-'}</td>
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

export default UmbrellaManageTable;
