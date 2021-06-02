import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BlankLine, Heading1, Heading3, MainSideBarContainer } from 'sinamon-sikhye';
import { Helmet } from 'react-helmet';
import MainSideBar from '../components/MainSideBar';
import { AnonymousType } from '../types/Payload';
import Api from '../api';
import AnonymousTable from '../components/Anonymous/AnonymousTable';
import AnonymousAddReplyModal from '../components/Anonymous/AnonymousAddReplyModal';

const StyledContent = styled.div`
  margin: 3rem;
`;

const AnonymousAdminPage: React.FC = () => {
  const [data, setData] = useState<AnonymousType[]>([]);

  const addReplyModalOpen = useState<boolean>(false);
  const showReplyModalOpen = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    Api.get('/anonymous').then((res) => {
      if (res && res.data.success) setData(res.data.data);
    });
  }, []);

  const onTableButtonClick = (func: (v: boolean) => void) => (i: number) => {
    setId(i);
    func(true);
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
            onAddReplyClick={onTableButtonClick(addReplyModalOpen[1])}
            onShowReplyClick={onTableButtonClick(showReplyModalOpen[1])}
            onEditReplyClick={onTableButtonClick(showReplyModalOpen[1])}
            onDeleteReplyClick={onTableButtonClick(showReplyModalOpen[1])}
          />
        </StyledContent>
      </MainSideBarContainer>

      <AnonymousAddReplyModal id={id} open={addReplyModalOpen} />
    </>
  );
};

export default AnonymousAdminPage;
