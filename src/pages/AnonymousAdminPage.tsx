import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BlankLine, Heading1, Heading3, MainSideBarContainer, showToast } from 'sinamon-sikhye';
import { Helmet } from 'react-helmet';
import swal from 'sweetalert';
import MainSideBar from '../components/MainSideBar';
import { AnonymousType } from '../types/Payload';
import Api from '../api';
import AnonymousTable from '../components/Anonymous/AnonymousTable';
import AnonymousAddReplyModal from '../components/Anonymous/AnonymousAddReplyModal';
import AnonymousEditReplyModal from '../components/Anonymous/AnonymousEditReplyModal';

const StyledContent = styled.div`
  margin: 3rem;
`;

const AnonymousAdminPage: React.FC = () => {
  const [data, setData] = useState<AnonymousType[]>([]);

  const addReplyModalOpen = useState<boolean>(false);
  const editReplyModalOpen = useState<boolean>(false);
  const [focusAnonymousId, setFocusAnonymousId] = useState<number>(0);
  const [focusReplyId, setFocusReplyId] = useState<number>(0);

  const fetchData = useCallback(() => {
    Api.get('/anonymous').then((res) => {
      if (res && res.data.success) setData(res.data.data);
    });
  }, []);

  useEffect(() => fetchData(), [fetchData]);

  const onAddReplyClick = (anonymousData: AnonymousType) => {
    setFocusAnonymousId(anonymousData.id);
    addReplyModalOpen[1](true);
  };

  const onEditReplyClick = (anonymousData: AnonymousType) => {
    setFocusReplyId(anonymousData.reply[0].id);
    editReplyModalOpen[1](true);
  };

  const onDeleteClick = async (anonymousData: AnonymousType) => {
    const state = await swal({
      title: '정말로 삭제하시겠습니까?',
      text: '삭제 시 복구할 수 없습니다.',
      icon: 'warning',
      buttons: ['취소', '삭제'],
      dangerMode: true
    });

    if (!state) return;

    await Api.delete(`/anonymous/reply/${anonymousData.reply[0].id}`);
    showToast('답변이 삭제되었습니다.', 'success');

    fetchData();
  };

  return (
    <>
      <Helmet>
        <title>익명건의함 관리 - 수정과 관리자</title>
      </Helmet>

      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>익명건의함 관리</Heading1>
          <Heading3>익명건의를 관리하고 답변을 달 수 있습니다.</Heading3>

          <BlankLine gap={30} />

          <AnonymousTable
            list={data}
            onAddReplyClick={onAddReplyClick}
            onEditReplyClick={onEditReplyClick}
            onDeleteReplyClick={onDeleteClick}
          />
        </StyledContent>
      </MainSideBarContainer>

      <AnonymousAddReplyModal
        id={focusAnonymousId}
        open={addReplyModalOpen}
        onSuccess={() => fetchData()}
      />
      <AnonymousEditReplyModal
        replyId={focusReplyId}
        open={editReplyModalOpen}
        onSuccess={() => fetchData()}
      />
    </>
  );
};

export default AnonymousAdminPage;
