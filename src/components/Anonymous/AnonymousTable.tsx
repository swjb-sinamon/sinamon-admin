import React from 'react';
import styled from 'styled-components';
import { BodyItem, ButtonGroup, HeaderItem, SCREEN_SIZE, Table, TableHead } from 'sinamon-sikhye';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AnonymousReplyType, AnonymousType } from '../../types/Payload';

const ScrollContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    border-radius: 3px;
    border: 1px solid var(--color-gray);
  }

  overflow-x: auto;
`;

const TableButton = styled.button<{ size: 'small' | 'long' }>`
  width: ${(props) => (props.size === 'small' ? '32px' : '74px')};
  height: ${(props) => (props.size === 'small' ? '32px' : '32px')};

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
  readonly onAddReplyClick: (id: number) => void;
  readonly onShowReplyClick: (id: number) => void;
  readonly onEditReplyClick: (id: number) => void;
  readonly onDeleteReplyClick: (id: number) => void;
}

const AnonymousTable: React.FC<TableProps> = ({
  list,
  onAddReplyClick,
  onShowReplyClick,
  onEditReplyClick,
  onDeleteReplyClick
}) => {
  const onContentClick = (content: string) => swal('익명건의 내용', content);

  const ReplyButton = (id: number, content: string, reply: AnonymousReplyType[]) => {
    if (reply.length === 0) {
      return (
        <TableButton size="long" onClick={() => onAddReplyClick(id)}>
          답변 달기
        </TableButton>
      );
    }

    return (
      <ButtonGroup>
        <TableButton size="small" onClick={() => swal('답변 내용', content)}>
          <FontAwesomeIcon icon={faComments} />
        </TableButton>

        <TableButton size="small" onClick={() => onEditReplyClick(id)}>
          <FontAwesomeIcon icon={faEdit} />
        </TableButton>

        <TableButton size="small" onClick={() => onDeleteReplyClick(id)}>
          <FontAwesomeIcon icon={faTrash} />
        </TableButton>
      </ButtonGroup>
    );
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
                    <TableButton size="long" onClick={() => onContentClick(item.content)}>
                      내용 보기
                    </TableButton>
                  </td>
                  <td>{ReplyButton(item.id, item.reply[0].content, item.reply)}</td>
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
