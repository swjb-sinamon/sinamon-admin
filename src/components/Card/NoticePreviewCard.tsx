import React from 'react';
import styled from 'styled-components';
import { Card, CardTitle, Heading3 } from 'sinamon-sikhye';

const StyledNotice = styled.div`
  display: flex;
  justify-content: center;

  & > h3 {
    width: 100%;
  }
  overflow: scroll;
`;

interface PreviewProps {
  readonly notice: string;
}

const NoticePreviewCard: React.FC<PreviewProps> = ({ notice }) => {
  return (
    <Card columnStart={1} columnEnd={4} rowStart={3} rowEnd={4}>
      <CardTitle>
        <span role="img" aria-label="notice">
          📢
        </span>
        알려드려요!
      </CardTitle>
      <StyledNotice>
        <Heading3>
          {notice.split('\\n').map((line, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </Heading3>
      </StyledNotice>
    </Card>
  );
};

export default NoticePreviewCard;
