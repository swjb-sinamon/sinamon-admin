import React from 'react';
import styled from 'styled-components';
import {
  BlankLine,
  BodyItem,
  ButtonGroup,
  HeaderItem,
  Pagination,
  SCREEN_SIZE,
  Table,
  TableHead,
  usePagination
} from 'sinamon-sikhye';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SubjectType } from '../../types/Payload';

const ScrollContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    border-radius: 3px;
    border: 1px solid var(--color-gray);
  }

  overflow-x: auto;
`;

const StyledA = styled.a`
  color: inherit;
  text-decoration: underline;
`;

const WorkButton = styled.button`
  width: 32px;
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

const StyledButtonGroup = styled(ButtonGroup)`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_MOBILE}) {
    & button {
      margin-right: 0;
    }
  }
`;

interface ContestTableProps {
  readonly list: SubjectType[];
  readonly count: number;
  readonly onPageChange: (currentOffset: number) => void;
  readonly onEditClick: (id: number) => void;
  readonly onDeleteClick: (id: number) => void;
}

const TimetableTable: React.FC<ContestTableProps> = ({
  list,
  count,
  onPageChange,
  onEditClick,
  onDeleteClick
}) => {
  const pageNumber = usePagination(count, 30);

  return (
    <>
      <ScrollContainer>
        <Table>
          <TableHead>
            <tr>
              <HeaderItem>과목</HeaderItem>
              <HeaderItem>담당선생님</HeaderItem>
              <HeaderItem>줌 링크</HeaderItem>
              <HeaderItem>작업</HeaderItem>
            </tr>
          </TableHead>
          <tbody>
            {list.map((item: SubjectType) => {
              return (
                <BodyItem key={item.id}>
                  <td>{item.subject}</td>
                  <td>{item.teacher}</td>
                  <td>
                    <StyledA href={item.url} target="_blank">
                      {item.url}
                    </StyledA>
                  </td>
                  <td>
                    <StyledButtonGroup>
                      <WorkButton onClick={() => onEditClick(item.id)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </WorkButton>
                      <WorkButton onClick={() => onDeleteClick(item.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </WorkButton>
                    </StyledButtonGroup>
                  </td>
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

export default TimetableTable;
