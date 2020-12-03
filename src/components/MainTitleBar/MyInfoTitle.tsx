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

  let role = '알수없음';
  if (profile.permission.isAdmin) role = '관리자';
  if (profile.permission.isTeacher) role = '선생님';
  if (profile.permission.isSchoolUnion) role = '학생회';

  return (
    <AboutContainer>
      <Heading3>
        {profile.name} {role}
      </Heading3>
    </AboutContainer>
  );
};

export default MyInfoTitle;
