import React from 'react';
import styled from 'styled-components';
import { BodyItem, HeaderItem, Table, TableHead } from '../../atomics/Table';
import SCREEN_SIZE from '../../styles/screen-size';
import { UmbrellaWithRentalType } from '../../types/Umbrella';

const ScrollContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    border-radius: 3px;
    border: 1px solid var(--color-gray);
  }

  overflow-x: auto;
`;

interface UmbrellaManageTableProps {
  readonly list: UmbrellaWithRentalType[];
}

const UmbrellaManageTable: React.FC<UmbrellaManageTableProps> = ({ list }) => {
  return (
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
          {list.map((item) => {
            const date = new Date(item.rental?.expiryDate).toLocaleDateString();
            return (
              <BodyItem key={item.name}>
                <td>{item.name}</td>
                <td>{item.status}</td>
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
  );
};

export default UmbrellaManageTable;
