import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullhorn,
  faCalendarWeek,
  faKey,
  faSignOutAlt,
  faUmbrella,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {
  MainSidebar,
  MainSideBarItem,
  showToast,
  SideBarIconWrapper,
  SideBarItemList
} from 'sinamon-sikhye';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MainTitleBar from '../MainTitleBar';
import Api from '../../api';

const StyledLink = styled(NavLink).attrs({
  activeClassName: 'nav-item-active'
})`
  &.nav-item-active {
    & > li {
      color: white;
      background-color: var(--color-button);
    }
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
    <MainSidebar>
      <MainTitleBar setOpen={setOpen} />

      <SideBarItemList isOpen={isOpen}>
        <div>
          <StyledLink to="/umbrella">
            <MainSideBarItem>
              <SideBarIconWrapper>
                <FontAwesomeIcon icon={faUmbrella} size="lg" />
              </SideBarIconWrapper>
              <p>우산대여</p>
            </MainSideBarItem>
          </StyledLink>

          <StyledLink to="/umbrella/manage">
            <MainSideBarItem>
              <SideBarIconWrapper>
                <FontAwesomeIcon icon={faUmbrella} size="lg" />
              </SideBarIconWrapper>
              <p>우산 목록 관리</p>
            </MainSideBarItem>
          </StyledLink>

          <StyledLink to="/timetable">
            <MainSideBarItem>
              <SideBarIconWrapper>
                <FontAwesomeIcon icon={faCalendarWeek} size="lg" />
              </SideBarIconWrapper>
              <p>시간표 관리</p>
            </MainSideBarItem>
          </StyledLink>

          <StyledLink to="/code">
            <MainSideBarItem>
              <SideBarIconWrapper>
                <FontAwesomeIcon icon={faKey} size="lg" />
              </SideBarIconWrapper>
              <p>인증코드 관리</p>
            </MainSideBarItem>
          </StyledLink>

          <StyledLink to="/user">
            <MainSideBarItem>
              <SideBarIconWrapper>
                <FontAwesomeIcon icon={faUser} size="lg" />
              </SideBarIconWrapper>
              <p>사용자 관리</p>
            </MainSideBarItem>
          </StyledLink>

          <StyledLink to="/notice">
            <MainSideBarItem>
              <SideBarIconWrapper>
                <FontAwesomeIcon icon={faBullhorn} />
              </SideBarIconWrapper>
              <p>공지사항 관리</p>
            </MainSideBarItem>
          </StyledLink>

          <MainSideBarItem onClick={onLogoutClick} tabIndex={0}>
            <SideBarIconWrapper>
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
            </SideBarIconWrapper>
            <p>로그아웃</p>
          </MainSideBarItem>
        </div>
      </SideBarItemList>
    </MainSidebar>
  );
};

export default MainSideBar;
