import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MainSideBarContainer, Heading1, BlankLine, Input, SCREEN_SIZE } from 'sinamon-sikhye';
import MainSideBar from '../components/MainSideBar';
import Api from '../api';
import { ProfileType } from '../types/Payload';
import UserTable from '../components/User/UserTable';

const StyledContent = styled.div`
  margin: 3rem;
`;

const StyledInput = styled(Input)`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    width: 100%;
  }
`;

const UserPage: React.FC = () => {
  const [data, setData] = useState<ProfileType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  const fetchData = (page: number) => {
    Api.get(`/auth/user?limit=30&offset=${page}`).then((res) => {
      setData(res.data.data);
      setCount(res.data.count);
    });
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const onSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    Api.get(`/auth/user?limit=10&offset=1&search=${search}`).then((res) => {
      setData(res.data.data);
      setCount(res.data.count);
    });
  };

  return (
    <>
      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>사용자 관리</Heading1>
          <BlankLine gap={30} />

          <StyledInput
            type="text"
            placeholder="엔터를 눌러 사용자 이름 검색하기"
            onKeyPress={onSearchSubmit}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <BlankLine gap={10} />

          <UserTable
            list={data}
            count={count}
            onPageChange={(currentOffset) => fetchData(currentOffset)}
          />
        </StyledContent>
      </MainSideBarContainer>
    </>
  );
};

export default UserPage;
