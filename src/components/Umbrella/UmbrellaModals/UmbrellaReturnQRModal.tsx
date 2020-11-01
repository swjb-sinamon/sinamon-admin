import React from 'react';
import QrReader from 'react-qr-reader';
import { Heading2, Heading3 } from '../../../atomics/Typography/Heading';
import Modal from '../../Modal';
import showToast from '../../../utils/Toast';

interface UmbrellaReturnQRModal {
  readonly open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  readonly onScanSuccess: (qr: string | null) => void;
}

const UmbrellaReturnQRModal: React.FC<UmbrellaReturnQRModal> = ({ open, onScanSuccess }) => {
  return (
    <Modal width={500} height={500} name="ReturnQRScan" state={open}>
      <div
        style={{
          textAlign: 'center'
        }}
      >
        <Heading2>스캔 대기 중...</Heading2>
        <Heading3>반납 처리할 학생의 QR코드를 스캔해주세요.</Heading3>
      </div>
      <QrReader
        onScan={onScanSuccess}
        onError={(e) => {
          if (e.message === 'Permission denied') {
            showToast('❗ 카메라 권한 허용이 필요합니다.', 'danger');
          }
        }}
        style={{ width: '320px' }}
      />
    </Modal>
  );
};

export default UmbrellaReturnQRModal;
