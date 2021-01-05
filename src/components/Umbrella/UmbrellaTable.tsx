import React from 'react';
import {
  ScaleInput,
  usePagination,
  BlankLine,
  Pagination,
  BodyItem,
  HeaderItem,
  Table,
  TableHead
} from 'sinamon-sikhye';
import { UmbrellaType } from '../../types/Payload';

interface UmbrellaTableProps {
  readonly umbrellaList: UmbrellaType[];
  readonly count: number;
  readonly onPageChange: (currentOffset: number) => void;
  readonly onRadioChange: (item: UmbrellaType) => void;
}

const UmbrellaTable: React.FC<UmbrellaTableProps> = ({
  umbrellaList,
  count,
  onPageChange,
  onRadioChange
}) => {
  const getStatus = (status: 'good' | 'worse') =>
    status.replace('good', '좋음').replace('worse', '나쁨');

  const pageNumber = usePagination(count, 10);

  return (
    <>
      <Table>
        <TableHead>
          <tr>
            <HeaderItem>#</HeaderItem>
            <HeaderItem>이름</HeaderItem>
            <HeaderItem>상태</HeaderItem>
            <HeaderItem>등록일</HeaderItem>
          </tr>
        </TableHead>
        <tbody>
          {umbrellaList.map((item: UmbrellaType) => (
            <BodyItem key={item.name}>
              <td>
                <ScaleInput
                  type="radio"
                  name="umbrella-check"
                  onChange={() => onRadioChange(item)}
                />
              </td>
              <td>{item.name}</td>
              <td>{getStatus(item.status)}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            </BodyItem>
          ))}
        </tbody>
      </Table>
      <BlankLine gap={30} />
      <Pagination onPageChange={onPageChange} pageNumber={pageNumber} />
    </>
  );
};

export default UmbrellaTable;
