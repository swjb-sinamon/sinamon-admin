import React from 'react';
import { Heading1, Heading3 } from '../../atomics/Typography/Heading';
import BlankLine from '../../utils/BlankLine';
import { MediumButton } from '../../atomics/Button';
import ButtonGroup from '../ButtonGroup';

interface UmbrellaHeaderProps {
  readonly onQRClick?: React.MouseEventHandler;
  readonly onManualClick?: React.MouseEventHandler;
}

const UmbrellaHeader: React.FC<UmbrellaHeaderProps> = ({ onQRClick, onManualClick }) => {
  return (
    <>
      <Heading1>우산 대여 · 반납</Heading1>
      <Heading3>대여해줄 우산을 선택하고 QR코드를 스캔합니다.</Heading3>
      <BlankLine gap={10} />
      <ButtonGroup>
        <MediumButton width={120} onClick={onQRClick}>
          반납신청 (QR)
        </MediumButton>
        <MediumButton width={120} onClick={onManualClick}>
          반납신청 (수동)
        </MediumButton>
      </ButtonGroup>
    </>
  );
};

export default UmbrellaHeader;
