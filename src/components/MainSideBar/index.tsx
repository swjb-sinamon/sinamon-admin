import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faKey,
  faSignOutAlt,
  faTshirt,
  faUmbrella,
  faUser,
  faTrophy
} from '@fortawesome/free-solid-svg-icons';
import { NoStyleLink, showToast, SCREEN_SIZE, MainSideBarItem } from 'sinamon-sikhye';
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

const ItemList = styled.ul<{ isOpen: boolean }>`
  display: block;
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
  }
`;

const MainSideBar: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const onLogoutClick = async () => {
    const isLogout = window.confirm('정말로 로그아웃 하시겠습니까?');
    if (!isLogout) return;
    await Api.delete('/auth/logout');
    showToast('👋 다음에 또 찾아와주세요!', 'success');
    window.location.reload();
  };

  return (
    <Sidebar>
      <MainTitleBar setOpen={setOpen} />

      <ItemList isOpen={isOpen}>
        <NoStyleLink to="/umbrella">
          <MainSideBarItem>
            <FontAwesomeIcon icon={faUmbrella} />
            &nbsp;
            <p>우산대여</p>
          </MainSideBarItem>
        </NoStyleLink>

        <NoStyleLink to="/umbrella/manage">
          <MainSideBarItem tabIndex={0}>
            <FontAwesomeIcon icon={faUmbrella} />
            &nbsp;
            <p>우산 목록 관리</p>
          </MainSideBarItem>
        </NoStyleLink>

        <NoStyleLink to="/uniform">
          <MainSideBarItem>
            <FontAwesomeIcon icon={faTshirt} />
            &nbsp;
            <p>교복데이 관리 (반)</p>
          </MainSideBarItem>
        </NoStyleLink>

        <NoStyleLink to="/uniform/personal">
          <MainSideBarItem>
            <FontAwesomeIcon icon={faTshirt} />
            &nbsp;
            <p>교복데이 관리 (개인)</p>
          </MainSideBarItem>
        </NoStyleLink>

        <NoStyleLink to="/uniform/prank">
          <MainSideBarItem>
            <FontAwesomeIcon icon={faTrophy} />
            &nbsp;
            <p>교복데이 관리 (개인 순위)</p>
          </MainSideBarItem>
        </NoStyleLink>

        <NoStyleLink to="/code">
          <MainSideBarItem>
            <FontAwesomeIcon icon={faKey} />
            &nbsp;
            <p>인증코드 관리</p>
          </MainSideBarItem>
        </NoStyleLink>

        <NoStyleLink to="/user">
          <MainSideBarItem>
            <FontAwesomeIcon icon={faUser} />
            &nbsp;
            <p>사용자 관리</p>
          </MainSideBarItem>
        </NoStyleLink>

        <MainSideBarItem onClick={onLogoutClick} tabIndex={0}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          &nbsp;
          <p>로그아웃</p>
        </MainSideBarItem>
      </ItemList>
    </Sidebar>
  );
};

export default MainSideBar;
