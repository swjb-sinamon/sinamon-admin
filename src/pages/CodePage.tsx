import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CsvDownload from 'react-json-to-csv';
import {
  MainSideBarContainer,
  Heading1,
  Heading3,
  BlankLine,
  showToast,
  MediumButton,
  Label
} from 'sinamon-sikhye';
import { Helmet } from 'react-helmet';
import MainSideBar from '../components/MainSideBar';
import Api from '../api';
import { CodeType } from '../types/Payload';
import CodeTable from '../components/Code/CodeTable';

const StyledContent = styled.div`
  margin: 3rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightHeader = styled.div`
  display: flex;
  flex-direction: row;

  & > button {
    margin-right: 10px;
  }

  & > button:last-child {
    margin-right: 0;
  }
`;

const StyledCreateButton = styled(MediumButton)`
  height: 40px;
`;

const StyledDownloadButton = styled(CsvDownload)`
  width: 100px;
  height: 40px;
  background-color: var(--color-button);
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: var(--color-button-hover);
  }
`;

const CodePage: React.FC = () => {
  const [data, setData] = useState<CodeType[]>([]);
  const [csvData, setCSVData] = useState<CodeType[]>([]);
  const [count, setCount] = useState<number>(0);

  const fetchData = (page: number) => {
    Api.get(`/code?limit=30&offset=${page}`).then((res) => {
      setData(res.data.data);
      setCount(res.data.count);
    });
  };

  const fetchAllData = useCallback(() => {
    Api.get('/code').then((res) => {
      setCSVData(res.data.data);
      return fetchData(1);
    });
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const now = new Date();
  const csvFileName = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`;

  const onCreateCodeClick = () => {
    Api.post('/code').then((res) => {
      showToast(`${res.data.data} 인증코드를 새로 만들었습니다.`, 'success');
      fetchAllData();
    });
  };

  return (
    <>
      <Helmet>
        <title>인증코드 - 수정과 관리자</title>
      </Helmet>

      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>인증코드 관리</Heading1>
          <Heading3>기존 인증코드를 관리하거나 새롭게 발급합니다.</Heading3>
          <BlankLine gap={30} />

          <Header>
            <Label>전체: {count}개</Label>

            <RightHeader>
              <StyledDownloadButton data={csvData} filename={`${csvFileName}-code.csv`}>
                CSV 다운로드
              </StyledDownloadButton>
              <br />
              <StyledCreateButton onClick={onCreateCodeClick}>인증코드 생성</StyledCreateButton>
            </RightHeader>
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
