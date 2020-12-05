import React from 'react';
import styled from 'styled-components';
import { SCREEN_SIZE, Card, CardTitle, MainSideBarContainer } from 'sinamon-sikhye';
import MainSideBar from '../components/MainSideBar';
import UmbrellaDashboardCard from '../components/Card/UmbrellaDashboardCard';

const StyledContent = styled.div`
  margin: 3rem;

  display: flex;
  justify-content: center;
`;

const StyledContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(auto, 240px));
  grid-template-rows: repeat(4, 260px);
  grid-gap: 30px;

  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    display: flex;
    flex-direction: column;
  }
`;

const MainPage: React.FC = () => {
  return (
    <>
      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <StyledContentGrid>
            <UmbrellaDashboardCard />
            <Card columnStart={3} columnEnd={5} rowStart={1} rowEnd={2}>
              <CardTitle>방과후신청 현황</CardTitle>
              <p>준비중입니다.</p>
            </Card>
            <Card columnStart={1} columnEnd={3} rowStart={2} rowEnd={3}>
              <CardTitle>교복데이 현황</CardTitle>
              <p>준비중입니다.</p>
            </Card>
            <Card columnStart={3} columnEnd={5} rowStart={2} rowEnd={3}>
              <CardTitle>도움말</CardTitle>
              <p>좌측 메뉴를 이용하여 관리자 전용 기능을 이용할 수 있습니다.</p>
              <p>일부 기능은 사이트 관리자 또는 선생님만 사용 가능합니다.</p>
            </Card>
          </StyledContentGrid>
        </StyledContent>
      </MainSideBarContainer>
    </>
  );
};

export default MainPage;
