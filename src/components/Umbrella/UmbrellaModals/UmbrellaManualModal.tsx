import React from 'react';
import styled from 'styled-components';
import { Heading2 } from '../../../atomics/Typography/Heading';
import Input from '../../../atomics/Form/Input';
import BlankLine from '../../../utils/BlankLine';
import Label from '../../../atomics/Form/Label';
import { MediumButton } from '../../../atomics/Button';
import Modal from '../../Modal';

const CenterHeading2 = styled(Heading2)`
  text-align: center;
`;

interface UmbrellaManualModalProps {
  readonly open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  readonly name: [string, React.Dispatch<React.SetStateAction<string>>];
  readonly schoolNumber: [string, React.Dispatch<React.SetStateAction<string>>];
  readonly onClick: React.MouseEventHandler;
}

const UmbrellaManualModal: React.FC<UmbrellaManualModalProps> = ({
  open,
  name,
  schoolNumber,
  onClick
}) => {
  return (
    <Modal width={450} height={450} name="Manual" state={open}>
      <CenterHeading2>학생 정보 수동 입력</CenterHeading2>
      <BlankLine gap={10} />

      <Label>이름</Label>
      <Input
        type="text"
        value={name[0]}
        onChange={(e) => name[1](e.target.value)}
        placeholder="ex. 홍길동"
      />

      <BlankLine gap={10} />

      <Label>학번</Label>
      <Input
        type="number"
        value={schoolNumber[0]}
        onChange={(e) => schoolNumber[1](e.target.value)}
        placeholder="ex. 10101"
        maxLength={5}
      />

      <BlankLine gap={30} />

      <div style={{ textAlign: 'center' }}>
        <MediumButton onClick={onClick}>대여하기</MediumButton>
      </div>
    </Modal>
  );
};

export default UmbrellaManualModal;
