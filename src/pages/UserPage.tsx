import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BlankLine,
  Heading1,
  Input,
  Label,
  MainSideBarContainer,
  SCREEN_SIZE,
  Select
} from 'sinamon-sikhye';
import { Helmet } from 'react-helmet';
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

const StyledSelect = styled(Select)`
  width: 145px;

  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    width: 100%;

    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const LeftHeader = styled.div`
  & > * {
    margin-right: 10px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const StyledBlankLine = styled(BlankLine)`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    display: none;
  }
`;

const UserPage: React.FC = () => {
  const [data, setData] = useState<ProfileType[]>([]);
  const [count, setCount] = useState<number>(0);

  const [department, setDepartment] = useState<number>(0);
  const [clazz, setClazz] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const fetchData = useCallback(
    (page: number, searchText: string) => {
      const departmentQuery = department ? `&filters[department]=${department}` : '';
      const gradeAndClass = clazz ? clazz.split('-') : [];
      const gradeQuery = clazz ? `&filters[grade]=${gradeAndClass[0]}` : '';
      const classQuery = clazz ? `&filters[class]=${gradeAndClass[1]}` : '';

      Api.get(
        `/auth/user?limit=30&offset=${page}&search=${searchText}${departmentQuery}${gradeQuery}${classQuery}`
      ).then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
      });
    },
    [department, clazz]
  );

  useEffect(() => {
    fetchData(1, '');
  }, [fetchData]);

  return (
    <>
      <Helmet>
        <title>사용자 관리 - 수정과 관리자</title>
      </Helmet>

      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>사용자 관리</Heading1>
          <BlankLine gap={30} />

          <LeftHeader>
            <StyledSelect
              onChange={(e) => {
                setDepartment(parseInt(e.target.value, 10));
                setSearch('');
              }}
              value={department}
            >
              <option value="0">학과 전체</option>
              <option value="1">컴퓨터전자과</option>
              <option value="2">스마트자동화과</option>
              <option value="3">IT산업디자인과</option>
              <option value="4">IT경영정보과</option>
              <option value="5">IT소프트웨어과</option>
            </StyledSelect>
            <StyledSelect
              onChange={(e) => {
                setClazz(e.target.value);
                setSearch('');
              }}
              value={clazz}
            >
              <option value="">학년반 전체</option>
              <option value="1-1">1학년 1반</option>
              <option value="1-2">1학년 2반</option>
              <option value="2-1">2학년 1반</option>
              <option value="2-2">2학년 2반</option>
              <option value="3-1">3학년 1반</option>
              <option value="3-2">3학년 2반</option>
            </StyledSelect>

            <StyledBlankLine gap={10} />

            <StyledInput
              type="text"
              placeholder="엔터를 눌러 사용자 이름 검색하기"
              onKeyPress={(e) => {
                if (e.key === 'Enter') fetchData(1, search);
              }}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />

            <BlankLine gap={10} />

            <Label>전체: {count}명</Label>
          </LeftHeader>

          <BlankLine gap={10} />

          <UserTable
            list={data}
            count={count}
            onPageChange={(currentOffset) => fetchData(currentOffset, search)}
          />
        </StyledContent>
      </MainSideBarContainer>
    </>
  );
};

export default UserPage;
