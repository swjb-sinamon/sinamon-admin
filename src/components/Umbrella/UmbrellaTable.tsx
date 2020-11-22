import React from 'react';
import ScaleInput from '../../atomics/Form/ScaleInput';
import { BodyItem, HeaderItem, Table, TableHead } from '../../atomics/Table';
import { UmbrellaType } from '../../types/Umbrella';
import usePagination from '../../hooks/usePagination';
import BlankLine from '../../utils/BlankLine';
import Pagination from '../Pagination';

interface UmbrellaTableProps {
  readonly umbrellaList: UmbrellaType[];
  readonly onRadioChange: (item: UmbrellaType) => void;
}

const UmbrellaTable: React.FC<UmbrellaTableProps> = ({ umbrellaList, onRadioChange }) => {
  const getStatus = (status: 'good' | 'worse') =>
    status.replace('good', '좋음').replace('worse', '나쁨');

  const { offset, setOffset, pageNumber, currentPageData } = usePagination(umbrellaList, 10);

  const onPrevClick = () => {
    if (offset === 1) return;
    setOffset((current) => current - 1);
  };

  const onNextClick = () => {
    if (offset === pageNumber.length) return;
    setOffset((current) => current + 1);
  };

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
          {currentPageData.map((item: UmbrellaType) => (
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
      <Pagination
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        pageNumber={pageNumber}
        offset={offset}
        setOffset={setOffset}
      />
    </>
  );
};

export default UmbrellaTable;
