import React from 'react';
import styled from 'styled-components';
import { UmbrellaType } from '../../types/Umbrella';

const Preview = styled.div`
  width: 100%;
  padding: 1rem;

  font-size: 14px;

  background-color: white;
  border-radius: 3px;
  border: 1px solid var(--color-gray);
`;

const PreviewTitle = styled.b`
  display: inline-block;
  width: 95px;
`;

interface UmbrellaPreviewProps {
  readonly umbrella: UmbrellaType | undefined;
}

const UmbrellaPreview: React.FC<UmbrellaPreviewProps> = ({ umbrella }) => {
  const PreviewContent = () => {
    if (!umbrella) return <></>;

    const date = new Date();
    date.setDate(date.getDate() + 1);

    return (
      <>
        <p>
          <PreviewTitle>우산 이름: </PreviewTitle> {umbrella.name}
        </p>
        <p>
          <PreviewTitle>우산 상태: </PreviewTitle>{' '}
          {umbrella.status.replace('good', '좋음').replace('worse', '나쁨')}
        </p>
        <p>
          <PreviewTitle>우산 반납일: </PreviewTitle> {date.toLocaleDateString()}
        </p>
        <p>
          <PreviewTitle>우산 등록 날짜: </PreviewTitle>{' '}
          {new Date(umbrella.createdAt || '').toLocaleDateString()}
        </p>
      </>
    );
  };

  return (
    <Preview>
      <div>{umbrella === undefined ? <p>먼저 우산을 선택해주세요.</p> : <PreviewContent />}</div>
    </Preview>
  );
};

export default UmbrellaPreview;
