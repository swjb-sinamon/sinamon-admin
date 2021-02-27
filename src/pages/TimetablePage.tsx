import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BlankLine,
  Heading1,
  Heading3,
  Input,
  Label,
  MainSideBarContainer,
  MediumButton,
  SCREEN_SIZE,
  Select,
  showToast
} from 'sinamon-sikhye';
import { Helmet } from 'react-helmet';
import swal from 'sweetalert';
import MainSideBar from '../components/MainSideBar';
import { SubjectType } from '../types/Payload';
import Api from '../api';
import TimetableTable from '../components/Timetable/TimetableTable';
import TimetableModal from '../components/Timetable/TimetableModal';

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

interface ModalInputState {
  readonly subjectName: string;
  readonly teacher: string;
  readonly zoom: string;
}

const TimetablePage: React.FC = () => {
  const [data, setData] = useState<SubjectType[]>([]);
  const [count, setCount] = useState<number>(0);

  const [searchType, setSearchType] = useState<string>('subject');
  const [search, setSearch] = useState<string>('');

  const open = useState<boolean>(false);
  const [isEditModal, setEditModal] = useState<boolean>(false);
  const modalInput = useState<ModalInputState>({
    subjectName: '',
    teacher: '',
    zoom: ''
  });
  const [editId, setEditId] = useState<number | undefined>(undefined);

  const fetchTimetable = useCallback(
    (page: number, _search: string) => {
      Api.get(`/timetable?limit=30&page=${page}&key=${searchType}&search=${_search}`).then(
        (res) => {
          if (res.data && res.data.success) {
            setData(res.data.data);
            setCount(res.data.count);
          }
        }
      );
    },
    [searchType]
  );

  const onSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') fetchTimetable(1, search);
  };

  useEffect(() => fetchTimetable(1, ''), [fetchTimetable]);

  const onCreateClick = () => {
    modalInput[1]({
      subjectName: '',
      teacher: '',
      zoom: ''
    });
    setEditModal(false);
    open[1](true);
  };

  const onEditClick = (id: number, currentData: SubjectType) => {
    modalInput[1]({
      subjectName: currentData.subject,
      teacher: currentData.teacher,
      zoom: currentData.url
    });
    setEditId(id);
    setEditModal(true);
    open[1](true);
  };

  const onDeleteClick = async (id: number) => {
    const state = await swal({
      title: '정말로 삭제하시겠습니까?',
      text: '삭제 시 복구할 수 없습니다.',
      icon: 'warning',
      buttons: ['취소', '삭제'],
      dangerMode: true
    });

    if (!state) return;
    await Api.delete(`/timetable/${id}`);
    fetchTimetable(1, search);
    showToast('시간표가 삭제되었습니다.', 'success');
  };

  return (
    <>
      <Helmet>
        <title>시간표관리 - 수정과 관리자</title>
      </Helmet>

      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>시간표 관리</Heading1>
          <Heading3>시간표를 관리하고 줌 링크를 추가하세요.</Heading3>
          <Heading3>pwd가 포함된 줌 링크를 추가하면 비밀번호 입력을 생략할 수 있습니다.</Heading3>

          <BlankLine gap={30} />

          <Header>
            <LeftHeader>
              <StyledSelect value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="subject">과목명으로 검색</option>
                <option value="teacher">선생님으로 검색</option>
              </StyledSelect>
              <StyledInput
                type="text"
                placeholder="엔터를 눌러 검색하기"
                onKeyPress={onSearchSubmit}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </LeftHeader>

            <StyledCreateButton onClick={onCreateClick}>추가하기</StyledCreateButton>
          </Header>

          <BlankLine gap={10} />

          <Label>전체: {count}개</Label>

          <BlankLine gap={10} />

          <TimetableTable
            list={data}
            count={count}
            onPageChange={(currentOffset) => fetchTimetable(currentOffset, search)}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        </StyledContent>
      </MainSideBarContainer>

      <TimetableModal
        open={open}
        isEditModal={isEditModal}
        editId={editId}
        modalInput={modalInput}
        fetchTimetable={fetchTimetable}
      />
    </>
  );
};

export default TimetablePage;
