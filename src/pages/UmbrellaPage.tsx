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

const StyledTable = styled.table`
  width: 100%;

  border-collapse: collapse;

  background-color: white;
  border-radius: 3px;
  border: 1px solid var(--color-gray);
`;

const TableHeader = styled.thead`
  border-bottom: 1px solid var(--color-gray);
`;

const HeaderItem = styled.th`
  padding: 1rem;
`;

const TableBody = styled.tbody``;

const BodyItem = styled.tr`
  text-align: center;
  & td {
    padding: 0.5rem;
  }

  &:last-child td {
    padding-bottom: 1rem;
  }

  &:nth-child(even) {
    background-color: #f5f5f5;
  }
`;

const ModalContent = styled.div`
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
    }).then((res) => {
      console.log('success');
    });
  };

  const PreviewContent = () => (
    <>
      <p>
        <PreviewTitle>우산 이름: </PreviewTitle> {currentSelect?.name}
      </p>
      <p>
        <PreviewTitle>우산 상태: </PreviewTitle> {currentSelect?.status}
      </p>
      <p>
        <PreviewTitle>우산 반납일: </PreviewTitle> {new Date().setDate(new Date().getDate() + 1)}
      </p>
      <p>
        <PreviewTitle>우산 등록 날짜: </PreviewTitle> {currentSelect?.createdAt}
      </p>
    </>
  );

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

          <StyledTable>
            <TableHeader>
              <tr>
                <HeaderItem>#</HeaderItem>
                <HeaderItem>이름</HeaderItem>
                <HeaderItem>상태</HeaderItem>
                <HeaderItem>등록일</HeaderItem>
              </tr>
            </TableHeader>
            <TableBody>
              {showData.map((item) => (
                <BodyItem key={item.name}>
                  <td>
                    <ScaleInput type="radio" name="um" onChange={() => onRadioChange(item)} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>{item.createdAt}</td>
                </BodyItem>
              ))}
            </TableBody>
          </StyledTable>

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
          <MediumButton width={200}>학생 정보 직접 입력하기</MediumButton>
        </StyledContent>
      </MainSideBarContainer>

      <Modal width={500} height={500} name="QRScan" state={open}>
        <ModalContent>
          <Heading2>스캔 대기 중...</Heading2>
          <Heading3>학생 QR코드를 스캔해주세요.</Heading3>
        </ModalContent>
        <QrReader
          onScan={onScanSuccess}
          onError={(e) => console.log(e)}
          style={{ width: '320px' }}
        />
      </Modal>
    </>
  );
};

export default UmbrellaPage;
