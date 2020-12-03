import React from 'react';
import { Heading2, Heading3 } from '../../../atomics/Typography/Heading';
import Input from '../../../atomics/Form/Input';
import BlankLine from '../../../utils/BlankLine';
import Label from '../../../atomics/Form/Label';
import { MediumButton } from '../../../atomics/Button';
import Modal from '../../Modal';

interface UmbrellaReturnManualModalProps {
  readonly open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  readonly name: [string, React.Dispatch<React.SetStateAction<string>>];
  readonly schoolNumber: [string, React.Dispatch<React.SetStateAction<string>>];
  readonly onClick: React.MouseEventHandler;
}

const UmbrellaReturnManualModal: React.FC<UmbrellaReturnManualModalProps> = ({
  open,
  name,
  schoolNumber,
  onClick
}) => {
  return (
    <Modal width={450} height={450} name="ReturnManual" state={open}>
      <Heading2>학생 정보 수동 입력</Heading2>
      <Heading3>클릭 시 즉시 반납 처리합니다.</Heading3>

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

      <MediumButton onClick={onClick}>반납하기</MediumButton>
    </Modal>
  );
};

export default UmbrellaReturnManualModal;
