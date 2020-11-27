import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainSideBar from '../components/MainSideBar';
import MainSideBarContainer from '../components/MainSideBar/MainSideBarContainer';
import { Heading1, Heading2, Heading3 } from '../atomics/Typography/Heading';
import BlankLine from '../utils/BlankLine';
import Api from '../api';
import Input from '../atomics/Form/Input';
import SCREEN_SIZE from '../styles/screen-size';
import Label from '../atomics/Form/Label';
import { UmbrellaWithRentalType } from '../types/Umbrella';
import { MediumButton } from '../atomics/Button';
import UmbrellaManageTable from '../components/UmbrellaManage/UmbrellaManageTable';
import Modal from '../components/Modal';
import Select from '../atomics/Form/Select';
import showToast from '../utils/Toast';

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
  const [searchList, setSearchList] = useState<UmbrellaWithRentalType[]>([]);
  const open = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('good');

  const fetchUmbrellaList = (page: number) => {
    Api.get(`/umbrella/all?limit=10&offset=${page}`).then((res) => {
      setList(res.data.data);
      setSearchList(res.data.data);
      setCount(res.data.count);
    });
  };

  useEffect(() => fetchUmbrellaList(1), []);

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    const foundUmbrella = list.filter((i) => i.name.includes(searchText));
    setSearchList(foundUmbrella);
  };

  const onCreateButtonClick = () => {
    if (name.trim() === '' || type.trim() === '') {
      showToast('❗ 빈칸이 있습니다.', 'danger');
      return;
    }

    Api.post('/umbrella', {
      name,
      status: type
    }).then(() => {
      showToast('🌂 우산이 추가되었습니다.', 'success');
      open[1](false);
      setName('');
      setType('good');

      fetchUmbrellaList(1);
    });
  };

  return (
    <>
      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>우산 목록 관리</Heading1>
          <Heading3>우산 목록과 대여 · 반납 상태를 관리합니다.</Heading3>
          <BlankLine gap={30} />

          <Header>
            <StyledInput
              type="text"
              placeholder="우산 이름 검색하기"
              onChange={onSearchInputChange}
            />
            <StyledCreateButton onClick={() => open[1](true)}>우산 추가</StyledCreateButton>
          </Header>

          <BlankLine gap={10} />

          <UmbrellaManageTable
            list={searchList}
            count={count}
            onPageChange={(currentOffset) => fetchUmbrellaList(currentOffset)}
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
