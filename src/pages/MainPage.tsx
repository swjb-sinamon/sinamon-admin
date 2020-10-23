import React from 'react';
import styled from 'styled-components';
import MainSideBar from '../components/MainSideBar';
import SCREEN_SIZE from '../styles/screen-size';

const Container = styled.div`
  display: grid;
  grid-template-columns: 280px 4fr;

  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    display: flex;
    flex-direction: column;
  }
`;

const StyledContent = styled.div`
  margin: 3rem;

  display: flex;
  justify-content: center;
`;

const MainPage: React.FC = () => {
  return (
    <>
      <Container>
        <MainSideBar />

        <StyledContent>
          <h1>TEST</h1>
        </StyledContent>
      </Container>
    </>
  );
};

export default MainPage;
