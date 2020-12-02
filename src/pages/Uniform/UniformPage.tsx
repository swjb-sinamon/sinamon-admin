import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import MainSideBar from '../../components/MainSideBar';
import MainSideBarContainer from '../../components/MainSideBar/MainSideBarContainer';
import { Heading1, Heading3 } from '../../atomics/Typography/Heading';
import BlankLine from '../../utils/BlankLine';
import UniformTable from '../../components/Uniform/UniformTable';
import Select from '../../atomics/Form/Select';
import SCREEN_SIZE from '../../styles/screen-size';
import Api from '../../api';
import { UniformType } from '../../types/Payload';
import showToast from '../../utils/Toast';
import { MediumButton } from '../../atomics/Button';

const StyledContent = styled.div`
  margin: 3rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledSelect = styled(Select)`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    width: 100%;
  }
`;

const StyledButton = styled(MediumButton)`
  height: 40px;
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    margin-left: 10px;
  }
`;

const UniformPage: React.FC = () => {
  const [clazz, setClazz] = useState<string>('1:1');
  const [data, setData] = useState<UniformType[]>([]);

  const fetchUniformData = useCallback(async () => {
    const [grade, fullClass] = clazz.split(':');
    const res = await Api.get(`/uniform/${grade}/${fullClass}`);
    setData(res.data.data);
  }, [clazz]);

  useEffect(() => {
    fetchUniformData();
  }, [fetchUniformData]);

  const onPlusClick = async (date: string) => {
    const [grade, fullClass] = clazz.split(':');
    await Api.put(`/uniform/${grade}/${fullClass}?date=${date}`);
    showToast(`${grade}학년 ${fullClass}반 점수를 올렸습니다.`, 'success');

    await fetchUniformData();
  };

  const onMinusClick = async (date: string) => {
    const [grade, fullClass] = clazz.split(':');
    await Api.delete(`/uniform/${grade}/${fullClass}?date=${date}`);
    showToast(`${grade}학년 ${fullClass}반 점수를 내렸습니다.`, 'success');

    await fetchUniformData();
  };

  return (
    <>
      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>교복데이 관리 (반)</Heading1>
          <Heading3>반별 교복데이 점수를 올리거나 내립니다.</Heading3>
          <BlankLine gap={30} />

          <Header>
            <StyledSelect value={clazz} onChange={(e) => setClazz(e.target.value)}>
              {[1, 2].map((i) => {
                return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((j) => {
                  return (
                    <option value={`${i}:${j}`}>
                      {i}학년 {j}반
                    </option>
                  );
                });
              })}
            </StyledSelect>
            <StyledButton onClick={fetchUniformData}>새로고침</StyledButton>
          </Header>
          <BlankLine gap={10} />

          <UniformTable list={data} onPlusClick={onPlusClick} onMinusClick={onMinusClick} />
        </StyledContent>
      </MainSideBarContainer>
    </>
  );
};

export default UniformPage;
