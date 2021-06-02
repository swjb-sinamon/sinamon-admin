import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BlankLine, Heading2, MediumButton, Modal, SCREEN_SIZE, showToast } from 'sinamon-sikhye';
import styled from 'styled-components';
import swal from 'sweetalert';
import Api from '../../api';

interface Props {
  readonly open: [boolean, Dispatch<SetStateAction<boolean>>];
  readonly id: number;
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

const AnonymousAddReplyModal: React.FC<Props> = ({ id, open, onSuccess }) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => setContent(''), [open]);

  const onEnterKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      onAddClick();
    }
  };

  const onAddClick = async () => {
    const confirm = await swal({
      title: '정말로 등록할까요?',
      icon: 'info',
      buttons: ['아니오', '예']
    });

    if (!confirm) return;

    await Api.post(`/anonymous/${id}/reply`, {
      content
    });

    open[1](false);

    showToast('답변이 등록되었습니다!', 'success');

    onSuccess();
  };

  return (
    <Modal width={600} height={500} name="AnonymousAddModal" state={open}>
      <Heading2>답변달기</Heading2>
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

      <MediumButton onClick={onAddClick}>등록</MediumButton>
    </Modal>
  );
};

export default AnonymousAddReplyModal;
