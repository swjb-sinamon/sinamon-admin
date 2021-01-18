import React from 'react';
import QrReader from 'react-qr-reader';
import styled from 'styled-components';
import { Heading2, Heading3, Modal, BlankLine, showToast } from 'sinamon-sikhye';

const ReaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface UmbrellaReturnQRModalProps {
  readonly open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  readonly onScanSuccess: (qr: string | null) => void;
}

const UmbrellaReturnQRModal: React.FC<UmbrellaReturnQRModalProps> = ({ open, onScanSuccess }) => {
  return (
    <Modal width={450} height={450} name="ReturnQRScan" state={open}>
      <Heading2>스캔 대기 중...</Heading2>
      <Heading3>반납 처리할 학생의 QR코드를 스캔해주세요.</Heading3>
      <BlankLine gap={10} />
      <ReaderWrapper>
        <QrReader
          onScan={onScanSuccess}
          onError={(e) => {
            if (e.message === 'Permission denied') {
              showToast('카메라 권한 허용이 필요합니다.', 'danger');
            }
          }}
          style={{ width: '250px' }}
        />
      </ReaderWrapper>
    </Modal>
  );
};

export default UmbrellaReturnQRModal;
