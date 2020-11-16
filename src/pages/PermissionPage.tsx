import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Heading1, Heading2, Heading3 } from '../atomics/Typography/Heading';
import BlankLine from '../utils/BlankLine';

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
    <Container>
      <div>
        <StyledHeading>권한 없음</StyledHeading>
        <Heading2>해당 페이지에 접근할 권한이 없습니다.</Heading2>
        <BlankLine gap={8} />
        <StyledBack tabIndex={0} onClick={() => history.push('/login')}>
          로그인하기
        </StyledBack>
      </div>
    </Container>
  );
};

export default PermissionPage;
