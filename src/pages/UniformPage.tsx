import React from 'react';
import styled from 'styled-components';
import MainSideBar from '../components/MainSideBar';
import MainSideBarContainer from '../components/MainSideBar/MainSideBarContainer';
import { Heading1, Heading3 } from '../atomics/Typography/Heading';
import BlankLine from '../utils/BlankLine';

const StyledContent = styled.div`
  margin: 3rem;
`;

const UniformPage: React.FC = () => {
  return (
    <>
      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>교복데이 관리</Heading1>
          <Heading3>반별 교복데이 점수를 올리거나 내립니다.</Heading3>
          <BlankLine gap={30} />
        </StyledContent>
      </MainSideBarContainer>
    </>
  );
};

export default UniformPage;
