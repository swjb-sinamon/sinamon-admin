import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MainSideBarContainer, Heading1, Heading3, BlankLine } from 'sinamon-sikhye';
import MainSideBar from '../../components/MainSideBar';
import UniformPersonalTable from '../../components/Uniform/UniformPersonalTable';
import { UniformPersonalType } from '../../types/Payload';
import Api from '../../api';

const StyledContent = styled.div`
  margin: 3rem;
`;

const UniformPRankPage: React.FC = () => {
  const [data, setData] = useState<UniformPersonalType[]>([]);
  const [count, setCount] = useState<number>(0);

  const fetchData = useCallback(async (page: number) => {
    const res = await Api.get(`/uniform/prank?limit=30&offset=${page}`);
    setData(res.data.data);
    setCount(res.data.count);
  }, []);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  return (
    <>
      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>교복데이 관리 (개인 순위)</Heading1>
          <Heading3>개인별 교복데이 순위를 확인합니다. (0점 표시 안함)</Heading3>
          <BlankLine gap={30} />

          <UniformPersonalTable
            list={data}
            count={count}
            onPageChange={(page) => fetchData(page)}
            isRank
          />
        </StyledContent>
      </MainSideBarContainer>
    </>
  );
};

export default UniformPRankPage;
