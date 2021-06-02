import React from 'react';
import styled from 'styled-components';
import { BodyItem, HeaderItem, SCREEN_SIZE, Table, TableHead } from 'sinamon-sikhye';
import swal from 'sweetalert';
import { AnonymousReplyType, AnonymousType } from '../../types/Payload';

const ScrollContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    border-radius: 3px;
    border: 1px solid var(--color-gray);
  }

  overflow-x: auto;
`;

const TableButton = styled.button`
  width: 74px;
  height: 32px;

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

interface TableProps {
  readonly list: AnonymousType[];
  readonly onAddReplyClick?: () => void;
  readonly onShowReplyClick?: () => void;
}

const AnonymousTable: React.FC<TableProps> = ({ list, onAddReplyClick, onShowReplyClick }) => {
  const onContentClick = (content: string) => swal('익명건의 내용', content);

  const ReplyButton = (reply: AnonymousReplyType[]) => {
    if (reply.length === 0) {
      return <TableButton onClick={onAddReplyClick}>답변 달기</TableButton>;
    }

    return <TableButton onClick={onShowReplyClick}>답변 보기</TableButton>;
  };

  return (
    <>
      <ScrollContainer>
        <Table>
          <TableHead>
            <tr>
              <HeaderItem>#</HeaderItem>
              <HeaderItem>제목</HeaderItem>
              <HeaderItem>내용</HeaderItem>
              <HeaderItem>답변</HeaderItem>
              <HeaderItem>작성일</HeaderItem>
            </tr>
          </TableHead>
          <tbody>
            {list.map((item: AnonymousType) => {
              return (
                <BodyItem key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <TableButton onClick={() => onContentClick(item.content)}>
                      내용 보기
                    </TableButton>
                  </td>
                  <td>{() => ReplyButton(item.reply)}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                </BodyItem>
              );
            })}
          </tbody>
        </Table>
      </ScrollContainer>
    </>
  );
};

export default AnonymousTable;
