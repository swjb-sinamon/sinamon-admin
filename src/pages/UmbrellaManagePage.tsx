import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainSideBar from '../components/MainSideBar';
import MainSideBarContainer from '../components/MainSideBar/MainSideBarContainer';
import { Heading1, Heading3 } from '../atomics/Typography/Heading';
import BlankLine from '../utils/BlankLine';
import { BodyItem, HeaderItem, Table, TableHead } from '../atomics/Table';
import Api from '../api';

const StyledContent = styled.div`
  margin: 3rem;
`;

const UmbrellaManagePage: React.FC = () => {
  const [, setList] = useState([]);

  useEffect(() => {
    Api.get('/umbrella?rental=true').then((res) => setList(res.data.data));
  }, []);

  return (
    <MainSideBarContainer>
      <MainSideBar />

      <StyledContent>
        <Heading1>우산 목록 관리</Heading1>
        <Heading3>우산 목록과 대여 · 반납 상태를 관리합니다.</Heading3>
        <BlankLine gap={30} />

        <Table>
          <TableHead>
            <tr>
              <HeaderItem>#</HeaderItem>
              <HeaderItem>이름</HeaderItem>
              <HeaderItem>상태</HeaderItem>
              <HeaderItem>대여자</HeaderItem>
              <HeaderItem>반납일</HeaderItem>
              <HeaderItem>연체여부</HeaderItem>
              <HeaderItem>등록일</HeaderItem>
            </tr>
          </TableHead>
          <tbody>
            <BodyItem>
              <td>1</td>
              <td>테스트1</td>
              <td>좋음</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>2020. 11. 03.</td>
            </BodyItem>
            <BodyItem>
              <td>2</td>
              <td>테스트1</td>
              <td>좋음</td>
              <td>하대겸</td>
              <td>2020. 11. 02.</td>
              <td>예</td>
              <td>2020. 11. 03.</td>
            </BodyItem>
            <BodyItem>
              <td>3</td>
              <td>테스트1</td>
              <td>좋음</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>2020. 11. 03.</td>
            </BodyItem>
            <BodyItem>
              <td>4</td>
              <td>테스트1</td>
              <td>좋음</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>2020. 11. 03.</td>
            </BodyItem>
          </tbody>
        </Table>
      </StyledContent>
    </MainSideBarContainer>
  );
};

export default UmbrellaManagePage;
