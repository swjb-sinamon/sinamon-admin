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
  const [data, setData] = useState<UmbrellaType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentUmbrella, setCurrentUmbrella] = useState<UmbrellaType | undefined>(undefined);

  const [search, setSearch] = useState<string>('');

  const returnQrOpen = useState<boolean>(false);
  const returnManualOpen = useState<boolean>(false);
  const returnManualName = useState<string>('');
  const returnManualSchoolNumber = useState<string>('');

  const qrOpen = useState<boolean>(false);
  const manualOpen = useState<boolean>(false);
  const manualName = useState<string>('');
  const manualSchoolNumber = useState<string>('');

  const fetchUmbrellaList = (page: number) => {
    Api.get(`/umbrella?limit=10&offset=${page}`).then((res) => {
      setData(res.data.data);
      setCount(res.data.count);
    });
  };

  useEffect(() => fetchUmbrellaList(1), []);

  const onSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    Api.get(`/umbrella?limit=10&offset=1&search=${search}`).then((res) => {
      setData(res.data.data);
      setCount(res.data.count);
    });
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

  const onReturnScanSuccess = (qr: string | null) => {
    if (!qr) return;
    Api.post('/umbrella/return/qr', {
      data: qr
    }).then(() => {
      returnQrOpen[1](false);
      showToast('🌂 성공적으로 우산을 반납했습니다.', 'success');
      fetchUmbrellaList(1);
    });
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

    Api.post('/umbrella/return/info', {
      name,
      department,
      grade,
      class: realClass,
      number
    }).then(() => {
      returnManualOpen[1](false);
      showToast('🌂 성공적으로 우산을 반납했습니다.', 'success');
      fetchUmbrellaList(1);
    });

    returnManualName[1]('');
    returnManualSchoolNumber[1]('');
  };

  const onScanSuccess = (qr: string | null) => {
    if (!qr || !currentUmbrella) return;
    Api.post('/umbrella/qr', {
      data: qr,
      umbrellaName: currentUmbrella.name
    }).then(() => {
      qrOpen[1](false);
      showToast('🌂 성공적으로 우산을 대여했습니다.', 'success');
      fetchUmbrellaList(1);
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
      showToast('🌂 성공적으로 우산을 대여했습니다.', 'success');
      fetchUmbrellaList(1);
    });

    manualName[1]('');
    manualSchoolNumber[1]('');
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
          <StyledInput
            type="text"
            placeholder="엔터를 눌러 우산 이름 검색하기"
            onKeyPress={onSearchSubmit}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <BlankLine gap={10} />

          <UmbrellaTable
            umbrellaList={data}
            onRadioChange={(inputData) => setCurrentUmbrella(inputData)}
            count={count}
            onPageChange={(currentOffset) => fetchUmbrellaList(currentOffset)}
          />

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
