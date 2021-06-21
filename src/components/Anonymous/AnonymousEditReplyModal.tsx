import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BlankLine, Heading2, MediumButton, Modal, SCREEN_SIZE, showToast } from 'sinamon-sikhye';
import styled from 'styled-components';
import swal from 'sweetalert';
import Api from '../../api';

interface Props {
  readonly open: [boolean, Dispatch<SetStateAction<boolean>>];
  readonly replyId: number;
  readonly onSuccess: () => void;
}

const ReplyForm = styled.textarea`
  width: 400px;
  height: 300px;

  font-family: 'Noto Sans KR', sans-serif;

  padding: 1rem;

  resize: none;

  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_MOBILE}) {
    width: 200px;
    height: 300px;
  }
`;

const AnonymousEditReplyModal: React.FC<Props> = ({ replyId, open, onSuccess }) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (replyId === 0) return;

    Api.get(`/anonymous/reply/${replyId}`).then((res) => {
      if (res.data && res.data.success) {
        setContent(res.data.data.content);
      }
    });
  }, [replyId]);

  const onEnterKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      onEditClick();
    }
  };

  const onEditClick = async () => {
    const confirm = await swal({
      title: '정말로 수정할까요?',
      icon: 'info',
      buttons: ['아니오', '예']
    });

    if (!confirm) return;

    await Api.put(`/anonymous/reply/${replyId}`, {
      content
    });

    open[1](false);

    showToast('답변이 수정되었습니다!', 'success');

    onSuccess();
  };

  return (
    <Modal width={600} height={500} name="AnonymousEditModal" state={open}>
      <Heading2>답변수정</Heading2>
      <BlankLine gap={10} />

      <ReplyForm
        maxLength={400}
        placeholder="최대 400자"
        autoFocus
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyPress={onEnterKeyPress}
      />

      <BlankLine gap={30} />

      <MediumButton onClick={onEditClick}>수정</MediumButton>
    </Modal>
  );
};

export default AnonymousEditReplyModal;
