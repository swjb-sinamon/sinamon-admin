import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainSideBar from '../components/MainSideBar';
import MainSideBarContainer from '../components/MainSideBar/MainSideBarContainer';
import { Heading1, Heading3 } from '../atomics/Typography/Heading';
import BlankLine from '../utils/BlankLine';
import Api from '../api';
import SCREEN_SIZE from '../styles/screen-size';
import { MediumButton } from '../atomics/Button';
import { CodeType } from '../types/Code';
import CodeTable from '../components/Code/CodeTable';

const StyledContent = styled.div`
  margin: 3rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledCreateButton = styled(MediumButton)`
  height: 40px;
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    margin-left: 10px;
  }
`;

const CodePage: React.FC = () => {
  const [data, setData] = useState<CodeType[]>([]);
  const [count, setCount] = useState<number>(0);

  const fetchData = (page: number) => {
    Api.get(`/code?limit=10&offset=${page}`).then((res) => {
      setData(res.data.data);
      setCount(res.data.count);
    });
  };

  useEffect(() => fetchData(1), []);

  return (
    <>
      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>인증코드 관리</Heading1>
          <Heading3>기존 인증코드를 관리하거나 새롭게 발급합니다.</Heading3>
          <BlankLine gap={30} />

          <Header>
            <StyledCreateButton>인증코드 생성</StyledCreateButton>
          </Header>

          <BlankLine gap={10} />

          <CodeTable
            list={data}
            count={count}
            onPageChange={(currentOffset) => fetchData(currentOffset)}
          />
        </StyledContent>
      </MainSideBarContainer>
    </>
  );
};

export default CodePage;
