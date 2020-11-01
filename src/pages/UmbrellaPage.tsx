import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainSideBar from '../components/MainSideBar';
import MainSideBarContainer from '../components/MainSideBar/MainSideBarContainer';
import Input from '../atomics/Form/Input';
import BlankLine from '../utils/BlankLine';
import Label from '../atomics/Form/Label';
import { HugeButton, MediumButton } from '../atomics/Button';
import SCREEN_SIZE from '../styles/screen-size';
import Api from '../api';
import UmbrellaHeader from '../components/Umbrella/UmbrellaHeader';
import UmbrellaTable from '../components/Umbrella/UmbrellaTable';
import UmbrellaPreview from '../components/Umbrella/UmbrellaPreview';
import UmbrellaQRModal from '../components/Umbrella/UmbrellaModals/UmbrellaQRModal';
import UmbrellaManualModal from '../components/Umbrella/UmbrellaModals/UmbrellaManualModal';
import { UmbrellaType } from '../types/Umbrella';
import { convertClassToDepartment, convertSchoolNumber } from '../utils/Converter/SchoolNumber';
import showToast from '../utils/Toast';
import UmbrellaReturnQRModal from '../components/Umbrella/UmbrellaModals/UmbrellaReturnQRModal';
import UmbrellaReturnManualModal from '../components/Umbrella/UmbrellaModals/UmbrellaReturnManualModal';

const StyledContent = styled.div`
  margin: 3rem;
`;

const StyledInput = styled(Input)`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    width: 100%;
  }
`;

const UmbrellaPage: React.FC = () => {
  const [originData, setOriginData] = useState<UmbrellaType[]>([]);
  const [data, setData] = useState<UmbrellaType[]>([]);
  const [currentUmbrella, setCurrentUmbrella] = useState<UmbrellaType | undefined>(undefined);

  const returnQrOpen = useState<boolean>(false);
  const returnManualOpen = useState<boolean>(false);
  const returnManualName = useState<string>('');
  const returnManualSchoolNumber = useState<string>('');

  const qrOpen = useState<boolean>(false);
  const manualOpen = useState<boolean>(false);
  const manualName = useState<string>('');
  const manualSchoolNumber = useState<string>('');

  const fetchUmbrellaList = () => {
    Api.get('/umbrella?rental=false').then((res) => {
      setOriginData(res.data.data);
      setData(res.data.data);
    });
  };

  useEffect(() => fetchUmbrellaList(), []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUmbrella(undefined);

    const searchText = e.target.value.toLowerCase();
    const foundUmbrella = originData.filter((i) => i.name.includes(searchText));
    setData(foundUmbrella);
  };

  const onRadioChange = (inputData: UmbrellaType) => {
    setCurrentUmbrella(inputData);
  };

  const onReturnScanSuccess = (qr: string | null) => {
    if (!qr || !currentUmbrella) return;
  };

  const onReturnManualSuccessClick = () => {
    const [name] = returnManualName;
    const { grade, class: clazz, number } = convertSchoolNumber(returnManualSchoolNumber[0]);

    if (!name.trim()) {
      showToast('❗ 이름 칸이 비어있습니다.', 'danger');
      return;
    }

    if (!returnManualSchoolNumber[0].trim()) {
      showToast('❗ 학번 칸이 비어있습니다.', 'danger');
      return;
    }

    if (returnManualSchoolNumber[0].length !== 5) {
      showToast('❗ 학번 형식이 잘못돼었습니다.', 'danger');
      return;
    }

    const [department, realClass] = convertClassToDepartment(clazz);
    if (!currentUmbrella) return;
  };

  const onQRScanClick = () => {
    if (!currentUmbrella) {
      showToast('❗ 대여해줄 우산을 먼저 선택해주세요.', 'danger');
      return;
    }

    qrOpen[1](true);
  };

  const onManualClick = () => {
    if (!currentUmbrella) {
      showToast('❗ 대여해줄 우산을 먼저 선택해주세요.', 'danger');
      return;
    }

    manualOpen[1](true);
  };

  const onScanSuccess = (qr: string | null) => {
    if (!qr || !currentUmbrella) return;
    Api.post('/umbrella/qr', {
      data: qr,
      umbrellaName: currentUmbrella.name
    }).then(() => {
      qrOpen[1](false);
      showToast('☂ 성공적으로 우산을 대여했습니다.', 'success');
      fetchUmbrellaList();
    });
  };

  const onManualSuccessClick = () => {
    const [name] = manualName;
    const { grade, class: clazz, number } = convertSchoolNumber(manualSchoolNumber[0]);

    if (!name.trim()) {
      showToast('❗ 이름 칸이 비어있습니다.', 'danger');
      return;
    }

    if (!manualSchoolNumber[0].trim()) {
      showToast('❗ 학번 칸이 비어있습니다.', 'danger');
      return;
    }

    if (manualSchoolNumber[0].length !== 5) {
      showToast('❗ 학번 형식이 잘못돼었습니다.', 'danger');
      return;
    }

    const [department, realClass] = convertClassToDepartment(clazz);
    if (!currentUmbrella) return;

    Api.post('/umbrella/info', {
      name,
      department,
      grade,
      class: realClass,
      number,
      umbrellaName: currentUmbrella.name
    }).then(() => {
      manualOpen[1](false);
      showToast('☂ 성공적으로 우산을 대여했습니다.', 'success');
      fetchUmbrellaList();
    });
  };

  return (
    <>
      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <UmbrellaHeader
            onQRClick={() => returnQrOpen[1](true)}
            onManualClick={() => returnManualOpen[1](true)}
          />

          <BlankLine gap={30} />

          <Label>빌려줄 우산 선택하기</Label>
          <StyledInput type="text" placeholder="우산 이름 검색하기" onChange={onInputChange} />

          <BlankLine gap={10} />

          <UmbrellaTable umbrellaList={data} onRadioChange={onRadioChange} />

          <BlankLine gap={30} />

          <Label>
            빌려줄 우산 정보를 미리 확인하세요{' '}
            <span role="img" aria-label="exclamation mark">
              ❗
            </span>
          </Label>
          <UmbrellaPreview umbrella={currentUmbrella} />

          <BlankLine gap={30} />

          <HugeButton onClick={onQRScanClick}>QR코드 스캔</HugeButton>
          <BlankLine gap={10} />
          <MediumButton width={200} onClick={onManualClick}>
            학생 정보 직접 입력하기
          </MediumButton>
        </StyledContent>
      </MainSideBarContainer>

      <UmbrellaReturnQRModal open={returnQrOpen} onScanSuccess={onReturnScanSuccess} />
      <UmbrellaReturnManualModal
        open={returnManualOpen}
        name={returnManualName}
        schoolNumber={returnManualSchoolNumber}
        onClick={onReturnManualSuccessClick}
      />

      <UmbrellaQRModal open={qrOpen} onScanSuccess={onScanSuccess} />
      <UmbrellaManualModal
        open={manualOpen}
        name={manualName}
        schoolNumber={manualSchoolNumber}
        onClick={onManualSuccessClick}
      />
    </>
  );
};

export default UmbrellaPage;
