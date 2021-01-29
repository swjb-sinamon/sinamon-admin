import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  MainSideBarContainer,
  Heading1,
  Heading3,
  BlankLine,
  Select,
  SCREEN_SIZE,
  showToast,
  MediumButton,
  Input,
  Modal,
  Heading2,
  Label
} from 'sinamon-sikhye';
import { Helmet } from 'react-helmet';
import MainSideBar from '../components/MainSideBar';
import Api from '../api';
import { UmbrellaWithRentalType } from '../types/Payload';
import UmbrellaManageTable from '../components/UmbrellaManage/UmbrellaManageTable';

const StyledContent = styled.div`
  margin: 3rem;
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

const StyledCreateButton = styled(MediumButton)`
  height: 40px;
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    margin-left: 10px;
  }
`;

const UmbrellaManagePage: React.FC = () => {
  const [list, setList] = useState<UmbrellaWithRentalType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  const open = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('good');

  const fetchUmbrellaList = (page: number, _search: string) => {
    Api.get(`/umbrella/all?limit=10&offset=${page}&search=${_search}`).then((res) => {
      setList(res.data.data);
      setCount(res.data.count);
    });
  };

  useEffect(() => fetchUmbrellaList(1, ''), []);

  const onCreateButtonClick = () => {
    if (name.trim() === '' || type.trim() === '') {
      showToast('빈칸이 있습니다.', 'danger');
      return;
    }

    Api.post('/umbrella', {
      name,
      status: type
    }).then(() => {
      showToast('우산이 추가되었습니다.', 'success');
      open[1](false);
      setName('');
      setType('good');

      fetchUmbrellaList(1, search);
    });
  };

  return (
    <>
      <Helmet>
        <title>우산관리 - 수정과 관리자</title>
      </Helmet>

      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>우산 목록 관리</Heading1>
          <Heading3>우산 목록과 대여 · 반납 상태를 관리합니다.</Heading3>
          <BlankLine gap={30} />

          <Header>
            <StyledInput
              type="text"
              placeholder="엔터를 눌러 우산 이름 검색하기"
              onKeyPress={(e) => {
                if (e.key === 'Enter') fetchUmbrellaList(1, search);
              }}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <StyledCreateButton onClick={() => open[1](true)}>우산 추가</StyledCreateButton>
          </Header>

          <BlankLine gap={10} />

          <Label>전체: {count}개</Label>

          <BlankLine gap={10} />

          <UmbrellaManageTable
            list={list}
            count={count}
            onPageChange={(currentOffset) => fetchUmbrellaList(currentOffset, search)}
          />
        </StyledContent>
      </MainSideBarContainer>

      <Modal width={400} height={400} name="CreateUmbrella" state={open}>
        <Heading2>우산 추가하기</Heading2>
        <BlankLine gap={10} />

        <Label>우산 이름</Label>
        <Input
          type="text"
          placeholder="ex. 우산1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <BlankLine gap={10} />

        <Label>상태</Label>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="good">좋음</option>
          <option value="worse">나쁨</option>
        </Select>

        <BlankLine gap={30} />

        <MediumButton onClick={onCreateButtonClick}>추가하기</MediumButton>
      </Modal>
    </>
  );
};

export default UmbrellaManagePage;
