import React from 'react';
import ScaleInput from '../../atomics/Form/ScaleInput';
import { BodyItem, HeaderItem, Table, TableHead } from '../../atomics/Table';
import { UmbrellaType } from '../../types/Umbrella';

interface UmbrellaTableProps {
  readonly umbrellaList: UmbrellaType[];
  readonly onRadioChange: (item: UmbrellaType) => void;
}

const UmbrellaTable: React.FC<UmbrellaTableProps> = ({ umbrellaList, onRadioChange }) => {
  const getStatus = (status: 'good' | 'worse') =>
    status.replace('good', '좋음').replace('wores', '나쁨');

  return (
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
        {umbrellaList.map((item) => (
          <BodyItem key={item.name}>
            <td>
              <ScaleInput type="radio" name="umbrella-check" onChange={() => onRadioChange(item)} />
            </td>
            <td>{item.name}</td>
            <td>{getStatus(item.status)}</td>
            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
          </BodyItem>
        ))}
      </tbody>
    </Table>
  );
};

export default UmbrellaTable;
