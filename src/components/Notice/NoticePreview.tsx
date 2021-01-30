import React from 'react';
import styled from 'styled-components';
import { SCREEN_SIZE } from 'sinamon-sikhye';
import NoticePreviewCard from '../Card/NoticePreviewCard';

const NoticePreviewContainer = styled.div`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

interface PreviewProps {
  readonly notice: string;
}

const NoticePreview: React.FC<PreviewProps> = ({ notice }) => {
  return (
    <NoticePreviewContainer>
      <NoticePreviewCard notice={notice} />
    </NoticePreviewContainer>
  );
};

export default NoticePreview;
