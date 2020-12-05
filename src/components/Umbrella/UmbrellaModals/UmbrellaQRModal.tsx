import React from 'react';
import QrReader from 'react-qr-reader';
import { Heading2, Heading3, Modal, showToast, BlankLine } from 'sinamon-sikhye';

interface UmbrellaQRModalProps {
  readonly open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  readonly onScanSuccess: (qr: string | null) => void;
}

const UmbrellaQRModal: React.FC<UmbrellaQRModalProps> = ({ open, onScanSuccess }) => {
  return (
    <Modal width={450} height={450} name="QRScan" state={open}>
      <Heading2>스캔 대기 중...</Heading2>
      <Heading3>학생 QR코드를 스캔해주세요.</Heading3>
      <BlankLine gap={10} />
      <QrReader
        onScan={onScanSuccess}
        onError={(e) => {
          if (e.message === 'Permission denied') {
            showToast('❗ 카메라 권한 허용이 필요합니다.', 'danger');
          }
        }}
        style={{ width: '250px' }}
      />
    </Modal>
  );
};

export default UmbrellaQRModal;
