import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import QrReader from 'react-qr-reader';
import MainSideBar from '../components/MainSideBar';
import MainSideBarContainer from '../components/MainSideBar/MainSideBarContainer';
import { Heading1, Heading2, Heading3 } from '../atomics/Typography/Heading';
import Input from '../atomics/Form/Input';
import BlankLine from '../utils/BlankLine';
import Label from '../atomics/Form/Label';
import { HugeButton, MediumButton } from '../atomics/Button';
import ScaleInput from '../atomics/Form/ScaleInput';
import SCREEN_SIZE from '../styles/screen-size';
import Api from '../api';
import Modal from '../components/Modal';
import showToast from '../utils/Toast';
import { BodyItem, HeaderItem, Table, TableHead } from '../atomics/Table';

const StyledContent = styled.div`
  margin: 3rem;
`;

const Preview = styled.div`
  width: 100%;
  padding: 1rem;

  font-size: 14px;

  background-color: white;
  border-radius: 3px;
  border: 1px solid var(--color-gray);
`;

const PreviewTitle = styled.b`
  display: inline-block;
  width: 95px;
`;

const StyledInput = styled(Input)`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    width: 100%;
  }
`;

const ModalContent = styled.div`
  text-align: center;
`;

const CenterHeading2 = styled(Heading2)`
  text-align: center;
`;

interface UmbrellaType {
  readonly name: string;
  readonly status: 'good' | 'worse';
  readonly createdAt: Date;
}

const UmbrellaPage: React.FC = () => {
  const [data, setData] = useState<UmbrellaType[]>([]);
  const [showData, setShowData] = useState<UmbrellaType[]>([]);
  const [currentSelect, setCurrentSelect] = useState<UmbrellaType | undefined>(undefined);
  const open = useState<boolean>(false);
  const manuelOpen = useState<boolean>(false);
  const [schoolN, setSchoolN] = useState<string>('');

  useEffect(() => {
    Api.get('/umbrella?rental=false').then((res) => {
      setData(res.data.data);
      setShowData(res.data.data);
    });
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSelect(undefined);

    const searchText = e.target.value.toLowerCase();
    const a = data.filter((i) => i.name.includes(searchText));
    setShowData(a);
  };

  const onRadioChange = (inputData: UmbrellaType) => {
    setCurrentSelect(inputData);
  };

  const onScanSuccess = (qr: string | null) => {
    if (!qr) return;
    Api.post('/qr/decode', {
      data: qr
    }).then(() => {
      console.log('success');
    });
  };

  const PreviewContent = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    return (
      <>
        <p>
          <PreviewTitle>우산 이름: </PreviewTitle> {currentSelect?.name}
        </p>
        <p>
          <PreviewTitle>우산 상태: </PreviewTitle>{' '}
          {currentSelect?.status.replace('good', '좋음').replace('worse', '나쁨')}
        </p>
        <p>
          <PreviewTitle>우산 반납일: </PreviewTitle> {date.toLocaleDateString()}
        </p>
        <p>
          <PreviewTitle>우산 등록 날짜: </PreviewTitle>{' '}
          {new Date(currentSelect?.createdAt || '').toLocaleDateString()}
        </p>
      </>
    );
  };

  const convertSchoolNumberToObject = (n: string): object => {
    const grade = n.slice(0, 1);
    const clazz = n.slice(1, 3);
    const realClass = clazz[0] === '0' ? clazz.replace('0', '') : clazz;
    const number = n.slice(3, 5);
    const realNumber = number[0] === '0' ? number.replace('0', '') : number;

    return {
      grade: parseInt(grade, 10),
      class: parseInt(realClass, 10),
      number: parseInt(realNumber, 10)
    };
  };

  return (
    <>
      <MainSideBarContainer>
        <MainSideBar />

        <StyledContent>
          <Heading1>우산 대여 · 반납</Heading1>
          <Heading3>대여해줄 우산을 선택하고 QR코드를 스캔합니다.</Heading3>
          <BlankLine gap={10} />
          <MediumButton>반납신청</MediumButton>

          <BlankLine gap={30} />

          <Label>빌려줄 우산 선택하기</Label>
          <StyledInput type="text" placeholder="우산 이름 검색하기" onChange={onInputChange} />

          <BlankLine gap={10} />

          <Table>
            <TableHead>
              <tr>
                <HeaderItem>#</HeaderItem>
                <HeaderItem>이름</HeaderItem>
                <HeaderItem>상태</HeaderItem>
                <HeaderItem>등록일</HeaderItem>
              </tr>
            </TableHead>
            <tbody>
              {showData.map((item) => (
                <BodyItem key={item.name}>
                  <td>
                    <ScaleInput type="radio" name="um" onChange={() => onRadioChange(item)} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.status.replace('good', '좋음').replace('worse', '나쁨')}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                </BodyItem>
              ))}
            </tbody>
          </Table>

          <BlankLine gap={30} />

          <Label>
            빌려줄 우산 정보를 미리 확인하세요{' '}
            <span role="img" aria-label="exclamation mark">
              ❗
            </span>
          </Label>
          <Preview>
            <div>
              {currentSelect === undefined ? <p>먼저 우산을 선택해주세요.</p> : <PreviewContent />}
            </div>
          </Preview>

          <BlankLine gap={30} />

          <HugeButton onClick={() => open[1](true)}>QR코드 스캔</HugeButton>
          <BlankLine gap={10} />
          <MediumButton width={200} onClick={() => manuelOpen[1](true)}>
            학생 정보 직접 입력하기
          </MediumButton>
        </StyledContent>
      </MainSideBarContainer>

      <Modal width={500} height={500} name="QRScan" state={open}>
        <ModalContent>
          <Heading2>스캔 대기 중...</Heading2>
          <Heading3>학생 QR코드를 스캔해주세요.</Heading3>
        </ModalContent>
        <QrReader
          onScan={onScanSuccess}
          onError={(e) => {
            if (e.message === 'Permission denied') {
              showToast('❗ 카메라 권한 허용이 필요합니다.', 'danger');
            }
            console.log(e);
          }}
          style={{ width: '320px' }}
        />
      </Modal>

      <Modal width={500} height={500} name="QRScan" state={manuelOpen}>
        <div>
          <CenterHeading2>학생 정보 수동 입력</CenterHeading2>
          <BlankLine gap={10} />

          <Label>이름</Label>
          <Input />

          <BlankLine gap={10} />

          <Label>학번 (ex. 10101)</Label>
          <Input value={schoolN} onChange={(e) => setSchoolN(e.target.value)} />

          <BlankLine gap={30} />

          <div style={{ textAlign: 'center' }}>
            <MediumButton onClick={() => console.log(convertSchoolNumberToObject(schoolN))}>
              대여하기
            </MediumButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UmbrellaPage;
