import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {
  BlankLine,
  Heading1,
  Heading2,
  Heading3,
  Label,
  MainSideBarContainer,
  MediumButton,
  SCREEN_SIZE,
  showToast,
  ButtonGroup
} from 'sinamon-sikhye';
import MainSideBar from '../components/MainSideBar';
import Api from '../api';
import NoticePreview from '../components/Notice/NoticePreview';
import ErrorMessage from '../error/ErrorMessage';

const StyledContent = styled.div`
  margin: 3rem;
  display: flex;
  flex-direction: column;
`;

const ModTextArea = styled.textarea`
  resize: none;
  font-family: inset;
  font-size: 0.8rem;
  width: 40rem;

  border: none;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(169, 169, 169, 0.2);
  outline: none;

  padding: 1.8rem;
  margin-bottom: 1rem;
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    width: 100%;
  }
`;

const ModNoticeForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoticePage: React.FC = () => {
  const [notice, setNotice] = useState<string>('');

  useEffect(() => {
    Api.get('/notice').then((res) => {
      if (res.data && res.data.success) setNotice(res.data.data);
    });
  }, []);

  const postNotice = async (type?: string) => {
    if (type === 'reset') {
      setNotice('');
    }

    try {
      await Api.put('/notice', {
        notice: notice.trim()
      });
      showToast('성공적으로 공지사항이 수정되었습니다!', 'success');
    } catch (e) {
      if (!e.response.data) return;
      const { success, error } = e.response.data;
      if (success || !error) return;

      if (error === ErrorMessage.NO_PERMISSION) {
        showToast('관리자만 접근 가능한 페이지입니다.', 'warning');
      }
    }
  };

  const onModClick = async () => {
    if (notice.trim() === '') {
      showToast('내용을 채워주세요!', 'danger');
      return;
    }
    await postNotice();
  };

  const onResetClick = async () => {
    const msg = '정말 초기화 하시겠습니까? \n( 공지사항의 내용이 모두 지워진 채로 저장됩니다. )';
    if (!window.confirm(msg)) {
      return;
    }
    setNotice('');
    postNotice();
    }).then(async (confirm) => {
      if (confirm) {
        await postNotice('reset');
  };

  return (
    <>
      <Helmet>
        <title>공지사항 관리 - 수정과 관리자</title>
      </Helmet>

      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>공지사항 관리</Heading1>
          <Heading3>수정과 사이트의 공지사항을 관리 합니다.</Heading3>

          <BlankLine gap={20} />

          <Heading3>※ 줄바꿈은 \n을 사용해야 합니다.</Heading3>
          <Label>
            ex) A\nB <br />A<br />B
          </Label>

          <BlankLine gap={10} />

          <ModNoticeForm>
            <ModTextArea
              placeholder="수정할 내용을 입력하세요"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotice(e.target.value)}
              value={notice}
            />

            <BlankLine gap={10} />

            <ButtonGroup>
              <MediumButton onClick={onModClick}>수정하기</MediumButton>
              <MediumButton onClick={onResetClick}>초기화</MediumButton>
            </ButtonGroup>
          </ModNoticeForm>

          <BlankLine gap={20} />

          <Heading2>미리보기 (적용화면)</Heading2>
          <Label>모바일 버전에서는 정확한 미리보기가 불가능 할 수 있습니다.</Label>
          <BlankLine gap={10} />

          <NoticePreview notice={notice} />
        </StyledContent>
      </MainSideBarContainer>
    </>
  );
};

export default NoticePage;
