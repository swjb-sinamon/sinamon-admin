import React from 'react';
import styled from 'styled-components';
import { BlankLine, Heading1, Heading3, MainSideBarContainer } from 'sinamon-sikhye';
import { Helmet } from 'react-helmet';
import MainSideBar from '../components/MainSideBar';

const StyledContent = styled.div`
  margin: 3rem;
`;

const TimetablePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>시간표관리 - 수정과 관리자</title>
      </Helmet>

      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>시간표 관리</Heading1>
          <Heading3>시간표를 관리하고 줌 링크를 추가하세요.</Heading3>
          <Heading3>pwd가 포함된 줌 링크를 추가하면 비밀번호 입력을 생략할 수 있습니다.</Heading3>
          <BlankLine gap={30} />
        </StyledContent>
      </MainSideBarContainer>
    </>
  );
};

export default TimetablePage;
