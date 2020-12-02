import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import MainSideBar from '../../components/MainSideBar';
import MainSideBarContainer from '../../components/MainSideBar/MainSideBarContainer';
import { Heading1, Heading3 } from '../../atomics/Typography/Heading';
import BlankLine from '../../utils/BlankLine';
import Select from '../../atomics/Form/Select';
import SCREEN_SIZE from '../../styles/screen-size';
import { MediumButton } from '../../atomics/Button';
import Input from '../../atomics/Form/Input';
import UniformPersonalTable from '../../components/Uniform/UniformPersonalTable';
import { UniformPersonalType } from '../../types/Payload';
import Api from '../../api';
import showToast from '../../utils/Toast';
import { convertClassToDepartment, convertSchoolNumber } from '../../utils/Converter/SchoolNumber';

const StyledContent = styled.div`
  margin: 3rem;
`;

const StyledNumber = styled.span`
  font-size: 18px;
  font-weight: bold;

  &:after {
    content: '. ';
  }
`;

const HeaderGroup = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 10px;

  & > * {
    margin-right: 10px;
  }

  & > *:last-child {
    margin-right: 0;
  }

  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    flex-direction: column;

    & > * {
      margin-bottom: 10px;
    }

    & > *:last-child {
      margin-bottom: 0;
    }
  }
`;

const HeaderButtonGroup = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin-right: 10px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const StyledInput = styled(Input)`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    width: 100%;
  }
`;

const StyledSelect = styled(Select)`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    width: 100%;
  }
`;

const StyledButton = styled(MediumButton)`
  height: 40px;
`;

const UniformPersonalPage: React.FC = () => {
  const [data, setData] = useState<UniformPersonalType[]>([]);
  const [count, setCount] = useState<number>(0);

  const [date, setDate] = useState<string>('2020-12-9');
  const [name, setName] = useState<string>('');
  const [schoolNumber, setSchoolNumber] = useState<string>('');

  const fetchData = useCallback(
    async (page: number) => {
      const res = await Api.get(`/uniform/personal?date=${date}&limit=30&offset=${page}`);
      setData(res.data.data);
      setCount(res.data.count);
    },
    [date]
  );

  const checkInput = () => {
    if (!name.trim()) {
      showToast('❗ 이름 칸이 비어있습니다.', 'danger');
      return;
    }

    if (!schoolNumber.trim()) {
      showToast('❗ 학번 칸이 비어있습니다.', 'danger');
    }
  };

  const onPlusClick = async () => {
    checkInput();

    const { grade, class: clazz, number } = convertSchoolNumber(schoolNumber);
    const [department, realClass] = convertClassToDepartment(clazz);

    await Api.put('/uniform/personal/up', {
      name,
      department,
      grade,
      class: realClass,
      number,
      date
    });

    showToast(`${schoolNumber} ${name} 학생의 점수를 올렸습니다.`, 'success');
  };

  const onMinusClick = async () => {
    checkInput();

    const { grade, class: clazz, number } = convertSchoolNumber(schoolNumber);
    const [department, realClass] = convertClassToDepartment(clazz);

    await Api.put('/uniform/personal/down', {
      name,
      department,
      grade,
      class: realClass,
      number,
      date
    });

    showToast(`${schoolNumber} ${name} 학생의 점수를 내렸습니다.`, 'success');
  };

  return (
    <>
      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>교복데이 관리 (개인)</Heading1>
          <Heading3>개인별 교복데이 점수를 올리거나 내립니다.</Heading3>
          <BlankLine gap={30} />
          <p>
            <StyledNumber>1</StyledNumber>날짜 선택 후 날짜별로 변화한 교복데이 점수를 확인할 수
            있습니다.
          </p>
          <p>
            <StyledNumber>2</StyledNumber>학생 정보 입력, 날짜 선택 후 점수를 올리거나 내릴 수
            있습니다.
          </p>
          <p>
            <StyledNumber>3</StyledNumber>날짜별 조회 시 0점인 학생은 표시하지 않습니다.
          </p>
          <BlankLine gap={30} />

          <div>
            <HeaderGroup>
              <StyledInput
                type="text"
                placeholder="학생 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <StyledInput
                type="number"
                placeholder="학번 ex.20101"
                value={schoolNumber}
                onChange={(e) => setSchoolNumber(e.target.value)}
              />
              <StyledSelect value={date} onChange={(e) => setDate(e.target.value)}>
                {[9, 10, 11, 12, 13, 14, 15, 16].map((i) => {
                  return (
                    <option value={`2020-12-${i}`} key={`2020-12-${i}`}>
                      2020년 12월 {i}일
                    </option>
                  );
                })}
              </StyledSelect>
            </HeaderGroup>

            <HeaderButtonGroup>
              <StyledButton onClick={onPlusClick}>올리기</StyledButton>
              <StyledButton onClick={onMinusClick}>내리기</StyledButton>
              <StyledButton onClick={() => fetchData(1)}>날짜별 조회</StyledButton>
            </HeaderButtonGroup>
          </div>

          <BlankLine gap={30} />

          <UniformPersonalTable
            list={data}
            count={count}
            onPageChange={(page) => fetchData(page)}
          />
        </StyledContent>
      </MainSideBarContainer>
    </>
  );
};

export default UniformPersonalPage;
