import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Heading1, Heading2, Heading3, BlankLine } from 'sinamon-sikhye';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHeading = styled(Heading1)`
  color: var(--color-bad);
`;

const StyledBack = styled(Heading3)`
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: var(--color-button-hover);
  }
`;

const PermissionPage: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Helmet>
        <title>권한없음! - 수정과 관리자</title>
      </Helmet>

      <Container>
        <div>
          <StyledHeading>권한 없음!</StyledHeading>
          <Heading2>로그인하지 않았거나 접근할 권한이 없습니다.</Heading2>
          <BlankLine gap={8} />
          <StyledBack tabIndex={0} onClick={() => history.goBack()}>
            뒤로가기
          </StyledBack>
          <StyledBack tabIndex={0} onClick={() => history.push('/login')}>
            로그인하기
          </StyledBack>
        </div>
      </Container>
    </>
  );
};

export default PermissionPage;
