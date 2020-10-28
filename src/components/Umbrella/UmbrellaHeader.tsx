import React from 'react';
import { Heading1, Heading3 } from '../../atomics/Typography/Heading';
import BlankLine from '../../utils/BlankLine';
import { MediumButton } from '../../atomics/Button';

const UmbrellaHeader: React.FC = () => {
  return (
    <>
      <Heading1>우산 대여 · 반납</Heading1>
      <Heading3>대여해줄 우산을 선택하고 QR코드를 스캔합니다.</Heading3>
      <BlankLine gap={10} />
      <MediumButton>반납신청</MediumButton>
    </>
  );
};

export default UmbrellaHeader;
