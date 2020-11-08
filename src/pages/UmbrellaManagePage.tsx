import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainSideBar from '../components/MainSideBar';
import MainSideBarContainer from '../components/MainSideBar/MainSideBarContainer';
import { Heading1, Heading3 } from '../atomics/Typography/Heading';
import BlankLine from '../utils/BlankLine';
import { BodyItem, HeaderItem, Table, TableHead } from '../atomics/Table';
import Api from '../api';
import Input from '../atomics/Form/Input';
import SCREEN_SIZE from '../styles/screen-size';
import Label from '../atomics/Form/Label';

const StyledContent = styled.div`
  margin: 3rem;
`;

const StyledInput = styled(Input)`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    width: 100%;
  }
`;

const ScrollContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    border-radius: 3px;
    border: 1px solid var(--color-gray);
  }

  overflow-x: auto;
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

        <Label>빌려줄 우산 선택하기</Label>
        <StyledInput type="text" placeholder="우산 이름 검색하기" />

        <BlankLine gap={10} />

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
              <BodyItem>
                <td>테스트1</td>
                <td>좋음</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>2020. 11. 03.</td>
              </BodyItem>
            </tbody>
          </Table>
        </ScrollContainer>
      </StyledContent>
    </MainSideBarContainer>
  );
};

export default UmbrellaManagePage;
