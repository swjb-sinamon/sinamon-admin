import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAward,
  faCalendarWeek,
  faKey,
  faUmbrella,
  faUser,
  faBullhorn
} from '@fortawesome/free-solid-svg-icons';
import {
  MainSideBarItem,
  NoStyleLink,
  SCREEN_SIZE,
  showToast,
  SideBarIconWrapper,
  SideBarItemList
} from 'sinamon-sikhye';
import { useHistory } from 'react-router-dom';
import MainTitleBar from '../MainTitleBar';
import Api from '../../api';

const Sidebar = styled.ul`
  min-height: 100vh;
  background-color: white;
  box-shadow: 0 0 30px rgba(169, 169, 169, 0.2);

  display: flex;
  flex-direction: column;

  list-style: none;

  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    min-height: 4rem;
  }
`;

const StyledFooterText = styled.p`
  text-align: center;

  margin: 1rem 0;

  color: var(--color-subtext);
`;

const FooterButton = styled.button`
  border: none;
  background-color: transparent;

  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  color: var(--color-subtext);

  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--color-button-hover);
  }
`;

const MainSideBar: React.FC = () => {
  const history = useHistory();
  const [isOpen, setOpen] = useState<boolean>(false);

  const onLogoutClick = async () => {
    const isLogout = window.confirm('정말로 로그아웃 하시겠습니까?');
    if (!isLogout) return;
    await Api.delete('/auth/logout');
    showToast('다음에 또 찾아와주세요!', 'success');

    history.push('/');
    window.location.reload();
  };

  return (
    <Sidebar>
      <MainTitleBar setOpen={setOpen} />

      <SideBarItemList isOpen={isOpen}>
        <NoStyleLink to="/umbrella">
          <MainSideBarItem>
            <SideBarIconWrapper>
              <FontAwesomeIcon icon={faUmbrella} size="lg" />
            </SideBarIconWrapper>
            <p>우산대여</p>
          </MainSideBarItem>
        </NoStyleLink>

        <NoStyleLink to="/umbrella/manage">
          <MainSideBarItem>
            <SideBarIconWrapper>
              <FontAwesomeIcon icon={faUmbrella} size="lg" />
            </SideBarIconWrapper>
            <p>우산 목록 관리</p>
          </MainSideBarItem>
        </NoStyleLink>

        <NoStyleLink to="/contest">
          <MainSideBarItem>
            <SideBarIconWrapper>
              <FontAwesomeIcon icon={faAward} size="lg" />
            </SideBarIconWrapper>
            <p>학생협업공모전 관리</p>
          </MainSideBarItem>
        </NoStyleLink>

        <NoStyleLink to="/timetable">
          <MainSideBarItem>
            <SideBarIconWrapper>
              <FontAwesomeIcon icon={faCalendarWeek} size="lg" />
            </SideBarIconWrapper>
            <p>시간표 관리</p>
          </MainSideBarItem>
        </NoStyleLink>

        <NoStyleLink to="/code">
          <MainSideBarItem>
            <SideBarIconWrapper>
              <FontAwesomeIcon icon={faKey} size="lg" />
            </SideBarIconWrapper>
            <p>인증코드 관리</p>
          </MainSideBarItem>
        </NoStyleLink>

        <NoStyleLink to="/user">
          <MainSideBarItem>
            <SideBarIconWrapper>
              <FontAwesomeIcon icon={faUser} size="lg" />
            </SideBarIconWrapper>
            <p>사용자 관리</p>
          </MainSideBarItem>
        </NoStyleLink>

        <NoStyleLink to="/notice">
          <MainSideBarItem>
            <SideBarIconWrapper>
              <FontAwesomeIcon icon={faBullhorn} />
            </SideBarIconWrapper>
            <p>공지사항 관리</p>
          </MainSideBarItem>
        </NoStyleLink>

        <StyledFooterText>
          <FooterButton onClick={onLogoutClick}>로그아웃</FooterButton>
        </StyledFooterText>
      </SideBarItemList>
    </Sidebar>
  );
};

export default MainSideBar;
