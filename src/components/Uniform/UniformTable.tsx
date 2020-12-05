import React from 'react';
import styled from 'styled-components';
import { SCREEN_SIZE, BodyItem, HeaderItem, Table, TableHead } from 'sinamon-sikhye';
import { UniformType } from '../../types/Payload';

const ScrollContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    border-radius: 3px;
    border: 1px solid var(--color-gray);
  }

  overflow-x: auto;
`;

const StateButton = styled.button`
  width: 32px;
  height: 32px;

  line-height: 32px;

  border-radius: 3px;
  border: 1px solid var(--color-gray);

  background: white;
  color: black;

  cursor: pointer;

  &:hover {
    background-color: var(--color-button-hover);
    color: white;
  }
`;

interface UniformTableProps {
  readonly list: UniformType[];
  readonly onPlusClick: (date: string) => void;
  readonly onMinusClick: (date: string) => void;
}

const UniformTable: React.FC<UniformTableProps> = ({ list, onPlusClick, onMinusClick }) => {
  return (
    <>
      <ScrollContainer>
        <Table>
          <TableHead>
            <tr>
              <HeaderItem>날짜</HeaderItem>
              <HeaderItem>점수</HeaderItem>
              <HeaderItem>올리기</HeaderItem>
              <HeaderItem>내리기</HeaderItem>
            </tr>
          </TableHead>
          <tbody>
            {list.map((item: UniformType) => {
              return (
                <BodyItem key={item.id}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.score}</td>
                  <td>
                    <StateButton onClick={() => onPlusClick(item.date.toString())}>+</StateButton>
                  </td>
                  <td>
                    <StateButton onClick={() => onMinusClick(item.date.toString())}>-</StateButton>
                  </td>
                </BodyItem>
              );
            })}
          </tbody>
        </Table>
      </ScrollContainer>
    </>
  );
};

export default UniformTable;
