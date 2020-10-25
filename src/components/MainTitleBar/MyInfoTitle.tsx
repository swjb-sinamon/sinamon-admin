import React from 'react';
import styled from 'styled-components';
import { Heading3 } from '../../atomics/Typography/Heading';
import SCREEN_SIZE from '../../styles/screen-size';
import { useProfile } from '../../hooks/useProfile';

const AboutContainer = styled.div`
  text-align: center;

  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    display: none;
  }
`;

const MyInfoTitle: React.FC = () => {
  const profile = useProfile();

  if (!profile) {
    return (
      <AboutContainer>
        <Heading3>수정과</Heading3>
        <Heading3>불러오는 중...</Heading3>
      </AboutContainer>
    );
  }

  let rule = '알수없음';
  if (profile.isAdmin) {
    rule = '관리자';
  } else if (profile.isTeacher) {
    rule = '선생님';
  }

  return (
    <AboutContainer>
      <Heading3>
        {profile.name} {rule}
      </Heading3>
    </AboutContainer>
  );
};

export default MyInfoTitle;
