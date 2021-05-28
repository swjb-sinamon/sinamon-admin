import React from 'react';
import styled from 'styled-components';
import { BlankLine, Heading1, Heading3, MainSideBarContainer } from 'sinamon-sikhye';
import { Helmet } from 'react-helmet';
import MainSideBar from '../components/MainSideBar';

const StyledContent = styled.div`
  margin: 3rem;
`;

const AnonymousAdminPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>익명건의함 관리 - 수정과 관리자</title>
      </Helmet>

      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>익명건의함 관리</Heading1>
          <Heading3>익명건의를 관리하고 답변을 달 수 있습니다.</Heading3>
          <BlankLine gap={30} />

          <BlankLine gap={10} />
        </StyledContent>
      </MainSideBarContainer>
    </>
  );
};

export default AnonymousAdminPage;
