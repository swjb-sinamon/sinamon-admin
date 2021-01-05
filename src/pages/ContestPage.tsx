import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BlankLine,
  Heading1,
  Heading2,
  Heading3,
  Input,
  Label,
  MainSideBarContainer,
  MediumButton,
  Modal,
  Radio,
  SCREEN_SIZE,
  Select,
  showToast
} from 'sinamon-sikhye';
import { Helmet } from 'react-helmet';
import MainSideBar from '../components/MainSideBar';
import Api from '../api';
import { ContestType } from '../types/Payload';
import ContestTable from '../components/ContestTable';
import { convertClassToDepartment, convertSchoolNumber } from '../utils/Converter/SchoolNumber';

const StyledContent = styled.div`
  margin: 3rem;
`;

const StyledSelect = styled(Select)`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    width: 100%;
  }
`;

const StyledInput = styled(Input)`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LeftHeader = styled.div`
  & > * {
    margin-right: 10px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const StyledCreateButton = styled(MediumButton)`
  height: 40px;
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    margin-left: 10px;
  }
`;

const RadioList = styled.div`
  & > * {
    margin-right: 10px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const ContestPage: React.FC = () => {
  const [data, setData] = useState<ContestType[]>([]);
  const [count, setCount] = useState<number>(0);

  const [role, setRole] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const open = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [schoolNumber, setSchoolNumber] = useState<string>('');
  const [inputRole, setInputRole] = useState<string>('');

  const fetchMemberList = useCallback((page: number, _role: string) => {
    const roleQuery = _role === '' ? '' : `role=${_role}`;
    Api.get(`/contest?limit=30&page=${page}&${roleQuery}`).then((res) => {
      if (res.data && res.data.success) {
        setData(res.data.data);
        setCount(res.data.count);
      }
    });
  }, []);

  useEffect(() => fetchMemberList(1, role), [fetchMemberList, role]);

  const onSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;

    const roleQuery = role === '' ? '' : `role=${role}`;
    Api.get(`/contest?limit=30&page=1&${roleQuery}&search=${search}`).then((res) => {
      if (res.data && res.data.success) {
        setData(res.data.data);
        setCount(res.data.count);
      }
    });
  };

  const onCreateButtonClick = () => {
    if (!name.trim()) {
      showToast('❗ 이름 칸이 비어있습니다.', 'danger');
      return;
    }

    if (!schoolNumber.trim()) {
      showToast('❗ 학번 칸이 비어있습니다.', 'danger');
      return;
    }

    if (schoolNumber.length !== 5) {
      showToast('❗ 학번 형식이 잘못돼었습니다.', 'danger');
      return;
    }

    if (!inputRole.trim()) {
      showToast('❗ 역할을 선택해주세요.', 'danger');
      return;
    }

    const { grade, class: clazz, number } = convertSchoolNumber(schoolNumber);
    const [department, realClass] = convertClassToDepartment(clazz);

    Api.post('/contest', {
      name,
      department,
      grade,
      class: realClass,
      number,
      role: inputRole
    }).then(() => {
      showToast(`🏅 ${name}님의 참가 신청이 완료되었습니다!`, 'success');

      setName('');
      setSchoolNumber('');
      setInputRole('');

      fetchMemberList(1, role);
    });
  };

  return (
    <>
      <Helmet>
        <title>공모전관리 - 수정과 관리자</title>
      </Helmet>

      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>공모전 관리</Heading1>
          <Heading3>공모전 참여자를 관리하고 수동 추가할 수 있습니다.</Heading3>
          <BlankLine gap={30} />

          <Header>
            <LeftHeader>
              <StyledSelect value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">전체</option>
                <option value="IDEA">기획</option>
                <option value="DEVELOP">개발</option>
                <option value="DESIGN">디자인</option>
              </StyledSelect>
              <StyledInput
                type="text"
                placeholder="엔터를 눌러 참여자 검색하기"
                onKeyPress={onSearchSubmit}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </LeftHeader>

            <StyledCreateButton onClick={() => open[1](true)}>수동 추가</StyledCreateButton>
          </Header>

          <BlankLine gap={10} />

          <ContestTable
            list={data}
            count={count}
            onPageChange={(currentOffset) => fetchMemberList(currentOffset, role)}
          />
        </StyledContent>
      </MainSideBarContainer>

      <Modal width={400} height={400} name="AddMember" state={open}>
        <Heading2>참여자 수동 추가</Heading2>
        <BlankLine gap={10} />

        <Label>참여자 이름</Label>
        <Input
          type="text"
          placeholder="ex. 홍길동"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <BlankLine gap={10} />

        <Label>참여자 학번</Label>
        <Input
          type="number"
          placeholder="ex. 10101"
          value={schoolNumber}
          onChange={(e) => setSchoolNumber(e.target.value)}
        />

        <BlankLine gap={10} />

        <Label>참여자 역할</Label>
        <RadioList>
          <Radio
            type="radio"
            name="role"
            title="기획"
            value="IDEA"
            onChange={(e) => setInputRole(e.target.value)}
          />
          <Radio
            type="radio"
            name="role"
            title="개발"
            value="DEVELOP"
            onChange={(e) => setInputRole(e.target.value)}
          />
          <Radio
            type="radio"
            name="role"
            title="디자인"
            value="DESIGN"
            onChange={(e) => setInputRole(e.target.value)}
          />
        </RadioList>

        <BlankLine gap={30} />

        <MediumButton onClick={onCreateButtonClick}>추가하기</MediumButton>
      </Modal>
    </>
  );
};

export default ContestPage;
